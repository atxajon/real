			
				
		<link rel="stylesheet" href="/globalports/t/m/amstockj/amcharts/style.css" type="text/css">
        
        
        <script>
        /******** Load jQuery if not present || jQuery.fn.jquery !== '1.4.2' *********/
		if (typeof jQuery === "undefined" ) {
			document.write("<scr" + "ipt type=" + "text/javascript" + "src='//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js'></scr" + "ipt>");
		}
        </script>
		<script src="/globalports/t/m/amstockj/amcharts/amstock.js" type="text/javascript"></script>
		<script src="/globalports/t/m/amstockj/amcharts/amloader.js" type="text/javascript"></script>
		<script src="/globalports/t/m/amstockj/amcharts/raphael.js" type="text/javascript"></script>
		<script type="text/javascript">
			
			var debug = false; //true if you want console messages displayed - some browsers don't like this so turn off in production
			var error = 0;
			var showTable = true;
			var removeFirstComparatorSelect = false;
			var showComparatorDropDown = false;
			var trimInstrumentTitle = false;
                var initialCode = "GLPR.L.TK";
                var vitalData = {
                        0:		{"code":"GLPR.L.TK" , "name":"Global Ports Investments PLC" , "currency":"$", "colour":"#97B1A5", "shortname":"GLPR"	}                        
                        ,
                        
                        1:		{"code":".SPX.TK" 	, "name":"Standard and Poors 500" 		 , "currency":" ", "colour":"#441DE0", "shortname":"S&P 500"  }
                        ,
                        
                        2:		{"code":"RTSI.TK" 	, "name":"RTS Index" 		 , "currency":" ", "colour":"#7A1472", "shortname":"RTSI"  }
                        ,
                        
                        3:		{"code":"DJBG.TK" 	, "name":"Dow Jones Brookfield Global Infrastructure " 		 , "currency":" ", "colour":"#E9CB5D", "shortname":"Dow Jones Brookfield Global Infrastructure "  }
                        
                        
                };
                var totalEvents = 0;
			//var events = [];
			//amLoader.loadCsv('events.jsp?code=' + vitalData[0].code, events, ',', 0);
			
			'/globalports/t/m/amstockj/j-data.jsp?code=.SPX.TK&primary=GLPR.L.TK
			
			
			if(error!=1){
				var chart = new AmCharts.AmStockChart();
				//chart.width = "70%";	
				var chartData = {};
				var activeCodes = [vitalData[0].code , ""];
				var activePeriod = new Object();
			
				var totalCodes = getObjectSize(vitalData);
			
				AmCharts.ready(function () {
					//do a loop here through the codes and generate the data arrays dynamically
				
				
					var status = "Downloading data..";
					for(var i=0; i<totalCodes; i++){
						updateStatus(status);
						chartData[vitalData[i].code] = [];
						amLoader.loadCsv('/globalports/t/m/amstockj/j-data.jsp?code=' + vitalData[i].code + '&primary=' + vitalData[0].code, chartData[vitalData[i].code], ',', 0);
						status += "..";
					}
					
					updateStatus("Generating chart..");
					//setTimeout(function(){  }, 1100);
					createStockChart();
				});
			} else { updateStatus("Error retrieving chart data!"); }
			
			function createStockChart() {
				//var chart = new AmCharts.AmStockChart();
				chart.pathToImages = "/globalports/t/m/amstockj/amcharts/images/";
				chart.columnWidth = 0.2;
				// DATASETS //////////////////////////////////////////
				// create data sets first
				//do a loop here as well
				for(var i=0; i<totalCodes; i++){
					var dataSet1 = new AmCharts.DataSet();
					var name = vitalData[i].shortname; 	//here is the title
					if(trimInstrumentTitle){
						if(debug) console.log("preparing dataset for " + i + " " + name );
						if(i!=0) dataSet1.compared = true;
					}
					dataSet1.title = name;
					dataSet1.color = vitalData[i].colour;
					dataSet1.fieldMappings = [{
						fromField: "col1",
						toField: "col1"
					}, {
						fromField: "col2",
						toField: "col2"
					}];
					
					dataSet1.dataProvider = chartData[vitalData[i].code];
					dataSet1.categoryField = "date";	
					chart.categoryField = "date";
					chart.dataSets.push(dataSet1);
				}


				// PANELS ///////////////////////////////////////////                                                  
				// first stock panel
				var stockPanel1 = new AmCharts.StockPanel();
				//stockPanel1.showCategoryAxis = false;
				stockPanel1.title = "Value";
				stockPanel1.percentHeight = 50;
				//stockPanel1.addLabel(0, 0, vitalData[0].currency, "left", 10);
				
				//stockPanel1.recalculateToPercents = "never";
				
				categoryAxis = stockPanel1.categoryAxis;
				//categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
                //categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD                 
                categoryAxis.gridAlpha = 0.7;
                categoryAxis.axisAlpha = 0.7;
				categoryAxis.axisThickness = 1;
				categoryAxis.gridColor = "#CCCCCC";
				//categoryAxis.maxSeries = 500;
                //categoryAxis.inside = true;
				categoryAxis.equalSpacing = true ; //data points placed @ equal intervals (omiting dates with no data), set to true.
				categoryAxis.minPeriod = "hh";
				//categoryAxis.startOnAxis = false;
				chart.categoryAxesSettings.startOnAxis = false;
				chart.categoryAxesSettings.maxSeries = 500;
				//categoryAxis.offset = -100;
				
				var categoryAxesSettings=new AmCharts.CategoryAxesSettings();
                 categoryAxesSettings.maxSeries=0;
                 stockPanel1.categoryAxesSettings=categoryAxesSettings;
				

				valAxis1 = new AmCharts.ValueAxis();
				//valAxis1.offset = 20;
				valAxis1.gridAlpha = 0.7;
				valAxis1.axisAlpha = 0.7; 		//Axis opacity. Value range is 0 - 1.
				valAxis1.gridColor = "#CCCCCC";
				valAxis1.axisThickness = 1;
				valAxis1.unit = vitalData[0].currency;	//Unit which will be added to the value label.
				valAxis1.startOnAxis = true;
				
				
				stockPanel1.addValueAxis(valAxis1);
				

				// graph of first stock panel
				var graph1 = new AmCharts.StockGraph();
				graph1.valueField = "col1";
				graph1.comparable = true;
				graph1.connect = false; // this makes the graph not to connect data points if data is missing
				graph1.compareField = "col1";
				graph1.balloonText = "[[value]] " + vitalData[0].currency;
				//graph1.bullet = "round";
				stockPanel1.addStockGraph(graph1);

				// create stock legend   - !hidden because we have the comparators displayed at the top
				
				var legend = new AmCharts.AmLegend();  
				legend.fontSize = "10"; 
				//legend.labelText = "[[title]]";           
				legend.markerType = "circle";
				legend.equalWidths = false;
				legend.spacing = 5;
				legend.position = "top"; //the legend can only be at the top - that's how they made it
				legend.valueTextComparing = "[[percents.value]]%";
				legend.valueTextRegular = "[[value]]"+vitalData[0].currency;
				stockPanel1.stockLegend = legend; //new AmCharts.StockLegend();

				//CURSOR so you can zoom the chart
				var chartCursor = new AmCharts.ChartCursor();
				chartCursor.zoomable = true;
				stockPanel1.addChartCursor(chartCursor);
				
				var cursorSettings = new AmCharts.ChartCursorSettings();
				cursorSettings.bulletsEnabled = true;
				cursorSettings.cursorColor = vitalData[0].colour;
				//cursorSettings.categoryBalloonEnabled = false;
				chart.chartCursorSettings = cursorSettings;
				
				// second stock panel
				var stockPanel2 = new AmCharts.StockPanel();
				stockPanel2.title = "Volume";
				stockPanel2.percentHeight = 30;
				//stockPanel2.addLabel(0, 0, "mln.items", "left", 10);
				
				var graph2 = new AmCharts.StockGraph();
				graph2.valueField = "col2";
				graph2.type = "column"; //default is line
				//graph2.showBalloon = true;
				graph2.fillAlphas = 1;
				graph2.labelPosition = "bottom";
				//graph2.fillColors = "#000000";
				stockPanel2.addStockGraph(graph2);
				
				valAxis2 = new AmCharts.ValueAxis();
				valAxis2.offset = 0;
				valAxis2.gridAlpha = 0.7;
				valAxis2.axisAlpha = 0.7; 		//Axis opacity. Value range is 0 - 1.
				valAxis2.gridColor = "#CCCCCC";
				valAxis2.axisThickness = 1;
				valAxis2.unit = vitalData[0].currency;	//Unit which will be added to the value label.
				
				stockPanel2.addValueAxis(valAxis2);
				
				categoryAxis2 = stockPanel2.categoryAxis;
				categoryAxis2.parseDates = true; 
                categoryAxis2.gridAlpha = 0.7;
                categoryAxis2.axisAlpha = 0.7;
				categoryAxis2.axisThickness = 1;
				categoryAxis2.gridColor = "#CCCCCC";
                //categoryAxis2.inside = true;
				categoryAxis2.equalSpacing = true ;
				
				//stockPanel2.stockLegend = new AmCharts.StockLegend();
				var legend2 = new AmCharts.AmLegend();  
				legend2.fontSize = "10";            
				legend2.markerType = "circle";
				legend2.valueTextRegular = "[[value]]"+vitalData[0].currency;
				stockPanel2.stockLegend = legend2;

				// set panels to the chart
				chart.panels = [stockPanel1, stockPanel2];
				
				//VALUE AXES SETTINGS
				chart.valueAxesSettings.inside = false;


				// OTHER SETTINGS ////////////////////////////////////
				var sbsettings = new AmCharts.ChartScrollbarSettings();
				sbsettings.fontSize = 0;
				sbsettings.graph = graph1;
				chart.chartScrollbarSettings = sbsettings;
				
				
				// PERIOD SELECTOR ///////////////////////////////////
				var periodSelector = new AmCharts.PeriodSelector();
				periodSelector.position = "top";
				periodSelector.periodsText = "Period ";
				periodSelector.periods = getSelectorPeriods();
				chart.periodSelector = periodSelector;
				
				chart.panelsSettings.marginLeft = 45;
				chart.panelsSettings.marginRight = 30;
				chart.panelsSettings.marginBottom = 30;
				chart.panelsSettings.columnWidth = 0.2;


				// DATA SET SELECTOR
				if(showComparatorDropDown){
					var dataSetSelector = new AmCharts.DataSetSelector();
					dataSetSelector.position = "top";
					if(removeFirstComparatorSelect) dataSetSelector.selectText = "";
					
					dataSetSelector.addListener("dataSetSelected",function(){
						if(debug) console.log('dataSetCompared: removing first select');
						if(removeFirstComparatorSelect) removeFirstSelect();
					});
					
					dataSetSelector.addListener("dataSetCompared",function(){
						if(debug) console.log('dataSetCompared: removing first select');
						if(removeFirstComparatorSelect) removeFirstSelect();
					});
					
					dataSetSelector.addListener("dataSetUncompared",function(){
						if(debug) console.log('dataSetUncompared: removing first select');
						if(removeFirstComparatorSelect) removeFirstSelect();
					});
				}
				
				
				
				chart.dataSetSelector = dataSetSelector;
				
				
				chart.addListener("zoomed", function (data) {
					if(debug) console.log('period clicked: ' + data.startDate + ' -- ' + data.endDate);
					activePeriod.start =  data.startDate;
					activePeriod.end =  data.endDate;
				  
					if(showTable) updateTable();
				});
				
				chart.addListener("dataUpdated", function (data) {
					if(showTable) updateTable();
				});
				
				

				
				chart.panels[1].prefixesOfBigNumbers = [{number:1e+3,prefix:"K"},{number:1e+6,prefix:"M"},{number:1e+9,prefix:"B"},{number:1e+12,prefix:"T"},{number:1e+15,prefix:"P"},{number:1e+18,prefix:"E"},{number:1e+21,prefix:"Z"},{number:1e+24,prefix:"Y"}];
				chart.panels[1].usePrefixes = true;

				
				
				chart.write('chartdiv');

				if(removeFirstComparatorSelect) removeFirstSelect();

				addComparators();
				addUpdateButton();
				addLogo();
			}
			
			
			
			function addUpdateButton(){
				var ch = $('#chartdiv div div');
				var wd = ch.children('div').first().append("<input type='button' class='redrawButton amChartsButton' value='Redraw'/>");
				
				$('.redrawButton').on('click',function(){
					//get the dates from the ante input fields and make date objects
					var v2 = $(this).prev().val(); 			
					var v1 = $(this).prev().prev().val();	
					
					v2a = v2.split("-"); 
					v1a = v1.split("-"); 
					if(v2a.length==3 && v1a.length==3){
						v2 = v2a[1]+"/"+v2a[0]+"/"+v2a[2];
						v1 = v1a[1]+"/"+v1a[0]+"/"+v1a[2];
						
						var d1 = new Date(v1); // mm/dd/yyyy
						var d2 = new Date(v2);
						chart.zoom(d1,d2);
						//console.log("not an error with date");
					}else{
						alert("Incorrect date format. Correct format is: dd-mm-yyyy");
					}
				});
			}
			
			
			function addComparators(){
				var ch = $('#chartdiv div');
				var customSelector = "<div id='customselector'>INDICES:  ";
				customSelector +="<input type='checkbox' checked disabled='true' id='chk0'><label for='chk0' style='border-bottom:1px solid "+vitalData[0].colour+"'>"+vitalData[0].shortname+"</label></input>";
				
				for(var i=1; i<totalCodes; i++){
					var name = vitalData[i].shortname;
					var c = vitalData[i].colour;
					customSelector +="<input type='checkbox' value='"+i+"' id='chk"+i+"'><label for='chk"+i+"' style='border-bottom:1px solid "+c+"'>"+name+"</label></input>";
				}
				customSelector +="</div>";
				ch.children().first().before(customSelector);
				
				$('#customselector input').change(function(e) {
					//on any change, check values
					$('#customselector').children('input:not(:first)').each(function(){
						var sel = $(this).val();
						var ischecked = ($(this).attr("checked")!="undefined" && $(this).attr("checked")=="checked")?true:false;
						chart.dataSets[sel].compared = ischecked;
						
						if(debug) console.log(ischecked);
					});
					
					//update the bottom table (if needed)
					if(showTable) updateTable();
					
					//reload chart
					chart.validateData();
                });	
			}
			
			function getSelectorPeriods(){
				var ret = [/*{
					period: "DD",
					count: 10,
					label: "10 days"
				}, */{
					period: "MM",
					count: 1,
					label: "1M"
				}, {
					period: "MM",
					selected: true,
					count: 3,
					label: "3M"
				}, {
					period: "MM",
					count: 6,
					label: "6M"
				},{
					period: "YYYY",
					count: 1,
					label: "1Y"
				},/* {
					period: "YYYY",
					count: 3,
					label: "3 years"
				},*/{
					period: "YTD",
					label: "YTD"
				}, {
					period: "MAX",
					
					label: "MAX"
				}];
				
				
				return ret;
			}
			
			
			function updateTable(){
				var rows ="";
				
				$(document).ready(function(){
					//get table from template
					var mytable = getTable();
					
					//get the data for first code - ALWAYS
					var rowOneData = getAveragesForCode(vitalData[0].code, chartData[vitalData[0].code], activePeriod);
					//get new empty row from template
					var row = getRow();
					
					var av = (rowOneData.theAverageVolume <1000000)? rowOneData.theAverageVolume : (rowOneData.theAverageVolume/1000000).toFixed(2) + "M";
					var at = (rowOneData.theAverageValueTraded <1000000)? rowOneData.theAverageValueTraded : (rowOneData.theAverageValueTraded/1000000).toFixed(2) + "M";
					//do some table update here
					row = row.replace("{{instrument}}", vitalData[0].code);
					row = row.replace("{{currency}}", getCurrencyForName(vitalData, vitalData[0].code));
					row = row.replace("{{fclose}}", rowOneData.firstClose);
					row = row.replace("{{high}}", rowOneData.highClose);
					row = row.replace("{{low}}", rowOneData.lowClose);
					row = row.replace("{{last}}", rowOneData.lastClose);
					row = row.replace("{{change}}", rowOneData.change);
					row = row.replace("{{pctchange}}", (rowOneData.pctchange!="-")? rowOneData.pctchange + "%" : "-");
					row = row.replace("{{averageVolume}}", av);
					row = row.replace("{{averageTrade}}", at);
					rows += row;
				
					//if we have other codes selected, bring it on
					$('#customselector').children('input:not(:first)').each(function(){
						var sel = $(this).val();
						var ischecked = ($(this).attr("checked")!="undefined" && $(this).attr("checked")=="checked")?true:false;
						
						if(ischecked){
							//build new empty row
							var row2 = getRow();
							
							//get the data for this code
							var rowTwoData = getAveragesForCode(vitalData[sel].code, chartData[vitalData[sel].code], activePeriod);	
							
							//NOTE: do not display average volume for comparator codes
							//(rowTwoData.theAverageVolume==0)?"-":rowTwoData.theAverageVolume
							//(rowTwoData.theAverageValueTraded==0)?"-":rowTwoData.theAverageValueTraded
							
							//do some table update here
							row2 = row2.replace("{{instrument}}", vitalData[sel].code);
							row2 = row2.replace("{{currency}}", getCurrencyForName(vitalData, vitalData[sel].code));
							row2 = row2.replace("{{fclose}}", rowTwoData.firstClose);
							row2 = row2.replace("{{high}}", rowTwoData.highClose);
							row2 = row2.replace("{{low}}", rowTwoData.lowClose);
							row2 = row2.replace("{{last}}", rowTwoData.lastClose);
							row2 = row2.replace("{{change}}", rowTwoData.change);
							row2 = row2.replace("{{pctchange}}", (rowTwoData.pctchange!="-")? rowTwoData.pctchange + "%" : "-");
							row2 = row2.replace("{{averageVolume}}", "-");
							row2 = row2.replace("{{averageTrade}}", "-");
							
							rows += row2;
						}
						
					});
					

					mytable = mytable.replace("{{therows}}",rows);
					
					//clear out any unused tags
					mytable = clearoutTags(mytable);
					if($('.averagesintable').length!=0) $('.averagesintable').remove();
					$('#chartdiv').append(mytable);
					$('.averagesintable').width($('#chartdiv').width());
				});
				
				
			}
			
			function getAveragesForCode(code, dataArray, period){
					var ret = new Object();
					var _dataArray = [];
					
					//date array should be ordered, generating the array of dates we currently need
					for(var i=0; i<dataArray.length; i++){
						var _adate = dataArray[i].date;
						if(_adate>=period.start && _adate<=period.end)
							_dataArray.push(dataArray[i]);
					}
					
					if(debug) console.log(_dataArray.length); //reality check
					
					if(_dataArray.length>0){
						
						//get first close
						ret.firstClose = _dataArray[0].col1;
						
						//get high/low
						var theMax = 0;
						var theMin = "";
						for(var i=0; i<_dataArray.length; i++){
							if(_dataArray[i].col1 > theMax) theMax = _dataArray[i].col1;
							
							if(theMin=="") theMin = _dataArray[i].col1;
							if(_dataArray[i].col1 < theMin) theMin = _dataArray[i].col1;
						}
						ret.highClose = theMax.toFixed(2);
						ret.lowClose = theMin.toFixed(2);
						
						//get last
						ret.lastClose = _dataArray[_dataArray.length-1].col1;
						
						//chng
						ret.change = (ret.lastClose - ret.firstClose).toFixed(2);
						
						//chng%
						ret.pctchange = (ret.lastClose/ret.firstClose*100 - 100).toFixed(2);
					
						//daily average
						var theSum = 0; var theVolumeSum = 0;
						for(var i=0; i<_dataArray.length; i++){
							theSum = theSum + _dataArray[i].col1;
							theVolumeSum = theVolumeSum + _dataArray[i].col2;
						}
						ret.sumOfClose = theSum;
						ret.theAverageClosePrice = (theSum / _dataArray.length).toFixed(2);
						ret.theVolumeSum = theVolumeSum.toFixed(2);
						
						//average volume
						ret.theAverageVolume = (theVolumeSum / _dataArray.length).toFixed(2);
						
						//average value
						ret.theAverageValueTraded = (ret.theAverageVolume * ret.theAverageClosePrice).toFixed(2);
						
					}
					else{
						ret.firstClose = ret.lastClose = ret.theMax = ret.theMin =  ret.highClose = ret.lowClose = ret.change = ret.pctchange = ret.sumOfClose = ret.theAverageClosePrice = ret.theVolumeSum = ret.theAverageVolume = ret.theAverageValueTraded = "-";
					}
					
					return ret;
			}
			
			function getCodeForName(allNamesCodes, thisName){
				for(var i=0; i<totalCodes; i++){
					if(allNamesCodes[i].name == thisName) return allNamesCodes[i].code;
				}
			}
			
			function getCurrencyForName(allNamesCodes, thisCode){
				for(var i=0; i<totalCodes; i++){
					if(allNamesCodes[i].code == thisCode) return allNamesCodes[i].currency;
				}
				/*for(i in allNamesCodes){
					if(allNamesCodes[i] == thisName) return i;
				}*/
			}
			
			function removeFirstSelect(){
				$('#chartdiv div div').children('select').first().hide();
			}
			
			function updateStatus(ms){
				//$(document).ready(function(){
				var elem = document.getElementById('chartdiv');
				elem.innerHTML = "<div style='width:100%; text-align:center; margin-top:20%'>" + ms + "</div>";
				//});
			}
			
			function clearoutTags(p){
				//if any custom tag remains, clear out
				var temp = p.split("{{");
				for(var i=0; i<temp.length; i++)
					p = p.replace(/\{\{.*?\}\}/, ' '); 
				return p;
			}
			
			function getObjectSize(obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			};
			
			function addLogo(){
				var d = $('#chartdiv div').children('div').first().next();
				d.next().prepend("<div class='companylogo'></div>");
				d.parent().css('position','relative');
			}

			function getTable(){
				var table="<table width='100%' class='averagesintable' cellpadding='5' cellspacing='0'>";
				table +="<tbody>";
				table +="<tr>";
					table +="<th  rowspan='2' align='center'>Instrument</th>";
					table +="<th  rowspan='2' align='center'>Currency</th>";
					table +="<th  rowspan='2' align='center'>First Close</th>";
					table +="<th  rowspan='2' align='center'>High</th>";
					table +="<th  rowspan='2' align='center'>Low</th>";
					table +="<th  rowspan='2' align='center'>Last</th>";
					table +="<th  rowspan='2' align='center'>Chng</th>";
					table +="<th  rowspan='2' align='center'>Chng,%</th>";
					table +="<th  colspan='2' align='center'>Daily Average Traded</th>";
				table +="</tr>";
				table +="<tr>";
					table +="<th >Volume</th>";
					table +="<th >Value</th>";
				table +="</tr>";
				table +="{{therows}}";
				table +="</tbody>";
				table +="</table>";
				
				return table;
			}
			
			function getRow(){
				var tablerow ="<tr>";
				tablerow +="<td  align='center'>{{instrument}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{currency}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{fclose}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{high}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{low}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{last}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{change}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{pctchange}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{averageVolume}}</td>";
				tablerow +="<td  nowrap='' align='center'>{{averageTrade}}</td>";
				tablerow +="</tr>";
				return tablerow;
			}
			
		</script>

    <div id="chartWrapper" style="width:660px;height:850px;">
		<div id="chartdiv" style="width: 640px; height:600px;">
        	<div style='width:100%; text-align:center; margin-top:20px'>Preparing Stock Chart</div>
        </div>
    </div>
				
	
