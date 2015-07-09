angular.module('starter.controllers')
    .controller('MyCtrl', function($scope) {
        $scope.groups = [];
        for (var i=0; i<10; i++) {
            $scope.groups[i] = {
                name: 'xyz',
                items: 'abc'
            };

        }

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

    });/**
 * Created by mayankdewani on 08-07-2015.
 */
