

/*************************************
        variables globales
************************************/
var PREGUNTAS = [];
var OBJ_PREGUNTA = {};


/************************************
        funciones generales
************************************/
//funcion obtener datos cuestionarios
function obtener_cuestionarios() {

    $(".datos_preguntas").remove();
    PREGUNTAS = [];

    var f_curso = function () {
        var dato = "";
        $("#cursos option").each(function (index, item) {
            if ($(this).val() == $("#selector_cursos").val()) {
                dato = ($(this).attr("name"));
            }
        })
        return dato;
    }()
    var preguntas = conexion_ajax("/servicios/dh_cursos.asmx/obtener_cuestionarios_cursos", { "id_curso": f_curso })

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

            console.log(item.nombre + "," + item.preguntas + "," + item.respuestas)

            PREGUNTAS.push(OBJ_PREGUNTA)

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
            OBJ_PREGUNTA.preguntas.push(item.preguntas)
            OBJ_PREGUNTA.respuestas.push(item.respuestas)


        }

    })
    PREGUNTAS.push(OBJ_PREGUNTA)
}

/*************************************
        manejo de DOM
************************************/

