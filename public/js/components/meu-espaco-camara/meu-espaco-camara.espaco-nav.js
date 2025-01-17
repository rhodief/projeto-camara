(function () {
    'use strict';

    angular
        .module('meuEspacoCamara')
        .directive('meuEspacoCamara', espaco);

    espaco.$inject = ['APP'];

    function espaco(APP) {
        var espaconav = {
            restrict: 'E',
            scope: {
                action: '&'
            },
            templateUrl: APP.url + 'meu-espaco-camara/meu_espaco_camara.html',
            controller: espacoNavController,
            controllerAs: 'vm'
        };
        return espaconav;
    }

    espacoNavController.$inject = ['localStorageService', 'TABS', '$scope', 'panelsGenService', '$timeout', '$rootScope']

    function espacoNavController(localStorageService, TABS, $scope, panelsGenService, $timeout, $rootScope) {

        var vm = this;
        //Main Settings
        vm.selectedTab = '';
        vm.gotIt = gotIt;
        vm.disableIt = disableIt;
        vm.enableIt = enableIt;
        vm.selectTab = selectTab;
        vm.close = closeTab
        vm.panels = {};
        vm.togglePanel = togglePanel
        vm.favorites = [];
        vm.removeFavorite = removeFavorite;
        vm.orderFavorites = orderFavorites;
        vm.order;;
        vm.importMescam = importMescam;
        vm.exportMescam = exportMescam;
        vm.textMescam = '';
        vm.isActive = isActive;
        vm.toggleEdit = toggleEdit;
        vm.editable = editable;
        vm.inEdition = [];
        vm.themesList = [];
        vm.op = {
            op1: { value: 'Padrão' },
            op2: { value: 'Padrão' },
            op3: { value: 'Padrão' },
            op4: { value: 'Padrão' }
        };


        $scope.$watch('vm.op', function (newTerm, oldTerm) {
            if (newTerm) {
                var changedArray = _getPropChanged(newTerm, oldTerm);
                for (var i = 0; i < changedArray.length; i++) {
                    _notifyDynamicNews(changedArray[i]);
                    _setTheme(changedArray[i]);
                }

            }
        }, true);

        //Necessário para mobile
        $scope.$on('initMescamFavorites', function (ev, data) {
            if (data) {
                favoritesInit();
            }
        })

        controllersInit();

        function controllersInit() {
            getFavorites().then(showFavoritesList);
            activatePanels().then(getPanelsList);
            selectDefaultTab();
            orderFavorites('date');
            getThemesList().then(getThemes);
        }

        function favoritesInit() {
            getFavorites().then(showFavoritesList);
        }

        function getFavorites() {
            return localStorageService.getFavorites();
        }

        function showFavoritesList(data) {
            vm.favorites = data;
        }

        function getThemes() {
            _getThemes().then(okThemes).catch(_error);
            function okThemes(themes) {
                angular.forEach(themes, function (v, i) {
                    vm.op[i] = _getFullObjList(v, vm.themesList);
                    _notifyDynamicNews({ category: v, option: _getOp(i) })
                });
            }
            function _error(e) {
                console.log(e);
            }
        }

        function getThemesList() {
            return _getThemesList().then(function (themesList) {
                vm.themesList = themesList;
            });
        }

        function getPanelsList() {
            panelsGenService.getPanelsList().then(function (data) {
                vm.panels = data;
            }).catch(function (e) {
                console.log('Não foi possível recuperar lista');
            });
        }

        function selectDefaultTab() {
            localStorageService.isKnown()
                .then(isKnownOk)

            function isKnownOk(data) {
                if (data) {
                    localStorageService.isEnabled().then(okEnable);
                    function okEnable(enabled) {
                        if (!enabled) {
                            selectTab(TABS.DISABLED);
                        } else {
                            selectTab(TABS.STORE);
                            _showActions();
                        }
                    }
                } else {
                    selectTab(TABS.UNKNOWN);
                }
            }
        }

        function isActive(tab) {
            return vm.selectedTab === tab;
        }

        function toggleEdit(url, title) {
            if (editable(url)) {
                _closeEdition(url, title);
            } else {
                _openEdition(url);
            }
        }

        function _openEdition(url) {
            vm.inEdition.push(url);
        }

        function _closeEdition(url, title) {
            var index = vm.inEdition.indexOf(url);
            if (index !== -1) {
                vm.inEdition.splice(index, 1);
            }
            localStorageService.editTitle(url, title);
        }

        function orderFavorites(val) {
            vm.order = val;
        }

        function editable(url) {
            return vm.inEdition.indexOf(url) !== -1;
        }

        function removeFavorite(url) {
            _removeByUrl(url, vm.favorites);
            localStorageService.removeFavorite(url);
        }

        function _removeByUrl(url, array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].url == url) {
                    return array.splice(i, 1);
                }
            }
        }

        function activatePanels() {
            return panelsGenService.activatePanels();
        }

        function togglePanel(panel, parentPanel) {
            if (panel.activated) {
                turnPanelOff(panel, parentPanel);
            } else {
                turnPanelOn(panel, parentPanel);
            }
        }

        function turnPanelOn(panel, parentPanel) {
            panel.activated = true;
            panelsGenService.enable(panel.name, parentPanel.section, panel.pos);
            $timeout(function () {
                scrollToElement('panel-' + panel.name);
            }, 500)

        }

        function turnPanelOff(panel, parentPanel) {
            panel.activated = false;
            panelsGenService.desable(panel.name, parentPanel.section, panel.pos);
        }

        function selectTab(tab) {
            if (vm.selectedTab !== TABS.UNKNOWN)
                if (vm.selectedTab !== TABS.DISABLED) vm.selectedTab = tab;

        }

        //Botão de entendi
        function gotIt() {
            vm.selectedTab = TABS.STORE; //Ativa diretamente. Isso é para desativar os botões de navação.. ver outra coisa.. 
            localStorageService.known(true);
            //Desabilitar mensagem na home, que avisa da existência do #MEC...
            _showActions();
        }

        function disableIt() {
            gotIt();
            localStorageService.disableMescam();
            vm.selectedTab = TABS.DISABLED;
            _hideActions();
        }

        function enableIt() {
            localStorageService.enableMescam();
            vm.selectedTab = TABS.STORE;
            _showActions();
        }



        function closeTab() {
            $scope.action();
        }

        function _getPropChanged(newTerm, oldTerm) {
            var ret = [];
            angular.forEach(newTerm, function (v, i) {
                if (oldTerm[i] && oldTerm[i].index !== v.index) {
                    ret.push({ category: v.index, option: _getOp(i) });
                }
            })
            return ret;
        }

        function _getOp(op) {
            return op.split('op')[1];
        }

        function _getThemesList() {
            return localStorageService.getThemesList();
        }

        function _setTheme(obj) {
            return localStorageService.setTheme(obj);
        }

        function _getThemes() {
            return localStorageService.getThemes();
        }

        //ATIVAÇÃO DOS PAINÉS...
        //Botão de Controle de Ativação... Vou faazer um primeiro depois vejo os demais...

        function importMescam() {

        }

        function exportMescam() {
            localStorageService.exportMescam().then(ok);
            function ok(data) {
                vm.textMescam = data;
            }

        }

        function _notifyDynamicNews(obj) {
            $rootScope.$broadcast('activeDynamicNews', obj);
        }

        function _hideActions() {
            angular.element(document.getElementById('mescam-actions')).css('display', 'none');
        }

        function _showActions() {
            angular.element(document.getElementById('mescam-actions')).css('display', 'block');
        }

        function _getFullObjList(index, list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].index === index) {
                    return list[i];
                }
            }
        }


    }

})();


