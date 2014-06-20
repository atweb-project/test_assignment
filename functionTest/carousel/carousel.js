/**
 * Carousel call
 */
$(function() {
	
	//Lets get the global variables
	Vertical = parent.Vertical;
	slidesToShow = parent.slidesToShow;
	slidesToScroll = parent.slidesToScroll;
	autoStart = parent.autoStart;
	autoplaySpeed = parent.autoplaySpeed;
	dots = parent.dots;
	
	allowPlay = $(window.frameElement).attr('paramplay');
	//alert(allowPlay)
	
	function AutoPlay(){
		if (autoStart == true && allowPlay == 0 ) {
			
			$('.responsive').slickPause()
		
		}
	}

	//Initialization of Carousel 
	$('.responsive').slick({
		slidesToShow : slidesToShow,//number of slides to show
		slidesToScroll : slidesToScroll,//number of slides to scroll each time
		autoplay : autoStart,//autoplay
		autoplaySpeed : autoplaySpeed,//speed of autoplay
		draggable : false,
		vertical : Vertical,//Direction of carousel
		dots : dots, //Dot navigation
		onInit : function() {
			if (Vertical == true) {
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