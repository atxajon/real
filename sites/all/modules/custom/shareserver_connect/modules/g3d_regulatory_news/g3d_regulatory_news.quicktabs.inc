<?php
/**
 * @file
 * regulatory_news.quicktabs.inc
 */

/**
 * Implements hook_quicktabs_default_quicktabs().
 */
function g3d_regulatory_news_quicktabs_default_quicktabs() {
  $export = array();

  $quicktabs = new stdClass();
  $quicktabs->disabled = FALSE; /* Edit this to true to make a default quicktabs disabled initially */
  $quicktabs->api_version = 1;
  $quicktabs->machine_name = 'investor_relations';
  $quicktabs->ajax = 1;
  $quicktabs->hide_empty_tabs = FALSE;
  $quicktabs->default_tab = 2;
  $quicktabs->title = 'Investor Relations';
  $quicktabs->tabs = array(
    0 => array(
      'bid' => 'shareserver_connect_delta_share_price_table',
      'hide_title' => 0,
      'title' => 'Share Price',
      'weight' => '-100',
      'type' => 'block',
    ),
    1 => array(
      'bid' => 'shareserver_connect_delta_share_price_last_5_trades',
      'hide_title' => 0,
      'title' => 'Recent Trades',
      'weight' => '-99',
      'type' => 'block',
    ),
    2 => array(
      'bid' => 'shareserver_connect_delta_share_price_graph',
      'hide_title' => 0,
      'title' => 'Graph',
      'weight' => '-98',
      'type' => 'block',
    ),
    3 => array(
      'bid' => 'shareserver_connect_delta_share_price_historical',
      'hide_title' => 0,
      'title' => 'Historical',
      'weight' => '-97',
      'type' => 'block',
    ),
    4 => array(
      'bid' => 'shareserver_connect_delta_share_price_myshares',
      'hide_title' => 0,
      'title' => 'Calculate Share Value',
      'weight' => '-96',
      'type' => 'block',
    ),
  );
  $quicktabs->renderer = 'quicktabs';
  $quicktabs->style = 'default';
  $quicktabs->options = array();

  // Translatables
  // Included for use with string extractors like potx.
  t('Calculate Share Value');
  t('Graph');
  t('Historical');
  t('Investor Relations');
  t('Recent Trades');
  t('Share Price');

  $export['investor_relations'] = $quicktabs;

  return $export;
}
