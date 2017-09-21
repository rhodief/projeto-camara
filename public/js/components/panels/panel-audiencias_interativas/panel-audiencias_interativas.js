(function () {
    'use strict';

    angular.module('panelAudienciasInterativas', []);
})();

(function () {
    'use strict';

    angular
        .module ('panelAudienciasInterativas')
        .directive ('panelAudienciasInterativas', panelAudienciasInterativas);

    panelAudienciasInterativas.$inject = ['APP'];

    function panelAudienciasInterativas(APP) {
        var directive = {
            restrict: 'E',
            scope:{},
            templateUrl: APP.url + 'panels/panel-audiencias_interativas/panel-audiencias_interativas.html',
            controller: panelAudienciasInterativasController,
            controllerAs: 'vm'
        };
        
        panelAudienciasInterativasController.$inject = [];

        function panelAudienciasInterativasController(){
            
        }

        return directive;
    }

})();