(function () {
    'use strict';

    angular
        .module('panelsGen')
        .factory('panelsGenService', panelsGenService)

    panelsGenService.$inject = ['localStorageService', '$rootScope', '$http', '$q', 'APP'];

    function panelsGenService(localStorageService, $rootScope, $http, $q, APP) {

        var mainList;

        var service = {
            getPanelsList: getPanelsList,
            enable: enable,
            desable: desable,
            activatePanels: activatePanels
        };

        return service;

        //### Recupera a lista
        function getPanelsList() {
            var def = $q.defer();
            if (mainList) {
                def.resolve(mainList);
            } else {
                _getPanelesList()
                    .then(function (list) {
                        if (list.data && list.data.panels) {
                            mainList = list.data.panels
                            def.resolve(mainList);
                        } else {
                            _getPanelsListError();
                            def.reject()
                        }

                    }).catch(function (e) {
                        _getPanelsListError();
                        def.reject(e)
                    })
            }
            return def.promise;
        }

        //activeWidgetTeste
        function enable(panelName, sectionName, pos) {
            addPanel(panelName); //Configs...
            _sendMessageToPanels(true, panelName, sectionName, pos);
        }

        function desable(panelName, sectionName, pos) {
            removePanel(panelName);
            _sendMessageToPanels(false, panelName, sectionName, pos);
        }

        function activatePanels() {
            var defered = $q.defer();
            _getPanelsStorage()
                .then(retrievePanelsList)
                .then(storageList)
                .catch(notOk);

            function retrievePanelsList() {
                return getPanelsList();
            }

            function storageList(list) {
                _getPanelsStorage()
                    .then(ok)

                function ok(data) {
                    angular.forEach(list, function (section) {
                        angular.forEach(section.panels, function (panel) {
                            if (compare(panel.name, data)) {
                                panel.activated = true;
                                enable(panel.name, section.section, panel.pos);
                            }
                        });
                    })
                    defered.resolve();
                }

                function compare(el, listStorage) {
                    return listStorage && listStorage[el];
                }
            }
            function notOk(e) {
                defered.reject(e);
            }
            return defered.promise;

        }

        function _sendMessageToPanels(pwr, panelName, sectionName, pos) {
            var params = _buildParams(pwr, panelName, sectionName, pos);
            $rootScope.$broadcast('TogglePanel', params);
        }

        function addPanel(panelName, configs) {
            //#### VER PROMISE
            localStorageService.addPanel(panelName, configs);
        }

        function removePanel(panelName) {
            //### VER PROMISE...
            localStorageService.removePanel(panelName);
        }

        function _buildParams(pwr, panelName, sectionName, pos) {
            if (pwr === undefined || pwr === null, !panelName || !sectionName || pos === undefined || pos === null) {
                throw new Error('Faltam parâmetros para a construção da mensagem');
            }
            var params = {
                activate: pwr,
                panelName: panelName,
                sectionName: sectionName,
                pos: pos
            }
            return params;
        }

        function _getPanelesList() {
            return $http.get(APP.url + '/panels-gen/panels.json');
        }

        function _getPanelsStorage() {
            return localStorageService.getPanels();
        }


        function _getPanelsListError() {
            throw new Error('Não foi possível recuperar a lista de Panels')
        }
    }
})();