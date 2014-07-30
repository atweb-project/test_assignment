
/*
 * Facebook Buttons Widget
 */

function TwitterBtnWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)       
        
        var url = "https://developers.facebook.com/docs/plugins/"
     	var Layout = "standard"
        var ActionType = "like"
        var Share = true
        var Showfaces = true


       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.Layout) !== 'undefined') Layout = param.Layout

                if (typeof (param.ActionType) !== 'undefined') ActionType = param.ActionType

                if (typeof (param.Share) !== 'undefined') Share = param.Share

                if( typeof (param.Showfaces) !== 'undefined') Showfaces = param.Showfaces

                //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
              

            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="twitter/twitterbtnWidget.html" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'
            
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'Layout') Layout = param[i].value

                if( param[i].prop == 'ActionType' ) ActionType = param[i].value

                if (param[i].prop == 'Share') Share = param[i].value

                if( param[i].prop == 'Showfaces') Showfaces = param[i].value


            }
            
            //alert(Share)

            $('#'+this.getId() ).attr( 'src',  '//www.facebook.com/plugins/like.php?href='+url+'&width&layout='+Layout+'&action='+ActionType+'&show_faces='+Showfaces+'&share='+Share+'&;' )
                      
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")

            $('#newFacebookURLText').prop('value', url )
            
            $('#layout').prop('value', Layout )
            
            $('#actiontype').prop('value', ActionType )
            
            $('#showsharebutton').prop('checked', Share )
            
            $('#showfaces').prop('checked', Showfaces )

       },

       this.initElement = function()
       {

            
            	
        },
        
        this.changeURL = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newFacebookURLText').prop('value') }])

        },


        this.getLayout = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'Layout', 'ov': Layout, 'nv': $('#layout').prop('value') }])

        },
        
        this.getactiontype = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'ActionType', 'ov': ActionType, 'nv': $('#actiontype').prop('value') }])

        },


        this.showShareButton = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'Share', 'ov': Share, 'nv': $('#showsharebutton').prop('checked') }])

        },


        this.showFaces = function ()
         {
             
            this.myRegisterUniquePropEvent(  [{ 'prop': 'Showfaces', 'ov': Showfaces, 'nv': $('#showfaces').prop('checked') }])

         },


       this.createJSON = function () {
         
            return { 'url': url,'Layout': Layout,'ActionType': ActionType, 'Share': Share, 'Showfaces': Showfaces } 
        }
        


    }
   

TwitterBtnWidget.buttomImage= 'images/button_icon.png'
TwitterBtnWidget.typeId= 'tw_button'
TwitterBtnWidget.myClass= 'widget_twitter'
TwitterBtnWidget.initialWidth= '200'
TwitterBtnWidget.initialHeight= '100'
TwitterBtnWidget.actionsSectionId= 'twitterMenu'


FacebookBtnWidget.init= function () {

    $("#twitterMenu").append("URL<input type='text' id='newFacebookURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")

    $("#twitterMenu").append("<div>Choose layout<select id='layout' onchange='appGlobals.currentObject().getLayout()'>"+
    							"<option value='standard'>standard</option>"+
    							"<option value='box_count'>box_count</option>"+
    							"<option value='button_count'>button_count</option>"+
    							"<option value='button'>button</option>"+
    							"</select></div>")
   
    $("#twitterMenu").append("<div>Choose action type<select id='actiontype' onchange='appGlobals.currentObject().getactiontype()'>"+
    							"<option value='like'>like</option>"+
    							"<option value='recommend'>recommend</option>"+
    							"</select></div>")

    $("#twitterMenu").append("<br>Show share button<input type='checkbox' id='showsharebutton' onclick='appGlobals.currentObject().showShareButton()'>")
    
    $("#twitterMenu").append("<br>Show Friend's faces<input type='checkbox' id='showfaces' onclick='appGlobals.currentObject().showFaces()'>")


}

