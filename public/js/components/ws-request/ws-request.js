(function () {
    'use strict';

    angular.module('wsRequest', ['wsMock']);
})();

(function () {
    'use strict';

    angular
        .module('wsRequest')
        .factory('wsRequestService', wsRequestService)

    wsRequestService.$inject = ['$http', 'wsMockService', '$q'];

    function wsRequestService($http, wsMockService, $q) {

        var ufsList;

        var service = {
            getDeputados: getDeputados,
            getDeputado: getDeputado,
            getUfsList: getUfsList,
            getAgenda: getAgenda,
            getAgendaDetail: getAgendaDetail,
            getEDemocraciaList: getEDemocraciaList,
            getProposicoesList: getProposicoesList,
            getProposicao: getProposicao
        };

        const SCHEMA = {
            deputadosList: {
                name: 'deputados-list',
                url: function (params) {
                    var siglaUf = params.siglaUf || '';
                    return 'https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=' + siglaUf + '&itens=1000&ordem=ASC&ordenarPor=nome';
                },
                path: 'data.dados',
                list: true,
                schema: {
                    id: 'id',
                    nome: 'nome',
                    leg: 'idLegislatura',
                    partido_sig: 'siglaPartido',
                    uf_sig: 'siglaUf',
                    view: 'uri',
                    view_partido: 'uriPartido',
                    foto: ["urlFoto", /.+/g, function (value) {
                        var splitS = value.split('https');
                        if (splitS[1]) {
                            return value;
                        }
                        return value.split('http').join('https');
                    }]
                }
            },
            deputadoView: {
                name: 'deputado-view',
                url: function (params) {
                    return 'https://dadosabertos.camara.leg.br/api/v2/deputados/' + params.id;
                },
                path: 'data.dados',
                list: false,
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
                    ultimoStatus_foto: ['ultimoStatus.urlFoto', /.+/g, function (value) {
                        var splitS = value.split('https');
                        if (splitS[1]) {
                            return value;
                        }
                        return value.split('http').join('https');
                    }]
                }
            },
            agendaList: {
                name: 'agenda-list',
                url: function (params) {
                    if (!params || !params.date) throw new Error('É obrigatório passar o parâmetro DATE');
                    return 'https://dadosabertos.camara.leg.br/api/v2/eventos?dataInicio=' + params.date + '&dataFim=' + params.date + '&ordem=ASC&itens=100&ordenarPor=dataHoraInicio';

                },
                path: 'data.dados',
                list: true,
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
                    localCamara_andar: 'localCamara.andar',
                    localCamara_nome: 'localCamara.nome',
                    localCamara_predio: 'localCamara.predio',
                    localCamara_sala: 'localCamara.sala',
                    localExterno: 'localExterno',
                    orgaos: {
                        path: 'orgaos',
                        schema: {
                            id: 'id',
                            idTipoOrgao: 'idTipoOrgao',
                            nome: 'nome',
                            sigla: 'sigla',
                            tipoOrgao: 'tipoOrgao',
                            uri: 'uri'
                        }
                    }
                }
            },
            agendaView: {
                name: 'agenda-view',
                url: function (params) {
                    //eventoss -> erro proposital para disparar os dados simulados.
                    return 'https://dadosabertos.camara.leg.br/api/v2/eventoss/' + params.id;
                },
                path: 'data.dados',
                list: false,
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
                    localCamara_andar: 'localCamara.andar',
                    localCamara_nome: 'localCamara.nome',
                    localCamara_predio: 'localCamara.predio',
                    localCamara_sala: 'localCamara.sala',
                    localExterno: 'localExterno',
                    orgaos: {
                        path: 'orgaos',
                        schema: {
                            id: 'id',
                            idTipoOrgao: 'idTipoOrgao',
                            nome: 'nome',
                            sigla: 'sigla',
                            tipoOrgao: 'tipoOrgao',
                            uri: 'uri'
                        }
                    }
                }
            },
            ufList: {
                name: 'uf-list',
                url: function () {
                    return 'https://dadosabertos.camara.leg.br/api/v2/referencias/uf';
                },
                path: 'data.dados',
                list: true,
                schema: {
                    id: 'id',
                    sigla: 'sigla',
                    nome: 'nome',
                    descricao: 'descricao'
                }
            },
            eDemocracia: {
                name: "e-democracia",
                url: function () {
                    return "../server_simulator/e_democracia/e_democracia.json"
                },
                path: "data.dados",
                list: true,
                schema: {
                    categoria: "categoria",
                    img: "img",
                    url: "url",
                    titulo: "titulo",
                    detalhes: "detalhes",
                    tipo: "tipo",
                    itens: {
                        path: "itens",
                        schema: {
                            valor: 'valor',
                            rotulo: 'rotulo'
                        }
                    }
                }
            },
            proposicoesList: {
                name: 'proposicoes-list',
                url: function (params) {
                    var tipo = params.tipo || '';
                    var numero = params.numero || '';
                    var ano = params.ano || '';
                    var autor = params.autor || '';
                    return 'https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaTipo=' + tipo + '&numero=' + numero + '&ano=' + ano + (autor ? '&autor=' + encodeURI(autor) : '') + '&itens=1000';
                },
                path: 'data.dados',
                list: true,
                schema: {
                    id: 'id',
                    url: 'uri',
                    tipo_sigla: 'siglaTipo',
                    tipo_id: 'idTipo',
                    numero: 'numero',
                    ano: 'ano',
                    ementa: 'ementa'
                }
            },
            proposicaoView:{
                name: 'proposicoes-view',
                url: function (params) {
                    var id = params.id;
                    return 'https://dadosabertos.camara.leg.br/api/v2/proposicoes/' + id;
                },
                path: 'data.dados',
                list: false,
                schema: {
                    ano: "ano",
                    apresentacao_data:"dataApresentacao",
                    tipo_descricao: "descricaoTipo",
                    ementa: "ementa",
                    emenda_detalahada:"ementaDetalhada",
                    id: "id",
                    id_tipo: "idTipo",
                    id_tipoAutor: "idTipoAutor",
                    justificativa: "justificativa",
                    palavrasChave: "keywords",
                    numero: "numero",
                    tipo_sigla: "siglaTipo",
                    status_dataHora: 'statusProposicao.dataHora',
                    status_descricaoSituacao: 'statusProposicao.descricaoSituacao',
                    status_descricaoTramitacao: "statusProposicao.descricaoTramitacao",
                    status_despacho: "statusProposicao.despacho",
                    status_idSituacao: "statusProposicao.idSituacao",
                    status_idTipoTramitacao: "statusProposicao.idTipoTramitacao",
                    status_regime: "statusProposicao.regime",
                    status_sequencia: 'statusProposicao.sequencia',
                    status_orgao_sigla: 'statusProposicao.siglaOrgao',
                    status_orgao_uri: 'statusProposicao.uriOrgao',
                    status_url: 'statusProposicao.surl',
                    texto: "texto",
                    autor_tipo: "tipoAutor",
                    url: "uri",
                    autor_urls: "uriAutores",
                    principal_url: "uriPropPrincipal",
                    ultimoRelator_url: "uriUltimoRelator",
                    inteiroTeor_url: "urlInteiroTeor",
                    urnFinal: "urnFinal",
                }
            }
        };

        return service;

        function getDeputados(params) {
            return _getDataWs(SCHEMA.deputadosList, params);
        }

        function getDeputado(id) {
            var params = { id: id };
            return _getDataWs(SCHEMA.deputadoView, params);
        }

        function getUfsList() {
            return _getDataWs(SCHEMA.ufList);
        }

        function getAgenda(date) {
            var params = { date: date }
            return _getDataWs(SCHEMA.agendaList, params);
        }

        function getAgendaDetail(id) {
            var params = { id: id };
            return _getDataWs(SCHEMA.agendaView, params);
        }

        function getEDemocraciaList() {
            return _getDataWs(SCHEMA.eDemocracia);
        }

        function getProposicoesList(value) {
            var params = _getRequestsParamsFromString(value);
            if(!angular.equals(params, {})) return _getDataWs(SCHEMA.proposicoesList, params);
            return $q.reject({msg: 'Requisição ainda não foi realizada', erro:'await'})
        }

        function getProposicao(id){
            var params = {id: id};
            return _getDataWs(SCHEMA.proposicaoView, params);
        }

        function _getDataWs(schemaObj, params) {
            return _getData(schemaObj.url(params)).then(_formatData.bind(null, schemaObj)).catch(_getMockData.bind(null, schemaObj));
        }

        function _getData(url) {
            return _requestDataFromWs(url);
        }

        function _formatData(schemaObj, data) {
            return _formatWithSchema(data, schemaObj);
        }

        function _formatWithSchema(data, schema) {
            var mainData = Rparse(schema.path, data);
            //return mainData;
            if (schema.list) {
                return _getDataFromList(mainData, schema.schema);
            }
            return _getDataFromSingle(mainData, schema.schema);
        }

        function _getDataFromSingle(data, schema) {
            var outputObj = {};
            for (var k in schema) {
                var isList = (schema[k] && schema[k].path);
                var isParams = angular.isArray(schema[k]);
                if (isList) {
                    outputObj[k] = _getDataFromList(Rparse(schema[k].path, data), schema[k].schema);
                } else {
                    var value = (isParams ? schema[k][0] : schema[k]);
                    var item = Rparse(value, data);
                    if (isParams) {
                        var prev = (schema[k][1] && item ? item.match(schema[k][1])[0] : item);
                        var prevalue = (schema[k][2] ? schema[k][2](prev) : prev);
                    } else {
                        var prevalue = item;
                    }
                    outputObj[k] = (typeof prevalue === 'object' ? null : prevalue);
                }
            }
            return outputObj;
        }

        function _getDataFromList(list, schema) {
            var output = [];
            var listToRun = (list instanceof Array ? list : new Array(list));
            for (var i = 0; i < listToRun.length; i++) {
                output[i] = _getDataFromSingle(listToRun[i], schema);
            }
            return output;
        }

        function Rparse(script, context) {
            var explode = script.split('.');
            var out = context;
            var len = explode.length;
            for (var i = 0; i < len; i++) {
                var index = explode[i];
                var item = out[index];
                if (item === undefined) {
                    //Tenta executar com o índice 0, se for array...
                    if (out[0] && out[0][index]) {
                        item = out[0][index];
                    } else {
                        //Tentar como expressão regular...
                        var exps = index.split('|-|');
                        for (var j = 0; j < exps.length; j++) {
                            var vl = out[exps[j]];
                            if (vl) item = vl;
                        }
                    }
                }
                if (item === undefined) {
                    console.log('Index [' + index + '] não encontrado');
                } else {
                    var testeNumero = parseInt(item)
                    out = (testeNumero !== NaN ? item : testeNumero);
                }

            }
            return (out && out[0] && out.length === 1 ? out[0] : out);
        }

        function _getRequestsParamsFromString(string) {
            var group = _executeRegex(string);
            var params = _buildParams(group);
            return params;
        }

        function _buildParams(group){
            var params = {};
            var autor = false;
            for(var i = 0;i<group.length;i++){
                var item = group[i];
                _process(item);
            }
            
            function _process(it){
                if(autor){
                    params.autor = it;
                    autor = false;
                    return;
                }
                var testAutorLabel = it.match(/^autor/i);
                if(testAutorLabel){
                    autor = true;
                    return;
                }
                var testTipo = it.length < 6 ? it.match(/^[\D]\w{1,5}/i) : false;
                if(testTipo){
                    params.tipo = testTipo[0];
                    return;    
                }
                var testNumero = it.length < 6 && !params.numero ? it.match(/^\d{1,5}/i) : false;
                if(testNumero){
                    params.numero = testNumero[0];
                    return;
                }
                var testAno = it.length == 4 && params.numero ? it.match(/^\d{1,4}/i) : false;
                if(testAno){
                    params.ano = testAno[0];
                }
            }
            return params;
        }

        function _executeRegex(string) {
            const REGEX = '(?:[\S][]+)?[a-z0-9áàâãéèêíïóôõöúçñ]+(?:[\S][]+)?'
            var objetoRegex = new RegExp(REGEX, 'gi');
            var results = [];
            var result = null;
            while (result = objetoRegex.exec(string)) {
                if (result[0] === "") return false;
                results.push(result[0]);
            }
            return results;
        }


        function _requestDataFromWs(url) {
            return $http.get(url);
        }

        function _getMockData(schemaObj, error) {
            console.log('Não foi possível se conectar com o WebService da Câmara dos Deputados. Assim, os dados serão simulados para mostrar a experiência.')
            return wsMockService.getData(schemaObj);
        }

    }
})();