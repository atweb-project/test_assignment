/*
 * This widget is based on the Reel jQuery open source plugin, the most versatile three
 * sixty player for jQuery 
 * The current version used is Reel 1.3
 * For more options http://jquery.vostrel.cz/reel
 */

    
    function RotateWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var frameNumber = 1
        var framesNumber = 20
        var Speed = 0
        var Row = 1
        var Rows = 0
        var Orientable = false

			this.createElement = function(param) {

				if (typeof (param) !== 'undefined') {

					if (typeof (param.frameNumber) !== 'undefined')	frameNumber = param.frameNumber
					
					if (typeof (param.framesNumber) !== 'undefined') framesNumber = param.framesNumber

					if (typeof (param.Speed) !== 'undefined') Speed = param.Speed
					
					if (typeof (param.Row) !== 'undefined') Row = param.Row
					
					if (typeof (param.Rows) !== 'undefined') Rows = param.Rows

					if (typeof (param.Orientable) !== 'undefined') Orientable = param.Orientable

						// alert('param '+param.frameNumber)

				}

				return '<img id="'+ this.getId() + '" src="images/rotate/001.jpg" width="100%" height="100%" class="reel" />'

			},

			this.initElement = function(param) {

				
					
					if ((appGlobals.isInDesignMode() == false))
						
					$('#' + this.getId()).reel({
						images : 'images/rotate/###.jpg',
						frame : frameNumber, // from which frame to start the rotation
						frames : framesNumber, //set total number of frames per row
						speed : Speed, // Speed of rotating auto animation
				        rows:  Rows, //set the number of rows to move in the y axis
				        row:   Row, //set the exact row to start 
						orientable : Orientable == false ? 1 : 0, // For devices that support gyroscope
						responsive : true
					})
			

				// alert(frameNumber)

			},

			this.propChange = function(param) {

				for (var i = 0; i < param.length; i++) {

					if (param[i].prop == 'frameNumber') frameNumber = param[i].value
					
					if (param[i].prop == 'framesNumber') framesNumber = param[i].value

					if (param[i].prop == 'Speed') Speed = param[i].value
					
					if (param[i].prop == 'Row') Row = param[i].value
					
					if (param[i].prop == 'Rows') Rows = param[i].value

					if (param[i].prop == 'Orientable') Orientable = param[i].value

						// alert('prop '+frameNumber)

				}

			},

			this.selectionChanged = function() {

				$('#frameNumber').spinner('value', frameNumber)
				
				$('#framesNumber').spinner('value', framesNumber)

				$('#Speed').spinner('value', Speed)
				
				$('#Row').spinner('value', Row)
				
				$('#Rows').spinner('value', Rows)

				$('#Orientable').prop('checked', Orientable)

			},

			this.changeFrameNumber = function() {

				var ns = $('#frameNumber').spinner("value")

				if (ns != null || ns != 0) {

					this.myRegisterUniquePropEvent([ {'prop' : 'frameNumber', 'ov' : frameNumber, 'nv' : ns} ])

				} else {

					alert("Numbers only and after the number 1")
				}

			},
			
			this.changeFramesNumber = function() {

				var ns = $('#framesNumber').spinner("value")

				if (ns != null || ns != 0) {

					this.myRegisterUniquePropEvent([ {'prop' : 'framesNumber', 'ov' : framesNumber, 'nv' : ns} ])

				} else {

					alert("Numbers only and after the number 1")
				}

			},

			this.changeSpeed = function() {

				var ns = $('#Speed').spinner("value")

				if (ns != null) {
					//alert(ns)
							
					this.myRegisterUniquePropEvent([ {'prop' : 'Speed', 'ov' : Speed, 'nv' : ns} ])
					

				} else {

					alert("Numbers only")
				}

			},
			
			this.changeRow = function() {

				var ns = $('#Row').spinner("value")

				if (ns != null || ns != 0) {
					//alert(ns)
							
					this.myRegisterUniquePropEvent([ {'prop' : 'Row', 'ov' : Row, 'nv' : ns} ])
					

				} else {

					alert("Numbers only and after the number 1")
				}
			
			},
			
			this.changeRows = function() {

				var ns = $('#Rows').spinner("value")

				if (ns != null) {
					//alert(ns)
							
					this.myRegisterUniquePropEvent([ {'prop' : 'Rows', 'ov' : Rows, 'nv' : ns} ])
					

				} else {

					alert("Numbers only")
				}
			
			},

			this.choiceOfOrientation = function() {

				this.myRegisterUniquePropEvent([ {'prop' : 'Orientable', 'ov' : Orientable, 'nv' : $('#Orientable').prop('checked')} ])

			},

			this.createJSON = function() {

				return {'frameNumber' : frameNumber, 'framesNumber' : framesNumber, 'Speed' : Speed, 'Row' : Row, 'Rows' : Rows, 'Orientable' : Orientable}

			}
        
    }

// static variables/functions

RotateWidget.init = function () {
	$("#rotateMenu").append("<br>Starting Frame<input type='edit' id='frameNumber' name='frameNumber' value='1' >")
    $("#frameNumber").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeFrameNumber() } });
	$("#rotateMenu").append("<br>Total number of frames per row<input type='edit' id='framesNumber' name='framesNumber' value='20' >")
    $("#framesNumber").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeFramesNumber() } });
	$("#rotateMenu").append("<br>If you want auto rotate choose the speed of rotation<input type='edit' id='Speed' name='Speed' value='0' >")
    $("#Speed").spinner({ min: 0, step: 0.01, numberFormat: "n", change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeSpeed() } });
	$("#rotateMenu").append("<br>Row(The row to start from)<input type='edit' id='Row' name='Row' value='1' >")
    $("#Row").spinner({ min: 1, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeRow() } })
    $("#rotateMenu").append("<br>Rows(Total number of rows to move in the y axis)<input type='edit' id='Rows' name='Rows' value='0' >")
    $("#Rows").spinner({ min: 0, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeRows() } })
	$("#rotateMenu").append("<br>Allow interaction with device's gyroscope(if available)<input type='checkbox' id='Orientable' name='Orientable' value='Orientable' onclick='appGlobals.currentObject().choiceOfOrientation()'>")
}

RotateWidget.buttomImage='images/button_icon.png'
RotateWidget.typeId= 'rotate'
RotateWidget.myClass= 'widget_rotate'
RotateWidget.initialWidth='210'
RotateWidget.initialHeight= '186'
RotateWidget.actionsSectionId='rotateMenu'

