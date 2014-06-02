

    
    function VideoWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      

        this.createElement= function (param) {

        	var url = "http://www.youtube.com/embed/ClCk6LljEAU"


            if (typeof (param) !== 'undefined') {

            	if ( typeof (param.url) !== 'undefined') url = param.url

            }

           
            return '<a id="' + this.getId()  +  '" class="media" href="'+ url +'">My Embedded Video</a>'

        },
        
        this.initElement = function(param){
        	
        	//if( (appGlobals.isInDesignMode() == false))
        	$('#'+ this.getId() ).media({
        	        
        	      });
        	
        	//alert(frameNumber)

		},
		
		this.cleanSource = function() {
            var s =  $('#'+this.getId() ).attr('src')
            alert(s)
            var i = s.indexOf("?") // get rid of question mark as not mark as url 
            return s.substring(0,i) 
        },

        this.createJSON = function() {

            return { 'url': this.cleanSource() }

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
VideoWidget.initialWidth='400'
VideoWidget.initialHeight= '300'
VideoWidget.actionsSectionId='videoMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
