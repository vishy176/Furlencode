nightOwlApp.controller('StoreCtrl',function ($scope,$http) {
	var url = window.location.href;
	var storeid = url.split('?')[1];
	console.log(storeid);

	$scope.getNumber = function(num) {
    return new Array(num);
	}

	$scope.getStoreDetail = function(){
			$http.get('http://localhost:3000/api/stores/'+storeid)
				.then(function (result) {
					console.log(result.data);
					$scope.store = result.data.storedata;
					$scope.reviews = result.data.reviews;
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
					$scope.getStoreDetail()
				},function (err) {
					alert("Error");
				})
	}

	var cities = [
    {
        lat:12.9828393,
        long:77.74545379999995
    },
    {
        lat:13.9828393,
        long:77.74545379999995
    },
    {
        lat:12.9828000,
        long:77.7454537990
    },
    {
        lat:12.98283,
        long:77.74549995
    },
    {
        lat:12.93,
        long:77.7454535
    }
];

    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(12.9715987,77.59456269999998),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lng),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.role + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + info.userId + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for(i=0;i<cities.length;i++){
    	createMarker(cities[i]);
	}


    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }


});
