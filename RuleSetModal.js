class RuleSet {
	constructor (name, state) {
		this.name = name;
		this.state = state;
		this.rules = new Map();
	}
}

class RuleSetModal {
	constructor (id, states, parent, cancel_action, save_action) {
		this.states = states;
		this.parent = parent;

		this.form		= document.createElement("form");

		this.input_fields = document.createElement("fieldset");
		this.button_fields = document.createElement("fieldset");

		this.name 				= document.createElement("input");
		this.state				= document.createElement("select");
		this.rules				= document.createElement("select");
		this.remove_rule	= document.createElement("button");
		this.add_rule			= document.createElement("button");
		this.cancel				= document.createElement("button");
		this.save					= document.createElement("input");

		this.name_label		= document.createElement("label");
		this.state_label	= document.createElement("label");
		this.rules_label	= document.createElement("label");

		this.form.id = id;

		this.name.id = this.form.id + "_name";
		this.name.required = true;

		this.state.id = this.form.id + "_state";

		this.name_label.textContent = "Name";
		this.name_label.htmlFor = this.name.id;
		this.state_label.textContent = "State";
		this.state_label.htmlFor = this.state.id;
		this.rules_label.textContent = "Rules";
		this.rules_label.htmlFor = this.rules.id;

		this.remove_rule.textContent = "Remove";
		this.add_rule.textContent = "Add";

		this.rules.id = this.form.id + "_rules";
		this.rules.size = 5;

		this.cancel.textContent = "Cancel";
		this.cancel.type = "reset";
		this.save.textContent = "Save";
		this.save.type = "submit";

		this.remove_rule.addEventListener("click", (e) => {
			this.remove();
		});
		this.add_rule.addEventListener("click", (e) => {
			this.add();
		});
		this.cancel.addEventListener("click", (e) => {
			cancel_action(this);
		});
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			save_action(this);
		});


		let df = document.createDocumentFragment();
		for (let s of states) {
			let o = document.createElement("option");
			o.textContent = s.name;
			df.appendChild(o);
		}
		this.state.appendChild(df)

		this.input_fields.appendChild(this.name_label);
		this.input_fields.appendChild(this.name);
		this.input_fields.appendChild(this.state_label);
		this.input_fields.appendChild(this.state);
		this.input_fields.appendChild(this.rules_label);
		this.input_fields.appendChild(this.rules);
		this.input_fields.appendChild(this.remove_rule);
		this.input_fields.appendChild(this.add_rule);

		this.button_fields.appendChild(this.cancel);
		this.button_fields.appendChild(this.save);

		this.form.appendChild(this.input_fields);
		this.form.appendChild(this.button_fields);
	}
	add () {
		// Create New Rule Modal, show it, disable this or hide it or something
		// Old
		/*let k = this.next_state_key.value;
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
		*/
	}
	remove () {
		if (this.next_states.selectedIndex === -1) {
			console.log("VALIDATION ERROR: Nothing Selected in rules select box");
			return;
		}
		let r = this.rules;
		r.removeChild(r.options[ r.selectedIndex ]);
	}
	show () {
		this.parent.appendChild(this.form);
		this.name.focus();
	}
	hide () {
		this.parent.removeChild(this.form);
	}
}

var test = new RuleSetModal("test", [{name:"test 1"},{name:"blargh"},{name:"garble"}], document.body);
test.show();

/*
<form id="rule_set_modal">
	<fieldset>
		<label for="rule_set_modal_state">State</label>
		<select id="rule_set_modal_state"></select>

		<label for="rule_set_modal_rules">Rules</label>
		<select id="rule_set_modal_rules"></select>

		<button id="rule_set_modal_remove">Remove</button>
		<button id="rule_set_modal_add">Add</button>
	</fieldset>
	<fieldset>
		<button id="rule_set_modal_cancel" type="reset">Cancel</button>
		<input id="rule_set_modal_save" type="submit">Save</input>
	</fieldset>
</div>
*/








