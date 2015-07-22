require.config({
    paths: {
        "jquery": 'bower_components/jquery/dist/jquery.min',
        "jquery.bootstrap": 'bower_components/bootstrap/dist/js/bootstrap.min',
        "lodash": 'bower_components/lodash/lodash.min',
        "ukulele": 'bower_components/ukulelejs/build/js/ukulele',
    },
    shim:{ 	
		"ukulele":{
					deps:["jquery"],
					exports:"Ukulele"
				},	
    	"jquery.bootstrap":{
    		deps:["jquery"]
    	}
    }
});

require(["jquery","ukulele","ManagementController","lodash","jquery.bootstrap"], function($,Ukulele,ManagementController) {
	var uku;
	$(document).ready(function() {
		uku = new Ukulele();
		var mgr = new ManagementController(uku);
		uku.registerController("mgr", mgr);
		mgr.getTestings();
		uku.init();
	});
});

define("Testing",function(){
	return function() {
		this.name = undefined;
		this.description = undefined;
		this.status = "pending";
		this.questions = [];
		this.results = [];
	};
});


define("Question",function(){
	return function() {
		this.name = undefined;
		this.description = undefined;
		this.isMultiple = false;
		this.options = [];
	};
});

define("ManagementController",["Testing","Question"],function(Testing,Question){	
	return function (uku) {
			this.testings = [];
			var self = this;
			this.getTestings = function() {
				$.get("/testing", function(data) {
					self.testings = data;
					uku.refresh();
				});
			};
			
			this.getTestingById = function(id,retFunc){
				$.get("/testing/"+id, function(data) {
					retFunc(data);
				});
			};
			
			this.beforeOpenCreateTestingPanel = function(){
				this.newTesting = new Testing();
				$("#createTestingModal").modal("show");
			};
			this.createTesting = function() {
				$.post("/testing", self.newTesting, function(data) {
					$('#createTestingModal').modal('hide');
					self.getTestings();
					uku.refresh();
				});
			};

			this.showDetailView = function(testing) {
				this.editTesting = _.clone(testing);
				if(this.editTesting.questions.length === 1){
					if(this.editTesting.questions[0] === ""){
						this.editTesting.questions.pop();
					}
				}
				if(this.editTesting.results.length === 1){
					if(this.editTesting.results[0] === ""){
						this.editTesting.results.pop();
					}
				}
				uku.refresh();
				$('#myTab a:last').tab('show');
			};
			
			this.back2ListView = function(){
				$('#myTab a:first').tab('show');
			};

			this.updateTesting = function() {
				$.ajax({
					url : "/testing/",
					type : "PUT",
					data : this.editTesting,
					success : function() {
						$('#editModal').modal('hide');
						self.getTestings();
					}
				});

			};
			this.newTesting = undefined;
			this.editTesting = undefined;
			this.removeTesting = function(id) {
				$.ajax({
					url : "/testing/" + id,
					type : "DELETE",
					success : function() {
						self.getTestings();
					}
				});
			};
			this.beforeOpenEditTestingPanel = function(testing) {
				this.editTesting = _.clone(testing);
				$('#editModal').modal('toggle');
				uku.refresh();
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
				$.post("/testing/"+testingId+"/question", this.newQuestion, function(data) {
					self.getTestingById(testingId,function(data){
						self.editTesting = data;
						uku.refresh();
						$('#createQuestionModal').modal('hide');
					});
				});
			};
            
            this.updateQuestion = function() {
                var testingId = this.editTesting._id;
				var url = "/testing/"+testingId+"/question/"+this.editQuestion._id;
				$.ajax({
					url : url,
					type : "PUT",
                    data : self.editQuestion,
					success : function() {
						self.getTestingById(testingId,function(data){
							self.editTesting = data;
							uku.refresh();
                            $('#editQuestionModal').modal('hide');
						});
					}
				});
            };
			
			this.removeQuestion = function(question) {
				var testingId = this.editTesting._id;
				var url = "/testing/"+testingId+"/question/"+question._id;
				$.ajax({
					url : url,
					type : "DELETE",
					success : function() {
						self.getTestingById(testingId,function(data){
							self.editTesting = data;
							uku.refresh();
						});
					}
				});
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
