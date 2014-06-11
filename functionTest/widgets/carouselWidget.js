

    
    function CarouselWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

       var Direction = 'vertical'

        this.createElement= function (param) {

            var buttonText = 'Button!'


            if (typeof (param) !== 'undefined') {

                if (typeof (param.text) !== 'undefined') buttonText = param.text

            }
            
      /*    if(Direction = 'vertical'){
            	return'<div id="' + this.getId()  +  '" width="100%" height="100%" class="flexslider"><ul class="slides">'+
         	   '<li><div><img src="images/carousel/slide1.jpg" /></div><div><img src="images/carousel/slide2.jpg" /></div>'+
        	   '<div><img src="images/carousel/slide3.jpg" /></div><div><img src="images/carousel/slide4.jpg" /></div></li>'+
         	  '<li><div><img src="images/carousel/slide1.jpg" /></div><div><img src="images/carousel/slide2.jpg" /></div>'+
       	   '<div><img src="images/carousel/slide3.jpg" /></div><div><img src="images/carousel/slide4.jpg" /></div></li></ul></div>'
            }*/
           
          /*  return '<div id="' + this.getId()  +  '" width="100%" height="100%" class="flexslider"><ul class="slides">'+
            	   '<li><img src="images/carousel/slide1.jpg" /></li><li><img src="images/carousel/slide2.jpg" /></li>'+
            	   '<li><img src="images/carousel/slide3.jpg" /></li><li><img src="images/carousel/slide4.jpg" /></li></ul></div>'*/
            
            return '<div id="' + this.getId()  +  '" class="slideshow" data-cycle-fx=carousel data-cycle-timeout=1000>'+
            	   '<img src="images/carousel/slide1.jpg" />'+
            	   '<img src="images/carousel/slide2.jpg" />'+
            	   '<img src="images/carousel/slide3.jpg" />'+
            	   '<img src="images/carousel/slide4.jpg" />'+
            	   '</div><div class="center"><a href="#" id="prev4"><< Prev </a><a href="#" id="next4"> Next >> </a></div>'

        },
        
        this.initElement = function(param){
        	//var flexslider;
        	//if( (appGlobals.isInDesignMode() == false)) 	
        	/*$('.flexslider').flexslider({
        		animation: "slide",
        	    animationLoop: false,
        		//itemWidth: 150,
        	    //itemMargin: 5,
        	   minItems: 2, //one condition
        	   maxItems: 2,  //second condition
        	    direction: Direction,
        	    slideshow: false
        	    /*start: function(flexslider){
        	    	 if (flexslider.vars.direction == "vertical"){
        	    		 //alert('yes')
        	    		 //$('.flex-direction-nav').css('transform', 'rotate(90deg)');
        	    		 //$('.flex-prev:hover').css('left', '135px!important');
        	    		// $('.flex-next').css('transform', 'rotate(90deg)');
        	    	 }
        	    },*/
        	    //controlNav: "thumbnails"
        	
        	//});
        	
        	//Cycle2 carousel
        	$( '.slideshow' ).cycle({
        		next:"#next4",
        		prev:"#prev4",
        		//carouselSlideDimension:"400",
        		//carouselFluid: true,
        		//carouselVisible: 2
        		//carouselVertical:true
        		//autoHeight: "400:270"
        	});

		},

        this.createJSON = function() {

            return { 'text': $('#'+ this.getId() ).html() }

        },
        
        this.changeLabel= function()
         {

         //  alert ("button clicked")
           // alert (  ' currentId '+currentID+" texregisterUniquePropEventt "+ $('#newButtonText').prop('value') )

            this.myRegisterUniquePropEvent( [{ 'prop': 'text', 'ov': $('#' + this.getId()  ).html(), 'nv': $('#newButtonText').prop('value') }])
             

        },

        this.propChange= function (param) {

           // alert ("button prop change "+this.getId()+" param "+param.length)

            $('#' + this.getId() ).html(param[0].value)

        }


        ,

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

            $('#newButtonText').prop('value', $('#' + this.getId()  ).html())
              

         }
        
    }

// static variables/functions

CarouselWidget.init = function () {
    $("#carouselMenu").append("  Text:<input type='text' id='newButtonText'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>")
}
CarouselWidget.buttomImage='images/button_icon.png'
CarouselWidget.typeId= 'carousel'
CarouselWidget.myClass= 'widget_carousel'
CarouselWidget.initialWidth='400'
CarouselWidget.initialHeight= '270'
CarouselWidget.actionsSectionId='carouselMenu'

