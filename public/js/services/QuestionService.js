define("questionService", function() {
	function QuestionService() {
		this.save = function(parentId,newObject,retFunc) {
			$.post("/testing/" + parentId + "/question", newObject, function(data) {
				retFunc(data);
			});
		};

		this.update = function(parentId,id,updateObject,retFunc) {
			var url = "/testing/" + parentId + "/question/" + id;
			var data = JSON.stringify(updateObject);
			$.ajax({
				url : url,
				type : "PUT",
				data : data,
				contentType: "application/json;charset=utf-8",
				success : function(data) {
					retFunc(data);
				}
			});
		};
		
		/*
		this.updateOptions = function(parentId,id,updateObject,retFunc) {			
					var url = "/testing/" + parentId + "/question/" + id;
					var json = JSON.stringify(updateObject);
					$.ajax({
						url : url,
						type : "POST",
						data : json,
						contentType: "application/json;charset=utf-8",
						success : function(data) {
							retFunc(data);
						}
					});
				};*/
		

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
