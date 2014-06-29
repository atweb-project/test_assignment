
$(function() {

	// ---- variables ---- //

	var VertiCal = $(window.frameElement).attr('verticalmenu');

	var initialMenuItems = $(window.frameElement).attr('menuitems');

	var menuLinks = $(window.frameElement).attr('menulinks');

	var Getmenuitems = $(window.frameElement).attr('getmenuitems');

	var SubMenuItems = $(window.frameElement).attr('submenuitems');

	var SubMenuLinks = $(window.frameElement).attr('submenulinks');

	//alert(initialMenuItems)

	//alert(SubMenuItems)

	function VerticalValue() {
		
		//Vertical Layout
		
		if (VertiCal == 'true') {
			$('#main-menu').addClass('sm-vertical sm-blue-vertical')
			$('#main-menu').css('width', '30%')
		}

		if (VertiCal == 'false'
				&& $('#main-menu').hasClass('sm-vertical sm-blue-vertical')) {
			$('#main-menu').removeClass('sm-vertical sm-blue-vertical')
		}
	}

	/*function AddNewItem() {
		if(NewItemTxt != null || NewItemTxt.length> 0){
			
			var $menu = $('#main-menu');
			
			// append a new main menu item	
			$menu.append('<li><a href="#">'+NewItemTxt+'</a></li>');
			
			if(NewItemTxt.length> 0 ){
			$menu.children('li:last').append('<ul><li><a href="#">New item</a></li><li><a href="#">New item</a></li><li><a href="#">New item</a></li></ul>');
			}
			$menu.smartmenus('refresh');
		}
		
	}*/

	function MenuItems() {
		
		//Create Menu items

		if (initialMenuItems != null || initialMenuItems.length > 0) {

			var Items = initialMenuItems.split(",")
			// alert(Items)

			var Links = menuLinks.split(",")

			var $menu = $('#main-menu');

			for (var i = 0; i < Items.length && Links.length; i++) {

				$menu.append("<li class='" + Items[i].replace(/\s/g, "")
						+ "'><a href='" + Links[i] + "'>" + Items[i]
						+ "</a></li>")

				$menu.smartmenus('refresh');
			}

		} else {
			alert('Please fill at least on item')
		}

	}

	function SubMenuitems() {
		
		//Create Submenu items
		
		if (SubMenuItems != null || SubMenuItems.length > 0 && Getmenuitems != null || Getmenuitems.length > 0) {

			var MenuItemsValues = Getmenuitems.split(",")
			var SubItems = SubMenuItems.split("/")
			var SubLinks = SubMenuLinks.split("/")
			//alert(SubLinks)

			var assoc = []
			var links = []
			var href = []
			
			for (var i = 0; i < MenuItemsValues.length; i++) {
				
				assoc[MenuItemsValues[i]] = SubItems[i].split(",")
				
				links[MenuItemsValues[i]] = SubLinks[i].split(",")

			}
			
			
				for (l in links) {
					for (lv in links[l]) {
						//alert(links[l][lv])

						//$('.' + l.replace(/\s/g, '') + ' ul').append("<a href='"+links[l][lv]+"'></a>" )
						//$('.'+l.replace(/\s/g, '')+ ' ul li a').append(links[l][lv])
						//alert(links[l][lv])
						//$('.'+l.replace(/\s/g, '')+ ' ul li a').each( function(){ 
						//$(this).attr("href",links[l][lv])
						//});
						//$('.'+l.replace(/\s/g, '')+ ' ul a').each(function( i ) {
						href.push(links[l][lv])
						   // });
					}
				}
				
			console.log(assoc)
			console.log(href)
			
			for (key in assoc) {
				//alert(key +':'+ assoc[key])

				$('.' + key.replace(/\s/g, '')).append("<ul></ul>")
				
				for (v in assoc[key]) {

					$('.' + key.replace(/\s/g, '') + ' ul').append("<li class='" + assoc[key][v].replace(/\s/g, '')+"'><a class='one' href='"+href+"'>" + assoc[key][v] + "</a></li>")

				}
			}
			/*for (var x=0; x < MenuItemsValues.length; x++) {
			 links[MenuItemsValues[x]] = SubLinks[x].split(",")
			 };*/
			console.log(links)
			
			for (var z = 0; z < href.length; z++){
				$('.one').attr("href",href[z])
				alert(href[z])
			}
			
			/* for (var i = 0; i < MenuItemsValues.length; i++){
			  
			  $('.'+MenuItemsValues[i].replace(/\s/g, '')).append("<ul></ul>")
			 
			  
			  //alert(SubItems)
			  	for (var x = 0; x < SubItems.length; x++) {
			  		var EverySubitem = SubItems[x].split(",")
			 //alert(EverySubitem)
			  
			  var SubLinks = SubMenuLinks.split(",")
			  	        
			 
			
			  //alert(Getmenuitems)
			
			  //alert(MenuItemsValues)
			  
			 // }
			  
			  //alert(MenuItemsValues[i])
			 // }
			  
			 	//alert(EverySubitem)     
			 			    			   
			  		for (var j = 0; j < EverySubitem.length && SubLinks.length; j++) {
			  		
			  		//alert(EverySubitem[j])
			  		//alert(MenuItemsValues[i])
			  
			         	$('.'+MenuItemsValues[i].replace(/\s/g, '')+ ' ul').append("<li class='"+EverySubitem[j]+"'><a href='"+SubLinks+"'>"+EverySubitem[j]+"</a></li>") 
			   
			 			}
			 		}
			 }*/
			//}
			$('#main-menu').smartmenus('refresh');

		}

	}

	/*function AddNewSubItem() {
	    if(NewItemTxt != null && SubTxt != null){
	        var SubTxt = NewSubItemTxt.split(",")
	        alert(SubTxt.length)
	     var $menu = $('#main-menu');
	     for(var key in SubTxt) {
	        var value = SubTxt[key];
	    alert(value)
	     $menu.children('li:last').append('<ul><li><a href="#">New item</a></li><li><a href="#">New item</a></li><li><a href="#">New item</a></li></ul>');

	    // refresh the menu after the DOM operations
	    $menu.smartmenus('refresh');
	    }
	   }
	}*/

	VerticalValue()

	MenuItems()

	SubMenuitems()

	//AddNewItem()

	//AddNewSubItem()

	$('#main-menu').smartmenus({
		subMenusSubOffsetX : 1,
		subMenusSubOffsetY : -8
	});

	/*$('#menu-button').click(function() {
	var $this = $(this),
	$menu = $('#main-menu');
	if (!$this.hasClass('collapsed')) {
	$menu.addClass('collapsed');
	$this.addClass('collapsed');
	} else {
	$menu.removeClass('collapsed');
	$this.removeClass('collapsed');
	}
	return false;
	}).click();*/

});