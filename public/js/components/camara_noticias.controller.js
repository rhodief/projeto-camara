(function(){
    'use strict';

    angular
        .module('app')
        .controller('camaraNoticiasController', camaraNoticiasController)

    camaraNoticiasController.$inject = ['$scope', 'localStorageService', '$rootScope'];

    function camaraNoticiasController($scope, localStorageService, $rootScope) {
        /* jshint validthis:true */
        var vm = this;
        vm.themesList = [];
        vm.opt = {
            op1: { value: 'Relações Exteriores', index:"relacoes_exteriores"},
            op2: { value: 'Administração Pública', index:'administracao_publica', url:''},
            op3: { value: 'Direitos Humanos' , index:'direitos_humanos'},
            op4: { value: 'Economia', index:'economia' }
        };
        
        $scope.$watch('vm.opt', function (newTerm, oldTerm) {
            if (newTerm) {
                var changedArray = _getPropChanged(newTerm, oldTerm);
                for (var i = 0; i < changedArray.length; i++) {
                    _notifyDynamicNews(changedArray[i]);
                    _setTheme(changedArray[i]);
                }

            }
        }, true);

        activate();

        function activate() {
            getThemesList().then(getThemes);
         }

         function getThemes() {
            _getThemes().then(okThemes).catch(_error);
            function okThemes(themes) {
                angular.forEach(themes, function (v, i) {
                    if(v){
                        vm.opt[i] = _getFullObjList(v, vm.themesList);
                        _notifyDynamicNews({ category: v, option: _getOp(i) });
                    }
                });
            }
            function _error(e) {
                console.log(e);
            }
        }

        function getThemesList() {
            return _getThemesList().then(function (themesList) {
                vm.themesList = themesList;
            });
        }

        function _getThemesList() {
            return localStorageService.getThemesList();
        }

        function _setTheme(obj) {
            return localStorageService.setTheme(obj);
        }

        function _getThemes() {
            return localStorageService.getThemes();
        }

        function _getFullObjList(index, list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].index === index) {
                    return list[i];
                }
            }
        }

        function _notifyDynamicNews(obj) {
            $rootScope.$broadcast('activeDynamicNews', obj);
        }

        function _getOp(op) {
            return op.split('op')[1];
        }

        function _getPropChanged(newTerm, oldTerm) {
            var ret = [];
            angular.forEach(newTerm, function (v, i) {
                if (oldTerm[i] && oldTerm[i].index !== v.index) {
                    ret.push({ category: v.index, option: _getOp(i) });
                }
            })
            return ret;
        }
    }
})();