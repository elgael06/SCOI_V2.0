$(document).ready(function () {
    //LLENAMOS EL SELECT DE LOS ESTABLECIMIENTOS
    llenar_select_cuestionarios();
    //ASIGNAMOS FECHA DEFAULT
    asignar_fecha();

    //estado inicial de la ventana modal
    $("#modal_sucursal").hide();

    //agregar funcion a los botones
    $("#btNuevo").on('click', function () {
        //muestra modal
    });
    $("#btn_cancelar_sucursal").on('click', function () {
        $(".tablaSuc tr").remove();
        $("#modal_sucursal").hide();        
        //alert("En proceso!!!")
    });
});
/******************************
    funciones loguicas
*****************************/
//funcion fecha********************************************************************************
function asignar_fecha() {
    //llamamos al metodo date y obtenemos su datos
    var dia = new Date();
    var d = dia.getDate();
    var m = dia.getMonth();
    var a = dia.getFullYear();
    //al mes se le agrega 1
    m = m + 1;
    //si dia o mes es menor de 10 se le agrega 0
    if (m < 10) { m = "0" + m; }
    if (d < 10) { d = "0" + d; }
    //ordenamos la fecha a mostrar YYYY/MM/DD
    var f = (a + "-" + m + "-" + d);
    //agregamos la fecha al indicador de fecha
    $('#divDia').val(f);
    //retornamos la fecha
    return d + "-" + m + "-" + a;
}//fin
//obtieme la fecha del indicador
function fechaCompleta() {
    var dia = $('#divDia').val();
    var d = dia[8] + dia[9];
    var m = dia[5] + dia[6];
    var a = dia[0] + dia[1] + dia[2] + dia[3];

    return d + "-" + m + "-" + a;
}//fin
/****************************
   FUNCIONES DE MANIPULACION 
*****************************/
//crear botones de seleccion de cuestionario
function crear_btn_cuestionario() {
    //borramos los botones existentes 
    $(".n_c").remove()
    //asigmanos la conexion con los datos a una variable
    var datos = conexion_ajax("servicios/checkListServ.asmx/check_list_insidencias", { 'sucursal': $("#idFolio").val(), 'fecha': fechaCompleta() });
    //esta variable obtendra el nombre del cuestionario para filtrar
    var cuestionario = "";
    //recorremos los datos obtenidos 
    $.each(datos, function (index, item) {
        //en la primer vuelta agregamos el boton inicial
        if (index == 0) {
            //damos el valor del nombre
            cuestionario = item.cuestionario;
            $("#mostrarTabla_areas").append(($("<input type='button' id='" + item.id + "' value='" + cuestionario + "' />").css({'width':'90%'}).addClass('n_c')));
        }//si el cuestionario el diferente se asigna el nombre y  se crea el boton
        else if (cuestionario != item.cuestionario) {
            cuestionario = item.cuestionario;
            $("#mostrarTabla_areas").append(($("<input type='button' id='" + item.id + "' value='" + cuestionario + "' />").css({ 'width': '90%' }).addClass('n_c')));
        }//fin
    });//termina el each
    //damos funcion de llamado a botones
    $(".n_c").on('click', function () {
        //muestra la modal
        $("#modal_sucursal").show();
        //asigna id y nombre de sucursal
        $("#folio_cuestionario").text($(this).attr("id"));
        $("#txt_buscar_suc").text($(this).val());
        //selecciona las preguntas del cuestionario
        filtrar_preguntas_por_cuestionario($(this).val(),datos)
    });//fin del on click
}//fin
//funcion filtro de preguntas de cuestionarios
function filtrar_preguntas_por_cuestionario(cuestionario,datos) {
     //recorremos la tabla para filtar las preguntas del cuestionario
    $.each(datos, function (index, item) {
        //filtramos los datos del cuestionario
        if (item.cuestionario == cuestionario) {
            //creamos los objetos HTML
            var tabla = $("<tr></tr>"), btnobservaciones = $("<input type='button' style='height:30px;width:40px;' class='obsbt' value='+'/>");
            var btnselect = $('<select></select>'), optionsi = $("<option >SI</option>"), optionno = $("<option >NO</option>"), optionna = $("<option >NA</option>");
            //agregamos l los valores a los objetos
            tabla.append($("<td class='orden'></td>").append(item.posicion));
            tabla.append($("<td ></td>").append("<h3>" + item.pregunta + "</h3>")).css({ 'text-aling': 'left' });
            //agregamos las opciones al select
            btnselect.append(optionsi.val(1));
            btnselect.append(optionno.val(0));
            btnselect.append(optionna.val(2));
            //agregamos el select a la tabla
            tabla.append($('<td></td>').append(btnselect));
            //agregamos a la fila las celdas
            tabla.append($("<td title='Agregar observaciones.'> </td>").append(btnobservaciones));
            //agregamos la fila a la tabla
            $(".tablaSuc").append(tabla.css({ 'color': 'gray' }));
        }//fin if
    });
}
//llena la seleccion de los establecimientos
function llenar_select_cuestionarios() {
    var datos = conexion_ajax("servicios/checkListServ.asmx/buscar_establecimiento");
    $.each(datos, function (index, item) {
        $("#idFolio optgroup").append("<option value=" + item.id_establecimiento + ">" + item.nombre_establecimiento + "</option>");
    });
    return datos;
}//fin
//preparar objeto para guardar los datos
function enviar_insidencias() {
    var objeto = {
    
    };
    var datos = conexion_ajax("servicios/insidencias_cklServ.asmx/guardar_datos", {
        'sucursal': $("#idFolio").val(),
        'fecha': fechaCompleta(),
        'criterio': '1',
        'respuesta': '1',
        'aplicador': $("#Label1").text()
    });
    return datos;
}