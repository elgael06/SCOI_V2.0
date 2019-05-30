'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cabecera = (function (_React$Component) {
    _inherits(Cabecera, _React$Component);

    function Cabecera() {
        _classCallCheck(this, Cabecera);

        _get(Object.getPrototypeOf(Cabecera.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Cabecera, [{
        key: 'render',
        value: function render() {
            var orden = this.props.orden || '';
            var estatus = this.props.estatus || 'V' || 'C';
            var nombre_establecimiento = this.props.nombre_establecimiento || '';
            var nombre_area = this.props.nombre_area || '';
            var nombre_unidad = this.props.nombre_unidad || '';
            var seleccionar_estatus = this.props.seleccionar_estatus;
            var folio_establecimiento = this.folio_establecimiento;
            var opcion_establecimiento = this.props.opcion_establecimiento;
            var opcion_areas = this.props.opcion_areas;
            var opcion_unidades = this.props.opcion_unidades;
            var on_area = this.props.on_area;
            var on_unidad = this.props.on_unidad;
            var on_establecimiento = this.props.on_establecimiento;
            return React.createElement(
                'div',
                { 'class': 'input-group' },
                React.createElement(
                    'div',
                    { 'class': 'input-group col-lg-8' },
                    React.createElement(
                        'label',
                        { 'class': 'input-group-addon' },
                        'Establecimientos'
                    ),
                    React.createElement(
                        'select',
                        { onChange: on_establecimiento, className: 'form-control' },
                        React.createElement(
                            'option',
                            { value: '0' },
                            'Seleccione una opcion'
                        ),
                        this.props.nombre_establecimiento
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'form',
                    { 'class': 'form-inline' },
                    React.createElement(
                        'div',
                        { 'class': 'input-group' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Areas'
                        ),
                        React.createElement(
                            'select',
                            { onChange: on_area, className: 'form-control' },
                            React.createElement(
                                'option',
                                { value: '0' },
                                'Seleccione una opcion'
                            ),
                            this.props.nombre_area
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback ' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Unidades'
                        ),
                        React.createElement(
                            'select',
                            { onChange: on_unidad, className: 'form-control' },
                            React.createElement(
                                'option',
                                { value: '0' },
                                'Seleccione una opcion'
                            ),
                            this.props.nombre_unidad
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Estado'
                        ),
                        React.createElement(
                            'select',
                            { onChange: seleccionar_estatus, className: 'form-control' },
                            this.ver_status(estatus)
                        )
                    )
                )
            );
        }
    }, {
        key: 'ver_status',
        value: function ver_status(estatus) {
            var v = [];
            if (estatus == 'v' || estatus == 'V') {
                v.push(React.createElement(
                    'option',
                    { value: 'v', selected: true },
                    'Vigente'
                ), React.createElement(
                    'option',
                    { value: 'c' },
                    'Cancelado'
                ));
            } else v.push(React.createElement(
                'option',
                { value: 'v' },
                'Vigente'
            ), React.createElement(
                'option',
                { value: 'c', selected: true },
                'Cancelado'
            ));
            return v;
        }
    }]);

    return Cabecera;
})(React.Component);

var Tabla = (function (_React$Component2) {
    _inherits(Tabla, _React$Component2);

    function Tabla() {
        _classCallCheck(this, Tabla);

        _get(Object.getPrototypeOf(Tabla.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Tabla, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: estilo_tabla },
                React.createElement(
                    'table',
                    { className: 'table' },
                    React.createElement(
                        'thead',
                        { style: estilo_cabecera_tabla },
                        React.createElement(
                            'tr',
                            { style: { "background": "#dd8000" } },
                            React.createElement(
                                'td',
                                null,
                                'Orden'
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
                                'Estado'
                            ),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.props.tabla
                    )
                )
            );
        }
    }]);

    return Tabla;
})(React.Component);

var Botonera = (function (_React$Component3) {
    _inherits(Botonera, _React$Component3);

    function Botonera() {
        _classCallCheck(this, Botonera);

        _get(Object.getPrototypeOf(Botonera.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Botonera, [{
        key: 'render',
        value: function render() {
            var nuevo = "btn btn-primary";
            var editar = "btn btn-primary";
            var guardar = "btn btn-primary";
            var deshacer = "btn btn-primary";
            if (this.props.class_editar && !this.props.class_nuevo) editar = "btn btn-info";else if (this.props.class_nuevo) nuevo = "btn btn-info";
            if (this.props.class_editar || this.props.class_nuevo) {
                guardar = "btn btn-success";
                deshacer = "btn btn-warning";
            }
            return React.createElement(
                'div',
                { className: 'btn-group', style: { "margin-bottom": "10px" } },
                React.createElement('input', { type: 'button', value: 'Nuevo', className: nuevo, onClick: this.props.nuevo }),
                React.createElement('input', { type: 'button', value: 'Editar', className: editar, onClick: this.props.editar }),
                React.createElement('input', { type: 'button', value: 'Guardar', className: guardar, onClick: this.props.guardar }),
                React.createElement('input', { type: 'button', value: 'Deshacer', className: deshacer, onClick: this.props.deshacer })
            );
        }
    }]);

    return Botonera;
})(React.Component);

var Botones = (function (_React$Component4) {
    _inherits(Botones, _React$Component4);

    function Botones() {
        _classCallCheck(this, Botones);

        _get(Object.getPrototypeOf(Botones.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Botones, [{
        key: 'render',
        value: function render() {
            var agregar = this.props.agregar;
            return React.createElement(
                'form',
                { className: 'form-inline col-lg-offset-8' },
                React.createElement(
                    'div',
                    { className: 'input-group' },
                    React.createElement(
                        'div',
                        { className: 'input-group ' },
                        React.createElement('input', { type: 'button', value: 'Agregar', name: 'agregar', onClick: agregar, className: 'btn btn-primary' })
                    )
                )
            );
        }
    }]);

    return Botones;
})(React.Component);

var Datos = (function (_React$Component5) {
    _inherits(Datos, _React$Component5);

    function Datos(props) {
        _classCallCheck(this, Datos);

        _get(Object.getPrototypeOf(Datos.prototype), 'constructor', this).call(this);
        this.lista_e = conexion_ajax("servicios/datos_tabla.asmx/cargar_establecimientos") || [];
        var folio = this.lista_e.length > 0 ? this.lista_e[0].folio_establecimiento : -1;
        this.lista_a = conexion_ajax("servicios/datos_tabla.asmx/cargar_areas") || [];
        this.lista_u = conexion_ajax("servicios/datos_tabla.asmx/cargar_unidades") || [];
        this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", {
            folio_establecimiento: folio
        }) || [];
        this.state = {
            nueva: false,
            editable: false,
            orden: 0,
            folio_establecimiento: folio,
            folio_area: 0,
            folio_unidad: 0,
            nombre_area: '',
            nombre_unidad: '',
            folio_usuario_ultima_modificacion: '',
            estatus: 'V'
        };
        this.opcion_establecimiento = this.opcion_establecimiento.bind(this);
        this.seleccionar_estatus = this.seleccionar_estatus.bind(this);
        this.on_area = this.on_area.bind(this);
        this.on_establecimiento = this.on_establecimiento.bind(this);
        this.on_unidad = this.on_unidad.bind(this);
        this.opcion_areas = this.opcion_areas.bind(this);
        this.opcion_unidades = this.opcion_unidades.bind(this);
        this.agregar = this.agregar.bind(this);
        this.guardar = this.guardar.bind(this);
        this.nuevo = this.nuevo.bind(this);
        this.editar = this.editar.bind(this);
        this.cancelar = this.cancelar.bind(this);
    }

    _createClass(Datos, [{
        key: 'opcion_establecimiento',
        value: function opcion_establecimiento() {
            var _this = this;

            var v = this.lista_e.map(function (dato) {
                return React.createElement(
                    'option',
                    { value: dato.folio_establecimiento, selected: dato.folio_establecimiento == _this.state.folio_establecimiento },
                    dato.nombre_establecimiento
                );
            });
            console.log(v);
            return v;
        }
    }, {
        key: 'opcion_areas',
        value: function opcion_areas() {
            var _this2 = this;

            var v = this.lista_a.map(function (dato) {
                return React.createElement(
                    'option',
                    { value: dato.folio_area, selected: dato.folio_area == _this2.state.folio_area },
                    dato.nombre_area
                );
            });
            console.log(v);
            return v;
        }
    }, {
        key: 'opcion_unidades',
        value: function opcion_unidades() {
            var _this3 = this;

            var v = this.lista_u.map(function (dato) {
                return React.createElement(
                    'option',
                    { value: dato.folio_unidad, selected: dato.folio_unidad == _this3.state.folio_unidad },
                    dato.nombre_unidad
                );
            });
            return v;
        }
    }, {
        key: 'clic',
        value: function clic(e) {
            console.log(e);
            if (!this.state.editable) {
                this.setState({
                    orden: e.orden,
                    nombre_area: e.nombre_area,
                    folio_area: e.folio_area,
                    folio_unidad: e.folio_unidad,
                    nombre_unidad: e.nombre_unidad,
                    estatus: e.estatus
                });
            } else alert('Edicion activa');
        }
    }, {
        key: 'dato',
        value: function dato() {
            var _this4 = this;

            var verificar_estado = function verificar_estado(estado) {
                return estado == 'v' || estado == 'V' ? 'Vigente' : 'Cancelado';
            };
            var checar = function checar(folio) {
                return folio == _this4.state.orden ? "Seleccionado" : "";
            };
            var v = this.lista_c.map(function (dat, posision) {
                dat.orden = posision + 1;
                console.log(dat);
                return React.createElement(
                    'tr',
                    { className: checar(dat.orden), key: dat.orden, onClick: function () {
                            return _this4.clic(dat);
                        } },
                    React.createElement(
                        'td',
                        null,
                        posision + 1
                    ),
                    React.createElement(
                        'td',
                        null,
                        dat.nombre_area
                    ),
                    React.createElement(
                        'td',
                        null,
                        dat.nombre_unidad
                    ),
                    React.createElement(
                        'td',
                        null,
                        verificar_estado(dat.estatus)
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'div',
                            null,
                            React.createElement('span', { 'class': 'glyphicon glyphicon-trash', onClick: function () {
                                    return _this4.eliminar_de_tabla(dat);
                                } })
                        )
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement('span', { 'class': 'glyphicon glyphicon-chevron-up', onClick: function () {
                                return _this4.mover(-1, dat);
                            } }),
                        React.createElement('span', { 'class': 'glyphicon glyphicon-chevron-down', onClick: function () {
                                return _this4.mover(1, dat);
                            } })
                    )
                );
            });
            return v;
        }
    }, {
        key: 'on_unidad',
        value: function on_unidad(e) {
            var nombre = this.lista_u.filter(function (unidad) {
                return unidad.folio_unidad == e.target.value;
            })[0].nombre_unidad || '';
            if (this.state.editable) this.setState({ folio_unidad: e.target.value, nombre_unidad: nombre });
        }
    }, {
        key: 'on_establecimiento',
        value: function on_establecimiento(e) {
            this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", { folio_establecimiento: e.target.value });
            this.setState({ folio_establecimiento: e.target.value });
        }
    }, {
        key: 'on_area',
        value: function on_area(e) {
            var nombre = this.lista_a.filter(function (area) {
                return area.folio_area == e.target.value;
            })[0].nombre_area || '';
            var obj = { folio_area: e.target.value, nombre_area: nombre };
            console.log(obj);
            console.log(this.state);
            if (this.state.editable) this.setState({ folio_area: e.target.value, nombre_area: nombre });
        }
    }, {
        key: 'seleccionar_estatus',
        value: function seleccionar_estatus(e) {
            if (this.state.editable) this.setState({ estatus: e.target.value });
        }
    }, {
        key: 'guardar',
        value: function guardar() {
            if (!this.state.editable) {
                var datos_guardar = [];
                this.lista_c = this.lista_c.map(function (elemento) {
                    datos_guardar.push(elemento.orden + ',' + elemento.folio_establecimiento + ',' + elemento.folio_area + ',' + elemento.folio_unidad + ',' + elemento.estatus + ',' + ID_SCOI);
                });
                console.log(datos_guardar);
                conexion_ajax("servicios/datos_tabla.asmx/insert_catalogo", { datos: datos_guardar });
                this.setState({ nueva: false, editable: false });
                this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", {
                    folio_establecimiento: this.state.folio_establecimiento });
                this.lista_u = conexion_ajax("servicios/datos_tabla.asmx/cargar_unidades");
                this.setState({ nueva: false, editable: false, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' });
            } else {
                alert('Primero debes de agregar para guardar los cambios');
            }
        }
    }, {
        key: 'agregar',
        value: function agregar() {
            var _this5 = this;

            if (this.state.folio_area > 0 && this.state.folio_unidad > 0) {
                if (this.state.editable) {
                    var obj = {
                        orden: this.state.orden,
                        folio_establecimiento: this.lista_e.filter(function (est) {
                            return est.folio_establecimiento == _this5.state.folio_establecimiento;
                        })[0].folio_establecimiento,
                        folio_area: this.state.folio_area,
                        folio_unidad: this.state.folio_unidad,
                        nombre_unidad: this.state.nombre_unidad,
                        nombre_area: this.state.nombre_area,
                        estatus: this.state.estatus,
                        folio_usuario_ultima_modificacion: ID_SCOI
                    };
                    console.log(this.state);
                    console.log(obj);
                    console.log(this.state.orden);
                    console.log(this.lista_c.length);
                    if (this.state.orden < this.lista_c.length + 1) {
                        var caja = this.lista_c.filter(function (element) {
                            return element.orden == _this5.state.orden;
                        });
                        var pos = this.lista_c.indexOf(caja[0]);
                        this.lista_c[pos] = obj;
                        console.log('esta en la lista ' + caja[0].orden);
                    } else if (this.lista_c.filter(function (item) {
                        return item.folio_unidad == _this5.state.folio_unidad;
                    }).length == 0) {
                        console.log(this.lista_c.length - 1);
                        console.log(obj);
                        this.lista_c.push(obj);
                    }
                    this.setState({ nueva: false, editable: false, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' });
                } else alert('habilitar edicion');
            } else alert('Faltan campos por completar');
        }
    }, {
        key: 'cancelar',
        value: function cancelar() {
            this.setState({ editable: false, nueva: false, orden: 0, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' });
            this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", {
                folio_establecimiento: this.state.folio_establecimiento
            });
            this.setState({ editable: false, nueva: false, orden: 0, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' });
        }
    }, {
        key: 'nuevo',
        value: function nuevo() {
            if (!(this.state.nueva && this.state.editable)) this.setState({ nueva: true, editable: true, orden: this.lista_c.length + 1, estatus: 'V' });else {
                alert('Edicion activa');
            }
        }
    }, {
        key: 'editar',
        value: function editar() {
            if (!(this.state.nueva && this.state.editable) && this.state.orden > 0 && this.state.folio_area > 0 && this.state.folio_unidad > 0) {
                this.setState({ editable: true });
            } else alert('Sin Campos Seleccionados');
        }
    }, {
        key: 'mover',
        value: function mover(_mover, fila) {
            if (!this.state.editable) {
                console.info(fila);
                console.info(this.state);
                var posision_inicial = this.lista_c.indexOf(fila);
                var posision_nueva = posision_inicial + _mover;
                if (posision_nueva < this.lista_c.length) {
                    this.lista_c[posision_inicial] = this.lista_c[posision_nueva];
                    this.lista_c[posision_nueva] = fila;
                    this.lista_c = this.lista_c.map(function (dato, posision) {
                        dato.orden = posision + 1;
                        console.log(posision);
                        return dato;
                    });
                    this.setState({ editable: false });
                } else alert('Edicion activada');
            }
        }
    }, {
        key: 'eliminar_de_tabla',
        value: function eliminar_de_tabla(dat) {
            var _this6 = this;

            if (!this.state.editable) {
                var eliminar = this.lista_c.indexOf(dat);
                this.lista_c.splice(eliminar, 1);
                this.setState({ orden: '' });
                if (this.lista_c.length > 0) this.lista_c = this.lista_c.map(function (tito) {
                    tito.orden = _this6.lista_c.indexOf(tito) + 1;
                    return tito;
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Botonera, {
                    nuevo: this.nuevo.bind(this),
                    editar: this.editar.bind(this),
                    deshacer: this.cancelar.bind(this),
                    class_editar: this.state.editable,
                    guardar: this.guardar.bind(this),
                    class_nuevo: this.state.nueva }),
                React.createElement(Cabecera, { nombre_establecimiento: this.opcion_establecimiento(),
                    nombre_area: this.opcion_areas(),
                    nombre_unidad: this.opcion_unidades(),
                    orden: this.orden,
                    estatus: this.state.estatus,
                    folio_establecimiento: this.state.folio_establecimiento,
                    opcion_establecimiento: this.opcion_establecimiento,
                    seleccionar_estatus: this.seleccionar_estatus.bind(this),
                    opcion_areas: this.opcion_areas,
                    opcion_unidades: this.opcion_unidades,
                    on_area: this.on_area.bind(this),
                    on_unidad: this.on_unidad.bind(this),
                    on_establecimiento: this.on_establecimiento.bind(this) }),
                React.createElement(Botones, { agregar: this.agregar,
                    guardar: this.guardar }),
                React.createElement(Tabla, { tabla: this.dato() })
            );
        }
    }]);

    return Datos;
})(React.Component);

var estilo_cabecera_tabla = {
    'position': 'stinky',
    'min-width': '100%',
    'top': '-1px'
};
var estilo_tabla = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '100%',
    'height': '300px',
    'border': 'solid 1px gray',
    'border-radius': '10px'
};
ReactDOM.render(React.createElement(Datos, null), document.getElementById("pruebas"));

