

    
    function VideoWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      var url = "embedded-player/simpsons.mov"
      var Width = '100%'
      var Height = '100%'

        this.createElement= function (param) {

        	


            if (typeof (param) !== 'undefined') {

            	if ( typeof (param.url) !== 'undefined') url = param.url

            }

           
            return '<div id="' + this.getId()  +  '" width="100%" height="100%"><a class="media" href="'+ url +'"></a></div>'

        },
        
        this.initElement = function(param){
        	
        	//if( (appGlobals.isInDesignMode() == false))
        	$('.media' ).media({
        		width:  Width,
        		height: Height,
        		params:	{ wmode: 'opaque', allowfullscreen: 'true'}
        		//type:'swf'
        		});
        	if( (appGlobals.isInDesignMode() == true))
        	$('.media object').append('<param name="wmode" value="transparent">');
        	
        	//alert(frameNumber)

		},
		
		this.cleanSource = function() {
            var s =  $('#'+this.getId() ).attr('src')
            alert(s)
            var i = s.indexOf("?") // get rid of question mark as not mark as url 
            return s.substring(0,i) 
        },

        this.createJSON = function() {

            return { 'url': url }

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

    VideoWidget.init = function () {
    	$("#videoMenu").append("URL<input type='text' id='newvideoURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")
}
VideoWidget.buttomImage='images/button_icon.png'
VideoWidget.typeId= 'video'
VideoWidget.myClass= 'widget_video'
VideoWidget.initialWidth='480'
VideoWidget.initialHeight= '260'
VideoWidget.actionsSectionId='videoMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
