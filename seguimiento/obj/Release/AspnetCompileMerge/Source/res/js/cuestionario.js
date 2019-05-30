/*
autor: Cristian valenzuela
fecha:
    de: 10-02-18.
    a : 07-03-18.

    funcuinalidad:
                  crea tabla de cuestionarios si el folio id cuenta con una, añade nuevas tablasa cuestionario y genera su inder de ordenamiento,
                  genera un objeto con los valores de la tabla, para enviarolo con ajax al servidor.
                  crea los efectos de transicion entre los menus debusqueda de datos, da eventos a los botones elimina o agrega celdas a la tabla
                  cuestionarios, revisa si el txt folio tiene datos.
        
*/

//variable globales 
var CuestionariosDatos = new Array;
var foliotemporal = $('#mCuestionario').val();

//lector de documento thml
$(document).ready(function () {
    //funcion de filtrar preguntas de tabla preguntas
    filtrar_tabla_preguntas();
    $('#openModalpreg').hide();
    $("#btn_selec_").hover(function () {
        $(this).toggleClass("clase_btn_hover");

    });

    $('.modalDialog').hide();

    //valores iniciales a objetos html--------------------------------------------------------------------------------------------------
    $('.nomCuestionarios').hide();
    $('.tablaCuestionarios').hide();
    $('.ponderacionCues').prop('disabled', true);
    $('#btnRecorrer').prop('disabled', true);
    $('#btnBuscar').prop('disabled', true);
    $('#btnAgregar').prop('disabled', true);
    $('#mCuestionario').prop('disabled', true);
    //caja de acciones
   if( $('#mCuestionario').val() !="")
       $('#btEditar').prop('disabled', false);
    else
       $('#btEditar').prop('disabled', true);
   $('#btDesacer').prop('disabled', true);
    $('#btGuardar').prop('disabled', true);
    $('#textoCuestioario').prop('disabled', true);
    $('#vigencia').prop('disabled', true);


    //llamada a funciones################################################################################################################
    $("#btnRecorrer").click(function () { 
        recuperarDatosTablaCuestionario_a_Objetos();
        CuestionariosDatos = [];
        alert("!EXITO¡");
    });//termina funcion click

    $('#btnAgregar').click(function () {
        recuperarDatosTablaCuestionario_a_Objetos();
        //$(".titulo_").val("EDITAR PREGUNTAS");
        if ($("#mCuestionario").val() > 0 && $("#textoCuestioario").val() != "" && $("#btGuardar").prop('disabled')) {
            $(".preguntas").toggle();
            $(".cuestionarios").toggle();
            if ($(".titulo_").hasClass("btncabeza")) {
                $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
                $(".titulo_").val("EDITAR PREGUNTAS");
                checarFolioLlenarCampos();
            }
            else {
                $(".titulo_").val("CANCELAR");
                //le da accion a seleccionar fila de tabla para activarla
                $(".tabla_preguntas_cuest tr").on("click", function (e) {
                    // console.log(e + "" + $(this));
                    // quita seleccion a tabla activa
                    $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
                    //activa nueva tabla
                    $(this).toggleClass("activa_mover");
                });
            }
            $(".titulo_").toggleClass('btncabeza');

        }

    });//fin agregar datos
    $('#btnEliminar').click(function () {
        eliminar_de_tabla();
       // checarFolioLlenarCampos();
        // buscar_cuestionario();
        if ($("#mCuestionario").val() > 0 && $("#textoCuestioario").val() != "" && $("#btGuardar").prop('disabled')) {
            $(".preguntas").toggle();
            $(".cuestionarios").toggle();
            if ($(".titulo_").hasClass("btncabeza")) {
                $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
                $(".titulo_").val("EDITAR PREGUNTAS");
                checarFolioLlenarCampos();
            }
            else {
                $(".titulo_").val("CANCELAR");
                //le da accion a seleccionar fila de tabla para activarla
                $(".tabla_preguntas_cuest tr").on("click", function (e) {
                    // console.log(e + "" + $(this));
                    // quita seleccion a tabla activa
                    $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
                    //activa nueva tabla
                    $(this).toggleClass("activa_mover");
                });
            }
            $(".titulo_").toggleClass('btncabeza');

        }
       
    });//fin


    $('#btn_selec_').on("click", function () {
        $('.modalDialog').show();
        buscar_cuestionario();
        //eliminar tr existentes de tabla a llenar
        $('.classcuestionario').each(function (index) {
           // console.log("remove");
            $(this).remove();
        });
        $('.classcuestionario').remove();
     //   console.log("Buscar Cuestuinario");
    });

    //llama a div de busqueda para optener las preguntas
    $('#btn_selec_p').click(function () {
        $('.ponderacionCues').prop('disabled', false);

        $('#openModalpreg').show();
      //  console.log("mostrar preg.");
        //ejecutamos la fn de crear y agregar tablas
        buscar_preguntas();

        eventoBtnEnviar_Buscar_Filtrar();
        $(".tabla_preguntas_cuest tr").on("click", function (e) {
            // console.log(e + "" + $(this));
            // quita seleccion a tabla activa
            $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
            //activa nueva tabla
            $(this).toggleClass("activa_mover");
        });
    });
    $('#btn_cancelar_Pregunta').on("click", function () {
        $('#openModalpreg').hide();

    });

    //da evento a seleccionar para eliminar
    eliminarDeTablaCuestionario();

   
    
    //agregar evento a boton nuevo*******************************************************************************
    $('#btNuevo1').on('click', function () {
        //llamamos a verificar el ultimo folio
        var folio = conexion_nuevo_cuestionario();
        
        //le asignamos al valor de folio
        $('#mCuestionario').val(folio);
        $('#textoCuestioario').val("");
        
        $('.classcuestionario').remove();

        //deshabilitamos los controles
        $('#btNuevo1').prop('disabled', true);
        $('#mCuestionario').prop('disabled', true);
        $('#btEditar').prop('disabled', true);
       
        //habilitamos otros controles
        $('#btDesacer').prop('disabled', false);
        $('#btGuardar').prop('disabled', false);
        $('#textoCuestioario').prop('disabled', false);
        $('#vigencia').prop('disabled', false);

        //oculatar boton de buscar cuest
        $('#btn_selec_').hide();
    });//fin on click

    //agregar evento a boton editar
    $('#btEditar').on("click",function(){
        //deshabilitamos los controles
        $('#btEditar').prop('disabled', true);
        $('#mCuestionario').prop('disabled', true);
        $('#btNuevo1').prop('disabled', true);

        //habilitamos otros controles
        $('#btDesacer').prop('disabled', false);
        $('#btGuardar').prop('disabled', false);
        $('#textoCuestioario').prop('disabled', false);
        $('#vigencia').prop('disabled', false);

        //oculatar boton de buscar cuest
        $('#btn_selec_').hide();

    });//fin on click

    //agregar evento a boton deshacer
    $('#btDesacer').on("click", function () {
        //habilitamos los controles
        //$('#btEditar').prop('disabled', false);
        //$('#mCuestionario').prop('disabled', false);
        $('#btNuevo1').prop('disabled', false);

        //deshabilitamos otros controles
        $('#btDesacer').prop('disabled', true);
        $('#btGuardar').prop('disabled', true);
        $('#textoCuestioario').prop('disabled', true);
        $('#vigencia').prop('disabled', true);

        //retiramos los valores asignados
        $('#mCuestionario').val("");
        $('#textoCuestioario').val("");
        $('#vigencia').attr('checked', false);
        $('.classcuestionario').remove();

        //mostrar boton de buscar cuest
        $('#btn_selec_').show();

    });//fin on click

    //agregar evento a boton Guardar
    $('#btGuardar').on('click', function () {

        //ejecutamos la funcion guardar
        guardar_foilo_cuestionario();

       //habilitamos los controles
       //$('#btEditar').prop('disabled', false);
       // $('#mCuestionario').prop('disabled', false);
        $('#btNuevo1').prop('disabled', false);

        //deshabilitamos otros controles
        $('#btDesacer').prop('disabled', this);
        $('#btGuardar').prop('disabled', this);
        $('#textoCuestioario').prop('disabled', this);
        $('#vigencia').prop('disabled', this);

        //retiramos los valores asignados
        $('#mCuestionario').val("");
        $('#textoCuestioario').val("");
        //$('#vigencia').attr('checked', false);
        $('.classcuestionario').remove();

        //mostrar boton de buscar cuest
        $('#btn_selec_').show();
    });//fin on click

    //efectoCeldas()


    $(".preguntas").hide();

    $(".titulo_").on("click", function () {
        if ($("#mCuestionario").val()>0 && $("#textoCuestioario").val()!=""&& $("#btGuardar").prop('disabled') ){
        $(".preguntas").toggle();
        $(".cuestionarios").toggle();
        if ($(".titulo_").hasClass("btncabeza")) {
            $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
            $(".titulo_").val("EDITAR PREGUNTAS");
            checarFolioLlenarCampos();
        }
        else {  
                $(".titulo_").val("CANCELAR");
            //le da accion a seleccionar fila de tabla para activarla
                $(".tabla_preguntas_cuest tr").on("click", function (e) {
                    // console.log(e + "" + $(this));
                    // quita seleccion a tabla activa
                    $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
                    //activa nueva tabla
                    $(this).toggleClass("activa_mover");
                });
            }
            $(".titulo_").toggleClass('btncabeza');
         
        }

    });
    $("#mCuestionario").val("");
    $("#textoCuestioario").val("");
    //permite activar la seleccion de la tabla
    mover_datos_tabla_cuestionario()
});// fin de lectura de documento
//funcion filtrar tabla de preguntas
function filtrar_tabla_preguntas() {
    //recorremos la tabla a filtrar
    $(".tabla_preguntas_cuest tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();

        $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#BuscarPreguntas").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $(".tabla_preguntas_cuest tr:hidden").show();
        $.each(s, function () {
            $(".tabla_preguntas_cuest tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });

}//fin
//funciones a utilizar ***************************************************************************************************************************
function efectoCeldas() {

    //da el efecto de sombra al pasar cursor sobre la tabla 
    $('tr').on({
        mouseenter: function () {
            $(this).addClass("sombras");
           // console.log("sombra");
        },
        mouseleave: function () {
            $(this).removeClass("sombras").addClass("classcuestionario");
           // console.log("sin sombra");
        }
    });
}//fin

//creamos la conexion ajax para buscar nombre de cuestionario
function nombres_cuestionarios() {
    var urlC = "servicios/checkListServ.asmx/nombres_cuestionarios"

    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlC,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $('#dialog').show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            $('#dialog').hide();
        }//fin complete
    });//fin de ajax
    return respuesta.d;

}//fin funcion

//crear tabla de buscar cuestionario/////////////////////////////////////////////////////////////////////////////////////////////////
function buscar_cuestionario() {
    $('.classcuestionario').remove();
    $('.class_cuestionarios').remove();

    var datosTabla = "<tr class='class_establecimiento'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";

    //creamos variable que contenga la tabla de datos 
    var tabla = nombres_cuestionarios();

    $('#txt_buscar_cuestionario').val("");

    //almacenaran los datos a asignar en folio
    
   // $('#padre').hide();
    $('#cuadro_buscar_cuestionario').show();

    $.each(tabla, function(index,item) {
        datosTabla = "<tr class='class_cuestionarios' style='color:black;' >" + "<td style='width:15%'>" + item.folio + "</td>" + "<td class='IDPB' style='width:70%'>" + item.nom_cuestionario + "</td>" + "<td style='width:15%'> " + item.estatus + "</td>" + "</tr>";

        $('.tablaCuestionario').append(datosTabla);
    })//fin each

    var nombre = "", folio = 0, estatus = "false";
  
    //dar evento a seleccion de click en celda
    $('.class_cuestionarios').on("click",function () {
        //recorre los hijos de tr
        $(this).children("td").each(function (subIndex) {
            //asigna nombre y folio
            switch (subIndex) {
                case 0:
                    folio = $(this).text();
                    break;
                case 1:
                    nombre = $(this).text();
                    break;
                case 2:
                    estatus = $(this).text();
                    break;
            }
            //nombre = nombres_cuestionarios_por_folio(folio);
        });


        //agrega nombre al cuadro de buscar
        $("#txt_buscar_cuestionario").val(nombre);
    });
    //dar evento a boton seleccionar
    $('#btn_selec_cuestionario').click(function () {
        $('#mCuestionario').val(folio);
        $('.textoCuestioario').val(nombre);
        $("#vigencia").val(estatus);
        //$('#padre').show();
        $('#openModal').hide();

        //eliminar tr existentes de tabla a llenar
        $('.class_cuestionarios').remove();
           //console.log("rem:" + index);
         

        //deshabilitamos el boton editar
        if ($('#mCuestionario').val() != "")
            $('#btEditar').prop('disabled', false);
        else
            $('#btEditar').prop('disabled', true);
        //aqui vamos a llamar a la funcion de checar folios para llenar campos de preguntas
        checarFolioLlenarCampos();
        filtrar_tabla_preguntas()
    });//fin fn evento boton
  

    //dar evento a boton seleccionar
    $('#btn_selec_cuestionario').click(function () {
       // console.log(folio + ":" + nombre + ":" + estatus);
        $('#mCuestionario').val(folio);
        $('.textoCuestioario').val(nombre);
        $("#vigencia").val(estatus);
        //$('#padre').show();
        $('#openModal').hide();

        //eliminar tr existentes de tabla a llenar
        $('.class_cuestionarios').remove();
            //console.log("rem:" + index);

    });
    $('.class_cuestionarios').on("dblclick", function () {
        $(this).children("td").each(function (subIndex) {
            //asigna nombre y folio
            switch (subIndex) {
                case 0:
                    folio = $(this).text();
                    break;
                case 1:
                    nombre = $(this).text();
                    break;
                case 2:
                    estatus = $(this).text();
                    break;
            }
            //nombre = nombres_cuestionarios_por_folio(folio);
        });


          //  console.log(folio + ":" + nombre + ":" + estatus);
            $('#mCuestionario').val(folio);
            $('.textoCuestioario').val(nombre);
            $("#vigencia").val(estatus);
            var est = document.getElementById("perm");
            est.setAttribute("value", estatus);
            //$("#perm").text(estatus);
            //$('#padre').show();
            $('#openModal').hide();

            //eliminar tr existentes de tabla a llenar
            $('.class_cuestionarios').remove();
                //console.log("rem:" + index);


        //deshabilitamos el boton editar
        if ($('#mCuestionario').val() != "")
            $('#btEditar').prop('disabled', false);
        else
            $('#btEditar').prop('disabled', true);
        //aqui vamos a llamar a la funcion de checar folios para llenar campos de preguntas
        checarFolioLlenarCampos();
    });


    $('#btn_cancelar_cuestionario').click(function () {
        $('#mCuestionario').val("");
        $('#textoCuestioario').val("");
        $('#cuadro_buscar_cuestionario').val("");
        $('#openModal').hide();

        //eliminar tr existentes de tabla a llenar
        $('.class_cuestionarios').remove();

    });

    filtrar_tabla_cuestionario();
}//fin
function nombres_cuestionarios_por_folio(folio) {
    var urlC = "servicios/cuestionsrioServ.asmx/nombres_cuestionarios_por_folio"

    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlC,
        data: JSON.stringify({ "folio": folio }),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $("#dialog").show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            $("#dialog").hide();
        }//fin complete
    });//fin de ajax
    return respuesta.d;

}//fin funcion 

//crea el filtro de la tabla cuestionario con en texbox---------------------->
function filtrar_tabla_cuestionario() {
    //recorremos la tabla a filtrar
    $(".tablaCuestionario tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();

        $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#txt_buscar_cuestionario").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $(".tablaCuestionario tr:hidden").show();
        $.each(s, function () {
            $(".tablaCuestionario tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });


}//fin

function checarFolioLlenarCampos() {
    //checa si hay folio vigente para uso llenar tabla
   

    $('.classcuestionario').remove();


        $('#btnRecorrer').prop('disabled', false);
        $('#btnBuscar').prop('disabled', false);
        $('#btnAgregar').prop('disabled', false);
        var dat = "<tr class='classcuestionario'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";

        $('.classcuestionario').remove();

        //variable que almacena el folio de cuestionario
        var folio = $('.mCuestionario').val();
        //llamamos la funcion que almacena los datos de la tabla
        var respuestas_tabla = crear_tabla(folio);
            
        /*Recorremos la tabla menucuestionarios para comparar el folio de la pregunta  y sustituirla en su valor*/
            $.each(respuestas_tabla, function (index, item) {
                //console.log(index+1);
                //damos los valores de las tablas
                var campo1 = item.orden;
                var campo2 = item.pregunta.split(":").join("-");
                var campo3 = item.ponderacion;
                var campo4 = item.area;
               
                dat = "<tr runat='server' class='classcuestionario' id='pregunta_cuestionario" + campo1 + "'>" + "<td STYLE='width: 61px;text-align:center' class='prierCelda' runat='server'>" + campo1 + "</td>" + "<td class='IDPB' STYLE='width: 78%;'>" + campo2 + "</td>" + "<td STYLE='width: 85px;text-align:center'>" + "<input type='number' id='ponderacion" + index + "' class='ponderacionCues' min='1' max='10' step='1' value='" + campo3 + "' style='width:35Px'/></td><td style='width:80Px'>" + campo4 + "</td>" + "</tr>";

                $('.tabla_preguntas_cuest').append(dat);

            });//);//fin primer each
            eliminarDeTablaCuestionario();
            filtrar_tabla_preguntas()
}//fin

//llamada a ajax para resibir un arreglo con las preguntas 
function retornar_preguntas() {
    var urlP = "servicios/checkListServ.asmx/retornar_preguntas"

    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlP,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $('#dialog').show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            $('#dialog').hide();
        }//fin complete
    });//fin de ajax
    return respuesta.d;
}//fin 2

//crea una llamada ajax mediante el polio de cuestionario y retorna todas las preguntas de ese cuestionario
//si la conexion es correcta esta retorna un arreglo y solo consta de llamar en sus puntos.
function crear_tabla(folio) {
    var urls = "servicios/checkListServ.asmx/asignar_tabla_cuestionarios";
    var obj = { 'folio_cuestiono': folio }
    //enviarDatos(url, obj, console.log("algo"), console.log("listo"));
    //cachara la respuesta de la conexion
    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urls,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $('#dialog').show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            $('#dialog').hide();
        }//fin complete
    });//fin de ajax
    return respuesta.d;
}//fin  19

//crear evento eliminar de tabla*************************************************************************************eliminar tabla
function eliminarDeTablaCuestionario() {
    //funcion eliminar de tabla cuestionario  
    $('tr').mouseenter(function () {
        $(this).addClass("sombras");
    });
    $('tr').mouseleave(function () {
        $(this).removeClass("sombras");
    });
}//fin

function eliminar_de_tabla() {


    //elimina seleccionados en rojo si hay de lo contrario pide que ingrese una pregunta
    if ($('.activa_mover').length > 0) {
        /*manda a eliminar los datos de la tabla y los reenvia para reordenar*/
        eliminarDeTabla('.activa_mover', $('#mCuestionario').val());
        alert("ELIMINADO");
        $('.activa_mover').remove();

        //reasignar los valores de la tabla 
        $(".tabla_preguntas_cuest tbody tr").each(function (index) {
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 0:
                        $(this).text(index + 1);
                }
            });
        });

        //re envia los datos de la tabla
        recuperarDatosTablaCuestionario_a_Objetos();
    }//fin if

}//fin 

//evento de boton buscar**************************************************************************************************************************trbajando
function eventoBtnEnviar_Buscar_Filtrar() {
    //inicializamos 
    $('.filtroPreguntas').val(" ");
    $('#txt_buscar_pregunta').val(' ');
    $('#BuscarPreguntas').val("");

    //asigna el valor de los datos al cuadro de preguntas
    $('#btn_selec_pregunta').click(function () {

        obtener_datos_preguntas()
        $('#openModalpreg').hide();
        //dar evento de seleccion a tabla
        $(".tabla_preguntas_cuest tr").on("click", function (e) {
            // console.log(e + "" + $(this));
            // quita seleccion a tabla activa
            $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
            //activa nueva tabla
            $(this).toggleClass("activa_mover");
        });
    });
 /*   //SELECCIONAMOS LA CELDA Y AGREGAMOS EL VALOR A EL CUADRO DE TEXTO
    $('.tablaBpreg tr').on('click', function () {
       // var dato = $(this).find('td:nth-child(2)').html();
       // console.log(dato);
        //alert('hola ' + dato);
        // $('#BuscarPreguntas').val(dato);
        //agregamos valor de dato a filtro pregunta
       // $('#txt_buscar_pregunta').val(dato);
        //("tr").css("background-color", "#ECF8E0");
        $(this).toggleClass("pregunta_seleccionada");
    });*/


    //filtrar modificado cuadro de texto buscar
    $(".tablaBpreg tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();
        $("<td class='indexColumn'></td>")
              .hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#txt_buscar_pregunta").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $(".tablaBpreg tr:hidden").show();
        $.each(s, function () {
            $(".tablaBpreg tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });

    //damos foco a tr 
    $('.tablaBpreg tr').mouseenter(function () {
        $(this).addClass('sombras');
    });
    $('.tablaBpreg tr').mouseleave(function () {
        $(this).removeClass('sombras');
        $(this).addClass('class_bpreg');
    });

}//fin*******************************************************************************************************************************
//funtion  para obtener los datos a un arreglo
function obtener_datos_preguntas() {
    var arreglo = [];
    $(".pregunta_seleccionada").each(function (index, item) {
        arreglo.push({"pregunta":item.cells[1].childNodes[0]},{"limpieza":item.cells[3].childNodes[0]});
      //  console.log(item.cells[3].childNodes[0]);
    
        var orden = $(".tabla_preguntas_cuest").find('tr').length;
        var pregunta = item.cells[1].childNodes[0].data.split(":").join("-");
        var area = item.cells[3].childNodes[0].data;

        var dat = "<tr runat='server' class='classcuestionario' id='pregunta_cuestionario" + (orden + 1) + "'>" + "<td STYLE='width: 61px;text-align:center' class='prierCelda' runat='server' >" + (orden + 1) + "</td>" + "<td class='IDPB' STYLE='width: 77%;'>" + pregunta + "</td>" + "<td STYLE='width: 105px;text-align:center'>" + "<input type='number' id='ponderacion" + orden + "' class='ponderacionCues' min='1' max='10' step='1' value='1' style='width:35Px'/>" + "</td>" + "<td>" + area + "</td>" + "</tr>";
        $(".tabla_preguntas_cuest").append(dat);
    });//fin each

    $(".pregunta_seleccionada").remove();
    filtrar_tabla_preguntas();
    return arreglo.data;
}
//revisar si esta la pregunta antes de agregar
function revisar_pregunta(pregunta) {
    //inicializamos variables
    var estado= true;
    var campo;
    var punto = false;
    //recorremos la tabla en cada uno de sus tr
    $(".tabla_preguntas_cuest tr").each(function (index) {
        
        //recorremos los hijos
        $(this).children("td").each(function (subIndex) {//recorre los tr en la tabla
            switch (subIndex) {
                case 1://asignamos el valor de la pregunta de la tabla al campo
                    campo = $(this).text();
                    break;
            }//fin switch
        });//fin hijo each
        //console.log(index);
        //console.log(campo);
        //console.log(pregunta);
        //revisamos si el campo y la pregunta son iguales
        if (pregunta === campo) {
            estado = false;
            punto = index;
        }//fin if
    });//fin padre each

    return [estado,punto];
}//fin 

function eliminar_pregunta(punto) {
    //inicializamos variables
    var estado = false;
    var campo;
    //recorremos la tabla en cada uno de sus tr
    $(".tabla_preguntas_cuest tr").each(function (index) {

        if (punto === index) {
              $(this).remove();
             // console.log(punto);
              estado = true;
              }//fin if       
                
    });//fin padre each

    return estado;
}//fin 

function agregarDatosTablaCuestionario(pregunta) {

    //agrega tabla con datos
    
        var tds = $(".tabla_preguntas_cuest").find('tr').length;
       
        //var pregunta = $('.BuscarPreguntas').val();

       // $('.ponderacionCues').prop('disabled', true);

        //alert("agrego:"+" "+pregunta);
        //alert(ponderacion+" "+pregunta);
        var dat = "<tr class='classcuestionario'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";

        dat = "<tr  class='classcuestionario'>" + "<td STYLE='width: 61px;text-align:center' class='prierCelda' > " + (tds + 1) + "</td>" + "<td class='IDPB' STYLE='width: 78%;' >" + pregunta.split(":").join("-") + "</td>" + "<td STYLE='width: 105px;text-align:center'>" + "<input type='number' id='ponderacion" + tds + "' class='ponderacionCues' min='1' max='10' step='1' value='1' style='width:35Px'/>" + "</td>" + "</tr>";

    /*   if (pregunta) {  onclick='eliminar_check(

            //AQUI VAMOS A AGREGAR LA CUESTION AL CUESTIONARIO
            $('.tabla_preguntas_cuest').append(dat);
          }//fin if
        else {
        */
            //re envia los datos de la tabla
               // recuperarDatosTablaCuestionario_a_Objetos();
          //  alert("!EXITO¡");
        //}
        $('#BuscarPreguntas').val("");
        
    //reordena los valores de la tabla 
        $(".tabla_preguntas_cuest tbody tr").each(function (index) {
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 0:
                        $(this).text(index + 1);
                }
            });
        });
        filtrar_tabla_preguntas()
}//fin
//funcion mover datos dentro de tabla
function mover_datos_tabla_cuestionario() {    
   
    //evento click para boton subir fila seleccionada
    $("#btnSubir").on("click", function () {
        //si no es la primera posicion ni la ultima
        // if (posicion.orden > 1)
        
        movimiento_fila(-1)
        });
        //evento click para boton bajar fila seleccionada
        $("#btnBajar").on("click", function () {
            //   if (posicion.orden < (obtener_dato_tabla().length - 1))
            
          //  console.log(posicion);
            movimiento_fila(1)
            
        });      
    
 

  

}//fin
//funcion que agregara la tabla htlm
function movimiento_fila(m) {
    //checamos si hay una fila activa
    if ($(".activa_mover").length > 0) {
            //obtenemos el arreglo con el nuevo orden
        var resultado = obtener_dato_tabla(m);
        var posicion = parseInt($(".activa_mover").children(":nth-child(1)").text());
        //borramos la tabla existente
            $(".classcuestionario").remove();
           
            //recorremos el arreglo
            $.each(resultado, function (index, item) {
                // console.log("paso 3-"+index);
                var clase_seleccion = "";
                if ((posicion + m) == item.orden)
                    clase_seleccion = "classcuestionario  activa_mover";
                else clase_seleccion = "classcuestionario";
                //creamos el objeto HTML
                var dat = "<tr class='" + clase_seleccion + "' STYLE='width: 100%;' id='pregunta_cuestionario" + (index + 1) + "'>" + "<td STYLE='width: 61px;text-align:center' class='prierCelda'>" + (index + 1) + "</td>" + "<td class='IDPB' STYLE='width: 78%;'>" + item.pregunta + "</td>" + "<td STYLE='width: 105px;text-align:center'>" + "<input type='number' id='ponderacion" + index  + "' class='ponderacionCues' min='1' max='10' step='1' value=" + item.ponderacion + " style='width:35Px'/>" + "</td>" + "<td>" + item.area + "</td>" + "</tr>";
                //lo insertamos al documento
                $(".tabla_preguntas_cuest").append(dat);
            });//fin each
            filtrar_tabla_preguntas()
    }//fin if

    $(".tabla_preguntas_cuest tr").on("click", function (e) {
        // console.log(e + "" + $(this));
        // quita seleccion a tabla activa
        $(".tabla_preguntas_cuest tr").each(function (i, t) { $(this).removeClass("activa_mover"); });
        //activa nueva tabla
        $(this).toggleClass("activa_mover");
    });
}//fin metodo

//metodo para obtener la tabla
function obtener_dato_tabla(mover) {
    //obtenemos la tabla a un arreglo
    var orden=0, pregunta,ponderacion, area;
    var objtabla = [];
    var orden = parseInt($(".activa_mover").children(":nth-child(1)").text());
    var fila= { 'orden': orden };

    //recorremos el arreglo
    $(".tabla_preguntas_cuest tbody tr").each(function (i, t) {
        //recorre los datos dentro la filla
        $(this).children("td").each(function (index, item) {
            switch (index) {
                case 0:orden = parseInt($(this).text());
                    break;
                case 1:pregunta = $(this).text();
                    break;
                case 3:area = $(this).text();
                    break;
            }
        });
        if (orden == (fila.orden + mover)) {
            auxiliar_datos = orden;
            orden = fila.orden;
        }//fin if
        else if (orden == fila.orden) {
            orden = fila.orden + mover;
        }//fin else if

        ponderacion = parseInt($("#ponderacion" + i).val())
        //crea un arreglo con los datos en formato Json.
        objtabla.push({ 'orden': orden, 'pregunta': pregunta, 'ponderacion': ponderacion, 'area': area });
    });
   
    return objtabla.sort(function (a, b) {if (a.orden > b.orden) { return 1} if (a.orden < b.orden) {return -1} return 0;
    });


}//fin

//revisar objetos ponderacion
function revisar_obj_ponderacion() {
    var arreglo = [];

    $('.ponderacionCues').each(function (index) {
        // console.log(index);
        
        arreglo.push($(this).val());
    });//fin each
    return arreglo;
}//fin


    //envia los datos al servidor en un ciclo que recorre los punto en el objeto que los almacena
    function recuperarDatosTablaCuestionario_a_Objetos() {
    
        //consulta ajax prueba
        //variables internas
        var urlProyecto = "servicios/cuestionsrioServ.asmx/getCuestionario"
    
        var folio = $('#mCuestionario').val();

        //eliminamos los cuestionarios existentes con el folio
        deleteCuestionarioAll(folio);
        var ponderaciones = revisar_obj_ponderacion();
        var CuestionariosDatos2 = [];
        $(".classcuestionario").each(function (index) {
            var orden, pregunta, ponderacion;
            $(this).children("td").each(function (subIndex) {//recorre los tr en la tabla

                switch (subIndex) {//sub recorrido en los td del tr.
                    case 0:
                        orden = $(this).text();//guarda los datos de la primera posicion 'orden'
                        break;
                    case 1:
                        pregunta = $(this).text().split("-").join(":");//guarda los datos de la segunda posicion 'pregunta'
                        break;
                    case 2:
                        ponderacion = ponderaciones[index];//guarda los datos de la tercera posicion 'ponderacion'
                        break;
                }//fin switch

            });//fin each td
            
            $.post({
                type: "POST",//tipo a enviar
                async: false,
                cache: false,
                url: urlProyecto,//url a la cual conectarse 
                data: JSON.stringify({
                    'orden': orden,
                    'Cuestionario': folio,
                    'pregunta': pregunta.split("-").join(":"),
                    'ponderacion': ponderacion
                }),// resultado'{"orden":"' + campo1 + '","pregunta":"'+campo2+'","ponderacion":"'+campo3+'"}',
                contentType: "application/json; charset=utf-8",
                dataType: "post",//tipo de datos
                beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada
                    //$('#y').hide();
                    $('#dialog').show();
                       
                    $('#btnBuscar').prop('disabled', true);
                    $('#btnEliminar').prop('disabled', true);
                },
                complete: function (response) {
                       
                    $('#btnBuscar').prop('disabled', false);
                    $('#btnEliminar').prop('disabled', false);
                    $('#dialog').hide();
                    //console.log(response);
                    //elimina primer elemento del arreglo CuestionariosDatos
                        
                }//fin de success
            });//fin llamada ajax
                

        }); //fin each tabla
      
        buscar_preguntas();

    
    }//fin

    //remover todos
    function deleteCuestionarioAll(f) {
        var folio = {"folio":f};
        var urle = "servicios/cuestionsrioServ.asmx/deleteCuestionarioAll";
        $.ajax({
            url: urle,
            async: false,
            cache: false,
            data: JSON.stringify(folio),
            type: "POST",//tipo a enviarcontentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada
                $('#dialog').show();
            },
            complete: function (response) {
                $('#dialog').hide();
                //  console.log("eliminado");
            }//fin complete

        });//fin conexion
                
    }//fin

    //funcion eliminar de tabla 
    function eliminarDeTabla( clase, folio) {
        var urlBorrar = "servicios/cuestionsrioServ.asmx/deleteCuestionario"
        $(clase).each(function (index) {
            //  console.log(index);
            var campo1;
            $(this).children("td").each(function (subIndex) {//recorre los tr en la tabla

                switch (subIndex) {//sub recorrido en los td del tr.
                    case 0:
                        campo1 = $(this).text();//guarda los datos de la primera posicion 'orden'
                        break;
                }//fin switch
                   
            });//fin each td
            var datoProvicional = JSON.stringify({ 'orden': campo1, 'folio': folio });
            $.ajax({
                type: "POST",//tipo a enviar
                async: false,
                cache: false,
                url: urlBorrar,//url a la cual conectarse 
                data: datoProvicional,// resultado'{"orden":"' + campo1 + '","pregunta":"'+campo2+'","ponderacion":"'+campo3+'"}',
                contentType: "application/json; charset=utf-8",
                dataType: "post",//tipo de datos
                beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada
                    // $('#y').hide();
                    $('#dialog').show();
                    $('#btnBuscar').prop('disabled', true);
                    $('#btnAgregar').prop('disabled', true);
                },
                complete: function (response) {
                    $('#dialog').hide();
                    $('#btnBuscar').prop('disabled', false);
                    $('#btnAgregar').prop('disabled',   false);
                    // $('#y').show();
                    //  console.log("!DATOS ELIMINADOS...!");

                    //reordena los valores de la tabla 
                    $(".tabla_preguntas_cuest tr").each(function (index) {
                        $(this).children("td").each(function (index2) {
                            switch (index2) {
                                case 0:
                                    $(this).text(index + 1);
                            }
                        });
                    });
                
                }//fin de complete

            });//fin de sentencia ajax borrar

        });//fin de each
    
    }//fin funcion 


    //guardar folio cuestionario
    function guardar_foilo_cuestionario() {
        var folio = $('#mCuestionario').val();
        var nom_cuestionario = $('#textoCuestioario').val();
        var estatus = $('#vigencia').val();


        var urls = "servicios/cuestionsrioServ.asmx/guardar_foilo_cuestionario";
        var respuesta;

        if (estatus == " true") estatus = 1;
        else estatus = 0;

        var datos = {
            'folio': folio,
            'nom_cuestionario': nom_cuestionario,
            'estatus': estatus
        }//fin

 
        //llamada ajax
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: urls,
            data: JSON.stringify(datos),
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos.
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
                $('#dialog').show();
            }//fin beforeSend.
               ,
            complete: function (response) {
                $('#dialog').hide();
                //response = JSON.stringify(response);
                respuesta = response.responseText;
                //  console.log(response);//respuesta. responseText
                respuesta = JSON.parse(respuesta);

            }//fin complete.
        });//fin llamada ajax
  
        // console.log( datos );

        return respuesta;
    }//fin

    //funcion para revisar folio para nuevo cuestuinario
    function conexion_nuevo_cuestionario(){
    
        var urls = "servicios/cuestionsrioServ.asmx/nuevo_cuestionario";
        var respuesta = {};

        //llamada ajax
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: urls,
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos.
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
                $('#dialog').show();
            }//fin beforeSend.
               ,
            complete: function (response) {
                $('#dialog').hide();
                //response = JSON.stringify(response);
                respuesta = response.responseText;
                //  console.log(response);//respuesta. responseText
                respuesta = JSON.parse(respuesta);

            }//fin complete.
        });//fin llamada ajax

        return respuesta.d[0].folio;

    }//fin

    //funcion crear tabla buscar preguntas
    function buscar_preguntas() {

        // $('#openModalpreg').hide();
        //borramos las tr ya esistentes
        $('.class_bpreg').remove();

        //creamos una tabla con las preguntas
        var tabla = retornar_preguntas();
        //una variable que creara los objetos tr
        var datosTabla = "";
        var es="CANCELADO";
        //recorremos los datos de la tabla
        $.each(tabla, function (index, item) {
            //asignamos los datos de la tabla al objeto tr
            if (item.estatus)
                es="VIGENTE"
            datosTabla = "<tr class='class_bpreg' id='fila_pregunta_seleccionada" + item.folio_pregunta + "' >" + "<td style='width:5%'> <input type='checkbox' onclick='seleccionar_agregar_pregunta(" + item.folio_pregunta + ")' id='agregar_pregunta" + item.folio_pregunta + "' />" + item.folio_pregunta + "</td>" + "<td class='IDPB' style='width:70%'>" + item.pregunta + "</td>" + "<td style='width:10%'> " + es + "</td>" + "<td style='width:10%' >" + item.pertenece + "</td>" + "</tr>";
            //console.log(datosTabla);

            //agregamos el objeto tr lleno a la tabla 
            $('.tablaBpreg').append(datosTabla);

        });//fin each

    }//fin
    //funcion seleccionar preguntas para agregar
    function seleccionar_agregar_pregunta(id) {
        $("#fila_pregunta_seleccionada" + id).toggleClass("pregunta_seleccionada");
    }//fin


    //llamada a ajax para resibir un arreglo con las preguntas 
    function retornar_preguntas() {
        var urlP = "servicios/checkListServ.asmx/retornar_preguntas"

        var respuesta;
        //llamada ajax tipo post
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: urlP,
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos.
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
                $('#dialog').show();
            }//fin beforeSend.
               ,
            complete: function (response) {
                //response = JSON.stringify(response);
                $('#dialog').hide();
                respuesta = response.responseText;
                //  console.log(response);//respuesta. responseText
                respuesta = JSON.parse(respuesta);

            }//fin complete
        });//fin de ajax
        return respuesta.d;
    }//fin 2

    $(document).ready(function () {
        $('#dialog').hide();
    
        $('#respuestas').hide();
        
    });