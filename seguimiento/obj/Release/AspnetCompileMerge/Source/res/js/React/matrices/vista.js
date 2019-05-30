

/************************
           selector Establecimiento
 ********************************/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Seleccion_establecimoento = (function (_React$Component) {
    _inherits(Seleccion_establecimoento, _React$Component);

    function Seleccion_establecimoento(props) {
        _classCallCheck(this, Seleccion_establecimoento);

        _get(Object.getPrototypeOf(Seleccion_establecimoento.prototype), "constructor", this).call(this, props);
        this.lista_establecimientos = conexion_ajax("servicios/checkListServ.asmx/buscar_establecimiento");
        this.state = {
            establecimiento: this.props.establecimiento != undefined ? this.propsestablecimiento : this.lista_establecimientos[0],
            matrices: [],
            encargados: [],
            etapa: []
        };
    }

    _createClass(Seleccion_establecimoento, [{
        key: "lideres",
        value: function lideres() {
            ReactDOM.render(React.createElement(Lideres, { establecimiento: this.state.establecimiento }), document.getElementById("modal_matriz"));
        }
    }, {
        key: "establecimientos",
        value: function establecimientos() {
            var r = this.lista_establecimientos.map(function (est) {
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
            var selecionado = this.lista_establecimientos.filter(function (est) {
                return est.id_establecimiento == e.target.value;
            });
            console.log(selecionado[0]);
            this.setState({ establecimiento: selecionado[0] });
            ReactDOM.render(React.createElement(
                "div",
                null,
                React.createElement(Regresar_inicio, null),
                React.createElement(
                    "h2",
                    { style: { "display": "inline-block", "margin-left": "20px" } },
                    "Establecimiento : ",
                    selecionado[0].nombre_establecimiento
                ),
                React.createElement(Selector_lideres, { establecimiento: selecionado[0], lider: { folio: "", nombre: "", puesto: "" } }),
                React.createElement("input", { type: "button", className: "btn btn-info", value: "Seleccionar", "data-toggle": "modal", "data-target": "#modal_matriz" })
            ), document.getElementById("cavecera"));
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            this.lideres();
            return React.createElement(
                "div",
                null,
                React.createElement(
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
                        { className: "form-control", onChange: function (e) {
                                return _this.cambio_establecimiento(e);
                            } },
                        React.createElement(
                            "option",
                            { value: "" },
                            "Seleccionar Establecimientos"
                        ),
                        this.establecimientos()
                    )
                )
            );
        }
    }]);

    return Seleccion_establecimoento;
})(React.Component);

var Regresar_inicio = (function (_React$Component2) {
    _inherits(Regresar_inicio, _React$Component2);

    function Regresar_inicio() {
        _classCallCheck(this, Regresar_inicio);

        _get(Object.getPrototypeOf(Regresar_inicio.prototype), "constructor", this).apply(this, arguments);
    }

    /************************
      selector lider
    ************************/

    _createClass(Regresar_inicio, [{
        key: "regresar",
        value: function regresar() {
            ReactDOM.render(React.createElement(Seleccion_establecimoento, null), document.getElementById("cavecera"));
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "i",
                { className: "glyphicon glyphicon-circle-arrow-left", style: { "font-size": "25px" }, onClick: function () {
                        return _this2.regresar();
                    } },
                "     "
            );
        }
    }]);

    return Regresar_inicio;
})(React.Component);

var Selector_lideres = (function (_React$Component3) {
    _inherits(Selector_lideres, _React$Component3);

    function Selector_lideres(props) {
        _classCallCheck(this, Selector_lideres);

        _get(Object.getPrototypeOf(Selector_lideres.prototype), "constructor", this).call(this, props);
        this.state = { establecimiento: this.props.establecimiento };
    }

    /************************
        filtro lider
    ************************/

    _createClass(Selector_lideres, [{
        key: "render",
        value: function render() {
            var lider = this.props.lider; //!= undefined? this.props.lider:"";
            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon" },
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
        this.state = {
            lider: "",
            filtro: this.lideres_tienda
        };
    }

    _createClass(Lideres, [{
        key: "cambioTexto",
        value: function cambioTexto(e) {
            var filtrados = this.state.filtro.filter(function (a) {
                return a.nombre.toUpperCase().search(e.target.value.toUpperCase()) >= 0 || a.puesto.toUpperCase().search(e.target.value.toUpperCase()) >= 0 ? true : false;
            });
            this.setState({
                lider: "", filtro: e.target.value === "" ? this.lideres_tienda : filtrados
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
            var _this3 = this;

            var r = this.state.filtro.map(function (empleado) {
                return React.createElement(
                    "tr",
                    { key: empleado.folio, style: { "background": "white" }, onClick: function () {
                            _this3.seleccion(empleado);
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
            this.setState({ lider: dato });
        }
    }, {
        key: "seleccionar",
        value: function seleccionar() {
            ReactDOM.render(React.createElement(
                "div",
                null,
                React.createElement(Regresar_inicio, null),
                React.createElement(
                    "h2",
                    { style: { "display": "inline-block", "margin-left": "20px" } },
                    "Establecimiento : ",
                    this.props.establecimiento.nombre_establecimiento
                ),
                React.createElement(Selector_lideres, { establecimiento: this.state.lider, lider: this.state.lider }),
                React.createElement("input", { type: "button", className: "btn btn-success", value: "Cambiar", "data-toggle": "modal", "data-target": "#modal_matriz" }),
                React.createElement(Seleccionar_matriz, null),
                React.createElement("input", { type: "button", value: "Matriz", className: "btn btn-info", "data-toggle": "modal", "data-target": "#modal_matriz_2" })
            ), document.getElementById("cavecera"));
            ReactDOM.render(React.createElement(Matriz, { matriz: { nombre: "", id: "" }, establecimiento: this.props.establecimiento.nombre_establecimiento }), document.getElementById("modal_matriz_2"));
            this.setState({ lider: "" });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                { className: "modal-dialog", style: { "width": "97%", "height": "600px" } },
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
                        React.createElement(
                            "h4",
                            null,
                            "lideres Tienda"
                        ),
                        React.createElement(
                            "div",
                            { className: "input-group" },
                            React.createElement(
                                "span",
                                { className: "input-group-addon" },
                                "Seleccion :"
                            ),
                            React.createElement("input", { className: "form-control", type: "text", disabled: true, value: this.state.lider.nombre, placeholder: "Seleccione De La Tabla..." })
                        ),
                        React.createElement("input", { type: "button", className: "btn btn-default", "data-dismiss": "modal", value: "Seleccionar.", onClick: function () {
                                return _this4.seleccionar();
                            } })
                    ),
                    React.createElement(
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
                            React.createElement("input", { className: "form-control selector", type: "text", placeholder: "Filtro...", onChange: function (e) {
                                    _this4.cambioTexto(e);
                                } })
                        ),
                        this.crear_tabla()
                    )
                )
            );
        }
    }]);

    return Lideres;
})(React.Component);

var Seleccionar_matriz = (function (_React$Component5) {
    _inherits(Seleccionar_matriz, _React$Component5);

    function Seleccionar_matriz() {
        _classCallCheck(this, Seleccionar_matriz);

        _get(Object.getPrototypeOf(Seleccionar_matriz.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Seleccionar_matriz, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon" },
                    React.createElement("i", { className: "glyphicon glyphicon-th" }),
                    " Matriz"
                ),
                React.createElement("input", { className: "form-control", id: "Nom_Encargados", type: "text", disabled: true })
            );
        }
    }]);

    return Seleccionar_matriz;
})(React.Component);

var Matriz = (function (_React$Component6) {
    _inherits(Matriz, _React$Component6);

    function Matriz(props) {
        _classCallCheck(this, Matriz);

        _get(Object.getPrototypeOf(Matriz.prototype), "constructor", this).call(this, props);
        this.state = {
            matriz: this.props.matriz
        };
    }

    _createClass(Matriz, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            return React.createElement(
                "div",
                { className: "modal-dialog", style: { "width": "97%", "height": "600px" } },
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
                        React.createElement(
                            "h4",
                            null,
                            "Establecimiento: ",
                            this.props.establecimiento
                        ),
                        React.createElement(
                            "div",
                            { className: "input-group" },
                            React.createElement(
                                "span",
                                { className: "input-group-addon" },
                                "Seleccion :"
                            ),
                            React.createElement("input", { className: "form-control", type: "text", disabled: true, value: this.state.matriz.nombre, placeholder: "Seleccione De La Tabla..." })
                        ),
                        React.createElement("input", { type: "button", className: "btn btn-default", "data-dismiss": "modal", value: "Seleccionar." })
                    ),
                    React.createElement(
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
                            React.createElement("input", { className: "form-control selector", type: "text", placeholder: "Filtro...", onChange: function (e) {
                                    _this5.cambioTexto(e);
                                } })
                        )
                    )
                )
            );
        }
    }]);

    return Matriz;
})(React.Component);

ReactDOM.render(React.createElement(Seleccion_establecimoento, null), document.getElementById("cavecera"));

