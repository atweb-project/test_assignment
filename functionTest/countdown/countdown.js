
$(function () {

    
	var AustDate = $(window.frameElement).attr('fdate')
	var FDate = AustDate.split(",")
	var Compactlayout = $(window.frameElement).attr('compactlayout')
	//alert(Compactlayout)
	var allowInit = $(window.frameElement).attr('paraminit');

	if (Compactlayout == 'false') {
		Compactlayout = false
	}

	if (allowInit == 1 ) {
	$('#defaultCountdown').countdown({
		until : new Date(FDate),
		compact : Compactlayout
	})
	
	$('#defaultCountdown').countdown('pause')
	
	}
	
	$('#defaultCountdown').countdown({
		until : new Date(FDate),
		compact : Compactlayout
	})
	
	$('.is-countdown').css({border:0})
})