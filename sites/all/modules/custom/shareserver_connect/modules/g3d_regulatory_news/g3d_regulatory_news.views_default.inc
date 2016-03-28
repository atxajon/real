<?php
/**
 * @file
 * regulatory_news.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function g3d_regulatory_news_views_default_views() {
  $export = array();

  $view = new view;
  $view->name = 'regulatory_news';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Regulatory News';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Regulatory News';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'title' => 'title',
    'field_regnews_publish_date' => 'field_regnews_publish_date',
  );
  $handler->display->display_options['row_options']['separator'] = ' - ';
  $handler->display->display_options['row_options']['hide_empty'] = 0;
  $handler->display->display_options['row_options']['default_field_elements'] = 1;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = 0;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = 0;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title']['link_to_node'] = 1;
  /* Field: Content: Publish Date */
  $handler->display->display_options['fields']['field_regnews_publish_date']['id'] = 'field_regnews_publish_date';
  $handler->display->display_options['fields']['field_regnews_publish_date']['table'] = 'field_data_field_regnews_publish_date';
  $handler->display->display_options['fields']['field_regnews_publish_date']['field'] = 'field_regnews_publish_date';
  $handler->display->display_options['fields']['field_regnews_publish_date']['label'] = '';
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_regnews_publish_date']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_regnews_publish_date']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_regnews_publish_date']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_regnews_publish_date']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  $handler->display->display_options['fields']['field_regnews_publish_date']['field_api_classes'] = 0;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'regulatory_news' => 'regulatory_news',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'investors/news/regulatory-news';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Regulatory News';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $export['regulatory_news'] = $view;

  return $export;
}
