angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, userSession, $state, $stateParams, $ionicHistory) {

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
