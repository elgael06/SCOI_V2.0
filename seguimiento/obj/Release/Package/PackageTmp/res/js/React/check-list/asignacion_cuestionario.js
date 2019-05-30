"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cuestionario = (function (_React$Component) {
    _inherits(Cuestionario, _React$Component);

    function Cuestionario(props) {
        _classCallCheck(this, Cuestionario);

        _get(Object.getPrototypeOf(Cuestionario.prototype), "constructor", this).call(this, props);
        this.lista_establecimientos = [];
        this.lista_cuestionarios = [];
        this.state = {
            folio: -1,
            nombre: "",
            asignados: []
        };

        this.obtener_establecimientos();
        this.obtener_cuestionarios();
    }

    _createClass(Cuestionario, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Caja_datos_select, { titulo: "Establecimiento",
                    icono: "glyphicon glyphicon-tasks",
                    seleccion: this.on_seleccion_establecimiento.bind(this),
                    opciones: this.opciones_establecimientos() }),
                React.createElement(
                    "div",
                    { className: "tabla_matriz" },
                    React.createElement(
                        "table",
                        { className: "table table-bordered" },
                        React.createElement(
                            "thead",
                            { className: "cavecera_tabla" },
                            React.createElement(
                                "tr",
                                { style: { 'background-color': 'rgb(114, 183, 235)', "z-index": "99" } },
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement("span", { className: "glyphicon glyphicon-list-alt" })
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Folio"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Cuestionario"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Estatus"
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            this.opciones_cuestionarios()
                        )
                    )
                )
            );
        }

        /**eventos**/
    }, {
        key: "on_seleccion_establecimiento",
        value: function on_seleccion_establecimiento(e) {
            this.setState({ folio: e.target.value });
            this.obtener_cuestionarios_establecimiento(e.target.value);
        }

        /**metodos**/
    }, {
        key: "agregar",
        value: function agregar(elemento) {
            if (this.state.folio > 0) {
                var lista = this.state.asignados;
                if (!lista.includes(elemento)) {
                    this.guardar_cuestionario(elemento.folio);
                    lista.push(elemento);
                } else {
                    var p = lista.findIndex(function (e) {
                        return e.folio === elemento.folio;
                    });
                    lista.splice(p, 1);
                    this.borrar_cuestionario(elemento.folio);
                }

                this.setState({ asignados: lista });
            } else alert("Seleccione Establecimiento!!!");
        }
    }, {
        key: "fecha_hoy",
        value: function fecha_hoy() {
            var d = new Date();
            var dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
            var mes = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
            return dia + '/' + mes + '/' + d.getFullYear();
        }

        /**conexiones**/
    }, {
        key: "obtener_establecimientos",
        value: function obtener_establecimientos() {
            var _this = this;

            conexion_api_2("servicios/checkListServ.asmx/buscar_establecimiento", function (respuesta) {
                _this.lista_establecimientos = respuesta.d;
                _this.setState({
                    folio: -1
                });
            });
        }
    }, {
        key: "obtener_cuestionarios",
        value: function obtener_cuestionarios() {
            var _this2 = this;

            conexion_api_2("servicios/checkListServ.asmx/nombres_cuestionarios", function (respuesta) {
                _this2.lista_cuestionarios = respuesta.d;
                _this2.setState({
                    folio: -1
                });
            });
        }
    }, {
        key: "obtener_cuestionarios_establecimiento",
        value: function obtener_cuestionarios_establecimiento(folio) {
            var _this3 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_R", {
                "id_establecimiento": folio, "fecha": this.fecha_hoy()
            }, function (respuesta) {
                var lista = [];
                respuesta.d.forEach(function (elemento, posicion) {
                    lista.push(_this3.lista_cuestionarios.find(function (e) {
                        return e.folio == elemento.id_cuestionario;
                    }));
                });

                _this3.setState({
                    asignados: lista
                });
            });
        }
    }, {
        key: "guardar_cuestionario",
        value: function guardar_cuestionario(folio) {
            var _this4 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_guardar", {
                "id_establecimiento": this.state.folio,
                "cuestionario": folio
            }, function (respuesta) {
                _this4.obtener_cuestionarios_establecimiento(_this4.state.folio);
            });
        }
    }, {
        key: "borrar_cuestionario",
        value: function borrar_cuestionario(folio) {
            var _this5 = this;

            conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_borrar", {
                "id_establecimiento": this.state.folio,
                "cuestionario": folio
            }, function (respuesta) {
                _this5.obtener_cuestionarios_establecimiento(_this5.state.folio);
            });
        }

        /**componentes**/
    }, {
        key: "opciones_establecimientos",
        value: function opciones_establecimientos() {
            return [React.createElement(
                "option",
                { value: "-1" },
                "Seleccione Establecimiento"
            ), this.lista_establecimientos.map(function (elemento) {
                return React.createElement(
                    "option",
                    { key: elemento.id_establecimiento, value: elemento.id_establecimiento },
                    elemento.nombre_establecimiento
                );
            })];
        }
    }, {
        key: "opciones_cuestionarios",
        value: function opciones_cuestionarios() {
            var _this6 = this;

            var checar = function checar(elemento) {
                return _this6.state.asignados.includes(elemento) ? "glyphicon glyphicon-check" : "glyphicon glyphicon-unchecked";
            };
            return this.lista_cuestionarios.map(function (e) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            _this6.agregar(e);
                        } },
                    React.createElement(
                        "td",
                        null,
                        React.createElement("span", { style: { "z-index": 0 }, className: checar(e) })
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.nom_cuestionario
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.estatus ? "Vigente" : "Cancelado"
                    )
                );
            });
        }
    }]);

    return Cuestionario;
})(React.Component);

ReactDOM.render(React.createElement(Cuestionario, null), document.getElementById("container"));

