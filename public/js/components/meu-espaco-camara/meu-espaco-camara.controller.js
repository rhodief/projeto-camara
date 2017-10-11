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


        var page = angular.element(document.querySelector('html'));
        page.bind('keyup',pressKey);


        function toggleMescam() {
            
            if (vm.opened) {
                close();
            } else {
                open();
            }
        }

        function open(){
            var css = angular.element(document.getElementById('button-link')).css('text-align');
            $rootScope.$broadcast('initMescamFavorites', true);
            angular.element(document.getElementById('section-meuEspacoCamara')).addClass('act');
            vm.opened = true;
            angular.element(document.getElementsByTagName('body')).addClass('no-scroll');
        }

        function close(){
            angular.element(document.getElementById('section-meuEspacoCamara')).removeClass('act');
            vm.opened = false;
            angular.element(document.getElementsByTagName('body')).removeClass('no-scroll');
        }

        function pressKey(e){
            e.preventDefault();
            if(e.altKey && e.shiftKey && e.which == '57'){
                toggleMescam();
                angular.element(document.querySelector('meu-espaco-camara .actions li a')).focus();
            }
        }
    }
})();





