$(document).ready(function () {

    //hilo de ejecucion en segundo plano
    Concurrent.Thread.create(function () {
        while (1) {
            llenar_tabla();
            sleep(50000);
            window.location.reload()
        }           
    });
});
//funcion llenado tabla
function llenar_tabla() {
    //eliminamos datos previos 
    $(".observacio_de_tabla").remove();
    //obtenemos los datos
    var datos = conexion_semaforos();
    var filtrar = false;
    if ($("#seleccion_estatus").val() != "Liquidado") {
        filtrar = true;
    }
    //bloqueamos el filtro
    $("#seleccion_estatus").attr("disabled", true);
    $.each(datos, function (index, item) {
        
        //tabla a usar
        var $tabala = $('<tr class="observacio_de_tabla" ></tr>');
        //checamos el semaforo y asignamos color dependiento del tiempo
        var color = "white";
        if (item.semaforo<60) 
            color = "green";
        else if (60 <= item.semaforo && item.semaforo < 120)
            color = "yellow";
        else if (item.semaforo >=120)
            color = "red";
        //checamos estatus
        var estatus = "";
        switch (item.estatus) {
            case "Vigente": estatus = "yellow";
                break;
            case "Abono": estatus = "yellow";
                break;
            case "Surtido": estatus = "#4cff00";
                break;
            case "Liquidado": estatus = "#0689eb";
                break;
            case "canselado": estatus = "red";
                break;
        }//fin swhitch
        //parcear tiempo de semaforo a hora

      //agregamos los datos a la fila
        $tabala.append($("<td  title='semaforo' class='t_semaforo' style=''     ><h3>" + item.semaforo + "</h3></td>").append($('<input type="button" class="btnSemaforo" />').css({ 'background-color': color })).css({ 'text-align': 'center' }));
        $tabala.append($("<td  title='estatus' class='t_estatus' style=''      ></td>").append(item.estatus).css({ 'text-align': 'center', 'background-color': estatus }));
        $tabala.append($("<td  title='folio venta' class='t_fVta' style=''  ></td>").append(item.folio).css({ 'text-align': 'center' }));
        $tabala.append($("<td  title='cliente' class='t_cliente' style=''      ></td>").append(item.cliente).css({ 'text-align': 'left' }));
        $tabala.append($("<td  title='vendedor' class='t_vendedor' style=''     ></td>").append(item.vendedor).css({ 'text-align': 'left' }));
        $tabala.append($("<td  title='fecha Inicio' class='t_inicio' style='' ></td>").append(item.fecha_inicio).css({ 'text-align': 'center' }));
        $tabala.append($("<td  title='fecha final' class='t_final' style=''  ></td>").append(item.fecha_final).css({ 'text-align': 'center' }));
        $tabala.append($("<td  title='proveedor' class='t_proveedor' style=''    ></td>").append(item.proveedor).css({ 'text-align': 'left' }));
        $tabala.append($("<td  title='autorizo' class='t_autorizo' style=''     ></td>").append(item.autorizo).css({ 'text-align': 'left' }));
        $tabala.append($("<td  title='establecimiento' class='t_establecimiento' style='' ></td>").append(item.establecimiento).css({ 'text-align': 'left', 'whidth': '' }));
        $tabala.append($("<td  title='notas' class='t_notas' style=''        ></td>").append(item.notas).css({ 'text-align': 'left' }));
        $tabala.append($("<th  title='total venta' class='t_total' style=''  ></th>").append("$" + item.total_venta).css({ 'text-align': 'right', 'font-size': '14px', 'width': '80px' }));
        if (filtrar) {
            //agregamos la fila a la tabla
            $("#vista").append($tabala.css({'font-size': '11px' }));
            //mover el scroll al final
            $("#scroll_tabla").scrollTop(9000000000000);
        }//filtro
        else if (item.estatus != "Liquidado")
        {
            //agregamos la fila a la tabla
            $("#vista").append($tabala.css({ 'font-size': '11px' }));
            //mover el scroll al final
            $("#scroll_tabla").scrollTop(9000000000000);
        }//filtro

    });
    //desbloqueamos el filtro
    $("#seleccion_estatus").attr("disabled", false);

}//fin
//funcion conexion 
function conexion_semaforos() {
    var respuesta;
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: true,
        url: "servicios/semaforo_vta_expressServ.asmx/consulta_semaforo_vta_express",
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $("#dialog").show();
        },//fin beforeSend.
        complete: function (response) {
            $("#dialog").hide();
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
        }//fin complete.
    });//fin llamada ajax
    return respuesta.d;
}//fin

//funcion dormir
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            return false;
            break;
        }
        else return true;
    }
}