/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('TiffenWala.controllers')
.controller('RegOptionsCtrl', function ($scope, $stateParams){

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