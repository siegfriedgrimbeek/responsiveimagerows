<?php

function rir_row( $params, $content = null ) {
    extract( shortcode_atts( array(
        'class' => 'rir-row'
    ), $params ) );
    $content = preg_replace( '/<br class="nc".\/>/', '', $content );
    $result = '<div class="' . $class . '">';
    $result .= do_shortcode( $content );
    $result .= '</div>';
    return force_balance_tags( $result );
}
add_shortcode('rir_row', 'rir_row');

function rir_item( $params, $content=null ) {
    extract( shortcode_atts( array(
        'class' => 'col-sm-1'
        ), $params ) );

    $result = '<div class="' . $class . '">';
    $result .= do_shortcode( $content );
    $result .= '</div>';
    return force_balance_tags( $result );
}
add_shortcode( 'rir_item', 'rir_item' );