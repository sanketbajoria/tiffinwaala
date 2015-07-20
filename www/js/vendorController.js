/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('starter.controllers')
.controller('VendorListByScheduleCtrl', function ($scope, Vendors, $location, $state, $localStorage) {
        $scope.schedules=[];
        $scope.orderList=[];
        var query = new Parse.Query("Schedule");
        //query.equalTo("vendor", true);
        query.include("vendorId");
        query.find({
            success: function(schedules) {
                $scope.schedules=schedules;
            },

            error: function(error) {
                // error is an instance of Parse.Error.
            }
        });
        console.log($scope.vendors);


        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        }

        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        }

        $scope.placeOrder =function (schedule) {
            console.log(schedule);
            $localStorage.setObject('schedule',schedule);
            $state.go('app.confirmOrder');
        };

        $scope.addOrRemoveToList = function(schedule){

            var isExist = removeFunction(schedule.id);
            console.log('isExist: ',isExist);
            if(!isExist) {
                $scope.orderList.push(schedule);
            }
            console.log('orderList',$scope.orderList);
        }

        function removeFunction (val)
        {
            debugger
            var isExist = false;
            var index = 0;
            for(var index = 0 ; index< $scope.orderList.length ; index++ ){
                if($scope.orderList[index].id === val){
                    $scope.orderList.splice(index, 1);
                    isExist =true;
                    break;
                }
            }


            return isExist;
        }

        /*$scope.vendors = [
            {id: 0, title: "Vegsutra Hospitality Pvt Ltd", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
            {id: 1, title: "Zayka Tiffin Service", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
            {id: 2, title: "Sabka Tiffin", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
            {id: 3, title: "Satva Foods", name: "Brett Rudd", twitter_id: "@brettrudd", description: "description",tel:'+(91)-22-38559670'},
            {id: 4, title: "KGN Caterers", name: "Joe Bowser", twitter_id: "@infil00p", description: "description",tel:'+(91)-22-38559670'},
            {id: 5, title: "Dipaanjali Tiffin Service", name: "Brian Leroux", twitter_id: "@brianleroux", description: "description",tel:'+(91)-22-38559670'},
            {id: 6, title: "Ganapatti Thali", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
            {id: 7, title: "DRS Kitchen", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
            {id: 8, title: "Food Connect ", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
            {id: 9, title: "Mauli Tiffin Service", name: "Jason Weathersby", twitter_id: "@jasonweathersby", description: "description",tel:'+(91)-22-38559670'},
        ];*/
    $scope.callMe = function (vender, event) {
        event.preventDefault();
        window.location = 'tel:' + vender.tel;
    };
    $scope.locateMe = function (vender, event) {
        event.preventDefault();
        $state.transitionTo('app.gpsView', {id: vender.id});
    }
})

.controller('VendorCtrl', function ($scope, $stateParams, $location) {
    var vendors = [
        {id: 0, title: "Vegsutra Hospitality Pvt Ltd", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
        {id: 1, title: "Zayka Tiffin Service", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
        {id: 2, title: "Sabka Tiffin", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
        {id: 3, title: "Satva Foods", name: "Brett Rudd", twitter_id: "@brettrudd", description: "description",tel:'+(91)-22-38559670'},
        {id: 4, title: "KGN Caterers", name: "Joe Bowser", twitter_id: "@infil00p", description: "description",tel:'+(91)-22-38559670'},
        {id: 5, title: "Dipaanjali Tiffin Service", name: "Brian Leroux", twitter_id: "@brianleroux", description: "description",tel:'+(91)-22-38559670'},
        {id: 6, title: "Ganapatti Thali", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
        {id: 7, title: "DRS Kitchen", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
        {id: 8, title: "Food Connect ", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
        {id: 9, title: "Mauli Tiffin Service", name: "Jason Weathersby", twitter_id: "@jasonweathersby", description: "description",tel:'+(91)-22-38559670'},
    ];
    for(var i=0;i<vendors.length;i++){
        if(vendors[i].id==$stateParams.id){
            $scope.vendor = vendors[i];
        }
    }

    $scope.orderedItems={};
    $scope.addToCartModal=true;
    $scope.orderedItems.Veg= [
        {name: 'Veg Corn Soup', price: 75},
        {name: 'Veg Hot & Sour Soup', price: 75},
        {name: 'Veg Cantonese Soup', price: 75},
        {name: 'Cream Of Tomato Soup', price: 75}
    ];
    $scope.orderedItems.NonVeg=[
        {name: 'Chicken Corn Soup', price: 90},
        {name: 'Chicken Clear Soup', price: 90},
        {name: 'Chicken Cantonese Soup', price: 90},
        {name: 'Chicken Hot & Sour Soup', price: 90}
    ]
    $scope.menuItem = function (itemId) {
        if (1236 == Number(itemId)) {
            $scope.orderedItems.Veg= [
                {name: 'Veg Corn Soup', price: 75},
                {name: 'Veg Hot & Sour Soup', price: 75},
                {name: 'Veg Cantonese Soup', price: 75},
                {name: 'Cream Of Tomato Soup', price: 75}
            ];
            $scope.orderedItems.NonVeg=[
                {name: 'Chicken Corn Soup', price: 90},
                {name: 'Chicken Clear Soup', price: 90},
                {name: 'Chicken Cantonese Soup', price: 90},
                {name: 'Chicken Hot & Sour Soup', price: 90}
            ]
        }
    };
    $scope.placeOrder =function () {
        $location.url('app/confirmOrder');
    };
    $scope.rating1=5;
}).directive("starRating", function() {
        return {
            restrict: 'A',
            template: '<ul class="rating">' +
                '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                '\u2605' +
                '</li>' +
                '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {

                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue', function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        }
    });