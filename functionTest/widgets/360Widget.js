/*
 * This widget is based on the Reel jQuery open source plugin, the most versatile three
 * sixty player for jQuery 
 * The current version used is Reel 1.3
 * For more options http://jquery.vostrel.cz/reel
 */

    
    function RotateWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var frameNumber = 1
        var Speed = 0
        var Orientable = false

			this.createElement = function(param) {

				if (typeof (param) !== 'undefined') {

					if (typeof (param.frameNumber) !== 'undefined')	frameNumber = param.frameNumber

					if (typeof (param.Speed) !== 'undefined') Speed = param.Speed

					if (typeof (param.Orientable) !== 'undefined') Orientable = param.Orientable

						// alert('param '+param.frameNumber)

				}

				return '<img id="'+ this.getId() + '" src="images/rotate/DSCN0691.JPG" width="100%" height="100%" class="reel" />'

			},

			this.initElement = function(param) {

				if ((appGlobals.isInDesignMode() == false))
					$('#' + this.getId()).reel({
						images : 'images/rotate/DSCN####.JPG|691..702',
						frame : frameNumber, // from which frame to start the rotation
						speed : Speed, // Speed of rotating auto animation
						// duration: 10,
						// velocity: 3,
						orientable : Orientable == false ? 1 : 0, // For devices that support gyroscope
						responsive : true
					});

				// alert(frameNumber)

			},

			this.propChange = function(param) {

				for (var i = 0; i < param.length; i++) {

					if (param[i].prop == 'frameNumber') frameNumber = param[i].value

					if (param[i].prop == 'Speed') Speed = param[i].value

					if (param[i].prop == 'Orientable') Orientable = param[i].value

						// alert('prop '+frameNumber)

				}

			},

			this.selectionChanged = function() {

				$('#frameNumber').spinner('value', frameNumber)

				$('#Speed').spinner('value', Speed)

				$('#Orientable').prop('checked', Orientable)

			},

			this.changeFrameNumber = function() {

				var ns = $('#frameNumber').spinner("value")

				if (ns != null || ns == 0) {

					this.myRegisterUniquePropEvent([ {'prop' : 'frameNumber', 'ov' : frameNumber, 'nv' : ns} ])

				} else {

					alert("Numbers only and and after the number 1")
				}

			},

			this.changeSpeed = function() {

				var ns = $('#Speed').spinner("value")

				if (ns != null) {

					this.myRegisterUniquePropEvent([ {'prop' : 'Speed', 'ov' : Speed, 'nv' : ns} ])

				} else {

					alert("Numbers only")
				}

			},

			this.choiceOfOrientation = function() {

				this.myRegisterUniquePropEvent([ {'prop' : 'Orientable', 'ov' : Orientable, 'nv' : $('#Orientable').prop('checked')} ])

			},

			this.createJSON = function() {

				return {'frameNumber' : frameNumber, 'Speed' : Speed }

			}
        
    }

// static variables/functions

RotateWidget.init = function () {
	$("#rotateMenu").append("<br>Starting Frame<input type='edit' id='frameNumber' name='frameNumber' value='1' >")
    $("#frameNumber").spinner({ min: 1, change: function (event, ui) { appGlobals.currentObject().changeFrameNumber() } });
	$("#rotateMenu").append("If you want auto rotate choose the speed of rotation<input type='edit' id='Speed' name='Speed' value='0' >")
    $("#Speed").spinner({ min: 0, change: function (event, ui) { appGlobals.currentObject().changeSpeed() } });
	$("#rotateMenu").append("Allow interaction with device's gyroscope(if available)<input type='checkbox' id='Orientable' name='Orientable' value='Orientable' onclick='appGlobals.currentObject().choiceOfOrientation()'>")
}

RotateWidget.buttomImage='images/button_icon.png'
RotateWidget.typeId= 'rotate'
RotateWidget.myClass= 'widget_rotate'
RotateWidget.initialWidth='210'
RotateWidget.initialHeight= '186'
RotateWidget.actionsSectionId='rotateMenu'

