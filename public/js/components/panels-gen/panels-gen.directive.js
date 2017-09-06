(function () {
    'use strict';

    angular
        .module('panelsGen')
        .directive('panelsGen', panelsGen);

    panelsGen.$inject = ['$compile', '$ocLazyLoad'];

    function panelsGen($compile, $ocLazyLoad) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var newElement, section, pos;

            attrs.$set('class', 'panel-wrapper');

            function active() {
                verifyCatAndPosAttr()
            }

            active();

            scope.$on('TogglePanel', function (ev, data) {
                _verifySectionAndPos(data, _buildPanel);
            });

            function _verifySectionAndPos(data, fn) {
                if (data && data.sectionName === section && data.pos == pos) fn(data);
            }

            function _buildPanel(data) {
                var params = _buildNameAndUrl(data);
                lazyLoad(params.url)
                    .then(ok)
                    .catch(fail);

                function ok() {
                    if (data.activate) {
                        newElement = $compile(params.element)(scope);
                        element.append(newElement);
                    } else {
                        if (newElement) newElement.remove();
                    }
                }

                function fail(error) {
                    console.log(error);
                }
            }

            function lazyLoad(url) {
                return $ocLazyLoad.load({
                    files: [
                        url,
                        'bower_components/angular-pickadate/dist/angular-pickadate.css',
                        'bower_components/angular-pickadate/dist/angular-pickadate.js'
                    ]
                });
            }

            function _buildNameAndUrl(data) {
                var local = 'js/components/panels/';
                var name = 'panel-' + data.panelName;
                var fullLocal = local + name + '/' + name + '.js';
                var directiveName = buildNameDirective(data.panelName);
                var element = '<' + name + ' section="' + data.sectionName + '" pos="' + data.pos + '"' + ' ></' + name + '>';
                return {
                    url: fullLocal,
                    element: element
                }
            }

            function buildNameDirective(name) {
                var splt = name.split('_');
                var directive = 'panel' + capitalizeFirstLetter(splt[0]);
                for (let i = 1; i < splt.length; i++) {
                    directive += capitalizeFirstLetter(splt[i]);
                }
                directive += 'Controller';
                return directive;
            }

            function verifyCatAndPosAttr() {
                if (!attrs.section || !attrs.pos) throw new Error('Missing CAT or POS params!');
                section = attrs.section;
                pos = attrs.pos;
            }

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }
    }

})();