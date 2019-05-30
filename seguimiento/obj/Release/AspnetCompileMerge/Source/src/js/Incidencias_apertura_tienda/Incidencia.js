"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $MI_URL = window.location.protocol + "//" + window.location.hostname;
var $URL_API = $MI_URL + ":90/api/";

var Incicencias_apertura = (function (_React$Component) {
    _inherits(Incicencias_apertura, _React$Component);

    function Incicencias_apertura(props) {
        var _this = this;

        _classCallCheck(this, Incicencias_apertura);

        _get(Object.getPrototypeOf(Incicencias_apertura.prototype), "constructor", this).call(this, props);
        this.state = {
            carga: 1,
            Folio: 4,
            Fecha: "",
            establecimientos: [],
            incidencias: [],
            seleccion: {}
        };
        this.obtener_estableciminetos();
        setTimeout(function () {
            return _this.efectoCarga(0);
        }, 1000);
    }

    //eventos

    _createClass(Incicencias_apertura, [{
        key: "on_estableciminento",
        value: function on_estableciminento(e) {
            var $folio = e.target.value;
            console.log("Folio=" + $folio);
            this.setState({ Folio: $folio, incidencias: [] });
        }
    }, {
        key: "on_recargar",
        value: function on_recargar() {
            console.log("Recargar");
            this.state.Fecha != "" ? this.obtener_incidencias() : alert("Seleccione Fecha...");
        }
    }, {
        key: "on_fecha",
        value: function on_fecha(e) {
            var $fecha = this.parseo_fecha(e.target.value);
            console.log("Fecha=" + $fecha);
            this.setState({ Fecha: $fecha, incidencias: [] });
        }
    }, {
        key: "on_resultados",
        value: function on_resultados() {
            console.log("resultados");
        }
    }, {
        key: "on_seleccion_departamento",
        value: function on_seleccion_departamento(select) {
            document.querySelector("#modal_incidencias").style.display = "flex";
            console.log(select);
            this.setState({ seleccion: select });
        }

        //metodos
    }, {
        key: "parseo_fecha",
        value: function parseo_fecha(f) {
            f = f.split("-");
            return f[2] + "-" + f[1] + "-" + f[0];
        }
    }, {
        key: "llenar_estableciminetos",
        value: function llenar_estableciminetos(lista) {
            console.log(lista);
            var folio = lista[0].folio;
            this.setState({ establecimientos: lista, Folio: folio });
        }
    }, {
        key: "llenar_incidencias",
        value: function llenar_incidencias(lista) {
            var _this2 = this;

            console.log(lista);
            setTimeout(function () {
                return _this2.efectoCarga(0);
            }, 500);
            lista.length > 0 ? this.setState({ incidencias: lista }) : alert("Sin Datos A Mostrar!!!");
        }
    }, {
        key: "efectoCarga",
        value: function efectoCarga(estatus) {
            this.setState({ carga: estatus });
        }

        //conexiones
    }, {
        key: "obtener_incidencias",
        value: function obtener_incidencias() {
            var _this3 = this;

            var _state = this.state;
            var Folio = _state.Folio;
            var Fecha = _state.Fecha;

            this.efectoCarga(1);
            console.log(Folio, Fecha);
            fetch($URL_API + "IncidenciasObservacionesApertura?Folio=" + Folio + "&Fecha=" + Fecha, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (lista) {
                    return _this3.llenar_incidencias(lista.Observaciones);
                });
            })["catch"](function (err) {
                return console.log("error=>", err);
            });
        }
    }, {
        key: "obtener_estableciminetos",
        value: function obtener_estableciminetos() {
            var _this4 = this;

            fetch($URL_API + "obtener_establecimientos", {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (lista) {
                    return _this4.llenar_estableciminetos(lista);
                });
            })["catch"](function (err) {
                return console.log("error=>", err);
            });
        }

        //render
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var _state2 = this.state;
            var establecimientos = _state2.establecimientos;
            var incidencias = _state2.incidencias;
            var carga = _state2.carga;
            var seleccion = _state2.seleccion;

            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(Cavecera, {
                    estableciminetos: establecimientos,
                    evEstablecimiento: function (e) {
                        return _this5.on_estableciminento(e);
                    },
                    evRecargar: function () {
                        return _this5.on_recargar();
                    },
                    evFecha: function (e) {
                        return _this5.on_fecha(e);
                    },
                    evResultados: function () {
                        return _this5.on_resultados();
                    }
                }),
                React.createElement(Departamentos, {
                    departamentos: incidencias,
                    evSeleccion: function (e) {
                        return _this5.on_seleccion_departamento(e);
                    }
                }),
                React.createElement(IncidenciasDepartamento, {
                    titulo: seleccion.Cuestionario || "NA"
                }),
                React.createElement(EfectoCargar, {
                    estatus: carga
                })
            );
        }
    }]);

    return Incicencias_apertura;
})(React.Component);

var Cavecera = function Cavecera(_ref) {
    var estableciminetos = _ref.estableciminetos;
    var evEstablecimiento = _ref.evEstablecimiento;
    var evRecargar = _ref.evRecargar;
    var evFecha = _ref.evFecha;
    var evResultados = _ref.evResultados;

    return React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
            "strong",
            null,
            "Incidencias"
        ),
        React.createElement("hr", null),
        React.createElement(
            "select",
            { className: "form-control",
                onChange: evEstablecimiento,
                style: { width: "280px", display: "inline-block" } },
            estableciminetos.map(function (e) {
                return React.createElement(
                    "option",
                    { value: e.folio },
                    e.nombre
                );
            })
        ),
        React.createElement("i", { className: "btn btn-success fa fa-refresh",
            style: { marginLeft: "10px", fontSize: "16px", borderRadius: "20px" },
            onClick: evRecargar }),
        React.createElement("input", { type: "date",
            className: "btn btn-default",
            onChange: evFecha,
            style: { marginLeft: "10px" }
        }),
        React.createElement("i", { className: "btn btn-primary fa fa-table",
            style: { marginLeft: "10px", fontSize: "20px" },
            onClick: evResultados })
    );
};
var Departamentos = function Departamentos(_ref2) {
    var departamentos = _ref2.departamentos;
    var evSeleccion = _ref2.evSeleccion;

    var ViewDepartamento = function ViewDepartamento(_ref3) {
        var departamento = _ref3.departamento;

        var indicardor = function indicardor(e) {
            return e > 0 ? "#eea236" : "#FFFFFF";
        };
        return React.createElement(
            "div",
            { className: "viewDepartamento", onClick: function () {
                    return evSeleccion(departamento);
                } },
            React.createElement("strong", { className: "fa fa-list", style: { float: "left", padding: "10px", fontSize: "25px" } }),
            React.createElement(
                "h4",
                { style: { borderBottom: "solid 15px " + indicardor(departamento.NoResueltas) } },
                departamento.Cuestionario
            ),
            React.createElement(
                "span",
                { className: "contenedor_indicadores_por_departamento" },
                React.createElement(
                    "label",
                    { className: "btn btn-success" },
                    departamento.Solucionadas,
                    React.createElement("i", { className: "fa fa-calendar-check-o" })
                ),
                React.createElement(
                    "label",
                    { className: "btn btn-default" },
                    departamento.NoAplica,
                    React.createElement("i", { className: " \tfa fa-calendar-minus-o" })
                ),
                React.createElement(
                    "label",
                    { className: "btn btn-warning" },
                    departamento.NoResueltas,
                    React.createElement("i", { className: "fa fa-calendar-o" })
                ),
                React.createElement(
                    "label",
                    { className: "btn btn-danger" },
                    departamento.SinSolucion,
                    React.createElement("i", { className: "fa fa-calendar-times-o" })
                )
            )
        );
    };

    return React.createElement(
        "div",
        { className: "panel-body",
            id: "contenedor_viewDepartamentos" },
        departamentos.map(function (e) {
            return React.createElement(ViewDepartamento, { departamento: e });
        })
    );
};

var IncidenciasDepartamento = function IncidenciasDepartamento(_ref4) {
    var titulo = _ref4.titulo;

    var cerrar = function cerrar() {
        document.querySelector("#modal_incidencias").style.display = "none";
    };
    return React.createElement(
        "div",
        { className: "animate", id: "modal_incidencias" },
        React.createElement(
            "div",
            { className: "panel panel-info" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement("i", { className: "fa fa-close close", onClick: cerrar }),
                React.createElement(
                    "h4",
                    null,
                    React.createElement("i", { className: "fa fa-edit" }),
                    "  ",
                    titulo
                )
            ),
            React.createElement("div", { className: "panel-body" })
        )
    );
};

if (location.protocol != "http:") location.protocol = "http:";

ReactDOM.render(React.createElement(Incicencias_apertura, null), document.querySelector("#root"));

