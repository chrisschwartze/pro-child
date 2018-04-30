<?php
// =============================================================================
// FUNCTIONS.PHP
// =============================================================================

/**
 * Require once
 * ----------------
 */


require_once 'inc/dequeue.php';
require_once 'inc/enqueue.php';
require_once 'inc/tracking.php';


/**
 * Action callbacks
 * ----------------
 */


/**
 * Custom icon for PayPal payment option on WooCommerce checkout page
 *
 * @category   WooCommerce
 * @author     Chris Schwartze <ch.schwartze@gmail.com>
 */
function woocommerce_extended_paypal_icon() {
    // return get_stylesheet_directory_uri() . '/dist/images/Paypal.png';
}
add_filter('woocommerce_paypal_icon', 'woocommerce_extended_paypal_icon');

/**
 * Pre-check "Agree to terms and conditions"
 *
 * @category   WooCommerce
 * @author     Chris Schwartze <ch.schwartze@gmail.com>
 */
add_filter('woocommerce_terms_is_checked_default', '__return_true');


/**
 * Utility methods
 * ---------------
 */


/**
 * Remove Portfolio in Admin menu
 *
 * @category   WooCommerce
 * @author     Chris Schwartze <ch.schwartze@gmail.com>
 */
 add_action( 'admin_menu', 'remove_x_portfolio' );
 function remove_x_portfolio() {
     remove_menu_page('edit.php?post_type=x-portfolio');
 }

/**
 * Current year shortcode
 *
 * @category   WooCommerce
 * @author     Chris Schwartze <ch.schwartze@gmail.com>
 */
function get_current_year() {
    return date('Y');
}
add_shortcode('current_year', 'get_current_year');
