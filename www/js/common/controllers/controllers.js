angular.module('TiffenWala.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, userSession, $state, $stateParams, $ionicHistory) {

    	$ionicHistory.clearHistory();
    	if(!userSession.isAuthenticated()){
    		$state.go("login")
    	}else{
    		if(userSession.isVendor()){
				$state.go('vendor.schedule');
    			//$location.path("#/vendor/schedule");
    		}else{
				$state.go('app.home');
    			//$location.path("#/app/home");
    		}
    	}

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

		function reverse(input) {
			input = input || '';
			if (input.length <= 1) {
				return input;
			}
			var first = input[0];
			var rest = input.slice(1);
			return reverse(rest) + first;
		}


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
