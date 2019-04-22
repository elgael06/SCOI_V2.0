"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $MI_URL = window.location.protocol + "//" + window.location.hostname;
var $URL_API = $MI_URL + ":90/api/";

var ObjIncidencia = function ObjIncidencia() {
    _classCallCheck(this, ObjIncidencia);

    this.Checador = "", this.Color = "#FFFFFF", this.Descripcion = "", this.Folio = -1, this.Incidencia = 0, this.Nombre = "", this.Puesto = "";
};

var Incidencias = (function (_React$Component) {
    _inherits(Incidencias, _React$Component);

    function Incidencias(props) {
        _classCallCheck(this, Incidencias);

        _get(Object.getPrototypeOf(Incidencias.prototype), "constructor", this).call(this, props);
        this.state = {
            Establecimiento: 0,
            diferencia: 0,
            Departamentos: [],
            Establecimientos: [],
            Seleccion: {},
            Incidencia: new ObjIncidencia(),
            vistaReporte: 0
        };

        this.Seleccion_departamento = this.on_departamento.bind(this);

        this.incidencia = this.on_incidencia.bind(this);
        this.incidencia_detalle = this.on_incidencia_detalle.bind(this);

        this.cambioIncidencia = this.on_cambio_incidencia.bind(this);
        this.cambioIncidencia_detalle = this.on_cambio_incidencia_descripcion.bind(this);

        this.evGuardarCambioEmpleado = this.on_guardar_cambio_Incidencia_empleado.bind(this);
        this.evGuardarCambioEmpleado_detalle = this.on_guardar_observaciones_incidencia.bind(this);

        this.evReporte = this.on_reporte.bind(this);

        this.guardado = this.on_guardar_incidemcas_departamento.bind(this);

        setTimeout(function () {
            return document.getElementById("pantalla_carga").style.display = 'none';
        }, 1000);
        setTimeout(this.ObtenerEstablecimientos(), 100);
    }

    /*eventos*/

    _createClass(Incidencias, [{
        key: "on_establecimiento",
        value: function on_establecimiento(e) {
            console.log(e.target.value);
            this.setState({ Establecimiento: e.target.value, Departamentos: [] });
        }
    }, {
        key: "on_dia",
        value: function on_dia(e) {
            this.setState({ diferencia: e.target.value, Departamentos: [] });
        }
    }, {
        key: "on_recargar",
        value: function on_recargar() {
            this.setState({ Departamentos: [] });
            this.ObtenerDepartamentos();
        }
    }, {
        key: "on_departamento",
        value: function on_departamento(departamento) {
            console.log(departamento);
            this.setState({ Seleccion: departamento });
            document.getElementById("modal_incidencias").style.display = "flex";
        }
    }, {
        key: "on_incidencia",
        value: function on_incidencia(pocision) {
            this.Seleccion_incidencia(pocision);
            console.log("Incidencia=>", this.state.Incidencia);
            document.querySelector("#Cambio_incidencia").style.display = "flex";
        }
    }, {
        key: "on_incidencia_detalle",
        value: function on_incidencia_detalle(pocision) {
            this.Seleccion_incidencia(pocision);
            console.log("Detalle=>", this.state.Incidencia);
            document.querySelector("#Cambio_incidencia_observacion").style.display = "flex";
        }
    }, {
        key: "on_cambio_incidencia",
        value: function on_cambio_incidencia(_ref) {
            var Color = _ref.Color;
            var Criterio = _ref.Criterio;

            var dato = this.state.Incidencia;

            dato.Color = Color;
            dato.Checador = Criterio;

            this.setState({ Incidencia: dato });
        }
    }, {
        key: "on_cambio_incidencia_descripcion",
        value: function on_cambio_incidencia_descripcion(Descripcion) {
            var dato = this.state.Incidencia;

            dato.Descripcion = Descripcion.target.value;

            this.setState({ Incidencia: dato });
        }
    }, {
        key: "on_guardar_cambio_Incidencia_empleado",
        value: function on_guardar_cambio_Incidencia_empleado() {
            var _state$Incidencia = this.state.Incidencia;
            var Checador = _state$Incidencia.Checador;
            var Color = _state$Incidencia.Color;
            var Folio = _state$Incidencia.Folio;
            var Seleccion = this.state.Seleccion;
            var Lista = Seleccion.Lista;

            var $posicion = Lista.findIndex(function (e) {
                return e.Folio == Folio;
            });
            var $seleccion = Lista.find(function (e) {
                return e.Folio == Folio;
            });

            $seleccion.Checador = Checador;
            $seleccion.Color = Color;

            Lista[$posicion] = $seleccion;

            this.setState({ Seleccion: Seleccion });
            document.querySelector("#Cambio_incidencia").style.display = "none";
        }
    }, {
        key: "on_guardar_observaciones_incidencia",
        value: function on_guardar_observaciones_incidencia() {
            console.log("Guardado=>", this.state.Seleccion);
            document.querySelector("#Cambio_incidencia_observacion").style.display = "none";

            var _state$Incidencia2 = this.state.Incidencia;
            var Folio = _state$Incidencia2.Folio;
            var Descripcion = _state$Incidencia2.Descripcion;
            var Seleccion = this.state.Seleccion;
            var Lista = Seleccion.Lista;

            var $posicion = Lista.findIndex(function (e) {
                return e.Folio == Folio;
            });
            var $seleccion = Lista.find(function (e) {
                return e.Folio == Folio;
            });

            $seleccion.Descripcion = Descripcion;

            Lista[$posicion] = $seleccion;

            this.setState({ Seleccion: Seleccion });
        }
    }, {
        key: "on_guardar_incidemcas_departamento",
        value: function on_guardar_incidemcas_departamento() {
            var Seleccion = this.state.Seleccion;

            this.Cargando(1);
            console.log("Datos=>", Seleccion);
            this.enviarDatosGuardar(Seleccion);
        }
    }, {
        key: "on_reporte",
        value: function on_reporte(estado) {
            this.setState({ vistaReporte: estado });
            document.querySelector('#modal_reporte').style.display = estado == 1 ? 'flex' : '';
        }

        /*Metodos*/
    }, {
        key: "LlenarEstablecimientos",
        value: function LlenarEstablecimientos(lista) {
            this.setState({ Establecimientos: lista, Establecimiento: lista[0]["folio"] });
            this.Cargando(0);
        }
    }, {
        key: "LlenarDepartamentos",
        value: function LlenarDepartamentos(lista) {
            this.setState({ Departamentos: lista });
            this.Cargando(0);
        }
    }, {
        key: "Cargando",
        value: function Cargando(estado) {
            if (document.getElementById("pantalla_carga")) document.getElementById("pantalla_carga").style.display = estado == 1 ? 'flex' : 'none';
        }
    }, {
        key: "Seleccion_incidencia",
        value: function Seleccion_incidencia(pocision) {
            var $seleccion = this.state.Seleccion.Lista[pocision] || null;
            if (Selection != null) {
                console.log("Seleccion => ", $seleccion);
                var $incidencia = {
                    Checador: $seleccion.Checador,
                    Color: $seleccion.Color,
                    Descripcion: $seleccion.Descripcion,
                    Folio: $seleccion.Folio,
                    Incidencia: $seleccion.Incidencia,
                    Nombre: $seleccion.Nombre,
                    Puesto: $seleccion.Puesto
                };
                this.setState({ Incidencia: $incidencia });
            }
        }
    }, {
        key: "QuitarSeleccion",
        value: function QuitarSeleccion(respuesta) {
            this.Cargando(0);
            console.log("respuesta=>", respuesta);
            alert("Guardado...");
            document.querySelector("#modal_incidencias").style.display = "none";
            this.setState({ Seleccion: {} });
            this.ObtenerDepartamentos();
        }

        /*Conexiones*/
    }, {
        key: "ObtenerEstablecimientos",
        value: function ObtenerEstablecimientos() {
            var _this = this;

            this.Cargando(1);
            fetch($URL_API + "obtener_establecimientos", {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (e) {
                    return _this.LlenarEstablecimientos(e);
                });
            })["catch"](function (err) {
                return console.log(err);
            });
        }
    }, {
        key: "ObtenerDepartamentos",
        value: function ObtenerDepartamentos() {
            var _this2 = this;

            this.Cargando(1);
            fetch($URL_API + "Pesonal_Incidencia/?folio=" + this.state.Establecimiento + "&diferencia=" + this.state.diferencia, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (e) {
                    return _this2.LlenarDepartamentos(e);
                });
            })["catch"](function (err) {
                return console.log(err);
            });
        }
    }, {
        key: "enviarDatosGuardar",
        value: function enviarDatosGuardar(Seleccion) {
            var _this3 = this;

            var Lista = Seleccion.Lista;

            fetch($URL_API + "PersonalInsidenciasGuardar?capturo=" + parseInt(ID_SCOI) + "&fecha=" + Seleccion.Dia, {
                method: 'post',
                body: JSON.stringify(Lista),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (e) {
                    return _this3.QuitarSeleccion(e);
                });
            })["catch"](function (err) {
                return console.log(err);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var _state = this.state;
            var Establecimiento = _state.Establecimiento;
            var Establecimientos = _state.Establecimientos;
            var diferencia = _state.diferencia;
            var Departamentos = _state.Departamentos;
            var Seleccion = _state.Seleccion;
            var Incidencia = _state.Incidencia;
            var vistaReporte = _state.vistaReporte;

            var seleccionado = Establecimientos.find(function (e) {
                return e.folio == Establecimiento;
            }) || {};
            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(Cavecera, {
                    establecimientos: Establecimientos,
                    diferencia: diferencia,
                    evEstablecimiento: function (e) {
                        return _this4.on_establecimiento(e);
                    },
                    evDia: function (e) {
                        return _this4.on_dia(e);
                    },
                    evReload: function () {
                        return _this4.on_recargar();
                    }
                }),
                React.createElement(TablaDepartamentos, {
                    Departamentos: Departamentos,
                    evDepartamento: this.Seleccion_departamento
                }),
                React.createElement(ModalChecarIncidencias, {
                    depatamento: Seleccion,
                    evIncidencia: this.incidencia,
                    evDescripcion: this.incidencia_detalle,
                    evGuardar: this.guardado
                }),
                React.createElement(ModalCambioIcidecia, {
                    empleado: Incidencia,
                    listaInsidencias: Seleccion.Criterios || [],
                    evCambiarPuesto: this.cambioIncidencia,
                    evGuardar: this.evGuardarCambioEmpleado
                }),
                React.createElement(ModalAgregarObservaciones, {
                    empleado: Incidencia,
                    evObservaciones: this.cambioIncidencia_detalle,
                    evGuardar: this.evGuardarCambioEmpleado_detalle
                }),
                React.createElement(Resultados, {
                    Establecimiento: seleccionado,
                    Departamentos: Departamentos,
                    evReporte: this.evReporte
                }),
                React.createElement(Cargar, {
                    nombre: "pantalla_carga"
                })
            );
        }
    }]);

    return Incidencias;
})(React.Component);

var Cargar = function Cargar(_ref2) {
    var nombre = _ref2.nombre;

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
var Cavecera = function Cavecera(_ref3) {
    var establecimientos = _ref3.establecimientos;
    var dia = _ref3.dia;
    var evEstablecimiento = _ref3.evEstablecimiento;
    var evDia = _ref3.evDia;
    var evReload = _ref3.evReload;

    return React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
            "div",
            { id: "contenedor_establecimiento" },
            React.createElement(
                "strong",
                null,
                "Establecimiento"
            ),
            React.createElement(
                "select",
                { className: "form-control", onChange: evEstablecimiento },
                establecimientos.map(function (elemento) {
                    return React.createElement(
                        "option",
                        { value: elemento.folio },
                        elemento.nombre
                    );
                })
            )
        ),
        React.createElement(
            "div",
            { id: "contenedor_diferencia" },
            React.createElement(
                "strong",
                null,
                "Dias Diferencia:"
            ),
            React.createElement(
                "select",
                { className: "form-control", "default": dia, onChange: evDia },
                React.createElement(
                    "option",
                    { value: "0" },
                    "Hoy"
                ),
                React.createElement(
                    "option",
                    { value: "1" },
                    "Ayer"
                ),
                React.createElement(
                    "option",
                    { value: "2" },
                    "Hace 2"
                ),
                React.createElement(
                    "option",
                    { value: "3" },
                    "Hace 3"
                ),
                React.createElement(
                    "option",
                    { value: "4" },
                    "Hace 4"
                ),
                React.createElement(
                    "option",
                    { value: "5" },
                    "Hace 5"
                ),
                React.createElement(
                    "option",
                    { value: "6" },
                    "Hace 6"
                )
            )
        ),
        React.createElement(
            "i",
            { className: "btn btn-success", id: "recargar", title: "Recargar",
                onClick: evReload
            },
            React.createElement("i", { className: " fa fa-refresh" })
        )
    );
};

var TablaDepartamentos = function TablaDepartamentos(_ref4) {
    var Departamentos = _ref4.Departamentos;
    var evDepartamento = _ref4.evDepartamento;

    var CuerpoTabla = function CuerpoTabla() {
        return Departamentos.map(function (dep) {
            return React.createElement(ViewDepartamento, { depatamento: dep });
        });
    };
    var ViewDepartamento = function ViewDepartamento(_ref5) {
        var depatamento = _ref5.depatamento;

        var color = function color(estado) {
            return estado ? "panel panel-success ViewDepartamento" : "panel panel-default ViewDepartamento";
        };
        return React.createElement(
            "div",
            { className: color(depatamento.Revicion) },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "i",
                    { className: "fa fa-calendar", style: { float: "left", fontSize: "25px" } },
                    " "
                ),
                React.createElement(
                    "h4",
                    { style: { marginLeft: "35px" } },
                    " ",
                    depatamento.Descripcion
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(
                    "label",
                    { style: { width: "200px" } },
                    React.createElement(
                        "i",
                        { className: "fa fa-users", style: { float: "left", marginLeft: "5px", color: "#000000", fontSize: "20px" } },
                        " "
                    ),
                    React.createElement(
                        "h4",
                        { style: { marginLeft: "35px", color: "#000000" } },
                        "Plantilla"
                    ),
                    React.createElement(
                        "span",
                        { style: { width: "40%" } },
                        React.createElement(
                            "strong",
                            null,
                            "Autorizada :"
                        ),
                        " ",
                        depatamento.Plantilla_autorizada,
                        "."
                    ),
                    React.createElement(
                        "span",
                        { style: { width: "40%", marginLeft: "15px" } },
                        React.createElement(
                            "strong",
                            null,
                            "Real :"
                        ),
                        " ",
                        depatamento.Plantilla_real,
                        "."
                    )
                ),
                React.createElement(
                    "i",
                    { className: "btn btn-primary btn_check",
                        onClick: function () {
                            return evDepartamento(depatamento);
                        },
                        style: { fontSize: "25px", borderRadius: "34px" } },
                    React.createElement("i", { className: "fa fa-edit" })
                )
            )
        );
    };

    return React.createElement(
        "div",
        { className: "panel-body", id: "cuerpo_tabla" },
        React.createElement(
            "h4",
            null,
            "Departamentos"
        ),
        React.createElement(
            "div",
            { className: "panel-group" },
            React.createElement(CuerpoTabla, null)
        )
    );
};

var ModalChecarIncidencias = function ModalChecarIncidencias(_ref6) {
    var depatamento = _ref6.depatamento;
    var evIncidencia = _ref6.evIncidencia;
    var evDescripcion = _ref6.evDescripcion;
    var evGuardar = _ref6.evGuardar;

    var ListaPlantilla = function ListaPlantilla() {
        var $lista = depatamento.Lista || [];
        var incidencia = function incidencia(_incidencia) {
            return "btn " + (_incidencia > 0 ? "btn-success fa fa-calendar-check-o" : " btn-default fa fa-calendar-minus-o");
        };
        return $lista.map(function (e, p) {
            return React.createElement(
                "div",
                { style: { fontSize: "12px" }, className: "panel panel-info indicador_empleado" },
                React.createElement(
                    "div",
                    { style: { height: "60px", fontSize: "18px" },
                        className: "panel-heading" },
                    React.createElement("i", { className: "fa fa-user", style: { float: "left", fontSize: "20px" } }),
                    React.createElement(
                        "strong",
                        { style: { color: "#000000", marginLeft: "20px" } },
                        e.Nombre
                    ),
                    React.createElement("i", { className: incidencia(e.Incidencia), style: { float: "right", fontSize: "20px" } })
                ),
                React.createElement(
                    "div",
                    { style: { height: "70px" },
                        className: "panel-body" },
                    React.createElement(
                        "label",
                        null,
                        e.Puesto
                    ),
                    React.createElement(
                        "i",
                        { className: "btn btn-primary", style: { float: "right", borderRadius: "30px", fontSize: "15px" },
                            onClick: function () {
                                return evDescripcion(p);
                            }
                        },
                        React.createElement("i", { className: "fa fa-commenting-o" })
                    ),
                    React.createElement(
                        "i",
                        { className: "btn btn-default fa fa-edit",
                            onClick: function () {
                                return evIncidencia(p);
                            },
                            style: { float: "right", fontSize: "15px", marginRight: "15px" } },
                        React.createElement(
                            "strong",
                            { style: { marginLeft: "5px" } },
                            e.Checador
                        ),
                        React.createElement("i", { className: "btn btn-default fa fa-exchange",
                            style: { background: e.Color, marginLeft: "5px", borderRadius: "23px" } })
                    )
                )
            );
        });
    };

    return React.createElement(
        "div",
        { id: "modal_incidencias",
            className: "modal_incidencias" },
        React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading", style: { color: "#FFFFFF", background: "#4dc3ff" } },
                React.createElement("i", { className: "btn btn-danger fa fa-close", style: { float: "right", fontSize: "18px" },
                    onClick: function () {
                        return document.getElementById("modal_incidencias").style.display = "none";
                    }
                }),
                React.createElement("i", { className: "fa fa-edit", style: { float: "left" } }),
                React.createElement(
                    "h4",
                    { style: { marginLeft: "40px" } },
                    depatamento.Descripcion || ""
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body", style: { height: "90%" } },
                React.createElement(
                    "h3",
                    null,
                    "Plantilla Dia ",
                    depatamento.Dia || ""
                ),
                React.createElement(
                    "div",
                    { style: { height: "87%", overflow: "auto", border: "solid #bfbfbf 1px", background: "#f2f2f2" } },
                    React.createElement(ListaPlantilla, null)
                ),
                React.createElement(
                    "i",
                    { className: "btn btn-success btn-block", onClick: evGuardar, style: { marginTop: "10px" } },
                    React.createElement(
                        "strong",
                        null,
                        "Guardar"
                    ),
                    React.createElement("i", { className: "fa fa-download", style: { marginLeft: "5px" } })
                )
            )
        )
    );
};

var BtnCriterio = function BtnCriterio(_ref7) {
    var color = _ref7.color;
    var criterio = _ref7.criterio;
    var evento = _ref7.evento;

    return React.createElement(
        "label",
        {
            className: "btn btn-default",
            onClick: evento,
            style: { background: color } },
        criterio
    );
};
var ModalCambioIcidecia = function ModalCambioIcidecia(_ref8) {
    var empleado = _ref8.empleado;
    var listaInsidencias = _ref8.listaInsidencias;
    var evCambiarPuesto = _ref8.evCambiarPuesto;
    var evGuardar = _ref8.evGuardar;
    var Nombre = empleado.Nombre;
    var Checador = empleado.Checador;
    var Color = empleado.Color;
    var Descripcion = empleado.Descripcion;
    var Puesto = empleado.Puesto;

    return React.createElement(
        "div",
        { id: "Cambio_incidencia",
            className: "modal_incidencias" },
        React.createElement(
            "div",
            null,
            React.createElement("i", { id: "btn_cerrar_incidencia", className: "fa fa-close", onClick: function () {
                    return document.querySelector("#Cambio_incidencia").style.display = "none";
                } }),
            React.createElement(
                "strong",
                null,
                Nombre
            ),
            React.createElement("hr", null),
            React.createElement(BtnCriterio, {
                color: Color,
                criterio: Checador
            }),
            React.createElement(
                "div",
                { id: "contenedor_criterios" },
                listaInsidencias.map(function (e) {
                    return React.createElement(BtnCriterio, {
                        color: e.Color,
                        criterio: e.Criterio,
                        evento: function () {
                            return evCambiarPuesto(e);
                        }
                    });
                })
            ),
            React.createElement(
                "i",
                { className: "btn btn-success fa fa-save", id: "guardar_cambio_incidencias", onClick: evGuardar },
                " Guardar"
            )
        )
    );
};

var ModalAgregarObservaciones = function ModalAgregarObservaciones(_ref9) {
    var empleado = _ref9.empleado;
    var evObservaciones = _ref9.evObservaciones;
    var evGuardar = _ref9.evGuardar;
    var Nombre = empleado.Nombre;
    var Checador = empleado.Checador;
    var Color = empleado.Color;
    var Descripcion = empleado.Descripcion;
    var Puesto = empleado.Puesto;

    return React.createElement(
        "div",
        { id: "Cambio_incidencia_observacion",
            className: "modal_incidencias" },
        React.createElement(
            "div",
            null,
            React.createElement("i", { id: "btn_cerrar_incidencia", className: "fa fa-close", onClick: function () {
                    return document.querySelector("#Cambio_incidencia_observacion").style.display = "none";
                } }),
            React.createElement(
                "strong",
                null,
                Nombre
            ),
            React.createElement("hr", null),
            React.createElement(BtnCriterio, {
                color: Color,
                criterio: Checador
            }),
            React.createElement(
                "div",
                { id: "contenedor_criterios_descripcion" },
                React.createElement("textarea", { rows: "4", className: "form-control", cols: "50", onChange: evObservaciones, value: Descripcion })
            ),
            React.createElement(
                "i",
                { className: "btn btn-success fa fa-save", id: "guardar_cambio_incidencias", onClick: evGuardar },
                "Guardar"
            )
        )
    );
};

var Resultados = function Resultados(_ref10) {
    var Establecimiento = _ref10.Establecimiento;
    var Departamentos = _ref10.Departamentos;
    var evReporte = _ref10.evReporte;

    var obtenerFecha = function obtenerFecha(fecha) {
        var a = fecha.split(' ');
        return a[0];
    };
    var DepartamentosView = function DepartamentosView() {
        return Departamentos.map(function (e) {
            return [React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { style: { color: "#FFFFFF", background: "#ff6a00", fontSize: '18px' } },
                    "#"
                ),
                React.createElement(
                    "td",
                    { style: { color: "#FFFFFF", background: "#ff6a00", fontSize: '18px' }, colSpan: "2" },
                    e.Descripcion
                ),
                React.createElement(
                    "td",
                    { style: { color: "#FFFFFF", background: "#ff6a00", fontSize: '18px' } },
                    obtenerFecha(e.Dia)
                )
            ), React.createElement(Empeados, {
                lista: e.Lista
            })];
        });
    };
    var Empeados = function Empeados(_ref11) {
        var lista = _ref11.lista;

        return lista.map(function (e) {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    e.Folio
                ),
                React.createElement(
                    "td",
                    null,
                    e.Nombre
                ),
                React.createElement(
                    "td",
                    null,
                    e.Puesto
                ),
                React.createElement(
                    "td",
                    { style: { background: e.Color } },
                    e.Checador
                )
            );
        });
    };
    return React.createElement(
        "div",
        null,
        React.createElement(
            "i",
            { className: "btn btn-default fa fa-calendar", id: "btn_reporte", onClick: function () {
                    return evReporte(1);
                } },
            " Reporte Asistencias Establecimineto."
        ),
        React.createElement(
            "div",
            { className: "modal_incidencias", id: "modal_reporte" },
            React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement("i", { className: "fa fa-close", onClick: function () {
                            return evReporte(0);
                        } }),
                    React.createElement(
                        "strong",
                        null,
                        "Reporte ",
                        Establecimiento['nombre'] || ''
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "table",
                        { className: "table", id: "tabla_reporte_empleados" },
                        Departamentos ? React.createElement(DepartamentosView, null) : React.createElement(
                            "p",
                            null,
                            "Sin Datos"
                        )
                    )
                ),
                React.createElement(
                    "i",
                    { className: "btn btn-success fa fa-file-excel-o",
                        onClick: function (e) {
                            return tableToExcel("tabla_reporte_empleados", "Plantilla_" + Establecimiento['nombre']);
                        },
                        style: { marginTop: "15px" } },
                    React.createElement(
                        "span",
                        { style: { marginLeft: "5px" } },
                        "Guardar A Ecxel."
                    )
                )
            )
        )
    );
};

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="https://www.w3.org/TR/html401/"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function base64(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    };
    var format = function format(s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };

    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        window.location.href = uri + base64(format(template, ctx));
    };
})();

if (location.protocol != "http:") location.protocol = "http:";
ReactDOM.render(React.createElement(Incidencias, null), document.getElementById("root"));

