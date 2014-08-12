
/*
 * Facebook Buttons Widget
 */

function FacebookBtnWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype) 
     
     	var FbPlugin = "buttons"
        
        var url = "https://developers.facebook.com/docs/plugins/"
     	var Layout = "standard"
        var ActionType = "like"
        var Share = true
        var Showfaces = true
        
        var Showposts = false
        var Showcomments = false
        
        var urlP = "https://www.facebook.com/FacebookDevelopers/posts/10151471074398553"
        
        var urlC = "http://example.com/comments"
        var NumPosts = 5
        var ColorScheme = "light"
        	

       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {
            	
            	if( typeof (param.FbPlugin) !== 'undefined') FbPlugin = param.FbPlugin

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.Layout) !== 'undefined') Layout = param.Layout

                if (typeof (param.ActionType) !== 'undefined') ActionType = param.ActionType

                if (typeof (param.Share) !== 'undefined') Share = param.Share

                if( typeof (param.Showfaces) !== 'undefined') Showfaces = param.Showfaces
                
                if( typeof (param.Showposts) !== 'undefined') Showposts = param.Showposts
                
                if( typeof (param.Showcomments) !== 'undefined') Showcomments = param.Showcomments

                //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
            

            return '<iframe width="100%" id="' + this.getId() + '" class="fbbuttons" height="100%" src="//www.facebook.com/plugins/like.php?href='+url+'&amp;width&amp;layout='+Layout+'&amp;action='+ActionType+'&amp;show_faces='+Showfaces+'&amp;share='+Share+'&amp;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'+
            	   '<iframe width="100%" id="' + this.getId() + '" class="fbposts" style="display:none;" height="100%" src="facebook/facebookpostsWidget.html" scrolling="no" frameborder="0" allowTransparency="true" urlp='+urlP+'></iframe>'+
            	   '<iframe width="100%" id="' + this.getId() + '" class="fbcomments"  style="display:none;" height="100%" src="facebook/facebookcommentsWidget.html" scrolling="no" frameborder="0" '+
                   'allowTransparency="true" urlc="'+urlC+'" numposts="'+NumPosts+'" colorscheme="'+ColorScheme+'"></iframe>'
            
            
           
           
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {
            	
            	if (param[i].prop == 'FbPlugin') FbPlugin =  param[i].value

                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'Layout') Layout = param[i].value

                if( param[i].prop == 'ActionType' ) ActionType = param[i].value

                if (param[i].prop == 'Share') Share = param[i].value

                if( param[i].prop == 'Showfaces') Showfaces = param[i].value
                
                if( param[i].prop == 'Showposts') Showposts = param[i].value
                
                if( param[i].prop == 'Showcomments') Showcomments = param[i].value


            }
            
            //alert(Share)

            $('#'+this.getId() ).attr( 'src',  '//www.facebook.com/plugins/like.php?href='+url+'&width&layout='+Layout+'&action='+ActionType+'&show_faces='+Showfaces+'&share='+Share+'&;' )
                      
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")
        	
        	$('#fbplugin').prop('value', FbPlugin )

            $('#newFacebookURLText').prop('value', url )
            
            $('#layout').prop('value', Layout )
            
            $('#actiontype').prop('value', ActionType )
            
            $('#showsharebutton').prop('checked', Share )
            
            $('#showfaces').prop('checked', Showfaces )
            
            $('#showposts').prop('checked', Showposts )
            
            $('#showcomments').prop('checked', Showcomments )
            
            if($('#showposts').is(':checked')){
            	
            	$('#fbbuttons').toggle()
            
            	$('.fbbuttons').hide()
            	
            	$('.fbcomments').hide()
            	
            	$('.fbposts').show()
            
            } 
            /*else {
            	
            	$('.fbposts').hide()
            	
            	$('.fbcomments').hide()
            	
            	$('.fbbuttons').show()
            	
            }*/
            
            if($('#showcomments').is(':checked')){
            	
            	$('#fbbuttons').toggle()
            
            	$('.fbbuttons').hide()
            	
            	$('.fbposts').hide()
            	
            	$('.fbcomments').show()
            
            } 
            /*else {
            	
            	$('.fbcomments').hide()
            	
            	$('.fbposts').hide()
            	
            	$('.fbbuttons').show()
            	
            }*/

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
         
        this.showPosts = function ()
        {
            $('#fbbtn').toggle()
            
            if (Showposts = true){
            	Showcomments = false
            	$('#showcomments').removeAttr('checked')
            }
            this.myRegisterUniquePropEvent(  [{ 'prop': 'Showposts', 'ov': Showposts, 'nv': $('#showposts').prop('checked') }])
            
            

        },
        
        this.showComments = function ()
        {
            $('#fbbtn').toggle()
            
            if (Showcomments = true){
            	Showposts = false
            	$('#showposts').removeAttr('checked')
            }
            
            this.myRegisterUniquePropEvent(  [{ 'prop': 'Showcomments', 'ov': Showcomments, 'nv': $('#showcomments').prop('checked') }])
            
           

        },
        
        this.getPlugin = function ()
        {
          
            
            this.myRegisterUniquePropEvent(  [{ 'prop': 'FbPlugin', 'ov': FbPlugin, 'nv': $('#fbplugin').prop('checked') }])
            
           

       },


       this.createJSON = function () {
         
            return { 'url': url,'Layout': Layout,'ActionType': ActionType, 'Share': Share, 'Showfaces': Showfaces, 'Showposts': Showposts, 'Showcomments': Showcomments } 
        }
        


    }
   

FacebookBtnWidget.buttomImage= 'images/button_icon.png'
FacebookBtnWidget.typeId= 'fb_buttons'
FacebookBtnWidget.myClass= 'widget_facebook'
FacebookBtnWidget.initialWidth= '200'
FacebookBtnWidget.initialHeight= '100'
FacebookBtnWidget.actionsSectionId= 'facebookMenu'


FacebookBtnWidget.init= function () {
	
	$("#facebookMenu").append(

				"<div>Choose facebook social plugin<select id='fbplugin' onchange='appGlobals.currentObject().getPlugin()'>"+
				"<option value='buttons'>Buttons</option>"+
				"<option value='posts'>Posts</option>"+
				"<option value='comments'>Comments</option>"+
				"</select></div><br>")


    $("#facebookMenu").append("<div id='fbbtn'>URL<input type='text' id='newFacebookURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>"+

    							"<div>Choose layout<select id='layout' onchange='appGlobals.currentObject().getLayout()'>"+
    							"<option value='standard'>standard</option>"+
    							"<option value='box_count'>box_count</option>"+
    							"<option value='button_count'>button_count</option>"+
    							"<option value='button'>button</option>"+
    							"</select></div>"+
   
    							"<div>Choose action type<select id='actiontype' onchange='appGlobals.currentObject().getactiontype()'>"+
    							"<option value='like'>like</option>"+
    							"<option value='recommend'>recommend</option>"+
    							"</select></div>"+

    							"<br>Show share button<input type='checkbox' id='showsharebutton' onclick='appGlobals.currentObject().showShareButton()'>"+
    
    							"<br>Show Friend's faces<input type='checkbox' id='showfaces' onclick='appGlobals.currentObject().showFaces()'></div>")
    
    $("#facebookMenu").append("<br>Show Facebook posts<input type='checkbox' id='showposts' onclick='appGlobals.currentObject().showPosts()'>")
    
    $("#facebookMenu").append("<br>Show Facebook comments<input type='checkbox' id='showcomments' onclick='appGlobals.currentObject().showComments()'>")


}

