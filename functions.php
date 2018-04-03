<?php

// =============================================================================
// FUNCTIONS.PHP
// =============================================================================

// Require functions
// -----------------------------------------------------------------------------

require_once 'inc/dequeue.php';
require_once 'inc/enqueue.php';
require_once 'inc/tracking.php';

// Snippets
// =============================================================================

/*** Current year shortcode ***/

add_shortcode('current_year', 'get_current_year');
function get_current_year()
{
    return date('Y');
}
