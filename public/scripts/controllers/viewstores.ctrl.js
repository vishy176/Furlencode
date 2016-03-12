nightOwlApp.controller('viewStoresCtrl',function ($scope,$http) {
	$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');
		$('#products .item').addClass('list-group-item');});
	});
	var url = window.location.href;
	var lat = url.split('?')[1].split('/')[0];
	var lng = url.split('?')[1].split('/')[1];
	console.log(lat+lng);
	$scope.userloc = [lat,lng];
	$scope.getStores = function(){
			$http.post('http://localhost:3000/api/stores/location',$scope.userloc)
				.then(function (result) {
					$scope.stores = result.data;
				},function (err) {
					alert("Error");
				})
	}
	$scope.getStores();
	// $scope.stores = [{"_id":"56e3f969d74749a859951360","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e3fa14d74749a859951361","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e3fa24d74749a859951362","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e3fbecd74749a859951363","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e400c3d74749a859951364","storeName":"Vishnu Toys","category":"Whines","loc":[12.9385333,77.63081740000007],"__v":0}];
	$scope.checkInStore = function(storeid){
		// alert(storeid);
			$scope.checkInInfo = {};
			$scope.checkInInfo.checkintime = new Date()
			$scope.checkInInfo.userid = "xxx";
			$scope.checkInInfo.storeid = storeid;
			$http.post('http://localhost:3000/api/checkins',$scope.checkInInfo)
				.then(function (result) {
					console.log(result.data);
				},function (err) {
					alert("Error");
				})
	}

	$scope.addnewStores = function(){
		window.location.href = "addstore.html"
	}
	$scope.categorydata = [{"Category":"Food and Brevarages","SubCategory":"Family Restaurants"},
						{"Category":"Food and Brevarages","SubCategory":"Bar and Restuarents"},
						{"Category":"Food and Brevarages","SubCategory":"Street Foods"},
						{"Category":"Food and Brevarages","SubCategory":"Chaiwala"},
						{"Category":"Health","SubCategory":"Medical Stores"},
						{"Category":"Health","SubCategory":"Emergency Services"},
						{"Category":"Health","SubCategory":"First Aid Centres"},
						{"Category":"Health","SubCategory":"Children Hospitals"},
						{"Category":"Health","SubCategory":"Fitness Centres"},
						{"Category":"Automobiles and Transport","SubCategory":"Two wheeler Service"},
						{"Category":"Automobiles and Transport","SubCategory":"Four Wheeler Service"},
						{"Category":"Automobiles and Transport","SubCategory":"Fuel Stations"},
						{"Category":"Automobiles and Transport","SubCategory":"Rentals"},
						{"Category":"Automobiles and Transport","SubCategory":"Carriers"},
						{"Category":"Accomodation and Lodging","SubCategory":"Lodges"},
						{"Category":"Accomodation and Lodging","SubCategory":"Hostels"},
						{"Category":"Accomodation and Lodging","SubCategory":"House Accomodations"},
						{"Category":"Accomodation and Lodging","SubCategory":"PG services"},
						{"Category":"Home Needs and repairs","SubCategory":"Electrical Services"},
						{"Category":"Home Needs and repairs","SubCategory":"Plumbing services"},
						{"Category":"Home Needs and repairs","SubCategory":"Groceries and others"},
						{"Category":"Others","SubCategory":"Fashon"},
						{"Category":"Others","SubCategory":"Cigarettes and other Tobacco items"},
						{"Category":"Others","SubCategory":"Beauty Care"}];
});
