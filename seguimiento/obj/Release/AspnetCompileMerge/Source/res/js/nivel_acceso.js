
$(document).ready(function () {
    //mostrar_usuarios_en_contenedor()
});
/*****************************************************
        variables globales
*****************************************************/
var USUARIO = {};
var USUARIOS = [], TOTAL_MENUS = [], MENU = {}, MENUS_USUARIO = [];

/*****************************************************
        funciones globales
*****************************************************/
function mostrar_usuarios_en_contenedor() {

    USUARIOS = conexion_ajax("servicios/accesoServ.asmx/Obtener_lista_usuarios");
    $("#contenedor_usuarios *").remove();

    USUARIOS.forEach(function (item, index) {
        var email = "Sin Correo.";

        if (item.email_usuario.length > 1 && item.email_usuario.length < 30) { email = item.email_usuario; }
        else if (item.email_usuario.length >= 30) { email = email.slice(0, 25) + "..." }

        $("#contenedor_usuarios").append(
            $("<div>").append(
                $("<i>").addClass("fa fa-user")
              , $("<h2>").append("Nombre: "+item.nombre_usuario + ".").css({ "color": "#000000" })
              , $("<p>").append("Correo: " + email)
              , $("<a>").text(" ").addClass("fa fa-lock").attr("title", "Permisos.").css({ "color": "#dea949" })
              , $("<a>").text(" ").addClass("fa fa-edit").attr("title", "Editar.").css({ "color": "#1a8fff" })
              , $("<a>").text(" ").addClass("fa fa-user-plus").attr("title", "Agregar.").css({ "color": "#158b1f" })
              , $("<a>").text(" ").addClass("fa fa-user-times").attr("title", "Eliminar.").css({ "color": "#ff0000" })       
            ).addClass("card_usuario").attr({ "name": item.id_usuario, "title": item.nombrecompleto_usuario })
          )
    })
    eventos_botones_de_accion_usuarios();
}
function eventos_botones_de_accion_usuarios() {
    $(".card_usuario").mouseover(function () {
        var id = $(this).attr("name");
        USUARIOS.forEach(function (item, index) {if (item.id_usuario == id) { USUARIO=item } });
    });
    $(".fa-lock").on("click", function () { manejo_de_usuarios.Editar_permisos() });
    $(".fa-edit").on("click", function () { manejo_de_usuarios.Editar_datos() });
    $(".fa-user-plus").on("click", function () { manejo_de_usuarios.Agregar_usuario() });
    $(".fa-user-times").on("click", function () { manejo_de_usuarios.Eliminar_usuario() });

}
/*****************************************************
        clases manejo de usuarios
*****************************************************/
class manejo_de_usuarios {

    static Editar_permisos() {
        this.preparar_modal_manejo_usuario("Permisos De Acceso.");
        manejo_de_acceso_a_menus.llenar_contenedor();

    }
    static Editar_datos() {
        this.preparar_modal_manejo_usuario("Edicion De Datos.");
        this.Crear_componentes_datos_usuario();
        this.Agregar_datos_usuario_a_editar();

        $("#btn_guardar").on("click", function () {
            if (manejo_de_usuarios.Agregar_datos_a_objeto_usuario()) {
                manejo_de_usuarios.Actualizar_datos_objeto_usuario();
            }
        });
    }
    static Agregar_usuario() {
        this.preparar_modal_manejo_usuario("Agregar Usuario.");
        this.Crear_componentes_datos_usuario();
        $("#btn_guardar").on("click", function () {
           if(manejo_de_usuarios.Agregar_datos_a_objeto_usuario()){
               manejo_de_usuarios.Guardar_datos_objeto_usuario();
           }
        });
    }
    static Eliminar_usuario() {
        if (confirm("Eliminar Usuario.\n" + USUARIO.nombrecompleto_usuario + "\nSe Perdera Toda la Informacion.\nDesea Continuar?")) {
            if (conexion_ajax("servicios/accesoServ.asmx/eliminar_usuario", { id_usuario: USUARIO.id_usuario })) { 
                alert("Usuario Eliminado!!!");
                mostrar_usuarios_en_contenedor();
            }
        }
    }
    static preparar_modal_manejo_usuario(titulo) {
        $("#titulo_modal").text(titulo);
        $("#modal_manejo_usuario").show();
        $("#contenedor *").remove();
    }
    static Crear_componentes_datos_usuario() {

        $("#contenedor").append(
              $("<p>").text("ID: ").css({ "display": "inline-block", "margin-left": "30px" })
            , $("<input/>").attr({ "id": "id_usuario", "disabled": true }).css({ "width": "50px", " text-align": "center", "margin-left": "10px", "margin-right": "10px" })
            , $("<p>").text("*Nombre: ").css({ "display": "inline-block" })
            , $("<input/>").focus().attr({ "id": "Nombre_completo", "autofocus": "autofocus" }).css({ "width": "475px", " text-align": "left", "margin-left": "10px", "margin-right": "10px" })
            , $("<br>")
            , $("<p>").text("*Usuario: ").css({ "display": "inline-block", "margin-left": "30px" })
            , $("<input/>").attr({ "id": "nombre_corto" }).css({ "width": "180px", " text-align": "left", "margin-left": "10px", "margin-right": "10px" })
            , $("<p>").text("Email: ").css({ "display": "inline-block" })
            , $("<input/>").attr({ "id": "correo", "type": "email" }).css({ "width": "330px", " text-align": "left", "margin-left": "10px", "margin-right": "10px" })
            , $("<br>")
            , $("<p>").text("SCOI: ").val(0).css({ "display": "inline-block", "margin-left": "30px" })
            , $("<input/>").attr({ "id": "id_scoi"}).css({ "width": "40px", " text-align": "left", "margin-left": "10px", "margin-right": "10px" })
            , $("<p>").text("Nivel: ").css({ "display": "inline-block" })
            , $("<input/>").val(0).attr({ "id": "nivel_usuario", "disabled": true }).css({ "width": "20px", " text-align": "center", "margin-left": "10px", "margin-right": "10px" })
            , $("<p>").text("*Contraseña: ").css({ "display": "inline-block" })
            , $("<input/>").attr({ "id": "pasword", "type": "password" }).css({ "width": "150px", " text-align": "left", "margin-left": "10px", "margin-right": "10px" })
            , $("<p>").text("*Validar: ").css({ "display": "inline-block" })
            , $("<input/>").attr({ "id": "pasword_confirm", "type": "password" }).css({ "width": "150px", " text-align": "left", "margin-left": "10px", "margin-right": "10px" })
            , $("<br>")
            , $("<input>").val("Guardar.").attr({ "type": "button", "id": "btn_guardar" })
            );
        //evento keyup pasword
        $("#pasword_confirm").on("keyup", function () {   $(this).removeClass("dato_error") })
    }
    static Agregar_datos_usuario_a_editar() {

        $("#id_usuario").val(USUARIO.id_usuario);
        $("#Nombre_completo").val(USUARIO.nombrecompleto_usuario);
        $("#nombre_corto").val(USUARIO.nombre_usuario);
        $("#correo").val(USUARIO.email_usuario);
        $("#id_scoi").val(USUARIO.id_scoi);
        $("#pasword").val(USUARIO.pasword);
        $("#pasword_confirm").val("");
    }
    static Agregar_datos_a_objeto_usuario() {

        if (this.validar_campos()) {
            if ($("#pasword").val() == $("#pasword_confirm").val()) {
                if (!$("#id_scoi").val()) { id_scoi: $("#id_scoi").val(0) }
                if (!$("#correo").val()) { id_scoi: $("#correo").val(" ") }
                USUARIO={
                    id_usuario:$("#id_usuario").val()
                    ,Nombre_completo:$("#Nombre_completo").val()
                    ,nombre_corto:$("#nombre_corto").val()
                    , email_usuario: $("#correo").val()
                    , nivel_usuario: $("#nivel_usuario").val()
                    ,id_scoi:$("#id_scoi").val()
                    ,pasword:$("#pasword").val()
                }
                return true;
            }
            else {
                alert("contraseña erronea!!!")
                $("#pasword_confirm").addClass("dato_error");
                return false;
            }
        }
        else {alert("Faltan Campos!!")
            return false;
        }
    }
    static validar_campos() {
        if ($("#Nombre_completo").val() != ""
         && $("#nombre_corto").val() != ""
         && $("#pasword").val() != ""
         && $("#pasword_confirm").val() != "") {
            return true;
        }
        else   return false;
    }
    static Guardar_datos_objeto_usuario() {
        if (conexion_ajax("servicios/accesoServ.asmx/guardar_usuario", USUARIO)){
            alert("Guardado...");
            $("#modal_manejo_usuario").hide();
            mostrar_usuarios_en_contenedor();
        }
    }
    static Actualizar_datos_objeto_usuario() {
        if (conexion_ajax("servicios/accesoServ.asmx/actualizar_usuario", USUARIO)) { 
            $("#modal_manejo_usuario").hide();
            mostrar_usuarios_en_contenedor();
            alert("Datos Actualizados!!!");
        }
    }
}
class manejo_de_acceso_a_menus{
    static llenar_contenedor() {
        manejo_de_acceso_a_menus.componentes_usuario();
        manejo_de_acceso_a_menus.Obtener_menus_usuario();
    }
    static componentes_usuario() {
        $("#contenedor").append(
              $("<p>").text("ID: ").css({ "display": "inline-block", "margin-left": "30px" })
            , $("<input/>").val(USUARIO.id_usuario).attr({ "id": "id_usuario", "disabled": true }).css({ "width": "50px", " text-align": "center", "margin-left": "10px", "margin-right": "10px" })
            , $("<p>").text("Nombre: ").css({ "display": "inline-block"})
            , $("<input/>").val(USUARIO.nombrecompleto_usuario).attr({ "id": "Nombre_completo", "autofocus": "autofocus", "disabled": true }).css({ "width": "475px", " text-align": "left", "margin-left": "10px", "margin-right": "10px" })
            , $("<br>")
            , $("<h2>").text("Accesos A Menu  :").attr({ "margin-right": "30px" }).css({ "display": "inline-block" })
            , $("<section>").addClass("fa fa-plus-circle").css({ "font-size": "25px", "color": "#1a8fff" }).attr({ "title": "Agregar", "margin-left": "30px" })
            ,$("<div>").append(
                $("<table>").addClass("tabla_menus_usuario")
            ).addClass("contenedor_menus_usuario")
       );
    }
    static Obtener_menus_usuario() {
        MENUS_USUARIO = conexion_ajax("servicios/accesoServ.asmx/checar_acceso", { id_usuario: USUARIO.id_usuario })

        MENUS_USUARIO.forEach(function (item, index) {
            if (index == 0) {
                MENU = item;
                $(".tabla_menus_usuario").append(
                    $("<tr>").append($("<th>").append(MENU.menu), $("<th>").text("Submenu"), $("<th>").attr({ "text-align": "center" }).text("Acceso")).addClass("cavecera_tabla"))
            }
            if (MENU.menu == item.menu) {
                $(".tabla_menus_usuario").append(
                     $("<tr>").append( $("<td>")
                        , $("<td>").append(item.sub_menu).attr({ "text-align": "left" })
                        , $("<td>").append( $("<input/>").attr({ "type": "checkbox", "name": item.id_sub_menu, "checked": item.acceso }))))
            }
            else if (MENU.menu != item.menu) {
                MENU = item;
                $(".tabla_menus_usuario").append(
                    $("<tr>").append($("<th>").append(MENU.menu), $("<th>").text("Submenu"), $("<th>").attr({ "text-align": "center" }).text("Acceso")).addClass("cavecera_tabla")
                    , $("<tr>").append($("<td>")
                        , $("<td>").append(item.sub_menu).attr({"text-align": "left"})
                        , $("<td>").append( $("<input/>").attr({ "type": "checkbox", "name": item.id_sub_menu, "checked": item.acceso })) ))
            } 
        });
        $(".tabla_menus_usuario [type=checkbox]").on("click", function () {
            manejo_de_acceso_a_menus.Enviar_acceso_a_menu($(this));
        });
    }
    static Enviar_acceso_a_menu(checkbox) {
        conexion_ajax("servicios/accesoServ.asmx/guardar", {
              usuario: USUARIO.id_usuario
            , folio_sub_menu: checkbox.attr("name")
            , acceso: checkbox.prop("checked")
        })
    }
}
document.getElementById("dialog").style.display = "none";

//mostrar_usuarios_en_contenedor()
