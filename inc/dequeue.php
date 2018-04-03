<?php

// Dequeue and deregister scripts
// =============================================================================

function dequeue_unnecessary_scripts()
{

    if ( is_checkout() ) {
        wp_dequeue_script('x-woocommerce');
        wp_deregister_script('x-woocommerce');
    }
    if ( !is_checkout() ) {
        wp_dequeue_script('tco_woo_scripts');
        wp_deregister_script('tco_woo_scripts');
    }
    if ( !is_single() ) {
        wp_dequeue_script('prismatic-prism');
        wp_deregister_script('prismatic-prism');
    }

}
add_action('wp_print_scripts', 'dequeue_unnecessary_scripts');


// Deregister styles
// =============================================================================

function dequeue_unnecessary_styles()
{

    if ( !is_admin() ) {
        wp_deregister_style('duplicate-post');
    }
    if ( !is_checkout() ) {
        wp_deregister_style('tco_woo_front_css');
    }
    if ( !is_single() ) {
        wp_deregister_style('prismatic-prism');
    }
    if ( !is_checkout() || !is_cart() || !is_product() || !is_account_page() || !is_page('cart') ) {
        //wp_deregister_style('x-woocommerce');
    }

}
add_action('wp_print_styles', 'dequeue_unnecessary_styles', 100);

 ?>
