"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cabecera = (function (_React$Component) {
    _inherits(Cabecera, _React$Component);

    function Cabecera() {
        _classCallCheck(this, Cabecera);

        _get(Object.getPrototypeOf(Cabecera.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Cabecera, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { style: { "width": "400px", "display": "inline-block", "marginTop": "10px" },
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
                    "a",
                    { className: "btn-success btn",
                        style: { "marginLeft": "5px", "borderRadius": "5px" },
                        onClick: this.props.revisar },
                    React.createElement(
                        "span",
                        { className: "fa fa-pencil-square-o" },
                        " "
                    )
                )
            );
        }
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
                    { key: e.folio, selected: seleccion(e.folio),
                        value: e.folio },
                    e.nombre
                );
            });
        }
    }]);

    return Cabecera;
})(React.Component);

var Filtro_producto_folio = (function (_React$Component2) {
    _inherits(Filtro_producto_folio, _React$Component2);

    function Filtro_producto_folio(props) {
        _classCallCheck(this, Filtro_producto_folio);

        _get(Object.getPrototypeOf(Filtro_producto_folio.prototype), "constructor", this).call(this, props);
        this.state = {
            codigo_producto: "",
            descripcion: "",
            establecimiento: "",
            existencia_piezas: "",
            fecha: ""
        };
    }

    _createClass(Filtro_producto_folio, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { style: { "width": "100%", "display": "inline-block", "height": "70px", " justify-content": "center" },
                    onSubmit: this.buscar_producto.bind(this),
                    className: "panel panel-info" },
                React.createElement(
                    "span",
                    { className: "glyphicon glyphicon-barcode",
                        style: { "marginLeft": "10px", "marginTop": "10px" } },
                    React.createElement(
                        "label",
                        { style: { "marginLeft": "5px" } },
                        "PRODUCTO:"
                    )
                ),
                React.createElement("br", null),
                React.createElement("input", { type: "text",
                    style: { "width": "80px", "display": "inline-block", "marginLeft": "5px" },
                    className: "form-control",
                    onChange: this.on_productos.bind(this),
                    placeholder: "codigo",
                    value: this.state.codigo_producto }),
                React.createElement("button", { className: "fa fa-search btn btn-default",
                    type: "submit",
                    onClick: this.buscar_producto.bind(this),
                    style: { "fontSize": "15px", "borderRadius": "20px", "marginLeft": "3px", "display": "inline-block" } }),
                React.createElement("input", { className: "form-control", style: { "marginLeft": "5px", "width": "70%", "display": "inline-block" },
                    value: this.state.descripcion, placeholder: "Descripcion..." })
            );
        }

        /**eventos**/
    }, {
        key: "on_seleccionar",
        value: function on_seleccionar(producto) {
            this.props.obtener_producto(producto);
            this.setState({
                codigo_producto: "",
                descripcion: "",
                establecimiento: "",
                existencia_piezas: "",
                fecha: ""
            });
        }
    }, {
        key: "on_productos",
        value: function on_productos(folio) {
            folio = folio.target.value;
            if (folio != NaN) {
                this.setState({
                    codigo_producto: folio,
                    descripcion: "",
                    establecimiento: "",
                    existencia_piezas: "",
                    fecha: ""
                });
            } else this.setState({
                codigo_producto: ""
            });
        }
    }, {
        key: "buscar_producto",
        value: function buscar_producto(event) {
            if (this.state.codigo_producto != NaN && this.state.codigo_producto != "" && this.state.codigo_producto != null) {
                if (this.props.establecimiento != "") {
                    console.log("Codigo A enviar:", this.state.codigo_producto);
                    this.obtener_producto_folio();
                } else alert("Falta Seleccionar Establecimiento!!!");
            } else alert("Falta Codigo!!!");
            event.preventDefault();
        }

        /**metodos**/
        /**conexiones**/
    }, {
        key: "obtener_producto_folio",
        value: function obtener_producto_folio() {
            var _this2 = this;

            conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos_folio", {
                folio: this.state.codigo_producto,
                establecimiento: this.props.establecimiento
            }, function (productos) {
                console.log("Productos:", productos.d);
                if (productos.d.length > 0) {
                    var p = productos.d[0];
                    _this2.setState(p);
                    _this2.on_seleccionar(p);
                    document.getElementById("dialog").style.display = "none";
                } else alert("No Encontrado!!!");
            });
        }
    }]);

    return Filtro_producto_folio;
})(React.Component);

var Clasificado_Filtro_Productos = (function (_React$Component3) {
    _inherits(Clasificado_Filtro_Productos, _React$Component3);

    function Clasificado_Filtro_Productos(props) {
        _classCallCheck(this, Clasificado_Filtro_Productos);

        _get(Object.getPrototypeOf(Clasificado_Filtro_Productos.prototype), "constructor", this).call(this, props);
        this.state = {
            producto: "",
            clase: "",
            categoria: "",
            familia: "",
            linea: "",
            talla: ""
        };
    }

    _createClass(Clasificado_Filtro_Productos, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "panel-body",
                    style: { "height": "400px" } },
                React.createElement(
                    "h4",
                    null,
                    "FILTRO PRODUCTO INVENTARIO PARCIAL"
                ),
                React.createElement(
                    "table",
                    { className: "table ", style: { "width": "100%" } },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(Item_filtro, { titulo: "PRODUCTOS",
                            valor: this.state.producto,
                            borrar: this.borrar.bind(this),
                            resultado: this.props.resultados_filtro.producto,
                            buscar: function () {
                                return _this3.buscar("producto", _this3.state.producto);
                            },
                            tipo_filtro: function (e) {
                                return _this3.tipo_filtro("producto", e);
                            } }),
                        React.createElement(Item_filtro, { titulo: "CLASES",
                            valor: this.state.clase,
                            borrar: this.borrar.bind(this),
                            resultado: this.props.resultados_filtro.clase,
                            buscar: function () {
                                return _this3.buscar("clase_producto", _this3.state.clase);
                            },
                            tipo_filtro: function (e) {
                                return _this3.tipo_filtro("clase_producto", e);
                            } }),
                        React.createElement(Item_filtro, { titulo: "CATEGORIAS",
                            valor: this.state.categoria,
                            borrar: this.borrar.bind(this),
                            resultado: this.props.resultados_filtro.categoria,
                            buscar: function () {
                                return _this3.buscar("Categoria", _this3.state.categoria);
                            },
                            tipo_filtro: function (e) {
                                return _this3.tipo_filtro("Categoria", e);
                            } }),
                        React.createElement(Item_filtro, { titulo: "FAMILIA",
                            valor: this.state.familia,
                            borrar: this.borrar.bind(this),
                            resultado: this.props.resultados_filtro.familia,
                            buscar: function () {
                                return _this3.buscar("familia", _this3.state.familia);
                            },
                            tipo_filtro: function (e) {
                                return _this3.tipo_filtro("familia", e);
                            } }),
                        React.createElement(Item_filtro, { titulo: "LINEA",
                            valor: this.state.linea,
                            borrar: this.borrar.bind(this),
                            resultado: this.props.resultados_filtro.linea,
                            buscar: function () {
                                return _this3.buscar("linea_producto", _this3.state.linea);
                            },
                            tipo_filtro: function (e) {
                                return _this3.tipo_filtro("linea_producto", e);
                            } }),
                        React.createElement(Item_filtro, { titulo: "TALLA",
                            valor: this.state.talla,
                            borrar: this.borrar.bind(this),
                            resultado: this.props.resultados_filtro.talla,
                            buscar: function () {
                                return _this3.buscar("talla", _this3.state.talla);
                            },
                            tipo_filtro: function (e) {
                                return _this3.tipo_filtro("talla", e);
                            } })
                    )
                )
            );
        }
    }, {
        key: "tipo_filtro",
        value: function tipo_filtro(filtro, e) {
            this.props.tipo_filtro(filtro, e);
            this.props.deshacer();

            var t = {
                producto: "",
                clase: "",
                categoria: "",
                familia: "",
                linea: "",
                talla: ""
            };
            var evento = e.target.value;
            switch (filtro) {
                case "producto":
                    t.producto = evento;
                    break;
                case "clase_producto":
                    t.clase = evento;
                    break;
                case "familia":
                    t.familia = evento;
                    break;
                case "linea_producto":
                    t.linea = evento;
                    break;
                case "talla":
                    t.talla = evento;
                    break;
                case "Categoria":
                    t.categoria = evento;
                    break;
            }
            this.setState(t);
        }
    }, {
        key: "buscar",
        value: function buscar(categoria, filtro) {
            console.log("Buscar...");

            this.props.buscar(categoria, filtro);
        }
    }, {
        key: "borrar",
        value: function borrar() {
            console.log("Borrar...");
            this.props.deshacer();
            this.setState({
                producto: "",
                clase: "",
                categoria: "",
                familia: "",
                linea: "",
                talla: ""
            });
        }
    }]);

    return Clasificado_Filtro_Productos;
})(React.Component);

var Modal_clasificadores_productos = (function (_React$Component4) {
    _inherits(Modal_clasificadores_productos, _React$Component4);

    function Modal_clasificadores_productos(props) {
        _classCallCheck(this, Modal_clasificadores_productos);

        _get(Object.getPrototypeOf(Modal_clasificadores_productos.prototype), "constructor", this).call(this, props);
        this.contador = {
            cantidad: -1,
            inicio: 0,
            termino: 99
        };
        this.state = {
            filtro: "",
            lista_seleccion: []
        };
    }

    _createClass(Modal_clasificadores_productos, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "mod_productos", className: "modal_generica" },
                React.createElement(
                    "div",
                    { className: "panel panel-default" },
                    React.createElement(
                        "div",
                        { className: "panel panel-heading", style: { "color": "azure", "background": "rgb(87, 182, 141)" } },
                        React.createElement("span", { className: "glyphicon glyphicon-remove-circle close", onClick: this.cerrar.bind(this) }),
                        React.createElement(
                            "label",
                            null,
                            "FILTRO DE CLASIFICADORES"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "panel-body" },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "span",
                                { className: "glyphicon glyphicon-filter" },
                                " BUSQUEDA DE CLASIFICADOR"
                            ),
                            React.createElement("input", { type: "text",
                                onChange: this.filtrado_tabla.bind(this),
                                className: "form-control",
                                placeholder: "Filtro..." })
                        ),
                        React.createElement(
                            "div",
                            { id: "contenedor_filtro_productos" },
                            React.createElement(
                                "table",
                                { className: "table " },
                                React.createElement(
                                    "thead",
                                    { className: "panel panel-info" },
                                    React.createElement(
                                        "tr",
                                        { className: "info" },
                                        React.createElement(
                                            "th",
                                            null,
                                            "CODIGO"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "DESCRIPCION"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            " "
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    this.datos_tabla()
                                )
                            )
                        ),
                        this.botones_pie_tabla(),
                        React.createElement(
                            "span",
                            { className: "btn btn-primary btn-block", style: { "marginTop": "15px" },
                                onClick: this.on_guardar_seleccion.bind(this) },
                            React.createElement(
                                "i",
                                { className: "glyphicon glyphicon-download-alt" },
                                " "
                            ),
                            React.createElement(
                                "label",
                                { style: { "marginLeft": "5px" } },
                                "CARGAR"
                            )
                        )
                    )
                )
            );
        }

        /**eventos**/
    }, {
        key: "on_guardar_seleccion",
        value: function on_guardar_seleccion() {
            var seleccion = this.state.lista_seleccion.toString();
            console.log(seleccion);
            this.props.seleccion_clasificador(seleccion);
            this.setState({ lista_seleccion: [] });
            document.getElementById("mod_productos").style.display = "none";
        }
    }, {
        key: "cerrar",
        value: function cerrar() {
            document.getElementById("mod_productos").style.display = "none";
            this.contador = {
                cantidad: -1,
                inicio: 0,
                termino: 99
            };
            this.setState({ lista_seleccion: [] });
        }
    }, {
        key: "on_seleccionar",
        value: function on_seleccionar(elemento) {

            var lista = [];

            if (this.props.limitador_filtro == "in") lista = this.seleccion_lista(elemento);else lista = this.seleccion_unica(elemento);

            this.setState({ lista_seleccion: lista });
        }

        /*****/
    }, {
        key: "filtrado_tabla",
        value: function filtrado_tabla(event) {
            console.log(event.target.value);
            this.setState({ filtro: event.target.value });
        }
    }, {
        key: "seleccion_lista",
        value: function seleccion_lista(elemento) {
            var lista = this.state.lista_seleccion.map(function (e) {
                return e;
            });
            if (!lista.includes("''" + elemento.folio + "''")) {
                lista.push("''" + elemento.folio + "''");
                console.log(lista);
            } else {
                var pos = lista.indexOf("''" + elemento.folio + "''");
                if (pos > -1) lista.splice(pos, 1);
            }
            return lista;
        }
    }, {
        key: "seleccion_unica",
        value: function seleccion_unica(elemento) {
            var lista = this.state.lista_seleccion.map(function (e) {
                return e;
            });

            if (!lista.includes("''" + elemento.folio + "''")) lista = ["''" + elemento.folio + "''"];else lista = [];

            return lista;
        }

        /**componentes**/
    }, {
        key: "botones_pie_tabla",
        value: function botones_pie_tabla() {
            var botones = new Array(3);
            botones[0] = React.createElement(
                "i",
                { className: "btn btn-link" },
                this.contador.cantidad > 99 ? "100" : this.contador.cantidad
            );
            botones[1] = React.createElement(
                "i",
                { className: "btn btn-link" },
                " DE "
            );
            botones[2] = React.createElement(
                "i",
                { className: "btn btn-link" },
                this.contador.cantidad
            );

            return React.createElement(
                "div",
                { className: "panel panel-info", style: { "display": "flex", "height": "45px", "align-items": "center" } },
                botones
            );
        }
    }, {
        key: "datos_tabla",
        value: function datos_tabla() {
            var _this4 = this;

            var filtro = this.state.filtro.toUpperCase();

            var lista = this.props.clasificadores.filter(function (elemento) {
                return elemento.folio.toString().search(filtro) > -1 || elemento.clasificador.toUpperCase().search(filtro) > -1;
            });
            this.contador.cantidad = lista.length;
            var seleccion = function seleccion(folio) {
                return _this4.state.lista_seleccion.includes(folio) ? "glyphicon glyphicon-check" : "glyphicon glyphicon-unchecked";
            };
            lista = lista.filter(function (e, p) {
                return p >= _this4.contador.inicio && p <= _this4.contador.termino;
            });
            return lista.map(function (e, p) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this4.on_seleccionar(e);
                        } },
                    React.createElement(
                        "td",
                        { style: { "width": "60px", "textAlign": "center" } },
                        e.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.clasificador
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "60px", "textAlign": "center", "fontSize": "25px" } },
                        React.createElement("i", { className: seleccion("''" + e.folio + "''") })
                    )
                );
            });
        }
    }]);

    return Modal_clasificadores_productos;
})(React.Component);

var Item_filtro = (function (_React$Component5) {
    _inherits(Item_filtro, _React$Component5);

    function Item_filtro() {
        _classCallCheck(this, Item_filtro);

        _get(Object.getPrototypeOf(Item_filtro.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Item_filtro, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            var seleccionado = function seleccionado(f) {
                return f === _this5.props.valor;
            };
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { style: { "width": "120px" } },
                    React.createElement(
                        "label",
                        null,
                        this.props.titulo
                    )
                ),
                React.createElement(
                    "td",
                    { style: { "width": "120px" } },
                    React.createElement(
                        "select",
                        { className: "form-control", onChange: this.props.tipo_filtro },
                        React.createElement(
                            "option",
                            { value: "", selected: seleccionado("") },
                            "TODOS"
                        ),
                        React.createElement(
                            "option",
                            { value: "in", selected: seleccionado("in") },
                            "LISTA "
                        ),
                        React.createElement(
                            "option",
                            { value: "=", selected: seleccionado(" =") },
                            "IGUAL "
                        ),
                        React.createElement(
                            "option",
                            { value: ">", selected: seleccionado(">") },
                            "MAYOR "
                        ),
                        React.createElement(
                            "option",
                            { value: "<", selected: seleccionado("<") },
                            "MENOR "
                        ),
                        React.createElement(
                            "option",
                            { value: "!=", selected: seleccionado("!=") },
                            "DIFERENTE"
                        )
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "div",
                        { className: "form-control" },
                        this.props.resultado != "0" ? this.props.resultado : ""
                    )
                ),
                React.createElement(
                    "td",
                    { style: { "width": "40px" } },
                    React.createElement("a", { className: "glyphicon glyphicon-plus btn btn-info",
                        onClick: this.props.buscar })
                ),
                React.createElement(
                    "td",
                    { style: { "width": "40px" } },
                    React.createElement("a", { className: "glyphicon glyphicon-trash btn btn-danger",
                        onClick: this.props.borrar })
                )
            );
        }
    }]);

    return Item_filtro;
})(React.Component);

var Modal_Entrada_cantidad = (function (_React$Component6) {
    _inherits(Modal_Entrada_cantidad, _React$Component6);

    function Modal_Entrada_cantidad(props) {
        _classCallCheck(this, Modal_Entrada_cantidad);

        _get(Object.getPrototypeOf(Modal_Entrada_cantidad.prototype), "constructor", this).call(this, props);
        this.state = {
            texto: ""
        };
    }

    _createClass(Modal_Entrada_cantidad, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal_generica", id: "m", style: { "display": "none", "position": "fixed" } },
                React.createElement(
                    "div",
                    { className: "panel panel-default",
                        style: { "position": "fixed", "width": "350px", "height": "250px" } },
                    React.createElement(
                        "div",
                        { className: "panel-heading " },
                        React.createElement("span", { className: "glyphicon glyphicon-remove-circle red close", onClick: this.cerrar.bind(this) }),
                        React.createElement(
                            "label",
                            null,
                            "Existencia Fisica."
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "panel panel-body " },
                        React.createElement(
                            "div",
                            { className: "panel-info form-group" },
                            React.createElement(
                                "label",
                                { className: "form-control", id: "vista_texto_total",
                                    style: { "textAlign": "right", "fontSize": "20px" } },
                                this.state.texto || 0
                            )
                        ),
                        React.createElement(
                            "span",
                            { className: "btn btn-success btn-block",
                                onClick: this._salvar.bind(this) },
                            " Salvar"
                        ),
                        React.createElement(
                            "div",
                            { className: "panel panel-success",
                                style: { " justify-content": "center", "display": "flex" } },
                            React.createElement(
                                "table",
                                { className: "table",
                                    style: { "align-items": "center", "marginLeft": "0px", "background": "azure" } },
                                React.createElement(
                                    "tr",
                                    { style: { "textAlign": "center" } },
                                    this.boton_num(1),
                                    this.boton_num(2),
                                    this.boton_num(3),
                                    React.createElement(
                                        "th",
                                        { style: { "background": "azure" } },
                                        React.createElement(
                                            "span",
                                            { className: "btn glyphicon glyphicon glyphicon-circle-arrow-left",
                                                style: { "width": "100%", "height": "100%", "color": "orange", "fontSize": "20px" },
                                                onClick: this._borrar.bind(this) },
                                            " "
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tr",
                                    { style: { "textAlign": "center" } },
                                    this.boton_num(4),
                                    this.boton_num(5),
                                    this.boton_num(6),
                                    this.boton_num(".")
                                ),
                                React.createElement(
                                    "tr",
                                    { style: { "textAlign": "center" } },
                                    this.boton_num(7),
                                    this.boton_num(8),
                                    this.boton_num(9),
                                    this.boton_num(0)
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "_boton",
        value: function _boton(valor) {
            var texto_ = this.state.texto;

            var comprovar_punto = texto_.split(".");

            if (texto_.length < 9) {
                if (valor > 0 && valor < 10) texto_ += valor; //numero
                else if (texto_.length > 0 && valor == 0) texto_ += valor; //cero
                    else if (comprovar_punto.length == 1) {
                            texto_ = texto_.length > 0 ? texto_ += valor : "0" + valor; //punto
                        }
                this.setState({ texto: texto_ });
            } else {
                document.getElementById("vista_texto_total").style.border = 'solid 3px red';
                setTimeout(function () {
                    return document.getElementById("vista_texto_total").style.border = "";
                }, 1000);
            }
        }
    }, {
        key: "_salvar",
        value: function _salvar() {
            //alert(this.state.texto)
            var r = parseFloat(this.state.texto || 0);
            console.log(r);
            this.props.seleccion(r);
            this.setState({ texto: "" });
        }
    }, {
        key: "_borrar",
        value: function _borrar() {
            var texto_ = this.state.texto;
            texto_ = texto_.substr(0, texto_.length - 1);
            this.setState({ texto: texto_ });
        }
    }, {
        key: "_borrar_todo",
        value: function _borrar_todo() {
            this.setState({ texto: "" });
        }
    }, {
        key: "cerrar",
        value: function cerrar() {
            this.setState({ texto: "" });
            document.getElementById("m").style.display = "none";
        }
    }, {
        key: "boton_num",
        value: function boton_num(titulo) {
            var _this6 = this;

            return React.createElement(
                "th",
                { style: { "background": "azure" } },
                React.createElement(
                    "label",
                    { className: "btn btn-info",
                        style: { "width": "95%", "height": "100%", "fontSize": "18px", "marginLeft": "2px", "marginTop": "2px" },
                        onClick: function () {
                            return _this6._boton(titulo);
                        } },
                    titulo
                )
            );
        }
    }]);

    return Modal_Entrada_cantidad;
})(React.Component);

var Moda_revicion_inventario_parcial = (function (_React$Component7) {
    _inherits(Moda_revicion_inventario_parcial, _React$Component7);

    function Moda_revicion_inventario_parcial(props) {
        _classCallCheck(this, Moda_revicion_inventario_parcial);

        _get(Object.getPrototypeOf(Moda_revicion_inventario_parcial.prototype), "constructor", this).call(this, props);
        this.producto = {
            codigo_producto: "",
            descripcion: "",
            existencia_piezas: "",
            real: "",
            fecha: "",
            ediciones: 0
        };
        this.posicion = -1;
        this.state = {
            lista: []
        };
    }

    _createClass(Moda_revicion_inventario_parcial, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal_generica", id: "modal_invemtario_parcial" },
                React.createElement(
                    "div",
                    { className: "panel panel-default",
                        style: { "marginTop": "-30px" } },
                    React.createElement(
                        "div",
                        { className: "panel panel-heading",
                            style: { "color": "azure", "background": "rgba(45, 137, 237, 0.97)" } },
                        React.createElement("span", { className: "glyphicon glyphicon-remove-circle close", onClick: this.cerrar.bind(this) }),
                        React.createElement(
                            "span",
                            { className: "fa fa-cubes" },
                            " "
                        ),
                        React.createElement(
                            "label",
                            { style: { "marginLeft": "5px" } },
                            " INVENTARIOS PARCIALES"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "panel-body", style: { "height": "83%" } },
                        React.createElement(Filtro_producto_folio, { establecimiento: this.props.establecimiento,
                            obtener_producto: this.on_obtener_producto.bind(this) }),
                        React.createElement(
                            "div",
                            { className: "panel panel-default", style: { "height": "455px", "overflow-x": "auto", "overflow-y": "scroll" } },
                            React.createElement(
                                "table",
                                { className: "table table-striped" },
                                React.createElement(
                                    "thead",
                                    { className: "panel panel-info" },
                                    React.createElement(
                                        "tr",
                                        { className: "info" },
                                        React.createElement(
                                            "th",
                                            { style: { "width": "80px", "textAlign": "center" } },
                                            "CODIGO"
                                        ),
                                        React.createElement(
                                            "th",
                                            { style: { "textAlign": "center" } },
                                            "DESCRIPCION"
                                        ),
                                        React.createElement(
                                            "th",
                                            { style: { "width": "80px", "textAlign": "center" },
                                                colspan: "3" },
                                            "EXIST. FISICA"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    this.datos_tabla()
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "i",
                        { className: "btn btn-success btn-block glyphicon glyphicon-save",
                            onClick: this.finalizar_inventario.bind(this) },
                        React.createElement(
                            "label",
                            { style: { "marginLeft": "10px" } },
                            "FINALIZAR REVISIÓN INVENTARIO"
                        )
                    ),
                    React.createElement(Modal_Entrada_cantidad, { seleccion: this.agregar_producto_a_lista.bind(this) })
                )
            );
        }

        /**eventos**/
    }, {
        key: "on_obtener_producto",
        value: function on_obtener_producto(producto) {
            console.log(producto);
            var posicion = -1;
            var inventario = this.props.inventario;
            var producto_r = inventario.filter(function (e) {
                return e.codigo_producto == producto.codigo_producto;
            });
            var producto_p = this.state.lista.filter(function (e, p) {
                posicion = p;
                return e.codigo_producto == producto.codigo_producto;
            });
            this.producto = producto;
            if (producto_r.length > 0 && posicion == -1) {
                console.log("Si Esta:", producto);
                document.getElementById("m").style.display = "flex";
            } else if (producto_p.length > 0) {
                if (confirm("EL PRODUCTO : " + producto.descripcion + "\n SE ENCUENTRA EN REVICION\n ¿MODIFICAR?")) {
                    console.log("No Existente MODIFICAR :", producto);
                    this.on_editar_producto(posicion);
                }
            } else if (confirm("EL PRODUCTO : " + producto.descripcion + "\n NO EXISTE EN LA SELECCION\n ¿AGREGAR?")) {
                console.log("No Existente :", producto);
                document.getElementById("m").style.display = "flex";
            }
        }
    }, {
        key: "on_editar_producto",
        value: function on_editar_producto(posicion) {
            this.posicion = posicion;
            document.getElementById("m").style.display = "flex";
        }
    }, {
        key: "on_eliminar_producto",
        value: function on_eliminar_producto(posicion) {
            var lista_ = this.state.lista;
            lista_.splice(posicion, 1);
            this.setState({ lista: lista_ });
        }
    }, {
        key: "finalizar_inventario",
        value: function finalizar_inventario() {
            var _this7 = this;

            //Obtengo los productos en lista de inventario y asigno los resultados
            var inventario = this.props.inventario.map(function (producto) {
                var producto_inventario = _this7.state.lista.findIndex(function (e) {
                    return e.codigo_producto == producto.codigo_producto;
                });
                producto.real = producto_inventario > -1 ? _this7.state.lista[producto_inventario].real : producto.real;
                producto.establecimiento = _this7.props.folio_establecimiento;
                return producto;
            });
            //recorro los capturados para agregar los que no esten en lista
            this.state.lista.forEach(function (producto) {
                var producto_inventario = _this7.props.inventario.findIndex(function (e) {
                    return e.codigo_producto == producto.codigo_producto;
                });
                if (producto_inventario == -1) {
                    producto.establecimiento = _this7.props.folio_establecimiento;
                    inventario.push(producto);
                }
            });

            console.log("Lista:", this.state.lista);
            console.log("Inventario:", this.props.inventario);
            console.log("Lista Inventario:", inventario);

            this.guardado_inventario(inventario);
        }
    }, {
        key: "cerrar",
        value: function cerrar() {
            if (confirm("Al Cerrar Se Perderan Los Cambios!!!\n¿Cerrar?")) {
                this.setState({ lista: [] });
                document.getElementById("modal_invemtario_parcial").style.display = "none";
            }
        }

        /**metodos**/
    }, {
        key: "agregar_producto_a_lista",
        value: function agregar_producto_a_lista(cantidad) {
            var _this8 = this;

            var lista_ = this.state.lista;
            var comprobar = lista_.filter(function (e) {
                return e.codigo_producto == _this8.producto.codigo_producto;
            });
            if (comprobar.length == 0) {
                this.producto.real = cantidad;
                lista_.push(this.producto);
            } else if (this.posicion > -1) {
                var producto_ = lista_[this.posicion];
                producto_.real = cantidad;
                producto_.ediciones += 1;
                lista_[this.posicion] = producto_;
                this.posicion = -1;
            }
            this.setState({ lista: lista_ });
            document.getElementById("m").style.display = "none";
        }

        /**conexiones**/
    }, {
        key: "guardado_inventario",
        value: function guardado_inventario(inventario_) {
            var _this9 = this;

            conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/guardar_inventario_parcial", {
                responsable: ID_SCOI,
                inventario: inventario_
            }, function (respuesta) {
                var r = respuesta.d;
                console.log(r);
                if (r > 0) {
                    document.getElementById("modal_invemtario_parcial").style.display = "none";
                    alert("SE GUARDARON " + r + " REGISTROS.");
                    _this9.setState({ lista: [] });
                }
            });
        }

        /**conponentes**/
    }, {
        key: "datos_tabla",
        value: function datos_tabla() {
            var _this10 = this;

            console.log(this.state.lista);
            return this.state.lista.map(function (elemento, posicion) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { style: { "width": "80px", "textAlign": "center" } },
                        elemento.codigo_producto
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.descripcion
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "80px", "textAlign": "center" } },
                        React.createElement(
                            "label",
                            { className: "form-control",
                                style: { "textAlign": "right" } },
                            elemento.real
                        )
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "30px", "textAlign": "center", "fontSize": "20px" } },
                        React.createElement("span", { className: "btn btn-primary glyphicon glyphicon-edit",
                            onClick: function () {
                                return _this10.on_editar_producto(posicion);
                            } })
                    ),
                    React.createElement(
                        "th",
                        { style: { "width": "30px", "textAlign": "center", "fontSize": "20px" } },
                        React.createElement("span", { className: "btn btn-danger fa fa-trash-o",
                            onClick: function () {
                                return _this10.on_eliminar_producto(posicion);
                            } })
                    )
                );
            });
        }
    }]);

    return Moda_revicion_inventario_parcial;
})(React.Component);

var App = (function (_React$Component8) {
    _inherits(App, _React$Component8);

    function App(props) {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), "constructor", this).call(this, props);
        this.lista_establecimientos = [];
        this.lista_clasificadores = [];
        this.lista_productos = [];

        this.resultados_filtro = {
            producto: "0",
            clase: "0",
            categoria: "0",
            familia: "0",
            linea: "0",
            talla: "0"
        };
        this.state = {
            folio_establecimiento: -1,
            establecimiento: "",
            codigo_producto: "",
            descripcion: '',
            existencia: -1,
            captura: 0,
            fecha: '',
            modificacion: 0,
            condicion: "'0','0','0','0','0','0'",
            tipo_filtro: "",
            limitador_filtro: ""
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
                    React.createElement(Cabecera, { establecimientos: this.lista_establecimientos,
                        on_establecimiento: this.on_cambio_estableciomiento.bind(this),
                        revisar: this.obtener_productos.bind(this),
                        estado: this.state }),
                    React.createElement(Filtro_producto_folio, { establecimiento: this.state.establecimiento,
                        obtener_producto: this.obtener_producto.bind(this) })
                ),
                React.createElement(Clasificado_Filtro_Productos, { tipo_filtro: this.filtro.bind(this),
                    resultados_filtro: this.resultados_filtro,
                    deshacer: this.on_deshacer.bind(this),
                    buscar: this.buscar.bind(this) }),
                React.createElement(Modal_clasificadores_productos, { clasificadores: this.lista_clasificadores,
                    limitador_filtro: this.state.limitador_filtro,
                    seleccion_clasificador: this.seleccion_clasificador.bind(this) }),
                React.createElement(Moda_revicion_inventario_parcial, { establecimiento: this.state.establecimiento,
                    folio_establecimiento: this.state.folio_establecimiento,
                    inventario: this.lista_productos })
            );
        }

        /**eventos**/
    }, {
        key: "on_cambio_estableciomiento",
        value: function on_cambio_estableciomiento(e) {
            var est = '';
            var folio = e.target.value;
            console.log(folio);
            if (folio > 0) {
                est = this.lista_establecimientos.filter(function (e) {
                    return e.folio == folio;
                })[0].nombre;
                console.log(est);
            }
            this.setState({
                folio_establecimiento: folio,
                establecimiento: est,
                codigo_producto: "",
                descripcion: '',
                existencia: -1,
                captura: 0,
                fecha: '',
                modificacion: 0,
                condicion: "'" + est + "','0','0','0','0','0','0'",
                tipo_filtro: "",
                limitador_filtro: ""
            });
        }
    }, {
        key: "on_deshacer",
        value: function on_deshacer() {
            this.resultados_filtro = {
                producto: "0",
                clase: "0",
                categoria: "0",
                familia: "0",
                linea: "0",
                talla: "0"
            };
            this.setState({
                tipo_filtro: "",
                limitador_filtro: "",
                codigo_producto: "",
                descripcion: ''
            });
        }

        /**metodos**/
    }, {
        key: "filtro",
        value: function filtro(tipo, evento) {
            console.log("Tipo:" + tipo + "\nlimitador:" + evento.target.value);
            this.setState({
                tipo_filtro: tipo,
                limitador_filtro: evento.target.value
            });
        }
    }, {
        key: "seleccion_clasificador",
        value: function seleccion_clasificador(seleccion) {

            this.resultados_filtro = {
                producto: "0",
                clase: "0",
                categoria: "0",
                familia: "0",
                linea: "0",
                talla: "0"
            };
            if (this.state.limitador_filtro == "in") {
                seleccion = this.state.limitador_filtro + " (" + seleccion + ")";
            } else {
                seleccion = this.state.limitador_filtro + " " + seleccion;
            }
            console.log(this.state.tipo_filtro);
            switch (this.state.tipo_filtro) {
                case "producto":
                    this.resultados_filtro.producto = seleccion;
                    break;
                case "clase_producto":
                    this.resultados_filtro.clase = seleccion;
                    break;
                case "familia":
                    this.resultados_filtro.familia = seleccion;
                    break;
                case "linea_producto":
                    this.resultados_filtro.linea = seleccion;
                    break;
                case "talla":
                    this.resultados_filtro.talla = seleccion;
                    break;
                case "Categoria":
                    this.resultados_filtro.categoria = seleccion;
                    break;
            }
            console.info(this.resultados_filtro);
            var consulta = "'" + this.state.establecimiento + "','" + this.resultados_filtro.producto + "','" + this.resultados_filtro.clase + "','" + this.resultados_filtro.categoria + "','" + this.resultados_filtro.familia + "','" + this.resultados_filtro.linea + "','" + this.resultados_filtro.talla + "'";
            console.log(consulta);
            this.setState({ condicion: consulta });
        }
    }, {
        key: "obtener_producto",
        value: function obtener_producto(producto) {
            console.log("Obtenido:", producto);
            this.resultados_filtro = {
                producto: "0",
                clase: "0",
                categoria: "0",
                familia: "0",
                linea: "0",
                talla: "0"
            };
            this.resultados_filtro.producto = "=(''" + producto.codigo_producto + "'')";

            var consulta = "'" + this.state.establecimiento + "','=(''" + producto.codigo_producto + "'')','0','0','0','0','0'  ";

            this.setState({ limitador_filtro: "=", tipo_filtro: "producto", condicion: consulta });
            document.getElementById("dialog").style.display = "";
        }
    }, {
        key: "buscar",
        value: function buscar(categoria, limitador) {
            console.log("padre Buscar");
            var tabla = "";
            switch (categoria) {
                case "producto":
                    tabla = "productos";
                    break;
                case "clase_producto":
                    tabla = "clases_productos";
                    break;
                case "familia":
                    tabla = "familias";
                    break;
                case "linea_producto":
                    tabla = "lineas_productos";
                    break;
                case "talla":
                    tabla = "tallas";
                    break;
                case "Categoria":
                    tabla = "Categorias";
                    break;
            }

            if (this.state.establecimiento != "") if (limitador != "") {
                console.log("columna=" + categoria + "\ncondicion=" + limitador + "\nTabla=" + tabla);
                if (categoria == "producto") this.obtener_productos_clasificadores();else this.obtener_clasificadores(tabla, categoria);

                this.setState({
                    tipo_filtro: categoria,
                    limitador_filtro: limitador
                });
            } else alert('EL LIMITADOR DEL FILTRO PARA \'' + categoria + '\' ES:\n \"TODOS\".');else alert("SELECCIONE ESTABLECIMIENTO!!!");
        }

        /**conexiones**/
    }, {
        key: "obtener_establecimientos",
        value: function obtener_establecimientos() {
            var _this11 = this;

            conexion_api_from_body("servicios/matriz/conexiones.asmx/obtener_establecimientos", {}, function (establecimientos) {
                console.log("Establecimientos:", establecimientos.d);
                _this11.lista_establecimientos = establecimientos.d;
                _this11.setState({ folio_establecimiento: -1 });
            });
        }
    }, {
        key: "obtener_productos_clasificadores",
        value: function obtener_productos_clasificadores() {
            var _this12 = this;

            console.log("POR PRODUCTO");
            conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos_clasificador", {
                est: this.state.establecimiento
            }, function (resp) {
                _this12.lista_clasificadores = resp.d;
                document.getElementById("mod_productos").style.display = "flex";
                _this12.setState({});
            });
        }
    }, {
        key: "obtener_clasificadores",
        value: function obtener_clasificadores(_tabla, _columna) {
            var _this13 = this;

            conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_clasificadores", {
                tabla: _tabla,
                columna: _columna,
                condicion: ""
            }, function (resp) {
                _this13.lista_clasificadores = resp.d;
                console.log(">Clasificadores:", _this13.lista_clasificadores);
                document.getElementById("mod_productos").style.display = "flex";
                _this13.setState({});
            });
        }
    }, {
        key: "obtener_productos",
        value: function obtener_productos() {
            var _this14 = this;

            if (this.state.establecimiento != "") {
                conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos", {
                    condicion: this.state.condicion
                }, function (productos) {
                    console.log("Productos:", productos.d);
                    _this14.lista_productos = productos.d;
                    _this14.setState({ codigo_producto: "" });
                    document.getElementById("modal_invemtario_parcial").style.display = "flex";
                });
            } else alert("SELECCIONE ESTABLECIMIENTO!!!");
        }
    }]);

    return App;
})(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));

