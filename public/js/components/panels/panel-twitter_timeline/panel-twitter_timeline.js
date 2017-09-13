(function () {
    'use strict';

    angular.module('panelTwitterTimeline', []);
})();

(function () {
    'use strict';

    angular
        .module ('panelTwitterTimeline')
        .directive ('panelTwitterTimeline', panelTwitterTimeline);

    panelTwitterTimeline.$inject = ['$compile'];

    function panelTwitterTimeline($compile) {
        var directive = {
            link: link,
            scope:{},
            restrict: 'E'
        };
        

        function link(scope, element, attrs) {
            console.log('aqui');
            var template = '<div class="twitterwrapper"><div><a class="twitter-timeline" href="https://twitter.com/camaradeputados/likes">Tweets Liked by @TwitterDev</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div></div>';
            var newElement = $compile(template)(scope);
            element.append(newElement);
        }

        return directive;
    }

})();
