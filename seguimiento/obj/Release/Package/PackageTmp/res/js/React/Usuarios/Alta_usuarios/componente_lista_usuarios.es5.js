'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListaUsuarios = (function (_React$Component) {
    _inherits(ListaUsuarios, _React$Component);

    function ListaUsuarios(props) {
        _classCallCheck(this, ListaUsuarios);

        _get(Object.getPrototypeOf(ListaUsuarios.prototype), 'constructor', this).call(this, props);
        this.state = {
            usuario: {
                folio: -1,
                id_scoi: -1,
                foto: '/Data/usr.jpg',
                nombre: '',
                nombre_completo: '',
                correo: ''
            },
            lista: [],
            filtro: '',
            accessos: []
        };
        this.on_filtro = this._filtro.bind(this);
        this.on_edicion = this._edicion.bind(this);
        this.on_accesos_usuario = this._accesos_usuario.bind(this);

        this.Obtener_Usuarios();
    }

    _createClass(ListaUsuarios, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'panel-body', style: { height: "450px" } },
                React.createElement(FiltroUsuarios, {
                    value: this.state.filtro,
                    event: this.on_filtro
                }),
                React.createElement(TablaUsuarios, {
                    lista: this.state.lista,
                    filtro: this.state.filtro,
                    edicion: this.on_edicion,
                    accesos: this.on_accesos_usuario,
                    folio_usiario: this.state.usuario.folio_usiario
                }),
                React.createElement(ModalEdicionUsuario, {
                    recargar: this.Obtener_Usuarios.bind(this),
                    usuario: this.state.usuario }),
                React.createElement(ModalAccesoUsuario, {
                    accesos: this.state.accessos,
                    usuario: this.state.usuario
                })
            );
        }

        /*eventos*/
    }, {
        key: '_filtro',
        value: function _filtro(e) {
            this.setState({ filtro: e.target.value });
        }
    }, {
        key: '_seleccionar',
        value: function _seleccionar(seleccion) {
            var sel = {
                folio: seleccion.id_usuario,
                id_scoi: seleccion.id_scoi,
                foto: seleccion.foto,
                nombre: seleccion.nombre_usuario,
                nombre_completo: seleccion.nombrecompleto_usuario,
                correo: seleccion.email_usuario
            };
            this.setState({ usuario: sel });
        }
    }, {
        key: '_edicion',
        value: function _edicion(seleccion) {
            this._seleccionar(seleccion);
            document.getElementById("modal_edicion_usuario").style.display = 'flex';
        }
    }, {
        key: '_accesos_usuario',
        value: function _accesos_usuario(seleccion) {
            document.getElementById("ico_carga").style.display = 'flex';
            this._seleccionar(seleccion);
            this.Obtener_accesos(seleccion.id_usuario);
        }

        /*metodos*/
        /*conexiones*/
    }, {
        key: 'Obtener_Usuarios',
        value: function Obtener_Usuarios() {
            var _this = this;

            var url = 'servicios/accesoServ.asmx/Obtener_lista_usuarios';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (r) {
                    var lista = [];
                    if (r.d.length > 0) lista = r.d;else alert("sin Usuarios...");

                    document.getElementById("ico_carga").style.display = 'none';
                    _this.setState({ lista: lista });
                });
            })['catch'](function (e) {
                alert(e);
            });
        }
    }, {
        key: 'Obtener_accesos',
        value: function Obtener_accesos(folio) {
            var _this2 = this;

            var url = 'servicios/accesoServ.asmx/checar_acceso';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    id_usuario: folio
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (r) {
                    var lista = [];
                    if (r.d.length > 0) lista = r.d;else alert("sin Usuarios...");
                    console.log(lista);
                    document.getElementById("ico_carga").style.display = 'none';
                    document.getElementById("modal_accesso_usuario").style.display = 'flex';
                    _this2.setState({ accessos: lista });
                });
            })['catch'](function (e) {
                alert(e);
            });
        }
    }]);

    return ListaUsuarios;
})(React.Component);

var FiltroUsuarios = function FiltroUsuarios(_ref) {
    var value = _ref.value;
    var event = _ref.event;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'strong',
            null,
            ' Filtro Usuarios:'
        ),
        React.createElement('input', { className: 'form-control', placeholder: 'Filtro...', value: value, onChange: event })
    );
};
var TablaUsuarios = function TablaUsuarios(_ref2) {
    var lista = _ref2.lista;
    var filtro = _ref2.filtro;
    var edicion = _ref2.edicion;
    var accesos = _ref2.accesos;

    var filtro_ = filtro.toUpperCase();
    var lista_filtro = lista.filter(function (e) {
        return e.id_usuario.toString().search(filtro) > -1 || e.nombre_usuario.toUpperCase().search(filtro_) > -1 || e.nombrecompleto_usuario.toUpperCase().search(filtro_) > -1 || e.id_scoi.toString().search(filtro) > -1;
    });
    return React.createElement(
        'div',
        { className: 'panel-default', style: { height: "380px", overflow: "scroll" } },
        React.createElement(
            'table',
            { className: 'table' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    { className: 'info' },
                    React.createElement(
                        'th',
                        null,
                        'folio'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Nombre'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Nombre Completo'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Correo'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'SCOI'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Editar'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Accesos'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                lista_filtro.map(function (e) {
                    return React.createElement(Usuarios, {
                        usuario: e,
                        accesos: accesos,
                        edicion: edicion,
                        key: e.id_usuario });
                })
            )
        )
    );
};

var Usuarios = function Usuarios(_ref3) {
    var usuario = _ref3.usuario;
    var edicion = _ref3.edicion;
    var accesos = _ref3.accesos;

    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            usuario.id_usuario
        ),
        React.createElement(
            'td',
            null,
            usuario.nombre_usuario
        ),
        React.createElement(
            'td',
            null,
            usuario.nombrecompleto_usuario
        ),
        React.createElement(
            'td',
            null,
            usuario.email_usuario
        ),
        React.createElement(
            'td',
            null,
            usuario.id_scoi
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'i',
                { className: 'btn btn-primary',
                    onClick: function () {
                        return edicion(usuario);
                    }
                },
                '   Editar',
                React.createElement('i', { className: 'glyphicon glyphicon-edit',
                    style: { marginLeft: "5px" }
                })
            )
        ),
        React.createElement(
            'td',
            null,
            React.createElement(
                'i',
                { className: 'btn btn-success',
                    onClick: function () {
                        return accesos(usuario);
                    }
                },
                '   Accesos',
                React.createElement('i', { className: 'glyphicon glyphicon-lock',
                    style: { marginLeft: "5px" }
                })
            )
        )
    );
};

