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

    espacoNavController.$inject = ['localStorageService', 'TABS', '$scope', 'panelsGenService']

    function espacoNavController(localStorageService, TABS, $scope, panelsGenService) {

        var vm = this;
        //Main Settings
        vm.selectedTab = '';
        vm.gotIt = gotIt;
        vm.selectTab = selectTab;
        vm.close = closeTab
        vm.panels = {};
        vm.togglePanel = togglePanel
        vm.favorites = [];

        controllersInit();

        function controllersInit() {
            activatePanels()
                .then(getPanelsList)
            selectDefaultTab();
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
                if(data){
                    selectTab(TABS.STORE);
                }else{
                    selectTab(TABS.UNKNOWN);
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
        }

        function turnPanelOff(panel, parentPanel) {
            panel.activated = false;
            panelsGenService.desable(panel.name, parentPanel.section, panel.pos);
        }

        function selectTab(tab) {
            if (vm.selectedTab !== TABS.UNKNOWN) {
                vm.selectedTab = tab;
            }
        }

        //Botão de entendi
        function gotIt() {
            vm.selectedTab = TABS.STORE; //Ativa diretamente. Isso é para desativar os botões de navação.. ver outra coisa.. 
            localStorageService.known(true);
            //Desabilitar mensagem na home, que avisa da existência do #MEC...
        }

        function closeTab() {
            $scope.action();
        }

        //ATIVAÇÃO DOS PAINÉS...
        //Botão de Controle de Ativação... Vou faazer um primeiro depois vejo os demais...



    }

})();


