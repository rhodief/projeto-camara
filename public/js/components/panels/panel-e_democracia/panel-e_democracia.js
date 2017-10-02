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

(function () {
    'use strict';

    angular
        .module ('panelEDemocracia')
        .directive ('imgLogo', imgLogo);

    imgLogo.$inject = ['$window'];

    function imgLogo($window) {
        var directive = {
            link: link,
            scope:{ngModel:"="},
            restrict: 'EA',
            template: '<img class="icon" style="width:57px" ng-src="img/layout/logo-{{logo}}.svg" alt="{{alt}}" class="img-color-change">'
        };
        return directive;

        function link(scope, element, attrs) {
            var type = scope.ngModel;
            switch(type){
                case 'audiencias_interativas':
                scope.logo = 'audiencias-publicas';
                scope.alt = 'Audiências Interativas';
                break;
                case 'wikilegis':
                scope.logo = 'wikilegis';
                scope.alt = 'Wikilegis';
                break;
                case 'expressao':
                scope.logo = 'expressao';
                scope.alt = 'Expressão';
                break;
                case 'pauta_participativa':
                scope.logo = 'pauta-participativa';
                scope.alt = 'Pauta Participativa';
                break;
            }
        }
    }

})();