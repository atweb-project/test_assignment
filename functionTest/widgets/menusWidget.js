/*
 * This widget is based on the SmartMenus for jQuery plugin, 
 * http://www.smartmenus.org/docs/
 */

    
    function MenusWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var VertiCal = false
        var initialMenuItems = 'item 1,item 2,item 3'
        var menuLinks = '#,index.html,#'
        var	Getmenuitems = 'item 1,item 3'
        var SubMenuItems = 'subitem 1,subitem 2,subitem 3/subitem 4,subitem 5,subitem 6'
        var SubMenuLinks = 'subitem 1,subitem 2,subitem 3/subitem 4,subitem 5,subitem 6'
        
        
        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.VertiCal) !== 'undefined') VertiCal = param.VertiCal
                
                if (typeof (param.initialMenuItems) !== 'undefined') initialMenuItems = param.initialMenuItems
                
                if (typeof (param.menuLinks) !== 'undefined') menuLinks = param.menuLinks
                
                if (typeof (param.Getmenuitems) !== 'undefined') Getmenuitems = param.Getmenuitems
                
                if (typeof (param.SubMenuItems) !== 'undefined') SubMenuItems = param.SubMenuItems
                
                if (typeof (param.SubMenuLinks) !== 'undefined') SubMenuLinks = param.SubMenuLinks
                
            }

            return '<iframe id="'+ this.getId() +'" width="100%" height="100%" src="menu/menuWidget.html" frameborder="0"'+
            	   'verticalmenu="'+VertiCal+'" menuitems="'+initialMenuItems+'" getmenuitems="'+Getmenuitems+'"'+
            	   'submenuitems="'+SubMenuItems+'" menulinks="'+menuLinks+'" submenulinks="'+SubMenuLinks+'"></iframe>'

        },
        
        this.initElement = function(param){
        	
    	    
		},
		
		this.propChange = function (param) {
			
			for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'VertiCal') VertiCal = param[i].value 
				if (param[i].prop == 'initialMenuItems') initialMenuItems = param[i].value 
				if (param[i].prop == 'menuLinks') menuLinks = param[i].value 
				if (param[i].prop == 'Getmenuitems') Getmenuitems = param[i].value 
				if (param[i].prop == 'SubMenuItems') SubMenuItems = param[i].value 
				if (param[i].prop == 'SubMenuLinks') SubMenuLinks = param[i].value 
					
				}
							
				$('#'+this.getId() ).attr( 'verticalmenu', VertiCal)
				$('#'+this.getId() ).attr( 'menuitems', initialMenuItems)
				$('#'+this.getId() ).attr( 'getmenuitems', Getmenuitems)
				$('#'+this.getId() ).attr( 'submenuitems', SubMenuItems)
				
				$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });

	    },
	    
	    this.selectionChanged = function()  {

	    		$('#verticalmenu').prop('checked', VertiCal)
	    		$('#initialmenuitems').prop('value', initialMenuItems)
	    		$('#menuitemlinks').prop('value', menuLinks)
	    		$('#menuitem').prop('value', Getmenuitems)
	    		$('#submenuitems').prop('value', SubMenuItems)
	    		$('#submenulinks').prop('value', SubMenuLinks )
	    		
	    },
	    
	    this.chooseMenuLayout = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'VertiCal', 'ov' : VertiCal, 'nv' : $('#verticalmenu').prop('checked')} ])
	    	
	    },
	    
	    this.chooseMenuItems = function() {
	    	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'initialMenuItems', 'ov' : initialMenuItems, 'nv' : $('#initialmenuitems').prop('value')} ])
	    	
	    },
	    
	    this.chooseMenuItemLinks = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'menuLinks', 'ov' : menuLinks, 'nv' : $('#menuitemlinks').prop('value')} ])
	    	
	    },
	    
	    this.getMenuItems = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'Getmenuitems', 'ov' : Getmenuitems, 'nv' : $('#menuitem').prop('value')} ])
	    	
	    },
	    
	    this.chooseSubMenuItems = function() {
	    	   	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'SubMenuItems', 'ov' : SubMenuItems, 'nv' : $('#submenuitems').prop('value')} ])
	    	
	    },
	    
	    this.chooseSubItemLinks = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'SubMenuLinks', 'ov' : SubMenuLinks, 'nv' : $('#submenulinks').prop('value')} ])
	    	
	    },
	    
	   
	    
        this.createJSON = function() {
	    	
	      //alert ("json NewItemTxt " + NewItemTxt )

            return { 'VertiCal': VertiCal, 'initialMenuItems': initialMenuItems, 'Getmenuitems': Getmenuitems, 'SubMenuItems': SubMenuItems }

        }
                   
    }

// static variables/functions

MenusWidget.init = function () {
    $("#menusMenu").append("<br>Choose vertical layout of the menu(default is horizontal)<input type='checkbox' id='verticalmenu' name='verticalmenu' value='' onclick='appGlobals.currentObject().chooseMenuLayout()'>")
    $("#menusMenu").append("<br>Choose menu items seperated by comma<br><textarea id='initialmenuitems'></textarea><br><button onclick='appGlobals.currentObject().chooseMenuItems()'>Update</button>")
    $("#menusMenu").append("<br>Choose links for menu items seperated by comma<textarea id='menuitemlinks'></textarea><br><button onclick='appGlobals.currentObject().chooseMenuItemLinks()'>Update</button>")    
    $("#menusMenu").append("<br>Choose menu items in order to put submenu items<textarea id='menuitem'></textarea><br><button onclick='appGlobals.currentObject().getMenuItems()'>Update</button>")
    $("#menusMenu").append("<br>Choose Submenu Items seperated by '/' for each menu item<textarea id='submenuitems'></textarea><br><button onclick='appGlobals.currentObject().chooseSubMenuItems()'>Update</button>")
    $("#menusMenu").append("<br>Choose Submenu Item Links<textarea id='submenulinks'></textarea><br><button onclick='appGlobals.currentObject().chooseSubItemLinks()'>Update</button>")
}
MenusWidget.buttomImage='images/button_icon.png'
MenusWidget.typeId= 'menus'
MenusWidget.myClass= 'widget_menus'
MenusWidget.initialWidth='550'
MenusWidget.initialHeight= '300'
MenusWidget.actionsSectionId='menusMenu'
