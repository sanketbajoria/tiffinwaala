/**
 * Created by saurabhsharma01 on 08-Jul-15.
 */
angular.module('starter.controllers')
.controller('GpsViewCtrl', function ($scope, $stateParams, Vendors,$location) {
    $scope.place = null;
    $scope.order={};
    var customerLocation = L.map('customerLocation', {
        center: [
            [20.0, 5.0]
        ],
        scrollWheelZoom: false,
        inertia: true,
        inertiaDeceleration: 2000
    });
    customerLocation.setView([20.0, 5.0], 15);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data � <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 25
    }).addTo(customerLocation);
    var circleRad=0;
    var marker={};
    var circle={};
    customerLocation.locate({setView: true, maxZoom: 13}).on('locationfound', function (e) {
        marker = L.marker([e.latitude, e.longitude],{draggable: true}).bindPopup('Your are here :)').addTo(customerLocation);
        marker.on('drag', onDragging);
        circle=L.circle([e.latitude, e.longitude],e.accuracy/2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        }).addTo(customerLocation);
        circle.setRadius(800);
        var latlng = new google.maps.LatLng(e.latitude, e.longitude);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $scope.$apply(function () {
                        $scope.place = results[1];
                    })
                }
            }
        });
    })
        .on('locationerror', function (e) {
            console.log(e);
            alert("Location access denied.");
        });
    function onDragging(e) {
        var latlng = new google.maps.LatLng(e.target.getLatLng().lat, e.target.getLatLng().lng);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $scope.$apply(function () {
                        $scope.place = results[1];
                    })
                }
            }
        });
        circle.setLatLng(e.target.getLatLng());
    }
    $scope.searchLocation = function () {
        if ($scope.place.geometry) {
            customerLocation.setView([$scope.place.geometry.location.lat(), $scope.place.geometry.location.lng()], 15);
            marker.setLatLng([$scope.place.geometry.location.lat(),$scope.place.geometry.location.lng()]);
            marker.on('drag', onDragging);
            circle.setLatLng([$scope.place.geometry.location.lat(),$scope.place.geometry.location.lng()]);
            circle.setRadius(200);
        }
    }

    $scope.showVendorList =function (form) {
        if(form.$valid) {
            $location.url('app/vendors/jaipur');
        }
    }

})