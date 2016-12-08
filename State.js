class State {
	constructor (name, value, color) {
		this.name = name;
		this.value = value;
		this.color = color;
	}
}

class NewStateModal {
	constructor (id, cancel_action, save_action) {
		this.modal = document.createElement("div");
		this.modal.id = id;

		this.form = document.createElement("form");

		this.name = document.createElement("input");
		this.value = document.createElement("input");
		this.color = document.createElement("input");

		this.name_label = document.createElement("label");
		this.value_label = document.createElement("label");
		this.color_label = document.createElement("label");

		this.cancel = document.createElement("button");
		this.save = document.createElement("button");

		this.name.id = this.modal.id + "name";
		this.value.id = this.modal.id + "value";
		this.color.id = this.modal.id + "color";

		this.name_label.htmlFor = this.name.id;
		this.value_label.htmlFor = this.value.id;
		this.color_label.htmlFor = this.color.id;
		this.name_label.textContent = "Name";
		this.value_label.textContent = "Value";
		this.color_label.textContent = "Color";
		this.color.type = "color";

		this.cancel.textContent = "Cancel";
		this.save.textContent = "Save";
		this.cancel.addEventListener("click", (e) => {
			cancel_action(this);
		});
		this.save.addEventListener("click", (e) => {
			save_action(this)
		});
		
		this.form.appendChild(this.name_label);
		this.form.appendChild(this.name);
		this.form.appendChild(this.value_label);
		this.form.appendChild(this.value);
		this.form.appendChild(this.color_label);
		this.form.appendChild(this.color);
		this.form.appendChild(this.cancel);
		this.form.appendChild(this.save);

		this.modal.appendChild(this.form);
	}
	show () {
		document.body.appendChild(this.modal);
		this.name.focus();
	}
	hide () {
		document.body.removeChild(this.modal);
	}
}







