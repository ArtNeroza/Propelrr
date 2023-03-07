<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package exam_theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'exam_theme' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="row">
			<div class="site-branding">
				<?php the_custom_logo(); ?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'exam_theme' ); ?></button>
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary-menu',
						'menu_id'        => 'primary-menu',
					)
				);
				?>
			</nav><!-- #site-navigation -->
			<div class="header-info">
				<div class="currency-switcher paid-woocommerce-plugin">
					<select>
						<option value="USD">USD</option>
						<option value="PHP">PHP</option>
					</select>
				</div>
				<div class="header-search-form">
					<div class="search-form">
					<form action="/" method="get">
					    <input type="text" name="s" id="search" placeholder="SEARCH" value="<?php the_search_query(); ?>" />
					    <input type="image" alt="Search" class="search-submit" src="<?php echo get_template_directory_uri()?>/assets/images/search-icon.png" />
					</form>
				</div>
				</div>
			</div>
		</div>
	</header><!-- #masthead -->
