var http = require('http');
var express=require('express');
var path=require('path');
var xhr=require('xhr');
var request=require('request');

var app=express();

app.get('/', function(req, res){
	res.send('hello world');
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/index.html', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.get('/ajax.js', function(req, res) {
    res.sendFile(path.join(__dirname,'ajax.js'));
});

app.get('/angular.min.js', function(req, res) {
    res.sendFile(path.join(__dirname,'angular.min.js'));
});

app.get('/stock/:name',function(req,res) {
	console.log(req.params.name);
	var q='http://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=GMKL9INXICS0JYIW&'+req.params.name;
	console.log(q);
    request(q,function (error, response, body) {
        console.log(body);
        res.send(body);
    });
});

app.get('/stocks/history/:name',function(req,res) {
	console.log(req.params.name);
	var q='http://www.alphavantage.co/query?'+req.params.name+'&apikey=GMKL9INXICS0JYIW';
	console.log(q);
    request(q,function (error, response, body) {
        console.log(body);
        res.send(body);
    });
});

app.listen(8080);
