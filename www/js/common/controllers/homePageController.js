/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('TiffenWala.controllers')
.controller('homePageCtrl', function ($scope, $location, $ionicHistory) {
    $scope.selectedCity='jaipur';
    $scope.login=function (){
        $location.url('login');
    }
})