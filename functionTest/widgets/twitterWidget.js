
/*
 * Twitter Button Widget
 */

function TwitterBtnWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)   
     
     	var TwPlugin = "buttons"
       
     //Twitter buttons plugin
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
                
                if (param[i].prop == 'showUserName') showUserName = param[i].value
                
                if (param[i].prop == 'Show_Count') Show_Count = param[i].value
                   

            }
            
            $('#'+this.getId() ).attr( 'url', url)
            $('#'+this.getId() ).attr( 'count', Count)
            $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })

           
                      
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")

            $('#newTwitterURLText').prop('value', url )
            
            $('#lcount').prop('value', Count )
           // alert($('#lcount').prop('value'))
            
       },

       this.initElement = function()
       {

            
            	
        },
        
        this.changeURL = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newTwitterURLText').prop('value') }])

        },


        this.getTweetLayout = function()
        {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'Count', 'ov': Count, 'nv': $('#lcount').prop('value') }])

        },
        

       this.createJSON = function () {
         
            return { 'url': url,'Count': Count } 
        }
        


    }
   

TwitterBtnWidget.buttomImage= 'images/button_icon.png'
TwitterBtnWidget.typeId= 'tw_button'
TwitterBtnWidget.myClass= 'widget_twitter'
TwitterBtnWidget.initialWidth= '100'
TwitterBtnWidget.initialHeight= '100'
TwitterBtnWidget.actionsSectionId= 'twitterMenu'


TwitterBtnWidget.init= function () {

   $("#twitterMenu").append("URL<input type='text' id='newTwitterURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")

   $("#twitterMenu").append("<div>Choose layout<select id='lcount' onchange='appGlobals.currentObject().getTweetLayout()'>"+
    							"<option value='horizontal'>horizontal</option>"+
    							"<option value='vertical'>vertical</option>"+
    							"<option value='none'>none</option>"+
    							"</select></div>")   							

}

