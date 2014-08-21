

var Position = $(window.frameElement).attr('position')
var Displaymode = $(window.frameElement).attr('displaymode')
var SwipeMove = $(window.frameElement).attr('swipemove')
var initialMenuItems = $(window.frameElement).attr('menuitems');
var menuLinks = $(window.frameElement).attr('menulinks');
            
$(document).on('pagebeforecreate','#mobilemenu', function( event ) {
            
          
            //alert(SwipeMove)

            function SetPosition() {
                
                if(Position == "right"){
                    
                    $('#menubtn').removeClass('ui-btn-left')
                    $('#menubtn').addClass('ui-btn-right')
                                        
                } else {
                    
                    $('#menubtn').removeClass('ui-btn-right')
                    $('#menubtn').addClass('ui-btn-left')
                }
                
                $('#nav-panel').attr('data-position',Position)
            }
            
            function SetDisplay() {
                                   
                    $('#nav-panel').attr('data-display',Displaymode)
                                                        
            }
            
            function SetSwipe() {
                                   
                   if(SwipeMove == 'true') {

                                        $(document).on("swipeleft swiperight", "#mobilemenu", function(e) {

                                            if ($(".ui-page-active").jqmData("panel") !== "open") {
                                                if (e.type === "swipeleft" && Position == 'right') {
                                                    $("#nav-panel").panel("open");
                                                } else if (e.type === "swiperight" && Position == 'left') {
                                                    $("#nav-panel").panel("open");
                                                }
                                            }
                                        });

                    }

            }
            
            

SetPosition()

SetDisplay()

SetSwipe()

})

$(document).on('pagecreate','#mobilemenu', function( event ) {
	function MenuItems() {
    	
    	if (initialMenuItems != null || initialMenuItems.length > 0) {

			var Items = initialMenuItems.split(",")
			 //alert(Items)

			var Links = menuLinks.split(",")
			
			for (var i = 0; i < Items.length && Links.length; i++) {
    	
				$("#list").append("<li class='" + Items[i].replace(/\s/g, "")
				+ "'><a href='" + Links[i] + "'>" + Items[i]
				+ "</a></li>")
			
				$("#list").listview( "refresh" );
    			$("#list").trigger( "updatelayout");
			}
			
			
    	}
    }

MenuItems()

})