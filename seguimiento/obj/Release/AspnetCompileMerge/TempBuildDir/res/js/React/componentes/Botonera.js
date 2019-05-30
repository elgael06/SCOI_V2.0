"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Botonera = (function (_React$Component) {
    _inherits(Botonera, _React$Component);

    function Botonera() {
        _classCallCheck(this, Botonera);

        _get(Object.getPrototypeOf(Botonera.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Botonera, [{
        key: "render",
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
                "div",
                { className: "btn-group", style: { "margin-bottom": "10px" } },
                React.createElement("input", { type: "button", value: "Nuevo", className: nuevo, onClick: this.props.nuevo }),
                React.createElement("input", { type: "button", value: "Editar", className: editar, onClick: this.props.editar }),
                React.createElement("input", { type: "button", value: "Guardar", className: guardar, onClick: this.props.guardar }),
                React.createElement("input", { type: "button", value: "Deshacer", className: deshacer, onClick: this.props.deshacer })
            );
        }
    }]);

    return Botonera;
})(React.Component);

var Botones_dropdown = (function (_React$Component2) {
    _inherits(Botones_dropdown, _React$Component2);

    function Botones_dropdown() {
        _classCallCheck(this, Botones_dropdown);

        _get(Object.getPrototypeOf(Botones_dropdown.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Botones_dropdown, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "dropdown" },
                React.createElement(
                    "a",
                    { className: "dropdown-toggle", style: { "color": "black" }, "data-toggle": "dropdown", href: "#" },
                    this.props.titulo,
                    React.createElement("span", { className: "caret" })
                ),
                React.createElement(
                    "ul",
                    { className: "dropdown-menu" },
                    this.contenido_menu()
                )
            );
        }
    }, {
        key: "contenido_menu",
        value: function contenido_menu() {
            return this.props.opciones_menu.map(function (elemento) {
                return React.createElement(
                    "li",
                    null,
                    elemento
                );
            });
        }
    }]);

    return Botones_dropdown;
})(React.Component);

