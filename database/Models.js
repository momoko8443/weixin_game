var mongoose = require('mongoose');
var OptionSchema = mongoose.Schema({
	name:String,
    score:Number
});

var QuestionSchema = mongoose.Schema({
	name:String,
	isMultiple:Boolean,  
	options:[OptionSchema]
});

var ResultSchema = mongoose.Schema({
	name:String,
	description: String,
	minScore:Number,
	maxScore:Number
});
var TestingSchema = mongoose.Schema({
    name: String,
    description: String,
    status: String,
    questions: [QuestionSchema],
    results:[ResultSchema]
});


var Testing = mongoose.model('Testing', TestingSchema);
exports.Testing = Testing;