

    
    function PaintWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

       //Added for paint tool
        var canvas;
        var context;
        var canvasWidth = 470;
        var canvasHeight = 195;
        var padding = 25;
        var lineWidth = 8;
        var colorPurple = "#cb3594";
        var colorGreen = "#659b41";
        var colorYellow = "#ffcf33";
        var colorBrown = "#986928";
        var outlineImage = new Image();
        var crayonImage = new Image();
        var markerImage = new Image();
        var eraserImage = new Image();
        var crayonBackgroundImage = new Image();
        var markerBackgroundImage = new Image();
        var eraserBackgroundImage = new Image();
        var crayonTextureImage = new Image();
        var clickX = new Array();
        var clickY = new Array();
        var clickColor = new Array();
        var clickTool = new Array();
        var clickSize = new Array();
        var clickDrag = new Array();
        var paint = false;
        var curColor = colorPurple;
        var curTool = "crayon";
        var curSize = "normal";
        var mediumStartX = 18;
        var mediumStartY = 19;
        var mediumImageWidth = 93;
        var mediumImageHeight = 46;
        var drawingAreaX = 111;
        var drawingAreaY = 11;
        var drawingAreaWidth = 267;
        var drawingAreaHeight = 200;
        var toolHotspotStartY = 23;
        var toolHotspotHeight = 38;
        var sizeHotspotStartY = 157;
        var sizeHotspotHeight = 36;
        var sizeHotspotWidthObject = new Object();
        sizeHotspotWidthObject.huge = 39;
        sizeHotspotWidthObject.large = 25;
        sizeHotspotWidthObject.normal = 18;
        sizeHotspotWidthObject.small = 16;
        var totalLoadResources = 8;
        var curLoadResNum = 0;
       
        //end of addition 
       
        this.createElement= function (param) {

            var paintText = 'You can draw whatever you want in Preview mode!'


            if (typeof (param) !== 'undefined') {

                if (typeof (param.text) !== 'undefined') paintText = param.text

            }

           
            return '<div id="' + this.getId()  +  '" style="width:100%; height:100%">'+ paintText +'<div id="canvasDiv"></div></div>'

        },
        

		this.initElement = function(param){
        	//if( appGlobals.isInDesignMode() == false){
		
        	var canvasDiv = document.getElementById('canvasDiv');
        	canvas = document.createElement('canvas');
        	canvas.setAttribute('width', canvasWidth);
        	canvas.setAttribute('height', canvasHeight);
        	canvas.setAttribute('id', 'canvas');
        	canvasDiv.appendChild(canvas);
        	if(typeof G_vmlCanvasManager != 'undefined') {
        		canvas = G_vmlCanvasManager.initElement(canvas);
        	}
        	context = canvas.getContext("2d");
        	
        	// Add mouse events
        	$('#canvas').mousedown(function(e){
        		  var mouseX = e.pageX - this.offsetLeft;
        		  var mouseY = e.pageY - this.offsetTop;
        				
        		  paint = true;
        		  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        		  redraw();
        		});
        	
        	$('#canvas').mousemove(function(e){
        		  if(paint){
        		    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        		    redraw();
        		  }
        		});
        	
        	$('#canvas').mouseup(function(e){
        		  paint = false;
        		});
        	
        	$('#canvas').mouseleave(function(e){
        		  paint = false;
        		});
        	
        	var clickX = new Array();
        	var clickY = new Array();
        	var clickDrag = new Array();
        	var paint;

        	function addClick(x, y, dragging)
        	{
        	  clickX.push(x);
        	  clickY.push(y);
        	  clickDrag.push(dragging);
        	}
        	
        	function redraw(){
        		  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        		  
        		  context.strokeStyle = "#df4b26";
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
        		}
        	//}
		},

        this.createJSON = function() {

            return { 'text': $('#'+ this.getId() ).html() }

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
PaintWidget.typeId= 'paint'
PaintWidget.myClass= 'paintWidget'
PaintWidget.initialWidth='500'
PaintWidget.initialHeight= '230'
PaintWidget.actionsSectionId='paintMenu'

// not actually  needed??
//ButtonWidget.prototype = MyWidget

//ButtonWidget.prototype = new MyWidget()
// buttonwidget contructor is not changed
//ButtonWidget.constructor = MyWidget()
