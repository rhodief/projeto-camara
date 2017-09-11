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
        vm.disableIt = disableIt;
        vm.enableIt = enableIt;
        vm.selectTab = selectTab;
        vm.close = closeTab
        vm.panels = {};
        vm.togglePanel = togglePanel
        vm.favorites = [];
        vm.removeFavorite = removeFavorite
        vm.importMescam = importMescam;
        vm.exportMescam = exportMescam;
        vm.textMescam = '';
        vm.isActive = isActive;
        vm.controllersInit = controllersInit;

        $scope.$on('initMescamController', function(ev, data){
            if(data){
                controllersInit();
            }
        })

        function controllersInit() {
            console.log('iniciou controller');
            getFavorites().then(showFavoritesList);
            activatePanels().then(getPanelsList);
            selectDefaultTab();
        }

        function getFavorites(){
            return localStorageService.getFavorites();
        }

        function showFavoritesList(data){
            vm.favorites = data;
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
                    localStorageService.isEnabled().then(okEnable);
                    function okEnable(enabled){
                        if(!enabled){
                            selectTab(TABS.DISABLED);
                        }else{
                            selectTab(TABS.STORE);
                            _showActions();
                        }
                    }
                }else{
                    selectTab(TABS.UNKNOWN);
                }
            }
        }

        function isActive(tab){
            return vm.selectedTab === tab;
        }

        function removeFavorite(url, index){
            vm.favorites.splice(index, 1);
            localStorageService.removeFavorite(url);
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
            if (vm.selectedTab !== TABS.UNKNOWN) 
                if(vm.selectedTab !== TABS.DISABLED) vm.selectedTab = tab;
            
        }

        //Botão de entendi
        function gotIt() {
            vm.selectedTab = TABS.STORE; //Ativa diretamente. Isso é para desativar os botões de navação.. ver outra coisa.. 
            localStorageService.known(true);
            //Desabilitar mensagem na home, que avisa da existência do #MEC...
            _showActions();
        }

        function disableIt(){
            gotIt();
            localStorageService.disableMescam();
            vm.selectedTab = TABS.DISABLED;
            _hideActions();

        }

        function enableIt(){
            localStorageService.enableMescam();
            vm.selectedTab = TABS.STORE;
            _showActions();
        }



        function closeTab() {
            $scope.action();
        }

        //ATIVAÇÃO DOS PAINÉS...
        //Botão de Controle de Ativação... Vou faazer um primeiro depois vejo os demais...

        function importMescam(){

        }

        function exportMescam(){
            localStorageService.exportMescam().then(ok);
            function ok(data){
                vm.textMescam = data;
            }

        }

        function _hideActions(){
            angular.element(document.getElementById('mescam-actions')).css('display', 'none');
        }

        function _showActions(){
            angular.element(document.getElementById('mescam-actions')).css('display', 'block');
        }


    }

})();


