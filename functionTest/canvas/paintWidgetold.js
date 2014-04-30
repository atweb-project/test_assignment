

    
    function PaintWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

       //Added for paint tool
	        /*var canvas;
        	var context;
        	//var canvasWidth = 490;
        	//var canvasHeight = 220;
        	var padding = 25;
        	var lineWidth = 8;
        	var inEditingMode = false
        	*/
        	/*
        	document.addEventListener( "DOMContentLoaded", function(){
        		this.prepareCanvas()
        		
        	}, false );
        	*/
        //end of addition 
        var ctx, color = "#000";
        var drawTouch = function() {
			var start = function(e) {
			ctx.beginPath();
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY-44;
			ctx.moveTo(x,y);
			};
			var move = function(e) {
			e.preventDefault();
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY-44;
			ctx.lineTo(x,y);
			ctx.stroke();
			};
			document.getElementById("canvas").addEventListener("touchstart", start, false);
			document.getElementById("canvas").addEventListener("touchmove", move, false);
			};
			    
			// prototype to start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
			var drawPointer = function() {
			var start = function(e) {
			        e = e.originalEvent;
			ctx.beginPath();
			x = e.pageX;
			y = e.pageY-44;
			ctx.moveTo(x,y);
			};
			var move = function(e) {
			e.preventDefault();
			        e = e.originalEvent;
			x = e.pageX;
			y = e.pageY-44;
			ctx.lineTo(x,y);
			ctx.stroke();
			    };
			document.getElementById("canvas").addEventListener("MSPointerDown", start, false);
			document.getElementById("canvas").addEventListener("MSPointerMove", move, false);
			};

			// prototype to start drawing on mouse using canvas moveTo and lineTo
			var drawMouse = function() {
			var clicked = 0;
			var start = function(e) {
			clicked = 1;
			ctx.beginPath();
			x = e.pageX;
			y = e.pageY-44;
			ctx.moveTo(x,y);
			};
			var move = function(e) {
			if(clicked){
			x = e.pageX;
			y = e.pageY-44;
			ctx.lineTo(x,y);
			ctx.stroke();
			}
			};
			var stop = function(e) {
			clicked = 0;
			};
			document.getElementById("canvas").addEventListener("mousedown", start, false);
			document.getElementById("canvas").addEventListener("mousemove", move, false);
			document.addEventListener("mouseup", stop, false);
			};
       
        this.createElement= function (param) {
        	
        	var paintelement = '<div id="canvasDiv"></div>'
            


            if (typeof (param) !== 'undefined') {

                if (typeof (param.paintelement) !== 'undefined') paintelement = param.paintelement

            }

           //alert(this.getId());
            return '<div id="' + this.getId()  +  '" style="width:100%; height:100%">' +  paintelement +  '</div>'
            
        },
        

		this.initElement = function(param){
        	//this.prepareCanvas()
        	//if(appGlobals.designMode= false){
        		//alert(true)
        	if(appGlobals.isInDesignMode()== false){ 
        		this.prepareCanvas()
        	}

		},

      
		
		
		this.prepareCanvas = function(){
        			/*$('#canvasDiv').html('');
        			
        		 	var canvasDiv = document.getElementById('canvasDiv');
                	canvas = document.createElement('canvas');
                	//canvas.setAttribute('width', '100%');
                	//canvas.setAttribute('height', '100%');
                	canvas.setAttribute('id', 'canvas');
                	  
                	canvasDiv.appendChild(canvas);
                	//$('#canvasDiv').append('<span>Hey</span>');

                	if(typeof G_vmlCanvasManager != 'undefined') {
                		canvas = G_vmlCanvasManager.initElement(canvas);
                	}
                	canvas = document.getElementById('canvas');
                	context = canvas.getContext("2d");
        			
                	// Add mouse events
                	alert('yes');
                	
                	var clickX = new Array();
                	var clickY = new Array();
                	var clickDrag = new Array();
                	var paint;
                	
                	$('#canvas').mousedown(function(e){
                		//alert('mousedown');
                		  var mouseX = e.pageX - this.offsetLeft;
                		  var mouseY = e.pageY - this.offsetTop;
                				
                		  paint = true;
                		  //alert(paint)
                		  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                		  redraw();
                		});
                	
                	$('#canvas').mousemove(function(e){
                		//alert('mousemove');
                		  if(paint){
                		    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                		    redraw();
                		  }
                		});
                	
                	$('#canvas').mouseup(function(e){
                		//alert('mouseup');
                		  paint = false;
                		});
                	
                	$('#canvas').mouseleave(function(e){
                		//alert('mouseleave');
                		  paint = false;
                		});
                	
                	function addClick(x, y, dragging)
                	{
                	  clickX.push(x);
                	  clickY.push(y);
                	  clickDrag.push(dragging);
                	}

                	function redraw(){
                	  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
                	  
                	  context.strokeStyle = "#df4b26";
                	  alert(context.strokeStyle)
                	  context.lineJoin = "round";
                	  context.lineWidth = 5;
                	            
                	  for(var i=0; i < clickX.length; i++) {        
                	    context.beginPath();
                	    if(clickDrag[i] && i){
                	      context.moveTo(clickX[i-1], clickY[i-1]);
                	     }else{
                	       context.moveTo(clickX[i]-1, clickY[i]);
                	     }
                	     context.lineTo(clickX[i], clickY[i]);
                	     context.closePath();
                	     context.stroke();
                	  }
                	}*/
			
			
			//document.getElementById("canvasDiv").style.height = window.innerHeight-90;
		    var canvas = '<canvas id="canvas" width="'+window.innerWidth+'" height="'+(window.innerHeight-90)+'"></canvas>';
		    document.getElementById("canvasDiv").innerHTML = canvas;
		    
		    // setup canvas
		ctx=document.getElementById("canvas").getContext("2d");
		ctx.strokeStyle = color;
		ctx.lineWidth = 5;	

		// setup to trigger drawing on mouse or touch
		    drawTouch();
		    drawPointer();
		    drawMouse();

        	
		


        	
		},
		
		this.previewInit = function() {
			/*if(appGlobals.setDesignMode()== true){
				alert('mypreview executed');
				
			}*/
			
			var isOpen = $( "#myPreviewDiv" ).dialog( "isOpen" );
            if (isOpen = true){
            	alert('ok')
            	//return 	this.prepareCanvas()
            	
            }
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
          return { 'paintelement':  $('#'+ this.getId() ).html()
            	}
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
  //  $("#paintMenu").append("  Text:<input type='text' id='newButtonText'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>")
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
