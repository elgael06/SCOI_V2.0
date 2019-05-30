//variables Globales
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ESTABLECIMIENTOS = conexion_ajax("servicios/checkListServ.asmx/buscar_establecimiento");

var establecimieto = new objEstablecimieto();

/************************
    botonera header
************************/

var Header_btn = (function (_React$Component) {
    _inherits(Header_btn, _React$Component);

    function Header_btn(props) {
        _classCallCheck(this, Header_btn);

        _get(Object.getPrototypeOf(Header_btn.prototype), "constructor", this).call(this, props);
        this.state = { fecha: establecimieto.getFecha };
    }

    /************************
        selector Sucursal
    ************************/

    _createClass(Header_btn, [{
        key: "render",
        value: function render() {
            var _this = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "btn-group" },
                    React.createElement("input", { type: "button", className: "btn btn-primary", onClick: function () {
                            return _this.actualizar();
                        }, value: "Actualizar" }),
                    React.createElement("input", { type: "button", className: "btn btn-primary", value: "Resultados", "data-toggle": "modal", "data-target": "#modal_reporte", onClick: function () {
                            return _this.resultados();
                        } }),
                    React.createElement("input", { type: "button", className: "btn btn-primary", value: "Observaciones", "data-toggle": "modal", "data-target": "#modal_reporte", onClick: function () {
                            return _this.reporte_observaciones();
                        } })
                ),
                React.createElement(
                    "div",
                    { className: "contenedor_calendario" },
                    React.createElement(
                        "div",
                        { className: "input-group" },
                        React.createElement(
                            "span",
                            { className: "input-group-addon" },
                            React.createElement("i", { className: "fa fa-calendar" })
                        ),
                        React.createElement("input", { type: "date", className: "form-control", value: this.state.fecha, onChange: function (e) {
                                _this.asignar_fecha(e);
                            } })
                    )
                )
            );
        }
    }, {
        key: "actualizar",
        value: function actualizar() {
            if (establecimieto.getId > 0) {
                establecimieto.setLista_cuestionarios = establecimieto.getId;
                Render_header_comp();
                Render_body_comp();
            } else alert("seleccione un Establecimiento!!!");
        }
    }, {
        key: "asignar_fecha",
        value: function asignar_fecha(e) {
            establecimieto.setFecha = e.target.value;
            this.setState({ fecha: e.target.value });
        }
    }, {
        key: "reporte_observaciones",
        value: function reporte_observaciones() {
            var f = establecimieto.getFecha.split("-");
            var datos = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { 'folio_establecimiento': establecimieto.getId, 'fecha': f[2] + "-" + f[1] + "-" + f[0] });

            obtener_observaciones(datos);
        }
    }, {
        key: "resultados",
        value: function resultados() {
            var f = establecimieto.getFecha.split("-");
            var r = conexion_ajax("servicios/checkListServ.asmx/procedimiento_resultados_cuestionario_por_dia", { 'fecha': f[2] + "-" + f[1] + "-" + f[0], 'folio_establecimiento': establecimieto.getId });
            resultados_ckl(r);
        }
    }]);

    return Header_btn;
})(React.Component);

var Selector_sucursales = (function (_React$Component2) {
    _inherits(Selector_sucursales, _React$Component2);

    function Selector_sucursales() {
        _classCallCheck(this, Selector_sucursales);

        _get(Object.getPrototypeOf(Selector_sucursales.prototype), "constructor", this).apply(this, arguments);
    }

    /************************
        selector lider
    ************************/

    _createClass(Selector_sucursales, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon" },
                    React.createElement("i", { className: "fa fa-edit" }),
                    " Establecimiento "
                ),
                React.createElement(
                    "select",
                    { className: "form-control", id: "establecimientos", onChange: function (e) {
                            _this2.cambio_establecimiento(e);
                        } },
                    React.createElement(
                        "option",
                        { value: "" },
                        "Seleccionar Establecimientos"
                    ),
                    this.lista_establecimientos()
                )
            );
        }
    }, {
        key: "lista_establecimientos",
        value: function lista_establecimientos() {
            var r = ESTABLECIMIENTOS.map(function (est) {
                return React.createElement(
                    "option",
                    { key: est.id_establecimiento, value: est.id_establecimiento },
                    est.nombre_establecimiento
                );
            });
            return r;
        }
    }, {
        key: "cambio_establecimiento",
        value: function cambio_establecimiento(e) {
            var est = ESTABLECIMIENTOS.filter(function (est) {
                return est.id_establecimiento == e.target.value;
            });

            establecimieto.setId = e.target.value;
            establecimieto.setNombre = est[0].nombre_establecimiento;
            establecimieto.setEncargado = {
                folio: 0,
                nombre: "",
                puesto: ""
            };
            Render_header_comp();
            Render_body_comp();
        }
    }]);

    return Selector_sucursales;
})(React.Component);

var Selector_lideres = (function (_React$Component3) {
    _inherits(Selector_lideres, _React$Component3);

    function Selector_lideres() {
        _classCallCheck(this, Selector_lideres);

        _get(Object.getPrototypeOf(Selector_lideres.prototype), "constructor", this).apply(this, arguments);
    }

    /************************
        filtro lider
    ************************/

    _createClass(Selector_lideres, [{
        key: "render",
        value: function render() {
            var lider = this.props.lider;
            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon", "data-toggle": "modal", "data-target": "#modal_lideres" },
                    React.createElement("i", { className: "glyphicon glyphicon-user" }),
                    " Encargado"
                ),
                React.createElement("input", { className: "form-control", id: "Nom_Encargados", value: lider.nombre, type: "text", disabled: true })
            );
        }
    }]);

    return Selector_lideres;
})(React.Component);

var Lideres = (function (_React$Component4) {
    _inherits(Lideres, _React$Component4);

    function Lideres(props) {
        _classCallCheck(this, Lideres);

        _get(Object.getPrototypeOf(Lideres.prototype), "constructor", this).call(this, props);
        this.lideres_tienda = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" });
        this.lideres_tienda.sort(function (a, b) {
            if (a.nombre > b.nombre) {
                return 1;
            }
            if (a.nombre < b.nombre) {
                return -1;
            }
            return 0;
        });
    }

    /***************************************************
            cuerpo de modal
    ***************************************************/

    _createClass(Lideres, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal-dialog", style: { "width": "97%", "height": "600px" } },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(Header_Modal_lideres, { seleccion: establecimieto.getEncargado.nombre, titulo: "Responsable Tienda" }),
                    React.createElement(Body_modal_lideres, { datos: this.lideres_tienda })
                )
            );
        }
    }]);

    return Lideres;
})(React.Component);

var Header_Modal_lideres = (function (_React$Component5) {
    _inherits(Header_Modal_lideres, _React$Component5);

    function Header_Modal_lideres() {
        _classCallCheck(this, Header_Modal_lideres);

        _get(Object.getPrototypeOf(Header_Modal_lideres.prototype), "constructor", this).apply(this, arguments);
    }

    /***************************************************
            cuerpo de modal lider
    ***************************************************/

    _createClass(Header_Modal_lideres, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal-header" },
                React.createElement(
                    "button",
                    { type: "button", className: "close", "data-dismiss": "modal" },
                    "×"
                ),
                React.createElement(
                    "label",
                    null,
                    this.props.titulo
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "Seleccion :"
                    ),
                    React.createElement("input", { className: "form-control", type: "text", disabled: true, value: this.props.seleccion, placeholder: "Seleccione De La Tabla..." })
                )
            );
        }
    }]);

    return Header_Modal_lideres;
})(React.Component);

var Body_modal_lideres = (function (_React$Component6) {
    _inherits(Body_modal_lideres, _React$Component6);

    function Body_modal_lideres(props) {
        _classCallCheck(this, Body_modal_lideres);

        _get(Object.getPrototypeOf(Body_modal_lideres.prototype), "constructor", this).call(this, props);
        this.datos = props.datos;
        this.state = {
            encargado: "",
            filtro: this.datos
        };
    }

    //funcion de renderizado

    _createClass(Body_modal_lideres, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "modal-body" },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "Filtro : "
                    ),
                    React.createElement("input", { className: "form-control", type: "text", placeholder: "Filtro...", onChange: function (e) {
                            _this3.cambioTexto(e);
                        } })
                ),
                this.crear_tabla()
            );
        }
    }, {
        key: "cambioTexto",
        value: function cambioTexto(e) {
            var filtrados = this.datos.filter(function (a) {
                return a.nombre.toUpperCase().search(e.target.value.toUpperCase()) >= 0 || a.puesto.toUpperCase().search(e.target.value.toUpperCase()) >= 0 ? true : false;
            });
            this.setState({
                encargado: "", filtro: e.target.value === "" ? this.datos : filtrados
            });
        }
    }, {
        key: "crear_tabla",
        value: function crear_tabla() {
            return React.createElement(
                "div",
                { className: "tabla_lideres" },
                React.createElement(
                    "table",
                    { className: "table table-bordered" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            { className: "info cavecera_tabla_lideres" },
                            React.createElement(
                                "th",
                                null,
                                "ID"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "NOMBRE"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "PUESTO"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.lista()
                    )
                )
            );
        }
    }, {
        key: "lista",
        value: function lista() {
            var _this4 = this;

            var r = this.state.filtro.map(function (empleado) {
                return React.createElement(
                    "tr",
                    { key: empleado.folio, style: { "background": "white" }, onClick: function () {
                            _this4.seleccion(empleado);
                        } },
                    React.createElement(
                        "td",
                        null,
                        empleado.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        empleado.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        empleado.puesto
                    )
                );
            });
            return r;
        }
    }, {
        key: "seleccion",
        value: function seleccion(dato) {
            this.setState({ encargado: dato.nombre });
            establecimieto.setEncargado = dato;
            Render_header_comp();
        }
    }]);

    return Body_modal_lideres;
})(React.Component);

function Render_header_comp() {
    //hedader
    ReactDOM.render(React.createElement(
        "div",
        null,
        React.createElement(
            "h2",
            null,
            "Check List. Mejora Continua."
        ),
        React.createElement(Header_btn, null),
        React.createElement(Selector_sucursales, null),
        React.createElement(Selector_lideres, { lider: establecimieto.getEncargado })
    ), document.getElementById("cavecera"));
    //modal
    ReactDOM.render(React.createElement(Lideres, null), document.getElementById("modal_lideres"));
}
/*******************************
     agregar Cuestionario a ckl
*******************************/

var Agergar_cuestionarios = (function (_React$Component7) {
    _inherits(Agergar_cuestionarios, _React$Component7);

    function Agergar_cuestionarios() {
        _classCallCheck(this, Agergar_cuestionarios);

        _get(Object.getPrototypeOf(Agergar_cuestionarios.prototype), "constructor", this).apply(this, arguments);
    }

    /***************************************************
                modal de lista cuestionario
    ***************************************************/

    _createClass(Agergar_cuestionarios, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.checar_permiso()
            );
        }
    }, {
        key: "abrir",
        value: function abrir() {
            establecimieto.setCuestionario = { folio: 0, nom_cuestionario: "", estatus: false };
            Render_body_comp();
        }
    }, {
        key: "checar_permiso",
        value: function checar_permiso() {
            var _this5 = this;

            if (true) {
                return React.createElement("input", { type: "button", className: "btn btn-success btn-block", onClick: function () {
                        return _this5.abrir();
                    }, value: "Gestion Cuestionarios", "data-toggle": "modal", "data-target": "#modal_cuestionarios" });
            } else {
                return React.createElement(
                    "h3",
                    null,
                    "Cuestionarios"
                );
            }
        }
    }]);

    return Agergar_cuestionarios;
})(React.Component);

var Modal_cuestionarios = (function (_React$Component8) {
    _inherits(Modal_cuestionarios, _React$Component8);

    function Modal_cuestionarios() {
        _classCallCheck(this, Modal_cuestionarios);

        _get(Object.getPrototypeOf(Modal_cuestionarios.prototype), "constructor", this).apply(this, arguments);
    }

    /***************************************************
            cuerpo de modal
    ***************************************************/

    _createClass(Modal_cuestionarios, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal-dialog", style: { "width": "97%", "height": "600px" } },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(Header_Modal_lideres, { seleccion: establecimieto.getCuestionario.nom_cuestionario,
                        titulo: React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "i",
                                { className: "glyphicon glyphicon-list-alt" },
                                "  Gestion Cuestionarios"
                            )
                        ) }),
                    React.createElement("br", null),
                    this.checar_si_esta(),
                    React.createElement(Body_modal_cuestionarios, null)
                )
            );
        }
    }, {
        key: "aniadir_cuestionario",
        value: function aniadir_cuestionario() {
            if (establecimieto.getId > 0 && establecimieto.getCuestionario.folio > 0) {
                conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_guardar", { "id_establecimiento": establecimieto.getId, "cuestionario": establecimieto.getCuestionario.folio });
                establecimieto.setCuestionario = { folio: 0, nom_cuestionario: "", estatus: false };
                establecimieto.setLista_cuestionarios = establecimieto.getId;
                Render_header_comp();
                Render_body_comp();
            } else alert("Seleccione los Campos:\n\"ESTABLECIMIENTO  Y CUESTIONARIO\"\n para agregar!!!");
        }
    }, {
        key: "eliminar_cuestionario",
        value: function eliminar_cuestionario() {
            if (establecimieto.getId > 0 && establecimieto.getCuestionario.folio > 0) {
                conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_borrar", { "id_establecimiento": establecimieto.getId, "cuestionario": establecimieto.getCuestionario.folio });
                establecimieto.setCuestionario = { folio: 0, nom_cuestionario: "", estatus: false };
                establecimieto.setLista_cuestionarios = establecimieto.getId;
                Render_header_comp();
                Render_body_comp();
            } else alert("Seleccione los Campos:\n\"ESTABLECIMIENTO Y CUESTIONARIOA\"\n para agregar!!!");
        }
    }, {
        key: "checar_si_esta",
        value: function checar_si_esta() {
            var _this6 = this;

            var esta = establecimieto.getLista_cuestionarios.filter(function (e) {
                return e.id_cuestionario == establecimieto.getCuestionario.folio;
            }).length > 0 ? false : true;
            var evento = function evento() {
                return _this6.eliminar_cuestionario();
            },
                color = "btn btn-danger";
            if (esta) {
                evento = function () {
                    return _this6.aniadir_cuestionario();
                };
                color = "btn btn-info ";
            }
            return React.createElement("input", { type: "button",
                value: "Agregar",
                style: { "margin-left": "30px", "margin-top": "10px" },
                className: color,
                onClick: evento });
        }
    }]);

    return Modal_cuestionarios;
})(React.Component);

var Body_modal_cuestionarios = (function (_React$Component9) {
    _inherits(Body_modal_cuestionarios, _React$Component9);

    function Body_modal_cuestionarios(props) {
        _classCallCheck(this, Body_modal_cuestionarios);

        _get(Object.getPrototypeOf(Body_modal_cuestionarios.prototype), "constructor", this).call(this, props);
        this.datos = conexion_ajax("servicios/checkListServ.asmx/nombres_cuestionarios");
        this.state = {
            encargado: "",
            filtro: this.datos
        };
    }

    /*******************************
         Responder Cuestionario a ckl
    *******************************/

    _createClass(Body_modal_cuestionarios, [{
        key: "render",
        value: function render() {
            var _this7 = this;

            return React.createElement(
                "div",
                { className: "modal-body" },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "Filtro : "
                    ),
                    React.createElement("input", { className: "form-control", type: "text", placeholder: "Filtro...", onChange: function (e) {
                            _this7.cambioTexto(e);
                        } })
                ),
                this.crear_tabla()
            );
        }
    }, {
        key: "cambioTexto",
        value: function cambioTexto(e) {
            var filtrados = this.datos.filter(function (a) {
                return a.nom_cuestionario.toUpperCase().search(e.target.value.toUpperCase()) >= 0 ? true : false;
            });
            this.setState({
                encargado: "", filtro: e.target.value === "" ? this.datos : filtrados
            });
        }
    }, {
        key: "crear_tabla",
        value: function crear_tabla() {
            return React.createElement(
                "div",
                { className: "tabla_lideres" },
                React.createElement(
                    "table",
                    { className: "table table-bordered" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            { className: "info cavecera_tabla_lideres" },
                            React.createElement(
                                "th",
                                null,
                                "ID"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "NOMBRE"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.lista()
                    )
                )
            );
        }
    }, {
        key: "lista",
        value: function lista() {
            var _this8 = this;

            var r = this.state.filtro.map(function (cuest) {
                return React.createElement(
                    "tr",
                    { key: cuest.folio, style: { "background": "white" }, onClick: function () {
                            _this8.seleccion(cuest);
                        } },
                    React.createElement(
                        "td",
                        null,
                        cuest.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        cuest.nom_cuestionario
                    )
                );
            });
            return r;
        }
    }, {
        key: "seleccion",
        value: function seleccion(dato) {
            establecimieto.setCuestionario = dato;
            Render_body_comp();
        }
    }]);

    return Body_modal_cuestionarios;
})(React.Component);

var Lista_cuestionarios_por_establecimiento = (function (_React$Component10) {
    _inherits(Lista_cuestionarios_por_establecimiento, _React$Component10);

    function Lista_cuestionarios_por_establecimiento() {
        _classCallCheck(this, Lista_cuestionarios_por_establecimiento);

        _get(Object.getPrototypeOf(Lista_cuestionarios_por_establecimiento.prototype), "constructor", this).apply(this, arguments);
    }

    /***************************************************
            modulo para responder preguntas
    ***************************************************/

    _createClass(Lista_cuestionarios_por_establecimiento, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "contenedor_botones_cuestionarios" },
                this.obtener_cuestionarios()
            );
        }
    }, {
        key: "obtener_cuestionarios",
        value: function obtener_cuestionarios() {
            var _this9 = this;

            var r;
            if (establecimieto.getId > 0) {
                var cuestionarios = establecimieto.getLista_cuestionarios;
                r = cuestionarios.map(function (cuest) {
                    return React.createElement("input", { type: "button",
                        value: cuest.cuestionario,
                        "data-toggle": "modal",
                        "data-target": "#modal_resolver_cuestionarios",
                        key: cuest.cuestionario,
                        className: _this9.checar_estado(cuest.resueltos),
                        onClick: function () {
                            return _this9.mostrar_preguntas(cuest);
                        } });
                });
                return r;
            }
        }
    }, {
        key: "checar_estado",
        value: function checar_estado(estado) {
            return estado > 0 ? "btn btn-info btn-lg btn-block" : "btn btn-warning btn-lg btn-block";
        }
    }, {
        key: "mostrar_preguntas",
        value: function mostrar_preguntas(cuestionario) {

            if (establecimieto.getEncargado.nombre != "") {
                establecimieto.setPreguntas = cuestionario.id_cuestionario;
                var res = establecimieto.getLista_cuestionarios.filter(function (c) {
                    return c.cuestionario == cuestionario.cuestionario;
                });
                responder_cuestionario(res[0]);
            } else {
                alerta_ckl("Falta Seleccionar Encargado Tienda!!!");
            }
        }
    }]);

    return Lista_cuestionarios_por_establecimiento;
})(React.Component);

var Responder_cuestionarios = (function (_React$Component11) {
    _inherits(Responder_cuestionarios, _React$Component11);

    function Responder_cuestionarios(props) {
        _classCallCheck(this, Responder_cuestionarios);

        _get(Object.getPrototypeOf(Responder_cuestionarios.prototype), "constructor", this).call(this, props);

        this.state = {
            seleccion: {
                observaciones: 0,
                orden: 0,
                pertenece: "",
                pregunta: "",
                respuesta: 3
            },
            observacion: "",
            lista_observaciones: []
        };
    }

    /***************************************************
            cuerpo de modal aletas
    ***************************************************/

    _createClass(Responder_cuestionarios, [{
        key: "render",
        value: function render() {
            var _this10 = this;

            var titulo = React.createElement(
                "div",
                null,
                React.createElement(
                    "i",
                    { className: "glyphicon glyphicon-edit" },
                    " ",
                    this.props.cuestionario.cuestionario,
                    " "
                )
            );
            var pregunta = this.state.seleccion.pregunta;
            //if (this.props.cuestionario.cuestionario!=)
            return React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                    "div",
                    { onClick: function () {
                            return _this10.deseleccion();
                        } },
                    React.createElement(Header_Modal_lideres, { seleccion: pregunta, titulo: titulo })
                ),
                React.createElement(
                    "div",
                    { className: "modal-body" },
                    React.createElement(
                        "div",
                        null,
                        this.respuestas()
                    ),
                    this.observaciones(),
                    this.lista_observaciones_pregunta(),
                    this.titulo_preguntas(),
                    this.tabla_preguntas()
                ),
                React.createElement("input", { type: "button", value: "Guardar", onClick: function () {
                        return _this10.guardar_respuestas_cuestionario();
                    }, className: "btn btn-info btn-block" })
            );
        }
    }, {
        key: "deseleccion",
        value: function deseleccion() {
            this.setState({
                seleccion: {
                    observaciones: 0,
                    orden: 0,
                    pertenece: "",
                    pregunta: "",
                    respuesta: 3
                },
                observacion: "",
                lista_observaciones: []
            });
        }
    }, {
        key: "titulo_preguntas",
        value: function titulo_preguntas() {

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    { style: { "display": "inline-block" } },
                    "Preguntas:"
                ),
                React.createElement(
                    "span",
                    { className: "marcador_r" },
                    React.createElement(
                        "span",
                        null,
                        "si : ",
                        this.totales(1),
                        " "
                    ),
                    React.createElement(
                        "span",
                        null,
                        "no : ",
                        this.totales(0),
                        " "
                    ),
                    React.createElement(
                        "span",
                        null,
                        "na : ",
                        this.totales(2),
                        " "
                    ),
                    React.createElement(
                        "span",
                        null,
                        "R  : ",
                        Math.round(this.totales(1) / (this.totales(0) + this.totales(1)) * 1000) / 10 >= 0 ? Math.round(this.totales(1) / (this.totales(0) + this.totales(1)) * 1000) / 10 : 0,
                        " %."
                    )
                )
            );
        }
    }, {
        key: "tabla_preguntas",
        value: function tabla_preguntas() {
            var _this11 = this;

            var r = establecimieto.getPreguntas.map(function (pregunta) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this11.seleccionar_pregunta(pregunta);
                        }, key: pregunta.orden },
                    React.createElement(
                        "td",
                        null,
                        pregunta.orden
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "left" } },
                        pregunta.pregunta
                    ),
                    React.createElement(
                        "td",
                        null,
                        _this11.convercion_respuesta(pregunta.respuesta)
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "i",
                            { className: "glyphicon glyphicon-eye-open blue", title: "Observaciones" },
                            " ",
                            pregunta.observaciones
                        )
                    )
                );
            });

            return React.createElement(
                "div",
                { className: "tabla_lideres", style: { "height": "380px" } },
                React.createElement(
                    "table",
                    { className: "table table-bordered" },
                    React.createElement(
                        "tbody",
                        null,
                        r
                    )
                )
            );
        }
    }, {
        key: "convercion_respuesta",
        value: function convercion_respuesta(r) {
            if (r == 1) {
                return React.createElement("i", { className: "glyphicon glyphicon-ok respuestas si" });
            } else if (r == 0) {
                return React.createElement("i", { className: "glyphicon glyphicon-remove respuestas no" });
            } else if (r == 2) {
                return React.createElement("i", { className: "glyphicon glyphicon-ban-circle respuestas na" });
            }
            return React.createElement("i", { className: "glyphicon glyphicon-alert respuestas pendiente" });
        }
    }, {
        key: "seleccionar_pregunta",
        value: function seleccionar_pregunta(pregunta) {
            this.setState({
                id: this.props.cuestionario.id_cuestionario,
                nombre: this.props.cuestionario.cuestionario,
                seleccion: pregunta,
                lista_observaciones: []
            });
        }
    }, {
        key: "respuestas",
        value: function respuestas() {
            var _this12 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    React.createElement("i", { className: "glyphicon glyphicon-ok respuestas si", onClick: function () {
                            _this12.responder(1);
                        } }),
                    React.createElement("i", { className: "glyphicon glyphicon-remove respuestas no", onClick: function () {
                            _this12.responder(0);
                        } }),
                    React.createElement("i", { className: "glyphicon glyphicon-ban-circle respuestas na", onClick: function () {
                            _this12.responder(2);
                        } })
                )
            );
        }
    }, {
        key: "responder",
        value: function responder(r) {
            this.state.seleccion.respuesta = r;
            this.setState({ seleccion: { orden: 0, pregunta: "", pertenece: "", respuesta: 3 } });
        }
    }, {
        key: "totales",
        value: function totales(r) {
            var cantidad = establecimieto.getPreguntas.filter(function (p) {
                return p.respuesta == r;
            });
            return cantidad.length;
        }
    }, {
        key: "observaciones_porPregunta",
        value: function observaciones_porPregunta() {
            var _this13 = this;

            var datos = [];
            if (establecimieto.getId > 0 && this.state.seleccion.observaciones > 0) {
                var f = establecimieto.getFecha.split("-");
                datos = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { 'folio_establecimiento': establecimieto.getId, 'fecha': f[2] + "-" + f[1] + "-" + f[0] });
            }
            this.setState({ lista_observaciones: datos.filter(function (obs) {
                    return obs.pregunta == _this13.state.seleccion.pregunta & obs.cuestionario == _this13.state.nombre;
                }) });
        }
    }, {
        key: "lista_observaciones_pregunta",
        value: function lista_observaciones_pregunta() {
            var _this14 = this;

            var obs;
            if (this.state.lista_observaciones.length > 0) {
                var r = this.state.lista_observaciones.map(function (ob) {
                    return React.createElement(
                        "tr",
                        { className: "lista_observaciones" },
                        React.createElement(
                            "td",
                            null,
                            ob.observaciones,
                            React.createElement("i", { className: "glyphicon glyphicon-remove-circle red close", onClick: function () {
                                    return _this14.remover_obs(ob.folio);
                                } })
                        )
                    );
                });
                obs = React.createElement(
                    "table",
                    { className: "table table-bordered " },
                    React.createElement(
                        "tbody",
                        null,
                        r
                    )
                );
            }
            return React.createElement(
                "div",
                { className: "tabla_observaciones_por_pregunta" },
                obs,
                " "
            );
        }
    }, {
        key: "remover_obs",
        value: function remover_obs(id) {
            var _this15 = this;

            if (id > 0) {
                establecimieto.getPreguntas.filter(function (e) {
                    e.orden == _this15.state.seleccion.orden ? e.observaciones -= 1 : e.observaciones;return e;
                });
                conexion_ajax("servicios/checkListServ.asmx/Eliminar_observaciones", { 'folio': id });
                this.deseleccion();
            }
        }
    }, {
        key: "observaciones",
        value: function observaciones() {
            var _this16 = this;

            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon", onClick: function () {
                            return _this16.observaciones_porPregunta();
                        } },
                    React.createElement("i", { className: "glyphicon glyphicon-eye-open" }),
                    " Ver : "
                ),
                React.createElement("input", { className: "form-control", type: "text", style: { "width": "87%" }, placeholder: "Observaciones...", value: this.state.observacion, onChange: function (e) {
                        return _this16.agregar_observaciones(e);
                    } }),
                React.createElement("i", { className: "glyphicon glyphicon-plus  respuestas blue", title: "Observaciones", onClick: function () {
                        _this16.enviar_observaciones();
                    } })
            );
        }
    }, {
        key: "agregar_observaciones",
        value: function agregar_observaciones(e) {
            if (this.state.seleccion.orden > 0) {
                this.setState({ observacion: e.target.value });
            } else {
                alert("Seleccione Una Pregunta!!!");
            }
        }
    }, {
        key: "enviar_observaciones",
        value: function enviar_observaciones() {
            var _this17 = this;

            var obs = this.state.observacion;
            var f = establecimieto.getFecha.split("-");
            var user = USUARIOS.filter(function (u) {
                return u.id_scoi == ID_SCOI;
            });
            user = user[0];

            if (this.state.seleccion.orden > 0) {
                if (obs != "" && obs != " ") {
                    this.setState({ observacion: "" });
                    var objeto = {
                        'folio_establecimiento': establecimieto.getId,
                        'id_cuestionario': this.state.id,
                        'fecha': f[2] + "-" + f[1] + "-" + f[0],
                        'posicion_pregunta': this.state.seleccion.orden,
                        'observaciones': obs,
                        'usuario': user.nombre_usuario
                    };
                    conexion_ajax("servicios/checkListServ.asmx/guardar_observaciones", objeto);
                    establecimieto.getPreguntas.filter(function (e) {
                        e.orden == _this17.state.seleccion.orden ? e.observaciones++ : e.observaciones;return e;
                    });
                    this.deseleccion();
                    //this.observaciones_porPregunta();
                } else alert("Coloque Una Observacion!!!");
            } else {
                alert("Seleccione Una Pregunta!!!");
            }
        }
    }, {
        key: "guardar_respuestas_cuestionario",
        value: function guardar_respuestas_cuestionario() {
            var respuestas = establecimieto.getPreguntas.filter(function (r) {
                return r.respuesta != 3;
            });
            var total = respuestas.length === establecimieto.getPreguntas.length ? true : false;
            var url = "servicios/checkListServ.asmx/guardar_datos_3";
            if (total) {
                var f = establecimieto.getFecha.split("-");
                var user = USUARIOS.filter(function (u) {
                    return u.id_scoi == ID_SCOI;
                });
                user = user[0];
                var DATA = {
                    'sucursal': establecimieto.getId,
                    'fecha': f[2] + "-" + f[1] + "-" + f[0],
                    'zona': this.state.id,
                    'criterio': establecimieto.getPreguntas.map(function (p) {
                        return p.orden;
                    }),
                    'respuestas': establecimieto.getPreguntas.map(function (p) {
                        return p.respuesta;
                    }),
                    'datos_pregunta': establecimieto.getPreguntas.map(function (p) {
                        return p.pregunta;
                    }), //datos_pregunta
                    'observaciones': "00:00:00", //observaciones
                    'aplicador': ID_SCOI,
                    'encargado': establecimieto.getEncargado.nombre != "" ? establecimieto.getEncargado.nombre : "NA"
                }; //fin obj
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(DATA),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    return response.json();
                }).then(function (myJson) {

                    establecimieto.setLista_cuestionarios = establecimieto.getId;
                    Render_header_comp();
                    Render_body_comp();
                    alerta_ckl("Guardado...");
                })["catch"](function (error) {
                    return alert('Error:', error);
                });
            } else alert("falta por responder");
        }
    }]);

    return Responder_cuestionarios;
})(React.Component);

var Aleta_ckl = (function (_React$Component12) {
    _inherits(Aleta_ckl, _React$Component12);

    function Aleta_ckl() {
        _classCallCheck(this, Aleta_ckl);

        _get(Object.getPrototypeOf(Aleta_ckl.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Aleta_ckl, [{
        key: "render",
        value: function render() {
            var dato = this.props.dato;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-body", style: { "text-align": "center" } },
                        React.createElement(
                            "h3",
                            null,
                            dato
                        ),
                        React.createElement("input", { type: "button", value: "OK", "data-dismiss": "modal", className: "btn btn-info btn-block" })
                    )
                )
            );
        }
    }]);

    return Aleta_ckl;
})(React.Component);

var Lista_observaciones = (function (_React$Component13) {
    _inherits(Lista_observaciones, _React$Component13);

    function Lista_observaciones(props) {
        _classCallCheck(this, Lista_observaciones);

        _get(Object.getPrototypeOf(Lista_observaciones.prototype), "constructor", this).call(this, props);

        this.state = {
            datos: []
        };
    }

    _createClass(Lista_observaciones, [{
        key: "render",
        value: function render() {
            var _this18 = this;

            return React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                    "div",
                    { className: "modal-header" },
                    React.createElement(
                        "button",
                        { type: "button", className: "close", "data-dismiss": "modal" },
                        "×"
                    ),
                    React.createElement(
                        "h3",
                        { onClick: function () {
                                return _this18.checar();
                            } },
                        "Observaciones"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "modal-body tabla_lideres", style: { "text-aling": "center" } },
                    this.lista_observaciones()
                ),
                React.createElement(
                    "div",
                    { className: "modal-footer" },
                    React.createElement("input", { type: "button", value: "Exportar", className: "btn btn-info btn-block", onClick: function () {
                            return _this18.exportar();
                        } })
                )
            );
        }
    }, {
        key: "lista_observaciones",
        value: function lista_observaciones() {
            var _this19 = this;

            this.state = { datos: this.props.datos };
            var i = 1;
            var r = this.state.datos.map(function (observaciones) {
                return React.createElement(
                    "tr",
                    { key: observaciones.folio },
                    React.createElement(
                        "td",
                        { style: { "height": "10px" } },
                        i++
                    ),
                    React.createElement(
                        "td",
                        null,
                        observaciones.observaciones
                    ),
                    React.createElement(
                        "td",
                        { style: { "height": "10px" } },
                        React.createElement("i", { className: "glyphicon glyphicon-remove", onClick: function () {
                                return _this19.remover(observaciones.folio);
                            } })
                    )
                );
            });
            return React.createElement(
                "table",
                { className: "table table-bordered", id: "mostrar_observaciones_cuestionario" },
                React.createElement(
                    "tbody",
                    null,
                    r
                )
            );
        }
    }, {
        key: "remover",
        value: function remover(id) {
            conexion_ajax("servicios/checkListServ.asmx/Eliminar_observaciones", { 'folio': id });
            var f = establecimieto.getFecha.split("-");
            this.checar();
        }
    }, {
        key: "exportar",
        value: function exportar() {
            if (this.state.datos.length > 0) tableToExcel('mostrar_observaciones_cuestionario', "observaciones-" + "-" + establecimieto.getNombre);else alert("Sin Datos!!!");
        }
    }, {
        key: "checar",
        value: function checar() {
            var f = establecimieto.getFecha.split("-");
            var datos = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { 'folio_establecimiento': establecimieto.getId, 'fecha': f[2] + "-" + f[1] + "-" + f[0] });
            obtener_observaciones(datos);
        }
    }]);

    return Lista_observaciones;
})(React.Component);

var Resultados_ckl = (function (_React$Component14) {
    _inherits(Resultados_ckl, _React$Component14);

    function Resultados_ckl(props) {
        _classCallCheck(this, Resultados_ckl);

        _get(Object.getPrototypeOf(Resultados_ckl.prototype), "constructor", this).call(this, props);
    }

    //funcion de renderizado body

    _createClass(Resultados_ckl, [{
        key: "render",
        value: function render() {
            var _this20 = this;

            return React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                    "div",
                    { className: "modal-header" },
                    React.createElement(
                        "button",
                        { type: "button", className: "close", "data-dismiss": "modal" },
                        "×"
                    ),
                    React.createElement(
                        "h3",
                        null,
                        "Resultados Cuestionarios"
                    ),
                    this.resultados()
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "modal-body tabla_lideres", style: { "text-aling": "center" } },
                    this.tabla_datos()
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", { type: "button", value: "Exportar", className: "btn btn-info btn-block", onClick: function () {
                            return _this20.exportar();
                        } })
                )
            );
        }
    }, {
        key: "tabla_datos",
        value: function tabla_datos() {
            var _this21 = this;

            var i = 0;
            var posicion_cuestionario = 1;
            var cuestionario = "";
            var lista = [];
            var resultados = [];
            var r = this.state.datos.map(function (res) {
                if (i == 0) {
                    cuestionario = res.zona_inspeccion;
                    lista.push(_this21.cavecera_res(res));
                    lista.push(_this21.puntos_res());
                }
                if (res.zona_inspeccion == cuestionario) {

                    if (res.posicion == 1) {
                        lista.push(_this21.cuerpo_resultados(res));
                    } else {
                        lista.push(_this21.cuerpo_resultados(res));
                    }
                } else {
                    i = 0;
                    cuestionario = res.zona_inspeccion;
                    lista.push(_this21.cavecera_res(res));
                    lista.push(_this21.puntos_res());
                    lista.push(_this21.cuerpo_resultados(res));
                }
                i = 1;
            });
            return React.createElement(
                "table",
                { className: "table table-bordered ", id: "reporte_cuestionarios" },
                React.createElement(
                    "tbody",
                    null,
                    lista
                )
            );
        }
    }, {
        key: "cavecera_res",
        value: function cavecera_res(res) {
            return React.createElement(
                "tr",
                { className: "info" },
                React.createElement(
                    "th",
                    { rowspan: "2", style: { "width": "50px", "text-align": "center" } },
                    "#"
                ),
                React.createElement(
                    "th",
                    { rowspan: "2", style: { "text-align": "center" } },
                    res.zona_inspeccion
                ),
                React.createElement(
                    "th",
                    { colspan: "3", style: { "width": "150px", "text-align": "center" } },
                    "CUMPLE"
                ),
                React.createElement(
                    "th",
                    { rowspan: "2", style: { "width": "50px", "text-align": "center" } },
                    "PERTENECE"
                )
            );
        }
    }, {
        key: "puntos_res",
        value: function puntos_res() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    "SI"
                ),
                React.createElement(
                    "td",
                    null,
                    "NO"
                ),
                React.createElement(
                    "td",
                    null,
                    "NA"
                )
            );
        }
    }, {
        key: "cuerpo_resultados",
        value: function cuerpo_resultados(res) {
            var si = res.rsi == 1 & res.rno == 0 ? "green" : "";
            var no = res.rsi == 0 & res.rno == 1 ? "red" : "";

            var per = res.caducidad == 1 ? "limpieza" : res.surtido == 1 ? "surtido" : res.imagen == 1 ? "imagen" : res.generales == 1 ? "generales" : res.senializaciores == 1 ? "señalizacion" : res.limpieza == 1 ? "limpieza" : "NA";

            return React.createElement(
                "tr",
                { className: "table" },
                React.createElement(
                    "td",
                    null,
                    res.posicion
                ),
                React.createElement(
                    "td",
                    { style: { "text-align": "left" } },
                    res.pregunta
                ),
                React.createElement(
                    "td",
                    { style: { "background": si } },
                    res.rsi == 1 ? "X" : ""
                ),
                React.createElement(
                    "td",
                    { style: { "background": no } },
                    res.rno == 1 ? "X" : ""
                ),
                React.createElement(
                    "td",
                    null,
                    res.rna == 1 ? "X" : ""
                ),
                React.createElement(
                    "td",
                    null,
                    per
                )
            );
        }
    }, {
        key: "resultados",
        value: function resultados() {
            this.state = { datos: this.props.datos };

            var si = this.state.datos.filter(function (res) {
                return res.rsi == 1;
            }).length;
            var no = this.state.datos.filter(function (res) {
                return res.rno == 1;
            }).length;
            var na = this.state.datos.filter(function (res) {
                return res.rna == 1;
            }).length;

            return React.createElement(
                "span",
                { className: "marcador_r", style: { "top": "35px", "right": "30px" } },
                React.createElement(
                    "span",
                    { className: "success" },
                    "SI : ",
                    si
                ),
                React.createElement(
                    "span",
                    { className: "danger" },
                    "NO : ",
                    no
                ),
                React.createElement(
                    "span",
                    { className: "info" },
                    "NA : ",
                    na
                ),
                React.createElement(
                    "span",
                    null,
                    "TOTAL : ",
                    Math.round(si / (no + si) * 1000) / 10 >= 0 ? Math.round(si / (no + si) * 1000) / 10 : 0,
                    " % "
                )
            );
        }
    }, {
        key: "exportar",
        value: function exportar() {
            if (this.state.datos.length > 0) tableToExcel('reporte_cuestionarios', "Reporte-" + "-" + establecimieto.getNombre);else alert("Sin Datos!!!");
        }
    }]);

    return Resultados_ckl;
})(React.Component);

function Render_body_comp() {
    ReactDOM.render(React.createElement(
        "div",
        { style: { "height": "100%" } },
        React.createElement(Agergar_cuestionarios, null),
        React.createElement(Lista_cuestionarios_por_establecimiento, null)
    ), document.getElementById("cuerpo"));

    ReactDOM.render(React.createElement(Modal_cuestionarios, null), document.getElementById("modal_cuestionarios"));
}
//responder Cuestionario
function responder_cuestionario(cuestionario) {
    ReactDOM.render(React.createElement(Responder_cuestionarios, { cuestionario: cuestionario }), document.getElementById("modal_resolver_cuestionarios"));
}
function alerta_ckl(t) {
    ReactDOM.render(React.createElement(Aleta_ckl, { dato: t }), document.getElementById("modal_resolver_cuestionarios"));
}
function obtener_observaciones(datos) {
    ReactDOM.render(React.createElement(Lista_observaciones, { datos: datos }), document.getElementById("modal_reporte"));
}
function resultados_ckl(datos) {
    ReactDOM.render(React.createElement(Resultados_ckl, { datos: datos }), document.getElementById("modal_reporte"));
}
//lanzar
Render_header_comp();
Render_body_comp();

