class State {
	constructor (name, value, color) {
		this.name = name;
		this.value = value;
		this.color = color;
	}
}

class NewStateModal {
	constructor (id, parent, cancel_action, save_action) {
		this.parent = parent;

		this.form = document.createElement("form");

		this.input_fields = document.createElement("fieldset");
		this.button_fields = document.createElement("fieldset");

		this.name = document.createElement("input");
		this.value = document.createElement("input");
		this.color = document.createElement("input");

		this.name_label = document.createElement("label");
		this.value_label = document.createElement("label");
		this.color_label = document.createElement("label");

		this.cancel = document.createElement("button");
		this.save = document.createElement("input");

		this.form.id = id;
		this.name.id = this.form.id + "_name";
		this.value.id = this.form.id + "_value";
		this.color.id = this.form.id + "_color";

		this.name_label.htmlFor = this.name.id;
		this.value_label.htmlFor = this.value.id;
		this.color_label.htmlFor = this.color.id;
		this.name_label.textContent = "Name";
		this.value_label.textContent = "Value";
		this.color_label.textContent = "Color";
		this.color.type = "color";
		this.save.type = "submit";

		this.cancel.textContent = "Cancel";
		this.save.textContent = "Save";
		this.cancel.addEventListener("click", (e) => {
			cancel_action(this);
		});
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			save_action(this);
		});
		
		this.input_fields.appendChild(this.name_label);
		this.input_fields.appendChild(this.name);
		this.input_fields.appendChild(this.value_label);
		this.input_fields.appendChild(this.value);
		this.input_fields.appendChild(this.color_label);
		this.input_fields.appendChild(this.color);
		this.button_fields.appendChild(this.cancel);
		this.button_fields.appendChild(this.save);

		this.form.appendChild(this.input_fields);
		this.form.appendChild(this.button_fields);
	}
	show () {
		this.parent.appendChild(this.form);
		this.name.focus();
	}
	hide () {
		this.parent.removeChild(this.form);
	}
}







