(function () {
    'use strict';

    angular.module('meuEspacoCamara', ['browserStorage', 'panelsGen'])
    .constant('TABS', {
        STORE: 'favoritos',
        PANELS: 'paineis',
        PREFERENCES: 'preferencias',
        UNKNOWN: 'desconhecido'
    });
})();