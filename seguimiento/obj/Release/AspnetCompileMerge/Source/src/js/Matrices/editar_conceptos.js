"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $MI_URL = window.location.protocol + "//" + window.location.hostname;
var $URL_API = $MI_URL + ":90/api/";
var $URL_API_IZA = $MI_URL + ":180/api/";

var concepto_modelo = function concepto_modelo() {
    _classCallCheck(this, concepto_modelo);

    this.Folio = 0;
    this.Concepto = '';
    this.Abreviatura = '';
    this.Estatus = 'V';
    this.Fecha = '';
    this.Fecha_modificacion = '';
};

var EdicionConceptos = (function (_React$Component) {
    _inherits(EdicionConceptos, _React$Component);

    function EdicionConceptos(props) {
        var _this = this;

        _classCallCheck(this, EdicionConceptos);

        _get(Object.getPrototypeOf(EdicionConceptos.prototype), "constructor", this).call(this, props);

        this.state = {
            concepto: new concepto_modelo(),
            lista_cuestionarios: [],
            estatus: 1
        };

        this.seleccionar = this.on_seleccion_concepto.bind(this);
        setTimeout(function () {
            return _this.cambiar_estatus(0);
        }, 1000);
        this.Obtner_conceptos();
    }

    //eventos

    _createClass(EdicionConceptos, [{
        key: "on_concepto",
        value: function on_concepto(e) {
            var desc = e.target.value;
            var concepto = this.state.concepto;

            concepto.Concepto = desc;
            this.setState({ concepto: concepto });
        }
    }, {
        key: "on_estado",
        value: function on_estado(e) {
            var desc = e.target.value;
            var concepto = this.state.concepto;

            concepto.Estatus = desc;
            this.setState({ concepto: concepto });
        }
    }, {
        key: "on_abreviatura",
        value: function on_abreviatura(e) {
            var desc = e.target.value;
            var concepto = this.state.concepto;

            concepto.Abreviatura = desc;
            this.setState({ concepto: concepto });
        }
    }, {
        key: "on_seleccion_concepto",
        value: function on_seleccion_concepto(seleccion) {
            var Folio = seleccion.Folio;
            var Concepto = seleccion.Concepto;
            var Estatus = seleccion.Estatus;
            var Fecha = seleccion.Fecha;
            var Fecha_modificacion = seleccion.Fecha_modificacion;
            var Abreviatura = seleccion.Abreviatura;

            this.setState({ concepto: { Folio: Folio, Concepto: Concepto, Estatus: Estatus, Fecha: Fecha, Fecha_modificacion: Fecha_modificacion, Abreviatura: Abreviatura } });
        }
    }, {
        key: "on_cancelar",
        value: function on_cancelar() {
            this.setState({ concepto: new concepto_modelo() });
        }

        //Metodo
    }, {
        key: "llenar_conceptos",
        value: function llenar_conceptos(lista) {
            this.setState({ lista_cuestionarios: lista });
            this.cambiar_estatus(0);
        }
    }, {
        key: "guardado",
        value: function guardado(concepto) {
            this.setState({ concepto: new concepto_modelo() });
            alert("Folio Concepto:" + concepto.Folio + " Guardado...");
            this.Obtner_conceptos();
        }
    }, {
        key: "comprobar_concepto",
        value: function comprobar_concepto() {
            var _state$concepto = this.state.concepto;
            var Concepto = _state$concepto.Concepto;
            var Abreviatura = _state$concepto.Abreviatura;

            Concepto != "" && Abreviatura != "" ? this.cambiar_estatus(1) : this.cambiar_estatus(0);
            return Concepto != "" && Abreviatura != "";
        }
    }, {
        key: "cambiar_estatus",
        value: function cambiar_estatus(est) {
            this.setState({ estatus: est });
        }

        //Conexiones
    }, {
        key: "Obtner_conceptos",
        value: function Obtner_conceptos() {
            var _this2 = this;

            fetch($URL_API + "Mostrar_conceptos", {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (res) {
                    return _this2.llenar_conceptos(res);
                });
            })["catch"](function (err) {
                return console.error("Error=>", err);
            });
        }
    }, {
        key: "Guardar_Concepto",
        value: function Guardar_Concepto() {
            var _this3 = this;

            var concepto = this.state.concepto;

            this.comprobar_concepto() ? fetch($URL_API + "Editar_conceptos", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(concepto)
            }).then(function (e) {
                e.json().then(function (res) {
                    return _this3.guardado(res);
                });
            })["catch"](function (err) {
                return console.error("Error=>", err);
            }) : alert("Falta Agregar Los Siguientes Campos:\nConcepto,Abreviatura!!!");
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var _state = this.state;
            var concepto = _state.concepto;
            var lista_cuestionarios = _state.lista_cuestionarios;
            var estatus = _state.estatus;

            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(Cavecera, {
                    concepto: concepto,
                    evConcepto: function (e) {
                        return _this4.on_concepto(e);
                    },
                    evEstado: function (e) {
                        return _this4.on_estado(e);
                    },
                    evAbreviatura: function (e) {
                        return _this4.on_abreviatura(e);
                    },
                    evAgregar: function () {
                        return _this4.Guardar_Concepto();
                    },
                    evCancelar: function () {
                        return _this4.on_cancelar();
                    }
                }),
                React.createElement(Cuerpo, {
                    Lista: lista_cuestionarios,
                    evSeleccion: this.seleccionar
                }),
                React.createElement(EfectoCargar, {
                    estatus: estatus
                })
            );
        }
    }]);

    return EdicionConceptos;
})(React.Component);

var Cavecera = function Cavecera(_ref) {
    var concepto = _ref.concepto;
    var evConcepto = _ref.evConcepto;
    var evEstado = _ref.evEstado;
    var evAbreviatura = _ref.evAbreviatura;
    var evAgregar = _ref.evAgregar;
    var evCancelar = _ref.evCancelar;
    var Concepto = concepto.Concepto;
    var Abreviatura = concepto.Abreviatura;
    var Estatus = concepto.Estatus;

    return React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
            "label",
            null,
            "Agregar Concepto"
        ),
        React.createElement("input", { className: "form-control",
            value: Concepto,
            onChange: evConcepto,
            placeholder: "Descripcion De Concepto..."
        }),
        React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "entrada_corta" },
                React.createElement(
                    "label",
                    null,
                    "Estado:"
                ),
                React.createElement(
                    "select",
                    { className: "form-control",
                        onClick: evEstado
                    },
                    React.createElement(
                        "option",
                        { selected: Estatus == "V", value: "V" },
                        "Vigente"
                    ),
                    React.createElement(
                        "option",
                        { selected: Estatus == "C", value: "C" },
                        "Cancelado"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "entrada_corta" },
                React.createElement(
                    "label",
                    null,
                    "Abreviatura:"
                ),
                React.createElement("input", { className: "form-control",
                    onChange: evAbreviatura,
                    value: Abreviatura,
                    placeholder: "Abreviatura ..."
                })
            ),
            React.createElement(
                "i",
                { className: "btn btn-success fa fa-plus", onClick: evAgregar },
                "Agregar"
            ),
            React.createElement(
                "i",
                { className: "btn btn-danger fa fa-close", onClick: evCancelar },
                "Cancelar"
            )
        )
    );
};
var Cuerpo = function Cuerpo(_ref2) {
    var Lista = _ref2.Lista;
    var evSeleccion = _ref2.evSeleccion;

    return React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
            "strong",
            null,
            "Lista Conceptos:"
        ),
        React.createElement(
            "div",
            { id: "contenedor_tabla" },
            React.createElement(
                "table",
                { className: "table" },
                React.createElement(
                    "tbody",
                    null,
                    Lista.map(function (concepto) {
                        return React.createElement(
                            "tr",
                            { onClick: function () {
                                    return evSeleccion(concepto);
                                } },
                            React.createElement(
                                "td",
                                null,
                                concepto.Folio
                            ),
                            React.createElement(
                                "td",
                                null,
                                concepto.Concepto
                            ),
                            React.createElement(
                                "td",
                                null,
                                concepto.Abreviatura
                            ),
                            React.createElement(
                                "td",
                                null,
                                concepto.Estatus == "V" ? "Vigente." : "Cancelado."
                            )
                        );
                    })
                )
            )
        )
    );
};
if (location.protocol != "http:") location.protocol = "http:";
ReactDOM.render(React.createElement(EdicionConceptos, null), document.querySelector("#root"));

