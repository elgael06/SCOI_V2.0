var moneyFormat = function (numero_) {
    var decimal_con_cero = function (i) { return i > 9 || i.search(0) > -1 ? i : i + "0"; };
    var mayora_a_mil = function (numero) { return new Intl.NumberFormat('es-MX').format(numero); };
    var numero_string = numero_.toString();
    var decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    var unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";
    return "$" + unidades + "." + decimal;
};
function redondeo(numero) {
    return Math.round(numero * 100) / 100;
}
var Autorizacion_gastos = /** @class */ (function () {
    function Autorizacion_gastos() {
        this.input_registros = document.getElementById("numero_de_registros");
        this.tabla_datos = document.getElementById("datos_gastos");
        this.estatus = "0";
    }
    /*Eventos*/
    Autorizacion_gastos.prototype.on_estatus = function (estatus) {
        console.log(estatus.value);
        this.estatus = estatus.value;
        this.Lista_gastos = [];
        this.getRegusitro(0);
    };
    Autorizacion_gastos.prototype.getRegusitro = function (numero) {
        this.registros = numero;
        this.input_registros.textContent = numero.toString();
        this.Llenar_tabla();
    };
    Autorizacion_gastos.prototype.Llenar_tabla = function () {
        var $lista = "";
        this.tabla_datos.removeChild;
        this.Lista_gastos.forEach(function (gasto) {
            $lista += "\n            <tr >\n                <th style=\"text-align:right\">" + gasto.folio + "</th>\n                <td>" + gasto.proveedor + "</td>\n                <td>" + gasto.consepto_solicitud + "</td>\n                <td>" + gasto.descripcion_gasto + "</td>\n                <td>" + gasto.establecimiento + "</td>\n                <td style=\"text-align:right\">" + moneyFormat(redondeo(gasto.importe_total)) + "</td>\n                <td>" + gasto.usuario_solicita + "</td>\n                <td>" + gasto.fecha + "</td>\n                <td>" + gasto.estatus + "</td>\n                <td>" + gasto.fecha_autorizacion + "</td>\n                <td>" + gasto.usuario_autorizo + "</td>\n                <td>" + gasto.tipo_proveedor + "</td>\n                <td style=\"width:30px;position:sticky;right:1px;z-index:980;background-color:rgba(194, 214, 214,16)\">\n                    <i class=\"btn btn-success\" onclick='evento_Folio(" + gasto.folio + ")' style=\"font-size:28px;border-radius:40px\">\n                        <i class=\"fa fa-edit\"></i>\n                    </i>\n                </td>\n            </tr>";
        });
        this.tabla_datos.innerHTML = $lista;
    };
    return Autorizacion_gastos;
}());
var gastos = new Autorizacion_gastos();
var respuesta = {
    folio: 0, estatus: "",
    autorizo: 0,
    solicito: 0,
    equipo: 0,
    descripcion: "",
    contenido_correo: ""
};
var evento_Folio = function (folio) {
    var obtener_orden_gastos_folio = function (orden) {
        gastos.gasto_seleccionado = orden;
        document.getElementById("carga").style.display = "flex";
        fetch("servicios/Atorizacion_Orden_de_GastoServ.asmx/obtener_orden_gastos_folio", {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({ folio: folio }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (e) { return e.json().then(function (respuesta) {
            document.getElementById("carga").style.display = "none";
            Llenar_datos_modal(orden, respuesta.d);
        }); })
            .catch(function (err) { return console.error(err); });
    };
    var Llenar_datos_modal = function (orden, datos) {
        var $tabla_ = document.getElementById("datos_detalle_gasto");
        var $lista = "";
        console.log("Seleccion:", orden);
        console.log("Respuesta=>", datos);
        document.getElementById("folio_modal").textContent = orden.folio.toString();
        document.getElementById("estatus_modal").textContent = orden.estatus;
        document.getElementById("establecimiento_modal").textContent = orden.establecimiento;
        document.getElementById("concepto_modal").textContent = orden.consepto_solicitud;
        document.getElementById("solicita_modal").textContent = orden.usuario_solicita;
        document.getElementById("tipo_modal").textContent = orden.tipo_proveedor;
        document.getElementById("proveedor_modal").textContent = orden.proveedor;
        document.getElementById("detalle_modal").textContent = orden.descripcion_gasto;
        $tabla_.removeChild;
        datos.forEach(function (gasto, index) {
            if (index == 0)
                respuesta.solicito = gasto.usuario_solisito;
            $lista += "\n                <tr>\n                    <td>" + gasto.descripcion_gasto + "</td>\n                    <td style=\"text-align:right\">" + redondeo(gasto.cantidad) + "</td>\n                    <td style=\"text-align:right\">" + moneyFormat(redondeo(gasto.precio_unitario)) + "</td>\n                    <td style=\"text-align:right\">" + moneyFormat(redondeo(gasto.importe_total)) + "</td>\n                </tr>\n            ";
        });
        $tabla_.innerHTML = $lista;
        document.getElementById("modal_detalle_gasto").style.display = "flex";
    };
    console.log(folio);
    var $seleccion = gastos.Lista_gastos.filter(function (e) { return e.folio == folio; }) || [];
    if ($seleccion.length > 0) {
        obtener_orden_gastos_folio($seleccion[0]);
    }
};
var cambiar_estatus_gasto = function (estatus) {
    console.log("Estatus=>", estatus);
    console.log(gastos.gasto_seleccionado);
    respuesta.folio = gastos.gasto_seleccionado.folio;
    respuesta.estatus = estatus;
    respuesta.descripcion = gastos.gasto_seleccionado.descripcion_gasto;
    console.log(respuesta);
};
var tabla_principal = function () {
    var Obtener_gastos = function () {
        console.log(gastos.estatus);
        if (gastos.estatus != "0") {
            document.getElementById("carga").style.display = "flex";
            fetch("servicios/Atorizacion_Orden_de_GastoServ.asmx/obtener_orden_gastos", {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify({ estatus: gastos.estatus }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (e) {
                e.json().then(function (res) {
                    document.getElementById("carga").style.display = "none";
                    console.log(res.d);
                    if (res.d.length > 0) {
                        gastos.Lista_gastos = res.d;
                        gastos.getRegusitro(gastos.Lista_gastos.length);
                    }
                    else {
                        alert("Sin Datos A Mostrar!!!");
                    }
                });
            })
                .catch(function (error) {
                console.log("Se Presento El Siguiente Error " + error);
                document.getElementById("carga").style.display = "none";
            });
        }
        else
            alert("seleccione Estatus!!!");
    };
    var btn_estatus = document.getElementById("estatus");
    var btn_refrescar = document.getElementById("btn_refrescar");
    document.getElementById("btn_aceptar_estatus").addEventListener("click", function () { return cambiar_estatus_gasto("aceptar"); });
    document.getElementById("btn_cancelar_estatus").addEventListener("click", function () { return cambiar_estatus_gasto("cancelar"); });
    document.getElementById("btn_negar_estatus").addEventListener("click", function () { return cambiar_estatus_gasto("negar"); });
    btn_estatus.addEventListener("change", function () { return gastos.on_estatus(btn_estatus); });
    btn_refrescar.addEventListener("click", Obtener_gastos);
    document.getElementById("carga").style.display = "none";
    console.clear();
    console.info("listo...");
};
setTimeout(tabla_principal, 1000);
//# sourceMappingURL=autirizacion_ordenes.js.map