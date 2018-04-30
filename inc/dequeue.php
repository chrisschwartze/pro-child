<?php

// Dequeue and deregister scripts
// =============================================================================

function dequeue_unnecessary_scripts()
{

}
add_action('wp_print_scripts', 'dequeue_unnecessary_scripts');


// Deregister styles
// =============================================================================

function dequeue_unnecessary_styles()
{


}
add_action('wp_print_styles', 'dequeue_unnecessary_styles', 100);

 ?>
