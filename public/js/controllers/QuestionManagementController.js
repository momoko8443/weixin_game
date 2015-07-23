define("QuestionManagementController",["Question","questionService"],function(Question,questionService){
	return function(uku){
		var self = this;
		this.editTesting = undefined;
		this.back2ListView = function(){
			$('#myTab a:first').tab('show');
		};
		
		this.newQuestion = undefined;	
		this.editQuestion = undefined;
		this.beforOpenCreateQuestionPanel = function(){
			this.newQuestion =  new Question();
			$("#createQuestionModal").modal("show");
		};
		
		this.beforeOpenEditQuestionPanel = function(question) {
			this.editQuestion = _.clone(question);
			$('#editQuestionModal').modal('toggle');
			uku.refresh();
		};
		
		this.createQuestion = function(){
			var testingId = this.editTesting._id;
			questionService.save(testingId,this.newQuestion,function(data){
				self.editTesting = data;
				uku.refresh();
				$('#createQuestionModal').modal('hide');
			});		
		};
        
        this.updateQuestion = function() {
            var testingId = this.editTesting._id;		
			questionService.update(testingId,this.editQuestion._id,self.editQuestion,function(data){
				self.editTesting = data;
				uku.refresh();
                $('#editQuestionModal').modal('hide');
			});
        };
		
		this.removeQuestion = function(question) {
			var testingId = this.editTesting._id;
			questionService.remove(testingId,question._id,function(data){
				self.editTesting = data;
				uku.refresh();
			});	
		};
	};
});