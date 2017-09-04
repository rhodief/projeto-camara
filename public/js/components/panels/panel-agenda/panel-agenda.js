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

    panelAgendaController.$inject = ['$scope', '$filter', 'wsRequestService'];

    function panelAgendaController($scope, $filter, wsRequestService) {
        var vm = this;
        vm.date;
        vm.agenda = [];
        vm.isSelected = isSelected
        vm.viewId;
        vm.getDetail = getDetail;
        vm.detail;
        
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
            _getAgenda(vm.date).then(okAgenda).catch(errorAgenda);

            function okAgenda(data) {
                vm.agenda = data;
            }

            function errorAgenda(erro) {
                _error(erro);
            }
        }

        function isSelected(id) {
            return id === vm.viewId;
        }

        function getDetail(id) {
            vm.viewId = id;
            _getDetail(id).then(okDetail).catch(errorDetail);

            function okDetail(data) {
                vm.detail = data;
            }
            function errorDetail(erro) {
                _error(erro);
            }
        }

        function _getAgenda(date) {
            return wsRequestService.getAgenda(date);
        }

        function _getDetail(id, idOrg, date) {
            return wsRequestService.getAgendaDetail(id, idOrg, date);
        }

        function _error(e) {
            console.log(e);
        }
    }


})();

