

    
    function RadiobWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)
        
        
        var radioChecked = false
      

        this.createElement= function (param) {

            var buttonText = 'Button!'


            if (typeof (param) !== 'undefined') {

            	if (typeof (param.radioChecked) !== 'undefined') radioChecked = param.radioChecked

            }

           
            return '<div id="' + this.getId()  +  '" class="one" style="width:100%; height:100%">'+
            	   '<input type="radio" name="family" value="man">Man<br><input type="radio" name="family" value="woman">Woman<br>'+
            	   '<input type="radio" name="family" value="child">Child<br></div>'

        },
        this.initElement = function() {
        	
        	$('#'+this.getId()+'input[type=radio]').prop('checked',radioChecked)
        	alert($('#'+this.getId()+' input[type=radio]').prop('value'))
        },

        this.createJSON = function() {

            return { 'radioChecked': radioChecked }

        },
        
        this.changeLabel= function()
         {

         //  alert ("button clicked")
           // alert (  ' currentId '+currentID+" texregisterUniquePropEventt "+ $('#newButtonText').prop('value') )
        	//alert($('#newButtonText').val())
        	
            this.myRegisterUniquePropEvent( [{ 'prop': 'radioChecked', 'ov': radioChecked, 'nv': $('#newradiobtn').prop('value') }])
             

        },
        
        this.checkradioisChecked = function() {
        	
        	/*var radio = $('#'+this.getId()+'input[type=radio]')
            isChecked = radio.is(':checked')
            
		        if (isChecked) {
		        	radio.prop('checked', false);

		        } else {
		        	radio.prop('checked', true);
		        }*/
        	var newValue = $('#newradiobtn').prop('value')
        	
        	var RadioValue =$("input[type=radio][value="'+newValue+'"]")
        	
        	if(RadioValue && newValue == RadioValue)
        		//$('#'+this.getId()+' input[type=radio]').val('newValue').attr("checked", "checked")
        		$("input[type=radio][value="+newValue+"]").attr('checked','checked');
        		alert(RadioValue)
        		
        	
        },

        this.propChange= function (param) {

           // alert ("button prop change "+this.getId()+" param "+param.length)

        	/*var initialString = $('#newButtonText').val()
        	var Options = initialString.split(",")
        	for (var i = 0; i < Options.length; i++) {
        		$(".one" ).append("<input type='radio' name='' value='"+Options[i]+"'>"+Options[i]+"<br>")
        	}*/
        	alert($('#newradiobtn').prop('value'))
        	this.checkradioisChecked()

        }


        ,

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

        	$('#newradiobtn').prop('value', radioChecked)
              

         }
        
    }

// static variables/functions

RadiobWidget.init = function () {
    $("#radiobuttonsMenu").append("Options:<input type='text' id='newradiobtn'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>")
}
RadiobWidget.buttomImage='images/button_icon.png'
RadiobWidget.typeId= 'radiobuttons'
RadiobWidget.myClass= 'widget_radiobuttons'
RadiobWidget.initialWidth='100'
RadiobWidget.initialHeight= '100'
RadiobWidget.actionsSectionId='radiobuttonsMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
