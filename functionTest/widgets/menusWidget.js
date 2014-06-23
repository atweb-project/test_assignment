

    
    function MenusWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var VertiCal = false
        var NewItemTxt = ''

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.VertiCal) !== 'undefined') VertiCal = param.VertiCal
                
                if (typeof (param.NewItemTxt) !== 'undefined') NewItemTxt = param.NewItemTxt

            }

            return '<iframe id="'+ this.getId() +'" width="100%" height="100%" src="menu/menuWidget.html" frameborder="0"'+
            	   'verticalmenu="'+VertiCal+'" newitem="'+NewItemTxt+'"></iframe>'

        },
        
        this.initElement = function(param){
        	/*if ((appGlobals.isInDesignMode() == false))
        	var example = $('#example').superfish({
				//add options here if required
			});*/
        	/*if ((appGlobals.isInDesignMode() == false))
        	$('#main-menu').smartmenus();
        	*/
		},
		
		this.propChange = function (param) {
			
			for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'VertiCal') VertiCal = param[i].value 
				if (param[i].prop == 'NewItemTxt') NewItemTxt = param[i].value 
					
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
				$('#'+this.getId() ).attr( 'newitem', NewItemTxt)
				
				$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });

	    },
	    
	    this.selectionChanged = function()  {

	    		$('#verticalmenu').prop('checked', VertiCal)
	    		$('#newItem').prop('value', NewItemTxt)
	              

	    },
	    
	    this.chooseMenuLayout = function() {
	    	
	    	this.myRegisterUniquePropEvent([ {'prop' : 'VertiCal', 'ov' : VertiCal, 'nv' : $('#verticalmenu').prop('checked')} ])
	    	
	    },
	    
	    this.addNewItem = function() {
	    	
	    	this.myRegisterUniquePropEvent( [{ 'prop': 'NewItemTxt', 'ov': NewItemTxt, 'nv': $('#newItem').prop('value')}])
	    	
	    },

        this.createJSON = function() {
	    	
	      //alert ("json NewItemTxt " + NewItemTxt )

            return { 'VertiCal': VertiCal, 'NewItemTxt': NewItemTxt }

        }
                   
    }

// static variables/functions

MenusWidget.init = function () {
    $("#menusMenu").append("<br>Choose vertical layout of the menu(default is horizontal)<input type='checkbox' id='verticalmenu' name='verticalmenu' value='' onclick='appGlobals.currentObject().chooseMenuLayout()'>")
    $("#menusMenu").append("<br>Add new menu item<input type='text' id='newItem'><button onclick='appGlobals.currentObject().addNewItem()'>Add</button>")
}
MenusWidget.buttomImage='images/button_icon.png'
MenusWidget.typeId= 'menus'
MenusWidget.myClass= 'widget_menus'
MenusWidget.initialWidth='550'
MenusWidget.initialHeight= '300'
MenusWidget.actionsSectionId='menusMenu'
