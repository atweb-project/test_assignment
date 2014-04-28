  function HTMLWidget (pid,ptype) {


        MyWidget.call(this,pid,ptype)



        this.createElement = function (param) {

            var html ='HTML goes <u>here</u>, cool!' 
                //'<div><span id="result"></span><script>var d=new Date();document.getElementById("result").innerHTML = d</script> </div>'


            if (typeof (param) !== 'undefined') {

                if (typeof (param.html) !== 'undefined') html = param.html

            }


            return '<div id="' + this.getId() + '" class="htmlWidgetClass" style="width:100%; height:100%">' + html + '</div>'

        },

        this.createJSON= function () {

            return { 'html': $('#' + this.getId() ).html() }

        }, 


        this.updateContents = function()
        {

             
            //alert(" contents is " + $('#htmlTextArea').val()  )

            // document.write causes the whole page to be wiped so don't allow 
            // needs proper regex with document.write inside of script tag 

            if ($('#htmlTextArea').val().indexOf("document.write") != -1) {
                alert ("document.write is not allowed")
                return
            }


            this.myRegisterUniquePropEvent(  [{ 'prop': 'html', 'ov': $('#'+this.getId() ).html(), 'nv': $('#htmlTextArea').val() }])


        },
      

        this.propChange = function ( param) {

           //  alert ("html prop change "+this.getId()+" param "+param[0].value)

           // $('#' + id).html(param[0].value)

            $('#'+this.getId() ).html ( param[0].value )
        }


        ,

        this.selectionChanged = function () {

           // alert(" html selection changed html:" + $(currentID ).html() )

            $('#htmlTextArea').val(  $('#'+this.getId() ).html()  )


        }

    }



HTMLWidget.buttomImage= 'images/html.jpg'
HTMLWidget.typeId= 'html'
HTMLWidget.myClass= 'widget_html'
HTMLWidget.initialWidth= '100'
HTMLWidget.initialHeight= '100'
HTMLWidget.actionsSectionId= 'htmlMenu'

HTMLWidget.init= function () {

    $("#htmlMenu").append("  HTML:<textarea  id='htmlTextArea' rows='10' cols='35'  >  </textarea><button onclick='appGlobals.currentObject().updateContents()'>Update</button>")

}