$(document).ready(function () {
    bloquear(usuario);
});

function bloquear(nivelUsuario) {

    if (nivelUsuario == 8) {//8 es el numero de nivel de los evaluadores
        $(".menu_section").eq(0).hide();
        $(".menu_section").eq(1).hide();
        $(".menu_section").eq(2).find("li").eq(0).hide();
    }

}