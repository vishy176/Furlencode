nightOwlApp.controller('viewStoresCtrl',function ($scope,$http) {
	$(document).ready(function() {
    $('#list').click(function(event){
    	$scope.mapview = false;
	    event.preventDefault();
	    $('#products .item').addClass('list-group-item');
	});
    $('#grid').click(function(event){
    	event.preventDefault();
    	$('#products .item').removeClass('list-group-item');
    	$('#products .item').addClass('grid-group-item');
    });
	});
	$scope.getTimes = function(num){
		return new Array(num);
	}
	$scope.getImgsrc = function(categ){
		switch (categ) {
		    case "Food and Brevarages":
		        return "images/Food and Brevarages.jpg";
		        break;
		    case "Automobiles and Transport":
		        return "images/Automobiles and transport.jpg";
		        break;
		    case "Health":
		        return "images/Health.jpg";
		        break;
		    case "Accomodation and Lodging":
		    	return "images/Accomodation and Lodging.jpg";
		        break;
		    case "Home Needs and repairs":
		    	return "images/Home Needs and repairs.jpg";
		        break;
		    case "Others":
		        return "images/others.jpg";
		        break;
		}
	};
	var url = window.location.href;
	try{
	var lat = url.split('?')[1].split('/')[0];
	var lng = url.split('?')[1].split('/')[1];
	}
	catch(e){

	}
	$scope.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
	$scope.setStoreReview = function(storeid){
		alert("hii")
			$scope.storeReview.userid = "xxx";
			$scope.storeReview.storeid = storeid ;
			$http.post('http://localhost:3000/api/reviews',$scope.storeReview)
				.then(function (result) {
					console.log(result.data);
					$scope.storeReview="";
					$scope.getStoreDetail();
				},function (err) {
					alert("Error");
				})
	};
	$scope.userloc = [lat,lng];
	$scope.getStores = function(){
			$http.get('http://localhost:3000/api/stores')
				.then(function (result) {
					$scope.stores = result.data;
					console.log($scope.stores)
					$scope.stores = _.sortByOrder($scope.stores, ['checkintime'], ['asc'])
					for (i = 0; i < $scope.stores.length; i++){
		                  createMarker({"lat":$scope.stores[i].loc[0],"long":$scope.stores[i].loc[1]});
		            }

				},function (err) {
					alert("Error");
				})
	}
	$scope.getStoreswloc = function(){
			$http.post('http://localhost:3000/api/stores/location',$scope.userloc)
				.then(function (result) {
					$scope.stores = result.data;
					console.log($scope.stores)

					for (i = 0; i < $scope.stores.length; i++){
											$scope.stores[i].dist = $scope.getDistanceFromLatLonInKm($scope.stores[i].loc[0],$scope.stores[i].loc[1],lat,lng);
											console.log($scope.stores[i].dist);
		                  createMarker({"lat":$scope.stores[i].loc[0],"long":$scope.stores[i].loc[1]});
		            }
								$scope.stores = _.sortByOrder($scope.stores, ['dist'], ['asc'])
				},function (err) {
					alert("Error");
				})
	}
	console.log(lat);
	if(lat == undefined){
		$scope.getStores();
	}else{
		$scope.getStoreswloc();
	}
	// $scope.stores = [{"_id":"56e3f969d74749a859951360","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e3fa14d74749a859951361","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e3fa24d74749a859951362","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e3fbecd74749a859951363","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0},{"_id":"56e400c3d74749a859951364","storeName":"Vishnu Toys","category":"Whines","loc":[12.9385333,77.63081740000007],"__v":0}];
	$scope.checkInStore = function(storeid,state){
		// alert(storeid);
			$scope.checkInInfo = {};
			$scope.checkInInfo.checkintime = new Date()
			$scope.checkInInfo.userid = "xxx";
			$scope.checkInInfo.storeid = storeid;
			$scope.checkInInfo.storestatus = state;
			$http.post('http://localhost:3000/api/checkins',$scope.checkInInfo)
				.then(function (result) {
					console.log(result.data);
					if(lat == undefined){
						$scope.getStores();
					}else{
						$scope.getStoreswloc();
					}
				},function (err) {
					alert("Error");
				})
	}

	$scope.addnewStores = function(){
		window.location.href = "addstore.html"
	}
							var mapOptions = {
									zoom: 11,
									center: new google.maps.LatLng(12.974068, 77.591070),
									mapTypeId: google.maps.MapTypeId.TERRAIN
							}
              // var mapOptions = {
              //     zoom: 11,
              //     center: new google.maps.LatLng(12.9667, 77.5667),
              //     mapTypeId: google.maps.MapTypeId.TERRAIN
              // }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];

              var infoWindow = new google.maps.InfoWindow();

              var createMarker = function (info){

                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.city
                  });
                  // marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                  // google.maps.event.addListener(marker, 'click', function(){
                  //     infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                  //     infoWindow.open($scope.map, marker);
                  // });

                  $scope.markers.push(marker);

              }

              // for (i = 0; i < cities.length; i++){
              //     createMarker(cities[i]);
              // }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
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
