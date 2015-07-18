function Testing() {
	this.id = undefined;
	this.name = undefined;
	this.description = undefined;
	this.status = "pending";
	this.questions = undefined;
	this.results = undefined;
}

Testing.prototype.convertModel2Entity = function(model) {
	if (model) {
		this.id = model._id;
		this.name = model.name;
		this.description = model.description;
		this.status = model.status;
		this.questions = model.questions;
		this.results = model.results;
	}

};

