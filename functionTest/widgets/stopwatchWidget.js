

    
    function StopwatchWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)


        this.createElement= function (param) {

             return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="stopwatch/stopwatchWidget.html" scrolling="no" frameborder="0" allowTransparency="true"></iframe> '
                      
        },

        this.createJSON = function() {

          

        },
          	   
	    this.initElement = function(param){

		},

        this.propChange= function (param) {

        	

        },

        this.selectionChanged=function()  {

        	           

         }
        
    }

// static variables/functions

    StopwatchWidget.init = function () {
    						
	
}
StopwatchWidget.buttomImage='images/button_icon.png'
StopwatchWidget.typeId= 'stopwatch'
StopwatchWidget.myClass= 'widget_stopwatch'
StopwatchWidget.initialWidth='200'
StopwatchWidget.initialHeight= '70'
StopwatchWidget.actionsSectionId='stopwatchMenu'

