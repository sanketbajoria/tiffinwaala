/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('TiffenWala.controllers')
    .controller('scheduleCtrl', function ($scope, $location, $ionicHistory, userSession, $stateParams, $state, $appUtil, DATE_PICKER, TIME_PICKER) {

        var Schedule = Parse.Object.extend("Schedule");

        if($stateParams.scheduleId){
            var query = new Parse.Query(Schedule);
            query.equalTo("objectId", $stateParams.scheduleId);
            query.find({
                success: function(results) {
                    $scope.schedule = results;
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }else{
            $scope.schedule = {};
            var now = new Date();
            $scope.schedule.orderDate = now;
            $scope.schedule.orderCutOffTime = (now.getHours() *3600) + (now.getMinutes() * 60);
        }

        $scope.epochTime = function(){
            return $appUtil.getEpochTime($scope.schedule.orderCutOffTime);
        }

        $scope.datePickerCallback = function (val) {
            if(typeof(val)==='undefined'){
                console.log('Date not selected');
            }else{
                console.log('Selected date is : ', val);
                $scope.schedule.orderDate = val;
            }
        };
        $scope.timePickerCallback = function (val) {
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
                $scope.schedule.orderCutOffTime = val;
            }
        };



        $scope.DATE_PICKER = DATE_PICKER;


        $scope.TIME_PICKER = TIME_PICKER;


        $scope.create = function () {
            var schedule = new Schedule();
            schedule.set("title", $scope.schedule.title);
            schedule.set("foodDescription", $scope.schedule.foodDescription);
            schedule.set("price", $scope.schedule.price);
            schedule.set("orderDate", $scope.schedule.orderDate);
            schedule.set("orderCutOffTime", $scope.schedule.orderCutOffTime);
            schedule.set("price", $scope.schedule.price);
            schedule.set("vendorId", userSession.user);
            schedule.save(null, {
                success: function (schedule) {
                    $state.go('vendor.schedules');
                },
                error: function (schedule, error) {
                    $scope.errors.msg = "Enter mandatory field";
                    $scope.$digest();
                }
            });
        }
    })