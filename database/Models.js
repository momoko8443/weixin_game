var mongoose = require('mongoose');
var ActivitySchema = mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: String,
    limit: Number,
    users: [{
        openid: String,
        nickname: String,
        headimgurl: String,
        vouchers: [{
            code: String,
            description: String,
            discount: String,
            status: String
                                        }]
    }]
});
var Activity = mongoose.model('Activity', ActivitySchema);
exports.Activity = Activity;