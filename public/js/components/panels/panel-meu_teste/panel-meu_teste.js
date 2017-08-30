(function () {
    'use strict';

    angular.module('panelMeuTeste', []);
})();

(function () {
    'use strict';

    angular
        .module ('panelMeuTeste')
        .directive ('panelMeuTeste', panelMeuTeste);

    panelMeuTeste.$inject = [];

    function panelMeuTeste() {
        var directive = {
            link: link,
            restrict: 'EA',
            template:'<div>PAINEL TESTE HEHEHEH</div>'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();