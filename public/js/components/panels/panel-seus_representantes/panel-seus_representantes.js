(function () {
    'use strict';

    angular.module('panelSeusRepresentantes', ['wsRequest', 'gps'])
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
        

        panelSeusRepresentantesController.$inject = ['gpsService', 'wsRequestService'];

        function panelSeusRepresentantesController(gpsService, wsRequestService){
            var vm = this;
            vm.deputados = [];
            vm.view = {};
            vm.viewId;
            vm.getDetail = getDetail;
            vm.isSelected = isSelected
            vm.ufsList;
            vm.uf = 'AC';
            vm.changeUf = changeUf;
            vm.loadingList;
            vm.loadingListMessage = 'Carregando Lista de Deputados';
            vm.loadingView;
            vm.loadingViewMessage = 'Carregando Deputado(a)';
            vm.reloadButton;
            

            function active() {
                vm.loadingList = true;
                getUfsList().then(setUfsList).catch(_errorList)
            }

            active();

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
                getLocation().then(getDeputadosGps).catch(_errorList);
            }

            function getDeputados(params){
                vm.loadingList = true;
                return _getDeputados(params).then(_renderDeputados).catch(_errorList);
            }

            function getDeputado(id) {
                vm.loadingView = true;
                return _getDeputado(id).then(_renderDeputado).catch(_errorView);
            }

            function _getDeputados(params) {
                return wsRequestService.getDeputados(params);
            }

            function _getDeputado(id){
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
