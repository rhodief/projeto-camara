(function () {
    'use strict';

    angular
        .module('meuEspacoCamara')
        .controller('meuEspacoCamaraController', meuEspacoCamaraController)

    meuEspacoCamaraController.$inject = [];

    function meuEspacoCamaraController() {
        /* jshint validthis:true */
        var vm = this;

        vm.opened = false;
        vm.toggleMescam = toggleMescam;

        function toggleMescam() {
            //Fazer aparecer
            //REVERF ISSO AQUI... É A DIRETIVA Q CONTROLA>... ############
            //Ver se trabalho com remove add e remove class... 
            if (vm.opened) {
                angular.element(document.getElementById('meuEspacoCamara')).css('display', 'none');
            } else {
                angular.element(document.getElementById('meuEspacoCamara')).css('display', 'block');
            }
            vm.opened = !vm.opened;
            //Leitura de Configurações ao abrir.. se houver
        }
    }
})();





