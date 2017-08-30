(function () {
    'use strict';

    angular
        .module ('camaraDiscussao')
        .directive ('camaraDiscussao', camaraDiscussao);

    camaraDiscussao.$inject = ['$window'];

    function camaraDiscussao($window) {
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: 'js/camara-discussao/camara-discussao.html',
            controller: camaraDiscussaoController,
            controllerAs: 'vm'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    camaraDiscussaoController.$inject = [];

    function camaraDiscussaoController(){

    }

})();