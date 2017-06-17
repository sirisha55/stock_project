var http = require('http');
var express=require('express');
var path=require('path');
var xhr=require('xhr');

var app=express();

console.log('running');

app.use(function(req,res,next) {
	next();
});

app.get('/', function(req, res){
	res.send('hello world');
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/index.html', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	/*
	xhr({
		uri:'http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=HON&apikey=GMKL9INXICS0JYIW&interval=1min',
		headers: {
			"Access-Control-Allow-Origin":"*"
		}
	},function(err,resp,body) {
		res.send(resp);
	});
	*/
	res.sendFile(path.join(__dirname, '', 'index.html'));
	//res.sendfile('http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=HON&apikey=GMKL9INXICS0JYIW&interval=1min');
});
app.get('/ajax.js', function(req, res) {
    res.sendFile(path.join(__dirname,'ajax.js'));
});
app.get('/angular.min.js', function(req, res) {
    res.sendFile(path.join(__dirname,'angular.min.js'));
});

// app.get(function(req,res,next) {
	// res.end('Hello world');
// });

app.listen(8080);

http.createServer(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(8000);

//http.get(