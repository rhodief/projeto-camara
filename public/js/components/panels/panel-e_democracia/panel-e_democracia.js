(function () {
    'use strict';

    angular.module('panelEDemocracia', ['wsRequest']);
})();

(function () {
    'use strict';

    angular
        .module ('panelEDemocracia')
        .directive ('panelEDemocracia', panelEDemocracia);

    panelEDemocracia.$inject = ['APP'];

    function panelEDemocracia(APP) {
        var directive = {
            restrict: 'E',
            scope:{},
            templateUrl: APP.url + 'panels/panel-e_democracia/panel-e_democracia.html',
            controller: panelEDemocraciaController,
            controllerAs: 'vm'
        };
        
        panelEDemocraciaController.$inject = ['wsRequestService', '$window'];

        function panelEDemocraciaController(wsRequestService, $window){
            var vm = this;
            vm.list = [];
            vm.goTo = goTo;
            vm.actFilter = actFilter;
            vm.customFilter;
            vm.loadingList;
            vm.loadingListMessage = 'Carregando a Lista de Atividades'
            
            controllerInit();

            function controllerInit(){
                vm.loadingList = true;
                getItems().then(ok).catch(_errorList)

                function ok(data){
                    vm.list = data;
                    actFilter('audiencias_interativas');
                    vm.loadingList = false;
                }
            }

            function goTo(url){
                $window.location.href = url;
            }

            function actFilter(categoria){
                var dropdown = angular.element(document.getElementById('filter-dropdown-edemo'));
                dropdown.removeClass('act');
                vm.customFilter = {
                    categoria: categoria
                };
            }

            function getItems(){
                return wsRequestService.getEDemocraciaList();
            }

            function _errorList(e){
                vm.list = [{error:'Não foi possível carregar a lista de atividades'}];
                console.log(e);
            }


        }

        return directive;
    }

})();