(function () {
    'use strict';

    angular.module('search', []);
})();

(function(){
    'use strict';

    angular
        .module('search')
        .controller('searchController', searchController)

    searchController.$inject = ['$location'];

    function searchController($location) {
        /* jshint validthis:true */
        var vm = this;

        vm.lookup = lookup;

        function lookup(){
            console.log('lookup');
        }
    }
})();