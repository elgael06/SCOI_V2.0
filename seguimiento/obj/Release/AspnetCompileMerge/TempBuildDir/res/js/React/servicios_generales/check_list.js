"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Check_list = (function (_React$Component) {
    _inherits(Check_list, _React$Component);

    function Check_list(props) {
        _classCallCheck(this, Check_list);

        _get(Object.getPrototypeOf(Check_list.prototype), "constructor", this).call(this, props);
        //datos
        this.lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
        this.lista_datos_cuestionario = [];
        this.asignacion_seleccionada = [];
        this.lista_zonas_por_asignacion = [];
        this.lista_datos_por_zona = [];
        this.lista_responsables = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" }) || [];
        this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento", {
            folio: this.lista_establecimientos[0].folio
        }) || [];

        this.lista_servicios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_detalles_ckl") || [];
        this.lista_servicios_por_cuestionario = [];
        this.lista_datos_cuestionario = [];
        this.nombre_cuestionario = "";
        this.filtro_responsable = "";
        this.responsable_tienda = "";
        //modal
        this.titulo_modal = "";
        this.titulo_seleccion = "";
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        this.cavecera_tabla_de_modal = [""];
        this.cuerpo_tabla_modal = [];
        //eventos
        //estados
        this.state = {
            folio_establecimiento: this.lista_establecimientos[0].folio,
            establecimiento: this.lista_establecimientos[0].nombre,
            id_cuestionario: 0,
            cuestionario: "",
            folio_asignacion: 0,
            id_responsable: 0,
            responsable: "",
            filtro_tabla_responsable_modal: "",
            evaluando: false,
            seleccion_zona: { folio: 0, nombre: "" }
        };
        this.lista_observaciones = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_ver_observaciones_por_activo", {
            asignacion: this.state.folio_asignacion,
            folio_zona: this.state.seleccion_zona.folio
        }) || [];
        //tablas
        this.cavecera_tabla_principal = ["Folio", "Cuestionario", "Departamento", "Evaluador", "Inicio", "Termino", "Estatus"];
        this.tabla_principal = this.datos_cuestionarios();
    }

    /********************************modal cuestionario**/

    _createClass(Check_list, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { style: { "width": "30%", "display": "inline-block", "margin-left": "20px" } },
                    React.createElement(Caja_datos_select, { titulo: "",
                        icono: "glyphicon glyphicon-briefcase",
                        seleccion: this.on_seleccion_establecimiento.bind(this),
                        opciones: this.opciones_establecimientos() })
                ),
                React.createElement(
                    "div",
                    { style: { "width": "60%", "display": "inline-block", "margin-left": "20px" } },
                    React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                        titulo: "Cuestionario",
                        datos: this.state.cuestionario })
                ),
                this.seleccion_responsable_boton(),
                this.boton_evaluar(),
                React.createElement(
                    "div",
                    { className: "tabla_matriz" },
                    React.createElement(Tabla, { cavecera: this.cavecera_tabla_principal,
                        datos: this.tabla_principal })
                ),
                React.createElement(Modal_con_tabla, { id: "modal_",
                    titulo_modal: this.titulo_modal,
                    icono_seleccion: "glyphicon glyphicon-edit",
                    titulo_seleccion: this.titulo_seleccion,
                    seleccionado: this.seleccion_tabla_modal.dato,
                    texto_filtro: this.state.filtro_tabla_responsable_modal,
                    evento_filtrar: this.on_filtro_tabla_modal.bind(this),
                    cavecera_tabla: this.cavecera_tabla_de_modal,
                    lista_tabla: this.cuerpo_tabla_modal,
                    guardar: this.seleccionar_de_tabla_modal.bind(this),
                    deshacer: this.des_seleccionar_de_tabla_modal.bind(this) }),
                React.createElement(Modal_cuestionario, { zona: this.state.seleccion_zona,
                    datos_zona: this.lista_datos_por_zona,
                    establecimiento: this.state.establecimiento,
                    folio_establecimiento: this.state.folio_establecimiento,
                    asignacion: this.state.folio_asignacion,
                    departamento: this.state.departamento,
                    responsable: this.state.id_responsable,
                    lista_observacion: this.lista_observaciones,
                    cuestionario: this.state.id_cuestionario })
            );
        }

        //
    }, {
        key: "seleccionar_de_tabla_modal",
        value: function seleccionar_de_tabla_modal() {
            console.log(this.seleccion_tabla_modal);
            this.setState({
                id_responsable: this.seleccion_tabla_modal.folio,
                responsable: this.seleccion_tabla_modal.dato
            });
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
        }
    }, {
        key: "des_seleccionar_de_tabla_modal",
        value: function des_seleccionar_de_tabla_modal() {}
    }, {
        key: "on_filtro_tabla_modal",
        value: function on_filtro_tabla_modal(e) {
            this.cuerpo_tabla_modal = this.datos_responsables(e.target.value);
            this.setState({ filtro_tabla_responsable_modal: e.target.value });
        }
    }, {
        key: "on_seleccion_establecimiento",
        value: function on_seleccion_establecimiento(e) {
            this.nombre_cuestionario = "";
            this.cavecera_tabla_principal = ["Folio", "Cuestionario", "Departamento", "Evaluador", "Inicio", "Termino", "Estatus"];
            var posicionest = this.lista_establecimientos.filter(function (est) {
                return est.folio == e.target.value;
            })[0];
            console.log(e.target.value);
            this.cambio_vistas_servicios(e.target.value);
            this.setState({
                id_cuestionario: 0,
                cuestionario: "",
                folio_asignacion: 0,
                id_responsable: 0,
                responsable: "",
                filtro_tabla_responsable_modal: "",
                folio_establecimiento: e.target.value,
                establecimiento: posicionest.nombre,
                evaluando: false,
                seleccion_zona: { folio: 0, nombre: "" }
            });
        }
    }, {
        key: "on_seleccionar_cuestionario_de_tabla",
        value: function on_seleccionar_cuestionario_de_tabla(cuestionario_seleccionado) {
            console.log(cuestionario_seleccionado);
            if (cuestionario_seleccionado.id_aplicador == ID_SCOI) {
                this.cavecera_tabla_principal = ["Folio", "Cuestionario", "Departamento", "Evaluador", "Inicio", "Termino", "Estatus"];
                this.asignacion_seleccionada = cuestionario_seleccionado;
                this.setState({
                    id_cuestionario: cuestionario_seleccionado.folio_cuestionario,
                    cuestionario: cuestionario_seleccionado.cuestionario,
                    folio_asignacion: cuestionario_seleccionado.folio,
                    departamento: cuestionario_seleccionado.departamento
                });
            } else alert("Cuestionario No Seleccionable Por Usuario!!!");
        }
    }, {
        key: "on_seleccionar_de_tabla_modal_responsable",
        value: function on_seleccionar_de_tabla_modal_responsable() {
            console.log("Responsable...");
            this.titulo_modal = " Seleccion De Responsable Tienda";
            this.titulo_seleccion = "Responsable Tienda : ";
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
            this.cavecera_tabla_de_modal = ["Folio", "Nombre", "Puesto"];
            this.cuerpo_tabla_modal = this.datos_responsables("");
            this.setState({ filtro_tabla_responsable_modal: "" });
        }
    }, {
        key: "seleccion_responsable_de_modal",
        value: function seleccion_responsable_de_modal(responsable) {
            console.log(responsable);
            this.seleccion_tabla_modal = { folio: responsable.folio, dato: responsable.nombre };
            this.cuerpo_tabla_modal = this.datos_responsables("");
            this.setState({ filtro_tabla_responsable_modal: "" });
        }

        //
    }, {
        key: "fecha_hoy",
        value: function fecha_hoy() {
            var d = new Date();
            var dia = d.getDate() > 9 ? d.getDate() : 0 + d.getDate();
            var mes = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);

            return dia + '/' + mes + '/' + d.getFullYear();
        }
    }, {
        key: "fechas_vigentes",
        value: function fechas_vigentes(estatus) {
            console.log("Estatus : " + estatus);
            if (estatus == "Vigente") {
                console.log("fecha Vigente");
                return true;
            }
            console.log("Fuera De Rango De Fecha!!!");
            return false;
        }
    }, {
        key: "cambio_vistas_servicios",
        value: function cambio_vistas_servicios(folio_establecimiento) {
            this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento", {
                folio: folio_establecimiento
            }) || [];
            this.lista_zonas_por_asignacion = [];
            console.log(this.lista_cuestionarios_asignados);
            this.tabla_principal = this.datos_cuestionarios();
        }
    }, {
        key: "motrar_datos_evaluacion_curso",
        value: function motrar_datos_evaluacion_curso() {
            if (this.fechas_vigentes(this.asignacion_seleccionada.estatus)) {
                if (this.state.id_responsable != ID_SCOI) {
                    console.log("Asignacion " + this.state.folio_asignacion);
                    this.lista_zonas_por_asignacion = conexion_ajax("servicios/servicios_generales/conexiones.asmx/obtener_zonas_por_asignacion", { folio: this.state.folio_asignacion });
                    console.log(this.state.id_cuestionario);
                    console.log(this.lista_datos_cuestionario);
                    console.log(this.lista_zonas_por_asignacion);
                    this.datos_zonas_cuestionarios();
                    this.setState({ filtro_tabla_responsable_modal: "", evaluando: true });
                } else alert("Usuario Aplicador Y Usuario Responsable\n Son La Misma Persona!!!");
            } else alert("Fuera De Rango De Fecha !!!");
        }

        //
    }, {
        key: "opciones_establecimientos",
        value: function opciones_establecimientos() {
            var _this = this;

            var r = this.lista_establecimientos.map(function (e) {
                return React.createElement(
                    "option",
                    { selected: e.folio == _this.state.folio_establecimiento, value: e.folio },
                    " ",
                    e.nombre
                );
            });
            return r;
        }
    }, {
        key: "boton_evaluar",
        value: function boton_evaluar() {
            if (this.state.id_responsable > 0 && this.state.id_cuestionario) return React.createElement("input", { type: "button", className: "btn btn-success btn-block",
                value: "Iniciar Evaluacion De Cuestionario.",
                onClick: this.motrar_datos_evaluacion_curso.bind(this) });
        }
    }, {
        key: "seleccion_responsable_boton",
        value: function seleccion_responsable_boton() {
            var input = [React.createElement(Caja_datos, { icono: "glyphicon glyphicon-user",
                titulo: "Responsable",
                datos: this.state.responsable })];
            if (this.state.evaluando === false) {
                input.push(React.createElement("i", { className: "glyphicon glyphicon-search",
                    "data-toggle": "modal", "data-target": "#modal_",
                    onClick: this.on_seleccionar_de_tabla_modal_responsable.bind(this) }));
            }
            return React.createElement(
                "div",
                { style: { "width": "90%", "display": "inline-block", "margin-left": "20px" } },
                input
            );
        }
    }, {
        key: "datos_cuestionarios",
        value: function datos_cuestionarios() {
            var _this2 = this;

            console.log("Asignados");
            var r = this.lista_cuestionarios_asignados.map(
            //
            function (e) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            _this2.on_seleccionar_cuestionario_de_tabla(e);
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
                    )
                );
            });
            return r;
        }
    }, {
        key: "datos_zonas_cuestionarios",
        value: function datos_zonas_cuestionarios() {
            var _this3 = this;

            this.cavecera_tabla_principal = ["Zonas De Evaluacion : "];
            console.log("Zonas");
            this.tabla_principal = this.lista_zonas_por_asignacion.map(function (zona) {
                return React.createElement("input", { type: "button",
                    className: "btn btn-info btn-block btn-zonas",
                    "data-toggle": "modal", "data-target": "#moda_ckl",
                    value: zona.nombre || 'indefinida', onClick: function () {
                        return _this3.mostrar(zona);
                    } });
            });
        }
    }, {
        key: "motrar_responsables",
        value: function motrar_responsables() {
            console.log(this.state.id_responsable + "=>" + this.state.responsable);
        }
    }, {
        key: "datos_responsables",
        value: function datos_responsables(filtro) {
            var _this4 = this;

            var filtro_tabla = this.lista_responsables.filter(function (elemento) {
                return elemento.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0 || elemento.puesto.toUpperCase().search(filtro.toUpperCase()) >= 0;
            });
            return filtro_tabla.map(function (item) {
                if (item.id_aplicador != parseInt(ID_SCOI)) return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this4.seleccion_responsable_de_modal(item);
                        } },
                    React.createElement(
                        "td",
                        null,
                        item.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        item.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        item.puesto
                    )
                );else console.log(item.id_aplicador);
            });
        }
    }, {
        key: "mostrar",
        value: function mostrar(zona) {
            console.log("Folio Zona : " + zona.folio + "," + zona.nombre);
            this.lista_datos_por_zona = conexion_ajax("servicios/servicios_generales/conexiones.asmx/obtener_resultados_cuestionarios_asignados_zona", { asignacion: this.state.folio_asignacion, zona: zona.folio });
            console.log(this.state.id_cuestionario);
            console.log(this.lista_datos_por_zona);
            this.lista_observaciones = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_ver_observaciones_por_activo", {
                asignacion: this.state.folio_asignacion,
                folio_zona: zona.folio
            }) || [];
            this.setState({ seleccion_zona: zona });
        }
    }]);

    return Check_list;
})(React.Component);

var Modal_cuestionario = (function (_React$Component2) {
    _inherits(Modal_cuestionario, _React$Component2);

    function Modal_cuestionario(props) {
        _classCallCheck(this, Modal_cuestionario);

        _get(Object.getPrototypeOf(Modal_cuestionario.prototype), "constructor", this).call(this, props);
        this.lista_observaciones = [];
        this.activo = { folio: 0, nombre: "", criterio: "", orden: 0 };
        this.componentes_observaciones = this.datos_observaciones();
        this.lista_servicios_por_cuestionario = [];
        this.state = {
            posicion: -1,
            cantidad_obs: 0,
            texto_observacion: ""
        };
    }

    /************************modal  solicitud de servicio********/

    _createClass(Modal_cuestionario, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            this.lista_observaciones = this.lista_observaciones.length == 0 ? this.props.lista_observacion : this.lista_observaciones;
            var est = { folio: this.props.folio_establecimiento, nombre: this.props.establecimiento };
            var titulo = React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    null,
                    this.props.establecimiento
                ),
                React.createElement(
                    "h5",
                    null,
                    "Zona : ",
                    this.props.zona.nombre,
                    "."
                )
            );
            return React.createElement(
                "div",
                null,
                React.createElement(Modal, { cavecera: titulo,
                    cuerpo: this.cuerpo_modal(),
                    id: "moda_ckl",
                    cerrar: this.on_deshacer.bind(this) }),
                React.createElement(Enviar_servicio_moda, { departamento: this.props.departamento,
                    establecimiento: est,
                    activo: this.activo,
                    servicios: this.lista_servicios_por_cuestionario,
                    on_guardar: function () {
                        return _this5.responder("NO");
                    } })
            );
        }
    }, {
        key: "cuerpo_modal",
        value: function cuerpo_modal() {
            return React.createElement(
                "div",
                null,
                React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                    titulo: "Activo",
                    datos: this.activo.nombre }),
                React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                    titulo: "Criterio",
                    datos: this.activo.criterio }),
                this.componente_evaluacion(),
                this.componente_observaciones(),
                React.createElement(
                    "div",
                    { className: "tabla_cuestiones" },
                    React.createElement(Tabla, { cavecera: ["#", "Activo A Inspeccionar", "Evaluacion"],
                        datos: this.datos_tabla() })
                ),
                React.createElement("input", { type: "button",
                    className: "btn btn-success btn-block",
                    value: "Guardar Evaluacion",
                    onClick: this.on_guardar_resultados_cuestionario.bind(this)
                })
            );
        }
    }, {
        key: "on_guardar_resultados_cuestionario",
        value: function on_guardar_resultados_cuestionario() {
            var _this6 = this;

            console.log("Guardar...");
            console.log(this.props.datos_zona);
            console.log(this.lista_observaciones);
            var lista_guargar = [];
            var lista_descripcion = [];
            this.props.datos_zona.forEach(function (elemento, posicion) {
                if (elemento.solucion != "  ") {
                    _this6.lista_observaciones.forEach(function (item) {
                        if (elemento.folio_activo == item.folio) lista_descripcion.push([posicion, item.observacion]);
                    });
                    lista_guargar.push(elemento.folio_resultado + "," + _this6.props.asignacion + "," + elemento.folio_activo + "," + elemento.folio_criterio + ",'" + elemento.solucion + "'," + ID_SCOI + "," + _this6.props.responsable);
                }
            });
            if (lista_guargar.length == this.props.datos_zona.length) {
                console.log(lista_guargar);
                console.log(lista_descripcion);
                var a = conexion_ajax("servicios/servicios_generales/conexiones.asmx/guardar_resultados_cuestionarios_asignados_zona", {
                    datos_cuestionario: lista_guargar,
                    observaciones: lista_descripcion
                });
                alert("Guardado...");
                this.on_deshacer();
                console.log(a);
            } else alert("Datos incompletos!!!");
        }
    }, {
        key: "on_deshacer",
        value: function on_deshacer() {
            console.log("Deshacer");
            this.lista_observaciones = [];
            this.activo = { folio: 0, nombre: "", criterio: "", orden: 0 };
            this.componentes_observaciones = this.datos_observaciones();
            this.lista_servicios_por_cuestionario = [];
            this.setState({
                posicion: -1,
                cantidad_obs: 0,
                texto_observacion: ""
            });
        }
    }, {
        key: "on_tabla_activo",
        value: function on_tabla_activo(elemento, pos) {
            console.log(elemento);
            this.activo = { folio: elemento.folio_activo, nombre: elemento.detalle_activo, criterio: elemento.detalle_criterio, orden: elemento.orden };
            console.log("Posicion : " + pos);
            this.componentes_observaciones = this.datos_observaciones();
            this.setState({ posicion: pos });
        }
    }, {
        key: "texto_observaciones",
        value: function texto_observaciones(e) {
            this.setState({ texto_observacion: e.target.value });
        }
    }, {
        key: "agregar_observacion",
        value: function agregar_observacion() {
            if (this.state.texto_observacion && this.activo.folio > 0) {
                this.lista_observaciones.push({
                    folio: this.activo.folio,
                    observacion: this.state.texto_observacion
                });
                console.log({
                    folio: this.activo.folio,
                    observacion: this.state.texto_observacion
                });
                this.componentes_observaciones = this.datos_observaciones();
                this.setState({ texto_observacion: "" });
            } else alert("Coloque Texto En El Campo!!!");
        }
    }, {
        key: "eliminar_observaciones",
        value: function eliminar_observaciones(obs) {
            var posicion = this.lista_observaciones.indexOf(obs);
            this.lista_observaciones.splice(posicion, 1);
            this.componentes_observaciones = this.datos_observaciones();
            this.setState({ cantidad_obs: this.lista_observaciones.length });
        }

        //
    }, {
        key: "seleccion_icono_res",
        value: function seleccion_icono_res(res) {
            var clase = "glyphicon glyphicon-question-sign";
            if (res == "SI") clase = "glyphicon glyphicon-ok-sign";else if (res == "NO") clase = "glyphicon glyphicon-remove-sign";else if (res == "NA") clase = "glyphicon glyphicon-minus-sign";
            return clase;
        }
    }, {
        key: "get_servicios",
        value: function get_servicios() {
            this.lista_servicios_por_cuestionario = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_por_orden_activo_ckl", {
                cuestionario: this.props.cuestionario,
                orden: this.activo.orden
            }) || [];
            this.setState({ texto_observacion: "" });
        }
    }, {
        key: "responder",
        value: function responder(res) {
            console.log(res);
            var p = this.state.posicion;
            if (p > -1) {
                this.props.datos_zona[p].solucion = res;
                this.setState({ posicion: p });
            } else alert("Seleccione Un Activo!!!");
        }

        //
    }, {
        key: "componente_evaluacion",
        value: function componente_evaluacion() {
            var _this7 = this;

            var p = this.state.posicion;
            if (p > -1) {
                return React.createElement(
                    "div",
                    { className: "botonera_respuesta", style: { "text-align": "center" } },
                    React.createElement("span", { title: "SI", className: this.seleccion_icono_res("SI"),
                        onClick: function () {
                            return _this7.responder("SI");
                        } }),
                    React.createElement("span", { title: "NO", className: this.seleccion_icono_res("NO"),
                        "data-toggle": "modal", "data-target": "#moda_servicios",
                        onClick: function () {
                            return _this7.get_servicios();
                        }
                    }),
                    React.createElement("span", { title: "NA", className: this.seleccion_icono_res("NA"),
                        onClick: function () {
                            return _this7.responder("NA");
                        } })
                );
            }
        }
    }, {
        key: "componente_observaciones",
        value: function componente_observaciones() {
            var tit = React.createElement(
                "p",
                { style: { "font-size": "15px", "display": "inline-block", "margin-bottom": "0" } },
                "Observaciones  "
            );
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    React.createElement(Botones_dropdown, { titulo: tit,
                        opciones_menu: this.componentes_observaciones })
                ),
                React.createElement("input", { type: "text", style: { "width": "70%", "display": "inline-block" },
                    className: "form-control", placeholder: "Agregar Observaciones",
                    value: this.state.texto_observacion,
                    onChange: this.texto_observaciones.bind(this) }),
                React.createElement("i", { className: "glyphicon glyphicon-plus-sign blue",
                    style: { "display": "inline-block", "font-size": "30px", "margin-left": "10px" },
                    onClick: this.agregar_observacion.bind(this) })
            );
        }
    }, {
        key: "datos_observaciones",
        value: function datos_observaciones() {
            var _this8 = this;

            return this.lista_observaciones.map(function (elemento) {
                console.log(elemento.folio + ":" + _this8.activo.folio);
                if (elemento.folio == _this8.activo.folio) {
                    return React.createElement(
                        "div",
                        { style: { 'height': '30px' }, key: elemento.folio },
                        elemento.observacion,
                        React.createElement("section", { className: "glyphicon glyphicon-remove close",
                            onClick: function () {
                                _this8.eliminar_observaciones(elemento);
                            } })
                    );
                }
            });
        }
    }, {
        key: "datos_tabla",
        value: function datos_tabla() {
            var _this9 = this;

            return this.props.datos_zona.map(function (elemento, posicion) {
                var clase = _this9.seleccion_icono_res(elemento.solucion);
                return React.createElement(
                    "tr",
                    { title: elemento.detalle_criterio, onClick: function () {
                            return _this9.on_tabla_activo(elemento, posicion);
                        } },
                    React.createElement(
                        "td",
                        null,
                        posicion + 1
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "h4",
                            null,
                            "Activo : ",
                            elemento.detalle_activo
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Criterio : ",
                            elemento.detalle_criterio
                        )
                    ),
                    React.createElement(
                        "td",
                        { style: { 'width': '50px' } },
                        React.createElement("span", { className: clase })
                    )
                );
            });
        }
    }]);

    return Modal_cuestionario;
})(React.Component);

var Enviar_servicio_moda = (function (_React$Component3) {
    _inherits(Enviar_servicio_moda, _React$Component3);

    function Enviar_servicio_moda(props) {
        _classCallCheck(this, Enviar_servicio_moda);

        _get(Object.getPrototypeOf(Enviar_servicio_moda.prototype), "constructor", this).call(this, props);
        this.lista_Prioridades = conexion_ajax("servicios/servicios_generales/conexiones.asmx/obtener_lista_prioridades") || [];
        this.lista_servicios_cuestionario = [];
        this.state = {
            descripcion: "",
            servicio: { folio: 1, nombre: "" },
            prioridad: this.lista_Prioridades[0].folio
        };
    }

    _createClass(Enviar_servicio_moda, [{
        key: "render",
        value: function render() {
            this.titulo = React.createElement(
                "div",
                null,
                React.createElement(
                    "h5",
                    null,
                    "Descripcio De La Solisitud Del Servicio."
                ),
                "Establecimiento : ",
                this.props.establecimiento.nombre,
                "."
            );
            return React.createElement(Modal, { cavecera: this.titulo,
                cuerpo: this.cuerpo_modal(),
                id: "moda_servicios",
                cerrar: this.props.on_deshacer });
        }
    }, {
        key: "cuerpo_modal",
        value: function cuerpo_modal() {
            return React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                    "label",
                    null,
                    "Activo : ",
                    this.props.activo.nombre
                ),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    "Prioridad : "
                ),
                React.createElement(
                    "select",
                    { className: "form-control", onChange: this.on_prioridad.bind(this) },
                    this.datos_prioridades()
                ),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    "Describa el Detalle Del Servicio Solicitado"
                ),
                React.createElement("textarea", { style: { "resize": "none" }, value: this.state.descripcion,
                    onChange: this.on_cambiar_detalle.bind(this),
                    placeholder: "Describa Claramente El Detalle Del Servicio Solisitado",
                    wrap: "soft",
                    characters: "on",
                    className: "form-control", rows: "3" }),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "tabla_matriz" },
                    React.createElement(Tabla, { cavecera: ["", "Folio", "Servicio", "Descripcion"],
                        datos: this.datos_servicios() })
                ),
                React.createElement("input", { type: "button",
                    value: "Guardar.",
                    "data-dismiss": "modal",
                    className: "btn btn-success btn-block",
                    onClick: this.on_enviar_servicio.bind(this) })
            );
        }
    }, {
        key: "on_prioridad",
        value: function on_prioridad(e) {
            console.log(e.target.value);
            this.setState({ prioridad: e.target.value });
        }
    }, {
        key: "on_cambiar_detalle",
        value: function on_cambiar_detalle(e) {
            this.setState({ descripcion: e.target.value });
        }
    }, {
        key: "on_enviar_servicio",
        value: function on_enviar_servicio() {
            if (this.state.servicio.folio > 0 && this.state.descripcion != "" && this.state.prioridad) {
                this.props.on_guardar();
                var datos_consulta = this.state.servicio.folio + "," + this.props.activo.folio + ",'" + this.state.descripcion + "'," + this.state.prioridad + "," + this.props.departamento + "," + this.props.establecimiento.folio + "," + ID_SCOI + ",'" + IP_CLIENTE + "'";
                console.log(datos_consulta);
                var folio = conexion_ajax("servicios/servicios_generales/conexiones.asmx/enviar_solicitud_servicio", { datos: datos_consulta });
                if (folio > 0) alert("Guardado...\n" + "Folio : " + folio);
            } else alert("Datos Incompletos...\nCancelado!!!");

            this.setState({
                escripcion: "",
                servicio: { folio: 1, nombre: "" },
                prioridad: this.lista_Prioridades[0].folio
            });
        }

        //
    }, {
        key: "datos_prioridades",
        value: function datos_prioridades() {
            var _this10 = this;

            return this.lista_Prioridades.map(function (elemento) {
                return React.createElement(
                    "option",
                    { value: elemento.folio, selected: elemento.folio == _this10.state.prioridad },
                    elemento.nombre
                );
            });
        }
    }, {
        key: "datos_servicios",
        value: function datos_servicios() {
            var _this11 = this;

            this.lista_servicios_cuestionario;
            return this.props.servicios.map(function (elemento) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement("input", { type: "checkbox",
                            onClick: function () {
                                return _this11.checar_servicio_seleccionado(elemento);
                            },
                            checked: _this11.state.servicio.folio == elemento.folio
                        })
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        elemento.detalle
                    )
                );
            });
        }
    }, {
        key: "checar_servicio_seleccionado",
        value: function checar_servicio_seleccionado(elemento) {
            this.setState({ servicio: elemento });
        }
    }]);

    return Enviar_servicio_moda;
})(React.Component);

ReactDOM.render(React.createElement(Check_list, null), document.getElementById("contenedor"));

