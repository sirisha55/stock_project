function getstock() {
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
		if(this.readyState==4 && this.status==200) {
			document.body.innerHTML+=this.response;
			console.log(JSON.parse(this.response).query.results);
		}
	};
	var a=['"TCS"','"HON"'];
	var b=a.toString();
	xhttp.open("GET",'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in ('+b+')&env=store://datatables.org/alltableswithkeys&format=json',true);
	//xhttp.open("GET",'http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=HON&apikey=GMKL9INXICS0JYIW&interval=1min',true);
	xhttp.send();
}