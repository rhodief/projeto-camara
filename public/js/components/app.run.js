(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun)

    appRun.$inject = ['localStorageService'];

    function appRun(localStorageService) {

        function active() {
            initMeuEspacoCamaraButton();
            verifyKnownMeuEspacoCamara();
        }

        active();

        //Iniciar o Botão #MeuEspaçoCâmara
        //###Iniciar direto no CSS, mas ver a conveniência disso....
        function initMeuEspacoCamaraButton() {
            angular.element(document.getElementById('section-meuEspacoCamara')).css('display', 'block');
        }

        function verifyKnownMeuEspacoCamara() {
            //Verificar se é o primeiro acesso e settar o aviso inicial
            localStorageService.isKnown()
                .then(thisKnown)

            function thisKnown(data) {
                if(!data)
                    angular.element(document.getElementById('main-messages')).html('Você conhece o #MeuEspaçoCamara? Clique no ícone da câmara ao lado e conheça diversas de personalizar sua experiência neste portal');
            }
        }
    }

}());