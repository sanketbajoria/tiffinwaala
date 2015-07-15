/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('starter.controllers')
.controller('scheduleCtrl', function ($scope, $location, $ionicHistory, userSession) {
    $scope.submit = function(){
        var Schedule = Parse.Object.extend("Schedule");
        var schedule = new Schedule();
        schedule.set("title", $scope.schedule.title);
        schedule.set("foodDescription", $scope.schedule.foodDescription);
        schedule.set("price", $scope.schedule.price);
        //schedule.set("orderDate", $scope.schedule.orderDate);
        schedule.set("orderCutOffTime", $scope.schedule.orderCutOffTime);
        schedule.set("vendorId", userSession.user);
        schedule.save(null, {
            success: function(schedule) {
                $state.go('vendor.schedules');
            },
            error: function(schedule, error) {
                $scope.errors.msg="Enter mandatory field";
                $scope.$digest();
            }
        });
    }
})