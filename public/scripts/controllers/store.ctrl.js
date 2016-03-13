nightOwlApp.controller('StoreCtrl',function ($scope,$http) {
	var url = window.location.href;
	var storeid = url.split('?')[1];
	console.log(storeid);

	$scope.getTimes = function(num){
		return new Array(num);
	}
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
					$scope.getStoreDetail()				
				},function (err) {
					alert("Error");
				})
	}
	$scope.getStoreDetail = function(){
			$http.get('http://localhost:3000/api/stores/'+storeid)
				.then(function (result) {
					console.log(result.data);
					$scope.store = result.data.storedata;
					$scope.reviews = result.data.storedata.reviews;
					$scope.checkins = result.data.storedata.checkins;
					$scope.lastcheckin = new Date($scope.checkins[0].checkintime);
					console.log($scope.lastcheckin);
					createMarker({"lat":$scope.store.loc[0],"long":$scope.store.loc[1]});
					$scope.map.setCenter({"lat":$scope.store.loc[0],"long":$scope.store.loc[1]});
				},function (err) {
					alert("Error");
				})
	}
	$scope.getStoreDetail()
	// $scope.store = {"_id":"56e3f969d74749a859951360","storeName":"Jaggu Wines","loc":[12.9715987,77.59456269999998],"category":"Wines","desc":"High on Booze","__v":0};
	$scope.setStoreReview = function(){
			$scope.storeReview.userid = "xxx";
			$scope.storeReview.storeid = $scope.store._id ;
			$http.post('http://localhost:3000/api/reviews',$scope.storeReview)
				.then(function (result) {
					console.log(result.data);
					$scope.storeReview="";
					$scope.getStoreDetail();
				},function (err) {
					alert("Error");
				})
	};

	var cities = [
              {
                  city : 'India',
                  desc : 'This is the best country in the world!',
                  lat : 23.200000,
                  long : 79.225487
              },
              {
                  city : 'New Delhi',
                  desc : 'The Heart of India!',
                  lat : 28.500000,
                  long : 77.250000
              },
              {
                  city : 'Mumbai',
                  desc : 'Bollywood city!',
                  lat : 19.000000,
                  long : 72.90000
              },
              {
                  city : 'Kolkata',
                  desc : 'Howrah Bridge!',
                  lat : 22.500000,
                  long : 88.400000
              },
              {
                  city : 'Chennai  ',
                  desc : 'Kathipara Bridge!',
                  lat : 13.000000,
                  long : 80.250000
              }
          ];

              var mapOptions = {
                  zoom: 11,
                  center: new google.maps.LatLng(12.9667, 77.5667),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              }

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


});
