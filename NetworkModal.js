
class NetworkSchema {
	constructor (name, relative_peers) {
		this.name = name;
		this.peers = relative_peers;
	}
}

class Network {
	constructor (board, cell, relative_peers) {
		this.cells = Network.build_network(board, cell, peer_list);
	}
	static build_network(board, cell, relative_peers) {
		let network = [];

		for (let p of relative_peers)
			network.push(board.get_cell(cell[0] + p[0], cell[1] + p[1]));

		return network;
	}
	static MOORE () {
		return [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
	}
	static VON_NEUMANN () {
		return [[0, -1], [1, 0], [0, 1], [-1, 0]];
	}
	static X () {
		return [[-1, -1], [1, -1], [1, 1], [-1, 1]];
	}
}

class NetworkModal {
	constructor (id, parent, cancel_action, save_action) {
		// Behind the scenes data here
		this.w = 3;
		this.h = 3;
		this.local_cell = [1, 1]
		this.local_board = [0,0,0,0,2,0,0,0,0]; // local cell denoted by 2. Peers denoted by 1.
		this.parent = parent;

		// Because I'm tired of typing this whole thing out
		let ce = document.createElement;

		// Form Node creation here
		this.form							= ce("form");

		this.input_fields			= ce("fieldset");
		this.button_fields		= ce("fieldset");

		this.name							= ce("input");
		this.name_label				= ce("label");

		this.local_board_view	= ce("table");
		this.resize_board();

		this.increase_width		= ce("button");
		this.decrease_width		= ce("button");
		this.increase_height	= ce("button");
		this.decrease_height	= ce("button");

		this.local_cell_tool	= ce("button");
		this.peer_tool				= ce("button");

		this.cancel						= ce("button");
		this.save							= ce("input");

		// Event Handlers here
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			save_action(this);
		});

		// Put Nodes together here
		this.input_fields.appendChild(this.name_label);
		this.input_fields.appendChild(this.name);
		this.input_fields.appendChild(this.local_board_view);
		this.input_fields.appendChild(this.increase_width);
		this.input_fields.appendChild(this.decrease_width);
		this.input_fields.appendChild(this.increase_height);
		this.input_fields.appendChild(this.decrease_height);
		this.input_fields.appendChild(this.local_cell_tool);
		this.input_fields.appendChild(this.peer_tool);

		this.button_fields.appendChild(this.cancel);
		this.button_fields.appendChild(this.save);

		this.form.appendChild(this.input_fields);
		this.form.appendChild(this.button_fields);
	}
	resize_board() {
		// resize board based on new width and height and old local board data.
	}
	show () {
		this.parent.appendChild(this.form);
	}
	hide () {
		this.parent.removeChild(this.form);
	}
}











