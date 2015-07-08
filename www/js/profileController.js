/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('starter.controllers')
.controller('ProfileCtrl', function ($scope, $stateParams){
    $scope.currentUser = Parse.User.current();
})