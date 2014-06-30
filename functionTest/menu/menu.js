
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
			
			for (var i = 0; i < MenuItemsValues.length; i++) {
				
				assoc[MenuItemsValues[i]] = SubItems[i].split(",")
				
				links[MenuItemsValues[i]] = SubLinks[i].split(",")

			}
			
			console.log(assoc)
			
			for (key in assoc) {
				//alert(key +':'+ assoc[key])

				$('.' + key.replace(/\s/g, '')).append("<ul></ul>")
				
				for (v in assoc[key]) {

					$('.' + key.replace(/\s/g, '') + ' ul').append("<li class='" + assoc[key][v].replace(/\s/g, '')+"'><a href='#'>" + assoc[key][v] + "</a></li>")

				}
			}

			console.log(links)
			for (l in links) {
				for (lv in links[l]) {
					//alert(links[l][lv])

					$('.' + l.replace(/\s/g, '') + ' ul li> a').attr("href", links[l][lv])
				}
			}

			$('#main-menu').smartmenus('refresh');

		}

	}



	VerticalValue()   //Call for vertical layout

	MenuItems()  	  //Call for Menu Items

	SubMenuitems()	  //Call for Sub Menu Items

	$('#main-menu').smartmenus({
		subMenusSubOffsetX : 1,
		subMenusSubOffsetY : -8
	});

	

});