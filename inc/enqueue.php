<?php

// Enqueue and register scripts and styles
// =============================================================================

function global_css()
{
    // Register parent stylesheet first
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    // Register our minified CSS
    wp_register_style('min-css', get_stylesheet_directory_uri() .'/dist/app.min.css', array('parent-style'), null);
    wp_enqueue_style('min-css');

}
add_action('wp_enqueue_scripts', 'global_css', PHP_INT_MAX);


function global_js()
{
    // Register our minified JS
    wp_register_script('min-js', get_stylesheet_directory_uri() . '/dist/app.min.js', array('jquery'), null, true);
    wp_enqueue_script('min-js');

}
add_action('wp_enqueue_scripts', 'global_js', PHP_INT_MAX);


?>
