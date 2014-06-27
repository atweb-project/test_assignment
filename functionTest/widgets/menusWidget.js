

    
    function MenusWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var VertiCal = false
        var initialMenuItems = 'item 1,item 2,item 3'
        var	Getmenuitems = 'item 1'
        var SubMenuItems = ''
        
        
        var NewItemTxt = ''
        var NewSubItemTxt = ''

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.VertiCal) !== 'undefined') VertiCal = param.VertiCal
                
                if (typeof (param.initialMenuItems) !== 'undefined') initialMenuItems = param.initialMenuItems
                
                if (typeof (param.Getmenuitems) !== 'undefined') Getmenuitems = param.Getmenuitems
                
                if (typeof (param.SubMenuItems) !== 'undefined') SubMenuItems = param.SubMenuItems
                
                if (typeof (param.NewItemTxt) !== 'undefined') NewItemTxt = param.NewItemTxt
                
                if (typeof (param.NewSubItemTxt) !== 'undefined') NewSubItemTxt = param.NewSubItemTxt

            }

            return '<iframe id="'+ this.getId() +'" width="100%" height="100%" src="menu/menuWidget.html" frameborder="0"'+
            	   'verticalmenu="'+VertiCal+'" newitem="'+NewItemTxt+'" menuitems="'+initialMenuItems+'" getmenuitems="'+Getmenuitems+'"'+
            	   'submenuitems="'+SubMenuItems+'"></iframe>'

        },
        
        this.initElement = function(param){
        	/*if ((appGlobals.isInDesignMode() == false))
        	var example = $('#example').superfish({
				//add options here if required
			});*/
        	/*if ((appGlobals.isInDesignMode() == false))
        	$('#main-menu').smartmenus();
        	*/
        	
        	
        	
	    	
    	    var GetValues = initialMenuItems.split(",")
    	    
    	    	$('#menuitem').empty()  
            	
            	for (var i = 0; i < GetValues.length; i++) {
            		
            		$('#menuitem' ).append("<option value='"+GetValues[i]+"'>"+GetValues[i]+"</option>")
            	}
    	    
		},
		
		this.propChange = function (param) {
			
			for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'VertiCal') VertiCal = param[i].value 
				if (param[i].prop == 'initialMenuItems') initialMenuItems = param[i].value 
				if (param[i].prop == 'Getmenuitems') Getmenuitems = param[i].value 
				if (param[i].prop == 'SubMenuItems') SubMenuItems = param[i].value 
				if (param[i].prop == 'NewItemTxt') NewItemTxt = param[i].value 
				if (param[i].prop == 'NewSubItemTxt') NewSubItemTxt = param[i].value 
					
				}
			
		//	if(Vertical == true){
				// for vertical direction we change the dimensions of the
				// container
			//	$('.elementContainer').css({
				//	width:'135',
				//	height: '345'					
			//	})
				
		//	}				
				
				$('#'+this.getId() ).attr( 'verticalmenu', VertiCal)
				$('#'+this.getId() ).attr( 'menuitems', initialMenuItems)
				$('#'+this.getId() ).attr( 'menuitems', SubMenuItems)
				$('#'+this.getId() ).attr( 'newitem', NewItemTxt)
				$('#'+this.getId() ).attr( 'newsubitem', NewSubItemTxt)
				
				$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });

	    },
	    
	    this.selectionChanged = function()  {

	    		$('#verticalmenu').prop('checked', VertiCal)
	    		$('#initialmenuitems').prop('value', initialMenuItems)
	    		$('#menuitem').prop('value', Getmenuitems)
	    		$('#submenuitems').prop('value', SubMenuItems)
	    		
	    		$('#newItem').prop('value', NewItemTxt)
	    		$('#newSubItem').prop('value', NewSubItemTxt)
	              

	    },
	    
	    this.chooseMenuLayout = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'VertiCal', 'ov' : VertiCal, 'nv' : $('#verticalmenu').prop('checked')} ])
	    	
	    },
	    
	    this.chooseMenuItems = function() {
	    	
	    	var getmenuitems = $('#initialmenuitems').prop('value')
        	//alert(getmenuitems)
	    	
    	    var GetValues = getmenuitems.split(",")
            		
    	    $('#menuitem').empty()  
    	    
            	for (var i = 0; i < GetValues.length; i++) {
            		           		
            		$('#menuitem').append("<option value='"+GetValues[i]+"'>"+GetValues[i]+"</option>")
            	}
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'initialMenuItems', 'ov' : initialMenuItems, 'nv' : $('#initialmenuitems').prop('value')} ])
	    	
	    	
	    },
	    
	    this.getMenuItems = function() {
	    	

	    	
	    /*	var GetValues = getmenuitems.split(",")
        	
        	for (var i = 0; i < GetValues.length; i++) {
        		
        		$('#'+this.getId() ).append("<input type='radio' name='' value='"+Options[i]+"'>"+Options[i]+"<br>")
        	}*/
	    	this.myRegisterUniquePropEvent([ {'prop' : 'Getmenuitems', 'ov' : Getmenuitems, 'nv' : $('#menuitem').prop('value')} ])
	    	
	    },
	    
	    this.chooseSubMenuItems = function() {
	    	   	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'SubMenuItems', 'ov' : SubMenuItems, 'nv' : $('#submenuitems').prop('value')} ])
	    	
	    },
	    
	    this.addNewItem = function() {
	    	
	    	this.myRegisterUniquePropEvent( [{ 'prop': 'NewItemTxt', 'ov': NewItemTxt, 'nv': $('#newItem').prop('value')}])
	    	
	    },
	    
	    this.addNewSubItem = function() {
	    	
	    	this.myRegisterUniquePropEvent( [{ 'prop': 'NewSubItemTxt', 'ov': NewSubItemTxt, 'nv': $('#newSubItem').prop('value')}])
	    	
	    },
	    
        this.createJSON = function() {
	    	
	      //alert ("json NewItemTxt " + NewItemTxt )

            return { 'VertiCal': VertiCal, 'initialMenuItems': initialMenuItems, 'Getmenuitems': Getmenuitems, 'SubMenuItems': SubMenuItems, 'NewItemTxt': NewItemTxt, 'NewSubItemTxt': NewSubItemTxt }

        }
                   
    }

// static variables/functions

MenusWidget.init = function () {
    $("#menusMenu").append("<br>Choose vertical layout of the menu(default is horizontal)<input type='checkbox' id='verticalmenu' name='verticalmenu' value='' onclick='appGlobals.currentObject().chooseMenuLayout()'>")
    $("#menusMenu").append("<br>Menu items<input type='text' id='initialmenuitems'><button onclick='appGlobals.currentObject().chooseMenuItems()'>Add</button>")
    $("#menusMenu").append("<div>Choose menu item<select id='menuitem' onchange='appGlobals.currentObject().getMenuItems()'></select></div>")
    $("#menusMenu").append("Choose Submenu Items<input type='text' id='submenuitems'><button onclick='appGlobals.currentObject().chooseSubMenuItems()'>Add</button>")
    
    $("#menusMenu").append("<br>Add new menu item<input type='text' id='newItem'><button onclick='appGlobals.currentObject().addNewItem()'>Add</button>")
    $("#menusMenu").append("<br>Add new submenu items<input type='text' id='newSubItem'><button onclick='appGlobals.currentObject().addNewSubItem()'>Add</button>")
}
MenusWidget.buttomImage='images/button_icon.png'
MenusWidget.typeId= 'menus'
MenusWidget.myClass= 'widget_menus'
MenusWidget.initialWidth='550'
MenusWidget.initialHeight= '300'
MenusWidget.actionsSectionId='menusMenu'
