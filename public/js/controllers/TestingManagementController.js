define("TestingManagementController",["Testing","QuestionManagementController","testingService"],function(Testing,QuestionManagementController,testingService){	
	return function (uku) {
			this.testings = [];
			this.newTesting = undefined;
			this.editTesting = undefined;
			var self = this;
			this.getTestings = function() {
				testingService.getAll(function(data){
					self.testings = data;
					uku.refresh();
				});
			};
			
			this.getTestingById = function(id,retFunc){
				testingService.getOne(id,function(data){
					retFunc(data);
				});
			};
			
			this.beforeOpenCreateTestingPanel = function(){
				this.newTesting = new Testing();
				$("#createTestingModal").modal("show");
			};
			
			this.createTesting = function() {
				testingService.save(self.newTesting,function(data){
					$('#createTestingModal').modal('hide');
					self.getTestings();
				});
			};
			var questionMgrCtrl;
			this.showDetailView = function(testing) {
				var editTesting = _.clone(testing);
				if(!questionMgrCtrl){
					questionMgrCtrl = new QuestionManagementController(uku);
					questionMgrCtrl.editTesting = editTesting;
					uku.registerController("mgr2",questionMgrCtrl);
					uku.loadIncludeElement($("#questionView"));
				}else{
					questionMgrCtrl.editTesting = editTesting;
				}
				uku.refresh();			
				$('#myTab a:last').tab('show');
			};
			
			this.updateTesting = function() {
				testingService.update(this.editTesting,function(data){
					$('#editModal').modal('hide');
					self.getTestings();
				});
			};
			
			this.removeTesting = function(id) {
				testingService.remove(id,function(){
					self.getTestings();
				});
			};
			
			this.beforeOpenEditTestingPanel = function(testing) {
				this.editTesting = _.clone(testing);
				$('#editModal').modal('toggle');
				uku.refresh();
			};
			
			this.statusEnum = [{
				"name" : "pending",
				"value" : "pending"
			}, {
				"name" : "running",
				"value" : "running"
			}, {
				"name" : "suspended",
				"value" : "suspended"
			}, {
				"name" : "over",
				"value" : "over"
			}];
		};
});