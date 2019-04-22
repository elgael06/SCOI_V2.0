

function isLogon() {
    var usuario = 0//document.getElementById("verificar").innerHTML; //document.getElementById("Label1").innerHTML;
    console.log("status:" + usuario);
    //usuario = null;
    //console.log("USUARIO: " + usuario);
    if (usuario === 1) console.log("status:" + usuario);
    else if (usuario==0) window.location.href = "http://localhost:1987/login.aspx",console.log("logout");

    console.log("status:" + usuario);
}
var myVar = setInterval(myTimer, 1000);
function myTimer() {
    var d = new Date();
    document.getElementById("tiempo").innerHTML = "DATE: " + d.toLocaleTimeString() + " -" + " " + d.toLocaleDateString() + " .";
   // console.log("DATE: " + d.toLocaleTimeString() + " -" + " " + d.toLocaleDateString() + " .");
}
//
$(document).ready(function () {
    $("#tAdministracion").html($("#lista")).size();
    console.log("no");
});

function myFunction() {
    var x = document.getElementById("TextBox2");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
/**
function permisos(){
    document.getElementById("#tAdministracion") = document.html($("#nav side-menu")).size();
    alert("ya");
}
permisos();
**/