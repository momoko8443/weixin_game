define("questionService", function() {
	function QuestionService() {
		this.save = function(parentId,newObject,retFunc) {
			$.post("/testing/" + parentId + "/question", newObject, function(data) {
				retFunc(data);
			});
		};

		this.update = function(parentId,id,updateObject,retFunc) {
			var url = "/testing/" + parentId + "/question/" + id;
			$.ajax({
				url : url,
				type : "PUT",
				data : updateObject,
				success : function(data) {
					retFunc(data);
				}
			});
		};

		this.remove = function(parentId,id,retFunc) {
			var url = "/testing/" + parentId + "/question/" + id;
			$.ajax({
				url : url,
				type : "DELETE",
				success : function(data) {
					retFunc(data);
				}
			});
		};
	}
	
	return new QuestionService();
});
