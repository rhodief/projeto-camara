(function () {
    'use strict';

    angular.module('panelTvCamara', []);
})();

(function () {
    'use strict';

    angular
        .module ('panelTvCamara')
        .directive ('panelTvCamara', panelTvCamara);

    panelTvCamara.$inject = ['$compile'];

    function panelTvCamara($compile) {
        var directive = {
            link: link,
            restrict: 'E'
        };
        

        function link(scope, element, attrs) {
            var params;
            var parse;
            var url = '';
            if(attrs.params) params = attrs.params.split("'").join('"');
            if(params){
                parse = JSON.parse(params);
                if(parse && parse.url){
                    url = parse.url;
                }
            }
            var template = '<div class="panel"><iframe width="300" height="300" ng-src="' + url + '" frameborder="0" allowfullscreen>{{url}}</iframe></div>';
            var newElement = $compile(template)(scope);
            element.append(newElement);
        }

        return directive;
    }

})();