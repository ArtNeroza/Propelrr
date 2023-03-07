<?php
/**
 * Custom functions for blocks
 *
 * @package exam_theme
 */
add_action( 'init', 'exam_theme_banner_cpt' );
function exam_theme_banner_cpt() {
	$labels = array(
		'name'					=> __( 'Sliding Banner', 'exam_theme' ),
		'singular_name'			=> __( 'Sliding Banner', 'exam_theme' ),
		'add_new'				=> __( 'New Slide', 'exam_theme' ),
		'add_new_item'			=> __( 'Add Slide', 'exam_theme' ),
		'edit_item'				=> __( 'Edit Slide', 'exam_theme' ),
		'new_item'				=> __( 'New Slide', 'exam_theme' ),
		'view_item'				=> __( 'View Slide', 'exam_theme' ),
		'search_items'			=> __( 'Search Slide', 'exam_theme' ),
		'not_found'				=>  __( 'No Slide Found', 'exam_theme' ),
		'not_found_in_trash'	=> __( 'No Slide found in Trash', 'exam_theme' ),
	);
	$args = array(
		'labels'		=> $labels,
		'has_archive'	=> false,
		'public'		=> true,
		'hierarchical'	=> false,
		'rewrite'		=> array( 'slug' => 'banner' ),
		'supports'		=> array( 'title', 'thumbnail' ),
		'menu_icon'		=> 'dashicons-images-alt2',
		'show_in_rest' => true
	);
	register_post_type( 'banner_post', $args );
}