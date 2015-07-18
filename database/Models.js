var mongoose = require('mongoose');
var TestingSchema = mongoose.Schema({
    name: String,
    description: String,
    status: String,
    questions: [{
    	name:String,
    	description: String,
    	isMultiple:Boolean,    	
    	options:[{
    		name:String,
    		score:Number
    	}]
    }],
    results:[{
    	name:String,
    	description: String,
    	minScore:Number,
    	maxScore:Number
    }]
});
var Testing = mongoose.model('Testing', TestingSchema);
exports.Testing = Testing;