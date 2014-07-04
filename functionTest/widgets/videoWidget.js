/*
 * This widget is based on the MediaElement.js API, 
 * http://mediaelementjs.com/
 */

    
    function VideoWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      var url = "media/echo-hereweare.mp4"
      var urlIE = "media/echo-hereweare.webm"
      var urlOGG = "media/echo-hereweare.ogv"
      var PosTer = "media/echo-hereweare.jpg"
      var AutoPLay = false
      var FullScreen = true
      var startVolume = 0.8
      var Loop = false
     
      

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

            	if ( typeof (param.url) !== 'undefined') url = param.url
            	if ( typeof (param.urlIE) !== 'undefined') urlIE = param.urlIE
            	if ( typeof (param.urlOGG) !== 'undefined') urlOGG = param.urlOGG
            	if ( typeof (param.PosTer) !== 'undefined') PosTer = param.PosTer
            	if ( typeof (param.AutoPLay) !== 'undefined') AutoPLay = param.AutoPLay
            	if ( typeof (param.FullScreen) !== 'undefined') FullScreen = param.FullScreen
            	if ( typeof (param.startVolume) !== 'undefined') startVolume = param.startVolume
            	if ( typeof (param.Loop) !== 'undefined') Loop = param.Loop
           	

            }

           
            return '<iframe width="100%" height="100%" id="' + this.getId() + '" src="embedded-player/videoWidget.html" frameborder="0" '+
             	   'allowfullscreen="true" webkitAllowFullScreen="true" mozallowfullscreen="true" autostart="'+AutoPLay+'" videofullscreen="'+FullScreen+'" '+
             	   'volume="'+startVolume+'" loop="'+Loop+'" url="'+url+'" urlie="'+urlIE+'" urlogg ="'+urlOGG+'" poster="'+PosTer+'"></iframe>'

        },
        
        this.initElement = function(param){

		},
		
		this.autoPlayparam = function() {
				
			 if ((appGlobals.isInDesignMode() == true) && ( AutoPLay == true)) 
	             
	            	$('#'+this.getId()).attr('paramplay','0');
		},
		       
        this.changeURLVideo = function() {
			
            this.myRegisterUniquePropEvent( [{ 'prop': 'url', 'ov': url, 'nv': $('#newvideoURLText').prop('value') }])
                         
        },
        
        this.changeURLIE = function() {
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'urlIE', 'ov': urlIE, 'nv': $('#newvideoURLIEText').prop('value') }])
        
        },   
        
        this.changeURLOGG = function() {
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'urlOGG', 'ov': urlOGG, 'nv': $('#newvideoURLOGGText').prop('value') }])
        
        }, 
        
        this.choosePoster = function() {
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'PosTer', 'ov': PosTer, 'nv': $('#PosTer').prop('value') }])
        
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

                 if (param[i].prop == 'url') url =  param[i].value 
                 
                 if (param[i].prop == 'urlIE') urlIE =  param[i].value 
                 
                 if (param[i].prop == 'urlOGG') urlOGG =  param[i].value 
                 
                 if (param[i].prop == 'PosTer') PosTer =  param[i].value
                   
                 if (param[i].prop == 'AutoPLay') AutoPLay = param[i].value
                 
                 if (param[i].prop == 'FullScreen') FullScreen = param[i].value
                 
                 if (param[i].prop == 'startVolume') startVolume = param[i].value
                 
                 if (param[i].prop == 'Loop') Loop = param[i].value
                 

             }
        	 
        	 $('#'+this.getId() ).attr( 'url', url)
        	 $('#'+this.getId() ).attr( 'urlie', urlIE)
        	 $('#'+this.getId() ).attr( 'urlogg', urlOGG)
        	 $('#'+this.getId() ).attr( 'poster', PosTer)    	 
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
            $('#newvideoURLIEText').prop('value', urlIE)
            $('#newvideoURLOGGText').prop('value', urlOGG)
            $('#PosTer').prop('value', PosTer)
            $('#autoplayPlayer').prop('checked', AutoPLay )
            $('#allowfullscreen').prop('checked', FullScreen )
            $('#volume').spinner('value', startVolume)
            $('#allowloop').prop('checked', Loop )


        },
         
        this.createJSON = function() {

             return { 'url': url, 'urlIE': urlIE,'urlOGG': urlOGG,'PosTer': PosTer, 'AutoPLay':AutoPLay, 'FullScreen': FullScreen,'startVolume': startVolume,'Loop': Loop}

        }
        
    }

// static variables/functions

    VideoWidget.init = function () {
    	$("#videoMenu").append("Mp4 URL<br><input type='text' id='newvideoURLText'><button onclick='appGlobals.currentObject().changeURLVideo()'>Update</button>")
    	$("#videoMenu").append("<br>Webm URL<br><input type='text' id='newvideoURLIEText'><button onclick='appGlobals.currentObject().changeURLIE()'>Update</button>")
    	$("#videoMenu").append("<br>OGV URL<br><input type='text' id='newvideoURLOGGText'><button onclick='appGlobals.currentObject().changeURLOGG()'>Update</button>")
    	$("#videoMenu").append("<br>Choose image for poster start in the player<br><input type='text' id='PosTer'><button onclick='appGlobals.currentObject().choosePoster()'>Update</button>")
    	$("#videoMenu").append("<br>Autoplay<input type='checkbox' id='autoplayPlayer' name='autoplay' value='' onclick='appGlobals.currentObject().changAutoplay()'>")
    	$("#videoMenu").append("<br>Allow Fullscreen<input type='checkbox' id='allowfullscreen' name='' value='' onclick='appGlobals.currentObject().changeFullscreen()'>")
    	$("#videoMenu").append("<br>Choose volume start <input type='edit' id='volume' name='volume' value='' >")
        $("#volume").spinner({ min: 0.8, max: 1, step: 0.01, numberFormat: "n", change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeVolume() } })
        $("#videoMenu").append("<br>Allow Loop<input type='checkbox' id='allowloop' name='' value='' onclick='appGlobals.currentObject().selectLoop()'>")
}
VideoWidget.buttomImage='images/button_icon.png'
VideoWidget.typeId= 'video'
VideoWidget.myClass= 'widget_video'
VideoWidget.initialWidth='480'
VideoWidget.initialHeight= '270'
VideoWidget.actionsSectionId='videoMenu'

