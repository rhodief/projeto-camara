(function () {
    'use strict';

    angular.module('panelAgenda', ['pickadate', 'wsRequest'])
        .config(configConfig);

    configConfig.$inject = ['pickadateI18nProvider'];

    function configConfig(pickadateI18nProvider) {
        pickadateI18nProvider.translations = {
            prev: "Anterior",
            next: "Próximo"
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('panelAgenda')
        .directive('panelAgenda', panelAgenda);

    panelAgenda.$inject = ['APP'];

    function panelAgenda(APP) {
        var directive = {
            restrict: 'EA',
            vm: {},
            templateUrl: APP.url + 'panels/panel-agenda/panel-agenda.html',
            controller: panelAgendaController,
            controllerAs: 'vm'
        };
        return directive;
    }

    panelAgendaController.$inject = ['$scope', '$filter', 'wsRequestService', '$location', '$anchorScroll', '$timeout'];

    function panelAgendaController($scope, $filter, wsRequestService, $location, $anchorScroll, $timeout) {
        var vm = this;
        vm.date;
        vm.agenda = [];
        vm.isSelected = isSelected
        vm.viewId;
        vm.getDetail = getDetail;
        vm.detail;
        vm.loadingList;
        vm.loadingListMessage = 'Carregando a Lista';
        vm.loadingView;
        vm.loadingViewMessage = 'Carregando a View!!!';
        vm.reloadButton;
        vm.customFilter = undefined;
        vm.actFilter = actFilter;

        $scope.$watch('vm.date', watchDate);
        

        activate();

        function activate() {
            vm.date = setToday();
        }

        function watchDate(date, teste) {
            if (date) {
                getAgenda(date);
            }
        }

        function setToday() {
            return $filter('date')(new Date(), 'yyyy-MM-dd')
        }

        function getAgenda(date) {
            vm.loadingList = true;
            _getAgenda(vm.date).then(okAgenda).catch(errorAgenda);

            function okAgenda(data) {
                vm.agenda = data;
                vm.loadingList = false;
                //Scroll
                //gotTo('7');
                //Scroll
            }

            function errorAgenda(erro) {
                vm.loadingListMessage = 'Não foi possível Carregar a Lista';
                vm.reloadButton = true;
                _error(erro);
            }
        }

        function isSelected(id) {
            return id === vm.viewId;
        }

        function getDetail(id) {
            vm.viewId = id;
            vm.loadingView = true;
            _getDetail(id).then(okDetail).catch(errorDetail);

            function okDetail(data) {
                vm.detail = data;
                vm.loadingView = false;
                console.log(data);
            }
            function errorDetail(erro) {
                vm.loadingViewMessage = 'Não Foi Possível Carregar os Detalhes do Evento, Recarregue a Página';
                _error(erro);
            }
        }

        function _getAgenda(date) {
            return wsRequestService.getAgenda(date);
        }

        function _getDetail(id, idOrg, date) {
            return wsRequestService.getAgendaDetail(id, idOrg, date);
        }

        function findFirst(array, fieldSearch, valueSearch){
            angular.forEach(array, function(v){
                if(v[fieldSearch] === valueSearch){
                    return v.$$hashKey;
                }
            })
        }

        function actFilter(value){
            var dropdown = angular.element(document.getElementById('filter-dropdown'));
            dropdown.removeClass('act');
            vm.customFilter = {
                $: value
            };
        }

        //Scroll - O Scroll tem que ocorrer na abertura, então o jquery controlla o relamento ou o angular a abertura....
        function gotTo(x){
            var newHash = 'anchor-' + x;
            console.log($location.hash());
            console.log(newHash);
            $timeout(function(){
                $location.hash(newHash);
                $anchorScroll();
                console.log('eu');
            }, 5000)
        }

        function _error(e) {
            console.log(e);
        }
    }


})();

