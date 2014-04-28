

var navArr = [],
	curHoverIndex = -1,
	buttonWidth = 106,
	found,
	downButtonIndex = -1;

function formatTweets() {
	
	$('.tweet').each(function () {
				
		tweetTextString = $(this).text();
	
		var urlPattern = /(http|https):\/\/([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}[A-Za-z0-9_\/\-]+/g;
		tweetTextString = tweetTextString.replace(urlPattern, '<a href="$&" class="subtleLink" target="_blank">$&</a>');
		
		var hashPattern = /#\S+/g;
		tweetTextString = tweetTextString.replace(hashPattern, '<a href="http://twitter.com/#search?q=$&" class="hash" target="_blank">$&</a>');
		var hashSymbolPattern = /\?q=#/;
		tweetTextString =  tweetTextString.replace(hashSymbolPattern, "?q=%23");
		
		var atPattern = /@\S+/g;
		tweetTextString = tweetTextString.replace(atPattern, '<a href="http://twitter.com/$&" class="at subtleLink" target="_blank">$&</a>');
		
		$(this).html(tweetTextString);
	
	});
}

function getTweets() {
	
	$.ajax({
		async: true,
		url: 'http://www.williammalone.com/twitter/getTweets.php',
		type: 'POST',
		success: function(response) {
			
			//$('#tweets').html(response);
			
			formatTweets();
		}
	});
}

function rollOverNav(xPos) {
	
	$("#navOverIcon").stop(true);
	$("#navOverIcon").css("opacity", 1);
	$("#navOverIcon").css("visibility", "visible");
	$("#navOverIcon").animate({"marginLeft": xPos}, 500);
}

function rollOutNav() {
	
	$("#navOverIcon").animate({"opacity": 0}, 500, function() { 
		    curHoverIndex = -1;
	    }
	);
}

function touchHandler(e) {
		
		var type,
			touch = e.changedTouches[0],
			simEvt;

		switch (e.type) {
		case "touchstart": 
			type = "mousedown";
			break;
		case "touchmove": 
			type = "mousemove";
			break;        
		case "touchend": 
			type = "mouseup";
			break;
		default: return;
		}

		simEvt = window.document.createEvent("MouseEvent");
		simEvt.initMouseEvent(type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		touch.target.dispatchEvent(simEvt);
		
		e.preventDefault();
}
	
(function executeRootScript() {
	
	var updateNavDownArrow = function () {
	
		var offset = (buttonWidth * downButtonIndex) + $("#nav").offset().left - $("#page").offset().left - 20 + buttonWidth / 2 - parseInt($("#navDownIcon").width()) /2;
		$("#navDownIcon").css("marginLeft", offset.toString() + "px");
	};
	
	$("#navOverIcon").css("visibility", "hidden");
	$("#navOverIcon").css("marginTop", "-35px");
	
	$(".navDown").each(function () {
		$("#navDownIcon").css("visibility", "visible");

		$(".navLink").each(function () {
		  downButtonIndex++;
		  if($(this).hasClass("navDown")) {
			return false;
		  }
		});
		updateNavDownArrow();
	});
	
	$(".navLink").mouseenter(function () {
			$("#navOverIcon").css("visibility", "visible");
			var thisId = $(this).attr('id');
			var i = 0;
			found = false;
			$(".navLink").each(function() {
			  if($(this).attr('id') == thisId) {
					 found = true;
			  }
			  if (!found) {
				i += 1;
			  }
			});
			curHoverIndex = i;
			var navDownLoc = $("#nav").offset().left - $("#page").offset().left - 20 + curHoverIndex * buttonWidth + buttonWidth / 2 - 18;
			rollOverNav(navDownLoc);
		});
		
	$(".navLink").mouseleave(
		function () {
			rollOutNav();
		}
	);
	
	$(window).resize(updateNavDownArrow);
	
}());

//  Improved version of JavaScript fix for the iOS viewport scaling bug. See http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
// By @mathias, @cheeaun and @jdalton

(function(doc) {

	var addEvent = 'addEventListener',
	    type = 'gesturestart',
	    qsa = 'querySelectorAll',
	    scales = [1, 1],
	    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));