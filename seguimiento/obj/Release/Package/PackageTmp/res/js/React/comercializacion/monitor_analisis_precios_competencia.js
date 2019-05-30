/*Clase pada manejar la tabla*/
"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tabla_logica = (function () {
    function tabla_logica() {
        _classCallCheck(this, tabla_logica);

        this.id = "";
        this.pasillo = "";
        this.localizacion = "";
        this.cantidad = 0;
        this.avance = 0;
        this.diferenca = 0;
        this.acumulado = 0.0;
        this.semana = 1;
    }

    /*Funcion de loguica de negocios*/

    _createClass(tabla_logica, [{
        key: "Diferencia",
        value: function Diferencia() {
            this.diferenca = this.cantidad - this.avance;
        }
    }, {
        key: "Acumulado",
        value: function Acumulado() {
            var semanas_mes = 4;
            if (this.avance !== 0 && this.cantidad !== 0) {
                this.acumulado = Math.round(this.avance / (this.semana / semanas_mes) / this.cantidad * 1000) / 10;
            } else this.acumulado = 0;
        }
    }, {
        key: "getID",
        get: function get() {
            return this.id;
        }
    }, {
        key: "setID",
        set: function set(p) {
            this.id = p;
        }
    }, {
        key: "getPasillo",
        get: function get() {
            return this.pasillo;
        }
    }, {
        key: "setPasillo",
        set: function set(p) {
            this.pasillo = p;
        }
    }, {
        key: "getLocalizacion",
        get: function get() {
            return this.localizacion;
        }
    }, {
        key: "setLocalizacion",
        set: function set(p) {
            this.localizacion = p;
        }
    }, {
        key: "getCantidad",
        get: function get() {
            return this.cantidad;
        }
    }, {
        key: "setCantidad",
        set: function set(c) {
            this.cantidad = c;
        }
    }, {
        key: "getAvance",
        get: function get() {
            return this.avance;
        }
    }, {
        key: "setAvance",
        set: function set(avance) {
            this.avance = avance ? this.avance += 1 : this.avance;
        }
    }]);

    return tabla_logica;
})();

function tabla_principal() {
    /***funcion principal ***/
    var pasillos_arr = [];
    //variables globales
    var pasillos = new tabla_logica();
    var clasificado_8020 = new tabla_logica();

    clasificado_8020.setPasillo = "80/20";
    var contador_80_20 = 0;
    var contador_pasillo = 0;

    //ordenar Productos
    PRODUCTOS_ANALIZADOS.sort(function (a, b) {
        if (a.pasillo > b.pasillo) {
            return 1;
        }
        if (a.pasillo < b.pasillo) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    //obtener 8020
    $.each(PRODUCTOS_ANALIZADOS.filter(function (cla) {
        return cla.clasificacion_8020 === "8020";
    }), function (index, item) {
        llenar_8020(item);
    });
    pasillos_arr.push(clasificado_8020);
    //recorrido datos
    $.each(PRODUCTOS_ANALIZADOS, function (index, item) {

        if (index === 0) {
            pasillos = new tabla_logica();
            pasillos.setPasillo = item.pasillo;
        }
        if (pasillos.getPasillo === item.pasillo) {

            llenar_pasillo(item);
        } else if (pasillos.getPasillo !== item.pasillo) {

            pasillos_arr.push(pasillos);

            pasillos = new tabla_logica();
            contador_pasillo = 0;
            pasillos.setPasillo = item.pasillo;
            llenar_pasillo(item);
        }
    });
    pasillos_arr.push(pasillos);

    //funciones
    function llenar_8020(item) {

        clasificado_8020.setAvance = item.BODART_N > 0 || item.BODART_O > 0;
        clasificado_8020.setAvance = item.LEY_PCIO_N > 0 || item.LEY_PCIO_O > 0;
        clasificado_8020.setAvance = item.LOPEZ_N > 0 || item.LOPEZ_O > 0;
        clasificado_8020.setAvance = item.MEZQUITILLO_N > 0 || item.MEZQUITILLO_O > 0;
        clasificado_8020.setAvance = item.SORIANA_N > 0 || item.SORIANA_O > 0;
        clasificado_8020.setAvance = item.TERESITA_N > 0 || item.TERESITA_O > 0;

        contador_80_20++;

        clasificado_8020.setCantidad = contador_80_20;
        clasificado_8020.Acumulado();
        clasificado_8020.Diferencia();
    }
    function llenar_pasillo(item) {

        pasillos.setAvance = item.BODART_N > 0 || item.BODART_O > 0;
        pasillos.setAvance = item.LEY_PCIO_N > 0 || item.LEY_PCIO_O > 0;
        pasillos.setAvance = item.LOPEZ_N > 0 || item.LOPEZ_O > 0;
        pasillos.setAvance = item.MEZQUITILLO_N > 0 || item.MEZQUITILLO_O > 0;
        pasillos.setAvance = item.SORIANA_N > 0 || item.SORIANA_O > 0;
        pasillos.setAvance = item.TERESITA_N > 0 || item.TERESITA_O > 0;

        contador_pasillo++;

        pasillos.setCantidad = contador_pasillo;
        pasillos.Acumulado();
        pasillos.Diferencia();
    }
    /*Funciones del DOM*/
    ReactDOM.render(React.createElement(
        "div",
        { className: "tabla_productos" },
        React.createElement(Pasillo, { datos: pasillos_arr, n_clase: "pasillo" })
    ), $("#principal")[0]);
}
function tabla_mueble(ubicacion) {
    /**tabla muebles**/
    //variables globales
    var muebles_arr = [];
    var muebles = new tabla_logica();
    var contador_mueble = 0;
    var filtro = [];
    //ordenar pasillo por mueble
    PRODUCTOS_ANALIZADOS.sort(function (a, b) {
        if (a.localizacion > b.localizacion) {
            return 1;
        }
        if (a.localizacion < b.localizacion) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    if (ubicacion !== "80/20") filtro = PRODUCTOS_ANALIZADOS.filter(function (n) {
        return n.pasillo === ubicacion;
    });else filtro = PRODUCTOS_ANALIZADOS.filter(function (n) {
        return n.clasificacion_8020 === "8020";
    });
    //recorrido al filtro
    $.each(filtro, function (index, item) {
        if (index === 0) {
            muebles.setLocalizacion = item.localizacion;
        }
        if (item.localizacion === muebles.getLocalizacion) {
            llenar_objMueble(item);
        } else if (item) {
            muebles_arr.push(muebles);

            muebles = new tabla_logica();
            muebles.setLocalizacion = item.localizacion;
            contador_mueble = 0;
            llenar_objMueble(item);
        }
    });
    muebles_arr.push(muebles);

    //funciones
    function llenar_objMueble(item) {
        muebles.setAvance = item.BODART_N > 0 || item.BODART_O > 0;
        muebles.setAvance = item.LEY_PCIO_N > 0 || item.LEY_PCIO_O > 0;
        muebles.setAvance = item.LOPEZ_N > 0 || item.LOPEZ_O > 0;
        muebles.setAvance = item.MEZQUITILLO_N > 0 || item.MEZQUITILLO_O > 0;
        muebles.setAvance = item.SORIANA_N > 0 || item.SORIANA_O > 0;
        muebles.setAvance = item.TERESITA_N > 0 || item.TERESITA_O > 0;

        contador_mueble++;
        muebles.setPasillo = ubicacion;
        muebles.setCantidad = contador_mueble;
        muebles.Acumulado();
        muebles.Diferencia();
    }

    /*Funciones del DOM*/
    ReactDOM.render(React.createElement(
        "div",
        { className: "tabla_productos" },
        React.createElement(Mueble, { datos: muebles_arr, n_clase: "mueble" })
    ), $("#principal")[0]);
}

function productos(ubicacion, mueble) {
    var productos_arr = [];
    var filtro = [];

    if (ubicacion !== "80/20") filtro = PRODUCTOS_ANALIZADOS.filter(function (n) {
        return n.pasillo === ubicacion && n.localizacion === mueble;
    });else filtro = PRODUCTOS_ANALIZADOS.filter(function (n) {
        return n.clasificacion_8020 === "8020" && n.localizacion === mueble;
    });

    //recorrido al filtro
    $.each(filtro, function (index, item) {
        productos_arr.push(item);
    });

    /*Funciones del DOM*/
    ReactDOM.render(React.createElement(
        "div",
        { className: "tabla_productos" },
        React.createElement(Producto, { datos: productos_arr, n_clase: "producto" })
    ), $("#principal")[0]);
}
/*Tabla de grficos*/
function graficar_datos(Nombre, barras, datos) {
    var ctx = document.getElementById('graficos').getContext('2d');
    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    window.grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: barras,
            datasets: [{
                label: Nombre,
                data: datos,
                backgroundColor: 'rgba(75, 150, 205, 0.6)'
            }]
        },
        options: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 100,
                    fontColor: 'black'
                }
            }
        }
    });
}

/*manejo del DOM*/

var Pasillo = (function (_React$Component) {
    _inherits(Pasillo, _React$Component);

    function Pasillo(props) {
        _classCallCheck(this, Pasillo);

        _get(Object.getPrototypeOf(Pasillo.prototype), "constructor", this).call(this, props);
        this.lista_datos = props.datos;
        this.clase = props.n_clase;
    }

    _createClass(Pasillo, [{
        key: "listaDatos",
        value: function listaDatos() {
            var _this = this;

            var r = this.lista_datos.map(function (pasillo) {
                return React.createElement(
                    "tr",
                    { key: pasillo.pasillo, className: _this.clase, onClick: function (e) {
                            return tabla_mueble(pasillo.pasillo);
                        }, style: { "height": "24px" } },
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "i",
                            { className: "glyphicon glyphicon-shopping-cart" },
                            " "
                        ),
                        " Pasillo : " + pasillo.pasillo
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        pasillo.cantidad,
                        " Producto(s)"
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        pasillo.avance,
                        " Producto(s)"
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        pasillo.diferenca,
                        " Producto(s)"
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        pasillo.acumulado,
                        " %",
                        React.createElement(Checar_acumulado, { acumulado: pasillo.acumulado })
                    )
                );
            });
            return r;
        }
    }, {
        key: "agregar_geraficos_acumulado",
        value: function agregar_geraficos_acumulado() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.acumulado);
            });
            graficar_datos("Acumulado", nombres, datos);
        }
    }, {
        key: "agregar_geraficos_cantidad",
        value: function agregar_geraficos_cantidad() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.cantidad);
            });
            graficar_datos("Cantidad", nombres, datos);
        }
    }, {
        key: "agregar_geraficos_avance",
        value: function agregar_geraficos_avance() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.avance);
            });
            graficar_datos("Avance", nombres, datos);
        }
    }, {
        key: "agregar_geraficos_diferencia",
        value: function agregar_geraficos_diferencia() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.diferenca);
            });
            graficar_datos("Diferenca", nombres, datos);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var nombres = [React.createElement(
                "div",
                { className: "centrar", style: { "display": "inline-block" } },
                "Super V"
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this2.agregar_geraficos_cantidad();
                    } }),
                " Cantidad"
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this2.agregar_geraficos_avance();
                    } }),
                " Avance"
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this2.agregar_geraficos_diferencia();
                    } }),
                " Diferencia"
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this2.agregar_geraficos_acumulado();
                    } }),
                " Acumulado"
            )];
            return React.createElement(
                "table",
                { className: "table table-bordered" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(Cavecera_tabla, { datos: nombres }),
                    this.listaDatos()
                )
            );
        }
    }]);

    return Pasillo;
})(React.Component);

var Mueble = (function (_React$Component2) {
    _inherits(Mueble, _React$Component2);

    function Mueble(props) {
        _classCallCheck(this, Mueble);

        _get(Object.getPrototypeOf(Mueble.prototype), "constructor", this).call(this, props);
        this.lista_datos = props.datos;
        this.clase = props.n_clase;
    }

    _createClass(Mueble, [{
        key: "listaDatos",
        value: function listaDatos() {
            var _this3 = this;

            var r = this.lista_datos.map(function (Mueble) {
                return React.createElement(
                    "tr",
                    { key: Mueble.localizacion, style: { "height": "24px" },
                        className: _this3.clase,
                        onClick: function (e) {
                            return productos(Mueble.pasillo, Mueble.localizacion);
                        } },
                    React.createElement(
                        "td",
                        { name: Mueble.localizacion },
                        " Mueble : " + Mueble.localizacion
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        Mueble.cantidad,
                        " Producto(s)"
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        Mueble.avance,
                        " Producto(s)"
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        Mueble.diferenca,
                        " Producto(s)"
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        Mueble.acumulado,
                        " %",
                        React.createElement(Checar_acumulado, { acumulado: Mueble.acumulado })
                    )
                );
            });
            return r;
        }
    }, {
        key: "agregar_geraficos_acumulado",
        value: function agregar_geraficos_acumulado() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.acumulado);
            });
            graficar_datos("Acumulado", nombres, datos);
        }
    }, {
        key: "agregar_geraficos_cantidad",
        value: function agregar_geraficos_cantidad() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.cantidad);
            });
            graficar_datos("Cantidad", nombres, datos);
        }
    }, {
        key: "agregar_geraficos_avance",
        value: function agregar_geraficos_avance() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.avance);
            });
            graficar_datos("Avance", nombres, datos);
        }
    }, {
        key: "agregar_geraficos_diferencia",
        value: function agregar_geraficos_diferencia() {
            var nombres = [],
                datos = [];
            $.each(this.lista_datos, function (index, item) {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.diferenca);
            });
            graficar_datos("Diferenca", nombres, datos);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var nombres = [React.createElement(
                "div",
                { className: "centrar", style: { "display": "inline-block" } },
                "Pasillo: ",
                this.lista_datos[0].pasillo,
                " "
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this4.agregar_geraficos_cantidad();
                    } }),
                " Cantidad"
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this4.agregar_geraficos_avance();
                    } }),
                "Avance"
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this4.agregar_geraficos_diferencia();
                    } }),
                " Diferencia"
            ), React.createElement(
                "div",
                null,
                React.createElement("i", { className: "glyphicon glyphicon-stats", "data-toggle": "modal", "data-target": "#modal_Grafica", title: "Grafica de Barras", onClick: function (e) {
                        _this4.agregar_geraficos_acumulado();
                    } }),
                "Acumulado"
            )];
            return React.createElement(
                "table",
                { className: "table table-bordered" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(Cavecera_tabla, { datos: nombres }),
                    this.listaDatos()
                )
            );
        }
    }]);

    return Mueble;
})(React.Component);

var Producto = (function (_React$Component3) {
    _inherits(Producto, _React$Component3);

    function Producto(props) {
        _classCallCheck(this, Producto);

        _get(Object.getPrototypeOf(Producto.prototype), "constructor", this).call(this, props);
        this.lista_datos = props.datos;
        this.clase = props.n_clase;
        this.capturados = PRODUCTOS_ANALIZADOS.filter(function (x) {
            return x.BODART_N !== "0" || x.BODART_O !== "0" || x.LEY_PCIO_N !== "0" || x.LEY_PCIO_O !== "0" || x.LEY_PCIO_O !== "0" || x.LOPEZ_N !== "0" || x.MEZQUITILLO_N !== "0" || x.MEZQUITILLO_N !== "0" || x.SORIANA_N !== "0" || x.SORIANA_O !== "0" || x.TERESITA_N !== "0" || x.TERESITA_O !== "0";
        });
    }

    _createClass(Producto, [{
        key: "listaDatos",
        value: function listaDatos() {
            var _this5 = this;

            var r = this.lista_datos.map(function (Producto) {
                return React.createElement(
                    "tr",
                    { key: Producto.cod_prod, className: _this5.clase, style: { "height": "24px" },
                        onClick: function (e) {
                            _this5.detalles_producto(Producto.cod_prod);
                        },
                        "data-toggle": "modal", "data-target": "#modal_detalles" },
                    React.createElement(
                        "td",
                        null,
                        _this5.clasificado(Producto.clasificacion_8020),
                        Producto.descripcion
                    ),
                    React.createElement(
                        "td",
                        { className: "centrar" },
                        Producto.cod_prod
                    ),
                    React.createElement(
                        "td",
                        { className: "centrar" },
                        Producto.clase_producto
                    ),
                    React.createElement(
                        "td",
                        { className: "centrar" },
                        Producto.categoria
                    ),
                    React.createElement(
                        "td",
                        { className: "centrar" },
                        Producto.familia
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        "$ ",
                        Producto.ultimo_costo
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        "$ ",
                        Producto.costo_promedio
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        "$ ",
                        Producto.precio_de_venta
                    ),
                    React.createElement(
                        "td",
                        { className: "numero" },
                        "$ ",
                        Producto.precio_de_oferta_actual
                    ),
                    _this5.estatus(Producto)
                );
            });
            return r;
        }
    }, {
        key: "clasificado",
        value: function clasificado(c) {
            var r = React.createElement("i", { className: "glyphicon glyphicon-shopping-cart", style: { "font-size": "22px", "margin-right": "5px", "color": "blue" } });
            if (c === "8020") {
                r = React.createElement(
                    "span",
                    { className: "badge bg-green", style: { "font-size": "8px", "margin-right": "5px" } },
                    " 80/20 "
                );
            }
            return r;
        }
    }, {
        key: "estatus",
        value: function estatus(item) {
            var contador = this.capturados.indexOf(this.capturados.find(function (x) {
                return x.descripcion === item.descripcion;
            }));
            if (contador > 0) {
                return React.createElement(
                    "td",
                    { className: "centrar", style: { "color": "green", "font-size": "12px", "width": "120px", "height": "24px" } },
                    React.createElement(
                        "i",
                        { className: "glyphicon glyphicon-ok" },
                        " Capturado"
                    )
                );
            } else return React.createElement(
                "td",
                { className: "centrar", style: { "color": "orange", "font-size": "12px", "width": "120px", "height": "24px" } },
                React.createElement(
                    "i",
                    { className: "glyphicon glyphicon-remove" },
                    " Pendiente"
                )
            );
        }
    }, {
        key: "detalles_producto",
        value: function detalles_producto(id) {
            //variables
            var producto = PRODUCTOS_ANALIZADOS.find(function (p) {
                return p.cod_prod === id;
            });
            App();

            //funciones
            ReactDOM.render(React.createElement(
                "p",
                null,
                this.clasificado(producto.clasificacion_8020),
                "  Producto : ",
                producto.descripcion,
                "."
            ), $("#nombre_rpoducto")[0]);
            function Llenar_tabla() {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "table",
                            { className: "table table-bordered" },
                            React.createElement(
                                "tbody",
                                null,
                                React.createElement(
                                    "tr",
                                    { style: { "background": "#17b3ed" } },
                                    React.createElement(
                                        "th",
                                        null,
                                        "Venta Ultimos 90 Dias "
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Clase"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Categoria"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Familia"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Ultimo Costo"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Costo Promedio"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Margen"
                                    )
                                ),
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "td",
                                        { className: "centrar" },
                                        React.createElement(
                                            "h4",
                                            null,
                                            React.createElement(
                                                "a",
                                                { style: { "color": "black" } },
                                                producto.venta_ultimos_90_dias,
                                                " ."
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        producto.clase_producto
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        producto.categoria
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        producto.familia
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.ultimo_costo
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.costo_promedio
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.margen
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "table",
                            { className: "table table-bordered" },
                            React.createElement(
                                "tbody",
                                null,
                                React.createElement(
                                    "tr",
                                    { className: "success centrar" },
                                    React.createElement(
                                        "th",
                                        { className: "centrar" },
                                        "Izagar"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Bodart"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Ley"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Lopez"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Mesquitillo"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Soriana"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Teresita"
                                    )
                                ),
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        { className: "centrar" },
                                        "Precio : $ ",
                                        producto.precio_de_venta
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.BODART_N
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.LEY_PCIO_N
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.LOPEZ_N
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.MEZQUITILLO_N
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.SORIANA_N
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.TERESITA_N
                                    )
                                ),
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        { className: "centrar" },
                                        "Oferta : $ ",
                                        producto.precio_de_oferta_actual
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.BODART_O
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.LEY_PCIO_O
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.LOPEZ_O
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.MEZQUITILLO_O
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.SORIANA_O
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "numero" },
                                        "$ ",
                                        producto.TERESITA_O
                                    )
                                )
                            )
                        )
                    )
                );
            }
            function App() {
                ReactDOM.render(React.createElement(
                    "div",
                    null,
                    React.createElement(Llenar_tabla, null)
                ), $("#contenido")[0]);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var nombres = [React.createElement(Retornar, { titulo: this.lista_datos[0].localizacion, pasillo: this.lista_datos[0].pasillo }), "Codigo", "Clase", "Categoria", "Familia", " Ultimo Costo", "Costo Promedio", "Precio", "Oferta", "Estatus"];

            return React.createElement(
                "table",
                { className: "table table-bordered" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(Cavecera_tabla, { datos: nombres }),
                    this.listaDatos()
                )
            );
        }
    }]);

    return Producto;
})(React.Component);

var Retornar = (function (_React$Component4) {
    _inherits(Retornar, _React$Component4);

    function Retornar(props) {
        _classCallCheck(this, Retornar);

        _get(Object.getPrototypeOf(Retornar.prototype), "constructor", this).call(this, props);
        this.titulo = this.props.titulo;
        this.pasillo = this.props.pasillo;
    }

    _createClass(Retornar, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "div",
                { style: { "display": "inline-block" } },
                "Pasillo : ",
                this.pasillo,
                " ",
                React.createElement("br", null),
                React.createElement("i", { className: "fa fa-mail-reply",
                    style: { "margin-right": "20px", "margin-left": "20px" },
                    onClick: function () {
                        return tabla_mueble(_this6.pasillo);
                    },
                    title: "Regresar" }),
                React.createElement(
                    "a",
                    { style: { "display": "inline-block", color: "gray" } },
                    this.titulo
                )
            );
        }
    }]);

    return Retornar;
})(React.Component);

var Home_icon = (function (_React$Component5) {
    _inherits(Home_icon, _React$Component5);

    function Home_icon() {
        _classCallCheck(this, Home_icon);

        _get(Object.getPrototypeOf(Home_icon.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Home_icon, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "span",
                { style: { "margin-right": "20px", "font-size": "25px" } },
                React.createElement("i", { className: "glyphicon glyphicon-home",
                    title: "Regresar.",
                    onClick: function (e) {
                        return tabla_principal();
                    } })
            );
        }
    }]);

    return Home_icon;
})(React.Component);

var Cavecera_tabla = (function (_React$Component6) {
    _inherits(Cavecera_tabla, _React$Component6);

    function Cavecera_tabla(props) {
        _classCallCheck(this, Cavecera_tabla);

        _get(Object.getPrototypeOf(Cavecera_tabla.prototype), "constructor", this).call(this, props);
        this.datos = this.props.datos;
        this.titulo = this.props.datos[0];
    }

    _createClass(Cavecera_tabla, [{
        key: "render",
        value: function render() {
            var _this7 = this;

            return React.createElement(
                "tr",
                { className: "cavecera", style: { 'font-size': '16px', 'border-bottom': 'solid 1px #0094ff', 'color': 'white', 'background': '#3eb9e1' } },
                this.datos.map(function (cell) {
                    if (cell === _this7.titulo) return React.createElement(
                        "th",
                        { style: { "text-align": "left" } },
                        " ",
                        React.createElement(Home_icon, null),
                        cell
                    );
                    return React.createElement(
                        "th",
                        null,
                        cell
                    );
                })
            );
        }
    }]);

    return Cavecera_tabla;
})(React.Component);

var Checar_acumulado = (function (_React$Component7) {
    _inherits(Checar_acumulado, _React$Component7);

    function Checar_acumulado(props) {
        _classCallCheck(this, Checar_acumulado);

        _get(Object.getPrototypeOf(Checar_acumulado.prototype), "constructor", this).call(this, props);
        this.acumulado = this.props.acumulado;
    }

    //arreglo de datos

    _createClass(Checar_acumulado, [{
        key: "render",
        value: function render() {
            var ac = React.createElement("i", { className: "glyphicon glyphicon-thumbs-up", style: { "color": "blue" } });
            if (this.acumulado < 85) {
                ac = React.createElement("i", { className: "glyphicon glyphicon-thumbs-down", style: { "color": "orange" } });
            }
            return ac;
        }
    }]);

    return Checar_acumulado;
})(React.Component);

var PRODUCTOS_ANALIZADOS = []; //conexion_ajax();//JSON.parse(localStorage.getItem("Productos"));//

function conexion() {
    document.getElementById("guardar_grafica").addEventListener("click", function () {
        var img_b64 = window.grafica.toBase64Image(); //base64 de la imagen
        download(img_b64, "grafica.png", "image/png");
    });

    //variables a usar
    var xhttp = new XMLHttpRequest();
    var respuesta = "";
    xhttp.onreadystatechange = function () {
        //checamos si hay resultado
        if (this.readyState === 4 && this.status === 200) {
            respuesta = this.responseText; //cachamos el resultado
            respuesta = JSON.parse(respuesta); //parseamos a Json
            PRODUCTOS_ANALIZADOS = respuesta.d;
            tabla_principal();
            $("#dialog").hide();
        } //si no hay resultado manda una alerta
        else if (this.status > 200) {
                alert("Error : " + this.estatus);
                $("#dialog").hide();
            }
    }; //fin
    //llamada al servicio
    xhttp.open("post", "servicios/comercializacion/analisis_precio_competenciaServ.asmx/Obtener_analisis", true);
    //tipo de datos
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //Datos a enviar
    xhttp.send();
} //fin
conexion();

var App_index = (function (_React$Component8) {
    _inherits(App_index, _React$Component8);

    function App_index(props) {
        _classCallCheck(this, App_index);

        _get(Object.getPrototypeOf(App_index.prototype), "constructor", this).call(this, props);
        this.msg = this.props.msg;
    }

    _createClass(App_index, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "tabla_productos", style: { "text-align": "center" } },
                React.createElement(
                    "div",
                    { id: "dialog", title: "Cargando Datos..." },
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("img", { id: "cargando", src: "../../../../Data/loadin_izagar.gif" })
                )
            );
        }
    }]);

    return App_index;
})(React.Component);

ReactDOM.render(React.createElement(App_index, null), $("#principal")[0]);

