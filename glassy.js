var nextStateMap = new Map([
	["on", "off"],
	["off", "on"]
]);

var stateScoreMap = new Map([
	["on", 0],
	["off", 0]
]);

class Cell {
	constructor(x, y, w, h, state, id, board) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.board = board;
		this.state = state;
		this.town = [];
		this.cell = document.createElement("div");
		this.cell.className = state;
		this.cell.id = id;
		this.rLeft = Math.floor(Math.random() * (window.innerWidth - w));
		this.rTop = Math.floor(Math.random() * (window.innerHeight - h));
		this.cell.style.left = this.rLeft + "px";
		this.cell.style.top = this.rTop + "px";
		this.cell.style.width = w + "px";
		this.cell.style.height = h + "px";
		this.cell.addEventListener("click", (e) => {
			this.trigger(true);
		});
		document.body.appendChild(this.cell);
	}
	trigger(direct) {
		if (direct) {
			for (let x of this.town) {
				x.trigger(false);
			}
			this.board.updateScore(this);
		}

		// temporary global reference
		this.state = nextStateMap.get(this.state);
		this.cell.className = this.state;
		if (!direct) {
			let rx = Math.floor(Math.random() * (window.innerWidth - this.w));
			let ry = Math.floor(Math.random() * (window.innerHeight - this.h));
			this.cell.style.left = rx + "px";
			this.cell.style.top = ry + "px";
		}
	}
}

class Board {
	constructor(rows, cols, w, h) {
		this.rows = rows;
		this.cols = cols;
		this.board = [];
		this.score = new Map();
		this.score.set("on", 0);
		this.score.set("off", 0);
		
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let cell = new Cell(j, i, w, h, "off", "cell_" + (j + i * cols), this);
				this.board.push(cell);
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
	updateScore(cell) {
		console.log("test");
		if (cell.state == "on") {
			this.score.set("on", this.score.get("on") + 1);
			this.score.set("off", this.score.get("off") - 1);
		} else {
			this.score.set("on", this.score.get("on") - 1);
			this.score.set("off", this.score.get("off") + 1);
		}
		for (let c of cell.town) {
			if (c.state == "on") {
				this.score.set("on", this.score.get("on") + 1);
				this.score.set("off", this.score.get("off") - 1);
			} else {
				this.score.set("on", this.score.get("on") - 1);
				this.score.set("off", this.score.get("off") + 1);
			}
		}
		document.getElementById("scoreOn").innerHTML = this.score.get("on");
		document.getElementById("scoreOff").innerHTML = this.score.get("off");
	}
}

var board = new Board(10, 10, 25, 25);
for (let i = 0; i < 100; i++) {
	let r = Math.floor(Math.random() * board.board.length);
	board.board[r].trigger(true);
}

class CanCell {

}

class CanBoard {
	
}











