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

    //Metodos

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
                })
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
                })
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
                })
            });
        }
    });

    return lista_res;
};
/*Componentes*/
var TablaMonitor = function TablaMonitor(_ref) {
    var datos = _ref.datos;

    var conceptos = obtener_concepto_compra_gasto(datos || []);
    console.log(conceptos);
    return React.createElement(
        "div",
        { style: { height: "510px", overflow: "auto" } },
        React.createElement(
            "table",
            { className: "table" },
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
                        )
                    ), React.createElement(VistaEstablecimiento, {
                        lista: e.establecimientos
                    })];
                })
            )
        )
    );
};

var VistaEstablecimiento = function VistaEstablecimiento(_ref2) {
    var lista = _ref2.lista;

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
            )
        ), React.createElement(VistaConceptos, {
            lista: e.conceptos
        })];
    });
};

var VistaConceptos = function VistaConceptos(_ref3) {
    var lista = _ref3.lista;

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
            )
        );
    });
};

var llenar_tabla_pagos = function llenar_tabla_pagos(lista) {
    console.log("lista Pagos =>", lista);
    ReactDOM.render(React.createElement(MostrarProveedores, { lista: lista }), document.querySelector("#resultados_tabla"));
};

