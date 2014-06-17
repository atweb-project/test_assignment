/**
 * 
 */
$(document).ready(function(){
    	
       Vertical = $(window.frameElement).attr('Vertical');
       slidesToShow = $(window.frameElement).attr('slidesToShow');
       slidesToScroll = $(window.frameElement).attr('slidesToScroll');
       autoStart = $(window.frameElement).attr('autoStart');
       autoplaySpeed = $(window.frameElement).attr('autoplaySpeed');
       dots = $(window.frameElement).attr('dots');
       alert('iframe '+autoStart);
       alert('and '+dots);
       
       
   /* $('.responsive').slick({
        	       slidesToShow: slidesToShow,
        	       slidesToScroll: slidesToScroll,
        	       autoplay: autoplay == false ? 1 : 0,
        	       autoplaySpeed: autoplaySpeed,
        	       draggable: false,
        	       vertical: Vertical == false ? 1 : 0,
        	       dots: dots == false ? 1 : 0,
        	       responsive: [
        	    {
        	      breakpoint: 1024,
        	      settings: {
        	        slidesToShow: slidesToShow,
        	        slidesToScroll: slidesToScroll,
        	        infinite: true,
        	        dots: dots == false ? 1 : 0,
        	        draggable: false,
        	        vertical: Vertical == false ? 1 : 0
        	      }
        	    },
        	    {
        	      breakpoint: 600,
        	      settings: {
        	        slidesToShow: slidesToShow,
        	        slidesToScroll: slidesToScroll,
        	        draggable: false,
        	        dots: dots == false ? 1 : 0,
        	        vertical: Vertical == false ? 1 : 0
        	      }
        	    },
        	    {
        	      breakpoint: 480,
        	      settings: {
        	        slidesToShow: slidesToShow,
        	        slidesToScroll: slidesToScroll,
        	        draggable: false,
        	        dots: dots == false ? 1 : 0,
        	        vertical: Vertical == false ? 1 : 0
        	      }
        	    }
        	  ]
        	    });*/
        	   
       $('.responsive').slick({
       slidesToShow: slidesToShow,
       slidesToScroll: slidesToScroll,
       draggable: false,
       autoplay: autoStart,
       autoplaySpeed: 2000,
       vertical: false,
       responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        draggable: false,
        autoplay: autoStart,
        infinite: true,
        dots: 'dots',
        vertical: false
      }
    
    }
  ]
    });
    
});