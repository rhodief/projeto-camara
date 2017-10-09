(function () {
    'use strict';

    angular.module('meuEspacoCamara', ['browserStorage', 'panelsGen', 'dialog'])
    .constant('TABS', {
        STORE: 'favoritos',
        PANELS: 'paineis',
        PREFERENCES: 'preferencias',
        UNKNOWN: 'desconhecido',
        DISABLED: 'desabilitado'
    });
})();