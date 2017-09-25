(function () {
    'use strict';

    angular.module('panelEDemocracia', []);
})();

(function () {
    'use strict';

    angular
        .module ('panelEDemocracia')
        .directive ('panelEDemocracia', panelEDemocracia);

    panelEDemocracia.$inject = ['APP'];

    function panelEDemocracia(APP) {
        var directive = {
            restrict: 'E',
            scope:{},
            templateUrl: APP.url + 'panels/panel-e_democracia/panel-e_democracia.html',
            controller: panelEDemocraciaController,
            controllerAs: 'vm'
        };
        
        panelEDemocraciaController.$inject = [];

        function panelEDemocraciaController(){
            
        }

        return directive;
    }

})();