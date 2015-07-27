/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('TiffenWala.controllers')
.controller('LoginCtrl', function ($scope, $state, userSession, $ionicHistory) {
    // Form data for the login modal
    $ionicHistory.clearHistory();
        $scope.loginData = {};
        $scope.errors = {};
        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            Parse.User.logIn($scope.loginData.username, $scope.loginData.password, {
                success: function(user) {
                    userSession.create(user);
                    if(!user.get('vendor')){
                        //user
                        $state.go('app.gpsView');
                    }
                    else{
                        //user is vendor
                        $state.go('vendor.schedule');
                    }
                },
                error: function(user, error) {
                    $scope.errors.msg="Invalid user or password";
                    $scope.$digest();
                }
            });
        };


})