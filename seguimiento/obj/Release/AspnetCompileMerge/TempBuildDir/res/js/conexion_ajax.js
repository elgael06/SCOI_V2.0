
/*********************************************************
                     CONEXIONES AJAX
*********************************************************/
//ESTA FUNCION RESIBE COMO PARAMETROS LA URL DEL SERVICIO Y LOS DATOS EN TIPO OBJETO Y SE PARSEA A JSON.
const conexion_ajax = (url, datos) => {
   // document.getElementById("dialog").style.display = "block";
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
   // document.getElementById("dialog").style.display = "none";
   $("#dialog").hide();
    return respuesta.d;
}//fin
//ESTA FUNCION RESIBE COMO PARAMETROS LA URL DEL SERVICIO Y LOS DATOS EN TIPO OBJETO Y SE PARSEA A JSON.
function conexion_ajax_asinc(url, datos) {

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
    return respuesta.d;
}//fin

function conexion_ajax2(url, datos, evento) {
    evento = evento != undefined ? evento : (e) => { console.log(e) }
    document.getElementById("dialog").style.display = "block";
    //variables a usar
    var xhttp = new XMLHttpRequest();
    var respuesta;
    xhttp.onreadystatechange = function () {//checamos si hay resultado
        if (this.readyState === 4 && this.status === 200) {
            respuesta = this.responseText;//cachamos el resultado
            respuesta = JSON.parse(respuesta);//parseamos a Json
            evento(respuesta);
        }//si no hay resultado manda una alerta
        else if (this.status > 200)
            alert("Error:" + this.status);
    };//fin
    //llamada al servicio
    xhttp.open("post", url, true);
    //tipo de datos 
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "https://192.168.4.154,192.168.4.200");
    //Datos a enviar
    xhttp.send(JSON.stringify(datos));
    document.getElementById("dialog").style.display = "none";
}//fin
const conexion_api = (url, evento)=> {
    //verifica el estado de evento
    evento = evento != undefined ?evento:(e) => {console.log(e)}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (res) => {
        if (res.target.readyState == 4 && res.target.status === 200) {
            respuesta = JSON.parse(res.target.response);
            evento(respuesta);
        }
        else if (res.target.status > 200)
            alert("Error : " + res.target.status + "\n API." );
    };//fin
    xhttp.open("post", url, true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}//fin
const conexion_api_2=(url, evento)=>
{
    evento = evento != undefined ? evento : (e) => { console.log(e) }
    fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        response.json().then((respuesta) => {
            evento(respuesta);
        })
    })
    .catch((error) => {
        console.log(error)
        alert('Error:', error)
    })
}
const conexion_api_from_body=(url,datos, evento)=>
{
    evento = evento != undefined ? evento : (e) => { console.log(e) }
    fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response=> {
        response.json().then((respuesta) => {
            evento(respuesta);
        })
    })
    .catch((error) => {
        console.log(error)
        alert('Error:', error)
    })
    return datos
}
