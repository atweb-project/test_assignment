

    
    function MobileMenuWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        
        var Position = 'left' 

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.Position) !== 'undefined') Position = param.Position

            }

           
            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="mobilemenu/mobilemenuWidget.html" scrolling="no" frameborder="0" allowTransparency="true" position="'+Position+'"></iframe>'

        },

        this.createJSON = function() {

            return { 'Position': Position }

        },
        
        this.getPosition= function()
         {

            this.myRegisterUniquePropEvent( [{ 'prop': 'Position', 'ov': Position, 'nv': $('#pos').prop('value') }])
             
        },

        this.propChange= function (param) {

        	 for (var i = 0; i < param.length; i++) {

                 if (param[i].prop == 'Position') Position =  param[i].value 
              
        	 }
        	 
        	 $('#' + this.getId()).attr( 'position', Position)
         	 $('#' + this.getId()).attr( 'src', function ( i, val ) { return val; })

        },

        this.selectionChanged=function()  {

        	$('#pos').prop('value', Position)
              

         }
        
    }

// static variables/functions

MobileMenuWidget.init = function () {
    $("#mobileMenu").append("<div>Choose position of the menu<select id='pos' onchange='appGlobals.currentObject().getPosition()'>"+
							"<option value='left'>left</option>"+
							"<option value='right'>right</option>"+
							"</select></div><br>")
}
MobileMenuWidget.buttomImage='images/button_icon.png'
MobileMenuWidget.typeId= 'mobilemenu'
MobileMenuWidget.myClass= 'widget_mmenu'
MobileMenuWidget.initialWidth='360'
MobileMenuWidget.initialHeight= '240'
MobileMenuWidget.actionsSectionId='mobileMenu'

