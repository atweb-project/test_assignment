
/*
 * Facebook Comments Widget
 */

function FacebookCommentsWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)       
        
        var url = "http://example.com/comments"
     	var NumPosts = 5
        var ColorScheme = "light"


       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.NumPosts) !== 'undefined') NumPosts = param.NumPosts

                if (typeof (param.ColorScheme) !== 'undefined') ColorScheme = param.ColorScheme

                //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
              

            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="facebook/facebookcommentsWidget.html" scrolling="no" frameborder="0" '+
            'allowTransparency="true" url="'+url+'" numposts="'+NumPosts+'" colorscheme="'+ColorScheme+'"></iframe>'
            
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'NumPosts') NumPosts = param[i].value

                if( param[i].prop == 'ColorScheme' ) ColorScheme = param[i].value

            }
            
            //alert(Share)

            $('#'+this.getId() ).attr( 'url', url)
            $('#'+this.getId() ).attr( 'numposts', NumPosts)
            $('#'+this.getId() ).attr( 'colorscheme', ColorScheme)
            $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })
                      
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")

            $('#newFacebookCommentsURLText').prop('value', url )
            
            $('#comments').prop('value', NumPosts )
            
            $('#getcolor').prop('value', ColorScheme)
            
       },

       this.initElement = function()
       {

            
            	
        },
        
        this.changeURL = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newFacebookCommentsURLText').prop('value') }])

        },


        this.getCommentsNum = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'NumPosts', 'ov': NumPosts, 'nv': $('#comments').prop('value') }])

        },
        
        this.getcolor = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'ColorScheme', 'ov': ColorScheme, 'nv': $('#getcolor').prop('value') }])

        },

       this.createJSON = function () {
         
            return { 'url': url,'NumPosts': NumPosts,'ColorScheme': ColorScheme } 
        }
        


    }
   

FacebookCommentsWidget.buttomImage= 'images/button_icon.png'
FacebookCommentsWidget.typeId= 'fb_com'
FacebookCommentsWidget.myClass= 'widget_facebook_comments'
FacebookCommentsWidget.initialWidth= '400'
FacebookCommentsWidget.initialHeight= '350'
FacebookCommentsWidget.actionsSectionId= 'facebookcommentsMenu'


FacebookCommentsWidget.init= function () {

	$("#facebookcommentsMenu").append("URL<input type='text' id='newFacebookCommentsURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")

    $("#facebookcommentsMenu").append("<br>Choose the number of comments to show <input type='edit' id='comments' name='comments' value='' >")
    $("#comments").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().getCommentsNum() } })
   
    $("#facebookcommentsMenu").append("<div>Choose the color of the scheme<select id='getcolor' onchange='appGlobals.currentObject().getcolor()'>"+
    							"<option value='light'>light</option>"+
    							"<option value='dark'>dark</option>"+
    							"</select></div>")

}

