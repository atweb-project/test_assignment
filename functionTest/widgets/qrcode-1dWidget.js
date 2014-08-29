
/*
 * Qr Code and 1d(barcode) Widget
 */

function QrCodeWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype) 
     
     	var TypeQrcode = "text"
        
      //FB buttons plugin
     	var url = "https://developers.facebook.com/docs/plugins/"
     	var Layout = "standard"
        var ActionType = "like"
        var Share = true
        var Showfaces = true
        

    //FB posts plugin    
        var urlP = "https://www.facebook.com/FacebookDevelopers/posts/10151471074398553"
        
   //FB comments plugin
        var urlC = "http://example.com/comments"
        var NumPosts = 4
        var ColorScheme = "light"
        	

       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {
            	
            	if( typeof (param.TypeQrcode) !== 'undefined') TypeQrcode = param.TypeQrcode

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.Layout) !== 'undefined') Layout = param.Layout

                if (typeof (param.ActionType) !== 'undefined') ActionType = param.ActionType

                if (typeof (param.Share) !== 'undefined') Share = param.Share

                if( typeof (param.Showfaces) !== 'undefined') Showfaces = param.Showfaces
                           
                if( typeof (param.urlP) !== 'undefined') urlP = param.urlP
                
                if( typeof (param.urlC) !== 'undefined') urlC = param.urlC
                
                if( typeof (param.NumPosts) !== 'undefined') NumPosts = param.NumPosts
                
                if( typeof (param.ColorScheme) !== 'undefined') ColorScheme = param.ColorScheme

                //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
            

            return '<div  id="' + this.getId() + '" class="code" style="width:100%; height:100%;">'+
            	   //'<iframe width="100%" id="fbbuttons-' + this.getId() + '" height="100%" src="//www.facebook.com/plugins/like.php?href='+url+'&amp;width&amp;layout='+Layout+'&amp;action='+ActionType+'&amp;show_faces='+Showfaces+'&amp;share='+Share+'&amp;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'+
            	  // '<iframe width="100%" id="fbposts-' + this.getId() + '" style="display:none;" height="100%" src="facebook/facebookpostsWidget.html" scrolling="no" frameborder="0" allowTransparency="true" urlp='+urlP+'></iframe>'+
            	 //  '<iframe width="100%" id="fbcomments-' + this.getId() + '"  style="display:none;" height="100%" src="facebook/facebookcommentsWidget.html" scrolling="no" frameborder="0" '+
                 //  'allowTransparency="true" urlc="'+urlC+'" numposts="'+NumPosts+'" colorscheme="'+ColorScheme+'"></iframe>
            	   '</div>'
            
            
           
           
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {
            	
            	if (param[i].prop == 'TypeQrcode') TypeQrcode =  param[i].value

                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'Layout') Layout = param[i].value

                if( param[i].prop == 'ActionType' ) ActionType = param[i].value

                if (param[i].prop == 'Share') Share = param[i].value

                if( param[i].prop == 'Showfaces') Showfaces = param[i].value
                
                if( param[i].prop == 'urlP') urlP = param[i].value
                
                if( param[i].prop == 'urlC') urlC = param[i].value
                
                if( param[i].prop == 'NumPosts') NumPosts = param[i].value
                
                if( param[i].prop == 'ColorScheme') ColorScheme = param[i].value


            }
            
            //alert(urlP)
       /*     if ((appGlobals.isInDesignMode() == true) && ( FbPlugin == 'buttons' )) {
            	
            	$('#fbbuttons-' + this.getId()).attr( 'src',  '//www.facebook.com/plugins/like.php?href='+url+'&width&layout='+Layout+'&action='+ActionType+'&show_faces='+Showfaces+'&share='+Share+'&;' )
            
            }
            
             if ((appGlobals.isInDesignMode() == true) && ( FbPlugin == 'posts' )) {
            	
            	$('#fbposts-' + this.getId()).attr( 'urlp', urlP)  
            	$('#fbposts-' + this.getId()).attr( 'src', function ( i, val ) { return val; })
            	
             }
         
             if ((appGlobals.isInDesignMode() == true) && ( FbPlugin == 'comments' )) {
            	 
            	 $('#fbcomments-' + this.getId()).attr( 'urlc', urlC) 
            	 $('#fbcomments-' + this.getId()).attr( 'numposts', NumPosts)
            	 $('#fbcomments-' + this.getId()).attr( 'colorscheme', ColorScheme)
            
            	 $('#fbcomments-' + this.getId()).attr( 'src', function ( i, val ) { return val; })
            	 
             }*/

        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")
        	
        	$('#qrtype').prop('value', TypeQrcode )

            $('#newFacebookURLText').prop('value', url )
            
            $('#layout').prop('value', Layout )
            
            $('#actiontype').prop('value', ActionType )
            
            $('#showsharebutton').prop('checked', Share )
            
            $('#showfaces').prop('checked', Showfaces )
            
            $('#newFacebookPostsURLText').prop('value', urlP )
            
            $('#newFacebookCommentsURLText').prop('value', urlC )
            
            $('#comments').prop('value', NumPosts )
            
            $('#getcolor').prop('value', ColorScheme)
                      
                   // alert(TypeQrcode)
       },

       this.initElement = function()
       {
    	  // if ((appGlobals.isInDesignMode() == false))
    	   $('#' + this.getId()).ClassyQR({
    		    create: true,
    		    type: TypeQrcode,
    		    text: 'This is the text to embed'
    		});  
    		  
            
            	
       },
       
       this.getQrType = function ()
       {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'TypeQrcode', 'ov': TypeQrcode, 'nv': $('#qrtype').prop('value') }])

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
         
        this.changeURLP = function ()
        {
             this.myRegisterUniquePropEvent(  [{ 'prop': 'urlP', 'ov': urlP, 'nv': $('#newFacebookPostsURLText').prop('value') }])

        },
         
        this.changeURLC = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'urlC', 'ov': urlC, 'nv': $('#newFacebookCommentsURLText').prop('value') }])

        }, 
        
        this.getCommentsNum = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'NumPosts', 'ov': NumPosts, 'nv': $('#comments').prop('value') }])

        },
        
        this.getcolor = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'ColorScheme', 'ov': ColorScheme, 'nv': $('#getcolor').prop('value') }])

        },
        
        this.getPlugin = function ()
        {
                    
            this.myRegisterUniquePropEvent(  [{ 'prop': 'FbPlugin', 'ov': FbPlugin, 'nv': $('#fbplugin').prop('value') }])

       },


       this.createJSON = function () {
         
            return { 'TypeQrcode': TypeQrcode, 'url': url,'Layout': Layout,'ActionType': ActionType, 'Share': Share, 'Showfaces': Showfaces, 'urlP': urlP, 'urlC': urlC, 'NumPosts':NumPosts, 'ColorScheme': ColorScheme } 
        }
        


    }
   

QrCodeWidget.buttomImage= 'images/button_icon.png'
QrCodeWidget.typeId= 'qrcode'
QrCodeWidget.myClass= 'widget_qrcode'
QrCodeWidget.initialWidth= '230'
QrCodeWidget.initialHeight= '230'
QrCodeWidget.actionsSectionId= 'qrcodeMenu'


QrCodeWidget.init = function () {
	
	$("#qrcodeMenu").append(
			"<div>Choose the type of qr code<select id='qrtype' onchange='appGlobals.currentObject().getQrType()'>"+
			"<option value='text'>Text</option>"+
			"<option value='email'>Email</option>"+
			"<option value='location'>Location</option>"+
			"<option value='sms'>Sms</option>"+
			"<option value='call'>Call</option>"+
			"<option value='url'>Url</option>"+
			"<option value='wifi'>Wifi</option>"+
			"<option value='contact'>Contact</option>"+
			"</select></div><br>")


    $("#qrcodeMenu").append("<div id='fbbtn'>URL<input type='text' id='newFacebookURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>"+

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
    
    $("#qrcodeMenu").append("<div id='fbposts'>URL<input type='text' id='newFacebookPostsURLText'><button onclick='appGlobals.currentObject().changeURLP()'>Update</button></div>")
    
    $("#qrcodeMenu").append("<div id='fbcomments'>URL<input type='text' id='newFacebookCommentsURLText'><button onclick='appGlobals.currentObject().changeURLC()'>Update</button>"+
    						  "<br>Choose the number of comments to show <input type='edit' id='comments' name='comments' value='' >"+
    						  "<div>Choose the color of the scheme<select id='getcolor' onchange='appGlobals.currentObject().getcolor()'>"+
    						  "<option value='light'>light</option>"+
    						  "<option value='dark'>dark</option>"+
    						  "</select></div></div>")

    $("#comments").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().getCommentsNum() } })    

}

