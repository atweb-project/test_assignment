/**
 * A puzzle game
 */

$(function() {

	// ---- variables ---- //
/*
	numberOfPieces = $(window.frameElement).attr('numberOfPieces');
	//alert($(window.frameElement).attr('numberOfPieces'));
	
	// pieces by width and height
	aspectH = $(window.frameElement).attr('numberOfRows');
	//alert($(window.frameElement).attr('numberOfRows'));
	
	aspectW = Math.floor(numberOfPieces / aspectH);

	// main container
	container = $("#puzzle");
	
	// locate image within main container
	imgContainer = container.find("#figure");
	img = imgContainer.find("img");

	path = img.attr("src");
	
	// calulate size of each piece
	piece = $("<div/>");
	pieceW = Math.floor(img.width() / aspectW);
	pieceH = Math.floor(img.height() / aspectH);
	
	// counter for each piece
	idCounter = 0;
	
	// locations of each piece
	positions = [];
	
	// location of empty piece
	empty = {
		top : 0,
		left : 0,
		bottom : pieceH,
		right : pieceW
	};
	
	// locations of previous pieces
	previous = {};
	
	// time tracking
	timer = {};
	currentTime = {};
	timerDisplay = container.find("#time").find("span");

	// ---- generate puzzle pieces ---- //
	//if (document.documentElement.clientWidth < 600) {
		// don’t download complicated script
		// use low-source images instead of full-source ones
		//alert('yes')
	//}
	
	var detectViewPort = function(){
	    var viewPortWidth = $(window).width();
	    if (viewPortWidth < 500){
	    //...The rest of your above code.
	    	pieceW = Math.floor(pieceW /2)
	    	pieceH = Math.floor(pieceH /2)
	    	$('#puzzle').append('<p>Resized</p>')
	    	location.reload();
	    }
	    if (viewPortWidth > 500){
	    	$('#puzzle p').remove()
	    }
	}

	
	  detectViewPort();
	

	$(window).resize(function () {
	   detectViewPort();
	});

	// loops through twice for both height and width
	for (var x = 0, y = aspectH; x < y; x++) {
		for (var a = 0, b = aspectW; a < b; a++) {
			
			// align puzzle pieces
			var top = pieceH * x, left = pieceW * a;

			// copy the div  element, assigning each piece basic styles and an unique id
			piece.clone().attr("id", idCounter++).css(
					{
						width : pieceW,
						height : pieceH,
						position : "absolute",
						top : top,
						left : left,
						backgroundImage : [ "url(", path, ")" ].join(""),
						backgroundPosition : [ "-", pieceW * a, "px ", "-",
						pieceH * x, "px" ].join("")
					// each piece is then appended to the imgContainer
					}).appendTo(imgContainer);

			// store positions
			positions.push({
				top : top,
				left : left
			});
		}
	}

	// remove image
	img.remove();

	// remove first piece from board
	container.find("#0").remove();

	// remove first item in positions array
	positions.shift();

	// ---- event handler ---- //
	$("#start").on("click",	function(e) {

						// shuffle the pieces randomly
						var pieces = imgContainer.children();

						// helper function
						function shuffle(array) {
							var i = array.length;
							if (i === 0) {
								return false;
							}
							while (--i) {
								var j = Math.floor(Math.random() * (i + 1)), tempi = array[i], tempj = array[j];

								array[i] = tempj;
								array[j] = tempi;
							}
						}

						// call the helper function, pass in the array
						shuffle(pieces);

						// set position of shuffled images
						$.each(pieces, function(i) {
							pieces.eq(i).css(positions[i]);
						});

						// replace existing pieces with shuffled pieces
						pieces.appendTo(imgContainer);

						// make sure empty slot is at position 0 when timer starts
						empty.top = 0;
						empty.left = 0;

						// remove any previous messages
						container.find("#ui").find("p").not("#time").remove();

						// ---- timer ---- //

						// cancel/reset previous timer if it's running
						if (timer) {
							clearInterval(timer);
							timerDisplay.text("00:00:00");
						}

						// start the timer with setInterval, reset seconds, minutes, and hours to 0
						timer = setInterval(updatetime, 1000);
						currentTime.seconds = 0;
						currentTime.minutes = 0;
						currentTime.hours = 0;

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

						// ---- make pieces draggable ---- //

						pieces.draggable({
									// prevent pieces from being moved outside parent (<figure></figure>)
									containment : "parent",
									grid : [ pieceW, pieceH ],

									// start callback
									start : function(e, ui) {

										// grab current location
										var current = getPosition(ui.helper);

										// set Available axis depending on location relative to empty space (where pieces can be moved)
										if (current.left === empty.left) {
											ui.helper.draggable("option",
													"axis", "y");
										} else if (current.top === empty.top) {
											ui.helper.draggable("option",
													"axis", "x");
										} else {
											ui.helper.trigger("mouseup");
											return false;
										}

										// prevent drag if not adjacent to empty space (like on the edges)
										if (current.bottom < empty.top
												|| current.top > empty.bottom
												|| current.left > empty.right
												|| current.right < empty.left) {
											ui.helper.trigger("mouseup");
											return false;
										}

										//remember current location
										previous.top = current.top;
										previous.left = current.left;

									},

									// drag callback
									drag : function(e, ui) {

										// grab current location
										var current = getPosition(ui.helper);

										// stop dragging if we are in the empty space
										if (current.top === empty.top
												&& current.left === empty.left) {
											ui.helper.trigger("mouseup");
											return false;
										}

										// stop dragging if moving away from empty space
										if (current.top > empty.bottom
												|| current.bottom < empty.top
												|| current.left > empty.right
												|| current.right < empty.left) {
											ui.helper.trigger("mouseup").css({
												top : previous.top,
												left : previous.left
											});
											return false;
										}
									},

									// stop callback
									stop : function(e, ui) {
										// grab current location
										var current = getPosition(ui.helper), correctPieces = 0;

										// move empty space if the is space now occupied with a piece
										if (current.top === empty.top
												&& current.left === empty.left) {
											empty.top = previous.top;
											empty.left = previous.left;
											empty.bottom = previous.top
													+ pieceH;
											empty.right = previous.left
													+ pieceW;
										}

										// get positions of all pieces
										$.each(positions, function(i) {

															var currentPiece = $("#" + (i + 1)), currentPosition = getPosition(currentPiece);

															//is the current piece in the correct place?
															if (positions[i].top === currentPosition.top
																	&& positions[i].left === currentPosition.left) {
																correctPieces++;
															}
														});

										// ---- has the puzzle been solved? ---- //

										// end game
										if (correctPieces === positions.length) {

											// stop timer
											clearInterval(timer);

											// append message to the dom
											/*$("<p/>", {
											    text : "Congratulations. You solved the puzzle!"
											}).appendTo("#ui");*/
									/*		alert("Congratulations. You solved the puzzle!")

											// convert time to seconds
											var totalSeconds = (currentTime.hours * 60 * 60)
													+ (currentTime.minutes * 60)
													+ currentTime.seconds;

											// check if there is a bestTime in localstorage (check if puzzleBestTime exists)
											if (localStorage.getItem("puzzleBestTime")) {
												var bestTime = localStorage.getItem("puzzleBestTime");

												if (totalSeconds < bestTime) {
													// save new best time
													localStorage.setItem(
															"puzzleBestTime",
															totalSeconds);

													$("<p/>", {
																text : "You got a new best time!"
															}).appendTo("#ui");
												}
											} else {
												// save current time
												localStorage.setItem(
														"puzzleBestTime",
														totalSeconds);

												// display message
												$("<p/>", {
															text : "You got a new best time!"
														}).appendTo("#ui");
											}
										}
									}
								});

						// helper function to generate location of each piece
						function getPosition(el) {
							return {
								top : parseInt(el.css("top")),
								bottom : parseInt(el.css("top")) + pieceH,
								left : parseInt(el.css("left")),
								right : parseInt(el.css("left")) + pieceW
							}
						}

					});*/
	
	
	 timer = {};
	    currentTime = {};
	    timerDisplay = $('#buttons').find("#time").find("span");
	    
	    currentTime.seconds = 0;
	                        currentTime.minutes = 0;
	                        currentTime.hours = 0;
	  
	  	var context = document.getElementById('puzzle').getContext('2d');

	var img = new Image();
	img.src = 'http://127.0.0.1/test_assignment/functionTest/jigsaw/lake.jpg'//'http://www.brucealderman.info/Images/dimetrodon.jpg';
	img.addEventListener('load', drawTiles, false);

	var boardSize = document.getElementById('puzzle').width;
	var tileCount = 2//document.getElementById('scale').value;

	var tileSize = boardSize / tileCount;

	var clickLoc = new Object;
	clickLoc.x = 0;
	clickLoc.y = 0;

	var emptyLoc = new Object;
	emptyLoc.x = 0;
	emptyLoc.y = 0;

	var solved = false;

	var boardParts;
	setBoard();

	//document.getElementById('scale').onchange = function() {
	 // tileCount = 2;
	 // tileSize = boardSize / tileCount;
	//  setBoard();
	//  drawTiles();
	//};

	document.getElementById('puzzle').onclick = function(e) {
	  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
	  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
	  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
	    slideTile(emptyLoc, clickLoc);
	    drawTiles();
	  }
	  
	  
	  
	  if (solved) {
	    setTimeout(function() {alert("You solved it!");
	    
	    clearInterval(timer);

	    var totalSeconds = (currentTime.hours * 60 * 60)+ (currentTime.minutes * 60)+ currentTime.seconds;

	                                            // check if there is a bestTime in localstorage (check if puzzleBestTime exists)
	                                            if (localStorage.getItem("puzzleBestTime")) {
	                                                var bestTime = localStorage.getItem("puzzleBestTime");

	                                                if (totalSeconds < bestTime) {
	                                                    // save new best time
	                                                    localStorage.setItem("puzzleBestTime",
	                                                            totalSeconds);

	                                                   alert("You got a new best time!");
	                                                }
	                                            } else {
	                                                // save current time
	                                                localStorage.setItem(
	                                                        "puzzleBestTime",
	                                                        totalSeconds);

	                                                // display message
	                                               alert("You got a new best time!");
	                                            }
	    
	    
	    }, 500);
	    
	    
	  }
	};

	function setBoard() {
	  boardParts = new Array(tileCount);
	  for (var i = 0; i < tileCount; ++i) {
	    boardParts[i] = new Array(tileCount);
	    for (var j = 0; j < tileCount; ++j) {
	      boardParts[i][j] = new Object;
	      boardParts[i][j].x = (tileCount - 1) - i;
	      boardParts[i][j].y = (tileCount - 1) - j;
	    }
	  }
	  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
	  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
	  solved = false;
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

	$("#start").on("click", function(e) {
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

	});
	
	
	
	$('#restart').click(function() {
		location.reload();
	});
});