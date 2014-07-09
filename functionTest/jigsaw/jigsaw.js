/**
 * A puzzle game
 */

$(function() {

	// ---- variables ---- //
	var PuzzleURL = $(window.frameElement).attr('puzzleurl');
	
	$('#main').append('<img id="poster" src="'+ PuzzleURL +'" />');
	
	var imgS = document.getElementById('poster');
	
	var widthS = imgS.clientWidth;
	var heightS = imgS.clientHeight;
	var canvas = document.getElementById('puzzle')
	canvas.width = widthS
	canvas.height = widthS
	
	$("#start").on("click", function(e) {	
		$('img').css('display','none');
		$('#puzzle').css('display','block');

	timer = {};
	currentTime = {};
	timerDisplay = $('#buttons').find("#time").find("span b");
	  
	currentTime.seconds = 0;
	currentTime.minutes = 0;
	currentTime.hours = 0;

	var context = $('#puzzle').get(0).getContext('2d');
	
	var img = new Image();
	img.src = PuzzleURL;
	
	$(img).on('load', function(){
		drawTiles()
	});

	var boardSize = document.getElementById('puzzle').width;
	//alert(boardSize);
	var tileCount = $(window.frameElement).attr('numberOfPieces');

	var tileSize = boardSize / tileCount;

	var clickLoc = new Object;
	clickLoc.x = 0;
	clickLoc.y = 0;

	var emptyLoc = new Object;
	emptyLoc.x = 0;
	emptyLoc.y = 0;

	var solved = false;

	var boardParts = new Object;
	setBoard();

	$('#puzzle').on('mousemove', function(e) {
	  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
	  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
	});

	$('#puzzle').on('click', function() {
	  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
	    slideTile(emptyLoc, clickLoc);
	    drawTiles();
	  }
	  if (solved) {
	    setTimeout(function() {alert("You solved it!");
	    location.reload();
	    clearInterval(timer);

	    var totalSeconds = (currentTime.hours * 60 * 60)+ (currentTime.minutes * 60)+ currentTime.seconds;
	    
	    //alert(totalSeconds)
	    // check if there is a bestTime in localstorage (check if puzzleBestTime exists)
        if (localStorage.getItem("puzzleBestTime")) {
            var bestTime = localStorage.getItem("puzzleBestTime");
           //alert(bestTime)

            if (totalSeconds < bestTime) {
                // save new best time
                localStorage.setItem("puzzleBestTime",totalSeconds);

               alert("You got a new best time!");
            }
        } else {
            // save current time
            localStorage.setItem("puzzleBestTime", totalSeconds);

            // display message
           alert("You got a new best time!");
        }
	                                           
	  }, 500);
	  }
	  return false;
	});
	
	if (timer) {
        clearInterval(timer);
        timerDisplay.text("00:00:00");
    }

    // start the timer with setInterval, reset seconds, minutes, and hours to 0
    timer = setInterval(updatetime, 1000);
    

    // update the timer display every second
    function updatetime() {

        // stop timer if 24 hours
        if (currentTime.hours === 23
                && currentTime.minutes === 59
                && currentTime.seconds === 59) {
            clearinterval(timer);
        } else if (currentTime.minutes === 59
                && currentTime.seconds === 59) {
            // increment hours if applicable
            currentTime.hours++;
            currentTime.minutes = 0;
            currentTime.seconds = 0;
        } else if (currentTime.seconds === 59) {
            // increment minutes if applicable
            currentTime.minutes++;
            currentTime.seconds = 0;
        } else {
            // increment seconds
            currentTime.seconds++;
        }

        // build time string (see if we need to pad the beginning of the time with a 0 - e.g, 09 seconds)
        newHours = (currentTime.hours <= 9) ? "0"
                + currentTime.hours : currentTime.hours;
        newMins = (currentTime.minutes <= 9) ? "0"
                + currentTime.minutes : currentTime.minutes;
        newSecs = (currentTime.seconds <= 9) ? "0"
                + currentTime.seconds : currentTime.seconds;

        // update display via an array instead of string concatenation - COMPLICATED!
        timerDisplay.text([ newHours, ":", newMins, ":",
                newSecs ].join(""));
    }
    
    $('#restart').click(function() {
		location.reload();
	});

	function setBoard() {
	  boardParts = new Array(tileCount);
	  for (var i = 0; i < tileCount; ++i) {
	    boardParts[i] = new Array(tileCount);
	    for (var j = 0; j < tileCount; ++j) {
	      boardParts[i][j] = new Object;
	      boardParts[i][j].x = i;
	      boardParts[i][j].y = j;
	    }
	  }
	  initTiles();
	  initEmpty();
	  if (!isSolvable(tileCount, tileCount, emptyLoc.y + 1)) {
	    if (emptyLoc.y == 0 && emptyLoc.x <= 1) {
	      swapTiles(tileCount - 2, tileCount - 1, tileCount - 1, tileCount - 1);
	    } else {
	      swapTiles(0, 0, 1, 0);
	    }
	    initEmpty();
	  }
	  solved = false;
	}

	function initTiles() {
	  var i = tileCount * tileCount - 1;
	  while (i > 0) {
	    var j = Math.floor(Math.random() * i);
	    var xi = i % tileCount;
	    var yi = Math.floor(i / tileCount);
	    var xj = j % tileCount;
	    var yj = Math.floor(j / tileCount);
	    swapTiles(xi, yi, xj, yj);
	    --i;
	  }

	}

	function swapTiles(i, j, k, l) {
	  var temp = new Object();
	  temp = boardParts[i][j];
	  boardParts[i][j] = boardParts[k][l];
	  boardParts[k][l] = temp;
	}

	function isSolvable(width, height, emptyRow) {
	  if (width % 2 == 1) {
	    return (sumInversions() % 2 == 0)
	  } else {
	    return ((sumInversions() + height - emptyRow) % 2 == 0)
	  }
	}

	function sumInversions() {
	  var inversions = 0;
	  for (var j = 0; j < tileCount; ++j) {
	    for (var i = 0; i < tileCount; ++i) {
	      inversions += countInversions(i, j);
	    }
	  }
	  return inversions;
	}

	function countInversions(i, j) {
	  var inversions = 0;
	  var tileNum = j * tileCount + i;
	  var lastTile = tileCount * tileCount;
	  var tileValue = boardParts[i][j].y * tileCount + boardParts[i][j].x;
	  for (var q = tileNum + 1; q < lastTile; ++q) {
	    var k = q % tileCount;
	    var l = Math.floor(q / tileCount);

	    var compValue = boardParts[k][l].y * tileCount + boardParts[k][l].x;
	    if (tileValue > compValue && tileValue != (lastTile - 1)) {
	      ++inversions;
	    }
	  }
	  return inversions;
	}

	function initEmpty() {
	  for (var j = 0; j < tileCount; ++j) {
	    for (var i = 0; i < tileCount; ++i) {
	      if (boardParts[i][j].x == tileCount - 1 && boardParts[i][j].y == tileCount - 1) {
	        emptyLoc.x = i;
	        emptyLoc.y = j;
	      }
	    }
	  }
	}

	function drawTiles() {
	  context.clearRect ( 0 , 0 , boardSize , boardSize );
	  for (var i = 0; i < tileCount; ++i) {
	    for (var j = 0; j < tileCount; ++j) {
	      var x = boardParts[i][j].x;
	      var y = boardParts[i][j].y;
	      if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
	        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
	            i * tileSize, j * tileSize, tileSize, tileSize);
	      }
	    }
	  }
	}

	function distance(x1, y1, x2, y2) {
	  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	}

	function slideTile(toLoc, fromLoc) {
	  if (!solved) {
	    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
	    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
	    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
	    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
	    toLoc.x = fromLoc.x;
	    toLoc.y = fromLoc.y;
	    checkSolved();
	  }
	}

	function checkSolved() {
	  var flag = true;
	  for (var i = 0; i < tileCount; ++i) {
	    for (var j = 0; j < tileCount; ++j) {
	      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
	        flag = false;
	      }
	    }
	  }
	  solved = flag;
	}
	
	
	});
	
});