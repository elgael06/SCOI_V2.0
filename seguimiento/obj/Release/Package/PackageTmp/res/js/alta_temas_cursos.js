$(document).ready(function () {
    // $("#imagen").on('change', updateImageDisplay());
    $("#agregar_a_tabla").attr("disabled", true)
    $("#subir_orden").attr("disabled", true)
    $("#bajar_orden").attr("disabled", true)
    $("#borrar_activo").attr("disabled", true)
    $("#contador_tiempo_i").attr("disabled", true)
    $("#contador_tiempo_f").attr("disabled", true)
    reset_datos()
    $("#selector_cursos").focus()
    if ($("#selector_cursos")) {
        evento_botones()
    }
    llenar_lista_cursos()

});
//variables globales
var arreglo_imagenes = [];
var TEMAS_TABLA = [];
var POSICION_TEMPORAL_TEMA = 0;
var FOLIOS_A_ELIMINAR = [];

//funcion para restaurar estado inicial datos
function reset_datos() {
    $("#nombre_tema").val("")
    $("textarea").val("")
    $("#img").attr("src", IMAGEN_PRINCIPAL)
    $("#agregar_a_tabla").attr("disabled", true)
    $("#modificar_a_tabla").attr("disabled", true)
    $("#contador_tiempo_i").val("00:10")
    $("#contador_tiempo_f").val("00:20")
    esatus_contenedores(false)
}
//activar desactivar contenedores
function esatus_contenedores(estado){
    $("#nombre_tema").attr("disabled", !estado)
    $("textarea").attr("disabled", !estado)
    $("#selector_imag").attr("disabled", !estado)

}
//activa la seleccion de la imagen y obtiene su codigo base64
function evento_obtener_base64_imagen() {
    $("#inp").on("change", function () {
        if (this.files && this.files[0]) {
            var archivo = new FileReader();
            archivo.onload = function (e) {
                $("#img").attr("src", e.target.result);
            };
            archivo.readAsDataURL(this.files[0]);
        }
    })  
}
function obtener_imagen() {

    var folio_curso = function () {
        var dato = "";
        $("#cursos option").each(function (index, item) {
            if ($("#selector_cursos").val() == $(this).val())
                dato = parseInt($(this).attr("name"));
        })
        return dato;
    }()

    $.each(TEMAS_TABLA, function (index, item) {
        var folio_orden = item.folio_orden

        var xhttp = new XMLHttpRequest();
        var respuesta = "";
        xhttp.onreadystatechange = function () {//checamos si hay resultado
            if (this.readyState == 4 && this.status == 200) {
                respuesta = this.responseText;//cachamos el resultado
                respuesta = JSON.parse(respuesta);//parseamos a Json
                item.imagen = respuesta.d
            }//si no hay resultado manda una alerta
            else if (this.status > 200)
                alert("Error:" + this.status);
        };//fin
        //llamada al servicio
        xhttp.open("post", "/servicios/dh_cursos.asmx/obtener_imagen", true);
        //tipo de datos 
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        //Datos a enviar
        xhttp.send(JSON.stringify({ "folio_curso": folio_curso, "folio_orden": folio_orden }));

    })
}
//manejo de eventos
function evento_botones() {
    
    //botonera
    $("#btNuevo").on("click", function () {
        if ($("#selector_cursos").val() != "") {
            reset_datos()
            esatus_contenedores(true);
            $("#nombre_tema").focus()
            esatus_contenedores(true)
            $("#selector_cursos").attr("disabled", true)
            $("#agregar_a_tabla").attr("disabled", false)
            $("#subir_orden").attr("disabled", true)
            $("#bajar_orden").attr("disabled", true)
            $("#borrar_activo").attr("disabled", true)
            $("#contador_tiempo_i").attr("disabled", false)
            $("#contador_tiempo_f").attr("disabled", false)

            $(".datos_temas").removeClass("activo")
        }
        else esatus_contenedores(false)
    });
    $("#btEditar").on("click", function () {
        if ($("#selector_cursos").val() != "" && $("#nombre_tema").val() ) {
            esatus_contenedores(true);
            $("#nombre_tema").focus()
            $("#selector_cursos").attr("disabled", true)
            $("#modificar_a_tabla").attr("disabled", false)
            $("#contador_tiempo_i").attr("disabled", false)
            $("#contador_tiempo_f").attr("disabled", false)
        }
    });
    $("#btDeshacer").on("click", function () {
        //$("#selector_cursos").val("")
        $("#selector_cursos").focus()
        reset_datos()
        $("#selector_cursos").attr("disabled", false)
        $("#subir_orden").attr("disabled", true)
        $("#bajar_orden").attr("disabled", true)
        $("#borrar_activo").attr("disabled", true)

        $("#contador_tiempo_i").attr("disabled", true)
        $("#contador_tiempo_f").attr("disabled", true)

        $(".datos_temas").removeClass("activo")
    });
    $("#btGuardar").on("click", function () {
        $(".datos_temas").removeClass("activo")
        guardar_datos_tema()
        reset_datos()
        $(".datos_temas").remove()
        $("#selector_cursos").attr("disabled", false)
        $("#subir_orden").attr("disabled", true)
        $("#bajar_orden").attr("disabled", true)
        $("#borrar_activo").attr("disabled", true)

        $("#contador_tiempo_i").attr("disabled", true)
        $("#contador_tiempo_f").attr("disabled", true)

        $("#selector_cursos").val("")

    });
    $("#selector_imag").on("click", function () {
        $("#inp").click()
    })
    //cabio de datos nombre curso
    $("#selector_cursos").on("change", function () {
        reset_datos()
        FOLIOS_A_ELIMINAR = [];
        $(".datos_temas").remove()
        if ($(this).val() != "") {
            TEMAS_TABLA = conexion_ajax("/servicios/dh_cursos.asmx/obtener_datos_temas_folio", {
                folio: function () {
                    var dato = "";
                    $("#cursos option").each(function (index, item) {
                        if ($("#selector_cursos").val() == $(this).val())
                            dato = parseInt($(this).attr("name"));
                    })
                    return dato;
                }()
            })
            if (TEMAS_TABLA.length < 1) { alert("No A ingresado Temas Aun!!!") }
            //parsemanos la fecha de date a string
            $.each(TEMAS_TABLA, function (ind, itm) {
                itm.fecha = fechaCompletaDato(itm.fecha)
            })
            //llamamos de forma asincrona las imagenes
            obtener_imagen()
            llenar_tabla()
        }
       
    })
    //boton  agregar a tabla
    $("#agregar_a_tabla").on("click", function () {
        if ($("#nombre_tema").val() != "" && $("#img").attr("src")!="") {
            agregar_a_tabla()
            reset_datos()
            $("#selector_cursos").attr("disabled", false)
            $("#subir_orden").attr("disabled", true)
            $("#bajar_orden").attr("disabled", true)
            $("#borrar_activo").attr("disabled", true)

            $("#contador_tiempo_i").attr("disabled", true)
            $("#contador_tiempo_f").attr("disabled", true)
        }
        else alert("Falta El Nombre!!!")
    })
    $("#modificar_a_tabla").on("click", function () {
        if ($("#nombre_tema").val() != "") {
            modificar_a_tabla()
            reset_datos()
            $("#selector_cursos").attr("disabled", false)
            $("#subir_orden").attr("disabled", true)

            $("#bajar_orden").attr("disabled", true)
            $("#borrar_activo").attr("disabled", true)

            $("#contador_tiempo_i").attr("disabled", true)
            $("#contador_tiempo_f").attr("disabled", true)
        }
        else alert("Falta El Nombre!!!")
    })
    //boton obtener base64
    evento_obtener_base64_imagen()
    //evento subir tabla
    $("#subir_orden").on("click", function () {
        cambiar_orden_tabla(-1)
    })
    //evento bajar tabla
    $("#bajar_orden").on("click", function () {
        cambiar_orden_tabla(1)
    })
    //evento bajar tabla
    $("#borrar_activo").on("click", function () {
        if (confirm("Desea Eliminar Este TEMA?")) {
            borrar_de_tabla()
        }
    })
    
}

//funcion agregar datos a tabla
function agregar_a_tabla() {
    //agregamos los datos al objeto
    TEMAS_TABLA.push({
        folio_orden: ($(".datos_temas").length + 1)
        , nombre: $("#nombre_tema").val()
        , contenido: $("textarea").val()
        , imagen: $("#img").attr("src")
        , usuario: $("#Label1").text()
        , fecha: fechaCompleta()
        , tiempo_min: $("#contador_tiempo_i").val()
        , tiempo_max: $("#contador_tiempo_f").val()
    });
    //llenamos la tabla con el objeto
    llenar_tabla()
}
//funcion MODIFICAR datos a tabla
function modificar_a_tabla() {
    //modificamos el objeto dentro del arreglo
    TEMAS_TABLA[POSICION_TEMPORAL_TEMA - 1].nombre    = $("#nombre_tema").val()
    TEMAS_TABLA[POSICION_TEMPORAL_TEMA - 1].contenido = $("textarea").val()
    TEMAS_TABLA[POSICION_TEMPORAL_TEMA - 1].imagen    = $("#img").attr("src")
    TEMAS_TABLA[POSICION_TEMPORAL_TEMA - 1].usuario   = $("#Label1").text()
    TEMAS_TABLA[POSICION_TEMPORAL_TEMA - 1].fecha     = fechaCompleta()
    TEMAS_TABLA[POSICION_TEMPORAL_TEMA - 1].tiempo_min= $("#contador_tiempo_i").val()
    TEMAS_TABLA[POSICION_TEMPORAL_TEMA - 1].tiempo_max= $("#contador_tiempo_f").val()
    //llenamos la tabla ccon el objeto
    llenar_tabla()
}
//funcion guardar dartos
function guardar_datos_tema() {

    //objeto que contendra los datos del curso
    var objeto_tema = {
        //datos estaticos
        folio_curso: function () {
            var dato = 0;
            $("#cursos option").each(function (index, item) {
                if ($("#selector_cursos").val() == $(this).val())
                    dato = parseInt($(this).attr("name"));
            })
            return dato;
        }()

        //arreglo 
        , folio_empleado_scoi: id_usuario
        , contenido: ""
        , imagen: ""
        , tema: ""
        , folio_orden: ""
        , tiempo_min: ""
        , tiempo_max: ""
    }

    //arreglos que conteneran los datos de la tabla
    var contenidos = [], imagenes = [], temas = [], folio_ordenes = [],tiempo1=[],tiempo2=[];

    //recorremos el dato
    $.each(TEMAS_TABLA, function (indice, dato) {
        contenidos.push(dato.contenido)
        imagenes.push(dato.imagen)
        temas.push(dato.nombre)
        folio_ordenes.push(dato.folio_orden)
        tiempo1.push(dato.tiempo_min)
        tiempo2.push(dato.tiempo_max)
    })

    //agregamos los arreglos al objeto
    objeto_tema.contenido   = contenidos
    objeto_tema.imagen      = imagenes
    objeto_tema.tema        = temas
    objeto_tema.folio_orden = folio_ordenes
    objeto_tema.tiempo_min  = tiempo1
    objeto_tema.tiempo_max  = tiempo2

    //enviar los datos
    conexion_ajax("/servicios/dh_cursos.asmx/Guardar_actualizar_temas_curso", objeto_tema)
    return objeto_tema
}
//modificar el orden de la tabla
function cambiar_orden_tabla(mover) {
    var auxiliar_dato, ultimo_auxiliar = TEMAS_TABLA[TEMAS_TABLA.length - 1].folio_orden;

    //asiganos la nueva posicion
    auxiliar_dato = parseInt(POSICION_TEMPORAL_TEMA)
    POSICION_TEMPORAL_TEMA = parseInt(POSICION_TEMPORAL_TEMA) + mover;

    //recorremos el arreglo de objetos
    $.each(TEMAS_TABLA, function (index, item) {

        //asignamos la posicion activa a la posicion a mover    
        if (item.folio_orden == POSICION_TEMPORAL_TEMA && POSICION_TEMPORAL_TEMA > 0 && POSICION_TEMPORAL_TEMA <= ultimo_auxiliar) {
            item.folio_orden = auxiliar_dato;
        }
        else if (item.folio_orden == auxiliar_dato && POSICION_TEMPORAL_TEMA > 0 && POSICION_TEMPORAL_TEMA <= ultimo_auxiliar) {
            item.folio_orden = POSICION_TEMPORAL_TEMA;
        }
        else if (POSICION_TEMPORAL_TEMA >= ultimo_auxiliar) {
            POSICION_TEMPORAL_TEMA = ultimo_auxiliar;
        }
        else if (POSICION_TEMPORAL_TEMA == 0) {
            POSICION_TEMPORAL_TEMA = 1;
        }
    })
    //ordenamos de menor a mayor los objetos
    TEMAS_TABLA.sort(function (a, b) {
        if (a.folio_orden > b.folio_orden) { return 1 } if (a.folio_orden < b.folio_orden) { return -1 } return 0;
    });
    //llenar tabla temas
    llenar_tabla()
    //activamos la celda seleccionada
    $("#tabla_temas tr").each(function (indice, item) {
        if (parseInt($(this).children(":nth-child(1)").text()) == POSICION_TEMPORAL_TEMA){
            $(this).addClass("activo")
        }
        
    });

}
//borrar datos tabla activos
function borrar_de_tabla() {
    //checamos si hay una columna activa
    if ($(".activo").length > 0 && TEMAS_TABLA.length>0) {
        //obtenemos la posicion
        var posicion = parseInt($(".activo").children(":nth-child(1)").text()), pos, nombre = parseInt($(".activo").children(":nth-child(2)").text());
       
        FOLIOS_A_ELIMINAR.push({
                    id_curso: function () {
                        var dato = "";
                        $("#cursos option").each(function (index, item) {
                            if ($("#selector_cursos").val() == $(this).val())
                                dato = parseInt($(this).attr("name"));
                        })
                        return dato;
                    }()
                    , folio_orden: posicion
        })

        //recorremos el arreblo
        $.each(TEMAS_TABLA, function(index,item){
            if (typeof item !== 'undefined') {
                //comparamos la posicion obtenemos le indice y lo eliminamos
                if (item.folio_orden == posicion && item.folio_orden!=0) {
                    pos = TEMAS_TABLA.indexOf(item);
                    console.log(pos)
                    TEMAS_TABLA.splice(pos, 1);
                 }   
            }
            })

        //reasignamos los folios de posicion
        $.each(TEMAS_TABLA, function (index, item) {
            item.folio_orden = (index + 1)
        })
        //llenamos la tabla
        llenar_tabla()
        reset_datos()
        esatus_contenedores(false)
    }
}
function fechaCompleta() {
    var dia = new Date(), d = dia.getDate(), m = dia.getMonth(), a = dia.getFullYear();
    m = m + 1;
    if (m < 10)
        m = "0" + m;
    if (d < 10)
        d = "0" + d;
    var f = (a + "-" + m + "-" + d);

    return d + "-" + m + "-" + a;
}//fin 13
function fechaCompletaDato(dato) {
    var dia = new Date(), d = dia.getDate(dato), m = dia.getMonth(dato), a = dia.getFullYear(dato);
    m = m + 1;
    if (m < 10)
        m = "0" + m;
    if (d < 10)
        d = "0" + d;
    var f = (a + "-" + m + "-" + d);

    return d + "-" + m + "-" + a;
}//fin 13
/***************************************************************************
            manejo del DOM
***************************************************************************/
//llena de opciones la lista de cursos mediante llamada ajax
function llenar_lista_cursos() {
    var cursos = conexion_ajax("servicios/dh_cursos.asmx/obtener_datos_cursos")
    $.each(cursos, function (index, item) {
        var opt = $("<option />").attr("name", item.id_curso)
        $("#cursos").append(opt.val(item.nombre_curso));
    })
}

//llenar tabla temas
function llenar_tabla() {
    //temueve los datos de la tabla anteriores
    $(".datos_temas").remove()
    //recorre los nuevos datos y los agrega a la tabla
    $.each(TEMAS_TABLA, function (indice, dato) {
        var fila = $("<tr></tr>").addClass("datos_temas")

        $("#tabla_temas").append( fila.append($("<td></td>").append(dato.folio_orden).css({ width: "35px", "text-align": "center" }))
                                , fila.append($("<td></td>").append(dato.nombre).css({ width: "235px" }))
                                , fila.append($("<td></td>").append(dato.contenido.slice(0, 30)+"...").css({ width: "135px" }))
                                , fila.append($("<td></td>").append(dato.usuario).css({ width: "115px", "text-align": "center" }))
                                , fila.append($("<td></td>").append(dato.fecha).css({ width: "95px", "text-align": "center" }))
            )
        arreglo_imagenes.push(dato.imagen)
       // console.log(dato.imagen.length)
    })
    //evento de click para la fila de la tabla
    $(".datos_temas").on("click", function () {

        esatus_contenedores(false)

        $("#modificar_a_tabla").attr("disabled",true)
        $("#agregar_a_tabla").attr("disabled", true)
        $("#selector_cursos").attr("disabled", false)
        $("#subir_orden").attr("disabled", false)
        $("#bajar_orden").attr("disabled", false)
        $("#borrar_activo").attr("disabled", false)

        $(".datos_temas").removeClass("activo")
        $(this).addClass("activo")

      //recorre las celdas para recuperar la posicion
        $(this).children("td").each(function (index, item) {

            switch (index) {
                case 0: POSICION_TEMPORAL_TEMA = parseInt( $(this).text());
                    break;
            }
        })
        //recurremos el RREGLO  que contiene los datos
        $.each(TEMAS_TABLA, function (i, t) {

            //asigmanos los datos
            if (t.folio_orden == POSICION_TEMPORAL_TEMA) {
                if (t.imagen!=""){
                    $("#img").attr("src", t.imagen);
                    $("#nombre_tema").val(t.nombre);
                    $("textarea").val(t.contenido);
                    $("#contador_tiempo_i").val(t.tiempo_min)
                    $("#contador_tiempo_f").val(t.tiempo_max)
                }
                else {
                    var folio = function () {
                        var dato = "";
                        $("#cursos option").each(function (index, item) {
                            if ($("#selector_cursos").val() == $(this).val())
                                dato = parseInt($(this).attr("name"));
                        })
                        return dato;
                    }()
                    t.imagen = conexion_ajax("/servicios/dh_cursos.asmx/obtener_imagen", { folio_curso: folio, folio_orden: POSICION_TEMPORAL_TEMA })
                    $("#nombre_tema").val(t.nombre);
                    $("textarea").val(t.contenido);
                    $("#contador_tiempo_i").val(t.tiempo_min)
                    $("#contador_tiempo_f").val(t.tiempo_max)
                
                }
           }
        })
    })
}

var IMAGEN_PRINCIPAL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAGaAsYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiimJKjkhWBPpQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACijNFABRRRQBDdSeXCx7ng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Aqq97bJkKzyt6Rrn9TxTAsU5QWOACfoKzXv7l+ILeOMf3pDuP5cCq8sd3ccXFzIy91U7V/IUXA1Z7m3th/pE8cZ9Ccn8hzVGXW4QcW0E059W+Qf41BDpqL91Bmrcdh7UgKT6jqc3EZitl/6Zrk/maqtYPcPvuZZJm9XYmuhisOnFWorH2oA56HT1XhVAH0q3HY+1b8dkB2qwlp7UAYcVjntVuKxxjithLUDtVhLcelAGTHZD0qylmB2rTWEDtUgiHpQBnraD0p4tR6VoBBS7KAM/7MPSj7OPStDZ7UbBQBmm2HpTGtx6VplBTTGKAMprYelRNbD0rXaP2qNoqAMV7YelQva+1bhh9qiaCgDCe19qhe19q3mg56VE1v7UAYMcEkDbrd2jPcDofqKtJdMOLiPH+3H/AFH+FaBtvamG256UAUb+UPaeXDIrNOdvHZe+R29KhitgoAA6VpC1UNnaM1IsFAFWGDpxV+GLFPjhxVmNKAHwpxVqNcUyNanUUAPUcUooApaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACgiiigBhqGVOtWCKawoAzZkzmqE0IPatp481WkhNAHOzWEbPuZMn3pgswPurge1bxt8npQLf2oAxVs89qkSy6cVsrb1MluPSgDJjsx6VYS09q1FhA7VIIxQBnJa+1TrbgVcEdOCgUAVlhAp4iFT49qXFAEQQU4LUmKMUANApcUtFABijFFFABiiiigAxSEUtFADCtIVqSgigCEoKYUqxikIoAqmPmmGLire2gpQBSMVNMPtV3ZRs9qAKHk0oix2q6UpNntQBWWOpUSpQtOC0AIoqQCkApwoAWiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKMUUUAIVFNMYNPooAi8oUoiUVJRQA0IBS7RS0UAJgUuKKKADFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFGKKKADFGKKKADFGKKKAExRilooAMUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k="