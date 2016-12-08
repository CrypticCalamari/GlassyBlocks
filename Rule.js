class Rule {
	constructor (name, state) {
		this.name = name;
		this.curr_state = state;
		this.next_state = new Map();
	}
}

class NewRuleModal {
	constructor (id, states, cancel_action, save_action) {
		this.modal = document.createElement("div");

		this.form = document.createElement("form");

		this.name = document.createElement("input");
		this.curr_state = document.createElement("select");
		this.next_states = document.createElement("select");			// remember to set size
		this.remove_next_state = document.createElement("button");
		this.add_next_state = document.createElement("button");
		this.cancel = document.createElement("button");
		this.save = ducment.createElement("button");

		this.name_label = document.createElement("label");
		this.curr_state_label = document.createElement("label");
		this.next_states_label = document.createElement("label");

		this.next_state_div = document.createElement("div");

		this.next_state_key = document.createElement("input");
		this.next_state_select = document.createElement("select");
		this.next_state_key_label = document.createElement("label");
		this.next_state_select_label = document.createElement("label");

		this.modal.id = id;
		this.form.id = this.modal.id + "form";
		this.name.id = this.modal.id + "name";
		this.curr_state.id = this.modal.id + "curr_state";
		this.next_states.id = this.modal.id + "next_states";
		this.next_state_key.id = this.modal.id + "next_state_key";
		this.next_state_select.id = this.modal.id + "next_state_select";

		this.remove_next_state.textContent = "Remove";
		this.add_next_state.textContent = "Add";
		this.cancel.textContent = "Cancel";
		this.save.textContent = "Save";

		this.remove_next_state.addEventListener("click", (e) => {
			this.remove();
		});
		this.add_next_state.addEventListener("click", (e) => {
			this.add();
		});
		this.cancel.addEventListener("click", (e) => {
			cancel_action(this);
		});
		this.save.addEventListener("click", (e) => {
			save_action(this);
		});

		this.name_label.textContent = "Name";
		this.curr_state_label.textContent = "Current State";
		this.next_states_label.textContent = "Next States";
		this.next_state_key_label.textContent = "Key";
		this.next_state_select_label.textContent = "Next State";

		this.name_label.htmlFor = this.name.id;
		this.curr_state_label.htmlFor = this.curr_state.id;
		this.next_states_label.htmlFor = this.next_states.id;
		this.next_state_key_label.htmlFor = this.next_state_key.id;
		this.next_state_select_label.htmlFor = this.next_state_select.id;

		for (let s of states) {
			let o = document.createElement("option");
			o.label = s.name;
			this.next_state_select.appendChild(o);
		}


		this.next_state_dix.appendChild(this.next_state_key_label);
		this.next_state_dix.appendChild(this.next_state_key);
		this.next_state_dix.appendChild(this.next_state_select_label);
		this.next_state_dix.appendChild(this.next_state_select);

		this.form.appendChild(this.name_label);
		this.form.appendChild(this.name);
		this.form.appendChild(this.curr_state_label);
		this.form.appendChild(this.curr_state);
		this.form.appendChild(this.next_states_label);
		this.form.appendChild(this.next_states);
		this.form.appendChild(this.next_state_div);
	}
	add () {
		
	}
	remove () {
		
	}
	show () {
		document.body.appendChild(this.modal);
		this.name.focus();
	}
	hide () {
		document.body.removeChild(this.modal);
	}
}












