$(document).ready(function () {
    llenar_lista_puestos()
    obtener_cursos_guardados()
    Habilitar_bloquear_controles(true)
    dar_evento_a_botones()
    /*if($("#img").attr("src")=="")
        $("#img").hide()
    else
        $("#imagen p").show()
    checar_imagen_cambio();*/
})
/*********************************************
    variable global
*********************************************/

/***********************************************
            funciones Generales
***********************************************/
function guardar_actualizar() {
    var consulta = conexion_ajax("/servicios/dh_cursos.asmx/dh_cursos_guardar_actualizar", obtener_datos_curso())
    alert(consulta);
    obtener_cursos_guardados()
}
//obtener el ultimo folio
function obtener_ultimo_folio() {
    var consulta = conexion_ajax("/servicios/dh_cursos.asmx/Obtener_ultimo_folio")
    $("#folio_curso").val((consulta+1))
}
//obtener datos curso
function obtener_datos_curso() {
    //objeto que contiene los datos
         return {
            id_curso: $("#folio_curso").val()
              , nombre: $("#Nombre_curso").val()
              , estatus: $("#estatus_cusro").val()
              , puesto: (function () {
                  var dato;
                  $("#puestos option").each(function (index, item) {
                      if ($("#selector_puestos").val() == $(this).val())
                          dato = parseInt($(this).attr("name"));
                  })
                  return dato;
              }())
             , imagen: $("#img").attr("src")
             , nombre_pertenece: $("#selector_puestos").val()
        }
}
//resetear lis inputs
function reset_a_inputs() {
    $("#folio_curso").val("")
    $("#Nombre_curso").val("")
    $("#estatus_cusro").val("V")
    $("#selector_puestos").val("")
}
//cambia el estado de los input de edicion de curso
function Habilitar_bloquear_controles(estado) {
    $("#folio_curso").attr("disabled",true)
    $("#Nombre_curso").attr("disabled", estado)
    $("#estatus_cusro").attr("disabled", estado)
    $("#selector_puestos").attr("disabled", estado)
}
//dar evento a botones
function dar_evento_a_botones() {
    $("#btNuevo").on('click', function () {
        Habilitar_bloquear_controles(false);
        reset_a_inputs();
        obtener_ultimo_folio();
        $(".datos_curso").removeClass("seleccio_curso")
    });
    $("#btEditar").on('click', function () {
        if ($("#folio_curso").val()) {
            Habilitar_bloquear_controles(false);
        }
        else alert("Seleccione Un Curso...")
    });
    $("#btDeshacer").on('click', function () {
        $("#img").attr("src", "")
       // checar_imagen_cambio();
        reset_a_inputs();
        Habilitar_bloquear_controles(true);
        $(".datos_curso").removeClass("seleccio_curso")
    });
    $("#btGuardar").on('click', function () {
        if ($("#folio_curso").val() && !$("#Nombre_curso").attr("disabled") && $("#folio_curso").val() != "" && $("#selector_puestos").val() != "") {
            guardar_actualizar();
            reset_a_inputs();
            Habilitar_bloquear_controles(true);
            $(".datos_curso").removeClass("seleccio_curso")
        }
        else alert("Nada que Guardar")

    });
    $("#filtro_tabla_cursos").on('click', function () {
            reset_a_inputs();
            Habilitar_bloquear_controles(true);
        $(".datos_curso").removeClass("seleccio_curso");
    });
    $("#imagen").on("click", function () {
        if (!$("#Nombre_curso").attr("disabled"))
        $("#inp").click()
    })
    //activa la seleccion de la imagen y obtiene su codigo base64
    $("#inp").on("change", function () {
        if (this.files && this.files[0]) {
            var archivo = new FileReader();
            archivo.onload = function (e) {
                $("#img").attr("src", e.target.result);
            };
            archivo.readAsDataURL(this.files[0]);
        }
        //checar_imagen_cambio();
    })
}
function checar_imagen_cambio() {
    if ($("#img").attr("src") != "" && $("#img").attr("src") != undefined) {
        $("#img").fadeIn(500)
        $("#imagen p").fadeOut(500)
    }
    else {
        $("#img").fadeOut(500)
        $("#imagen p").fadeIn(500)
    }
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
        //checar_imagen_cambio();
    })
}
//creamos la funcion de filtar
function filtrar_tabla_cursos() {
    //recorremos la tabla a filtrar
    $("#tabla_cursos tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();

        $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#filtro_tabla_cursos").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $("#tabla_cursos tr:hidden").show();
        $.each(s, function () {
            $("#tabla_cursos tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });
}//fin 9
/***********************************************
            manejo DOM
***********************************************/
function llenar_lista_puestos() {
    var lista_puestos = conexion_ajax("/servicios/dh_cursos.asmx/obtener_puestos");
    $.each(lista_puestos, function (index, dato) {
        var opcion = $("<option  name='" + dato.folio_puesto + "' title='"+dato.abreviatura_puesto+"' >")
        opcion.val(dato.nombre_puesto)
        opcion.attr("name", dato.folio_puesto);
       opcion.attr("title", dato.abreviatura_puesto);
        $("#puestos").append(opcion);
    });
    return lista_puestos;
}//fin
//obtiene los cursos guardados
function obtener_cursos_guardados() {
    var consulta = conexion_ajax("/servicios/dh_cursos.asmx/obtener_datos_cursos")
    $(".datos_curso").remove()
    $.each(consulta, function (index, item) {

        var filla = $("<tr class='datos_curso'></tr>")
        filla.append($("<td></td>").append(item.id_curso).css({"width":"30px","text-align":"center"}))
        filla.append($("<td></td>").append(item.nombre_curso))
        filla.append($("<td></td>").append(item.puesto_pertenece).css({ "text-align": "center" }))
        filla.append($("<td></td>").append(
            (function (valor) {
                var dato;
                $("#puestos option").each(function (index, item) {
                    if (valor == parseInt($(this).attr("name")))
                        dato = $(this).val();
                })
                return dato;
            }(item.puesto_pertenece))
            ))
        filla.append($("<td></td>").append(
            (function (estatus) {
                if (estatus == "v" || estatus=="V")
                    return "vigente";
                else if (estatus == "c" || estatus == "C")
                    return "cancelado"
                else return "indefinido"
            }(item.estatus))
            ).css({ "text-align": "center" }))
        $("#tabla_cursos").append(filla)
    })
    filtrar_tabla_cursos();
    //funcion onclick tabla Cursos
    $(".datos_curso").on("click", function () {
        Habilitar_bloquear_controles(true);
        var consulta = { 
            id_curso: ""
            , nombre_curso: ""
            , estatus: ""
            , puesto_pertenece: ""
        };
        $(this).children("td").each(function (index, item) {
            switch (index) {
                case 0:
                    consulta.id_curso = $(this).text();
                case 1:
                    consulta.nombre_curso = $(this).text();
                case 3:
                    consulta.puesto_pertenece = $(this).text();
                case 4:
                    consulta.estatus = $(this).text();
            }           
        })

        $("#folio_curso").val(consulta.id_curso)
        $("#Nombre_curso").val(consulta.nombre_curso)
        $("#estatus_cusro").val(
            (function (estatus) {
                if (estatus == "vigente")
                    return "V";
                else if (estatus == "cancelado")
                    return "C"
                else return ""
            }(consulta.estatus))
            )
        $("#selector_puestos").val(consulta.puesto_pertenece)
        $(".datos_curso").removeClass("seleccio_curso")
        $(this).toggleClass("seleccio_curso")
       // checar_imagen_cambio();
        obtener_imagen()
    })
   
}
//datos curso por folio
function obtener_datos_curso_por_folio(){
    var consulta = conexion_ajax("/servicios/dh_cursos.asmx/obtener_datos_cursos_folio", { folio: $("#folio_curso").val() })
    $("#folio_curso").val(consulta.id_curso)
    $("#Nombre_curso").val(consulta.nombre_curso)
    $("#estatus_cusro").val(consulta.estatus)
    $("#selector_puestos").val(
        (function (valor) {
            var dato;
            $("#puestos option").each(function (index, item) {
                if (valor == parseInt($(this).attr("name")))
                    dato = $(this).val();
            })
            return dato;
        }(consulta.puesto_pertenece))
    )
    obtener_imagen()
}

function obtener_imagen() {

    var folio_curso = $("#folio_curso").val();
    $("#img").attr("src", "")
   // checar_imagen_cambio();
        var xhttp = new XMLHttpRequest();
        var respuesta = "";
        xhttp.onreadystatechange = function () {//checamos si hay resultado
            if (this.readyState == 4 && this.status == 200) {
                respuesta = this.responseText;//cachamos el resultado
                respuesta = JSON.parse(respuesta);//parseamos a Json
                $("#img").attr("src", respuesta.d.imagen)
               // checar_imagen_cambio()
            }//si no hay resultado manda una alerta
            else if (this.status > 200)
                alert("Error:" + this.status);
        };//fin
        //llamada al servicio
        xhttp.open("post", "/servicios/dh_cursos.asmx/obtener_datos_cursos_folio", true);
        //tipo de datos 
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        //Datos a enviar
        xhttp.send(JSON.stringify({ "folio": folio_curso }));
}