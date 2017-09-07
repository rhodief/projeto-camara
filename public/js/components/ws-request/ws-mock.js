(function () {
    'use strict';

    angular.module('wsMock', []);
})();

(function(){
    'use strict';

    angular
        .module('wsMock')
        .factory('wsMockService', wsMockService)

    wsMockService.$inject = ['$http', 'APP', '$timeout'];

    function wsMockService($http, APP, $timeout) {
        var service = {
            getData: getData
        };

        return service;

        function getData(schemaObj) { 
            return _getDataBasedonSchema(schemaObj);
        }
        
        function _getDataBasedonSchema(schemaObj){
            var fileName = schemaObj.name;
            return _getMockData(fileName).then(_getRandomData);
        }

        function _getMockData(fileName){
            var url = APP.url + 'ws-request/ws-mock-files/' + fileName + '.json';
            //Simular um delay pala espera dos dados.
            return $timeout(function(){
                return $http.get(url);
            }, 1000);
        }

        function _getRandomData(data){
            if(data && angular.isArray(data.data)){
                var values = data.data;
                var max = values.length;
                var random = getRandomNumber(0, max-1);
                return values[random];
            }
            console.log('Houve um Erro');
        }

        function getRandomNumber(min, max){
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
    }
})();