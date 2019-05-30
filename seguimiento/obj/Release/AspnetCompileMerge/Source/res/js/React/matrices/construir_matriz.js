"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Botonera = (function (_React$Component) {
    _inherits(Botonera, _React$Component);

    function Botonera(props) {
        _classCallCheck(this, Botonera);

        _get(Object.getPrototypeOf(Botonera.prototype), "constructor", this).call(this, props);
        this.buscar = this.props.buscar;
        this.guardar = this.props.guardar;
        this.editar = this.props.editar;
        this.deshacer = this.props.deshacer;
        this.nuevo = this.props.nuevo;
    }

    _createClass(Botonera, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "btn-group" },
                React.createElement("input", { type: "button", value: "Buscar", className: "btn btn-primary", "data-toggle": "modal", "data-target": "#modal", onClick: this.buscar }),
                React.createElement("input", { type: "button", value: "Nuevo", className: "btn btn-primary", onClick: this.nuevo }),
                React.createElement("input", { type: "button", value: "Editar", className: "btn btn-primary", onClick: this.editar }),
                React.createElement("input", { type: "button", value: "Guardar", className: "btn btn-primary", onClick: this.guardar }),
                React.createElement("input", { type: "button", value: "Deshacer", className: "btn btn-primary", onClick: this.deshacer })
            );
        }
    }]);

    return Botonera;
})(React.Component);

var Btn_seleccion = (function (_React$Component2) {
    _inherits(Btn_seleccion, _React$Component2);

    function Btn_seleccion(props) {
        _classCallCheck(this, Btn_seleccion);

        _get(Object.getPrototypeOf(Btn_seleccion.prototype), "constructor", this).call(this, props);
        this.guardar = this.props.guardar;
        this.deshacer = this.props.deshacer;
    }

    _createClass(Btn_seleccion, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "btn-group" },
                React.createElement("input", { type: "button", value: "Listo", className: "btn btn-success", "data-dismiss": "modal", onClick: this.guardar }),
                React.createElement("input", { type: "button", value: "Deshacer", className: "btn btn-danger", "data-dismiss": "modal", onClick: this.deshacer })
            );
        }
    }]);

    return Btn_seleccion;
})(React.Component);

var Caja_datos = (function (_React$Component3) {
    _inherits(Caja_datos, _React$Component3);

    function Caja_datos() {
        _classCallCheck(this, Caja_datos);

        _get(Object.getPrototypeOf(Caja_datos.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Caja_datos, [{
        key: "render",
        value: function render() {
            var titilo = this.props.titilo;
            var icono = this.props.icono;
            var caja = this.props.datos;
            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon" },
                    React.createElement("i", { className: icono }),
                    " ",
                    titilo,
                    " "
                ),
                caja
            );
        }
    }]);

    return Caja_datos;
})(React.Component);

var Tabla = (function (_React$Component4) {
    _inherits(Tabla, _React$Component4);

    function Tabla() {
        _classCallCheck(this, Tabla);

        _get(Object.getPrototypeOf(Tabla.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Tabla, [{
        key: "render",
        value: function render() {
            var cavecera = this.props.cavecera;
            var datos = this.props.datos;
            return React.createElement(
                "table",
                { className: "table table-bordered " },
                React.createElement(
                    "thead",
                    { className: "cavecera_tabla" },
                    this.cavecera_tabla(cavecera)
                ),
                React.createElement(
                    "tbody",
                    null,
                    datos
                )
            );
        }
    }, {
        key: "cavecera_tabla",
        value: function cavecera_tabla(dat) {
            var r = dat.map(function (e) {
                return React.createElement(
                    "th",
                    null,
                    e
                );
            });
            return React.createElement(
                "tr",
                { className: "success" },
                r
            );
        }
    }]);

    return Tabla;
})(React.Component);

var Modal = (function (_React$Component5) {
    _inherits(Modal, _React$Component5);

    function Modal() {
        _classCallCheck(this, Modal);

        _get(Object.getPrototypeOf(Modal.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Modal, [{
        key: "render",
        value: function render() {
            var id_modal = this.props.id;
            var cavecera = this.props.cavecera || React.createElement(
                "h3",
                null,
                "Sin datos"
            );
            var cuerpo = this.props.cuerpo || React.createElement(
                "h3",
                null,
                "Sin datos"
            );
            return React.createElement(
                "div",
                { id: id_modal, className: "modal fade", role: "dialog" },
                React.createElement(
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
                        cavecera
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        cuerpo
                    ),
                    React.createElement("div", { className: "modal-footer" })
                )
            );
        }
    }]);

    return Modal;
})(React.Component);

var Modal_con_tabla = (function (_React$Component6) {
    _inherits(Modal_con_tabla, _React$Component6);

    function Modal_con_tabla() {
        _classCallCheck(this, Modal_con_tabla);

        _get(Object.getPrototypeOf(Modal_con_tabla.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Modal_con_tabla, [{
        key: "render",

        /*** seleccionado,titulo,fn guardar,fn deshacer,cavecera "tabla",lista    "tabla"***/
        value: function render() {
            var texto = React.createElement(Caja_texto_modal, { estatus: true,
                valor: this.props.seleccionada.nombre
            });
            var titulo = React.createElement(
                "h3",
                null,
                " ",
                this.props.titulo
            );
            var caja_filtro = React.createElement("input", { type: "text",
                className: "form-control",
                value: this.props.texto_filtro,
                onChange: this.props.filtrar });
            var cuerpo_modal = [React.createElement(Btn_seleccion, { guardar: this.props.guardar,
                deshacer: this.props.deshacer }), React.createElement(Caja_datos, { titilo: this.props.titilo,
                icono: this.props.icono,
                datos: texto }), React.createElement(Caja_datos, { titilo: "Filtro",
                icono: "glyphicon glyphicon-filter",
                datos: caja_filtro }), React.createElement(
                "div",
                { className: "tabla_matriz" },
                React.createElement(Tabla, { cavecera: this.props.cavecera,
                    datos: this.props.lista })
            )];
            return React.createElement(
                "div",
                null,
                React.createElement(Modal, { cavecera: titulo,
                    cuerpo: cuerpo_modal, id: this.props.id })
            );
        }
    }]);

    return Modal_con_tabla;
})(React.Component);

var Modal_tabla_posiciones = (function (_React$Component7) {
    _inherits(Modal_tabla_posiciones, _React$Component7);

    function Modal_tabla_posiciones() {
        _classCallCheck(this, Modal_tabla_posiciones);

        _get(Object.getPrototypeOf(Modal_tabla_posiciones.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Modal_tabla_posiciones, [{
        key: "render",
        value: function render() {
            var titulo = React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    this.props.titulo || "Mover Posiciones."
                ),
                React.createElement(Btn_seleccion, { guardar: this.props.guardar,
                    deshacer: this.props.deshacer })
            );
            var cuerpo = [React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-chevron-up", style: { "margin-left": "20px", "font-size": "25px" }, onClick: this.props.subir }),
                React.createElement("i", { className: "glyphicon glyphicon-chevron-down", style: { "margin-left": "20px", "font-size": "25px" }, onClick: this.props.bajar }),
                React.createElement(
                    "section",
                    { style: { "margin-left": "10px", "font-size": "17px", "display": "inline-block" } },
                    "Mover Posicion."
                )
            ), React.createElement(
                "div",
                { className: "tabla_matriz" },
                React.createElement(Tabla, { cavecera: this.props.cavecera, datos: this.props.lista })
            )];
            return React.createElement(
                "div",
                null,
                React.createElement(Modal, { cavecera: titulo,
                    cuerpo: cuerpo, id: this.props.id })
            );
        }
    }]);

    return Modal_tabla_posiciones;
})(React.Component);

var Caja_texto_modal = (function (_React$Component8) {
    _inherits(Caja_texto_modal, _React$Component8);

    function Caja_texto_modal() {
        _classCallCheck(this, Caja_texto_modal);

        _get(Object.getPrototypeOf(Caja_texto_modal.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Caja_texto_modal, [{
        key: "render",
        value: function render() {
            this.valor = this.props.valor || "";
            this.status = this.props.estatus;
            this.evento = this.props.evento;
            return React.createElement("textarea", { className: "form-control", rows: "1",
                style: { "width": "90%", "resize": "none", "display": "inline-block" },
                maxlength: "200", id: "comment",
                value: this.valor,
                placeholder: "Nombre",
                disabled: this.status,
                onChange: this.evento });
        }
    }]);

    return Caja_texto_modal;
})(React.Component);

var Matriz = (function (_React$Component9) {
    _inherits(Matriz, _React$Component9);

    function Matriz(props) {
        _classCallCheck(this, Matriz);

        _get(Object.getPrototypeOf(Matriz.prototype), "constructor", this).call(this, props);

        /**datos**/
        this.lista_matrices = [];
        this.lista_establecimientos = this.props.lista_establecimientos;
        this.lista_unidad_inspeccion = this.props.lista_unidad_inspeccion;
        this.lista_etapa = this.props.lista_etapa;
        this.lista_concepto = this.props.lista_concepto;
        this.lista_aspectos = this.props.lista_aspectos;
        this.cavecera_tabla = ["Orden Etapa", "Etapa", "Concepto", "Orden U. Inspecccion", "Unidad Inspeccion", "Pond.", "Sugerido Muestra", "Aspecto", "Borrar"];
        this.orden_etapas = [];
        this.orden_unidad_inspeccion = [];
        this.datos_tabla = [];
        this.tabla_filtro = [];
        this.matriz_seleccionada = { folio: 0, nombre: "" };
        this.consepto_seleccionada = { folio: 0, nombre: "" };
        this.unidad_inspector_seleccionada = { folio: 0, nombre: "" };

        //datos default
        this["default"] = {
            matriz: 0,
            nombre_matriz: "",
            matriz_estado: true,
            establecimiento: 1,
            etapa: 1,
            consepto: 1,
            unidad_de_inspeccion: 1,
            aspecto: 0,
            sugerido_m: 1,
            ponderacion: 1,
            editable: false,
            texto_filtro: "",
            filtro_etapas: [],
            filtro_u_i: []
        };
        //datos cambio Parcial
        this.cambio = {
            matriz_estado: false,
            etapa: 1,
            consepto: 1,
            unidad_de_inspeccion: 1,
            aspecto: 0,
            sugerido_m: 1,
            ponderacion: 1,
            texto_filtro: ""
        };

        /**eventos**/
        this.buscar = this.buscar.bind(this);
        this.nuevo = this.nuevo.bind(this);
        this.guardar = this.guardar_matriz.bind(this);
        this.editar = this.editar.bind(this);
        this.deshacer = this.deshacer.bind(this);
        this.mostrar_etapas = this.mostrar_etapas.bind(this);
        this.mostrar_unidad_de_inspeccion = this.mostrar_unidad_de_inspeccion.bind(this);
        this.agregar_a_tabla = this.agregar_a_tabla.bind(this);

        //eventos de objetos
        this.on_establecimientos = this.on_establecimientos.bind(this);
        this.on_etapa = this.on_etapa.bind(this);
        this.on_aspecto = this.on_aspecto.bind(this);
        this.on_matriz = this.on_matriz.bind(this);
        this.on_consepto = this.on_consepto.bind(this);
        this.on_unidad_de_inspeccion = this.on_unidad_de_inspeccion.bind(this);
        this.sugerido_muestra = this.on_sugerido_muestra.bind(this);
        this.on_ponderacion = this.on_ponderacion.bind(this);
        this.filtrar_tabla = this.filtrar_tabla.bind(this);
        this.selector_moda_matriz = this.selector_moda_matriz.bind(this);
        this.deshacer_selector_matrix = this.deshacer_selector_matriz.bind(this);
        this.selector_moda_consepto = this.selector_moda_consepto.bind(this);
        this.deshacer_selector_consepto = this.deshacer_selector_consepto.bind(this);
        this.selector_moda_ui = this.selector_moda_ui.bind(this);
        this.deshacer_selector_ui = this.deshacer_selector_ui.bind(this);

        /**estados**/
        this.state = this["default"];
    }

    _createClass(Matriz, [{
        key: "render",
        value: function render() {
            var _this = this;

            return React.createElement(
                "div",
                null,
                React.createElement(Botonera, { buscar: this.buscar,
                    guardar: this.guardar,
                    nuevo: this.nuevo,
                    editar: this.editar,
                    deshacer: this.deshacer }),
                React.createElement(Caja_datos, { titilo: "Matriz",
                    icono: "glyphicon glyphicon-list-alt",
                    datos: React.createElement(Caja_texto_modal, { estatus: !this.state.editable, valor: this.state.nombre_matriz != "" ? this.state.nombre_matriz : "", evento: this.on_matriz }) }),
                React.createElement(Caja_datos, { titilo: "Establecimiento",
                    icono: "glyphicon glyphicon-briefcase",
                    datos: this.selector("establecimientos", this.on_establecimientos, this.opciones_seleccion(this.lista_establecimientos, this.state.establecimiento), this.state.establecimiento) }),
                React.createElement(Caja_datos, { titilo: "Etapa",
                    icono: "glyphicon glyphicon-new-window",
                    datos: this.selector("etapa", this.on_etapa, this.opciones_seleccion(this.lista_etapa, this.state.etapa), this.state.etapa) }),
                React.createElement(Caja_datos, { titilo: "Concepto",
                    icono: "glyphicon glyphicon-asterisk",
                    datos: this.entrada_modal(this.lista_concepto.filter(function (dato) {
                        return dato.folio == _this.state.consepto;
                    })[0].nombre, this.on_consepto, "modal_consepto") }),
                React.createElement(Caja_datos, { titilo: "Unidad De Inspeccion",
                    icono: "glyphicon glyphicon-search",
                    datos: this.entrada_modal(this.lista_unidad_inspeccion.filter(function (dato) {
                        return dato.folio == _this.state.unidad_de_inspeccion;
                    })[0].nombre, this.on_unidad_de_inspeccion, "modal_unidad_inspeccion") }),
                React.createElement(Caja_datos, { titilo: "Aspecto",
                    icono: "glyphicon glyphicon-tower",
                    datos: this.selector("aspecto", this.on_aspecto, this.opciones_seleccion(this.lista_aspectos, this.state.aspecto), this.state.aspecto, "50%") }),
                React.createElement(
                    "div",
                    { className: "caja_muestra" },
                    React.createElement(Caja_datos, { titilo: "Sugerido Muestra",
                        icono: "glyphicon glyphicon-th",
                        datos: this.caja_numeros(this.state.sugerido_m, 1, 80, this.sugerido_muestra) }),
                    React.createElement(Caja_datos, { titilo: "Ponderacion",
                        icono: "glyphicon glyphicon-flash",
                        datos: this.caja_numeros(this.state.ponderacion, 1, 10, this.on_ponderacion) })
                ),
                React.createElement("input", { type: "button",
                    className: "btn btn-default  botones_tabla",
                    disabled: !this.state.editable,
                    onClick: this.mostrar_etapas,
                    value: "Etapas",
                    "data-toggle": "modal", "data-target": "#modal_Etapas" }),
                React.createElement("input", { type: "button",
                    className: "btn btn-default  botones_tabla",
                    disabled: !this.state.editable,
                    onClick: this.mostrar_unidad_de_inspeccion,
                    value: "Unidad De Inspeccion",
                    "data-toggle": "modal", "data-target": "#modal_u_i" }),
                React.createElement("input", { type: "button", className: "btn btn-success  botones_tabla", disabled: !this.state.editable, onClick: this.agregar_a_tabla, value: "Agregar A Tabla" }),
                React.createElement(
                    "div",
                    { className: "tabla_matriz" },
                    React.createElement(Tabla, { cavecera: this.cavecera_tabla, datos: this.vista_datos_tabla() })
                ),
                React.createElement(Modal_con_tabla, { seleccionada: this.matriz_seleccionada,
                    titulo: "Matrices",
                    cavecera: ["Folio", "Nombre matriz", "Establecimiento", "Estatus", "Usuario"],
                    lista: this.cuerpo_tabla_lista_matrices(),
                    id: "modal",
                    icono: "glyphicon glyphicon-list-alt",
                    guardar: this.selector_moda_matriz,
                    deshacer: this.deshacer_selector_matriz,
                    texto_filtro: this.state.texto_filtro,
                    filtrar: this.filtrar_tabla
                }),
                React.createElement(Modal_con_tabla, { seleccionada: this.consepto_seleccionada,
                    titulo: "Conceptos",
                    cavecera: ["Folio", "Concepto", "Estatus"],
                    lista: this.lista_tabla_conseptos(),
                    id: "modal_consepto",
                    icono: "glyphicon glyphicon-asterisk",
                    guardar: this.selector_moda_consepto,
                    deshacer: this.deshacer_selector_consepto,
                    texto_filtro: this.state.texto_filtro,
                    filtrar: this.filtrar_tabla
                }),
                React.createElement(Modal_con_tabla, { seleccionada: this.unidad_inspector_seleccionada,
                    titulo: "Unidad Inspeccion",
                    cavecera: ["Folio", "Unidad Inspeccion", "Estatus"],
                    lista: this.lista_tabla_u_i(),
                    id: "modal_unidad_inspeccion",
                    icono: "glyphicon glyphicon-search",
                    guardar: this.selector_moda_ui,
                    deshacer: this.deshacer_selector_ui,
                    texto_filtro: this.state.texto_filtro,
                    filtrar: this.filtrar_tabla
                }),
                React.createElement(Modal_tabla_posiciones, {
                    id: "modal_Etapas",
                    titulo: "Mover Posicion Etapas",
                    cavecera: ["posicion", "Etapa"],
                    lista: this.lista_mover_posiciones_etapas(),
                    subir: function () {
                        return _this.on_mover_posicio_etapa(-1);
                    },
                    bajar: function () {
                        return _this.on_mover_posicio_etapa(1);
                    },
                    deshacer: function () {
                        return _this.deshacer_mover_posicion_etapa();
                    },
                    guardar: function () {
                        return _this.guardar_posicion_etapa();
                    }
                }),
                React.createElement(Modal_tabla_posiciones, { id: "modal_u_i",
                    titulo: "Posiciones Etapa : " + this.lista_etapa.filter(function (e) {
                        return e.folio == _this.state.etapa;
                    })[0].nombre || "n",
                    cavecera: ["posicion", "Unidad de Inspeccion"],
                    lista: this.lista_mover_posiciones_u_i(),
                    subir: function () {
                        return _this.on_mover_posicio_u_i(-1);
                    },
                    bajar: function () {
                        return _this.on_mover_posicio_u_i(1);
                    },
                    deshacer: function () {
                        return _this.deshacer_mover_posicion_u_i();
                    },
                    guardar: function () {
                        return _this.guardar_posicion_u_i();
                    }
                })
            );
        }
        /*** seleccionado,titulo,fn guardar,fn deshacer,cavecera "tabla",lista    "tabla"***/
        /**eventos*/
    }, {
        key: "buscar",
        value: function buscar() {
            this.lista_matrices = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_matriz") || [];
            this.setState(this["default"]);
        }
    }, {
        key: "nuevo",
        value: function nuevo() {
            var folio = conexion_ajax("servicios/matriz/conexiones.asmx/ultimo_folio_matriz");
            this.setState({ matriz: folio, matriz_estado: false, editable: true });
        }
    }, {
        key: "guardar_matriz",
        value: function guardar_matriz() {
            if (this.datos_tabla.length > 0 && this.state.editable) {

                var orden_etapa_lista = this.datos_tabla.map(function (e) {
                    return e.orden_etapa;
                });
                var etapa_lista = this.datos_tabla.map(function (e) {
                    return e.etapa;
                });
                var consepto_lista = this.datos_tabla.map(function (e) {
                    return e.consepto;
                });
                var orden_unidad_inspector_lista = this.datos_tabla.map(function (e) {
                    return e.orden_unidad_de_inspeccion;
                });
                var unidad_inspector_lista = this.datos_tabla.map(function (e) {
                    return e.unidad_de_inspeccion;
                });
                var ponderacion_lista = this.datos_tabla.map(function (e) {
                    return e.ponderacion;
                });
                var sugerido_muestra_lista = this.datos_tabla.map(function (e) {
                    return e.sugerido_m;
                });
                var aspectos_lista = this.datos_tabla.map(function (e) {
                    return e.aspecto;
                });

                var matriz = {
                    folio: this.state.matriz,
                    descripcion: this.state.nombre_matriz,
                    id_establecimiento: this.state.establecimiento,
                    id_usuario: ID_SCOI,
                    orden_etapas: orden_etapa_lista,
                    etapas: etapa_lista,
                    conseptos: consepto_lista,
                    orden_unidad_de_inspeccion: orden_unidad_inspector_lista,
                    unidad_de_inspeccion: unidad_inspector_lista,
                    ponderaciones: ponderacion_lista,
                    sugerido_muestra: sugerido_muestra_lista,
                    aspectos: aspectos_lista
                };
                var a = conexion_ajax("servicios/matriz/conexiones.asmx/guardar_crear_armado_matriz", matriz);
                alert("Guardado\n");
                this.deshacer();
            } else alert("Nada Que Guardar");
        }
    }, {
        key: "guardar_posicion_etapa",
        value: function guardar_posicion_etapa() {
            var _this2 = this;

            this.orden_etapas = this.state.filtro_etapas.map(function (e) {
                return e;
            });

            this.datos_tabla.map(function (datos) {

                datos.orden_etapa = _this2.orden_etapas.indexOf(datos.etapa) + 1;

                return datos;
            });

            this.setState({ filtro_etapas: this.orden_etapas.map(function (e) {
                    return e;
                }), etapa: 1 });
        }
    }, {
        key: "guardar_posicion_u_i",
        value: function guardar_posicion_u_i() {
            var _this3 = this;

            this.orden_unidad_inspeccion = this.state.filtro_u_i.map(function (e) {
                return e;
            });

            this.datos_tabla.map(function (datos) {
                if (datos.etapa == _this3.state.etapa) datos.orden_unidad_de_inspeccion = _this3.orden_unidad_inspeccion.indexOf(datos.unidad_de_inspeccion) + 1;

                return datos;
            });

            this.setState({ filtro_u_i: this.orden_unidad_inspeccion.map(function (e) {
                    return e;
                }), unidad_de_inspeccion: 1 });
        }
    }, {
        key: "editar",
        value: function editar() {
            if (this.state.matriz > 0) {
                this.setState({ matriz_estado: false, editable: true });
            } else {
                this.deshacer();
                alert("Selecione Matriz!!!");
            }
        }
    }, {
        key: "deshacer",
        value: function deshacer() {
            this.setState(this["default"]);
            this.datos_tabla = [];
        }
    }, {
        key: "selector_moda_matriz",
        value: function selector_moda_matriz() {
            var _this4 = this;

            this.datos_tabla = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_datos_matriz", { folio: this.matriz_seleccionada.folio }) || [];
            this.setState({ matriz: this.matriz_seleccionada.folio, editable: false, texto_filtro: "" });
            //orden de los datos
            this.datos_tabla.map(function (e) {
                if (!_this4.orden_etapas.includes(parseInt(e.etapa))) {
                    _this4.orden_etapas.push(parseInt(e.etapa));
                    _this4.state.filtro_etapas.push(parseInt(_this4.state.etapa));
                    return e;
                }
            });
        }
    }, {
        key: "deshacer_selector_matriz",
        value: function deshacer_selector_matriz() {
            this.setState(this["default"]);
        }
    }, {
        key: "selector_moda_consepto",
        value: function selector_moda_consepto() {
            this.setState({ consepto: this.consepto_seleccionada.folio, texto_filtro: "" });
        }
    }, {
        key: "deshacer_selector_consepto",
        value: function deshacer_selector_consepto() {
            this.setState({ consepto: 1 });
        }
    }, {
        key: "selector_moda_ui",
        value: function selector_moda_ui() {
            this.setState({ unidad_de_inspeccion: this.unidad_inspector_seleccionada.folio, texto_filtro: "" });
        }
    }, {
        key: "deshacer_selector_ui",
        value: function deshacer_selector_ui() {
            this.setState({ unidad_de_inspeccion: 1 });
        }
    }, {
        key: "deshacer_mover_posicion_etapa",
        value: function deshacer_mover_posicion_etapa() {
            this.state.filtro_etapas = this.orden_etapas;
            this.setState({ etapa: 1 });
        }
    }, {
        key: "deshacer_mover_posicion_u_i",
        value: function deshacer_mover_posicion_u_i() {
            this.state.filtro_u_i = this.orden_unidad_inspeccion;
            this.setState({ unidad_de_inspeccion: 1 });
        }
    }, {
        key: "mostrar_etapas",
        value: function mostrar_etapas() {
            console.log(this.orden_etapas);
            this.state.filtro_etapas = this.orden_etapas;
            this.setState({ filtro_etapas: this.orden_etapas.map(function (e) {
                    return e;
                }) });
        }
    }, {
        key: "mostrar_unidad_de_inspeccion",
        value: function mostrar_unidad_de_inspeccion() {
            this.seleccionar_etapa_tabla(this.state.etapa);
        }
    }, {
        key: "agregar_a_tabla",
        value: function agregar_a_tabla() {
            var _this5 = this;

            if (this.state.aspecto > 0) {
                //crear el orden de etapa
                if (!this.orden_etapas.includes(parseInt(this.state.etapa))) {
                    this.orden_etapas.push(parseInt(this.state.etapa));
                    this.state.filtro_etapas.push(parseInt(this.state.etapa));
                }
                var u_i = this.datos_tabla.filter(function (e) {
                    return e.etapa == _this5.state.etapa;
                });

                var datos = {
                    orden_etapa: this.orden_etapas.indexOf(parseInt(this.state.etapa)) + 1,
                    etapa: parseInt(this.state.etapa),
                    consepto: parseInt(this.state.consepto),
                    orden_unidad_de_inspeccion: u_i.length + 1 || 1,
                    unidad_de_inspeccion: parseInt(this.state.unidad_de_inspeccion),
                    ponderacion: parseInt(this.state.ponderacion),
                    sugerido_m: parseInt(this.state.sugerido_m),
                    aspecto: parseInt(this.state.aspecto)
                };
                this.datos_tabla.push(datos);
                this.setState(this.cambio);
            } else alert("Seleccione Aspecto!!!");
        }
    }, {
        key: "eliminar_de_tabla",
        value: function eliminar_de_tabla(posicion) {
            var pos = this.datos_tabla.indexOf(posicion);
            this.datos_tabla.splice(pos, 1);
            this.state.filtro_etapas.splice(pos, 1);
            this.setState(this.cambio);
        }

        /**eventos objetos**/
    }, {
        key: "on_establecimientos",
        value: function on_establecimientos(e) {
            this.setState({ matriz_estado: e.target.value != 1, establecimiento: e.target.value });
        }
    }, {
        key: "on_etapa",
        value: function on_etapa(e) {
            this.setState({ etapa: e.target.value });
        }
    }, {
        key: "filtrar_tabla",
        value: function filtrar_tabla(e) {
            this.setState({ texto_filtro: e.target.value });
        }
    }, {
        key: "on_aspecto",
        value: function on_aspecto(e) {
            this.setState({ aspecto: e.target.value });
        }
    }, {
        key: "on_matriz",
        value: function on_matriz(e) {
            this.setState({ nombre_matriz: e.target.value });
        }
    }, {
        key: "on_sugerido_muestra",
        value: function on_sugerido_muestra(e) {
            this.setState({ sugerido_m: e.target.value });
        }
    }, {
        key: "on_consepto",
        value: function on_consepto() {
            /*bug al seleccionar concepto */
            console.log("on_consepto ");
        }
    }, {
        key: "on_unidad_de_inspeccion",
        value: function on_unidad_de_inspeccion() {
            console.log("on_unidad_de_inspeccion  ");
        }
    }, {
        key: "on_tabla_filtro_etapa",
        value: function on_tabla_filtro_etapa(e) {
            this.setState({ etapa: e });
        }
    }, {
        key: "on_tabla_filtro_u_i",
        value: function on_tabla_filtro_u_i(e) {
            this.setState({ unidad_de_inspeccion: e });
        }
    }, {
        key: "on_mover_posicio_etapa",
        value: function on_mover_posicio_etapa(mover) {
            var et = this.state.etapa;
            var pos = this.state.filtro_etapas.indexOf(this.state.etapa);

            if ((pos > 0 || mover == 1) && pos + mover < this.state.filtro_etapas.length) {
                var prev = this.state.filtro_etapas[pos + mover];
                this.state.filtro_etapas[pos + mover] = this.state.etapa;
                this.state.filtro_etapas[pos] = prev;
                this.setState({ etapa: et });
            }
        }
    }, {
        key: "on_mover_posicio_u_i",
        value: function on_mover_posicio_u_i(mover) {
            var et = this.state.unidad_de_inspeccion;
            var pos = this.state.filtro_u_i.indexOf(this.state.unidad_de_inspeccion);

            if ((pos > 0 || mover == 1) && pos + mover < this.state.filtro_u_i.length) {
                var prev = this.state.filtro_u_i[pos + mover];
                this.state.filtro_u_i[pos + mover] = this.state.unidad_de_inspeccion;
                this.state.filtro_u_i[pos] = prev;
                this.setState({ unidad_de_inspeccion: et });
            }
        }
    }, {
        key: "on_ponderacion",
        value: function on_ponderacion(e) {
            this.setState({ ponderacion: e.target.value });
        }
    }, {
        key: "obtener_nombre_de_lista_matrices",
        value: function obtener_nombre_de_lista_matrices(m) {
            this.matriz_seleccionada = m;
            this.setState({ nombre_matriz: m.nombre });
        }
    }, {
        key: "obtener_nombre_de_lista_conseptos",
        value: function obtener_nombre_de_lista_conseptos(m) {
            this.consepto_seleccionada = m;
            this.setState({ consepto: m.folio });
        }
    }, {
        key: "obtener_nombre_de_lista_u_i",
        value: function obtener_nombre_de_lista_u_i(m) {
            this.unidad_inspector_seleccionada = m;
            this.setState({ unidad_de_inspeccion: m.folio });
        }
    }, {
        key: "seleccionar_etapa_tabla",
        value: function seleccionar_etapa_tabla(etapa_sel) {
            var datos = []; //this.datos_tabla.filter((datos) => datos.etapa==etapa_sel);
            this.datos_tabla.map(function (e) {
                if (e.etapa == etapa_sel) {
                    datos.push(e.unidad_de_inspeccion);
                }
                return e;
            });
            this.setState({
                etapa: etapa_sel,
                filtro_u_i: datos
            });
        }

        /************************************************************
                            objetos html
        ************************************************************/
    }, {
        key: "selector",
        value: function selector(nombre, evento, datos, valor, estilos) {
            estilos = estilos != undefined ? estilos : "100%";
            return React.createElement(
                "select",
                { className: "form-control", onChange: evento, value: valor, disabled: !this.state.editable, style: { "width": estilos } },
                datos
            );
        }
    }, {
        key: "opciones_seleccion",
        value: function opciones_seleccion(dato, seleccion) {

            var r = dato.map(function (e) {
                if (e.folio == seleccion) {
                    return React.createElement(
                        "option",
                        { key: e.folio, value: e.folio, selected: true },
                        " ",
                        e.nombre
                    );
                } else return React.createElement(
                    "option",
                    { key: e.folio, value: e.folio },
                    " ",
                    e.nombre
                );
            });
            return r;
        }
    }, {
        key: "caja_numeros",
        value: function caja_numeros(valor, min, max, evento) {
            return React.createElement("input", { type: "number",
                className: "form-control",
                style: { "width": "65px" },
                disabled: !this.state.editable,
                value: valor, min: min, max: max,
                onChange: evento });
        }
    }, {
        key: "entrada_modal",
        value: function entrada_modal(nombre, evento, modal) {
            var r = [React.createElement("input", { type: "text",
                className: "form-control",
                value: nombre,
                disabled: true,
                style: { "width": "90%" } })];
            if (this.state.editable) {
                r.push(React.createElement("i", { className: "glyphicon glyphicon-plus-sign",
                    onClick: evento,
                    style: { "font-size": "30px", "color": "#32c3c0", "margin-left": "10px" },
                    "data-toggle": "modal", "data-target": "#" + modal }));
            }
            return r;
        }
    }, {
        key: "vista_datos_tabla",
        value: function vista_datos_tabla() {
            var _this6 = this;

            var lista_datos = [];
            //ordenar por unidad inspector
            this.datos_tabla.sort(function (a, b) {
                return a.orden_unidad_de_inspeccion <= b.orden_unidad_de_inspeccion;
            });
            this.datos_tabla.sort(function (a, b) {
                return a.orden_etapa >= b.orden_etapa;
            });

            /**muestra la tabla con datos capturados**/
            this.datos_tabla.map(function (item) {
                if (!lista_datos.includes(item)) {
                    _this6.datos_tabla.map(function (e) {
                        if (e.etapa === item.etapa) {
                            lista_datos.push(e);
                        }
                        return e;
                    });
                }
                return item;
            });
            var r = lista_datos.map(function (e) {
                return React.createElement(
                    "tr",
                    { key: e.orden_etapa + "-" + e.orden_unidad_de_inspeccion, onClick: function () {
                            return _this6.seleccionar_etapa_tabla(e.etapa);
                        } },
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        e.orden_etapa
                    ),
                    React.createElement(
                        "td",
                        null,
                        _this6.lista_etapa.filter(function (dat) {
                            return dat.folio == e.etapa;
                        })[0].nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        _this6.lista_concepto.filter(function (dat) {
                            return dat.folio == e.consepto;
                        })[0].nombre
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        e.orden_unidad_de_inspeccion
                    ),
                    React.createElement(
                        "td",
                        null,
                        _this6.lista_unidad_inspeccion.filter(function (dat) {
                            return dat.folio == e.unidad_de_inspeccion;
                        })[0].nombre
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        e.ponderacion
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        e.sugerido_m
                    ),
                    React.createElement(
                        "td",
                        null,
                        _this6.lista_aspectos.filter(function (dat) {
                            return dat.folio == e.aspecto;
                        })[0].nombre
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        React.createElement("input", { type: "button", value: "X", disabled: !_this6.state.editable, className: "btn btn-danger btn-sm", onClick: function () {
                                return _this6.eliminar_de_tabla(e);
                            } }),
                        "  "
                    )
                );
            });
            return r; ///<i className="glyphicon glyphicon-remove-circle close red" onClick={ ()=>this.eliminar_de_tabla(e)}></i>
        }
    }, {
        key: "cuerpo_tabla_lista_matrices",
        value: function cuerpo_tabla_lista_matrices() {
            var _this7 = this;

            var filtro = this.lista_matrices.filter(function (dato) {
                return dato.nombre.toUpperCase().search(_this7.state.texto_filtro.toUpperCase()) >= 0 ? true : false;
            });

            var r = filtro.map(function (m) {
                return React.createElement(
                    "tr",
                    { key: m.folio, onClick: function () {
                            return _this7.obtener_nombre_de_lista_matrices(m);
                        } },
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        m.folio
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "570px" } },
                        m.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        m.establecimiento
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        m.estatus == "V" ? "Vigente" : "Cancelado"
                    ),
                    React.createElement(
                        "td",
                        null,
                        m.usuario
                    )
                );
            });
            return r;
        }
    }, {
        key: "lista_tabla_conseptos",
        value: function lista_tabla_conseptos() {
            var _this8 = this;

            var filtro = this.lista_concepto.filter(function (dato) {
                return dato.nombre.toUpperCase().search(_this8.state.texto_filtro.toUpperCase()) >= 0 ? true : false;
            });
            var r = filtro.map(function (m) {
                return React.createElement(
                    "tr",
                    { key: m.folio, onClick: function () {
                            return _this8.obtener_nombre_de_lista_conseptos(m);
                        } },
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        m.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        m.nombre
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        m.estatus == "V" ? "Vigente" : "Cancelado"
                    )
                );
            });
            return r;
        }
    }, {
        key: "lista_tabla_u_i",
        value: function lista_tabla_u_i() {
            var _this9 = this;

            var filtro = this.lista_unidad_inspeccion.filter(function (dato) {
                return dato.nombre.toUpperCase().search(_this9.state.texto_filtro.toUpperCase()) >= 0 ? true : false;
            });
            var r = filtro.map(function (m) {
                return React.createElement(
                    "tr",
                    { key: m.folio, onClick: function () {
                            return _this9.obtener_nombre_de_lista_u_i(m);
                        } },
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        m.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        m.nombre
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        m.estatus == "V" ? "Vigente" : "Cancelado"
                    )
                );
            });
            return r;
        }
    }, {
        key: "lista_mover_posiciones_etapas",
        value: function lista_mover_posiciones_etapas() {
            var _this10 = this;

            var r = this.state.filtro_etapas.map(function (e) {
                var clase = e == _this10.state.etapa ? "lista_seleccionada" : "";
                return React.createElement(
                    "tr",
                    { className: clase, onClick: function () {
                            return _this10.on_tabla_filtro_etapa(e);
                        } },
                    React.createElement(
                        "td",
                        null,
                        _this10.state.filtro_etapas.indexOf(e) + 1
                    ),
                    React.createElement(
                        "td",
                        null,
                        _this10.lista_etapa.filter(function (et) {
                            return et.folio == e;
                        })[0].nombre
                    )
                );
            });
            return r;
        }
    }, {
        key: "lista_mover_posiciones_u_i",
        value: function lista_mover_posiciones_u_i() {
            var _this11 = this;

            var r = this.state.filtro_u_i.map(function (e) {
                var clase = e == _this11.state.unidad_de_inspeccion ? "lista_seleccionada" : "";
                return React.createElement(
                    "tr",
                    { className: clase, onClick: function () {
                            return _this11.on_tabla_filtro_u_i(e);
                        } },
                    React.createElement(
                        "td",
                        null,
                        _this11.state.filtro_u_i.indexOf(e) + 1
                    ),
                    React.createElement(
                        "td",
                        null,
                        _this11.lista_unidad_inspeccion.filter(function (et) {
                            return et.folio == e;
                        })[0].nombre || "otro"
                    )
                );
            });
            return r;
        }
    }]);

    return Matriz;
})(React.Component);

function App() {
    /**conexiones ajax**/
    var lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
    var lista_unidad_inspeccion = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_unidad_inspeccion_matriz") || [];
    var lista_etapa = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_etapas_matriz") || [];
    var lista_concepto = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_conceptos_matriz") || [];
    var lista_aspectos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_aspectos_matriz") || [];

    ReactDOM.render(React.createElement(Matriz, {
        lista_establecimientos: lista_establecimientos,
        lista_unidad_inspeccion: lista_unidad_inspeccion,
        lista_etapa: lista_etapa,
        lista_concepto: lista_concepto,
        lista_aspectos: lista_aspectos
    }), document.getElementById("contenedor"));
}
/**Run App**/
App();

