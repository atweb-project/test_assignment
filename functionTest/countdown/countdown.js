
$(function () {

    
	var AustDate = $(window.frameElement).attr('fdate')
	var FDate = AustDate.split(",")
	var Compactlayout = $(window.frameElement).attr('compactlayout')
	//alert(Compactlayout)

	if (Compactlayout == 'false') {
		Compactlayout = false
	}

	$('#defaultCountdown').countdown({
		until : new Date(FDate),
		compact : Compactlayout
	})
	$('#pauseButton').click(function() {
		var pause = $(this).text() === 'Pause'
		$(this).text(pause ? 'Resume' : 'Pause')
		$('#defaultCountdown').countdown(pause ? 'pause' : 'resume')
	})
    
})