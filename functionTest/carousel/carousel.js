/**
 * Carousel call
 */
$(function() {
	
	//Lets get the global variables
	var Vertical = $(window.frameElement).attr('vertical');
	var slidesToShow = parseInt($(window.frameElement).attr('slidestoshow'));
	var slidesToScroll = parseInt($(window.frameElement).attr('slidestoscroll'));
	var autoStart = $(window.frameElement).attr('autostart');
	var autoplaySpeed = parseInt($(window.frameElement).attr('autoplayspeed'));
	var dots = $(window.frameElement).attr('dots');
	
	var allowPlay = $(window.frameElement).attr('paramplay');
	//alert(allowPlay)
	
	function VerticalValue() {
		if (Vertical == 'false') {
			Direction = false
		} else {
			Direction = true
		}
	}
	
	function AutoplayValue() {
		if (autoStart == 'false') {
			Play = false
		} else {
			Play = true
		}
	}
	
	function DotsValue() {
		if (dots == 'false') {
			Dotsv = false
		} else {
			Dotsv = true
		}
	}
	
	function AutoPlay(){
		if (autoStart == 'true' && allowPlay == 0 ) {
			
			$('.responsive').slickPause()
		
		}
	}
	
	VerticalValue()
	
	AutoplayValue()
	
	DotsValue()
	
	//Initialization of Carousel 
	$('.responsive').slick({
		slidesToShow : slidesToShow,//number of slides to show
		slidesToScroll : slidesToScroll,//number of slides to scroll each time
		autoplay : Play,//autoplay
		autoplaySpeed : autoplaySpeed,//speed of autoplay
		draggable : false,
		vertical : Direction,//Direction of carousel
		dots : Dotsv, //Dot navigation
		onInit : function() {
			if (Direction == true) {
						//for vertical direction we rearrange the navigation arrows and the navigation dots
				$('.slick-prev').css({
					position : 'fixed',
					left : '50%',
					top : '3%',
					margin : '-5px -10px',
					transform : 'rotate(90deg)'
				})

				$('.slick-next').css({
					right : '50%',
					top : '100%',
					margin : '0px -10px',
					transform : 'rotate(90deg)'
				})
				
				$('.slick-dots').css({
					bottom : '-65px'
				})
			}
		}

	});

	//Let's pause the carousel in design mode
	AutoPlay()

});