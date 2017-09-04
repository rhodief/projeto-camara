(function () {
    'use strict';

    angular.module('wsRequest', []);
})();

(function () {
    'use strict';

    angular
        .module('wsRequest')
        .factory('wsRequestService', wsRequestService)

    wsRequestService.$inject = ['$http'];

    function wsRequestService($http) {

        var ufsList;

        var service = {
            getDeputados: getDeputados,
            getDeputado: getDeputado,
            getUfsList: getUfsList,
            getAgenda: getAgenda,
            getAgendaDetail: getAgendaDetail
        };

        const SCHEMA = {
            deputadosList: {
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
                        return value.split('http').join('https')
                    }]
                }
            },
            deputadoView: {
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
                        return value.split('http').join('https')
                    }],
                    ultimoStatus_site: 'ultimoStatus.urlWebsite'
                }
            },
            agendaList: {
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
                url: function(params){
                    return 'https://dadosabertos.camara.leg.br/api/v2/eventos/'+params.id;
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
            }
        };

        return service;

        function getDeputados(params) {
            //return _getDeputadosWs(params).then(_formatDeputados).catch(_wsError);
        }

        function getDeputado(id) {
            //return _getDeputado(id).then(_formatDeputado).catch(_wsError);
        }

        function getUfsList() {
            //return _getUfsList().then(_formatUfsList).catch(_wsError);
        }

        function getAgenda(date) {
            var params = { date: date }
            return _getDataWs(SCHEMA.agendaList, params);
        }

        function getAgendaDetail(id) {
            var params = { id: id};
            return _getDataWs(SCHEMA.agendaView, params);
        }



        function _getDataWs(schemaObj, params) {
            return _getData(schemaObj.url(params)).then(_formatData.bind(null, schemaObj)).catch(_erro);
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
                var isRegex = angular.isArray(schema[k]);
                if (isList) {
                    outputObj[k] = _getDataFromList(Rparse(schema[k].path, data), schema[k].schema);
                } else {
                    var value = (isRegex ? schema[k][0] : schema[k]);
                    var item = Rparse(value, data);
                    var prevalue = (isRegex && item ? item.match(schema[k][1])[0] : item);
                    outputObj[k] = (typeof prevalue === 'object' ? null : prevalue);
                }
            }
            return outputObj;
        }

        function _getDataFromList(list, schema) {
            var output = [];
            var listToRun = (list instanceof Array ? list : new Array(list));
            for (let i = 0; i < listToRun.length; i++) {
                output[i] = _getDataFromSingle(listToRun[i], schema);
            }
            return output;
        }

        function Rparse(script, context) {
            var explode = script.split('.');
            var out = context;
            var len = explode.length;
            for (let i = 0; i < len; i++) {
                var index = explode[i];
                var item = out[index];
                if (item === undefined) {
                    //Tenta executar com o índice 0, se for array...
                    if (out[0] && out[0][index]) {
                        item = out[0][index];
                    } else {
                        //Tentar como expressão regular...
                        var exps = index.split('|-|');
                        for (let j = 0; j < exps.length; j++) {
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


        function _erro(e) {
            //##### COLOCAR UM DEBUG NO ENV ##########
            console.log(e);
            return {
                erro: e,
                msg: "Não foi possível recuperar os dados do WSCN"
            }
        }

        function _requestDataFromWs(url) {
            return $http.get(url);
        }

    }
})();