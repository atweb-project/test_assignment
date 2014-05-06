

    
    function PaintWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)
        
        var allowColors = true
        
        	//$("iframe").attr('allowcolors')
        
        
         this.choiceOfpalette = function()
        {

        	//alert ("button clicked")
            this.myRegisterUniquePropEvent(  [{ 'prop': 'allowColors', 'ov': allowColors, 'nv': $('#allowColors').prop('checked') }])


        },
        
        this.propChange= function (param) {

            // alert ("button prop change "+this.getId()+" param "+param.length)

        	 for (var i = 0; i < param.length; i++) {

                // if (param[i].prop == 'url') urlWithoutParam =  param[i].value 
                   
                 if (param[i].prop == 'allowColors') allowColors = param[i].value

                // if( param[i].prop == 'start' ) start = param[i].value

               //  if (param[i].prop == 'end') clipEnd = param[i].value

             //    if( param[i].prop == 'showRel') showRel = param[i].value

             //    if( param[i].prop =='autoplay') autoplay = param[i].value

                     //$('#'+id).attr('allowfullscreen', param[i].value )

             }
        	 
        	 $('#'+this.getId() ).attr( 'allowColors', allowColors == true ? 1:0  )
        	 allowColorsattribute = allowColors
 				//alert(allowColorsattribute)
        	 $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });


         },
         
         this.selectionChanged=function()  {

             //  alert(" button selection changed " + $(currentID).html())

              // $('#newButtonText').prop('value', $('#' + this.getId()  ).html())
        	 $('#allowColors').prop('checked', allowColors )
        	 
                 

            }

        this.createElement= function (param) {
        	
        	 var url = "canvas/paint.html"
          
            if (typeof (param) !== 'undefined') {

                if (typeof (param.url) !== 'undefined') param.url = param.url
                
                if (typeof (param.allowColors) !== 'undefined') allowColors = param.allowColors

            }

           //alert(this.getId());
        	 allowColorsattribute = allowColors
        	 return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="' + url + '" frameborder="0"></iframe>'
        	
        },
        
		this.initElement = function(param){
        	

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
			
			 return { 'allowColors': allowColors }
        }
        
         
    }

// static variables/functions

PaintWidget.init = function () {
  /* $("#paintMenu").append("<br>Select a color from the palette<div class='palette-case'>"+
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
	*/
	
	$("#paintMenu").append("<br>I want the user to have a choice of colours<input type='checkbox' id='allowColors' name='allowColors' value='allowColors' onclick='appGlobals.currentObject().choiceOfpalette()'>")

    
   
   
}
PaintWidget.buttomImage='images/brush_painting.png'
PaintWidget.typeId= 'Paint'
PaintWidget.myClass= 'paintWidget'
PaintWidget.initialWidth='550'
PaintWidget.initialHeight= '300'
PaintWidget.actionsSectionId='paintMenu'
	