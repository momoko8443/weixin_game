define("testingService", function() {
	function TestingService() {
		this.getAll = function(retFunc) {
			$.get("/testing", function(data) {
				retFunc(data);
			});
		};

		this.getOne = function(id, retFunc) {
			$.get("/testing/" + id, function(data) {
				retFunc(data);
			});
		};

		this.save = function(newObject,reFunc) {
			$.post("/testing", newObject, function(data) {
				reFunc(data);
			});
		};

		this.update = function(updateObject,reFunc) {
			$.ajax({
				url : "/testing/",
				type : "PUT",
				data : updateObject,
				success : function(data) {
					reFunc(data);
				}
			});
		};

		this.remove = function(id, reFunc) {
			$.ajax({
				url : "/testing/" + id,
				type : "DELETE",
				success : function() {
					reFunc();
				}
			});
		};
	}
	return new TestingService();
});
