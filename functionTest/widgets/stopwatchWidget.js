

    
    function StopwatchWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        
        var MSeconds = true
        
        this.createElement= function (param) {
        	
        	 if (typeof (param) !== 'undefined') {

                 if (typeof (param.MSeconds) !== 'undefined') MSeconds = param.MSeconds
                                  
             }

             return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="stopwatch/stopwatchWidget.html" mseconds="'+MSeconds+'" scrolling="no" frameborder="0" allowTransparency="true"></iframe> '
                      
        },

        this.createJSON = function() {

        	return {'MSeconds': MSeconds }

        },
          	   
	    this.initElement = function(param){

		},

        this.propChange= function (param) {

			for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'MSeconds') MSeconds =  param[i].value 
                                              
       	 }	
			
			$('#' + this.getId()).attr( 'mseconds', MSeconds)

        	$('#' + this.getId()).attr( 'src', function ( i, val ) { return val; })

        },

        this.selectionChanged=function()  {

        	$('#milliseconds').prop('checked', MSeconds)

        },
         
        this.ChooseMseconds= function()
        {

            this.myRegisterUniquePropEvent( [{ 'prop': 'MSeconds', 'ov': MSeconds, 'nv': $('#milliseconds').prop('checked') }])
             
        }
        
    }

// static variables/functions

    StopwatchWidget.init = function () {
    	
    	 $("#stopwatchMenu").append("Show milliseconds<input type='checkbox' id='milliseconds' name='' value='' onclick='appGlobals.currentObject().ChooseMseconds()'>")	
	
}
StopwatchWidget.buttomImage='images/button_icon.png'
StopwatchWidget.typeId= 'stopwatch'
StopwatchWidget.myClass= 'widget_stopwatch'
StopwatchWidget.initialWidth='215'
StopwatchWidget.initialHeight= '78'
StopwatchWidget.actionsSectionId='stopwatchMenu'

