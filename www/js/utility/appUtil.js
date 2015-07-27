angular.module('ionic.utils',[])

    .factory('$appUtil', ['$window', function($window) {
        return {
            //convert long epoch Time of a day to epoch date
            getEpochTime: function(t) {
                var d = new Date();
                d.setHours(Math.floor(t / 3600));
                d.setMinutes((t % 3600) / 60);
                return d.getTime();
            }
        }
    }]);