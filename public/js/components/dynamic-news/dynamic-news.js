(function () {
    'use strict';

    angular.module('dynamicNews', []);
})();

(function () {
    'use strict';

    angular
        .module('dynamicNews')
        .directive('dynamicNew', dynamicNew);

    dynamicNew.$inject = ['$http', '$rootScope'];

    function dynamicNew($http, $rootScope) {
        var directive = {
            link: link,
            scope: {},
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var thisCategory = attrs.category;
            var thisOption = attrs.option;
            var thisType = attrs.type;
            var thisElement = element.children();
            var els, img, box, hat, title, text, dataCat, oldUrl, oldTitle;
            var replacedNew;
            var oldFav = {};


            scope.$on('activeDynamicNews', function (ev, data) {
                var category = data.category;
                var option = data.option;
                if (option === thisOption) {
                    if (category === false) return restore();
                    return active(category);
                }

            });

            function active(category) {
                replacedNew = angular.copy(thisElement);
                els = angular.copy(thisElement);
                img = angular.element(els[0]).children()[0];
                box = angular.element(els[1]).children();
                for (var i = 0; i < box.length; i++) {
                    var className = box[i].className;
                    var angElement = angular.element(box[i]);
                    switch (className) {
                        case 'hat-text':
                            hat = angElement;
                            break;
                        case 'title':
                            title = angElement;
                            break;
                        case 'text':
                            text = angElement;
                            break;
                        case 'date-category':
                            dataCat = angElement;
                            break;
                    }
                }
                oldUrl = oldUrl || angular.copy(attrs.href);
                _getCategoryNews(category, thisType).then(okNews).catch(error);
            }

            function restore() {
                if (replacedNew) {
                    element.html(replacedNew);
                    $rootScope.$broadcast('refrashFavorites', oldFav);
                }
            }

            function okNews(news) {
                if(!news) return;
                _LoadingAnimation(element);
                if(img){
                    img.src = news.img;
                    img.alt = news.alt;
                }
                if(hat) news.hat ? hat.html('<span>' + news.hat + '</span>'): hat.text('-');
                if(title) title.text(news.title);
                if(text) text.text(news.text);
                if(dataCat) dataCat.html('<span>' + news.category + '</span><span>' + news.date + '</span>');
                element.html(els);
                attrs.$set('href', news.url);
                var favorite = element.parent().find('favorites-button');
                oldTitle = angular.copy(favorite.attr('title'));
                favorite.attr('url', news.url);
                favorite.attr('title', news.title);
                oldFav = { url: { old: news.url, new: oldUrl }, title: oldTitle } //Armazenar para o rollback
                $rootScope.$broadcast('refrashFavorites', { url: { old: oldUrl, new: news.url }, title: news.title });
            }

        }

        function _getCategoryNews(category, type) {
            return $http.get('../server_simulator/dynamic-news/news.json').then(okData).catch(error);
            function okData(data) {
                var ret = data.data.dados;
                var newCategory = ret[category];
                if(!newCategory) return false;
                if (type) newCategory = newCategory['opt' + type];
                return newCategory;
            }

        }

        function error(e) {
            console.log(e);
        }

        function _LoadingAnimation(element) {
            element.html(`<span class="loading">Carregando</span>`)
        }


    }

})();