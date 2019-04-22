//variables globales
var APLICADOR = {};
var CURSOS = [];
var CURSO = {};
var TEMAS_CURSOS = [];
var POSICION_TEMPORAL_TEMA = 0;
var ID_CURSO = 0;
var TIEMPO_TEMA = 0;
var SUMA_TIEMPO = { minutos: 0, segundos: 0 };
var CUESTIONARIOS = []
var PREGUNTA = {};
var CUESTIONARIO_R = [];
var PREGUNTAS_R = {};
var CONTENEDOR_RESULTADOS_A_ENVIAR = [];
var TIEMPO_CUESTIONARIO;

$(document).ready(function () {
    new manejo_cursos();
    eventos();
    $("#textarea").attr("disabled", true);
    $("#selector_imag").attr("disabled", true);
});
function eventos() {
    /*Menu*/
    $("#mostrar_curso").on("click", function () {
        manejo_cursos.mostrar_cursos();
        $("#menu_selector").fadeOut(1100);
        
    });
    $("#calificar_curso").on("click", function () {
        if (revisar_visto(CURSO.d_tema)) {
            $("#menu_selector").fadeOut(1100);
            manejo_cursos.calificar_curso();
        }
        else alert("Vea El Tema Del Curso Primero...");
    });
    $(".estrella").hover(function () {
        $(".estrella").removeClass("brillar")
        var estrella = $(this).attr("id");
        estrella = parseInt(estrella.slice(3));
        while (estrella > 0) {
            $("#str" + estrella).addClass("brillar");
            estrella -= 1;
        }
    });
    $(".estrella").mouseout(function () {
        $("#comentarios_calificacion").focus()
    });
    $("#aplicar_cuestionario").on("click", function () {
        if (function (campo) {campo = campo.split(":"); return (parseInt(campo[0]) > 0 || parseInt(campo[1]) > 0);}(CURSO.d_tema)) {
            new Manejo_cuestionarios();
            if (CUESTIONARIOS.length >= 1) { $(".responder").fadeIn(1000);$("#menu_selector").fadeOut(1100); }
        }
        else alert("Vea El Tema Del Curso Primero...");
    });
    $("#enviar_calificacion_curso").on("click", function () {
        dh_cursos_evaluacion_temas();
        //estrellas
        $(".califica_el_curso").fadeOut(100);
    });

    manejo_cursos.eventos();
    Manejo_cuestionarios.eventos();

    //obtener Datos evaluacion temas
    function dh_cursos_evaluacion_temas() {
        var comentarios = $("#comentarios_calificacion").val() === "" ? " " : $("#comentarios_calificacion").val();

        conexion_ajax("/servicios/dh_cursos.asmx/dh_cursos_evaluacion_temas", {
            id_curso: ID_CURSO
            , id_usuario: id_usuario
            , puntuacion: $(".brillar").length
            , descrpcion: comentarios
        })
    }   
}
function guardar_datos_vista(  estatus ) {
    CURSO.d_cuestionario = llenar_vacio(CURSO.d_cuestionario);
    CURSO.d_tema = llenar_vacio(CURSO.d_tema);

    if (revisar_visto(CURSO.d_cuestionario) || revisar_visto(CURSO.d_tema)) {
        console.log("entro");
        CURSO.estatus_curso = estatus;
        conexion_ajax("/servicios/dh_cursos.asmx/actualizar_estatus_curso", CURSO);
    }
    else console.log("NO!!! entro");
}

function llenar_vacio(dat) {
    dat = dat.split(":");
    if (parseInt(dat[0]) < 10) { dat[0] = "0" + parseInt(dat[0]) }
    if (parseInt(dat[1]) < 10) { dat[1] = "0" + parseInt(dat[1]) }
    return dat[0] + ":" + dat[1]
}
function revisar_visto(campo) {
    campo = campo.split(":");
    return (parseInt(campo[0]) > 0 || parseInt(campo[1]) > 0);
}

/**************************************
        manejo de tablero
**************************************/
class manejo_cursos{
    constructor(){
        this.obtener_cursos();
    }
    obtener_cursos() {
        APLICADOR = USUARIOS.find(dato =>dato.id_usuario == id_usuario);
        CURSOS = conexion_ajax("/servicios/dh_cursos.asmx/dh_cursos_estados_vista_ususarios", { id_usuario: APLICADOR.id_scoi });
        $("#cuestionarios *").remove();

        $.each(CURSOS, function (index, item) {
            if (item.estatus_curso != "CANCELADO" && item.estatus_curso != "FINALIZADO" && item.estatus_curso != "APLICADO") {
                $("#cuestionarios").append(
                    $("<div>").append($("<div>").append($("<img>").attr({ "height": "48px", "id": "magen_" + item.id_curso, "alt": "IMAGEN" }).addClass("img-rounded")).css({ "width": "100%", "height": "50px", "border": "solid 1px #467ff5", "background": "#d7eaf1" })
                    , $("<p>").append(item.nombre_curso).addClass("filro_curso")
                    , $("<br/>")
                    , $("<i>").addClass("")
                    , $("<p>").append(item.estatus_curso).css({ "font-size": "12px" })
                        ).addClass("cursos").attr("name", item.id_curso))
                obtener_imagen_curso(item.id_curso);
            }
        })
        //eventos de divs
        $(".cursos").on("click", function () {
            mostrar_menu_modal($(this));
        });
        function obtener_imagen_curso(id_curso) {
            var xhttp = new XMLHttpRequest();
            var respuesta = "";
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    respuesta = this.responseText;
                    respuesta = JSON.parse(respuesta);
                    $("#magen_" + id_curso).attr("src", respuesta.d.imagen);
                }
                else if (this.status > 200)
                    alert("Error:" + this.status);
            };//fin
            //llamada al servicio
            xhttp.open("post", "/servicios/dh_cursos.asmx/obtener_datos_cursos_folio", true);
            //tipo de datos 
            xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
            //Datos a enviar
            xhttp.send(JSON.stringify({ folio: id_curso }));
        }
        function mostrar_menu_modal(btn) {
            ID_CURSO = parseInt(btn.attr("name"));
            CURSO = CURSOS.find(dato => dato.id_curso == ID_CURSO && dato.estatus_curso != "CANCELADO" && dato.estatus_curso != "FINALIZADO");
            $("#cuestionarios_menu_foto").attr({ "src": $("#magen_" + ID_CURSO).attr("src") });
            $("#nom_curso").text(CURSO.nombre_curso);
            $("#menu_selector").show();
        }
    }
    static eventos() {
        /*Tema*/
        $("#anterior").on("click", function () {
            tema_anterior();
        });
        $("#siguiente").on("click", function () {
            temas_siguiente();
        });
        $("#cerrar").on("click", function () {
            temas_salir();
        });
        $("#filtro_cuestionarios").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".filro_curso").filter(function () {
                $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        function temas_siguiente() {
            if (POSICION_TEMPORAL_TEMA < TEMAS_CURSOS.length && $(".siguiente").length == 1) {//&& $(".siguiente").length == 1 <-esto evita que se salte sin transcurrir el tiempo minimo
                //efectos salida
                $("#cont_texto").animate({ marginLeft: "1000px" }, 0);
                $("#cont_imagen").animate({ marginLeft: "1500px" }, 0);

                POSICION_TEMPORAL_TEMA += 1;
                manejo_cursos.total_tiempo_trascurrido()
                manejo_cursos.llenar_tablero_cursos()
            }
            else if ($(".terminar").length == 1) {
                manejo_cursos.total_tiempo_trascurrido();
                clearInterval(TIEMPO_TEMA);
                guardar_datos_vista("V");
                TEMAS_CURSOS = [];
                POSICION_TEMPORAL_TEMA = 0;
                TIEMPO_TEMA = 0;
                SUMA_TIEMPO = { minutos: 0, segundos: 0 };
                $(".responder").hide();
                //tabla
                $(".curso_activo").fadeOut(100);
                new manejo_cursos();
            }
        }
        function tema_anterior() {
            if (POSICION_TEMPORAL_TEMA > 1) {
                //efectos salida
                $("#cont_texto").animate({ marginLeft: "-1000px" }, 0);
                $("#cont_imagen").animate({ marginLeft: "-500px" }, 0);

                POSICION_TEMPORAL_TEMA -= 1;
                manejo_cursos.total_tiempo_trascurrido()
                manejo_cursos.llenar_tablero_cursos()
            }
        }
        function temas_salir() {
            $(".curso_activo").hide()
            manejo_cursos.total_tiempo_trascurrido()
            clearInterval(TIEMPO_TEMA);
            TEMAS_CURSOS = [];
            CURSO = {};
            POSICION_TEMPORAL_TEMA = 0;
            ID_CURSO = 0;
            TIEMPO_TEMA = 0;
            SUMA_TIEMPO = { minutos: 0, segundos: 0 };
            new manejo_cursos();
        }
    }
    static mostrar_cursos() {
        //efectos salida
        $("#cont_texto").animate({ marginLeft: "-1000px" });
        $("#cont_imagen").animate({ marginLeft: "10000px" });

        //obtenemos los temas por llamada ajax
        TEMAS_CURSOS = conexion_ajax("/servicios/dh_cursos.asmx/obtener_datos_temas_folio", {
            folio: ID_CURSO
        })
        //checamos si tiene temas el curso
        if (TEMAS_CURSOS.length > 0) {
            $(".curso_activo").show();
            obtener_imagen()
            $("#titulo_curso").text(CURSO.nombre_curso)
            //asignamos la primer posicion en el tablero
            POSICION_TEMPORAL_TEMA = 1;
            //llenamos el tablero
            manejo_cursos.llenar_tablero_cursos()
        }
        else alert("No Hay Temas A Mostrar...")
        function obtener_imagen() {

            $.each(TEMAS_CURSOS, function (index, item) {
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
                xhttp.send(JSON.stringify({ "folio_curso": ID_CURSO, "folio_orden": folio_orden }));

            })
        }
    }
    static total_tiempo_trascurrido() {
        var tiempo_tema = $("#tiempo_s").text().split(":");
        SUMA_TIEMPO.minutos += parseInt(tiempo_tema[0]);
        SUMA_TIEMPO.segundos += parseInt(tiempo_tema[1]);

        if (SUMA_TIEMPO.segundos > 59) {
            SUMA_TIEMPO.segundos -= 59;
            SUMA_TIEMPO.minutos += 1;
        }
        CURSO.d_tema = SUMA_TIEMPO.minutos + ":" + SUMA_TIEMPO.segundos
        return SUMA_TIEMPO;
    }
    static llenar_tablero_cursos() {
        var segundos = 0, minutos = 0;
        var resaltador_cambiar;
        //LIMPIA EL INTERVALO DE TIEMPO
        clearInterval(TIEMPO_TEMA);
        clearInterval(resaltador_cambiar);

        reiniciar_componentes();
        revisar_imagen();
        asignar_valores();
        efectos_entrada();
        asignar_tiempo_total();
        TIEMPO_TEMA = setInterval(function () {
            if (segundos < 59) { segundos += 1; }
            else { segundos -= 59; minutos += 1;
            }
            $("#tiempo_s").text((minutos + ":" + function (s) { return s < 10 ? '0'+s : s ;   }(segundos)))
            comparar_tiempo_con_establecido()
            $("#tiempo_trasncurso").text(function () {
                var min = SUMA_TIEMPO.minutos + minutos, seg = SUMA_TIEMPO.segundos + segundos;
                seg < 59 ? (seg += 1) :( seg -= 59,min += 1) ; 
                return min + ":" + function (s) {  return s < 10 ? '0' + s : s; }(seg)
            });
            SUMA_TIEMPO

        }, 1000)
        function comparar_tiempo_con_establecido() {

            var min_tiempo = TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].tiempo_min.split(":");
            var max_tiempo = TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].tiempo_max.split(":");

            min_tiempo = { minuto: parseInt(min_tiempo[0]), segundo: parseInt(min_tiempo[1]) };
            max_tiempo = { minuto: parseInt(max_tiempo[0]), segundo: parseInt(max_tiempo[1]) };

            if ((min_tiempo.minuto * 60) + (min_tiempo.segundo) <= (minutos * 60) + segundos) {
                $("#tiempo_s").css({ "color": "blue", "font-size": "20px;" })
                $("#siguiente").css({ "font-size": "40px" })
                // $("#siguiente").toggleClass("cambiar")
                if ($(".siguiente").length < 1 && POSICION_TEMPORAL_TEMA < TEMAS_CURSOS.length)
                    $("#siguiente").addClass("siguiente")
                else if (POSICION_TEMPORAL_TEMA == TEMAS_CURSOS.length) {
                    $("#siguiente").addClass("terminar")
                }
            }
            if ((max_tiempo.minuto * 60) + (max_tiempo.segundo) <= (minutos * 60) + segundos) {
                $("#siguiente").toggleClass("cambiar")
                if ($(".siguiente").length < 1 && POSICION_TEMPORAL_TEMA < TEMAS_CURSOS.length)
                    $("#siguiente").addClass("siguiente")
            }
        }
        function reiniciar_componentes() {
            $("#siguiente").removeClass("cambiar");
            //recuperar css
            $("#tiempo_s").css({ "color": "#808080", "font-size": "14px" })
            $("#siguiente").css({ "font-size": "33px" })
            $("#siguiente").removeClass("siguiente")
            $("#siguiente").removeClass("terminar")
        }
        function revisar_imagen() {
            if (TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].imagen == "")
                TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].imagen = conexion_ajax("/servicios/dh_cursos.asmx/obtener_imagen", { folio_curso: ID_CURSO, folio_orden: POSICION_TEMPORAL_TEMA })
        }
        function asignar_valores() {
            $("#tema").text(TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].nombre);
            $("#img").attr("src", TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].imagen);
            $("#textarea").text(TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].contenido);
            $("#posicion").text(POSICION_TEMPORAL_TEMA);
            $("#total_temas").text(TEMAS_CURSOS.length);
            $("#usuario").text($("#Label1").text());
            $("#tiempo_s").text("00:00");
            $("#tiempo_tema").text(TEMAS_CURSOS[POSICION_TEMPORAL_TEMA - 1].tiempo_min);
        }
        function efectos_entrada() {
            $("#cont_texto").animate({ marginLeft: "0" }, 1100);
            $("#cont_imagen").animate({ marginLeft: manejo_cursos.manejo_area_texto_imagen() }, 1100);
        }
        function asignar_tiempo_total() {
            var tiempo_total = { minuto: 0, segundo: 0 }, aux_tiempo = [];

            $.each(TEMAS_CURSOS, function (index, item) {
                aux_tiempo = item.tiempo_min.split(":")
                tiempo_total.minuto += parseInt(aux_tiempo[0]);
                tiempo_total.segundo += parseInt(aux_tiempo[1]);
                if (tiempo_total.segundo > 59) {
                    tiempo_total.minuto += 1;
                    tiempo_total.segundo -= 59;
                }
            })
            $("#tiempo_t").text( tiempo_total.minuto + ":" + function (s) {
                if (s < 10) s = "0" + s;
                return s;
            }(tiempo_total.segundo));
        }
    }
    static manejo_area_texto_imagen() {
        if ($("#textarea").val().length < 50) {
            $("#cont_texto").css({ "width": "95%", "height": "7%" });
            $("#cont_imagen").css({ "width": "96%", "height": "93%", "margin-top": "2%", "position": "initial" });
            return "1%"
        }
        else if ($("#textarea").val().length >= 50 && $("#textarea").val().length < 300) {
            $("#cont_texto").css({ "width": "25%", "height": "87%" });
            $("#cont_imagen").css({ "width": "73%", "height": "93%", "margin-top": "0%", "position": "initial" });
            return "27%"
        }
        else {
            $("#cont_texto").css({ "width": "40%", "height": "87%" });
            $("#cont_imagen").css({ "width": "57%", "height": "95%", "margin-top": "0%", "position": "initial" });
            return "43%"
        }
    }
    static calificar_curso() {
        $(".estrella").removeClass("brillar")
        $("#str1").addClass("brillar");
        $("#n_usr").text($("#usuario").text())
        $("#comentarios_calificacion").val("")
        //muestra modal calificar
        $(".estrllas").fadeIn(1000);
    }
}
/**************************************
        manejo de preguntas
**************************************/
class Manejo_cuestionarios {
    constructor() {
        CUESTIONARIOS = [], PREGUNTA = {};
        CUESTIONARIO_R = [], PREGUNTAS_R = {};

        Manejo_cuestionarios.Obtener_Cuestionarios_curso();
        if (CUESTIONARIOS.length >= 1) {
            Manejo_cuestionarios.orden_aleatorio_Cuestionarios();
            Manejo_cuestionarios.tiempo();
        }
        CUESTIONARIO_R.length = CUESTIONARIOS.length
    }
    static eventos() {
        /*Cuestionario*/
        $("#anterior_p").on("click", function () {
            cuestionario_anterior();
        });
        $("#siguiente_p").on("click", function () {
            cuestionario_siguiente();
        });
        $("#cerrar_preg").on("click", function () {
            if (confirm("AL SALIR PERDERA LA INFORMACION...\n EL CUESTIONARIO SERA FINALIZADO CON 0% !!!")) { 
                cuestionario_salir();
            }
        });
        function cuestionario_anterior() {
            var pos_preg = parseInt($("#posicion_p").text()), total_preg = parseInt($("#total__preguntas").text());
            if (pos_preg > 1) {
                pos_preg -= 1;
                $("#posicion_p").text(pos_preg);
                Manejo_cuestionarios.cargar_html_cuestionarios(pos_preg);
                //fn obtener datos  de Arreglo
                Manejo_cuestionarios.retomar_cuestion_llenar_campos();
            }
        }
        function cuestionario_siguiente() {
            var pos_preg = parseInt($("#posicion_p").text()), total_preg = parseInt($("#total__preguntas").text());
            if (Manejo_cuestionarios.checar_cuestionario_resuelto_para_avanzar()) {
                if (pos_preg < total_preg) {
                    //fn checar datos agregar a Arreglo
                    Manejo_cuestionarios.obtener_resultados_de_cuestion_a_objeto();
                    pos_preg += 1;
                    //obtiene las preguntas del objeto y las agrega al HTML
                    $("#posicion_p").text(pos_preg);
                    Manejo_cuestionarios.cargar_html_cuestionarios(pos_preg);
                    //fn obtener datos  de Arreglo su hay
                    Manejo_cuestionarios.retomar_cuestion_llenar_campos();
                }
                else {
                    if (confirm("¿\"TERMINAR CUESTIONARIO\"? \n cancelar para revisar... \n !UNA VEZ CERRADO NO PODRA SER MODIFICADO!")) {
                        //fn checar datos agregar a Arreglo
                        Manejo_cuestionarios.obtener_resultados_de_cuestion_a_objeto();
                        $(".responder").fadeOut(1100);
                        clearInterval(TIEMPO_CUESTIONARIO);
                        //obtener Resultados
                        Manejo_cuestionarios.compara_cuestionario_vs_R_cuest();
                        guardar_datos_vista("A");
                        new manejo_cursos();
                    }
                }
            } else alert("Responda Para Avanzar!!!")
        }
        function cuestionario_salir() {
            //fn checar datos agregar a Arreglo
            Manejo_cuestionarios.obtener_resultados_de_cuestion_a_objeto();
            $(".responder").fadeOut(1100);
            clearInterval(TIEMPO_CUESTIONARIO);
            guardar_datos_vista("A");
            new manejo_cursos();
        }
    }
    static tiempo() {
        var min = 0, seg = 0;
        TIEMPO_CUESTIONARIO = setInterval(function () {
            seg = parseInt(seg);
            min = parseInt(min);

            if (seg < 59) {
                seg+=1;
                if (seg < 10)
                    seg = "0" + seg;
            }
            else {
                min += 1;
                seg = "00";
            }
            CURSO.d_cuestionario = min + ":" + seg;
            return min+":"+seg;
        }, 1000)
    }
    static shuffle(array) {
        var j, x, i;
        //Recorremos el array del final hacia delante
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
    }
    static Obtener_Cuestionarios_curso() {
        CUESTIONARIOS = [], PREGUNTA = {};
        function obtener_respuestas_opciones(item) {
            PREGUNTA.opciones.push( item.preguntas);
            PREGUNTA.respuestas.push(item.respuestas);
        }
        $.each(conexion_ajax("/servicios/dh_cursos.asmx/obtener_cuestionarios_cursos", { "id_curso": ID_CURSO }), function(index, item) {
            if (index == 0) {
                PREGUNTA = { id_curso: item.id_curso, nombre: item.nombre, tipo: item.tipo, opciones: [], respuestas: [] };
            }
            if (item.nombre == PREGUNTA.nombre) {
                obtener_respuestas_opciones(item)
            }
            else if (item.nombre != PREGUNTA.nombre) {

                CUESTIONARIOS.push(PREGUNTA);
                PREGUNTA = { id_curso: item.id_curso, nombre: item.nombre, tipo: item.tipo, opciones: [], respuestas: [] };
                obtener_respuestas_opciones(item);
            } 
        });
        if (!$.isEmptyObject(PREGUNTA)) {
            CUESTIONARIOS.push(PREGUNTA);
        }
    }
    static orden_aleatorio_Cuestionarios() {
      
        //copia fiel de arreglo
        var aux_cuestionarios = CUESTIONARIOS.slice();
        for (var i = 0; i < (Math.random()*100 ); i++){
        //orden aleatorio de datos
            Manejo_cuestionarios.shuffle(CUESTIONARIOS);
        }
        $.each(CUESTIONARIOS, function (index, item) {
            for (var i = 0; i < (Math.random() * 1000) ; i++) {
                Manejo_cuestionarios.shuffle(item.opciones);
                Manejo_cuestionarios.shuffle(item.respuestas);
            }
        })
        $("#posicion_p").text(1);

        Manejo_cuestionarios.cargar_html_cuestionarios($("#posicion_p").text())
    }
    static cargar_html_cuestionarios(posicion) {
        posicion -= 1;
        var tipo = CUESTIONARIOS[posicion].tipo;

        $("#cuestion").text(CUESTIONARIOS[posicion].nombre);
        $("#total__preguntas").text((CUESTIONARIOS.length));

        $("#respuestas").empty();

        if (tipo == "normal") { $("#respuestas").append(Manejo_cuestionarios.mostrar_opciones_normal(CUESTIONARIOS[posicion]))}
        else if (tipo == "multiple") { $("#respuestas").append(Manejo_cuestionarios.mostrar_opciones_multiple(CUESTIONARIOS[posicion])) }
        else if (tipo == "complemento") { $("#respuestas").append(Manejo_cuestionarios.mostrar_opciones_complemento(CUESTIONARIOS[posicion])) }
        else if (tipo == "enlace") { $("#respuestas").append(Manejo_cuestionarios.mostrar_opciones_enlace(CUESTIONARIOS[posicion])); Manejo_cuestionarios.accion_btn_enlace() }

        Manejo_cuestionarios.agregar_leyenda_cuestion(tipo);
    }
    //creacion del contenido html.
    static mostrar_opciones_normal(cuestion) {
        var a = $("<div>");
        $.each(cuestion.opciones, function (index, item) {
            a.append(
                $("<div>").attr({ "title": "Seleccione el correcto..." }).css({ "width": "90%" }).append(
                    $("<li>").text(item).addClass("opcion").css({ "margin-left": "5px" })
                 ).css({ "border-bottom": "solid 1px rgb(150, 155, 157)", "text-align": "left", "display": "inline-block" })
                 , $("<input />").attr({ "type": "radio", "onclick": '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)' }).css({ "margin-right": "5px" })
            );
        });    
        return a;
    }
    static mostrar_opciones_multiple(cuestion) {
        var a = $("<div>");
        $.each(cuestion.opciones, function (index, item) {
            a.append(
            $("<div>").attr({ "title": "Seleccione el correcto..." }).css({ "width": "90%" }).append(
                    $("<li>").text(item).addClass("opcion").css({ "margin-left": "5px" })
                 ).css({ "border-bottom": "solid 1px rgb(150, 155, 157)", "text-align": "left", "display": "inline-block" })
                 , $("<input />").attr({ "type": "checkbox" }).css({ "margin-right": "5px" })
               );
        });
        return a;
    }
    static mostrar_opciones_complemento(cuestion) {
        var a = $("<div>");
        var datos = $("#cuestion").text().split("@");
        $("#cuestion").text(datos[0] + "_");

        $("#cuestion").append($("<p>").text("____").addClass("complem").css({ "border-bottom": "solid 1px rgb(150, 155, 157)", "width": "30px" }));

        $("#cuestion").text($("#cuestion").text() + "_" + datos[1]);

        $.each(cuestion.opciones, function (index, item) {
                 a.append(
                $("<div>").attr({ "title": "Seleccione el correcto..." }).css({ "width": "90%" }).append(
                    $("<li>").text(item).addClass("opcion").css({ "margin-left": "5px" })
                 ).css({ "border-bottom": "solid 1px rgb(150, 155, 157)", "text-align": "left", "display": "inline-block" })
                 , $("<input />").attr({ "type": "radio", "onclick": '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)' }).css({ "margin-right": "5px" })
            );
        });
        return a;
    }
    static mostrar_opciones_enlace(cuestion) {

        var colores = ["#ff8000", "#40ff00", "#00ffbf", "#0080ff", "#0040ff"];
        var c = $("<div>").css({ "width": "100%" })
        var a = $("<div>").css({ "display": "inline-block", "width": "45%"});
        var b = $("<div>").css({ "display": "inline-block", "width": "45%"});

        $.each(cuestion.opciones, function (index, item) {
            a.append(
               $("<div>").append(
                $("<input />").val(item).attr({ "type": "button", "name": colores[index] }).css({ "width": "90%", "background-color": colores[index] }).addClass("opciones"))
               );
        });
        $.each(cuestion.respuestas, function (index, item) {
            b.append(
               $("<div>").append(
                 $("<input />").val(item).attr({ "type": "button" }).css({ "width": "90%" }).addClass("respuestas"))
               );
        });

        c.append(a, b);
        return c;
    }
    static accion_btn_enlace() {
        var opcion = "#b5c6c1";
        $(".opciones").on("click", function () {
            opcion = $(this).attr("name");
        });
        $(".respuestas").on("click", function () {
            checar_name_reasignar_color();
            $(this).css({ "background-color": opcion });
            $(this).attr("name", opcion);
            opcion = "#b5c6c1"
        });
        function checar_name_reasignar_color() {
            $(".respuestas").each(function (index, item) {
                if ($(this).attr("name") == opcion) {
                    $(this).attr("name", "#b5c6c1");
                    $(this).css({ "background-color": "#b5c6c1" });
                }
            });
        }
    }
    static agregar_leyenda_cuestion(tipo) {
        $("#indicadoresPos *").remove();
        var indicadoresPos=""
        if (tipo == "normal") { indicadoresPos="-SELECCIONE LA RESPUESTA CORRECTA." }
        else if (tipo == "multiple") {indicadoresPos="-SELECCIONE LAS RESPUESTA QUE SEAN CORRECTAS SEGUN SU CRITERIO."}
        else if (tipo == "complemento") { indicadoresPos = "-COMPLEMENTE LA FRASE CON LA OPCION CORRECTA." }
        else if (tipo == "enlace") { indicadoresPos = "-SELECCIONE EL BOTON DE LA IZQUIERDA PARA INDICAR EL COLOR QUE TENDRA EL BOTON DE LA DERECHA. LOS BOTONES CON COLOR SEMEJANTE SERAN TOMADOS COMO COMPLEMENTO UNO DEL OTRO." }

        $("#indicadoresPos").append(
            $("<i>").addClass("fa fa-question-circle-o").css({"font-size":"36px;","color":"#ff6a00;","left":"10px;"})
            , $("<p>").text(indicadoresPos)
            );
    }
    static obtener_resultados_de_cuestion_a_objeto() {

        var posicion = parseInt($("#posicion_p").text());
        //creamos objeto contenedor
        PREGUNTAS_R = {
            id_curso: CUESTIONARIOS[posicion - 1].id_curso
            ,nombre:CUESTIONARIOS[posicion - 1].nombre
            , tipo: CUESTIONARIOS[posicion - 1].tipo
            , opciones: CUESTIONARIOS[posicion - 1].opciones
            , respuestas:[]
        }
        //recorremos las respuestas
        if($("[type=checkbox]").length>1)
            $("[type=checkbox]").each(function (index, item) {
                PREGUNTAS_R.respuestas.push($(this).prop("checked"))
            })
        else if ($("[type=radio]").length > 1)
            $("[type=radio]").each(function (index, item) {
                PREGUNTAS_R.respuestas.push($(this).prop("checked"))
            })
        else if ($(".respuestas").length > 1)
            $(".respuestas").each(function (index, item) {
                
                var res=$(this).attr("name");
                PREGUNTAS_R.respuestas.push($(this).val());

                $(".opciones").each(function (i, d) {
                    if ($(this).attr("name") == res)
                        PREGUNTAS_R.opciones[index] = $(this).val();
                })
            })
        //agregamos objeto contenedor a cuestionarios resueltos
        CUESTIONARIO_R[posicion - 1]=PREGUNTAS_R
    }
    static retomar_cuestion_llenar_campos() {
        var posicion = parseInt($("#posicion_p").text());

        PREGUNTAS_R = CUESTIONARIO_R[posicion - 1];
        if (PREGUNTAS_R != undefined) {
            if (PREGUNTAS_R.tipo == "enlace") { enlace() }
            else if (PREGUNTAS_R.tipo == "multiple") { seleccion("checkbox") }
            else if (PREGUNTAS_R.tipo == "complemento") { seleccion("radio") }
            else if (PREGUNTAS_R.tipo == "normal") { seleccion("radio") }
        }
        function enlace() {
            $(".opciones").each(function (index, item) {

                var opciones = $(this).val();
                var color = $(this).attr("name");

                $(".respuestas").each(function (i, d) {
                    if (PREGUNTAS_R.opciones[i] == opciones) {
                        $(this).attr("name", color);
                        $(this).css("background-color", color);
                    }
                })
            })
        }
        function seleccion(tip) {
            $("[type="+tip+"]").each(function (index, item) {
                $(this).prop("checked", PREGUNTAS_R.respuestas[index]);
            })
        }
    }
    static checar_cuestionario_resuelto_para_avanzar() {
        var posicion = parseInt($("#posicion_p").text());

        PREGUNTA = CUESTIONARIOS[posicion - 1];

        if (PREGUNTA.tipo == "enlace") {return enlace() }
        else if (PREGUNTA.tipo == "multiple") { return seleccion("checkbox") }
        else if (PREGUNTA.tipo == "complemento") { return seleccion("radio") }
        else if (PREGUNTA.tipo == "normal") { return seleccion("radio") }

        function enlace() {
            var contador = 0;
            var colores = ["#ff8000", "#40ff00", "#00ffbf", "#0080ff", "#0040ff"];
     
            $(".respuestas").each(function (item, index) {
                var respuesta = colores.indexOf( $(this).attr("name") )
                if (respuesta>=0) { contador++}
            })
            if (contador == $(".respuestas").length) {
                return true
            }
            else return false
        }
        function seleccion(tip) {
            var estatus = false;
            $("[type=" + tip + "]").each(function (index, item) {
                if ($(this).prop("checked")) { estatus=true }
            })
            return estatus
        }
    }
    static compara_cuestionario_vs_R_cuest() {

        CONTENEDOR_RESULTADOS_A_ENVIAR = [];

        Manejo_cuestionarios.Obtener_Cuestionarios_curso();

        $.each(CUESTIONARIOS, function (index, item) {
            console.log(index);
            PREGUNTA = CUESTIONARIO_R.find(pregunta => pregunta.nombre === item.nombre);
            
            if (PREGUNTA.tipo == "enlace") {respuesta_seleccion(item)
            }
            else if (PREGUNTA.tipo == "multiple") {respuestas_diversas(item)
            }
            else if (PREGUNTA.tipo == "complemento" || PREGUNTA.tipo == "normal") {respuestas_simples(item)
            }
        });
        // Resultado
        var prom=0;
        $.each(CONTENEDOR_RESULTADOS_A_ENVIAR, function (index, item) {
            prom += item.valor;
        });
        prom = Math.round((prom / CONTENEDOR_RESULTADOS_A_ENVIAR.length) * 1000) / 10;

        $.each(CONTENEDOR_RESULTADOS_A_ENVIAR, function (index, item) {
            item.total_porcentual = prom;
            conexion_ajax("/servicios/dh_cursos.asmx/guardar_cuestionarios_resueltos", item)
        });
        alert(" Su Puntuacion fue: " + prom + "%");

        CURSO.calificacion = prom;

        function respuestas_simples(item) {

            var opcion_respuesta = PREGUNTA.opciones[PREGUNTA.respuestas.indexOf(true)];
            var respuesta = (item.respuestas[item.opciones.indexOf(opcion_respuesta)] == "True");
            var valor_ = respuesta === true ? 1 :0;
            
            CONTENEDOR_RESULTADOS_A_ENVIAR.push({
                id_curso: ID_CURSO
                , pregunta: PREGUNTA.nombre
                , opcion: opcion_respuesta
                , r: respuesta
                , valor: valor_
                , tipo: PREGUNTA.tipo
                , usuario: id_usuario
            });
        }
        function respuestas_diversas(item) {

            $.each(item.opciones, function (index, opc) {

                var respuesta = (item.respuestas[index] == "True");
                var valor_ = PREGUNTA.respuestas[PREGUNTA.opciones.indexOf(opc)] === respuesta ? 1 : 0;

                CONTENEDOR_RESULTADOS_A_ENVIAR.push({
                        id_curso: ID_CURSO
                        , pregunta: PREGUNTA.nombre
                        , opcion: opc
                        , r: PREGUNTA.respuestas[PREGUNTA.opciones.indexOf(opc)]
                        , valor: valor_
                        , tipo: PREGUNTA.tipo
                        , usuario: id_usuario
                    });
            });
        }
        function respuesta_seleccion(item) {

            $.each(item.opciones, function (index, opc) {
                var respuesta = item.respuestas[index];
                var valor_ = respuesta === PREGUNTA.respuestas[PREGUNTA.opciones.indexOf(opc)] ? 1 : 0;
               
                CONTENEDOR_RESULTADOS_A_ENVIAR.push({
                    id_curso: ID_CURSO
                    , pregunta: PREGUNTA.nombre
                    , opcion: opc
                    , r: PREGUNTA.respuestas[PREGUNTA.opciones.indexOf(opc)]
                    , valor: valor_, tipo: PREGUNTA.tipo
                    , usuario: id_usuario
                });
            })
        }
    }
}

//6673173548