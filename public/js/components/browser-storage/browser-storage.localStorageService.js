(function () {
    'use strict';

    angular
        .module('browserStorage')
        .factory('localStorageService', localStorageService)

    localStorageService.$inject = ['$q', 'LOCALSTORAGE', 'ERROR_MESSAGE', '$rootScope'];

    function localStorageService($q, LOCALSTORAGE, ERROR_MESSAGE, $rootScope) {

        var service = {
            isKnown: isKnown,
            isEnabled: isEnabled,
            disableMescam: disableMescam,
            enableMescam: enableMescam,
            known: known,
            addPanel: addPanel,
            removePanel: removePanel,
            getPanels: getPanels,
            getPanelSettings: getPanelSettings,
            setPanelSettings: setPanelSettings,
            getFavorites: getFavorites,
            addFavorite: addFavorite,
            editTitle: editTitle,
            removeFavorite: removeFavorite,
            isFavorite: isFavorite,
            setTheme: setTheme,
            getThemes:getThemes,
            getThemesList:themesList,
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
            _setAttr(LOCALSTORAGE.PREFERENCES, {});
        }

        function isEnabled() {
            return _getAttr(LOCALSTORAGE.DISABLED).then(ok);
            function ok(data) {
                return !data;
            }
        }

        function disableMescam() {
            //known(); Para apagar os dados.
            _setAttr(LOCALSTORAGE.DISABLED, true);
        }

        function enableMescam() {
            _setAttr(LOCALSTORAGE.DISABLED, false);
        }

        function addPanel(panelName, configs) {
            configs = configs || {};
            _getPanels().then(found).catch(notFound);

            function found(data) {
                if (!data[panelName]) {
                    data[panelName] = { name: panelName, configs: configs }
                    _setPanels(data);
                }
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

        function getPanelSettings(panelName, index) {
            return _getPanelSettings(panelName, index);
        }

        function setPanelSettings(panelName, index, value) {
            return _setPanelSettings(panelName, index, value);
        }

        function getFavorites() {
            return _getFavorites();
        }

        function addFavorite(Url, Title) {
            _getFavorites().then(okFav).catch(configError);

            function okFav(data) {
                var url = _normalizeUrl(Url);
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

        function editTitle(url, newTitle) {
            _getFavorites().then(okDFav).catch(configError);

            function okDFav(data) {
                var index = _findValueInIndexObj(url, 'url', data);
                data[index].title = newTitle;
                _setFavorites(data);
                //$rootScope.$broadcast('refrashFavorites', true);
            }
        }

        function removeFavorite(Url) {
            _getFavorites().then(okDFav).catch(configError);

            function okDFav(data) {
                var url = _normalizeUrl(Url);
                var index = _findValueInIndexObj(url, 'url', data);
                if (index !== -1) data.splice(index, 1);
                _setFavorites(data);
                $rootScope.$broadcast('refrashFavorites', true);
            }
        }

        function isFavorite(Url) {
            return _getFavorites().then(okDFav).catch(configError);
            function okDFav(data) {
                var url = _normalizeUrl(Url);
                return _findValueInIndexObj(url, 'url', data) !== -1;
            }
        }

        function setTheme(obj){
            return _setTheme(obj);
        }

        function getThemes(){
            return _getThemes();
        }

        function exportMescam() {
            return _exportMescam();
        }

        function _getCategory(url) {
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

        function _exportMescam() {
            var datas = _getData();
            return $q.resolve(JSON.stringify(datas));
        }


        function _setAttr(attr, value) {
            var datas = _getData()
            datas[attr] = value;
            return $q.resolve(_setData(datas));
        }

        function _getPanelSettings(panelName, index) {
            return _getPanels().then(panelsList).catch(notFound);
            function panelsList(panels) {
                if (!panels[panelName] || !panels[panelName].configs) $q.reject('Panel não Encontrado');
                if (index && !panels[panelName].configs.index) return false;
                return index ? panels[panelName].configs.index : panels[panelName].configs;
            }
            function notFound(e) {
                configError();
            }
        }

        function _setPanelSettings(panelName, index, value) {
            return _getPanels().then(okPanels).catch(notFound);
            function okPanels(panels) {
                if (!panels[panelName] || !panels[panelName].configs) $q.reject('Panel não Encontrado');
                panels[panelName].configs[index] = value;
                _setPanels(panels);
            }
            function notFound(e) {
                console.log(e);
            }
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

        function _setTheme(obj){
            _getPreferences().then(okThemes);
            function okThemes(preferences){
                var index = 'op' + obj.option
                if(preferences === false || !preferences.themes){
                    preferences = {themes:{}};
                }
                console.log(preferences);
                preferences.themes[index] = obj.category;
                _setPreferences(preferences);
            }
        }

        function _getThemes(){
            return _getPreferences().then(okThemes);
            function okThemes(preferences){
                return preferences.themes || {
                    op1:false,
                    op2:false,
                    op3:false,
                    op4:false
                };
            }
        }

        function _getPreferences(){
            return _getAttr(LOCALSTORAGE.PREFERENCES);
        }

        function _setPreferences(obj){
            return _setAttr(LOCALSTORAGE.PREFERENCES, obj);
        }

        function _getCurrentPageUrl() {
            return window.location.href;
        }

        function _getCurrentTitle() {
            return document.title;
        }



        function _findValueInIndexObj(value, index, array) {
            for (var i = 0; i < array.length; i++) {
                if (index && array[i][index] && array[i][index] === value) {
                    return i;
                }
            }
            return -1;
        }

        function configError(e) {
            console.log(e)
            throw new Error(ERROR_MESSAGE.CONFIG_NOT_FOUND)
        }

        function _getCurrentDate() {
            var today = new Date;
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var ii = today.getMinutes();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            if (hh < 10) hh = '0' + hh;
            if (ii < 10) ii = '0' + ii;

            return {
                date: dd + '/' + mm + '/' + yyyy,
                time: hh + ':' + ii
            }
        }

        function _normalizeUrl(url) {
            var current = _getCurrentPageUrl();
            if (!url || url == current) return current;
            var isFullUrl = url.split('http').length > 1;
            if (isFullUrl) return url;

            var currentMatch = current.match(/(https?:\/\/)(.+[^/#])/, 'g');
            var arrayUrl = currentMatch[2];

            var urlSplited = url.split('../');
            var host = arrayUrl.split('/').reverse();

            var endUrl = [];
            var count = 0;
            for (var i = 0; i < urlSplited.length; i++) {
                if (urlSplited[i] != '') {
                    endUrl.push(urlSplited[i]);
                } else {
                    count++;
                }
            }
            for (var j = 0; j < count; j++) {
                host.shift();
            }

            var newUrl = currentMatch[1] + host.reverse().join('/') + '/' + endUrl.join('/');
            return newUrl;
        }

        function themesList(){
            return  $q.resolve([
                {
                    index: false,
                    value: 'Padrão',
                    url: ''
                },
                {
                    index: 'administracao_publica',
                    value: 'Administração Pública',
                    url: '',
                },
                {
                    index: 'agropecuaria',
                    value: 'Agropecuária',
                    url: '',
                },
                {
                    index: 'assistencia_social',
                    value: 'Assistência Social',
                    url: '',
                },
                {
                    index: 'cidades',
                    value: 'Cidades',
                    url: '',
                },
                {
                    index: 'ciencia_e_tecnologia',
                    value: 'Ciência e Tecnologia',
                    url: '',
                },
                {
                    index: 'comunicacao',
                    value: 'Comunicação',
                    url: '',
                },
                {
                    index: 'consumidor',
                    value: 'Consumidor',
                    url: '',
                },
                {
                    index: 'direito_e_justica',
                    value: 'Direito e Justiça',
                    url: '',
                },
                {
                    index: 'direitos_humanos',
                    value: 'Direitos Humanos',
                    url: '',
                },
                {
                    index: 'economias',
                    value: 'Economia',
                    url: '',
                },
                {
                    index: 'educacao_e_cultura',
                    value: 'Educação e Cultura',
                    url: '',
                },
                {
                    index: 'esportes',
                    value: 'Esportes',
                    url: '',
                },
                {
                    index: 'industria_e_comercio',
                    value: 'Indústria e Comércio',
                    url: '',
                },
                {
                    index: 'institucional',
                    value: 'Institucional',
                    url: '',
                },
                {
                    index: '',
                    value: 'Meio Ambiente',
                    url: '',
                },
                {
                    index: 'politica',
                    value: 'Política',
                    url: '',
                },
                {
                    index: 'relacoes_exteriores',
                    value: 'Relações Exteriores',
                    url: '',
                },
                {
                    index: 'saude',
                    value: 'Saúde',
                    url: '',
                },
                {
                    index: 'seguranca',
                    value: 'Segurança',
                    url: '',
                },
                {
                    index: 'trabalho_e_previdencia',
                    value: 'Trabalho e Previdência',
                    url: '',
                },
                {
                    index: 'transporte_e_transito',
                    value: 'Transporte e Trânsito',
                    url: '',
                },
                {
                    index: 'turismo',
                    value: 'Turismo',
                    url: '',
                }
            ]);
        }
    }
})();

