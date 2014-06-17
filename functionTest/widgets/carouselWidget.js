

    
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
                
              alert('param '+param.autoStart)

            }
				
          /* return '<div id="' + this.getId()  +  '" style="width:100%;height:100%;">'+
           		  '<div class="responsive" >'+
           		  '<div><div class="image"><img src="carousel/img/lazyfonz1.png"/></div></div>'+
           		  '<div><div class="image"><img src="carousel/img/lazyfonz2.png"/></div></div>'+
           		  '<div><div class="image"><img src="carousel/img/lazyfonz3.png"/></div></div>'+
           		  '<div><div class="image"><img src="carousel/img/lazyfonz4.png"/></div></div>'+
           		  '<div><div class="image"><img src="carousel/img/lazyfonz5.png"/></div></div>'+
           		  '<div><div class="image"><img src="carousel/img/lazyfonz6.png"/></div></div>'+
           		  '</div></div>'*/
            
            return '<iframe id="' + this.getId()  +  '" width="100%" height="100%" src="carousel/carouselWidget.html" frameborder="0"'+
            		'Vertical="'+Vertical+'" slidesToShow="'+slidesToShow+'" slidesToScroll="'+slidesToScroll+'" autoStart="'+autoStart+'" autoplaySpeed="'+autoplaySpeed+'" dots="'+dots+'"></iframe><div>'
					
        },
        
        this.initElement = function(param){
        	      	
        /*	 $('.responsive').slick({
        	       slidesToShow: slidesToShow,
        	       slidesToScroll: slidesToScroll,
        	       autoplay: autoplay,
        	       autoplaySpeed: autoplaySpeed,
        	       draggable: false,
        	       vertical: Vertical,
        	       dots: dots,
        	       responsive: [
        	    {
        	      breakpoint: 1024,
        	      settings: {
        	        slidesToShow: slidesToShow,
        	        slidesToScroll: slidesToScroll,
        	        infinite: true,
        	        dots: dots,
        	        draggable: false,
        	        vertical: Vertical
        	      }
        	    },
        	    {
        	      breakpoint: 600,
        	      settings: {
        	        slidesToShow: slidesToShow,
        	        slidesToScroll: slidesToScroll,
        	        draggable: false,
        	        dots: dots,
        	        vertical: Vertical
        	      }
        	    },
        	    {
        	      breakpoint: 480,
        	      settings: {
        	        slidesToShow: slidesToShow,
        	        slidesToScroll: slidesToScroll,
        	        draggable: false,
        	        dots: dots,
        	        vertical: Vertical
        	      }
        	    }
        	  ]
        	    });*/
        	alert('init'+autoStart)
		},

        this.propChange = function (param) {

			for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'Vertical') Vertical = param[i].value
				
				if (param[i].prop == 'slidesToShow') slidesToShow = param[i].value

				if (param[i].prop == 'slidesToScroll') slidesToScroll = param[i].value
				
				if (param[i].prop == 'autoStart') autoStart = param[i].value
				
				if (param[i].prop == 'autoplaySpeed') autoplaySpeed = param[i].value

				if (param[i].prop == 'dots') dots = param[i].value

					 alert('prop '+autoStart)
			}
			
			$('#'+this.getId() ).attr( 'Vertical', Vertical);
       	 	$('#'+this.getId() ).attr( 'slidesToShow', slidesToShow);
       	 	$('#'+this.getId() ).attr( 'slidesToScroll', slidesToScroll);
    	 	$('#'+this.getId() ).attr( 'autoStart', autoStart);
    	 	$('#'+this.getId() ).attr( 'autoplaySpeed', autoplaySpeed);
       	 	$('#'+this.getId() ).attr( 'dots', dots);
       	 
       	 	$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });

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
	    	   alert ("json autoplay " + autoStart )

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

