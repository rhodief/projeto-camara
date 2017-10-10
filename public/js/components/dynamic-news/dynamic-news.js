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
            var items = {}
            
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
                items = {};
                items.els = angular.copy(thisElement);
                items.img = angular.element(items.els[0]).children()[0];
                items.box = angular.element(items.els[1]).children();
                items.title = angular.element(items.box[0]);
                items.text = angular.element(items.box[1]);
                items.dataCat = angular.element(items.box[2]);
                items.oldUrl = angular.copy(attrs.href);
                _LoadingAnimation(element);
                _getCategoryNews(thisCategory, thisType).then(okNews).catch(error);
            }

            function restore(){
                element.html(replacedNew);
                $rootScope.$broadcast('refrashFavorites', items.oldFav);
            }

            function okNews(news){
                items.img.src = news.img;
                items.img.alt = news.alt;
                items.title.text(news.title);
                items.text.text(news.text);
                items.dataCat.html('<span>' + news.category + '</span><span>' + news.date + '</span>');
                element.html(items.els);
                attrs.$set('href', news.url);
                var favorite = element.parent().find('favorites-button');
                items.oldTitle = angular.copy(favorite.attr('title'));
                favorite.attr('url', news.url);
                favorite.attr('title', news.title);
                items.oldFav = {url:{old:news.url, new:items.oldUrl}, title:items.oldTitle} //Armazenar para o rollback
                $rootScope.$broadcast('refrashFavorites', {url:{old:items.oldUrl, new:news.url}, title:news.title});
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