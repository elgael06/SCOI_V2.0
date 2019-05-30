"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $MI_URL = window.location.protocol + "//" + window.location.hostname;
var $URL_API = $MI_URL + ":90/api/";

var CompraInterna = (function (_React$Component) {
    _inherits(CompraInterna, _React$Component);

    function CompraInterna(props) {
        _classCallCheck(this, CompraInterna);

        _get(Object.getPrototypeOf(CompraInterna.prototype), "constructor", this).call(this, props);

        this.state = {
            estado: "T",
            filtro: "",
            registros: 0,
            gastos: [],
            Detalle: null
        };
        this.on_estado = this.On_estado.bind(this);
        this.on_filtro = this.On_filtro.bind(this);
        this.Obtener = this.Obtener_Gastos_por_Estatus.bind(this);
        this.BuscarPorFolio = this.Buscar_gasto_por_folio.bind(this);
        this.Autorizacion = this.Autorizacion_gasto.bind(this);
        setTimeout(function () {
            document.getElementById("carga").style.display = "none";
        }, 1000);
    }

    _createClass(CompraInterna, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(CaveceraMain, {
                    evEstado: this.on_estado,
                    registros: this.state.registros,
                    evActualizar: this.Obtener
                }),
                React.createElement(ContenedorTabla, {
                    gastos: this.state.gastos,
                    filtro: this.state.filtro,
                    evFiltro: this.on_filtro,
                    evSeleccion: this.BuscarPorFolio
                }),
                React.createElement(ModalAlimentacion, {
                    seleccion: this.state.Detalle,
                    evAutorizacion: this.Autorizacion
                }),
                React.createElement(Cargar, {
                    nombre: "carga"
                })
            );
        }

        /*Eventos*/
    }, {
        key: "On_estado",
        value: function On_estado(e) {
            this.setState({ estado: e.target.value, registros: 0, gastos: [] });
        }
    }, {
        key: "On_filtro",
        value: function On_filtro(event) {
            this.setState({ filtro: event.target.value });
        }

        /*Metodos*/
    }, {
        key: "Actualizar",
        value: function Actualizar(lista) {
            var $registros = lista.length;
            var $gastos = lista;
            this.setState({ registros: $registros, gastos: $gastos });
        }
    }, {
        key: "Seleccionar_gasto",
        value: function Seleccionar_gasto(seleccion) {
            this.setState({ Detalle: seleccion });
            if (typeof seleccion == "object") {
                document.getElementById("modal_detalle_gasto").style.display = "flex";
            }
        }
    }, {
        key: "Autorizar",
        value: function Autorizar(res) {
            document.getElementById("carga").style.display = "none";
            document.getElementById("modal_detalle_gasto").style.display = "none";
            alert(res);
            this.Obtener_Gastos_por_Estatus();
            console.log(res);
        }

        /*Conexiones*/
    }, {
        key: "Obtener_Gastos_por_Estatus",
        value: function Obtener_Gastos_por_Estatus() {
            var _this = this;

            var $estatus = this.state.estado;
            document.getElementById("carga").style.display = "flex";
            fetch($URL_API + "/Obtener_OCI/?estatus=" + $estatus, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                return e.json().then(function (res) {
                    console.log(res);
                    _this.Actualizar(res);
                    document.getElementById("carga").style.display = "none";
                })["catch"](function (err) {
                    return console.log("Error En Formato JSON!");
                });
            })["catch"](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "Buscar_gasto_por_folio",
        value: function Buscar_gasto_por_folio(folio) {
            var _this2 = this;

            document.getElementById("carga").style.display = "flex";
            fetch($URL_API + "/Detalle_OCI/?folio=" + folio, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                return e.json().then(function (res) {
                    console.log(res);
                    _this2.Seleccionar_gasto(res);
                    document.getElementById("carga").style.display = "none";
                })["catch"](function (err) {
                    return console.log("Error En Formato JSON!");
                });
            })["catch"](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "Autorizacion_gasto",
        value: function Autorizacion_gasto(estado) {
            var _this3 = this;

            var autirizacion = {
                Folio: this.state.Detalle.Folio,
                Estatus: estado == 1 ? 'A' : 'C',
                Usiario: parseInt(ID_SCOI),
                Pc: "SISTEMA_WEB",
                Ip: IP_CLIENTE
            };
            console.log("autirizacion=>", autirizacion);
            document.getElementById("carga").style.display = "flex";
            fetch($URL_API + "Autorizacion_OCI/", {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify(autirizacion),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                return e.json().then(function (res) {
                    _this3.Autorizar(res);
                })["catch"](function (err) {
                    alert("Error En Formato De ResPuesta...");
                });
            })["catch"](function (err) {
                alert('Error En Conexion!!!');
                console.error(err);
            });
        }
    }]);

    return CompraInterna;
})(React.Component);

var CaveceraMain = function CaveceraMain(_ref) {
    var evEstado = _ref.evEstado;
    var registros = _ref.registros;
    var evActualizar = _ref.evActualizar;

    return React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
            "h3",
            null,
            "Autorizacion De Orden De Compra Interna."
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "form-group contenedores_cavecera" },
                React.createElement(
                    "strong",
                    null,
                    "Registros."
                ),
                React.createElement(
                    "label",
                    { className: "form-control", id: "numero_de_registros" },
                    registros
                )
            ),
            React.createElement(
                "div",
                { className: "form-group contenedores_cavecera" },
                React.createElement(
                    "strong",
                    null,
                    "Estatus."
                ),
                React.createElement(
                    "select",
                    { className: "form-control", id: "estatus", onChange: evEstado },
                    React.createElement(
                        "option",
                        { value: "T" },
                        "Todos."
                    ),
                    React.createElement(
                        "optgroup",
                        { id: "grupo_de_estatus", label: "Estatus" },
                        React.createElement(
                            "option",
                            { value: "E" },
                            "En Validacion."
                        ),
                        React.createElement(
                            "option",
                            { value: "A" },
                            "Autorizado."
                        ),
                        React.createElement(
                            "option",
                            { value: "S" },
                            "Surtido."
                        ),
                        React.createElement(
                            "option",
                            { value: "C" },
                            "Cancelado"
                        )
                    )
                )
            ),
            React.createElement("i", { "class": "btn btn-info glyphicon glyphicon-refresh", style: { marginLeft: "20px" }, onClick: evActualizar, id: "btn_refrescar" })
        )
    );
};

var ContenedorTabla = function ContenedorTabla(_ref2) {
    var gastos = _ref2.gastos;
    var filtro = _ref2.filtro;
    var evFiltro = _ref2.evFiltro;
    var evSeleccion = _ref2.evSeleccion;

    var iterar_en_objeto_filtro = function iterar_en_objeto_filtro(objeto, filtro) {
        var $result = false;
        for (var i in objeto) {
            $result = objeto[i].toString().search(filtro) > -1 ? true : $result;
        }
        return $result;
    };
    var DatosTabla = function DatosTabla() {
        var $filtro = filtro.toUpperCase();
        var $lista = gastos.filter(function (elem) {
            return iterar_en_objeto_filtro(elem, $filtro);
        });
        return $lista.map(function (elemento) {
            return React.createElement(
                "tr",
                { style: { color: "black" } },
                React.createElement(
                    "th",
                    { style: { textAlign: "right" } },
                    elemento.Folio
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Uso_mercancia
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Tipo_solicitante
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Nombre_solicitante
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Fecha
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Establecimiento
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Estatus
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Fecha_autorizacion
                ),
                React.createElement(
                    "td",
                    null,
                    elemento.Usuario_autorizo
                ),
                React.createElement(
                    "td",
                    { style: { width: "30px", position: "sticky", right: "1px", zIndex: "980", background: "rgba(194, 214, 214,16)" } },
                    React.createElement(
                        "i",
                        { className: "btn btn-success", onClick: function () {
                                return evSeleccion(elemento.Folio);
                            }, style: { fontSize: "28px", borderRadius: "40px" } },
                        React.createElement("i", { className: "fa fa-edit" })
                    )
                )
            );
        });
    };

    return React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
            "div",
            null,
            React.createElement(
                "strong",
                null,
                "Filtro"
            ),
            React.createElement("input", { type: "text", className: "form-control", onChange: evFiltro })
        ),
        React.createElement(
            "div",
            { id: "contedor_tabla_datos" },
            React.createElement(
                "table",
                { className: "table", id: "tabla_gastos" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { style: { width: "50px" } },
                            "Folio"
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "250px" } },
                            "Uso De La Mercancia."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "90px" } },
                            "Tipo De Solicitante."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "310px" } },
                            "Nombre De Solicitante."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "150px" } },
                            "Fecha."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "180px" } },
                            "Establecimiento."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "120px" } },
                            "Estatus."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "120px" } },
                            "Fecha Autorizacion."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "380px" } },
                            "Usuario Autorizo."
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "30px", right: "1px" } },
                            "Accion"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    { id: "datos_gastos" },
                    React.createElement(DatosTabla, null)
                )
            )
        )
    );
};

var ModalAlimentacion = function ModalAlimentacion(_ref3) {
    var seleccion = _ref3.seleccion;
    var evAutorizacion = _ref3.evAutorizacion;

    var HeadingModal = function HeadingModal() {

        if (seleccion != null) return React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
                "i",
                { className: "btn btn-success", id: "btn_aceptar_estatus", onClick: function () {
                        return evAutorizacion(1);
                    } },
                " ",
                React.createElement(
                    "i",
                    { className: "glyphicon glyphicon-ok" },
                    " "
                ),
                "Autorizar"
            ),
            React.createElement(
                "i",
                { className: "btn btn-danger", id: "btn_cancelar_estatus", onClick: function () {
                        return evAutorizacion(0);
                    } },
                " ",
                React.createElement(
                    "i",
                    { className: "glyphicon glyphicon-remove" },
                    " "
                ),
                "cancelar"
            ),
            React.createElement(
                "div",
                { className: "panel-heading", style: { marginTop: "15px" } },
                React.createElement(
                    "div",
                    { style: { width: "80px", display: "inline-block" } },
                    React.createElement(
                        "strong",
                        null,
                        "Folio"
                    ),
                    React.createElement(
                        "div",
                        { className: "form-control", style: { textAlign: "right" } },
                        seleccion.Folio || 0
                    )
                ),
                React.createElement(
                    "div",
                    { style: { width: "50%", display: "inline-block" } },
                    React.createElement(
                        "strong",
                        null,
                        "Descripcion"
                    ),
                    React.createElement("input", { className: "form-control", disable: true, value: seleccion.Uso_mercancia || "NA" })
                ),
                React.createElement(
                    "div",
                    { style: { width: "25%", display: "inline-block" } },
                    React.createElement(
                        "strong",
                        null,
                        "Destino"
                    ),
                    React.createElement("input", { className: "form-control", disable: true, value: seleccion.Establecimiento || "NA" })
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { style: { width: "80px", display: "inline-block" } },
                    React.createElement(
                        "strong",
                        null,
                        "Folio"
                    ),
                    React.createElement("input", { className: "form-control", style: { textAlign: "right" }, disable: true, value: seleccion.Folio_solicitante || "NA" })
                ),
                React.createElement(
                    "div",
                    { style: { width: "50%", display: "inline-block" } },
                    React.createElement(
                        "strong",
                        null,
                        "Nombre"
                    ),
                    React.createElement("input", { className: "form-control", disable: true, value: seleccion.Nombre_solicitante || "NA" })
                ),
                React.createElement(
                    "div",
                    { style: { width: "25%", display: "inline-block" } },
                    React.createElement(
                        "strong",
                        null,
                        "Solicitante"
                    ),
                    React.createElement("input", { className: "form-control", disable: true, value: seleccion.Solicitante || "NA" })
                )
            )
        );else return null;
    };
    var BodyModal = function BodyModal() {
        var DatosTabla = function DatosTabla() {
            if (seleccion != null) return seleccion.Productos.map(function (elemento) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        elemento.Descripcion
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.Cantidad
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.Unidad
                    )
                );
            });else return null;
        };
        return React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement(
                "table",
                { className: "table table-bordered" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        { className: "info" },
                        React.createElement(
                            "th",
                            null,
                            "Descripcion"
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "100px" } },
                            "Cantidad"
                        ),
                        React.createElement(
                            "th",
                            { style: { width: "230px" } },
                            "Unidad"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    { id: "datos_detalle_gasto" },
                    React.createElement(DatosTabla, null)
                )
            )
        );
    };

    return React.createElement(
        "div",
        { className: "modal_", id: "modal_detalle_gasto" },
        React.createElement(
            "div",
            { "class": "panel panel-default animate" },
            React.createElement(
                "div",
                { id: "modal_detalle_gasto_heading", "class": "panel-heading" },
                React.createElement("i", { className: "btn btn-danger fa fa-close", style: { float: "right" }, onClick: function () {
                        return document.getElementById('modal_detalle_gasto').style.display = 'none';
                    } }),
                React.createElement(
                    "strong",
                    null,
                    "Alimentacion De Orden De Compra Interna."
                )
            ),
            React.createElement(
                "div",
                { id: "modal_detalle_gasto_body", "class": "panel-default", style: { overflow: "scroll", heigth: "90%" } },
                React.createElement(HeadingModal, null),
                React.createElement(BodyModal, null)
            )
        )
    );
};

var Cargar = function Cargar(_ref4) {
    var nombre = _ref4.nombre;

    return React.createElement(
        "div",
        { id: nombre,
            style: {
                display: "flex",
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(242, 242, 242, 0.79)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                fontSize: "40px"
            } },
        React.createElement(
            "label",
            { id: nombre + 1 },
            React.createElement("i", { className: "fa fa-circle-o-notch rotate" }),
            React.createElement(
                "strong",
                { style: { fontSize: "20px" } },
                " Cargando..."
            ),
            React.createElement("br", null)
        )
    );
};
console.clear();

if (location.protocol != "http:") location.protocol = "http:";

ReactDOM.render(React.createElement(CompraInterna, null), document.getElementById("root"));

