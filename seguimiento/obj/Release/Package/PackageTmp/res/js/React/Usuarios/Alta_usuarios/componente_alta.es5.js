'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AltaUsuario = (function (_React$Component) {
    _inherits(AltaUsuario, _React$Component);

    function AltaUsuario(props) {
        _classCallCheck(this, AltaUsuario);

        _get(Object.getPrototypeOf(AltaUsuario.prototype), 'constructor', this).call(this, props);
        this.state = {
            usuario: {
                id_scoi: -1,
                foto: '/Data/usr.jpg',
                nombre: '',
                establecimiento: '',
                departamento: '',
                puesto: '',
                correo: ''
            }
        };
    }

    _createClass(AltaUsuario, [{
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                'div',
                { className: 'panel-heading' },
                React.createElement(
                    'h3',
                    { style: { marginLeft: "5px" } },
                    ' Agregar Usuario SCOI Web.'
                ),
                React.createElement(
                    'i',
                    { className: 'btn btn-info', style: { position: "absolute", marginTop: "63px", marginLeft: "105px" },
                        onClick: function () {
                            return _this.Agregar_usuaruio();
                        } },
                    React.createElement(
                        'strong',
                        null,
                        ' Agregar'
                    ),
                    React.createElement('i', { className: 'glyphicon glyphicon-download-alt', style: { marginLeft: "5px" } })
                ),
                React.createElement(ObtenerUsuario, {
                    usuario: this.state.usuario,
                    colocar: function (e) {
                        return _this.on_id_scoi(e);
                    },
                    Buscar: function () {
                        return _this.on_buscar_usuario();
                    }
                }),
                React.createElement(DatosUsiario, {
                    usuario: this.state.usuario }),
                React.createElement(Cargar, { nombre: "ico_carga" })
            );
        }

        /*eventos*/
    }, {
        key: 'on_id_scoi',
        value: function on_id_scoi(event) {
            var usuario = this.state.usuario;
            usuario.id_scoi = event.target.value;
            this.setState({ usuario: usuario });
        }
    }, {
        key: 'on_buscar_usuario',
        value: function on_buscar_usuario() {
            var id = this.state.usuario.id_scoi;
            if (id > 0) {
                document.getElementById("ico_carga").style.display = 'flex';
                this.Obtener_usuario(id);
            } else {
                alert("Coloque ID SCOI");
                this.setState({
                    usuario: {
                        id_scoi: -1,
                        foto: '/Data/usr.jpg',
                        nombre: '',
                        establecimiento: '',
                        departamento: '',
                        puesto: '',
                        correo: ''
                    }
                });
            }
        }

        /*metodos*/
    }, {
        key: 'Agregar_usuaruio',
        value: function Agregar_usuaruio() {
            var id = this.state.usuario.id_scoi;
            console.log('Usuario : ' + id + '.');
            if (id > 0) {
                document.getElementById("ico_carga").style.display = 'flex';
                this.Obtener_usuario(id);
                this.Comprobar_usuario();
            } else alert("Error de Usuario...");
        }

        /*conexiones*/
    }, {
        key: 'Obtener_usuario',
        value: function Obtener_usuario(id) {
            var _this2 = this;

            fetch("servicios/ususrios_scoiServ.asmx/obtener_usuario", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    tipo: 'id_scoi',
                    filtro: id
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (r) {
                    var usuario_ = r.d[0];
                    var usuario = _this2.state.usuario;
                    if (usuario_) {
                        usuario.nombre = usuario_.nombre_completo;
                        usuario.establecimiento = usuario_.establecimiento;
                        usuario.departamento = usuario_.departamento;
                        usuario.puesto = usuario_.puesto;
                        _this2.Obtener_foto(id);
                    } else {
                        usuario = {
                            id_scoi: -1,
                            foto: "/Data/usr.jpg",
                            nombre: '',
                            establecimiento: '',
                            departamento: '',
                            puesto: '',
                            correo: ''
                        };
                        alert("ID SCOI NO VALIDO O INACTIVO...");
                    }
                    _this2.setState({ usuario: usuario });
                    document.getElementById("ico_carga").style.display = 'none';
                });
            })['catch'](function (e) {
                alert(e);
            });
        }
    }, {
        key: 'Obtener_foto',
        value: function Obtener_foto(id) {
            var _this3 = this;

            fetch("servicios/ususrios_scoiServ.asmx/obtener_usuario_imagen", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    tipo: 'id_scoi',
                    filtro: id
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (r) {
                    var usuario_ = r.d;
                    var usuario = _this3.state.usuario;
                    if (usuario_) {
                        usuario.foto = usuario_.foto;
                    } else {
                        usuario.foto = "/Data/usr.jpg";
                        alert("ERROR DE FOTO...");
                    }
                    _this3.setState({ usuario: usuario });
                });
            })['catch'](function (e) {
                alert(e);
            });
        }
    }, {
        key: 'Comprobar_usuario',
        value: function Comprobar_usuario() {
            var _this4 = this;

            document.getElementById("ico_carga").style.display = 'flex';
            fetch("servicios/ususrios_scoiServ.asmx/Comprobar_usuario", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    folio: this.state.usuario.id_scoi
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (r) {
                    if (r.d > 0) {
                        document.getElementById("ico_carga").style.display = 'none';
                        if (confirm('Usuario Folio : ' + r.d + ', Se Encuentra Registrado.\n¿Desea Modifocar el Usuario?')) _this4.Guardar_usuario();
                    } else {
                        _this4.Guardar_usuario();
                    }
                    _this4.setState({});
                });
            })['catch'](function (e) {
                alert(e);
            });
        }
    }, {
        key: 'Guardar_usuario',
        value: function Guardar_usuario() {
            var _this5 = this;

            document.getElementById("ico_carga").style.display = 'flex';
            console.info(this.state.usuario);
            fetch("servicios/ususrios_scoiServ.asmx/Guardar_usuario_por_id_scoi", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    id_scoi: this.state.usuario.id_scoi
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (r) {
                    if (r.d == 0) {
                        alert('Usuario Folio : ' + r.d + ',No Se Pudo Registrar.');
                    } else {
                        alert('Se Registro Con Exito el Usuario ' + _this5.state.usuario.nombre + ' En Sistema Web.');
                        _this5.setState({
                            usuario: {
                                id_scoi: -1,
                                foto: "/Data/usr.jpg",
                                nombre: '',
                                establecimiento: '',
                                departamento: '',
                                puesto: '',
                                correo: ''
                            }
                        });
                        document.getElementById("ico_carga").style.display = 'none';
                    }
                });
            })['catch'](function (e) {
                alert(e);
            });
        }
    }]);

    return AltaUsuario;
})(React.Component);

var ObtenerUsuario = function ObtenerUsuario(_ref) {
    var usuario = _ref.usuario;
    var colocar = _ref.colocar;
    var Buscar = _ref.Buscar;

    var id = usuario.id_scoi > 0 ? usuario.id_scoi : '';

    var on_buscar = function on_buscar(e) {
        Buscar();
        e.preventDefault();
    };
    return React.createElement(
        'form',
        { style: { display: "inline-block" } },
        React.createElement(
            'div',
            { style: { display: "inline-block", marginRight: "15px" } },
            React.createElement('img', { alt: id, src: usuario.foto, style: { width: "90px" },
                className: 'img-thumbnail'
            })
        ),
        React.createElement(
            'div',
            { style: { width: "70px", display: "inline-block" } },
            React.createElement(
                'strong',
                null,
                'ID SCOI'
            ),
            React.createElement('input', { type: 'text', className: 'form-control', value: id, onChange: colocar })
        ),
        React.createElement('button', { className: 'btn btn-default glyphicon glyphicon-search',
            onClick: function (e) {
                return on_buscar(e);
            } })
    );
};
var DatosUsiario = function DatosUsiario(_ref2) {
    var usuario = _ref2.usuario;

    return React.createElement(
        'div',
        { style: { display: "inline-block", position: "absolute" } },
        React.createElement(
            'div',
            { style: { display: "inline-block", minWidth: "300px" } },
            React.createElement(
                'label',
                null,
                'Nombre'
            ),
            React.createElement(
                'div',
                { className: 'form-control' },
                usuario.nombre
            )
        ),
        React.createElement(
            'div',
            { style: { display: "inline-block", minWidth: "180px", marginLeft: "5px" } },
            React.createElement(
                'label',
                null,
                'Establecimiento'
            ),
            React.createElement(
                'div',
                { className: 'form-control' },
                usuario.establecimiento
            )
        ),
        React.createElement(
            'div',
            { style: { display: "inline-block", minWidth: "130px", marginLeft: "5px" } },
            React.createElement(
                'label',
                null,
                'Departamento'
            ),
            React.createElement(
                'div',
                { className: 'form-control' },
                usuario.departamento
            )
        ),
        React.createElement(
            'div',
            { style: { display: "inline-block", minWidth: "300px", marginLeft: "5px" } },
            React.createElement(
                'label',
                null,
                'Puesto'
            ),
            React.createElement(
                'div',
                { className: 'form-control' },
                usuario.puesto
            )
        )
    );
};

var Cargar = function Cargar(_ref3) {
    var nombre = _ref3.nombre;

    return React.createElement(
        'div',
        { id: nombre,
            style: {
                display: "flex",
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                fontSize: "40px"
            } },
        React.createElement(
            'label',
            { id: nombre + 1 },
            React.createElement('i', { className: 'fa fa-circle-o-notch rotate' }),
            React.createElement(
                'strong',
                { style: { fontSize: "20px" } },
                ' Cargando...'
            ),
            React.createElement('br', null)
        )
    );
};

