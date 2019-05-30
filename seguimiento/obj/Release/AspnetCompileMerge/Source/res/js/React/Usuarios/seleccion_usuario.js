"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Seleccion_usuario = (function (_React$Component) {
    _inherits(Seleccion_usuario, _React$Component);

    function Seleccion_usuario(props) {
        _classCallCheck(this, Seleccion_usuario);

        _get(Object.getPrototypeOf(Seleccion_usuario.prototype), "constructor", this).call(this, props);
        this.lista_usuarios = [];
        this.filtro = "";
        this.state = {
            id: 0,
            nombre: "",
            foto: "/Data/usr.jpg",
            puesto: "",
            establecimiento: ""
        };
        this.obtener_usuarios();
    }

    _createClass(Seleccion_usuario, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("img", { src: this.state.foto, style: ESTILOS.IMAGEN_USUARIO, className: "img-rounded" }),
                React.createElement(
                    "div",
                    { style: ESTILOS.CONTENEDOR_DATOS },
                    React.createElement("input", { type: "button", style: ESTILOS.BTN_FOLIO, value: this.state.id > 0 ? this.state.id : 'Folio', className: "btn btn-default" }),
                    React.createElement(
                        "div",
                        { style: ESTILOS.CONTENEDOR_NOMBRE },
                        React.createElement(Caja_datos, { icono: "glyphicon glyphicon-user",
                            titulo: "Nombre",
                            datos: this.state.nombre })
                    ),
                    React.createElement(
                        "div",
                        { style: ESTILOS.CONTENEDOR_PUESTOS },
                        React.createElement(Caja_datos, { icono: "glyphicon glyphicon-briefcase",
                            titulo: "Puesto",
                            datos: this.state.puesto })
                    ),
                    React.createElement(
                        "div",
                        { style: ESTILOS.CONTENEDOR_ESTABLECIMIENTO },
                        React.createElement(Caja_datos, { icono: "glyphicon glyphicon-tasks",
                            titulo: "Establecimiento",
                            datos: this.state.establecimiento })
                    )
                ),
                React.createElement(Btn_seleccion, { guardar: this.guardar.bind(this),
                    deshacer: this.on_borrar.bind(this) }),
                React.createElement(Caja_datos, { icono: "glyphicon glyphicon-filter",
                    titulo: "Filtro",
                    datos: this.filtro,
                    evento: this.on_filtrar.bind(this) }),
                React.createElement(
                    "div",
                    { className: "tabla_matriz" },
                    React.createElement(Tabla, { cavecera: ["Folio", "Nombre", "Puesto", "Establecimiento"],
                        datos: this.datos_usuarios() })
                ),
                React.createElement("style", null)
            );
        }

        /**metodos**/
    }, {
        key: "deshacer",
        value: function deshacer() {
            this.setState({
                id: 0,
                nombre: "",
                foto: "/Data/usr.jpg",
                puesto: "",
                establecimiento: ""
            });
        }
    }, {
        key: "guardar",
        value: function guardar() {
            this.props.seleccionar(this.state);
            console.log("Seleccionado : " + this.state.nombre);
            this.on_borrar();
        }

        /**eventos**/
    }, {
        key: "on_filtrar",
        value: function on_filtrar(e) {
            this.filtro = e.target.value;
            this.deshacer();
        }
    }, {
        key: "on_borrar",
        value: function on_borrar() {
            this.filtro = "";
            this.deshacer();
        }
    }, {
        key: "onclick_tabla_usuarios",
        value: function onclick_tabla_usuarios(usuario) {
            this.obtener_foto(usuario.id_scoi);
            this.filtro = "";
            this.setState({
                id: usuario.id_scoi,
                nombre: usuario.nombre_completo,
                puesto: usuario.puesto,
                establecimiento: usuario.establecimiento
            });
        }

        /**conexiones**/
    }, {
        key: "obtener_usuarios",
        value: function obtener_usuarios() {
            var _this = this;

            conexion_api_from_body("servicios/ususrios_scoiServ.asmx/obtener_usuario", {
                tipo: "Todos",
                filtro: "Activo"
            }, function (respuesta) {
                _this.lista_usuarios = respuesta.d;
                _this.setState({ id: -1 });
            });
        }
    }, {
        key: "obtener_foto",
        value: function obtener_foto(folio) {
            var _this2 = this;

            conexion_api_from_body("servicios/ususrios_scoiServ.asmx/obtener_usuario_imagen", {
                tipo: "id_scoi",
                filtro: folio
            }, function (respuesta) {
                _this2.setState({ foto: respuesta.d.foto });
            });
        }

        /**componentes**/
    }, {
        key: "datos_usuarios",
        value: function datos_usuarios() {
            var _this3 = this;

            var filtro = this.lista_usuarios.filter(function (e) {
                return e.nombre_completo.toUpperCase().search(_this3.filtro.toUpperCase()) > -1 || e.puesto.toUpperCase().search(_this3.filtro.toUpperCase()) > -1 || e.establecimiento.toUpperCase().search(_this3.filtro.toUpperCase()) > -1 || e.id_scoi.toString().search(_this3.filtro.toUpperCase()) > -1;
            });
            //this.filtro
            return filtro.map(function (elemento) {
                return React.createElement(
                    "tr",
                    { key: elemento.id_scoi,
                        onClick: function () {
                            return _this3.onclick_tabla_usuarios(elemento);
                        } },
                    React.createElement(
                        "td",
                        { style: { "width": "50px", "text-align": "center" } },
                        elemento.id_scoi
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.nombre_completo
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "250px" } },
                        elemento.puesto
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "150px" } },
                        elemento.establecimiento
                    )
                );
            });
        }
    }]);

    return Seleccion_usuario;
})(React.Component);

var ESTILOS = {
    IMAGEN_USUARIO: {
        'height': '90px',
        'width': '90px',
        'margin-top': '-105px',
        'border': 'solid #808080 1px'
    },
    CONTENEDOR_DATOS: {
        "margin-left": "5px",
        "display": "inline-block",
        "width": "87%"
    },
    BTN_FOLIO: {
        "margin-top": "-40px"
    },
    CONTENEDOR_NOMBRE: {
        "display": "inline-block",
        "width": "80%"
    },
    CONTENEDOR_PUESTOS: {
        "margin-left": "5px",
        "display": "inline-block",
        "width": "45%"
    },
    CONTENEDOR_ESTABLECIMIENTO: {
        "margin-left": "5px",
        "display": "inline-block",
        "width": "50%"
    }
};

