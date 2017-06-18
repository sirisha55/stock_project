﻿angular.module('myapp').service('testservice',['$http','$q',function ($http,$q) {
	var name = [];
	this.name = [];
	this.list = function () {
		var stocklist = {};
		var stock_list = [];
		// var newname = localStorage.getItem("test");
		//console.log(newname);
		// this.name = JSON.parse(newname);
		var url = 'http://localhost:8000/stocks/' + this.name;
		console.log("enter loop");
		var defer = $q.defer();
		$http.get(url).then(function (response) {
			response = JSON.parse(response.data);
			console.log(response);
			stocklist = response.query.results.quote;
			console.log(stocklist.length);
			if (stocklist.length == undefined) {
				console.log("enter if loop")
				// console.log(typeof(stocklist));
				stock_list.push(stocklist);
				defer.resolve(stock_list);
			}
			else {
				console.log("enter else");
				defer.resolve(stocklist);
			}
		}), function (data, status) {
			if (status == 404) {
				console.log("wrong data");
			}
			defer.reject(data);
		};
		return defer.promise;
	};
	this.addentry = function (symbol) {
		this.name.push('"'+symbol+'"');
		console.log(this.name);
	//  localStorage.setItem("test", JSON.stringify(name));
	};
	this.database = function () {
		var companylist = [];
		var url = 'http://localhost:8000/companylist';
		console.log("enter loop");
		var defer = $q.defer();
		$http.get(url).then(function (response) {
			console.log(response);
			companylist = response.data.results;
			console.log(companylist);
			defer.resolve(companylist);
		}), function (data, status) {
			if (status == 404) {
				console.log("wrong data");
			}
			defer.reject(data);
		};
		return defer.promise;
	};
	this.getdata = function (q) {
	    var defer = $q.defer();
	    $http.get(q).then(function (response) {
	        console.log(response);
	        defer.resolve(response.data);
	    }), function (data, status) {
	        if (status == 404) {
	            console.log("wrong data");
	        }
	        defer.reject(data);
	    };
	    return defer.promise;
	};
}]);