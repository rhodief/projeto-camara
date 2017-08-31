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
                selectFilter:'@',
                openLink: "@",
                name: "@"
            },
            restrict: 'A',
            template:'<input type="hidden" name="{{name}}" id="{{name}}-id"><input type="text" placeholder="{{placeholder}}" ng-model="input.name"><button type="button" ng-click="toggle()">V</button><div style="position:absolute;top:100%;left:0;width:100%"><div ng-repeat="data in datas | filter:input.name"><a ng-href="{{openLink ? data.link : \'#\'}}" ng-click="select(data.nome,data.cod)">{{data.nome}}</a></div></div><div ng-if=""></div>'
        };
        return directive;

        function link(scope, element, attrs) {
            var panel;
            var datas = [
                {"nome": "Rhodie André Ferreira (PZ/DF)", "link":"https://www.teste.com", "cod":1},
                {"nome": "Jhonatan Cordeiro (PFS/SC)", "link":"#", "cod":2},
                {"nome": "Suzi Maria (PZ/SC)", "link":"#", "cod":3},
                {"nome": "Felipe Cortez (PFS/SC)", "link":"#", "cod":4}
            ];
            var minLengh = scope.minLengh || 2;
            var opened = false;
            var passLabel;

            scope.placeholder = attrs.placeholder || '';
            //scope.class = attrs.class || '';
            scope.input = {name:''};
            
            scope.select = select;
            scope.toggle = toggle;

           scope.$watch('input.name', function(value){
               console.log(value);
                if(passLabel !== value){
                    if(value && value.length >= minLengh){
                        open();
                    }else if(!value || value.length < 1){
                        close();
                    }
                }
            });

            function select (label, value){
                if(!scope.openLink){
                    scope.input.name = label;
                    $document[0].getElementById(scope.name + '-id').value = value;
                    passLabel = label
                    close();
                }
            }

            function toggle(){
                opened ? close() : open();
            }

            function open(){
                scope.datas = datas;
                opened = true;
            }

            function close(){
                scope.datas = [];
                opened = false;
            }
        }
    }

})();