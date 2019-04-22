'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabla = (function (_React$Component) {
    _inherits(Tabla, _React$Component);

    function Tabla(props) {
        _classCallCheck(this, Tabla);

        _get(Object.getPrototypeOf(Tabla.prototype), 'constructor', this).call(this, props);
        this.lista__temperaturas_x_tiempos = conexion_ajax("servicios/datos_tabla.asmx/obtener_temperaturas_x_tiempos");
        this.cuerpo = [];
        this.establecimientos();
        this.boton_regresar = null;
        this.boton_regresar_1 = null;
        this.cambia_nombre = this.props.nombre_establecimiento || 'Establecimientos';
        this.setState({ folio_unidad: 0, nombre_establecimiento: '', nombre_area: '', nombre_unidad: '', limite_inferior: 0, limite_superior: 0 });
        console.log(this.lista_fallos);
    }

    _createClass(Tabla, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { style: estilo_tabla },
                    React.createElement(
                        'table',
                        { className: 'table' },
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                { style: estilo_cabecera_tabla },
                                React.createElement(
                                    'td',
                                    null,
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement('br', null),
                                    React.createElement(
                                        'div',
                                        { className: 'single-line ' },
                                        this.boton_regresar,
                                        ' ',
                                        this.cambia_nombre
                                    )
                                ),
                                React.createElement('td', null),
                                React.createElement('td', null),
                                React.createElement(
                                    'td',
                                    null,
                                    'Temperatura Actual'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Promedio De Teperatura De La Ultima Hora'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Promedio De Teperatura De Las Ultimas 5 Horas'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Promedio De Teperatura De Las Ultimas 24 Horas'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Promedio De Teperatura De Los Ultimos 7 Dias'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Promedio De Teperatura De Los Ultimos 15 Dias'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            this.cuerpo
                        )
                    )
                )
            );
        }
    }, {
        key: 'nomb',
        value: function nomb(dato) {
            return React.createElement(
                'span',
                { className: 'texto_cavecera' },
                ' ',
                dato.nombre_establecimiento,
                ' '
            );
        }
    }, {
        key: 'establecimientos',
        value: function establecimientos() {
            var _this = this;

            this.cambia_nombre = 'Establecimientos';
            var temperaturas = [];
            var establecimiento = { folio_establecimiento: 0, nombre_establecimiento: '', folio_area: 0, nombre_area: '', folio_unidad: 0, nombre_unidad: '', temperatura: 0, limite_inferior: 0, limite_superior: 0 };
            var lista_establecimiento = [];
            this.lista__temperaturas_x_tiempos.forEach(function (dato, posision) {
                //asignamos la primera posision
                if (posision == 0) {
                    establecimiento = dato;
                }
                if (establecimiento.folio_establecimiento == dato.folio_establecimiento) {
                    var auxiliar_temp = 0;
                    temperaturas.push(dato.temperatura);
                    if (posision == _this.lista__temperaturas_x_tiempos.length - 1) {
                        temperaturas.forEach(function (item) {
                            auxiliar_temp += item;
                        });
                        establecimiento.temperatura = auxiliar_temp / temperaturas.length;
                        lista_establecimiento.push(establecimiento);
                    }
                } else if (establecimiento.folio_establecimiento != dato.folio_establecimiento) {
                    var aux = 0;
                    temperaturas.forEach(function (item) {
                        aux += item;
                    });
                    establecimiento.temperatura = aux / temperaturas.length;
                    lista_establecimiento.push(establecimiento);
                    establecimiento = dato;
                    temperaturas = [dato.temperatura];
                    //preguntamos si posision esta dentro de lista
                    if (establecimiento.folio_establecimiento == dato.folio_establecimiento) {
                        var auxiliar_temp = 0;
                        temperaturas.push(dato.temperatura);
                        //se hace un recorrido de la lista para saber la longitud y calcular el promedio
                        if (posision == _this.lista__temperaturas_x_tiempos.length - 1) {
                            temperaturas.forEach(function (item) {
                                auxiliar_temp += item;
                            });
                            //se hace la operacion para sacar el promedio
                            establecimiento.temperatura = auxiliar_temp / temperaturas.length;
                            lista_establecimiento.push(establecimiento);
                        }
                    }
                }
            });
            console.log(this.lista__temperaturas_x_tiempos);
            this.cuerpo = lista_establecimiento.map(function (dato, posision) {
                return React.createElement(
                    'tr',
                    { key: dato.nombre_establecimiento + posision, onClick: function () {
                            return _this.areas(dato);
                        } },
                    React.createElement(
                        'td',
                        null,
                        dato.nombre_establecimiento
                    ),
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        null,
                        dato.temperatura_actual
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.promedio_temperatura_ultima_hora
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.promedio_temperatura_ultima_5_horas
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.promedio_temperatura_ultimas_24_horas
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.promedio_temperatura_ultimos_7_dias
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.promedio_temperatura_ultimos_15_dias
                    )
                );
            });
            this.setState({ folio_establecimiento: 0 });
        }
    }, {
        key: 'areas',
        value: function areas(dato) {
            var _this2 = this;

            this.cambia_nombre = this.nomb(dato);
            this.boton_regresar = this.regresar_establecimientos();
            var listar_areas = conexion_ajax("servicios/datos_tabla.asmx/obtener_lista_areas", { folio_establecimiento: dato.folio_establecimiento });
            this.cuerpo = listar_areas.map(function (area, posision) {
                return React.createElement(
                    'tr',
                    { key: area.nombre_area + posision, onClick: function () {
                            return _this2.unidades(area);
                        } },
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'single-line' },
                                area.nombre_area,
                                ' ',
                                React.createElement('span', { className: 'fa fa-fast-forward' })
                            )
                        )
                    ),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        null,
                        area.temperatura_actual
                    ),
                    React.createElement(
                        'td',
                        null,
                        area.promedio_temperatura_ultima_hora
                    ),
                    React.createElement(
                        'td',
                        null,
                        area.promedio_temperatura_ultima_5_horas
                    ),
                    React.createElement(
                        'td',
                        null,
                        area.promedio_temperatura_ultimas_24_horas
                    ),
                    React.createElement(
                        'td',
                        null,
                        area.promedio_temperatura_ultimos_7_dias
                    ),
                    React.createElement(
                        'td',
                        null,
                        area.promedio_temperatura_ultimos_15_dias
                    )
                );
            });
            this.setState({ folio_establecimiento: dato.folio_establecimiento });
            console.log(listar_areas);
        }
    }, {
        key: 'unidades',
        value: function unidades(dato) {
            var _this3 = this;

            this.boton_regresar_1 = this.regresar_areas(dato);
            var lista_unidades = conexion_ajax("servicios/datos_tabla.asmx/obtener_lista_unidades", { folio_establecimiento: this.state.folio_establecimiento, folio_area: dato.folio_area });
            var checar = function checar(temperatura) {
                var frio = temperatura.temperatura_actual < temperatura.limite_inferior;
                var caliente = temperatura.temperatura_actual > temperatura.limite_superior;
                return frio ? "Azul" : caliente ? "Rojo" : "";
            };
            var checar_1_hora = function checar_1_hora(temperatura) {
                var frio = temperatura.promedio_temperatura_ultima_hora < temperatura.limite_inferior;
                var caliente = temperatura.promedio_temperatura_ultima_hora > temperatura.limite_superior;
                return frio ? "Azul" : caliente ? "Rojo" : "";
            };
            var checar_5_horas = function checar_5_horas(temperatura) {
                var frio = temperatura.promedio_temperatura_ultima_5_horas < temperatura.limite_inferior;
                var caliente = temperatura.promedio_temperatura_ultima_5_horas > temperatura.limite_superior;
                return frio ? "Azul" : caliente ? "Rojo" : "";
            };
            var checar_24_horas = function checar_24_horas(temperatura) {
                var frio = temperatura.promedio_temperatura_ultimas_24_horas < temperatura.limite_inferior;
                var caliente = temperatura.promedio_temperatura_ultimas_24_horas > temperatura.limite_superior;
                return frio ? "Azul" : caliente ? "Rojo" : "";
            };
            this.cuerpo = lista_unidades.map(function (unidad, posision) {
                return React.createElement(
                    'tr',
                    { key: unidad.nombre_area + posision },
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'single-line' },
                                unidad.nombre_area
                            )
                        )
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'div',
                            { className: 'container' },
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'single-line' },
                                _this3.boton_regresar_1,
                                ' ',
                                unidad.nombre_unidad
                            )
                        )
                    ),
                    React.createElement(
                        'td',
                        { className: checar(unidad) },
                        React.createElement('br', null),
                        unidad.temperatura_actual
                    ),
                    React.createElement(
                        'td',
                        { className: checar_1_hora(unidad) },
                        React.createElement('br', null),
                        unidad.promedio_temperatura_ultima_hora
                    ),
                    React.createElement(
                        'td',
                        { className: checar_5_horas(unidad) },
                        React.createElement('br', null),
                        unidad.promedio_temperatura_ultima_5_horas
                    ),
                    React.createElement(
                        'td',
                        { className: checar_24_horas(unidad) },
                        React.createElement('br', null),
                        unidad.promedio_temperatura_ultimas_24_horas
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement('br', null),
                        unidad.promedio_temperatura_ultimos_7_dias
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement('br', null),
                        unidad.promedio_temperatura_ultimos_15_dias
                    )
                );
            });
            this.setState({ folio_area: dato.folio_area });
            console.log(lista_unidades);
        }
    }, {
        key: 'regresar_establecimientos',
        value: function regresar_establecimientos() {
            var _this4 = this;

            return React.createElement(
                'span',
                { className: 'glyphicon glyphicon-home', onClick: function () {
                        return _this4.establecimientos();
                    } },
                ' '
            );
        }
    }, {
        key: 'regresar_areas',
        value: function regresar_areas(unidad) {
            var _this5 = this;

            return React.createElement(
                'span',
                { className: 'fa fa-mail-reply', onClick: function () {
                        return _this5.areas(unidad);
                    } },
                ' '
            );
        }
    }]);

    return Tabla;
})(React.Component);

var Tabla_fallos = (function (_React$Component2) {
    _inherits(Tabla_fallos, _React$Component2);

    function Tabla_fallos(props) {
        _classCallCheck(this, Tabla_fallos);

        _get(Object.getPrototypeOf(Tabla_fallos.prototype), 'constructor', this).call(this, props);
        this.lista_fallos = conexion_ajax("servicios/datos_tabla.asmx/cargar_lista");
        this.state = {
            folio_unidad: 0,
            nombre_establecimiento: '',
            nombre_area: '',
            nombre_unidad: '',
            limite_inferior: 0,
            limite_superior: 0,
            estado: 'S',
            observaciones: '',
            id_scoi: 0
        };
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_lista_empleados");
        this.opcion_empleados = this.opcion_empleados.bind(this);
        this.on_empleados = this.on_empleados.bind(this);
        this.guardar = this.guardar.bind(this);
        this.on_estado = this.on_estado.bind(this);
        this.on_observaciones = this.on_observaciones.bind(this);
    }

    _createClass(Tabla_fallos, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'center',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        React.createElement('span', { style: { 'color': '#ffd600' }, className: 'fa fa-exclamation-triangle' }),
                        React.createElement(
                            'label',
                            { style: { 'color': 'red', 'marginLeft': '10px', 'marginRight': '10px' } },
                            'Fallas'
                        ),
                        React.createElement('span', { style: { 'color': '#ffd600' }, className: 'fa fa-exclamation-triangle' })
                    )
                ),
                React.createElement(
                    'div',
                    { style: estilo_tabla },
                    React.createElement(
                        'table',
                        { className: 'table' },
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                { style: estilo_cabecera_tabla_fallos },
                                React.createElement(
                                    'td',
                                    null,
                                    'Establecimiento'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Area'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Unidad'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Limite min'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Limite max'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Estado'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            this.datos_fallos()
                        )
                    )
                ),
                React.createElement(Modal, {

                    identidad: "mi_modal",
                    cavecera: React.createElement(
                        'center',
                        null,
                        React.createElement(
                            'h3',
                            null,
                            'Datos De Unidad'
                        )
                    ),
                    cuerpo: [this.cabecera(), this.datos_cuerpo_mi_moda()],
                    rodilla: this.observaciones(),
                    pie: this.empleados()
                })
            );
        }
    }, {
        key: 'on_modal1',
        value: function on_modal1(e) {
            document.getElementById("mi_modal").style.display = 'flex';
            console.log(this.state);
            var lista_temperaturas = conexion_ajax("servicios/datos_tabla.asmx/obtener_temperaturas_unidad", { folio_unidad: e.folio_unidad });
            this.datos = lista_temperaturas.map(function (e) {
                return React.createElement(
                    'tr',
                    { key: e.folio_unidad },
                    React.createElement(
                        'td',
                        null,
                        e.fecha
                    ),
                    React.createElement(
                        'td',
                        null,
                        e.hora
                    ),
                    React.createElement(
                        'td',
                        null,
                        e.temperatura
                    )
                );
            });
            console.log(this.state);

            this.setState({
                nombre_establecimiento: e.nombre_establecimiento, estado: e.estado,
                nombre_area: e.nombre_area, nombre_unidad: e.nombre_unidad, folio_unidad: e.folio_unidad, limite_inferior: e.limite_inferior, limite_superior: e.limite_superior
            });
        }
    }, {
        key: 'datos_cuerpo_mi_moda',
        value: function datos_cuerpo_mi_moda() {
            return React.createElement(
                'div',
                { style: { 'marginTop': '-23px' } },
                React.createElement(
                    'div',
                    { style: estilo_tabla_modal },
                    React.createElement(
                        'table',
                        { className: 'table' },
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                { style: estilo_cabecera_tabla_fallos },
                                React.createElement(
                                    'td',
                                    null,
                                    'Fecha'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Hora'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    'Temperatura'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            this.datos
                        )
                    )
                )
            );
        }
    }, {
        key: 'empleados',
        value: function empleados() {
            return React.createElement(
                'div',
                { className: 'container', style: { 'marginLeft': '5px', 'width': '725px' } },
                React.createElement(
                    'div',
                    { 'class': 'input-group' },
                    React.createElement(
                        'label',
                        { 'class': 'input-group-addon' },
                        'Atendio'
                    ),
                    React.createElement(
                        'select',
                        { required: true, onChange: this.on_empleados, className: 'form-control' },
                        React.createElement(
                            'option',
                            { value: '0' },
                            'Seleccione un empleado'
                        ),
                        this.opcion_empleados(this.state.nombrecompleto_usuario)
                    )
                ),
                React.createElement(
                    'i',
                    { onClick: this.guardar, style: { 'marginTop': '-4px' }, value: 'Guardar', className: 'form-control btn btn-primary' },
                    '  Guardar  ',
                    React.createElement('span', { className: 'fa fa-save' })
                )
            );
        }
    }, {
        key: 'guardar',
        value: function guardar() {
            if (this.state.id_scoi > 0 && !this.state.observaciones == '') {
                var respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_fallas', { folio_unidad: this.state.folio_unidad,
                    estado: this.state.estado,
                    observaciones: this.state.observaciones,
                    id_scoi: this.state.id_scoi });
                this.state = { folio_unidad: 0, estado: 'S', observaciones: '', id_scoi: 0 };
                document.getElementById("mi_modal").style.display = 'none';
                this.lista_fallos = conexion_ajax("servicios/datos_tabla.asmx/cargar_lista");
                console.log(this.state);

                this.setState({ estado: 'S', observaciones: '', id_scoi: '' });
            } else {
                alert('Hay campos sin llenar');
            }
        }
    }, {
        key: 'opcion_empleados',
        value: function opcion_empleados() {
            var _this6 = this;

            var v = this.lista.map(function (dato) {
                return React.createElement(
                    'option',
                    { value: dato.id_scoi, selected: dato.id_scoi == _this6.state.id_scoi },
                    dato.nombrecompleto_usuario
                );
            });
            return v;
        }
    }, {
        key: 'on_empleados',
        value: function on_empleados(e) {
            this.setState({ id_scoi: e.target.value });
        }
    }, {
        key: 'observaciones',
        value: function observaciones() {
            return React.createElement(
                'div',
                null,
                React.createElement('textarea', { onChange: this.on_observaciones, value: this.state.observaciones, placeholder: ' * Observaciones de reparacion', className: 'textarea_tamaño' })
            );
        }
    }, {
        key: 'on_observaciones',
        value: function on_observaciones(e) {
            this.setState({ observaciones: e.target.value });
        }
    }, {
        key: 'datos_fallos',
        value: function datos_fallos() {
            var _this7 = this;

            var checar_estadoo = function checar_estadoo(esta) {
                var Sin = esta.estado == 'S';
                var Rev = esta.estado == 'R';
                return Sin ? "Rojo" : Rev ? "verde" : "amarillo";
            };
            var verificar_estado = function verificar_estado(estado) {
                var Sin = estado == 'S';
                var Rev = estado == 'R';
                return Sin ? "Sin revisar" : Rev ? "Revisado" : "En revision";
            };
            return this.lista_fallos.map(function (dato) {
                return React.createElement(
                    'tr',
                    { className: checar_estadoo(dato), key: dato.nombre_establecimiento, onClick: function () {
                            return _this7.on_modal1(dato);
                        } },
                    React.createElement(
                        'td',
                        null,
                        dato.nombre_establecimiento
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.nombre_area
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.nombre_unidad
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.limite_inferior
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.limite_superior
                    ),
                    React.createElement(
                        'td',
                        null,
                        verificar_estado(dato.estado)
                    )
                );
            });
        }
    }, {
        key: 'cabecera',
        value: function cabecera() {
            console.log(this.state);
            return React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { 'class': 'form-inline' },
                        React.createElement(
                            'div',
                            { 'class': 'input-group', style: { 'marginLeft': '5px', 'width': '32.9%' } },
                            React.createElement(
                                'label',
                                { 'class': 'input-group-addon' },
                                'Establecimiento'
                            ),
                            React.createElement('input', { disabled: true, type: 'text', size: '14', value: this.state.nombre_establecimiento, className: 'form-control' })
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'input-group has-feedback  ', style: { 'width': '32.9%' } },
                            React.createElement(
                                'label',
                                { 'class': 'input-group-addon' },
                                'Area'
                            ),
                            React.createElement('input', { disabled: true, type: 'text', size: '13', value: this.state.nombre_area, className: 'form-control' })
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'input-group has-feedback  ', style: { 'width': '32.9%' } },
                            React.createElement(
                                'label',
                                { 'class': 'input-group-addon' },
                                'Unidad'
                            ),
                            React.createElement('input', { disabled: true, type: 'text', size: '14', value: this.state.nombre_unidad, className: 'form-control' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'form-inline', style: { 'marginTop': '-3px' } },
                        React.createElement(
                            'div',
                            { 'class': 'input-group  ', style: { 'marginLeft': '5px', 'width': '32.9%' } },
                            React.createElement(
                                'label',
                                { 'class': 'input-group-addon' },
                                'Limite Superior'
                            ),
                            React.createElement('input', { disabled: true, type: 'text', size: '8', value: this.state.limite_superior, className: 'form-control' })
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'input-group has-feedback', style: { 'width': '32.9%' } },
                            React.createElement(
                                'label',
                                { 'class': 'input-group-addon' },
                                'Limite Inferior'
                            ),
                            React.createElement('input', { disabled: true, type: 'text', size: '8', value: this.state.limite_inferior, className: 'form-control' })
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'input-group has-feedback', style: { 'width': '32.9%' } },
                            React.createElement(
                                'label',
                                { 'class': 'input-group-addon' },
                                'Estado'
                            ),
                            React.createElement(
                                'select',
                                { onChange: this.on_estado, className: 'form-control' },
                                this.ver_estado(this.state.estado)
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'ver_estado',
        value: function ver_estado(estado) {
            var e = [];
            if (estado == 'S') {
                e.push(React.createElement(
                    'option',
                    { value: 'S', selected: true },
                    'Sin Revisar'
                ), React.createElement(
                    'option',
                    { value: 'E' },
                    'En Revision'
                ), React.createElement(
                    'option',
                    { value: 'R' },
                    'Revisado'
                ));
            } else if (estado == 'E') e.push(React.createElement(
                'option',
                { value: 'S' },
                'Sin Revisar'
            ), React.createElement(
                'option',
                { value: 'E', selected: true },
                'En Revision'
            ), React.createElement(
                'option',
                { value: 'R' },
                'Revisado'
            ));else e.push(React.createElement(
                'option',
                { value: 'S' },
                'Sin Revisar'
            ), React.createElement(
                'option',
                { value: 'E' },
                'En Revision'
            ), React.createElement(
                'option',
                { value: 'R', selected: true },
                'Revisado'
            ));
            return e;
        }
    }, {
        key: 'on_estado',
        value: function on_estado(e) {
            this.setState({ estado: e.target.value });
        }
    }]);

    return Tabla_fallos;
})(React.Component);

var Modal = (function (_React$Component3) {
    _inherits(Modal, _React$Component3);

    function Modal(props) {
        _classCallCheck(this, Modal);

        _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).call(this, props);
    }

    _createClass(Modal, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'modal', id: this.props.identidad },
                React.createElement(
                    'div',
                    { className: 'hijo_modal' },
                    React.createElement(
                        'div',
                        { className: 'cavecera_modal' },
                        React.createElement('span', { className: 'glyphicon glyphicon-remove close',
                            onClick: this.cerrar.bind(this) }),
                        this.props.cavecera
                    ),
                    React.createElement(
                        'div',
                        { className: 'cuerpo_' },
                        this.props.cuerpo
                    ),
                    React.createElement(
                        'div',
                        { className: 'rodilla' },
                        this.props.rodilla
                    ),
                    React.createElement(
                        'div',
                        { className: 'pie' },
                        this.props.pie
                    )
                )
            );
        }
    }, {
        key: 'cerrar',
        value: function cerrar() {
            document.getElementById(this.props.identidad).style.display = 'none';
        }
    }]);

    return Modal;
})(React.Component);

var Tablero = (function (_React$Component4) {
    _inherits(Tablero, _React$Component4);

    function Tablero() {
        _classCallCheck(this, Tablero);

        _get(Object.getPrototypeOf(Tablero.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Tablero, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Tabla, null),
                React.createElement(Tabla_fallos, null)
            );
        }
    }]);

    return Tablero;
})(React.Component);

var estilo_cabecera_tabla = {
    'position': 'sticky',
    'min-width': '100%',
    'top': '-1px',
    "background": "rgba(146, 199, 254)"
};
var estilo_cabecera_tabla_fallos = {
    'position': 'sticky',
    'min-width': '100%',
    'top': '-1px',
    "background": "#dea83e"
};
var estilo_tabla = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '100%',
    'height': '300px',
    'border': 'solid 1px gray',
    'border-radius': '10px'
};
var estilo_tabla_modal = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '722px',
    'height': '180px',
    'border': 'solid 1px gray',
    'border-radius': '5px',
    'margin-left': '7px'
};
ReactDOM.render(React.createElement(Tablero, null), document.getElementById("pruebas"));

