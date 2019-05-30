"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Botonera = (function (_React$Component) {
    _inherits(Botonera, _React$Component);

    function Botonera() {
        _classCallCheck(this, Botonera);

        _get(Object.getPrototypeOf(Botonera.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Botonera, [{
        key: "render",
        value: function render() {
            var _this = this;

            return React.createElement(
                "div",
                null,
                React.createElement("input", { type: "button", className: "btn btn-primary", value: "Actualizar", onClick: function () {
                        return _this.props.actualizar();
                    } }),
                React.createElement("input", { type: "button", className: "btn btn-primary", value: "Resultados", onClick: function () {
                        return _this.props.resultados();
                    } }),
                React.createElement("input", { type: "button", className: "btn btn-primary", value: "Observaciones", onClick: function () {
                        return _this.props.observaciones();
                    } })
            );
        }
    }]);

    return Botonera;
})(React.Component);

var Lists_cuestionas_a_responder = (function (_React$Component2) {
    _inherits(Lists_cuestionas_a_responder, _React$Component2);

    function Lists_cuestionas_a_responder() {
        _classCallCheck(this, Lists_cuestionas_a_responder);

        _get(Object.getPrototypeOf(Lists_cuestionas_a_responder.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Lists_cuestionas_a_responder, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var checar_responsable = function checar_responsable() {
                return _this2.props.id_usuario > 0;
            };
            var resuelto = function resuelto() {
                return _this2.props.resueltos > 0 ? "btn btn-info btn-lg btn-block" : "btn btn-warning btn-lg btn-block";
            };
            return React.createElement("input", { type: "button", value: this.props.nombre,
                key: this.props.identificador,
                className: resuelto(),
                disabled: !checar_responsable(),
                onClick: function () {
                    return _this2.props.evento();
                } });
        }
    }]);

    return Lists_cuestionas_a_responder;
})(React.Component);

var Modal_responder = (function (_React$Component3) {
    _inherits(Modal_responder, _React$Component3);

    function Modal_responder() {
        _classCallCheck(this, Modal_responder);

        _get(Object.getPrototypeOf(Modal_responder.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Modal_responder, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "moda_cuestionario" },
                React.createElement(
                    "div",
                    { id: "cuerpo_cuestionario", className: "panel panel-default" },
                    React.createElement(
                        "div",
                        { id: "cavecera_cuestionario", className: "panel-heading" },
                        React.createElement("span", { className: "glyphicon glyphicon-remove-circle close red", onClick: this.cerrar_modal.bind(this) }),
                        React.createElement(
                            "span",
                            { style: { "fontSize": "20px", "marginLeft": "10px" }, className: "glyphicon glyphicon-edit" },
                            " "
                        ),
                        React.createElement(
                            "label",
                            { style: { "fontSize": "20px", "marginLeft": "10px" } },
                            this.props.titulo
                        )
                    ),
                    this.props.marcador,
                    React.createElement(
                        "div",
                        { id: "contenedor_respuestas", className: "panel-body" },
                        React.createElement(
                            "table",
                            { className: "table table-striped" },
                            React.createElement(
                                "tbody",
                                null,
                                this.props.tabla_pregintas
                            )
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: "btn btn-info btn-block", onClick: this.props.guardar.bind(this) },
                        React.createElement(
                            "label",
                            { style: { "fontSize": "20px" } },
                            "Guardar  "
                        ),
                        React.createElement(
                            "span",
                            { style: { "marginLeft": "10px", "fontSize": "25px" }, className: "glyphicon glyphicon-saved" },
                            " "
                        )
                    )
                ),
                React.createElement(Responder, { titulo: this.props.titulo_responder,
                    cuerpo: this.props.cuerpo_responder })
            );
        }
    }, {
        key: "cerrar_modal",
        value: function cerrar_modal() {
            document.getElementById("moda_cuestionario").style.display = "none";
        }
    }]);

    return Modal_responder;
})(React.Component);

var Responder = (function (_React$Component4) {
    _inherits(Responder, _React$Component4);

    function Responder() {
        _classCallCheck(this, Responder);

        _get(Object.getPrototypeOf(Responder.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Responder, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "moda_cresponder", id: "responder_modal" },
                React.createElement(
                    "div",
                    { className: "panel panel-default cuerpo_responder" },
                    React.createElement(
                        "div",
                        { className: "panel-heading cavecera_responder", style: { "background-color": "#58c174", "color": "black" } },
                        React.createElement("span", { className: "glyphicon glyphicon-remove-circle close red", onClick: this.cerrar_modal.bind(this) }),
                        React.createElement(
                            "h3",
                            null,
                            this.props.titulo
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "panel-body" },
                        this.props.cuerpo
                    )
                )
            );
        }
    }, {
        key: "cerrar_modal",
        value: function cerrar_modal() {
            document.getElementById("responder_modal").style.display = "none";
        }
    }]);

    return Responder;
})(React.Component);

var Cuerpo_observaciones = (function (_React$Component5) {
    _inherits(Cuerpo_observaciones, _React$Component5);

    function Cuerpo_observaciones(props) {
        _classCallCheck(this, Cuerpo_observaciones);

        _get(Object.getPrototypeOf(Cuerpo_observaciones.prototype), "constructor", this).call(this, props);
        this.state = {
            observacion: ""
        };
    }

    _createClass(Cuerpo_observaciones, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("input", { type: "text", className: "form-control",
                    style: { "width": "277px", "marginRight": "5px", "display": "inline-block" },
                    onChange: this.on_observaciones_pregunta.bind(this),
                    value: this.state.observacion }),
                React.createElement("input", { type: "button", value: "Agregar",
                    className: "btn btn-info",
                    onClick: this.on_agregar.bind(this) }),
                React.createElement(
                    "div",
                    { className: "form-control", style: { "marginTop": "10px", "height": "140px", "overflow-x": "auto", "overflow-y": "auto" } },
                    React.createElement(
                        "table",
                        { className: "table table-bordered" },
                        this.props.lista_observaciones
                    )
                )
            );
        }
    }, {
        key: "on_observaciones_pregunta",
        value: function on_observaciones_pregunta(e) {
            console.log(e.target.value);
            this.setState({ observacion: e.target.value });
        }
    }, {
        key: "on_agregar",
        value: function on_agregar() {
            var observacion = this.state.observacion;
            if (observacion != "") this.props.on_agregar_observacion(observacion);else alert("Sin Observaciones...");
            this.setState({ observacion: "" });
        }
    }]);

    return Cuerpo_observaciones;
})(React.Component);

var Vista_observaciones = (function (_React$Component6) {
    _inherits(Vista_observaciones, _React$Component6);

    function Vista_observaciones() {
        _classCallCheck(this, Vista_observaciones);

        _get(Object.getPrototypeOf(Vista_observaciones.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Vista_observaciones, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: this.props.identificador, className: "moda_cresponder" },
                React.createElement(
                    "div",
                    { className: "panel panel-default" },
                    React.createElement(
                        "div",
                        { className: "panel-heading" },
                        React.createElement("span", { className: "glyphicon glyphicon-remove-circle close red", onClick: this.cerrar_modal.bind(this) }),
                        React.createElement(
                            "h3",
                            null,
                            this.props.titulo
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "panel-body", style: { "height": "80%", "overflow-x": "auto", "overflow-y": "auto" } },
                        React.createElement(
                            "table",
                            { className: "table table-bordered", id: this.props.identificador + "reporte_cuestionarios" },
                            React.createElement(
                                "tbody",
                                null,
                                this.props.observaciones
                            )
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: "btn btn-info btn-block", onClick: this.exportar.bind(this) },
                        React.createElement(
                            "label",
                            null,
                            "Guardar  "
                        ),
                        React.createElement(
                            "span",
                            { style: { "marginLeft": "10px" }, className: "glyphicon glyphicon-download-alt" },
                            " "
                        )
                    )
                )
            );
        }
    }, {
        key: "cerrar_modal",
        value: function cerrar_modal() {
            var id = this.props.identificador;
            document.getElementById(id).style.display = "none";
        }
    }, {
        key: "exportar",
        value: function exportar() {
            console.log("Exportar...");
            tableToExcel(this.props.identificador + 'reporte_cuestionarios', "Reporte");
        }
    }]);

    return Vista_observaciones;
})(React.Component);

var Ckl_establecimiento = (function (_React$Component7) {
    _inherits(Ckl_establecimiento, _React$Component7);

    function Ckl_establecimiento(props) {
        _classCallCheck(this, Ckl_establecimiento);

        _get(Object.getPrototypeOf(Ckl_establecimiento.prototype), "constructor", this).call(this, props);
        //listas
        this.lista_establecimientos = [];
        this.lista_cuestionario_por_establecimiento = [];
        this.lista_preguntas_cuestionario = [];
        this.lista_observaciones = [];
        this.resultados = [];
        this.titulo_responder = "";
        this.cuerpo_responder = [];
        this.orden = -1;
        //estados
        this.state = {
            folio_establecimiento: -1,
            fecha: this.fecha_hoy(),
            id_usuario: -1,
            usuario: "",
            id_cuestionario: -1,
            cuestionario: ""
        };
        //conexiones iniciales
        this.obtener_establecimientos();
    }

    _createClass(Ckl_establecimiento, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(
                    "div",
                    { className: "panel-heading", id: "cavecera" },
                    React.createElement(Botonera, { actualizar: this.on_actualizar_.bind(this),
                        resultados: this.on_resultados_.bind(this),
                        observaciones: this.on_observaciones_.bind(this) }),
                    React.createElement(
                        "div",
                        { style: { "width": "60%", "display": "inline-block", "marginLeft": "5px" } },
                        React.createElement(Caja_datos_select, { titulo: "Establecimiento",
                            icono: "glyphicon glyphicon-tasks",
                            seleccion: this.on_seleccion_establecimiento.bind(this),
                            opciones: this.opciones_establecimientos() })
                    ),
                    React.createElement(
                        "div",
                        { style: { "width": "25%", "display": "inline-block", "marginLeft": "5px" } },
                        React.createElement(Caja_fecha, { fecha: this.state.fecha,
                            evento: this.on_seleccion_fecha.bind(this) })
                    ),
                    React.createElement(
                        "div",
                        { className: "", style: { "width": "85%", "display": "inline-block", "margin-left": "10px" } },
                        React.createElement(Caja_datos, { icono: "glyphicon glyphicon-user",
                            titulo: "Responsable",
                            datos: this.state.usuario }),
                        React.createElement("i", { className: "glyphicon glyphicon-search",
                            title: "Buscar Usuario",
                            "data-toggle": "modal", "data-target": "#modal_usuarios" })
                    ),
                    React.createElement(Modal, { id: "modal_usuarios",
                        cerrar: function () {
                            console.log("cancelar");
                        },
                        cavecera: React.createElement(
                            "h3",
                            null,
                            "Seleccion Usuario"
                        ),
                        cuerpo: React.createElement(Seleccion_usuario, { seleccionar: this.on_seleccion_usuario.bind(this) })
                    })
                ),
                React.createElement(
                    "div",
                    { className: "panel-body", id: "cuerpo" },
                    React.createElement(
                        "div",
                        { id: "contenedor_botones_cuestionarios" },
                        this.opciones_cuestionarios_por_establecimiento()
                    )
                ),
                React.createElement(Modal_responder, { titulo: this.state.cuestionario,
                    marcador: this.datos_marcador_preguntas(),
                    tabla_pregintas: this.datos_preguntas(),
                    titulo_responder: this.titulo_responder,
                    guardar: this.guardar_respuestas.bind(this),
                    cuerpo_responder: this.cuerpo_responder }),
                React.createElement(Vista_observaciones, { identificador: "total_obsercaciones",
                    titulo: "Resultados.",
                    observaciones: this.datos_tabla_obsercaciones() }),
                React.createElement(Vista_observaciones, { identificador: "total_Resultados",
                    titulo: "Resultados.",
                    observaciones: this.datos_tabla_resultados() })
            );
        }

        /**eventos**/
    }, {
        key: "on_actualizar_",
        value: function on_actualizar_() {
            console.log("actualizar");
            var folio = this.state.folio_establecimiento;
            if (folio > 0) this.obtener_cuestionarios_establecimiento(folio);else alert("Seleccione Establecimiento...");
        }
    }, {
        key: "on_resultados_",
        value: function on_resultados_() {
            var _this3 = this;

            console.log("resultados");
            conexion_api_from_body("servicios/checkListServ.asmx/procedimiento_resultados_cuestionario_por_dia", {
                folio_establecimiento: this.state.folio_establecimiento,
                fecha: this.state.fecha
            }, function (respuesta) {
                _this3.resultados = respuesta.d;
                _this3.setState({});
                document.getElementById("total_Resultados").style.display = "flex";
            });
        }
    }, {
        key: "on_observaciones_",
        value: function on_observaciones_() {
            var _this4 = this;

            console.log("observaciones");
            conexion_api_from_body("servicios/checkListServ.asmx/obtener_observaciones", {
                folio_establecimiento: this.state.folio_establecimiento,
                fecha: this.state.fecha
            }, function (respuesta) {
                _this4.lista_observaciones = respuesta.d;
                _this4.setState({});
                document.getElementById("total_obsercaciones").style.display = "flex";
            });
        }
    }, {
        key: "on_seleccion_establecimiento",
        value: function on_seleccion_establecimiento(e) {
            this.obtener_cuestionarios_establecimiento(e.target.value);
            this.setState({
                folio_establecimiento: e.target.value,
                id_usuario: -1,
                usuario: ""
            });
        }
    }, {
        key: "on_seleccion_fecha",
        value: function on_seleccion_fecha(e) {
            var f = e.target.value.split("-");
            if (f[0] > 0) {
                this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0] });
            } else this.setState({ fecha: this.fecha_hoy() });
            this.on_actualizar_();
        }
    }, {
        key: "on_seleccion_usuario",
        value: function on_seleccion_usuario(usuario) {
            this.setState({ id_usuario: usuario.id, usuario: usuario.nombre });
        }
    }, {
        key: "on_seleccionar_cuestionario",
        value: function on_seleccionar_cuestionario(seleccion_cuestionario) {
            console.info(seleccion_cuestionario);

            this.obtener_preguntas(seleccion_cuestionario.id_cuestionario);
            this.obtener_observaciones();

            this.setState({
                cuestionario: seleccion_cuestionario.cuestionario
            });
            document.getElementById("moda_cuestionario").style.display = "block";
        }
    }, {
        key: "on_responder",
        value: function on_responder(elemento) {

            this.titulo_responder = elemento.pregunta;
            this.cuerpo_responder = this.cuerpo_responder_ico(elemento);
            document.getElementById("responder_modal").style.display = "flex";

            this.setState({});
        }
    }, {
        key: "on_observaciones",
        value: function on_observaciones(elemento) {
            var _this5 = this;

            this.titulo_responder = "Lista De Observaciones.";
            this.orden = elemento.orden;

            var observaciones = this.lista_observaciones.filter(function (e) {
                return e.posicion == elemento.orden && e.cuestionario == _this5.state.cuestionario;
            });

            observaciones = React.createElement(
                "tbody",
                null,
                observaciones.map(function (e, p) {
                    return React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            p + 1
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "label",
                                null,
                                e.observaciones
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("span", { className: "glyphicon glyphicon-trash red",
                                onClick: function () {
                                    return _this5.remover_observaciones(e.folio);
                                } })
                        )
                    );
                })
            );

            this.cuerpo_responder = React.createElement(Cuerpo_observaciones, { on_agregar_observacion: this.agregar_observacion.bind(this),
                lista_observaciones: observaciones });
            this.setState({});
            document.getElementById("responder_modal").style.display = "flex";
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
            var _this6 = this;

            conexion_api_2("servicios/checkListServ.asmx/buscar_establecimiento", function (respuesta) {
                _this6.lista_establecimientos = respuesta.d;
                _this6.setState({
                    folio_establecimiento: -1
                });
            });
        }
    }, {
        key: "obtener_cuestionarios_establecimiento",
        value: function obtener_cuestionarios_establecimiento(folio) {
            var _this7 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_R", {
                "id_establecimiento": folio, "fecha": this.state.fecha
            }, function (respuesta) {
                console.log(respuesta.d);
                _this7.lista_cuestionario_por_establecimiento = respuesta.d;
                _this7.setState({
                    id_cuestionario: -1,
                    cuestionario: ""
                });
            });
        }
    }, {
        key: "obtener_preguntas",
        value: function obtener_preguntas(folio_cuestionario) {
            var _this8 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/obtener_Preguntas_cuestionario", {
                "establecimiento": this.state.folio_establecimiento, 'cuestionario': folio_cuestionario, "fecha": this.state.fecha
            }, function (respuesta) {
                console.log(respuesta.d);
                _this8.lista_preguntas_cuestionario = respuesta.d;
                _this8.setState({
                    id_cuestionario: folio_cuestionario
                });
            });
        }
    }, {
        key: "obtener_observaciones",
        value: function obtener_observaciones() {
            var _this9 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/obtener_observaciones", {
                folio_establecimiento: this.state.folio_establecimiento,
                fecha: this.state.fecha
            }, function (respuesta) {
                _this9.lista_observaciones = respuesta.d;
                console.log(respuesta.d);
                _this9.setState({});
            });
        }
    }, {
        key: "agregar_observacion",
        value: function agregar_observacion(observacion) {
            var _this10 = this;

            console.log(this.orden, observacion);
            conexion_api_from_body("servicios/checkListServ.asmx/guardar_observaciones", {
                fecha: this.state.fecha,
                folio_establecimiento: this.state.folio_establecimiento,
                id_cuestionario: this.state.id_cuestionario,
                observaciones: observacion,
                posicion_pregunta: this.orden,
                usuario: ID_SCOI
            }, function () {
                document.getElementById("responder_modal").style.display = "none";
                _this10.obtener_observaciones();
            });
        }
    }, {
        key: "remover_observaciones",
        value: function remover_observaciones(folio) {
            var _this11 = this;

            console.log("remover:", folio);
            if (confirm("Eliminar Observacion?")) {
                conexion_api_from_body("servicios/checkListServ.asmx/Eliminar_observaciones", {
                    "folio": folio
                }, function () {
                    document.getElementById("responder_modal").style.display = "none";
                    _this11.obtener_observaciones();
                });
            }
        }
    }, {
        key: "guardar_respuestas",
        value: function guardar_respuestas() {
            var _this12 = this;

            console.log(this.lista_preguntas_cuestionario);
            var respuestas = this.lista_preguntas_cuestionario.filter(function (e) {
                return e.respuesta < 3;
            }).length;
            if (respuestas === this.lista_preguntas_cuestionario.length) {
                console.info("SI");
                conexion_api_from_body("servicios/checkListServ.asmx/guardar_datos_3", {
                    'sucursal': this.state.folio_establecimiento,
                    'fecha': this.state.fecha,
                    'zona': this.state.id_cuestionario,
                    'criterio': this.lista_preguntas_cuestionario.map(function (p) {
                        return p.orden;
                    }),
                    'respuestas': this.lista_preguntas_cuestionario.map(function (p) {
                        return p.respuesta;
                    }),
                    'datos_pregunta': this.lista_preguntas_cuestionario.map(function (p) {
                        return p.pregunta;
                    }), //datos_pregunta
                    'observaciones': "00:00:00", //observaciones
                    'aplicador': parseInt(ID_SCOI),
                    'encargado': this.state.usuario || "NA"
                }, function () {
                    document.getElementById("moda_cuestionario").style.display = "none";
                    _this12.obtener_cuestionarios_establecimiento(_this12.state.folio_establecimiento);
                    alert("Guardado!!!");
                });
            } else alert("Hay Preguntas Por Responder...");
        }

        /**componentes**/
    }, {
        key: "opciones_establecimientos",
        value: function opciones_establecimientos() {
            return [React.createElement(
                "option",
                { value: "-1" },
                "Seleccione Establecimiento"
            ), this.lista_establecimientos.map(function (elemento) {
                return React.createElement(
                    "option",
                    { key: elemento.id_establecimiento, value: elemento.id_establecimiento },
                    elemento.nombre_establecimiento
                );
            })];
        }
    }, {
        key: "opciones_cuestionarios_por_establecimiento",
        value: function opciones_cuestionarios_por_establecimiento() {
            var _this13 = this;

            var user = this.state.id_usuario;
            console.info("Cuestionarios");
            return this.lista_cuestionario_por_establecimiento.map(function (elemento) {
                return React.createElement(Lists_cuestionas_a_responder, { id_usuario: user,
                    resueltos: elemento.resueltos,
                    evento: function () {
                        return _this13.on_seleccionar_cuestionario(elemento);
                    },
                    identificador: elemento.id_cuestionario,
                    nombre: elemento.cuestionario });
            });
        }
    }, {
        key: "datos_marcador_preguntas",
        value: function datos_marcador_preguntas() {
            var respuesta_si = this.lista_preguntas_cuestionario.filter(function (e) {
                return e.respuesta === 1;
            }).length;
            var respuesta_no = this.lista_preguntas_cuestionario.filter(function (e) {
                return e.respuesta === 0;
            }).length;
            var respuesta_na = this.lista_preguntas_cuestionario.filter(function (e) {
                return e.respuesta === 2;
            }).length;
            var promedio = Math.round(respuesta_si / (respuesta_si + respuesta_no) * 10000) / 100;
            promedio = promedio > 0 ? promedio : 0;
            promedio = promedio < 100 ? promedio : 100;
            return React.createElement(
                "div",
                { id: "contenedor_marcadores" },
                React.createElement(
                    "span",
                    null,
                    " SI :",
                    React.createElement("input", { style: { "background-color": "green" }, className: "marcadores form-control", value: respuesta_si })
                ),
                React.createElement(
                    "span",
                    null,
                    " NO",
                    React.createElement("input", { style: { "background-color": "red" }, className: "marcadores form-control", value: respuesta_no })
                ),
                React.createElement(
                    "span",
                    null,
                    " NA",
                    React.createElement("input", { style: { "background-color": "blue" }, className: "marcadores form-control", value: respuesta_na })
                ),
                React.createElement(
                    "span",
                    null,
                    " TOTAL",
                    React.createElement("input", { style: { "background-color": "gray" }, className: "marcadores form-control", value: promedio }),
                    " %"
                )
            );
        }
    }, {
        key: "datos_preguntas",
        value: function datos_preguntas() {
            var _this14 = this;

            var respuesta = function respuesta(r) {
                return r == 1 ? "glyphicon glyphicon-ok-sign" : r == 2 ? "glyphicon glyphicon-info-sign" : r == 0 ? "glyphicon glyphicon-remove-sign" : "glyphicon glyphicon-question-sign";
            };
            var colores = ["red", "green", "blue", "gray"];
            return this.lista_preguntas_cuestionario.map(function (elemento) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "h3",
                            null,
                            elemento.orden
                        )
                    ),
                    React.createElement(
                        "td",
                        { style: { "textAlign": "left" } },
                        React.createElement(
                            "div",
                            { style: { "fontSize": "15px" } },
                            React.createElement(
                                "label",
                                null,
                                "CRITERIO : "
                            ),
                            " ",
                            elemento.pregunta
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "label",
                                null,
                                "AREA: "
                            ),
                            " ",
                            elemento.pertenece
                        )
                    ),
                    React.createElement(
                        "td",
                        { onClick: function () {
                                return _this14.on_responder(elemento);
                            } },
                        _this14.componente_vista_respuesta(elemento.respuesta)
                    ),
                    React.createElement(
                        "td",
                        null,
                        " ",
                        React.createElement("span", { style: { "color": "#2877a0", "fontSize": "35px" },
                            className: "fa fa-comments",
                            onClick: function () {
                                return _this14.on_observaciones(elemento);
                            },
                            title: "Observaciones" })
                    )
                );
            });
        }
    }, {
        key: "componente_vista_respuesta",
        value: function componente_vista_respuesta(valor) {
            var respuesta = function respuesta(r) {
                return r == 1 ? "glyphicon glyphicon-ok-sign" : r == 2 ? "glyphicon glyphicon-info-sign" : r == 0 ? "glyphicon glyphicon-remove-sign" : "glyphicon glyphicon-question-sign";
            };
            var colores = ["red", "green", "blue", "gray"];
            return React.createElement("span", { style: { "color": colores[valor] },
                className: respuesta(valor) });
        }
    }, {
        key: "datos_tabla_obsercaciones",
        value: function datos_tabla_obsercaciones() {
            var _this15 = this;

            return this.lista_observaciones.map(function (e, p) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        p + 1
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.observaciones
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("span", { className: "glyphicon glyphicon-trash red",
                            onClick: function () {
                                return _this15.remover_observaciones(e.folio);
                            } })
                    )
                );
            });
        }
    }, {
        key: "cuerpo_responder_ico",
        value: function cuerpo_responder_ico(elemento) {
            var _this16 = this;

            var cerrar = function cerrar(valor) {
                elemento.respuesta = valor;
                document.getElementById("responder_modal").style.display = "none";
                _this16.setState({});
            };
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    { onClick: function () {
                            return cerrar(1);
                        }, style: { "fontSize": "50px", "marginLeft": "70px" } },
                    " ",
                    this.componente_vista_respuesta(1)
                ),
                React.createElement(
                    "label",
                    { onClick: function () {
                            return cerrar(0);
                        }, style: { "fontSize": "50px", "marginLeft": "30px" } },
                    " ",
                    this.componente_vista_respuesta(0)
                ),
                React.createElement(
                    "label",
                    { onClick: function () {
                            return cerrar(2);
                        }, style: { "fontSize": "50px", "marginLeft": "30px" } },
                    " ",
                    this.componente_vista_respuesta(2)
                )
            );
        }
    }, {
        key: "datos_tabla_resultados",
        value: function datos_tabla_resultados() {
            console.log("Resultado:", this.resultados);
            return React.createElement(Resultados, { datos: this.resultados });
        }
    }]);

    return Ckl_establecimiento;
})(React.Component);

var Resultados = (function (_React$Component8) {
    _inherits(Resultados, _React$Component8);

    function Resultados() {
        _classCallCheck(this, Resultados);

        _get(Object.getPrototypeOf(Resultados.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Resultados, [{
        key: "render",
        value: function render() {
            return this.tabla_datos();
        }
    }, {
        key: "tabla_datos",
        value: function tabla_datos() {
            var _this17 = this;

            var i = 0;
            var posicion_cuestionario = 1;
            var cuestionario = "";
            var lista = [];
            var resultados = [];
            var r = this.props.datos.map(function (res) {
                if (i == 0) {
                    cuestionario = res.zona_inspeccion;
                    lista.push(_this17.cavecera_res(res));
                    lista.push(_this17.puntos_res());
                }
                if (res.zona_inspeccion == cuestionario) {

                    if (res.posicion == 1) {
                        lista.push(_this17.cuerpo_resultados(res));
                    } else {
                        lista.push(_this17.cuerpo_resultados(res));
                    }
                } else {
                    i = 0;
                    cuestionario = res.zona_inspeccion;
                    lista.push(_this17.cavecera_res(res));
                    lista.push(_this17.puntos_res());
                    lista.push(_this17.cuerpo_resultados(res));
                }
                i = 1;
            });
            return lista;
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

            var si = this.props.datos.filter(function (res) {
                return res.rsi == 1;
            }).length;
            var no = this.props.datos.filter(function (res) {
                return res.rno == 1;
            }).length;
            var na = this.props.datos.filter(function (res) {
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
    }]);

    return Resultados;
})(React.Component);

ReactDOM.render(React.createElement(Ckl_establecimiento, null), document.getElementById("padre"));

