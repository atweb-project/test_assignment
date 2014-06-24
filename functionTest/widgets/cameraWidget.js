

    
    function CameraWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      

        this.createElement= function (param) {

            var buttonText = 'Button!'


            if (typeof (param) !== 'undefined') {

                if (typeof (param.text) !== 'undefined') buttonText = param.text

            }

           
           // return '<div id="' + this.getId()  +  '" style="width:100%; height:100%"><video id="video" width="320" height="240" autoplay></video><button id="snap" class="sexyButton">Snap Photo</button>'+
           // 	   '<canvas id="canvas" width="320" height="240"></canvas></div>'
            return '<iframe id="' + this.getId()  +  '" width="100%" height="100%" src="camera/cameraWidget.html" frameborder="0"></iframe><div>'

        },
        
        this.initElement = function(param) {
        	

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

        },

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

            $('#newButtonText').prop('value', $('#' + this.getId()  ).html())
              

         }
        
    }

// static variables/functions

CameraWidget.init = function () {
    $("#cameraMenu").append("  Text:<input type='text' id='newButtonText'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>")
}
CameraWidget.buttomImage='images/button_icon.png'
CameraWidget.typeId= 'camera'
CameraWidget.myClass= 'widget_camera'
CameraWidget.initialWidth='650'
CameraWidget.initialHeight= '300'
CameraWidget.actionsSectionId='cameraMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
