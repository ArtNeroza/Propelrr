<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package exam_theme
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function exam_theme_body_classes( $classes ) {
	global $post;
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	if( isset( $post ) && !is_front_page() && ( isset( $post ) || !empty($post) )  ) {
		$classes[] =  $post->post_type.'-'.$post->post_name.' inner-page';
	}

	if( is_404() && ( isset( $post ) || !empty($post) )  ){
		$classes[] =  $post->post_type.'-'.$post->post_name.' inner-page';
	}

	if( is_search() && ( isset( $post ) || !empty($post) ) ){
		$classes[] =  $post->post_type.'-'.$post->post_name.' inner-page';
	}

	return $classes;
}
add_filter( 'body_class', 'exam_theme_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function exam_theme_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'exam_theme_pingback_header' );
