define("Testing",function(){
	return function() {
		this.name = undefined;
		this.description = undefined;
		this.status = "pending";
		this.questions = [];
		this.results = [];
	};
});