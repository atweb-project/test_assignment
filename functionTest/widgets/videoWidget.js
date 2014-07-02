/*
 * This widget is based on the jQuery Media Plugin, 
 * http://malsup.com/jquery/media
 */

    
    function VideoWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      var url = "http://malsup.github.com/video/simpsons.mov"


      var AutoPLay = false
      var FullScreen = true
      var startVolume = 0.8
      var Loop = false
     
      

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

            	if ( typeof (param.url) !== 'undefined') url = param.url
            	if ( typeof (param.AutoPLay) !== 'undefined') AutoPLay = param.AutoPLay
            	if ( typeof (param.FullScreen) !== 'undefined') FullScreen = param.FullScreen
            	if ( typeof (param.startVolume) !== 'undefined') startVolume = param.startVolume
            	if ( typeof (param.Loop) !== 'undefined') Loop = param.Loop
           	

            }

           
            return '<iframe style="width: 100%; height: 100%;" id="' + this.getId() + '" src="embedded-player/videoWidget.html" frameborder="0" '+
             	   'allowfullscreen="true" autostart="'+AutoPLay+'" videofullscreen="'+FullScreen+'" volume="'+startVolume+'" '+
             	   'loop="'+Loop+'" ></iframe>'

        },
        
        this.initElement = function(param){
        	//if( appGlobals.isInDesignMode() == false)
        	//alert('init '+AutoPLay)
        	//$('video,audio').mediaelementplayer(/* Options */);
        	
        	

		},
		
		this.autoPlayparam = function() {
				
			 if ((appGlobals.isInDesignMode() == true) && ( AutoPLay == true)) 
	             
	            	$('#'+this.getId()).attr('paramplay','0');
		},
		
		//For YouTube
		
		/*this.autoPlayparamYoutube = function() {
			
			if( (appGlobals.isInDesignMode() == false) && (AutoPLay == true)) return '&autoplay=1'
			
			return ''
			
		},*/
		

        this.createJSON = function() {

            return { 'url': url, 'AutoPLay':AutoPLay, 'FullScreen': FullScreen,'startVolume': startVolume,'Loop': Loop}

        },
        
        this.changeURL= function()
         {

            this.myRegisterUniquePropEvent( [{ 'prop': 'url', 'ov': url, 'nv': $('#newvideoURLText').prop('value') }])
             
        },
        
        this.changAutoplay = function() {
        	
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'AutoPLay', 'ov': AutoPLay, 'nv': $('#autoplayPlayer').prop('checked') }])
        	
        },
        
        this.changeFullscreen = function() {
        	
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'FullScreen', 'ov': FullScreen, 'nv': $('#allowfullscreen').prop('checked') }])
        	
        },
        
        this.changeVolume = function() {
        	
        	var ns = $('#volume').spinner("value")

			if (ns != null) {
				//alert(ns)
						
				this.myRegisterUniquePropEvent([ {'prop' : 'startVolume', 'ov' : startVolume, 'nv' : ns} ])
				

			} else {

				alert("Numbers only")
			}
        	
        },
        
        this.selectLoop = function() {
        	
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'Loop', 'ov': Loop, 'nv': $('#allowloop').prop('checked') }])
        	
        },
        
        this.propChange= function (param) {

           // alert ("button prop change "+this.getId()+" param "+param.length)

        	 for (var i = 0; i < param.length; i++) {

                 if (param[i].prop == 'url') url=  param[i].value 
                   
                 if (param[i].prop == 'AutoPLay') AutoPLay = param[i].value
                 
                 if (param[i].prop == 'FullScreen') FullScreen = param[i].value
                 
                 if (param[i].prop == 'startVolume') startVolume = param[i].value
                 
                 if (param[i].prop == 'Loop') Loop = param[i].value
                 

             }
        	 
        	 $('#'+this.getId() ).attr( 'autostart', AutoPLay)
        	 $('#'+this.getId() ).attr( 'videofullscreen', FullScreen)
        	 $('#'+this.getId() ).attr( 'volume', startVolume)
        	 $('#'+this.getId() ).attr( 'loop', Loop)
        	 
        	 $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })
        	 
        	 this.autoPlayparam()

        },

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

            $('#newvideoURLText').prop('value', url)
            $('#autoplayPlayer').prop('checked', AutoPLay )
            $('#allowfullscreen').prop('checked', FullScreen )
            $('#volume').spinner('value', startVolume)
            $('#allowloop').prop('checked', Loop )


         }
        
    }

// static variables/functions

    VideoWidget.init = function () {
    	$("#videoMenu").append("URL<br><input type='text' id='newvideoURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")
    	$("#videoMenu").append("<br>Autoplay<input type='checkbox' id='autoplayPlayer' name='autoplay' value='' onclick='appGlobals.currentObject().changAutoplay()'>")
    	$("#videoMenu").append("<br>Allow Fullscreen<input type='checkbox' id='allowfullscreen' name='' value='' onclick='appGlobals.currentObject().changeFullscreen()'>")
    	$("#videoMenu").append("<br>Choose volume start <input type='edit' id='volume' name='volume' value='' >")
        $("#volume").spinner({ min: 0.8, max: 1, step: 0.01, numberFormat: "n", change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeVolume() } })
        $("#videoMenu").append("<br>Allow Loop<input type='checkbox' id='allowloop' name='' value='' onclick='appGlobals.currentObject().selectLoop()'>")
        $("#videoMenu").append("<br>Choose Audio<input type='checkbox' id='audioinput' name='' value='' onclick='appGlobals.currentObject().selectAudio()'>")
        $("#videoMenu").append("<div id='audiosource' style='display:none;'>Audio Url<br><input type='text' id='newaudioURLText'><button onclick='appGlobals.currentObject().changeAudioURL()'>Update</button>")
}
VideoWidget.buttomImage='images/button_icon.png'
VideoWidget.typeId= 'video'
VideoWidget.myClass= 'widget_video'
VideoWidget.initialWidth='480'
VideoWidget.initialHeight= '270'
VideoWidget.actionsSectionId='videoMenu'

