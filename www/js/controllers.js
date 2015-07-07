angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, userSession, $state, $ionicHistory) {

    	$ionicHistory.clearHistory();
    	/*if(!userSession.isAuthenticated()){
    		
    		$state.go("login")
    	}else{
    		if(userSession.isVendor()){
    			$location.path("#/app/vendor");
    		}else{
    			$location.path("#/app/home");
    		}
    	}*/
    	
    	$scope.go = function ( path ) {
    		  $location.path( path );
    	};
    	
    	$scope.logout = function(){
    		Parse.User.logOut();
    		userSession.invalidate();
    		$state.go('login');
    	};
        $scope.profile = function(){
            $state.go('app.profile');
        }


    })
    
    .controller('LoginCtrl', function ($scope, $state, userSession, $ionicHistory) {
    	// Form data for the login modal
    	$ionicHistory.clearHistory();
        $scope.loginData = {};
        $scope.errors = {};
     // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
        	Parse.User.logIn($scope.loginData.username, $scope.loginData.password, {
        		  success: function(user) {
                      if(!user.get('vendor')){
                          //user
                          userSession.create(user);
                          $state.go('app.gpsView');
                      }
                      else{
                          //user is vendor
                          $state.go('app.profile');
                      }
        		  },
        		  error: function(user, error) {
        		    $scope.errors.msg="Invalid user or password";
        		    $scope.$digest();
        		  }
        	});
        };


    })
    
    .controller('RegisterUserCtrl', function ($scope, $state, userSession) {
    	// Form data for the login modal
        $scope.user = {};
        $scope.registerUser = function(){
        	var user = new Parse.User();
            user.set("username", $scope.user.username);
            user.set("password", $scope.user.password);
            user.set("fullName", $scope.user.fullName);
            user.set("emailVerified",true);
            user.set("contactNo", $scope.user.contactNo);
            user.set("address", $scope.user.address);

            user.signUp(null, {
              success: function(user) {
                userSession.create(user);
                $state.go('app.home');
              },
              error: function(user, error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });

        }
    })
    
    .controller('RegisterVendorCtrl', function ($scope, $state, userSession) {
    	// Form data for the login modal
        $scope.user = {};
        $scope.registerVendor = function(){
        	var user = new Parse.User();
            user.set("username", $scope.user.username);
            user.set("password", $scope.user.password);
            user.set("fullName", $scope.user.fullName);
            user.set("contactNo", $scope.user.contactNo);
            user.set("address", $scope.user.address);
            user.set("vendor", true);
            user.signUp(null, {
              success: function(user) {
            	  userSession.create(user);
                  $state.go('app.home');
              },
              error: function(user, error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });
        }
    })
    
    


    .controller('VendorsCtrl', function ($scope, Vendors, $location, $state) {
        $scope.vendors = [
                            {id: 0, title: "Vegsutra Hospitality Pvt Ltd", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
                            {id: 1, title: "Zayka Tiffin Service", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
                            {id: 2, title: "Sabka Tiffin", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
                            {id: 3, title: "Satva Foods", name: "Brett Rudd", twitter_id: "@brettrudd", description: "description",tel:'+(91)-22-38559670'},
                            {id: 4, title: "KGN Caterers", name: "Joe Bowser", twitter_id: "@infil00p", description: "description",tel:'+(91)-22-38559670'},
                            {id: 5, title: "Dipaanjali Tiffin Service", name: "Brian Leroux", twitter_id: "@brianleroux", description: "description",tel:'+(91)-22-38559670'},
                            {id: 6, title: "Ganapatti Thali", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
                            {id: 7, title: "DRS Kitchen", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
                            {id: 8, title: "Food Connect ", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
                            {id: 9, title: "Mauli Tiffin Service", name: "Jason Weathersby", twitter_id: "@jasonweathersby", description: "description",tel:'+(91)-22-38559670'},
                          ];
        $scope.callMe = function (vender, event) {
            event.preventDefault();
            window.location = 'tel:' + vender.tel;
        };
        $scope.locateMe = function (vender, event) {
            event.preventDefault();
            $state.transitionTo('app.gpsView', {id: vender.id});
        }
    })

    .controller('VendorCtrl', function ($scope, $stateParams, $location) {
    	var vendors = [
                          {id: 0, title: "Vegsutra Hospitality Pvt Ltd", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
                          {id: 1, title: "Zayka Tiffin Service", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
                          {id: 2, title: "Sabka Tiffin", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
                          {id: 3, title: "Satva Foods", name: "Brett Rudd", twitter_id: "@brettrudd", description: "description",tel:'+(91)-22-38559670'},
                          {id: 4, title: "KGN Caterers", name: "Joe Bowser", twitter_id: "@infil00p", description: "description",tel:'+(91)-22-38559670'},
                          {id: 5, title: "Dipaanjali Tiffin Service", name: "Brian Leroux", twitter_id: "@brianleroux", description: "description",tel:'+(91)-22-38559670'},
                          {id: 6, title: "Ganapatti Thali", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
                          {id: 7, title: "DRS Kitchen", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
                          {id: 8, title: "Food Connect ", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
                          {id: 9, title: "Mauli Tiffin Service", name: "Jason Weathersby", twitter_id: "@jasonweathersby", description: "description",tel:'+(91)-22-38559670'},
                        ];
    	for(var i=0;i<vendors.length;i++){
    		if(vendors[i].id==$stateParams.id){
    			$scope.vendor = vendors[i];
    		}
    	}
        
        $scope.orderedItems={};
        $scope.addToCartModal=true;
        $scope.orderedItems.Veg= [
            {name: 'Veg Corn Soup', price: 75},
            {name: 'Veg Hot & Sour Soup', price: 75},
            {name: 'Veg Cantonese Soup', price: 75},
            {name: 'Cream Of Tomato Soup', price: 75}
        ];
        $scope.orderedItems.NonVeg=[
            {name: 'Chicken Corn Soup', price: 90},
            {name: 'Chicken Clear Soup', price: 90},
            {name: 'Chicken Cantonese Soup', price: 90},
            {name: 'Chicken Hot & Sour Soup', price: 90}
        ]
        $scope.menuItem = function (itemId) {
            if (1236 == Number(itemId)) {
                $scope.orderedItems.Veg= [
                    {name: 'Veg Corn Soup', price: 75},
                    {name: 'Veg Hot & Sour Soup', price: 75},
                    {name: 'Veg Cantonese Soup', price: 75},
                    {name: 'Cream Of Tomato Soup', price: 75}
                ];
                $scope.orderedItems.NonVeg=[
                    {name: 'Chicken Corn Soup', price: 90},
                    {name: 'Chicken Clear Soup', price: 90},
                    {name: 'Chicken Cantonese Soup', price: 90},
                    {name: 'Chicken Hot & Sour Soup', price: 90}
                ]
            }
        };
        $scope.placeOrder =function () {
            $location.url('app/confirmOrder');
        }
    })
    .controller('GpsViewCtrl', function ($scope, $stateParams, Vendors,$location) {
        $scope.place = null;
        $scope.order={};
        var customerLocation = L.map('customerLocation', {
            center: [
                [20.0, 5.0]
            ],
            scrollWheelZoom: false,
            inertia: true,
            inertiaDeceleration: 2000
        });
        customerLocation.setView([20.0, 5.0], 15);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 25
        }).addTo(customerLocation);
        var circleRad=0;
        customerLocation.locate({setView: true, maxZoom: 13}).on('locationfound', function (e) {
            var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)').addTo(customerLocation);
            circleRad= e.accuracy * 50;
            var circle =new L.circle([e.latitude, e.longitude], 1500, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            }).addTo(customerLocation);
        })
            .on('locationerror', function (e) {
                console.log(e);
                alert("Location access denied.");
            });
        $scope.searchLocation = function () {
            if ($scope.place.geometry) {
                console.log($scope.place.geometry);
                customerLocation.setView([$scope.place.geometry.location.lat(), $scope.place.geometry.location.lng()], 15);
                var marker=L.marker([$scope.place.geometry.location.lat(),$scope.place.geometry.location.lng()]).addTo(customerLocation);
                var circle =new L.Circle([$scope.place.geometry.location.lat(),$scope.place.geometry.location.lng()], 500, {
                    weight: 1,
                    color: 'blue',
                    fillColor: '#cacaca',
                    fillOpacity: 0.2
                });
                circle.addTo(customerLocation);
            }
        }

        $scope.showVendorList =function () {
            $location.url('app/vendors/jaipur');
        }

    }).controller('RegOptionsCtrl', function ($scope, $stateParams){

    })
    .controller('homePageCtrl', function ($scope, $location, $ionicHistory) {
        $scope.selectedCity='jaipur';
        $scope.login=function (){
            $location.url('login');
        }
    })
    .controller('confirmOrderCtrl', function ($scope, $stateParams){

    })
    .controller('ProfileCtrl', function ($scope, $stateParams){
        $scope.currentUser = Parse.User.current();
    })
    .factory('userSession', function () {
    	this.isAuthenticated = function(){
    		return this.user;
    	}
    	this.isVendor = function(){
    		return this.user && this.user.vendor;
    	}
        this.create = function (user) {
            this.user = user;
        };
        this.invalidate = function () {
            this.user = null;
        };
        return this;
    });
