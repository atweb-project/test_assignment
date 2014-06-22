

    
    function MenusWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      

        this.createElement= function (param) {

            var buttonText = 'Button!'


            if (typeof (param) !== 'undefined') {

                if (typeof (param.text) !== 'undefined') buttonText = param.text

            }

           
            return'<div id="' + this.getId()  +  '" style="width:100%; height:100%;"><ul class="sm sm-blue" id="main-menu">'+
            			'<li class="current">'+
        				'<a href="followed.html">menu item 1</a>'+
        				'<ul>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        					'</li>'+
        					'<li class="current">'+
        						'<a href="followed.html">long menu item sets sub width</a>'+
        						'<ul>'+
        							'<li class="current"><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        						'</ul>'+
        					'</li>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        						'<ul>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        						'</ul>'+
        					'</li>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        						'<ul>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        						'</ul>'+
        					'</li>'+
        				'</ul>'+
        			'</li>'+
        			'<li>'+
        				'<a href="followed.html">menu item 2</a>'+
        			'</li>'+
        			'<li>'+
        				'<a href="followed.html">menu item 3</a>'+
        				'<ul>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        						'<ul>'+
        							'<li><a href="followed.html">short</a></li>'+
        							'<li><a href="followed.html">short</a></li>'+
        							'<li><a href="followed.html">short</a></li>'+
        							'<li><a href="followed.html">short</a></li>'+
        							'<li><a href="followed.html">short</a></li>'+
        						'</ul>'+
        					'</li>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        						'<ul>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        						'</ul>'+
        					'</li>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        						'<ul>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        						'</ul>'+
        					'</li>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        						'<ul>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        						'</ul>'+
        					'</li>'+
        					'<li>'+
        						'<a href="followed.html">menu item</a>'+
        						'<ul>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        							'<li><a href="followed.html">menu item</a></li>'+
        						'</ul>'+
        					'</li>'+
        				'</ul>'+
        			'</li>'+
        			'<li>'+
        				'<a href="followed.html">menu item 4</a>'+
        			'</li>'+	
        		'</ul></div>'			

        },
        
        this.initElement = function(param){
        	/*if ((appGlobals.isInDesignMode() == false))
        	var example = $('#example').superfish({
				//add options here if required
			});*/
        	if ((appGlobals.isInDesignMode() == false))
        	$('#main-menu').smartmenus();
        	
		},

        this.createJSON = function() {

            return { 'text': $('#'+ this.getId() ).html() }

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

MenusWidget.init = function () {
    $("#menusMenu").append("  Text:<input type='text' id='newButtonText'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>")
}
MenusWidget.buttomImage='images/button_icon.png'
MenusWidget.typeId= 'menus'
MenusWidget.myClass= 'widget_menus'
MenusWidget.initialWidth='454'
MenusWidget.initialHeight= '50'
MenusWidget.actionsSectionId='menusMenu'
