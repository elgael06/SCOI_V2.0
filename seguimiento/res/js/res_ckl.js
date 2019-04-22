$(document).ready(function () {
    //esta funcion llena la lista de seleccion de establecimiento
    llenar_sect_Establecimientos();
    //
    $(".resultados").prop("disabled", true);
    $("#respuestas").hide();
    $(".modal").hide();
   
});
/********************************************************************
*                    funciones y metodos                            *
********************************************************************/
function r(d) {
    if (d == 0) { return "--" } else { return Math.round((d * 100)) / 100 }
}//fin
//dar fecha larga con nombre
function nombre_fecha(fecha) {
    fecha = fecha.split("/");
    fecha = fecha.reverse();
    fecha = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
   // console.log(fecha);
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var f = new Date(fecha);
    return(diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
}//fin
//funcion de guardar tabla  en excel
function guardar_tabla_datos_a_excel() {
    //checamos que tenga datos la tabla
    if ($(".dato").length > 0) {
        tableToExcel("tabla_res", "Establecimientos" + $("#fecha_inicio").val() + "-" + $("#fecha_termino").val() + ".xlsx");

    }//fin
    else alert("no hay datos...");
}//fin

function temporal(respuesta) {
    var promedio = { 'establecimiento': '', 'cuestionario': '', 'imagen': '--', 'limpieza': '--', 'surtido': '--', 'total': 0 }, sum = 0, cont = 0;

    respuesta.sort(function (a, b) { if (a.orden > b.orden) { return 1 } if (a.orden < b.orden) { return -1 } return 0 });
    //creamos elrecorrido a los datos
    $.each(respuesta, function (index, item) {
    //si es igual revisa que aspecto es
      if (item.aspecto == "IMAGEN") { promedio.imagen = item.promedio, cont++, sum += item.promedio }
      else if (item.aspecto == "LIMPIEZA") { promedio.limpieza = item.promedio, cont++, sum += item.promedio }
      else if (item.aspecto == "SURTIDO" && item.cantidad_total_preguntas > 0) { promedio.surtido = item.promedio, cont++, sum += item.promedio }
      promedio.establecimiento = item.establecimiento;
      promedio.cuestionario = item.cuestionario;
    });
    promedio.total = r(sum / cont);
    return promedio;
}

/********************************************************************
*                 funciones de llenado y eliminacion de HTML        *
********************************************************************/
//funcion para llenar lista de establecimientos desde arreglo de 
function llenar_sect_Establecimientos() {
    var id_usuario=""
    if (id_usuario != "2034") { 
        //modal
        $("#dialog").show();
        //variables a usar
        //lista de resultados
        var lista = conexion_establecimientos();
   
        var contenido = "";
        //recorre el arreglo con los establecimientos
        $.each(lista, function (index, item) {
            //crea el contenido
            contenido+="<option value="+ item.id_establecimiento+">"+item.nombre_establecimiento+"</option>"
        });
    }
    else if (id_usuario == "2034")
        contenido += "<option value=1>Super I</option>"
    else if (id_usuario == "2034")
        contenido += "<option value=1>Super I</option>"
    else if (id_usuario == "2034")
        contenido += "<option value=1>Super I</option>"
    else if (id_usuario == "2034")
        contenido += "<option value=1>Super I</option>"
    else if (id_usuario == "2034")
        contenido += "<option value=1>Super I</option>"
    else if (id_usuario == "2034")
        contenido += "<option value=1>Super I</option>"
    else if (id_usuario == "2034")
        contenido += "<option value=1>Super I</option>"

    //agrega el contenido a la lista
    $("#sect_Establecimientos").append(contenido);
    //modal de carga
    $("#dialog").hide();
    
}//fin


//funcion de llenado de tabla 
function llenar_tabla_res() {
    //modal
    $("#dialog").show();

    remover_datos_tabla();

    //checamos si hay fechas seleccionadas
    if ($("#fecha_inicio").val() != "" && $("#fecha_termino").val() != "") {
        //si el valor es el de por defecto
        if ($("#sect_Establecimientos").val() == 0) {
            alert("¡seleccione Establecimiento(s)!");
        }//fin if
            //si en valor es numerico y mayor al de por defecto
        else if ($("#sect_Establecimientos").val() > 0) {
            //funcion para obtener por establecimiento
            obtener_datos_por_establecimiento()
        }//fin if
            //si el valor no es numerico y es igual a 'todos'
        else if ($("#sect_Establecimientos").val() == "todos") {
            //  alert("usted selecciono reporte de todos los establecimientos");
            
            obtener_datos_todos_establecimiento();
        }//fin
    }//fin fechas
    else
        alert("seleccione fechas");
    $("#dialog").hide();
}//fin
//funcion para obtener todos los establecimiento
function obtener_datos_todos_establecimiento() {
    var lista_datos = conexion_cuestionarios_resuelto();
    var contenido = "";
    var sucursal = "";
    var indice = 1;
    if (lista_datos.length > 0 ) {
        $.each(lista_datos, function (index, item) {
                if (index == 0) {
                    contenido = "<tr  class='celda_tabla_res' style='background-color:#cbf1f5' ><th style='width:60px'>#</th><th style='width:30%'>"+item.establecimiento+"</th><th style='width:60px' >limpieza %</th><th style='width:60px'>Surtido %</th><th style='width:60px'>Imagen %</th><th style='width:60px'>Total %</th></tr>"
                    $("#tabla_res").append(contenido);
                    sucursal=item.establecimiento;
                }//fin if
                if (sucursal == item.establecimiento) {
                    contenido = "<tr  class='celda_tabla_res dato'><td style='width:60px'>" + indice + "</td><td class='nombre' style='width:30%'>" + item.cuestionario + "</td><td style='width:90px' >" + item.limpieza + "</td><td style='width:90px'>" + item.surtido + "</td><td style='width:90px'>" + item.imagen + "</td><td style='width:60px'>" + item.total + "</td></tr>"
                    $("#tabla_res").append(contenido);
                    indice++;
                }
                else {
                    indice = 1;
                contenido = "<tr  class='celda_tabla_res' style='background-color:#cbf1f5' ><th style='width:60px'>#</th><th style='width:30%'>" + item.establecimiento + "</th><th style='width:60px' >limpieza %</th><th style='width:60px'>Surtido %</th><th style='width:60px'>Imagen %</th><th style='width:60px'>Total %</th></tr>"
                $("#tabla_res").append(contenido);
                contenido = "<tr  class='celda_tabla_res dato'><td style='width:60px'>" + indice + "</td><td class='nombre' style='width:30%'>" + item.cuestionario + "</td><td style='width:90px' >" + item.limpieza + "</td><td style='width:90px'>" + item.surtido + "</td><td style='width:90px'>" + item.imagen + "</td><td style='width:60px'>" + item.total + "</td></tr>"
                $("#tabla_res").append(contenido);
                sucursal = item.establecimiento;
                indice++;
            }//fin if
        });
    }//fin
    else alert("No Hay Datos...");
}//fin
//funcion para obtener por establecimiento
function obtener_datos_por_establecimiento() {
    var lista = conexion_resultados();
    //var promedios = conexion_resultados_promedio_por_fecha();
    var contenido = "";
    var fecha = "";

    //removemos los datos previos de la tabla

    //checamos si la tabla tiene datos
    if (lista.length > 0) {
        $(".celda_tabla_res").remove();
        $.each(lista, function (index, item) {

            //obtenemos el nombre de usuario por medio de una consulta
            //var nombre_cuest = nombres_cuestionarios_por_folio(item.zona);
            var cuestionario = resultados_cuestionario_por_dia(item.fecha, item.id_cuestionario);

            if (index == 0) {
                fecha = item.fecha;
               // console.log(fecha + ">");
                //creamos el contenido
                contenido = " <tr class='celda_tabla_res fecha'> <td id='indice'colspan='6' > " + nombre_fecha(fecha) + "<td></tr><tr class='celda_tabla_res'> <th>#</th><th>CUESTIONARIO</th> <th>LIMPIEZA %</th> <th>SURTIDO % </th> <th>IMAGEN %</th> <th>APLICADOR</th> </tr>"
               // $("#tabla_res").append(contenido);
            }//fin if
            if (fecha == item.fecha) {

                //creamos el contenido
                contenido += "  <tr class='celda_tabla_res dato' onclick='llenar_modal_cuestionarios(\"" + item.fecha + "\"," + item.id_cuestionario + ")'> <td id='indice'>" + item.id_cuestionario + "</td><td class='nombre'  >" + cuestionario.cuestionario + "</td> <td id='zona_lim' >" + cuestionario.limpieza + "</td> <td id='zona_surt' >" + cuestionario.surtido + "</td> <td id='zona_imag' >" + cuestionario.imagen + "</td> <td id='zona_aplicador'>" + item.aplicador + "</td> </tr>";
                //$("#tabla_res").append(contenido);
                //llenamos los datos de pie
           }//fin if
            else if (fecha != item.fecha) {

              //$("#tabla_res").append(contenido);

                var promedio = conexion_resultados_promedio_por_fecha(fecha);

                // console.log(promedios[contador_fecha].fecha + ":" + promedios[contador_fecha].aspecto+":"+promedios[contador_fecha].aspecto);
                fecha = item.fecha;
                //creamos el contenido
                contenido += " <tr class='celda_tabla_res'><th colspan='2'>Total:</th> <th>" + promedio.limpieza + "</th> <th>" + promedio.surtido + "</th> <th>" + promedio.imagen + "</th><th>" + promedio.total + "</th> </tr><tr class='celda_tabla_res  fecha'> <td id='indice'colspan='6' > " + nombre_fecha(fecha) + "<td> <tr class='celda_tabla_res'> <th>#</th><th>CUESTIONARIO</th> <th>LIMPIEZA %</th> <th>SURTIDO %</th> <th>IMAGEN %</th> <th>APLICADOR</th> </tr> </tr><tr class='celda_tabla_res dato'  onclick='llenar_modal_cuestionarios(\"" + item.fecha + "\"," + item.id_cuestionario + ")' > <td id='indice'>" + item.id_cuestionario + "</td><td class='nombre' >" + cuestionario.cuestionario + "</td> <td id='zona_lim' >" + cuestionario.limpieza + "</td> <td id='zona_surt' >" + cuestionario.surtido + "</td> <td id='zona_imag' >" + cuestionario.imagen + "</td> <td id='zona_aplicador'>" + item.aplicador + "</td> <</tr>"
               // $("#tabla_res").append(contenido);
              
            }//fin if

       });
        var promedio = conexion_resultados_promedio_por_fecha(fecha);
        contenido += " <tr class='celda_tabla_res'><th colspan='2'>Total:</th> <th>" + promedio.limpieza + "</th> <th>" + promedio.surtido + "</th> <th>" + promedio.imagen + "</th><th>" + promedio.total + "</th></tr>"
        $("#tabla_res").append(contenido);
        //ajustamos los decimales de total 
        // total_limpieza = r(total_limpieza) ;
        //total_limpieza = Math.round(total_limpieza);
        //total_limpieza = total_limpieza / 100;
        var totales = conexion_resultados_ckl_total_por_fechas_establecimiento();
        //console.log(r(total_limpieza / contador) + ":" + r(total_surtido / contador) + ":" + r(total_imagen / contador));
        $("#total_limpieza").val(totales.limpieza), $("#total_surtido").val(totales.surtido), $("#total_imagen").val(totales.imagen);
        var res = (total_limpieza + total_surtido + total_imagen);
        //console.log(res);
        $("#total_neto").val(totales.total);

    }//fin
        //si no hay datos manda una advertencia
    else {
        alert("No Hay Datos...");
    }

}//fin
//llamar modal con datos de cuestionario***********************************************************************************
function llenar_modal_cuestionarios(fecha, cuestionario) {
    //deshabilitamos los textbox
    $("#cuadro_resultado_total_si").prop("disabled", true);
    $("#cuadro_resultado_total_no").prop("disabled", true);
    $("#cuadro_resultado_total_na").prop("disabled", true);
    $("#cuadro_resultado_total_porcentual").prop("disabled", true);

    $("#cuadro_resultado_total_si").val("");
    $("#cuadro_resultado_total_no").val("");
    $("#cuadro_resultado_total_na").val("");
    $("#cuadro_resultado_total_porcentual").val("");
    //mostramos la modal
    $("#respuestas").show();
    //llama al cuestionario por fecha
    var cuestionario_dat = conexion_reultados_ckl_parcial(fecha, cuestionario);
    //creamos el contenedor de datos
    var datos_a_tabla = "";
    //damos evento a btn cerrar
    $("#btn_cancelar_respuestas").on('click', function () {
        $("#respuestas").hide();
        $(".datos_cuestionario_m").remove();
    });
    var total,indice_zona=1,sum_si=0,sum_no=0,sum_na=0;
    var nombre= nombres_cuestionarios_por_folio(cuestionario)

    datos_a_tabla = " <tr  class='datos_cuestionario_m'><th style='width:50px' >#</th><th class='nombre' >" + nombre + "</th><th style='width:50px'>SI</th><th style='width:50px'>NO</th><th style='width:50px'>NA</th>  </tr>";
    //recorremos el cuestionario
    $.each(cuestionario_dat, function (index, item) {
        var si="", no="", na="";
        if (item.respuesta==1)
            si = item.respuesta,sum_si++;
        else if (item.respuesta==0)
            no = item.respuesta,sum_no++;
        else if (item.respuesta==2)
            na = "N/A",sum_na++;

        datos_a_tabla += "<tr class='datos_cuestionario_m dato'><td style='width:50px' >" + item.criterio_cuestion + "</td> <td  class='nombre'>" + item.datos_pregunta + "</td><td>" + si + "</td><td>" + no + "</td><td>" + na + "</td></tr>";
        indice_zona++;
    });
    $("#tablaRespuestas").append(datos_a_tabla);

    $("#cuadro_resultado_total_si").val(parseInt ( sum_si));
    $("#cuadro_resultado_total_no").val(parseInt (sum_no));
    $("#cuadro_resultado_total_na").val(parseInt (sum_na));
    total = sum_si / (sum_si + sum_no);
    total = total * 1000;
    total = Math.round(total);
    $("#cuadro_resultado_total_porcentual").val(total/10);

}//fin


    //funcion remover tablas
    function remover_datos_tabla() {

        $("#total_limpieza").val(""), $("#total_surtido").val(""), $("#total_imagen").val(""), $("#total_neto").val("");

        $('.celda_tabla_res').remove();

        if ($("#sect_Establecimientos").val() == "todos")
            $(".cuadros_totales").hide();
        else

            $(".cuadros_totales").show();


    }//fin

    /**************************************************************
                      funciones ajax
    ***************************************************************/

    //funcion de conexion para obtener establecimuentos
    function conexion_establecimientos() {
        var url = "servicios/checkListServ.asmx/buscar_establecimiento";
        var respuesta;

        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: url,
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
            }//fin complete.
        });//fin llamada ajax
        return respuesta.d;

    }//fin

    //funcion conexion resultados a tabla
    function conexion_resultados() {
        var url = "servicios/checkListServ.asmx/consulta_cuestionarios_por_fechas";
        var respuesta;
        //obtiene la fecha de inicio
        var f = $('#fecha_inicio').val();
        //convertimos la fecha al formato para revisar en bd
        f = f[8] + f[9] + "/" + f[5] + f[6] + "/" + f[0] + f[1] + f[2] + f[3];
        //obtiene la fecha final
        var f2 = $('#fecha_termino').val();
        //convertimos la fecha al formato para revisar en bd
        f2 = f2[8] + f2[9] + "/" + f2[5] + f2[6] + "/" + f2[0] + f2[1] + f2[2] + f2[3];
        //datos JSON a enviar
        var objDatos = {
            "establecimiento": $("#sect_Establecimientos").val(),
            "f_inicio": f,
            "f_termino":f2
        }
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: url,
            data: JSON.stringify(objDatos),
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
            }//fin complete.
        });//fin llamada ajax
        return respuesta.d;
    }//fin

    //obtiene el nombre del cuestionario por su folio
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
    //funcion para resibir las respuestas contestadas por sucursal y fecha*********************************************************listo
    function conexion_reultados_ckl_total(fecha) {
        var folio_sucursal = $('#sect_Establecimientos').val();
        var f = fecha;
        var urlC = "servicios/checkListServ.asmx/conexion_reultados_ckl_total";
        var resultado;

        //creamos el objeto
        var datos = { 'folio_sucursal': folio_sucursal, 'fecha': f };

        //hacemos la peticion post de ajax
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: urlC,
            data: JSON.stringify(datos),
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos.
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
                $("#dialog").show();
            },
            complete: function (response) {
                $("#dialog").hide();
                resultado = response.responseText;
                resultado = JSON.parse(resultado);
            }
        });

        return resultado.d;
    }//fin
    function conexion_reultados_ckl_parcial(fecha, zona) {
        var f = fecha;
        var urlC = "servicios/checkListServ.asmx/conexion_reultados_parcial";
        var resultado;

        //creamos el objeto
        var datos = { 'folio_sucursal': $("#sect_Establecimientos").val(), 'fecha': f, 'zona': zona };

        //hacemos la peticion post de ajax
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: urlC,
            data: JSON.stringify(datos),
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos.
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
                $("#dialog").show();
            },
            complete: function (response) {
                $("#dialog").hide();
                resultado = response.responseText;
                resultado = JSON.parse(resultado);
            }
        });

        return resultado.d;
    }//fin
    //funcion que recibe los datos de promedio por fecha 
    //funcion conexion resultados a tabla
    function resultados_cuestionario_por_dia(f ,cuestionario) {
        var url = "servicios/checkListServ.asmx/resultados_cuestionario_por_dia";
        var respuesta;
  
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: url,
            data: JSON.stringify({
                "establecimiento": $("#sect_Establecimientos").val(),
                "fecha": f,
                "cuestionario": cuestionario
            }),
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
            }//fin complete.
        });//fin llamada ajax
        var promedio = { 'cuestionario': '', 'imagen': '--', 'limpieza': '--', 'surtido': '--' };
        $.each( respuesta.d, function (index, item) {
            if (item.aspecto == "IMAGEN" && item.total_pregunta>0) { promedio.imagen = item.promedio }
            else if (item.aspecto == "LIMPIEZA" && item.total_pregunta > 0) { promedio.limpieza = item.promedio }
            else if (item.aspecto == "SURTIDO" && item.total_pregunta > 0) { promedio.surtido = item.promedio }
        });
        promedio.cuestionario = respuesta.d[respuesta.d.length - 1].cuestionario
        return promedio;    
    }//fin
    function conexion_resultados_promedio_por_fecha(f) {
        var url = "servicios/checkListServ.asmx/resultados_cuestionario_por_fechas_establecimiento";
        var respuesta;
        //obtiene la fecha de inicio
        //var f = $('#fecha_inicio').val();
        //convertimos la fecha al formato para revisar en bd
        // f = f[8] + f[9] + "/" + f[5] + f[6] + "/" + f[0] + f[1] + f[2] + f[3];


        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: url,
            data: JSON.stringify({
                "establecimiento": $("#sect_Establecimientos").val(),
                "fecha": f
            }),
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
            }//fin complete.
        });//fin llamada ajax


        var promedio = { 'imagen': '--', 'limpieza': '--', 'surtido': '--', 'total': "--" }, sum = 0, cont = 0;
        $.each(respuesta.d, function (index, item) {
            if (item.aspecto == "IMAGEN" && item.cantidad_total > 0) { promedio.imagen = item.promedio, cont++, sum += item.promedio }
            else if (item.aspecto == "LIMPIEZA" && item.cantidad_total > 0) { promedio.limpieza = item.promedio, cont++, sum += item.promedio }
            else if (item.aspecto == "SURTIDO" && item.cantidad_total > 0) { promedio.surtido = item.promedio, cont++, sum += item.promedio }
        });

        promedio.total = r(sum / cont);
        return  promedio;
    }//fin
    //funcion de total resultados ckl por fechas y establecimiento

    function conexion_resultados_ckl_total_por_fechas_establecimiento() {
        var url = "servicios/checkListServ.asmx/resultados_ckl_total_por_fechas_establecimiento ";
        var respuesta;
        //obtiene la fecha de inicio
        var f = $('#fecha_inicio').val();
        //convertimos la fecha al formato para revisar en bd
        f = f[8] + f[9] + "/" + f[5] + f[6] + "/" + f[0] + f[1] + f[2] + f[3];
        //obtiene la fecha final
        var f2 = $('#fecha_termino').val();
        //convertimos la fecha al formato para revisar en bd
        f2 = f2[8] + f2[9] + "/" + f2[5] + f2[6] + "/" + f2[0] + f2[1] + f2[2] + f2[3];
        //datos JSON a enviar
        var objDatos = {
            "id_sucursal": $("#sect_Establecimientos").val(),
            "f_inicio": f,
            "f_termino": f2
        }
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: url,
            data: JSON.stringify(objDatos),
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
            }//fin complete.
        });//fin llamada ajax

        var promedio = { 'imagen': '--', 'limpieza': '--', 'surtido': '--', 'total': 0 },sum=0, cont = 0;
        $.each(respuesta.d, function (index, item) {
            if (item.aspecto == "IMAGEN" && item.cantidad_total_preguntas>0) { promedio.imagen = item.promedio, cont++, sum += item.promedio }
            else if (item.aspecto == "LIMPIEZA" && item.cantidad_total_preguntas > 0) { promedio.limpieza = item.promedio, cont++, sum += item.promedio }
            else if (item.aspecto == "SURTIDO" && item.cantidad_total_preguntas > 0 && item.cantidad_total_preguntas > 0) { promedio.surtido = item.promedio, cont++, sum += item.promedio }
        });

        promedio.total = r(sum / cont);
        return promedio;
    }//fin
function conexion_resultados_cuestionarios_todos_establecimiento_por_fechas(establecimiento,cuestionario) {
        var respuesta;
        var f = $('#fecha_inicio').val();
        //convertimos la fecha al formato para revisar en bd
        f = f[8] + f[9] + "/" + f[5] + f[6] + "/" + f[0] + f[1] + f[2] + f[3];
        var f2 = $('#fecha_termino').val();
        //convertimos la fecha al formato para revisar en bd
        f2 = f2[8] + f2[9] + "/" + f2[5] + f2[6] + "/" + f2[0] + f2[1] + f2[2] + f2[3];
        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: "servicios/checkListServ.asmx/resultados_cuestionarios_total_por_fechas ",
            data: JSON.stringify({
                "inicio": f,
                "fin": f2,
                "establecimiento": establecimiento,
                "cuestionario": cuestionario
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos.
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
                $("#dialog").show();
            }//fin beforeSend.
            , complete: function (response) {
                //response = JSON.stringify(response);
                respuesta = response.responseText;
                //  console.log(response);//respuesta. responseText
                respuesta = JSON.parse(respuesta);
                $("#dialog").hide();
            }//fin complete.
        });//fin llamada ajax  
        return temporal(respuesta.d);
    }//fin

//conexion obtener  cuestionarios_resuelto
function conexion_cuestionarios_resuelto() {
    //variables a usar
    var xhttp = new XMLHttpRequest();
    var respuesta;
    var f = $('#fecha_inicio').val();
    //convertimos la fecha al formato para revisar en bd
    f = f[8] + f[9] + "/" + f[5] + f[6] + "/" + f[0] + f[1] + f[2] + f[3];
    var f2 = $('#fecha_termino').val();
    //convertimos la fecha al formato para revisar en bd
    f2 = f2[8] + f2[9] + "/" + f2[5] + f2[6] + "/" + f2[0] + f2[1] + f2[2] + f2[3];
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            respuesta = this.responseText;
            respuesta = JSON.parse(respuesta);

        }
        else if (this.status > 0)
            alert("Error:" + this.status);
    };//fin
    //llamada al servicio
    xhttp.open("post", "servicios/checkListServ.asmx/check_list_establecimientos_cuestionarios_por_fecha", false);
    //tipo de datos 
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //fatos a enviar
    xhttp.send(JSON.stringify(
        {
            "f1":f,
            "f2": f2
        }
    ));
    var datos=[];
    $.each(respuesta.d, function (index, item) {
        datos.push(conexion_resultados_cuestionarios_todos_establecimiento_por_fechas(item.id,item.folio))
    });

    return datos;
}

    $(document).ready(function () {
        $("#dialog").hide();
    });