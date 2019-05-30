

function isLogon() {
    var usuario = 0//document.getElementById("verificar").innerHTML; //document.getElementById("Label1").innerHTML;
    console.log("status:" + usuario);
    //usuario = null;
    //console.log("USUARIO: " + usuario);
    if (usuario === 1) console.log("status:" + usuario);
    else if (usuario == 0) window.location.href = "http://localhost:1987/login.aspx";console.log("logout");

    console.log("status:" + usuario);
}
function myTimer() {
    var d = new Date();
    document.getElementById("tiempo").innerHTML = "DATE: " + d.toLocaleTimeString() + " -" + " " + d.toLocaleDateString() + " .";
   // console.log("DATE: " + d.toLocaleTimeString() + " -" + " " + d.toLocaleDateString() + " .");
}
//
$(document).ready(function () {
//    $("#tAdministracion").html($("#lista")).size();
   
});
$(document).ready(function () {
    $(".modal").hide();
    $(".drop").click(function () {
        $(".drop").toggleClass("open");
        $(".main_menu_side hidden-print main_menu > li").toggleClass("open");
    });
});
/**
function permisos(){
    document.getElementById("#tAdministracion") = document.html($("#nav side-menu")).size();
    alert("ya");
}
permisos();
**/