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
            var folio_unidad = this.props.folio_unidad || '';
            var nombre_unidad = this.props.nombre_unidad || '';
            var status_unidad = this.props.status_unidad || 'v';
            var cambiar_nombre_u = this.props.cambiar_nombre_u;
            var cambiar_status_u = this.props.cambiar_status_u;
            var limite_inferior = this.props.limite_inferior || '';
            var limite_superior = this.props.limite_superior || '';
            var cambiar_lim_inf = this.props.cambiar_lim_inf;
            var cambiar_lim_sup = this.props.cambiar_lim_sup;
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
                        React.createElement('input', { type: 'text', value: folio_unidad, className: 'form-control' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback  ' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Unidad'
                        ),
                        React.createElement('input', { type: 'text', value: nombre_unidad, onChange: cambiar_nombre_u, className: 'form-control' })
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
                            { onChange: cambiar_status_u, className: 'form-control' },
                            this.ver_status(status_unidad)
                        )
                    )
                ),
                React.createElement(
                    'form',
                    { 'class': 'form-inline' },
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback ' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Limite inferior'
                        ),
                        React.createElement('input', { type: 'number', min: '-100', max: '100', value: limite_inferior, onChange: cambiar_lim_inf, className: 'form-control' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'input-group has-feedback ' },
                        React.createElement(
                            'label',
                            { 'class': 'input-group-addon' },
                            'Limite Superior'
                        ),
                        React.createElement('input', { type: 'number', min: '-100', max: '100', value: limite_superior, onChange: cambiar_lim_sup, className: 'form-control' })
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'input-group has-feedback col-lg-2 ' },
                    React.createElement(
                        'label',
                        { 'class': 'input-group-addon' },
                        ' ',
                        React.createElement('span', { className: 'fa fa-filter' }),
                        ' Filtro'
                    ),
                    React.createElement('input', { type: 'text', name: 'filtro', onChange: this.props.filtro_nombre, className: 'form-control' })
                )
            );
        }
    }, {
        key: 'ver_status',
        value: function ver_status(status_unidad) {
            var v = [];
            if (status_unidad == 'v' || status_unidad == 'V') {
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

var Tabla_u = (function (_React$Component2) {
    _inherits(Tabla_u, _React$Component2);

    function Tabla_u() {
        _classCallCheck(this, Tabla_u);

        _get(Object.getPrototypeOf(Tabla_u.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Tabla_u, [{
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
                                'Unidades'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'Estado'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'Limite minimo'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'Limite maximo'
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

    return Tabla_u;
})(React.Component);

var Unidades = (function (_React$Component3) {
    _inherits(Unidades, _React$Component3);

    function Unidades(props) {
        _classCallCheck(this, Unidades);

        _get(Object.getPrototypeOf(Unidades.prototype), 'constructor', this).call(this);
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_unidad_matriz");
        this.state = {
            nueva: false,
            editable: false,
            folio_unidad: 0,
            nombre_unidad: '',
            status_unidad: 'v',
            filtro_nombre: '',
            limite_inferior: 0,
            limite_superior: 0
        };
        this.nuevo = this.nuevo.bind(this);
        this.cambiar_nombre_u = this.cambiar_nombre_u.bind(this);
        this.cambiar_status_u = this.cambiar_status_u.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.filtro = this.on_filtro.bind(this);
        this.cambiar_lim_inf = this.cambiar_lim_inf.bind(this);
        this.cambiar_lim_sup = this.cambiar_lim_sup.bind(this);
    }

    _createClass(Unidades, [{
        key: 'clic_tabla_u',
        value: function clic_tabla_u(v) {
            if (!this.state.editable) {
                this.setState({
                    folio_unidad: v.folio_unidad,
                    nombre_unidad: v.nombre_unidad,
                    status_unidad: v.status_unidad,
                    limite_inferior: v.limite_inferior,
                    limite_superior: v.limite_superior
                });
            } else alert('Edicion activa');
        }
    }, {
        key: 'dato',
        value: function dato() {
            var _this = this;

            //filtro
            console.log(this.lista);
            var nombre_unidad = this.lista.filter(function (item) {
                return item.nombre_unidad.toUpperCase().search(_this.state.filtro_nombre.toUpperCase()) >= 0;
            });
            var verificar_estado = function verificar_estado(estado) {
                return estado == 'v' || estado == 'V' ? 'Vigente' : 'Cancelado';
            };
            var checar = function checar(folio) {
                return folio == _this.state.folio_unidad ? "Seleccionado" : "";
            };
            console.log(nombre_unidad);
            var v = nombre_unidad.map(function (dat) {
                return React.createElement(
                    'tr',
                    { className: checar(dat.folio_unidad), key: dat.folio_unidad, onClick: function () {
                            return _this.clic_tabla_u(dat);
                        } },
                    React.createElement(
                        'td',
                        null,
                        dat.folio_unidad
                    ),
                    React.createElement(
                        'td',
                        null,
                        dat.nombre_unidad
                    ),
                    React.createElement(
                        'td',
                        null,
                        verificar_estado(dat.status_unidad)
                    ),
                    React.createElement(
                        'td',
                        null,
                        dat.limite_inferior
                    ),
                    React.createElement(
                        'td',
                        null,
                        dat.limite_superior
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
            return v;
        }
    }, {
        key: 'nuevo',
        value: function nuevo() {
            if (this.lista.length > 0) {
                if (!(this.state.nueva || this.state.editable)) {
                    var consecutivo_u = conexion_ajax('servicios/datos_tabla.asmx/consecutivo_folio_unidades');
                    this.setState({ nueva: true, editable: true, folio_unidad: consecutivo_u, nombre_unidad: '', limite_inferior: 0, limite_superior: 0, status_unidad: 'V' });
                    console.log('nuevo');
                } else alert('Edicion activa');
            } else this.setState({ nueva: true, editable: true, folio_unidad: 1, nombre_unidad: '', limite_inferior: 0, limite_superior: 0 });
        }
    }, {
        key: 'editar',
        value: function editar() {
            if (!(this.state.nueva && this.state.editable) && this.state.folio_unidad > 0 && this.state.nombre_unidad != '' && this.state.limite_inferior < 0 && this.state.limite_superior > 0) {
                this.setState({ nueva: false, editable: true });
            } else alert('Sin Campos Seleccionados');
        }
    }, {
        key: 'guardar',
        value: function guardar() {
            var _this2 = this;

            if (!this.lista.includes(this.lista.filter(function (item) {
                return item.nombre_unidad == _this2.state.nombre_unidad && _this2.state.nueva;
            })[0])) {
                if (this.state.editable) {
                    if (this.state.folio_unidad > 0 && !this.state.nombre_unidad == '' && !this.state.limite_inferior == '' && !this.state.limite_superior == '') {
                        var respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_unidad', { folio_unidad: this.state.folio_unidad, nombre_unidad: this.state.nombre_unidad, status_unidad: this.state.status_unidad, limite_inferior: this.state.limite_inferior, limite_superior: this.state.limite_superior });
                        this.setState({ nueva: false, editable: false, folio_unidad: 0, nombre_unidad: '', limite_inferior: 0, limite_superior: 0, status_unidad: 'V' });
                        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_unidad_matriz");
                        console.log(respuesta);
                    } else alert('Hay campos sin llenar');
                } else alert('Edicion deshactivada');
            } else alert('Ya existe una unidad con el mismo nombre');
        }
    }, {
        key: 'cancelar',
        value: function cancelar() {
            this.setState({ editable: false, nueva: false, folio_unidad: 0, nombre_unidad: '', limite_inferior: 0, limite_superior: 0, status_unidad: 'V' });
        }
    }, {
        key: 'eliminar',
        value: function eliminar(dat) {
            if (!this.state.editable) {
                var respuesta = conexion_ajax('servicios/datos_tabla.asmx/delete_unidad', { folio_unidad: dat.folio_unidad });
                this.setState({ folio_unidad: '', nombre_unidad: '', limite_inferior: 0, limite_superior: 0 });
                this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_unidad_matriz");
            }
        }
    }, {
        key: 'cambiar_nombre_u',
        value: function cambiar_nombre_u(v) {
            if (this.state.editable) this.setState({ nombre_unidad: v.target.value });
        }
    }, {
        key: 'cambiar_lim_inf',
        value: function cambiar_lim_inf(v) {
            if (this.state.editable) this.setState({ limite_inferior: v.target.value });
        }
    }, {
        key: 'cambiar_lim_sup',
        value: function cambiar_lim_sup(v) {
            if (this.state.editable) this.setState({ limite_superior: v.target.value });
        }
    }, {
        key: 'cambiar_status_u',
        value: function cambiar_status_u(v) {
            if (this.state.editable) this.setState({ status_unidad: v.target.value });
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
                React.createElement(Cabecera, { folio_unidad: this.state.folio_unidad,
                    nombre_unidad: this.state.nombre_unidad,
                    cambiar_nombre_u: this.cambiar_nombre_u,
                    status_unidad: this.state.status_unidad,
                    cambiar_status_u: this.cambiar_status_u,
                    limite_inferior: this.state.limite_inferior,
                    limite_superior: this.state.limite_superior,
                    cambiar_lim_inf: this.cambiar_lim_inf,
                    cambiar_lim_sup: this.cambiar_lim_sup,
                    filtro_nombre: this.filtro }),
                React.createElement(Tabla_u, { cuerpo: this.dato() })
            );
        }
    }]);

    return Unidades;
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
ReactDOM.render(React.createElement(Unidades, null), document.getElementById("pruebas"));

