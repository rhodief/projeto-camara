(function(){
    'use strict';

    angular
        .module('camaraDiscussao')
        .factory('camaraDiscussaoDataService', camaraDiscussaoDataService)

    camaraDiscussaoDataService.$inject = ['$http'];

    function camaraDiscussaoDataService($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {}
    }
})();