define("Question",function(){
	return function() {
		this.name = undefined;
		this.description = undefined;
		this.isMultiple = false;
		this.options = [];
	};
});