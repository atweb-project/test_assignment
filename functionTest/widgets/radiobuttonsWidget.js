    function RadiobWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)
        
        var initialString = 'man,woman,child'
        	
        var radioChecked = false
      

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {
            	
            	if (typeof (param.initialString) !== 'undefined') initialString = param.initialString

            	if (typeof (param.radioChecked) !== 'undefined') radioChecked = param.radioChecked

            }
             
            return '<div id="' + this.getId()  +  '" class="one" style="width:100%; height:100%"></div>'

        },
        
        this.initElement = function() {
        	
        	var Options = initialString.split(",")
        	
        	for (var i = 0; i < Options.length; i++) {
        		
        		$('#'+this.getId() ).append("<input type='radio' name='' value='"+Options[i]+"'>"+Options[i]+"<br>")
        	}
        	
        	$('#'+this.getId()+' input[type=radio][value='+radioChecked+']').prop('checked', true)
        	//alert($('#'+this.getId()+' input[type=radio]').prop('value'))
        	//alert(radioChecked)
        },

        this.createJSON = function() {

            return { 'initialString': initialString, 'radioChecked': radioChecked }

        },
        
        this.radiobtnText = function() {
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'initialString', 'ov': initialString, 'nv': $('#newradiobtnText').prop('value') }])
        },
        
        this.changeRadioCheckedBtn = function()
         {
   	
            this.myRegisterUniquePropEvent( [{ 'prop': 'radioChecked', 'ov': radioChecked, 'nv': $('#newradiobtn').prop('value') }])
            
            // this.myRegisterUniquePropEvent( [{ 'prop': 'radioChecked', 'ov': radioChecked, 'nv': $('#newradiobtn').prop('checked') }])
            
        },
        
        this.nValues = function() {
        	$('#newradiobtn').prop('value')
        	$('#newradiobtn').prop('checked')
        },
        
        this.checkradioisChecked = function() {
        	
        	var newValue = $('#newradiobtn').prop('value')
        	if($('#'+this.getId()+' input[type=radio][value='+newValue+']').length > 0)
        		//alert('yes')
        		$('#'+this.getId()+' input[type=radio][value='+newValue+']').prop("checked",true)
        		
        	
        },

        this.propChange= function (param) {
        	
        	for (var i = 0; i < param.length; i++) {
        		
        		if (param[i].prop == 'initialString') initialString = param[i].value 
        		
        		if (param[i].prop == 'radioChecked') radioChecked = param[i].value 
        	}
        	//alert($('#newradiobtn').prop('value'))
        	
        	
        	var Options = initialString.split(",")
        	
        	$('#'+this.getId()).contents().remove()
        	
        	for (var i = 0; i < Options.length; i++) {
        		      		
        		$('#'+this.getId()).append("<input type='radio' name='' value='"+Options[i]+"'>"+Options[i]+"<br>")
        	}
        	
        	this.checkradioisChecked()

        },

        this.selectionChanged=function()  {
        	var newValue = $('#newradiobtn').prop('value')
        	
        	$('#newradiobtnText').prop('value', initialString)

        	$('#newradiobtn').prop('value', radioChecked)
        	$('#newradiobtn').attr('checked', newValue)
        	//$('#'+this.getId()+' input[type=radio][value='+newValue+']').attr('checked', radioChecked)
              
         }
        
    }

// static variables/functions

RadiobWidget.init = function () {
	$("#radiobuttonsMenu").append("Choose radio button names(please put names seperated by comma):<input type='text' id='newradiobtnText'><button onclick='appGlobals.currentObject().radiobtnText()'>Update</button>")
    $("#radiobuttonsMenu").append("<br>Choose which radio button to preselect:<input type='text' id='newradiobtn'><button onclick='appGlobals.currentObject().changeRadioCheckedBtn()'>Update</button>")
}
RadiobWidget.buttomImage='images/button_icon.png'
RadiobWidget.typeId= 'radiobtns'
RadiobWidget.myClass= 'widget_radiobuttons'
RadiobWidget.initialWidth='100'
RadiobWidget.initialHeight= '100'
RadiobWidget.actionsSectionId='radiobuttonsMenu'
