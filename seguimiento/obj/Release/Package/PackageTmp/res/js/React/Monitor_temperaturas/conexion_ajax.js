$(document).ready(function () {
    $("#dialog").hide();
});


/*********************************************************
                     CONEXIONES AJAX
*********************************************************/
//ESTA FUNCION RESIBE COMO PARAMETROS LA URL DEL SERVICIO Y LOS DATOS EN TIPO OBJETO Y SE PARSEA A JSON.
function conexion_ajax(url, datos) {
    $("#dialog").show();
    //variables a usar
    var xhttp = new XMLHttpRequest();
    var respuesta="";
    xhttp.onreadystatechange = function () {//checamos si hay resultado
        if (this.readyState === 4 && this.status === 200) {
            respuesta = this.responseText;//cachamos el resultado
            respuesta = JSON.parse(respuesta);//parseamos a Json
        }//si no hay resultado manda una alerta
        else if (this.status > 200)
            alert("Error:" + this.status);
    };//fin
    //llamada al servicio
    xhttp.open("post", url, false);
    //tipo de datos 
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //Datos a enviar
    xhttp.send(JSON.stringify(datos));
    $("#dialog").hide();
    return respuesta.d;
}//fin
//ESTA FUNCION RESIBE COMO PARAMETROS LA URL DEL SERVICIO Y LOS DATOS EN TIPO OBJETO Y SE PARSEA A JSON.
function conexion_ajax_asinc(url, datos) {
   // $("#dialog").show();
    //variables a usar
    var xhttp = new XMLHttpRequest();
    var respuesta = "";
    xhttp.onreadystatechange = function () {//checamos si hay resultado
        if (this.readyState === 4 && this.status === 200) {
            respuesta = this.responseText;//cachamos el resultado
            respuesta = JSON.parse(respuesta);//parseamos a Json
        }//si no hay resultado manda una alerta
        else if (this.status > 200)
            alert("Error:" + this.status);
    };//fin
    //llamada al servicio
    xhttp.open("post", url, true);
    //tipo de datos 
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //Datos a enviar
    xhttp.send(JSON.stringify(datos));
   // $("#dialog").hide();
    return respuesta.d;
}//fin

function conexion_ajax2(url, datos) {
    $("#dialog").show();
    //variables a usar
    var xhttp = new XMLHttpRequest();
    var respuesta;
    xhttp.onreadystatechange = function () {//checamos si hay resultado
        if (this.readyState === 4 && this.status === 200) {
        }//si no hay resultado manda una alerta
        else if (this.status > 200)
            alert("Error:" + this.status);
    };//fin
    //llamada al servicio
    xhttp.open("post", url, true);
    //tipo de datos 
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //Datos a enviar
    xhttp.send(JSON.stringify(datos));
    $("#dialog").hide();
}//fin
