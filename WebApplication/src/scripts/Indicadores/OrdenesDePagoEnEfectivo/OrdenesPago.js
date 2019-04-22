"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MostrarProveedores = (function (_React$Component) {
    _inherits(MostrarProveedores, _React$Component);

    function MostrarProveedores(props) {
        _classCallCheck(this, MostrarProveedores);

        _get(Object.getPrototypeOf(MostrarProveedores.prototype), "constructor", this).call(this, props);
        this.state = {
            filtro: "",
            seleccion: -1
        };
    }

    /* Metodos */

    _createClass(MostrarProveedores, [{
        key: "handle_filter",
        value: function handle_filter(event) {}
    }, {
        key: "handle_beneficiary",
        value: function handle_beneficiary(select) {}
    }, {
        key: "render",
        value: function render() {
            var lista = this.props.lista;

            return React.createElement(
                "div",
                { className: "panel panel-info", style: { height: "550px" } },
                React.createElement(
                    "p",
                    null,
                    "Cantidad De Registros = ",
                    React.createElement(
                        "strong",
                        null,
                        lista.length || 0
                    )
                ),
                React.createElement(TablaMonitor, {
                    datos: lista
                })
            );
        }
    }]);

    return MostrarProveedores;
})(React.Component);

var obtener_concepto_compra_gasto = function obtener_concepto_compra_gasto(lista) {
    var lista_conceptos = [];

    lista.forEach(function (c_g) {
        if (lista_conceptos.findIndex(function (e) {
            return e.concepto_compra_gasto === c_g.concepto_compra_gasto;
        }) === -1) {
            lista_conceptos.push({
                concepto_compra_gasto: c_g.concepto_compra_gasto,
                establecimientos: lista.filter(function (e) {
                    return e.concepto_compra_gasto === c_g.concepto_compra_gasto;
                }),
                total: obtener_suma_total_lista(lista.filter(function (e) {
                    return e.concepto_compra_gasto === c_g.concepto_compra_gasto;
                }))
            });
        }
    });
    return lista_conceptos;
};
var obtener_establecimientos = function obtener_establecimientos(lista) {
    var lista_establecimientos = [];
    lista.forEach(function (esta) {
        if (lista_establecimientos.findIndex(function (e) {
            return e.cod_estab === esta.cod_estab;
        }) === -1) {
            lista_establecimientos.push({
                cod_estab: esta.cod_estab,
                establecimimiento: esta.establecimimiento,
                conceptos: lista.filter(function (e) {
                    return e.cod_estab === esta.cod_estab;
                }),
                total: obtener_suma_total_lista(lista.filter(function (e) {
                    return e.cod_estab === esta.cod_estab;
                }))
            });
        }
    });

    return lista_establecimientos;
};
var obtener_conceptos = function obtener_conceptos(lista) {
    var lista_res = [];
    lista.forEach(function (concep) {
        if (lista_res.findIndex(function (e) {
            return e.concepto_orden_de_pago === concep.concepto_orden_de_pago;
        }) === -1) {
            lista_res.push({
                concepto_orden_de_pago: concep.concepto_orden_de_pago,
                detalles: lista.filter(function (e) {
                    return e.concepto_orden_de_pago === concep.concepto_orden_de_pago;
                }),
                total: obtener_suma_total_lista(lista.filter(function (e) {
                    return e.concepto_orden_de_pago === concep.concepto_orden_de_pago;
                }))
            });
        }
    });

    return lista_res;
};
var obtener_suma_total_lista = function obtener_suma_total_lista(lista) {
    return moneyFormat(lista.map(function (e) {
        return e.cantidad;
    }).reduce(function (a, b) {
        return a + b;
    }));
};
var moneyFormat = function moneyFormat(numero_) {

    var decimal_con_cero = function decimal_con_cero(i) {
        return i > 9 || i.search(0) > -1 ? i : i + "0";
    };
    var mayora_a_mil = function mayora_a_mil(numero) {
        return new Intl.NumberFormat('es-MX').format(numero);
    };

    var numero_string = (function () {
        return Math.round(numero_ * 100) / 100;
    })().toString();
    var decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    var unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return "$ " + (unidades || 0) + "." + (decimal || 0);
};
var obtener_semanas_ocupadas_por_anio = function obtener_semanas_ocupadas_por_anio(lista) {
    var lista_meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    lista.sort(function (a, b) {
        return a.anio_pago > b.anio_pago ? 1 : -1;
    });

    var lista_anios = [];
    lista.forEach(function (anio) {
        if (lista_anios.findIndex(function (e) {
            return e.anio === anio.anio_pago;
        }) === -1) {
            var num_semana = semanas_obtenidas(lista.filter(function (e) {
                return e.anio_pago === anio.anio_pago;
            }));
            num_semana.sort(function (a, b) {
                return lista_meses.findIndex(function (e) {
                    return e == a.mes_pago;
                }) > lista_meses.findIndex(function (e) {
                    return e == b.mes_pago;
                }) ? 1 : -1;
            });
            lista_anios.push({
                anio: anio.anio_pago,
                meses: obtener_semanas_por_mes(num_semana),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_anios;
};
var obtener_semanas_por_mes = function obtener_semanas_por_mes(lista) {
    var lista_meses = [];
    lista.forEach(function (mes) {
        if (lista_meses.findIndex(function (e) {
            return e.mes === mes.mes_pago;
        }) === -1) {
            var num_semana = semanas_obtenidas(lista.filter(function (e) {
                return e.mes_pago === mes.mes_pago;
            }));
            num_semana.sort(function (a, b) {
                return a.semana_del_anio_pago > b.semana_del_anio_pago ? 1 : -1;
            });
            lista_meses.push({
                mes: mes.mes_pago,
                semanas: num_semana.map(function (e) {
                    return e.semana_del_anio_pago;
                }),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_meses;
};
var semanas_obtenidas = function semanas_obtenidas(semanas) {
    var num_semana = [];
    semanas.forEach(function (sem) {
        if (num_semana.findIndex(function (e) {
            return e.semana_del_anio_pago === sem.semana_del_anio_pago;
        }) === -1) {
            num_semana.push(sem); //semana_del_anio_pago
        }
    });
    return num_semana;
};
/* Componentes */
var CeldaTotal = function CeldaTotal(_ref) {
    var total = _ref.total;

    return React.createElement(
        "td",
        { style: { textAlign: "right" } },
        " ",
        React.createElement(
            "label",
            null,
            total
        )
    );
};
var CaveceraTabla = function CaveceraTabla(_ref2) {
    var anios = _ref2.anios;

    var lista = [],
        meses = [],
        semanas = [];

    console.log("anios=>", anios);
    //fila años
    lista.push(React.createElement(
        "tr",
        null,
        React.createElement(
            "th",
            { rowSpan: "3" },
            " ",
            React.createElement(
                "label",
                null,
                "CONCEPTOS"
            )
        ),
        anios.map(function (e) {
            //agrega los meses
            meses = meses.concat(e.meses.map(function (m) {
                return m;
            })) || meses;
            return React.createElement(
                "th",
                { colSpan: e.cantidad_semanas },
                e.anio
            );
        }),
        React.createElement(
            "th",
            { rowSpan: "3" },
            React.createElement(
                "label",
                null,
                "TOTAL"
            )
        )
    ));

    //fila meses
    lista.push(React.createElement(
        "tr",
        null,
        meses.map(function (m) {
            //agrega las semanas
            semanas = semanas.concat(m.semanas);
            return React.createElement(
                "th",
                { colSpan: m.cantidad_semanas },
                m.mes
            );
        })
    ));

    //fila semanas
    lista.push(React.createElement(
        "tr",
        null,
        semanas.map(function (s) {
            return React.createElement(
                "th",
                null,
                s
            );
        })
    ));

    return lista;
};

var ObtenerSemanasResultaddos = function ObtenerSemanasResultaddos(_ref3) {
    var Lista = _ref3.Lista;

    var lista_semanas = [];

    return lista_semanas;
};

var TablaMonitor = function TablaMonitor(_ref4) {
    var datos = _ref4.datos;

    datos.sort(function (a, b) {
        return a.establecimimiento > b.establecimimiento ? 1 : -1;
    });
    var conceptos = obtener_concepto_compra_gasto(datos || []);

    console.log("conceptos=>", conceptos);
    return React.createElement(
        "div",
        { style: { height: "510px", overflow: "auto" } },
        React.createElement(
            "table",
            { className: "table" },
            React.createElement(
                "thead",
                null,
                React.createElement(CaveceraTabla, {
                    anios: obtener_semanas_ocupadas_por_anio(datos)
                })
            ),
            React.createElement(
                "tbody",
                null,
                conceptos.map(function (e) {
                    return [React.createElement(
                        "tr",
                        { name: "conceptos" },
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                " ",
                                e.concepto_compra_gasto
                            )
                        ),
                        React.createElement(CeldaTotal, { total: e.total })
                    ), React.createElement(VistaEstablecimiento, {
                        lista: e.establecimientos
                    })];
                })
            )
        )
    );
};

var VistaEstablecimiento = function VistaEstablecimiento(_ref5) {
    var lista = _ref5.lista;

    var establecimientos = obtener_establecimientos(lista || []);
    console.log(establecimientos);
    return establecimientos.map(function (e) {
        return [React.createElement(
            "tr",
            { name: "estalbelcimientos" },
            React.createElement(
                "td",
                null,
                React.createElement(
                    "strong",
                    null,
                    e.establecimimiento
                )
            ),
            React.createElement(CeldaTotal, { total: e.total })
        ), React.createElement(VistaConceptos, {
            lista: e.conceptos
        })];
    });
};

var VistaConceptos = function VistaConceptos(_ref6) {
    var lista = _ref6.lista;

    var conceptos = obtener_conceptos(lista);
    console.log("conceptos=>", conceptos);
    return conceptos.map(function (e) {
        return React.createElement(
            "tr",
            { name: "ordenes" },
            React.createElement(
                "td",
                null,
                React.createElement(
                    "label",
                    null,
                    e.concepto_orden_de_pago
                )
            ),
            React.createElement(CeldaTotal, { total: e.total })
        );
    });
};

var llenar_tabla_pagos = function llenar_tabla_pagos(lista) {
    console.log("lista Pagos =>", lista);
    ReactDOM.render(React.createElement(MostrarProveedores, { lista: lista }), document.querySelector("#resultados_tabla"));
};

