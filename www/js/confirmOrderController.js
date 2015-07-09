/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('starter.controllers')
.controller('confirmOrderCtrl', function ($scope, $stateParams, userSession, $localStorage){
    $scope.selectedVendor={
        id:'eN467lXt76'
    };
        $scope.user=userSession.user;
        $scope.schedule = $localStorage.getObject('schedule');
        $scope.address=$localStorage.getObject('address');
        $scope.dateTime=$localStorage.getObject('dateTime');

    $scope.placeOrder = function(){
        var Order = Parse.Object.extend('Order');
        var myOrder = new Order();
        myOrder.set("Location",  new Parse.GeoPoint(30.0, -20.0));
        myOrder.set("comment", 'NA');
        myOrder.set("preferredDateTime", new Date());
        myOrder.set("tiffins", 1);
        myOrder.set("userId", userSession.user);
        myOrder.set("vendorId", userSession.user);
        myOrder.save();
    }
})
