nightOwlApp.controller('homeCtrl',function ($scope,$http) {
	$scope.viewStores  =function(){
		window.location.href = "viewstores.html?"+$scope.storeInfo.locationdetails.geometry.location.lat()+"/"+$scope.storeInfo.locationdetails.geometry.location.lng()
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
