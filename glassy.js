
class State {
	constructor (name, value, style) {
		this.name = name;
		this.value = value;
		this.style = style;
	}
}
State.ZERO = new State("ZERO", 0, "rgb(0,0,0)");
State.ONE = new State("ONE", 1, "rgb(255,255,255)");
class Cell {
	constructor (x, y, state) {
		this.x = x;
		this.y = y;
		this.prev_state = state;
		this.curr_state = state;
		this.next_state = state;
		this.network = null;
	}
}
class Region {
	constructor (board) {
		this.board = board;
		this.cells = new Set();
		this.rules = new Map();
		this.key_gens = new Map();
	}
}
class Board {
	constructor (w, h, torus=false) {
		this.w = w;
		this.h = h;
		this.torus = torus;
		this.border = (torus ? null : new Cell(-1, -1, State.ZERO));
		this.cells = [];
		this.regions = new Set();
		this.start_region = new Region(this);

		this.regions.add(this.start_region);

		for (let j = 0; j < this.h; j++)
			for (let i = 0; i < this.w; i++)
				this.cells.push(new Cell(i, j, State.ZERO));
	}
	get_cell(x, y) {
		let w = this.w;
		let h = this.h;

		if (this.torus) {
			let _x = (x < 0 ? w - (-x % w) : (x % w));
			let _y = (y < 0 ? h - (-y % h) : (y % h));
			return this.cells[_x + w * _y];
		}
		else {
			if (x < 0 || y < 0 || x >= w || y >= h)
				return this.border;
			else
				return this.cells[x + w * y];
		}
	}
}
class Rule {
	constructor (state) {
		this.curr_state = state;
		this.next_states = new Map();
	}
}
class Network {
	static MOORE (board, x, y) {
		let network = [];

		network.push(board.get_cell(x-1, y-1));
		network.push(board.get_cell(x, y-1));
		network.push(board.get_cell(x+1, y-1));
		network.push(board.get_cell(x+1, y));
		network.push(board.get_cell(x+1, y+1));
		network.push(board.get_cell(x, y+1));
		network.push(board.get_cell(x-1, y+1));
		network.push(board.get_cell(x-1, y));

		return network;
	}
	static VON_NEUMANN (board, x, y) {
		let network = [];

		network.push(board.get_cell(x, y-1));
		network.push(board.get_cell(x+1, y));
		network.push(board.get_cell(x, y+1));
		network.push(board.get_cell(x-1, y));

		return network;
	}
	static X (board, x, y) {
		let network = [];

		network.push(board.get_cell(x-1, y-1));
		network.push(board.get_cell(x+1, y-1));
		network.push(board.get_cell(x+1, y+1));
		network.push(board.get_cell(x-1, y+1));

		return network;
	}
}
class KeyGen {
	static sum (network) {
		let s = 0;

		for (let cell of network)
			s += cell.curr_state.value;

		return s;
	}
}
class CAController {
	constructor (model, view, period) {
		this.board = model;
		this.running = false;
		this.view = view;
		this.period = period;
	}
	start () {
		this.running = true;
		
		this.CALoop = window.setInterval(() => {
			if (this.running) {
				this.step();
				this.transition();
				this.view.update(this.board);
			}
			else {
				window.clearInterval(this.CALoop); // not sure if this line can see CALoop
			}
		}, this.period);
	}
	stop () {
		this.running = false;
	}
	increment_period (increment) {
		this.stop();
		this.period += increment;	// TODO: verify increment
		while (CALoop) {}					// This probably doesn't work does it?
		this.start()							// TODO: come back later and use promises to verify clearInterval was called before this starts again
	}
	step () {
		for (const region of board.regions) {
			for (const cell of region.cells) {
				let rule = region.rules.get(cell.curr_state);
				let key_gen = region.key_gens.get(cell.curr_state);
				let key = key_gen(cell.network);
				cell.next_state = rule.next_states.get(key) || cell.next_state;
			}
		}
	}
	transition () {
		for (let cell of board.cells) {
			cell.prev_state = cell.curr_state;
			cell.curr_state = cell.next_state;
		}
	}
}

class CACanvasView {
	constructor (w, h) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = w;
		this.canvas.height = h;
		this.canvas.addEventListener("click", (e) => {
			// TODO: add click listener
		});
	}
	update (board) {
		
	}
}

class CADivView {
	constructor (w, h) {
		this.w = w;
		this.h = h;
		this.board = [];
		this.table = document.createElement("table");

		for (let j = 0; j < h; j++) {
			let tr = document.createElement("tr");
			for (let i = 0; i < w; i++) {
				let td = document.createElement("td");
				let d = document.createElement("div");
				d.id = "cell_" + (i + j * w);
				d.addEventListener("click", (e) => {
					// TODO: add click function here
				});
			}
		}
	}
	update (board) {
		
	}
}

/*
TODO: Order of Tasks
===============================================================================
() Finish CAGame (creates board and sets it up based on provided attributes)
() Start and Finish LOGame class
() Set up initial menu with callbacks for each game
() Set up Game Menus specific to each game in the respective view class
() Develop a modal menu system for views. Maybe use promises?
*/






















