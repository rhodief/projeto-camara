(function () {
    'use strict';

    angular
        .module ('meuEspacoCamara')
        .directive ('favoritesButton', directive);

    directive.$inject = [];

    function directive() {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            restrict: 'E',
            scope: {
                url:'@',
                title: '@',
                visible:'@',
                position:'@'
            },
            template: '<button class="favorite-button" ng-style="vm.block" ng-class="{act: vm.included, show:vm.included, right:vm.position}" ng-click="vm.toggleInclude(vm.url, vm.title)">{{vm.included ? "Favoritado" : "Não Favoritado. Favoritar?"}}</button>',
            controller: favoritesButtonController,
            controllerAs:'vm'
        };
        
        return directive;
    }
    favoritesButtonController.$inject = ['localStorageService', '$scope'];
    
    function favoritesButtonController(localStorageService, $scope){
        var vm = this;
        vm.included;
        vm.toggleInclude = toggleInclude;
        vm.url = $scope.url || null;
        vm.title = $scope.title || null;
        vm.block = $scope.visible ? {display:'block'} : {};
        vm.position = $scope.position || '';
        $scope.$on('refrashFavorites', function(ev, data){
            if(data){
                _refrashFromDynamicNews(data);
                active();
            }
        })

        active();

        function active(){
            _isIncluded(vm.url)
                .then(function(data){
                    vm.included = data;
                })
                .catch(function(e){
                    console.log(e)
                });
        }

        function toggleInclude(url, title){
            //broadCast Message to refresh Panel
            if(vm.included){
                _desableFavorite(url);
            }else{
                _enableFavorite(url, title);
            }
        }

        function _isIncluded(url){
            return localStorageService.isFavorite(url);
        }
       
        function _desableFavorite(url){
            localStorageService.removeFavorite(url);
            vm.included = false;
        }

        function _enableFavorite(url, title){
            localStorageService.addFavorite(url, title);
            vm.included = true;
        }

        function _refrashFromDynamicNews(data){
            if(data.url && data.url.old === vm.url){
                vm.url = data.url.new;
                vm.title = data.title;
            }
        }
    }

})();