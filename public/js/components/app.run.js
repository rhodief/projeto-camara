(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun)

    appRun.$inject = ['localStorageService'];

    function appRun(localStorageService) {

        var message = 'Você conhece o #MeuEspaçoCamara? Clique no ícone da Câmara dos Deputados no canto inferior direto da sua tela e conheça diversas de personalizar sua experiência neste Portal';

        function active() {
            initMeuEspacoCamaraButton();
            verifyKnownMeuEspacoCamara();
        }

        active();

        //Iniciar o Botão #MeuEspaçoCâmara
        //###Iniciar direto no CSS, mas ver a conveniência disso....
        function initMeuEspacoCamaraButton() {
            angular.element(document.getElementById('button-meuEspacoCamara')).css('display', 'block');
        }

        function verifyKnownMeuEspacoCamara() {
            //Verificar se é o primeiro acesso e settar o aviso inicial
            localStorageService.isKnown()
                .then(thisKnown)

            function thisKnown(data) {
                var button = angular.element(document.getElementById('button-link'));
                if(!data){
                    button.addClass('blinker');
                    var notificationSection = angular.element(document.getElementById('notification'));
                    var divMessage = angular.element(document.getElementById('main-messages'));
                    notificationSection.css('display', 'block');
                    divMessage.html(message);
                }else{
                    button.removeClass('blinker');
                }
            }
        }
    }

}());