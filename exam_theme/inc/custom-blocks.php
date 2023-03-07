<?php
/**
 * Custom functions for blocks
 *
 * @package sg_theme
 */

function acn_custom_block_backend_enqueue() {
	wp_enqueue_script( 'acn-custom-block-script', get_template_directory_uri(). '/inc/blocks/block.js', array( 'wp-blocks', 'wp-i18n', 'wp-element' ),'', true);
	wp_enqueue_style( 'acn-custom-backend-block-style', get_template_directory_uri(). '/inc/blocks/editor.css' );

}

add_action( 'enqueue_block_editor_assets', 'acn_custom_block_backend_enqueue' );

function acn_custom_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'acn-blocks',
				'title' => __( 'Art Components', 'acn-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'acn_custom_block_category', 10, 2);