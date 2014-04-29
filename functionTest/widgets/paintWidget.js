

    
    function PaintWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

       //Added for paint tool
	        var canvas;
        	var context;
        	//var canvasWidth = 490;
        	//var canvasHeight = 220;
        	var padding = 25;
        	var lineWidth = 8;
        	
        //end of addition 
       
        this.createElement= function (param) {
        	
        	var paintelement = '<div id="canvasDiv"></div>'
            


            if (typeof (param) !== 'undefined') {

                if (typeof (param.paintelement) !== 'undefined') paintelement = param.paintelement

            }

           
            return '<div id="' + this.getId()  +  '" style="width:100%; height:100%">'+ paintelement +'</div>'

        },
        

		this.initElement = function(param){
        	//if( appGlobals.isInDesignMode() == false){
        	
       
        	//}
		},
		
		this.prepareCanvas = function(){
		 	var canvasDiv = document.getElementById('canvasDiv');
        	canvas = document.createElement('canvas');
        	//canvas.setAttribute('width', '100%');
        	//canvas.setAttribute('height', '100%');
        	canvas.setAttribute('id', 'canvas');
        	canvasDiv.appendChild(canvas);
        	if(typeof G_vmlCanvasManager != 'undefined') {
        		canvas = G_vmlCanvasManager.initElement(canvas);
        	}
        	//context = canvas.getContext("2d");
        	
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
		},

        this.createJSON = function() {
			this.prepareCanvas()
            return { 'paintelement': $('#'+ this.getId() ).html() 
            	}

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
