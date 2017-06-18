var stock_exchanges={"ASX":"Australian Securities Exchange","BOM":"Bombay Stock Exchange","BIT":"Borsa Italiana Milan Stock Exchange","TSE":"Canadian/Toronto Securities Exchange","FRAorETR":"Deutsche Börse Frankfurt Stock Exchange","AMS":"Euronext Amsterdam","EBR":"Euronext Brussels","ELI":"Euronext Lisbon","EPA":"Euronext Paris","LON":"London Stock Exchange","MCX":"Moscow Exchange","NASDAQ":"NASDAQ Exchange","CPH":"NASDAQ OMX Copenhagen","HEL":"NASDAQ OMX Helsinki","ICE":"NASDAQ OMX Iceland","STO":"NASDAQ OMX Stockholm","NSE":"National Stock Exchange of India","NYSE":"New York Stock Exchange","SGX":"Singapore Exchange","SHA":"Shanghai Stock Exchange","SHE":"Shenzhen Stock Exchange","TPE":"Taiwan Stock Exchange","TYO":"Tokyo Stock Exchange"};

function getdata(url,cb) {
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
		if(this.readyState==4 && this.status==200) {
			cb(this.response);
		}
	};
	xhttp.open("GET",url,true);
	xhttp.send();
}

function getstock(comp,exch) {
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function() {
		if(this.readyState==4 && this.status==200) {
			console.log(JSON.parse(this.response));
			document.body.innerHTML+=this.response;
		}
	};
	//xhttp.open("GET",'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in ('+b+')&env=store://datatables.org/alltableswithkeys&format=json',true);
	var q='';
	if(exch!=undefined)
		q='symbol='+exch+':'+comp;
	else
		q='symbol='+comp;
	xhttp.open("GET",'/stock/'+q,true);
	xhttp.send();
}

function gethistory(type,company_name) {
	var q=[];
	q.push('function='+type);
	q.push('symbol='+company_name);
	if(type.match(/TIME_SERIES_INTRADAY|TIME_SERIES_DAILY|TIME_SERIES_DAILY_ADJUSTED/g)) {
		q.push('interval=1min');
		q.push('outputsize=compact');
		//q.push('outputsize=full');
	}
	getdata('/stocks/history/'+q.join('&'),function(resp) {
		drawchart(resp);
	});
}

function drawchart(data) {
	data=JSON.parse(data);
	var x=[];
	var y=[];
	var open=[];
	var high=[];
	var low=[];
	var close=[];
	var volume=[];
	var metadata,tsdata;
	for(var key in data)
		if(key.match(/Meta Data/g)) metadata=data[key];
		else tsdata=data[key];
	console.log(data,metadata,tsdata);
	for(var key in tsdata) {
		x.push(key);
		open.push(tsdata[key]["1. open"]);
		high.push(tsdata[key]["2. high"]);
		low.push(tsdata[key]["3. low"]);
		close.push(tsdata[key]["4. close"]);
		volume.push(tsdata[key]["5. volume"]);
	}
	console.log(x,y);
	Plotly.newPlot('chart',[
		{
			type:'countour',
			x:x,
			y:open,
			name:'open',
		},
		{
			x:x,
			y:high,
			name:'high',
		},
		{
			x:x,
			y:low,
			name:'low'
		},
		{
			x:x,
			y:close,
			name:'close'
		},
		{
			x:x,
			y:volume,
			name:'volume'
		},
	]);
}
