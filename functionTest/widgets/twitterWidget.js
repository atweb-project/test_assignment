
/*
 * Twitter Button Widget
 */

function TwitterBtnWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)       
        
        var url = "http://example.com/comments"
     	var Count = "horizontal"
        


       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
   
            
            if( typeof(param) !== 'undefined') {

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.Count) !== 'undefined') Count = param.Count

                   //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
              

            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="twitter/twitterbtnWidget.html" scrolling="no" frameborder="0" allowTransparency="true"'+
            'url="'+url+'" count="'+Count+'"></iframe>'
            
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'Count') Count = param[i].value

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

