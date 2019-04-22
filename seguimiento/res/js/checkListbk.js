
/*Aqui van todos los metos que interactuan con el documento html*/
$(document).ready(function () {
    //asignamos la fecha
    asignar_fecha();
    agregar_establecimiento_selector()
    mostrar_ocultar_botones()
    //ventanas modal
    $(".modal").hide();
    $(".modalckl").hide();
    $('.modalDialog1').hide();
    $('.modalDialog').hide();
    $('#accionesExportar').hide();

    //oculta las tablas de cuestionarios pregutas y menu_cuestionarios
   $('.gwcuestionariosDatos').hide();
   $('.gwMenuCuestionariosDatos').hide();
   $('.gwPreguntas').hide();
   $('.establecimientosDatos').hide();
    //cuadros de busqueda
   //$('#cuadro_buscar_sucursal').hide();
    //$('#cuadro_buscar_cuestionario').hide();
   $('#btn_cancelar_sucursal').on("click", function () {
       $('.modalDialog1').hide();
       $('.modalDialog').hide();
       $('#accionesExportar').hide();
      
   });

   $('#horaInicio').prop("disabled", true);
   $('#horaFin').prop("disabled", true);
    //accesibilidad de los botones

    //agregar funcion de teclado para ingresar cuestionario
   enter_para_ingresar_cuestionario();

    //dar la fecha
   fechaCompleta();
   $('#dialog').hide();
    //da evento a botn guardar
   guardar_cues_modal();
});//fin document ready
//variable global con datos de los cuestionarios
var cuestionarios_Datos = conexion_ajax("servicios/checkListServ.asmx/nombres_cuestionarios", {});
function agregar_cuestionario_boton(nombre_cuest) {//pendiente!!!!!!!!!!!!!!!!!!
   
    var t = "";
    var se_agrego = false;
    $.each(cuestionarios_Datos, function (index, item) {
        //checamos si el cuestionario no se encuentra agregado y lo agregamos
        if (nombre_cuest == item.nom_cuestionario) {
            conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_guardar", { "id_establecimiento": $("#establecimientos").val(), "cuestionario": item.folio })
          //  console.log(nombre_cuest);
            t = "<input type='button'  class='n_c' style='width:90%' ondblclick=' click_btn_cuestionarios(" + item.folio + ",\"" + nombre_cuest + "\")' id='" + item.folio + "' value='" + nombre_cuest + "' title='Folio:" + item.folio + "'/><input style='pos' type='button' title='Close' class='Quitar' id='btnQuitselec" + item.folio + "' style='border-radius:25px;' onclick='removerCues(" + item.folio + ")' value='X' />";
            
            $("#mostrarTabla_areas").append(t);
            se_agrego = true;
        }
    });
    if (!se_agrego) {
        alert("el cuestionario NO se agrego por que ya se encuentra en la tabla.");
    }
    mostrar_cuestionarios_resueltos();
    //recorremos el scroll
    $("#mostrarTabla_areas").scrollTop(9000000000000);
    //click_tabla_cuestionarios();
    return nombre_cuest;


}//fin
//funcion cambio de fecha


function removerCues(folio) {

    conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_borrar", { "id_establecimiento": $("#establecimientos").val(), "cuestionario": folio })
    $("#" + folio).remove();
    $("#btnQuitselec" + folio).remove();
    
}//fin
//dar evento a boton de cuest
function click_btn_cuestionarios(id,nombre) {

       // console.log(id + ":" + nombre);
        //crea la moda
        $(".modalckl").show();
        // modal_preguntas();
        //asigna valores a los campos
        $('#mCuestionario').val(id);
        $(".textoCuestioario").val(nombre);
        //agrega las preguntas a la tabla
        agregar_cuestionario();
     //si hay respuestas previas las asigna 
        resultadockl_parcial(id);
    //revisar respuestas ckbx
        resultadoConteo();
    $("#btnCerrar").on("click", function () {
        $(".modalckl").hide();
        // $(".n_c").
    });

}//fin
//recorre los datos de tabla cuestionario para asignar los valores a un objeto el cual se compara con la atabla menu cuestionarios************************"
//y reemplaza el numero(folio_pregunta) de pregunta por la pregunta(nombre_pregunta).
function agregar_cuestionario() {

    var dat = $("<tr class='classcuestionario'></tr>");
    //eliminar tr existentes de tabla a llenar
    $('.classcuestionario').remove();

    //console.log("longitud " + nom_cuestionarioCom.length);
    if ($('.mCuestionario').val()) {
        //agrega el texto del cuestionario al campo texto.
        // agregarNombreCuest();, convertir_nom_preg(campo2)
        //variable que almacena el folio de cuestionario
        var folio = $('.mCuestionario').val();
        //llamamos la funcion que almacena los datos de la tabla
        var respuestas_tabla = conexion_ajax("servicios/checkListServ.asmx/asignar_tabla_cuestionarios", { 'folio_cuestiono': folio });
        /*Recorremos la tabla menucuestionarios para comparar el folio de la pregunta  y sustituirla en su valor*/
        $.each(respuestas_tabla, function (index,item) {
            //  console.log(index+1);
            //damos los valores de las tablas
            var campo1 = item.orden;
            var campo2 = item.folio_pregunta;
            dat.append($("<td class='orden'></td>").append(campo1));
            dat.append($("<td class='pregunta'></td>").append("<h3>" + item.pregunta + "</h3>").css({ "width": "65%" }));
            dat.append($("<td class='si' title='Respuestas.'  ></td>").append($("<input type='radio' class='sicb' id='si" + index + "' />").css({"width":"90%"})));
            dat.append($("<td class='no' title='Respuestas.'  ></td>").append($("<input type='radio' class='nocb' id='no" + index + "' />").css({ "width": "90%" })));
            dat.append($("<td class='na' title='Respuestas.'  ></td>").append($("<input type='radio' class='nacb' id='na" + index + "' />").css({ "width": "90%" })));
            dat.append($("<td class='obs'  title='Agregar observaciones.'> </td>").append("<input type='button' style='height:30px;width:40px;' class='obsbt' id='obs" + index + "' name=" + item.orden + " value='+'/>"));
           // console.log(campo1+":"+campo2);
            $('.tablaPreguntas').append(dat);
            dat = $("<tr class='classcuestionario'></tr>")
        });//fin for in
    }//fin if
    //eventos checkbox y boton observaciones
    eventosLlenado();
    //creamos evento de filtro de la tabla
    filtrar_tabla_preguntas(); 
}//fin 1
//funcion dblclick a classcuestionario
function dbclick_cuestionario_selec() {
    $(".tablaCuestionario").dblclick(function () {

        agregar_cuestionario_boton($("#txt_buscar_cuestionario").val());
        //oculta la modal
        $("#openModal").hide();
        $(this).children("tr").remove();
    });

}//fin
//crear tabla de buscar cuestionario/////////////////////////////////////////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscar_cuestionario() {
    var datosTabla = "";

    //creamos variable que contenga la tabla de datos 
    var tabla = conexion_ajax("servicios/checkListServ.asmx/nombres_cuestionarios", {});

    $('#txt_buscar_cuestionario').val("");
    var index = 1;
    //almacenaran los datos a asignar en folio
    var nombre, folio;
    $.each(tabla, function (index, item) {
        datosTabla += "<tr class='class_cuestionarios' >" + "<td style='width:15%'>" + item.folio + "</td>" + "<td style='width:70%'>" + item.nom_cuestionario + "</td>" + "<td style='width:15%'> " + item.estatus + "</td>" + "</tr>";
       // console.log(index + ":" + item);
    });//fin forIn
    //asignar funcion dbclick a tabla
    dbclick_cuestionario_selec();

    $('.tablaCuestionario').append(datosTabla);

    //agregamos la funcion de sombra
    $('.tablaCuestionario tr').mouseleave(function () {
        $(this).removeClass("sombras");
    });
    $('.tablaCuestionario tr').mouseenter(function () {
        $(this).addClass("sombras");
    });
    //dar evento a seleccion de click en celda
    $('.tablaCuestionario tr').click(function () {

        //recorre los hijos de tr
        $(this).children("td").each(function (subIndex) {
            //asigna nombre y folio
            switch (subIndex) {
                case 1:
                    nombre = $(this).text();
                    break;
                case 0:
                    folio = $(this).text();
            }
        });
        //agrega nombre al cuadro de buscar
        $("#txt_buscar_cuestionario").val(nombre);
    });
    //dar evento a boton seleccionar
    $('#btn_selec_cuestionario').click(function () {
        $('#mCuestionario').val(folio);
        $('#textoCuestioario').val(nombre);
        $('.modalDialog').hide();
        var id = $("#txt_buscar_cuestionario").val();
        $("#" + id).remove();
        agregar_cuestionario_boton(id);
    });//fin fn evento boton
    

    $('#btn_cancelar_cuestionario').click(function () {
        $('#mCuestionario').val("");
        $('#textoCuestioario').val("");
        $('#cuadro_buscar_cuestionario').val("");
        $('.modalDialog').hide();
        $('.classcuestionario').remove();
        $('#resultadoNA').val(0);
        $('.resultado').val(0);

    });

    filtrar_tabla_cuestionario();
}//fin
//funcion mostrar cuestionarios resueltos
function mostrar_cuestionarios_resueltos() {
    var cuest_resuestos = conexion_ajax("servicios/checkListServ.asmx/consulta_cuestionarios_por_fechas", { "establecimiento": $("#establecimientos").val(), "f_inicio": fechaCompleta(), "f_termino": fechaCompleta() });
    var zona = 0,contador=0,nombre;
    $.each(cuest_resuestos, function (index, item) {
        $("#" + item.id_cuestionario).addClass("cuest_resueltos")
    });
}//fin

function obtener_lista_cuestionarios_por_establecimiento(){
    var lista = conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento", { "id_establecimiento": $("#establecimientos").val() });
    $.each(lista, function (index, item) {
       t = "<input type='button'  class='n_c' style='width:90%' ondblclick=' click_btn_cuestionarios(" + item.id_cuestionario + ",\"" + item.cuestionario + "\")' id='" + item.id_cuestionario + "' value='" + item.cuestionario + "' title='Folio:" + item.id_cuestionario + "'/>"
       t += "<input style='pos' type='button' title='Close' class='Quitar' id='btnQuitselec" + item.id_cuestionario + "' style='border-radius:25px;' onclick='removerCues(" + item.id_cuestionario +")' value='X' />";
        $("#mostrarTabla_areas").append(t);
    });
}//
//agregar nombre a establecimiento********************************************************************
function agregar_establecimiento() {
    $(".n_c").remove()
    $(".Quitar").remove()
    //enlista los cuestionarios
    obtener_lista_cuestionarios_por_establecimiento()
    //muestra los resueltos
    mostrar_cuestionarios_resueltos();
}//fin 5
//funcion buscar establecimiento por folio
function buscar_establecimiento_por_folio(folio) {
  return  conexion_ajax("servicios/checkListServ.asmx/buscar_establecimiento_por_folio", { "folio": folio })
  
}//fin
function agregar_establecimiento_selector() {
    $(".n_c").remove()
    $(".Quitar").remove()
    //llamamos a la funcion ajax que contieme el arreglo a usar
    var tabla = conexion_ajax("servicios/checkListServ.asmx/buscar_establecimiento", {})
    $.each(tabla, function (i, item) {
        var opt = $(' <option></option>')
        opt.append(item.nombre_establecimiento);
        opt.val(item.id_establecimiento)
        $("#establecimientos").append(opt);
    });//fin forIn
}
//creamos la funcion de filtar
function filtrar_tabla_preguntas() {
    //recorremos la tabla a filtrar
    $(".tablaPreguntas tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();

        $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#filtro_tabla_preguntas").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $(".tablaPreguntas tr:hidden").show();
        $.each(s, function () {
            $(".tablaPreguntas tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });
}//fin 9

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


}//fin 10

//creamos una funcion que marca el tiempo inicial***************************listo
function funcionTiempo1() {
    //deshabilitamos los input de las horas
    $('#horaInicio').prop("disabled", true);
    $('#horaFin').prop("disabled", true);
    

    //llamamos al metodo Date
    var dinicio = new Date();
    //variables de los tiempos
    var hora = dinicio.getHours();
    var min = dinicio.getMinutes();
    var seg = dinicio.getSeconds();

    //variable que almacenara el string del tiempo
    var tiempo;

    //revisamos si nesecita agregarle cero
    if (hora < 10)
        hora = ("0" + hora);
    if (min < 10)
        min = ("0" + min);
    if (seg < 10)
        seg = ( "0" + seg);

    //asignamos los valores a variable tiempo
    tiempo = (hora + ":" + min + ":" + seg);
    
    //agregamos tiempo al input
    $('#horaInicio').val(tiempo);
    //al dar click en el objeto dara tiempo en un alert
    $('#tInicio').on("click", function () {
        if ($("#establecimientos").val() != "")
            alert("Hora inicio:\n" + $('#horaInicio').val());
    });//fin click inicio

}//fin 11


//creamos una funcion que marca el tiempo final******************************************************************************listo.
function funcionTiempo2() {
    //llamada al metodo data time
    var dfinal = new Date();
   
    //variables de los tiempos
    var hora2 = dfinal.getHours();
    var min2 = dfinal.getMinutes();
    var seg2 = dfinal.getSeconds();
    //variable que almacenara el string del tiempo
    var tiempo2;

    //revisamos si nesecita agregarle cero
    if (hora2 < 10)
        hora2 = ("0" + hora2);
    if (min2 < 10)
        min2 =  ("0" + min2);
    if (seg2 < 10)
        seg2 = ("0" + seg2);
    //asignamos los valores a variable tiempo
    tiempo2 = (hora2 + ":" + min2 + ":" + seg2);

    //parseamos los datos de tiempo asigmnados al input
    hora2 = parseInt(hora2);
    min2 =  parseInt(min2);
    seg2 =  parseInt(seg2);

    //asignamos el valor del tiempo  al input hora final
    $('#horaFin').val(tiempo2);
    
    //llamada a funcion
    var t1 = $('#horaInicio').val();

    //parseamos los valores detiempo obtenidos
    var h1 =   parseInt(t1[0] + t1[1]);
    var m1 =   parseInt(t1[3] + t1[4]);
    var s1 =   parseInt(t1[6] + t1[7]);

  //  console.log("Inicio:" + $('#horaInicio').val());
    //console.log("ahora:"+tiempo2);
    
    if (hora2 > h1) {
        h1 = hora2 - h1;
        m1 = ( min2 + (60* h1 ) ) - m1;

        //checamos si m1 es mayor a 60
        if (m1 >= 120) {
            h1 = 2;
            m1 = m1 - 120;
        }//fin if interno
        else if(m1 >= 60) {
            h1 = 1;
            m1 = m1 - 60; 
        }//fin else if
        else
            h1 -= h1;
    }//fin if 
    else {
        m1 = min2 - m1;
        h1=0;
    }//fin else


    //asignamos valor a los segundos
    if( s1>seg2){
        s1 = (seg2 + 60) - s1;
        m1 = m1-1;
    }//fin if
    else s1 = seg2 - s1;



    //revisamos si nesecita el cero
    if (h1 < 10)        h1 = "0" + h1;
    if (m1 < 10)        m1 = "0" + m1;
    if (s1 < 10)        s1 = "0" + s1;
    

    //retornamos el tiempo tardado
    return h1 + ":" + m1 + ":" + s1;


}//fin  12

//funcion fecha********************************************************************************
function asignar_fecha() {
    var dia = new Date(), d = dia.getDate(), m = dia.getMonth(), a = dia.getFullYear();
    m = m + 1;
    if(m<10)
        m ="0" + m;
    if (d < 10)
        d = "0" + d;
    var f = (a + "-" + m + "-" + d);
   // console.log("Fecha:"+f);
   $('#divDia').val(f);
}//fin 13
function fechaCompleta() {
    var dia = $('#divDia').val();
    var d = dia[8] + dia[9];
    var m = dia[5] + dia[6];
    var a = dia[0] + dia[1]+dia[2] + dia[3];

    return d + "-" + m + "-" + a;
}//fin 13

//funcion de checkbox.
//recorre los hijos de la tabla y revisa si en los cbx de estos hay un true.
function revisarCkb() {
    //inicializamos el checkBox como na tomando este en true por default
  /*  $('.nacb').each(function (index) {
        $('#na' + index).attr('checked', true);
    });//fin each
    */

    //verifica si se a hecho clck en el cbx si
    $('.sicb').on('change', function () {
        $(".tablaPreguntas tr").each(function (index) {
          // console.log("Entro a ckb:"+index);
            if ($('#si' + index).is(':checked')) {
                $(this).attr('checked', true);
                $('#no' + index).attr('checked', false);
                $('#na' + index).attr('checked', false);
                //console.log("checkbox si " + index + ":" + $(this).attr('checked'));
            }//fin if
            resultadoConteo();//revisamos los si checados
        });//fin each
       
        //console.log("click dados:"+contador);
    });//fin checar clase si

    //verifica si se a hecho clck en el cbx no
    $('.nocb').on('change', function () {
        $(".tablaPreguntas tr").each(function (index) {
            // console.log("Entro a ckb:"+index);
            if ($('#no' + index).is(':checked')) {
                $(this).attr('checked', true);
                $('#si' + index).attr('checked', false);
                $('#na' + index).attr('checked', false);
               // console.log("checkbox no " + index + ":" + $(this).attr('checked'));
            }//fin if
            resultadoConteo();//revisamos los si checados
        });//fin each
        
        //console.log("click dados:"+contador);
    });//fin checar clase no

    //verifica si se a hecho clck en el cbx na
    $('.nacb').on('change', function () {
        $(".tablaPreguntas tr").each(function (index) {
            // console.log("Entro a ckb:"+index);
            if ($('#na' + index).is(':checked')) {
                $(this).attr('checked', true);
                $('#no' + index).attr('checked', false);
                $('#si' + index).attr('checked', false);
               // console.log("checkbox na " + index + ":" + $(this).attr('checked'));
            }//fin if
            resultadoConteo();//revisamos los si checados
        });//fin each
        
        //console.log("click dados:"+contador);
    });//fin checar clase na
}//fin 14

//asigna los resultados de las preguntas a sus respectivos marcadores***************************listo 25-02-18
function resultadoConteo() {
    var contadorsi = 0;
    var contadorno = 0;
    var contadorna = 0;
    var total = 0;

   // console.log("total*************************");
    //checa los si marcados##################################################
    $('.sicb').each(function (index) {
        //console.log("total de si :"+index);
        if ($(this).is(':checked')) {
            contadorsi++;
        }//fin if
    });//fin each

    //checa los no marcados##################################################
    $('.nocb').each(function (index) {
        //console.log("total de no :" + index);
        if ($(this).is(':checked')) {
            contadorno++;
        }//fin if
       
    });//fin each

    //checa los na marcados##################################################
    $('.nacb').each(function (index) {
        //console.log("total de na :" + index);
        if ($(this).is(':checked')) {
            contadorna++;
        }//fin if
    });//fin each

    $('#resultadoSi').val(contadorsi);//asigna el conteo de si al marcador
    $('#resultadoNo').val(contadorno);//asigna el conteo de no al marcador
    $('#resultadoNA').val(contadorna);//asigna el conteo de na al marcador

    var rPorsentual = 0;
    if (contadorsi)
        rPorsentual = (contadorsi / (contadorsi + contadorno) * 100);
    else
        rPorsentual = 0;

    total = contadorsi + contadorno + contadorna;
    //var suma = resultadoSi + resultadoNo + resultadoNA;
    $('#resultadoTotal').val(total);

    if (rPorsentual >= 90) {
        $('#porcentual').addClass('positivo');
       // console.log('va bien:' + rPorsentual);
    }//fin if
    else {
        $('#porcentual').addClass('negativo');
       // console.log('va mal: ' + rPorsentual);
    }

    $('#resultadoPorsentual').val( Math.round(rPorsentual) );
    //document.getElementById('resultadoTotal').innerHTML = suma; rPorsentual.toFixed(2)

}//fin 15

//dar evento a botones de observaciones ***************************************************************************************
function darEventoObservaciones() {
    $('.obsbt').on('click',function(){
        //prompt();
        var observaciones = prompt("Observacion")
        if (observaciones != null && observaciones.length>1) {
            respuesta = conexion_ajax("servicios/checkListServ.asmx/guardar_observaciones", {
                'folio_establecimiento': parseInt($("#establecimientos").val()),
                'id_cuestionario': $("#mCuestionario").val(),
                'fecha': fechaCompleta(),
                'posicion_pregunta': $(this).attr("name"),
                'observaciones': observaciones,
                'usuario': $('#Label1').text()
            });
        }   
    });//fin de onclick btn observaciones.
}//fin  16

//funcion guardar, enviara todos los datos por medio de ajax al servidor ***************************************************
function GuardarEnviar() {
    //guardamos la hora de finalizacion
    funcionTiempo2();
    /*******variables a enviar*******/
    //listas
    var url = "servicios/checkListServ.asmx/guardar_datos";//direccion del servicio.
    var folioSucursal = $('#establecimientos').val();//folio del la sucursal
    var fechaCreacio = fechaCompleta();// fecha de creacion
    var horaInicio = $('#horaInicio').val();//hora de inicio
    var horaFin = $('#horaFin').val();//hora de termino
    var duracion = funcionTiempo2();//duracion
    var zonaCuestionario = $('.mCuestionario').val();//id de cuestionario
    var aplicador = $('#Label1').text();//nombre del usuario
    var totalPreguntas = $('#resultadoTotal').val();
    var resultado = $('#resultadoPorsentual').val();
    
    //checamos que resultado tenga un valor numerico.
    if (resultado === "NaN")
        resultado = 0;
    
    //variables que guardaran los arreglos generados
    var obj_menu_ckl = {
        'folio_sucursal': folioSucursal,
        'fecha': fechaCreacio,
        'zona': zonaCuestionario,
        'aplicador': aplicador,
        'duracion': duracion
    };
       //recorremos el ojbejo par obtener los datos y guardarlos
        recorrer_objetos();

}//fin 17
function recorrer_checkbox() {
    var contador = 0;
    var total=0;

    $(".classcuestionario [type=radio]").each(function (index, dato) {
           // console.log(dato.checked);
            if (dato.checked) {
                contador++;
            }
            total++;
    });
   
   // console.log("checados:" + contador + ":\t total:" + (total / 3));
    if(contador ==(total/3)){
        return true;
    }
    else 
        return false;
}//fin
//funcion recorrer objetos para enviar***************************************************************************************
function recorrer_objetos( ) {
   // var arreglo = new Array();
    //por obtener, en ciclo
    var ordenCuestiones, datos_pregunta, Observaciones;
    //objeto para llenar
    var obj = {};
    var no_respondidas = [];

    var url = "servicios/checkListServ.asmx/guardar_datos";//direccion del servicio.
    var folioSucursal = $('#establecimientos').val();//folio del la sucursal*
    var fechaCreacio = fechaCompleta();// fecha de creacion*
    var zonaCuestionario = $('.mCuestionario').val();//id de cuestionario*
    var aplicador = $('#Label1').text();//nombre del usuario*


    //recorre la tabla de preguntas en cada uno de sus puntos
    $('.tablaPreguntas tr').each(function (index) {
        var respuesta = 3;
        //recorre los hijos del objeto
        $(this).children("td").each(function (subIndex) {
            switch (subIndex) {
                case 0:
                    ordenCuestiones = $(this).text();
                    break;
                case 1:
                    datos_pregunta = $(this).text();
                    break;

            }//fin switch
        });//fin each de hijos

        //checamos si se respondi si o no en cuestionario
        if ($('#si' + index).is(':checked') === true) respuesta = 1;
        else if ($('#no' + index).is(':checked') === true) respuesta = 0;
        else if ($('#na' + index).is(':checked') === true) respuesta = 2;
        else respuesta = 3;

        //asignamos las observaciones
        Observaciones = $('#obs' + index).val();

            //llenamos el objeto
            obj = {
                'sucursal': folioSucursal,//sucursal
                'fecha': fechaCreacio,//fecha
                'zona': zonaCuestionario,//zona
                'criterio': ordenCuestiones,//criterio
                'respuesta': respuesta,//respuesta
                'datos_pregunta': datos_pregunta,//datos_pregunta
                'observaciones': Observaciones,//observaciones
                'aplicador': aplicador,//aplicador
            }//fin obj

        //checamos si estan checadas todas las respuestas
         
          if (3 > respuesta) {
              //funcion ajax a check_list_establecimientos
              conexion_ajax(url, obj);
          }//fin
          else {
              no_respondidas.push(obj);
          };
          respuesta = 3;
    });//fin de primer each
    $.each(no_respondidas, function (index, item) {
        if (index == 0)
            console.log("No respondidas:");
        console.log(item.criterio + ":" + item.datos_pregunta);
    });
}//fin
//llena lascaja superior de resultados de las preguntas
function eventosLlenado() {
    //recorre la tabla creada para revisar los ckb
    revisarCkb();
    //da los eventos de guardar observaciones en valor de boton.
    darEventoObservaciones();
    //dar total 
    resultadoConteo();

}//fin 21
//recuperar resultados de ckls
function resultadockl_parcial(zona) {
    //lo llamamos al recibir el num de cuestionario a rebisar
    var respuestas = conexion_ajax("servicios/checkListServ.asmx/conexion_reultados_parcial", { 'folio_sucursal': $("#establecimientos").val(), 'fecha': fechaCompleta(), 'zona': zona }) //  conexion_reultados_ckl_parcial(pos);
    //recorremos las respuestas 
    $.each(respuestas, function (index, item) {
        //las comparamos con el ckbox correspondiente al numero de respuesta
        if (item.respuesta == 0) {$('#si' + index).attr('checked', false),$('#no' + index).attr('checked', true),$('#na' + index).attr('checked', false) }
        else if (item.respuesta == 1) {$('#si' + index).attr('checked', true), $('#no' + index).attr('checked', false),$('#na' + index).attr('checked', false)}
        else if (item.respuesta == 2) { $('#si' + index).attr('checked', false),$('#no' + index).attr('checked', false),$('#na' + index).attr('checked', true) }
        else
        {$('#si' + index).attr('checked', false),$('#no' + index).attr('checked', false),$('#na' + index).attr('checked', false)}
        //revisamos los comentarios y los agregamos
        $("#obs"+index).val(item.observaciones);
       // console.log(item.observaciones);
    });
}//fin
function resultados_de_ckl() {
    //obtenemos el arreglo con los datos de resultados
    var resultados = conexion_ajax("servicios/checkListServ.asmx/procedimiento_resultados_cuestionario_por_dia", { 'fecha': fechaCompleta(), 'folio_establecimiento': $("#establecimientos").val() });

    var contenedor = "", nombre_zona, contador, colorno = "", colorna = "", colorsi = "",respuesta;
    var suma_si = 0, suma_no = 0, suma_na = 0, suma_limpieza = 0, suma_surtido = 0, suma_imagen = 0, total_limpieza = 0, total_surtido = 0, total_imagen = 0;

    //recorremos los resultados
    $.each(resultados, function (index, datos) {
        datos.zona_inspeccion;
        datos.pregunta;
        //variables reseteables
        var si = "", no = "", na = "", per_lim = "", per_surt = "", per_imag = "";
      //se ejecuta el la primer vuelta para colocar la cavecera
        if (index == 0) {
            //asignamos el nombre
            nombre_zona = datos.zona_inspeccion;
           // console.log(nombre_zona);
            contenedor = "<tr class='resultado_ckl_t'  style='background-color:#93E2FA;width:100%;font-size:18px;'> <th rowspan='2' class='id' style='width:40px;'>1</th> <th class='criterio_cuestion' rowspan='2' style='width:70%;'>" + nombre_zona + "</th><th colspan='3'>CUMPLE</th><th colspan='3'>PERTENECE</th></tr><tr class='resultado_ckl_t' ><td >SI</td><td>NO</td><td>NA</td><td STYLE='width:45px' >LIMPIEZA</td><td STYLE='width:45px'>SURTIDO</td><td STYLE='width:45px'>IMAGEN</td></tr>";
            contador = 1;
            $('.tablaRespuestas').append(contenedor);
        }//fin
        //checamos que el nombre sea el mismo que el datos de la zona
        if (nombre_zona == datos.zona_inspeccion) {

            //agregamos color y marcamos
            if (datos.rsi) {
                colorsi = "#86f245", colorno = "", colorna = "", si = "X", suma_si++;
            }
            else if (datos.rno) {
                colorno = "#f52121", colorsi = "", colorna = "", no = "X", suma_no++;
            }
            else if (datos.rna) {
                colorna = "#9b9b9b", colorno = "", colorsi = "", na = "N/A", suma_na++;
            }
            //checamos si los aspectos tienen valor y se suma el contador
            if (datos.imagen && datos.rna == 0) { per_imag = "X", total_imagen++, suma_imagen += datos.rsi }//fin
            else if (datos.limpieza && datos.rna == 0) { per_lim = "X", total_limpieza++, suma_limpieza += datos.rsi }//fin
            else if (datos.surtido && datos.rna == 0) { per_surt = "X", total_surtido++, suma_surtido += datos.rsi }//fin


            // console.log("\t"+datos.pregunta);
            contenedor = "<tr class='resultado_ckl_t' style='width:100%;'> <td class='id' style='width:40px'>" + (index + 1) + "</td> <td class='criterio_cuestion' style='width:70%;text-align:left '>" + datos.pregunta + "</td> <td class='respuesta' style='background-color:" + colorsi + ";width:45px'>" + si + "</td><td class='respuesta'  style='background-color:" + colorno + ";width:45px'>" + no + "</td><td class='respuesta'  style='background-color:" + colorna + ";width:45px'>" + na + "</td>  <td>" + per_lim + "</td><td>" + per_surt + "</td><td>" + per_imag + "</td>  </tr>";
            $('.tablaRespuestas').append(contenedor);
        }//fin
        else if (nombre_zona != datos.zona_inspeccion) {
            nombre_zona = datos.zona_inspeccion;
            contador++;

            console.log("imagen:" + (suma_imagen) + ":" + total_imagen + ">" + datos.imagen);
            console.log("surtido:" + suma_surtido + ":" + total_surtido + ">" + datos.surtido);
            console.log("limpieza:" + suma_limpieza + ":" + total_limpieza + ">" + datos.limpieza);
            console.log("***********************************************");

            //checamos si los aspectos tienen valor y se suma el contador
            if (datos.imagen && datos.rna==0) { per_imag = "X", total_imagen++, suma_imagen += datos.rsi }//fin
            else if (datos.limpieza && datos.rna == 0) { per_lim = "X", total_limpieza++, suma_limpieza += datos.rsi }//fin
            else if (datos.surtido && datos.rna == 0) { per_surt = "X", total_surtido++, suma_surtido += datos.rsi }//fin



            //agregamos color y marcamos
            if (datos.rsi) {
                colorsi = "#86f245", colorno = "", colorna = "", si = "X";
            }
            else if (datos.rno) {
                colorno = "#f52121", colorsi = "", colorna = "", no = "X";
            }
            else if (datos.rna) {
                colorna = "#9b9b9b", colorno = "", colorsi = "", na = "N/A";
            }
            //pie de tabla
            contenedor = "<tr class='resultado_ckl_t' style='width:100%;font-size:18px'> <th class='id' colspan='2'>TOTALES</th> <th class='respuesta' style='background-color:;width:45px'>" + (suma_si) + "</th><th class='respuesta'  style='background-color:;width:45px'>" + (suma_no) + "</th><th class='respuesta'  style='background-color:;width:45px'>" + (suma_na) + "</th> <th>" + (function (a) { if (a > 0) { return Math.round(a) / 10 + "%" } else { return "---" } }((suma_limpieza / total_limpieza)*1000)) + "</th><th>" + (function (a) { if (a > 0) { return Math.round(a) / 10 + "%" } else { return "---" } }((suma_surtido / total_surtido) * 1000)) + "</th><th>" + (function (a) { if (a > 0) { return Math.round(a) / 10 + "%" } else { return "---" } }((suma_imagen / total_imagen)*1000)) + "</th> </tr>";
            $('.tablaRespuestas').append(contenedor);
            //cabecera de tabla 
            contenedor = "<tr class='resultado_ckl_t'  style='background-color:#93E2FA;width:100%;font-size:18px;'> <th rowspan='2' class='id' style='width:40px;'>"+contador+"</th> <th class='criterio_cuestion' rowspan='2' style='width:70%;'>" + nombre_zona + "</th><th colspan='3'>CUMPLE</th><th colspan='3'>PERTENECE</th></tr><tr class='resultado_ckl_t' ><td >SI</td><td>NO</td><td>NA</td><td STYLE='width:45px' >LIMPIEZA</td><td STYLE='width:45px'>SURTIDO</td><td STYLE='width:45px'>IMAGEN</td></tr>";
            contador = 1;
            $('.tablaRespuestas').append(contenedor);
            //primer contenido
            contenedor = "<tr class='resultado_ckl_t' style='width:100%;'> <td class='id' style='width:40px'>" + (index + 1) + "</td> <td class='criterio_cuestion' style='width:70%;text-align:left '>" + datos.pregunta + "</td> <td class='respuesta' style='background-color:" + colorsi + ";width:45px'>" + si + "</td><td class='respuesta'  style='background-color:" + colorno + ";width:45px'>" + no + "</td><td class='respuesta'  style='background-color:" + colorna + ";width:45px'>" + na + "</td>  <td>" + per_lim + "</td><td>" + per_surt + "</td><td>" + per_imag + "</td>  </tr>";
            $('.tablaRespuestas').append(contenedor);
           // console.log(nombre_zona);
            //console.log("\t" + datos.pregunta);


            suma_si = 0, suma_no = 0, suma_na = 0, suma_limpieza = 0, suma_surtido = 0, suma_imagen = 0, total_limpieza = 0, total_surtido = 0, total_imagen = 0;
            //agregamos color y marcamos
            if (datos.rsi) {
                colorsi = "#86f245", colorno = "", colorna = "", si = "X", suma_si++;
            }
            else if (datos.rno) {
                colorno = "#f52121", colorsi = "", colorna = "", no = "X", suma_no++;
            }
            else if (datos.rna) {
                colorna = "#9b9b9b", colorno = "", colorsi = "", na = "N/A", suma_na++;
            }
            

        }//fin

    });

    //pie de ultima tabla
    contenedor = "<tr class='resultado_ckl_t' style='width:100%;font-size:18px'> <th class='id' colspan='2'>TOTALES</th> <th class='respuesta' style='background-color:;width:45px'>" + (suma_si) + "</th><th class='respuesta'  style='background-color:;width:45px'>" + (suma_no) + "</th><th class='respuesta'  style='background-color:;width:45px'>" + (suma_na) + "</th> <th>" + (function (a) { if (a > 0) { return Math.round(a) / 10 + "%" } else { return "---" } }((suma_limpieza / total_limpieza) * 1000)) + "</th><th>" + (function (a) { if (a > 0) { return Math.round(a) / 10 + "%" } else { return "---" } }((suma_surtido / total_surtido) * 1000)) + "</th><th>" + (function (a) { if (a > 0) { return Math.round(a) / 10 + "%" } else { return "---" } }((suma_imagen / total_imagen) * 1000)) + "</th> </tr>";
    $('.tablaRespuestas').append(contenedor);

   

    return resultados;
}//fin
//funcion convertir cuestionario
function convertir_nom_cuest(cuestionario) {
    var cuestionarios = conexion_ajax("servicios/checkListServ.asmx/nombres_cuestionarios", {});
    for ( dato in cuestionarios ){
        if (cuestionarios[dato].folio=== cuestionario) {
            return cuestionarios[dato].nom_cuestionario;
        }
    }//fin forIn

}//fin

//funcion convertir respuesta
function convertir_respuesta(respuesta) {
    if (respuesta == 0)
        return "NO";
    else if (respuesta == 1)
        return "SI";
    else return "NA";

}//fin
//revisar los campos de las celdas de resultados y agregarlos a los contadores
function llenar_contadores_resultado_total_checkl() {

    //creamos variables a usar;
    var respuesta, totalsi = conexion_ajax("servicios/checkListServ.asmx/resultados_respuestas", { 'folio_sucursal': $('#establecimientos').val(), 'fecha': fechaCompleta(), "respuesta": 1 });
    var totalno = conexion_ajax("servicios/checkListServ.asmx/resultados_respuestas", { 'folio_sucursal': $('#establecimientos').val(), 'fecha': fechaCompleta(), "respuesta": 0 });
    var totalna = conexion_ajax("servicios/checkListServ.asmx/resultados_respuestas", { 'folio_sucursal': $('#establecimientos').val(), 'fecha': fechaCompleta(), "respuesta": 2 });

    //lenamos los cuadros con los resultados
    $('#cuadro_resultado_total_si').val(totalsi);
    $('#cuadro_resultado_total_no').val(totalno);
    $('#cuadro_resultado_total_na').val(totalna);
    //creamos la formula de cuadro porcentual
    respuesta = totalsi / (totalsi + totalno) * 100;
    respuesta = Math.round(respuesta * 100);
    respuesta = respuesta / 100;
    $('#cuadro_resultado_total_porcentual').val(respuesta);

}//fin

//modoficar fecha larga
function fecha_larga() {
    var f = $('#divDia').val();

    //crear arreglo de los meses
    var mes = new Array;
    mes = [
        "","ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SEPTIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE"
    ]//fin mes
    mc= parseInt(f[5] + f[6]);

    //console.log(f[8] + f[9] + "/" + f[5] + f[6] + "/" + f[0] + f[1] + f[2] + f[3]);
    //convertimos la fecha al formato para revisar en bd
    f = f[8] + f[9] + "/" + mes[mc] + "/" + f[0] + f[1] + f[2] + f[3];

    return f;
}//fin
//funcion guardar xml
function to_xml_(retorno_nombres) {
    console.clear();
    var salida =[ "<?xml version='1.0' encoding='UTF-8'?>\n <checklist date='"+fecha_larga()+"' sucursal='" + $('#mEstablecimiento').val() + "'>\n\t"];
    var nombre_cuest, indice, nPreg, alto = 800, separacion = 45, cotador = 0, n = 130, p = 145, r = 160, o = 175;
    for (j in retorno_nombres) {
        
            //si el dato es el primero se le asigna el nombre
            if (cotador == 0) {
                //creamos indice de cuest
                nPreg = 1;
                //asignamos valor
                nombre_cuest = retorno_nombres[j].nombre;
                //lo mostramos
               // console.log(nPreg + "-" + nombre_cuest + "posicion:" + (separacion * cotador + n));
                //agregamos el valor de cuestionario a salida
                salida.push( "<cuestionario id='" + nPreg + "' name='" + nombre_cuest + "' >\n\t\t");

               //creamos indice de pregunta
                indice = 1;
            }//fin if
            //revisamos si el nombre es el mismo
            if (nombre_cuest == retorno_nombres[j].nombre) {
                //imprimimos los datos
              /*  console.log("\t" + indice + " pregunta:" + retorno_nombres[j].pregunta + "posicion:" + (separacion * cotador + p));
                console.log("\t respuesta:" + retorno_nombres[j].respuesta + "posicion:" + (separacion * cotador + r));
                console.log("\t Obs:" + retorno_nombres[j].observaciones + "posicion:" + (separacion * cotador + o));
                // console.log("j=" + j + " Separador=" + separacion + " Contador=" + cotador + " N=" + n + " O=" + o);*/
                //agregamos los datos a cuestionario
                salida.push ("<pregunta id='" + indice + "' value='" + retorno_nombres[j].pregunta + "' >\n\t\t");
                salida.push ("<respuesta>" + retorno_nombres[j].respuesta + "</respuesta>\n\t\t");
                salida.push ("<observaciones>" + retorno_nombres[j].observaciones + "</observaciones>\n\t");
                salida.push ("</pregunta>\n");
            }
                //si hay un nombre de cuestionario diferente se se reasigna
            else if (nombre_cuest != retorno_nombres[j].nombre) {
                nPreg++;
                n += 15, p += 15, r += 15, o += 15;//correccion del error
                //cerramos el cuestionario
                salida.push ("</cuestionario>\n\t");
                //abrimos elnuevo
                salida.push ("<cuestionario id='" + nPreg + "' name='" + nombre_cuest + "' >\n\t");
                nombre_cuest = retorno_nombres[j].nombre;
                //console.log("j=" + j + " Separador=" + separacion + " Contador=" + cotador + " N=" + n + " O=" + o);

                //lo mostramos
               // console.log(nPreg + "-" + nombre_cuest + "posicion:" + (separacion * cotador + n));
                indice = 1;
                if (nombre_cuest == retorno_nombres[j].nombre) {
                    //imprimimos los datos
                  /*  console.log("\t" + indice + " pregunta:" + retorno_nombres[j].pregunta + "posicion:" + (separacion * cotador + p));
                    console.log("\t respuesta:" + retorno_nombres[j].respuesta + "posicion:" + (separacion * cotador + r));
                    console.log("\t Obs:" + retorno_nombres[j].observaciones + "posicion:" + (separacion * cotador + o));
                    */
                    //agregamos los datos a cuestionario
                    salida.push ("<pregunta id='" + indice + "' value='" + retorno_nombres[j].pregunta + "' >\n\t\t");
                    salida.push ("<respuesta>" + retorno_nombres[j].respuesta + "</respuesta>\n\t\t");
                    salida.push("<observaciones>" + retorno_nombres[j].observaciones + "</observaciones>\n\t\t");
                    salida.push ("</pregunta>\n\t");
                }//fin de reimprecion de datos del cuestionario
            }//fin de reasignacion de nombre
            cotador++;
            indice++;
        }//fin restriccion de tamaño

    salida.push ("</cuestionario>\n </checklist>");
   // console.info(salida);


    return new Blob(salida, {
        type: 'application/xml'
    });
}//fin
//funcion guardar a pdf
function to_pdf_() {

    var imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAHAAcAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCACWAJYDAREAAhEBAxEB/8QAHgAAAgICAwEBAAAAAAAAAAAAAAoICQYHBAULAwL/xAA5EAAABgIBBAECBQMCBAcBAAABAgMEBQYHCBEACRITIRQiChUWMUEjMlEXQiQzQ2ElJic5UneBtP/EAB4BAAICAgMBAQAAAAAAAAAAAAAIBwkFBgIDBAEK/8QASxEAAgICAQMDAgMGAwQECgsAAgMBBAUGEQAHEggTIRQxFSJBCRYjMlFhJEKBM1JxkTZidaEXGCU0N0RldIK0JkNjZHJ2k7GztcH/2gAMAwEAAhEDEQA/AH+Ojo6Ojo6Ojo6Ojo6Ojo6jBnDcXAGvwqsr3dUHFmTJ5FpdYSCwWswiUxiFcsGypG0P7AIIpKz76JQV+ATVOIgAwd3P9RfaXtJLK21bMl2bAfKNawYRls9MzEyIuqIMUY7zgZlZ5a1QUz/IZTMdSRpnabed68XYTDmvHFPE5jIl9DjI4mImVvYMst+MzHkNFNox/wAwxETPVVGVO7zfH6L8cT47rtKg0PIhrbf3/wCbuUUwATfUqpJLw1chVQD/AKT59NIBwIic/l4lQ/cf2g+5Zy9GE7W6JUo2Lh+zjyygW9o2O7M/ylSwWJhCQsT9oRH4yPxM8lzxDOa76VMHRrfiG47HZtqRHnaijKMNh63EckNnKXpYUriImZYU4+eP6cTPVP2cO88Vio9TyTvCmxU81E3MBjWXVSOl+xhbfT4zj2kecpAIUvDiROf+VVBE5zm9uG7S/tNu+a13aWqd1sNhsj+ZV/M2cV2fwkpPxIZ9u7Y1q4xMR4zExSsHI+RTJT5TPK3tXpB7dySW5nSsneqTAMq4qtku4mTFsRPMFNGtmqoN+fmJtKEZmI/LERxBmS7p+Lboup+nW20maFDiYwrV7HtmsBXHP9x/atLSCxgNz8mOhxwbkREOQ63JP7Kv1jZ4fqNz3ztbg5aAmf4/3Ozew2PcZx5A38Mwl9RFHMyRxZICmJESLnnrAs9Zfp/xZSrAYDbMj7cyEfh2ta3hQHw+ZHxyOfptCY+PyEgJjmOYiY464Rt/Itrwu41d3WYIpmL7HauE7EQjfn+05jegn+7gA8TgIiPwPXdH7Inv7H5k95ew5tH5AA2DcAOSj+h/uxPj/Xy4nj/XrjPre7YxHLtB7jKVPEGbFaX4BBfby52eInmfjj4mZn4/p1llW7v2Ham8QQWy9sHhaTKchU0LDA3WsCgoU3kVNQ0RMrLlApv3D6MeR55SAOevDa/Zq+vjTIK5puwaznArkUonSu8zsTbaCvI1ymrmw14fJkiIjXJ8F5kIlHEzMehHqu9Mex+VfOY7K02EPLVZnQamZBcHMjJNPBWc6yA+/wDGFMx8TPxx8WfYG7xWQ5g7VPHO1dBy2iYiSgV24PYWTlFi+XJSKEn0YG6KKKfcmJGckYT/AO0RMBDhHed2P9oZ6eI9/uPpHchWGTP57m3agG4a+yFz8me2YEL8guY55ZOfQJBMHzz4lGy0Nd9LndI5Rqmw6ieTMeYqYPPHruYX58wMRr+XmkUn5DMCI4ps+UcRzE8TbNiru615y4bROc8ZyVTcqCQqtjpaisrGEA5Q4XdVqWMhMM2pTAYROyk51cxDF9bYwlETSL27/aI6/kpRV7j6i7EyZ+B57UrH4rjhniOTfiLhhfrKAufP6a9lHcTECiZGfLStt9J+Wpe43VM4FyRHyHF55M0LkxzPELvJGazTKOPH3qtJfMTMtiJji1LGmYMY5ihf1BjK7QNxjC+AODRLwDPY86geREZaKcFQlYhwYv3FbSbJouJeDAn4iA9PtpXcTSO42N/FtI2bFbHSjx96aFiJs1COORXfoNhV/HuKPmE3q1dsx8wHHE9LDsWqbHqdz6HY8PexNmefbi0rhL4GeJOraXJ1bS4n4llZzQ5+PLnrZHW59a/0dHR0dHR0dHR0dHR0dHR0dHR0dHR1r/JuUqFh2oSN5yNY2NarkaXg7p2Yxl3jo5TmQjYpiiVR5Kyjr1n+mj2CC7pUCKKAmCSSqhNS3fetU7da9c2jcszVwmGpRwT7BSTbDygpVToVVwdm/ef4l7NSqprzgTPwha2GOd1zWs3tmVr4XX8e7I5CxPIqVEQClRMQdiy45FNasvyj3HvMFjMiPl5EIyvHuF3WbTYoWxDTrE3wDhaL9qErd5mUQiLXMNVSCmRN9NJKrBBHeAICzr9SM6n1ziKf5nIJKGap1db36pe9HqE2tHaz086xtCfxtrauNxmr02Xu4Gw1v9m21bs0yNOtYtcFDLL61msmgHkWQz8oKVA6mp9j9B7ZYVm590svhWfhwrbcu5uwFXVMQ+Z8loSt4izMXjn8iUsQ9touIqYr3BgyowxZkPb7fazylU7bets5lKKayajGy7R5jRPUcKV98Y4qPFkns2ZJlKyBCissaOMvY7QqoQFDUwBOBTNF2j/ZY69riam1+r3uOde/Zn62e0XbTIhcyzpZMnK9n32AsTDmGXNlOsUiSLIYudn8+SiK959ZVu6TsN2S1UXoV4Ijd9wpEmmAxA/mw+pEaPEBXMe2zPWoeMStv4AYSIzbjh78MyrkZZjbe5JublTYGbHwXc4mwy7cYwxFGqEOByME5Z0gvZpdiQPInvhojHqxy+AAin4fNgel3O1vZijGJ7A9ndI7a1xCFlnEYpNzbLvAwE2L2wWjs5uxYYIj703MxfWZeReEeXEKrslndO4Fr67uTvGf2xnkBhj7Fwhw1bwj4XXxQArEJWByRJOjisc0I9sSI/b5K6rA/aX7bWtaDYuJNM8ExUi2IkUlls1LZZFuB1UvUIOT2/Iv6psYOjqIlVOsnJJj7ROYoF8zAPDL9wN0zhsPJbLlW+4Uka1WjqJKSmZnlFT2FFHzMfmCfjrx1tewlWFwrGVSlIwCmWF/VuWMR4+IPty5wxMfE8H+b/NzPU/omGiIFkjGQcVGw0c2IVNvHxLFrHMkEyhwUiLVmkigkQofBSkTKUA/YOtSYxjSk2sNhl8kbCIymf6yRTMz/rPWYiIGIEYgRj7DEcRHPHPER8RzxH/KOuy64dfesIumM8b5IYni8iY+pF9jFCKJKR10qkDaWKiapPWqmdpOMHzcxFCfYoQyYlOT7TAIfHXqrXblIvOnbtVDiYmDrPagomPtPkownmP0nnrqchFgZB6VPCfiQcsGDMfPxInBR+s/p+s/16qo2G7Bfao2LLIPJjVirYqtL9U7gLrr+9kMMTrRyoZQ5nCMbTlmlMdn9qgqgSXqkmh5FIHp9fkQ2/YXu33AwU8Vtht2kyPgytkp+uU5fxHtsN3+JkJiPGRGwMTEzE8xM9YC5qOv3Q8DxyUxHlIRWj2FAR8+RxVH/BkfJTMEyufBcFH5hGYppzL2Du4Dq4g6n9Adr2uylEZexyTXPaVNhGWQyBTeJI6r5BIYKk8eA3ApUlXaGMSEN5CaTEwFE0X9yOznpQ9QYvLuz2dxuqbVagojuR2tENS2JbpGYGxdDF14pZQQIpMlZrE5+XTxBSPPlG/6f3M7z9svaXqG7281hEzH/wBFNxks9iTAQ8fBA3m+9SYyYGBLE3sEtEeRjBTwPUDsX70WvCWZkcX58qOTNCtpoIxCJ1++Gk6/X5wqyhQSXrtxXBJq6gZfhEUFJBWXqMsksmkSyvkVClPW73b/AGdXfjsUxvdb0zbpf7x6fjAfbm3p4Fie6uv0Uj71heW1Oi96NopqWH+OnW2W3MWPF3Wq4SQ9NxpXqf7ZdzVRpndfBU9EzdsgR9PnWfiGkZSwZMWgqWdtLVYwdpsjM1RzSlJgyj6PNvmIOWfNWu6SwnHMdRdlk2Ndl1yoIx2UY1AjauyRl+PplLRGtSi3hSuSmIdOwRHnX1SqAsu0h2KZnh+7sP67KWXdW1XvQFfD5L3Po07tWrzUxrbQMlRI2XGCA/glkGR7b7tYBoKb5RcpYpSWOnD9zvTPaxwvzHb/AN+9Vgffbrj2e9dWgg9wW4e4RT+JIIJ81IYRWWL8Zr2bxsAOrkmrps9bN3rJwg7Zu0EnTR21VTcNnTZwmVVBw3XSMdJZBZI5FElUzmTUTMU5DGKYBGx9D02Ups1nKsV7ClvQ9DAal6WhDFOS1ckDVNAhNbAIgMCghmYmJ6Udi2JYxLlmpqjJbVMEgYtgFImtgFEEBgUSJCUQQlExMRMdffrt64dHR0dHR0dHR0dHR0daH2H2HoGtlAd3m8OhVWVFRnWayzVSCatc0CfmnGxqanIJIJAJVpSUWKLSLaD7Vfa4VZs3cVd4O8Gpdl9SftG0PljGSdbCYSsYRks/koDyCnTAuYWpcSLL15gzXo159xnuOZXr2N20LQs53CzqsLhleID4tyORaJTTxdOS4KxYIf5jLiQrVhmG2Wx4D4gLWqTr7gfcZknc1HXLK60tdL3bXpYPBWulGB68lJd3KvCR8VF1+EZpP37Vg+kjNmT+xDHvrBaJApI6HbSLpJu1j62e1vaTv3+0W7nZHK2ciGq9tdUse3s26302C0nt5jmQNmcDrtEmKHY91u04F/0AvB5hCslsWQx2KXWiHK2nbe2XpV02rWCoWY2rMq8sPr1ZqV7FttwJlMZLL3PA/wAG1uvYmVzcJZBE+5Tw9S5dmwQyX0d7C+TtoJet7O93h65UjwK2m8W6I1WUXiqXSGCyibpl/rQ8iHRjPpVduIGkqJCSJ3BjqERvdtmVgf1Rjc5291vtL6ZtTd299O2vBjitLFG3dzcuKMhvG8Wlj4nZyWYJIEVb3PI6mNqrq4DHRPji8WJCOQcgW47Lu3drOBsncnKzZCscHgtWx8uqa7rieZKFY7H+citpc/4i7Yl2WvSMHeuzBlUW2hTqZUMd1eDo9Aq1dpFMrEejE1yp1KFjq7W4GMb8+iPh4SJbNI2NZJeRhTbM2yKJRMYwE5MIjhLFmxbe2zae6zZecsc97Da5pz9zYxkkZlP6yUzPXSta1AKlAClgMCC1iIAAx8QIgMQIjEfaIiIjrJeunrn1WntH3C61if8AOKzi1GHtVliRXaztumnJ06JVnaYimZqRRqom4tEugoByKsWDhqwbLlKgrILuirMCV7eoL1365oGTuaN2po1t83iu11K9kZJjdZwlxceLEAVUwZnr1Zn5Laq1mpj6Z8izIWbFe1QUxnbTsHkdoipk9nZaxWMtQDaeLqgM5vJpL80NkWiS8bVMeJBz1tewJkwrguVvKvzUHZu8bSbjUiqZVylcpytIxtqt8VW0pM9Mps7aas0bvoSKTq8AaNLJNWCZn1jI0ljOwdjXyGdpum5HBFIW9N/cXuV3o72YRXdnuBlLeOrhezNDTsdfZh8HeymNQ2/jatrH4csfSuBjWI/FBUaXG8scCrzLVZlpT5v7r9u8H227UZnI6vrWJp5ArGNxVrJHWHLZaljck1iLlicjfiwVdj59nHk2t7ftfXFCZUyVkLC1igoqzwMxXZxFRxDzca8i5NFF47j1jsnqB0HAIv2C7V8xWBM5hSeMnLd02UAq7ddJUhDltiyuNpZnGZDE5JZNx+Sp2KV1a7Fiow61lRKdC7VRqLVZntkXhYrPS9J8MS1bBE4Q+hds467Uv0zELVOwqzXM1KeEOScGvzQ8GJcHlEQanLYpg8gwCGZiVP6F3HtosF3afiYXJ6maMdwVusMPFROUjqWEZyrw05IxkK7Z3FLxszBy9iEGrkj8ryQZKqnI4Vi3KY+sadsF6pO5vbXasjjqu13d71Sjkn1a9fabP40d3HpdIJsJyrPHJoadaOUxXvLpgZiTKjgWKurNc32B7cbnh6Nm1ro6jnrmLo2rNrW4GhFPI26aLFtTcSXOOctNo2LJMpQ6BiQGysvzQwVqLvFiPbqFdJ1k69RyPBtU3VqxfYHTZSejWxzFSCZhXiAJtbRWFHBgbkm45NNRssZJvMx8Q6cNm61lvZzvxpnebGk3CtnG56qr3MnrV1oFdrDEiBWKjYFYZCjBmAzYWtTkyxP1tWpNivDUa7pdnNp7W3FzkYDKYC40lY3Y6KzilYZESf0ltRSTMdkYXHuTUeRCwII6j7S1sMJn9TZ1EnUVtuNKNYt58ZO8T7PYmrmS62Yjo8HIvUDMbhSZRykCQWChXKPM3sVQnERIif6yGftyPCokaSiD+PMszVzuv7LnNWvBkcFkbFCyBARe0c+06Fl5CFhM/wANwxPyPmMksvzqIGQJx4r2OpZJPsXa67C48vHzGJJckPiRLLjyCSGZA/GYhgTKzglkQymvt5optn2Z3Lu3Rrq3bfdtQjwhRtJ26LjNGsDF44Kk3TuCTRJNopV2x1k2adrZINqHKLg3SnYvHcs+YuZKK/UJ6Se0HrIrXdhwQ4Xs96kyWT1bNWrSjT+5Nla/y095x1UJJtx4hC1bRRV+8eO5ht6NjoqalMldpu+269j2VcJlIv712qH20xhmNE89qgeXjL9WtukRUuBmCLA2Wfgt0wJdT8HttSTLQO3v3K0qFCVMqlpHKOs1u++Hk2J1nkpRTqKgDxWIbLG+tY/lrhQwWigvipuWTgVHkUmg7UVJN1cdsO8vdf0h9wcj2P78YHNY/DYS6NXJ4LIf4vI6ou0ZHVz+p3VmdbOankgmbyRx7n47IVzK9iGKvRbq3G83jtvpffHWKvcbtrksdbv5OsVijlacwinnZREC/F52sUC7GZ+kXFZ8WwXbpuga18W1Sr2EM816wQlsg4mzVqVZTcBOsG0pDy8cuRyxkGDxIqzd02WTESnTUTMA/wAGKPJDlKcpihbbiMvjM/i6Gbwt+tk8TlKib2OyFNouq3KlgIYl6WhMwQGBRP6SM8iUQUTEIjfoXMXdtY7I1nU71J7K1urYCVuQ9RSDFsAvmCEomP6THExMxMT13HWR68nR0dHR0dHWBZPyVUsQUOyZGvEgEbWqvHnfPlSgQ7pyqY5EGUZHIHUSK6lJV6q3j41qKiYLvHKKZ1EiCZQmqbxumv8AbzVc1uW0XPosLg6hWrTIgSe45IVVqVNRGEPvX7LE06SPMIbZcsCMBkjHOa3r2U2vN4/X8Mj6jI5J8JSMzIrWMRJusPOIKV1qyQY+wzxKQSsygSKIGUse413BZl3JrZZuUc8td3uUuFG11wTBg+lnkxKPHqTOErsXFx6ZpKQZN376PGySDFqSQs9hkGsNGJIOpJm0jaru03bDud+0X7+5B+TvWdU7a6stN/dNlXw3G9udHOw2aOv4MrIDTu7tskJevH++Ag6yGQ2LIIVh8Z9KDx7btOm+lTtlUCtWTmtqzJNr6/iGT7dzbtiUkZu5bJQmZsVtZwkMWdwllyCjp4eq4r1w7I2udnLs6SOv8gnvPvOkyyPvpklkWVi4qVBrLV7VuuSrQxUaVS0SGXiy5ALGOPyy02eL/wCCr7QFKTR1U4RKbm7fdldu6hpuoYTs92ewlfUe1Wn1/oMZjaMSLsy4SgrWYy9shGzk7+UsjN7JZK9J3sveMr14o/wtWnXYbM/s2eyG87zkXZrbs06bFmzZmJGkBDIpp1EDMpp1qiZ+lp0qsDUx1SIqVR4951hi/rSesp0dHR1XzvpsSXFtKcUiImTQcrOwbuZttgQVMm6rdHTOo0VKxOQxVE5mzOiLRccdE31CTdF+ZD1O1WLhOuX1+eozL9vMDiOznb60xPcHuNVJmRu1GeFvBai1zaRzXbEwVW7sFhNyoq6EMOhjcflmxFa2/G3FT92K7exs2XjPX6kW6ONuKq4yiwIJWRzUwLRlwlyJVcaogsvE49tjGV4PyUD1ksWQmRtlMlV3H+Pa0+l5WfkjR1GorA5UkWyCRBUcTU46Pw0ZpsGJTyNin3xisYRkRQCCBSkIvWv2t7XZfO5fHajqtNmY2PMtFVm2MRHuFAEx0+6ZQFXG1VA1pkwwCEqbbtsFYMNdiFh+B0LAX87ncgmpUooh2Wy7okiYRTArqVFxy1zHOkUUqaYJ1pxDzE8zIWlZP0Nr+guoWZtxLLJJ5e2FwDjqXyvSYI8tZ6piSCulaSK8iCGRqkjX7tY2jJ4JTOnL6fjCyyBVmgxkc2dKphdB6afQvoeP3HS17zls1mM/by+P952AyT8LTxVkHfULPGWELVkbDkOBcTZssTWeKxKcWopKCr772erbabWvbGrTMVjMNgfonVjjM0K2ayWTqPMEO+uXYk6FcTUZGNWoHmtkB/5QORhkUt4x/ECbz51yjQcI5drOv9mxZnLJFBxNdq/A1bIdAmUKlkW4QtSnS165VvJpZyKkU46WcGaO1BeFFQoJOkV26iqZrd+4HpV7XZXRtqo2n7YNc9fyh2YrZ0ajbC69RjyQb6tNDwVZhXs2BrtRLEGxUz7ZkM1mdvfUrvCN21htelryrI5er7LXYv69anyfCmjUu2G1pJRyLAmwFoQMRZCyMRmLu9lOzXNxB0Z3VKf/ADyPVXTQeYzyJNN2buKbm8SFd1u7GbFI9Zth59sPYW31ibcgGazbpUAaGoE7s+hkjbGU7U5Im+8+Zt4DPWkgxInEzLqGTkEqeEH4xNe5CXAEsdN24yRTFyvb71ZVLUHS7mUYpvFZGnYcDUY1Vk45n2shiIZJKaf+W1RP2iOZhlNQ/wAXqOtE7bPcQxfdK1kXH1fptau1Pkk5avTLbJ8EPoclAU3DJ8h6PCQhZZqZSNnYlwB2kpGOHDRdMQOQxI20/wBKvqK0bYsZs2uhjqGUxVpdmu9OcxX3HyE1sArkrcpqjahyHCaLNdrq1hbaz3KPfM16guxGx4jI4DO3crkMRla5Vr1Rmu3Y8gmfJbkn5cot1mQL6dkJhlewANAokflnHHkpcpqj1aVyHV2tKvT2GZq2yrMZhrPx8LPAmBJFpHTLMxkJGO+oKdWPc/asdmqgDpJF0CyRLV9ftZi7hMZZ2DGLw+bbUXOUxqbSbqKt0eQeFe0hjVurmYy2uXuEcJMBbw0TGK7c7WxNTMZKtgsizL4ZVtw4zJOqspPt0vLmu2xUbEGix7cwL1/IQ0T9siXIFOZdZjrE9cGUi4ycjJGFmo5jLw0uxdxctEyjRvIRkpGSDdRo/jpFg7TWavWL1qsq2dtHKSrdy3VURWTOmcxR5AZqMGqMlsWQmtgFIGBhMEBgYzBCQlEEJDMSMxExMTHXwhExISGCEokSEoiRIZjiRKJ5iYmJ4mJ+Jj4npIbuZ9uW2do/IM7uNqVXJa09vjIdgaKbHa9xntdKa5zMq6K0a32ggoKgsMfqvHRG0cqqII0l+4Qq0wupR5WLVq3zvb2T0n1rdvVaPt9ijrnerU6Fsu0vdBqogxfMTYPVtnJQe9kNUyzRiMnT4Y7GuL94sOA3a96tkM12y7mbD2F2dmaxCbOZ0LOWUfvrp4NiPqBgoWGXw0uL2qmxUFkU0LMytWRWM4bIkSnoYFlHbI3yg6QpWKjL21Cxa95X+mlaRbDLmBlTpaYWFNN+ArGMMXCSL8Tx9xiHIpBW55NaUW+jMjPGkaivTn3d2/02dy896fe9dO5rtChsb8BkqGXZyWhbWTR4tJs8yhuq573kWyuIOcY2vbp7NScFWxkWXHY7v9v8H3Y1LG90O3tivl7NjErydO5QDiNowcAXKWJ/2q87i5W2tNVsRdS+vZwtlZOTUFDL/VunSHdHR0dHR0dLV913b+FsFqsFHNYixOGcAISk1fJdJTzbSltiW6iU469YH8XalaBVSowLMUyqr2R5LpJncIv2J0qj/VXvu1d/e8usenftbWdnDr7RT1jH4yowva2PuJkGfQvZZMZkV43V1ss1LFlgCOPFGxX2myrCDW9/YzVML200PL91N0cGNF2Ffmrd1y/JmI1KoMWFigJjyZezZwhteuBEVxjsPTWIvJgFFnsL6Oy+0uUHvd52crRSxP1cpU9DMWzKQuI6mU+GcPYWRzUdi4IZBeUdLDJQVBkVOVDvRuOQEkBUmqZJsLkNZ7d6p6Yu0evenXt89dx1EBzPdHb0rhNveN5yKEFl8jYMf4kU5laqeLpmR/h2u1MTi4P3IyUORDZdxzfd7eMr3K2RR1VvL8O1XAkfnX13XqTT/DsaqJ58m15k337E+39dnX5C+aBkabBb661/o6Ojo6Ojo6U/7lOWXdvzRa68i7Mq1Wsz1d74H5IaHqTg9Zq0eHiIlBuZxHyE4JC/Yo4VIocBU5Hr873ePYnb/wCorvRvFphvVjdtyGh69BzMqRjdV8MGb6gT8KC0ugDCgePJtqy6Y83HM2hdgtaVhtKwtiVQLYxiSGZj831eWCMjfdzMRPmK3pqRM/IgHjH5erFOzJguIg8V2/YWTZEVtmQ56TplceLJAKsVQqi8TbPEGKojyn+orahIOpPxAPejCQRTGEWviFmnoY7d0cTpGS7hWELZmNku2MXQszAkVfCY40/Ugk5GDUdzKg1VxcEYFGIpGMiUtHpefVrudq7s2L0Wu4hxmApV8rkFAUwNnN5RRMUTh+xfQ4s0BXmf5Cu3JiOGczIDvGuPpu13vAp4efngW1teOfHj60WjP2c8Dz6vf7PH/f4ePIc8hZv2eHy7naVHPHGcrn/+mDGcf6+PH9ueekQ7hT46XsE//cx/77CY/wD9686rUHgdvNTQEAEB2dwFyAgAgP8A6rVT9wHkB/8A0OrGtz/6Hbd/+V8//wD1VrpANC/6aav/ANvYn/5+v16Vma+4FrLr7kJ/i/JtpsUXcI2LiJl2yjqTaJtqRhOJLLxyhZGLjXLNQ6iaCgqJEVE6IgBVAKI8dUV736iO1vbfPN1rbMzcpZZCa72JTib9tcLspXYVMOQollypoTPjM8TMjM+QlEXH6h2O7ibzgk7HruNo2sVYsWqqmvy+OqMl1MxB4yiw9bRgSKPEpGIP7jMx1rNPux6RnIU5sjWNITB8pqY1v/mT544N4V85Of5+05g/79ahHrE7CTETO1Xxmf8ALOuZ2Zj/AFCiYz/8JTH9+tjn0xd4YmYjA48o/rGw4Tif+HleGf8AnEdbywLuxrtstapml4huElP2KBr/AOqJJk/qdorxU4X8xbRRnSLmdimDZyYj541SUboKnXICxFBT9fJgkHt7307a90snbw+l5t+SyFKg3JWEOxWToeFNNipVY2GXaqFl4vvVg8BKTn3JIRkQOR03duz++dvMbUy+04qvSoXb34dXcjJ469JW/YZZhZLp2XMXEpSwoMxgJkJHy8uImV/UvdRj0dHR10llrVeudcn6fboSKs1UtcLKVuzVydYtpSEn6/OMV4yZhZiMeJrNJGLlI505Yv2LpJVu7aLqoLpnTUMUe1LnVnKsV2sQ9DAclyjJbVNUUGtizGYIDAxggIZiRKImJiY64mANA1sAWLYBLYsxggMDGRMDGYmCEhmRIZiYmJmJjiekH86azTPaM3fW1RkHcm80r2nfy9606uc44cOEsfW36hmjY8My8w9OcBcQb+QioFVVRyspKQUrjy3Ox/NV7SRGA/2gPYGv6jOzx+oXTcYBd5+y+Giv3Ex2PRH1W9dsKQscy9CEj5WcvpSos5nGFEe8zXx2HDjDAxuJGJl9L3dJnbXdo7WbDdKNG32+LNYt23R7OublZ8EJAWOPyTj9lOK+JykQTEqzB4XKlNeLl0JbF7aGzbjL+MnGKrk+OtkXEzVqzRWeKcv7DRvMrOJkVvYYFl39eXAldl1RTEQR/IHbtwvISjkwQz6Je+J9x9GPR8/d+p23RKtZVey1sG/N6mfinGX5KZ832MUfhibzYEuUziLL3NtX3F1tXqL7bRqOyxseMrSnB7K9xNSC5BeNzg8suVfGI8VLuxBXay5mJhkXkrWCaoR1Zt07vS5dRn29zaXAGAb1fmq6aVkMyLXKUQ/gJlbdYPNlFrppqfYuEOmLuwuW5hD3sod0mA+RigMJ+obubHaXtNtO2IaC8yVYcNrQl4zJ7DlvKtQaIH+VsY4Pfy7klx7tbHPCJ5mImRO1WnTvO84XBsAix8OnIZiY5iBxVHh1oJIfzBNufboLZHPg62sp+InpGvJWLrVvntvrX22qjKSrVjl6wJZf2gtMesoMhWsHVBU83Kiu9OVQqMlKMEHasSo6OBXVusVDKr5CYOYV/ZX9o04HEdyPV7ttT6q3jJyXbXtH9fEsKzsORSv9+9nUTeTY5KbdLVlWQKWgq3tJifuKniWPWdvTLT9U7H4RsoTbijt+7ewPgCqKSb+6eGOIS1IrD6a5sjK7RhLHo1wDiIYMT6A1KplVxzTqpj6iwMdVqVRq5CVCo1qIQBtFV+s1uNbQ8FCxrcBEEWMZGM2zJqnyYSIokATGEBEXds2X3LD7dppvs2nNsWHMnyY57jJjWHP6kZkRFP8AWZ6V9SloUpCQFaUrBSljHArUsYBYDH6CADAjH6RER1k3XR12dHR0dHR0dJWbioPWWz2ZYqQERcwdwkocwcGAoEbPHS5BTE5SGOkp9WKyaniAKFUAxRMUQEfzn7dhrWA3Pf8AFXVku3W7j9wPqIP5I2TteTD3fKYiWQ5awaDJ/wBoBCcflmOrfe17U2O3mo2kf7O5h6dqJ+PmWV0jMTxMxBD7fgQ8z4yPE/PMdMTdpW0x1g0spUWzOUXlJteQKrMpeQCdF/8Aql/Y0BOT9yfUxFijHaYCAeSa5Tl+DB1cZ6OcvUyfYrX6tdizdg8pn8beEJ59qzYybs4sDj/Kf0WZqEUf1mZ+/PCDeqDG2KPd7MWWxPtZjGYPJ1C4+CRGMRjj8Z/XwtY+yqf6EExP26+HeX/9rjdz/wCj53/+6M6fDs3/AOk/S/8AtgP/AOB/Sj9xP+hWwf8AuYf/ADKOvO305QVdbh6kNm5BUXX2gwCmkmAgAnObKtV4KAmEChzx+4iAdWL7pMRpu3yU8RGrZ+Zn+kRirUzP+kdIBoUxG56tz+ufw4/6nkqoDH+pFEf69OvdxLSXaLN+1FmyJi3F42imv6XRIppM/qynxPufxDF8lIofQzE2xfk+mUWTL7DtypK+XKRzgBuPy3+qLsD3W7i90rew6lqzMriDxmLrruDlMFVE2opIU4fayGVp2IkGgYzynxmIghKYL4/RD2H7wdt9O7bY/BbLsn4blkZbM2G1PwvLW/FFp6jQfvVKbkz7gxM+MMkh44KInqojMGFMm4DtbejZarqNVtjqFaWJOGTm4SdVJDP3T5kyduF4J/INWxnLmNfFSbLrEcimgK3qBI6Zzorvvbnbe2eWRg9yxn4TlLFFORXUm7jrpfSPdYQphMxly8kCI6rf4RtFwj4GSxBqiNptV2/XN3xjMzq+QPJ4xdxtArRU7lIZtoUlzVrC6lDWQtdhMkwAlcEfh5eQlEWIdl76t1tzkJFqJwaQevb99NmL5esqljyBV2tdaq8AJfauWAnnaRTCA+psY5efL4cX0C4S0e67ZsUyQ0ka1aw4xzPiyy/J4G2RcR8T4AiB5n7F5RHzE8QT6uPaV2swJt8fdu72lNKJ48pGhg8ky+wPnnxCbtFRzET+ZoxPHHy0L1al1XD0dHR0dHR1V13g9CGHcN0gyViKKat0szU5P/VfXaxGEqDyEzFS2bx1BRyb/wA0ztI28sFpOhTqgqCihG2NST9R3kYxUS3nt3tZahs9LIsgGYyxM4/M1WhDq9nF25hdkXoKJF61jPummY4esWVjn2nsEsHsWKjL4x9cIL6lUfUUyBkqOLComQEGcxCyZHKwacHFdpLtCEtQqYWo7V268yRth7PsmLxtaqhMOMYZ+r6iaiMkd7FClDXBGTjv6Qkk5SGO3sSLVyAgjbWaxzEE7DgtLPfXR2ehP1ruPXU2E9ssxar7pqCVeTE2+1u6PcrMa4oh8V2nahkQyuHqBJMhbcPhLbOTMJmxHQs+v1J+ntc5NqnbdTQzAZx5cCa9ywCUvxebPyASQvZMc7HZOyUAEn+IZauE8AXDyjN21kGjV+xcIu2T5ug7Zum6hVW7lq5SKs3cIKkESKIrJHIokoURKchimKIgIdWz17CLddFuq5ditaSqxXek4Yp6HALEuUYzImtiyEwMZmCEomJ4npDmqYhrEOWSnJYamqMZE1sWUgazGeJEgKJEhn5iYmJ6oc7veVEn1zxpiAr76eGqsG/yJbTEP/SScSpnLFiq6KI+JVoOAiJl+T9hBtOiJhEDFAtVX7Qvc7mV2fQ+12Hg7T6VSc8+iiZObue2G1OG1+kS4/8AWlKrWPYiI8pDNR9/IYh3PSjrderidk3G/MIXasRi12jiI+mxWKTGQy1kSnj+CRNVLJmeILHT9vGZmFn4Z3D6mTJPdPuUWtiU0tnXKLnBeHlliKFViMRYvVaPZ0rAp+SkZTlkXr0I49Y8C4xsn9pQD7rim6RS7JdpuzXp/wAV7Yq7daVjZ2E1QIxf3HJgy9sd+xAxEHZfnreatS35I03VRJTADwiFvZbPcTet67l3RIWbTnbTMYDF+BVsIMJHE1Uz5EX06cKjCUpWfHhYxzpgA855a+61Dr39HR0dHR0dHR0dK/d3vAUjjzYBlmqOaKGpWbY9mg8dppf8NFZIq8cmxkYxc5RMCRrHXGsfOR3u8DPXcfZPUBham6qR9bfa52t70rfsdVKMLuYwy81YFKq2w1Eqr3VH4xK0/W11VsiqTOG3bL8oS1+FJx9WN+ljd0Z7R26hYaP4vp72mlRF/Es6/kXk5FgIniTihfY+m+AiYSp2P8pj3Y60928tzSal5LlGFzM8cYXyUaPb3crNBR67qM5HlO3hr8xZIlUcu2rZqspF2qPYkM8dQ4M5Fqi8dQLdg70v0s9+V9otlsYrYDcembISFZKViTjxVxJHFTLIREETBV7zlXq9eBdaqt9wRtWaNGozae+/aUu5+vVn4iFBt2vQ9mI90xUvK0n8HbwrnFIrU1jAGxjnun2l2vdQwkquMeq33vB3as2jtGbh3Wo2WFnarO4RO6i7JESLN/DSMbIWKAamWbSCKijVRNUiqjcwgp5pK+SRgIsQSlvi7CZLG57uDoOVw92rlMZfvjapXqL12atlP0lkxalySIDGJGeeJ5EhISiCEoipTutjMlidZ2jFZKjboZSqsKtiharsTbVY+rrhCTQYwyDKSGAjx/PBDIcwUTPn36RvWQbsaacu2oeza3XsifLhIPYY+Vat4FJ9/wBxjf7QLyJv4AerIt3if3J3L4n/AKKbD+n/ALJt9V8aJWsTuer/AOHd+TYsEZ/wmfkAMxRkyL8v5RGPkiniB/WY69O7ZHZ3FOrlDd3XJM2km6USWSq1OYLILWy6zBUzChE1+LE4LK+SgFB9KLFTiodAwu5N23RAPOlfub3S1PtTrtnP7PfWshUycbiVNX+J5iyMRAVqNci8pHzIBfaMYrVBODeweQE7ae3/AG62XuRm1YfX6ZEuCAsllXAY4zEVZKIO1esxHiPA8ymsElZtHHtV1GUzwmrsJniayjfcgZ5yi6QSlrVJHkVo9qsJmsaxaNys67ToIy/ic7KDiG7WOScqgAqAi7mHogq5cGNSDuWzbH3m7hZTP2hgsjnbxOgI8pqYugsQRXX9uRqY+kpFVPlEveCFAZOsmbDto0PSKmu4XA6TrayKrjUDXGw0Yhlh7Tlt/K3YDmIbctMbYJY/ESa6ifyguIYA7H2u9jx3r1a9h8gxq0ZedqJ2Lt8RGukTJOIXD9bYuI/GLQEl0iOGxJxCQmrgkkJvBWNsEQqchFyqAFtXpb7cq0XQQtyn23Z6K7EkYeLnY2rDpRcd+YhlmRtWblsGKKVOoljzHmIjhHvWTvuPz++YvQsDYGzhe2dGzibNhZwS7m15BwWNkd5AUrYVRiKmKIuOQsUbQRMh49XY9M10nvR0dHR0dHR0dHSH22mHiaXd5jZLEca1LFYm3cpbTanGTIBKjHs7+deYUyLGxjZEibVJZxborITorREhTt2NhhEfASAiYV4/aRaEvuZ6TtF7uoX7uzdhtwXrOZeIeb3aLux08WcOKOTitjM2rVrfuM5EW28iyJgmsnqaPSPtM6r3k2LQ3NEMV3IwTMnQWbGyIbHro3MrVkIOZVNi7jf3qqe2vxIa9fHBIyILnptftzZSUyfqxSSPnP1Mzj1Z7jeUMY/koCVdK3VrwCAiJwKSqSEE38zCPsVbrGAf3KXA+jjez3jsTrI2n+/ktQZZ0y+Ulyft4eEsxHMTMlwOAt4pXkXPmxTJifvEfe/+tDrfcvMElft088CdgrREcD5X5YN/iftzOURdZxH8osCOPtMrB95/OB2DjeDI5XqhVIdhL41gHCKnAILNwjcXpg1EPgnmilKPA8fgyx1VTfJzn6U3txhw76ftNdPxVxf4hhsV3aC9kE8SyuOD7P4x2RdBRESMV23NXV58xAMbaLyLlslM+7Bbnt36Qc3ZSwqd/JaSOPquHkWjk+4uRTjVlE/f3V1s82R5ifEURH2GOGSe0PglPW7tn6XYpFum3k2WC6hcLKUiXqOa3ZPbqZMtZnP2EOo5JYLdIIKqKB5CKIFDghSlC4ruJlzzm77NkTZLfcy1lIHM8+SqZfRqKP6QS0CXH9SmfvM9V+63WGpgsYoVwnzqjaNUTzCm3pK65UTzPMLa8wiYnjgY4+OI6sd60zrOdHR0dHR0dHR0daizrhGh7EYvs+J8isFHddsjYgEdtDJoTEBLtFAcxFkgHqiSv0E3CvSJu2Tj1qJH8VGbxF1HunbRfT990bA9xtWympbHXl2OyafEWrgItULYczWyFJjAYK7VVk+Q+QGly5bVtKfUsWEN2nTNwzWh7HjtnwLxVfx7JmVNgjq3qrY8LWPvKgh96nbTJKcHkJDyLUmt6lNBRTaPUXL2pdrWiMgRispS3jxVOnZWiWigVKztBOf6RJ+qQViVW0+ooA/rUqsmYXBVFoR1LRp0HRqVO8nYLde0GXarI02ZHX3uZ+FbFSSw6FxXlMrBkx5zTuQHy2hYObCpFhLO3UBd+xaR237p6t3PxgWsHYGrl0qEsrrVlo/ieObxHukiJgJyWN85/gZCsEx4SI211rEGqNV49zJlLFTaWjKFdZOFr1gIqlZaY8bxdlx/Z0FyGI4QsdAtbCbpsyk5IcxXAvYRRRYoiB1B561jt/3l7odr7Y3NC3TPa45Zw0Pw+60Ui6IgRfNVnuU2uEI9sGWK7pBUkoeFmQzmdv7f6R3AqFS3TVcPsiSSVeDv1f8AFrSX3Wu8gk3AX8RIr9+VjMQQhBRExk0dsVY6vII2GnY31WxrbGaxXTK+4/1XwLVbzGvSH9xZGJsaVNcLxEmm4ArpCRi0Wj1o6KRdmu3OUghP2U9e3qxzuNdiLXdnZ21bSpr2FgOO/wAQgw9tqWeGMEvbcEkDIEhmRKYiY+/UR430ienXG305Gl2sxX1ddwPRJOukC2rOGAUCpiTnwMRmBJkjxEQUFHUf8jZjlLHMyFxvdtsF/tjwoEeWK1TbyTdHKJ/6bY8rJKqC3agoIAlGRqaLUhuCt26YiXpdMge4b5lDym0ZjI5C5YLltvJWX5G+YDLGCCxaxrZWkWN9gGMhdcJlaxFceMMngNRrY6ojFYbGUcHjEzyqhjaiq6xnjgmRWriMG2Rj8z7EkwuOWGUfexbQDtZX7aW1V3Nu01elalr1CuGk1XMeTjNxDz+ZFElU3ke0cQjkqb6u4sWEqTiaeSSbecvLfwi49BvBvHUsL5enT02Of9Lsey492MwAGuwipaEgyWwsXxK2O8hE1Y4p5mHj4iaPGMbBFYjIUYE74+pXCdtsbf07tpfr5Pera21Mhn6Tl2qOqCQkp7F21ySb+yBEkuoquR08MzysPI7iV1em2m7duzboNGiCLVq1RSbtmzdIiDdu3QIVJFBBFIpU0UUUylTSSTKUiZClIQoFAA6sbAAUALWArWsRBawGAAACIEQARiBERGIERGIiIiIiIiOqvGMNpm1pmxjDJjGMKTNhnMkZmZTJEZFMkRFMyUzMzMzPX265dcOjo6Ojo6Ojo6OlSvxOVGNSXfbm3PimiaD/AA9so6xJapQiZvYtUcsxCM42ZvFS/H0qD7H0ig2A4gUqs45LwYV+A21erK7ndnPUJ2isRBhvHabaBogUQUhl8ZjrFvFMSP396MuGLaPHzJVw4kfHyjxU86zTd/7ZbskyAtf3PDsdx/KdQ7tdmQhvHz4fgycsgS+w/VlE8+fiU6ez9bjNLDnTGpl/a1VbV23xRfLkC/lr2RgpVwQA+DA7SkYDkwAHAN0/38gAKgf2b+ztKz3G1NxT42sfgNmrJnmPZdWZaxmTmB5+7PrcWBfHI+wMTM8/Dy+rrCAsNVzS45mvcy2Fa34/irZCrdL5j9B+nuGPzxMNmY446V37sEq4uGKJiCFQyi+ZdnaRAKgHInc/qG0zjpUo/wDy83DpAwlHnyEeeOQDrbv2W9eNh9bG6bjYAXfgfbnuzsUuZM+S7Ofy2KxItH/eJq8rZUcz/KDDn7zHWP8AWG8sT6dsHgkGSCyGzajjQ8ePyjhcDmsoH5Z459puPQyB5iPIBmfiOvQ+gIVjW4KFrsYn6Y2BiY6Fj0uefUxi2aLFonz/AD4IIJl5/njqydrSc1rjnk2sNpz/AFJhSRT/AM5npNREQEQGOBAYEY+PgRjiI+Pj7R+nx123XX1y6Ojo6Ojo6Ojo6Ojo66mdgYO0REhX7LDRVhgZVuZpKQs5HtJWJkWphAxm76OfIrtHaBjFKYUl0VCCYpTePIAIeS/j6GVp2Mdk6VTI4+2uVWqN+sm3TsqmYmV2K1gGJcuZiJkGAQ8xE8cxHXqpXbmOtIvY+3Zo3axwytcpvbWtV2RExDE2EkDVHETMeQGJcTMc/PVaeS+0TqBfHTiQr0RcsTPFx8xRx1ZjN4IqhlCmVOnXLIzsUS0KcvmUEY1CPQTEwGImHgUoLFtno67MbM91upj8rq1p5e4wtfvhFeT5Hniplq2UShfjEjCKX0iRgpkFjPz0wmu+qXurg1Ai7bxOzJCPGCz2Og7njETAwV/HtoWmzE8TJ2TeZccEU889R6b9izCB3xlZbOOYn0cJhErFm0o0a4AomAQKaQGuPRN9vJTGK1IYRHyKJeOOtKqehnQENiW7XtLExP8AIkMYh0xEx8S1ta0r7fE8Vo5+8RH263s/WfuYpgaunaol8RxLmszD1/b9ERfTx88THLJj9J8vvEzcF9srTfAEqxs1ZxYjbbnGKivH3PJ8i5vs7HLfb4LxaMvzAQ7lIxfNF3DwjB2koInIuBuBCd9L7A9rtGaq3i9eC9kUkJryOaZ+IvBgc+DVVyBeOQ8PIpGzXoqsRM/7X4HiJN09RHdjeazsfktlPGYmwPg/Ea6heEpPCefILJ1f8bbWUT4mq3ceoh+JDiZ5n11M3UI9HR0dHR0dHR0dHR0dHR0dUBfia6YW0dozNE2CYHcY1yNgnIDRX582yrXKtbrCq6Yh8lMLK0u0DG/hJdQfj9wmDsS4Q7l4OuziVZBd6k4CjkWqOqxxqKPtInCOJifiY+J+J60zfxidYvHwUkB1wDw55E7jhx/n8fMe3FyTiYmOCGJ5+OJh5248qr1G6tbm3dGRGy4EhjrHBTwBVaWNjyWVMP3ABhFZJUwDyI8GN/kevz0djMu3tV6ge7NBDYSGJsdwtXGFz7KvaxvcGkhIiEFECILoRAD/AJR5iOrT+6WPXu3bHSLLR9wrydSzRTMec+5d1J7mzzxMz5MtTMz+s8c/PVKPcOIs2r2uqy6/qSjtzsMKSShxP4eJLIQBWVOIcgVAyaqwmPwYOBEAE3PDPfsiuF+ofvBXbHnYPsbsYBMzyXmrcNY9+Y8uCmTiYiZ45n/Nx1EvrhiWdptJaovBQ76BHHzxIt0jaYTE+PI/E88fpMz+Xnr0burGek9661SYiEVzNlpWNSclOVIzdR82IuVQ/j4JmSMqCgHP5l8SCXyN5F4AeQ57YS4h8hU2RmJmChZyMxHPM8xHHEcTzP8AaeuPmETxJDE/bjyjn/lzz1zjKpEHg6qZB454McpR4/zwIgPHXXETPzETMf2jr7zH9Y/59fTr5196Ojo6Ojo6Ojo6Ojo6+Kzlu38PqF0UPacE0/cqRL2KG/tTJ5mL5nN/BS8mH+A65CJFz4iRcRzPjEzxEfeZ4+0f36+TMR95iOfiOZ46+wDz8h8gPyAh/PXHr70dHR0dHR0dHR0dHR0dHR0dHR1Sl+ImWTR7N+53sUKn7oPFDdPkRD2LLZ5xcRNIOAH7lDD4gA8B/kQDqUuygyXdHUIiOeL1kp/tEY67Mz/p1q+6MBWsZOTOAgpxwDM8/JllaECMcfqX2/8A36pr0jZSKsHQGzdwom7SwNSfeqVEwnUAkLSSn8kkymEnkcxBEOOAEOP3Hr86dhbrfqR76fQEVfnfe6jB9uDbwr/wiPiB5AZmY5IZ8pjieI+eZjq1mJGt2j7aDc4sEOq6KBkfCfJv7nomT8eeBmYifyR9uf7dQJ7w1UeVfD2bjIIqFksObAxFgRSAhgUR/TF3m4cVS88CQCLOmoAb9h8yG54AB6a79m9aDS/2geb1C5PsDmsD3t0mFmftQdrGkWZrp9suPeJg6632QiJKJ4aPMDPUOeqmvOyel7H5qvMSypku3uZW2A92FBl6zsEbp45iBBmdTDJn8vjJQXT/ANjC6Msk40x5kSOOmpH36jVK6MFETCdE7K0wEfONTpHEAEyZkHxDEMIAJiiAiAc9WbXqxUrtymfMHUtWKxxP3gkNNRc/35CekrruGzXRYCeQelTgmPiJFoCYzEf3go687LuLp+XfGy2Hm4+dysAfYRw5ABH1YX+CpkUAPkf2IUvAj8cfPVi3bqeOxmM+3H7o5v8ASP8A2p/b/n0ke5NOO9cBEj4zlkR/IEz+Y2f5pHy55n4mJ5j4gZjiOmV+6b2PMk9wnZtpsHT9ma/idk2xbUcdfpCXo1lnzqOK3M2qUcTAykPdoJACu07Ekim1/KxUTM0MZR0cqhSprV2s744/t5rJ6/a1p+WMspbyH1aryK8QNlNVQp9plRxchNeZk/d4nyjgY4nmeu4XaU95zCcqObHHQqmmr7M0QsFPtG4vOGmf5Yn3f5fDj4n7TMzKnPcQ0+P2+8rxWDXO3KedcnIQgWDIkJTo+61NhiqNkGzN3U2VjlZO6zrZ1YbPHrOZhOAblauoWvoRsxJCVrYYf3tl242+O4WJfnP3PjA4z3vYx77bqto8owCMLZ10hUTI16zIFU2Jkhc+WqX+au7hae4+unotypjK22OzGSbz9VTXVESqwQpKsBGBlMucDPP2Pb8xAq5RzFgfFtT8NxrxmbDum11yVl1rKRTLZHIUdk7GEPYn0s6so45aVCIr8NZpRrKKqHiWdyUZrztcZcEXc1taLmnBSllm6aak+pHYcJmNyp43DEtpa5Qbjcm1ALGv+IlaY51ZRLj+IdSJFVkuZELHuoj8yTmWa7JYbM4vUosZov4uTYFqsEzycVZgyW0uIEZhvucLOIKGqWDgaxDUzFEP4gvaK3557h7rCuMp62uq7rRTGWNmsNRpexJnmMlTrMuQcnvfy2DcIqvXsHFnrldeiCKv0AVGYOJiJEcqdTz6e9Vo4Lt4OcyqagWNkusyEuvAiIVj0n9BjVSx0eIC4xdaVyUe5F1UfeRiYX747Tlcjt4a/hTssHF1hE01UxYk3CBPs2FSAMZAiTCqWw4iAZjgkv69Wy/hfdpXl9wdnXV212R5N2DD92ZZPo6k1LvpeVdY6yqksSWaNnL9w6WVjq9fYKXdm/qiDf8AWbFEn9IyRSRL6odVXjs7g9mp1wTWy9I8bdhKxWschjJglMOBgYg7NJ4LDiPkaBT8TzzJXp/2ixmMFkcRfcbLmLsi1fuiC5hDghJ11rER/wDNjQqxYMo8pfkp5mefjcHft7ruQNLIKl6164Sreu58y9Wn1ws2R1GzSQd4mxYV+6gGj2tMX6LiNG93aaZyzGClJJB01rEVX5yXLHryriCcs8P2E7T0N3sXNj2NRvwGIshUr4+CJYZXKe2Fg12TAhZ9FTSxJuUuQKy2wlcshS3rbk+8Xc12lVEYrESE5zIJh0GUeRVKrDcpTRXP3JzK9gfcjyJcJ9sRWyym1WpY1H7GG6/cOx3DbR552Ul8ZweUWv6po8jlNxfMxZYu8HJADqNvD+Ok7dAtqvAWRNQJGvFcTTiTkolVtLliY5g9jxczVtnfTSe3WTfq+v6yvIsxhzUvrxcUcPi6b1/kZSWxdV8vsVpj27IjXBS2wSpcbQaIxZge0O373jq+wbLsn0rLwBZpfVVyydg0M/MLGCbEkanL9s69ibpk0IgvbYj2HtmzqZ28e6d21t7dYYJjmW8Zf06yJkhaAybLY6sNsmseMIg1Us7hq3ylii3rThsfGWfNWJIm6V5R5EEklWcUvZ415JN495o229w+1ncrRdleeFpYfccdj/qMcvIIqJvsb9SgSnGZStCpvwIkUtpu9tpD5tioalEwd71fS990faMWqc0/L6vaZ9O4VE4l1+IGBOzTEVrUZx7kC41PWlQCP13vEtXV8ndw2lV1C7f+wWU4eTCMvkxVxxdixZNdVu9LkbJ6n6RgJCNVREqhXtYQkJC5lMBigRCtrqDyBBKaCO0mrRt+/wCv4pqvdoqtRk8pEjBL/D8bxactsTzHt2zBVGf+taGOY55iUe4mwRrWn5rJC0lWJqnUpmohF4WbQyr36/n+UnUky6+ITz5DVKIgp4GfP/083VzfrJs5rjnCx5bzXP0ejZGgHdribRkvIM7B2fGrt2en5HQOynZt9FS4tKzJzapFjNnZWU7Htzj4PG3BbANx0XX9k1fYsJUxGGr3reOeuo6tQopsVsiC4tY4pNShaqJsggjjyCTQRRE+J/KYaj3F2jGbNh8nlcjeZj7FuGtW0TJDapOkbQVVCMQRNXD6iIGCEDaJQBeERPpp5bkSLYVybLw8gJiK4uucjFykY7EoiQ9TknLKQj3zRQDAIgKTho7bKgIf01kVAHxN1WXiVyOaxinL4mMpTW1TQ+0xbWJrYBx/xEwKP6wUfeOn6ul/gLZgX/qjyAwL/wCxORISGf8AhIkM/wBJievNy7eeL91u4Tl5PAeM9xco0azs8Xy2RlZzIGa83OYReMrz+sxDuOISvzz+QNJOV7K2cInUSK29DV37VQVFEilkncLJaR28wQ5/Jabi79dmRr46E0cNh4fDLKbLoZMvUoPbGK5DPBeXkY8DxzMI1pkbtvmzZPEVdtu0Pp13rkSy3YAPFFtSYUuFJfEfD4mIkIGBCeCieBKQOfMk92Hs07KwFNtu1txts8pWorJlfZvsoXPLmE8rUwZSWhVmE9VMjHB/GgMhDS0HLIlZQdliCqtpeAmygtHv+tewOL7T95tZsXaeqVKahsuxrzDGUsRmsbcFKHQabeP8gPhb0vVPuWKrJ5W9JcNTGSzGY7k9qNlq0r+xtySra6tnxO5byVIqzbFhISVez9OJHMosAUShDphbAU1PKLfXoB4Dym3zlgzDeaWsYpCN8t4toOSkoZVUV1Igt3q0VZPys64ppC4NHjJC0+oBJMq/p9xSFKcA6r+z+KLB53M4Umw8sRlchjJfEeMOmjbdV92B5nxhntefjzPj5cTPMdOdiL8ZXE4vKiuUjk8bRyIqkoKVDeqqtCuSiIgpCGwMzERzMc8R1Rf+KIuQwPazl6S3W8ZLM2weB8bRzUqoEVenTtK19cokS581iA1o6plAKAlTH1qH4AAAZM7Ge3X3teYfPjV17D5bOXGTxArq068RYMingRiEtOZmZiOInmYjmY1zfPJmCmksIY/I201Kq55/Pchb7dUYn7RMvqr45/4R+aY61r2v8TktuV5yuLpFIxqGEWcUsY4CUqb2Ok6HDoJiAAPBlCMHxgAeP+Wb/A9fn89IuEnul3t7k5uxJMr5PE7XsbHv/mJ+wbvi8hX9yRiR9xqn2Cnj4mQKR+OrQu/2S/czt9qeOVHi2jewWGFYT9l4jWrlJvH2+BYlUT/WS546jt3jcEKS+RNqsdptCGRy5j55cK2Cqfw4k5GCQnCKEKPwc6t3r8kzIJR5UMIh8GMYobntGd/8Xn9oVo/ch0TXwyu5GmbfaOf4Yt17bAVgNuYc/wAvtDN3YZZM8iQonz+fKIwWuUT7oelvYtURIsyhajsODqxP5vDM68ZZnXgGI+fMjp4gRiOC5bwPPxzbf2C9hCbFdqbVWYdyJ5C04sqj3X+6lVN5OGU7heScUyNQcCJjHFR3TGVUmCCpwcUJNERAQEDGu27t4WcF3A2KsPjKLVyclXaEcLcu9/Ga1f6Subf1IiUfE+HMfHVc+n3Qu69jjXECKFRVFcH5ytCfimJl/vlQmq0on8w+5EF+aJ6UZ3zXScd93IyiJhMUu8GvaAiJRKIKtXWGGy5eB+eCrIqFA37GAAMX4EOnV0EZHsRQiY4n9zM4X+hLyhDP+ozE9J/uX/pvX/21T/7nF05B3au5RVe3Pru4n4w0XPbDZOSlKzgGhPjAsg7n0EEQlb9Z2qahHBaHjxB61lZsSCQ81KLwdSartHNgK/Ypv2l7a2+42xBXOGo1/GEqzn74flka8kUqoVjmJH67ISs1Jn59hQutELIRCmNN3G3qno2AfdM1lk7K2KxVYog5N8QIy818jLFV5YBSuJH3mkpJMQo2WUKgdmztu2/uV7GWnaDZ485csBUnID625QsVpMou92Szk8dp2FxSHDtUAI9rMc7dNZ3KSjcotRj1IXHbBJBvLSKsG1/ebuRS7aa5V1TVoRTz1ygFTHIqxAhr2GAZrxdgI+QsmIFXxoz8+6LbpzP04hYXHtTo17fc/Y3TaRN+PB5OEH8n9dYMpYKI848SUUMJz2FEmS2yz2/dyCrdd67PeYKjrZgbK2brWDdnT8N43tF5ftEzJMk1mVTg3Ug1hWIAX1JOZNZs3h4tBNMfN27bN0kzGMQgopgcRb2TPYrCVZIreZyVWiDC5PxO28Vm9nzzIKEic4pn4ADIpiImem9y2RRhsVfyjxmUY6m+0Sw4g2RXURihUcfLXSIqSERMkwwAYmZiOvO37YW0eAcdb+Tm4+9lnsJUl4nM94BGHpc5kBza8xZuM/gZ1KSYwyTpdlExtVut9Ok+dEOmKxoxqiJVSlOSxPuhquwZHt/W03RaqORbhqU+9cTSipicL7dlEqa2REmzapUVwIePK5aU/HMSjvbnasBV3vJ7Rtl7xIhyDlMWg5C3auedV8mqZkPbuLuWrrQM5kbCgKPKS5jKO0JsNTtS+6vj1alWZ7J4FyjfbprY2npNotW15nGWSrGDPDk/YIuQEVYdyztMVjd7KMX5hVjvZKJHWKIGV68veDXLu2dp70Xqy1Z7FY+nsh10nFgEZLG1vcyyEMCIh0TUZkkJII/ikSygZiYGPR2s2HH4Luia6FljsRlrljErsuAofaTafCq7SiZmFfU3Ip5K0RSQqTWICP8AJJxtD8SpEz7PuWW9zLIOTx0/rriJ9VQMQwFdQjYt1iHqTIR+FfGxspwigp8AVdbwHgweQ4r01MQztogUyPuIz2WVa+Y5h5TWcPnH9fpm15jmP5eP06ynf2Gq7gY02sgAmvSekjn8qkTKVCwv0Fc2atuYifuSnTEfzcsv7oZV38DSnSK5dpGERuCttg6M5sYQtdxjaGTbEjnD5XdaOmlkV6zjGKKM0WIZmNFiMgkqQWi5EkCrl6WXTcVoX77brS7tPKmNWzeFEtsZOuZZQcsQ2fzY8SaySV7hxLf4ZDPmPMzBQw+w3trnVcDZ7epCwx1CowA8KYjFYk0/YDxuLMF+KSdyuACQIIEjGRhZ0v6N93zui5A7jOCtVNjMnV5CLf5wnMWZjoJ8PYxhJplI1qJtiU/W15qBivqY9/Fz8GDdw5iX5gFRqciThVuobzmne+z/AGwxvbnNbZrmOsGwcKjKYi9+LZNyjVaOsdezCXukTBqHQYg1f8pxyMFxxEmj90t5ye919V2Bi1+3ctUryIrUQIH03Eh65JNRZ/lYtgRIMHgogvzDHiWR/ilNnzz2TMA6hVx99Syx3X5DPWRI9u64TWttsJJU/GkU/THhNJ5F1xndZYoKCIkbWuNcfaBiCPT6WNX9jHZ/cHr4O+8MFjzkeJ+kq+3byJhPH5lvsnUVzE/DKLI4mY+OHqP2ISZhdXBvtqj/AMo3SkIYAsYUqSYyM+a30kCyTXETLa+UGI4jmCqm3rtej1o0u7d2PNc8rGveZ9fsfWmgZ1h1qJdqunIDlEU8m2yXRlbFAxcVJkgMsLWWJbFZPn67yPswOkABm0McZV0OlvNXde4eQ2TE/Q4XYb9a9g3/AIhRtSA4yJxdVUpq2GuWVnFBTaUsWsVnWkS/OcR1He+5PTH6bpdXXctDcthESFqqujkVeNi2yMkwgtXKqFyijcfkAWK2ERzYTPEiESLb3bE2ZU2c7MScvLSSkjeMQ4PytgC/LKiH1IzmKqRIxEE+XOBhUVXm6AtTbAs5U8VFnMosYwnMAqnUjudrP7sd6PZWuF0svncTn6EREQMpyt9bbAiMfAgnIjdrgMfEAoeIiOIhl9Iz4bD2qmzBxL6OEyGLsQLCYSjp0CmqDGzwZ2JxzaLXlP5veYcTJTHlKUfbPyfuvh7Lb296E0VfIOaI3B06SxxDehtcjqx+KgkKc8tE4WvOpGMUA7WZZ1hom8jnCsqoo/LFs2Tw0mZEzr9y8XpWYwdejvl4cfhm5ur9O475Y6GZT2bYVUy8RKOCSdk5E4hfC/cMhhUFCo6Jkdsxm252zqNI714a+VmwpdaLJxUG8kmEA/S3CEvcFARIqHmTFfuD7nie+sJkyD3sd/KJX9wdoYWmzOQYVvCM7E5hEYckrU6oseRDCOEa+wbpVmr2+wMpCyS0OrYFiJqyAWGZc/qi2nYwMvgM5+Hdku311+n6w66im8nMQLyb7dm0Htlmsw9plbsVUmuup8V4khVCFD9LVArFfMYEsh3d31A7Xmwx7qqhisolL85is8TVTqiqvFOS5a1iZdAVmuLyKLLbUou+kZTalX6BUKrRKlHJxFVpVbg6lWYlEyh0Yuv1uMaw0NHJHVMdU6bKOZNmxDKnOoYqQCcxjCIjW5ct2Mhct37bJdbu2X27TiiIJtiy0nOZMREREmwyKYiIjmfiIjp6qtZFOtXp1limtVQqtXUP8qkIWKlLHnmfEFiIxzP2jpTX8Rnfm+Wdv+2npcwXVVQhLJcNqMmtkTgqk2r8GBa3TlXqBQEUyqoQuSwKZUQ8g9YEAoG5Pw7ibjHab0qepXukTorXR0O5oustmfEm7FucBrNSuqfuTYdn6loRj/LUaRfATxktHwH7796u1OnR+euWx0s9l1iEkSsVg3FnrFgp4kQTNPAZKmwi45K0sBnyOOrUez9Sli1zNGU3iI+VhsUJUY9YxRKXmEaOp6b9QiH3kXWscQBzAIlA7Tx58gOAVm/s5dRmnrvcHcWKKAvZHD6tj2FHHC8LUbkchAT/AJhYWXxsFMcxBV/GJ5gohtfVtnvqsvq+Cg4k0VcjnLYDMfJ5KwFatJR+hDFG5MRPz4t5+0x1+u7tipdzAYxznEtfY4qkktSbKqVP2CEZKqmmKw5cCAfYyYy7aXZHE4mKdzYGqQAUTj58/wBol27nI4DUO49VBH+Eus6lnmLiZOMdlfO7hnmURytNS+vI1vOZn/EZauMcTPz89J+2/RZXO6o1kDNwEZ/FCc8DNyhIovLEZ/nY6uVR3jEf7Ki2Z5iPin3sCZlb6w77bddviwPBY0nYVJLa7W1J0sJGq00zjytsjViLRKApGfu6kEW9MiTxFJHF0+ocTGD5sj7P9yI9QfpR7Nd3CfFvaNYxcdre5PEwT1bJqAoxQ3LIxMysMpUHF5tZnPLp2MZiORPhVO5GoR2w707zpgL9jC5e5+92p8+yAMw+fl2SrJV4zDHMqRN/DF+ThIa0YkXJDE4htR2du4TkruqXPaGlYiqMvhac2wxdk+OsamXKJGyY0isyuPXUzLOa3JSDWXQXbIV+UMSMIiu/cGQIRBFQV0hM6+qd4u3+M7VVNWu5a0nMp1fI41lf8KyDF/WWE3BUobCkGmRknBHuScBETyRDxPCl7F2t2nI9yg2itUg8dGSVak/qMeMQtTmEM8HfCxMEEgR/4XzCZIRBvjEn2/eH7Tncm3F38yjmjEmNozIGHFali+qYukJ/M9AgfyeHg6PEHtULE1qxzbORgI82Q3VrlV0Ppk05OSfuZYDrEcoinw7Od2e22m6Fi8NlsiePzMWcnaygJw+Rf7z35Cx9K5titWap7Pw4KSoKC5BawTMRK5683dbtlvW4bXdyFFBWsWH0ysbBXMaIqrrx1IWCK7N6q1cRkCyJwsgKBJzXAcRZMetWYu1F/EwYBo1UxPh55J0bHFHiDRNTqNXyhqqvXoaPcPnck4SSLLIru3L5zJPHr99ISCruRdu3a7hw9XOsYw5TK7f6Z8/etZbMgu9kbzYbatPxm1RYcwVgoZIlriBAVACwWECsBAREBiIjrz43Wu/uIo1sbjWwmnUX7SFxb15fgMmTCjwjJwMzJmREfj5FMzMlM8z1uXIutX4gTOWkud9ec/ViVy1acw5bwySOJNZS1ziW9XxDj9rY7jdEkXlVfwDR2a7X1DHkW4j37l26LHwkgom3SaOFTq4TG7N6f8Hu+B2HAWVYqnh8VmZZ7WL2NxWsrfmpUpyYWkOMRp0JyZwSwGPcsK5OSGIHPXde7w5fTsxhcwuL1/JWMaKhK/hlwirVO++wwGqyAhDTsziWB5PmJGoxfsx5GZzA7XPYjwpVNZVFu4drFQ7lsPY8iW6XVY2Cwfqc9KorYzGCqNaaSdNsZ66sR4jEvbe4UZrOXAOLQZo9XBRkRs10/ul32zd3Z4/8H2zXqevVsdUQJ10fTDdulLH2rJqu1osiQe8unEGIjxV81jwyTPYe3HaLF4XXfY2fEV7OXfca93utgzQuFJSCIOnbbWMJYp1hZAwj9uwC2zErha4B91fsQZtQ2Mp9v7Z2vEa0xNJY5h3cpBVi+VCptse5eqdikVEpeNbXu2xskcJ2MVrMug4YKukEZeDkDqC2VWT9u/8Aanvzhf3bu0e5ewtPKryDxS+1Qt3Pr8Varq4U2aFNq/4LosrIWwMypqojyiJ403uL2dyj9jx2W0fEqCqCK8W1V71eo6Hgbgfwy7drysCqxXFMpkj911kyKJgI6tg7gva9vHdM1L13yNaGDHAW+eNsaRAvWdtOwf1t9MTUTGr5GxLeJSnLziRa+pbmKs1TrXAKTI112J3CUY7YzswzGKO3vdGl2r27YMfUYee0PI5N3gdYTCyCFNYOPytNVuEF9RFMxTcqu9j6iBGJaJ10lMibx2+Z3F1fGFkFrxm0VaKynyKPYi7Ko+orMamGQVeLUNmq6VugEOdApArJkujbAVP/ABFfbiYPcM4awnkaw46Qfu3EXURgaBnzFcU7fOXDp2+okq1sreZqrCTeOHEm7im8hBRar5yq+fwLd+s5Mecdgu+nXuQa81l8xj6uTlYw61L72CybBAREFXFGkFW2KARWDiXYMViK1v8AbEYiKMHR73aIssRUqtyGNBh/Sj7YXwgZL/bAaa2T+lE5mTlMMSRmZtsLY8iZG1+3D2rO5LM9xLGu8Wy2HoXFVfbZpvGbsmOrZaqrEWKYsdwjba8fp1THVOfWd3HJrWWzpHaR0svCRzCOSWQI4W+mTSWxfcnut22X26yGja1l3ZWxOFo4XHRVrW2oTXplVUubV+2uutkxWr/nYqXsM+JkYk58fZoHbXeB3udz2KtXoQzI3cg8JZW/jneYdtspTXP3VT77iiAZVrjBeURAAMDPRv8Atdb17y91+SzdthrLdKPrXk7PstYrvJWa5Uk6bLA2P450yoFCWNUrq8srVxZ6tVapU1TwzZFyyeT0g9K4jjEO6R71d0tG0XtMvB6ns1K7suNwK61JVepcmTzl9gzfvh9XSCuQVrlqzfEbEkBrTCpFnMAXXa7a7Pt/cyc5s2GenX35AHmRWULmKdaPdr1rIItk+CmnXTiGtqzDJb7L1+0ES1Vx+2nYI0QmNac4tNZtcI2lbBFx1ZJLDs+wvmSH7hLIEOyUl65FFa2i8yFfMhY5BklW3R5Rqo2QaSqzgTInSIulDepd/d9RsuDPZdkZcwH4jWVl0sx2LAfoHHCbLpKrQVY8qy2TZCFHBEaRH5iZGZQ2Xs9pdrA5ZOJ10FZSaTToEGSyvkdtMQ9CObOQbXAbLFjWM2LIVg0jiIIYmK/OyjrR3ANYKxu1g7OermTaHjvOuBZ630WSlXNRkGaOZK/W5KpDViFhbVIizlLzXLDFptzuUE2i7ilJpKO0BMX2yB3r2jt/tNzSM9gtmx13IYPPVqt9QDaA5xD7KrX1U+7WX5roOrF5QEyURdMoEuJ40ztZqu56xidrwOYxrorX8ZenHELFSmba1NWta48oIWX5tskjdIxAVa4fl4LrX34enQbdPV/cybvuw+tmRcQ0tzrDaqijZLYNa/LlLO9uOLn7SDAIewyrn61dnDSjkgC3BECMVvNUpvWB8h6gu4Ol7TpFbHa9sVDK3g2WlcKtW+o9yKy6OUUxv8RCx8RN6hn833OOOfnry9pNA2fWd4yuWy9Ca9CxRyyEv8pmDOzkKD0/BCMxBrQc8THlH6jHzxxu892VszRGwLDajQHGFstkXlS1FsV+xvildnF2vEuZ2jgbAjlaiApJxC0dXrZJMxnH4xLgHFPyGgaUYgWOtCDSG59mO9eFbrzNT7gZKrWLGVfp8fkcoMtq5TEGPsTjL3IMA7FRZ+yHujI26BQBxLK7Tf1d0+0+UPOI2zS1ENprfct1a4vhi7MfmlqvpAN/tujyKOBGUl7i4eAFRShiTtj7AbV5f10bR+8GAshYJz7itFjW7lY7tDxEJV8vR6LNY0dk6tKxco/YsX79kzH9ewRgZNoSyFcuotFKAlYtu1XTuZgNVxGwsbpWdx+bwGTJlinXpvN9nEnJDLMdYgwgzUBs4oPmTNteIW0jeljGTlpeUzWRw6A2HH2aOWqpSFpjq7kKtzPmEOCXIrwT/wCFJWYUsU8mtyxSL4q11DWWZB3l7gm6+/iaqjzHjuyJa4a2uVCqppLYtx+kjFKT8egqJypoWRnHhZXHrUMBXeQn6XIeBiBXr+1X7jL07tx2X9MuOsjGWyrj7w9yK6mRJpSj6zFaXjLojPxLslZ2DIqE4jzr4bGWIGYYBdN76K9TPMbFv3dy2svo6i40bVWER+2b7o07+w2q4ksOIRia2EqNiZOVWs1kkeQzBj079p1iVTCuuWMqS+a/SzwwgWK0pnIJHBLHaFjzki0dcgHK8R9YjB+XAB6otIPu48hlX06dvz7adm9J1m0j2Mr+GRmM6BD4tDM5xhZS7XfzEctx/wBSvGc8fyUgj545mN+7O0juHcDY8ylvu0frPoMaUTyssfjRGlXar78Ba9k7vHP81kp+OeI2fmTGMLmfF13xfYOCR1xgXcWDoUgWNGSIeDqGmUUjCUqjmFmG7CWbEMIEO4ZplPyQTAO8dx9IxvcjRtn0fLcDT2PFWKMP8IYVK5Hi/G5FYTMQbsbkU1b6RKfEm1ggvyzPWt6lsdzUdlw2yUfzWMTeVZ9rykIsI+V26hlHMiu5UY+qyYjmAcUx88dIYbw4+zRgS40fZHFjQYTaLQbJx7tHtDEVOSfqkHKGLeKs9BIUjSlbctRerPiEBROUpM/ajNfNJ0kYyIfs4O7bOyvfTdfTB3VP8L1PvNd/dFgXHQqnr3dzCk+lq+QW5sQpdfa65t1oL4x7LrrdVueUoULIar1VaSruN2ywHd3TYm3mdDqFmvNAkT8noOSlNzMJYpbVE1ut3ATnTqGfkukOx1iiCaYS8Hp3tVjDdnWvEuzmIX31FNypV2syEassmrK1OxNzqR1to1gKmUhUbFS7K0lK3MkKQqKj2NUctBVYuGy6tn+xYG9rOayGDyISFqhYNMlIEAuX/MmwAl+aFvVINES/OHl4HAmJDCTY68nJUq91HwD1iUhzBSs+ODVJDyJysuR8wklsiIYojWYGUgp6ci6xBzFknHX0MLARb+al3vocOfpIyLaqvXzr6dmi4drgg1QVVFJsgsuoBPFJJQ4lKOs5HIVMVj72UyDvp6ONqWb91/ttb7NSok7FhvtpBjme2lZn4KWbC44ACKYicvSp2cjcqY+mv3rd6yipVT5rX7tiywUpX7jSBQebDEfJhgA88kQxEz1jOPMpY3y3ANrTjC91O/V52kksjLVOdjpxoUqxfIibgzBwsZo4DgxVWrsqDlFQh0lkU1CHIXH4DZtd2qn+Ia3m8XnKcT4G/GXa9wUs+eU2BSZHWsBMELK9gVvUYkDFiYlEZDO65n9YusxuxYbJ4S8siEq2TpPptnxniSXDwCGrnmJFqpNZjIkBkJRM551nOsL0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR1qaxZ3w3VLvV8aT2SqgyyJdJQIas0Ykw2e22Uf+lVwYpa+wM6lGrVJBFRVxIvWraObEKIuHafIc6re3jUMbmaOu3NixS8/krS6dPCrtBYyjHt58POhWl1muqfEubNhSq4REybRiJ62ajpm15LD5HYKWv5R2CxNabeQzM1GJxldHmK4mbz4XWYwjIRBCWMeyZ4BZdbZ62rrWel7fxDO9MxgHWSI1Awg/Vd7V71KvsS0uMhnIfnVPxRInbxGUcgOAQE7iLK+jZIKJWpBYrYAlZ+SnWDg4UyVBGQtFTr2FTsHc3e7ysN297YYe7t20ZezxCU18Qg7gqXB8C+zysZr1hgytXToY/wk8innBZcMplbGM1HXah5PZNsvVsJiscmCJj3ZBwVQWfiMwpbyOVsaw0QmoF68DYjHt4hH2ndLYRW3YmxNFsUnuMsBREfZ7zJJt+I+wzrZ19cJVQEp0FBudx8hIzVFM6tRjXqaYf+HeIUeaPc2H1rer7Z+8W30WqwE51W35DGOmXVMHq+EleP7e6KMlBpKF1KWOp26/IxcVW2G6HJkfNje3Ri/T72LxGh4O2DsnGOZgat5f5HZTOZKTt7bs/El7owyzZuPqt5Oa/u4isXAiPDd3VwPSA9HR0dUsd03VpaTbJbM0eLI5fRLNtD5Yi0mpXISMImmSPirY4agQfq0Y9oYtesxVPeU8CaKXUSQj4qUcDWn67exT7yFd7dTruG/jF1Ku7rx/mu59LUlS8NtaDR4vCzh5BFK9ZWRNRTXi7gQhGMuP6cH0zdzQpunt5mmrmvbY+xrZ2oE6/vugzyGDcDeVGjIQTbFdBjC3PZdrH7rLqFdLzdvbcM3Zv2xeY+yFIvUO2tuHbwfoyzhVZzGau50dINWQzTvkTJs6jKNUGMPcz+KKi9PZ1q7JnWXo9nZyVgHpW9QFb1ndnRTmLdf/xke0GKqUN5oz7SLHcHVwKK2L7gY5MSMuK+UhW2JaRkMXthP90E09kxzQXHvh2qZ2K3j6jFIZHavd7lixrboFjA1zK+MOu6pbdHIw7HhBtw5OgX5TXYRC3Pt4axWl7hm8aSDRq/YOm75g+boPGT1muk5aPGjlIqzZ01comOi4buETkVQXSOdJVI5VEzGKYBHbiEgIgMSExKRISiRISGeCEhniYKJiYmJjmJ+J60uJgoghmCEoiRKJiYmJjmJiY+JiY+YmPiY6rqz722cVZKsj/KWG7HZNZs3OlTv1rziZ26gYqwynHkDu3ViIeRLaQdLKAAupWMdRMq4MdVZ85kFB8RXPuB6cdY2i67YtRyeT7bbkQsIc3qzW06z3GTHSy5j6rqngbbDDfYsYyzjrFl5k+6dw+I6n3SPUBsuvUE65tePx3cPUFjCRw2zqXds0q/2lWMyNpVo0rAfhdayq1WXECCFoj5iENivPd31BMYbE0i9mcexntOFlbVo15UVaJFATryhqwWtZJiRAniJlJOOnGqR/YISLkpTHGActnvWJ2dlhXK1Pufrtdn8O8FCc5I1oKA/jzjQxmzLP2uHPtZQpqIYRRFh6llJTFQw3pa7pxH0LbPbzO2IGJx7MhGGGGlPwFaMhOQ1+zzPMCFZ9Nhx4/4dZTERy6L3wI8TBHZS1+lmUi2U9Um5oNuZPxanAQKcqtctjGvSDNVMQOJm68moqHAE/u5668J69aCuUbj28yFBqmEptjDZIX+4a5EGCFC/VrgowZDBIDy7IGYESOJ8pjrzXo6fx7+tbzVchg+SF5vFuRBxPyMjkMY68holyPDArCP3n7cR1K6td33TWdEhJSYyJTFDAXzLZseTCqaZjfuBnNYPZGxgL+5jkVMUA+TCHUuYn1odjsiCytZPO4ST8eQyWEZYMJL44OMG/MTHjP3mOY/WOeozyPpX7s0vKa1TA5cY54nHZ2oMlEf0XkYx7Imf0iRjrbzLuUaOPwL6th6igJvH7ZGOtUWYom/g4SVfa+HHHBhEeC/HI8CHO9VfUz2MuR5J7gY8Y+P/OMbnqn3/wDe8Unnj9eOePvPETHWqO9P3eNHPnomUOPn5RYxlmJ4/WPp7zef7f1/T9eu7L3CtKDpe4NksZATgxuDS6xFeC88/wBA7Uq3Px9pfX5G+PEB5DnIR6huysj5x3EwPHEzxJW4L4/6k1YPn+kePM/pE9eOexnd2C8Z0DYeeYjmKoSPz/14bIcf1ny4j9eOsdlu5fo7EJHUPn+tyJyFEwN4KHts44V4D+1MkXX3RTGH9gATl+fjnnrFZD1Pdi8asmv36myIGSgaeLz94y4/SIqYp0QX9iIf0/rHWQq+nrvHbIRHR8giJniTuW8VTAf7lNm+qYj+8RPWgLd3ltVIRNwSrQuWb48T5BAsbT29fj1xD9hF/bJaGVTIb+DFYqiH7GKUfjqNM563+zmMGfw1WzZ9kzMBNPHVKlf4/wAzSyOQrW1j/wDhotZ/RfW8Yv0mdzLhBOSt6xhFT8nNnKndeEf2RjKtsSn+0uH+0z1E2w95nMeQJcKrr5rkxWnHxhasWss8sOSrOZZUPBFZOq0ZhFkTOBhAxQcSi7YoiHuUMQDeUS3vW3uuy2/wrtr2vF96xBRRi4WT2G3ZjmBlqsdjU4hnmHlH8NbL0QUj5QcflKTqPpL1PB1PxPe9+cFNMQxzKqqOv48RH5ISyeZdZkh4jiZCsDJ+fCImY4z+p689z7bL1PtiM7TOu2NpApRd1GoBHwNuko9XyMLQldpq6P5YHJATOe43CRdpAoRRaBciTx623CdvPVH3ZkbXcje7fbvXHmBlhMRKqWUdW8vIkfQ4WaX8Box4HGevfVoKRllKyEEucHk969OfbHyRoml1d82BHMLyuV9+7i0PGOIbN7LAz35jnyiMTi0JPxKAuqmYLqzrXHTjAerbByGMKen+qpVEErLkiyrfqDIloHzFQ4y1ndpg5TbKKcHNFxacdEeZE1PoPcX2i0vbvtBovbGr7etYqJyLAIbmfyJDczd2WTBPllyVgFZdgxFjqmOTTpsbEOOuTuWSuu/d1927jvXOxZSfw2sXlj8Bjg+hwOOjjxH6bHKKVkwR5GLNkrFrxmR97wnx65O4G2+FtHdfL/sjnqxkgKLRI0VEmTcUVbFc7M8KdKtUGlxaqyJpq4WySBONho4iiaJDHXk5RzHwkdKSbKade1/J7Pl6eFxKCfcuNEI4EpBK/KIY90iJSKlRMTPAkZlIqULHMWsoryF+vjKjrlovFahmeIkYJhQMlAB5SI+UwMzJEQrWAm1pgoDMUdsOKZz3T2OuPcL2OhXC2btgFWNV15xQxBzJIYew2uorEUytVdmdEioSEswfHYRbhBm2fT7mYtN3dJFkbumCVeP7R/1JU83Yxnov7JW2ZjB67n6Ud3Mvh+LB7x3JRbVGM0KkdUmRkKWr5QgfnVqJyrW2hRw6pJWsxDW89KXaZmGqWO/fcBK6OTymKslo9S9yodc1R9YoyO2WIsAv6Sxm6InVw8yCjRrxW8m2TdmxdDt+mWtbLWbDkZV3SbZa92E6ViyJKNxIqVafXQKRKGaOQ8hViq208YxkJT/TuXISMuki3PLLpBOfpu7L1uyfbmlg3ilu1ZggzG4X1SLIblmqgV45D45llDDI4pVpgvac+LmQBaiyDQiIe7ncJ3cXbbOSXLAwtCCoYGsfIyFFZzJW2r+IG1kG82XRMea1yiqRsGqBTLTpgOou6Ojo64z1kzkmbuOkWjZ/Hv2y7J8xeoJOmb1m6SOg5aO2y5FEHLZygodFdBYh0lkjnTUIYhhAemzWr3a9incrpt1LaW1rVWypb69mu9ZKfXsIaJKclyiJbVMElsWRAYyMzHXYlza7VPQ1iHoYDkuSZLalqyg1tUwJE1sWYwYGEwQFEEMxMRPSrncp7eEJQ29pjH1YXuGs2UlDtQQETqu6LKrKHcMohWSORdWOkYd0Yzuj2NbzUcIJjGyCjxwnIfmVQPdTt73K9GPd7A98eyWSt4vC08uy1r2ShbL1TDHeggyWibbVIvHKaxmqhNoQm6fjk8bMIY+MvRC6b9aFuOp9/NGyXbruHVTdyFiitGXo+YVnZIKswVLZsE7xn6LNY1/jZ9yuE/SWvIvaLG3GVYiH20e6Tee1pZqlpLvXYZK36VTT08RrBti6TePD4cZHVD6TGWUfl26SoUV7QQYuDqKv8XpetsmWUxeeNe0q5DtD3e7d+s7RbPcTtmqvrvdDA1q5d1u0T7YMyWGvNjwnNYUzhZ5jWsm4SLE51YeFjyjHZkaOwpYu+iPcPtztHYfY0a5shsy+nZZzo0zdEoIauRQEyX4fcWPnFDMVFyIX8SZEaC4tY8rWJcpld1iIl4qwRUZPQMnHzcHNx7KXhpmIetpKKl4qSbJPI6TjJFmqszfx79msi6ZPWqyrZ02VSXQVUSUKYfMxbFMNTQNbVmS2LYMgxbAmRMDAoggMCiRISiJGYmJiJjrHCQkMEMwQlEEJDMSJDMcxMTHxMTHzEx8THzHXYdcOvvWh8q6v69Zu8j5Uw/Rbg8Mby/OH0I3a2IpgDxAU7LGfQz6XAfsCckQAHgQDkAHrQdr7W9u94kz2rT8Hl7BgSyvtphXyngURBAOWpzXyQDPET4hbGOREuPIYmN11ruNvWn8RrW1ZrFKj4+kTcNlCfnn82Ps+9RL5/wB6vP8AT7dQTuHZt1QnzOF6xJ5Vx+4VHlJKGuKU3GIfA/YVlb4uecCmAiAgUsgmIcePl48AC9Z30Q9msrMljT2bXS8okV4/J1biI+P5T/F8ffuMGfiZmb0H8fzfM9TPivVj3NpQAZGvrWcAfgjuYkqdg/t8y3FWaK4nj45lBR+vHPz1oWR7HdZOcww2ydtap8j4kl8eV6UU4EQ4AyzCbgyiIBz8g3KAj/AdRve/Z/68yZnHdwr9SOfgbeuhdmB+PiSVnaUTP3+fCIn4/LHHzu1f1j5GBiLfb/FtL9Sq569Wj/QHUrk/6Sc/8esfR7HTgVeHGzBiofd8oYpRFb9/s+Fbz6/kP7/+/wAl/wAdYZf7PkfP+L3QX7fz/JpzfP8A6v32uI/4/P8Awnr3F6xw8fydu48/j4PZy8P7/wAuF8v+H/f1m0J2QMeIKpmsmweRJZEBD2IwtUqde9hf5AFXn6jOmP8AgQ54/kB/brZ8f6A9NVMfim85y5H+acfi6mNP+/jNq5l1x/8AEpkR/T7cYe56xc8YlGP0bA1S4/KVzJ5O/Az/AFkVfh8F/wAPjqTVE7S2mVNUIvLVC05JclAgiOQrlLSDIyhQDk5oeCGvQyhTCHIorsFkePtEglE3Mt636PeyGvGprsHkthemI8HZ3Ku48o4/MdfDrxFV3MxzIPQ0PmY8ZjjiO816n+7WWEgq5XG6+suY4wWJrIb4z/li1d+vtjMR/mB4Hz88x1POh4vxvi6MLDY3odRosWCaaZmdUr0XBJLFSDggufy5q3O7UD9xVcmVVMbkxjmMIj0wmA1XWtVq/Razr+GwFWePJGIxtTHgyY+fN30qly5kzMyTGyZkUyRFMzM9Qrmtjz+x2Jt5/NZTNWZKShuTv2bpBJfeF/UMZCh/SAXAjEfEREfHWd9Z7rC9Rq2y261/0jwtZs97H3+ModCriIpoAsYrqx26eVTUPF02iVxI4SVsuE2omZKMhItJRXwK4kH6jGHYyMizzWA1/LbNk0YnC023LjyiIEBKQUElAy55xEwpQyURJTzJFIrWJtNay8l29Vx1c7NtoqUET8kQxJzAyXiEFMRJeIkU8zAgAkxhAsDMUesxZkzf3fs51zaPZ6uPcd6l44evXWp2qL16osjNJqqnRLk/JpEjEbTMlMoJpfmciCRGciyIWo1P/wArFnJuyLH60PWXgfTfr+e7Bdhc8jKd9MxXPF9y+5WKattftZTeqQua/r91Umsu4L1MOtM1zZGlKY61bZ+8p1q+Mnb0++n+73NvY7uX3Jxx1+3dZgXNS1O6BqZvLUsgkZPJ1zgHL05bgF0C0VntDVLUoPwcGMa0z25NJ3dHSabBZgiBRvEo19mParItwSXqMS7Q9Q2OUZHIUGdhkmZ/poiL8E/07CqG+oTLJvgaQS3ejP0xN1JNbuz3Bxxq2a6kmajg74nNnA0rgF7udygP5aOeya2n9Ml0y/H03NdcksndJWNkb1B95hz7n6RrFwWYhDYHP5OsQwrKWUFEBjaZL4D8LpkA+6a/4Vpy1qrxFKsJ3LgerE+lO6Ojo6Ojo6Ojo66G0VevXWvTFTtkOxn65PsVo2Yh5JErhm+ZrhwdJVMeBKYogVRFZMxF2y5EnDdRJdJNQuKzmDw+zYfI4DP46rlsNlqrKWRx11UNrWqzY4IGBPzExMQamBItS0Qck1tWBj7sbkr+Hv1Mpi7bqOQouCxUt1zkHJcE8iQlHxMTHImBQQMAiWwSAiGVl9++2WpRIC3LtauXLetViKY87CySSj2YpKfkc6BpgzYCPUEok5vbBX6JMg7jFAKnKizV8Fpapfub2N7t+k3eane3sLsWeo4rAWW3cfn8QfvZzUkPn/F4jZ6RAytntTuKj6a4V2tZxd2pzVzlVLYr2bT1aR3Q0nvXrj+3XcvF42zcyqV17mJvx7eMz7VfNe/h7AkLsXnq7P41X6Vqb1Z8Q7GvauWoTU7q3tRvD2gXZmeGU5rcjQkjo72Y1ytEoqXKOEWDh0d3Jv8AE82RF2ePYInUXcKR7WPkaNImXWWka5T5Zw4sQ2QdgfXL2V9UaMbqvdxuE7Hd+2AmnXzBsGl2y7i3vGFKLGZO86Fa7lrZwMfu5sFxUw1gqwmcyCADHrV/uj6bd67VNuZzRRyHcLt3BzZfTEJsbjqtcuZd+IUa4SeYoo+C/GsOhkyEkeUxdVpHcltbRPun6WdxGuJPtesrsD3xqyK6tOEbuCNRzNTlAKqZynKUt65OrLsWoInMpY6g7slWMQyfhNiqYUiMdteh7Pplkk5vGtWjyiE5BIk2hYEoiVmD4GPD3BKCWt4paYz5iBBMFMIYrOY3MqBtKwBEQQRIIhhwfESUSMEQnATPgZpJixOJCT8omIsS607rL9HR0dHR0dHR0dHR0dHR0dfkxikKY5zFIQhRMYxhApSlKHJjGMPAFKUAERERAAAOR6Ojqgvff8QJq7rFMSGEtaGK27G2TlVeGi8YYgffmtFqU8YnrSPkrJMShKRTUI9woU8jWKmWwWcn067OVRrRDDJoSFQ0IqmCvbrv2bxPbjQMMibmZ2zbbtfD0KtQI8yKGXmIACYET9PDZFlmZiKSLreElhZyzLuSqYDXMdf2bYsi6K9DD4Ws2/asOIiCYBdcTJkLIDF0rggrlERcbUXMuFdOQxXsnu9nKG2Q7iNr/wBast/UEaYk1pqLRdbDuHUZBZEzWvQ9RjXEg1lZQ5yNEHsa1XmpGffIlVulns7lNNihWn6lP2j8W6N3sp6LqWcw+Nyz5xGa7zfRWk77t5P5rFR7c432YyeBq3fcOuvZLaFbFZS0gwGMwINGy1x+0vpUTjmV9+79txl+/SSF2noP1CGazgfa4sza3C9Dip5R9YhAywdZx4hBqicteypLlUNOaSduUlKdQuYtgWTaQuiH0sjU8dKlQcRlSVRKQWEnZCpAZm+nmRSJDFQjYDRNc9aSqgupRNulCan6YvRqvVn47uJ3arLubKDByOD1F5jbrYW0R++GV2FpE0MlnobP1CassdXoPL6u023k5CMd295vUEzODc1bR3sRiTGauTz64lDskkQhU0cUEQBU8XC49kmwK2WVRFdC69KC+ruG6sW6U3o6Ojo6Ojo6Ojo6Ojo6Ojr8KJkVIdJUhFE1CGTUTUKByKEOAlOQ5DAJTEMURKYpgEDAIgICA9cTAWCQGImBjIGBxBCYlEwQkMxMEJRMxMTExMTMTHHX0SISghmRIZghIZmCEonmJiY+YmJ+YmPmJ+Y6qq2b7YVFyM5f3bBr1ni69KqLP1q94LI0OZeiAnAWqLEhnVNdKqDyZaIQdxIfBSQbdRRZ2KFd8/QzqO8le2DtqylpmxWZa+1gnJKdPy7jjykQrIWbMA1p/JFRRZx0/ERi1GbLEs7219See1r6XGbcNnP4pPtrRk1M8c/QAZ4gpeZgOUEB/liy1Nv+t0xgVdLH7e9sCPjbkhP5UxrcME5bYyAvaznTEzgazJLyqJ/NGXYz1fVTrdgfACBFDOGb2LsqKXAO37dUfAIY7feq31meiptTSduqP3LtvXmatTR+567Ox6qdMZPmvpe71XNyeEWQR5xQo5S5Qrh4DYwQcyvqUtk7R9gfUIt+fw7U4TanQL7OxacVfFZr6jlZQ7ZNYsrDH5VgyIr+stUa18+C+ny/PBxlGHd/O9VpyRvFRWRsa9xDFUcUE2tezSRWuZobtPIo+hteGrqKsMq9SRIBCOJt3kMfMxxAh/sKL46F+0B9GfddaEb3R2306bU/xBzLtQ9n0I7ExybV53X6dhlOp5zIgF/XcNIxA+5YmeSJa9o9LPfLUCazV7WF7pYhcjKwqOHE7MKo+JCcPmbVX6h/2YxlbOZiTmTBKI/hjFhlC/FGYZgTkidwNK9rda5tEqaL2ThIGNyxTAdgKBF1UpIpqRYRYiJ1VUzN6y/VKQhEg96pwMLZa9p2p9wqo5HtN3e7Y9yqLvlEYDacXYvmExyMFjqlu9bSz5EZXZXXOCKIIRmfHqBsxkM9qbpq7vpW06nZXMi6cti7VOmookYni7k0YxVgZkvhlSLC5/34/SbVK/EX9nq5NEHC23EfSXKxSiaNyFjLLtUdtjG/6bhd3RVIohi/7/CSUIX+T/A8e+72U7m0eZZq9pgR/wDWJsUzGf8AhBWAZzP6RIRM/wBOvGjdNcsSUKvMIhmIkRo32RPP6gxVVimD+nkthjz9p62Mv36O0A2QI5U3ywyZNQh1CFbhcHbgSkHgQFo1qyzoFBH+xIyIKKh8pkOHz1jB7VdwjLwHVcjzzx8zWGPn/rE+BmP6zzxH6zHXrnZcKIwU2mcTzPEUb5EPjPE+YDVkl/2g4GSj5HmPnqP+Q/xMPaNpBTkgM33rLr4vkCcdirCmTZRZwoAB4JIPbTX6hDGMrzwmoeUIgIhwZYvxznK3YzuS4Pds4MMYiI8jsZG7VSlQfeWNNLH+2ER8yRRERHz1jXb1raiIBuMawfGPb+mdWIyOPgFlfGotp88D4rMp8p+3HMxB7IH4lXM+TQeRejfbdytajHMIR+R9j5xrj+noICYxCPXVbrIyR3SX9qp0D5Bh1CJ8kMcphExI/wBxzfp77SATe8PqL7a625QyRYHCZqvsmxPIP50V8VhPxTLQ+JiQgTw/Es4EpHgpjcNe17ujvJQvR+1225VZRz+I3ca3GYxMSUiLGZC/9FhmLmeJKV5yCAfIvEuIgqzs02HuWb2lcNd4dx3lHxY/8wd63arohSqg8ZKHMsSLs85GrFUsTcvsM3XLZ56/F8QL4IF9ZABMu437UrsxoQWKHpt7RZLeM8EGuv3C7s+5hMJWZ4zA28fqtNztgvEs4AlhYt6upseUNUQzIyxGpejTc87KrPdfd6eBoTHLtZ0n28rkXRIeJJs5mwsMNUWfJeQCnYzUUgSnQQQfU99JO1LY1IhnG4OxDGYYx88QSRlMl2xq6QlLAyATGMf81eojaLb7imVFJrDN2dW9wAkupHBwcEtyuG9Yfrlz1PZO6WxZgtVVYm1im7Ak9a7fYFJzM86ZpFFaa9lvtyQJyCKVp7THwv58JKT6nlWe7FenbG2sTpuMojmXK9m8rFNHMbVlTjynjYtmtEblr8i8jqMsV0LAuauJIRgOmTtZ9KMPazNUpCCYmtWQVG50H+Q7C3QNLARYolXbQDIoqtK1HqFMZM6LEyj9yib0yUpIEImBH67J+mft32TQFzF1iz23Gol29wzCVFkPFkSLU4msMsRhahxJAS6pHbeufbu3rYiHiqvcXvDtfcVhV7roxmCE4NGBoMOKvITEgy86fFmReMxBCboFCzjzr1kTJczB6YjqKOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OusmYSGsUa6hrBERk7EPkxRexUywayca8SH5FJ0xepLtXCYj+5Fkjl/7deHI4zG5ik/G5fH0cpjrQe3ZoZGoi9Ssrn7g+rZW1Dgn/dYsh/t16Kly3QsKt0bVilaSXkmzUe2tYUX+8pySBiy/uJRPUAspdsXWLIRnL2AhprF0wuBjA4pEj4w4riYTAdauTKUnGJIAA+AtocIYniBfExDAImU3evRD2Q28nWcTjclo2RbyUO1i5446WzMz5Mw2RC7SWrifGU46McPER4kM8zM5a16je4+Bhab1upstQOIleZr824DjjgchUKvZI/19y3NueeeYmPiIK3/ALRuR4hm+UpWY6lY4VuRRcI65w81AACJQEQSURji3Bi4UABEoqC2bkP8m9SYG8AVLZ/2eG2YZr8rp/cPX7k1fJ6X5ahldcySRD8wwNzEfjZS0Z4j3Q9iJmIOACfyxOWE9WOHvAqjndXy9aHSKzVRt08vSMpniZmtf/DggJ+/gUNmInxki45mrXK+k0FXJB02vVAwTY3SSpk1lkadFOxUOAl5MC7mnRzgwCIgPIiUREORDnqFL2Q9SnaV5U8f303rF/R+VcV4Dubvo1gGJiZFSbB11QHMxMR7I8fPER1I1dXaPegCxd7aatf98fPyy2kamTZ55nk2KU05KeOZ/iTzMRzM9R7jdW8ErvxSZ4Nwwg6MYwiqejxHiIgoHl+7BYPk4gYOE/4/gPgcUr1L+qy+cVJ9R/eMoiOIhncfaBCIjhf8y7Pn9p4jnn45n79esu0fZGrBWR7QduhmPmZHTMERTzPn9mIkf5o5/wCPx9vjqdGEO3vYby4bNcdxWCaf7VESFWLAkhVkSqKET8iKwlCcL+RQPzwCxBNx8nAfnra8D2q9QPe5wVsl3cyWaCwcCwNx7h7/AJNExYIRZJVnVsklnlzyQkEQfHjMxHWGyW+dse3KiZS0WljJUM+E69qOqUWR4RMxAuUym0I5j7wUzH34nqyWl9n5dwdBxlXN7l0mQCAeJpUEcTgHAewqE/Y3SxUwD5ImA1kwcABxAP8Al9T/AKj+zhQkhbuXcMAAvGXUNRwgKM5niTkcvlWFHPPMDJ4Upn+cv1DqK8/6uXuiQwOrMYUcwu1n8mbRGPsMTRpDE/biZgcjER/LH+91YLiPRzWjDKrZ/W8csJuwNTFUSs92ONrmU1ilApXDQsiQYmKcF4EQXhouOUATG+7geAcLt96X+ynbc028Np1TJ5dEwa85sxfj+SBgxEC6vFwZoUHRxMw3G0aZxJF88Tx1AO095u4m3CxGQz76dFkSJY3Dx+F1CCZmZW2a8xasrn7SFuzYHiI+OpbdMD1FvR0dHR0dHR0dHR0dHR0dHX//2Q=='
    var doc = new jsPDF('p', 'pt', 'a4', true);
    var resultado = Math.round($('#cuadro_resultado_total_porcentual').val() * 100);
    var presencio = prompt("Presencio");
    resultado = resultado / 100;
    doc.addImage(imgData, 'JPEG', 450, 10, 75, 75)
    doc.setFontSize(20);
    //titulo
    doc.text('Resultados CheckList.', 200, 40);
    doc.setFontSize(14);
   
    //fecha
    doc.text('Fecha: ' + fecha_larga() + ".", 20, 25);
    //Aplicador
    doc.text('Aplicador: ' + $("#Label1").text() + ".", 20, 60);
    doc.text('Encargado de tienda: ' + presencio + ".", 20, 80);
    //crea una linea de color
    doc.setDrawColor(255, 128, 0) // draw red lines
    doc.setLineWidth(20)
    doc.line(5, 100, 450, 100);

    doc.setFontSize(11);

    //Establecimiento y fecha
    doc.text('Establecimiento: ' + $('#mEstablecimiento').val() + ".", 20, 105);

    //retorno de nombres
    var retorno_nombres = conexion_ajax("servicios/checkListServ.asmx/conexion_reultados_ckl_total", { 'folio_sucursal': $('#establecimientos').val(), 'fecha': fechaCompleta() });

    //variables a usar
    var nombre_cuest, indice, nPreg, alto = 800, separacion = 45, cotador = 0, n = 130, p = 145, r = 160, o = 175;
    //creamos un filtro para nombres recorriendo el array que los almacena
    $.each(retorno_nombres, function (j, item) {
        var nombre = nombres_cuestionarios_por_folio(item.zona_inspeccion);
        var pregunta = item.datos_pregunta;
        var respuesta = convertir_respuesta(item.respuesta);
        var observaciones = item.observaciones;
        if ((separacion * cotador + o) < 811) {
            //si el dato es el primero se le asigna el nombre
            if (cotador == 0) {
                //creamos indice de cuest
                nPreg = 1;
                //asignamos valor
                nombre_cuest = nombre[0];
                //lo mostramos
                //.log(nPreg + "-" + nombre_cuest + "posicion:" + (separacion * cotador + n));
                //damos la posicionde la cabecera de la zona o cuestionario
                doc.setDrawColor(33, 199, 249) // draw red lines
                doc.setLineWidth(10)
                doc.line(5, separacion * j + (n - 2), 560, separacion * j + (n - 2));
                //escribe los datos
                doc.setFontSize(8);
                doc.text(nPreg + "-) " + nombre[0], 10, separacion * cotador + n);

                //creamos indice de pregunta
                indice = 1;
            }//fin if
            //revisamos si el nombre es el mismo
            if (nombre_cuest == nombre[0]) {

                //aqui damos la posicion a las preguntas respuestas y observaciones
                doc.setFontSize(7);
                doc.text(indice + ": " + pregunta.substr(0, 120) + "-\n" + pregunta.substr(120), 20, separacion * cotador + p);
                doc.text("Cumple: " + respuesta, 20, separacion * cotador + r);
                doc.text("Observaciones: " +observaciones.substr(0, 120) + "-\n" + observaciones.substr(120), 20, separacion * cotador + o);
                //crea una linea de color
                doc.setDrawColor(0, 10, 250) // draw red lines
                doc.setLineWidth(.5);
                doc.line(20, separacion * cotador + (o + 2), 560, separacion * cotador + (o + 2));
            }
                //si hay un nombre de cuestionario diferente se se reasigna
            else if (nombre_cuest != nombre[0]) {
                nPreg++;
                n += 15, p += 15, r += 15, o += 15;

                nombre_cuest = nombre[0];
                //console.log("j=" + j + " Separador=" + separacion + " Contador=" + cotador + " N=" + n + " O=" + o);

                //lo mostramos
                //console.log(nPreg + "-" + nombre_cuest + "posicion:" + (separacion * cotador + n));
                indice = 1;

                doc.setDrawColor(33, 199, 249) // draw red lines
                doc.setLineWidth(10)
                doc.line(5, separacion * cotador + (n - 2), 560, separacion * cotador + (n - 2));
                //escribe los datos
                doc.setFontSize(8);
                doc.text(nPreg + "-) " + nombre[0], 10, separacion * cotador + n);

                if (nombre_cuest == nombre[0]) {
                    //imprimimos los datos
                    /* console.log("\t" + indice + " pregunta:" + retorno_nombres[j].pregunta + "posicion:" + (separacion * cotador + p));
                     console.log("\t respuesta:" + retorno_nombres[j].respuesta + "posicion:" + (separacion * cotador + r));
                     console.log("\t Obs:" + retorno_nombres[j].observaciones + "posicion:" + (separacion * cotador + o));
                     */
                    //aqui damos la posicion a las preguntas respuestas y observaciones
                    doc.setFontSize(7);
                    doc.text(indice + ": " + pregunta.substr(0, 120) + "-\n" + pregunta.substr(120), 20, separacion * cotador + p);
                    doc.text("Cumple: " + respuesta, 20, separacion * cotador + r);
                    doc.text("Observaciones: " + observaciones.substr(0, 120) + "-\n" + observaciones.substr(120), 20, separacion * cotador + o);

                    //crea una linea de color
                    doc.setDrawColor(0, 10, 250) // draw red lines
                    doc.setLineWidth(.5);
                    doc.line(20, separacion * cotador + (o + 2), 560, separacion * cotador + (o + 2));
                }//fin de reimprecion de datos del cuestionario
            }//fin de reasignacion de nombre
        }//fin restriccion de tamaño
            //creamos una nueva pagina y le agregamos los campos
        else if ((815 >= separacion * cotador + o) <= 835) {
            //crea una linea de color
            doc.setDrawColor(255, 128, 0) // draw red lines
            doc.setLineWidth(15);
            doc.line(40, 836, 530, 836);

            //reinicia los valores
            //console.log((separacion * cotador + o));
            doc.addPage();
            cotador = 0;

            if ((separacion * cotador + o) < 813) {
                n = 30, p = 45, r = 60, o = 75;
                //revisamos si el nombre es el mismo
                if (nombre_cuest == item.nombre) {
 
                    //aqui damos la posicion a las preguntas respuestas y observaciones
                    doc.setFontSize(7);
                    doc.text(indice + ": " + pregunta.substr(0, 120) + "-\n" + pregunta.substr(120), 20, separacion * cotador + p);
                    doc.text("Cumple: " + respuesta, 20, separacion * cotador + r);
                    doc.text("Observaciones: " + observaciones.substr(0, 120) + "-\n" + observaciones.substr(120), 20, separacion * cotador + o);
                    //crea una linea de color
                    doc.setDrawColor(0, 10, 250) // draw red lines
                    doc.setLineWidth(.5);
                    doc.line(20, separacion * cotador + (o + 2), 560, separacion * cotador + (o + 2));
                }
                    //si hay un nombre de cuestionario diferente se se reasigna
                else if (nombre_cuest != nombre[0]) {
                    nPreg++;
                    n += 15, p += 15, r += 15, o += 15;
                    nombre_cuest = nombre[0];
                    //lo mostramos
                    // console.log(nPreg + "-" + nombre_cuest + "posicion:" + (separacion * cotador + n));
                    indice = 1;

                    doc.setDrawColor(33, 199, 249) // draw red lines
                    doc.setLineWidth(10)
                    doc.line(5, separacion * cotador + (n - 2), 560, separacion * cotador + (n - 2));
                    //escribe los datos
                    doc.setFontSize(8);
                    doc.text(nPreg + "-) " +nombre[0], 10, separacion * cotador + n);

                    if (nombre_cuest == nombre[0]) {

                        //aqui damos la posicion a las preguntas respuestas y observaciones
                        doc.setFontSize(7);
                        doc.text(indice + ": " + pregunta.substr(0, 100) + "\n" + pregunta.substr(101), 20, separacion * cotador + p);
                        doc.text("Cumple: " + respuesta, 20, separacion * cotador + r);
                        doc.text("Observaciones: " + observaciones.substr(0, 100) + "\n" + observaciones.substr(100), 20, separacion * cotador + o);
                        //crea una linea de color
                        doc.setDrawColor(0, 10, 250) // draw red lines
                        doc.setLineWidth(.5);
                        doc.line(20, separacion * cotador + (o + 2), 560, separacion * cotador + (o + 2));
                    }//fin de reimprecion de datos del cuestionario
                }//fin de reasignacion de nombre
            }//fin restriccion de tamaño


        }//fin else

        cotador++;
        indice++;
    });//fin ciclo de revicion de datos
    
    //crea una linea de color
    doc.setDrawColor(255, 128, 0) // draw red lines
    doc.setLineWidth(15);
    doc.line(40, 836, 530, 836);
    
    //aqui se guarda el documento
   doc.save('CheckList-' + $('#mEstablecimiento').val() + '-' + $('#divDia').val() + '.pdf')

}//fin

//funcion a los botones *********************************************************************************************
$(document).ready(function () {
    //$('#btResultados').prop("disabled", true);
    $('#btResultados').on("click", function () {
        if ($("#establecimientos").val() > 0) {
            $(".resultado_ckl_t").remove();
            $('#respuestas').show();
            if ($('#establecimientos').val() != "")
            resultados_de_ckl();//
            llenar_contadores_resultado_total_checkl()
        }//fin  
    });
    $('#respuestas').hide();

    $('#btn_cancelar_respuestas').on("click", function () {
        $('.resultado_ckl_t').remove();
        $('#respuestas').hide();
    });
    
    $('#cerrar-accionesExportar').on('click', function () {
        $('#accionesExportar').hide();
    });


        $('#btGuardar').on('click', function () {
             window.location.href = "Tabla.aspx";
        });//fin guardar
        $('#btGuardar2').on('click', function () {
                window.location.href = "checkList.aspx";
        });//fin guardar
        $('#btNuevo').on('click', function () {
                
        });//fin nuevo
        $('#btDesacer').on('click', function () {

            window.location.href = "Tabla.aspx";

        });//fin deshacer..
      
        //evento para buscar cuestionario
        $('#btn_selec_').on("click", function () {
            //muestra la modal
            if ($("#establecimientos").val()>0)
            $('.modalDialog').show();           
        });
        buscar_cuestionario();

        //recorre la tabla creada para revisar los ckb
        revisarCkb();
        //da los eventos de guardar observaciones en valor de boton.
        darEventoObservaciones();
        //dar total 
        resultadoConteo();
        $('#accionesExportar').hide();

    
    //muestra la modal de los botones para exportar
        $('#btnExp').on("click", function () {
            $('#accionesExportar').show();
        });//fin click

    //funcion de los botones modal guardar
    //creamos boton con funcion de click para llamar el exportador a pdf
        $('#gPdf').on("click", function () {
            $('#accionesExportar').hide();
            if ($(".tablaRespuestas tr").length >= 1)
                to_pdf_();
            //console.log(retorno_nombres.length);
            retorno_nombres = "";
            $('#respuestas').hide();
            $('#accionesExportar').hide();

        });//fin click
    //este boton creara una tabla de excel para descargar a partir de la tabla tablaRespuestas
        $('#gexcel').on("click", function () {
            $('#accionesExportar').hide();
            //llamamos la funcion que crea la tabla con las variables de id y nombre 
            tableToExcel('tablaRespuestas', "checkList-" + "-" + $('#mEstablecimiento').val());
            // descargarExcel('tablaRespuestas', "checkList-" + "-" + $('#mEstablecimiento').val());
            retorno_nombres = "";
            $('#respuestas').hide();
            $('#accionesExportar').hide();
        });
        //ocultar la modal de observaciones
        $("#moda_observaciones_cues").hide();

      $("#btn_cancelar_obs_cues").on("click", function () {
          $("#moda_observaciones_cues").hide();
      });
      $('#btn_agregar_obs_cuestionario').on('click', function () {
         // $("#moda_observaciones_cues").show();
          //llamamos la funcion que crea la tabla con las variables de id y nombre 
          tableToExcel('mostrar_observaciones_cuestionario', "observaciones-" + "-" + $('#mEstablecimiento').val());

      });//fin deshacer..
});
//funcion de modal
function contenido_buscar_suc() {
    //creamos variables 
    var clasePadre = "mostrar_sucursales", contenido;
    //creamos el contenido 
    contenido = ' <h3>Buscar Sucursal</h3> <input type="text"  id="txt_buscar_suc" style="width:50%" />  <input type="button" id="btn_selec_cues" style="" title="SELECCIONAR..." class="btnf" value="seleccionar" /><div id="mostrarTablaSuc1" class="scrolling-table-container2" > <table class="tablaSuc" style="width:100%" border="0" >  </table></div> <br /> ';


    crear_base_modal(contenido);
}//fin
//funcion de edicion de botones
function mostrar_ocultar_botones() {
    var acceso = conexion_ajax("servicios/checkListServ.asmx/revisar_acceso_usuarios", {
        "usuario": $('#Label1').text(),
        "folio_sub_menu": 29
    })
    if (acceso==false) {
        $("#btn_selec_").hide();
        $(".Quitar").hide();
    }
}//fin

//funcion tabla_observacioes
function tabla_observacioes_cuestionario() {
    var observaciones = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { 'folio_establecimiento': $("#establecimientos").val(), 'fecha': fechaCompleta() });
    var $tabala = $('<tr class="observacio_de_tabla" ></tr>');
    var nombre_cuestionario = '';
    var posicion_pregunta = 0;
    var contador = 1;
    $(".observacio_de_tabla").remove();
    //recorremos el arreglo
    $.each(observaciones, function(index, item) {
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
    if ($(".observacio_de_tabla").length > 0)
        $("#moda_observaciones_cues").show();
    else
        $("#moda_observaciones_cues").hide();
}//fin
//funcion borrar por folio
function borrar_observacion_por_folio(folio) {
    conexion_ajax("servicios/checkListServ.asmx/Eliminar_observaciones", { 'folio': parseInt(folio) })
    $("#folio_" + folio).remove();
    $("#borrar_folio_" + folio).remove();
    tabla_observacioes_cuestionario();
}//fin
