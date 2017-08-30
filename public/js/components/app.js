if (typeof (Storage) === "undefined") {
    notifyNotSupported();
} else {
    (function () {
        'use strict';
        angular.module('app', ['meuEspacoCamara', 'browserStorage', 'panelsGen', 'search'])
        .constant('APP', {
            url: '/www/camara/public/js/components/'
        });
    })();
}

function notifyNotSupported() {
    alert('Não Há Suporte para LocalStorage... Tente acessar de um Navegador mais moderno (recente) para obter funcionalidades personalizadas');
}