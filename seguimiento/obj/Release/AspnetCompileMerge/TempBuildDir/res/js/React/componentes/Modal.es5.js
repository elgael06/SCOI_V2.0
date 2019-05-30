"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Modal = (function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
        _classCallCheck(this, Modal);

        _get(Object.getPrototypeOf(Modal.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Modal, [{
        key: "render",
        value: function render() {
            return React.createElement("div", { id: this.props.id, className: "modal fade", role: "dialog" }, React.createElement("div", { className: "modal-content" }, React.createElement("div", { className: "modal-header" }, React.createElement("button", { type: "button", className: "close", "data-dismiss": "modal", onClick: this.props.cerrar }, "×"), this.props.cavecera || React.createElement("h3", null, "Sin datos")), React.createElement("div", { className: "modal-body", style: estylo_cuerpo_modal }, this.props.cuerpo || React.createElement("h3", null, "Sin datos"))));
        }
    }]);

    return Modal;
})(React.Component);

var Modal_con_tabla = (function (_React$Component2) {
    _inherits(Modal_con_tabla, _React$Component2);

    function Modal_con_tabla() {
        _classCallCheck(this, Modal_con_tabla);

        _get(Object.getPrototypeOf(Modal_con_tabla.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Modal_con_tabla, [{
        key: "render",

        /*** seleccionado,titulo,fn guardar,fn deshacer,cavecera "tabla",lista    "tabla"***/
        value: function render() {
            var titulo = React.createElement("h3", null, " ", this.props.titulo_modal);
            var cuerpo_modal = [React.createElement(Btn_seleccion, { guardar: this.props.guardar,
                deshacer: this.props.deshacer }), React.createElement(Caja_datos, { titulo: this.props.titulo_seleccion,
                icono: this.props.icono_seleccion,
                datos: this.props.seleccionado }), React.createElement(Caja_datos, { titulo: "Filtro",
                icono: "glyphicon glyphicon-filter",
                datos: this.props.texto_filtro,
                evento: this.props.evento_filtrar }), React.createElement("div", { className: "tabla_matriz" }, React.createElement(Tabla, { cavecera: this.props.cavecera_tabla,
                datos: this.props.lista_tabla }))];
            return React.createElement("div", null, React.createElement(Modal, { cavecera: titulo,
                cuerpo: cuerpo_modal, id: this.props.id,
                cerrar: this.props.deshacer }));
        }
    }]);

    return Modal_con_tabla;
})(React.Component);

var estylo_cuerpo_modal = {
    "height": "90%",
    "min-height": "350px",
    "width": "100%"
};

