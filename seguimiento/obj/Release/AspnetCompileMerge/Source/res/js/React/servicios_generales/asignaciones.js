"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Asignar = (function (_React$Component) {
    _inherits(Asignar, _React$Component);

    function Asignar(props) {
        _classCallCheck(this, Asignar);

        _get(Object.getPrototypeOf(Asignar.prototype), "constructor", this).call(this, props);
        //datos
        this.lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
        this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
        this.lista_aplicadores = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" }) || [];
        this.modal_activa = "";
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        this.cuerpo_tabla_modal = [];
        this.asignados_a_eliminar = [];
        this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento", {
            folio: this.lista_establecimientos[0].folio
        }) || [];
        this.cavecera_tabla_de_modal = [];
        this.titulo_modal = "";
        this.titulo_seleccion = "";
        this.posicion_seleccionado = 0;
        this.state = {
            edicion: false,
            nuevo: false,
            filtro_tabla_modal: "",
            folio: 0,
            folio_cuestionario: 0,
            cuestionario: "",
            folio_establecimiento: this.lista_establecimientos[0].folio,
            establecimiento: this.lista_establecimientos[0].nombre,
            estatus: "V",
            fecha: this.fecha_hoy(),
            fecha2: this.fecha_hoy(),
            id_aplicador: 0,
            aplicador: ""
        };
    }

    _createClass(Asignar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Botonera, { nuevo: this.nuevo.bind(this),
                    editar: this.editar.bind(this),
                    guardar: this.guardar.bind(this),
                    deshacer: this.deshacer.bind(this),
                    class_editar: this.state.edicion,
                    class_nuevo: this.state.nuevo }),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    this.componente_establecimiento(),
                    React.createElement(
                        "div",
                        { style: { "display": "inline-block", "margin-left": "20px" } },
                        React.createElement(
                            "div",
                            { style: { "width": "220px", "display": "inline-block" } },
                            React.createElement(Caja_datos_select, { icono: "glyphicon glyphicon-question-sign",
                                titulo: "Estatus",
                                seleccion: this.cambio_estatus.bind(this),
                                opciones: this.opciones_estatus() })
                        ),
                        React.createElement(
                            "label",
                            null,
                            React.createElement(Caja_fecha, { fecha: this.state.fecha,
                                evento: this.on_fecha.bind(this) }),
                            React.createElement(Caja_fecha, { fecha: this.state.fecha2,
                                evento: this.on_fecha2.bind(this) })
                        )
                    ),
                    React.createElement(
                        "div",
                        { style: { "width": "75%", "display": "inline-block", "margin-left": "20px" } },
                        React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                            titulo: "Cuestionario",
                            datos: this.state.cuestionario }),
                        React.createElement("i", { className: "glyphicon glyphicon-search",
                            "data-toggle": "modal", "data-target": "#modal_",
                            onClick: this.seleccionar_de_tabla_modal_cuestionario.bind(this) })
                    ),
                    React.createElement(
                        "div",
                        { style: { "width": "75%", "display": "inline-block", "margin-left": "20px" } },
                        React.createElement(Caja_datos, { icono: "glyphicon glyphicon-user",
                            titulo: "Aplicador",
                            datos: this.state.aplicador }),
                        React.createElement("i", { className: "glyphicon glyphicon-search",
                            "data-toggle": "modal", "data-target": "#modal_",
                            onClick: this.seleccionar_de_tabla_modal_aplicador.bind(this) })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "contenedor_dias" },
                    React.createElement(
                        "label",
                        { className: "checkbox-inline" },
                        React.createElement("input", { type: "checkbox", value: "" }),
                        "Domingo"
                    ),
                    React.createElement(
                        "label",
                        { className: "checkbox-inline" },
                        React.createElement("input", { type: "checkbox", value: "" }),
                        "Lunes"
                    ),
                    React.createElement(
                        "label",
                        { className: "checkbox-inline" },
                        React.createElement("input", { type: "checkbox", value: "" }),
                        "Martes"
                    ),
                    React.createElement(
                        "label",
                        { className: "checkbox-inline" },
                        React.createElement("input", { type: "checkbox", value: "" }),
                        "Miercoles"
                    ),
                    React.createElement(
                        "label",
                        { className: "checkbox-inline" },
                        React.createElement("input", { type: "checkbox", value: "" }),
                        "Jueves"
                    ),
                    React.createElement(
                        "label",
                        { className: "checkbox-inline" },
                        React.createElement("input", { type: "checkbox", value: "" }),
                        "Viernes"
                    ),
                    React.createElement(
                        "label",
                        { className: "checkbox-inline" },
                        React.createElement("input", { type: "checkbox", value: "" }),
                        "Sabado"
                    )
                ),
                this.boton_editar(),
                React.createElement(
                    "div",
                    { className: "tabla_matriz" },
                    React.createElement(Tabla, { cavecera: ["Cuestionario", "Departamento", "Evaluador", "Inicio", "Termino", "Estatus", ""],
                        datos: this.datos_cuestionarios() })
                ),
                React.createElement(Modal_con_tabla, { id: "modal_",
                    titulo_modal: this.titulo_modal,
                    icono_seleccion: "glyphicon glyphicon-edit",
                    titulo_seleccion: this.titulo_seleccion,
                    seleccionado: this.seleccion_tabla_modal.dato,
                    texto_filtro: this.state.filtro_tabla_modal,
                    evento_filtrar: this.on_filtro_tabla_modal.bind(this),
                    cavecera_tabla: this.cavecera_tabla_de_modal,
                    lista_tabla: this.cuerpo_tabla_modal,
                    guardar: this.seleccionar_de_tabla_modal.bind(this),
                    deshacer: this.des_seleccionar_de_tabla_modal.bind(this) })
            );
        }
    }, {
        key: "componente_establecimiento",
        value: function componente_establecimiento() {
            if (this.state.nuevo || !this.state.edicion) return React.createElement(
                "div",
                { style: { "width": "20%", "display": "inline-block", "margin-left": "20px" } },
                React.createElement(Caja_datos_select, { titulo: "",
                    icono: "glyphicon glyphicon-briefcase",
                    seleccion: this.on_seleccion_establecimiento.bind(this),
                    opciones: this.opciones_establecimientos() })
            );else return React.createElement(
                "div",
                { style: { "width": "20%", "display": "inline-block", "margin-left": "20px" } },
                React.createElement(
                    "h3",
                    null,
                    "Establecimiento : ",
                    this.state.establecimiento
                )
            );
        }
    }, {
        key: "boton_editar",
        value: function boton_editar() {
            if (this.state.edicion) return React.createElement("input", { type: "button", className: "btn btn-success btn-block", value: "Agregar", onClick: this.agregar_a_tabla.bind(this) });
        }

        //acciones de botonera
    }, {
        key: "nuevo",
        value: function nuevo() {
            console.log("nuevo");
            this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
            this.posicion_seleccionado = this.lista_cuestionarios_asignados.length;
            if (this.posicion_seleccionado == 0) this.setState({ folio: 0, edicion: true, nuevo: true });else alert(" El Establecimiento\n \"Ya Tiene Campos\"");
        }
    }, {
        key: "editar",
        value: function editar() {
            console.log("editar");
            this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
            this.posicion_seleccionado = this.lista_cuestionarios_asignados.length + 1;
            if (this.posicion_seleccionado > 1) this.setState({ edicion: true, nuevo: false });else alert("De En \"Nuevo\" \n ParaAgregar Datos Por Primera Vez!!!");
        }
    }, {
        key: "guardar",
        value: function guardar() {
            var _this = this;

            if (this.state.edicion) {
                if (this.lista_cuestionarios_asignados.length > 0) {
                    var validar_fecha;
                    var a;
                    var b;

                    (function () {
                        console.log("guardar");
                        //folio,folio_cuestionario,folio_establecimiento,id_usuario,inicio,termino,estatus
                        var datos_a_enviar = [];
                        validar_fecha = 0;

                        var datos_error = [];
                        var auxiliar = _this.lista_cuestionarios_asignados;

                        auxiliar.map(function (asignado) {
                            asignado.estatus = asignado.estatus == 'Cancelado' ? "C" : "V";
                            datos_a_enviar.push(asignado.folio + "," + asignado.folio_cuestionario + "," + _this.state.folio_establecimiento + "," + asignado.id_aplicador + ",'" + asignado.inicio + "','" + asignado.termino + "'," + asignado.estatus);
                            if (_this.fecha_hoy() > asignado.inicio && asignado.inicio < asignado.termino) {
                                datos_error.push(asignado.folio + "," + asignado.folio_cuestionario + "," + _this.state.folio_establecimiento + "," + asignado.id_aplicador + ",'" + asignado.inicio + "','" + asignado.termino + "'," + asignado.estatus);
                            }
                            return asignado;
                        });
                        console.log(datos_a_enviar);
                        console.log(_this.asignados_a_eliminar);
                        _this.asignados_a_eliminar.push(0);
                        console.log(validar_fecha);
                        //enviar datos
                        if (datos_error.length == 0) {
                            a = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_guardar_asignados_cuestionario", {
                                datos: datos_a_enviar,
                                eliminar: _this.asignados_a_eliminar
                            }) || [];

                            if (a.length > 0) {
                                b = "";

                                a.map(function (r) {
                                    b += r.respuesta + '\n';return r;
                                });
                                alert("Guardado...\n" + b);
                                console.log(a);
                                _this.deshacer();
                            }
                        } else {
                            alert("Falta Validar La fecha De Uno o mas Campos!!!");
                            console.log("Error:");
                            console.log(datos_error);
                        }
                    })();
                } else alert("Coloque Datos En La Tabla Para Guardar!!!");
            } else alert("Edicion \"desactivada\" ");
        }
    }, {
        key: "deshacer",
        value: function deshacer() {
            console.log("deshacer");
            this.setState({
                edicion: false,
                nuevo: false,
                filtro_tabla_modal: "",
                folio: 0,
                folio_cuestionario: 0,
                cuestionario: "",
                folio_establecimiento: this.lista_establecimientos[0].folio,
                establecimiento: this.lista_establecimientos[0].nombre,
                estatus: "V",
                fecha: this.fecha_hoy(),
                fecha2: this.fecha_hoy(),
                id_aplicador: 0,
                aplicador: ""
            });
            this.asignados_a_eliminar = [];
            this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento", {
                folio: this.lista_establecimientos[0].folio
            }) || [];
        }
    }, {
        key: "agregar_a_tabla",
        value: function agregar_a_tabla() {
            var _this2 = this;

            var estado = this.state.estatus == "C" ? "Cancelado" : "Vigente";
            // estado = !(this.fecha_hoy() >= this.state.fecha && this.fecha_hoy() <= this.state.fecha2 && this.state.estatus == "V") ? "Previo" : estado;
            console.log(this.state);
            console.log(this.fecha_hoy());
            console.log(this.checar_fecha());
            if (this.fecha_hoy() <= this.state.fecha && this.state.fecha <= this.state.fecha2 && this.checar_fecha()) {
                if (this.state.folio_cuestionario > 0 && this.state.id_aplicador > 0) {
                    console.log(this.posicion_seleccionado);
                    this.lista_cuestionarios_asignados[this.posicion_seleccionado] = {
                        folio: this.state.folio,
                        folio_cuestionario: this.state.folio_cuestionario,
                        cuestionario: this.state.cuestionario,
                        departamento: this.lista_cuestionarios.filter(function (e) {
                            return e.folio == _this2.state.folio_cuestionario;
                        })[0].departamento,
                        id_aplicador: this.state.id_aplicador,
                        aplicador: this.state.aplicador,
                        inicio: this.state.fecha,
                        termino: this.state.fecha2,
                        estatus: estado
                    };
                    console.log(this.lista_cuestionarios_asignados);
                    this.setState({
                        folio: 0,
                        folio_cuestionario: 0,
                        cuestionario: "",
                        estatus: "V",
                        fecha: this.fecha_hoy(),
                        fecha2: this.fecha_hoy(),
                        id_aplicador: 0,
                        aplicador: ""
                    });
                    this.posicion_seleccionado = this.lista_cuestionarios_asignados.length + 1;
                } else alert("Falta Seleccion Datos!!!");
            } else alert("Error En Las Fechas");
        }
    }, {
        key: "eliminar_de_tabla_datos_cuestionarios",
        value: function eliminar_de_tabla_datos_cuestionarios(dato) {
            if (this.state.edicion) {
                var posicion = this.lista_cuestionarios_asignados.indexOf(dato);
                console.log("Dato Eliminado De Posicion :" + posicion);
                this.lista_cuestionarios_asignados.splice(posicion, 1);

                this.setState({
                    filtro_tabla_modal: "",
                    folio_cuestionario: 0,
                    cuestionario: "",
                    estatus: "V",
                    fecha: this.fecha_hoy(),
                    fecha2: this.fecha_hoy(),
                    id_aplicador: 0,
                    aplicador: ""
                });

                this.posicion_seleccionado = this.lista_cuestionarios_asignados.length + 1;

                if (dato.folio > 0) this.asignados_a_eliminar.push(dato.folio);
                console.log(this.asignados_a_eliminar);
            } else alert("Edicion Deshabilitada!!!");
        }

        //eventos de modal globales
    }, {
        key: "seleccionar_de_tabla_modal",
        value: function seleccionar_de_tabla_modal() {
            if (this.modal_activa == "cuestionario") this.seleccionar_cuestionario();else if (this.modal_activa == "aplicador") {
                this.seleccionar_aplicador();
            }
        }
    }, {
        key: "des_seleccionar_de_tabla_modal",
        value: function des_seleccionar_de_tabla_modal() {
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
            this.setState({ filtro_tabla_modal: "" });
        }

        //eventos modal cuestionarios
    }, {
        key: "seleccion_cuestionario",
        value: function seleccion_cuestionario(cuestionario) {
            console.log(cuestionario);
            console.log(this.state);
            this.seleccion_tabla_modal = { folio: cuestionario.folio, dato: cuestionario.cuestionario };
            this.setState({ filtro_tabla_modal: "" });
        }
    }, {
        key: "seleccion_aplicador",
        value: function seleccion_aplicador(aplicador) {
            console.log(aplicador);
            console.log(this.state);
            this.seleccion_tabla_modal = { folio: aplicador.folio, dato: aplicador.nombre };
            this.setState({ filtro_tabla_modal: "" });
        }
    }, {
        key: "seleccionar_de_tabla_modal_cuestionario",
        value: function seleccionar_de_tabla_modal_cuestionario() {
            console.log("Seleccion Cuestionario");
            this.modal_activa = "cuestionario";
            this.titulo_modal = "Seleccion Cuestionario";
            this.titulo_seleccion = "Seleccion Cuestionario";
            this.cavecera_tabla_de_modal = ["folio", "Cuestionario", "Departamento", "Estatus"];
            this.crear_tabla_modal("");

            this.setState({ filtro_tabla_modal: "", folio_cuestionario: this.seleccion_tabla_modal.folio, cuestionario: this.seleccion_tabla_modal.dato });
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
        }
    }, {
        key: "seleccionar_de_tabla_modal_aplicador",
        value: function seleccionar_de_tabla_modal_aplicador() {
            console.log("Seleccion Aplicador");
            this.modal_activa = "aplicador";
            this.titulo_modal = "Seleccion Aplicador";
            this.titulo_seleccion = "Seleccion Aplicador";
            this.cavecera_tabla_de_modal = ["folio", "Nombre", "Puesto"];
            this.crear_tabla_modal("");

            this.setState({ filtro_tabla_modal: "" });
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
        }
    }, {
        key: "seleccionar_cuestionario",
        value: function seleccionar_cuestionario() {
            this.setState({ filtro_tabla_modal: "", folio_cuestionario: this.seleccion_tabla_modal.folio, cuestionario: this.seleccion_tabla_modal.dato });
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
        }
    }, {
        key: "seleccionar_aplicador",
        value: function seleccionar_aplicador() {
            this.setState({ filtro_tabla_modal: "", id_aplicador: this.seleccion_tabla_modal.folio, aplicador: this.seleccion_tabla_modal.dato });
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
        }

        //eventos de cambio ventana principal
    }, {
        key: "on_seleccion_establecimiento",
        value: function on_seleccion_establecimiento(e) {
            this.setState({
                folio_establecimiento: e.target.value,
                establecimiento: this.lista_establecimientos.filter(function (est) {
                    return est.folio == e.target.value;
                })[0].nombre
            });
            this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento", { folio: e.target.value });
        }
    }, {
        key: "on_fecha",
        value: function on_fecha(e) {
            var f = e.target.value.split("-");
            console.log(f);
            this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0] });
        }
    }, {
        key: "on_fecha2",
        value: function on_fecha2(e) {
            var f = e.target.value.split("-");
            console.log(f);
            this.setState({ fecha2: f[2] + "/" + f[1] + "/" + f[0] });
        }
    }, {
        key: "checar_fecha",
        value: function checar_fecha() {
            var estado = false;
            if (this.state.fecha != "undefined/undefined/") {
                if (this.state.fecha2 != "undefined/undefined/") {
                    estado = true;
                }
            }
            return estado;
        }
    }, {
        key: "cambio_estatus",
        value: function cambio_estatus(e) {
            this.setState({ estatus: e.target.value });
        }
    }, {
        key: "on_filtro_tabla_modal",
        value: function on_filtro_tabla_modal(e) {
            this.crear_tabla_modal(e.target.value);
            this.setState({ filtro_tabla_modal: e.target.value });
        }
    }, {
        key: "seleccionar_cuestionario_de_tabla",
        value: function seleccionar_cuestionario_de_tabla(cuestionario_seleccionado) {
            console.log(cuestionario_seleccionado);
            console.log(this.lista_cuestionarios_asignados);

            this.posicion_seleccionado = this.lista_cuestionarios_asignados.indexOf(this.lista_cuestionarios_asignados.filter(function (elemento) {
                return elemento == cuestionario_seleccionado;
            })[0]);
            console.log("posicion:" + this.posicion_seleccionado);
            this.setState({
                folio: cuestionario_seleccionado.folio,
                folio_cuestionario: cuestionario_seleccionado.folio_cuestionario,
                cuestionario: cuestionario_seleccionado.cuestionario,
                estatus: cuestionario_seleccionado.estatus == "C" ? "Cancelado" : "Vigente",
                fecha: cuestionario_seleccionado.inicio,
                fecha2: cuestionario_seleccionado.termino,
                id_aplicador: cuestionario_seleccionado.id_aplicador,
                aplicador: cuestionario_seleccionado.aplicador
            });
        }

        //funciones de datos
    }, {
        key: "crear_tabla_modal",
        value: function crear_tabla_modal(filtro) {
            if (this.modal_activa == "cuestionario") this.tabla_cuestionarios(filtro);else if (this.modal_activa == "aplicador") {
                this.tabla_aplicadores(filtro);
            }
        }
    }, {
        key: "fecha_hoy",
        value: function fecha_hoy() {
            var d = new Date();
            var dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
            var mes = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);

            return dia + '/' + mes + '/' + d.getFullYear();
        }

        //funciones de creacion de componentes
    }, {
        key: "opciones_estatus",
        value: function opciones_estatus() {
            return [React.createElement(
                "option",
                { selected: this.state.estatus == "V", value: "V" },
                "Vigente"
            ), React.createElement(
                "option",
                { selected: this.state.estatus == "C", value: "C" },
                "Cancelado"
            )];
        }
    }, {
        key: "opciones_establecimientos",
        value: function opciones_establecimientos() {
            var _this3 = this;

            var r = this.lista_establecimientos.map(function (e) {
                return React.createElement(
                    "option",
                    { selected: e.folio == _this3.state.folio_establecimiento, value: e.folio },
                    " ",
                    e.nombre
                );
            });
            return r;
        }

        //componentes de tablas
    }, {
        key: "tabla_cuestionarios",
        value: function tabla_cuestionarios(filtro) {
            var _this4 = this;

            var filtro_tabla = this.lista_cuestionarios.filter(function (elemento) {
                return elemento.cuestionario.toUpperCase().search(filtro.toUpperCase()) >= 0 && elemento.folio_establecimiento == _this4.state.folio_establecimiento;
            });
            console.log(filtro_tabla);
            console.log(this.state.folio_establecimiento);

            this.cuerpo_tabla_modal = filtro_tabla.map(function (e) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this4.seleccion_cuestionario(e);
                        } },
                    React.createElement(
                        "td",
                        null,
                        e.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.cuestionario
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.departamento
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.estatus == "V" ? "Vigente" : "Cancelado"
                    )
                );
            });
        }
    }, {
        key: "tabla_aplicadores",
        value: function tabla_aplicadores(filtro) {
            var _this5 = this;

            var filtro_tabla = this.lista_aplicadores.filter(function (elemento) {
                return elemento.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0;
            });
            this.cuerpo_tabla_modal = filtro_tabla.map(function (e) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            _this5.seleccion_aplicador(e);
                        } },
                    React.createElement(
                        "td",
                        null,
                        e.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.puesto
                    )
                );
            });
        }
    }, {
        key: "datos_cuestionarios",
        value: function datos_cuestionarios() {
            var _this6 = this;

            console.log("Asignados");
            var r = this.lista_cuestionarios_asignados.map(
            //
            function (e) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            _this6.seleccionar_cuestionario_de_tabla(e);
                        } },
                    React.createElement(
                        "td",
                        null,
                        e.cuestionario
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.departamento
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.aplicador
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.inicio
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.termino
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.estatus
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("i", { className: "glyphicon glyphicon-remove red", onClick: function () {
                                _this6.eliminar_de_tabla_datos_cuestionarios(e);
                            } })
                    )
                );
            });
            return r;
        }
    }]);

    return Asignar;
})(React.Component);

ReactDOM.render(React.createElement(Asignar, null), document.getElementById("contenedor"));

