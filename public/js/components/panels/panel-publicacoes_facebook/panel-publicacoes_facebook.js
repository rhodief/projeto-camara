(function () {
    'use strict';

    angular.module('panelPublicacoesFacebook', []);
})();

(function () {
    'use strict';

    angular
        .module ('panelPublicacoesFacebook')
        .directive ('panelPublicacoesFacebook', panelPublicacoesFacebook);

    panelPublicacoesFacebook.$inject = ['$compile'];

    function panelPublicacoesFacebook($compile) {
        var directive = {
            link: link,
            scope:{},
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
            var template = '<div class="facebookWrapper"><iframe width="500" height="665" ng-src="' + url + '" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div><span class="box-text"><span class="title">' + text + '</span><span class="date-category"><span>TV Câmara</span></span></span>';
            var newElement = $compile(template)(scope);
            element.append(newElement);
        }

        return directive;
    }

})();
