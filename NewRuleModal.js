class Rule {
	constructor (key, state) {
		this.key = key;
		this.state = state;
	}
}

class NewRuleModal {
	constructor (id, states, cancel_action, save_action) {
		this.states = states;

		this.form						= document.createElement("form");
		this.input_fields		= document.createElement("fieldset");
		this.button_fields	= document.createElement("fieldset");

		this.cancel					= document.createElement("button");
		this.save						= document.createElement("input");

		this.key						= document.createElement("input");
		this.state					= document.createElement("select");
		this.key_label			= document.createElement("label");
		this.state_label		= document.createElement("label");

		this.form.id = id;

		this.key.id = this.form.id + "_key";
		this.key.required = true;
		this.key.placeholder = "number";

		this.state.id = this.form.id + "_state";
		this.state.required = true;
		this.state.size = 5;

		this.key_label.textContent = "Key";
		this.key_label.htmlFor = this.key.id;
		this.state_label.textContent = "State";
		this.state_label.htmlFor = this.state.id;

		this.cancel.textContent = "Cancel";
		this.cancel.type = "reset";
		this.save.textContent = "Save";
		this.save.type = "submit";

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

		this.input_fields.appendChild(this.key_label);
		this.input_fields.appendChild(this.key);
		this.input_fields.appendChild(this.state_label);
		this.input_fields.appendChild(this.state);

		this.button_fields.appendChild(this.cancel);
		this.button_fields.appendChild(this.save);

		this.form.appendChild(this.input_fields);
		this.form.appendChild(this.button_fields);
	}
	show () {
		document.body.appendChild(this.form);
		this.key.focus();
	}
	hide () {
		document.body.removeChild(this.form);
	}
}

var test = new NewRuleModal("test", [{name:"test 1"},{name:"blargh"},{name:"garble"}]);
test.show();

/*
<form id="new_rule_modal">
	<fieldset>
		<label for="new_rule_modal_key">Key</label>
		<input id="new_rule_modal_key">

		<label for="new_rule_modal_state">State</label>
		<select id="new_rule_modal_state"></select>
	</fieldset>
	<fieldset>
		<button id="new_rule_modal_cancel">Cancel</button>
		<button id="new_rule_modal_save">Save</button>
	</fieldset>
</form>
*/








