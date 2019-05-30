"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vista_Preguntas = (function (_React$Component) {
    _inherits(Vista_Preguntas, _React$Component);

    function Vista_Preguntas(props) {
        _classCallCheck(this, Vista_Preguntas);

        _get(Object.getPrototypeOf(Vista_Preguntas.prototype), "constructor", this).call(this, props);
        this.lista_zonas = conexion_ajax("servicios/preguntasServ.asmx/obtener_preguntas") || [];
        this.lista_pertenece = conexion_ajax("servicios/preguntasServ.asmx/obtener_areas") || [];
        this.state = {
            folio_pregunta: "",
            pregunta: '',
            estatus: true,
            pertenece: "",
            edicion: false,
            nuevo: false,
            posicion: -1
        };
    }

    _createClass(Vista_Preguntas, [{
        key: "render",
        value: function render() {
            var fol = "folio : " + this.state.folio_pregunta;
            return React.createElement(
                "div",
                null,
                React.createElement(Botonera, { nuevo: this.nueva.bind(this),
                    editar: this.editar.bind(this),
                    guardar: this.guardar.bind(this),
                    deshacer: this.deshacer.bind(this),
                    class_editar: this.state.edicion,
                    class_nuevo: this.state.nuevo }),
                React.createElement("br", null),
                React.createElement("input", { type: "button",
                    value: fol,
                    onClick: function (e) {
                        return alert(e.target.value);
                    },
                    className: "btn btn-default caja_folio" }),
                React.createElement(
                    "label",
                    { className: "caja_nombre" },
                    React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                        titulo: "Pregunta",
                        datos: this.state.pregunta,
                        evento: this.on_cambio_nombre_zona.bind(this) })
                ),
                React.createElement(
                    "label",
                    { className: "" },
                    React.createElement(Caja_datos_select, { icono: "glyphicon glyphicon-question-sign",
                        titulo: "Estatus",
                        seleccion: this.on_cambio_estatus.bind(this),
                        opciones: this.opciones_estatus() })
                ),
                React.createElement(
                    "label",
                    { className: "" },
                    React.createElement(Caja_datos_select, { icono: "glyphicon glyphicon-question-sign",
                        titulo: "Pertenece",
                        seleccion: this.on_cambio_pertenece.bind(this),
                        opciones: this.opciones_pertenece() })
                ),
                React.createElement(Tabla_preguntas, { lista_zonas: this.lista_zonas, posicion: this.state.posicion, on_seleccion_de_tabla: this.on_seleccion_de_tabla.bind(this) })
            );
        }
    }, {
        key: "nueva",
        value: function nueva() {
            if (!this.state.edicion) {
                console.log("Nuevo");
                this.setState({
                    folio_pregunta: 0,
                    pregunta: '',
                    estatus: true,
                    edicion: true,
                    nuevo: true,
                    pertenece: "",
                    posicion: -1
                });
            } else alert("Edicion Activada!!!");
        }
    }, {
        key: "editar",
        value: function editar() {
            if (!this.nuevo) if (this.state.folio_pregunta != "") {
                console.log("Editar...");
                this.setState({
                    edicion: true,
                    nuevo: false
                });
            } else alert("Sin Datos A editar!!!");else alert("Nueva Zona En Proceso...");
        }
    }, {
        key: "guardar",
        value: function guardar() {
            var _this = this;

            if (this.state.edicion) {
                var url = "/servicios/preguntasServ.asmx/guardar_datos";
                var obj = {
                    "folio_pregunta": this.state.folio_pregunta,
                    "pregunta": this.state.pregunta,
                    "estatus": this.state.estatus ? 1 : 0,
                    "pertenece": this.state.pertenece
                };
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    response.json().then(function (myJson) {
                        _this.lista_zonas = conexion_ajax("servicios/preguntasServ.asmx/obtener_preguntas") || [];
                        _this.deshacer();
                        alert("Guardado...\nFolio : " + myJson.d);
                    });
                })["catch"](function (error) {
                    return alert('Error:', error);
                });
            }
        }
    }, {
        key: "deshacer",
        value: function deshacer() {
            console.log("Deshacer...");
            this.setState({
                folio_pregunta: "",
                pregunta: '',
                estatus: true,
                edicion: false,
                nuevo: false,
                pertenece: "",
                posicion: -1
            });
        }
    }, {
        key: "on_cambio_nombre_zona",
        value: function on_cambio_nombre_zona(e) {
            if (this.state.edicion) this.setState({ pregunta: e.target.value });else alert("edicion Inactiva");
        }
    }, {
        key: "on_cambio_estatus",
        value: function on_cambio_estatus(e) {
            var estatus = e.target.value == "V";
            this.setState({ estatus: estatus });
        }
    }, {
        key: "on_cambio_pertenece",
        value: function on_cambio_pertenece(e) {
            this.setState({ pertenece: e.target.value });
        }
    }, {
        key: "on_seleccion_de_tabla",
        value: function on_seleccion_de_tabla(seleccion, pos) {
            if (!(this.state.edicion || this.state.nuevo)) {
                this.setState({
                    folio_pregunta: seleccion.folio_pregunta,
                    pregunta: seleccion.pregunta,
                    estatus: seleccion.estatus,
                    pertenece: seleccion.pertenece,
                    posicion: pos
                });
            } else alert("Edicion En Proceso...");
        }
    }, {
        key: "borrar_zona",
        value: function borrar_zona(zona) {
            var _this2 = this;

            console.log("folio A Borrar :" + zona.folio_pregunta);
            if (confirm("Desea Borrar la Zona : " + zona.pregunta)) {
                var url = "servicios/servicios_generales/conexiones.asmx/servicios_borrar_criterio";
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({ "folio": zona.folio_pregunta }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    response.json().then(function (myJson) {
                        _this2.lista_zonas = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_criterio") || [];
                        _this2.deshacer();
                        alert("Borrado...\nFolio : " + myJson.d);
                    });
                })["catch"](function (error) {
                    return alert('Error:', error);
                });
            }
        }
    }, {
        key: "opciones_estatus",
        value: function opciones_estatus() {
            var est = this.state.estatus;
            return [React.createElement(
                "option",
                { selected: est, value: "V" },
                "Vigente"
            ), React.createElement(
                "option",
                { selected: !est, value: "C" },
                "Cancelado"
            )];
        }
    }, {
        key: "opciones_pertenece",
        value: function opciones_pertenece() {
            var _this3 = this;

            var est = this.state.pertenece;

            var a = this.lista_pertenece.map(function (elemento) {
                return React.createElement(
                    "option",
                    { value: elemento, selected: _this3.state.pertenece == elemento },
                    elemento
                );
            });
            return [React.createElement(
                "option",
                { value: "-1" },
                "Seleccione.."
            ), a];
        }
    }]);

    return Vista_Preguntas;
})(React.Component);

var Tabla_preguntas = (function (_React$Component2) {
    _inherits(Tabla_preguntas, _React$Component2);

    function Tabla_preguntas(props) {
        _classCallCheck(this, Tabla_preguntas);

        _get(Object.getPrototypeOf(Tabla_preguntas.prototype), "constructor", this).call(this, props);
        this.state = {
            filtro: ''
        };
    }

    _createClass(Tabla_preguntas, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("input", { type: "text",
                    className: "form-control",
                    placeholder: "filtro",
                    onChange: this.on_filtro.bind(this),
                    value: this.state.filtro }),
                React.createElement(
                    "div",
                    { className: "cuerpo_tabla" },
                    React.createElement(Tabla, { cavecera: [React.createElement(
                            "h5",
                            null,
                            "Folio"
                        ), React.createElement(
                            "h5",
                            null,
                            "Criterios"
                        ), React.createElement(
                            "h5",
                            null,
                            "Estatus"
                        ), React.createElement(
                            "h5",
                            null,
                            "Pertenece"
                        )],
                        datos: this.datos_zonas() })
                )
            );
        }
    }, {
        key: "on_filtro",
        value: function on_filtro(event) {
            this.setState({ filtro: event.target.value });
        }
    }, {
        key: "datos_zonas",
        value: function datos_zonas() {
            var _this4 = this;

            var filtro_ = this.state.filtro.toUpperCase();
            var lista = this.props.lista_zonas.filter(function (e) {
                return e.folio_pregunta.toString().search(filtro_) > -1 || e.pregunta.toUpperCase().search(filtro_) > -1;
            });
            return lista.map(function (elemento, pos) {
                var clase = _this4.props.posicion == pos ? "seleccio" : "";
                return React.createElement(
                    "tr",
                    { className: clase, style: { "border-bottom": "solid 1px  #000000" },
                        onClick: function () {
                            return _this4.props.on_seleccion_de_tabla(elemento, pos);
                        } },
                    React.createElement(
                        "td",
                        { style: { "width": "50px" } },
                        elemento.folio_pregunta
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.pregunta
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "90px" } },
                        elemento.estatus ? "Vigente" : "Cancelado"
                    ),
                    React.createElement(
                        "td",
                        { style: { "width": "10px" } },
                        elemento.pertenece
                    )
                );
            });
        }
    }]);

    return Tabla_preguntas;
})(React.Component);

ReactDOM.render(React.createElement(Vista_Preguntas, null), document.getElementById("container"));

