"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Caja_datos = (function (_React$Component) {
    _inherits(Caja_datos, _React$Component);

    function Caja_datos() {
        _classCallCheck(this, Caja_datos);

        _get(Object.getPrototypeOf(Caja_datos.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Caja_datos, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon" },
                    React.createElement("i", { className: this.props.icono }),
                    " ",
                    this.props.titulo,
                    " "
                ),
                React.createElement("input", { type: "text", className: "form-control", value: this.props.datos, onChange: this.props.evento })
            );
        }
    }]);

    return Caja_datos;
})(React.Component);

var Caja_datos_select = (function (_React$Component2) {
    _inherits(Caja_datos_select, _React$Component2);

    function Caja_datos_select() {
        _classCallCheck(this, Caja_datos_select);

        _get(Object.getPrototypeOf(Caja_datos_select.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Caja_datos_select, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "input-group" },
                React.createElement(
                    "span",
                    { className: "input-group-addon" },
                    React.createElement("i", { className: this.props.icono }),
                    " ",
                    this.props.titulo,
                    " "
                ),
                React.createElement(
                    "select",
                    { onChange: this.props.seleccion, className: "form-control" },
                    this.props.opciones
                )
            );
        }
    }]);

    return Caja_datos_select;
})(React.Component);

var Caja_fecha = (function (_React$Component3) {
    _inherits(Caja_fecha, _React$Component3);

    function Caja_fecha() {
        _classCallCheck(this, Caja_fecha);

        _get(Object.getPrototypeOf(Caja_fecha.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Caja_fecha, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: { "width": "200px", "display": "inline-block", "margin-left": "20px" } },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        React.createElement("i", { className: "fa fa-calendar" })
                    ),
                    React.createElement("input", { type: "date", className: "form-control", value: this.parseo_fecha(), onChange: this.props.evento, style: { "width": "170px" } })
                )
            );
        }
    }, {
        key: "parseo_fecha",
        value: function parseo_fecha() {
            var f = this.props.fecha.split("/");
            return f[2] + "-" + f[1] + "-" + f[0];
        }
    }]);

    return Caja_fecha;
})(React.Component);

