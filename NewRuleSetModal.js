class RuleSet {
	constructor (name, state) {
		this.name = name;
		this.state = state;
		this.rules = new Map();
	}
}

class NewRuleSetModal {
	constructor (id, states, cancel_action, save_action) {
		this.states = states;

		this.modal	= document.createElement("div");
		this.form		= document.createElement("form");

		this.name 							= document.createElement("input");
		this.curr_state					= document.createElement("select");
		this.next_states				= document.createElement("select");
		this.remove_next_state	= document.createElement("button");
		this.add_next_state			= document.createElement("button");
		this.cancel							= document.createElement("button");
		this.save								= document.createElement("input");

		this.name_label					= document.createElement("label");
		this.curr_state_label		= document.createElement("label");
		this.next_states_label	= document.createElement("label");

		this.rule_curr_state		= document.createElement("fieldset");
		this.rule_next_state		= document.createElement("fieldset");

		this.next_state_key						= document.createElement("input");
		this.next_state_select				= document.createElement("select");
		this.next_state_key_label			= document.createElement("label");
		this.next_state_select_label	= document.createElement("label");

		this.modal.id = id;
		this.form.id = this.modal.id +"form";
		this.name.id = this.modal.id + "name";
		this.curr_state.id = this.modal.id + "curr_state";
		this.next_states.id = this.modal.id + "next_states";
		this.next_state_key.id = this.modal.id + "next_state_key";
		this.next_state_select.id = this.modal.id + "next_state_select";

		this.remove_next_state.textContent = "Remove";
		this.add_next_state.textContent = "Add";
		this.cancel.textContent = "Cancel";
		this.save.textContent = "Save";

		this.next_states.size = 5;
		this.next_state_select.size = 5;

		this.save.type = "submit";

		this.remove_next_state.addEventListener("click", (e) => {
			this.remove();
		});
		this.add_next_state.addEventListener("click", (e) => {
			this.add();
		});
		this.cancel.addEventListener("click", (e) => {
			cancel_action(this);
		});
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
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

		let df1 = document.createDocumentFragment();
		let df2 = document.createDocumentFragment();
		for (let s of states) {
			let o = document.createElement("option");
			o.textContent = s.name;
			df1.appendChild(o);
			df2.appendChild(o.cloneNode(true));
		}
		this.curr_state.appendChild(df1)
		this.next_state_select.appendChild(df2);

		this.rule_curr_state.appendChild(this.name_label);
		this.rule_curr_state.appendChild(this.name);
		this.rule_curr_state.appendChild(this.curr_state_label);
		this.rule_curr_state.appendChild(this.curr_state);
		this.rule_curr_state.appendChild(this.next_states_label);
		this.rule_curr_state.appendChild(this.next_states);
		this.rule_curr_state.appendChild(this.remove_next_state);

		this.rule_next_state.appendChild(this.next_state_key_label);
		this.rule_next_state.appendChild(this.next_state_key);
		this.rule_next_state.appendChild(this.next_state_select_label);
		this.rule_next_state.appendChild(this.next_state_select);
		this.rule_next_state.appendChild(this.add_next_state);

		this.form.appendChild(this.rule_curr_state);
		this.form.appendChild(this.rule_next_state);
		this.form.appendChild(this.cancel);
		this.form.appendChild(this.save);

		this.modal.appendChild(this.form);

		console.log(this);
	}
	add () {
		if (this.next_state_key.value == "") {
			console.log("VALIDATION ERROR: Key field empty");
			return;
		}
		if (isNaN(this.next_state_key.value)) {
			console.log("VALIDATION ERROR: Key is not a number");
			return;
		}
		if (this.next_state_select.selectedIndex === -1) {
			console.log("VALIDATION ERROR: Nothing Selected in next_state_select select box");
			return;
		}
		let k = this.next_state_key.value;
		let v = this.next_state_select.options[this.next_state_select.selectedIndex].textContent;

		for (let i of this.next_states.options) {
			let state_key = JSON.parse(i.textContent);
			if (Number(state_key['key']) == k) {
				console.log("VALIDATION ERROR: Key already present in this.next_states");
				return;
			}
		}
		let o = document.createElement("option");
		o.textContent = JSON.stringify({key:k, state:v});
		this.next_states.appendChild(o);
	}
	remove () {
		if (this.next_states.selectedIndex === -1) {
			console.log("VALIDATION ERROR: Nothing Selected in next_states select box");
			return;
		}
		let ns = this.next_states;
		ns.removeChild(ns.options[ns.selectedIndex]);
	}
	show () {
		document.body.appendChild(this.modal);
		this.name.focus();
	}
	hide () {
		document.body.removeChild(this.modal);
	}
}

var test = new NewRuleModal("test", [{name:"test 1"},{name:"blargh"},{name:"garble"}]);
test.show();
console.log(test.next_states.selectedIndex);

/*
<div id="new_rule_modal">
	<fieldset>
		<label for="new_rule_modal_curr_state">Current State</label>
		<select id="new_rule_modal_curr_state"></select>

		<label for="new_rule_modal_next_state_list">Next States</label>
		<select id="new_rule_modal_next_state_list"></select>

		<button id="new_rule_modal_remove">Remove</button>
	</fieldset>
	<fieldset>
		<label for="new_rule_modal_key">Key</label>
		<input id="new_rule_modal_key">

		<label for="new_rule_modal_next_state">Next State</label>
		<select id="new_rule_modal_next_state"></select>

		<button id="new_rule_modal_add">Add</button>
	</fieldset>
	<button id="new_rule_modal_cancel">Cancel</button>
	<button id="new_rule_modal_save">Save</button>
</div>
*/








