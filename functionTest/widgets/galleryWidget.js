

    
    function GalleryWidget (pid, ptype ){

        
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

GalleryWidget.init = function () {
    $("#galleryMenu").append("  Text:<input type='text' id='newButtonText'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>")
}
GalleryWidget.buttomImage='images/button_icon.png'
GalleryWidget.typeId= 'gallery'
GalleryWidget.myClass= 'widget_gallery'
GalleryWidget.initialWidth='100'
GalleryWidget.initialHeight= '50'
GalleryWidget.actionsSectionId='galleryMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
