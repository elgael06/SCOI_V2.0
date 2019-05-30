/********************************************
*                    PASO 1                 *
********************************************/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cargar_inventario = (function (_React$Component) {
    _inherits(Cargar_inventario, _React$Component);

    function Cargar_inventario(props) {
        _classCallCheck(this, Cargar_inventario);

        _get(Object.getPrototypeOf(Cargar_inventario.prototype), "constructor", this).call(this, props);
    }

    /********************************************
    *                   PASO 2                  *
    ********************************************/

    /**Render**/

    _createClass(Cargar_inventario, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "contenedor_carga_inventasrio", style: { "text-align": "center" } },
                React.createElement(
                    "section",
                    null,
                    React.createElement(
                        "h3",
                        null,
                        " Pre-orden de Compra de Verduras."
                    ),
                    " "
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", { type: "button", value: " Cargar Existencia.", className: "btn btn-info", onClick: this.Conexion_i.bind(this) })
                )
            );
        }

        /**Funciones**/
    }, {
        key: "Conexion_i",
        value: function Conexion_i() {
            var _this = this;

            var url = "/servicios/comercializacion/Pre_orden_compra.asmx/inventario_productos";
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (respuesta) {
                return respuesta.json();
            }).then(function (dato) {
                localStorage.setItem("inventario_parcial", JSON.stringify(dato.d));
                _this.conexion_p();
            })["catch"](function (error) {
                return console.log("Error :  " + error);
            });
        }
    }, {
        key: "conexion_p",
        value: function conexion_p() {
            var _this2 = this;

            var url = "/servicios/comercializacion/Pre_orden_compra.asmx/proveedores";

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (respuesta) {
                return respuesta.json();
            }).then(function (dato) {
                localStorage.setItem("proveedores_verdura", JSON.stringify(dato.d));
                _this2.llenar_precios();
                checar_datos();
            })["catch"](function (error) {
                return console.log("Error :  " + error);
            });
        }
    }, {
        key: "llenar_precios",
        value: function llenar_precios() {
            var productos = JSON.parse(localStorage.getItem("inventario_parcial"));
            var proveedores = JSON.parse(localStorage.getItem("proveedores_verdura"));
            var arreglo = [];
            proveedores.map(function (pv) {
                return productos.map(function (pd) {
                    arreglo.push({ "folio_proveedor": pv.folio_proveedor, "id_producto": pd.codigo, "precio": "0.00" });
                });
            });

            JSON.parse(localStorage.setItem("pre_orden_compra", JSON.stringify(arreglo)));
        }
    }]);

    return Cargar_inventario;
})(React.Component);

var Tabla_comparativa = (function (_React$Component2) {
    _inherits(Tabla_comparativa, _React$Component2);

    function Tabla_comparativa(props) {
        _classCallCheck(this, Tabla_comparativa);

        _get(Object.getPrototypeOf(Tabla_comparativa.prototype), "constructor", this).call(this, props);

        this.inventario = JSON.parse(localStorage.getItem("inventario_parcial"));
        this.proveedores = JSON.parse(localStorage.getItem("proveedores_verdura"));
        this.precios = JSON.parse(localStorage.getItem("pre_orden_compra"));
    }

    /**************************************************
                        PASO 2.1
    **************************************************/

    /**render**/

    _createClass(Tabla_comparativa, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Btn_cotizar, { datos: this.inventario }),
                React.createElement(Btn_generar_orden_compra, { datos: this.inventario }),
                React.createElement(
                    "h3",
                    null,
                    "Cotizador Pre-orden De Compra."
                ),
                React.createElement(
                    "div",
                    { className: "cotizador" },
                    React.createElement(
                        "table",
                        { className: "table table-bordered" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    { className: "info", style: { "text-align": "center" }, colspan: "6" },
                                    "PRODUCTOS"
                                ),
                                React.createElement(
                                    "th",
                                    { className: "success", style: { "text-align": "center" }, colspan: this.proveedores.length },
                                    " PROVEEDORES"
                                )
                            ),
                            this.cavecera_tabla()
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            this.manejo_datos()
                        )
                    )
                )
            );
        }
    }, {
        key: "cavecera_proveedores",
        value: function cavecera_proveedores() {
            var r = this.proveedores.map(function (proveedor) {
                return React.createElement(
                    "th",
                    { className: "success", style: { "text-align": "center" } },
                    proveedor.nombre
                );
            });
            return r;
        }
    }, {
        key: "datos_proveedores",
        value: function datos_proveedores(producto) {
            var _this3 = this;

            var r = this.proveedores.map(function (proveedor) {
                return React.createElement(
                    "td",
                    { style: { "text-align": "right" } },
                    " $ ",
                    _this3.precios.find(function (p) {
                        return p.folio_proveedor === proveedor.folio_proveedor && p.codigo_producto === producto;
                    }) != undefined ? _this3.precios.find(function (p) {
                        return p.folio_proveedor === proveedor.folio_proveedor && p.codigo_producto === producto;
                    }) : "0.00 ",
                    " "
                );
            });
            return r;
        }
    }, {
        key: "manejo_datos",
        value: function manejo_datos() {
            var _this4 = this;

            var r = this.inventario.map(function (producto) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        producto.codigo
                    ),
                    React.createElement(
                        "td",
                        null,
                        producto.nombre
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        producto.existencia
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        producto.pedido
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "center" } },
                        producto.total_venta
                    ),
                    React.createElement(
                        "td",
                        { style: { "text-align": "right" } },
                        " $ ",
                        producto.u_costo
                    ),
                    _this4.datos_proveedores(producto.codigo)
                );
            });
            return r;
        }
    }, {
        key: "cavecera_tabla",
        value: function cavecera_tabla() {
            return React.createElement(
                "tr",
                { style: { "text-align": "center" } },
                React.createElement(
                    "th",
                    { className: "info" },
                    "Codigo"
                ),
                React.createElement(
                    "th",
                    { className: "info" },
                    "Descripcion"
                ),
                React.createElement(
                    "th",
                    { className: "info" },
                    "Existencia"
                ),
                React.createElement(
                    "th",
                    { className: "info" },
                    "Pedido"
                ),
                React.createElement(
                    "th",
                    { className: "info" },
                    "Total Venta"
                ),
                React.createElement(
                    "th",
                    { className: "info" },
                    "Ultimo Costo"
                ),
                this.cavecera_proveedores()
            );
        }
    }]);

    return Tabla_comparativa;
})(React.Component);

var Btn_cotizar = (function (_React$Component3) {
    _inherits(Btn_cotizar, _React$Component3);

    function Btn_cotizar(props) {
        _classCallCheck(this, Btn_cotizar);

        _get(Object.getPrototypeOf(Btn_cotizar.prototype), "constructor", this).call(this, props);
        this.datos = this.props.datos;
    }

    /**render**/

    _createClass(Btn_cotizar, [{
        key: "render",
        value: function render() {
            return React.createElement("input", { className: "btn btn-info", type: "button", value: "Alimentar Precios.", style: { "margin-left": "0" }, onClick: this.mostrar_modal.bind(this),
                "data-toggle": "modal", "data-target": "#modal_cotizar"
            });
        }
    }, {
        key: "mostrar_modal",
        value: function mostrar_modal() {
            console.log(this.datos);
            this.cavecera();
            this.cuerpo();
            this.state = { proveedor: "", producto: "", precio: "" };
        }
    }, {
        key: "cavecera",
        value: function cavecera() {
            ReactDOM.render(React.createElement(
                "h3",
                null,
                "Capturar Precio."
            ), document.getElementById("cavecera"));
        }
    }, {
        key: "cuerpo",
        value: function cuerpo() {
            ReactDOM.render(React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        React.createElement(
                            "i",
                            { className: "glyphicon glyphicon-tasks" },
                            " Proveedor : "
                        )
                    ),
                    this.lista_proveedores()
                ),
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        React.createElement(
                            "i",
                            { className: "glyphicon glyphicon-shopping-cart" },
                            " Producto : "
                        )
                    ),
                    this.lista_productos()
                ),
                this.btn_agregar()
            ), document.getElementById("contenido"));
        }
    }, {
        key: "lista_proveedores",
        value: function lista_proveedores() {
            var r = this.datos[0].proveedores.map(function (proveedor) {
                return React.createElement(
                    "option",
                    { value: proveedor },
                    proveedor
                );
            });
            return React.createElement(
                "select",
                { className: "form-control" },
                r
            );
        }
    }, {
        key: "lista_productos",
        value: function lista_productos() {
            var r = this.datos.map(function (productos) {
                return React.createElement(
                    "option",
                    { value: productos.nombre },
                    productos.nombre
                );
            });
            return React.createElement(
                "select",
                { className: "form-control" },
                r
            );
        }
    }, {
        key: "btn_agregar",
        value: function btn_agregar() {
            return React.createElement(
                "div",
                { style: { "display": "inline-block", "width": "50%" } },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        React.createElement(
                            "i",
                            { className: "glyphicon glyphicon-usd" },
                            " Precio : "
                        )
                    ),
                    React.createElement("input", { className: "form-control", type: "text", min: "0", rigth: true, placeholder: "0.00", onChange: function (e) {
                            console.log("z");
                        } })
                ),
                React.createElement("input", { type: "button", className: "btn btn-success", value: "Agregar." })
            );
        }
    }]);

    return Btn_cotizar;
})(React.Component);

var Btn_generar_orden_compra = (function (_React$Component4) {
    _inherits(Btn_generar_orden_compra, _React$Component4);

    function Btn_generar_orden_compra(props) {
        _classCallCheck(this, Btn_generar_orden_compra);

        _get(Object.getPrototypeOf(Btn_generar_orden_compra.prototype), "constructor", this).call(this, props);
        this.state = this.props.datos;
    }

    /********************************************
               CHECAMOS EL PASO
    ********************************************/

    /**render**/

    _createClass(Btn_generar_orden_compra, [{
        key: "render",
        value: function render() {
            return React.createElement("input", { className: "btn btn-success", type: "button", value: "Generar Pre-Orden.", style: { "margin-left": "0" } });
        }
    }]);

    return Btn_generar_orden_compra;
})(React.Component);

function checar_datos() {
    if (localStorage.getItem("inventario_parcial") && localStorage.getItem("proveedores_verdura")) {
        tabla_comparativa();
    } else {
        cargar_inventario();
    }
}

function cargar_inventario() {
    console.log("inventario");
    ReactDOM.render(React.createElement(Cargar_inventario, null), document.getElementById("root"));
}
function tabla_comparativa() {
    console.log("tabla");
    ReactDOM.render(React.createElement(Tabla_comparativa, null), document.getElementById("root"));
}
/**lanzador**/
checar_datos();

