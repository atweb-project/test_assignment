/**
 * A puzzle game
 */

$(function () {

	function Puzzle() {

		this.options = {
			divId: "puzzle",
			height: 465,
			width: 465,
			rows: 3,
			columns: 3,
			image: "lake.jpg",
			shuffleSteps: 10,
			debug: false,
			dropSensitivity: 0.50,
			fadeDuration: 1500
		};

		this.context = null;
		this.cells = [];
		this.draggingCell = null;
		this.dragStartPoint = null;

		this.ctor = function () {

			var self = this;

			var div = $("#" + this.options.divId);
			$("#" + self.options.divId).hide();
			var canvas = $("")
				.attr("height", this.options.height)
				.attr("width", this.options.width)
				.appendTo(div)
				.get(0);
			this.context = canvas.getContext("2d");

			$(canvas).mousedown(function (e) {
				self.draggingCell = null;
				var point = self.pointFromEvent(this, e)
				var cell = self.cellFromPoint(point);
				if (cell !== null && self.emptyCellAdjacent(cell) !== "not") {
					self.draggingCell = cell;
					self.dragStartPoint = point;
				}
			});

			$(canvas).mousemove(function (e) {
				if (self.draggingCell !== null && self.dragStartPoint !== null) {
					self.draggingCell.dragOffset = self.calcOffset(self.dragStartPoint, self.pointFromEvent(this, e));
					if (self.options.debug) {
						console.log("offset: x=" + self.draggingCell.dragOffset.x + ", y=" + self.draggingCell.dragOffset.y);
					}
				}
			});

			$(canvas).mouseup(function (e) { self.handleDragComplete(e); });
			$(div).hover(function (e) { }, function (e) { self.handleDragComplete(e); });

		}

		this.start = function () {

			var self = this;
			var div = $("#" + this.options.divId);
			var img = new Image();
			img.onload = function () {

				self.cells = [];

				var cellWidth = self.options.width / self.options.columns;
				var cellHeight = self.options.height / self.options.rows;
				self.context.drawImage(img, 0, 0);
				$("#" + self.options.divId).fadeIn(self.options.fadeDuration, function () {

					$("#" + self.options.divId).fadeOut(self.options.fadeDuration, function () {

						var id = 0;
						for (var row = 0; row < self.options.rows; row++) {
							for (var col = 0; col < self.options.columns; col++) {

								var x = col * cellWidth;
								var y = row * cellHeight;
								var cellImage = cellImage = self.context.getImageData(x, y, cellWidth, cellHeight);

								self.cells.push(
							new Cell(
								"cell" + id,
								cellImage,
								x,
								y,
								cellWidth,
								cellHeight,
								row,
								col
								)
							);
								id++;
							}
						}
						self.cells[self.cells.length - 1].isEmptyCell = true;

						for (var i = 0; i < self.options.shuffleSteps; i++) {
							self.swapCells(self.randomNonEmptyCell(), self.randomNonEmptyCell());
						}

						setInterval(function () { self.redraw(); }, 0);

						$("#" + self.options.divId).fadeIn(self.options.fadeDuration);
					});
				});
			};

			img.src = this.options.image;

		}

		this.handleDragComplete = function (e) {
			if (this.draggingCell === null) {
				return;
			}
			if (this.options.debug) {
				console.log("drag complete");
			}
			var adjacent = this.emptyCellAdjacent(this.draggingCell);
			var dragComplete = false;
			if (adjacent === "left") {
				dragComplete = this.draggingCell.dragOffset.x < -(this.options.dropSensitivity * this.draggingCell.width); 			} else if (adjacent === "right") { 				dragComplete = this.draggingCell.dragOffset.x > (this.options.dropSensitivity * this.draggingCell.width);
			} else if (adjacent === "up") {
				dragComplete = this.draggingCell.dragOffset.y < -(this.options.dropSensitivity * this.draggingCell.height); 			} else if (adjacent === "down") { 				dragComplete = this.draggingCell.dragOffset.y > (this.options.dropSensitivity * this.draggingCell.height);
			}

			if (dragComplete) {
				this.swapCells(this.draggingCell, this.cells[this.cells.length - 1]);
				if (this.isComplete()) {
					this.complete();
				}
			}

			this.draggingCell.dragOffset = { x: 0, y: 0 };
			this.draggingCell = null;
		}

		this.isComplete = function () {
			for (var i = 0; i < this.cells.length; i++) {
				if (!this.cells[i].isInOriginalPosition()) {
					return false;
				}
			}
			return true;
		}

		this.calcOffset = function (originPoint, otherPoint) {
			var point = { x: otherPoint.x - originPoint.x, y: otherPoint.y - originPoint.y };
			var adjacent = this.emptyCellAdjacent(this.draggingCell);
			if (adjacent === "left") {
				point.x = Math.max(Math.min(point.x, 0), -this.draggingCell.width);
				point.y = 0;
			} else if (adjacent === "right") {
				point.x = Math.min(Math.max(point.x, 0), this.draggingCell.width);
				point.y = 0;
			} else if (adjacent === "up") {
				point.x = 0;
				point.y = Math.max(Math.min(point.y, 0), -this.draggingCell.height);
			} else if (adjacent === "down") {
				point.x = 0;
				point.y = Math.min(Math.max(point.y, 0), this.draggingCell.height);
			}
			return point;
		}

		this.cellFromPoint = function (point) {
			for (var i = 0; i < this.cells.length; i++) { 				var cell = this.cells[i]; 				if (point.x > cell.currentCol * cell.width
			&& point.x < (cell.currentCol + 1) * cell.width 			&& point.y > cell.currentRow * cell.height
			&& point.y < (cell.currentRow + 1) * cell.height) {
					return cell;
				}
			}
			return null;
		}

		this.pointFromEvent = function (canvas, e) {
			var x = Math.floor((e.pageX - $(canvas).offset().left));
			var y = Math.floor((e.pageY - $(canvas).offset().top));
			return { x: x, y: y };
		}

		this.swapCells = function (cellA, cellB) {
			var tmpRow = cellA.currentRow;
			var tmpCol = cellA.currentCol;
			cellA.currentRow = cellB.currentRow;
			cellA.currentCol = cellB.currentCol;
			cellB.currentRow = tmpRow;
			cellB.currentCol = tmpCol;
		}

		this.randomNonEmptyCell = function () {
			var index = Math.floor(Math.random() * (this.cells.length - 1));
			return this.cells[index];
		}

		this.emptyCellAdjacent = function (cell) {
			var emptyCell = this.cells[this.cells.length - 1];
			if (cell.currentCol + 1 === emptyCell.currentCol && cell.currentRow === emptyCell.currentRow) {
				return "right";
			} else if (cell.currentCol - 1 === emptyCell.currentCol && cell.currentRow === emptyCell.currentRow) {
				return "left";
			} else if (cell.currentCol === emptyCell.currentCol && cell.currentRow + 1 === emptyCell.currentRow) {
				return "down";
			} else if (cell.currentCol === emptyCell.currentCol && cell.currentRow - 1 === emptyCell.currentRow) {
				return "up";
			}
			return "not";
		}

		function Cell(id, imageData, imgX, imgY, width, height, initialRow, initialCol) {

			this.id = id;
			this.imageData = imageData;
			this.imgX = imgX;
			this.imgY = imgY;
			this.width = width;
			this.height = height;
			this.initialRow = initialRow;
			this.initialCol = initialCol;
			this.currentRow = this.initialRow;
			this.currentCol = this.initialCol;
			this.isEmptyCell = false;
			this.dragOffset = { x: 0, y: 0 };

			this.draw = function (ctx) {
				var x = (this.currentCol * this.width);
				var y = (this.currentRow * this.height);
				ctx.clearRect(
			x,
			y,
			this.width,
			this.height
			);
				if (!this.isEmptyCell) {
					x += this.dragOffset.x;
					y += this.dragOffset.y;
					ctx.putImageData(
				this.imageData,
				x,
				y
			);
				}
			}

			this.isInOriginalPosition = function () {
				return this.currentCol === this.initialCol && this.currentRow === this.initialRow;
			}
		}

		this.redraw = function () {
			for (var i in this.cells) {
				this.cells[i].draw(this.context);
			}
			if (this.draggingCell !== null) {
				this.draggingCell.draw(this.context);
			}
		}

		this.complete = function () {
			alert("wow!");
		}

		this.ctor();

	}

	var puzzle = new Puzzle();
	puzzle.start();
});