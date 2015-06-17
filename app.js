var port = (process.env.VCAP_APP_PORT || 3000); 
var https  = require('https');
var express = require('express');
var wechat = require('wechat');
var sha1 = require('sha1');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.query());

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
    console.log("access me");
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
            //var getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid;
            res.redirect("pages/test.html?openid="+openid);
            /*https.get(getUserInfoUrl,function(res3){
                var json2 = "";
                    res3.on('data', function(d) {
                        json2 += d;
                    });
                    res3.on('end',function(){
                        var userInfo = JSON.parse(json2);
                        console.log(userInfo.openid);
                        console.log(userInfo.nickname);
                        console.log(userInfo.sex);
                        console.log(userInfo.city);
                        console.log(userInfo.province);
                        console.log(userInfo.country);
                        userlist[userInfo.openid] = userInfo;
                        res.redirect("pages/index.html?userid="+userInfo.openid);
                    });
            }); */        
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
    var getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid;
    var getUserInfoUrl2 = "https://api.weixin.qq.com/cgi-bin/user/info?access_token="+access_token+"&openid="+openid+"&lang=zh_CN";
    https.get(getUserInfoUrl,function(res2){
        var json = "";
            res2.on('data', function(d) {
                json += d;
            });
            res2.on('end',function(){
                console.log(json);
                var userInfo = JSON.parse(json);
                /*if(userInfo.headimgurl){
                    var url = userInfo.headimgurl;
                    url = url.substring(0,url.length-1);
                    userInfo.headimgurl = url + "46";
                }*/
                res.send(userInfo);
            });
    });
    
});

var server = app.listen(port,function () {
    console.log('Listening on port %d', server.address().port);
});