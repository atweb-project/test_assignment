// Copyright 2010 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var canvas;
var context;
var canvasWidth = 490;
var canvasHeight = 220;
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

function executeArticleScript() {
	//console.log("executeArticleScript");
	prepareCanvas();
	prepareSimpleCanvas();
	prepareSimpleColorsCanvas();
	prepareSimpleSizesCanvas();
	prepareSimpleToolsCanvas();
	prepareSimpleOutlineCanvas();
}

var totalLoadResources = 8
var curLoadResNum = 0;
/**
* Calls the redraw function after all neccessary resources are loaded.
*/
function resourceLoaded()
{
	if(++curLoadResNum >= totalLoadResources - 1){
		redraw();
	}
}

/**
* Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
*/
function prepareCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// Load images
	// -----------
	crayonImage.onload = function() { resourceLoaded(); 
	}
	crayonImage.src = "images/crayon-outline.png";
	
	markerImage.onload = function() { resourceLoaded(); 
	}
	markerImage.src = "images/marker-outline.png";
	
	eraserImage.onload = function() { resourceLoaded(); 
	}
	eraserImage.src = "images/eraser-outline.png";	
	
	crayonBackgroundImage.onload = function() { resourceLoaded(); 
	}
	crayonBackgroundImage.src = "images/crayon-background.png";
	
	markerBackgroundImage.onload = function() { resourceLoaded(); 
	}
	markerBackgroundImage.src = "images/marker-background.png";
	
	eraserBackgroundImage.onload = function() { resourceLoaded(); 
	}
	eraserBackgroundImage.src = "images/eraser-background.png";

	crayonTextureImage.onload = function() { resourceLoaded(); 
	}
	crayonTextureImage.src = "images/crayon-texture.png";
	
	outlineImage.onload = function() { resourceLoaded(); 
	}
	outlineImage.src = "images/watermelon-duck-outline.png";
	
	// Add mouse events
	// ----------------
	$('#canvas').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		if(mouseX < drawingAreaX) // Left of the drawing area
		{
			if(mouseX > mediumStartX)
			{
				if(mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight){
					curColor = colorPurple;
				}else if(mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2){
					curColor = colorGreen;
				}else if(mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3){
					curColor = colorYellow;
				}else if(mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4){
					curColor = colorBrown;
				}
			}
		}
		else if(mouseX > drawingAreaX + drawingAreaWidth) // Right of the drawing area
		{
			if(mouseY > toolHotspotStartY)
			{
				if(mouseY > sizeHotspotStartY)
				{
					var sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
					if(mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX)
					{
						if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge){
							curSize = "huge";
						}else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
							curSize = "large";
						}else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
							curSize = "normal";
						}else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
							curSize = "small";						
						}
					}
				}
				else
				{
					if(mouseY < toolHotspotStartY + toolHotspotHeight){
						curTool = "crayon";
					}else if(mouseY < toolHotspotStartY + toolHotspotHeight * 2){
						curTool = "marker";
					}else if(mouseY < toolHotspotStartY + toolHotspotHeight * 3){
						curTool = "eraser";
					}
				}
			}
		}
		else if(mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight)
		{
			// Mouse click location on drawing area
		}
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
	});
	
	$('#canvas').mousemove(function(e){
		if(paint==true){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});
	
	$('#canvas').mouseup(function(e){
		paint = false;
	  	redraw();
	});
	
	$('#canvas').mouseleave(function(e){
		paint = false;
	});
}

/**
* Adds a point to the drawing array.
* @param x
* @param y
* @param dragging
*/
function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickTool.push(curTool);
	clickColor.push(curColor);
	clickSize.push(curSize);
	clickDrag.push(dragging);
}

/**
* Clears the canvas.
*/
function clearCanvas()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
* Redraws the canvas.
*/
function redraw()
{
	// Make sure required resources are loaded before redrawing
	if(curLoadResNum < totalLoadResources){ return; }
	
	clearCanvas();
	
	var locX, locY;
	if(curTool == "crayon")
	{
		// Draw the crayon tool background
		context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		
		// Purple
		locX = (curColor == colorPurple) ? 18 : 52;
		locY = 19;
		
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorPurple;
		context.fill();	

		if(curColor == colorPurple){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		// Green
		locX = (curColor == colorGreen) ? 18 : 52;
		locY += 46;
		
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorGreen;
		context.fill();	

		if(curColor == colorGreen){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		// Yellow
		locX = (curColor == colorYellow) ? 18 : 52;
		locY += 46;
		
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorYellow;
		context.fill();	

		if(curColor == colorYellow){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		// Yellow
		locX = (curColor == colorBrown) ? 18 : 52;
		locY += 46;
		
		context.beginPath();
		context.moveTo(locX + 41, locY + 11);
		context.lineTo(locX + 41, locY + 35);
		context.lineTo(locX + 29, locY + 35);
		context.lineTo(locX + 29, locY + 33);
		context.lineTo(locX + 11, locY + 27);
		context.lineTo(locX + 11, locY + 19);
		context.lineTo(locX + 29, locY + 13);
		context.lineTo(locX + 29, locY + 11);
		context.lineTo(locX + 41, locY + 11);
		context.closePath();
		context.fillStyle = colorBrown;
		context.fill();	

		if(curColor == colorBrown){
			context.drawImage(crayonImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
	}
	else if(curTool == "marker")
	{
		// Draw the marker tool background
		context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		
		// Purple
		locX = (curColor == colorPurple) ? 18 : 52;
		locY = 19;
		
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorPurple;
		context.fill();	

		if(curColor == colorPurple){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		// Green
		locX = (curColor == colorGreen) ? 18 : 52;
		locY += 46;
		
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorGreen;
		context.fill();	

		if(curColor == colorGreen){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		// Yellow
		locX = (curColor == colorYellow) ? 18 : 52;
		locY += 46;
		
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorYellow;
		context.fill();	

		if(curColor == colorYellow){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
		
		// Yellow
		locX = (curColor == colorBrown) ? 18 : 52;
		locY += 46;
		
		context.beginPath();
		context.moveTo(locX + 10, locY + 24);
		context.lineTo(locX + 10, locY + 24);
		context.lineTo(locX + 22, locY + 16);
		context.lineTo(locX + 22, locY + 31);
		context.closePath();
		context.fillStyle = colorBrown;
		context.fill();	

		if(curColor == colorBrown){
			context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
		}else{
			context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
		}
	}
	else if(curTool == "eraser")
	{
		context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);	
	}
	
	if(curSize == "small"){
		locX = 467;
	}else if(curSize == "normal"){
		locX = 450;
	}else if(curSize == "large"){
		locX = 428;
	}else if(curSize == "huge"){
		locX = 399;
	}
	locY = 189;
	context.beginPath();
	context.rect(locX, locY, 2, 12);
	context.closePath();
	context.fillStyle = '#333333';
	context.fill();	
	
	// Keep the drawing in the drawing area
	context.save();
	context.beginPath();
	context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
	context.clip();
		
	var radius;
	var i = 0;
	for(; i < clickX.length; i++)
	{		
		if(clickSize[i] == "small"){
			radius = 2;
		}else if(clickSize[i] == "normal"){
			radius = 5;
		}else if(clickSize[i] == "large"){
			radius = 10;
		}else if(clickSize[i] == "huge"){
			radius = 20;
		}else{
			radius = 0;	
		}
		
		context.beginPath();
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i], clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		
		if(clickTool[i] == "eraser"){
			//context.globalCompositeOperation = "destination-out";
			context.strokeStyle = 'white';
		}else{
			//context.globalCompositeOperation = "source-over";	
			context.strokeStyle = clickColor[i];
		}
		context.lineJoin = "round";
		context.lineWidth = radius;
		context.stroke();
		
	}
	//context.globalCompositeOperation = "source-over";
	context.restore();
	
	// Overlay a crayon texture (if the current tool is crayon)
	if(curTool == "crayon"){
		context.globalAlpha = 0.4; // No IE support
		context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
	}
	context.globalAlpha = 1; // No IE support
	
	// Draw the outline image
	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}

/****************************************************************************** Simple Canvas */

var clickX_simple = new Array();
var clickY_simple = new Array();
var clickDrag_simple = new Array();
var paint_simple;
var canvas_simple;
var context_simple;
/**
* Creates a canvas element.
*/
function prepareSimpleCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasSimpleDiv');
	canvas_simple = document.createElement('canvas');
	canvas_simple.setAttribute('width', canvasWidth);
	canvas_simple.setAttribute('height', canvasHeight);
	canvas_simple.setAttribute('id', 'canvasSimple');
	canvasDiv.appendChild(canvas_simple);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simple = G_vmlCanvasManager.initElement(canvas_simple);
	}
	context_simple = canvas_simple.getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#canvasSimple').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint_simple = true;
		addClickSimple(mouseX, mouseY, false);
		redrawSimple();
	});
	
	$('#canvasSimple').mousemove(function(e){
		if(paint_simple){
			addClickSimple(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redrawSimple();
		}
	});
	
	$('#canvasSimple').mouseup(function(e){
		paint_simple = false;
	  	redrawSimple();
	});
	
	$('#canvasSimple').mouseleave(function(e){
		paint_simple = false;
	});
	
	$('#clearCanvasSimple').mousedown(function(e)
	{
		clickX_simple = new Array();
		clickY_simple = new Array();
		clickDrag_simple = new Array();
		clearCanvas_simple(); 
	});
}

function addClickSimple(x, y, dragging)
{
	clickX_simple.push(x);
	clickY_simple.push(y);
	clickDrag_simple.push(dragging);
}

function clearCanvas_simple()
{
	context_simple.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawSimple()
{
	clearCanvas_simple();
	
	var radius = 5;
	context_simple.strokeStyle = "#df4b26";
	context_simple.lineJoin = "round";
	context_simple.lineWidth = radius;
			
	for(var i=0; i < clickX_simple.length; i++)
	{		
		context_simple.beginPath();
		if(clickDrag_simple[i] && i){
			context_simple.moveTo(clickX_simple[i-1], clickY_simple[i-1]);
		}else{
			context_simple.moveTo(clickX_simple[i]-1, clickY_simple[i]);
		}
		context_simple.lineTo(clickX_simple[i], clickY_simple[i]);
		context_simple.closePath();
		context_simple.stroke();
	}
}

/****************************************************************************** Simple Canvas With Colors */

var clickX_simpleColors = new Array();
var clickY_simpleColors = new Array();
var clickDrag_simpleColors = new Array();
var clickColor_simpleColors = new Array();
var paint_simpleColors;
var canvas_simpleColors;
var context_simpleColors;
var curColor_simpleColors = colorPurple;

function prepareSimpleColorsCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasSimpleColorsDiv');
	canvas_simpleColors = document.createElement('canvas');
	canvas_simpleColors.setAttribute('width', canvasWidth);
	canvas_simpleColors.setAttribute('height', canvasHeight);
	canvas_simpleColors.setAttribute('id', 'canvasSimpleColors');
	canvasDiv.appendChild(canvas_simpleColors);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simpleColors = G_vmlCanvasManager.initElement(canvas_simpleColors);
	}
	context_simpleColors = canvas_simpleColors.getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#canvasSimpleColors').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint_simpleColors = true;
		addClickSimpleColors(mouseX, mouseY, false);
		redrawSimpleColors();
	});
	
	$('#canvasSimpleColors').mousemove(function(e){
		if(paint_simpleColors){
			addClickSimpleColors(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redrawSimpleColors();
		}
	});
	
	$('#canvasSimpleColors').mouseup(function(e){
		paint_simpleColors = false;
	  	redrawSimpleColors();
	});
	
	$('#canvasSimpleColors').mouseleave(function(e){
		paint_simpleColors = false;
	});
	
	$('#choosePurpleSimpleColors').mousedown(function(e){
		curColor_simpleColors = colorPurple;
	});
	$('#chooseGreenSimpleColors').mousedown(function(e){
		curColor_simpleColors = colorGreen;
	});
	$('#chooseYellowSimpleColors').mousedown(function(e){
		curColor_simpleColors = colorYellow;
	});
	$('#chooseBrownSimpleColors').mousedown(function(e){
		curColor_simpleColors = colorBrown;
	});
	
	$('#clearCanvasSimpleColors').mousedown(function(e)
	{
		clickX_simpleColors = new Array();
		clickY_simpleColors = new Array();
		clickDrag_simpleColors = new Array();
		clickColor_simpleColors = new Array();
		clearCanvas_simpleColors();
	});
}

function addClickSimpleColors(x, y, dragging)
{
	clickX_simpleColors.push(x);
	clickY_simpleColors.push(y);
	clickDrag_simpleColors.push(dragging);
	clickColor_simpleColors.push(curColor_simpleColors);
}

function clearCanvas_simpleColors()
{
	context_simpleColors.fillStyle = '#ffffff'; // Work around for Chrome
	context_simpleColors.fillRect(0, 0, canvasWidth, canvasHeight); // Fill in the canvas with white
	canvas_simpleColors.width = canvas_simpleColors.width; // clears the canvas 
}

function redrawSimpleColors()
{
	clearCanvas_simpleColors();
	
	var radius = 5;
	context_simpleColors.lineJoin = "round";
	context_simpleColors.lineWidth = radius;
			
	for(var i=0; i < clickX_simpleColors.length; i++)
	{
		context_simpleColors.beginPath();
		if(clickDrag_simpleColors[i] && i){
			context_simpleColors.moveTo(clickX_simpleColors[i-1], clickY_simpleColors[i-1]);
		}else{
			context_simpleColors.moveTo(clickX_simpleColors[i]-1, clickY_simpleColors[i]);
		}
		context_simpleColors.lineTo(clickX_simpleColors[i], clickY_simpleColors[i]);
		context_simpleColors.closePath();
		context_simpleColors.strokeStyle = clickColor_simpleColors[i];
		context_simpleColors.stroke();
	}
}

/****************************************************************************** Simple Canvas With Sizes */

var clickX_simpleSizes = new Array();
var clickY_simpleSizes = new Array();
var clickDrag_simpleSizes = new Array();
var clickColor_simpleSizes = new Array();
var clickSize_simpleSizes = new Array();
var paint_simpleSizes;
var canvas_simpleSizes;
var context_simpleSizes;
var curColor_simpleSizes = colorPurple;
var curSize_simpleSizes = "normal";

function prepareSimpleSizesCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasSimpleSizesDiv');
	canvas_simpleSizes = document.createElement('canvas');
	canvas_simpleSizes.setAttribute('width', canvasWidth);
	canvas_simpleSizes.setAttribute('height', canvasHeight);
	canvas_simpleSizes.setAttribute('id', 'canvasSimpleSizes');
	canvasDiv.appendChild(canvas_simpleSizes);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simpleSizes = G_vmlCanvasManager.initElement(canvas_simpleSizes);
	}
	context_simpleSizes = canvas_simpleSizes.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#canvasSimpleSizes').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint_simpleSizes = true;
		addClickSimpleSizes(mouseX, mouseY, false);
		redrawSimpleSizes();
	});
	
	$('#canvasSimpleSizes').mousemove(function(e){
		if(paint_simpleSizes){
			addClickSimpleSizes(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redrawSimpleSizes();
		}
	});
	
	$('#canvasSimpleSizes').mouseup(function(e){
		paint_simpleSizes = false;
	  	redrawSimpleSizes();
	});
	
	$('#canvasSimpleSizes').mouseleave(function(e){
		paint_simpleSizes = false;
	});
	
	$('#choosePurpleSimpleSizes').mousedown(function(e){
		curColor_simpleSizes = colorPurple;
	});
	$('#chooseGreenSimpleSizes').mousedown(function(e){
		curColor_simpleSizes = colorGreen;
	});
	$('#chooseYellowSimpleSizes').mousedown(function(e){
		curColor_simpleSizes = colorYellow;
	});
	$('#chooseBrownSimpleSizes').mousedown(function(e){
		curColor_simpleSizes = colorBrown;
	});	
	$('#chooseSmallSimpleSizes').mousedown(function(e){
		curSize_simpleSizes = "small";
	});
	$('#chooseNormalSimpleSizes').mousedown(function(e){
		curSize_simpleSizes = "normal";
	});
	$('#chooseLargeSimpleSizes').mousedown(function(e){
		curSize_simpleSizes = "large";
	});
	$('#chooseHugeSimpleSizes').mousedown(function(e){
		curSize_simpleSizes = "huge";
	});
	
	$('#clearCanvasSimpleSizes').mousedown(function(e)
	{
		clickX_simpleSizes = new Array();
		clickY_simpleSizes = new Array();
		clickDrag_simpleSizes = new Array();
		clickColor_simpleSizes = new Array();
		clickSize_simpleSizes = new Array();
		clearCanvas_simpleSizes();
	});
}

function addClickSimpleSizes(x, y, dragging)
{
	clickX_simpleSizes.push(x);
	clickY_simpleSizes.push(y);
	clickDrag_simpleSizes.push(dragging);
	clickColor_simpleSizes.push(curColor_simpleSizes);
	clickSize_simpleSizes.push(curSize_simpleSizes);
}

function clearCanvas_simpleSizes()
{
	context_simpleSizes.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawSimpleSizes()
{
	clearCanvas_simpleSizes();
	
	var radius;
	context_simpleSizes.lineJoin = "round";
	
			
	for(var i=0; i < clickX_simpleSizes.length; i++)
	{
		if(clickSize_simpleSizes[i] == "small"){
			radius = 2;
		}else if(clickSize_simpleSizes[i] == "normal"){
			radius = 5;
		}else if(clickSize_simpleSizes[i] == "large"){
			radius = 10;
		}else if(clickSize_simpleSizes[i] == "huge"){
			radius = 20;
		}
	
		context_simpleSizes.beginPath();
		if(clickDrag_simpleSizes[i] && i){
			context_simpleSizes.moveTo(clickX_simpleSizes[i-1], clickY_simpleSizes[i-1]);
		}else{
			context_simpleSizes.moveTo(clickX_simpleSizes[i]-1, clickY_simpleSizes[i]);
		}
		context_simpleSizes.lineTo(clickX_simpleSizes[i], clickY_simpleSizes[i]);
		context_simpleSizes.closePath();
		context_simpleSizes.strokeStyle = clickColor_simpleSizes[i];
		context_simpleSizes.lineWidth = radius;
		context_simpleSizes.stroke();
	}
}

/****************************************************************************** Simple Canvas With Tools */

var clickX_simpleTools = new Array();
var clickY_simpleTools = new Array();
var clickDrag_simpleTools = new Array();
var clickColor_simpleTools = new Array();
var clickSize_simpleTools = new Array();
var paint_simpleTools;
var canvas_simpleTools;
var context_simpleTools;
var curColor_simpleTools = colorPurple;
var curSize_simpleTools = "normal";

var clickTool_simpleTools = new Array();
var curTool_simpleTools = "crayon";

function prepareSimpleToolsCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasSimpleToolsDiv');
	canvas_simpleTools = document.createElement('canvas');
	canvas_simpleTools.setAttribute('width', canvasWidth);
	canvas_simpleTools.setAttribute('height', canvasHeight);
	canvas_simpleTools.setAttribute('id', 'canvasSimpleTools');
	canvasDiv.appendChild(canvas_simpleTools);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simpleTools = G_vmlCanvasManager.initElement(canvas_simpleTools);
	}
	context_simpleTools = canvas_simpleTools.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#canvasSimpleTools').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint_simpleTools = true;
		addClickSimpleTools(mouseX, mouseY, false);
		redrawSimpleTools();
	});
	
	$('#canvasSimpleTools').mousemove(function(e){
		if(paint_simpleTools){
			addClickSimpleTools(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redrawSimpleTools();
		}
	});
	
	$('#canvasSimpleTools').mouseup(function(e){
		paint_simpleTools = false;
	  	redrawSimpleTools();
	});
	
	$('#canvasSimpleTools').mouseleave(function(e){
		paint_simpleTools = false;
	});
	
	$('#choosePurpleSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorPurple;
	});
	$('#chooseGreenSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorGreen;
	});
	$('#chooseYellowSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorYellow;
	});
	$('#chooseBrownSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorBrown;
	});	
	$('#chooseSmallSimpleTools').mousedown(function(e){
		curSize_simpleTools = "small";
	});
	$('#chooseNormalSimpleTools').mousedown(function(e){
		curSize_simpleTools = "normal";
	});
	$('#chooseLargeSimpleTools').mousedown(function(e){
		curSize_simpleTools = "large";
	});
	$('#chooseHugeSimpleTools').mousedown(function(e){
		curSize_simpleTools = "huge";
	});
	$('#chooseCrayonSimpleTools').mousedown(function(e){
		curTool_simpleTools = "crayon";
	});
	$('#chooseMarkerSimpleTools').mousedown(function(e){
		curTool_simpleTools = "marker";
	});
	$('#chooseEraserSimpleTools').mousedown(function(e){
		curTool_simpleTools = "eraser";
	});
	
	$('#clearCanvasSimpleTools').mousedown(function(e)
	{
		clickX_simpleTools = new Array();
		clickY_simpleTools = new Array();
		clickDrag_simpleTools = new Array();
		clickColor_simpleTools = new Array();
		clickSize_simpleTools = new Array();
		clearCanvas_simpleTools();
	});
}

function addClickSimpleTools(x, y, dragging)
{
	clickX_simpleTools.push(x);
	clickY_simpleTools.push(y);
	clickDrag_simpleTools.push(dragging);
	clickTool_simpleTools.push(curTool_simpleTools);
	if(curTool_simpleTools == "eraser"){
		clickColor_simpleTools.push("#ffffff");
	}else{
		clickColor_simpleTools.push(curColor_simpleTools);
	}
	clickSize_simpleTools.push(curSize_simpleTools);
}

function clearCanvas_simpleTools()
{
	context_simpleTools.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawSimpleTools()
{
	// Make sure required resources are loaded before redrawing
	if(curLoadResNum < totalLoadResources){ return; }
	
	clearCanvas_simpleTools();
	
	var radius;
	context_simpleTools.lineJoin = "round";
			
	for(var i=0; i < clickX_simpleTools.length; i++)
	{
		if(clickSize_simpleTools[i] == "small"){
			radius = 2;
		}else if(clickSize_simpleTools[i] == "normal"){
			radius = 5;
		}else if(clickSize_simpleTools[i] == "large"){
			radius = 10;
		}else if(clickSize_simpleTools[i] == "huge"){
			radius = 20;
		}
	
		context_simpleTools.beginPath();
		if(clickDrag_simpleTools[i] && i){
			context_simpleTools.moveTo(clickX_simpleTools[i-1], clickY_simpleTools[i-1]);
		}else{
			context_simpleTools.moveTo(clickX_simpleTools[i]-1, clickY_simpleTools[i]);
		}
		context_simpleTools.lineTo(clickX_simpleTools[i], clickY_simpleTools[i]);
		context_simpleTools.closePath();
		context_simpleTools.strokeStyle = clickColor_simpleTools[i];
		context_simpleTools.lineWidth = radius;
		context_simpleTools.stroke();
	}
	
	if(curTool_simpleTools == "crayon"){
		context_simpleTools.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
	}
}

/****************************************************************************** Simple Canvas With Outline */

var clickX_simpleOutline = new Array();
var clickY_simpleOutline = new Array();
var clickDrag_simpleOutline = new Array();
var clickColor_simpleOutline = new Array();
var clickSize_simpleOutline = new Array();
var paint_simpleOutline;
var canvas_simpleOutline;
var context_simpleOutline;
var curColor_simpleOutline = colorPurple;
var curSize_simpleOutline = "normal";
var clickTool_simpleOutline = new Array();
var curTool_simpleOutline = "crayon";

function prepareSimpleOutlineCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasSimpleOutlineDiv');
	canvas_simpleOutline = document.createElement('canvas');
	canvas_simpleOutline.setAttribute('width', canvasWidth);
	canvas_simpleOutline.setAttribute('height', canvasHeight);
	canvas_simpleOutline.setAttribute('id', 'canvasSimpleOutline');
	canvasDiv.appendChild(canvas_simpleOutline);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simpleOutline = G_vmlCanvasManager.initElement(canvas_simpleOutline);
	}
	context_simpleOutline = canvas_simpleOutline.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#canvasSimpleOutline').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint_simpleOutline = true;
		addClickSimpleOutline(mouseX, mouseY, false);
		redrawSimpleOutline();
	});
	
	$('#canvasSimpleOutline').mousemove(function(e){
		if(paint_simpleOutline){
			addClickSimpleOutline(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redrawSimpleOutline();
		}
	});
	
	$('#canvasSimpleOutline').mouseup(function(e){
		paint_simpleOutline = false;
	  	redrawSimpleOutline();
	});
	
	$('#canvasSimpleOutline').mouseleave(function(e){
		paint_simpleOutline = false;
	});
	
	$('#choosePurpleSimpleOutline').mousedown(function(e){
		curColor_simpleOutline = colorPurple;
	});
	$('#chooseGreenSimpleOutline').mousedown(function(e){
		curColor_simpleOutline = colorGreen;
	});
	$('#chooseYellowSimpleOutline').mousedown(function(e){
		curColor_simpleOutline = colorYellow;
	});
	$('#chooseBrownSimpleOutline').mousedown(function(e){
		curColor_simpleOutline = colorBrown;
	});	
	$('#chooseSmallSimpleOutline').mousedown(function(e){
		curSize_simpleOutline = "small";
	});
	$('#chooseNormalSimpleOutline').mousedown(function(e){
		curSize_simpleOutline = "normal";
	});
	$('#chooseLargeSimpleOutline').mousedown(function(e){
		curSize_simpleOutline = "large";
	});
	$('#chooseHugeSimpleOutline').mousedown(function(e){
		curSize_simpleOutline = "huge";
	});
	$('#chooseCrayonSimpleOutline').mousedown(function(e){
		curTool_simpleOutline = "crayon";
		redrawSimpleOutline();
	});
	$('#chooseMarkerSimpleOutline').mousedown(function(e){
		curTool_simpleOutline = "marker";
		redrawSimpleOutline();
	});
	$('#chooseEraserSimpleOutline').mousedown(function(e){
		curTool_simpleOutline = "eraser";
	});
	
	$('#clearCanvasSimpleOutline').mousedown(function(e)
	{
		clickX_simpleOutline = new Array();
		clickY_simpleOutline = new Array();
		clickDrag_simpleOutline = new Array();
		clickColor_simpleOutline = new Array();
		clickSize_simpleOutline = new Array();
		redrawSimpleOutline();
	});
}

function addClickSimpleOutline(x, y, dragging)
{
	clickX_simpleOutline.push(x);
	clickY_simpleOutline.push(y);
	clickDrag_simpleOutline.push(dragging);
	clickTool_simpleOutline.push(curTool_simpleOutline);
	if(curTool_simpleOutline == "eraser"){
		clickColor_simpleOutline.push("#ffffff");
	}else{
		clickColor_simpleOutline.push(curColor_simpleOutline);
	}
	clickSize_simpleOutline.push(curSize_simpleOutline);
}

function clearCanvas_simpleOutline()
{
	context_simpleOutline.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawSimpleOutline()
{
	// Make sure required resources are loaded before redrawing
	if(curLoadResNum < totalLoadResources){ return; }
	
	clearCanvas_simpleOutline();
	
	var radius;
	context_simpleOutline.lineJoin = "round";
			
	for(var i=0; i < clickX_simpleOutline.length; i++)
	{
		if(clickSize_simpleOutline[i] == "small"){
			radius = 2;
		}else if(clickSize_simpleOutline[i] == "normal"){
			radius = 5;
		}else if(clickSize_simpleOutline[i] == "large"){
			radius = 10;
		}else if(clickSize_simpleOutline[i] == "huge"){
			radius = 20;
		}
	
		context_simpleOutline.beginPath();
		if(clickDrag_simpleOutline[i] && i){
			context_simpleOutline.moveTo(clickX_simpleOutline[i-1], clickY_simpleOutline[i-1]);
		}else{
			context_simpleOutline.moveTo(clickX_simpleOutline[i]-1, clickY_simpleOutline[i]);
		}
		context_simpleOutline.lineTo(clickX_simpleOutline[i], clickY_simpleOutline[i]);
		context_simpleOutline.closePath();
		context_simpleOutline.strokeStyle = clickColor_simpleOutline[i];
		context_simpleOutline.lineWidth = radius;
		context_simpleOutline.stroke();
	}
	
	if(curTool_simpleOutline == "crayon"){
		context_simpleOutline.globalAlpha = 0.4;
		context_simpleOutline.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
	}
	context_simpleOutline.globalAlpha = 1;
	
	context_simpleOutline.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}

executeArticleScript();

/**/