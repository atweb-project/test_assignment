
/*
 * Facebook Posts Widget
 */

function FacebookPostsWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)       
        
        var url = "https://www.facebook.com/FacebookDevelopers/posts/10151471074398553"


       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {

                if ( typeof (param.url) !== 'undefined') url = param.url

                //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
              

            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="facebook/facebookpostsWidget.html" scrolling="no" frameborder="0" allowTransparency="true" url='+url+'></iframe>'
            
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'url') url =  param[i].value 
                  
            }
            
            //alert(Share)

            $('#'+this.getId() ).attr( 'url', url)
            $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })
                      
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")

            $('#newFacebookPostsURLText').prop('value', url )
            
       },

       this.initElement = function()
       {

            
            	
        },
        
        this.changeURL = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newFacebookPostsURLText').prop('value') }])

        },


       this.createJSON = function () {
         
            return { 'url': url } 
        }
        


    }
   

FacebookPostsWidget.buttomImage= 'images/button_icon.png'
FacebookPostsWidget.typeId= 'fb_posts'
FacebookPostsWidget.myClass= 'widget_facebook_posts'
FacebookPostsWidget.initialWidth= '400'
FacebookPostsWidget.initialHeight= '350'
FacebookPostsWidget.actionsSectionId= 'facebookpostsMenu'


FacebookPostsWidget.init= function () {

   $("#facebookpostsMenu").append("URL<input type='text' id='newFacebookPostsURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")

  /*  $("#facebookpostsMenu").append("<div>Choose layout<select id='layout' onchange='appGlobals.currentObject().getLayout()'>"+
    							"<option value='standard'>standard</option>"+
    							"<option value='box_count'>box_count</option>"+
    							"<option value='button_count'>button_count</option>"+
    							"<option value='button'>button</option>"+
    							"</select></div>")
   
    $("#facebookpostsMenu").append("<div>Choose action type<select id='actiontype' onchange='appGlobals.currentObject().getactiontype()'>"+
    							"<option value='like'>like</option>"+
    							"<option value='recommend'>recommend</option>"+
    							"</select></div>")

    $("#facebookpostsMenu").append("<br>Show share button<input type='checkbox' id='showsharebutton' onclick='appGlobals.currentObject().showShareButton()'>")
    
    $("#facebookpostsMenu").append("<br>Show Friend's faces<input type='checkbox' id='showfaces' onclick='appGlobals.currentObject().showFaces()'>")
*/

}

