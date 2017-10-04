(function () {
    'use strict';

    angular.module('panelTransmissoes', []);
})();

(function () {
    'use strict';

    angular
        .module ('panelTransmissoes')
        .directive ('panelTransmissoes', panelTransmissoes);

    panelTransmissoes.$inject = ['APP'];

    function panelTransmissoes(APP) {
        var directive = {
            restrict: 'E',
            scope:{},
            templateUrl: APP.url + 'panels/panel-transmissoes/panel-transmissoes.html',
            controller:panelTransmissoesController,
            controllerAs:'vm'
        };

        panelTransmissoesController.$inject = ['$http', '$q', '$sce', '$timeout'];

        function panelTransmissoesController($http, $q, $sce, $timeout){
            var vm = this;
            vm.transmissoes = [];
            vm.media = '';
            vm.mediaId;
            vm.getMedia = getMedia;
            vm.isSelected = isSelected;
            vm.loadingList;
            vm.loadingListMessage = 'Carregando Lista de Transmissões...';
            vm.loadingMedia;
            vm.loadingViewMessage = 'Carregando Mídia...';

            active();

            function active(){
                getTransmissoesList();
            }

            function getTransmissoesList(){
                return _getTransmissoesList().then(okTransmissoes).catch(_error);

                function okTransmissoes(data){
                    vm.transmissoes = data.data;
                }
            }

            function getMedia(url){
                vm.mediaId = url;
                vm.loadingMedia = true;
                _getMedia(url).then(okMedia).catch(_error);

                function okMedia(url){
                    vm.media = $sce.trustAsResourceUrl(url);
                    $timeout(function(){
                        vm.loadingMedia = false;
                    }, 500);
                }
            }

            function isSelected(id){
                return id === vm.mediaId;
            }

            function _getTransmissoesList(){
                return $http.get(APP.mockServer + 'transmissoes/transmissoes.json');
            }

            function _getMedia(url){
                return $q.resolve(url);
            }

            function _error(e){
                console.log(e);
            }

        }


        return directive;
    }

})();