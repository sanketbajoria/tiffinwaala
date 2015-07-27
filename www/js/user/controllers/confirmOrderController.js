/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('TiffenWala.controllers')
.controller('confirmOrderCtrl', function ($scope, $stateParams, userSession, $localStorage){
    $scope.selectedVendor={
        id:'eN467lXt76'
    };
        $scope.user=userSession.user;
        $scope.schedule = $localStorage.getObject('schedule');
        $scope.address=$localStorage.getObject('address');
        $scope.dateTime=$localStorage.getObject('dateTime');

    $scope.placeOrder = function(){

        debugger
        var Order = Parse.Object.extend('Order');
        var myOrder = new Order();
        var Sc = Parse.Object.extend('Schedule');
        myOrder.set("scheduleId",new Sc($localStorage.getObject('schedule')));
        myOrder.set("Location",  new Parse.GeoPoint($scope.address.geometry.location.A, $scope.address.geometry.location.F));
        myOrder.set("comment", 'NA');
        myOrder.set("preferredDateTime", new Date($localStorage.getObject('dateTime')));
        myOrder.set("tiffins", 1);
        myOrder.set("userId", userSession.user);
        myOrder.set("vendorId", $localStorage.getObject('schedule').vendorId);
        myOrder.save();
    }
})
