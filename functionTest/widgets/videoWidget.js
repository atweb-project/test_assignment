/*
 * This widget is based on the jQuery Media Plugin, 
 * http://malsup.com/jquery/media
 */

    
    function VideoWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      var url = "http://malsup.github.com/video/simpsons.mov"
    	  //Quicktime http://malsup.github.com/video/simpsons.mov
    	  //FLV http://malsup.github.com/mediaplayer.swf?file=flash/curtain.flv
    	  //SWF http://malsup.com/jquery/media/flash/snail.swf
    	  //Youtube http://youtube.com/v/TyvN59L4hJU
    	  //Real Player http://malsup.github.com/video/realvideo.ram
    	  //windows media player http://malsup.github.com/video/ski.wmv
      var Width = '100%'
      var Height = '100%'
      var AutoPLay = false

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

            	if ( typeof (param.url) !== 'undefined') url = param.url
            	if ( typeof (param.AutoPLay) !== 'undefined') AutoPLay = param.AutoPLay

            }

           
            return '<iframe style="width: 100%; height: 100%;" id="' + this.getId() + '" src="embedded-player/videoWidget.html" frameborder="0" allowfullscreen="true"></iframe>'

        },
        
        this.initElement = function(param){
        	//if( appGlobals.isInDesignMode() == false)
        	
        	$('video,audio').mediaelementplayer(/* Options */);
        	

		},
		
		this.autoPlayparam = function() {
			if( (appGlobals.isInDesignMode() == false) && (AutoPLay == true)) return 'true'
            
            return ''
		},
		
		//For YouTube
		
		/*this.autoPlayparamYoutube = function() {
			
			if( (appGlobals.isInDesignMode() == false) && (AutoPLay == true)) return '&autoplay=1'
			
			return ''
			
		},*/
		

        this.createJSON = function() {

            return { 'url': url, 'AutoPLay':AutoPLay }

        },
        
        this.changeURL= function()
         {

            this.myRegisterUniquePropEvent( [{ 'prop': 'url', 'ov': url, 'nv': $('#newvideoURLText').prop('value') }])
             
        },
        
        this.changAutoplay = function() {
        	
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'AutoPLay', 'ov': AutoPLay, 'nv': $('#autoplayPlayer').prop('checked') }])
        	
        },

        this.propChange= function (param) {

           // alert ("button prop change "+this.getId()+" param "+param.length)

        	 for (var i = 0; i < param.length; i++) {

                 if (param[i].prop == 'url') url=  param[i].value 
                   
                 if (param[i].prop == 'AutoPLay') AutoPLay = param[i].value


             }
        	 
        	 this.initElement()

        },

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

            $('#newvideoURLText').prop('value', url)
            $('#autoplayPlayer').prop('checked', AutoPLay )

         }
        
    }

// static variables/functions

    VideoWidget.init = function () {
    	$("#videoMenu").append("URL<br><input type='text' id='newvideoURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")
    	$("#videoMenu").append("<br>Autoplay<input type='checkbox' id='autoplayPlayer' name='autoplay' value='' onclick='appGlobals.currentObject().changAutoplay()'>")
}
VideoWidget.buttomImage='images/button_icon.png'
VideoWidget.typeId= 'video'
VideoWidget.myClass= 'widget_video'
VideoWidget.initialWidth='480'
VideoWidget.initialHeight= '260'
VideoWidget.actionsSectionId='videoMenu'

