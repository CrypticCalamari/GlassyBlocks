
var nextStateMap = new Map([
	["on", "off"],
	["off", "on"]
]);

var stateColor = new Map([
	["on", "#FFCC00"],
	["off", "#000000"]
]);

class Cell {
	constructor(x, y, state) {
		this.x = x;
		this.y = y;
		this.state = state;
		this.town = [];
	}
	trigger(nextStateMap, direct) {
		if (direct)
			for (let buddy of this.town)
				buddy.trigger(nextStateMap, false)

		this.state = nextStateMap.get(this.state);
	}
}

class Board {
	constructor(rows, cols, cellWidth, cellHeight, cellBorder) {
		this.rows = rows;
		this.cols = cols;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;
		this.cellBorder = cellBorder;
		this.canvas = document.createElement("canvas");
		this.canvas.width = ((cols * cellWidth) + (cols * cellBorder + cellBorder));
		this.canvas.height = ((rows * cellHeight) + (rows * cellBorder + cellBorder));
		this.canvas.addEventListener("click", (e) => {
			this.click(e);
		});
		this.board = [];

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				this.board.push(new Cell(j, i, "off"));
			}
		}

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (i - 1 >= 0)
					this.board[j + i * this.cols].town.push( this.board[j + (i-1) * cols] );
				if (i + 1 < rows)
					this.board[j + i * this.cols].town.push( this.board[j + (i+1) * cols] );
				if (j - 1 >= 0)
					this.board[j + i * this.cols].town.push( this.board[j-1 + i * cols] );
				if (j + 1 < cols)
					this.board[j + i * this.cols].town.push( this.board[j+1 + i * cols] );
			}
		}
	}
	draw() {
		let ctx = this.canvas.getContext("2d");

		ctx.fillStyle = "#606060"
		ctx.fillRect(0, 0, ctx.width, ctx.height);

		let w = this.cellWidth;
		let h = this.cellHeight;
		let b = this.cellBorder;

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				ctx.fillStyle = stateColor.get(this.board[j + i * this.cols].state);
				ctx.fillRect(j * (w + b), i * (h + b), w, h);
			}
		}
	}
	click(event) {
		let x = Math.floor(event.offsetX / (this.cellWidth + this.cellBorder));
		let y = Math.floor(event.offsetY / (this.cellHeight + this.cellBorder));
		console.log(x, y);

		this.board[this.cols * y + x].trigger(nextStateMap, true);
		this.draw();
	}
}

var board = new Board(10, 10, 50, 50, 1);

document.body.appendChild(board.canvas);
board.draw();

let moveMap = new Map();
for (let i = 0; i < 100; i++) {
	let rx = Math.floor(Math.random() * 10);
	let ry = Math.floor(Math.random() * 10);

	board.board[rx][ry].trigger(nextStateMap, true);
}
board.draw();

// TODO: Linearlize the board structure



