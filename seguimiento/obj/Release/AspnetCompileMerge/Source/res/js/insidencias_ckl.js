/******************************
    MANEJO DE DOCUMENTO
*****************************/
$(document).ready(function () {
    /*********************************
        INICIALIZACION DE ESTADOS
    **********************************/
    //LLENAMOS EL SELECT DE LOS ESTABLECIMIENTOS
    llenar_select_cuestionarios();
    //ASIGNAMOS FECHA DEFAULT
    asignar_fecha();
    //estado inicial de la ventana modal
    $("#modal_sucursal").hide();
    //modal observaciones
    $("#moda_observaciones_cues").hide();
    //modal resultados
    $("#resultados").hide();
    //inabihilita btn obs
    $('#btObs').attr("disabled", true);

    /******************************
        funciones BOTONES
    *****************************/
    //agregar funcion a los botones
    $("#btNuevo").on('click', function () {
        //recarga los cuestionarios
        crear_btn_cuestionario();
    });
    $("#btn_cancelar_sucursal").on('click', function () {
        $(".tablaSuc tr").remove();
        $("#modal_sucursal").hide();        
        //alert("En proceso!!!")
    });
    //asigna las condiciones de guardado
    $("#btn_selec_cues").on('click', function () {
        //crea un contador 
        var contador = 0;
        //recorre los select de respuestas
        $("td  select").each(function (index, item) {
            //si el select tiene una respuesta se incrementa el contador
            if ($(this).val() != "")
                contador++;
        });
        //si la contidad de respuestas es mayor a la cantidad de select se envian los datos y cierra la modal
        if (contador >= $("td  select").length){
            enviar_insidencias();
            $("#modal_sucursal").hide();
            crear_btn_cuestionario();
            $(".tablaSuc tr").remove();
        }// de lo contario manda una alerta
        else
            alert("Hay preguntas Por Responder...");
    });
    $("#btn_cancelar_obs_cues").on('click', function () {
        //estado inicial de la ventana modal
        $("#moda_observaciones_cues").hide();
    });
    $('#btn_agregar_obs_cuestionario').on('click', function () {
        // $("#moda_observaciones_cues").show();
        //llamamos la funcion que crea la tabla con las variables de id y nombre 
        tableToExcel('mostrar_observaciones_cuestionario', "observaciones-" + "-" + $('#mEstablecimiento').val());
    });//fin exportar
    $("#btn_cancelar_resultados").on('click', function () {
        $("#resultados").hide();
    });

    $("#btnExp").on('click', function () {
        if ($('.resultado_ckl_t').length > 0)
            tableToExcel('tablaRespuestas', "observaciones-" + "-" + $('#mEstablecimiento').val());
        else {
            alert('no hay datos en la tabla!')
        }
    });

});//fin
/******************************
    funciones loguicas
*****************************/
//funcion fecha
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
    var datos = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { "folio_establecimiento": $("#idFolio").val(), "fecha": fechaCompleta() });
    //esta variable obtendra el nombre del cuestionario para filtrar
    var cuestionario = "";
    var insidencias_resueltas = conexion_ajax("servicios/insidencias_cklServ.asmx/insicencias_cuestionarios_R", { 'sucursal': $("#idFolio").val(), 'fecha': fechaCompleta() });

    //recorremos los datos obtenidos 
    $.each(datos, function (index, item) {
        var clase_res = "";
        //en la primer vuelta agregamos el boton inicial
        if (index == 0) {
            $.each(insidencias_resueltas, function (inde, dato) {
                if (dato.criterio_cuestion == item.folio) {
                    clase_res = "cuest_resueltos"
                }
            })
            //damos el valor del nombre
            cuestionario = item.cuestionario;
            $("#mostrarTabla_areas").append(($("<input type='button' id='" + cuestionario + "' value='" + cuestionario + "' />").css({ 'width': '90%' }).addClass('n_c '+ clase_res)));
           
        }//si el cuestionario el diferente se asigna el nombre y  se crea el boton
        else if (cuestionario != item.cuestionario) {
            $.each(insidencias_resueltas, function (inde, dato) {
                if (dato.criterio_cuestion == item.folio) {
                    clase_res = "cuest_resueltos"
                }
            })
            cuestionario = item.cuestionario;
            $("#mostrarTabla_areas").append(($("<input type='button' id='" + cuestionario + "' value='" + cuestionario + "' />").css({ 'width': '90%' }).addClass('n_c '+ clase_res )));
        }//fin
    });//termina el each
    //damos funcion de llamado a botones
    $(".n_c").on('click', function () {
        //muestra la modal
        $("#modal_sucursal").show();
        //asigna id y nombre de sucursal
        //$("#folio_cuestionario").text($(this).attr("id"));
        $("#txt_buscar_suc").text($(this).val());
        //selecciona las preguntas del cuestionario
        filtrar_preguntas_por_cuestionario($(this).val(), datos, insidencias_resueltas)
        //observaciones_incidencias_ckl()
    });//fin del on click
}//fin
//funcion filtro de preguntas de cuestionarios
function filtrar_preguntas_por_cuestionario(cuestionario, datos, insicendias_resueltas) {
    //les da el id a los select
    var contar = 0;
    //recorremos la tabla para filtar las preguntas del cuestionario
    $.each(datos, function (index, item) {
        //filtramos los datos del cuestionario
        if (item.cuestionario == cuestionario) {
            //creamos los objetos HTML
            var tabla = $("<tr></tr>"), btnobservaciones = $("<input type='button' name='" + item.folio + "' style='height:30px;width:40px;' class='obsbt' value='+'/>");
            var btnselect = $('<select id="respuesta' + contar + '"><option value="">¿Solucionado?</option></select>'), optionsi = $("<option >SI</option>"), optionno = $("<option >NO</option>"), optionna = $("<option >NA</option>");
            //agregamos l los valores a los objetos
            tabla.append($("<td class='orden'></td>").append(item.folio));
            tabla.append($("<td ></td>").append("<h3>" + item.observaciones + "</h3>")).css({ 'text-aling': 'left' });
            //agregamos las opciones al select
            btnselect.append(optionsi.val(1));
            btnselect.append(optionno.val(0));
            btnselect.append(optionna.val(2));
            //Agegamos la respuesta al select si tiene
            $.each(insicendias_resueltas, function (inde, dato) {
                if (dato.criterio_cuestion == item.folio) {
                    btnselect.val(dato.respuesta);
                }
            })
            //agregamos el select a la tabla
            tabla.append($('<td></td>').append(btnselect));
            //agregamos a la fila las celdas
            tabla.append($("<td title='Agregar observaciones.'> </td>").append(btnobservaciones));
            //agregamos la fila a la tabla
            $(".tablaSuc").append(tabla.css({ 'color': 'gray' }));
            //checamos si hay una respuesta para este select
            $.each(insicendias_resueltas, function (i, dato) {
                //console.log(item.id + ":" + dato.zona_inspeccion)
                if (item.id == dato.zona_inspeccion) {
                    if (item.posicion == dato.criterio_cuestion) {
                        $("#respuesta" + contar).val(dato.respuesta);
                    }
                }
            });
            //incrementamos contar
            contar++;
        }//fin if
    });
  
    //darEventoObservaciones();
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
    //variables a utilizar
    var criterio, respuesta, datos_pregunta, soluciones= [], folios = [];
    //recorremos la tabla de respuestas
    $(".tablaSuc tr").each(function (index, item) {
        //revisamos las celdas dentro de las filas
        $(this).children("td").each(function (i) {
            switch (i) {
                case 0: criterio = $(this).text();//posicion de la pregunta
                case 1: datos_pregunta = $(this).text();//datos de la pregunta
            }
        });
        //asignamos el valor de la respuesta
        respuesta = $("#respuesta" + index).val();
        if (respuesta == "SI") respuesta = 1;
        else if (respuesta == "NO") respuesta = 0;
        else if (respuesta == "NA") respuesta = 2;
        //agregamos los datos a los arreglos
        soluciones.push(respuesta), folios.push(criterio);
    });
    //creamos los datos a enviar
    var datos = {
        'fecha': fechaCompleta(),
        'folio': folios,
        'solucion': soluciones,
        'usuario': ID_SCOI,
        "folio_sucursal": $("#idFolio").val()
    }
    //llamamos a la funcion que hace la conexion al webService
    conexion_ajax("servicios/insidencias_cklServ.asmx/guardar_datos", datos);
    //retornamos el arreglo
    $("#modal_sucursal").hide();
    return (datos);
}//fin
//da funcion a los botones de agregar observaciones y envia las observaciones a la base de datos
function darEventoObservaciones() {
    $('.obsbt').on('click', function () {
        //prompt();
        var dato = prompt("Observacion")
      //  console.log(dato)
        //al precionar el boton lanza un cuadro de texto para introducir las observaciones.
       // $(this).val(dato);
        if (dato != null ) {//checa si el valor esta vacio le asigna el caracter +.
           // conexion_guardar_observaciones(dato, $(this).attr("name"));
            var obj = {
                'folio_establecimiento': $("#idFolio").val(),
                'fecha': fechaCompleta(),
                'posicion_pregunta': $(this).attr("name"),
                'usuario': $("#Label1").text(),
                'id_cuestionario': 0,
                'observaciones': dato
            };
            //conexion de envio de datos
            conexion_ajax("servicios/insidencias_cklServ.asmx/guardar_observaciones", obj)
        }
    });//fin de onclick btn observaciones.
}//fin
//funcion tabla_observacioes
function tabla_observacioes_cuestionario() {
    //borramos los valores de la tabla si tiene
    $(".observacio_de_tabla").remove();
    //mostramos la ventana modal
    $("#moda_observaciones_cues").show()
    // var cuestionarios_resueltos = conexion_resultados_cuestionarios_por_dia();
    obj = { "folio_establecimiento": $("#idFolio").val(), "fecha": fechaCompleta() }
    var observaciones = conexion_ajax("servicios/insidencias_cklServ.asmx/obtener_observaciones", obj);
    var $tabala = $('<tr class="observacio_de_tabla" ></tr>');
    var nombre_cuestionario = '';
    var posicion_pregunta = 0;
    var contador = 1;
    $(".observacio_de_tabla").remove();
    //recorremos el arreglo
    $.each(observaciones, function (index, item) {
        //en la primer vuelta se asigna el nombre de cuestionario y la primer pregunta
        if (index == 0) {
            //asignacion de los valores 
            $tabala.append($("<td>></td>"));
            $tabala.append($("<td ></td>").append("OBSERVACIONES"));
            $tabala.append($("<td></td>"))
            $("#mostrar_observaciones_cuestionario").append($tabala.css({ 'text-align': 'left', 'background-color': 'rgb(148, 171, 186)', 'font-size': '18px' }));
            //reiniciamos la tabla
            $tabala = $('<tr class="observacio_de_tabla" ></tr>');
        }//fin
        //reiniciamos la tabla
        $tabala = $('<tr class="observacio_de_tabla" ></tr>');
        //agregamos las observaciones
        $tabala.append($("<td></td>").append(contador));
        $tabala.append($("<td></td>").append(item.observaciones).css({ 'text-align': 'left' }));
        $tabala.append($("<td></td>").append('<input type="button" onclick="borrar_observacion_por_folio(' + item.folio + ')" id="borrar_folio_' + item.folio + '" value="X"/> '));
        $("#mostrar_observaciones_cuestionario").append($tabala);
        contador++;
    });
}//fin
//funcion borrar por folio
function borrar_observacion_por_folio(folio) {
   
    conexion_ajax("servicios/insidencias_cklServ.asmx/Eliminar_observaciones", { 'folio': parseInt(folio) });
    $("#folio_" + folio).remove();
    $("#borrar_folio_" + folio).remove();
    tabla_observacioes_cuestionario();
}//fin
//funcion resultados 
function crear_tabla_resultados() {
    $('.resultado_ckl_t').remove();
    $("#resultados").show();
    tabla_resultados_insidencias()// resultados_de_ckl()
}//fin

/**/
//OBTENER CUESTIONEARIOS Y COMPARARLOS
function comparar_ckl_insidencias() {
    //total de incidencias
    var insidencias = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { "folio_establecimiento": $("#idFolio").val(), "fecha": fechaCompleta() });
    //insidencias resueltas
    var insidencias_resueltas = conexion_ajax("servicios/insidencias_cklServ.asmx/insicencias_cuestionarios_R", { 'sucursal': $("#idFolio").val(), 'fecha': fechaCompleta() });
    var cuestionario, pregunta;
    //recorremos las insidencias y las comparamos con las ya resueltas
    $.each(insidencias, function (indice, dato) {
        dato.respuesta = "--";
        // aqui re-asignamos las preguntas al resultado checklist
       //este each recorre las preguntas resueltas
        $.each(insidencias_resueltas, function (index, item) {
            if (item.criterio_cuestion == dato.folio) {
                dato.respuesta = item.respuesta;
            }//fin 2do if 
        });//fin 2do each
    });//fin each
    return insidencias;
}//fin
//crar tabla de resultados
function tabla_resultados_insidencias() {
    var resultados = comparar_ckl_insidencias(),cuestionario;
    var si = 0, no = 0, na = 0;
    var contador = 0,suma=0;
    $.each(resultados, function (index, datos) {
      var  tabla = $('<tr class="resultado_ckl_t"></tr>');
        if (index == 0) {
            tabla.append($("<th >#</th>").css({ 'background-color': '#93E2FA', 'width': '40px', 'font-size': '18px' }));
            tabla.append(($("<th class='criterio_cuestion' ></th>").append(datos.cuestionario)).css({ 'background-color': '#93E2FA', 'width': '70%', 'font-size': '18px' }));
            tabla.append($("<th >CUMPLIO</th>").css({ 'background-color': '#93E2FA', 'width': '90px', 'font-size': '18px' }));
            cuestionario = datos.cuestionario;
            $('.tablaRespuestas').append(tabla);
            tabla = $('<tr class="resultado_ckl_t"></tr>');
        }
        if (cuestionario == datos.cuestionario) {
            tabla.append(($("<td class='id'></td>").append((index + 1)).css({ "width": "40px" })));
            tabla.append(($("<td class='criterio_cuestion'></td>").append(datos.observaciones)).css({ "width": "70%", "text-align": "left" }));
            tabla.append(($("<td class='respuesta'></td>").append((cumple(datos.respuesta)))).css({ "width": "90px", "text-align": "center" }));
            $('.tablaRespuestas').append(tabla);
            tabla = $('<tr class="resultado_ckl_t"></tr>');
        }
        else if (cuestionario != datos.cuestionario) {
            tabla.append($("<th >#</th>").css({ 'background-color': '#93E2FA', 'width': '40px', 'font-size': '18px' }));
            tabla.append(($("<th class='criterio_cuestion' ></th>").append(datos.cuestionario)).css({ 'background-color': '#93E2FA', 'width': '70%', 'font-size': '18px' }));
            tabla.append($("<th >CUMPLIO</th>").css({ 'background-color': '#93E2FA', 'width': '90px', 'font-size': '18px' }));
            cuestionario = datos.cuestionario;
            $('.tablaRespuestas').append(tabla);
            tabla = $('<tr class="resultado_ckl_t"></tr>');
            tabla.append(($("<td class='id'></td>").append((index + 1)).css({ "width": "40px" })));
            tabla.append(($("<td class='criterio_cuestion'></td>").append(datos.observaciones)).css({ "width": "70%", "text-align": "left" }));
            tabla.append(($("<td class='respuesta'></td>").append((cumple(datos.respuesta)))).css({ "width": "90px", "text-align": "center" }));
            $('.tablaRespuestas').append(tabla);
            tabla = $('<tr class="resultado_ckl_t"></tr>');
        }
    });
    var tabla = $('<tr class="resultado_ckl_t"></tr>');
    tabla.append($("<th >#</th>").css({ 'background-color': '#93E2FA', 'width': '40px', 'font-size': '18px' }));
    tabla.append(($("<th class='criterio_cuestion' ></th>").append("CUMPLIO TOTAL")).css({ 'background-color': '#93E2FA', 'width': '70%', 'font-size': '18px' }));
    tabla.append($("<th ></th>").append(Math.round((suma / contador) * 100) + "%").css({ 'background-color': 'rgb(20,120,240)', 'width': '90px', 'font-size': '18px' }));

    $('.tablaRespuestas').append(tabla);
    
    //funcion que comprueba si cumplio
    function cumple(dato) {
        if (dato == 1) {
            contador++, suma ++,si++;
            return "SI";     
        }
        else if (dato == 0) {
            contador++, no ++;
            return "NO";}
        else if (dato == 2) {
            na ++;
            return "NA";
        }
        else return "--"
    }
    $("#cuadro_resultado_total_si").val(si), $("#cuadro_resultado_total_no").val(no), $("#cuadro_resultado_total_na").val(na);
    $("#cuadro_resultado_total_porcentual").val(Math.round((suma / contador) * 100))

}//fin
