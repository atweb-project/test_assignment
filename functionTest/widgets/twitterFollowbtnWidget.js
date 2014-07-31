
/*
 * Twitter Follow Button Widget
 */

function TwitterFollowBtnWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)       
        
        var url = "https://twitter.com/twitterapi"
        var User = "@twitterapi"
        var showUserName = true
     	var Show_Count = true
        


       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.User) !== 'undefined') User = param.User
                
                if (typeof (param.showUserName) !== 'undefined') showUserName = param.showUserName
                
                if (typeof (param.Show_Count) !== 'undefined') Show_Count = param.Show_Count

                   //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
              

            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="twitter/twitterfollowbtnWidget.html" scrolling="no" frameborder="0" allowTransparency="true"'+
            'url="'+url+'" user="'+User+'" showusername="'+showUserName+'" showcount="'+Show_Count+'"></iframe>'
            
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'User') User = param[i].value
                
                if (param[i].prop == 'showUserName') showUserName = param[i].value
                
                if (param[i].prop == 'Show_Count') Show_Count = param[i].value

            }
            
            $('#'+this.getId() ).attr( 'url', url)
            $('#'+this.getId() ).attr( 'user', User)
            $('#'+this.getId() ).attr( 'showusername', showUserName)
            $('#'+this.getId() ).attr( 'showcount', Show_Count)
            $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })

           
                      
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")

            $('#newTwitterfollowURLText').prop('value', url )
            
            $('#newUserfollowURLText').prop('value', User )
            
            $('#showuser').prop('checked', showUserName )
            
             $('#showuser').prop('checked', Show_Count )
            //alert($('#newUserfollowURLText').prop('value'))
       },

       this.initElement = function()
       {

            
            	
        },
        
        this.changeURL = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newTwitterfollowURLText').prop('value') }])

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
         
            return { 'url': url,'User': User, 'showUserName': showUserName,'Show_Count':Show_Count} 
        }
        


    }
   

TwitterFollowBtnWidget.buttomImage= 'images/button_icon.png'
TwitterFollowBtnWidget.typeId= 'tw_follow'
TwitterFollowBtnWidget.myClass= 'widget_twitter_follow'
TwitterFollowBtnWidget.initialWidth= '200'
TwitterFollowBtnWidget.initialHeight= '50'
TwitterFollowBtnWidget.actionsSectionId= 'twitterfollowMenu'


TwitterFollowBtnWidget.init= function () {

   $("#twitterfollowMenu").append("URL<input type='text' id='newTwitterfollowURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")
   
   $("#twitterfollowMenu").append("<br>User to follow<input type='text' id='newUserfollowURLText'><button onclick='appGlobals.currentObject().changeUsername()'>Update</button>")
   
   $("#twitterfollowMenu").append("<br>Show user name<input type='checkbox' id='showuser' onclick='appGlobals.currentObject().showUser()'>")
    
   $("#twitterfollowMenu").append("<br>Show Followers count display<input type='checkbox' id='showcount' onclick='appGlobals.currentObject().showCount()'>")

   /* $("#twitterfollowMenu").append("<div>Choose layout<select id='count' onchange='appGlobals.currentObject().getLayout()'>"+
    							"<option value='horizontal'>horizontal</option>"+
    							"<option value='vertical'>vertical</option>"+
    							"<option value='none'>none</option>"+
    							"</select></div>")   	*/						

}

