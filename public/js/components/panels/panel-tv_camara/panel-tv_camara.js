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
            var text = '';
            if(attrs.params) params = attrs.params.split("'").join('"');
            if(params){
                parse = JSON.parse(params);
                if(parse && parse.url){
                    url = parse.url;
                    text = parse.text;
                }
            }
            var template = '<div class="videowrapper"><iframe width="300" height="300" ng-src="' + url + '" frameborder="0" allowfullscreen>{{url}}</iframe></div><span class="box-text"><span class="title">' + text + '</span><span class="date-category"><span>TV Câmara</span></span></span>';
            var newElement = $compile(template)(scope);
            element.append(newElement);
        }

        return directive;
    }

})();