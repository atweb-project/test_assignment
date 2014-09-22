/*
 * This widget is based on the Reel jQuery open source plugin, the most versatile three
 * sixty player for jQuery 
 * The current version used is Reel 1.3
 * For more options http://jquery.vostrel.cz/reel
 */

    
    function SequenceWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var Speed = 2
        var Delay = 0
        var Loop = false

			this.createElement = function(param) {

				if (typeof (param) !== 'undefined') {
					
					if (typeof (param.Speed) !== 'undefined') Speed = param.Speed
					
					if (typeof (param.Delay) !== 'undefined')	Delay = param.Delay
					
					if (typeof (param.Loop) !== 'undefined') Loop = param.Loop
					
						// alert('param '+param.frameNumber)

				}

				return '<img id="'+ this.getId() + '" src="images/sequence/particle_hover_04_00000.png" width="100%" height="100%" class="reel" />'

			},

			this.initElement = function(param) {

				
					
					if ((appGlobals.isInDesignMode() == false))
						
					$('#' + this.getId()).reel({
						images : 'images/sequence/particle_hover_04_00###.png',
						speed:     Speed,
				        delay:       Delay,
				        scrollable: false,
				        draggable: false,
				        loops: Loop == false ? 1 : 0,
				        cursor: 'default',
				        responsive : true
					})
			

				// alert(frameNumber)

			},

			this.propChange = function(param) {

				for (var i = 0; i < param.length; i++) {
					
					if (param[i].prop == 'Speed') Speed = param[i].value

					if (param[i].prop == 'Delay') Delay = param[i].value
					
					if (param[i].prop == 'Loop') Loop = param[i].value

						// alert('prop '+Orientable)

				}

			},

			this.selectionChanged = function() {

				$('#delay').spinner('value', Delay)
				
				$('#Speed').spinner('value', Speed)
				
				$('#loops').prop('checked', Loop)

			},

			this.changeDelayNumber = function() {

				var ns = $('#delay').spinner("value")

				if (ns != null ) {

					this.myRegisterUniquePropEvent([ {'prop' : 'Delay', 'ov' : Delay, 'nv' : ns} ])

				} else {

					alert("Numbers only")
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
			
			this.choiceOfLoop = function() {

				this.myRegisterUniquePropEvent([ {'prop' : 'Loop', 'ov' : Loop, 'nv' : $('#loops').prop('checked')} ])

			},

			this.createJSON = function() {

				return {'Delay' : Delay, 'Loop' : Loop, 'Speed' : Speed}

			}
        
    }

// static variables/functions

SequenceWidget.init = function () {
	$("#sequenceMenu").append("Choose the speed of animation<input type='edit' id='Speed' name='Speed' value='0' >")
    $("#Speed").spinner({ min: 0, step: 0.01, numberFormat: "n", change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeSpeed() } });
	$("#sequenceMenu").append("<br>Choose the time of delay until the animation starts<input type='edit' id='delay' name='delay' value='1' >")
    $("#delay").spinner({ min: 0, step: 0.01, numberFormat: "n", change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeDelayNumber() } });
	$("#sequenceMenu").append("<br>Allow looping of sequence<input type='checkbox' id='loops' name='loops' value='loops' onclick='appGlobals.currentObject().choiceOfLoop()'>")
}

SequenceWidget.buttomImage='images/button_icon.png'
SequenceWidget.typeId= 'image_sequence'
SequenceWidget.myClass= 'widget_sequence'
SequenceWidget.initialWidth='104'
SequenceWidget.initialHeight= '124'
SequenceWidget.actionsSectionId='sequenceMenu'

