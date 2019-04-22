
//VARIABLES GLOBALES
var USUARIOS_SCOI = [], USUARIO_SCOI = {}, RESTRICCION_USUARIOS = [],USUARIOS_SELECCIONADOS=[], CURSOS = [], CURSO = {}, CURSOS_CARGADOS = [];

class alerta {
    /*
        alert-success
        alert-info
        alert-warning
        alert-danger
    */
    constructor(mensaje, alerta) {
        $("#ContAsignador").append(
            $("<div>").append(
                 $("<a>").attr("onclick", "$(this).parent().remove()").addClass("glyphicon glyphicon-remove close")
               , $("<strong>").text("Advertencia!")
               , $("<p>").text(mensaje)
            ).css({"color":"black"}).addClass("alert " + alerta));
    }
}
class Usuarios{
    constructor() {
        Usuarios.llenar_tabla_de_vistas();
    }
    static llenar_tabla_de_vistas() {
        $.each(USUARIOS_SCOI, function (index, item) {
            var puesto = item.puesto;
            var nombre = item.nombre_completo;
            if (puesto.length > 37) { puesto = puesto.slice(0, 37) + "..." }
            if (nombre.length > 27) { nombre = nombre.slice(0, 27) + "..." }

            $("#cont_tabla_usuarios").append(
                $("<div>").append(
                    $("<div>").append(
                      $("<img>").attr({ "src": " " , "alt": "foto_" + item.id_scoi, "id": "foto_" + item.id_scoi }).css({ "margin-right": "10px", "margin-left": "5px", "margin-top": "2px", "height": "55px" }).addClass("img-thumbnail")
                    , $("<h4>").text(nombre).addClass("nombre_usuario")
                    , $("<div>").append(
                                       $("<a>").attr("title"," Informacion Detalles de Cursos.").addClass("glyphicon glyphicon-info-sign mostrar_usuario")
                                     , $("<a>").attr("title", " Asignar a Curso Seleccionado.").addClass("glyphicon glyphicon-upload agregar_usuario")
                    ).attr({ "name": item.id_scoi }).css({ "margin-left": "100px", "margin-top":"-20px"})
                ).addClass("nombre_usr")
                   , $("<div>").append($("<i>").addClass("glyphicon glyphicon-education")
                                     , $("<h4>").text("Escolaridad: ")
                                     , $("<p>").text(item.escolaridad).addClass("escolaridad")
                     ).addClass("datos")
                   , $("<div>").append($("<i>").addClass("glyphicon glyphicon-tags")
                                     , $("<h4>").text("Puesto: ")
                                     , $("<p>").text(puesto).addClass("puesto")
                     ).addClass("datos")
                   , $("<div>").append($("<i>").addClass("glyphicon glyphicon-time")
                                     , $("<h4>").text("\tTurno: ")
                                     , $("<p>").text(item.horario)
                     ).addClass("datos")
                   , $("<div>").append($("<i>").addClass("glyphicon glyphicon-cog")
                                     , $("<h4>").text("Departamento: ")
                                     , $("<p>").text(item.departamento)
                     ).addClass("datos")
                   , $("<div>").append($("<i>").addClass("glyphicon glyphicon-briefcase")
                                     , $("<h4>").text("\tEstablecimiento: ")
                                     , $("<p>").text(item.establecimiento).addClass("establecimiento")
                     ).addClass("datos")
                ).addClass("usuarios_vista").attr("name",item.id_scoi)
             );
            obtener_imagen_usuario(item.id_scoi);
        });

        Usuarios.filtro_usuarios();
        Usuarios.mostrar_detalles();

        $("#sel_filtro").on("change", function () {
            $("#filtro_usuarios").val(null);
            $(".usuarios_vista").show();
        })
        $(".agregar_usuario").on("click", function () {
            var id = $(this).parent().attr("name");

            if (!jQuery.isEmptyObject(CURSO)) {                
                if (USUARIOS_SELECCIONADOS.indexOf(USUARIOS_SELECCIONADOS.find(dato =>dato.id_scoi == id)) === -1)
                      Usuarios.agregar_usuario_seleccionado_a_lista(id);
               else {
                  new alerta("El Usuario: " + id + " ya Existe", "alert-warning");
               }
               
            }
            else {
                new alerta("Seleccione Un Curso!!!", "alert-warning");
            }
        }); 
        function obtener_imagen_usuario(id) {
            var indice = USUARIOS_SCOI.indexOf(USUARIOS_SCOI.find(usuario=>usuario.id_scoi == id));
            var xhttp = new XMLHttpRequest();
            var respuesta = "";
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    respuesta = this.responseText;
                    respuesta = JSON.parse(respuesta);
                    USUARIOS_SCOI[indice].foto =  respuesta.d.foto;
                    $("#foto_" + id).attr("src", USUARIOS_SCOI[indice].foto);
                    $("#foto_sel_" + id).attr("src", USUARIOS_SCOI[indice].foto);
                }
                else if (this.status > 200) { 
                    console.log(id+" : Error:" + this.status);
                    obtener_imagen_usuario(id);
                }
            };//fin
            //llamada al servicio
            xhttp.open("post", "/servicios/ususrios_scoiServ.asmx/obtener_usuario_imagen", true);
            //tipo de datos 
            xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
            //Datos a enviar
            xhttp.send(JSON.stringify({ tipo: "id_scoi", filtro: id }));
        }
    }
    static agregar_usuario_seleccionado_a_lista(id) {
        USUARIO_SCOI = USUARIOS_SCOI.find(usuario => usuario.id_scoi == id);

        if (RESTRICCION_USUARIOS.findIndex(usr=> usr.id_usuario == id) == -1) {
            agregar();
        } else if (confirm("El Usuario \"" + USUARIO_SCOI.nombre_completo + "\", Cuenta Con Curso Vigente \n ¿agregar De nuevo?")) {
            agregar();
            new alerta("El anterior Curso Se Cancelara Al Guardar!!!", "alert-info");
        }
        function agregar(){
            $("#cont_tabla_seleccionados").append(
                $("<div>").append(
                          $("<i>").addClass("glyphicon glyphicon-remove cerrar close")
                        , $("<img>").attr({ "src": USUARIO_SCOI.foto, "alt": USUARIO_SCOI.id_scoi, "id": "foto_sel_" + USUARIO_SCOI.id_scoi }).addClass("img-rounded lista_usuario_foto")
                        , $("<section>").append(
                              $("<i>").css({ "margin-right": "10px", "font-size": "15px" }).addClass("glyphicon glyphicon-user")
                            , $("<h4>").text(" " + USUARIO_SCOI.nombre_completo).addClass("modal-title")
                        ).addClass("separadores_datos_resultados")
                        , $("<section>").append(
                              $("<i>").css({ "margin-right": "10px", "font-size": "15px" }).addClass("glyphicon glyphicon-tags")
                            , $("<h4>").text(" " + USUARIO_SCOI.puesto).addClass("modal-title")
                        ).addClass("separadores_datos_resultados")
                        , $("<section>").append(
                              $("<i>").css({ "margin-right": "10px", "font-size": "15px" }).addClass("glyphicon glyphicon-briefcase")
                            , $("<h4>").text(" " + USUARIO_SCOI.establecimiento).addClass("modal-title")
                        ).addClass("separadores_datos_resultados")
                ).addClass("panel-default lista_usr_seleccionados").attr({ "id": id })
             );
             //agrega a arreglo de seleccionados
             USUARIOS_SELECCIONADOS.push(USUARIO_SCOI);
            $(".cerrar").on("click", function () {
                var id = $(this).parent().attr("id");
                $(this).parent().remove();
               
                var pos = USUARIOS_SELECCIONADOS.indexOf(USUARIOS_SELECCIONADOS.find(dato =>dato.id_scoi == id));
                new alerta(USUARIOS_SELECCIONADOS[pos].nombre_completo + " Fue Eliminado !!!", "alert-danger");
                if (pos > -1) {
                    USUARIOS_SELECCIONADOS.splice(pos, 1);
                }
            });
        }
    }
    static usuarios_restringidos() {
        var detalles;
        RESTRICCION_USUARIOS=[];
        if (!jQuery.isEmptyObject(CURSO)) {
            //detalles = conexion_ajax("/servicios/dh_cursos.asmx/dh_cursos_estados_vista", { id_curso: $("#selector_curso").val() });
           
            var xhttp = new XMLHttpRequest();
            var respuesta = "";
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    respuesta = this.responseText;
                    respuesta = JSON.parse(respuesta);
                    RESTRICCION_USUARIOS = respuesta.d;
                }
                else if (this.status > 200) {
                    console.log(id + " : Error:" + this.status);

                }
            };//fin
            //llamada al servicio
            xhttp.open("post", "/servicios/dh_cursos.asmx/dh_cursos_estados_vista", true);
            //tipo de datos 
            xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
            //Datos a enviar
            xhttp.send(JSON.stringify({ id_curso: $("#selector_curso").val() }));
        }
    }
    static filtro_usuarios() {
        var value = "";
        $("#filtro_usuarios").on("keyup", function () {
            value = $(this).val().toLowerCase();

            if ($("#sel_filtro").val() == "Nombre") { filtro(".nombre_usuario") }
            else if ($("#sel_filtro").val() == "Escolaridad") { filtro(".escolaridad") }
            else if ($("#sel_filtro").val() == "Puesto") { filtro(".puesto") }
            else if ($("#sel_filtro").val() == "Establecimiento") { filtro(".establecimiento") }
         });
        function filtro(dato) {
            $(dato).filter(function () {
                $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    }
    static obtener_usuarios_por_filtro() {
        var filtro = [];

        $(".usuarios_vista").each(function (index, item) {
            if ($(this).css("display") != "none") {
                filtro.push($(this).attr("name"))
            }
        });
        $.each(filtro, function (index, id) {
            if (USUARIOS_SELECCIONADOS.indexOf(USUARIOS_SELECCIONADOS.find(dato =>dato.id_scoi == id)) === -1) {
                Usuarios.agregar_usuario_seleccionado_a_lista(id);
            }
        });
        new alerta("Usuarios Agregados...","alert-info");
    }
    static mostrar_detalles() {
        $(".mostrar_usuario").on("click", function () {
            Cursos.vista_estados($(this).parent().attr("name"));
            USUARIO_SCOI = USUARIOS_SCOI.find(dato =>dato.id_scoi == $(this).parent().attr("name"));
            modal();
            tabla();
        })

        function modal() {
            $("#resultados_usuario").show();
            $("#nom_usuario").text(USUARIO_SCOI.nombre_completo);
            $("#puesto_usuario").text(USUARIO_SCOI.puesto);
            $("#establecimiento_usuario").text(USUARIO_SCOI.establecimiento);
            $("#resultados_usuario_foto").attr({ "src": USUARIO_SCOI.foto, "alt": USUARIO_SCOI.id_scoi });
        }
        function tabla() {
            $(".datos_usuario").remove();
            $.each(CURSOS_CARGADOS, function (index, item) {
                $("#tabla_vistas").append(
                    $("<tr>").append(
                          $("<td>").append(item.id_curso)
                        , $("<td>").append(item.nombre_curso)
                        , $("<td>").append(item.estatus_curso)
                        , $("<td>").append(item.calificacion)
                        , $("<td>").append(item.f_aplico)
                        , $("<td>").append(item.f1)
                        , $("<td>").append(item.f2)
                        , $("<td>").append(item.d_tema)
                        , $("<td>").append(item.d_cuestionario)
                        , $("<td>").append(item.obs_estado)
                ).addClass("datos_usuario") )
            })    
        }
    }
}
class Cursos {
    constructor() {
        Cursos.llenar_lista();
    }
    static llenar_lista() {
        $.each(CURSOS, function (index, item) {
            $("#selector_curso").append(
                $("<option>").text(item.nombre_curso).val(item.id_curso)
                )
        })
    }
    static seleccionar() {
        CURSO = CURSOS.find(dato =>dato.id_curso == $("#selector_curso").val());
    }

    static vista_estados(scoi_usuario) {
        CURSOS_CARGADOS = conexion_ajax("/servicios/dh_cursos.asmx/dh_cursos_estados_vista_ususarios", { id_usuario: scoi_usuario });
    }
    static mostrar_detalles() {
        if (CURSO.imagen == "") { 
            CURSO.imagen = conexion_ajax("/servicios/dh_cursos.asmx/obtener_imagen_cursos", { id: $("#selector_curso").val() }).imagen;
            CURSOS.indexOf(CURSO).imagen = CURSO.imagen;
        }
       modal();
       tabla();
       function modal() {
            $("#cargados_curso").show();
            $("#nom_curso").text(CURSO.nombre_curso);
            $("#curso_foto").attr("src", CURSO.imagen)
        }
        function tabla() {
            $(".datos_usuario").remove();
            if (RESTRICCION_USUARIOS.length == 0) {
                RESTRICCION_USUARIOS = conexion_ajax("/servicios/dh_cursos.asmx/dh_cursos_estados_vista", { id_curso: $("#selector_curso").val() });
            }

            $.each(RESTRICCION_USUARIOS, function (index, item) {

                $("#tabla_vistas_aplicados").append(
                    $("<tr>").append(
                          $("<td>").append(item.id_usuario).css({ "text-align": "center" })
                        , $("<td>").append(item.nombre_usuario)
                        , $("<td>").append(item.estatus_curso)
                        , $("<td>").append(item.calificacion).css({ "text-align": "left" })
                        , $("<td>").append(item.f_aplico).css({ "text-align": "center" })
                        , $("<td>").append(item.f1).css({ "text-align": "center" })
                        , $("<td>").append(item.f2).css({ "text-align": "center" })
                        , $("<td>").append(item.d_tema)
                        , $("<td>").append(item.d_cuestionario)
                        , $("<td>").append(item.obs_estado)
                ).addClass("datos_usuario"))
            })
        }
        
    }
    static guardar_asignar_a_usuario() {
        if (Cursos.validar_campos()) {
           $.each(USUARIOS_SELECCIONADOS, function (index, item) {
                conexion_ajax("/servicios/dh_cursos.asmx/dh_asignar_curso_a_usuario", {
                    id_usuario: item.id_scoi
                    , id_curso: $("#selector_curso").val()
                    , f1: fechaCompleta("f1")
                    , f2: fechaCompleta("f2")
                })
           })
            //Barre los campos de seleccion
           $('#cont_tabla_seleccionados *').remove();
           USUARIOS_SELECCIONADOS.splice(0);

          new alerta("Guardado", "alert-success");
        }
        else new alerta("Revisar los Campos(Fecha Inicio, fin y el Curso Asignado.), Y Que La Cantidad De Usuarios Sea Por Lo Menos \"1\"...", "alert-warning");

       function fechaCompleta(id) {
            var dia = $('#'+id).val();
            var d = dia[8] + dia[9];
            var m = dia[5] + dia[6];
            var a = dia[0] + dia[1]+dia[2] + dia[3];

            return d + "-" + m + "-" + a;
        }//fin 13

    }
    static validar_campos() {
        return (USUARIOS_SELECCIONADOS.length > 0 && $("#selector_curso").val() != "Seleccione Curso..." && $("#f1").val() != "" && $("#f2").val() != "" && $("#f1").val() != undefined && $("#f2").val() != undefined);
    }
}

USUARIOS_SCOI = conexion_ajax("/servicios/ususrios_scoiServ.asmx/obtener_usuario", { tipo: "Todos", filtro: "Activo" });
CURSOS = conexion_ajax("/servicios/dh_cursos.asmx/obtener_datos_cursos");

$(document).ready(function () {
    /*inicializacion de clases del sistema*/
    new Cursos();
    new Usuarios();

    /*botones globales*/
    $("#selector_curso").on("change", function () {
        Cursos.seleccionar();
        $('#cont_tabla_seleccionados *').remove();
        $("#ContUsuarios").show();
        Usuarios.usuarios_restringidos();
    });
    $("#btn_eliminar").on("click", function () {
        $('#cont_tabla_seleccionados *').remove();
        new alerta(USUARIOS_SELECCIONADOS.length + ' Usuarios Eliminados!!!', 'alert-danger');
        USUARIOS_SELECCIONADOS.splice(0);
        $("#ContUsuarios").show();
    });
    $("#btn_seleccionar").on("click", function () {
        if (!jQuery.isEmptyObject(CURSO)) {
            Usuarios.obtener_usuarios_por_filtro();
        }
        else {
            new alerta("Seleccione Un Curso!!!", "alert-warning");
        }

    });
    $("#btn_guardar").on("click", function () {
        Cursos.guardar_asignar_a_usuario();
        Usuarios.usuarios_restringidos();
    });
    $("#btn_mostrar_asignados").on("click", function () {
        if($("#selector_curso").val() != "Seleccione Curso...")
            Cursos.mostrar_detalles();
        else new alerta(" Seleccione Un Curso...", "alert-warning");;

    });

});
