(function () {
    'use strict';

    angular
        .module('browserStorage')
        .factory('localStorageService', localStorageService)

    localStorageService.$inject = ['$q', 'LOCALSTORAGE', 'ERROR_MESSAGE'];

    function localStorageService($q, LOCALSTORAGE, ERROR_MESSAGE) {

        var service = {
            isKnown: isKnown,
            isEnabled: isEnabled,
            disableMescam:disableMescam,
            enableMescam:enableMescam,
            known: known,
            addPanel: addPanel,
            removePanel: removePanel,
            getPanels: getPanels,
            getFavorites: getFavorites,
            addFavorite: addFavorite,
            removeFavorite: removeFavorite,
            isFavorite: isFavorite,
            exportMescam: exportMescam
        };

        return service;

        function isKnown() {
            return _getAttr(LOCALSTORAGE.KNOWN);
        }

        function known(bool) {
            _setAttr(LOCALSTORAGE.KNOWN, bool);
            _setAttr(LOCALSTORAGE.PANELS_NAME, {});
            _setAttr(LOCALSTORAGE.SETTINGS, {});
            _setAttr(LOCALSTORAGE.FAVORITES, []);
        }

        function isEnabled(){
            return _getAttr(LOCALSTORAGE.DISABLED).then(ok);
            function ok(data){
                return !data;
            }
        }

        function disableMescam(){
            //known(); Para apagar os dados.
            _setAttr(LOCALSTORAGE.DISABLED, true);
        }

        function enableMescam(){
            _setAttr(LOCALSTORAGE.DISABLED, false);
        }

        function addPanel(panelName, configs) {
            configs = configs || {};
            _getPanels().then(found).catch(notFound);

            function found(data) {
                data[panelName] = { name: panelName, configs: configs }
                _setPanels(data);
            }

            function notFound(e) {
                configError();
            }
        }

        function removePanel(panelName) {
            _getPanels().then(found).catch(notFound);

            function found(data) {
                if (data[panelName] !== undefined) {
                    delete data[panelName];
                    _setPanels(data);
                }
            }

            function notFound() {
                configError();
            }
        }

        function getPanels() {
            return _getPanels();
        }

        function getFavorites() {
            return _getFavorites();
        }

        function addFavorite(Url, Title) {
            _getFavorites().then(okFav).catch(configError);

            function okFav(data) {
                var url = Url || _getCurrentPageUrl();
                var title = Title || _getCurrentTitle();
                var index = _findValueInIndexObj(url, 'url', data);
                var date = _getCurrentDate();
                var category = _getCategory(url);
                var obj = {
                    url: url,
                    category: category,
                    title: title,
                    date: date,
                    tag: []
                };
                if (index === -1) data.unshift(obj);
                _setFavorites(data);
            }
        }

        function removeFavorite(Url) {
            _getFavorites().then(okDFav).catch(configError);

            function okDFav(data) {
                var url = Url || _getCurrentPageUrl();
                var index = _findValueInIndexObj(url, 'url', data);
                if (index !== -1) data.splice(index, 1);
                _setFavorites(data);
            }
        }

        function isFavorite() {
            return _getFavorites().then(okDFav).catch(configError);
            function okDFav(data) {
                var url = _getCurrentPageUrl();
                return _findValueInIndexObj(url, 'url', data) !== -1;
            }
        }

        function exportMescam(){
            return _exportMescam();
        }

        function _getCategory(url){
            return 'Notícias';
        }

        function _getData() {
            var datas = localStorage.getItem(LOCALSTORAGE.ESPACO_NAME);
            if (datas) {
                return JSON.parse(localStorage.getItem(LOCALSTORAGE.ESPACO_NAME));
            }
            return {};
        }

        function _setData(JsonData) {
            localStorage.setItem(LOCALSTORAGE.ESPACO_NAME, JSON.stringify(JsonData));
        }

        function _getAttr(attr) {
            var datas = _getData();

            if (datas && datas[attr]) {
                return $q.resolve(datas[attr]);
            }
            return $q.resolve(false);

        }

        function _exportMescam(){
            var datas =  _getData();
            return $q.resolve(JSON.stringify(datas));
        }


        function _setAttr(attr, value) {
            var datas = _getData()
            datas[attr] = value;
            return $q.resolve(_setData(datas));
        }

        function _getPanels() {
            return _getAttr(LOCALSTORAGE.PANELS_NAME);
        }

        function _setPanels(value) {
            _setAttr(LOCALSTORAGE.PANELS_NAME, value);
        }

        function _getFavorites() {
            return _getAttr(LOCALSTORAGE.FAVORITES);
        }

        function _setFavorites(value) {
            _setAttr(LOCALSTORAGE.FAVORITES, value);
        }

        function _getCurrentPageUrl() {
            return window.location.href;
        }

        function _getCurrentTitle(){
            return document.title;
        }

        function _findValueInIndexObj(value, index, array){
            for(let i=0;i<array.length;i++){
                if(index && array[i][index] && array[i][index] === value){
                    return i;
                }
            }
            return -1;
        }

        function configError(e) {
            console.log(e)
            throw new Error(ERROR_MESSAGE.CONFIG_NOT_FOUND)
        }

        function _getCurrentDate(){
            var today = new Date;
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var ii = today.getMinutes();
    
            if(dd<10) dd = '0'+dd;
            if(mm<10) mm = '0'+mm;
            if(hh<10)hh = '0'+hh;
            if(ii<10)ii = '0'+ii;
            
            return {
                date: dd + '/' + mm + '/' + yyyy,
                time: hh + ':' + ii
            }
        }
    }
})();

