<?php
/**
 * Custom functions for Shortcodes
 *
 * @package exam_theme
 */
add_shortcode('display_sliding_banner','display_slidebanner_function');
function display_slidebanner_function( $atts=[], $content =null ){
	$shortcode_atts = shortcode_atts([
		'id'				=> '',
		'class'			=> '',
		'items'			=> '-1',
		'category'		=> ''
	], $atts);
	
	$id 		= $shortcode_atts['id'];
	$class 		= $shortcode_atts['class'];
	$items 		=  $shortcode_atts['items'];
	$category 	=  $shortcode_atts['category'];

	$args = array(
		'post_type'		=> 'banner_post',
		'post_status'	=> 'publish',
		'orderby'		=> 'date',
		'order'			=> 'DESC',
		'posts_per_page' => 6, /*Limit to avoid page load delays*/
	);

	$banner_query = new WP_Query($args);

	ob_start(); ?>
		<div id="sliding-banner" class=" owl-carousel banner-section <?php echo $class;?>">
			<?php while( $banner_query->have_posts()) : $banner_query->the_post() ; ?>
				<div class="banner-item">
					<?php
						$content 	= get_field('banner_content');
						$background	= get_field('banner_background');
						$button 	= get_field('banner_buttons');
						$price 	 	= $button['price'];
						$color  	= $button['color'];
						$product 	= $button['product'];
						$image 		= get_the_post_thumbnail_url();
					?>
					<div class="banner-content" style="background-image: url('<?php echo get_template_directory_uri() ;?>/assets/images/header-banner.jpg'); background-repeat: no-repeat;">
						<div class="banner-meta row">
							<?php if(!empty($content)) : ;?>
								<div class="info"><?php echo $content; ?></div>
							<?php endif;?>

							<?php if ( has_post_thumbnail() ) : ?>
							   <div class="featured-image"><?php the_post_thumbnail(); ?></div>
							<?php endif; ?>

							<div class="buttons">
								<div class="cta">
									<?php if(!empty($color)) : ;?>
										<p class="color"><span>COLOR </span> <img src="<?php echo $color['url']; ?>" alt="<?php echo $color['alt']; ?>"></p>
									<?php endif;?>

									<?php if(!empty($price)) : ;?>
										<p class="price"><span>PRICE </span> <?php echo $price; ?></p>
									<?php endif;?>

									<?php if(!empty($product)) : ;?>
										<a class="product" target="<?php echo $product['target']; ?>" href="<?php echo $product['url']; ?>"><?php echo $product['title']; ?></a>
									<?php endif;?>
								</div>
								<div class="share-button">
									<a class="share" target="" href="#"><img src="<?php echo get_template_directory_uri();?>/assets/images/share-icon.png" alt=""></a>
								</div>
							</div>

						</div>
					</div>
				</div>
			<?php endwhile; wp_reset_postdata();?>
		</div>
	<?php
	return ob_get_clean();
}


add_shortcode('display_sliding_products','display_sliding_function');
function display_sliding_function ( $atts=[], $content =null ) {

	$shortcode_atts = shortcode_atts([
		'id'				=> '',
		'class'			=> '',
		'items'			=> '-1',
		'category'		=> ''
	], $atts);
	
	$id 		= $shortcode_atts['id'];
	$class 		= $shortcode_atts['class'];
	$items 		=  $shortcode_atts['items'];
	$category 	=  $shortcode_atts['category'];

	$args = array(
		'post_type'		=> 'product',
		'post_status'	=> 'publish',
		'orderby'		=> 'date',
		'order'			=> 'DESC',
		'posts_per_page' => 12, /*Limit to avoid page load delays*/
	);

	$prod_query = new WP_Query($args);

	ob_start(); ?>
		<div id="sliding-product" class="owl-carousel sliding-product-section <?php echo $class;?>">
			<?php while( $prod_query->have_posts()) : $prod_query->the_post() ; ?>
				<?php 
					$cat = '';
					$product = wc_get_product( get_the_ID() );
					$terms = get_the_terms( get_the_ID(), 'product_cat' );
					foreach($terms as $term){
						$cat .= $term->slug.' ';
					}
				?>
				<div class="product-item <?php echo $cat;?>">
					<div class="item">
						<div class="product-meta">
							<h2 class="product-title"><a href="<?php echo get_permalink()?>"><?php echo the_title();?></a></h2>
							<div class="product-info">
								<p class="price"><?php echo $product->get_price_html(); ?></p>
								<a class="buy-now-btn" href="<?php echo get_permalink();?>">BUY NOW</a>
							</div>
						</div>
						<div class="product-img"><?php the_post_thumbnail() ;?></div>
					</div>
				</div>
			<?php endwhile; wp_reset_postdata();?>
		</div>
	<?php
	return ob_get_clean();

}

add_shortcode('display_bloglist','display_blogpost_function');
function display_blogpost_function ( $atts=[], $content =null ) {

	$shortcode_atts = shortcode_atts([
		'id'				=> '',
		'class'			=> '',
		'items'			=> '-1',
		'category'		=> '',
		'limit'			=> ''
	], $atts);
	
	$id 		= $shortcode_atts['id'];
	$class 		= $shortcode_atts['class'];
	$items 		=  $shortcode_atts['items'];
	$category 	=  $shortcode_atts['category'];
	$limit 		=  $shortcode_atts['limit'];

	$args = array(
		'post_type'		=> 'post',
		'post_status'	=> 'publish',
		'orderby'		=> 'date',
		'order'			=> 'DESC',
		'posts_per_page' => $limit, 
	);

	$blog_query = new WP_Query($args);

	ob_start(); ?>
		<div id="blogpost-list" class="blogpost-list-section <?php echo $class;?>">
			<?php while( $blog_query->have_posts()) : $blog_query->the_post() ; ?>
				
				<div class="blog-item">
					<div class="item">
						<div class="blog-img"><?php the_post_thumbnail() ;?></div>
						<div class="blog-info">
							<p class="blog-date"><?php echo get_the_date('d/m/Y');?></p>
							<h2 class="blog-title"><a href="<?php echo get_permalink()?>"><?php echo the_title();?></a></h2>
							<a class="readmore-btn underline-strike" href="<?php echo get_permalink()?>"><span>READ MORE</span></a>
						</div>
						
					</div>
				</div>
			<?php endwhile; wp_reset_postdata();?>
		</div>
	<?php
	return ob_get_clean();

}