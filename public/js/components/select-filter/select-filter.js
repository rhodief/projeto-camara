(function () {
    'use strict';

    angular.module('selectFilter', []);
})();

(function () {
    'use strict';

    angular
        .module ('selectFilter')
        .directive ('selectFilter', selectFilter);

    selectFilter.$inject = ['$filter', '$document'];

    function selectFilter($filter, $document) {
        var directive = {
            link: link,
            scope:{
                ngModel:'=',
                selectFilter:'@',
                openLink: "@",
                name: "@"
            },
            restrict: 'A',
            template:'<input type="hidden" name="{{name}}" id="{{name}}-id"><input type="search" placeholder="{{placeholder}}" ng-model="input.value"><button class="toggle-dropdown" type="button" ng-click="toggle()">&#9660;</button><div class="dropdown shadow"><div ng-repeat="data in datas | filter:input.value"><a ng-href="{{openLink ? data.link : \'#\'}}" ng-click="select(data.nome,data.cod)">{{data.nome}}</a></div></div><div ng-if=""></div>'
        };
        return directive;

        function link(scope, element, attrs) {
            var panel;
            var datas = [
                {"nome": "PL", "link":"https://www.teste.com", "cod":1},
                {"nome": "PLS", "link":"#", "cod":2},
                {"nome": "PLP", "link":"#", "cod":3},
                {"nome": "PEC", "link":"#", "cod":4}
            ];
            var minLengh = scope.minLengh || 2;
            var opened = false;
            var passLabel;

            scope.placeholder = attrs.placeholder || '';
            //scope.class = attrs.class || '';
            scope.input = scope.ngModel;
            passLabel = scope.ngModel.value || false;
            
            scope.select = select;
            scope.toggle = toggle;

           scope.$watch('input.value', function(value){
               if(value && passLabel !== value){
                    if(value && value.length >= minLengh){
                        open();
                    }else if(!value || value.length < 1){
                        close();
                    }
                }
            });

            function select (value, index){
                if(!scope.openLink){
                    scope.input.value = value;
                    $document[0].getElementById(scope.name + '-id').value = index;
                    passLabel = value
                    scope.ngModel = {value:value, id:index}
                    close();
                }
            }

            function toggle(){
                if(opened){
                    close();
                }else{
                    scope.input = blankInput();
                    open();
                    
                }
            }

            function open(){
                scope.datas = datas;
                opened = true;
            }

            function close(){
                scope.datas = [];
                opened = false;
            }

            function blankInput(){
                return {id:'', value:''};
            }

        }
    }

})();