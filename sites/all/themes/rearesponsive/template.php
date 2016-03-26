<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

/**
 * Override yearly news tabs titles dynamically; set to 5 years before archive by default.
 * @param unknown_type $quicktabs
 */
function rearesponsive_quicktabs_alter($quicktabs) {
  if ($quicktabs->machine_name == 'test') {
    adjustTabs($quicktabs, 5);
  }
}


/**
 * Helper function. Override yearly news tabs titles dynamically.
 * @param unknown_type $quicktabs
 * @param unknown_type $tab_machine_name
 * @param unknown_type $tabs_before_archive
 */
function adjustTabs($quicktabs, $tabs_before_archive){
  $currYear = date('Y');
  $count = $tabs_before_archive;
  $xtrayear = FALSE;
  if ($quicktabs->tabs[0]['title'] == "Now +1") {
    $currYear++;
    $xtrayear = TRUE;
  }
  if (count($quicktabs->tabs) < $count) {
    $count = count($quicktabs->tabs);
  }
  else {
    if ($xtrayear) {
      $count++;
    }
  }
  for ($i = 0; $i < $count; $i++) {
    $yr = ($currYear - $i);
    if ($i == $count) {
      $quicktabs->tabs[$i]['title'] = t('Archive');
    }
    else {
      $quicktabs->tabs[$i]['title'] = t($yr);
    }
  }
}