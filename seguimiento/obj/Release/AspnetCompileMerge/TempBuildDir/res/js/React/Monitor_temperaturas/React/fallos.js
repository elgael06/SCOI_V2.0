"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cabecera = (function (_React$Component) {
    _inherits(Cabecera, _React$Component);

    function Cabecera() {
        _classCallCheck(this, Cabecera);

        _get(Object.getPrototypeOf(Cabecera.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Cabecera, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { "class": "form-inline" },
                    React.createElement(
                        "div",
                        { "class": "input-group" },
                        React.createElement(
                            "label",
                            { "class": "input-group-addon" },
                            "Unidad"
                        ),
                        React.createElement("input", { className: "form-control", type: "text" })
                    ),
                    React.createElement(
                        "div",
                        { "class": "input-group has-feedback  " },
                        React.createElement(
                            "label",
                            { "class": "input-group-addon" },
                            "Estado"
                        ),
                        React.createElement("select", { className: "form-control" })
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "input-group has-feedback  " },
                    React.createElement(
                        "label",
                        { "class": "input-group-addon" },
                        "Observaciones"
                    ),
                    React.createElement("textarea", { className: "form-control", placeholder: "Quien atendio la unidad, agregar fecha y observaciones" })
                )
            );
        }

        //ver_estado(estado) {
        //    const v = []
        //    if (estado == 'S') {
        //        v.push(<option value="S" selected>
        //            Sin Revisar
        //        </option>,
        //        <option value="E">
        //        En Revision
        //    </option>,
        //    <option value="R">
        //        Revisado
        //    </option>)
        //    }
        //    else if(estado=='E')
        //        v.push(<option value="R">
        //            Revisado
        //        </option>, <option value="E" selected>
        //    En Revision
        //</option>,
        //<option value="S">
        //    Sin Revisar
        //</option>)
        //    else
        //        v.push(<option value="R">
        //            Revisado
        //        </option>, <option value="E">
        //            En Revision
        //        </option>,
        //<option value="S" selected>
        //    Sin Revisar
        //</option>) 
        //    return v
        //}
    }]);

    return Cabecera;
})(React.Component);

var Tabla = (function (_React$Component2) {
    _inherits(Tabla, _React$Component2);

    function Tabla() {
        _classCallCheck(this, Tabla);

        _get(Object.getPrototypeOf(Tabla.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Tabla, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: estilo_tabla },
                React.createElement(
                    "table",
                    { className: "table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            { style: estilo_cabecera_tabla },
                            React.createElement(
                                "td",
                                null,
                                "Unidad"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "Estado"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "Observaciones"
                            )
                        )
                    ),
                    React.createElement("tbody", null)
                )
            );
        }
    }]);

    return Tabla;
})(React.Component);

var Fallos = (function (_React$Component3) {
    _inherits(Fallos, _React$Component3);

    function Fallos() {
        _classCallCheck(this, Fallos);

        _get(Object.getPrototypeOf(Fallos.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Fallos, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Cabecera, null),
                React.createElement(Tabla, null)
            );
        }
    }]);

    return Fallos;
})(React.Component);

var estilo_cabecera_tabla = {
    'position': 'sticky',
    'min-width': '100%',
    'top': '-1px',
    "background": "rgba(146, 199, 254)"
};
var estilo_tabla = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '100%',
    'height': '300px',
    'border': 'solid 1px gray',
    'border-radius': '10px'
};
ReactDOM.render(React.createElement(Fallos, null), document.getElementById("pruebas"));

