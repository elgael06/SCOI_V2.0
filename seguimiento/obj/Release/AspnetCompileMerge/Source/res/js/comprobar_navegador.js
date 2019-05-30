function verificar_navegador() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var nav = userAgent.split(" ");
    nav = nav[nav.length - 1];
    console.log(nav);
    if (nav[0] == "F") {
        $("#checar_navegador").hide()
    }
    else {
        $("#checar_navegador").show()
    }
}
verificar_navegador();