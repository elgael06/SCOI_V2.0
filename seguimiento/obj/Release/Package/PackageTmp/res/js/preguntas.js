//lector de documento HTML
$(document).ready(function(){
    //crea las tablas de las preguntas
    crear_tabla_de_preguntas()
    //da accion a los botones
    accion_botones()

    //llenar menu de area
    llenar_menu_area();
   
})


//funcion para crear la tabla de preguntas
function crear_tabla_de_preguntas() {

    var preguntas = obtener_preguntas();
    var datos = "";
    var estatus = "";
    $("#_pregunta").remove();
    $.each(preguntas, function (index,item) {
        // console.log((index + 1) + ":" + item.pregunta);
        if (item.estatus == true)
            estatus = "VIGENTE";
        else
            estatus = "CANCELADO";


        datos += '<tr class="_pregunta" style="margin-left:5PX;" > <td class="_id" style="width: 68px;text-align:center">' + item.folio_pregunta + '</td><td class="dat_pregunta" style=" width: 832px;">' + item.pregunta + '</td><td class="_estatus" style=" width: 105px; text-align:center">' + estatus + '</td></tr>';
    });
    $("#tabla_preguntas").append(datos);
    crear_filtro_tabla();
}//fin 
//funcionde crear filtro de tabla
function crear_filtro_tabla() {
    //agregar una nueva columna con todo el texto 
    //contenido en las columnas de la grilla 
    // contains de Jquery es CaseSentive, por eso a minúscula

    $("#tabla_preguntas tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();
        $("<td class='indexColumn'></td>")
              .hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#filtroPreguntas").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $("#tabla_preguntas tr:hidden").show();
        $.each(s, function () {
            $("#tabla_preguntas tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });

    $('tr').mouseenter(function () {
        $(this).addClass("sombras");
    });
    $('tr').mouseleave(function () {
        $(this).removeClass("sombras");
    });
}//fin

//accion de botones
function accion_botones() {

    //iniciamos los estados de los objetos
    $("#btEditar").prop('disabled', true);
    $("#btDesacer").prop('disabled', true);
    $("#btGuardar").prop('disabled', true);
    $("#DropDownList1").prop('disabled', true);
    $("#pertenece").prop('disabled', true);
    $("#formPreguntas").prop('disabled', true);

    //funcion de folio
    $("#idFolio").on("keyup", function (evento) {
        var pregunta,estado,folio = $("#idFolio").val();
        //buscar pregunta por folio
     //  console.log(evento.key + ":" + evento.keyCode+" "+folio);
       if (evento.keyCode == 13 && $("#idFolio").val() != "") {

            //aqui va la funcion de llenar los campos
            pregunta = obtener_pregunta_por_folio(folio);
            //obtenemos los datos de la pregunta
            $.each(pregunta, function (index,item) {
                //asigna el valor 1 o 0 respectivo a su estado
                estado = item.estatus;
                if (estado == true)
                    estado = 1;
                else estado = 0;
                //console.log(item.estatus);
                //asigna los valores a los campos
                $("#idFolio").val(item.folio_pregunta);
                $("#formPreguntas").val(item.pregunta);
                $("#DropDownList1").val(estado);
                $("#pertenece").val(item.pertenece);

                
            });

        }//fin if
        else if ($("#idFolio").val() == "") {
            //cambia el estado de los botones
            $("#btEditar").prop('disabled', true);
            $("#btDesacer").prop('disabled', true);
            $("#btGuardar").prop('disabled', true);
            $("#DropDownList1").prop('disabled', true);
            $("#formPreguntas").prop('disabled', true);
            //borra la preguntas
            $("#formPreguntas").val("");
            $("#DropDownList1").val(1);
            $("#pertenece").val(" ");
            
        }//fin else
    });
    //funcion btn_nuevo
    $("#btNuevo").on("click", function () {
        //obtioene el ultimo folio
        var nvo_folio = checar_ultimo_folio();
        //lo asigna a folio
        $("#idFolio").val(nvo_folio);
        //botones
        $("#btEditar").prop('disabled', true);
        $("#btDesacer").prop('disabled', false);
        $("#btGuardar").prop('disabled', false);
        $("#btNuevo").prop('disabled', true);
        //inputs
        $("#DropDownList1").prop('disabled', false);
        $("#pertenece").prop('disabled', false);
        $("#formPreguntas").prop('disabled', false);
        $("#idFolio").prop('disabled', true);

    });
    //funcion btn_editar
    $("#btEditar").on("click", function () {
        //cambia estado de objetos
        //botones
        $("#btEditar").prop('disabled', true);
        $("#btDesacer").prop('disabled', false);
        $("#btGuardar").prop('disabled', false);
        $("#btNuevo").prop('disabled', true);
        //inputs
        $("#DropDownList1").prop('disabled', false);
        $("#pertenece").prop('disabled', false);
        $("#formPreguntas").prop('disabled', false);
        $("#idFolio").prop('disabled', true);

    });
    //funcion btn_deshacer
    $("#btDesacer").on("click", function () {
        //recarga la pagina
        window.location.href = "preguntas.aspx";
    });
    //funcion btn_guardar
    $("#btGuardar").on("click", function () {
        //checa los campos a enviar que no esten vacios
        if ($("#idFolio").val() != "" && $("#formPreguntas").val() != "") {
            //envia los campos
            enviarDatos($("#idFolio").val(), $("#formPreguntas").val(), $("#DropDownList1").val(), $("#pertenece").val());

            //recarga la pagina
            window.location.href = "preguntas.aspx";
        }
        else alert("llene los campos");
    });
    //seleccionar de la tabla y agrega los datos a folio , pregunta y estatus
    $("._pregunta").on("click", function () {
        //crea las variables a usuar
        var folio, pregunta, estado;
        //recorremos los campos
        $.each($(this).children("td"), function (index, item) {
           //obtenemos los valores de cada campo
            switch (index) {
                case 0:
                    folio = $(this).text();
                    break;
            }//fin switch
        });
        //aqui va la funcion de llenar los campos
        pregunta = obtener_pregunta_por_folio(folio);
        //asigna el valor 1 o 0 respectivo a su estado
        $.each(pregunta, function (index, item) { 
            //asigna el valor 1 o 0 respectivo a su estado
            estado = item.estatus;
            if (estado == true)
                estado = 1;
            else estado = 0;
            //console.log(item.estatus);
            //asigna los valores a los campos
            $("#idFolio").val(item.folio_pregunta);
            $("#formPreguntas").val(item.pregunta);
            $("#DropDownList1").val(estado);
            $("#pertenece").val(item.pertenece);

        //cambia estado de boton editar
        $("#btEditar").prop('disabled', false);
        });//fin each
    });


}//fin


/*******
            conexiones de ajax a servicios de vb


**********/
function llenar_menu_area() {
    var respuesta;
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: "servicios/preguntasServ.asmx/obtener_areas",
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.

        }//fin beforeSend.
        ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete.
    });//fin llamada ajax
    var menu = respuesta.d;
    function llenar_area(menu) {
        $.each(menu, function (index, item) {
            if (item != " ")
            $("#pertenece").append('<option Value="' + item + '">' + item + '</option>')

        });
    }//fin
    llenar_area(menu)
    return menu;
}//fin

//funcion de obtencion de preguntas
function obtener_preguntas() {
    var urls = "servicios/preguntasServ.asmx/obtener_preguntas";
    var respuesta;

    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urls,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.

        }//fin beforeSend.
        ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete.
    });//fin llamada ajax
    return respuesta.d;
}//fin

function obtener_pregunta_por_folio(folio) {
    var urls = "servicios/preguntasServ.asmx/obtener_preguntas_por_folio";
    var respuesta;
    var obj = { "folio":folio }
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urls,
        data:JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.

        }//fin beforeSend.
        ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            $("#btEditar").prop('disabled', false);
        }//fin complete.
    });//fin llamada ajax
    return respuesta.d;
}//fin

//funcion ajax para envio de datos   *************************************************************************************
function enviarDatos( folio, pregunta, estatus ,pertenece) {
    var urls = "servicios/preguntasServ.asmx/guardar_datos";
    var respuesta;
    var datos = {
        "folio_pregunta": folio,
        "pregunta": pregunta,
        "estatus": estatus,
        "pertenece":pertenece
    }
    console.log(datos)
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urls,
        data: JSON.stringify(datos),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
           
        }//fin beforeSend.
        ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            if (respuesta.d!="")
                alert('success');
            else 
                alert('Error...');
        }//fin complete.
        
    });//fin llamada ajax
    return respuesta.d;
}//fin

//funcion para checar el ultimo folio de la tabla
function checar_ultimo_folio() {
    var urls = "servicios/preguntasServ.asmx/checar_ultimo_folio";
    var respuesta;

    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urls,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.

        }//fin beforeSend.
        ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete.
    });//fin llamada ajax
    return respuesta.d;
}//fin