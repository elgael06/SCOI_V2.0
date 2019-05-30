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
                    { style: { "width": "300px", display: "inline-block", "marginTop": "10px" },
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
                        "  Iniciar"
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
                    id: this.props.nombre_comp || " ",
                    className: "form-control",
                    onChange: this.on_productos.bind(this),
                    placeholder: "codigo",
                    value: this.state.codigo_producto }),
                React.createElement("button", { className: "fa fa-search btn btn-default",
                    type: "submit",
                    style: { "marginLeft": "5px", "display": "inline-block" },
                    onClick: this.buscar_producto.bind(this),
                    style: { "fontSize": "15px", "borderRadius": "20px", "marginLeft": "3px", "display": "inline-block" } }),
                React.createElement("input", { className: "form-control", style: { "marginLeft": "5px", "width": "60%", "display": "inline-block" },
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
                    //console.log("Codigo A enviar:", this.state.codigo_producto);
                    this.obtener_producto_folio();
                } else {
                    alert("Falta Seleccionar Establecimiento!!!");
                }
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
                //console.log("Productos:", productos.d);
                if (productos.d.length > 0) {
                    var p = productos.d[0];
                    _this2.setState(p);
                    _this2.on_seleccionar(p);
                    document.getElementById("dialog").style.display = "none";
                } else {
                    _this2.setState({
                        codigo_producto: "",
                        descripcion: "",
                        establecimiento: "",
                        existencia_piezas: "",
                        fecha: ""
                    });
                    alert("No Encontrado!!!");
                }
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
            this.props.buscar(categoria, filtro);
        }
    }, {
        key: "borrar",
        value: function borrar() {
            //console.log("Borrar...");
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
            //console.log(seleccion);
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
            //console.log(event.target.value);
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
                //console.log(lista);
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
                    { style: { "width": "90px" } },
                    React.createElement(
                        "label",
                        null,
                        this.props.titulo
                    )
                ),
                React.createElement(
                    "td",
                    { style: { "width": "110px" } },
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
                    React.createElement("input", { type: "text", disabled: true,
                        value: this.props.resultado != "0" ? this.props.resultado : "",
                        className: "form-control" })
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
            texto: "0",
            signo: '+',
            lista: []
        };
    }

    _createClass(Modal_Entrada_cantidad, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "div",
                { className: "modal_generica", id: "m", style: { "display": "none", "position": "fixed" } },
                React.createElement(
                    "div",
                    { className: "panel panel-default",
                        style: { "position": "fixed", "width": "80%", "height": "450px", "maxWidth": "550px" } },
                    React.createElement(
                        "div",
                        { className: "panel-heading ", style: { "background": "#77d6f5", "color": "azure" } },
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
                            { className: "panel-info" },
                            React.createElement(
                                "strong",
                                { style: { "marginLeft": "10px", "borderBottom": "solid 1px black", "color": "black" } },
                                this.props.producto.codigo_producto
                            ),
                            React.createElement(
                                "label",
                                { style: { "marginLeft": "10px", "color": "black" } },
                                this.props.producto.descripcion
                            ),
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "div",
                                    { className: "form-group", style: { "width": "30%", "display": "inline-block" } },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Suma:"
                                    ),
                                    React.createElement(
                                        "label",
                                        { className: "form-control",
                                            style: { "textAlign": "right", "fontSize": "20px" } },
                                        this.suma_lista()
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group", style: { "width": "30%", "display": "inline-block" } },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Fisico:"
                                    ),
                                    React.createElement(
                                        "label",
                                        { className: "form-control",
                                            style: { "textAlign": "right", "fontSize": "20px" } },
                                        this.props.producto.real
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group", style: { "width": "40%", "display": "inline-block" } },
                                    React.createElement(
                                        "label",
                                        null,
                                        "Total:"
                                    ),
                                    React.createElement(
                                        "label",
                                        { className: "form-control", id: "vista_texto_total",
                                            style: { "textAlign": "right", "fontSize": "20px" } },
                                        this.state.signo + ' ' + this.state.texto || '0'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "panel-success",
                                style: { " justify-content": "center", "display": "flex" } },
                            React.createElement(
                                "div",
                                { className: "panel panel-info", style: { "width": "30%", "height": "295px", "overflowX": "auto", "overflowY": "auto" } },
                                this.vista_lista()
                            ),
                            React.createElement(
                                "table",
                                { className: "table",
                                    style: { "align-items": "center", "marginLeft": "0px", "background": "azure", "width": "70%" } },
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        { style: { "background": "azure" } },
                                        React.createElement(
                                            "label",
                                            { className: "btn glyphicon glyphicon-circle-arrow-left",
                                                style: { "width": "95%", "height": "50px", "fontSize": "22px", "color": "orange", "marginLeft": "2px", "marginTop": "2px" },
                                                onClick: this._borrar.bind(this) },
                                            " "
                                        )
                                    ),
                                    React.createElement(
                                        "th",
                                        { style: { "background": "azure" } },
                                        React.createElement(
                                            "label",
                                            { className: "btn glyphicon glyphicon-minus",
                                                style: { "width": "95%", "height": "50px", "fontSize": "22px", "color": "green", "marginLeft": "2px", "marginTop": "2px" },
                                                onClick: function () {
                                                    return _this6._signo("-");
                                                } },
                                            " "
                                        )
                                    ),
                                    React.createElement(
                                        "th",
                                        { style: { "background": "azure" } },
                                        React.createElement(
                                            "label",
                                            { className: "btn glyphicon glyphicon-plus",
                                                style: { "width": "95%", "height": "50px", "fontSize": "22px", "color": "blue", "marginLeft": "2px", "marginTop": "2px" },
                                                onClick: function () {
                                                    return _this6._signo("+");
                                                } },
                                            " "
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tr",
                                    { style: { "textAlign": "center" } },
                                    this.boton_num(7),
                                    this.boton_num(8),
                                    this.boton_num(9)
                                ),
                                React.createElement(
                                    "tr",
                                    { style: { "textAlign": "center" } },
                                    this.boton_num(4),
                                    this.boton_num(5),
                                    this.boton_num(6)
                                ),
                                React.createElement(
                                    "tr",
                                    { style: { "textAlign": "center" } },
                                    this.boton_num(1),
                                    this.boton_num(2),
                                    this.boton_num(3)
                                ),
                                React.createElement(
                                    "tr",
                                    null,
                                    this.boton_num(0),
                                    this.boton_num("."),
                                    React.createElement(
                                        "th",
                                        { style: { "background": "azure" } },
                                        React.createElement(
                                            "label",
                                            { className: "btn btn-primary glyphicon glyphicon-share",
                                                style: { "width": "95%", "height": "50px", "fontSize": "22px", "marginLeft": "2px", "marginTop": "2px" },
                                                onClick: this._agregar_lista.bind(this) },
                                            " "
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "span",
                            { className: "btn btn-success btn-block glyphicon glyphicon-download-alt",
                                onClick: this._salvar.bind(this) },
                            React.createElement(
                                "label",
                                { style: { "marginLeft": "5px" } },
                                "Listo"
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "_boton",
        value: function _boton(valor) {
            var texto_ = this.state.texto.toString(); //this.props.producto.real.toString();

            var comprovar_punto = texto_.split(".");

            if (texto_ == 0) texto_ = "";

            if (texto_ + valor <= 100000 && texto_.length < 9) {
                if (valor > 0 && valor < 10) texto_ += valor; //numero
                else if (texto_.length > 0 && valor == 0) texto_ += valor; //cero
                    else if (comprovar_punto.length == 1) {
                            texto_ = texto_.length > 0 ? texto_ += valor : "0" + valor; //punto
                        }
                if (this.state.texto == "") {
                    this.setState({ texto: this.props.producto.real });
                }
                //this.props.producto.real = texto_;
                this.setState({ texto: texto_ });
            } else {
                document.getElementById("vista_texto_total").style.border = 'solid 3px red';
                setTimeout(function () {
                    return document.getElementById("vista_texto_total").style.border = "";
                }, 1000);
            }
        }
    }, {
        key: "_agregar_lista",
        value: function _agregar_lista() {
            var lista_ = this.state.lista;
            var t = this.state.texto;
            var r = this.state.signo == "-" ? '-' + t : t;
            lista_.push(parseFloat(r));
            this.setState({ lista: lista_, texto: '0', signo: '+' });
        }
    }, {
        key: "_signo",
        value: function _signo(signo_) {
            this.setState({ signo: signo_ });
        }
    }, {
        key: "_salvar",
        value: function _salvar() {
            var suma = this.props.producto.real;

            this.state.lista.forEach(function (dato) {
                return suma += dato;
            });
            suma += parseInt(this.state.texto);

            if (suma >= 0) {
                this.props.seleccion(suma);
                this.setState({
                    texto: "0",
                    signo: '+',
                    lista: []
                });
                document.getElementById("codigo_barra").select();
            }
        }
    }, {
        key: "_borrar",
        value: function _borrar() {
            var texto_ = this.state.texto.toString();
            texto_ = texto_.length > 1 ? texto_.toString().substr(0, texto_.length - 1) : 0;

            this.setState({ texto: texto_ });
        }
    }, {
        key: "cerrar",
        value: function cerrar() {
            this.setState({
                texto: "0",
                signo: '+',
                lista: []
            });
            document.getElementById("m").style.display = "none";
            document.getElementById("codigo_barra").select();
        }
    }, {
        key: "_eliminar_lista",
        value: function _eliminar_lista(posicion) {
            var lista_ = this.state.lista;

            lista_.splice(posicion, 1);
            if (confirm("Eliminar...")) this.setState({ lista: lista_ });
        }
    }, {
        key: "boton_num",
        value: function boton_num(titulo) {
            var _this7 = this;

            return React.createElement(
                "th",
                { style: { "background": "azure" } },
                React.createElement(
                    "label",
                    { className: "btn btn-info",
                        style: { "width": "95%", "height": "50px", "fontSize": "22px", "marginLeft": "2px", "marginTop": "2px" },
                        onClick: function () {
                            return _this7._boton(titulo);
                        } },
                    titulo
                )
            );
        }
    }, {
        key: "boton_accion",
        value: function boton_accion(titulo) {
            var _this8 = this;

            return React.createElement(
                "th",
                { style: { "background": "azure" } },
                React.createElement("label", { className: "btn btn-info",
                    style: { "width": "95%", "height": "50px", "fontSize": "22px", "marginLeft": "2px", "marginTop": "2px" },
                    onClick: function () {
                        return _this8._boton(titulo);
                    } })
            );
        }

        /*metodos*/
    }, {
        key: "suma_lista",
        value: function suma_lista() {
            var suma = this.props.producto.real;

            this.state.lista.forEach(function (dato) {
                return suma += dato;
            });
            return suma;
        }
    }, {
        key: "vista_lista",
        value: function vista_lista() {
            var _this9 = this;

            return this.state.lista.map(function (e, p) {
                return React.createElement(
                    "table",
                    { className: "table" },
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { style: { "textAlign": "center" } },
                            p + 1
                        ),
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "label",
                                { className: "form-control", style: { "textAlign": "right" } },
                                e,
                                " PZ"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("i", { className: "glyphicon glyphicon-remove",
                                onClick: function () {
                                    return _this9._eliminar_lista(p);
                                },
                                style: { "marginLeft": "5px" } })
                        )
                    )
                );
            });
        }
    }]);

    return Modal_Entrada_cantidad;
})(React.Component);

var Modal_vista_prductos_existencia = (function (_React$Component7) {
    _inherits(Modal_vista_prductos_existencia, _React$Component7);

    function Modal_vista_prductos_existencia(props) {
        _classCallCheck(this, Modal_vista_prductos_existencia);

        _get(Object.getPrototypeOf(Modal_vista_prductos_existencia.prototype), "constructor", this).call(this, props);
        this.state = {
            filtro: '',
            producto: {
                codigo_producto: "",
                descripcion: "",
                existencia_piezas: "",
                real: 0,
                fecha: "",
                ediciones: 0
            }
        };
    }

    _createClass(Modal_vista_prductos_existencia, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal_generica", id: this.props.modal, style: { "display": "none" } },
                React.createElement(
                    "div",
                    { className: "panel panel-group", style: { "maxWidth": "600px", "width": "90%" } },
                    React.createElement(
                        "div",
                        { className: "panel-heading", style: { "background": "#6db65d", "color": "azure" } },
                        React.createElement("span", { className: "glyphicon glyphicon-remove-circle red close", onClick: this.cerrar.bind(this) }),
                        React.createElement(
                            "label",
                            null,
                            this.props.lista.length
                        ),
                        React.createElement(
                            "label",
                            { style: { "marginLeft": "5px" } },
                            this.props.titulo
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "panel panel-body", style: { "height": "600px" } },
                        React.createElement(
                            "div",
                            { className: "panel panel-info" },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement(
                                    "label",
                                    { "for": "text", className: "" },
                                    "Descripcion :"
                                ),
                                React.createElement("input", { value: this.state.producto.descripcion,
                                    disabled: true, className: "form-control",
                                    placeholder: "Descriocion Producto..." })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement("input", { value: this.state.filtro,
                                className: "form-control",
                                onChange: this.on_filtrar.bind(this),
                                placeholder: "Filtro Producto..." })
                        ),
                        React.createElement(
                            "div",
                            { className: "panel panel-success", style: { "height": "70%", "overflowX": "auto", "overflowY": "auto" } },
                            React.createElement(
                                "table",
                                { className: "table" },
                                React.createElement(
                                    "thead",
                                    null,
                                    React.createElement(
                                        "tr",
                                        { className: "success" },
                                        React.createElement(
                                            "th",
                                            null,
                                            "Folio"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Descripcion"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Existencia"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "HH/MM/SS"
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
                        React.createElement(
                            "span",
                            { className: "btn btn-success glyphicon glyphicon-ok btn-block",
                                onClick: this.on_seleccion.bind(this) },
                            React.createElement(
                                "label",
                                { style: { "marginLeft": "5px" } },
                                " Seleccionar"
                            )
                        )
                    )
                )
            );
        }

        /*Eventos */
    }, {
        key: "on_filtrar",
        value: function on_filtrar(e) {
            this.setState({ filtro: e.target.value });
        }
    }, {
        key: "on_seleccion",
        value: function on_seleccion() {
            if (this.state.producto.codigo_producto > 0) {
                this.props.seleccion(this.state.producto);
                this.setState({
                    filtro: '',
                    producto: {
                        codigo_producto: "",
                        descripcion: "",
                        existencia_piezas: "",
                        real: 0,
                        fecha: "",
                        ediciones: 0
                    }
                });
                document.getElementById(this.props.modal).style.display = 'none';
            } else alert("Seleccione Producto!!!");
        }
    }, {
        key: "seleccion_tabla",
        value: function seleccion_tabla(producto_) {
            this.setState({ producto: producto_ });
        }
    }, {
        key: "cerrar",
        value: function cerrar() {
            document.getElementById(this.props.modal).style.display = 'none';
        }

        /**componentes**/
    }, {
        key: "datos_tabla",
        value: function datos_tabla() {
            var _this10 = this;

            var filtro_ = this.state.filtro.toString().toUpperCase();
            var lista = this.props.lista.filter(function (elemento) {
                return elemento.descripcion.toUpperCase().search(filtro_) > -1 || elemento.codigo_producto.toString().search(filtro_) > -1;
            });
            var hora_fecha = function hora_fecha(e) {
                e = e.split(" ");
                return e[1];
            };
            var seleccion = function seleccion(folio) {
                return folio == _this10.state.producto.codigo_producto ? { 'background': '#a8faae' } : { 'background': '' };
            };
            lista = lista.filter(function (e, p) {
                return p < 300;
            });
            //console.log("Datos Tabla:",lista);
            return lista.map(function (producto) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this10.seleccion_tabla(producto);
                        },
                        style: seleccion(producto.codigo_producto) },
                    React.createElement(
                        "td",
                        null,
                        producto.codigo_producto
                    ),
                    React.createElement(
                        "td",
                        null,
                        producto.descripcion
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "label",
                            { className: "form-control", style: { "textAlign": "right", "width": "70px" } },
                            producto.real
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "label",
                            null,
                            hora_fecha(producto.fecha)
                        )
                    )
                );
            });
        }
    }]);

    return Modal_vista_prductos_existencia;
})(React.Component);

var Tabla_revicion_inventario_parcial = (function (_React$Component8) {
    _inherits(Tabla_revicion_inventario_parcial, _React$Component8);

    function Tabla_revicion_inventario_parcial() {
        _classCallCheck(this, Tabla_revicion_inventario_parcial);

        _get(Object.getPrototypeOf(Tabla_revicion_inventario_parcial.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Tabla_revicion_inventario_parcial, [{
        key: "render",
        value: function render() {
            return React.createElement(
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
            );
        }

        /**conponentes**/
    }, {
        key: "datos_tabla",
        value: function datos_tabla() {
            var _this11 = this;

            //console.log(this.props.estado.lista);
            return this.props.estado.lista.map(function (elemento, posicion) {
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
                                return _this11.props.on_editar_producto(elemento, posicion);
                            } })
                    ),
                    React.createElement(
                        "th",
                        { style: { "width": "30px", "textAlign": "center", "fontSize": "20px" } },
                        React.createElement("span", { className: "btn btn-danger fa fa-trash-o",
                            onClick: function () {
                                return _this11.props.on_eliminar_producto(posicion);
                            } })
                    )
                );
            });
        }
    }]);

    return Tabla_revicion_inventario_parcial;
})(React.Component);

var Boton_cavecera_modal_inventarios = function Boton_cavecera_modal_inventarios(props) {
    return React.createElement(
        "i",
        { className: "btn btn-" + props.boton + " btn-sm glyphicon " + props.icono,
            onClick: props.on_ },
        React.createElement(
            "label",
            { style: { "marginLeft": "5px" } },
            props.titulo
        )
    );
};

var Moda_revicion_inventario_parcial = (function (_React$Component9) {
    _inherits(Moda_revicion_inventario_parcial, _React$Component9);

    function Moda_revicion_inventario_parcial(props) {
        _classCallCheck(this, Moda_revicion_inventario_parcial);

        _get(Object.getPrototypeOf(Moda_revicion_inventario_parcial.prototype), "constructor", this).call(this, props);
        this.producto = {
            codigo_producto: "",
            descripcion: "",
            existencia_piezas: "",
            real: 0,
            fecha: "",
            ediciones: 0
        };
        this.lista_pendientes = [];
        this.posicion = -1;
        this.state = {
            lista: []
        };
    }

    _createClass(Moda_revicion_inventario_parcial, [{
        key: "render",
        value: function render() {
            var _this12 = this;

            return React.createElement(
                "div",
                { className: "modal_generica", id: "modal_invemtario_parcial" },
                React.createElement(
                    "div",
                    { className: "panel panel-default",
                        style: { "marginTop": "5px", "height": "98%", "width": "98%", "maxWidth": "900px" } },
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
                        { className: "panel-body", style: { "height": "87%", "marginTop": "-30px" } },
                        React.createElement(Filtro_producto_folio, { establecimiento: this.props.establecimiento,
                            nombre_comp: "codigo_barra",
                            obtener_producto: this.on_obtener_producto.bind(this) }),
                        React.createElement(
                            "div",
                            { className: "btn-group" },
                            React.createElement(Boton_cavecera_modal_inventarios, {
                                on_: function () {
                                    return _this12.on_generar_pendientes();
                                },
                                boton: "success", icono: "glyphicon-flash",
                                titulo: "Pendiente." }),
                            React.createElement(Boton_cavecera_modal_inventarios, {
                                on_: function () {
                                    return _this12.on_revisados();
                                },
                                boton: "success", icono: "glyphicon-list-alt",
                                titulo: "capturado." }),
                            React.createElement(Boton_cavecera_modal_inventarios, {
                                on_: function () {
                                    return _this12.on_total();
                                },
                                boton: "success", icono: "glyphicon-asterisk",
                                titulo: "inventario." }),
                            React.createElement(Boton_cavecera_modal_inventarios, {
                                on_: function () {
                                    return _this12.imprimir();
                                },
                                boton: "success", icono: "glyphicon-print",
                                titulo: "Reporte." })
                        ),
                        React.createElement(
                            "div",
                            { className: "panel panel-info", style: { "height": "80%", "overflow-x": "auto", "overflow-y": "scroll" } },
                            React.createElement(Tabla_revicion_inventario_parcial, { estado: this.state,
                                on_editar_producto: this.on_editar_producto.bind(this),
                                on_eliminar_producto: this.on_eliminar_producto.bind(this) })
                        )
                    ),
                    React.createElement(
                        "i",
                        { className: "btn btn-info btn-block glyphicon glyphicon-save",
                            onClick: this.finalizar_inventario.bind(this) },
                        React.createElement(
                            "label",
                            { style: { "marginLeft": "10px" } },
                            "GUARDAR INVENTARIO."
                        )
                    ),
                    React.createElement(Modal_Entrada_cantidad, { producto: this.producto,
                        seleccion: this.agregar_producto_a_lista.bind(this) }),
                    React.createElement(Modal_vista_prductos_existencia, { modal: "modal_vista_pendientes",
                        titulo: "Productos Pendientes",
                        seleccion: this.on_obtener_producto.bind(this),
                        lista: this.lista_pendientes }),
                    React.createElement(Modal_vista_prductos_existencia, { modal: "modal_vista_total",
                        titulo: " Productos Inventario.",
                        seleccion: this.on_obtener_producto.bind(this),
                        lista: this.props.inventario }),
                    React.createElement(Modal_vista_prductos_existencia, { modal: "modal_vista_revisados",
                        titulo: " Productos Capturados.",
                        seleccion: this.on_obtener_producto.bind(this),
                        lista: this.state.lista })
                )
            );
        }
    }, {
        key: "imprimir",
        value: function imprimir() {
            var tabla = this.crear_tabla_imprimir();
            console.log(tabla);
            var reporte = window.open('', 'Imprimir', 'width=320');
            var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            var t = document.createElement("title");
            var titulo = document.createElement("h4");
            var fecha_ = document.createElement("strong");
            var establecimiento = document.createElement("label");
            var fecha = new Date();

            t.textContent = "Reporte De Inventario Parcial " + this.props.establecimiento + " " + fecha.getDate() + "/" + mes[fecha.getMonth()] + "/" + fecha.getFullYear();
            titulo.textContent = "Reporte De Inventario Parcial";
            fecha_.textContent = fecha.getDate() + "/" + mes[fecha.getMonth()] + "/" + fecha.getFullYear();
            establecimiento.textContent = this.props.establecimiento;

            establecimiento.style.marginLeft = '0';
            fecha_.style.marginLeft = '50px';

            reporte.document.head.append(t);
            reporte.document.body.append(titulo, establecimiento, fecha_, tabla);
            reporte.document.close();
            reporte.print();
            reporte.close();
        }
    }, {
        key: "crear_tabla_imprimir",
        value: function crear_tabla_imprimir() {
            var table = document.createElement("table");
            var cavecera = document.createElement("tr");
            var c_codigo = document.createElement("td");
            var c_descripcion = document.createElement("td");
            var c_cantidad = document.createElement("td");

            c_codigo.innerText = 'codigo';
            c_descripcion.innerText = 'Descripcion';
            c_cantidad.textContent = "Cantidad";

            cavecera.append(c_codigo, c_descripcion, c_cantidad);

            cavecera.style = "border-bottom:solid 2px black";

            table.append(cavecera);

            this.props.inventario.forEach(function (e, p) {
                var codigo = document.createElement("td");
                var descripcion = document.createElement("td");
                var cantidad = document.createElement("td");

                codigo.innerText = e.codigo_producto;
                descripcion.innerText = e.descripcion;
                cantidad.textContent = "|";

                cantidad.style = "border-bottom:solid 2px black;width:30px;color:azure";
                codigo.style.width = '30px';
                descripcion.style.width = '110px';
                cantidad.style.width = '70px';

                var hijo = document.createElement("tr");

                hijo.append(codigo, descripcion, cantidad);
                hijo.style = ' border-bottom:solid 1px blue ';
                table.append(hijo);
                table.style = ' border:solid 1px gray;width:210px;font-size:10px';
            });
            return table;
        }

        /**eventos**/
    }, {
        key: "on_obtener_producto",
        value: function on_obtener_producto(producto) {
            console.log(producto);
            var producto_inventario = this.props.inventario.findIndex(function (e) {
                return e.codigo_producto == producto.codigo_producto;
            });
            var producto_lista = this.state.lista.findIndex(function (e) {
                return e.codigo_producto == producto.codigo_producto;
            });

            this.producto = {
                codigo_producto: producto.codigo_producto,
                descripcion: producto.descripcion,
                existencia_piezas: producto.existencia_piezas,
                real: producto.real,
                fecha: producto.fecha,
                ediciones: producto.ediciones,
                costo_promedio: producto.costo_promedio,
                precio_venta: producto.precio_venta,
                ultimo_costo: producto.ultimo_costo
            };

            if (producto_inventario == -1) {
                if (confirm("EL PRODUCTO : " + producto.descripcion + "\n NO EXISTE EN LA SELECCION\n ¿AGREGAR?")) {
                    document.getElementById("m").style.display = "flex";
                    this.setState({});
                }
            } else {
                if (producto_lista == -1) {
                    document.getElementById("m").style.display = "flex";
                    this.setState({});
                } else if (producto_lista >= 0) {
                    if (confirm("EL PRODUCTO : " + producto.descripcion + "\n SE ENCUENTRA EN REVICION\n ¿MODIFICAR?\n" + producto.fecha)) {
                        this.producto.real = this.state.lista[producto_lista].real;
                        this.producto.fecha = producto.fecha;
                        this.on_editar_producto(this.producto, producto_lista);
                    }
                }
            }
        }
    }, {
        key: "on_editar_producto",
        value: function on_editar_producto(producto, posicion) {
            this.posicion = posicion;
            this.producto = {
                codigo_producto: producto.codigo_producto,
                descripcion: producto.descripcion,
                existencia_piezas: producto.existencia_piezas,
                real: producto.real,
                fecha: producto.fecha,
                ediciones: producto.ediciones,
                costo_promedio: producto.costo_promedio,
                precio_venta: producto.precio_venta,
                ultimo_costo: producto.ultimo_costo
            };
            this.setState({});

            document.getElementById("m").style.display = "flex";
        }
    }, {
        key: "on_eliminar_producto",
        value: function on_eliminar_producto(posicion) {
            var nombre = this.state.lista[posicion].descripcion;
            if (confirm("¿Eliminar? \n" + nombre)) {
                var lista_ = this.state.lista;
                lista_.splice(posicion, 1);
                this.setState({ lista: lista_ });
            }
        }
    }, {
        key: "agregar_producto_a_lista",
        value: function agregar_producto_a_lista(cantidad) {
            var _this13 = this;

            var lista_ = this.state.lista;
            var comprobar = lista_.findIndex(function (e) {
                return e.codigo_producto == _this13.producto.codigo_producto;
            });

            if (comprobar == -1) {
                this.producto.real = cantidad;
                lista_.push(this.producto);
            } else {
                lista_[comprobar].ediciones += 1;
                lista_[comprobar].real = cantidad;
                lista_[comprobar].fecha = this.producto.fecha;
                this.posicion = -1;
            }
            this.producto = {
                codigo_producto: "",
                descripcion: "",
                existencia_piezas: "",
                real: 0,
                fecha: "",
                ediciones: 0,
                costo_promedio: 0,
                precio_venta: 0,
                ultimo_costo: 0
            };
            this.setState({ lista: lista_ });
            document.getElementById("m").style.display = "none";
        }
    }, {
        key: "on_generar_pendientes",
        value: function on_generar_pendientes() {
            document.getElementById("dialog").style.display = 'block';
            this.generar_pendientes();
            //console.log(this.lista_pendientes);
            document.getElementById("dialog").style.display = 'none';
            document.getElementById("modal_vista_pendientes").style.display = 'flex';
        }
    }, {
        key: "on_total",
        value: function on_total() {
            document.getElementById("dialog").style.display = 'block';
            this.empatar_total_fisico();
            //console.log(this.props.inventario);
            document.getElementById("dialog").style.display = 'none';
            document.getElementById("modal_vista_total").style.display = 'flex';
        }
    }, {
        key: "on_revisados",
        value: function on_revisados() {
            document.getElementById("modal_vista_revisados").style.display = 'flex';
        }
    }, {
        key: "finalizar_inventario",
        value: function finalizar_inventario() {
            var _this14 = this;

            var fecha = new Date();
            var h = fecha.getHours() > 9 ? fecha.getHours() : "0" + fecha.getHours();
            var minuto = fecha.getMinutes() > 9 ? fecha.getMinutes() : "0" + fecha.getMinutes();
            var segundos = fecha.getSeconds() > 9 ? fecha.getSeconds() : "0" + fecha.getSeconds();

            var hora = h + ":" + minuto + ":" + segundos;

            //recorre los capturados para agregar los que no esten en lista
            this.generar_pendientes();

            if (this.lista_pendientes.length == 0) {
                //Obtengo los productos en lista de inventario y asigno los resultados
                var inventario = this.state.lista.map(function (producto) {
                    producto.establecimiento = _this14.props.establecimiento;
                    producto.fecha = producto.fecha + " - " + hora;
                    return producto;
                });
                this.guardado_inventario(inventario);
            } else {
                var texto = 'Productos Pendientes:\n' + this.lista_pendientes.length + ' pz';
                alert(texto);
            }
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
        key: "generar_pendientes",
        value: function generar_pendientes() {
            var _this15 = this;

            /*recorre los capturados para agregar los que no esten en lista*/
            this.lista_pendientes = [];
            //console.log("Generar Pendientes");
            this.props.inventario.forEach(function (producto) {
                var producto_inventario = _this15.state.lista.findIndex(function (e) {
                    return e.codigo_producto == producto.codigo_producto;
                });
                if (producto_inventario == -1) {
                    _this15.lista_pendientes.push(producto);
                }
            });
            this.setState({});
        }
    }, {
        key: "empatar_total_fisico",
        value: function empatar_total_fisico() {
            //Obtengo los productos en lista de inventario y asigno los resultados
            var lista = this.state.lista;
            //console.log("Empatar Total fisico");
            this.props.inventario.forEach(function (producto) {
                var posicion_lista = lista.findIndex(function (e) {
                    return e.codigo_producto == producto.codigo_producto;
                });
                if (posicion_lista > -1) {
                    producto.real = lista[posicion_lista].real;
                    producto.fecha = lista[posicion_lista].fecha;
                } else {
                    producto.real = 0;
                }
            });
            this.setState({});
        }

        /**conexiones**/
    }, {
        key: "guardado_inventario",
        value: function guardado_inventario(inventario_) {
            var listo = conexion_ajax("servicios/inventarios_parciales/conexiones.asmx/Guardar_inventario_grupo_izagar", {
                responsable: ID_SCOI,
                inventario: inventario_
            });
            //console.log(listo);
            if (listo > 0) {
                document.getElementById("modal_invemtario_parcial").style.display = "none";
                alert("SE GUARDARON " + listo + " REGISTROS.");
                this.setState({ lista: [] });
            } else alert(listo);
        }
    }]);

    return Moda_revicion_inventario_parcial;
})(React.Component);

var App = (function (_React$Component10) {
    _inherits(App, _React$Component10);

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
            //console.log(folio);
            if (folio > 0) {
                est = this.lista_establecimientos.filter(function (e) {
                    return e.folio == folio;
                })[0].nombre;
                //console.log(est);
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
            //console.log("Tipo:" + tipo + "\nlimitador:" + evento.target.value);
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
            //console.log(this.state.tipo_filtro)
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
            //console.info(this.resultados_filtro);
            var consulta = "'" + this.state.establecimiento + "','" + this.resultados_filtro.producto + "','" + this.resultados_filtro.clase + "','" + this.resultados_filtro.categoria + "','" + this.resultados_filtro.familia + "','" + this.resultados_filtro.linea + "','" + this.resultados_filtro.talla + "'";
            //console.log(consulta);
            this.setState({ condicion: consulta });
        }
    }, {
        key: "obtener_producto",
        value: function obtener_producto(producto) {
            //console.log("Obtenido:", producto);
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
            //console.log("padre Buscar");
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
                //console.log("columna=" + categoria + "\ncondicion=" + limitador + "\nTabla=" + tabla);
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
            var _this16 = this;

            conexion_api_from_body("servicios/matriz/conexiones.asmx/obtener_establecimientos", {}, function (establecimientos) {
                //console.log("Establecimientos:", establecimientos.d);
                _this16.lista_establecimientos = establecimientos.d;
                _this16.setState({ folio_establecimiento: -1 });
            });
        }
    }, {
        key: "obtener_productos_clasificadores",
        value: function obtener_productos_clasificadores() {
            var _this17 = this;

            //console.log("POR PRODUCTO");
            conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos_clasificador", {
                est: this.state.establecimiento
            }, function (resp) {
                _this17.lista_clasificadores = resp.d;
                document.getElementById("mod_productos").style.display = "flex";
                _this17.setState({});
            });
        }
    }, {
        key: "obtener_clasificadores",
        value: function obtener_clasificadores(_tabla, _columna) {
            var _this18 = this;

            conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_clasificadores", {
                tabla: _tabla,
                columna: _columna,
                condicion: ""
            }, function (resp) {
                _this18.lista_clasificadores = resp.d;
                //console.log(">Clasificadores:", this.lista_clasificadores);
                document.getElementById("mod_productos").style.display = "flex";
                _this18.setState({});
            });
        }
    }, {
        key: "obtener_productos",
        value: function obtener_productos() {
            var _this19 = this;

            if (this.state.establecimiento != "") {
                conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos", {
                    condicion: this.state.condicion
                }, function (productos) {
                    //console.log("Productos:", productos.d);
                    _this19.lista_productos = productos.d;
                    _this19.setState({ codigo_producto: "" });
                    document.getElementById("modal_invemtario_parcial").style.display = "flex";
                });
            } else alert("SELECCIONE ESTABLECIMIENTO!!!");
        }
    }]);

    return App;
})(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));

