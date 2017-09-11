(function () {
    'use strict';

    angular
        .module('meuEspacoCamara')
        .controller('meuEspacoCamaraController', meuEspacoCamaraController)

    meuEspacoCamaraController.$inject = ['$rootScope'];

    function meuEspacoCamaraController($rootScope) {
        /* jshint validthis:true */
        var vm = this;

        vm.opened = false;
        vm.toggleMescam = toggleMescam;

        function toggleMescam() {
            //Fazer aparecer
            //REVERF ISSO AQUI... É A DIRETIVA Q CONTROLA>... ############
            //Ver se trabalho com remove add e remove class... 
            
            if (vm.opened) {
                angular.element(document.getElementById('section-meuEspacoCamara')).removeClass('act');
            } else {
                var css = angular.element(document.getElementById('button-link')).css('text-align');
                if(css == 'center'){
                    $rootScope.$broadcast('initMescamController', true);
                }
                angular.element(document.getElementById('section-meuEspacoCamara')).addClass('act');
            }
            vm.opened = !vm.opened;
            //Leitura de Configurações ao abrir.. se houver
        }
    }
})();





