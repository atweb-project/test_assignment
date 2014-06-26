    function CheckboxWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var checkboxText = 'Put you text here'
        var checkboxChecked = false

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.checkboxText) !== 'undefined') checkboxText = param.checkboxText
                
                if (typeof (param.checkboxChecked) !== 'undefined') checkboxChecked = param.checkboxChecked

            }

            return '<input type="checkbox" id="'+ this.getId() +'" name="'+ this.getId() +'" value="">'+
            	   '<label for="'+ this.getId() +'">'+ checkboxText +'</label>'

        },
        
        this.initElement = function(param) {
        	
        	$('#'+this.getId()).prop('checked',checkboxChecked)
        },

        this.createJSON = function() {
        		//alert('preview '+checkboxChecked)
            return { 'checkboxText': checkboxText, 'checkboxChecked': checkboxChecked }

        },
        
        this.changecheckboxLabel= function() {

            this.myRegisterUniquePropEvent( [{ 'prop': 'checkboxText', 'ov': checkboxText, 'nv': $('#newcheckboxText').prop('value') }])
            // alert( $('#newcheckboxText').prop('value'))

        },
        
        this.chooseIfChecked = function() {
        	//alert($('#checkedvalue').prop('checked'))      	
        	this.myRegisterUniquePropEvent([ {'prop' : 'checkboxChecked', 'ov' : checkboxChecked, 'nv' : $('#checkedvalue').prop('checked')} ])
        },
        
        this.checkisChecked = function() {
        	
        	var checkbox = $('#'+this.getId())
            isChecked = checkbox.is(':checked')
            
		        if (isChecked) {
		        	checkbox.prop('checked', false);

		        } else {
		        	checkbox.prop('checked', true);
		        }
        	
        },

        this.propChange= function (param) {

        	for (var i = 0; i < param.length; i++) {
        		if (param[i].prop == 'checkboxText') checkboxText = param[i].value 
        		
        		if (param[i].prop == 'checkboxChecked') checkboxChecked = param[i].value 
        	}
        	
        	$("label[for="+ this.getId() +"]").text(checkboxText);
        	  
        	$('#'+this.getId()).prop('checked',checkboxChecked)
        	//this.checkisChecked()
        	
        	//alert('check '+checkboxChecked)
        },

        this.selectionChanged = function()  {

            $('#newcheckboxText').prop('value', checkboxText)
            $('#checkedvalue').prop('checked', checkboxChecked)
              
         }
        
    }

// static variables/functions

CheckboxWidget.init = function () {
    $("#checkboxMenu").append("Checkbox Text:<input type='text' id='newcheckboxText'><button onclick='appGlobals.currentObject().changecheckboxLabel()'>Update</button>")
    $("#checkboxMenu").append("<br>Initially checked or unchecked<input type='checkbox' id='checkedvalue' name='checkedvalue' value='' onclick='appGlobals.currentObject().chooseIfChecked()'>")
}
CheckboxWidget.buttomImage='images/button_icon.png'
CheckboxWidget.typeId= 'checkbox'
CheckboxWidget.myClass= 'widget_checkbox'
CheckboxWidget.initialWidth='200'
CheckboxWidget.initialHeight= '50'
CheckboxWidget.actionsSectionId='checkboxMenu'
