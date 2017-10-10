(function () {
    'use strict';

    angular.module('selecter', []);
})();

(function () {
    'use strict';

    angular
        .module('selecter')
        .directive('selecter', selecter);

    selecter.$inject = ['$window'];

    function selecter($window) {
        var directive = {
            restrict: 'E',
            scope: {
                ngModel: '=',
                buttonClass: '@',
                title: '@'
            },
            controller: selecterController,
            controllerAs: 'vm',
            template: `<span>{{ngModel.value}}</span>
            <div class="options">
            <button ng-class="buttonClass" ng-class="{act: vm.isOpened}" ng-click="vm.toggle()" title="{{title}}">{{buttonClass}}</button>
            <div class="box-list shadow" ng-style="vm.openList">
                <button ng-click="vm.close()" class="">x</button>
                <p class="title-list">{{title}}</p>
                <p class="form"><input type="search" ng-model="vm.filter"></p>
                <ul class="news-list">
                    <li ng-repeat="category in vm.list | filter:vm.filter">
                        <a href="" ng-click="vm.action(category)">{{category.value}}</a>
                    </li>
                </ul>
            </div>
        </div>`
        };

        return directive;
    }

    selecterController.$inject = ['$scope'];

    function selecterController($scope) {

        var vm = this;
        var list = [
            {
                index: false,
                value: 'Padrão',
                url: ''
            },
            {
                index: 'administracao_publica',
                value: 'Administração Pública',
                url: '',
            },
            {
                index: 'agropecuaria',
                value: 'Agropecuária',
                url: '',
            },
            {
                index: 'assistencia_social',
                value: 'Assistência Social',
                url: '',
            },
            {
                index: 'cidades',
                value: 'Cidades',
                url: '',
            },
            {
                index: 'ciencia_e_tecnologia',
                value: 'Ciência e Tecnologia',
                url: '',
            },
            {
                index: 'comunicacao',
                value: 'Comunicação',
                url: '',
            },
            {
                index: 'consumidor',
                value: 'Consumidor',
                url: '',
            },
            {
                index: 'direito_e_justica',
                value: 'Direito e Justiça',
                url: '',
            },
            {
                index: 'direitos_humanos',
                value: 'Direitos Humanos',
                url: '',
            },
            {
                index: 'economias',
                value: 'Economia',
                url: '',
            },
            {
                index: 'educacao_e_cultura',
                value: 'Educação e Cultura',
                url: '',
            },
            {
                index: 'esportes',
                value: 'Esportes',
                url: '',
            },
            {
                index: 'industria_e_comercio',
                value: 'Indústria e Comércio',
                url: '',
            },
            {
                index: 'institucional',
                value: 'Institucional',
                url: '',
            },
            {
                index: '',
                value: 'Meio Ambiente',
                url: '',
            },
            {
                index: 'politica',
                value: 'Política',
                url: '',
            },
            {
                index: 'relacoes_exteriores',
                value: 'Relações Exteriores',
                url: '',
            },
            {
                index: 'saude',
                value: 'Saúde',
                url: '',
            },
            {
                index: 'seguranca',
                value: 'Segurança',
                url: '',
            },
            {
                index: 'trabalho_e_previdencia',
                value: 'Trabalho e Previdência',
                url: '',
            },
            {
                index: 'transporte_e_transito',
                value: 'Transporte e Trânsito',
                url: '',
            },
            {
                index: 'turismo',
                value: 'Turismo',
                url: '',
            }
        ];

        vm.isOpened = false;
        vm.list = list;
        vm.action = action;
        vm.toggle = toggle;
        vm.close = close

        function toggle(){
            if(vm.isOpened){
                close();
            }else{
                open();
            }
        }

        function action(index) {
            $scope.ngModel = index;
            close();
        }

        function open() {
            vm.openList = { display: 'block' }
            vm.isOpened = true;
            vm.filter = '';
        }

        function close(){
            vm.openList = { display: 'none' }
            vm.isOpened = false;
        }





    }

})();