var port = (process.env.VCAP_APP_PORT || 3000);
var https = require('https');
var express = require('express');
var wechat = require('wechat');
var sha1 = require('sha1');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var Models = require('./database/Models');
var Testing = Models.Testing;
mongoose.connect('mongodb://127.0.0.1/weixin');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log('connection success');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.query());
app.use(bodyParser.urlencoded({
	extended : true
}));

//get testings's list
app.get('/testing', function(req, res) {
	Testing.find(function(err, result) {
		if (err) {
			console.error(err);
		} else {
			res.send(result);
		}
	});
});
//get testing by id
app.get('/testing/:id', function(req, res) {
	var id = req.params.id;
	Testing.findOne({
		"_id" : id
	}, function(err, result) {
		if (err) {
			console.error(err);
		} else {
			res.send(result);
		}
	});
});
//create a new testing
app.post('/testing', function(req, res) {
	var a_name = req.body.name;
	var a_description = req.body.description;
	var a_status = req.body.status;
	var a_questions = req.body.questions;
	var a_results = req.body.results;
	var testing = new Testing({
		name : a_name,
		description : a_description,
		status : a_status,
	});
	testing.save(function(err, testing) {
		if (err) {
			console.error(err);
		} else {
			res.send(testing);
		}
	});
});
//remove an existed testing
app.delete('/testing/:id', function(req, res) {
	var query = {
		_id : req.params.id
	};
	Testing.remove(query, function(err) {
		if (err) {
			console.error(err);
		} else {
			res.send("success");
		}
	});
});
//modify an existed testing
app.put('/testing', function(req, res) {
	var query = {
		"_id" : req.body._id
	};
	console.log(query);
	var updateTesting = {
		$set : {
			"name" : req.body.name,
			"description" : req.body.description,
			"status" : req.body.status
		}
	};
	console.log(updateTesting);
	Testing.findOneAndUpdate(query, updateTesting, function(err, testing) {
		if (err) {
			console.error(err);
		} else {
			res.send(testing);
		}
	});
});

//add a new question to an existed testing
app.post('/testing/:id/question', function(req, res) {
	var testing_id = req.params.id;
	var newQuestion = req.body;
	var query = {
		"_id" : testing_id
	};
	Testing.findOne(query, function(err, testing) {
		if (err) {
			console.error(err);
		} else {
			testing.questions.push(newQuestion);
			testing.save(function(err2, testing2) {
				if (err2) {
					console.error(err2);
				} else {
					res.send(testing2);
				}
			});
		}
	});
});

//delete a question to an existed testing
app.delete('/testing/:id/question/:qid', function(req, res) {
	var testing_id = req.params.id;
	var question_id = req.params.qid;
	var query = {
		"_id" : testing_id
	};
	Testing.findOne(query, function(err, testing) {
		if (err) {
			console.error(err);
		} else {
			testing.questions.id(question_id).remove();
			testing.save(function(err2, testing2) {
				if (err2) {
					console.error(err2);
				} else {
					res.send(testing2);
				}
			});
		}
	});
});

//modify a existed question
app.put('/testing/:id/question/:qid', function(req, res) {
	var testing_id = req.params.id;
	var question_id = req.params.qid;
	var question = req.body;
	var query = {
		"_id" : testing_id,
		"questions._id" : question_id
	};
	var data = {
		$set : {
			"questions.$.name" : question.name,
			"questions.$.description" : question.description,
			"questions.$.isMultiple" : question.isMultiple,
			"questions.$.options" : question.options
		}
	};
	
	Testing.findOneAndUpdate(query, data,{new:true},function(err, testing) {
			if (err) {
				console.error(err);
			} else {
				res.send(testing);
			}
	});
	
});
//update question's options
/*
app.post('/testing/:id/question/:qid',function(req,res){
	var testing_id = req.params.id;
	var question_id = req.params.qid;
	var question = req.body;
	console.log(question);
	var query = {
		"_id" : testing_id
	};
	Testing.findOne(query, function(err, testing) {
		if (err) {
			console.error(err);
		} else {
			var question_doc = testing.questions.id(question_id);
			if(!question_doc.options){
				question_doc.options = [];
			}
			for(var i=0;i<question.options.length;i++){
				console.log(question.options[i] + i);
				question_doc.options.push(question.options[i]);
			}
			//question_doc.options.addToSet(question.options);
			testing.save(function(err2, testing2) {
				if (err2) {
					console.error(err2);
				} else {
					res.send(testing2);
				}
			});
		}
	});
});*/


var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
});

/*
 var appID = "wx86280d314fb1fd70";
 var secret = "bb185ab1918499b43069517667abbac7";
 var redirect_url = "http://momoko8443.tunnel.mobi/";
 var getCodeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appID+"&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";

 var access_token;

 app.use('/connect',wechat('ukulele',function(req,res,next){
 var message = req.weixin;
 var fromUser = message.FromUserName;
 var content = message.Content;
 res.reply([
 {
 title: 'Click me',
 description: getCodeUrl,
 url: getCodeUrl
 }]);
 }));
 var userlist = {};
 app.get('/', function (req, res) {
 var code = req.query.code;
 var getAccessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appID+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";

 https.get(getAccessTokenUrl, function(res2) {
 var json = "";
 res2.on('data', function(d) {
 json += d;
 });
 res2.on('end',function(){
 var obj = JSON.parse(json);
 access_token = obj.access_token;
 var openid = obj.openid;
 res.redirect("pages/test.html?openid="+openid);
 });
 }).on('error', function(e) {
 console.error(e);
 });
 });

 app.get('/connect', function (req, res) {
 var signature = req.query.signature;
 var timestamp = req.query.timestamp;
 var nonce = req.query.nonce;
 var echostr = req.query.echostr;
 var token = "ukulele";

 var arr = [timestamp,nonce,token];
 var tempString = arr.sort().join("");
 tempString = sha1(tempString);
 if(signature === tempString){
 console.log('auth access');
 res.write(echostr);
 }else{
 console.log('auth failed');
 res.write(false);
 }
 });

 app.get('/user/:openid',function(req,res){
 var openid = req.params.openid;
 console.log("get user: "+openid);
 var getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid;
 https.get(getUserInfoUrl,function(res2){
 var json = "";
 res2.on('data', function(d) {
 json += d;
 });
 res2.on('end',function(){
 console.log(json);
 var userInfo = JSON.parse(json);
 res.send(userInfo);
 });
 }).on("error",function(e){
 console.error(e);
 });

 });*/
