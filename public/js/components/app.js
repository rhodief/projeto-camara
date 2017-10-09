if (typeof (Storage) === "undefined") {
    notifyNotSupported();
} else {
    (function () {
        'use strict';
        angular.module('app', ['meuEspacoCamara', 'browserStorage', 'panelsGen', 'search', 'selectFilter', 'dialog', 'selecter', 'dynamicNews'])
        .constant('APP', {
            url: 'js/components/',
            mockServer: '../server_simulator/'
        });
    })();
}

function notifyNotSupported() {
    alert('Não há Suporte para LocalStorage... Tente acessar de um Navegador mais moderno (recente) para obter funcionalidades personalizadas');
}