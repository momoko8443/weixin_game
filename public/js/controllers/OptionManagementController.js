define("OptionManagementController", ["Option", "questionService"], function(Option, questionService) {
	return function(uku){
		this.editQuestion = undefined;
		this.addOptions = [];
		this.addOptionItem = function() {
			this.addOptions.push(new Option());
			uku.refresh();
		};
	
		this.optionsPanelTitle = function() {
			if (this.editQuestion) {
				return this.editQuestion.name + "'s Options";
			}
			return "Options";
	
		};
	
		this.isAllowEditOption = function() {
			if (!this.editQuestion) {
				return true;
			} else {
				return false;
			}
		};
	
		this.switch2EditMode = function() {
			$('#myTab2 a:last').tab('show');
		};
	
		this.removeEditingOption = function(option) {
			for (var i = this.addOptions.length - 1; i >= 0; i--) {
				var item = this.addOptions[i];
				if (item === option) {
					this.addOptions.splice(i, 1);
					break;
				}
			}
			uku.refresh();
		};
	
		this.saveOptions = function() {
			var tempArr = [];
			for (var i = 0; i < this.addOptions.length; i++) {
				var item = this.addOptions[i];
				if (item.name && item.name !== "") {
					tempArr.push(item);
				}
			}
			this.editQuestion.options = tempArr;
			var testingId = this.editTesting._id;
			questionService.update(testingId, this.editQuestion._id, this.editQuestion, function(data) {
				self.editTesting = data;
				for (var j = 0; j < self.editTesting.questions.length; j++) {
					var q_item = self.editTesting.questions[j];
					if (q_item._id === self.editQuestion._id) {
						self.editQuestion = q_item;
						break;
					}
				}
				uku.refresh();
				$('#myTab2 a:first').tab('show');
			});
		};
	};
	
}); 