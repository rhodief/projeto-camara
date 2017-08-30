(function () {
    'use strict';
    angular.module('browserStorage', [])
        .constant('LOCALSTORAGE', {
            ESPACO_NAME: '#MESCAM',
            KNOWN: 'KNOWN',
            PANELS_NAME:'PANELS',
            SETTINGS: 'SETTINGS',
            FAVORITES: 'FAVORITES'
        })
        .constant('ERROR_MESSAGE', {
            ELEMENT_NOT_FOUND: 'O elemento que se tenta recuperar não existe!',
            CONFIG_NOT_FOUND: 'Ambiente não configurado'
        });
})();