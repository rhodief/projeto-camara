(function () {
    'use strict';

    angular.module('dynamicNews', []);
})();

(function () {
    'use strict';

    angular
        .module ('dynamicNews')
        .directive ('dynamicNew', dynamicNew);

    dynamicNew.$inject = ['$http', '$rootScope'];

    function dynamicNew($http, $rootScope) {
        var directive = {
            link: link,
            scope:{},
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var thisCategory = attrs.category;
            var thisType = attrs.type;
            var thisElement = element.children();
            var els, img, box, title, text, dataCat, oldUrl;
            var replacedNew = angular.copy(thisElement);

           scope.$on('activeDynamicNews', function(ev, data){
               var category = data.category;
               var type = data.type;
               if(type === thisType){
                   if(category === false) return restore();
                   if(category === thisCategory) return active();
               }

            });

            function active(){
                els = angular.copy(thisElement);
                img = angular.element(els[0]).children()[0];
                box = angular.element(els[1]).children();
                title = angular.element(box[0]);
                text = angular.element(box[1]);
                dataCat = angular.element(box[2]);
                oldUrl = angular.copy(attrs.href);
                _LoadingAnimation(element);
                _getCategoryNews(thisCategory, thisType).then(okNews).catch(error);
            }

            function restore(){
                element.html(replacedNew);
            }

            function okNews(news){
                img.src = news.img;
                img.alt = news.alt;
                title.text(news.title);
                text.text(news.text);
                dataCat.html('<span>' + news.category + '</span><span>' + news.date + '</span>');
                element.html(els);
                attrs.$set('href', news.url);
                var favorite = element.parent().find('favorites-button');
                favorite.attr('url', news.url);
                favorite.attr('title', news.title)
                $rootScope.$broadcast('refrashFavorites', {url:{old:oldUrl, new:news.url}, title:news.title});
            }

        }

        function _getCategoryNews(category, type){
            return $http.get('../server_simulator/dynamic-news/news.json').then(okData).catch(error);
            function okData(data){
                var ret = data.data.dados;
                var newCategory = ret[category];
                if(type) newCategory = newCategory['opt' + type];
                return newCategory;
            }
            
        }

        function error(e){
            console.log(e);
        }

        function _LoadingAnimation(element){
            element.html(`<span class="loading">Carregando</span>`)
        }

        
    }

})();