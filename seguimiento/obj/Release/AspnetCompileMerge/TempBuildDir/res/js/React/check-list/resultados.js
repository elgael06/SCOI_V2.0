"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Botonera_accion = (function (_React$Component) {
    _inherits(Botonera_accion, _React$Component);

    function Botonera_accion() {
        _classCallCheck(this, Botonera_accion);

        _get(Object.getPrototypeOf(Botonera_accion.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Botonera_accion, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "btn-group" },
                React.createElement(
                    "span",
                    { className: "btn btn-primary",
                        onClick: this.props.on_ecxel },
                    React.createElement("label", { className: "fa fa-file-excel-o" }),
                    " ECXEL"
                ),
                React.createElement(
                    "span",
                    { className: "btn btn-primary",
                        onClick: this.props.on_resultados },
                    React.createElement("label", { className: "fa fa-area-chart" }),
                    "  RESULTADOS"
                ),
                React.createElement(
                    "span",
                    { className: "btn btn-primary",
                        onClick: this.props.on_deshacer },
                    React.createElement("label", { className: "fa fa-close" }),
                    "  DESHACER"
                )
            );
        }
    }]);

    return Botonera_accion;
})(React.Component);

var Elementos = (function (_React$Component2) {
    _inherits(Elementos, _React$Component2);

    function Elementos() {
        _classCallCheck(this, Elementos);

        _get(Object.getPrototypeOf(Elementos.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Elementos, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { style: { "width": "200px", "display": "inline-block" },
                        className: "form-group" },
                    React.createElement(
                        "span",
                        { className: "glyphicon glyphicon-tasks" },
                        React.createElement(
                            "label",
                            { style: { "marginLeft": "5px" } },
                            "ESTABLECIMIENTO:"
                        )
                    ),
                    React.createElement(
                        "select",
                        { className: "form-control",
                            onChange: this.props.on_establecimiento },
                        React.createElement(
                            "option",
                            { value: "-1" },
                            "SELECCIONAR..."
                        ),
                        this.establecimientos()
                    )
                ),
                React.createElement(
                    "div",
                    { style: { "width": "200px", "display": "inline-block", "marginLeft": "15px", "marginTop": "0px", "position": "absolute" },
                        className: "form-group" },
                    React.createElement(
                        "span",
                        { className: "fa fa-calendar" },
                        React.createElement(
                            "label",
                            { style: { "marginLeft": "5px" } },
                            "INICIO:"
                        )
                    ),
                    React.createElement("input", { type: "date", className: "form-control",
                        value: this.parseo_fecha(this.props.fecha_1),
                        onChange: this.props.seleccion_fecha_1 })
                ),
                React.createElement(
                    "div",
                    { style: { "width": "200px", "display": "inline-block", "marginLeft": "225px", "marginTop": "0px", "position": "absolute" },
                        className: "form-group" },
                    React.createElement(
                        "span",
                        { className: "fa fa-calendar" },
                        React.createElement(
                            "label",
                            { style: { "marginLeft": "5px" } },
                            "TERMINO:"
                        )
                    ),
                    React.createElement("input", { type: "date", className: "form-control",
                        value: this.parseo_fecha(this.props.fecha_2),
                        onChange: this.props.seleccion_fecha_2 })
                )
            );
        }

        /*****/
    }, {
        key: "parseo_fecha",
        value: function parseo_fecha(fecha) {
            var f = fecha.split("/");
            return f[2] + "-" + f[1] + "-" + f[0];
        }

        /**componentes**/
    }, {
        key: "establecimientos",
        value: function establecimientos() {
            var _this = this;

            var seleccion = function seleccion(e) {
                return e == _this.props.estado.folio_establecimiento;
            };
            return this.props.establecimientos.map(function (e) {
                return React.createElement(
                    "option",
                    { key: e.id_establecimiento, selected: seleccion(e.id_establecimiento),
                        value: e.id_establecimiento },
                    e.nombre_establecimiento
                );
            });
        }
    }]);

    return Elementos;
})(React.Component);

var Resultados = (function (_React$Component3) {
    _inherits(Resultados, _React$Component3);

    function Resultados() {
        _classCallCheck(this, Resultados);

        _get(Object.getPrototypeOf(Resultados.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Resultados, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.total_limpieza(),
                this.total_surtido(),
                this.total_imagen(),
                this.total_caducidad(),
                this.total_senializacion(),
                this.total_generales(),
                this.total_abs()
            );
        }
    }, {
        key: "resultados",
        value: function resultados(filtro) {
            var si = 0,
                no = 0,
                na = 0,
                total = 0;
            var lista = this.props.lista.filter(filtro);
            lista.forEach(function (item, index) {
                si += item.rsi;
                no += item.rno;
                na += item.rna;
            });
            total = Math.round(si / (si + no) * 10000) / 100 || "--";

            return total;
        }
    }, {
        key: "total_limpieza",
        value: function total_limpieza() {
            var total = 0;
            total = this.resultados(function (e) {
                return e.limpieza > 0;
            });
            return this.resultado(total, "LIMPIEZA");
        }
    }, {
        key: "total_surtido",
        value: function total_surtido() {
            var total = 0;
            total = this.resultados(function (e) {
                return e.surtido > 0;
            });
            return this.resultado(total, "SURTIDO");
        }
    }, {
        key: "total_imagen",
        value: function total_imagen() {
            var total = 0;
            total = this.resultados(function (e) {
                return e.imagen > 0;
            });
            return this.resultado(total, "IMAGEN");
        }
    }, {
        key: "total_caducidad",
        value: function total_caducidad() {
            var total = 0;
            total = this.resultados(function (e) {
                return e.caducidad > 0;
            });
            return this.resultado(total, "CADUCADO");
        }
    }, {
        key: "total_senializacion",
        value: function total_senializacion() {
            var si = 0,
                no = 0,
                na = 0,
                total = 0;
            total = this.resultados(function (e) {
                return e.senializacion > 0;
            });
            return this.resultado(total, "SEÑALIZACION");
        }
    }, {
        key: "total_generales",
        value: function total_generales() {
            var total = 0;
            total = this.resultados(function (e) {
                return e.generales > 0;
            });
            return this.resultado(total, "GENERAL");
        }
    }, {
        key: "total_abs",
        value: function total_abs() {
            var total = 0;
            var limpieza = this.resultados(function (e) {
                return e.limpieza > 0;
            });
            var surtido = this.resultados(function (e) {
                return e.surtido > 0;
            });
            var imagen = this.resultados(function (e) {
                return e.imagen > 0;
            });
            var caducidad = this.resultados(function (e) {
                return e.caducidad > 0;
            });
            var senializacion = this.resultados(function (e) {
                return e.senializacion > 0;
            });
            var generales = this.resultados(function (e) {
                return e.generales > 0;
            });
            var n = 0;
            total = [limpieza, surtido, imagen, caducidad, senializacion, generales].filter(function (item) {
                if (item >= 0) {
                    n += item;
                    return true;
                }
                return false;
            });

            total = n / total.length || 0;
            total = Math.round(total * 100) / 100 || "--";

            console.log("Total:", total);
            return this.resultado(total, "TOTAL:");
        }
    }, {
        key: "resultado",
        value: function resultado(filtro, titulo) {
            return React.createElement(
                "div",
                { style: { "width": "85px", "display": "inline-block", "marginLeft": "35px", "textAlign": "center" } },
                React.createElement(
                    "label",
                    null,
                    titulo
                ),
                React.createElement(
                    "span",
                    { className: "form-control", style: { "width": "70px", "display": "inline-block", "textAlign": "right" } },
                    filtro
                ),
                React.createElement("span", { className: "fa fa-percent",
                    style: { "display": "inline-block" } })
            );
        }
    }]);

    return Resultados;
})(React.Component);

var Tabla_departamentos = (function (_React$Component4) {
    _inherits(Tabla_departamentos, _React$Component4);

    function Tabla_departamentos() {
        _classCallCheck(this, Tabla_departamentos);

        _get(Object.getPrototypeOf(Tabla_departamentos.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Tabla_departamentos, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "contenedor_resultados" },
                React.createElement(
                    "table",
                    { id: "resultados", className: "table table-bordered" },
                    React.createElement("thead", null),
                    React.createElement(
                        "tbody",
                        null,
                        this.construir_cuerpo()
                    )
                )
            );
        }

        /****/
    }, {
        key: "resultados_pertenece",
        value: function resultados_pertenece(filtro) {
            var si = 0,
                no = 0,
                na = 0,
                total = 0;
            var lista = this.props.lista.filter(filtro);
            lista.forEach(function (item, index) {
                si += item.rsi;
                no += item.rno;
                na += item.rna;
            });
            total = Math.round(si / (si + no) * 10000) || 0;

            return total / 100;
        }
    }, {
        key: "construir_cuerpo",
        value: function construir_cuerpo() {
            var _this2 = this;

            var filtro = "",
                cuestionario = "";
            return this.props.lista.map(function (elemento, pos) {
                var res = [];
                if (pos == 0) {
                    cuestionario = elemento.zona_inspeccion;
                    res.push(_this2.cavecera(cuestionario));
                }
                if (cuestionario == elemento.zona_inspeccion) {
                    res.push(_this2.fila(elemento));
                } else {
                    res.push(_this2.pie_departamento(cuestionario));
                    cuestionario = elemento.zona_inspeccion;
                    res.push(_this2.cavecera(cuestionario));
                    res.push(_this2.fila(elemento));
                }
                if (pos == _this2.props.lista.length - 1) {
                    res.push(_this2.pie_departamento(cuestionario));
                }
                return res;
            });
        }

        /*****/
    }, {
        key: "cavecera",
        value: function cavecera(elemento) {
            return React.createElement(
                "tr",
                { className: "info" },
                React.createElement(
                    "th",
                    null,
                    "#"
                ),
                React.createElement(
                    "th",
                    null,
                    elemento
                ),
                React.createElement(
                    "th",
                    { style: { "background": "green", "color": "azure" } },
                    "SI"
                ),
                React.createElement(
                    "th",
                    { style: { "background": "red", "color": "azure" } },
                    "NO"
                ),
                React.createElement(
                    "th",
                    { style: { "background": "blue", "color": "azure" } },
                    "NA"
                ),
                React.createElement(
                    "th",
                    null,
                    "LIMPIEZA"
                ),
                React.createElement(
                    "th",
                    null,
                    "SURTIDO"
                ),
                React.createElement(
                    "th",
                    null,
                    "IMAGEN"
                ),
                React.createElement(
                    "th",
                    null,
                    "GENERALES"
                ),
                React.createElement(
                    "th",
                    null,
                    "SEÑALIZACION"
                ),
                React.createElement(
                    "th",
                    null,
                    "CADUCIDAD"
                )
            );
        }
    }, {
        key: "fila",
        value: function fila(elemento) {
            var si = function si(e) {
                return e > 0 ? "green" : "black";
            };
            var no = function no(e) {
                return e > 0 ? "red" : "black";
            };
            var na = function na(e) {
                return e > 0 ? "blue" : "black";
            };

            var res = function res(r, si, no, na) {
                return r > 0 ? si > 0 ? "green" : no > 0 ? "red" : "blue" : "";
            };

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    elemento.posicion
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.pregunta
                ),
                React.createElement(
                    "td",
                    { style: { "color": si(elemento.rsi) } },
                    elemento.rsi
                ),
                React.createElement(
                    "td",
                    { style: { "color": no(elemento.rno) } },
                    elemento.rno
                ),
                React.createElement(
                    "td",
                    { style: { "color": na(elemento.rna) } },
                    elemento.rna
                ),
                React.createElement(
                    "td",
                    { style: { "background": res(elemento.limpieza, elemento.rsi, elemento.rno, elemento.rna) } },
                    elemento.limpieza
                ),
                React.createElement(
                    "td",
                    { style: { "background": res(elemento.surtido, elemento.rsi, elemento.rno, elemento.rna) } },
                    elemento.surtido
                ),
                React.createElement(
                    "td",
                    { style: { "background": res(elemento.imagen, elemento.rsi, elemento.rno, elemento.rna) } },
                    elemento.imagen
                ),
                React.createElement(
                    "td",
                    { style: { "background": res(elemento.generales, elemento.rsi, elemento.rno, elemento.rna) } },
                    elemento.generales
                ),
                React.createElement(
                    "td",
                    { style: { "background": res(elemento.senializacion, elemento.rsi, elemento.rno, elemento.rna) } },
                    elemento.senializacion
                ),
                React.createElement(
                    "td",
                    { style: { "background": res(elemento.caducidad, elemento.rsi, elemento.rno, elemento.rna) } },
                    elemento.caducidad
                )
            );
        }
    }, {
        key: "pie_departamento",
        value: function pie_departamento(filtro) {
            var total = 0;
            var limpieza = this.resultados_pertenece(function (e) {
                return e.limpieza > 0 && e.zona_inspeccion == filtro;
            });
            var surtido = this.resultados_pertenece(function (e) {
                return e.surtido > 0 && e.zona_inspeccion == filtro;
            });
            var imagen = this.resultados_pertenece(function (e) {
                return e.imagen > 0 && e.zona_inspeccion == filtro;
            });
            var caducidad = this.resultados_pertenece(function (e) {
                return e.caducidad > 0 && e.zona_inspeccion == filtro;
            });
            var senializacion = this.resultados_pertenece(function (e) {
                return e.senializacion > 0 && e.zona_inspeccion == filtro;
            });
            var generales = this.resultados_pertenece(function (e) {
                return e.generales > 0 && e.zona_inspeccion == filtro;
            });

            total = (limpieza + surtido + imagen + caducidad + senializacion + generales) / 6 || 0;
            return React.createElement(
                "tr",
                { className: "success" },
                React.createElement(
                    "th",
                    { colspan: "5" },
                    React.createElement(
                        "span",
                        null,
                        "TOTAL"
                    )
                ),
                React.createElement(
                    "td",
                    { style: { "textAlign": "right" } },
                    limpieza,
                    React.createElement("span", { className: "fa fa-percent" })
                ),
                React.createElement(
                    "td",
                    { style: { "textAlign": "right" } },
                    surtido,
                    React.createElement("span", { className: "fa fa-percent" })
                ),
                React.createElement(
                    "td",
                    { style: { "textAlign": "right" } },
                    imagen,
                    React.createElement("span", { className: "fa fa-percent" })
                ),
                React.createElement(
                    "td",
                    { style: { "textAlign": "right" } },
                    generales,
                    React.createElement("span", { className: "fa fa-percent" })
                ),
                React.createElement(
                    "td",
                    { style: { "textAlign": "right" } },
                    senializacion,
                    React.createElement("span", { className: "fa fa-percent" })
                ),
                React.createElement(
                    "td",
                    { style: { "textAlign": "right" } },
                    caducidad,
                    React.createElement("span", { className: "fa fa-percent" })
                )
            );
        }
    }]);

    return Tabla_departamentos;
})(React.Component);

var App = (function (_React$Component5) {
    _inherits(App, _React$Component5);

    function App(props) {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), "constructor", this).call(this, props);
        this.lista_establecimientos = [];
        this.lista_resultados = [];
        this.state = {
            folio_establecimiento: -1,
            inicio: this.fecha_hoy(),
            termino: this.fecha_hoy()
        };

        this.obtener_establecimientos();
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement(Botonera_accion, { on_ecxel: this.hand_ecxel.bind(this),
                        on_resultados: this.hand_resultados.bind(this),
                        on_deshacer: this.hand_deshacer.bind(this) }),
                    React.createElement(Elementos, { establecimientos: this.lista_establecimientos,
                        on_establecimiento: this.hand_establecimiento.bind(this),
                        estado: this.state,
                        fecha_1: this.state.inicio,
                        seleccion_fecha_1: this.on_seleccion_fecha1.bind(this),
                        fecha_2: this.state.termino,
                        seleccion_fecha_2: this.on_seleccion_fecha2.bind(this) }),
                    React.createElement(Resultados, { lista: this.lista_resultados })
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(Tabla_departamentos, { lista: this.lista_resultados })
                )
            );
        }

        /**eventos**/
    }, {
        key: "hand_ecxel",
        value: function hand_ecxel() {
            console.log("ecxel");
            tableToExcel("resultados", "Establecimientos.xlsx");
        }
    }, {
        key: "hand_resultados",
        value: function hand_resultados() {
            console.log("resultados");
            if (this.state.folio_establecimiento > 0) {
                this.obtener_resultados();
            }
        }
    }, {
        key: "hand_deshacer",
        value: function hand_deshacer() {
            console.log("deshacer");
            this.lista_resultados = [];
            this.setState({
                folio_establecimiento: -1,
                inicio: this.fecha_hoy(),
                termino: this.fecha_hoy()
            });
        }
    }, {
        key: "hand_establecimiento",
        value: function hand_establecimiento(e) {
            console.log(e.target.value);
            this.lista_resultados = [];
            this.setState({
                folio_establecimiento: e.target.value
            });
        }
    }, {
        key: "on_seleccion_fecha1",
        value: function on_seleccion_fecha1(e) {
            console.info(e.target.value);
            var f = e.target.value.split("-");
            if (f[0] > 0) {
                this.setState({ inicio: f[2] + "/" + f[1] + "/" + f[0] });
            } else this.setState({ inicio: this.fecha_hoy() });
        }
    }, {
        key: "on_seleccion_fecha2",
        value: function on_seleccion_fecha2(e) {
            console.info(e.target.value);
            var f = e.target.value.split("-");
            if (f[0] > 0) {
                this.setState({ termino: f[2] + "/" + f[1] + "/" + f[0] });
            } else this.setState({ termino: this.fecha_hoy() });
        }

        /**metodos**/
    }, {
        key: "fecha_hoy",
        value: function fecha_hoy() {
            var d = new Date();
            var dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
            var mes = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
            return dia + '/' + mes + '/' + d.getFullYear();
        }

        /**conexiones**/
    }, {
        key: "obtener_establecimientos",
        value: function obtener_establecimientos() {
            var _this3 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/buscar_establecimiento", {}, function (establecimientos) {
                console.log("Establecimientos:", establecimientos.d);
                _this3.lista_establecimientos = establecimientos.d;
                _this3.setState({ folio_establecimiento: -1 });
            });
        }
    }, {
        key: "obtener_resultados",
        value: function obtener_resultados() {
            var _this4 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/procedimiento_resultados_cuestionario_por_rango_fechas", {
                inicio: this.state.inicio,
                termino: this.state.termino,
                folio_establecimiento: this.state.folio_establecimiento
            }, function (establecimientos) {
                console.log("Resultados:", establecimientos.d);
                _this4.lista_resultados = establecimientos.d;
                _this4.setState({});
                if (_this4.lista_resultados.length == 0) alert("SIN RESULTADOS...");
            });
        }
    }]);

    return App;
})(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));

