"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Servicios = (function (_React$Component) {
    _inherits(Servicios, _React$Component);

    function Servicios(props) {
        _classCallCheck(this, Servicios);

        _get(Object.getPrototypeOf(Servicios.prototype), "constructor", this).call(this, props);

        //datos
        this.lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
        this.lista_departamentos = conexion_ajax("servicios/servicios_generales/conexiones.asmx/departamentos") || [];
        this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
        this.lista_departamentos_aplica_cuestionario = conexion_ajax("servicios/servicios_generales/conexiones.asmx/departamentos") || [];
        this.lista_datos_cuestionario = [];
        this.servicios_seleccionados = [{ folio_zona: 1, orden: 1, folio_servicio: 0 }];
        this.seleccionado_filtro = [];
        this.lista_servicios_nombre = [];
        //tablas
        this.cavecera_tabla_cuestionarios = ["Folio", "Cuestionario", "Zona", "Establecimiento", "modificacion", "Estatus", ""];
        this.cavecera_tabla_datos_cuestionario = ["#", "ZONA", "ACTIVO", "CRITERIO", "SERVICIO", ""];
        //modal
        this.titulo_modal = "";
        this.titulo_sel_modal = "";
        this.cavecera_tabla_modal = [];
        this.cuerpo_tabla_modal = [];
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        //eventos
        this.nuevo = this.on_nuevo.bind(this);
        this.editar = this.on_editar.bind(this);
        this.guardar = this.on_guardar.bind(this);
        this.deshacer = this.on_deshacer.bind(this);
        this.on_cuestionario = this.on_click_cuestionario.bind(this);
        this.cambio_estatus = this.on_cambio_estatus.bind(this);
        this.cambio_departamento = this.on_cambio_departamento.bind(this);
        this.seleccion_establecimiento = this.on_seleccion_establecimiento.bind(this);

        //estados
        this.state = {
            id_cuestionario: 0,
            cuestionario: "",
            estatus: "V",
            id_departamento_aplica_cuestionario: -1,
            edicion: false,
            nuevo: false,
            departamento: 0,
            establecimiento: 0,
            id_zona: 0,
            id_activo: 0,
            id_criterio: 0,
            id_servicio: 0,
            filtro_tabla_modal: "",
            modal_activa: "",
            fila_tabla_seleccionada: null
        };

        this.nom_Zona = "";
        this.nom_activo = "";
        this.nom_criterio = "";
        this.nom_servicio = "";
        this.nom_servicio_detalle = "";
    }

    _createClass(Servicios, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Botonera, { nuevo: this.nuevo,
                    editar: this.editar,
                    guardar: this.guardar,
                    deshacer: this.deshacer,
                    class_editar: this.state.edicion,
                    class_nuevo: this.state.nuevo
                }),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    React.createElement(
                        "div",
                        { style: { "width": "700px", "display": "inline-block", "margin-left": "20px" } },
                        React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                            titulo: "Cuestionario",
                            datos: this.state.cuestionario,
                            evento: this.on_cuestionario })
                    ),
                    React.createElement(
                        "div",
                        { style: { "width": "250px", "display": "inline-block", "margin-left": "20px" } },
                        React.createElement(Caja_datos_select, { icono: "glyphicon glyphicon-question-sign",
                            titulo: "Estatus",
                            seleccion: this.cambio_estatus,
                            opciones: this.opciones_estatus() })
                    ),
                    React.createElement(
                        "div",
                        { style: { "width": "350px", "display": "inline-block", "margin-left": "20px" } },
                        React.createElement(Caja_datos_select, { icono: "glyphicon glyphicon-question-sign",
                            titulo: "Departamento Aplica",
                            seleccion: this.cambio_departamento_aplica_cuestionario.bind(this),
                            opciones: this.opciones_departamentos_aplica_cuestionario() })
                    )
                ),
                React.createElement(
                    "label",
                    null,
                    this.seleccion_zona_establecimiento()
                ),
                this.seleccion_tabla(),
                React.createElement(Modal_con_tabla, { id: "modal_",
                    titulo_modal: this.titulo_modal,
                    icono_seleccion: "glyphicon glyphicon-edit",
                    titulo_seleccion: this.titulo_sel_modal,
                    seleccionado: this.seleccion_tabla_modal.dato,
                    texto_filtro: this.state.filtro_tabla_modal,
                    evento_filtrar: this.on_filtro_tabla_modal.bind(this),
                    cavecera_tabla: this.cavecera_tabla_modal,
                    lista_tabla: this.cuerpo_tabla_modal,
                    guardar: this.seleccionar_de_tabla_modal.bind(this),
                    deshacer: this.des_seleccionar_de_tabla_modal.bind(this)
                })
            );
        }
    }, {
        key: "seleccion_zona_establecimiento",
        value: function seleccion_zona_establecimiento() {
            var _this = this;

            var cuest = this.lista_cuestionarios.filter(function (d) {
                return d.folio == _this.state.id_cuestionario;
            })[0] != undefined ? this.lista_cuestionarios.filter(function (d) {
                return d.folio == _this.state.id_cuestionario;
            })[0] : { folio_establecimiento: 1 };
            if (cuest.folio_departamento == undefined) {
                cuest.folio_departamento = this.state.departamento;
                cuest.folio_establecimiento = this.state.establecimiento;
            }
            var caja = [React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                titulo: "Zona",
                datos: this.nom_Zona })];
            if (this.lista_datos_cuestionario.length == 0) caja.push(React.createElement("i", { className: "glyphicon glyphicon-search",
                "data-toggle": "modal", "data-target": "#modal_",
                onClick: this.on_seleccion_zona.bind(this) }));
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "cajas_datos_cuestionarios" },
                    caja
                ),
                React.createElement(
                    "div",
                    { style: { "width": "40%", "display": "inline-block", "margin-left": "20px" } },
                    React.createElement(Caja_datos_select, { titulo: "Establecimiento",
                        icono: "glyphicon glyphicon-briefcase",
                        seleccion: this.seleccion_establecimiento,
                        opciones: this.opciones_establecimientos() })
                )
            );
        }
    }, {
        key: "on_nuevo",
        value: function on_nuevo() {
            console.log("nuevo");
            var folio = this.lista_cuestionarios[this.lista_cuestionarios.length - 1].folio + 1 || 1;
            var dep = this.lista_departamentos[0].folio;
            var est = this.lista_establecimientos[0].folio;

            this.nom_Zona = "";
            this.nom_activo = "";
            this.nom_criterio = "";
            this.nom_servicio = "";
            this.nom_servicio_detalle = "";
            this.lista_datos_cuestionario = [];

            this.setState({
                id_cuestionario: folio,
                edicion: true,
                nuevo: true,
                departamento: 0,
                establecimiento: 0
            });
        }
    }, {
        key: "on_editar",
        value: function on_editar() {
            if (this.state.id_cuestionario && !this.state.nuevo) {
                this.lista_datos_cuestionario = conexion_ajax("servicios/servicios_generales/conexiones.asmx/datos_cuestionarios", { folio: this.state.id_cuestionario });
                this.servicios_seleccionados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_por_activos_ckl", { folio: this.state.id_cuestionario });
                this.setState({
                    edicion: true,
                    nuevo: false,
                    estatus: "V"
                });
            } else alert("seleccione Un campo!!!");
        }
    }, {
        key: "on_guardar",
        value: function on_guardar() {
            var _this2 = this;

            console.log("guardar");
            if (this.lista_datos_cuestionario.length > 0 && this.state.cuestionario.length > 0) {
                (function () {
                    var cuestionario_dato = _this2.state.id_cuestionario + ",'" + _this2.state.cuestionario + "'," + _this2.state.id_departamento_aplica_cuestionario + "," + _this2.state.id_zona + "," + _this2.state.establecimiento + ",'" + _this2.state.estatus + "'," + ID_SCOI;
                    var datos_cuestionarios = _this2.lista_datos_cuestionario.map(function (d) {
                        return d.folio + "," + d.orden + "," + d.folio_zona + "," + d.folio_activo + "," + d.folio_criterio + "," + 0;
                    });
                    var servicio = [];
                    console.log(_this2.servicios_seleccionados);
                    _this2.servicios_seleccionados.sort(function (a, b) {
                        return a.orden >= b.orden ? 1 : -1;
                    });
                    console.log(_this2.servicios_seleccionados);
                    _this2.servicios_seleccionados.forEach(function (dato, index) {
                        if (index > 0) servicio.push(dato.folio_zona + "," + dato.orden + "," + dato.folio_servicio);else {
                            servicio.push(dato.folio_zona + "," + 0 + "," + dato.folio_servicio);
                        }
                    });

                    var maximo = _this2.lista_datos_cuestionario[_this2.lista_datos_cuestionario.length - 1].orden;

                    console.log({
                        cuestionario: cuestionario_dato + "," + maximo,
                        activo: datos_cuestionarios,
                        serivicios_por_activo: servicio
                    });
                    var a = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_guardar", {
                        cuestionario: cuestionario_dato + "," + maximo,
                        activo: datos_cuestionarios,
                        serivicios_por_activo: servicio
                    });
                    if (a > 0) {
                        alert("Guardado...\n Folio: " + a);
                        _this2.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
                        _this2.lista_datos_cuestionario = [];
                        _this2.servicios_seleccionados = [];
                        _this2.on_deshacer();
                    }
                })();
            } else alert("Sin Datos En Tabla Para Guardar!!!");
        }
    }, {
        key: "on_deshacer",
        value: function on_deshacer() {
            console.log("deshacer");
            this.servicios_seleccionados = [];
            this.nom_Zona = "";
            this.nom_activo = "";
            this.nom_criterio = "";
            this.nom_servicio = "";
            this.nom_servicio_detalle = "";

            this.lista_datos_cuestionario = [];
            this.setState({
                id_cuestionario: 0,
                cuestionario: "",
                estatus: "V",
                id_departamento_aplica_cuestionario: -1,
                edicion: false,
                nuevo: false,
                departamento: 0,
                establecimiento: 0,
                id_zona: 0,
                id_activo: 0,
                id_criterio: 0,
                id_servicio: 0,
                filtro_tabla_modal: "",
                modal_activa: "",
                fila_tabla_seleccionada: null
            });
        }
    }, {
        key: "on_tabla_datos_cuestionarios",
        value: function on_tabla_datos_cuestionarios(cuestionario) {
            console.log(cuestionario);
            this.nom_Zona = cuestionario.zona;
            this.setState({
                id_cuestionario: cuestionario.folio,
                cuestionario: cuestionario.cuestionario,
                estatus: cuestionario.estatus,
                id_zona: cuestionario.folio_zona,
                establecimiento: cuestionario.folio_establecimiento,
                id_departamento_aplica_cuestionario: cuestionario.departamento_aplica
            });
        }
    }, {
        key: "on_click_cuestionario",
        value: function on_click_cuestionario(e) {
            if (this.state.edicion) this.setState({ cuestionario: e.target.value });
        }
    }, {
        key: "on_seleccion_establecimiento",
        value: function on_seleccion_establecimiento(e) {
            var folio = this.lista_datos_cuestionario.length === 0 ? e.target.value : this.state.establecimiento;
            this.setState({
                establecimiento: folio
            });
        }
    }, {
        key: "on_cambio_estatus",
        value: function on_cambio_estatus(e) {

            this.setState({ estatus: e.target.value });
        }
    }, {
        key: "on_seleccion_zona",
        value: function on_seleccion_zona() {
            this.lista_Zonas = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_zona") || [];
            console.log("zona");
            //datos Modal
            this.titulo_modal = "Seleccion Zona : ";
            this.titulo_sel_modal = "Zona";
            this.cavecera_tabla_modal = ["Folio", "Zona", "Estatus"];
            this.zona("");

            //asignador de estado
            this.setState({ filtro_tabla_modal: "", modal_activa: "zona" });
        }
    }, {
        key: "on_cambio_departamento",
        value: function on_cambio_departamento(e) {
            this.setState({
                departamento: e.target.value
            });
        }
    }, {
        key: "cambio_departamento_aplica_cuestionario",
        value: function cambio_departamento_aplica_cuestionario(e) {
            this.setState({
                id_departamento_aplica_cuestionario: e.target.value
            });
        }
    }, {
        key: "on_seleccion_activo",
        value: function on_seleccion_activo() {
            this.lista_activo = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_activos_ckl", {
                establecimiento: this.state.establecimiento,
                departamento: this.state.departamento
            }) || [];
            console.info(this.lista_activo);
            console.log("activo");
            //datos Modal
            this.titulo_modal = "Seleccion Activo : ";
            this.titulo_sel_modal = "Activo";
            this.cavecera_tabla_modal = ["folio", "Descripcion", "Fecha", "Estado"];
            this.actividad("");

            this.setState({ filtro_tabla_modal: "", modal_activa: "actividad" });
        }
    }, {
        key: "on_seleccion_criterios",
        value: function on_seleccion_criterios() {
            this.lista_criterios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_criterio") || [];
            console.log("criterios");
            //datos Modal
            this.titulo_modal = "Seleccion Criterio : ";
            this.titulo_sel_modal = "Criterio ";
            this.cavecera_tabla_modal = ["Folio", "Criterio", "Estatus"];
            this.criterio("");

            this.setState({ filtro_tabla_modal: "", modal_activa: "criterio" });
        }
    }, {
        key: "cuestionarios_eliminar",
        value: function cuestionarios_eliminar(folio_cuestion) {
            if (confirm("Eliminar Cuestionario?\n Al Eliminarlo Se Borrara Tambien Los Criterios Y Respuestas Que Contenga!!")) {
                conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_cuestionarios_eliminar", { folio: folio_cuestion });
                this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
                this.on_deshacer();
            } else console.log("Cancelado Elimnar Folio: " + folio_cuestion);
        }
    }, {
        key: "on_filtro_tabla_modal",
        value: function on_filtro_tabla_modal(e) {
            var dato = e.target.value;
            if (this.state.modal_activa == "zona") {
                this.zona(dato);
            } else if (this.state.modal_activa == "criterio") {
                this.criterio(dato);
            } else if (this.state.modal_activa == "servicio") {
                this.servicio(dato);
            } else if (this.state.modal_activa == "actividad") {
                this.actividad(dato);
            }

            this.setState({ filtro_tabla_modal: dato });
        }
    }, {
        key: "seleccion_folio_modal",
        value: function seleccion_folio_modal(folio) {

            this.seleccion_tabla_modal.folio = folio;
            if (this.state.modal_activa == "zona") {
                this.seleccion_tabla_modal.dato = this.lista_Zonas.filter(function (dat) {
                    return dat.folio == folio;
                })[0].nombre || "";
            } else if (this.state.modal_activa == "criterio") {
                this.seleccion_tabla_modal.dato = this.lista_criterios.filter(function (dat) {
                    return dat.folio == folio;
                })[0].nombre || "q";
            } else if (this.state.modal_activa == "servicio") {
                this.seleccion_tabla_modal.dato = this.lista_servicios.filter(function (dat) {
                    return dat.folio == folio;
                })[0].nombre || "q";
            } else if (this.state.modal_activa == "actividad") {
                this.seleccion_tabla_modal.dato = this.lista_activo.filter(function (dat) {
                    return dat.folio == folio;
                })[0].descripcion || "";
            }
            this.setState({ filtro_tabla_modal: "" });
        }
    }, {
        key: "seleccionar_de_tabla_modal",
        value: function seleccionar_de_tabla_modal() {

            console.log("Seleccion Modal");
            var insercion = { filtro_tabla_modal: "", modal_activa: "", fila_tabla_seleccionada: null };

            if (this.state.modal_activa == "zona") {
                this.nom_Zona = this.seleccion_tabla_modal.dato;
                insercion.id_zona = this.seleccion_tabla_modal.folio;
            } else if (this.state.modal_activa == "criterio") {
                this.nom_criterio = this.seleccion_tabla_modal.dato;
                insercion.id_criterio = this.seleccion_tabla_modal.folio;
            } else if (this.state.modal_activa == "servicio") {
                this.colocar_servicios_en_lista();
                this.seleccionado_filtro = [];
            } else if (this.state.modal_activa == "actividad") {
                this.nom_activo = this.seleccion_tabla_modal.dato;
                insercion.id_activo = this.seleccion_tabla_modal.folio;
            }
            this.setState(insercion);
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
        }
    }, {
        key: "des_seleccionar_de_tabla_modal",
        value: function des_seleccionar_de_tabla_modal() {
            console.log("Deshacer Seleccion Modal");

            this.seleccionado_filtro = [];
            this.seleccion_tabla_modal = { folio: 0, dato: "" };
            this.setState({ filtro_tabla_modal: "", modal_activa: "", fila_tabla_seleccionada: null });
        }
    }, {
        key: "on_seleccion_servicios",
        value: function on_seleccion_servicios() {
            this.lista_servicios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_detalles_ckl") || [];
            console.log("servicios");
            //datos Modal
            this.titulo_modal = "Seleccion Servicio : ";
            this.titulo_sel_modal = "Servicio ";
            this.cavecera_tabla_modal = ["Seleccion", "Folio", "Servicio", "Detalle", "Prioridad"];
            this.servicio("");

            this.setState({ filtro_tabla_modal: "", modal_activa: "servicio" });
        }
    }, {
        key: "on_agregar_datos_cuestionario_a_tabla",
        value: function on_agregar_datos_cuestionario_a_tabla() {
            var _this3 = this;

            var orden_ = 1;
            if (this.lista_datos_cuestionario.length > 0) orden_ = this.lista_datos_cuestionario[this.lista_datos_cuestionario.length - 1].orden + 1 || 1;

            //crear objeto a agregar a tabla
            var objeto = {
                folio: 0,
                orden: orden_,
                folio_cuestionario: this.state.id_cuestionario,
                cuestionario: this.state.cuestionario,
                folio_zona: this.state.id_zona,
                zona: this.nom_Zona,
                folio_activo: this.state.id_activo,
                activo: this.nom_activo,
                folio_criterio: this.state.id_criterio,
                criterio: this.nom_criterio,
                folio_servicio: this.state.id_servicio,
                n_servicio: 0,
                detalle: this.nom_servicio_detalle
            };
            var activo_repetido = this.lista_datos_cuestionario.filter(function (e) {
                return e.folio_activo == _this3.state.id_activo && e.folio_zona == _this3.state.id_zona;
            });
            console.log(activo_repetido);
            console.log(objeto);
            //revisamos que contenga todos los folios
            if (this.state.id_activo > 0 && this.state.id_criterio > 0 && this.state.id_cuestionario > 0 && this.state.id_zona > 0) {
                if (activo_repetido.length == 0) this.lista_datos_cuestionario.push(objeto);else alert("El Activo Ya Se Encuentra En La Tabla...");

                this.nom_activo = "";
                this.nom_criterio = "";
                this.nom_servicio = "";
                this.nom_servicio_detalle = "";
                this.seleccionado_filtro = [];

                this.setState({
                    id_activo: 0,
                    id_criterio: 0,
                    fila_tabla_seleccionada: null
                });
            } else alert("Fata seleccionar un Campo!!!");
        }
    }, {
        key: "on_mover_datos_cuestionario_en_tabla",
        value: function on_mover_datos_cuestionario_en_tabla(mover) {
            var _this4 = this;

            //BASE DEL PENDIENTE
            if (this.state.fila_tabla_seleccionada != null) {
                (function () {
                    var previo = _this4.lista_datos_cuestionario.indexOf(_this4.state.fila_tabla_seleccionada);
                    var nuevo = previo + mover;

                    if (nuevo >= 0 && nuevo < _this4.lista_datos_cuestionario.length) {
                        //asigna las nuevas posiciones cuestionarios
                        _this4.lista_datos_cuestionario[previo] = _this4.lista_datos_cuestionario[nuevo];
                        _this4.lista_datos_cuestionario[nuevo] = _this4.state.fila_tabla_seleccionada;
                        //asigna las nuevas posiciones a servicios
                        var seleccionados_previos = _this4.servicios_seleccionados.filter(function (elemento) {
                            if (elemento.folio_zona === _this4.lista_datos_cuestionario[previo].folio_zona && elemento.orden === _this4.lista_datos_cuestionario[previo].orden) {
                                elemento.orden = previo + 1;
                            } else if (elemento.folio_zona === _this4.lista_datos_cuestionario[nuevo].folio_zona && elemento.orden === _this4.lista_datos_cuestionario[nuevo].orden) {
                                elemento.orden = nuevo + 1;
                            }
                            return elemento.folio_zona === _this4.lista_datos_cuestionario[previo].folio_zona && elemento.orden === _this4.lista_datos_cuestionario[previo].orden || elemento.folio_zona === _this4.lista_datos_cuestionario[nuevo].folio_zona && elemento.orden === _this4.lista_datos_cuestionario[nuevo].orden;
                        });
                        //filtramos los elementos de servicios omitiemdo los de cambio
                        _this4.servicios_seleccionados = _this4.servicios_seleccionados.filter(function (elemento) {
                            return !(elemento.folio_zona === _this4.lista_datos_cuestionario[previo].folio_zona && elemento.orden === _this4.lista_datos_cuestionario[previo].orden || elemento.folio_zona === _this4.lista_datos_cuestionario[nuevo].folio_zona && elemento.orden === _this4.lista_datos_cuestionario[nuevo].orden);
                        });

                        _this4.servicios_seleccionados = seleccionados_previos.concat(_this4.servicios_seleccionados);
                        //da el nuevo orden a los activos
                        _this4.lista_datos_cuestionario = _this4.lista_datos_cuestionario.map(function (elemento) {
                            elemento.orden = _this4.lista_datos_cuestionario.indexOf(elemento) + 1;
                            return elemento;
                        });
                        _this4.setState({ fila_tabla_seleccionada: _this4.lista_datos_cuestionario[nuevo] });
                    }
                })();
            } else alert("Seleccione Una Fila Para Desplazar!!!");
        }
    }, {
        key: "on_seleccion_fila_datos",
        value: function on_seleccion_fila_datos(dato) {

            this.seleccionado_filtro = this.servicios_seleccionados.filter(function (est) {
                return est.folio_zona == dato.folio_zona && est.orden == dato.orden;
            });

            this.setState({ fila_tabla_seleccionada: dato });
        }
    }, {
        key: "seleccion_tabla",
        value: function seleccion_tabla() {
            if (!this.state.edicion) return React.createElement(
                "div",
                { className: "tabla_matriz" },
                this.tabla_cuestionarios()
            );else return [this.selector_datos(), React.createElement(
                "div",
                { className: "tabla_matriz" },
                this.tabla_datos_cuestionario()
            )];
        }
    }, {
        key: "opciones_estatus",
        value: function opciones_estatus() {
            if (this.state.estatus == "V") {
                return [React.createElement(
                    "option",
                    { selected: "", value: "V" },
                    "Vigente"
                ), React.createElement(
                    "option",
                    { value: "C" },
                    "Cancelado"
                )];
            } else if (this.state.estatus == "C") return [React.createElement(
                "option",
                { value: "V" },
                "Vigente"
            ), React.createElement(
                "option",
                { selected: "", value: "C" },
                "Cancelado"
            )];
        }
    }, {
        key: "opciones_departamento",
        value: function opciones_departamento() {
            return this.lista_departamentos_aplica_cuestionario.map(function (elemento) {
                return React.createElement(
                    "option",
                    { value: elemento.folio },
                    " ",
                    elemento.nombre,
                    " "
                );
            });
        }
    }, {
        key: "opciones_departamentos_aplica_cuestionario",
        value: function opciones_departamentos_aplica_cuestionario() {
            var _this5 = this;

            var aplica = function aplica(folio) {
                return folio == _this5.state.id_departamento_aplica_cuestionario;
            };
            var r = this.lista_departamentos_aplica_cuestionario.map(function (e) {
                return React.createElement(
                    "option",
                    { selected: aplica(e.folio), key: e.folio, value: e.folio },
                    " ",
                    e.nombre
                );
            });
            return [React.createElement(
                "option",
                { selected: aplica(0), key: "0", value: "0" },
                " ----"
            ), r];
        }
    }, {
        key: "opciones_establecimientos",
        value: function opciones_establecimientos() {
            var _this6 = this;

            var aplica = function aplica(folio) {
                return folio == _this6.state.establecimiento;
            };
            var r = this.lista_establecimientos.map(function (e) {
                return React.createElement(
                    "option",
                    { selected: aplica(e.folio), value: e.folio },
                    " ",
                    e.nombre
                );
            });
            return r;
        }
    }, {
        key: "tabla_cuestionarios",
        value: function tabla_cuestionarios() {
            return React.createElement(Tabla, { cavecera: this.cavecera_tabla_cuestionarios,
                datos: this.datos_cuestionarios() });
        }
    }, {
        key: "datos_cuestionarios",
        value: function datos_cuestionarios() {
            var _this7 = this;

            var r = this.lista_cuestionarios.map(function (cuestionario) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this7.on_tabla_datos_cuestionarios(cuestionario);
                        } },
                    React.createElement(
                        "td",
                        null,
                        cuestionario.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        cuestionario.cuestionario
                    ),
                    React.createElement(
                        "td",
                        null,
                        cuestionario.zona
                    ),
                    React.createElement(
                        "td",
                        null,
                        cuestionario.establecimiento
                    ),
                    React.createElement(
                        "td",
                        null,
                        cuestionario.modificacion
                    ),
                    React.createElement(
                        "td",
                        null,
                        cuestionario.estatus == "V" ? "VIGENTE" : 'CANCELADO'
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("input", { type: "button",
                            className: "btn btn-danger",
                            value: "Eliminar",
                            onClick: function () {
                                return _this7.cuestionarios_eliminar(cuestionario.folio);
                            } })
                    )
                );
            });
            return r;
        }
    }, {
        key: "selector_datos",
        value: function selector_datos() {
            var _this8 = this;

            var tabla = React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { style: { "width": "40%", "display": "inline-block", "margin-left": "20px" } },
                    React.createElement(Caja_datos_select, { icono: "glyphicon glyphicon-tasks",
                        titulo: "Departamento",
                        seleccion: this.cambio_departamento,
                        opciones: this.opciones_departamento() })
                ),
                React.createElement(
                    "div",
                    { className: "cajas_datos_cuestionarios" },
                    React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                        titulo: "Activo",
                        datos: this.nom_activo }),
                    React.createElement("i", { className: "glyphicon glyphicon-search",
                        "data-toggle": "modal", "data-target": "#modal_",
                        onClick: this.on_seleccion_activo.bind(this) })
                ),
                React.createElement(
                    "div",
                    { className: "cajas_datos_cuestionarios", style: { "width": "90%" } },
                    React.createElement(Caja_datos, { icono: "glyphicon glyphicon-edit",
                        titulo: "Criterio",
                        datos: this.nom_criterio }),
                    React.createElement("i", { className: "glyphicon glyphicon-search",
                        "data-toggle": "modal", "data-target": "#modal_",
                        onClick: this.on_seleccion_criterios.bind(this) })
                ),
                React.createElement("input", { type: "button",
                    value: "Agregar Datos A Cuestionario",
                    className: "btn btn-success ",
                    onClick: this.on_agregar_datos_cuestionario_a_tabla.bind(this) }),
                React.createElement("input", { type: "button",
                    value: "Subir",
                    className: "btn btn-default ",
                    onClick: function () {
                        return _this8.on_mover_datos_cuestionario_en_tabla(-1);
                    } }),
                React.createElement("input", { type: "button",
                    value: "Bajar",
                    className: "btn btn-default ",
                    onClick: function () {
                        return _this8.on_mover_datos_cuestionario_en_tabla(1);
                    } }),
                React.createElement(
                    "i",
                    { className: "fa fa-cogs",
                        "data-toggle": "modal", "data-target": "#modal_",
                        onClick: function () {
                            return _this8.on_seleccion_servicios();
                        } },
                    " Servicios."
                )
            );

            return tabla;
        }
    }, {
        key: "servicios_datos_cuestionario",
        value: function servicios_datos_cuestionario() {
            var _this9 = this;

            var r = this.lista_datos_cuestionario.map(function (dato) {
                return React.createElement(
                    "tr",
                    { key: dato.orden, className: _this9.state.fila_tabla_seleccionada == dato ? "tabla_seleccionada" : "",
                        onClick: function () {
                            return _this9.on_seleccion_fila_datos(dato);
                        } },
                    React.createElement(
                        "td",
                        null,
                        dato.orden
                    ),
                    React.createElement(
                        "td",
                        null,
                        dato.zona
                    ),
                    React.createElement(
                        "td",
                        null,
                        dato.activo
                    ),
                    React.createElement(
                        "td",
                        null,
                        dato.criterio
                    ),
                    React.createElement(
                        "td",
                        { style: { 'text-align': 'center' },
                            onClick: function () {
                                return _this9.ver_servicios_lista_dropdown(dato);
                            } },
                        React.createElement(Botones_dropdown, { titulo: dato.n_servicio,
                            opciones_menu: _this9.lista_servicios_nombre })
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("input", { type: "button",
                            className: "btn btn-danger",
                            value: "Eliminar",
                            onClick: function () {
                                return _this9.eliminar_de_tabla_datos_cuestionario(dato);
                            } })
                    )
                );
            });

            return r;
        }
    }, {
        key: "ver_servicios_lista_dropdown",
        value: function ver_servicios_lista_dropdown(elemento) {
            console.log(elemento);
            this.datos_vista_servicios();
        }
    }, {
        key: "datos_vista_servicios",
        value: function datos_vista_servicios() {
            var _this10 = this;

            var datos = [];
            this.lista_servicios_nombre = datos.map(function (elemento) {
                console.log(elemento.folio + ":" + _this10.activo.folio);
                if (elemento.folio == _this10.activo.folio) {
                    return React.createElement(
                        "div",
                        { style: { 'height': '40px' }, key: elemento.folio },
                        elemento.observacion
                    );
                }
            }) || ["Sin Datos..."];
        }
    }, {
        key: "eliminar_de_tabla_datos_cuestionario",
        value: function eliminar_de_tabla_datos_cuestionario(dato) {
            var _this11 = this;

            //PENDIENTE
            //se selecciona la posicionde dato para eliminar
            var eliminar = this.lista_datos_cuestionario.indexOf(dato);
            this.lista_datos_cuestionario.splice(eliminar, 1);

            //filtramos los elementos de servicios omitiemdo el eliminado
            this.servicios_seleccionados = this.servicios_seleccionados.filter(function (elemento) {
                return !(elemento.folio_zona === dato.folio_zona && elemento.orden === dato.orden);
            });

            //recorremos lista de datos cuestionarios para asignar orden
            this.lista_datos_cuestionario.length;
            this.lista_datos_cuestionario = this.lista_datos_cuestionario.map(function (elemento) {
                //lo mismo para la lista de servicios
                _this11.servicios_seleccionados = _this11.servicios_seleccionados.map(function (dat) {
                    if (dat.orden == elemento.orden && dat.folio_zona == elemento.folio_zona) {
                        dat.orden = _this11.lista_datos_cuestionario.indexOf(elemento) + 1;
                    }
                    return dat;
                });
                elemento.orden = _this11.lista_datos_cuestionario.indexOf(elemento) + 1;
                return elemento;
            });
            console.log(this.servicios_seleccionados);

            this.seleccionado_filtro = [];
            this.setState({ filtro_tabla_modal: "", fila_tabla_seleccionada: null });
        }
    }, {
        key: "tabla_datos_cuestionario",
        value: function tabla_datos_cuestionario() {
            return React.createElement(Tabla, { cavecera: this.cavecera_tabla_datos_cuestionario,
                datos: this.servicios_datos_cuestionario() });
        }

        //tablas de modal
    }, {
        key: "zona",
        value: function zona(filtro) {
            var _this12 = this;

            var dato = this.lista_Zonas.filter(function (zona) {
                return zona.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0;
            });
            this.cuerpo_tabla_modal = dato.map(function (zona) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this12.seleccion_folio_modal(zona.folio);
                        } },
                    React.createElement(
                        "td",
                        null,
                        zona.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        zona.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        zona.estatus == "V" ? "Vigente" : "Cancelado"
                    )
                );
            });
        }
    }, {
        key: "actividad",
        value: function actividad(filtro) {
            var _this13 = this;

            var dato = this.lista_activo.filter(function (activo) {
                return activo.descripcion.toUpperCase().search(filtro.toUpperCase()) >= 0;
            });
            this.cuerpo_tabla_modal = dato.map(function (activo) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this13.seleccion_folio_modal(activo.folio);
                        } },
                    React.createElement(
                        "td",
                        null,
                        activo.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        activo.descripcion
                    ),
                    React.createElement(
                        "td",
                        null,
                        activo.fecha
                    ),
                    React.createElement(
                        "td",
                        null,
                        activo.caracteristicas
                    )
                );
            });
        }
    }, {
        key: "criterio",
        value: function criterio(filtro) {
            var _this14 = this;

            var dato = this.lista_criterios.filter(function (criterio) {
                return criterio.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0;
            });
            this.cuerpo_tabla_modal = dato.map(function (criterio) {
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this14.seleccion_folio_modal(criterio.folio);
                        } },
                    React.createElement(
                        "td",
                        null,
                        criterio.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        criterio.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        criterio.estatus == "V" ? "Vigente" : "Cancelado"
                    )
                );
            });
        }
    }, {
        key: "servicio",
        value: function servicio(filtro) {
            var _this15 = this;

            var dato = this.lista_servicios.filter(function (servicios) {
                return servicios.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0;
            });
            this.cuerpo_tabla_modal = dato.map(function (activos) {
                var folio = activos.folio;
                return React.createElement(
                    "tr",
                    { onClick: function () {
                            return _this15.seleccion_folio_modal(activos.folio);
                        } },
                    React.createElement(
                        "td",
                        null,
                        React.createElement("input", { type: "checkbox",
                            onClick: function () {
                                return _this15.checar_servicio_seleccionado(activos.folio);
                            },
                            checked: _this15.seleccionado_filtro.filter(function (e) {
                                return e.folio_servicio == folio;
                            }).length > 0
                        })
                    ),
                    React.createElement(
                        "td",
                        null,
                        activos.folio
                    ),
                    React.createElement(
                        "td",
                        null,
                        activos.nombre
                    ),
                    React.createElement(
                        "td",
                        null,
                        activos.detalle
                    ),
                    React.createElement(
                        "td",
                        null,
                        activos.prioridad
                    )
                );
            });
        }
    }, {
        key: "checar_servicio_seleccionado",
        value: function checar_servicio_seleccionado(filtro) {
            var filla = this.state.fila_tabla_seleccionada;
            console.log(filla);
            var posicion = this.seleccionado_filtro.find(function (d) {
                return d.folio_servicio == filtro;
            });
            console.log(posicion);
            if (filla != null) {
                if (posicion == undefined) this.seleccionado_filtro.push({
                    folio_servicio: filtro,
                    orden: filla.orden,
                    folio_zona: filla.folio_zona
                });else {
                    this.seleccionado_filtro = this.seleccionado_filtro.filter(function (elemento) {
                        return elemento != posicion;
                    });
                }
                console.log(this.seleccionado_filtro);
                this.servicio(this.state.filtro_tabla_modal);
                this.setState({ fila_tabla_seleccionada: filla });
            } else alert("No Seleciono Activo Para Servicio!!!");
        }
    }, {
        key: "colocar_servicios_en_lista",
        value: function colocar_servicios_en_lista() {
            var _this16 = this;

            console.log("colocar Servicios:");
            var seleccion = this.state.fila_tabla_seleccionada;

            this.servicios_seleccionados = this.servicios_seleccionados.filter(function (elemento) {
                return !(elemento.folio_zona == seleccion.folio_zona && elemento.orden == seleccion.orden);
            });

            this.seleccionado_filtro.forEach(function (item) {
                _this16.servicios_seleccionados.push(item);
            });

            this.lista_datos_cuestionario = this.lista_datos_cuestionario.map(function (servicio) {
                if (servicio.folio_zona == seleccion.folio_zona && servicio.orden == seleccion.orden) servicio.n_servicio = _this16.seleccionado_filtro.length;

                return servicio;
            });
        }
    }]);

    return Servicios;
})(React.Component);

ReactDOM.render(React.createElement(Servicios, null), document.getElementById("contenedor"));

