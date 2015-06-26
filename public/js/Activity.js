function Activity(){
	this.id = undefined;
    this.name = undefined;
    this.description = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.status = "pending";
    this.limit = 1;
    this.users = [];
}

Activity.prototype.convertModel2Entity = function(model){
	this.id = model._id;
	this.name = model.name;
	this.description = model.description;
    this.startDate = model.startDate;
    this.endDate = model.endDate;
    this.status = model.status;
    this.limit = model.limit;
    this.users = model.users;
};

Activity.prototype.startDateLabelFunc = function(){
	return this.startDate.split("T")[0];
};

Activity.prototype.endDateLabelFunc = function(){
	return this.endDate.split("T")[0];
};


