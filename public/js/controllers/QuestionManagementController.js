define("QuestionManagementController",["Question","Option","questionService"],function(Question,Option,questionService){
	return function(uku){
		var self = this;
		this.editTesting = undefined;
		this.addOptions = [];
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
		
		this.labelFunction = function(question) {
			if(question.isMultiple){
				return "Yes";
			}else{
				return "No";
			}
		};
		
		this.addOptionItem = function(){
			this.addOptions.push(new Option());
			uku.refresh();
		};
		
		this.showOptions = function(question) {
			this.editQuestion = _.clone(question);
			uku.refresh();
		};
		
		this.optionsPanelTitle = function() {
			if(this.editQuestion){
				return this.editQuestion.name + "'s Options";
			}
			return "Options";
			
		};
		
		this.isAllowEditOption = function() {
			if(!this.editQuestion){
				return true;
			}else{
				return false;
			}
		};
		
		this.editOptions = function() {
			$("#editModeBtn").hide();
			$("#updateOptionsBtn").show();
			$("#addOptionBtn").show();
		};
		
		this.removeEditingOption = function(option) {
			for(var i=this.addOptions.length-1;i>=0;i--){
				var item = this.addOptions[i];
				if(item === option){
					this.addOptions.splice(i,1);
					break;
				}
			}
			uku.refresh();
		};
	};
});