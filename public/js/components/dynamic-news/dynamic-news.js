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
            var thisOption = attrs.option;
            var thisType = attrs.type;
            var thisElement = element.children();
            var els, img, box, title, text, dataCat, oldUrl, oldTitle;
            var replacedNew;
            var oldFav = {};
            

           scope.$on('activeDynamicNews', function(ev, data){
               var category = data.category;
               var option = data.option;
               if(option === thisOption){
                   if(category === false) return restore();
                   return active(category);
               }

            });

            function active(category){
                replacedNew = angular.copy(thisElement);
                els = angular.copy(thisElement);
                img = angular.element(els[0]).children()[0];
                box = angular.element(els[1]).children();
                title = angular.element(box[0]);
                text = angular.element(box[1]);
                dataCat = angular.element(box[2]);
                oldUrl = oldUrl || angular.copy(attrs.href);
                _LoadingAnimation(element);
                _getCategoryNews(category, thisType).then(okNews).catch(error);
            }

            function restore(){
                if(replacedNew){
                    element.html(replacedNew);
                    $rootScope.$broadcast('refrashFavorites', oldFav);
                }
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
                oldTitle = angular.copy(favorite.attr('title'));
                favorite.attr('url', news.url);
                favorite.attr('title', news.title);
                oldFav = {url:{old:news.url, new:oldUrl}, title:oldTitle} //Armazenar para o rollback
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