angular.module('myapp').controller('mainctrl', ['testservice', '$scope', function (testservice, $scope) {

	$scope.companylist = [];
	$scope.stocklist = [];
	$scope.name = '';
	$scope.symbol = '';
	testservice.database().then(function (list) {      
		$scope.companylist = list;
		console.log($scope.companylist);
	});

	$scope.view = false;
	/*
	testservice.list().then(function (list) {
		console.log(list);
		$scope.stocklist = list;
		console.log($scope.stocklist[0].Name);
	});
	*/

	$scope.upload = function (change) {
		console.log(change);
		if (change.match(/\+/g)) {
			return 'http://images.financialcontent.com/studio-6.0/arrows/arrow5up.png';
		}
		else {
			return 'http://images.financialcontent.com/studio-6.0/arrows/arrow5down.png';
		}
	};
	$scope.toggleSuggest = function () {
		console.log($scope.name);
		if ($scope.name == '') $('p').hide();
		else $('p').show();
	};
	$scope.addcompany = function (name) {
		console.log($scope.name);
		var _symbol = $scope.name.split("|")[1].replace(/ /g, "");
		console.log(_symbol);
		testservice.addentry(_symbol);
		testservice.list().then(function (list) {
			console.log(list);
			$scope.stocklist = list;
			localStorage.setItem('stockList', JSON.stringify($scope.stocklist));
			// $scope.cuisineList = JSON.parse(localStorage.getItem('cuisineList'));
			console.log($scope.stocklist.length);
		});
	};
	$scope.init = function () {
	    $scope.stocklist = JSON.parse(localStorage.getItem('stockList'));
	    $scope.stocklist.forEach(function (x) {
	        testservice.name.push('"'+x["symbol"]+'"');
	    });
	    console.log('Initialised');
	    console.log($scope.stocklist);
	};
	//  $scope.cuisineList = JSON.parse(localStorage.getItem('cuisineList'));
	$scope.remove = function (id) {
	    console.log($scope.stocklist);
	    $scope.stocklist.splice(id, 1);
	    console.log($scope.stocklist);
		localStorage.setItem('stockList', JSON.stringify($scope.stocklist));
	};
	
	$scope.showgraph = function (sym,type) {
	    console.log('entered showgraph', sym);
	    $scope.symbol = sym;
	    var q = [];
	    //type = 'TIME_SERIES_INTRADAY';
		q.push('function='+type);
		q.push('symbol='+sym);
		if(type.match(/TIME_SERIES_INTRADAY|TIME_SERIES_DAILY|TIME_SERIES_DAILY_ADJUSTED/g)) {
			q.push('interval=1min');
			q.push('outputsize=compact');
			//q.push('outputsize=full');
		}
		var func=function() {
			testservice.getdata('/stocks/history/'+q.join('&')).then(function(resp) {
				$scope.drawchart(resp);
			});
		};
		func();
		$scope.view = true;
	};
	$scope.drawchart=function(data) {
	    //data=JSON.parse(data);
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
	    console.log(x, y);
	   /* var div = document.getElementById("chart");
	    div.on('plotly_afterplot', function () {
	        $scope.view = true;
	    });*/
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
                name:'volume',
                visible:'legendonly'
            },
	    ],{
	        width:600,
	        height:400,
	        xaxis:{
	            title:'Time'
	        },
	        yaxis:{
	            title:'Stocks value'
	        },
	        shapes: {
	            layer:'above'
	        }
	    });
	};
}]);