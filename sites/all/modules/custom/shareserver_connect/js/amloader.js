amLoader = {
  loadCsv: function (file, holder, separator, skip)
	{
		if (window.XMLHttpRequest)
		{
			// IE7+, Firefox, Chrome, Opera, Safari
			var request = new XMLHttpRequest();
		}
		else
		{
			// code for IE6, IE5
			var request = new ActiveXObject('Microsoft.XMLHTTP');
		}
		// load
		request.open('GET', file, false);
		request.send();
		amLoader.parseCSV(request.responseText, holder, separator, skip);
	},
	parseCSV: function(data, holder, separator, skip)
	{
		if(separator == undefined) {
			separator = ","
		}
		if(isNaN(skip)) {
			skip = 0;
		}
		else {
			skip = Number(skip);
		}
		
		//replace UNIX new lines
		data = data.replace (/\r\n/g, "\n");
		//replace MAC new lines
		data = data.replace (/\r/g, "\n");
		//split into rows
		var rows = data.split("\n");
		// delete skiped rows
		if (!isNaN(skip))
		{
			rows.splice(0,skip);
		}

		for (var i = 0; i < rows.length; i++)
		{			
			if(rows[i])
			{					
				var tArray = rows[i].split(separator);
				
				var dItem = new Object();
				dItem.date = new Date(tArray[0]);
				for (var j = 1; j < tArray.length; j++)
				{
					var g = j - 1;
					if (tArray[j] != "" && tArray[j] != undefined)
					{
						dItem['col' + j] = AmCharts.toNumber(tArray[j]);
					}
				}
				holder.push(dItem);
			}
		}
	}
};