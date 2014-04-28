
function createTableOfContents() {
	
	$("#tableOfContents").html('<div id="tableOfContentsTitle"><img src="http://seed2.watermelonduck.com/table-of-contents.png" alt="Table of Contents" width="215px" height="25px" /></div>');

	$("h1").before('<a name="title"></a>');
	
	var lastHeader;
	$("#tableOfContents").append(document.createElement("ul"));
	$.each( $("h2"), function (i) {
			$("#tableOfContents ul").append('<li id="subtitleLink' + i + '"><a href="#subTitle' + i + '" id="subtitleAnchor' + i + '" class="subtleLink">' + $(this).text() + '</a></li>');
			$("#subtitleLink" + i).click(function () { 
			   //$("#tableOfContents").animate({marginTop: subtitleOffsetTop + "px"}, 1000);
			});
			$(this).before('<a name="subTitle' + i + '"></a>');
			lastHeader = i;
		}
	);
	$("#subtitleAnchor" + lastHeader).addClass("smallShareHeader");
	
	var shareListStr = "";
	shareListStr += '<li>';
	shareListStr += '	<ul id="tableOfContentsShareList">';
	shareListStr += '		<li class="twitterShare shareListItem"><img src="http://seed4.watermelonduck.com/share-twitter.png" title="Share on Twitter" width="22px" height="22px" /></li>';
	shareListStr += '		<li class="facebookShare shareListItem"><img src="http://seed4.watermelonduck.com/share-facebook.png" title="Share on FaceBook" width="22px" height="22px" /></li>';
	shareListStr += '		<li class="diggShare shareListItem"><img src="http://seed4.watermelonduck.com/share-digg.png" title="Share on Digg" width="22px" height="22px" /></li>';
	shareListStr += '		<li class="deliciousShare shareListItem"><img src="http://seed4.watermelonduck.com/share-delicious.png" title="Share on delicious" width="22px" height="22px" /></li>';
	shareListStr += '		<li class="stumbleUponShare shareListItem"><img src="http://seed4.watermelonduck.com/share-stumble.png" title="Share on StumbleUpon" width="22px" height="22px" /></li>';
	shareListStr += '		<li class="redditShare shareListItem"><img src="http://seed4.watermelonduck.com/share-reddit.png" title="Share on Reddit" width="22px" height="22px" /></li>';
	shareListStr += '	</ul>';
	shareListStr += '</li>';
	$("#tableOfContents ul").append(shareListStr);
	
	$("#tableOfContents").css("display", "block");	
	
	$(window).scroll(
		function () 
		{
			if($(window).scrollTop() > $("#content").position().top + 20){
				$("#tableOfContents").css("position", "fixed");
				var marginTop = 20;// - $("#content").height();
				/*$("#tableOfContents").css("margin-top", marginTop + "px");*/
				$("#tableOfContents").css("top", "0");
			}else{
				$("#tableOfContents").css("position", "static");
				$("#tableOfContents").css("margin-top", "20px");
		  }
		}
	);
	
	setTimeout(callToAction, 20000);
}

function callToAction()
{
	$(".smallShareHeader").slideUp();	
	setTimeout(callToAction2, 20000);
}

function callToAction2()
{
	$(".smallShareHeader").slideDown();	
	setTimeout(callToAction, 20000);
}

function createShareLinks()
{
	var description = articleDescription,
	    url = encodeURIComponent(location.href),
		title = encodeURIComponent(document.title);
	
	$(".twitterShare").click(function(){
			window.open('http://twitter.com/home?status='+title + ' ' + url);
	});
	
	$(".facebookShare").click(function(){ 
			window.open('http://www.facebook.com/sharer.php?u=' + url + '&amp;t='+ title,'sharer','toolbar=0,status=0,width=626,height=436');
	});
	
	$(".diggShare").click(function(){ 
			window.open('http://digg.com/submit?url=' + url + '&amp;title=' + title + '&amp;bodytext=' + description);
	});
	
	$(".deliciousShare").click(function () { 
			window.open('http://delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url=' + url + '&amp;title=' + title);
	});
	
	$(".stumbleUponShare").click(function(){ 
			window.open('http://www.stumbleupon.com/submit?url=' + url + '&amp;title=' + title);
	});
	
	$(".redditShare").click(function(){ 
			window.open('http://reddit.com/submit?url=' + url + '&amp;title=' + title);
	});
	
}

createTableOfContents();
createShareLinks();