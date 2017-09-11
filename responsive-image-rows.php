<?php
/*
 * Plugin Name: Responsive Image Rows
 * Version: 1.0
 * Plugin URI: http://www.sieggg.com/
 * Description: Insert up to five images in a row, the images will gracefully fall beneath each other on mobile devices. One the plugin is installed, you will see a new button on the post text editor. Use it to simply insert as many images/rows as you want.
 * Author: Siegfried Grimbeek
 * Author URI: http://www.sieggg.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: responsive-image-rows
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Siegfried Grimbeek
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Load plugin class files
require_once( 'includes/rir_plugin.php' );
require_once( 'includes/rir_settings_page.php' );
require_once( 'includes/rir_admin_api.php' );

add_action( 'admin_head', 'rir_add_tinymce' );
add_action( 'rir_add_tinymce_init','rir_add_tinymce_init' );
add_action( 'wp_enqueue_scripts', 'rir_add_my_stylesheet' );
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_style' );

function rir_add_tinymce() {
    //global $typenow;

    // Only on Post Type: post and page
    //if( ! in_array( $typenow, array( 'post', 'page' ) ) )
    //  return ;

    add_filter( 'mce_external_plugins', 'rir_add_tinymce_plugin' );
    // Add to line 1 form WP TinyMCE
    add_filter( 'mce_buttons', 'rir_add_tinymce_button' );
}

// Add the button key for address via JS
function rir_add_tinymce_button( $buttons ) {

    array_push( $buttons, 'rir_button_key' );
    return $buttons;
    
}

// Inlcude the JS for TinyMCE
function rir_add_tinymce_plugin( $plugin_array ) {

    $plugin_array['rir_plugin'] = plugins_url( '/assets/js/admin.js', __FILE__ );
    return $plugin_array;

}

//Enqueue plugin style-file
function rir_add_my_stylesheet() {

    if (!is_admin()){
        wp_register_style( 'rir_frontend', plugins_url( '/assets/css/frontend.css', __FILE__) );
        wp_enqueue_style( 'rir_frontend' );
    }else{
        wp_register_style( 'rir_admin', plugins_url( '/assets/css/admin.css', __FILE__) );
        wp_enqueue_style( 'rir_admin' );     
    }

}

//Enqueue admin plugin style-file
function load_custom_wp_admin_style() {
        wp_register_style( 'rir_admin', plugins_url( '/assets/css/admin.css', __FILE__) );
        wp_enqueue_style( 'rir_admin' );    
}
