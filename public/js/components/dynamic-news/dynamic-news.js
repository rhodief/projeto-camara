(function () {
    'use strict';

    angular.module('dynamicNews', []);
})();

(function () {
    'use strict';

    angular
        .module ('dynamicNews')
        .directive ('dynamicNew', dynamicNew);

    dynamicNew.$inject = ['$http'];

    function dynamicNew($http) {
        var directive = {
            link: link,
            scope:{
                /*
                category:'=',
                type:'=',
                href:'=',
                dynamicNew:'='
                */
            },
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var request_category = 'institucional';
            var type = '2';
            
            var els = element.children();
            var img = angular.element(els[0]).children()[0];
            var box = angular.element(els[1]).children();
            var title = angular.element(box[0]);
            var text = angular.element(box[1]);
            var dataCat = angular.element(box[2]);
            
            //element.html(`<span class="loading">Carregando</span>`)
            _getCategoryNews(request_category, type).then(okNews).catch(error);

            function okNews(news){
                img.src = news.img;
                title.text(news.title);
                text.text(news.text);
                dataCat.html('<span>' + news.category + '</span><span>' + news.date + '</span>');    
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

        
    }

})();