

    
    function CountdownWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var date = new Date()
        var austDay = date.getFullYear() + ',' + (date.getMonth() + 1) + ',' + (date.getDate() + 1)
        var Compactlayout = false

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.austDay) !== 'undefined') austDay = param.austDay
                
                if (typeof (param.Compactlayout) !== 'undefined') Compactlayout = param.Compactlayout
                
            }

           return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="countdown/countdownWidget.html" scrolling="no" frameborder="0" allowTransparency="true" fdate="'
            +austDay+'" compactlayout="'+Compactlayout+'"></iframe> '
                      
        },

        this.createJSON = function() {

            return { 'austDay': austDay, 'Compactlayout': Compactlayout}

        },
        
        this.getCountdownDate= function()
         {

            this.myRegisterUniquePropEvent( [{ 'prop': 'austDay', 'ov': austDay, 'nv': $('#datepicker').prop('value') }])
             
        },
        
        this.getCompactMode= function()
        {

           this.myRegisterUniquePropEvent( [{ 'prop': 'Compactlayout', 'ov': Compactlayout, 'nv': $('#compactmode').prop('checked') }])
            
       },
       
	    
	    this.initElement = function(param){

		},

        this.propChange= function (param) {

        	 for (var i = 0; i < param.length; i++) {

                 if (param[i].prop == 'austDay') austDay =  param[i].value 
                 
                 if (param[i].prop == 'Compactlayout') Compactlayout =  param[i].value 
                               
        	 }
        	 
        	 $('#' + this.getId()).attr( 'fdate', austDay)
        	 $('#' + this.getId()).attr( 'compactlayout', Compactlayout)

         	 $('#' + this.getId()).attr( 'src', function ( i, val ) { return val; })

        },

        this.selectionChanged=function()  {

        	$('#datepicker').prop('value', austDay)
        	$('#compactmode').prop('checked', Compactlayout)             

         }
        
    }

// static variables/functions

    CountdownWidget.init = function () {
    $("#countdownMenu").append("Choose date for the countdown<input type='text' id='datepicker' onchange='appGlobals.currentObject().getCountdownDate()'>")
    
    $( "#datepicker" ).datepicker({ dateFormat: "yy,m,d" , minDate: 1, defaultDate: 1}).datepicker("setDate", "1");
    
    $("#countdownMenu").append("Choose compact layout<input type='checkbox' id='compactmode' name='compactmode' value='' onclick='appGlobals.currentObject().getCompactMode()'>")						
	
}
CountdownWidget.buttomImage='images/button_icon.png'
CountdownWidget.typeId= 'countdown'
CountdownWidget.myClass= 'widget_countdown'
CountdownWidget.initialWidth='250'
CountdownWidget.initialHeight= '85'
CountdownWidget.actionsSectionId='countdownMenu'

