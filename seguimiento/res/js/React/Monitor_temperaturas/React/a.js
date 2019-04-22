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
            var folio_area = this.props.folio_area || '';
            var nombre_area = this.props.nombre_area || '';
            var status_area = this.props.status_area || 'v';
            var cambiar_nombre = this.props.cambiar_nombre;
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
                        React.createElement('input', { type: 'text', value: folio_area, className: 'form-control' })
                    ),
                    '                    ',
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback  ' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Areas'
                        ),
                        React.createElement('input', { type: 'text', value: nombre_area, onChange: cambiar_nombre, className: 'form-control' })
                    ),
                    '                    ',
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
                            this.ver_status(status_area)
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'input-group col-lg-2 ' },
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
        value: function ver_status(status_area) {
            var v = [];
            if (status_area == 'v' || status_area == 'V') {
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

var Tabla_a = (function (_React$Component2) {
    _inherits(Tabla_a, _React$Component2);

    function Tabla_a() {
        _classCallCheck(this, Tabla_a);

        _get(Object.getPrototypeOf(Tabla_a.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Tabla_a, [{
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
                            { style: estilo_cabecera_tabla },
                            React.createElement(
                                'td',
                                null,
                                'Folio'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'Area'
                            ),
                            React.createElement(
                                'td',
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

    return Tabla_a;
})(React.Component);

var Areas = (function (_React$Component3) {
    _inherits(Areas, _React$Component3);

    function Areas(props) {
        _classCallCheck(this, Areas);

        _get(Object.getPrototypeOf(Areas.prototype), 'constructor', this).call(this);
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_area_matriz");
        this.cambiar_nombre = this.cambiar_nombre.bind(this);
        this.cambiar_status = this.cambiar_status.bind(this);
        this.nuevo = this.nuevo.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.filtro = this.on_filtro.bind(this);
        this.guardar = this.guardar.bind(this);
        this.state = {
            nueva: false,
            editable: false,
            folio_area: 0,
            nombre_area: '',
            status_area: 'v',
            filtro_nombre: ''
        };
    }

    _createClass(Areas, [{
        key: 'clic',
        value: function clic(v) {
            if (!this.state.editable) {
                this.setState({
                    folio_area: v.folio_area,
                    nombre_area: v.nombre_area,
                    status_area: v.status_area
                });
            } else alert('Edicion activa');
        }
    }, {
        key: 'datos',
        value: function datos() {
            var _this = this;

            console.log(this.lista);
            var nombre_area = this.lista.filter(function (item) {
                return item.nombre_area.toUpperCase().search(_this.state.filtro_nombre.toUpperCase()) >= 0;
            });
            var verificar_estado = function verificar_estado(estado) {
                return estado == 'v' || estado == 'V' ? 'Vigente' : 'Cancelado';
            };
            var checar = function checar(folio) {
                return folio == _this.state.folio_area ? "Seleccionado" : "";
            };
            console.log(this.lista);
            var v = nombre_area.map(function (dato) {
                return React.createElement(
                    'tr',
                    { className: checar(dato.folio_area), key: dato.folio_area, onClick: function () {
                            return _this.clic(dato);
                        } },
                    React.createElement(
                        'td',
                        null,
                        dato.folio_area
                    ),
                    React.createElement(
                        'td',
                        null,
                        dato.nombre_area
                    ),
                    React.createElement(
                        'td',
                        null,
                        verificar_estado(dato.status_area)
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement('span', { className: 'glyphicon glyphicon-trash', onClick: function () {
                                return _this.eliminar(dato);
                            } })
                    )
                );
            });
            return v;
        }
    }, {
        key: 'nuevo',
        value: function nuevo() {
            if (this.lista.length > 0) {
                if (!(this.state.nueva || this.state.editable)) {
                    var consecutivo = conexion_ajax('servicios/datos_tabla.asmx/consecutivo_folio_areas');
                    this.setState({ nueva: true, editable: true, folio_area: consecutivo, nombre_area: '', status_area: 'V' });
                    console.log('nuevo');
                } else alert('Edicion activa');
            } else this.setState({ nueva: true, editable: true, folio_area: 1, nombre_area: '' });
        }
    }, {
        key: 'editar',
        value: function editar() {
            if (!(this.state.nueva && this.state.editable) && this.state.folio_area > 0 && this.state.nombre_area != '') {
                this.setState({ nueva: false, editable: true });
            } else alert('Sin Campos Seleccionados');
        }
    }, {
        key: 'guardar',
        value: function guardar() {
            var _this2 = this;

            if (!this.lista.includes(this.lista.filter(function (item) {
                return item.nombre_area == _this2.state.nombre_area && _this2.state.nueva;
            })[0])) {
                if (this.state.editable) {
                    if (this.state.folio_area > 0 && !this.state.nombre_area == '') {
                        var respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_area', { folio_area: this.state.folio_area, nombre_area: this.state.nombre_area, status_area: this.state.status_area });
                        this.setState({ nueva: false, editable: false, folio_area: '', nombre_area: '' });
                        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_area_matriz");
                        console.log(respuesta);
                    } else alert('Hay campos sin llenar');
                } else alert('Edicion deshactivada');
            } else alert('Ya existe un area con el mismo nombre');
        }
    }, {
        key: 'cancelar',
        value: function cancelar() {
            this.setState({ editable: false, nueva: false, folio_area: '', nombre_area: '', status_area: 'V' });
        }
    }, {
        key: 'eliminar',
        value: function eliminar(dato) {
            if (!this.state.editable) {
                var respuesta = conexion_ajax('servicios/datos_tabla.asmx/delete_area', { folio_area: dato.folio_area });
                this.setState({ folio_area: '', nombre_area: '' });
                this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_area_matriz");
            }
        }
    }, {
        key: 'cambiar_nombre',
        value: function cambiar_nombre(v) {
            if (this.state.editable) this.setState({ nombre_area: v.target.value });
        }
    }, {
        key: 'cambiar_status',
        value: function cambiar_status(v) {
            if (this.state.editable) this.setState({ status_area: v.target.value });
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
                React.createElement(Botonera, {
                    nuevo: this.nuevo.bind(this),
                    editar: this.editar.bind(this),
                    guardar: this.guardar.bind(this),
                    deshacer: this.cancelar.bind(this),
                    class_editar: this.state.editable,
                    class_nuevo: this.state.nueva }),
                React.createElement(Cabecera, { folio_area: this.state.folio_area,
                    nombre_area: this.state.nombre_area,
                    cambiar_status: this.cambiar_status,
                    status_area: this.state.status_area,
                    cambiar_nombre: this.cambiar_nombre,
                    filtro_nombre: this.filtro }),
                React.createElement(Tabla_a, { cuerpo: this.datos() })
            );
        }
    }]);

    return Areas;
})(React.Component);

var estilo_cabecera_tabla = {
    'position': 'stinky',
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
ReactDOM.render(React.createElement(Areas, null), document.getElementById("pruebas"));

