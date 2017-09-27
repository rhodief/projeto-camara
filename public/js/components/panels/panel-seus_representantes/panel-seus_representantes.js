(function () {
    'use strict';

    angular.module('panelSeusRepresentantes', ['wsRequest', 'gps', 'browserStorage'])
})();

(function () {
    'use strict';

    angular
        .module('panelSeusRepresentantes')
        .directive('panelSeusRepresentantes', panelSeusRepresentantes);

    panelSeusRepresentantes.$inject = ['APP'];

    function panelSeusRepresentantes(APP) {
        var directive = {
            restrict: 'EA',
            scope: {},
            templateUrl: APP.url + 'panels/panel-seus_representantes/panel-seus_representantes.html',
            controller:panelSeusRepresentantesController,
            controllerAs:'vm'
        };
        

        panelSeusRepresentantesController.$inject = ['gpsService', 'wsRequestService', 'localStorageService'];

        function panelSeusRepresentantesController(gpsService, wsRequestService, localStorageService){
            var vm = this;
            const PANELNAME = 'seus_representantes'
            var defaultListMessage = 'Carregando Lista de Deputados'; 
            var defaultViewMessage = 'Carregando Deputado(a)';
            vm.deputados = [];
            vm.view = {};
            vm.viewId;
            vm.getDetail = getDetail;
            vm.isSelected = isSelected
            vm.ufsList;
            vm.uf = 'AC';
            vm.changeUf = changeUf;
            vm.loadingList;
            vm.loadingListMessage = defaultListMessage;
            vm.loadingView;
            vm.loadingViewMessage = defaultViewMessage
            vm.reloadButton;
            vm.toggleGps = toggleGps;
            vm.gpsStatus = gpsStatus;
            vm.recordUf = recordUf;
            vm.isRecordUf = isRecordUf;
            var configs;
            

            function active() {
                _setMessage('list', 'Carregando Configurações');
                localStorageService.getPanelSettings(PANELNAME).then(afterLoadConfigs);
            }

            active();

            function afterLoadConfigs(settings){
                configs = settings;
                console.log(configs);
                vm.isRecordUf = configs.uf || false;
                getUfsList().then(setUfsList).catch(_errorList);
            }

            function getDeputadosGps(location) {
                vm.uf = location.estado_sig;
                var params = {
                    siglaUf: vm.uf
                }
                getDeputados(params);
            }


            function getDetail(id) {
                vm.viewId = id;
                getDeputado(id);
            }

            function changeUf(uf) {
                vm.uf = uf;
                var params = {
                    siglaUf: vm.uf
                }
                getDeputados(params);
            }

            function setUfsList(list) {
                vm.ufsList = list;
                if(configs.uf){
                    changeUf(configs.uf);
                }else
                if(configs.gpsActive !== false){
                    configs.gpsActive = true;
                    getDeputadosByGPS();
                }else{
                    changeUf('AC');
                }
            }

            function getDeputadosByGPS(){
                _setMessage('list', 'Ativando GPS...');
                return getLocation().then(getDeputadosGps).catch(_errorList);
            }

            function getDeputados(params){
                return _getDeputados(params).then(_renderDeputados).catch(_errorList);
            }

            function getDeputado(id) {
                return _getDeputado(id).then(_renderDeputado).catch(_errorView);
            }

            function recordUf(uf){
                _recordUf(uf);
            }

            function isRecordUf(){

            }

            function _getDeputados(params) {
                _setMessage('list');
                return wsRequestService.getDeputados(params);
            }

            function _getDeputado(id){
                _setMessage('view');
                return wsRequestService.getDeputado(id);
            }

            function _renderDeputados(data){
                vm.deputados = data;
                vm.loadingList = false;
            }

            function _renderDeputado(data){
                vm.view = data;
                vm.loadingView = false;
            }

            function getUfsList() {
                return wsRequestService.getUfsList();
            }

            function getLocation() {
                return gpsService.getLocation();
            }

            function isSelected(id) {
                return id === vm.viewId;
            }

            function toggleGps(){
                if(configs){
                    if(configs.gpsActive){
                        _unactiveGPS();
                    }else{
                        _activeGPS();
                    }
                }
            }

            function gpsStatus(){
                return configs.gpsActive;
            }

            function _activeGPS(){
                localStorageService.setPanelSettings(PANELNAME, 'gpsActive', true);
                configs.gpsActive = true;
                getDeputadosByGPS();
            }

            function _unactiveGPS(){
                localStorageService.setPanelSettings(PANELNAME, 'gpsActive', false);
                configs.gpsActive = false;
            }

            function _setMessage(where, message){
                switch(where){
                    case 'list':
                    vm.loadingListMessage = message || defaultListMessage;
                    vm.loadingList = true;
                    break;
                    case 'view':
                    vm.loadingViewMessage = message || defaultViewMessage;
                    vm.loadingView = true;
                    break;
                    default:
                    console.log('Local não passado para exibir mensagem');
                }
            }

            function _recordUf(uf){
                localStorageService.setPanelSettings(PANELNAME, 'uf', uf).then(_unactiveGPS);
                vm.isRecordUf = uf;
            }

            function _errorList(e){
                vm.deputados = [{error: 'Não foi possível carregar Lista de Deputados. Selecione um Estado'}];
                vm.loadingList = false;
                console.log(e);
            }

            function _errorView(e) {
                vm.view = [{error:'Não foi possível carregar dados do Deputado.'}];
                vm.loadingView = false;
            }
        }
        return directive;

        
    }
})();
