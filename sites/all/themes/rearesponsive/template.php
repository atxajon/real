<?php
/**
 * @file
 * The primary PHP file for this theme.
 */


/**
 * Page alter hook.
 * @param unknown_type $page
 */
function rearesponsive_page_alter(&$page) {
  if ($node = menu_get_object()){
    $thefields = array('field_page_banner_image' => 'header',
    );
    foreach ($thefields as $key => $value) {
      _assign_field($key,$value,$node->nid,$page);
    }
  }
}

/**
 * Moves fields outside main content region into other theme regions.
 * @param unknown_type $which
 * @param unknown_type $where
 * @param unknown_type $nid
 * @param unknown_type $page
 */
function _assign_field($which, $where, $nid, &$page){
  $field = drupal_render($page['content']['system_main']['nodes'][$nid][$which]);
  unset($page['content']['system_main']['nodes'][$nid][$which]);
  if ($field){
    if (!isset($page[$where])){
      $page[$where]['#region'] = $where;
      $page[$where]['#theme_wrappers'][] = 'region';
    }
    $page[$where][$which]['#markup']= $field;
  }
}



/**
 * Override yearly news tabs titles dynamically; set to 5 years before archive by default.
 * @param unknown_type $quicktabs
 */
function rearesponsive_quicktabs_alter($quicktabs) {
  if ($quicktabs->machine_name == 'test') {
    _adjustTabs($quicktabs, 5);
  }
}


/**
 * Helper function. Override yearly news tabs titles dynamically.
 * @param unknown_type $quicktabs
 * @param unknown_type $tab_machine_name
 * @param unknown_type $tabs_before_archive
 */
function _adjustTabs($quicktabs, $tabs_before_archive){
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