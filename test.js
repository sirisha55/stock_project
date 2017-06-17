var express=require('express');
var path = require('path');
var https = require('https');
var request = require('request');

var app=express();

app.use('/app', express.static(path.join(__dirname, 'app')));

app.get('/stocks/:name', function (req, res) {
	console.log(req.params.name);
    request('http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=HON&apikey=GMKL9INXICS0JYIW&interval=1min', function (error, response, body) {
        console.log(body);
        res.json(body);
    });
});
app.listen(4444);