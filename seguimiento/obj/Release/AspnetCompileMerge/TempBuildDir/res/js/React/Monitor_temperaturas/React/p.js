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
            var folio_establecimiento = this.props.folio_establecimiento || '';
            var nombre_establecimiento = this.props.nombre_establecimiento || '';
            var status_establecimiento = this.props.status_establecimiento || 'v';
            var cambiar_nombre_establecimiento = this.props.cambiar_nombre_establecimiento;
            var cambiar_status = this.props.cambiar_status;
            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'form',
                    { 'class': 'form-inline' },
                    React.createElement(
                        'div',
                        { 'class': 'input-group' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Folio'
                        ),
                        React.createElement('input', { type: 'text', value: folio_establecimiento, className: 'form-control' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback  ' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Establecimientos'
                        ),
                        React.createElement('input', { type: 'text', value: nombre_establecimiento, onChange: cambiar_nombre_establecimiento, className: 'form-control' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback ' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Estado'
                        ),
                        React.createElement(
                            'select',
                            { onChange: cambiar_status, className: 'form-control' },
                            this.ver_status(status_establecimiento)
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'input-group has-feedback col-lg-2 ' },
                    React.createElement(
                        'label',
                        { 'class': 'input-group-addon' },
                        React.createElement('span', { className: 'fa fa-filter' }),
                        ' Filtro'
                    ),
                    React.createElement('input', { type: 'text', name: 'filtro', onChange: this.props.filtro_nombre, className: 'form-control' })
                )
            );
        }
    }, {
        key: 'ver_status',
        value: function ver_status(status_establecimiento) {
            var e = [];
            if (status_establecimiento == 'v' || status_establecimiento == 'V') {
                e.push(React.createElement(
                    'option',
                    { value: 'v', selected: true },
                    'Vigente'
                ), React.createElement(
                    'option',
                    { value: 'c' },
                    'Cancelado'
                ));
            } else e.push(React.createElement(
                'option',
                { value: 'v' },
                'Vigente'
            ), React.createElement(
                'option',
                { value: 'c', selected: true },
                'Cancelado'
            ));
            return e;
        }
    }]);

    return Cabecera;
})(React.Component);

var Tabla_e = (function (_React$Component2) {
    _inherits(Tabla_e, _React$Component2);

    function Tabla_e() {
        _classCallCheck(this, Tabla_e);

        _get(Object.getPrototypeOf(Tabla_e.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Tabla_e, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: estilo_tabla },
                React.createElement(
                    'table',
                    { 'class': 'table' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            {
                                style: estilo_cabecera_tabla
                            },
                            React.createElement(
                                'th',
                                null,
                                'Folio'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Establecimiento'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Estado'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'Eliminar'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.props.cuerpo
                    )
                )
            );
        }
    }]);

    return Tabla_e;
})(React.Component);

var Establecimientos = (function (_React$Component3) {
    _inherits(Establecimientos, _React$Component3);

    function Establecimientos(props) {
        _classCallCheck(this, Establecimientos);

        _get(Object.getPrototypeOf(Establecimientos.prototype), 'constructor', this).call(this, props);
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
        this.cancelar = this.cancelar.bind(this);
        this.nuevo = this.nuevo.bind(this);
        this.cambiar_nombre_establecimiento = this.cambiar_nombre_establecimiento.bind(this);
        this.cambiar_status = this.cambiar_status.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.filtro = this.on_filtro.bind(this);
        this.guardar = this.guardar.bind(this);
        this.state = {
            nueva: false,
            editable: false,
            folio_establecimiento: 0,
            nombre_establecimiento: '',
            status_establecimiento: 'v',
            filtro_nombre: ''
        };
    }

    _createClass(Establecimientos, [{
        key: 'clic_tabla',
        value: function clic_tabla(e) {
            console.log(e);
            if (!this.state.editable) {
                this.setState({
                    folio_establecimiento: e.folio_establecimiento,
                    nombre_establecimiento: e.nombre_establecimiento,
                    status_establecimiento: e.status_establecimiento
                });
            } else alert('Edicion activa');
        }
    }, {
        key: 'data',
        value: function data() {
            var _this = this;

            console.log(this.lista);
            var nombre_establecimiento = this.lista.filter(function (item) {
                return item.nombre_establecimiento.toUpperCase().search(_this.state.filtro_nombre.toUpperCase()) >= 0;
            });
            var checar = function checar(folio) {
                return folio == _this.state.folio_establecimiento ? "Seleccionado" : "";
            };
            var verificar_estado = function verificar_estado(estado) {
                return estado == 'v' || estado == 'V' ? 'Vigente' : 'Cancelado';
            };
            console.log(this.lista);
            var e = nombre_establecimiento.map(function (dat) {
                return React.createElement(
                    'tr',
                    { className: checar(dat.folio_establecimiento), key: dat.folio_establecimiento, onClick: function () {
                            return _this.clic_tabla(dat);
                        } },
                    React.createElement(
                        'td',
                        null,
                        dat.folio_establecimiento
                    ),
                    React.createElement(
                        'td',
                        null,
                        dat.nombre_establecimiento
                    ),
                    React.createElement(
                        'td',
                        null,
                        verificar_estado(dat.status_establecimiento)
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement('span', { className: 'glyphicon glyphicon-trash', onClick: function () {
                                return _this.eliminar(dat);
                            } })
                    )
                );
            });
            return e;
        }
    }, {
        key: 'nuevo',
        value: function nuevo() {
            if (this.lista.length > 0) {
                if (!(this.state.nueva || this.state.editable)) {
                    var consecutivo = conexion_ajax('servicios/datos_tabla.asmx/consecutivo_folio_establecimiento');
                    this.setState({ nueva: true, editable: true, folio_establecimiento: consecutivo, nombre_establecimiento: '', status_establecimiento: 'V' });
                    console.log('nuevo');
                } else alert('Edicion activa');
            } else {
                this.setState({ nueva: true, editable: true, folio_establecimiento: 1, nombre_establecimiento: '', status_establecimiento: 'V' });
            }
        }
    }, {
        key: 'editar',
        value: function editar() {
            if (!(this.state.nueva && this.state.editable) && this.state.folio_establecimiento > 0 && this.state.nombre_establecimiento != '') {
                this.setState({ nueva: false, editable: true });
            } else alert('Sin Campos Seleccionados');
        }
    }, {
        key: 'guardar',
        value: function guardar() {
            var _this2 = this;

            if (!this.lista.includes(this.lista.filter(function (item) {
                return item.nombre_establecimiento == _this2.state.nombre_establecimiento && _this2.state.nueva;
            })[0])) {
                if (this.state.editable) {
                    if (this.state.folio_establecimiento > 0 && !this.state.nombre_establecimiento == '') {
                        var respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_establecimiento', { folio_establecimiento: this.state.folio_establecimiento, nombre_establecimiento: this.state.nombre_establecimiento, status_establecimiento: this.state.status_establecimiento });
                        this.setState({ nueva: false, editable: false, folio_establecimiento: '', nombre_establecimiento: '' });
                        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
                        console.log(respuesta);
                    } else alert('Hay campos sin llenar');
                } else alert('Edicion deshactivada');
            } else alert('Ya existe un establecimiento con el mismo nombre');
        }
    }, {
        key: 'eliminar',
        value: function eliminar(dat) {
            if (!this.state.editable) {
                var respuesta = conexion_ajax('servicios/datos_tabla.asmx/delete_establecimiento', { folio_establecimiento: dat.folio_establecimiento });
                this.setState({ editable: false, nueva: false, folio_establecimiento: '', nombre_establecimiento: '' });
                this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
                alert(respuesta);
            }
        }
    }, {
        key: 'cancelar',
        value: function cancelar() {
            this.setState({ editable: false, nueva: false, folio_establecimiento: 0, nombre_establecimiento: '', status_establecimiento: 'V' });
            console.log('cancelar');
        }
    }, {
        key: 'cambiar_nombre_establecimiento',
        value: function cambiar_nombre_establecimiento(e) {
            if (this.state.editable) this.setState({ nombre_establecimiento: e.target.value });
        }
    }, {
        key: 'cambiar_status',
        value: function cambiar_status(e) {
            if (this.state.editable) this.setState({ status_establecimiento: e.target.value });
        }
    }, {
        key: 'on_filtro',
        value: function on_filtro(e) {
            this.setState({ filtro_nombre: e.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Botonera, { nuevo: this.nuevo.bind(this),
                    editar: this.editar.bind(this),
                    guardar: this.guardar.bind(this),
                    deshacer: this.cancelar.bind(this),
                    class_editar: this.state.editable,
                    class_nuevo: this.state.nueva }),
                React.createElement(Cabecera, { folio_establecimiento: this.state.folio_establecimiento,
                    nombre_establecimiento: this.state.nombre_establecimiento,
                    cambiar_status: this.cambiar_status,
                    status_establecimiento: this.state.status_establecimiento,
                    cambiar_nombre_establecimiento: this.cambiar_nombre_establecimiento,
                    filtro_nombre: this.filtro }),
                React.createElement(Tabla_e, { cuerpo: this.data() })
            );
        }
    }]);

    return Establecimientos;
})(React.Component);

var estilo_cabecera_tabla = {
    'position': 'sticky',
    'min-width': '100%',
    'top': '-1px',
    "background": "#dd8000"
};
var estilo_tabla = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '100%',
    'height': '300px',
    'border': 'solid 1px gray',
    'border-radius': '10px'
};
ReactDOM.render(React.createElement(Establecimientos, null), document.getElementById("pruebas"));

