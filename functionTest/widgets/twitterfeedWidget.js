
/*
 * Twitter Embedded Tweets Widget
 */

function TwitterFeedWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)       
        
        var url = "133640144317198338"

       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {

                if ( typeof (param.url) !== 'undefined') url = param.url

             }
              

            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="twitter/twitterfeedWidget.html" scrolling="no" frameborder="0" allowTransparency="true" url="'+url+'"></iframe>'
            
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'url') url =  param[i].value 
                  
            }
            
            $('#'+this.getId() ).attr( 'url', url)
            $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })

            
                      
        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")

            $('#newTwitterFeedURLText').prop('value', url )
            
       },

       this.initElement = function()
       {

            
            	
        },
        
        this.changeURL = function ()
        {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newTwitterFeedURLText').prop('value') }])

        },


       this.createJSON = function () {
         
            return { 'url': url } 
        }
        


    }
   

TwitterFeedWidget.buttomImage= 'images/button_icon.png'
TwitterFeedWidget.typeId= 'tw_feed'
TwitterFeedWidget.myClass= 'widget_twitter_feed'
TwitterFeedWidget.initialWidth= '400'
TwitterFeedWidget.initialHeight= '300'
TwitterFeedWidget.actionsSectionId= 'twitterfeedMenu'


TwitterFeedWidget.init= function () {

    $("#twitterfeedMenu").append("Status Id<input type='text' id='newTwitterFeedURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")

}

