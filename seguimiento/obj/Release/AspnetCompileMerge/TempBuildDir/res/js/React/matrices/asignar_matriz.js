"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = (function (_React$Component) {
    _inherits(Modal, _React$Component);

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

var Modal_con_tabla = (function (_React$Component2) {
    _inherits(Modal_con_tabla, _React$Component2);

    function Modal_con_tabla() {
        _classCallCheck(this, Modal_con_tabla);

        _get(Object.getPrototypeOf(Modal_con_tabla.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Modal_con_tabla, [{
        key: "render",

        /*** seleccionado,titulo,fn guardar,fn deshacer,cavecera "tabla",lista    "tabla"***/
        value: function render() {
            var titulo = React.createElement(
                "h3",
                null,
                " ",
                this.props.titulo
            );
            var cuerpo_modal = [React.createElement(Btn_seleccion, { guardar: this.props.guardar,
                deshacer: this.props.deshacer }), React.createElement(Caja_datos, { titilo: this.props.titilo,
                icono: this.props.icono,
                datos: this.props.seleccionado }), React.createElement(Caja_datos, { titilo: "Filtro",
                icono: "glyphicon glyphicon-filter",
                datos: this.props.texto_filtro,
                evento: this.props.filtrar }), React.createElement(
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

var Matriz = (function (_React$Component3) {
    _inherits(Matriz, _React$Component3);

    function Matriz(props) {
        _classCallCheck(this, Matriz);

        _get(Object.getPrototypeOf(Matriz.prototype), "constructor", this).call(this, props);
        //datos
        this.lista_matrices = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_matriz") || [];
        this.lista_matrices_asignadas = conexion_ajax("servicios/matriz/conexiones.asmx/matrices_asignadas") || [];
        this.lista_usuarios = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { tienda: "Todos" }) || [];
        this.usuario_select = { id_usuario: 0, usuario: "" };
        this.matriz_select = { folio: 0, nombre: "" };
        //eventos
        this.nuevo = this.on_nuevo.bind(this);
        this.editar = this.on_editar.bind(this);
        this.guardar = this.on_guardar.bind(this);
        this.deshacer = this.on_deshacer.bind(this);
        this.sel_fecha = this.seleccionar_fecha.bind(this);
        //eventos datos
        this.filtrar_usuario = this.on_filtrar_usuario.bind(this);
        this.seleccionar_usuario = this.on_seleccionar_usuario.bind(this);
        this.des_seleccion_usuario = this.on_des_seleccion_usuario.bind(this);
        this.filtrar_matriz = this.on_filtrar_matriz.bind(this);
        this.seleccionar_matriz = this.on_seleccionar_matriz.bind(this);
        this.des_seleccion_matriz = this.on_des_seleccion_matriz.bind(this);

        this.nueva = false;
        //state
        this["default"] = {
            folio: 0,
            folio_matriz: 0,
            Matriz: "",
            id_usuario: 0,
            usuario: "",
            fecha: "",
            filtro_usr: "",
            filtro_matriz: '',
            editable: false
        };
        this.state = this["default"];
    }

    _createClass(Matriz, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Botonera, { guardar: this.guardar,
                    nuevo: this.nuevo,
                    editar: this.editar,
                    deshacer: this.deshacer,
                    class_nuevo: this.nueva,
                    class_editar: this.state.editable
                }),
                React.createElement(
                    "div",
                    null,
                    React.createElement(Caja_fecha, { titulo: "fecha",
                        icono: "glyphicon glyphicon-calendar",
                        datos: this.get_fecha(),
                        evento: this.sel_fecha })
                ),
                React.createElement(Caja_datos, { titulo: "Matriz",
                    icono: "glyphicon glyphicon-list-alt",
                    datos: this.state.Matriz }),
                this.on_mostrar_matrices(),
                React.createElement(Caja_datos, { titulo: "Usuario",
                    icono: "glyphicon glyphicon-user",
                    datos: this.state.usuario }),
                this.on_mostrar_ususarios(),
                React.createElement(
                    "div",
                    { className: "tabla_matriz" },
                    React.createElement(Tabla, { cavecera: ["Folio", "Matriz", "Fecha asignacion", "Modificacion", "Usuario"],
                        datos: this.datos_matrices_asignadas() })
                ),
                React.createElement(Modal_con_tabla, { seleccionado: this.matriz_select.nombre,
                    titulo: "Lista Matrices",
                    icono: "glyphicon glyphicon-user",
                    cavecera: ["Folio", "Matriz", "Establecimiento", 'Fecha Alta', 'Usuario Alta', 'Estatus'],
                    lista: this.datos_matrices(),
                    id: "modal_matriz",
                    texto_filtro: this.state.filtro_matriz,
                    filtrar: this.filtrar_matriz,
                    guardar: this.seleccionar_matriz,
                    deshacer: this.des_seleccion_matriz }),
                React.createElement(Modal_con_tabla, { seleccionado: this.usuario_select.usuario,
                    titulo: "Lista Usuarios",
                    icono: "glyphicon glyphicon-user",
                    cavecera: ["Folio", "Nombre", "Puesto"],
                    lista: this.datos_usuarios(),
                    id: "modal_usuario",
                    texto_filtro: this.state.filtro_usr,
                    filtrar: this.filtrar_usuario,
                    guardar: this.seleccionar_usuario,
                    deshacer: this.des_seleccion_usuario })
            );
        }
    }, {
        key: "on_nuevo",
        value: function on_nuevo() {
            if (this.state.editable == false) {
                console.log("Nuevo");
                this.nueva = true;
                this["default"].folio = conexion_ajax("servicios/matriz/conexiones.asmx/ultimo_folio_matrices_asignadas");
                this.setState(this["default"]);
            } else alert('Edicion En Progreso!!!');
        }
    }, {
        key: "on_editar",
        value: function on_editar() {
            if (!this.nueva) {
                if (this.state.usuario != '' && this.state.id_usuario > 0) {
                    console.log("Editar");
                    this.nueva = true;
                    this.setState({ editable: true });
                } else alert('seleccione Matriz!!!');
            } else alert("En Proceso De Nueva Asignaccion!!!");
        }
    }, {
        key: "on_guardar",
        value: function on_guardar() {
            if (this.state.folio_matriz > 0 && this.state.id_usuario > 0 && this.state.fecha.split("/")[0] > 0) {
                if (this.state.editable || this.nueva) {
                    var res = conexion_ajax("servicios/matriz/conexiones.asmx/guardar_matriz_asignada", this.state);
                    if (res) {
                        alert("Guardado!!!");
                        this.nueva = false;
                        this.setState(this["default"]);
                        this.lista_matrices_asignadas = conexion_ajax("servicios/matriz/conexiones.asmx/matrices_asignadas") || [];
                    } else alert("Error");
                }
            } else alert("Falta Seleccionar Datos...");
        }
    }, {
        key: "on_deshacer",
        value: function on_deshacer() {
            console.log("Deshacer");
            this.nueva = false;
            this["default"].folio = 0;
            this.setState(this["default"]);
        }
    }, {
        key: "seleccionar_fecha",
        value: function seleccionar_fecha(e) {
            var f = e.target.value.split("-");
            if (this.nueva || this.state.editable) {
                this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0] });
            }
        }
    }, {
        key: "get_fecha",
        value: function get_fecha() {
            var d = this.state.fecha.split("/");
            var f = d[2] + "-" + d[1] + "-" + d[0];
            return f;
        }
    }, {
        key: "on_tabla_matriz",
        value: function on_tabla_matriz(datos) {
            if (!this.nueva && !this.state.editable) {
                this.setState({
                    folio: datos.folio,
                    folio_matriz: datos.folio_matriz,
                    Matriz: datos.matriz,
                    id_usuario: datos.id_usuario,
                    usuario: datos.usuario,
                    fecha: datos.asignacion
                });
            } else alert('Edicion en Curso!!!');
        }
    }, {
        key: "on_filtrar_usuario",
        value: function on_filtrar_usuario(e) {
            this.usuario_select = { id_usuario: 0, usuario: "" };
            this.setState({ filtro_usr: e.target.value });
        }
    }, {
        key: "on_seleccionar_usuario",
        value: function on_seleccionar_usuario() {
            this.setState({ id_usuario: this.usuario_select.id_usuario, usuario: this.usuario_select.usuario });
        }
    }, {
        key: "on_des_seleccion_usuario",
        value: function on_des_seleccion_usuario() {
            this.usuario_select = { id_usuario: 0, usuario: '' };
            this.setState({ id_usuario: 0, usuario: "" });
        }
    }, {
        key: "on_mostrar_ususarios",
        value: function on_mostrar_ususarios() {
            if (this.nueva) {
                return React.createElement("input", { type: "button", className: "btn btn-info", onClick: this.props.evento, value: "Seleccionar", "data-toggle": "modal", "data-target": "#modal_usuario" });
            }
            return null;
        }
    }, {
        key: "on_filtrar_matriz",
        value: function on_filtrar_matriz(e) {
            this.matriz_select = { folio: 0, nombre: "" };
            this.setState({ filtro_matriz: e.target.value });
        }
    }, {
        key: "on_seleccionar_matriz",
        value: function on_seleccionar_matriz() {
            this.setState({ folio_matriz: this.matriz_select.folio, Matriz: this.matriz_select.nombre });
        }
    }, {
        key: "on_des_seleccion_matriz",
        value: function on_des_seleccion_matriz() {
            this.matriz_select = { folio: 0, nombre: "" };
            this.setState({ folio_matriz: 0, Matriz: "" });
        }
    }, {
        key: "on_mostrar_matrices",
        value: function on_mostrar_matrices(evento) {
            var _this = this;

            if (this.nueva && !this.state.editable) {
                return React.createElement("input", { type: "button",
                    className: "btn btn-info",
                    onClick: function () {
                        _this.lista_matrices = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_matriz") || [];
                    },
                    value: "Seleccionar", "data-toggle": "modal", "data-target": "#modal_matriz" });
            }
            return null;
        }
    }, {
        key: "on_tabla_usuario",
        value: function on_tabla_usuario(usr) {
            this.usuario_select = { id_usuario: usr.folio, usuario: usr.nombre };
            this.setState({ filtro_usr: "" });
        }
    }, {
        key: "on_tabla_matrices",
        value: function on_tabla_matrices(matriz) {
            if (matriz.estatus == "v" || matriz.estatus == "V") {
                this.matriz_select = { folio: matriz.folio, nombre: matriz.nombre };
                this.setState({ filtro_matriz: "" });
            } else alert("Matriz Cancelada!!!");
        }
    }, {
        key: "datos_matrices_asignadas",
        value: function datos_matrices_asignadas() {
            var _this2 = this;

            var r = this.lista_matrices_asignadas.map(function (mat) {
                return React.createElement(
                    "tr",
                    { key: mat.folio, onClick: function () {
                            return _this2.on_tabla_matriz(mat);
                        } },
                    React.createElement(
                        "td",
                        null,
                        mat.folio_matriz
                    ),
                    React.createElement(
                        "td",
                        null,
                        mat.matriz
                    ),
                    React.createElement(
                        "td",
                        null,
                        mat.asignacion
                    ),
                    React.createElement(
                        "td",
                        null,
                        mat.fecha
                    ),
                    React.createElement(
                        "td",
                        null,
                        mat.usuario
                    )
                );
            });
            return r;
        }
    }, {
        key: "datos_usuarios",
        value: function datos_usuarios() {
            var _this3 = this;

            var datos = this.lista_usuarios.filter(function (e) {
                return e.nombre.toUpperCase().search(_this3.state.filtro_usr.toUpperCase()) >= 0 || e.puesto.toUpperCase().search(_this3.state.filtro_usr.toUpperCase()) >= 0 || e.folio.toString().search(_this3.state.filtro_usr.toUpperCase()) >= 0 ? true : false;
            });
            var r = datos.map(function (usuario) {
                return React.createElement(
                    "tr",
                    { key: usuario.folio, onClick: function () {
                            return _this3.on_tabla_usuario(usuario);
                        } },
                    React.createElement(
                        "td",
                        null,
                        usuario.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        usuario.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        usuario.puesto
                    )
                );
            });
            return r;
        }
    }, {
        key: "datos_matrices",
        value: function datos_matrices() {
            var _this4 = this;

            var datos = this.lista_matrices.filter(function (e) {
                return e.establecimiento.toUpperCase().search(_this4.state.filtro_matriz.toUpperCase()) >= 0 || e.nombre.toUpperCase().search(_this4.state.filtro_matriz.toUpperCase()) >= 0 || e.usuario.toUpperCase().search(_this4.state.filtro_matriz.toUpperCase()) >= 0 || e.folio.toString().search(_this4.state.filtro_matriz.toUpperCase()) >= 0 ? true : false;
            });
            var r = datos.map(function (matriz) {
                return React.createElement(
                    "tr",
                    { key: matriz.folio, onClick: function () {
                            return _this4.on_tabla_matrices(matriz);
                        } },
                    React.createElement(
                        "td",
                        null,
                        matriz.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.establecimiento
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.alta
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.usuario
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.estatus == "V" || matriz.estatus == "v" ? "Vigente" : "Cancelado"
                    )
                );
            });
            return r;
        }
    }]);

    return Matriz;
})(React.Component);

ReactDOM.render(React.createElement(Matriz, null), document.getElementById("contenedor"));

