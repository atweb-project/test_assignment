

    
    function PaintWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

       //Added for paint tool

	       
       
        this.createElement= function (param) {
        	
        	//var paintelement = '<div id="canvasDiv"></div>'
        	 var url = "canvas/paint1.html"
            


            if (typeof (param) !== 'undefined') {

                if (typeof (param.paintelement) !== 'undefined') paintelement = param.paintelement

            }

           //alert(this.getId());
            //return '<div id="' + this.getId()  +  '" style="width:100%; height:100%">' +  paintelement +  '</div>'
        	 return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="' + url + '" frameborder="0"  ></iframe>'
            
        },
        

		this.initElement = function(param){
        	linewidth = $('#linewidth').val();

		},
		
		this.selectColor = function(el){
		    for(var i=0;i<document.getElementsByClassName("palette").length;i++){
		        document.getElementsByClassName("palette")[i].style.borderColor = "#777";
		        document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
		    }
		    el.style.borderColor = "#fff";
		    el.style.borderStyle = "dashed";
		    color = window.getComputedStyle(el).backgroundColor;
		    //alert(color);
		    //window.frames[0].window.ctx.beginPath();
		    //window.frames[0].window.ctx.strokeStyle = color;
		},
		
		this.selectSize = function(){
			linewidth = $('#linewidth').val();
			//alert(linewidth);
			
		}

      
		
		
		this.prepareCanvas = function(){
        		alert('hey');	
		


        	
		},
		
		this.previewInit = function() {
	        
		
		},

        this.createJSON = function() {
			/*if(inEditingMode == false) {
				alert(inEditingMode)
				this.prepareCanvas()
        	}
			*/
			//if(appGlobals.setDesignMode == false){
			var x = this.getId()  
			//alert(x)
			if(x.indexOf("preview") >-1){
				//$('#canvasDiv').append('<b>mypreview executed</b>');
				alert('mypreview');
			}
        //  return { 'paintelement':  $('#'+ this.getId() ).html() 	}
            //alert(this.getId());
			/*var isOpen = $( "#myPreviewDiv" ).dialog( "isOpen" );
            if (isOpen = true){
            	//alert('ok')
            	this.prepareCanvas()
            	
            }*/
            

        }
        
       /* this.changeLabel= function()
         {

         //  alert ("button clicked")
           // alert (  ' currentId '+currentID+" texregisterUniquePropEventt "+ $('#newButtonText').prop('value') )

            this.myRegisterUniquePropEvent( [{ 'prop': 'text', 'ov': $('#' + this.getId()  ).html(), 'nv': $('#newButtonText').prop('value') }])
             

        },

        this.propChange= function (param) {

           // alert ("button prop change "+this.getId()+" param "+param.length)

            $('#' + this.getId() ).html(param[0].value)

        }


       /* ,

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

            $('#newButtonText').prop('value', $('#' + this.getId()  ).html())
              

         }*/
        
    }

// static variables/functions

PaintWidget.init = function () {
   $("#paintMenu").append("<br>Select a color from the palette<div class='palette-case'>"+
		"<div class='palette-box'><div class='palette white' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"<div class='palette-box'><div class='palette red' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"<div class='palette-box'><div class='palette blue' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
		"<div class='palette-box'><div class='palette green' onclick='appGlobals.currentObject().selectColor(this)'></div></div>"+
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
PaintWidget.initialWidth='490'
PaintWidget.initialHeight= '220'
PaintWidget.actionsSectionId='paintMenu'
	

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
