(function () {
    'use strict';

    angular.module('gps', []);
})();

(function () {
    'use strict';

    angular
        .module('gps')
        .factory('gpsService', gpsService)

    gpsService.$inject = ['$http', '$q'];

    function gpsService($http, $q) {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }

        var service = {
            getLocation: getLocation
        };

        return service;

        function getLocation() {
            return _getClientPosition()
                .then(_getLocation)
                .catch(_error);
        }

        function _getClientPosition() {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

            function successCallback(position) {
                deferred.resolve(position);
            }
            function errorCallback(error) {
                var errorMessage = 'Unknown error';
                switch (error.code) {
                    case 1:
                        errorMessage = 'Permission denied';
                        break;
                    case 2:
                        errorMessage = 'Position unavailable';
                        break;
                    case 3:
                        errorMessage = 'Timeout';
                        break;
                }
                deferred.reject(errorMessage);
            }
            return deferred.promise;
        }

        function _getLocation(currentPostion) {
            var x = currentPostion.coords.latitude;
            var y = currentPostion.coords.longitude;
            var acc = currentPostion.coords.accuracy;
            return _getCoords(x, y, acc);
        }

        function _getCoords(latitude,longitude, accuracy){
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
            return $http.get(url)
                .then(successCallback)
                .catch(errorCallback);

                function successCallback(data){
                    var fullAddress = data.data.results[0];
                    var formated = fullAddress.formatted_address;
                    
                    //var regex = /\s-[\w]{2}/

                    var addressComponent = fullAddress.address_components
                    var componentLength = addressComponent.length;
                    var state = addressComponent[componentLength - 2];
                    var output = {
                        estado: state.long_name,
                        estado_sig: 'DF'
                    }
                    return $q.resolve(output);
                }

                function errorCallback(error){
                    return $q.reject(error);
                }
        }



        function _error(e) {
            return $q.reject(e);
        }
    }
})();