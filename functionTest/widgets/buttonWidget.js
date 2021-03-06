

    
    function ButtonWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      

        this.createElement= function (param) {

            var buttonText = 'Button!'


            if (typeof (param) !== 'undefined') {

                if (typeof (param.text) !== 'undefined') buttonText = param.text

            }

           
            return '<button id="' + this.getId()  +  '" style="width:100%; height:100%">'+ buttonText +'</button>'

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

        }


        ,

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

            $('#newButtonText').prop('value', $('#' + this.getId()  ).html())
              

         }
        
    }

// static variables/functions

ButtonWidget.init = function () {
    $("#buttonMenu").append("  Text:<input type='text' id='newButtonText'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>")
}
ButtonWidget.buttomImage='images/button_icon.png'
ButtonWidget.typeId= 'button'
ButtonWidget.myClass= 'widget_button'
ButtonWidget.initialWidth='100'
ButtonWidget.initialHeight= '50'
ButtonWidget.actionsSectionId='buttonMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
