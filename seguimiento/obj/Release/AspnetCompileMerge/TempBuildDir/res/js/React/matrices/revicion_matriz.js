"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Seleccion = (function (_React$Component) {
    _inherits(Seleccion, _React$Component);

    function Seleccion() {
        _classCallCheck(this, Seleccion);

        _get(Object.getPrototypeOf(Seleccion.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Seleccion, [{
        key: "render",
        value: function render() {
            return React.createElement("div", null);
        }
    }]);

    return Seleccion;
})(React.Component);

var Matriz = (function (_React$Component2) {
    _inherits(Matriz, _React$Component2);

    function Matriz(props) {
        _classCallCheck(this, Matriz);

        _get(Object.getPrototypeOf(Matriz.prototype), "constructor", this).call(this, props);
        //estados
        this.state = {
            establecimiento: 1,
            editable: true,
            Matriz: 0
        };
        /**datos**/
        this.lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
        this.lista_matrices_asignadas = conexion_ajax("servicios/matriz/conexiones.asmx/matrices_asignadas_por_establecimiento", { folio: this.state.establecimiento }) || [];
        this.cavecera_tabla_matrices_asignadas = ["folio", "Matriz", "Establecimiento", "Usuario", "Asignacion"];
        //eventos de objetos
        this.seleccion_establecimiento = this.on_seleccion_establecimiento.bind(this);
    }

    _createClass(Matriz, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Caja_datos_select, { titilo: "Establecimiento",
                    icono: "glyphicon glyphicon-briefcase",
                    seleccion: this.seleccion_establecimiento,
                    opciones: this.com_opciones_establecimientos()
                }),
                React.createElement(Tabla, { cavecera: this.cavecera_tabla_matrices_asignadas,
                    datos: this.datos_tabla_matrices() })
            );
        }

        /**eventos objetos**/
    }, {
        key: "on_seleccion_establecimiento",
        value: function on_seleccion_establecimiento(e) {
            this.lista_matrices_asignadas = conexion_ajax("servicios/matriz/conexiones.asmx/matrices_asignadas_por_establecimiento", { folio: this.state.establecimiento }) || [];
            this.setState({
                establecimiento: e.target.value
            });
        }

        /**objetos HTML**/
    }, {
        key: "com_opciones_establecimientos",
        value: function com_opciones_establecimientos() {
            var _this = this;

            var r = this.lista_establecimientos.map(function (e) {
                if (e.folio == _this.state.establecimiento) {
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
        key: "datos_tabla_matrices",
        value: function datos_tabla_matrices() {
            var r = this.lista_matrices_asignadas.map(function (matriz) {
                return React.createElement(
                    "tr",
                    { key: matriz.folio },
                    React.createElement(
                        "td",
                        null,
                        matriz.folio_matriz
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.matriz
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.establecimiento
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.usuario
                    ),
                    React.createElement(
                        "td",
                        null,
                        matriz.asignacion
                    )
                );
            });
            return r;
        }
    }]);

    return Matriz;
})(React.Component);

ReactDOM.render(React.createElement(Matriz, null), document.getElementById("container"));

