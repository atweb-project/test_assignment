/*This widget is based on Slick carousel plugin
 * More info in http://kenwheeler.github.io/slick/
*/
   
    function CarouselWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var Vertical = false
        var slidesToShow = 3
        var slidesToScroll = 3
        var autoStart = false
        var autoplaySpeed = 3000
        var dots = false
        
        
        this.createElement = function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.Vertical) !== 'undefined') Vertical = param.Vertical
                
                if (typeof (param.slidesToShow) !== 'undefined') slidesToShow = param.slidesToShow
                
                if (typeof (param.slidesToScroll) !== 'undefined') slidesToScroll = param.slidesToScroll
                
                if (typeof (param.autoStart) !== 'undefined') autoStart = param.autoStart
                
                if (typeof (param.autoplaySpeed) !== 'undefined') autoplaySpeed = param.autoplaySpeed
                
                if (typeof (param.dots) !== 'undefined') dots = param.dots
                
              //alert('param '+param.autoStart)

            }
            
            return '<iframe id="' + this.getId()  +  '" width="100%" height="100%" src="carousel/carouselWidget.html" frameborder="0"'+
            	   'vertical="'+Vertical+'" slidestoshow="'+slidesToShow+'" slidestoscroll="'+slidesToScroll+'"'+
            	   'autostart="'+autoStart+'" autoplayspeed="'+autoplaySpeed+'" dots="'+dots+'"></iframe>'
					
        },
        
        this.initElement = function(param){

		},

        this.propChange = function (param) {

			for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'Vertical') Vertical = param[i].value
				
				if (param[i].prop == 'slidesToShow') slidesToShow = param[i].value

				if (param[i].prop == 'slidesToScroll') slidesToScroll = param[i].value
				
				if (param[i].prop == 'autoStart') autoStart = param[i].value
				
				if (param[i].prop == 'autoplaySpeed') autoplaySpeed = param[i].value

				if (param[i].prop == 'dots') dots = param[i].value

					// alert('prop '+autoStart)
			}
			
			if(Vertical == true){
				// for vertical direction we change the dimensions of the
				// container
				$('.elementContainer').css({
					width:'135',
					height: '345'					
				})
				
			}
			
			$('#'+this.getId() ).attr( 'vertical', Vertical)
        	$('#'+this.getId() ).attr( 'slidestoshow', slidesToShow)
        	$('#'+this.getId() ).attr( 'slidestoscroll', slidesToScroll)
        	$('#'+this.getId() ).attr( 'autostart', autoStart)
        	$('#'+this.getId() ).attr( 'autoplayspeed', autoplaySpeed)
        	$('#'+this.getId() ).attr( 'dots', dots)
						
       	 	$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });
			 
			this.autoplayParameter()
       	 
        },
        
        this.autoplayParameter = function()
        {

            if ((appGlobals.isInDesignMode() == true) && ( autoStart == true )) 
             
            	$('#'+this.getId()).attr('paramplay','0');

        },

        this.selectionChanged = function()  {

        	$('#Vertical').prop('checked', Vertical)
			
			$('#slidesToShow').spinner('value', slidesToShow)

			$('#slidesToScroll').spinner('value', slidesToScroll)
			
			$('#autoplayCarousel').prop('checked', autoStart)
			
			$('#autoplaySpeed').spinner('value', autoplaySpeed)

			$('#dots').prop('checked', dots)
			              
         },
         
        this.chooseDirection = function() {

        	 this.myRegisterUniquePropEvent([ {'prop' : 'Vertical', 'ov' : Vertical, 'nv' : $('#Vertical').prop('checked')} ])
             
        },
        
        this.chooseslidesToShow = function() {

			var ns = $('#slidesToShow').spinner("value")

			if (ns != null || ns != 0) {

				this.myRegisterUniquePropEvent([ {'prop' : 'slidesToShow', 'ov' : slidesToShow, 'nv' : ns} ])

			} else {

				alert("Numbers only and after the number 1")
			}

		},
		
		this.chooseslidesToScroll = function() {

			var ns = $('#slidesToScroll').spinner("value")

			if (ns != null || ns != 0) {

				this.myRegisterUniquePropEvent([ {'prop' : 'slidesToScroll', 'ov' : slidesToScroll, 'nv' : ns} ])

			} else {

				alert("Numbers only and after the number 1")
			}

		},
		
		this.chooseAutoplay = function() {

       	 this.myRegisterUniquePropEvent([ {'prop' : 'autoStart', 'ov' : autoStart, 'nv' : $('#autoplayCarousel').prop('checked')} ])
            
       },
       
       this.chooseautoplaySpeed = function() {

			var ns = $('#autoplaySpeed').spinner("value")

			if (ns != null || ns != 0) {

				this.myRegisterUniquePropEvent([ {'prop' : 'autoplaySpeed', 'ov' : autoplaySpeed, 'nv' : ns} ])

			} else {

				alert("Numbers only and after the number 1")
			}

		},
		
		this.chooseDots = function() {

	       	 this.myRegisterUniquePropEvent([ {'prop' : 'dots', 'ov' : dots, 'nv' : $('#dots').prop('checked')} ])
	            
	       },
         
         this.createJSON = function() {
	    	  // alert ("json autoplay " + autoStart )

             return { 'Vertical': Vertical, 'slidesToShow': slidesToShow, 'slidesToScroll': slidesToScroll, 'autoStart': autoStart, 'autoplaySpeed': autoplaySpeed, 'dots': dots}

         }
         
                 
    }

// static variables/functions

CarouselWidget.init = function () {
	$("#carouselMenu").append("<br>Choose direction of the carousel(horizontal or vertical, default is horizontal)<input type='checkbox' id='Vertical' name='Vertical' value='' onclick='appGlobals.currentObject().chooseDirection()'>")
	$("#carouselMenu").append("<br>How many slides to show<input type='edit' id='slidesToShow' name='slidesToShow' value='3' >")
    $("#slidesToShow").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().chooseslidesToShow() } })
	$("#carouselMenu").append("<br>How many slides to scroll<input type='edit' id='slidesToScroll' name='slidesToScroll' value='3' >")
    $("#slidesToScroll").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().chooseslidesToScroll() } })
	$("#carouselMenu").append("<br>Autoplay<input type='checkbox' id='autoplayCarousel' name='autoStart' value='' onclick='appGlobals.currentObject().chooseAutoplay()'>")
	$("#carouselMenu").append("<br>Choose the speed of autoplay<input type='edit' id='autoplaySpeed' name='autoplaySpeed' value='3000' >")
    $("#autoplaySpeed").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().chooseautoplaySpeed() } })
	$("#carouselMenu").append("<br>Allow dots as navigation<input type='checkbox' id='dots' name='dots' value='' onclick='appGlobals.currentObject().chooseDots()'>")
}

CarouselWidget.buttomImage='images/button_icon.png'
CarouselWidget.typeId= 'carousel'
CarouselWidget.myClass= 'widget_carousel'
CarouselWidget.initialWidth='520'
CarouselWidget.initialHeight= '250'
CarouselWidget.actionsSectionId='carouselMenu'

