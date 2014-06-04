

    
    function RssWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      

        this.createElement= function (param) {

            var buttonText = 'Button!'


            if (typeof (param) !== 'undefined') {

                if (typeof (param.text) !== 'undefined') buttonText = param.text

            }

           
            return '<div id="' + this.getId()  +  '" style="width:100%; height:100%"></div>'

        },
        
        this.initElement = function(param) {

			
			
			// var rssAnimation = function(e) {
			//	 $.zazar.ticker({selector: selector})
			// }
        	//var selector = '#'+ this.getId() + ' ul'
        	//var selectedValue = this.getValue()
        	//alert(selectedValue)
				
        	this.getValue()
	

		

        },
        
        this.getValue = function() {
        	 
        	
        	var selector = '#'+ this.getId() + ' ul'
        	var animationValue =  $('#animation').prop('value')
        	//alert(animationValue);
        	
        	switch (animationValue) { 
		     case 1 : 
		    	 $('#'+ this.getId() ).rssfeed('http://feeds.reuters.com/reuters/oddlyEnoughNews',{
		        		limit: 5,
		        		header: false,
		        		titletag: 'div',
		        		date: false,
		        		content: false
		        		}, function(e){
		        			
		        			  $.zazar.ticker({selector: selector}) 
		        		});
		    	 
		         break;
		     case 2 : 
		    	 
		    	 $('#'+ this.getId() ).rssfeed('http://feeds.reuters.com/reuters/oddlyEnoughNews',{
		        		limit: 5,
		        		header: false,
		        		titletag: 'div',
		        		date: false,
		        		content: false
		        		}, function(e){
		        			
		        			  $.zazar.slider({selector: selector}) 
		        		});
			 
		         break;
		     case 3 : 
		    	 
				 $.zazar.rotate({selector: selector})
			
		         break;      
		     default:
		    	 $('#'+ this.getId() ).rssfeed('http://feeds.reuters.com/reuters/oddlyEnoughNews',{
		        		limit: 5,
		        		header: false,
		        		titletag: 'div',
		        		date: false,
		        		content: false
		        		});
		         
        	}
        	
        	
        	
        	
        	
        },

        this.createJSON = function() {

            return {  }

        },
        
        this.changeLabel= function()
         {

         //  alert ("button clicked")
           // alert (  ' currentId '+currentID+" texregisterUniquePropEventt "+ $('#newButtonText').prop('value') )

            this.myRegisterUniquePropEvent( [{ 'prop': 'text', 'ov': $('#' + this.getId()  ).html(), 'nv': $('#newButtonText').prop('value') }])
             

        },

        this.propChange= function (param) {

           // alert ("button prop change "+this.getId()+" param "+param.length)

            $('#' + this.getId() ).html(param[0].value)

        }


        ,

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

            $('#newButtonText').prop('value', $('#' + this.getId()  ).html())
              

         }
        
    }

// static variables/functions

    RssWidget.init = function () {
    $("#rssMenu").append("<div><select id='animation' onchange='appGlobals.currentObject().getValue()'>"+
    		"<option>Choose feed animation</option>"+
    		"<option value='1'>Ticker</option>"+
    		"<option value='2'>Slider</option>"+
    		"<option value='3'>Rotate</option>"+
    		"</select></div>")
}
RssWidget.buttomImage='images/button_icon.png'
RssWidget.typeId= 'rss'
RssWidget.myClass= 'widget_rss'
RssWidget.initialWidth='300'
RssWidget.initialHeight= '250'
RssWidget.actionsSectionId='rssMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
