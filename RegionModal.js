
class Region {
	constructor (board, name) {
		this.board = board;
		this.name = name;
		this.cells = new Set();
		this.rulesets = new Map();	// {key: State.value, value: RuleSet}
		this.keygens = new Map();		// {key: State.value, value: KeyGen}
	}
}

class RegionModal {
	constructor (id, parent, cancel_action, save_action) {
		this.parent = parent;

		this.form						= document.createElement("form");

		this.input_fields		= document.createElement("fieldset");
		this.button_fields	= document.createElement("fieldset");

		this.name						= document.createElement("input");
		this.rulesets				= document.createElement("select");
		this.keygens				= document.createElement("select");

		this.name_label			= document.createElement("label");
		this.rulesets_label	= document.createElement("label");
		this.keygens_label	= document.createElement("label");

		this.remove_ruleset	= document.createElement("button");
		this.add_ruleset		= document.createElement("button");
		this.remove_keygen	= document.createElement("button");
		this.add_keygen			= document.createElement("button");
		this.cancel					= document.createElement("button");
		this.save						= document.createElement("input");

		this.form.id = id;
		this.name.id = this.form.id + "_name";
		this.rulesets.id = this.form.id + "_rulesets";
		this.keygens.id = this.form.id + "_keygens";

		this.rulesets.size = 5;
		this.keygens.size = 5;

		this.name.htmlFor = this.name.id;
		this.rulesets.htmlFor = this.rulesets.id;
		this.keygens.htmlFor = this.keygens.id;

		this.name_label.textContent = "Name";
		this.rulesets_label.textContent = "RuleSets";
		this.keygens_label.textContent = "KeyGens";
		this.remove_ruleset.textContent = "Remove";
		this.add_ruleset.textContent = "Add"
		this.remove_keygen.textContent = "Remove";
		this.add_keygen.textContent = "Add";

		this.cancel.textContent = "Cancel";
		this.cancel.type = "reset";
		this.save.textContent = "Save";
		this.save.type = "submit";

		this.remove_ruleset.addEventListener("click", (e) => {});
		this.add_ruleset.addEventListener("click", (e) => {});
		this.remove_keygen.addEventListener("click", (e) => {});
		this.add_keygen.addEventListener("click", (e) => {});
		this.cancel.addEventListener("click", (e) => {
			cancel_action(this);
		});
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			save_action(this);
		});
	}
	show () {
		this.parent.appendChild(this.form);
		this.name.focus();
	}
	hide () {
		this.parent.appendChild(this.form);
	}
}

/*
<form id="">
	<fieldset>

	</fieldset>
	<fieldset>
		<button>Cancel</button>
		<input type="submit">Save</input>
	</fieldset>
</form>
*/







