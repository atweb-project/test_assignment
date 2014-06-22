/**
 * Image Gallery call
 */

$(function() {

	//Lets get the global variables
	var Autoplay = $(window.frameElement).attr('autostart');
	var AutoPlaySpeed = parseInt($(window.frameElement).attr('autoplayspeed'));
	var DataSort = $(window.frameElement).attr('datasort');
	var LightBox = $(window.frameElement).attr('lightbox');
	var Transition = $(window.frameElement).attr('transition');
	var TransitionSpeed = parseInt($(window.frameElement).attr('transitionspeed'));
	var allowPlay = $(window.frameElement).attr('paramplay');

	//alert('pass '+Autoplay)

	function AutoPlayValue() {
		if (Autoplay == 'false') {
			Start = false
		} else {
			Start = AutoPlaySpeed
		}
	}

	function LightBoxValue() {
		if (LightBox == 'false') {
			Lightboxvalue = false
		} else {
			Lightboxvalue = true
		}
	}

	AutoPlayValue()

	LightBoxValue()

	// Load the classic theme
	Galleria.loadTheme('galleria.classic.min.js');

	// Initialize Galleria
	Galleria.run('#galleria', {
		responsive : true,
		autoplay : Start, //1
		dataSort : DataSort,//2
		easing : 'galleria',
		lightbox : Lightboxvalue,//3
		transition : Transition, //4
		transitionSpeed : TransitionSpeed, //5
		extend : function() {
			var gallery = this; // "this" is the gallery instance
			if ((Start == true || Start > 0) && allowPlay == 0)

				gallery.pause(); // call the pause method

		}
	});

});