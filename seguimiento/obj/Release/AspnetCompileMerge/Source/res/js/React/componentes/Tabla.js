﻿"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabla = (function (_React$Component) {
    _inherits(Tabla, _React$Component);

    function Tabla() {
        _classCallCheck(this, Tabla);

        _get(Object.getPrototypeOf(Tabla.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Tabla, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "table table-bordered " },
                React.createElement(
                    "thead",
                    { className: "cavecera_tabla" },
                    this.cavecera_tabla()
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.props.datos
                )
            );
        }
    }, {
        key: "cavecera_tabla",
        value: function cavecera_tabla() {
            var r = this.props.cavecera.map(function (e, index) {
                return React.createElement(
                    "th",
                    { key: index.toString() },
                    e
                );
            });
            return React.createElement(
                "tr",
                { className: "success" },
                r
            );
        }
    }]);

    return Tabla;
})(React.Component);

