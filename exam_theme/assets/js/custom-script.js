/* global wp, jQuery */
/**
 * File custom-scripts.js.
 *
 * Theme Custom Scripts enhancements for a better user experience.
 *
 */
var $ = jQuery.noConflict();

( function( $ ) {


    /* CHECK THE DIMENSION OF USER'S BROWSER*/
    var browserWidth = document.documentElement.offsetWidth;
    responsiveStyle(browserWidth);
    window.addEventListener('resize', function() {
        var browserWidth = document.documentElement.offsetWidth;
        responsiveStyle(browserWidth);

    });            

    /* HEADER CAROUSEL */
    $('#sliding-banner').owlCarousel({
        loop: true,
        nav: true,
        navText : ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
        items: 1,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true     
    })

    /* NEW PRODUCTS CAROUSEL */
    $('#sliding-product').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        navText : ["<span class='nav-left'></span>", "<span class='nav-right'></span>"],
        responsive:{
            0:{
                items:1
            },
            600: {
                items: 2,
            },
            991:{
                items:3,
                autoWidth:true,
            }
        }
    });

    /* NEW PRODUCTS NAVIGATION */
    $('.newproducts-nav--left').click(function (e) { 
        e.preventDefault();
        $('.product-carousel').trigger('prev.owl.carousel');
    });
    $('.newproducts-nav--right').click(function (e) { 
        e.preventDefault();
        $('.product-carousel').trigger('next.owl.carousel');
    });
    

    /* SIDEBAR TRANSITION */
    $('#navburger, #sidebarburger').click(function (e) { 
        e.preventDefault();

        if($(this).hasClass('hamburger--open')) {
            $('#navburger, #sidebarburger').removeClass('hamburger--open');
            $('.sdbr').removeClass('sdbr--open');
            $('.sdbr-overlay').removeClass('sdbr-overlay--open');      
            $('body').removeClass('body-overflow');       
        } else {
            $('#navburger, #sidebarburger').addClass('hamburger--open');
            $('.sdbr').addClass('sdbr--open');
            $('.sdbr-overlay').addClass('sdbr-overlay--open');       
            $('body').addClass('body-overflow');       

        }

    });

    /* SIDEBAR OVERLAY */
    $('.sdbr-overlay').click(function(e){
        e.preventDefault();
        $('#navburger, #sidebarburger').removeClass('hamburger--open');
        $('.sdbr').removeClass('sdbr--open');
        $('.sdbr-overlay').removeClass('sdbr-overlay--open'); 
        $('body').removeClass('body-overflow');       

    });

    /* SIDEBAR DROPDOWN */
    $('#sdbrcaret').click(function (e) { 
        e.preventDefault();
        
        var targetUl = $(this).attr('data-dropdown');

        if($('#'+targetUl).hasClass('sdbr-dropdown--open')) {
            $('#'+targetUl).removeClass('sdbr-dropdown--open');
        } else {
            $('#'+targetUl).addClass('sdbr-dropdown--open');
        }

    });


    /* FUNCTION TO CHANGE THE STYLE BASED ON THE WIDTH OF BROWSER */
	function responsiveStyle(widthValue) {

	    mainCardWidth = widthValue * 0.5;
	    otherCardWidth = widthValue * 0.25;

	    if( widthValue <= 991) {
	        $('.product-carousel .item').removeAttr("style");
	        $('.product-carousel .item-highlight').removeAttr("style");
	    } else {
	        $('.product-carousel .item').css('width', otherCardWidth);
	        $('.product-carousel .item-highlight').css("width", mainCardWidth);         
	        
	        $('#navburger, #sidebarburger').removeClass('hamburger--open');
	        $('.sdbr').removeClass('sdbr--open');
	        $('.sdbr-overlay').removeClass('sdbr-overlay--open');      
	        $('body').removeClass('body-overflow');          
	    }
	    
	    $('.product-carousel').trigger('refresh.owl.carousel');
	    

	}

}( jQuery ) );
