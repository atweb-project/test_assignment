

    
    function PaintWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        this.createElement= function (param) {
        	
        	 var url = "canvas/paint.html"
          
            if (typeof (param) !== 'undefined') {

                if (typeof (param.url) !== 'undefined') param.url = param.url

            }

           //alert(this.getId());
        	 return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="' + url + '" frameborder="0"  ></iframe>'
            
        },
        
		this.initElement = function(param){
        	linewidth = $('#linewidth').val();

		},
		
		this.selectColor = function(el){
			//select marker color
				    for ( var i = 0; i < document.getElementsByClassName("palette").length; i++) {
					document.getElementsByClassName("palette")[i].style.borderColor = "#777";
					document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
				}
				el.style.borderColor = "#fff";
				el.style.borderStyle = "dashed";
				color = window.getComputedStyle(el).backgroundColor;
				// alert(color);

		},
		
		this.selectSize = function(){
			//select line size
			linewidth = $('#linewidth').val();
			//alert(linewidth);
			
		},
		
        this.createJSON = function() {

        }
        
        
    }

// static variables/functions

PaintWidget.init = function () {
   $("#paintMenu").append("<br>Select a color from the palette<div class='palette-case'>"+
		"<div class='palette-box'><div class='palette red' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"<div class='palette-box'><div class='palette blue' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"<div class='palette-box'><div class='palette green' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"<div class='palette-box'><div class='palette yellow' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"<div class='palette-box'><div class='palette black' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"</div>")
		
	$("#paintMenu").append(" <div id='' style=''>"+
		"<br>Select a line size<br>"+	
		"<select id='linewidth' onchange='appGlobals.currentObject().selectSize()'>"+
		"<option value='2'>2</option>"+
		"<option value='5' selected>5</option>"+
		"<option value='10'>10</option>"+
		"<option value='20'>20</option>"+
		"</select>"+
		"</div>")
		

    
   
   
}
PaintWidget.buttomImage='images/brush_painting.png'
PaintWidget.typeId= 'Paint'
PaintWidget.myClass= 'paintWidget'
PaintWidget.initialWidth='550'
PaintWidget.initialHeight= '300'
PaintWidget.actionsSectionId='paintMenu'
	