

    
    function CameraWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      

        this.createElement= function (param) {

            return '<iframe id="' + this.getId()  +  '" width="100%" height="100%" src="camera/cameraWidget.html" frameborder="0"></iframe>'

        },
        
        this.initElement = function(param) {
        	

        },

        this.createJSON = function() {

            return { }

        },
        
        this.propChange= function (param) {

        },

        this.selectionChanged=function()  {

         }
        
    }

// static variables/functions

CameraWidget.init = function () {
   
}
CameraWidget.buttomImage='images/button_icon.png'
CameraWidget.typeId= 'camera'
CameraWidget.myClass= 'widget_camera'
CameraWidget.initialWidth='650'
CameraWidget.initialHeight= '300'
CameraWidget.actionsSectionId='cameraMenu'

