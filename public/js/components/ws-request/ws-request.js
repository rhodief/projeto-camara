(function () {
    'use strict';

    angular.module('wsRequest', []);
})();

(function () {
    'use strict';

    angular
        .module('wsRequest')
        .factory('wsRequestService', wsRequestService)

    wsRequestService.$inject = ['$http', '$parse'];

    function wsRequestService($http, $parse) {

        var ufsList;

        var service = {
            getDeputados: getDeputados,
            getDeputado: getDeputado,
            getUfsList: getUfsList,
            getAgenda: getAgenda,
            getAgendaDetail: getAgendaDetail
        };

        return service;

        function getDeputados(params) {
            return _getDeputadosWs(params).then(_formatDeputados).catch(_wsError);
        }

        function getDeputado(id) {
            return _getDeputado(id).then(_formatDeputado).catch(_wsError);
        }

        function getUfsList() {
            return _getUfsList().then(_formatUfsList).catch(_wsError);
        }

        function getAgenda(date) {
            return _getAgenda(date).then(_formatAgenda).catch(_wsError);
        }

        function getAgendaDetail(id, idOrg, date){
            return _getAgendaDetail(id, idOrg, date).then(_formatAgendaDetail).catch(_wsError);
        }

        function _getDeputadosWs(params) {
            var url = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&siglaUf=' + params.siglaUf;
            return $http.get(url);
        }

        function _getDeputado(id) {
            var url = 'https://dadosabertos.camara.leg.br/api/v2/deputados/' + id;
            return $http.get(url);
        }

        function _getUfsList() {
            var url = 'https://dadosabertos.camara.leg.br/api/v2/referencias/uf';
            return $http.get(url);
        }

        function _getAgenda(date) {
            var url = 'https://dadosabertos.camara.leg.br/api/v2/eventos?dataInicio=' + date + '&dataFim=' + date + '&ordem=ASC&itens=100&ordenarPor=dataHoraInicio';
            return $http.get(url);
        }

        function _getAgendaDetail(id, idOrg, date){
            //var urlOrg = 'https://www.camara.leg.br/SitCamaraWS/Orgaos.asmx/ObterPauta?IDOrgao=2003&datIni=17/08/2017&datFim=17/08/2017';
            //console.log(date);
            //return $http.get(urlOrg);
        }

        function _formatDeputados(data) {
            return _formatWithSchema(data, _deputadosListSchema);
        }

        function _formatDeputado(data) {
            return _formatWithSchema(data, _deputadoViewSchema);
        }

        function _formatUfsList(data) {
            return data.data.dados;
        }

        function _formatAgenda(data) {
            return _formatWithSchema(data, _agendaListSchema)
        }

        function _formatAgendaDetail(data){
            return _formatWithSchema(data, _agendaDetailSchema)
        }

        function _formatWithSchema(data, schema) {
            //Schema as function
            var schema = schema();
            var mainData = $parse(schema.path)(data);
            var list
            if (schema.type === 'list') {
                return _getDataFromList(mainData, schema.schema);
            }
            return _getDataFromSingle(mainData, schema.schema);
        }

        function _getDataFromSingle(data, schema) {
            var outputObj = {};
            angular.forEach(schema, function (v, k) {
                var isArray = angular.isArray(v);
                var value = (isArray ? v[0]: v);
                var item = $parse(value)(data);
                var prevalue = (isArray && item ? item.match(v[1])[0] : item);
                outputObj[k] = (isArray && v && v[2] ? v[2](prevalue) : prevalue);
            });
            return outputObj;
        }

        function _getDataFromList(list, schema) {
            var output = [];
            for (let i = 0; i < list.length; i++) {
                var item = _getDataFromSingle(list[i], schema);
                output.push(item);
            }
            return output;
        }

        function _deputadosListSchema() {
            return {
                path: 'data.dados',
                type: 'list',
                schema: {
                    id: 'id',
                    nome: 'nome',
                    leg: 'idLegislatura',
                    partido_sig: 'siglaPartido',
                    uf_sig: 'siglaUf',
                    view: 'uri',
                    view_partido: 'uriPartido',
                    foto: ["urlFoto", /.+/g, function(value){
                        return value.split('http').join('https')
                    }]
                }
            }
        }

        function _deputadoViewSchema() {
            return {
                path: 'data.dados',
                type: 'single',
                schema: {
                    cpf: 'cpf',
                    dataFalecimento: 'dataFalecimento',
                    dataNascimento: 'dataNascimento',
                    escolaridade: 'escolaridade',
                    id: 'id',
                    municipioNascimento: 'municipioNascimento',
                    nome_civil: 'nomeCivil',
                    redeSocial: 'redeSocial',
                    sexo: 'sexo',
                    ufNascimento: 'ufNascimento',
                    ultimoStatus_condicaoEleitoral: 'ultimoStatus.condicaoEleitoral',
                    ultimoStatus_data: 'ultimoStatus.data',
                    ultimoStatus_descricaoStatus: 'ultimoStatus.descricaoStatus',
                    ultimoStatus_gabinete_andar: 'ultimoStatus.gabinete.andar',
                    ultimoStatus_gabinete_email: 'ultimoStatus.gabinete.email',
                    ultimoStatus_gabinete_nome: 'ultimoStatus.gabinete.nome',
                    ultimoStatus_gabinete_predio: 'ultimoStatus.gabinete.predio',
                    ultimoStatus_gabinete_sala: 'ultimoStatus.gabinete.sala',
                    ultimoStatus_gabinete_telefone: 'ultimoStatus.gabinete.telefone',
                    ultimoStatus_id: 'ultimoStatus.id',
                    ultimoStatus_idLegislatura: 'ultimoStatus.idLegislatura',
                    ultimoStatus_nome: 'ultimoStatus.nome',
                    ultimoStatus_nome_eleitoral: 'ultimoStatus.nomeEleitoral',
                    ultimoStatus_partido_sig: 'ultimoStatus.siglaPartido',
                    ultimoStatus_uf_sig: 'ultimoStatus.siglaUf',
                    ultimoStatus_situacao: 'ultimoStatus.situacao',
                    ultimoStatus_view: 'ultimoStatus.uri',
                    ultimoStatus_partido_view: 'ultimoStatus.uriPartido',
                    ultimoStatus_foto: 'ultimoStatus.urlFoto',
                    ultimoStatus_site: 'ultimoStatus.urlWebsite'
                }
            }
        }

        function _agendaListSchema() {
            return {
                path: 'data.dados',
                type: 'list',
                schema: {
                    id: 'id',
                    titulo: 'titulo',
                    uri: 'uri',
                    dataInicio: ['dataHoraInicio', /\d{4}-\d{2}-\d{2}/g],
                    horaInicio: ['dataHoraInicio', /\d{2}:\d{2}/g],
                    dataFim: ['dataHoraFim', /\d{4}-\d{2}-\d{2}/g],
                    horaFim: ['dataHoraFim', /\d{2}:\d{2}/g],
                    descricaoSituacao: 'descricaoSituacao',
                    descricaoTipo: 'descricaoTipo',
                    localCamara_andar:'localCamara.andar',
                    localCamara_nome: 'localCamara.nome',
                    localCamara_predio: 'localCamara.predio',
                    localCamara_sala: 'localCamara.sala',
                    localExterno: 'localExterno',
                    orgao_id: 'orgao.id',
                    orgao_idTipoOrgao: 'orgao.idTipoOrgao',
                    orgao_nome: 'orgao.nome',
                    orgao_sigla: 'orgao.sigla',
                    orgao_tipoOrgao: 'orgao.tipoOrgao',
                    orgao_uri: 'orgao.uri'
                }
            }
        }

        function _agendaDetailSchema(){
            return {
                path: 'data.dados',
                type: 'single',
                schema: {

                }
            }
        }

        function _wsError(e) {
            console.log(e);
            console.log('Não foi possível retornar a lista do servidor');
        }

    }
})();