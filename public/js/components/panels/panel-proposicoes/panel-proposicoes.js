(function () {
    'use strict';

    angular.module('panelProposicoes', ['wsRequest', 'gps', 'browserStorage'])
})();

(function () {
    'use strict';

    angular
        .module('panelProposicoes')
        .directive('panelProposicoes', panelProposicoes);

    panelProposicoes.$inject = ['APP'];

    function panelProposicoes(APP) {
        var directive = {
            restrict: 'EA',
            scope: {},
            templateUrl: APP.url + 'panels/panel-proposicoes/panel-proposicoes.html',
            controller:panelProposicoesController,
            controllerAs:'vm'
        };
        

        panelProposicoesController.$inject = ['gpsService', 'wsRequestService', 'localStorageService', '$scope', '$timeout'];

        function panelProposicoesController(gpsService, wsRequestService, localStorageService, $scope, $timeout){
            var vm = this;
            const PANELNAME = 'proposicoes'
            var defaultListMessage = 'Carregando Lista de Proposições'; 
            var defaultViewMessage = 'Carregando Proposição';
            vm.proposições = [];
            vm.view = {};
            vm.viewId;
            vm.getDetail = getDetail;
            vm.isSelected = isSelected
            vm.loadingList;
            vm.loadingListMessage = defaultListMessage;
            vm.loadingView;
            vm.loadingViewMessage = defaultViewMessage
            vm.reloadButton;
            vm.tipo = {value:'', id:''}
            
            var configs;

            const MINLENGTH = 2;
            const DELAYTOREQUEST = 1000;
            var promise;
            $scope.$watch('inputSearch', function(value){
                $timeout.cancel(promise)
                if(value && value.length > MINLENGTH){
                    promise = $timeout(function(){
                        vm.loadingList = true;
                        _requestProposicoesData(value).then(proposicoesData).catch(_errorList);
                    }, DELAYTOREQUEST);
                    function proposicoesData(data){
                        vm.proposicoes = data;
                        vm.loadingList = false;
                    }
                }
            });

            function _requestProposicoesData(value){
                return wsRequestService.getProposicoesList(value);
            }
            
            
            
            function active() {
                //_setMessage('list', 'Carregando Configurações');
                //localStorageService.getPanelSettings(PANELNAME).then(afterLoadConfigs);
            }

            active();

            function afterLoadConfigs(settings){
                configs = settings;
                vm.isRecordUf = configs.uf || false;
                getUfsList().then(setUfsList).catch(_errorList);
            }

            function getDetail(id) {
                vm.viewId = id;
                getProposicao(id);
            }

            function getProposicoes(params){
                return _getProposicoes(params).then(_renderProposicoes).catch(_errorList);
            }

            function getProposicao(id) {
                return _getProposicao(id).then(_renderProposicao).catch(_errorView);
            }

            function _getProposicoes(params) {
                _setMessage('list');
                return wsRequestService.getProposicoes(params);
            }

            function _getProposicao(id){
                _setMessage('view');
                return wsRequestService.getProposicao(id);
            }

            function _renderProposicoes(data){
                vm.proposicoes = data;
                vm.loadingList = false;
            }

            function _renderProposicao(data){
                console.log(data);
                vm.view = data;
                vm.loadingView = false;
            }

            function isSelected(id) {
                return id === vm.viewId;
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

            function _errorList(e){
                vm.proposicoes = [{error: 'Não foi possível carregar Lista de Proposições.'}];
                vm.loadingList = false;
                console.log(e);
            }

            function _errorView(e) {
                vm.view = [{error:'Não foi possível carregar dados da Proposição.'}];
                vm.loadingView = false;
            }
        }

        return directive;
    }
})();
