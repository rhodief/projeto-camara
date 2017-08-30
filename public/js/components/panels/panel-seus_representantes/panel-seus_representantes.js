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
        return directive;

        panelSeusRepresentantesController.$inject = ['gpsService', 'wsRequestService'];

        function panelSeusRepresentantesController(gpsService, wsRequestService){
            var vm = this;
            vm.deputados = [];
            vm.view = {};
            vm.idView;
            vm.getDetail = getDetail;
            vm.isSelected = isSelected
            vm.ufsList;
            vm.uf = 'AC';
            vm.changeUf = changeUf
            

            function active() {
                getLocation().then(getDeputadosGps).catch(_error)
                getUfsList().then(setUfsList).catch(_error)
            }

            active();

            function getDeputadosGps(location) {
                vm.uf = location.estado_sig;
                var params = {
                    siglaUf: vm.uf
                }
                getDeputados(params)
                    .then(function (data) {
                        vm.deputados = data;
                    })
                    .catch(_error);
            }


            function getDetail(id) {
                vm.idView = id;
                getDeputado(id)
                    .then(function (data) {
                        vm.view = data;
                    })
                    .catch(_error);
            }

            function changeUf(uf) {
                vm.uf = uf;
                var params = {
                    siglaUf: vm.uf
                }
                
                getDeputados(params)
                    .then(function (data) {
                        vm.deputados = data;
                    })
                    .catch(_error);
            }

            function setUfsList(list) {
                vm.ufsList = list;
            }

            function getDeputado(id) {
                return wsRequestService.getDeputado(id);
            }

            function getDeputados(params) {
                return wsRequestService.getDeputados(params);
            }

            function getUfsList() {
                return wsRequestService.getUfsList();
            }

            function getLocation() {
                return gpsService.getLocation();
            }

            function isSelected(id) {
                return id === vm.idView;
            }

            function _error(e) {
                console.log(e);
            }
        }

        
    }
})();
