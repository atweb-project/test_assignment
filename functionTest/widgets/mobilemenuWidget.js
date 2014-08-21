

    
    function MobileMenuWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        
        var Position = 'left' 
        var DisplayMode = 'push'
        var SwipeMove = false
        var initialMenuItems = 'item 1,item 2,item 3'
        var menuLinks = '#,index.html,#'

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.Position) !== 'undefined') Position = param.Position
                
                if (typeof (param.DisplayMode) !== 'undefined') DisplayMode = param.DisplayMode
                
                if (typeof (param.SwipeMove) !== 'undefined') SwipeMove = param.SwipeMove
                
                if (typeof (param.initialMenuItems) !== 'undefined') initialMenuItems = param.initialMenuItems
                
                if (typeof (param.menuLinks) !== 'undefined') menuLinks = param.menuLinks

            }

           
            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="mobilemenu/mobilemenuWidget.html" scrolling="no" frameborder="0" allowTransparency="true" position="'+
            		Position+'" displaymode="'+DisplayMode+'" swipemove="'+SwipeMove+'" menuitems="'+initialMenuItems+'" menulinks="'+menuLinks+'"></iframe>'

        },

        this.createJSON = function() {

            return { 'Position': Position, 'DisplayMode': DisplayMode, 'SwipeMove': SwipeMove, 'initialMenuItems': initialMenuItems, 'menuLinks': menuLinks }

        },
        
        this.getPosition= function()
         {

            this.myRegisterUniquePropEvent( [{ 'prop': 'Position', 'ov': Position, 'nv': $('#pos').prop('value') }])
             
        },
        
        this.getDisplayMode= function()
        {

           this.myRegisterUniquePropEvent( [{ 'prop': 'DisplayMode', 'ov': DisplayMode, 'nv': $('#dmode').prop('value') }])
            
       },
       
       this.getSwipe= function()
       {

          this.myRegisterUniquePropEvent( [{ 'prop': 'SwipeMove', 'ov': SwipeMove, 'nv': $('#swipem').prop('checked') }])
           
      },
      
      this.chooseMenuItems = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'initialMenuItems', 'ov' : initialMenuItems, 'nv' : $('#initialmobilemenuitems').prop('value')} ])
	    	
	    },
	    
	   this.chooseMenuItemLinks = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'menuLinks', 'ov' : menuLinks, 'nv' : $('#mobilemenuitemlinks').prop('value')} ])
	    	
	    },
	    
	    this.initElement = function(param){
        	
    	    
		},

        this.propChange= function (param) {

        	 for (var i = 0; i < param.length; i++) {

                 if (param[i].prop == 'Position') Position =  param[i].value 
                 
                 if (param[i].prop == 'DisplayMode') DisplayMode =  param[i].value 
                 
                 if (param[i].prop == 'SwipeMove') SwipeMove =  param[i].value 
                 
                 if (param[i].prop == 'initialMenuItems') initialMenuItems = param[i].value 
 				
                 if (param[i].prop == 'menuLinks') menuLinks = param[i].value 
              
        	 }
        	 
        	 $('#' + this.getId()).attr( 'position', Position)
        	 $('#' + this.getId()).attr( 'displaymode', DisplayMode)
        	 $('#' + this.getId()).attr( 'swipemove', SwipeMove)
        	 $('#'+this.getId() ).attr( 'menuitems', initialMenuItems)
        	 $('#'+this.getId() ).attr( 'menulinks', menuLinks)
         	 $('#' + this.getId()).attr( 'src', function ( i, val ) { return val; })

        },

        this.selectionChanged=function()  {

        	$('#pos').prop('value', Position)
        	$('#dmode').prop('value', DisplayMode)
        	$('#swipem').prop('checked', SwipeMove)
        	$('#initialmobilemenuitems').prop('value', initialMenuItems)
	    	$('#mobilemenuitemlinks').prop('value', menuLinks)
              

         }
        
    }

// static variables/functions

MobileMenuWidget.init = function () {
    $("#mobileMenu").append("<div>Choose position of the menu<select id='pos' onchange='appGlobals.currentObject().getPosition()'>"+
							"<option value='left'>left</option>"+
							"<option value='right'>right</option>"+
							"</select></div>")
							
	$("#mobileMenu").append("<div>Choose the display mode of the menu<select id='dmode' onchange='appGlobals.currentObject().getDisplayMode()'>"+
							"<option value='push'>push</option>"+
							"<option value='overlay'>overlay</option>"+
							"<option value='reveal'>reveal</option>"+
							"</select></div>")
							
	$("#mobileMenu").append("Choose to reveal menu with swipe<input type='checkbox' id='swipem' name='swipem' value='' onclick='appGlobals.currentObject().getSwipe()'>")
	
	$("#mobileMenu").append("<br>Choose menu items seperated by comma<br><textarea id='initialmobilemenuitems'></textarea><br><button onclick='appGlobals.currentObject().chooseMenuItems()'>Update</button>")
	
    $("#mobileMenu").append("<br>Choose links for menu items seperated by comma<textarea id='mobilemenuitemlinks'></textarea><br><button onclick='appGlobals.currentObject().chooseMenuItemLinks()'>Update</button>") 
}
MobileMenuWidget.buttomImage='images/button_icon.png'
MobileMenuWidget.typeId= 'mobimenu'
MobileMenuWidget.myClass= 'widget_mmenu'
MobileMenuWidget.initialWidth='360'
MobileMenuWidget.initialHeight= '240'
MobileMenuWidget.actionsSectionId='mobileMenu'

