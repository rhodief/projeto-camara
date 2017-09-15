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
            scope: {},
            template: '<button class="favorite-button" ng-click="vm.toggleInclude()">{{vm.included ? "Favoritado" : "Não Favoritado. Favoritar?"}}</button>',
            controller: favoritesButtonController,
            controllerAs:'vm'
        };
        
        return directive;
    }
    favoritesButtonController.$inject = ['localStorageService'];
    
    function favoritesButtonController(localStorageService){
        var vm = this;
        vm.included;
        vm.toggleInclude = toggleInclude;

        active();

        function active(){
            _isIncluded()
                .then(function(data){
                    vm.included = data;
                })
                .catch(function(e){
                    console.log(e)
                });
        }

        function toggleInclude(){
            //broadCast Message to refresh Panel
            if(vm.included){
                _desableFavorite();
            }else{
                _enableFavorite();
            }
        }

        function _isIncluded(){
            return localStorageService.isFavorite();
        }
       
        function _desableFavorite(){
            localStorageService.removeFavorite();
            vm.included = false;
        }

        function _enableFavorite(){
            localStorageService.addFavorite();
            vm.included = true;
        }
    }

})();