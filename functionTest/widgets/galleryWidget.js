/*This widget is based on Galleria  image gallery framework
 * More info in http://galleria.io/
*/
    
    function GalleryWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)
        
        var Autoplay = false //1
        var AutoPlaySpeed = 5000
    	var DataSort = $('#datasort').prop('value')//2
    	var LightBox = false//3
    	var Transition = 'fade' //4
    	var TransitionSpeed = 400//5
      
        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.Autoplay) !== 'undefined') Autoplay = param.Autoplay
                
                if (typeof (param.AutoPlaySpeed) !== 'undefined') AutoPlaySpeed = param.AutoPlaySpeed
                
                if (typeof (param.DataSort) !== 'undefined') DataSort = param.DataSort
                
                if (typeof (param.LightBox) !== 'undefined') LightBox = param.LightBox
                
                if (typeof (param.Transition) !== 'undefined') Transition = param.Transition
                
                if (typeof (param.TransitionSpeed) !== 'undefined') TransitionSpeed = param.TransitionSpeed
                
            }
            
            return '<iframe id="' + this.getId()  +  '" width="100%" height="100%" src="gallery/galleryWidget.html"  frameborder="0"'+
            	   'autostart="'+Autoplay+'" autoplayspeed="'+AutoPlaySpeed+'" datasort="'+DataSort+'" lightbox="'+LightBox+'" '+
            	   'transition="'+Transition+'" transitionspeed="'+TransitionSpeed+'"></iframe>'

        },
        
        this.initElement = function(param){
        		
		},
		
		this.propChange= function (param) {

			for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'Autoplay') Autoplay = param[i].value
				
				if (param[i].prop == 'AutoPlaySpeed') AutoPlaySpeed = param[i].value
				
				if (param[i].prop == 'DataSort') DataSort = param[i].value

				if (param[i].prop == 'LightBox') LightBox = param[i].value
				
				if (param[i].prop == 'Transition') Transition = param[i].value
				
				if (param[i].prop == 'TransitionSpeed') TransitionSpeed = param[i].value

					 //alert('prop '+AutoPlaySpeed)
			}
				
			$('#'+this.getId() ).attr( 'autostart', Autoplay)
        	$('#'+this.getId() ).attr( 'autoplayspeed', AutoPlaySpeed)
        	$('#'+this.getId() ).attr( 'datasort', DataSort)
        	$('#'+this.getId() ).attr( 'lightbox', LightBox)
        	$('#'+this.getId() ).attr( 'transition', Transition)
        	$('#'+this.getId() ).attr( 'transitionspeed', TransitionSpeed)
        	
        	
			
			$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })
			
			this.autoplayParameter()

	    },
	    
	    this.autoplayParameter = function()
        {

            if ((appGlobals.isInDesignMode() == true) && ( Autoplay == true || Autoplay > 0)) 
             
            	$('#'+this.getId()).attr('paramplay','0');

        },
	    
	    this.selectionChanged = function()  {

	    	$('#autoplayGallery').prop('checked', Autoplay)
	    	
	    	$('#autoplayspeed').spinner('value', AutoPlaySpeed)
	    	
	    	$('#datasort').prop('value', DataSort)
	    	
	    	$('#lightbox').prop('value', LightBox)
	    	
	    	$('#transition').prop('value', Transition)
	    	
	    	$('#transitionspeed').spinner('value', TransitionSpeed)
	              
	    	

	    },
	    
	    this.chooseautoPlay = function() {
	    	
	    	$('#autoplaychooser').toggle("fade");
	    		
	    	this.myRegisterUniquePropEvent([ {'prop' : 'Autoplay', 'ov' : Autoplay, 'nv' : $('#autoplayGallery').prop('checked')} ])

	    },
	    
	    this.chooseAutoplaySpeed = function() {
	    	
	    	var ns = $('#autoplayspeed').spinner("value")

			if (ns != null || ns != 0) {

				this.myRegisterUniquePropEvent([ {'prop' : 'AutoPlaySpeed', 'ov' : AutoPlaySpeed, 'nv' : ns} ])

			} else {

				alert("Numbers only and after the number 1")
			}
	    },
	    
	    this.chooseDataSort = function() {
	    	
	    	var newValue = $('#datasort').prop('value')
        	
        	//alert(newValue)
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'DataSort', 'ov': DataSort, 'nv': newValue }])   
	    },
	    
	    this.chooseLightBox = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'LightBox', 'ov' : LightBox, 'nv' : $('#lightbox').prop('checked')} ])
	    },
	    
	    this.chooseTransition = function() {
	    	
	    	var newValue = $('#transition').prop('value')
	    	
	    	//alert(newValue)
	    	
	    	this.myRegisterUniquePropEvent( [{ 'prop': 'Transition', 'ov': Transition, 'nv': newValue }])  
	    	
	    },
	    
	    this.chooseTransitionSpeed = function() {
	    	
	    	var ns = $('#transitionspeed').spinner("value")

			if (ns != null || ns != 0) {

				this.myRegisterUniquePropEvent([ {'prop' : 'TransitionSpeed', 'ov' : TransitionSpeed, 'nv' : ns} ])

			} else {

				alert("Numbers only and after the number 1")
			}
	    	
	    },

        this.createJSON = function() {

            return { 'Autoplay': Autoplay, 'AutoPlaySpeed': AutoPlaySpeed, 'DataSort': DataSort, 'LightBox': LightBox, 'Transition': Transition, 'TransitionSpeed': TransitionSpeed }

        }
        
      
        
    }

// static variables/functions

GalleryWidget.init = function () {
    $("#galleryMenu").append("<br>Autoplay<input type='checkbox' id='autoplayGallery' name='autoplayGallery' value='' onclick='appGlobals.currentObject().chooseautoPlay()'>")
    $("#galleryMenu").append("<div id='autoplaychooser' style='display:none;'>Choose the speed of autoplay<input type='edit' id='autoplayspeed' name='autoplayspeed' value='5000'></div>")
    $("#autoplayspeed").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().chooseAutoplaySpeed() } })
    $("#galleryMenu").append("<div>Sorting the images in random order<select id='datasort' onchange='appGlobals.currentObject().chooseDataSort()'>"+
    		"<option value='false'>No</option>"+
    		"<option value='random'>Yes</option>"+
    		"</select></div>")
    $("#galleryMenu").append("See the images in lightbox<input type='checkbox' id='lightbox' name='lightbox' value='' onclick='appGlobals.currentObject().chooseLightBox()'>")
    $("#galleryMenu").append("<div>Choose a transition effect for displaying the images<select id='transition' onchange='appGlobals.currentObject().chooseTransition()'>"+
    		"<option value='fade'>fade</option>"+
    		"<option value='flash'>flash</option>"+
    		"<option value='pulse'>pulse</option>"+
    		"<option value='slide'>slide</option>"+
    		"<option value='fadeslide'>fadeslide</option>"+
    		"</select></div>")
    $("#galleryMenu").append("Choose the speed of transition<input type='edit' id='transitionspeed' name='transitionspeed' value='400'>")
    $("#transitionspeed").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().chooseTransitionSpeed() } })
}
GalleryWidget.buttomImage='images/button_icon.png'
GalleryWidget.typeId= 'gallery'
GalleryWidget.myClass= 'widget_gallery'
GalleryWidget.initialWidth='620'
GalleryWidget.initialHeight= '320'
GalleryWidget.actionsSectionId='galleryMenu'
