$(document).ready(function () {
    inicializar()
    eventos()
});
/***************************************************************************
                variables globales
***************************************************************************/
var CURSOS = [];
var PREGUNTAS = [];
var OBJ_CURSO = {}
var tipo;
var OBJ_PREGUNTA = {
    nombre: ""
    , opciones: []
    , tipo: ""
}

/***************************************************************************
            funciones generales
***************************************************************************/
//funcion de eventos
function eventos() {
    $("#selector_cursos").on("change", function () {
        $("#img").attr("src", "");
        if ($("#selector_cursos").val() != "") {

            var nombre = $(this).val();
            mostrar_datos_curso(nombre);
            obtener_cuestionarios();
        }
        else {
            $(".datos_preguntas").remove();
            PREGUNTAS = [];
            OBJ_PREGUNTA = {}

        }
    })

    //btn cabecera
    $("#btNuevo").on("click", function () {
        if ($("#selector_cursos").val() != "") { 
            $("#seleccionar_tipo").animate({ marginTop: "-3px" }, 1000);
            $(".datos_preguntas").removeClass("pregunta_activa");
        }
    })
    $("#btEditar").on("click", function () {
        if (OBJ_PREGUNTA.nombre!="")
            editar_pregunta();
    })
    $("#btDeshacer").on("click", function () {
        $(".datos_preguntas").removeClass("pregunta_activa");
        OBJ_PREGUNTA = {
            nombre: ""
            , opciones: []
            , tipo: ""
            , html: ""
        }
        $(".datos_preguntas").remove();
        PREGUNTAS = [];
        OBJ_PREGUNTA = {}
        $("#selector_cursos").val("");
    })
    $("#btGuardar").on("click", function () {
        if ($("#selector_cursos").val() != "") {
            $(".datos_preguntas").removeClass("pregunta_activa");
            guardar_datos()
        }
    })
    $("#btnBorrar").on("click", function () {
        if (OBJ_PREGUNTA.nombre != "") {
            if(confirm("Eliminar?")){
            //si es editada
            PREGUNTAS.forEach(function (item, indice) {
                if (item.nombre == OBJ_PREGUNTA.nombre) {
                    PREGUNTAS.splice(indice, 1)
                    llenar_tabla_preguntas()
                }
            })
            }
        }
    })
    //btn modal menu
    $("#cerrar_menu").on("click", function () {
        $("#seleccionar_tipo").animate({ marginTop: "-1000px" }, 1000);
    })
    
    $(".seleccionar_tipo section").on("click", function () {
        tipo = $(this).attr("id")
        alta_cuestionaio()
    })
    //modal cuestionario
    $("#cerrar_cuestionario").on("click", function () {
        $("#alta_cuestionaio").animate({ marginTop: "-1000px" }, 1000);
        $("#titulo").text("");
        $("#edicion_preguntas").empty();
        $("#agregar_a_curso").remove();
    })
}
//inicializar componentes
function inicializar() {
    $(".seleccionar_tipo").animate({ marginTop: "-1000px" }, 0);
    llenar_lista_cursos()
    $("#imagen p").show();
}
//resetear componentes
function reset_componentes() {

}
//funcion mostrar modal cuestionario
function alta_cuestionaio() {
    //muestra la modal
    $("#alta_cuestionaio").animate({ marginTop: "-3px" }, 1000);

    //agregar boton enviar a modal
    $("#alta_cuestionaio >div").append(
        $('<input />').attr({ "type": "button", "id": "agregar_a_curso" }).addClass("btnTabla").val("Finalizar")
    )

    //checa el menu seleccionado
    if (tipo == "normal") { pregunta_normar() }
    else if (tipo == "multiple") { pregunta_multiple() }
    else if (tipo == "complemento") { pregunta_complemento() }
    else if (tipo == "enlace") { pregunta_enlace() }

    //funciones que crean el menu segun la seleccion
    function pregunta_normar() {
        
        $("#titulo").text("Seleccion De Una Sola Respuesta Correcta.");
        //remueve elemento en el div
        $("#edicion_preguntas").empty();
        //agrega elementos
        $("#edicion_preguntas").append(
               $("<div>").append(
                    $('<input />').val("normal").attr({ "disabled": true, "type": "text" }).addClass("tipo")
                    , $('<input />').attr({ "type": "text", "placeholder": "pregunta..." }).addClass("opt_1_preg")
                    , $('<input />').val("+").attr({ "type": "button" }).addClass("opt_1_agregar")
                    , $("<br/>")
                    , "Opciones"
                    , $("<br />")
                )
            )
        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {          

            //Checa la cantidad de opciones en la pregunta
            if ($(".opt_1_resp").length < 5) {
                //desmarcamos los radio
                $("[type=radio]").prop("checked", false)

                //agregar campo de opcion y sus componentes
                $("#edicion_preguntas >div").append(
                    $("<div />").append(
                         $("<input />").attr({ "onclick": '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)',"type":'radio', "title":'respuesta...' }).prop("checked", true)
                        , $('<input />').attr({"type":"text", "placeholder":" respuesta...", "title":"Opcion..."}).css({ "width": "70%" })
                        , $("<input />").attr({ "onclick":"$(this).parent().remove()", "type": 'button', "title": 'Quitar' }).css({ "border": "none", "background": "none" }).addClass("borrar").val('X')
                   ).css({ "width": "100%" }).addClass("opt_1_resp")
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })

        //evento de agregar pregunta
        $("#agregar_a_curso").on("click", function () {
            obtener_datos_pregunta("radio")
        })
      }
    function pregunta_multiple() {
        $("#titulo").text("Seleccion Multiple Respuestas Check.");
        //remueve elemento en el div
        $("#edicion_preguntas").empty();
        //agrega elementos
        $("#edicion_preguntas").append(
               $("<div />").append(
                      $('<input />').val("multiple").attr({ "disabled": "true", "type": "text" }).addClass("tipo")
                    , $('<input />').attr({ "type": "text", "placeholder": "pregunta..." }).addClass("opt_1_preg")
                    , $('<input />').val("+").attr({ "type": "button" }).addClass("opt_1_agregar")
                    , $("<br/>") , "Opciones"
                    , $("<br />")
                ))
        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {

            if ($(".opt_1_resp").length < 5) {

                $("#edicion_preguntas >div").append(
                    $("<div  class='opt_1_resp' >").append(
                          $("<input />").prop("checked", true).attr({"type":'checkbox',"title":'respuesta...'})
                        , $('<input />').css({ "width": "70%" }).attr({ "type": 'text', "title": 'Opcion...' })
                        , $("<input />").attr({ "onclick": "$(this).parent().remove()","type":'button', "title":'Quitar'}).css({ "border": "none", "background": "none" }).addClass("borrar").val("X")
                   ).css({ "width": "100%" })
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })

        //evento de agregar pregunta
        $("#agregar_a_curso").on("click", function () {
            obtener_datos_pregunta("checkbox")
        })
    }
    function pregunta_complemento() {
       
        $("#titulo").text("Llenar Parrafo Con Texto De Respueta.");

        //remueve elemento en el div
        $("#edicion_preguntas").empty();
        //agrega elementos
        $("#edicion_preguntas").append(
               $("<div>").append(
                      $('<input />').val("complemento").attr({ "disabled": "true", "type": "text" }).addClass("tipo")
                    , $('<input />').addClass("opt_1_preg").attr({ "type":"text", "placeholder":" Coloca un \'@\' en la posicion donde va la respuesta..."})
                    , $('<input />').val("+").attr({ "type": "button" }).addClass("opt_1_agregar")
                    , $("<br/>"), "Opciones"
                    , $("<br />")
                )
            )
        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {

            //Checa la cantidad de opciones en la pregunta
            if ($(".opt_1_resp").length < 5) {
                //desmarcamos los radio
                $("[type=radio]").prop("checked", false)

                //agregar campo de opcion y sus componentes
                $("#edicion_preguntas >div").append(
                    $("<div />").append(
                          $("<input />").attr({ "onclick": '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)',"type":'radio', "title":'respuesta...' }).prop("checked", true)
                        , $('<input />').css({ "width": "70%" }).attr({"type":"text" ,"placeholder":"respuesta...", "title":"Opcion..."})
                        , $("<input class='borrar' value='X' />").attr({"onclick":"$(this).parent().remove()","type":'button',"title":'Quitar'}).css({ "border": "none", "background": "none" })
                   ).css({ "width": "100%" }).addClass("opt_1_resp")
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })

        //evento de agregar pregunta
        $("#agregar_a_curso").on("click", function () {
            obtener_datos_pregunta("radio")
        })
    }
    function pregunta_enlace() {
     
        $("#titulo").text("Colorear Respuesta Segun Su Pregunta.");

        //remueve elemento en el div
        $("#edicion_preguntas").empty();
        //agrega elementos
        $("#edicion_preguntas").append(
               $("<div>").append(
                    $('<input />').val(tipo).attr({ "disabled": "true", "type": "text" }).addClass("tipo")
                    , $('<input />').attr({ "type": "text", "placeholder": " Titulo de seleccion Por Enlace..." }).addClass("opt_1_preg")
                    , $('<input />').val("+").attr({ "type": "button" }).addClass("opt_1_agregar")
                    , $("<br/>"), "Opciones"
                    , $("<br />")
                )
            )
        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {

            //Checa la cantidad de opciones en la pregunta
            if ($(".opt_1_resp").length < 5) {

               //agregar campo de opcion y sus componentes
                $("#edicion_preguntas >div").append(
                    $("<div  class='opt_1_resp' >").append(
                          $("<input />").css({"width":"40%"}).attr({"type":'text', "placeholder":' Pregunta...', "id":'preg_'+ ($(".opt_1_resp").length), "title":'respuesta...' }).addClass("enlace_p")
                        , $("<a>").css({ " margin-left": "10px" }).addClass("fa fa-hand-o-right")
                        , $('<input />').css({ "width": "40%" }).attr({ "type": "text", "placeholder": " Respuesta...", "title": "Opcion..." }).addClass("enlace_r")
                        , $("<input />").val("X").attr({"onclick":"$(this).parent().remove()", "type":'button', "title": 'Quitar' }).css({ "border": "none", "background": "none" }).addClass("'borrar'")
                   ).css({ "width": "100%" })
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })

        //evento de agregar pregunta
        $("#agregar_a_curso").on("click", function () {
            obtener_datos_pregunta_enlace() 
        })
    }
}
//llenar cuestionario
function obtener_datos_pregunta(check) {
    //lipiar obj
    OBJ_PREGUNTA = {
        nombre: $(".opt_1_preg").val()
        , preguntas: []
        , respuestas: []
        , tipo: $(".tipo").val()
        , id_curso: function () {
            var dato = "";
            $("#cursos option").each(function (index, item) {
                if ($(this).val() == $("#selector_cursos").val()) {
                    dato = ($(this).attr("name"));
                }
            })
            return dato;
        }()
    }
    //obtenemos los radio
    var radios = $(".opt_1_resp [type=" + check + "]")
    var texto = false;
    //Lista De opciones 
    $.each($(".opt_1_resp [type=text]"), function (index, item) {
        //checa si el tiene texto la opcion
        if ($(this).val() != "")
            texto = true;
        else
            texto = false;

        //insertamos las opciones
        OBJ_PREGUNTA.preguntas.push(
                 $(this).val()
            )
        //insertamos las opciones
        OBJ_PREGUNTA.respuestas.push(
                 radios[index].checked
            )
    })

    //checa si hay por lo menos dos opciones y la pregunta tiene texto
    if ($(".opt_1_resp [type=text]").length >= 2 && $(".opt_1_preg").val() != "" && texto) {
        //limpia y minimiza la tabla
        $(".seleccionar_tipo").animate({ marginTop: "-1000px" }, 1000);
        $("#agregar_a_curso").remove();
        //agregamos el cuestionario a las preguntas
        PREGUNTAS.push(OBJ_PREGUNTA)
        llenar_tabla_preguntas()
    }
    else alert("Coloque Nombre Y Por lo Menos Dos Opciones!")
}
//llenar cuestionario
function obtener_datos_pregunta_enlace() {
    //lipiar obj
    OBJ_PREGUNTA = {
        nombre: $(".opt_1_preg").val()
        , preguntas: []
        , respuestas: []
        , tipo: $(".tipo").val()
        , id_curso: function () {
            var dato = "";
            $("#cursos option").each(function (index, item) {
                if ($(this).val() == $("#selector_cursos").val()) {
                    dato=($(this).attr("name"));
                }
            })
            return dato;
        }()
    }
    //obtenemos los radio
    var pregunta = $(".enlace_p");
    var texto = false;
    //Lista De opciones 
    $.each($(".enlace_r"), function (index, item) {
        //checa si el tiene texto la opcion
        if ($(this).val() != "")
            texto = true;
        else
            texto = false;

        //insertamos las opciones
        OBJ_PREGUNTA.preguntas.push(
             $("#preg_"+index).val()
            )
        OBJ_PREGUNTA.respuestas.push(
             $(this).val()
            )
    })

    //checa si hay por lo menos dos opciones y la pregunta tiene texto
    if ($(".enlace_r").length >= 2 && $(".opt_1_preg").val() != "" && texto) {
        //limpia y minimiza la tabla
        $(".seleccionar_tipo").animate({ marginTop: "-1000px" }, 1000);
        $("#agregar_a_curso").remove();
        //agregamos el cuestionario a las preguntas
        PREGUNTAS.push(OBJ_PREGUNTA)
        llenar_tabla_preguntas()
    }
    else alert("Coloque Nombre Y Por lo Menos Dos Opciones!")
}
//edita la pregunta seleccionada
function editar_pregunta() {
    //muestra la modal
    $("#alta_cuestionaio").animate({ marginTop: "-3px" }, 1000);
    //remueve btn enviar cuestionario
    $("#agregar_a_curso").remove();
    //remueve elemento en el div
    $("#edicion_preguntas").empty();

    //agregar boton enviar a modal
    $("#alta_cuestionaio >div").append('<input type="button" id="agregar_a_curso" class="btnTabla" value="Finalizar" />')

    //agrega cavecera de pregunta
    $("#edicion_preguntas").append(
           $("<div>").append(
                $('<input type="text" class="tipo" />').val(OBJ_PREGUNTA.tipo).attr("disabled", true)
                , $('<input type="text" class="opt_1_preg" placeholder=" Titulo de seleccion Por Enlace..." />').val(OBJ_PREGUNTA.nombre)
                , $('<input type="button" value="+" class="opt_1_agregar"  />')
                , $("<br/>")
                , "Opciones"
                , $("<br />")
            )
        )



    //checa el menu seleccionado
    if (OBJ_PREGUNTA.tipo == "normal") { pregunta_normar() }
    else if (OBJ_PREGUNTA.tipo == "multiple") { pregunta_multiple() }
    else if (OBJ_PREGUNTA.tipo == "complemento") { pregunta_complemento() }
    else if (OBJ_PREGUNTA.tipo == "enlace") { pregunta_enlace() }

    function pregunta_normar() {
        $("#titulo").text("Seleccion De Una Sola Respuesta Correcta.")

        //agregar opciones    
        $.each(OBJ_PREGUNTA.preguntas, function (index, item) {
            //agregar campo de opcion y sus componentes
            $("#edicion_preguntas >div").append(
                $("<div  class='opt_1_resp' >").append(
                         $("<input type='radio' title='respuesta..' />").attr("onclick", '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)').prop("checked", OBJ_PREGUNTA.respuestas[index])
                        , $('<input type="text"  placeholder=" respuesta..." title="Opcion.." />').val(item).css({ "width": "70%" })
                        
                        , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
               ).css({ "width": "100%" })
            )
        })

        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {          

            //Checa la cantidad de opciones en la pregunta
            if ($(".opt_1_resp").length < 5) {
                //desmarcamos los radio
                $("[type=radio]").prop("checked", false)

                //agregar campo de opcion y sus componentes
                $("#edicion_preguntas >div").append(
                    $("<div  class='opt_1_resp' >").append(
                         $("<input type='radio' title='respuesta..' />").attr("onclick", '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)').prop("checked", true)
                        , $('<input type="text"  placeholder=" respuesta..." title="Opcion.." />').css({ "width": "70%" })
                        
                        , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
                   ).css({ "width": "100%" })
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })
        //evento de modificar pregunta
        $("#agregar_a_curso").on("click", function () {
            //si es editada
            PREGUNTAS.forEach(function (item,indice) {
                if (item.nombre == OBJ_PREGUNTA.nombre) {
                    PREGUNTAS.splice(indice, 1)
                }
            })

            obtener_datos_pregunta("radio")
        })
    }
    function pregunta_multiple() {
        $("#titulo").text("Seleccion Multiple Respuestas Check.")
        
        //agregar opciones    
        $.each(OBJ_PREGUNTA.preguntas, function (index, item) {
            //agregar campo de opcion y sus componentes
            $("#edicion_preguntas >div").append(
                $("<div  class='opt_1_resp' >").append(
                         $("<input type='checkbox' title='respuesta..' />").prop("checked", OBJ_PREGUNTA.respuestas[index])
                        , $('<input type="text"  placeholder=" respuesta..." title="Opcion.." />').val(item).css({ "width": "70%" })

                        , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
               ).css({ "width": "100%" })
            )
        })

        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {

            //Checa la cantidad de opciones en la pregunta
            if ($(".opt_1_resp").length < 5) {

                //agregar campo de opcion y sus componentes
                $("#edicion_preguntas >div").append(
                    $("<div  class='opt_1_resp' >").append(
                         $("<input type='checkbox' title='respuesta..' />").prop("checked", true)
                        , $('<input type="text"  placeholder=" respuesta..." title="Opcion.." />').css({ "width": "70%" })

                        , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
                   ).css({ "width": "100%" })
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })

        //evento de agregar pregunta
        $("#agregar_a_curso").on("click", function () {
            //si es editada
            PREGUNTAS.forEach(function (item, indice) {
                if (item.nombre == OBJ_PREGUNTA.nombre) {
                    PREGUNTAS.splice(indice, 1)
                }
            })
            obtener_datos_pregunta("checkbox")
        })

    }
    function pregunta_complemento() {
        $("#titulo").text("Llenar Parrafo Con Texto De Respueta.")

        //agregar opciones    
        $.each(OBJ_PREGUNTA.preguntas, function (index, item) {
            //agregar campo de opcion y sus componentes
            $("#edicion_preguntas >div").append(
                $("<div  class='opt_1_resp' >").append(
                         $("<input type='radio' title='respuesta..' />").attr("onclick", '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)').prop("checked", OBJ_PREGUNTA.respuestas[index])
                        , $('<input type="text"  placeholder=" respuesta..." title="Opcion.." />').val(item).css({ "width": "70%" })

                        , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
               ).css({ "width": "100%" })
            )
        })

        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {

            //Checa la cantidad de opciones en la pregunta
            if ($(".opt_1_resp").length < 5) {
                //desmarcamos los radio
                $("[type=radio]").prop("checked", false)

                //agregar campo de opcion y sus componentes
                $("#edicion_preguntas >div").append(
                    $("<div  class='opt_1_resp' >").append(
                         $("<input type='radio' title='respuesta..' />").attr("onclick", '$("[type=radio]").prop("checked",false);$(this).prop("checked",true)').prop("checked", true)
                        , $('<input type="text"  placeholder=" respuesta..." title="Opcion.." />').css({ "width": "70%" })

                        , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
                   ).css({ "width": "100%" })
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })
        //evento de modificar pregunta
        $("#agregar_a_curso").on("click", function () {
            //si es editada
            PREGUNTAS.forEach(function (item, indice) {
                if (item.nombre == OBJ_PREGUNTA.nombre) {
                    PREGUNTAS.splice(indice, 1)
                }
            })

            obtener_datos_pregunta("radio")
        })
    }
    function pregunta_enlace() {
        $("#titulo").text("Colorear Respuesta Segun Su Pregunta.")
       
        //agregar opciones    
        $.each(OBJ_PREGUNTA.preguntas, function (index, item) {
            //agregar campo de opcion y sus componentes
            $("#edicion_preguntas >div").append(
                $("<div  class='opt_1_resp' >").append(
                     $("<input type='text'  placeholder=' Pregunta...' class='enlace_p' id='preg_" + ($(".opt_1_resp").length) + "'  title='respuesta..' />").val(item).css({ "width": "40%" })
                    , $("<a class='fa fa-hand-o-right' ></a>").css({ " margin-left": "10px" })
                    , $('<input type="text"  placeholder=" Respuesta..." class="enlace_r"  title="Opcion.." />').val(OBJ_PREGUNTA.respuestas[index]).css({ "width": "40%" })
                    , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
               ).css({ "width": "100%" })
            )
        })

        //agrega evento a btn agregar
        $(".opt_1_agregar").on("click", function () {

            //Checa la cantidad de opciones en la pregunta
            if ($(".opt_1_resp").length < 5) {

                //agregar campo de opcion y sus componentes
                $("#edicion_preguntas >div").append(
                    $("<div  class='opt_1_resp' >").append(
                         $("<input type='text'  placeholder=' Pregunta...' class='enlace_p' id='preg_" + ($(".opt_1_resp").length) + "'  title='respuesta..' />").css({ "width": "40%" })
                        , $("<a class='fa fa-hand-o-right' ></a>").css({ " margin-left": "10px" })
                        , $('<input type="text"  placeholder=" Respuesta..." class="enlace_r"  title="Opcion.." />').css({ "width": "40%" })
                        , $("<input type='button' title='Quitar' class='borrar' value='X' />").attr("onclick", "$(this).parent().remove()").css({ "border": "none", "background": "none" })
                   ).css({ "width": "100%" })
                )
            } else alert("Maximo De Campos Seleccionado!!!")
        })

        //evento de agregar pregunta
        $("#agregar_a_curso").on("click", function () {
            //si es editada
            PREGUNTAS.forEach(function (item, indice) {
                if (item.nombre == OBJ_PREGUNTA.nombre) {
                    PREGUNTAS.splice(indice, 1)
                }
            })
            obtener_datos_pregunta_enlace()
        })
    }
}
//funcion enviar datos guardar
function guardar_datos() {
    var i = 0;
    var datos = []
    var f_curso = function () {
        var dato = "";
        $("#cursos option").each(function (index, item) {
            if ($(this).val() == $("#selector_cursos").val()) {
                dato = ($(this).attr("name"));
            }
        })
        return dato;
    }()
    //elimina los cuestionarios anteriores
    conexion_ajax("/servicios/dh_cursos.asmx/Eliminar_cuestionarios_cursos", {
        id_curso: f_curso});
    PREGUNTAS.forEach(function (item, index) {
        conexion_ajax("/servicios/dh_cursos.asmx/Guardar_cuestionarios_cursos", item);
        i++;
    })
    $(".datos_preguntas").remove()
    alert(i + " Datos Guardados...")
    $("#selector_cursos").val("")
    CURSOS = [];
    PREGUNTAS = [];
    OBJ_CURSO = {}
    tipo;
    OBJ_PREGUNTA = {}
}
//funcion obtener datos cuestionarios
function obtener_cuestionarios() {
    $(".datos_preguntas").remove();
    PREGUNTAS = [];

  var f_curso=function () {
        var dato = "";
        $("#cursos option").each(function (index, item) {
            if ($(this).val() == $("#selector_cursos").val()) {
                dato = ($(this).attr("name"));
            }
        })
        return dato;
    }()
  var preguntas = conexion_ajax("/servicios/dh_cursos.asmx/obtener_cuestionarios_cursos", { "id_curso": f_curso })
  if (preguntas.length > 0) { 
  preguntas.forEach(function (item, index) {

      if (item.tipo != "enlace") {
          if (item.respuestas == "True" || item.respuestas == "true")
              item.respuestas = true
          if (item.respuestas == "False" || item.respuestas == "false")
              item.respuestas = false
      }

      if (index == 0) {
          OBJ_PREGUNTA = {
              nombre: ""
                  , preguntas: []
                  , respuestas: []
                  , tipo: ""
                  , id_curso: f_curso
          }
        
          OBJ_PREGUNTA.nombre = item.nombre;
          OBJ_PREGUNTA.id_curso = item.id_curso;
          OBJ_PREGUNTA.tipo = item.tipo
      }
      if (OBJ_PREGUNTA.nombre == item.nombre) {

          OBJ_PREGUNTA.preguntas.push(item.preguntas)
          OBJ_PREGUNTA.respuestas.push(item.respuestas)
      }
      else if (OBJ_PREGUNTA.nombre != item.nombre) {

          PREGUNTAS.push(OBJ_PREGUNTA)

          OBJ_PREGUNTA = {
              nombre: item.nombre
                 , preguntas: []
                 , respuestas: []
                 , tipo: item.tipo
                 , id_curso:  item.id_curso
          }
          OBJ_PREGUNTA.preguntas.push(item.preguntas)
          OBJ_PREGUNTA.respuestas.push(item.respuestas)

         
      }
  })
  PREGUNTAS.push(OBJ_PREGUNTA)
  llenar_tabla_preguntas()
  }
    else alert("Curso Vacio!")
}
/***************************************************************************
            manejo del DOM
***************************************************************************/
//llena de opciones la lista de cursos mediante llamada ajax
function llenar_lista_cursos() {
    CURSOS = conexion_ajax("servicios/dh_cursos.asmx/obtener_datos_cursos")
    $.each(CURSOS, function (index, item) {
        $("#cursos").append(
            $("<option />").attr("name", item.id_curso).val(item.nombre_curso)
            );
    })
}
function mostrar_datos_curso(nombre) {

    $.each(CURSOS, function (index, item) {
        if (nombre == item.nombre_curso) {
            OBJ_CURSO = item;
        }
    })
    $("#img").attr("src", OBJ_CURSO.imagen);
        $("#img").show()
}
//llenar tabla preguntas
function llenar_tabla_preguntas() {
    $(".datos_preguntas").remove()
    $.each(PREGUNTAS, function (index, item) {
         $("#lista_preguntas").append(
            $("<tr>").append(
                   $("<td>").append(index + 1).css({ "text-align": "center" })
                 , $("<td>").append(item.nombre)
                 , $("<td>").append(item.tipo).css({ "text-align": "center" })
             ).addClass("datos_preguntas")
          )
    })

    $(".datos_preguntas").on("click", function () {
       $(".datos_preguntas").removeClass("pregunta_activa");
       $(this).addClass("pregunta_activa");

        $.each(PREGUNTAS, function (index, item) {
            if (item.nombre == $(".pregunta_activa :nth-child(2)").text()) {
                OBJ_PREGUNTA = item;
            }
       })
    });
   $(".pregunta_activa").on("click", function () {
         $(".datos_preguntas").removeClass("pregunta_activa");
    });
}
