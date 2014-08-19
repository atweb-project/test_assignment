
/*
 * Twitter Widget
 */

function TwitterWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)   
     
     	var TwPlugin = "buttons"
       
     //Tweet button plugin
        var url = "http://example.com/comments"
     	var Count = "horizontal"
        
    //Twitter feed plugin 		
     	var urlF = "133640144317198338"
    
    //Twitter follow plugin
     	var urlFo = "https://twitter.com/twitterapi"
     	var User = "@twitterapi"
     	var showUserName = true
     	var Show_Count = true

       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {
            	
            	if( typeof (param.TwPlugin) !== 'undefined') TwPlugin = param.TwPlugin

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.Count) !== 'undefined') Count = param.Count
                
                if (typeof (param.urlF) !== 'undefined') urlF = param.urlF
                
                if (typeof (param.urlFo) !== 'undefined') urlFo = param.urlFo
                
                if (typeof (param.User) !== 'undefined') User = param.User
                
                if (typeof (param.showUserName) !== 'undefined') showUserName = param.showUserName
                
                if (typeof (param.Show_Count) !== 'undefined') Show_Count = param.Show_Count

                   //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
              

            return '<div  id="' + this.getId() + '" style="width:100%; height:100%;">'+
            	   '<iframe width="100%" id="twbuttons-' + this.getId() + '" height="100%" src="twitter/twitterbtnWidget.html" scrolling="no" frameborder="0" allowTransparency="true" url="'+url+'" count="'+Count+'"></iframe>'+
            	   '<iframe width="100%" id="twfeeds-' + this.getId() + '" height="100%" src="twitter/twitterfeedWidget.html" scrolling="no" frameborder="0" allowTransparency="true" url="'+urlF+'"></iframe>'+
            	   '<iframe width="100%" id="twfollow-' + this.getId() + '" height="100%" src="twitter/twitterfollowbtnWidget.html" scrolling="no" frameborder="0" allowTransparency="true"'+
                   'url="'+urlFo+'" user="'+User+'" showusername="'+showUserName+'" showcount="'+Show_Count+'"></iframe>'
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'TwPlugin') TwPlugin =  param[i].value 
                
                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'Count') Count = param[i].value
                
                if (param[i].prop == 'urlF') urlF = param[i].value
                
                if (param[i].prop == 'urlFo') urlFo = param[i].value
                
                if (param[i].prop == 'User') User = param[i].value
                
                if (param[i].prop == 'showUserName') showUserName = param[i].value
                
                if (param[i].prop == 'Show_Count') Show_Count = param[i].value
                   

            }
            
            if ((appGlobals.isInDesignMode() == true) && ( TwPlugin == 'buttons' )) {
            	
            	$('#twbuttons-' + this.getId()).attr( 'url', url) 
            	$('#twbuttons-' + this.getId()).attr( 'count', Count)
            	$('#twbuttons-' + this.getId()).attr( 'src', function ( i, val ) { return val; })
            	
             }
            
            if ((appGlobals.isInDesignMode() == true) && ( TwPlugin == 'feeds' )) {
            	
            	$('#twfeeds-' + this.getId()).attr( 'url', urlF) 
            	$('#twfeeds-' + this.getId()).attr( 'src', function ( i, val ) { return val; })
            	
             }
            
            if ((appGlobals.isInDesignMode() == true) && ( TwPlugin == 'follow' )) {
            	
            	$('#twfollow-' + this.getId()).attr( 'url', urlFo) 
            	$('#twfollow-' + this.getId()).attr( 'user', User) 
            	$('#twfollow-' + this.getId()).attr( 'showusername', showUserName) 
            	$('#twfollow-' + this.getId()).attr( 'showcount', Show_Count)
            	$('#twfollow-' + this.getId()).attr( 'src', function ( i, val ) { return val; })
            	
             }
            
              
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")
        	
        	$('#twplugin').prop('value', TwPlugin )

            $('#newTwitterURLText').prop('value', url )
            
            $('#lcount').prop('value', Count )
           // alert($('#lcount').prop('value'))
            
            $('#newTwitterFeedURLText').prop('value', urlF )
            
            $('#newTwitterfollowURLText').prop('value', urlFo )
            
            $('#newUserfollowURLText').prop('value', User )
            
            $('#showuser').prop('checked', showUserName )
            
            $('#showcount').prop('checked', Show_Count )
            
            var TPluginValue = TwPlugin 
        	
        	switch (TPluginValue) { 
		     case 'buttons' : 

		    	 	$('#twbtn').show()
	                
	            	$('#twbuttons-' + this.getId()).show()
	            	
	            	$('#twfeeds-' + this.getId()).hide()
	            	
	            	$('#twfeeds').hide()
	            	
	            	$('#twfollow-' + this.getId()).hide()
	            	
	            	$('#twfollow').hide()
	            	
	            	// container
	    				$(".elementContainer:has(#"+ this.getId() +")").css({
	    					width:'100',
	    					height: '100'
	    				})
		    	// alert('container' + getNumberAtEnd())

		         break;
		     case 'feeds' : 
		    	 
		    	 	$('#twbtn').hide()
	                
	            	$('#twbuttons-' + this.getId()).hide()
	            	
	            	$('#twfollow-' + this.getId()).hide()
	            	
	            	$('#twfollow').hide()
	            	
	            	$('#twfeeds-' + this.getId()).show()
	            	
	            	$('#twfeeds').show()
	            	
    				// container
	    				$(".elementContainer:has(#"+ this.getId() +")").css({
	    					width:'400',
	    					height: '300'					
	    				})
	    				
			 
		         break;
		     case 'follow' : 
		    	 
		    	 	$('#twbtn').hide()
	                
	            	$('#twbuttons-' + this.getId()).hide()
	            	
	            	$('#twfollow-' + this.getId()).show()
	            	
	            	$('#twfollow').show()
	            	
	            	$('#twfeeds-' + this.getId()).hide()
	            	
	            	$('#twfeeds').hide()
		    	 
	            	// container
	    				$(".elementContainer:has(#"+ this.getId() +")").css({
	    					width:'200',
	    					height: '50'					
	    				})
	            	
		         break;      
        	}
            
       },

       this.initElement = function()
       {
    	   
    	   if ((appGlobals.isInDesignMode() == false))
    		   
    		   var TPluginPreviewValue = TwPlugin 
           	
           	switch (TPluginPreviewValue) { 
   		     case 'buttons' : 
	 	 	                
   	            	$('#twbuttons-' + this.getId()).show()
   	            	
   	            	$('#twfollow-' + this.getId()).hide()
   	            	
   	            	$('#twfeeds-' + this.getId()).hide()
   	            	   		    	 
   		         break;
   		     case 'feeds' : 
   		    	 	                
   	            	$('#twbuttons-' + this.getId()).hide()
   	            	
   	            	$('#twfollow-' + this.getId()).hide()
   	            	
   	            	$('#twfeeds-' + this.getId()).show()
   	            	
   		         break;
   		     case 'follow' : 
   		    	 
   	            	$('#twbuttons-' + this.getId()).hide()
   	            	
   	            	$('#twfollow-' + this.getId()).show()
   	            	
   	            	$('#twfeeds-' + this.getId()).hide()
   	            	
   			
   		         break;      
           	}
            
            	
        },
        
        this.getTWPlugin = function ()
        {
                    
            this.myRegisterUniquePropEvent(  [{ 'prop': 'TwPlugin', 'ov': TwPlugin, 'nv': $('#twplugin').prop('value') }])

        },
        
        this.changeURL = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newTwitterURLText').prop('value') }])

        },


        this.getTweetLayout = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'Count', 'ov': Count, 'nv': $('#lcount').prop('value') }])

        },
        
        this.changeURLF = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'urlF', 'ov': urlF, 'nv': $('#newTwitterFeedURLText').prop('value') }])

        },
        
        this.changeURLFo = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'urlFo', 'ov': urlFo, 'nv': $('#newTwitterfollowURLText').prop('value') }])

        },


        this.changeUsername = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'User', 'ov': User, 'nv': $('#newUserfollowURLText').prop('value') }])

        },
        
        this.showUser = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'showUserName', 'ov': showUserName, 'nv': $('#showuser').prop('checked') }])

        },
        
        this.showCount = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'Show_Count', 'ov': Show_Count, 'nv': $('#showcount').prop('checked') }])

        },
        

       this.createJSON = function () {
         
            return { 'TwPlugin': TwPlugin, 'url': url, 'Count': Count, 'urlF': urlF, 'urlFo': urlFo, 'User': User, 'showUserName': showUserName, 'Show_Count':Show_Count } 
        }
        


    }
   

TwitterWidget.buttomImage= 'images/button_icon.png'
TwitterWidget.typeId= 'twitter'
TwitterWidget.myClass= 'widget_twitter'
TwitterWidget.initialWidth= '100'
TwitterWidget.initialHeight= '100'
TwitterWidget.actionsSectionId= 'twitterMenu'


TwitterWidget.init= function () {
	
	$("#twitterMenu").append(

			"<div>Choose twitter social plugin<select id='twplugin' onchange='appGlobals.currentObject().getTWPlugin()'>"+
			"<option value='buttons'>Tweet Button</option>"+
			"<option value='feeds'>Feeds</option>"+
			"<option value='follow'>Follow Button</option>"+
			"</select></div><br>")

   $("#twitterMenu").append("<div id='twbtn'>URL<input type='text' id='newTwitterURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>"+

   							"<div>Choose layout<select id='lcount' onchange='appGlobals.currentObject().getTweetLayout()'>"+
    							"<option value='horizontal'>horizontal</option>"+
    							"<option value='vertical'>vertical</option>"+
    							"<option value='none'>none</option>"+
    							"</select></div></div>")   	
    							
   $("#twitterMenu").append("<div id='twfeeds'>Status Id<input type='text' id='newTwitterFeedURLText'><button onclick='appGlobals.currentObject().changeURLF()'>Update</button></div>")
   
   $("#twitterMenu").append("<div id='twfollow'>URL<input type='text' id='newTwitterfollowURLText'><button onclick='appGlobals.currentObject().changeURLFo()'>Update</button>"+
   
   							"<br>User to follow<input type='text' id='newUserfollowURLText'><button onclick='appGlobals.currentObject().changeUsername()'>Update</button>"+
   
							"<br>Show user name<input type='checkbox' id='showuser' onclick='appGlobals.currentObject().showUser()'>"+
    
							"<br>Show Followers count display<input type='checkbox' id='showcount' onclick='appGlobals.currentObject().showCount()'></div>")

}

