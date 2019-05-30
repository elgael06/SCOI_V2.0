//variables globales
var ultimo_Folio_c = 0;
var ultimo_Folio_m = 0;
var otro = 0;
var mi = 0;

$(document).ready(function () {

    //interaccion de mostrar/ocultar mensajes
    $("#select_reseptor").toggle(50, "swing");
    $('#pie_chat').toggle(50, "swing");
    $('#mostrar_mensajes_chat').toggle(50, "swing");

    $('#nombre_usr_chat').text($('#Label1').text());
    
    $('#caja_texto').on("key", function () {

    });

    //crear selector de usuario chat
    llenar_usr_chat();

    if (otro == 0) {
        $('#caja_texto').prop('disabled', true);
        $('#btn_enviar_chat').prop('disabled', true);
    }
    else {
        $('#caja_texto').prop('disabled', false);
        $('#btn_enviar_chat').prop('disabled', false);
    }


  Concurrent.Thread.create(function () {
        var i = 0;
        while (1) {
          // console.log( i );
          ultimo_Folio_m = obtenerultimo_folio_chat();
          if (ultimo_Folio_m > ultimo_Folio_c) {
              resivir_chats();
          }

           //console.log(ultimo_Folio_m);
           sleep(1200)
        }
    });
});
//iconos
function ico(a) {
    console.log("'"+a+"'");
    console.log("⌂ ▼☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬▀↨↑↓→←∟↔▲▼ !@#$%&'()*+,.-/0123456789:;<<=>?ABC");
}
function resivir_chats() {

    var yo = id_usuario($('#nombre_usr_chat').text()), el = otro;
    var claseyo = "msg_chat", claseel = "msg_chat2";
    var mensajes_chat = resibir_mensajes_chat(ultimo_Folio_c);
    
    var texto, usuario, hora, folio, tam = 0, obj = {};
    var msgs = [];

    for (dar in mensajes_chat) {

        if (mensajes_chat[dar].folio > 0) {
        //asignamos los valores
        hora = mensajes_chat[dar].hora_chat;
        texto = mensajes_chat[dar].mensaje_chat;
        folio = mensajes_chat[dar].folio;
        
        if (texto.length > 80)
            texto = texto.substr(0, 80) + "\n" + texto.substr(80, 160);

        if (mensajes_chat[dar].emisor_chat == yo ) {
            usuario = " # yo:" + hora;
           
            obj = {
                'usuario':usuario,
                'texto':texto,
                'clase':claseyo,
                'folio':folio
            }
            //mostrar_mensaje(obj);
        }//fin for
            //else
        else if (mensajes_chat[dar].emisor_chat == el) {
            //pendiente de cambiar nombre
            usuario = " # " + nombre_usuarios(otro) + ":" + hora;
            obj = {
                'usuario': usuario,
                'texto': texto,
                'clase': claseel,
                'folio': folio
            }
                    
        }//fin forIn
        
        msgs.push(obj);
       // console.log("datos"+usuario, texto, claseel, folio);
    }//fin if
    }//fin for
    //checamos si es mayor al ultimo folio
    //console.log(ultimo_Folio_c + " : " + ultimo_Folio_m);
    
    mostrar_mensaje(msgs);

}//fin
//funcion dormir
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            return false;
            break;
        }
        else return true;
    }
}
//id de usuario
function id_usuario(usuario) {

    var lista_usuarios = _lista_usuarios();
    for (dat in lista_usuarios) {
        // console.log($(this).val())
        if (usuario == lista_usuarios[dat].nombre_usuario) {
            //console.log(lista_usuarios[dat].id_usuario);
            return lista_usuarios[dat].id_usuario;
        }//fin if
       // else return lista_usuarios;
      } //fin for
}
function nombre_usuarios(usuario_id) {
    var lista_usuarios = _lista_usuarios();
    for (dat in lista_usuarios) {
        // console.log($(this).val())
        if (usuario_id == lista_usuarios[dat].id_usuario) {
            //console.log(lista_usuarios[dat].id_usuario);
            return lista_usuarios[dat].nombre_usuario;
        }//fin if
        // else return lista_usuarios;
    } //fin for

}
//funcion obtener texto de caja mensajes
function obtener_texto() {
    //asignamos el mensaje a una variable a retornar
    var mensaje = $('#caja_texto').val();
   
    //retornamos la variabla
    return mensaje;
}//fin
//mostrar mensaje texto msg_chat ,msg_chat2
function mostrar_mensaje(msg) {
    var usuaio, texto, clase, id;
    var etiqueta="";

    $.each(msg, function (index, item) {
        etiqueta += " <div class='" + item.clase + "' name=" + item.folio + " > <div>-"+ item.usuario + "</div>-> " + item.texto + "</div>";
        //console.log(index+" : "+item);
        ultimo_Folio_c = item.folio;
    });

     //etiqueta = " <div class='" +  clase + "' value=" + id + " > <div>" + usuaio + "</div>-> " + texto + ".</div>";
    if (etiqueta != "") { 
    $('#mostrar_mensajes_chat').append(etiqueta);
    $('#mostrar_mensajes_chat').scrollTop(9000000000000);
    }
}//fin
//crear cadema datos de envio
function datos_usuario() {
    var usuario_chat = $('#Label1').text();
    var tiempo = Tiempo1();

    return [usuario_chat+":"+ tiempo];
}//fin

//funcion fecha********************************************************************************
function fechaCompleta() {
    var dia = new Date();
    var d = dia.getDate();
    var m = dia.getMonth();
    var a = dia.getFullYear();

    m = m + 1;

    if (m < 10)
        m = "0" + m;
    if (d < 10)
        d = "0" + d;

    var f = (a + "-" + m + "-" + d);

    // console.log("Fecha:"+f);
    $('#divDia').val(f);
    return d + "/" + m + "/" + a;
}//fin 13

//creamos una funcion que marca el tiempo inicial***************************listo
function Tiempo1() {

    //llamamos al metodo Date
    var dinicio = new Date();
    //variables de los tiempos
    var hora = dinicio.getHours();
    var min = dinicio.getMinutes();
    var seg = dinicio.getSeconds();

    //variable que almacenara el string del tiempo
    var tiempo;

    //revisamos si nesecita agregarle cero
    if (hora < 10)
        hora = ("0" + hora);
    if (min < 10)
        min = ("0" + min);
    if (seg < 10)
        seg = ("0" + seg);

    //asignamos los valores a variable tiempo
    tiempo = (hora + ":" + min + ":" + seg);

    return tiempo;

}//fin 11

function activar_botones_chat() {

    //cerrar
    $('#chat_x').on("click", function () {
       // console.log("cerrar");
        $("#select_reseptor").toggle(50, "swing");
        $('#pie_chat').toggle(50, "swing");
        $('#mostrar_mensajes_chat').toggle(50, "swing");
    });//fin click
    //boton enviar>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $('#btn_enviar_chat').on("click", function (evt) {
       // evt.preventDefault();
        if ($('#caja_texto').val() != "") {  // var folio = obtenerultimo_folio_chat();
            // mostrar_mensaje(datos_usuario(), obtener_texto(), "msg_chat", (folio+1));
            //crea la conexion de enviar mensaje
            enviar_mensajes_chat(mi, otro);
            $('#caja_texto').val("");
        }
        else
            alert("ESCRIBE ALGO!!");
    });
    $('#caja_texto').on('keyup',function (evt) {
       // console.log("teclado");
        //console.log(evt.keyCode);
        if (evt.keyCode == 13) {
            if ($('#caja_texto').val() != "") {  // var folio = obtenerultimo_folio_chat();
                // mostrar_mensaje(datos_usuario(), obtener_texto(), "msg_chat", (folio+1));
                //crea la conexion de enviar mensaje
                enviar_mensajes_chat(mi, otro);
                $('#caja_texto').val("");
            }
            else
                alert("ESCRIBE ALGO!!");

        }//fin if
    });

    //cambio de usuario
    $('.usuario_reseptor_chat').click(function () {
        //conexion datos de chat
        var folio, nombre;
       // console.log("tabla");
        $(this).children("td").each(function (index) {

           
            switch (index){
                case 0:
                    folio = $(this).text();
                    break;
                case 1:
                    nombre = $(this).text();
                    break;
            }//fin swhitch

        });
        //console.log(folio+ " : " + nombre);
        datos_usr_chat(folio);
        otro = folio;
        $('#nombre_usr_2').text(nombre);
        //revisa los chats
        //resivir_chats();
        //ultimo_Folio_m = obtenerultimo_folio_chat();
        ultimo_Folio_c = 0;
        $('#caja_texto').prop('disabled', false);
        $('#btn_enviar_chat').prop('disabled', false);
    });
}//fin

//llenar usuarios chat
function llenar_usr_chat() {
    //variables a usar
    var lista_usuarios = _lista_usuarios();
    var dato_usuario ;
    //recorremos la tabla con los datos de usuarios
    $.each(lista_usuarios, function (index,item) {
        //revisamos que no sea al mismo usuario que esta en la secion
        if (item.nombre_usuario != $('#Label1').text()) {
            if (item.id_usuario > 0) { 
            //creamos la opcio
                dato_usuario += "<tr class='usuario_reseptor_chat' style='width:150px'  ><td style='width:30px' >" + item.id_usuario + "</td><td style='width:120px'>" + item.nombre_usuario + "</td> </tr>";
            //agregamos al selector
           
        }//fin if
        else
                $('#nombre_usr_chat').val(item.id_usuario);
        }//fin if
    });//fin each
    $('#grupo_usuarios_select').append(dato_usuario);

}//fin
//crear conexion de chat datos
function datos_usr_chat(reseptor_chat) {
    //variables 
    var emisor_chat = $('#nombre_usr_chat').val();
    //mostramos los usuarios
    $('.msg_chat').remove();
    $('.msg_chat2').remove();

    return reseptor_chat;

}//fin
//funcion que resive los mensajes
function resibir_mensajes_chat(ultimo_Folio) {
    url = "servicios/chatServ.asmx/leer_mensaje"
    var emisor =mi, reseptor = otro;
    var clave_chat;
    //creamos la clabe del chat
    if (emisor > reseptor)
        clave_chat = emisor + "-" + reseptor;
    else if (reseptor > emisor)
        clave_chat = reseptor + "-" + emisor;

    var obj ={
        'emisor': reseptor,
        'reseptor': emisor,
        'ultimo_Folio': ultimo_Folio,
        'clave_chat': clave_chat
    }//fin obj

    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: url,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
        }//fin beforeSend.
          ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete
    });//fin de ajax
  
    return respuesta.d;
}//fin
//funcion obtenet el ultimo folio
function obtenerultimo_folio_chat() {
    var url = "servicios/chatServ.asmx/obtenerultimo_folio_chat"
    mi = id_usuario($('#nombre_usr_chat').text());

    var clave_chat;
    //creamos la clabe del chat
    if (mi > otro)
        clave_chat = mi + "-" + otro;
    else if (otro > mi)
        clave_chat = otro + "-" + mi;
    else
        clave_chat= "0-0"

    var obj = {
        'folio': clave_chat
    }

    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: url,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
        }//fin beforeSend.
         ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete
    });//fin de ajax

    return respuesta.d;
}
//funcion que manda los mensajes
function enviar_mensajes_chat( emisor, reseptor) {
    var url = "servicios/chatServ.asmx/enviar_mensajes_chat"
    var clave_chat;
    //creamos la clabe del chat
    if (reseptor != "")
        reseptor = reseptor;
    else
        reseptor = 0;
    if (emisor > reseptor)
        clave_chat = emisor + "-" + reseptor;
    else if (reseptor > emisor)
        clave_chat = reseptor + "-" + emisor;
   
    //variables a enviar
    var obj = {
        'emisor': emisor,
        'reseptor': reseptor,
        'fecha': fechaCompleta(),
        'hora': Tiempo1(),
        'mensaje': obtener_texto(),
        'clave_chat': clave_chat
    };

    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: url,
        data:JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
        }//fin beforeSend.
          ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            //limpiamos la caja 
            $('#caja_texto').val("");

        }//fin complete
    });//fin de ajax

    return respuesta.d;

}//fin

//funcion que retorna los datos de los usuarios
function _lista_usuarios() {
    //variables a usar
    var urla = "servicios/accesoServ.asmx/obtener_lista_usuarios";

    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urla,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
        }//fin beforeSend.
          ,
        complete: function (response) {
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete
    });//fin de ajax

    return respuesta.d;
}//fin
$(document).ready(function () {
    activar_botones_chat();
});

//uso de funciones de vue

var app2 = new Vue({
    el: "#chat_contenedor",
    data: {
        lista_usr:[]
    },
    methods: {
        agregar_usuarios_chat2: function () {
            lista_usr = _lista_usuarios();
        }
    }
})