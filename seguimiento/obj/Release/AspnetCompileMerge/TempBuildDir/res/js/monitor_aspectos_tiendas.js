$(document).ready(function () {
    filtrar_por_usuario();
    //asignamos la fefa a los date
    asignar_fecha();
    //hilo de ejecucion
    crear_hilo();
    
    //modal carga
    $("#dialog").hide()
    $("#modal_vista_observaciones").hide()
    $("#mini_modal").hide();

});
/********************************************************************
            variables Globales
********************************************************************/
var USUARIO = {}, TABLA_EVALUACION = [], ZONA_EVALUACION = {}, ASPECTOS_SUCURSALES = [], SUCURSAL = {};
/*****************************************************************
                FUNCIONES GENERALES
*****************************************************************/
function crear_hilo() {
    Concurrent.Thread.create(function () {
        while (true) {
            isFactible();
            sleep(600000)
        }
    });
    function parar(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                console.log("alto")
                return false;
                break;
            }
            else return true;
        }
    }
}//fin
//funcion checar fecha factible
function isFactible() {
    if ($("#fecha_larga").val() > "2018-05-30" && $("#fecha_larga2").val() > "2018-05-30" && $("#fecha_larga").val() <= $("#fecha_larga2").val()) {
        llenar_tabla_monitora();
        llenar_tabla_correcciones();
    } else {  alert("fecha No Valida!!!")
        asignar_fecha();
    }
}

function ordenar_datos_tabla_monitora() {
    //llamamos al servicio obtener datos
    ASPECTOS_SUCURSALES = conexion_ajax("servicios/monitor_aspectos_tiendas.asmx/obtener_aspectos_tiendas", { "fecha1": RetornoFechaCompleta($('#fecha_larga').val()), "fecha2": RetornoFechaCompleta($('#fecha_larga2').val()) });
    //creamos objeto Json a llenar
    var SUCURSAL = {
        SUCURSAL: ""
        , IMAGEN: 0
        , LIMPIEZA: 0
        , SURTIDO: 0
        , CADUCIDAD: 0
        , SEÑALIZACION:0
        , GENERALES:0
        , APLICADOR: ""
        , PROMEDIO: 0
        , TIEMPO: 0
        , TOTAL_PREGUNTAS: 0
        , CANTIDAD_NO_CUMPLIO: 0
        , FOLIO: 0
        , H_INICIO:''
        ,H_FIN:''
    };
    var arreglo = [];
    var contador = 0, suma = 0;
    var auxiliar_hora_diferencia = 0, auxiliar_hora_diferencia2 = 0;

    function asignar_promerio_llenar_sucursal(item) {
        if (item.aspecto == "SURTIDO") SUCURSAL.SURTIDO = item.promedio, contador++;
        else if (item.aspecto == "LIMPIEZA") SUCURSAL.LIMPIEZA = item.promedio, contador++;
        else if (item.aspecto == "IMAGEN") SUCURSAL.IMAGEN = item.promedio, contador++;
        else if (item.aspecto == "GENERALES") SUCURSAL.GENERALES = item.promedio, contador++;
        else if (item.aspecto == "CADUCIDAD") SUCURSAL.CADUCIDAD = item.promedio, contador++;
        else if (item.aspecto == "SEÑALIZACION") SUCURSAL.SEÑALIZACION = item.promedio, contador++;
    }
    function asignar_tiempo(item) {
        SUCURSAL.H_INICIO = item.h_inicio
        SUCURSAL.H_FIN = item.h_termino
        SUCURSAL.TIEMPO = item.diferencia
    }

    //recorremos los datos
    $.each(ASPECTOS_SUCURSALES, function (index, item) {
        //variable auxiliar al tiempo
        if (item.hora_guardado)
            var aux_hora = filtro_hora(item.hora_guardado);
        if (index == 0) { 
            SUCURSAL.SUCURSAL = item.sucursal, SUCURSAL.FOLIO = item.id_establecimiento;
            //asigna el tiempo
            asignar_tiempo(item);
        }
        if (SUCURSAL.SUCURSAL == item.sucursal) {
            asignar_promerio_llenar_sucursal(item);
            suma += item.promedio;
        }
        else  //checamos si coinciden los nombres
            if (SUCURSAL.SUCURSAL != item.sucursal) {
                SUCURSAL.PROMEDIO = Math.round(((suma / contador) * 100));
                SUCURSAL.PROMEDIO = SUCURSAL.PROMEDIO / 100;

                arreglo.push(SUCURSAL);
                if (SUCURSAL.H_INICIO != "00:00")
                //reiniciamos el objeto
                    SUCURSAL = {
                        SUCURSAL: ""
                        , IMAGEN: 0
                        , LIMPIEZA: 0
                        , SURTIDO: 0
                        , APLICADOR: ""
                        , GENERALES: 0
                        , CADUCIDAD: 0
                        , SEÑALIZACION: 0
                        , PROMEDIO: 0
                        , TIEMPO: 0
                        , TOTAL_PREGUNTAS: 0
                        , CANTIDAD_NO_CUMPLIO: 0
                        , FOLIO: 0, H_INICIO: "", H_FIN: ""
                };
                contador = 0;
                auxiliar_hora_diferencia = filtro_hora_a_entero(item.hora_guardado), auxiliar_hora_diferencia2 = filtro_hora_a_entero(item.hora_guardado)
                //reasignamos el nombre
                SUCURSAL.SUCURSAL = item.sucursal, SUCURSAL.FOLIO = item.id_establecimiento;
                asignar_promerio_llenar_sucursal(item);
                //asigna el tiempo
                asignar_tiempo(item);
            }
        while (SUCURSAL.TIEMPO > 100) {
            SUCURSAL.TIEMPO = Math.round(SUCURSAL.TIEMPO / 3);
        }
        if (SUCURSAL.TIEMPO > 70 && $("#fecha_larga").val() != $("#fecha_larga2").val()) {
            SUCURSAL.TIEMPO = Math.round(oSUCURSALbj.TIEMPO / 2);
        }
        if (SUCURSAL.TIEMPO < 20 && $("#fecha_larga").val() != $("#fecha_larga2").val() && SUCURSAL.H_INICIO > 0) {
            SUCURSAL.TIEMPO = Math.round(SUCURSAL.TIEMPO + 20);
        }

        SUCURSAL.APLICADOR = item.aplicador;
        SUCURSAL.CANTIDAD_NO_CUMPLIO = item.cantidad_total_no_cumplio;
        SUCURSAL.TOTAL_PREGUNTAS = item.total_preguntas;

    });
    //agregamos el promedo
    SUCURSAL.PROMEDIO = Math.round(((suma / contador) * 100));
    SUCURSAL.PROMEDIO = SUCURSAL.PROMEDIO / 100;
   //agregamos el objeto al arreglo
    arreglo.push(SUCURSAL);
    ASPECTOS_SUCURSALES = arreglo;
    return arreglo;
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
//funcion revisar mayor fecha
function fecha_mayor() {
    console.log($("#fecha_larga").val() + "<" + $("#t2").val())
    if ($("#t1").val() < $("#t2").val()) {
        $("#t2").val($("#t1").val())
        return true
    }
    return false
}//fin
//funcion fecha********************************************************************************
function asignar_fecha() {
    var dia = new Date(), d = dia.getDate(), m = dia.getMonth(), a = dia.getFullYear();
    m = m + 1;
    if (m < 10)  m = "0" + m;
    if (d < 10) d = "0" + d;
    var f = (a + "-" + m + "-" + d);
    // console.log("Fecha:"+f);
    $('#fecha_larga').val(f);
    $('#fecha_larga2').val(f);
}//fin
function RetornoFechaCompleta(dia) {
    var d = dia[8] + dia[9];
    var m = dia[5] + dia[6];
    var a = dia[0] + dia[1] + dia[2] + dia[3];

    return d+ "-" + m + "-" + a;
}//fin
//funcion parsear de 24 a 12
function parsear_tiempo(tiempo){
    tiempo = tiempo.split(":")
    var hora = parseInt(tiempo[0])
    //console.log(hora)
    if ( hora > 12 && hora<22)
        return "0"+(hora - 12) + ":" + tiempo[1] + " PM"
    else if (hora < 12) { 
        if (hora < 10)
            return "0" + hora + ":" + tiempo[1] + " AM"
        else return hora + ":" + tiempo[1] + " AM"
    }
    else if (hora == 12)
        return hora + ":" + tiempo[1] + " PM"
    else if (hora >= 22 && hora < 24) return (hora - 12) + ":" + tiempo[1] + " PM"
    else return "00:" + tiempo[1] + " AM"
}
//filtra la hora en datetime obtenido de sql FORMATO:"/Date(-62135503140000)/"
function filtro_hora(dato) {
    //convierte la cadena en array
    dato = dato.split("(");
    //elimina los ultimos dos signos
    dato = dato[1].slice(0, -2)
    return asignar_hora(parseInt(dato))
}
//filtra la hora en datetime obtenido de sql FORMATO:"/Date(-62135503140000)/" y retorna:-62135503140000
function filtro_hora_a_entero(dato) {
    //convierte la cadena en array
    if (dato) { 
    dato = dato.split("(");
    //elimina los ultimos dos signos
    dato = dato[1].slice(0, -2)
    return parseInt(dato)
    }
    else return 0
}
//convierte un int en hora 24
function asignar_hora(hora){
    var d = new Date(hora);
    var hora = d.getHours(), minutos = d.getMinutes()
    if (hora < 10)     hora = "0" + hora;
    if (minutos < 10)  minutos = "0" + minutos;
    return hora + ":" + minutos;
}
/*****************************************************************
                MANUPULACION DEL DOM
*****************************************************************/
function llenar_tabla_monitora(){
    var datos = ordenar_datos_tabla_monitora();
    var cuestion, total;
    $(".datos").remove()
    ASPECTOS_SUCURSALES.sort(function (a, b) {
        return a - b;
    });
    var promedio=0;
    $.each(ASPECTOS_SUCURSALES, function (index, item) {
        var filla = $("<tr class='datos' name='" + item.FOLIO + "'></tr>");
        //console.log(item.PROMEDIO)
        if (item.SUCURSAL != "Piorico") {

            if (isNaN(item.PROMEDIO) || item.APLICADOR=="") {
                item.PROMEDIO = "-- "
                item.APLICADOR = "Pendiente."
                item.TIEMPO = "--"
                item.H_INICIO = "--:--"
                item.H_FIN = "--:--"
                filla.css({ "background-color": "#c5cfcb" })
            } else {
                item.H_INICIO=parsear_tiempo(item.H_INICIO.slice(0, -6));
                item.H_FIN=parsear_tiempo(item.H_FIN.slice(0, -6))
            }
            if ($("#fecha_larga").val() != $("#fecha_larga2").val()) {
                item.H_INICIO = "--:--"
                item.H_FIN = "--:--"
                if (item.TIEMPO > 0)
                    item.APLICADOR = "Varios."
            }

            promedio= item.PROMEDIO;
            if(USUARIO.establecimiento==null){
            $("#tabla_monitora").append(
                $("<tr>").append(
                    $("<th>").append(item.SUCURSAL).css({ "font-size": "12px", "text-align": "left" })
                    , $("<td>").append(item.GENERALES + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.GENERALES) })
                    , $("<td>").append(item.SEÑALIZACION + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.SEÑALIZACION) })
                    , $("<td>").append(item.SURTIDO + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.SURTIDO) })
                    , $("<td>").append(item.CADUCIDAD + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.CADUCIDAD) })
                    , $("<td>").append(item.LIMPIEZA + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.LIMPIEZA) })
                    , $("<td>").append(item.IMAGEN +"%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.IMAGEN) })
                    , $("<td>").append(item.PROMEDIO + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.PROMEDIO) })
                    , $("<td>").append(item.APLICADOR).css({ "width": "175px", "text-align": "center" })
                    , $("<td>").append(item.TIEMPO+" Min.").css({ "width": "100px", "text-align": "center" })
                    , $("<td>").append(item.H_INICIO).css({ "width": "100px", "text-align": "center" })
                    , $("<td>").append(item.H_FIN).css({ "width": "100px", "text-align": "center" })
              ).addClass("datos").attr("name",item.FOLIO)
            );
            }
            else if (USUARIO.establecimiento == item.SUCURSAL.toUpperCase()) {
                $("#tabla_monitora").append(
               $("<tr>").append(
                   $("<th>").append(item.SUCURSAL).css({ "font-size": "12px", "text-align": "left" })
                   , $("<td>").append(item.GENERALES + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.GENERALES) })
                   , $("<td>").append(item.SEÑALIZACION + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.SEÑALIZACION) })
                   , $("<td>").append(item.SURTIDO + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.SURTIDO) })
                   , $("<td>").append(item.CADUCIDAD + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.CADUCIDAD) })
                   , $("<td>").append(item.LIMPIEZA + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.LIMPIEZA) })
                   , $("<td>").append(item.IMAGEN + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.IMAGEN) })
                   , $("<td>").append(item.PROMEDIO + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.PROMEDIO) })
                   , $("<td>").append(item.APLICADOR).css({ "width": "175px", "text-align": "center" })
                   , $("<td>").append(item.TIEMPO + " Min.").css({ "width": "100px", "text-align": "center" })
                   , $("<td>").append(item.H_INICIO).css({ "width": "100px", "text-align": "center" })
                   , $("<td>").append(item.H_FIN).css({ "width": "100px", "text-align": "center" })
             ).addClass("datos").attr("name", item.FOLIO)
           );
            }
        }
    });
    function color_estado(valor) {
        if (valor > 0) {
            if (valor <= 85) { return "red" }
            else if (valor < 90) { return "#fafc03" }
            else if (valor >= 90) { return "#62e929" }
        }
        else if (promedio > 0)
            return "#5cb5f6"
        else return" "
    }

    $(".datos").on('click', function () {
      
        $("#nom_sucursal").text($(this).children("th").text())
        llenar_tabla_vistas_evaluaciones($(this));

        $(".fila_preguntas").on('click', function () {
            cuestion = $(this).attr("name");
            TABLA_EVALUACION.forEach(function (item, index) {
                if (cuestion == (item.zona_inspeccion + item.posicion)) { ZONA_EVALUACION = item }
            });
            evento_mostrar_observaciones();
        });
    });
    function evento_mostrar_observaciones() {
        var datos = [];
        var d = 1, auxiliar = $("<p>");

        $("#datos_obs").empty();

        if (ZONA_EVALUACION.observaciones.length > 0) {
            $.each(ZONA_EVALUACION.observaciones, function (index, item) {
                if (d == 1) {
                    $("#datos_obs").append(
                     $("<h3>").append(ZONA_EVALUACION.zona_inspeccion + ":")
                     ,$("#datos_obs").append(ZONA_EVALUACION.pregunta + "")
                     ) }
                if (item != " ") {
                    $("#datos_obs").append($("<p>").append(d + "-" + item + ".").css({ "text-align": "left", "left": "40px" }))
                    d += 1;
                }
            })
            if ($("#mini_modal p").length) { $("#mini_modal").show() }
        }//fin
    }

}//fin
//llenar tabla Evaluaciones
function llenar_tabla_vistas_evaluaciones(tabla) {

    obtener_evaluaciones(tabla.attr('name'));

    function  agregar_icono_aspecto(item){
        var icon = $("<i>");
        if (item.rsi) { icon.attr({ "color": "green" ,"font-size":"30px"}).addClass("fa fa-check") }
        else if (item.rno) { icon.attr({ "color": "red", "font-size": "30px" }).addClass("fa fa-remove") }
        else if (item.rna) { icon.attr({ "color": "blue", "font-size": "30px" }).addClass("fa fa-question") }
        return icon;
    }
    function checar_aspectos(item) {
        if (item.generales) return "Generales";
        else if (item.senializacion) return "Señalizacion";
        else if (item.surtido) return "Surtido";
        else if (item.caducidad) return "Caducidad";
        else if (item.limpieza) return "Limpieza";
        else if (item.imagen) return "Imangen";
    }
    function cavecera_tabla(zona) {

      if (zona != undefined && zona !=null) {
        $("#tabla_vistas_observaciones").append(
                $("<tr>").append(
                   $("<th>").append("R:").css({ width: "50px", "text-align": "center" }).attr({ "rowspan": "1" })
                   , $("<th>").append(ZONA_EVALUACION.zona_inspeccion).attr({ "rowspan": "1" })
                   , $("<th>").append("Aspectos").attr({ "colspan": "1" })
           ).css({ "background-color": "#7ca59f ", 'font-size': '20px', "color": "#FFFFFF" })
           )
        }
    }
    function llenar_cuestiones_tabla(item) {
        if (item.pregunta != undefined) {
            if (ZONA_EVALUACION.observaciones)
            $("#tabla_vistas_observaciones").append(
                   $("<tr>").append(
                         $("<td>").append(agregar_icono_aspecto(item)).css({ "text-align": "center" })
                       , $("<td>").append(item.pregunta)
                       , $("<td>").append(checar_aspectos(item)).css({ "text-align": "center" })    
               ).addClass("fila_preguntas").attr("name", item.zona_inspeccion + item.posicion).css({ 'font-size': '14px' })
              )
         }
    }

    if (TABLA_EVALUACION.length > 0) {
    $("#modal_vista_observaciones").show()
    $("#tabla_vistas_observaciones tr").remove()
    var contador = 1, cuestionario = "";

    $.each(TABLA_EVALUACION, function (index, item) {
        if (index == 0) {
            ZONA_EVALUACION = item;
            cavecera_tabla(ZONA_EVALUACION.zona_inspeccion);
        }
        if (item.zona_inspeccion == ZONA_EVALUACION.zona_inspeccion) {
            llenar_cuestiones_tabla(item)
        }
        else if (item.zona_inspeccion != ZONA_EVALUACION.zona_inspeccion) {
            contador++;
            ZONA_EVALUACION = item;
            cavecera_tabla(item.zona_inspeccion);
            llenar_cuestiones_tabla( item);
        }
    })
        //aqui va el onclick
    }
    else alert(" No Hay Datos A Mostrar...")
}
function obtener_evaluaciones(folio_suc) {
    var d = conexion_ajax("servicios/monitor_aspectos_tiendas.asmx/procedimiento_resultados_cuestionario_por_dia1_a_dia2", { 'fecha': RetornoFechaCompleta($('#fecha_larga').val()), fecha2: RetornoFechaCompleta($('#fecha_larga2').val()), 'folio_establecimiento': folio_suc });
    TABLA_EVALUACION = [];
    var pregunta = [];
    ZONA_EVALUACION = {}
    d.forEach(function (item, indice) {
        if (indice == 0) { ZONA_EVALUACION = item }

        if (ZONA_EVALUACION.posicion == item.posicion && ZONA_EVALUACION.pregunta == item.pregunta) {
           
            if (item.observaciones.length > 2) {
                pregunta.push(item.observaciones);
            }
        }
        else if (ZONA_EVALUACION.posicion != item.posicion && ZONA_EVALUACION.pregunta != item.pregunta) {

            ZONA_EVALUACION.observaciones = pregunta;
            TABLA_EVALUACION.push(ZONA_EVALUACION);

            pregunta = [];
            ZONA_EVALUACION = item;
            pregunta.push(item.observaciones);
        }
    });
    TABLA_EVALUACION.push(ZONA_EVALUACION);
   
}

//correcciones
function llenar_tabla_correcciones() {
    $(".datos_correxion").remove()
    var datos_insidencias = conexion_ajax("servicios/monitor_aspectos_tiendas.asmx/insicencias_cuestionarios_R_sucursales_por_fechas", {
        "fecha": RetornoFechaCompleta($('#fecha_larga').val())
        , "fecha2": RetornoFechaCompleta($('#fecha_larga2').val())
    });
    var total = [];
    //********************pendiente a usar
    var insidencias_corregidas = conexion_ajax("servicios/monitor_aspectos_tiendas.asmx/resultados_insidencias_por_fechas", {
         "f1": RetornoFechaCompleta($('#fecha_larga').val())
        , "f2": RetornoFechaCompleta($('#fecha_larga2').val())
    });
    function checar_coincidencia_fecha(item) {
        if ($("#fecha_larga").val() != $("#fecha_larga2").val()) {
            item.H_inicio = "--:--"
            item.H_fin = "--:--"
            item.diferencias = "--:--"
            if (item.promedio > 0) {
                item.aplicador = "Varios."
            }
        }
    }
    function checar_promedio(item) {
        while (item.promedio > 100) {
                item.promedio = Math.round(item.promedio / 3);
            }
            if (item.promedio > 70 && $("#fecha_larga").val() != $("#fecha_larga2").val()) {
                item.promedio = Math.round(item.promedio / 2);
            }
            if (item.promedio < 20 && $("#fecha_larga").val() != $("#fecha_larga2").val() && item.H_fin > 0) {
                item.promedio = Math.round(item.promedio + 20);
            }
    }
    function agregar_a_tabla(item) {
        total = conexion_ajax("servicios/monitor_aspectos_tiendas.asmx/obtener_observaciones_por_fechas", { folio_establecimiento: item.folio_suc, fecha: RetornoFechaCompleta($('#fecha_larga').val()), fecha2: RetornoFechaCompleta($('#fecha_larga2').val()) });

        $.each(total, function (i, d) {
            d.establecimiento = item.sucursal;
            insidencias.push(d);
        })

        $("#tabla_monitora_correc").append($("<tr>").append(
               $("<th>").append(item.sucursal).css({ "font-size": "12px", "text-align": "left" })
              , $("<td>").append(total.length).css({ "width": "100px", "text-align": "center" })
              , $("<td>").append(item.insidencias).css({ "width": "100px", "text-align": "center" })
              , $("<td>").append(item.solucionadas).css({ "width": "100px", "text-align": "center" })
              , $("<td>").append(total.length - item.total).css({ "width": "100px", "text-align": "center" })
              , $("<td>").append(item.promedio + "%").css({ "width": "80px", "text-align": "center", "background-color": color_estado(item.promedio) })
              , $("<td>").append(item.aplicador).css({ "width": "175px", "text-align": "center" })
              , $("<td>").append(item.diferencias + " Min.").css({ "width": "100px", "text-align": "center" })
              , $("<td>").append(item.H_inicio).css({ "width": "140px", "text-align": "center" })
              , $("<td>").append(item.H_fin).css({ "width": "100px", "text-align": "center" })
          ).addClass("datos_correxion")
          )
    }
    var insidencias = [], datos_mostrar = [];
    $.each(datos_insidencias, function (index, item) {
        var filla = $("<tr class='datos_correxion'></tr>");
        var lim, surt, img, prom;
        if (item.total == 0) {
            item.aplicador = "Sin Aplicar."
            filla.css({ "background-color": "#c5cfcb" })
            item.promedio = "-- "
            item.H_inicio = "--:--"
            item.H_fin = "--:--"
            item.diferencias = "--:--"
            item.insidencias = "--"
            item.solucionadas="--"
        }
        else {
            item.H_inicio = parsear_tiempo(item.H_inicio.slice(0, -6))
            item.H_fin = parsear_tiempo(item.H_fin.slice(0, -6))
        }

        if (item.sucursal != "Piorico" ) {
            if (USUARIO.establecimiento==null) {
            checar_promedio(item);
            checar_coincidencia_fecha(item);
            agregar_a_tabla(item);
            }
            else if (USUARIO.establecimiento.toUpperCase() == item.sucursal.toUpperCase()) {
                checar_promedio(item);
                checar_coincidencia_fecha(item);
                agregar_a_tabla(item);
            }
        }
    });
    $("#tabla_monitora_correc").sort(function (a, b) {
        return a - b;
    });

    function color_estado(valor) {
        if (valor > 0) {
            if (valor <= 85) { return "red" }
            else if (valor < 90) { return "#fafc03" }
            else if (valor >= 90) { return "#62e929" }   
        }
        else if(valor == 0)
            return "#5cb5f6"
        else return "#c5cfcb"  
    }
    $(".datos_correxion").on('click', function () {
        datos_mostrar = [];
        var establecimiento = $(this).children("th").text();
               
        $.each(insidencias, function (index, item) {
                    if (establecimiento == item.establecimiento) {
                        datos_mostrar.push(item)
                    }  
                });
        if (datos_mostrar.length > 0) {
            $("#nom_sucursal").text(establecimiento)
            llenar_tabla_vistas_observaciones()
        }
        else alert("No Hay Datos A Mostrar...")
    })

    //esta funcion se encarga de llenar la tabla de observaciones
    function llenar_tabla_vistas_observaciones() {
        $("#modal_vista_observaciones").show()
        $("#tabla_vistas_observaciones tr").remove()

        var cuestionario, pregunta, indice_cues, indice_preg = 1;
        $.each(datos_mostrar, function (index, item) {
            //*********aqui se va a usar pendiente 
            var fillas = $("<tr></tr>")
            if (item.folio > 0) {
                //recorre las incidencias corregidas para reasignar la respuesta
                $.each(insidencias_corregidas, function (i, t) {
                    if (t.insidencias == item.folio) {
                        item.respuesta = t.solucionadas;
                    }
                })
                if (index == 0) {
                    cuestionario = item.cuestionario
                    pregunta = item.pregunta
 
                    $("#tabla_vistas_observaciones").append(
                        $("<tr>").append(
                            $("<th colspan='2'>").append(cuestionario).css({ "background-color": "#c5cfcb" }))
                       , $("<tr>").append(
                            $("<td >").append(indice_preg).css({ "background-color": "#c5cfaf" })
                          , $("<td >").append(pregunta).css({ "background-color": "#c5cfaf" }))
                    )
                   indice_preg++
                }
                if (cuestionario == item.cuestionario) {

                    if (pregunta != item.pregunta) {
                        cuestionario = item.cuestionario
                        pregunta = item.pregunta

                        $("#tabla_vistas_observaciones").append(
                            $("<tr>").append(
                                $("<td>").append(indice_preg).css({ "background-color": "#c5cfaf" })
                              , $("<td>").append(pregunta).css({ "background-color": "#c5cfaf" })
                         ))
                        indice_preg++
                    }
                } else if (cuestionario != item.cuestionario) {
                    cuestionario = item.cuestionario
                    pregunta = item.pregunta
                    $("#tabla_vistas_observaciones").append(
                         $("<tr>").append(
                            $("<th colspan='2'>").append(cuestionario).css({ "background-color": "#c5cfcb" }))
                         ,$("<tr>").append(
                            $("<td colspan='1'>").append(indice_preg).css({ "background-color": "#c5cfaf" })
                          , $("<td colspan='1'>").append(pregunta).css({ "background-color": "#c5cfaf" }))
                         )
                    indice_preg++
                }
                $("#tabla_vistas_observaciones").append(
                    $("<tr>").append(
                        $("<td>").append((index + 1)).css({ width: "50px", "text-align": "center" })
                      , $("<td>").append(item.observaciones).css({ "background-color": bg_estado(item.respuesta) })
                  ))}
        })
        function bg_estado(valor) {
            if (valor == 1) { return "rgb(149, 251, 0)" }
            else if (valor == 0) { return "red" }
            else return ""
        }
    }

    return insidencias
}//fin
function filtrar_por_usuario() {
    USUARIO = conexion_ajax("../servicios/monitor_cumplimiento_cuadrantesServ.asmx/establecimiento_pertenece_empleado"
           , {
               usuario: $("#Label1").text()
           });
}


