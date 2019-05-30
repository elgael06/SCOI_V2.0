var global_usuario_solisito = 0;
$(document).ready(function () {
    //inicializacin de los objetos
    $("#contador_reguistros").attr("disabled", true)
    $("#m_folio").attr("disabled", true)
    $("#m_estatus").attr("disabled", true)
    $("#m_sucursal").attr("disabled", true)
    $("#m_consepto").attr("disabled", true)
    $("#m_proveedor").attr("disabled", true)
    $("#m_solicita").attr("disabled", true)
    $("#m_tipo_proveedor").attr("disabled", true)
    $("#dialog").hide()
    $("#moda_solicitud").hide()
    llenar_tablaGastos()
    //enevmtos onclick
    eventos_botonera_modal()
});
/**************************************************************
        manejadores de eventos y metodos
***************************************************************/
function eventos_botonera_modal() {
    $("#btn_autorizar").on("click", function () {
        mandar_correo("AUTORIZADO")
    });
    $("#btn_cancelar").on("click", function () {
        mandar_correo("CANCELADO")
    });
    $("#btn_negar").on("click", function () {
        mandar_correo("NEGADO")
    });
}//fin
//asignar fecha
function fechaCompleta() {
    var dia = new Date(), d = dia.getDate(), m = dia.getMonth(), a = dia.getFullYear();
    m = m + 1;
    if (m < 10)
        m = "0" + m;
    if (d < 10)
        d = "0" + d;
    return d + "/" + m + "/" + a;
}//fin 13
//funcion de llamada a servicio de envio de correo que 
function mandar_correo(estatus) {
    var usuarios = conexion_ajax("servicios/accesoServ.asmx/obtener_lista_usuarios", {}), usuario_aut, usuario_sol, id_usuario = 0, descripcion = $("#m_descripcion_gasto").text() + ".Autorizacion Desde SISTEMA WEB.";
    $.each(usuarios, function (index, item) {
        if (item.nombre_usuario == $("#Label1").text()) { 
            usuario_aut = item.id_scoi + " " + item.nombrecompleto_usuario;
            id_usuario = item.id_scoi;
        }
    });
    //checamos el id del usuario solicitante
    var dato_id = conexion_ajax('servicios/Atorizacion_Orden_de_GastoServ.asmx/obtener_orden_gastos_folio', { "folio": $("#m_folio").val() })
    global_usuario_solisito = dato_id[0].usuario_solisito;
    usuario_sol = dato_id[0].usuario_solisito + " " + dato_id[0].usuario_solicita

    var datos = "<div><h2>Solicitud De Orden De Gasto.</h2></div><div><h3 style='display:inline-block;'>Folio:</h3><p style='display:inline-block;'>" + $("#m_folio").val() + ".<p>";
    datos += "<h3 style='display:inline-block;'> Establecimiento:</h3><p style='display:inline-block;'>" + $("#m_sucursal").val() + ".<p><div>";
    datos += " <div><h3 style='display:inline-block;'>Con Nuevo Estatus de :</h3><p style='display:inline-block;'>" + estatus + ".<p><div>";
    datos += " <div><h3 style='display:inline-block;'>Descripcion Del Gasto:</h3><p style='display:inline-block;'>" + descripcion + ".<p><div>";
    datos += "<div><h3 style='display:inline-block;'>Usuario Reviso:</h3><p style='display:inline-block;'>" + usuario_aut + ".<p><div>";
    datos += "<div><h3 style='display:inline-block;'>Usuario Solicito:</h3><p style='display:inline-block;'>" + usuario_sol + ".<p><div>";
    datos += "<div><h4 style='display:inline-block;'>Autorizacion WEB.</h4><p style='display:inline-block;'>" + ".<p><div>";
    datos += '<table border="1" ><tr> <th style="text-align:center;width:570px">Descripcion</th><th style="width:70px">Cantidad</th><th style="width:80px">P.Unitario</th><th style="width:80px">Importe</th></tr>'

    $(".datos_modal").each(function (index, item) {
        datos += "<tr>"
        $(this).children("td").each(function (i, t){   
            datos += "<td>" + $(this).text() + "</td>";              
            })
        datos += "</tr>"
        })

    datos += '</table>'
  //  console.log(datos)
    $("#m_estatus").val(estatus);
    
    //actualizar datos y enviar por correo
    conexion_ajax("servicios/Atorizacion_Orden_de_GastoServ.asmx/actualizar_estatus_gastos",
        {
            "estatus": estatus[0],
            "usuario_autorizo": id_usuario,
            "usuario_solicito": global_usuario_solisito,
            "fecha_autorizacion": fechaCompleta(),
            "folio": $("#m_folio").val(),
            "equipo_autorizo": Global_hostname,
            "descripcion_gasto": descripcion,
            "cuerpo": datos
        })
    //muestra la modal y optiene los datos de reggreso
    $("#moda_solicitud").hide()
    llenar_tablaGastos()
    return datos
}//fin
/**************************************************************
        manejadores de DOM
***************************************************************/
//funcion de llenado de tabla_gastos
function llenar_tablaGastos() {
    var estatus = $("#selector_por_estatus").val(), datos_a_tomar=[];
    if(estatus!=1)
        datos_a_tomar = conexion_ajax("servicios/Atorizacion_Orden_de_GastoServ.asmx/obtener_orden_gastos", { "estatus": estatus });
    if (datos_a_tomar.length > 0) {
        $("#contador_reguistros").val(datos_a_tomar.length);
        $(".datos").remove();
        $.each(datos_a_tomar, function (index, item) {
            var tabla = $("<tr class='datos'></tr>");

            tabla.append($("<td ></td>").append(item.folio));
            tabla.append($("<td></td>").append(item.proveedor));
            tabla.append($("<td></td>").append(item.consepto_solicitud));
            tabla.append($("<td></td>").append(item.descripcion_gasto));
            tabla.append($("<td></td>").append(item.establecimiento));
            tabla.append($("<td></td>").append(item.importe_total));
            tabla.append($("<td></td>").append(item.usuario_solicita));
            tabla.append($("<td></td>").append(item.fecha));
            tabla.append($("<td></td>").append(item.estatus));
            tabla.append($("<td></td>").append(item.fecha_autorizacion));
            tabla.append($("<td></td>").append(item.usuario_autorizo));
            tabla.append($("<td></td>").append(item.tipo_proveedor));
            $("#tabla_gastos").append(tabla);
        });
    }//fin
    else {
        $("#contador_reguistros").val(0);
        alert("No Hay Datos...");
    }
    //funcion onclick de la tabla
    $(".datos").on("click", function () {
        $("#moda_solicitud").show();
        //llamamos la funcion de llenao de datos con la tabla como parametro
        llenar_datos_en_modal($(this));
    });
}//fin
//funcion llenar datos en modal
function llenar_datos_en_modal(tabla) {
    //console.log(tabla.children(":nth-child(1)").text())
    //llenamos los inputs de la modal con los datos de la tabla
    $("#m_folio").val(tabla.children(":nth-child(1)").text())
    $("#m_estatus").val(tabla.children(":nth-child(9)").text())
    $("#m_sucursal").val(tabla.children(":nth-child(5)").text())

    $("#m_proveedor").val(tabla.children(":nth-child(2)").text())
    $("#m_solicita").val(tabla.children(":nth-child(7)").text())

    $("#m_consepto").val(tabla.children(":nth-child(3)").text())
    $("#m_tipo_proveedor").val(tabla.children(":nth-child(12)").text())
    $("#m_descripcion_gasto").text(tabla.children(":nth-child(4)").text())
    //almacenamos los datos de la conexion dentro de una variable
    var datos = conexion_ajax('servicios/Atorizacion_Orden_de_GastoServ.asmx/obtener_orden_gastos_folio', { "folio": $("#m_folio").val() })
    //usamos los datos obtenidos para el metodo llennar tabla detalles 
    llenar_tabla_detalles_modal(datos)
    global_usuario_solisito = datos[0].usuario_solisito;
}//fin
//funcion que llena los datos de la tabla de la modal
function llenar_tabla_detalles_modal(datos) {
    $(".datos_modal").remove()
    var importe = 0;
    $.each(datos, function (index, item) {
        var tabla = $("<tr class='datos_modal'></tr>");
        tabla.append($("<td ></td>").append(item.descripcion_gasto));
        tabla.append($("<td ></td>").append(item.cantidad).css({ "text-align": "center" }));
        tabla.append($("<td ></td>").append("$" + item.precio_unitario).css({ "text-align": "center" }));
        tabla.append($("<td ></td>").append("$" + (item.precio_unitario*item.cantidad)).css({ "text-align": "right" }));
        // tabla.append($("<td ></td>").append("$"+item.importe_total).css({ "text-align": "right" }));
        $(".mostrar_solicitud").append(tabla);
        importe = item.importe_total
    });
    var tabla = $("<tr class='datos_modal'></tr>");

    tabla.append($("<td ></td>").append("TOTAL").css({ "text-align": "right" }));
    tabla.append($("<td ></td>").append("--").css({ "text-align": "right" }));
    tabla.append($("<td ></td>").append("--").css({ "text-align": "right" }));
    tabla.append($("<td ></td>").append("$" + importe).css({ "text-align": "right" }));
    $(".mostrar_solicitud").append(tabla);
}//fin