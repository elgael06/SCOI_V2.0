
/*Aqui van todos los metos que interactuan con el documento html*/
$(document).ready(function () {

    //ventanas modal
    
    $('.modalDialog1').hide();
    $('.modalDialog').hide();

    //inicializacion de objetos
   $('.resultado').prop('disabled', true);//deshabilita los contadores para cambiarse solo mediante el sistema
   $('.mEstablecimiento').prop('disabled', true);
   $('.textoCuestioario').prop('disabled', true);
    //oculta las tablas de cuestionarios pregutas y menu_cuestionarios
   $('.gwcuestionariosDatos').hide();
   $('.gwMenuCuestionariosDatos').hide();
   $('.gwPreguntas').hide();
   $('.establecimientosDatos').hide();
    //cuadros de busqueda
   //$('#cuadro_buscar_sucursal').hide();
    //$('#cuadro_buscar_cuestionario').hide();
   $('#btn_cancelar_sucursal').on("click", function () {
       $('.modalDialog1').hide();
       $('.modalDialog').hide();
       $('#btNuevo').prop('disabled', false);
       $('#btEditar').prop('disabled', true);
       $('#btDesacer').prop('disabled', true);
       $('#btGuardar').prop('disabled', true);
   });

   $('#btn_selec_').hide();
   $('.mCuestionario').prop('disabled', true);
   $('#btEditar').prop("disabled", true);
   $('#btDesacer').prop("disabled", true);
   $('#btGuardar').prop("disabled", true);

   $('#horaInicio').prop("disabled", true);
   $('#horaFin').prop("disabled", true);
    //accesibilidad de los botones

    //agregar funcion de teclado para ingresar cuestionario
   enter_para_ingresar_cuestionario();

    //dar la fecha
   fechaCompleta();

 
    //revisa si el folio tiene datos y muestra el establecimiento del folio
  // checarIdFolio();
   
   $('#dialog').hide();


});//fin document ready

/*Funciones a utilizar---------------------------------------------------------------------------------*/

//recorre los datos de tabla cuestionario para asignar los valores a un objeto el cual se compara con la atabla menu cuestionarios************************"
//y reemplaza el numero(folio_pregunta) de pregunta por la pregunta(nombre_pregunta).
function agregar_cuestionario() {

    var dat = "<tr class='classcuestionario'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";

            //eliminar tr existentes de tabla a llenar
            $('.classcuestionario').each(function (index) {
                $(this).remove();
            });

            //console.log("longitud " + nom_cuestionarioCom.length);
            if ($('.mCuestionario').val()) {
                //agrega el texto del cuestionario al campo texto.
                agregarNombreCuest();

                //variable que almacena el folio de cuestionario
                var folio = $('.mCuestionario').val();

                //llamamos la funcion que almacena los datos de la tabla
                var respuestas_tabla = crear_tabla(folio);

                var nom_cuestionarioCom = retornar_preguntas();

                /*Recorremos la tabla menucuestionarios para comparar el folio de la pregunta  y sustituirla en su valor*/
                for (index in respuestas_tabla) {
                    //  console.log(index+1);
                    //damos los valores de las tablas
                    var campo1 = respuestas_tabla[index].orden;
                    var campo2 = respuestas_tabla[index].folio_pregunta;


                    dat = "<tr class='classcuestionario'>" + "<td class='orden'>" + campo1 + "</td>" + " <td class='pregunta'><h3>" + convertir_nom_preg(respuestas_tabla[index].folio_pregunta) + "</h3></td>'<td  class='si' title='Respuestas.'  ><input type='radio' class='sicb' id='si" + index + "' /></td> <td class='no' title='Respuestas.' ><input type='radio' class='nocb' id='no" + index + "' /></td> <td class='na' title='Respuestas.' ><input type='radio' class='nacb' id='na" + index + "' /></td> <td class='obs'><input type='button' style='height:30px;width:40px;' class='obsbt' title='Agregar observaciones.' id='obs" + index + "' value='+'/> </td></tr>";

                    $('.tablaPreguntas').append(dat);
                }//fin for in
            }//fin if
        
        //eventos checkbox y boton observaciones
        eventosLlenado();
        //creamos evento de filtro de la tabla
        filtrar_tabla_preguntas();
}//fin 1
//funcion convertir pregunta
function convertir_nom_preg(pregunta) {
    var preguntas = retornar_preguntas();
    for (dato in preguntas) {
        if (preguntas[dato].folio_pregunta == pregunta) {
            return preguntas[dato].pregunta;
        }
    }//fin forIn

}//fin

//crear tabla de buscar cuestionario/////////////////////////////////////////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscar_cuestionario() {
    var datosTabla = "<tr class='class_establecimiento'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";

    //creamos variable que contenga la tabla de datos 
    var tabla = nombres_cuestionarios();

    $('#txt_buscar_cuestionario').val("");
    var index = 1;
    //almacenaran los datos a asignar en folio
    var nombre, folio;
    //$('#padre').hide();
    //$('#cuadro_buscar_cuestionario').show();
    console.log(tabla);
    for (dato in tabla) {
        datosTabla = "<tr class='class_cuestionarios' >" + "<td style='width:15%'>" + index + "</td>" + "<td style='width:70%'>" + tabla[dato].nom_cuestionario + "</td>" + "<td style='width:15%'> " + tabla[dato].folio + "</td>" + "</tr>";

        $('.tablaCuestionario').append(datosTabla);

        index++;
    }//fin forIn


    //agregamos la funcion de sombra
    $('.tablaCuestionario tr').mouseleave(function () {
        $(this).removeClass("sombras");
    });
    $('.tablaCuestionario tr').mouseenter(function () {
        $(this).addClass("sombras");
    });
    //dar evento a seleccion de click en celda
    $('.tablaCuestionario tr').click(function () {

        //recorre los hijos de tr
        $(this).children("td").each(function (subIndex) {
            //asigna nombre y folio
            switch (subIndex) {
                case 1:
                    nombre = $(this).text();
                    break;
                case 2:
                    folio = $(this).text();
            }
        });
        //agrega nombre al cuadro de buscar
        $("#txt_buscar_cuestionario").val(nombre);
    });
    //dar evento a boton seleccionar
    $('#btn_selec_cuestionario').click(function () {
        $('#mCuestionario').val(folio);
        $('#textoCuestioario').val(nombre);

        $('.modalDialog').hide();

        //funcion que agrega al cuestionario la tabla referente al folio
        agregar_cuestionario();

    });//fin fn evento boton

    $('#btn_cancelar_cuestionario').click(function () {
        $('#mCuestionario').val("");
        $('#textoCuestioario').val("");
        $('#cuadro_buscar_cuestionario').val("");
        $('.modalDialog').hide();
        $('.classcuestionario').remove();
        $('#resultadoNA').val(0);
        $('.resultado').val(0);

    });

    filtrar_tabla_cuestionario();
}//fin

//funcion de tecado para agregar cuestionario
function enter_para_ingresar_cuestionario() {

    $('.mCuestionario').on("keypress", function (e) {
        //revisamos que se presiono enter
        var keycode = (e.keyCode ? e.keyCode : e.which);

        //aqui va la funcion de buscar 
        if (keycode == '113') {
            buscar_cuestionario()
            console.log("buscar");

        }//fin if
        else if (keycode == '13') {
            //agrega cuestionario
            agregar_cuestionario()
        }//fin if
    });//fin funcion on 


}//fin

//llamada a ajax para resibir un arreglo con las preguntas 
function retornar_preguntas2() {
    var urlP = "servicios/checkListServ.asmx/retornar_preguntas"

    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlP,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $('#dialog').show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            $('#dialog').hide();
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete
    });//fin de ajax
    return respuesta.d;
}//fin 2

//llamada a ajax para resibir un arreglo con las preguntas 
function retornar_preguntas() {
    var urlP = "servicios/checkListServ.asmx/retornar_preguntas"

    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlP,
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
}//fin 2


//agrega el texto del cuestionario al campo texto.
//recorre la tabla de cuestionarios y la compara con el folio de zona para asignar************************************
//el nombre al cuadro de texto.
function agregarNombreCuest() {
    //creamos la tabla con datos de cuestionarios 
    var cuestionariosDatos = nombres_cuestionarios();
    var folio = parseInt($('.mCuestionario').val())

    $('.textoCuestioario').val("");//pendiente de checar
    //recorremos la tabla con nombres
    for (datos in cuestionariosDatos) {

        //comparamos el texbox con el folio 
        if (cuestionariosDatos[datos].folio === folio )  {
   
            //asignamos el nombre al texbox de nombre
            $('.textoCuestioario').val(cuestionariosDatos[datos].nom_cuestionario);//pendiente de checar

        }//fin if
    }//fin forin
    
}//fin 3

//creamos la conexion ajax para buscar nombre de cuestionario
function nombres_cuestionarios2() {
    var urlC = "servicios/checkListServ.asmx/nombres_cuestionarios"

    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlC,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $('#dialog').show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            $('#dialog').hide();
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete
    });//fin de ajax
    return respuesta.d;

}//fin funcion 4
//creamos la conexion ajax para buscar nombre de cuestionario
function nombres_cuestionarios() {
    var urlC = "servicios/checkListServ.asmx/nombres_cuestionarios"

    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlC,
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

}//fin funcion
 
//agregar nombre a establecimiento********************************************************************
function agregar_establecimiento() {
            var est = buscar_establecimiento();

           // $('#btn_selec_').addClass("btnAzul");

            $('.mEstablecimiento').val("");
            $('.mCuestionario').val("");
            $('.textoCuestioario').val("");
            $('.mCuestionario').prop('disabled', true);
            //recorremos los datos de la tabla establecimientos
            for (dato in est) {
                if (est[dato].id_establecimiento == parseInt( $("#idFolio").val()  )) {
                    $('.mEstablecimiento').val(est[dato].nombre_establecimiento);
                    $('.mCuestionario').prop('disabled', false);
                }//fin if
            }//fin if


}//fin 5

//funcion de llamada a ajax para buscar establecimiento>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function buscar_establecimiento() {
    var urlE = "servicios/checkListServ.asmx/buscar_establecimiento";

    //cachara la respuesta de la conexion
    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urlE,
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $('#dialog').show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            $('#dialog').hide();
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);
            
        }//fin complete
    });//fin de ajax
    return respuesta.d;
}//fin 6

//funcion para crear cuadro de busqueda de folio establecimiento
function buscar_folio_establecimiento() {
    var datosTabla = "<tr class='class_establecimiento'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";
   
    //llamamos a la funcion ajax que contieme el arreglo a usar
    var tabla = buscar_establecimiento();
    //creamos un contador para colocar el index
    var index = 1;
    //almacenaran los datos a asignar en folio
    var nombre, folio;
    //$('#padre').hide();
    $('#cuadro_buscar_sucursal').show();

    $("#txt_buscar_suc").val("");

    //eliminamos las tr existentes antes de llenar
    $('.tablaSuc tr').remove();
    for (dato in tabla) {
        datosTabla = "<tr class='class_establecimiento' >" + "<td style='width:15%'>" + index + "</td>" + "<td style='width:70%'>" + tabla[dato].nombre_establecimiento + "</td>" + "<td style='width:15%'> " + tabla[dato].id_establecimiento + "</td>" + "</tr>";

        $('.tablaSuc').append(datosTabla);

        index ++;
    }//fin forIn

    //agregamos la funcion de sombra
    $('.tablaSuc tr').mouseleave(function () {
        $(this).removeClass("sombras");
    });
    $('.tablaSuc tr').mouseenter(function () {
        $(this).addClass("sombras");
    });
    //dar evento a seleccion de click en celda
    $('.tablaSuc tr').click(function () {
       
        //recorre los hijos de tr
        $(this).children("td").each(function (subIndex) {
            //asigna nombre y folio
                switch (subIndex) {
                    case 1:
                       nombre = $(this).text();
                        break;
                    case 2:
                        folio=$(this).text();
                }
        });
        //agrega nombre al cuadro de buscar
        $("#txt_buscar_suc").val(nombre);
    });
    //dar evento a boton seleccionar
    $('#btn_selec_cues').click(function () {
        $('.modalDialog1').hide();
        $('#idFolio').val(folio);
        $('#mEstablecimiento').val(nombre);
        $('#padre').show();
        $('#btn_selec_').show();
        //$('#cuadro_buscar_sucursal').hide();
        agregar_establecimiento();

    });//fin fn evento boton

    $('#btn_cancelar_cues').click(function () {
        $('#idFolio').val("");
        $('#mEstablecimiento').val("");
        $('#padre').show();
        $('#cuadro_buscar_sucursal').hide();


        $('#btNuevo').prop("disabled", false);
        $('#btDesacer').prop("disabled", true);
        $('#btGuardar').prop("disabled", true);

    });


    //llamamos el filtro de la tabla
    filtrar_tabla_suc();
}//fin fn 7

//creamos la funcion de filtar
function filtrar_tabla_suc() {
    //recorremos la tabla a filtrar
    $(".tablaSuc tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();
        
        $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#txt_buscar_suc").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $(".tablaSuc tr:hidden").show();
        $.each(s, function () {
            $(".tablaSuc tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });
}//fin 8

//creamos la funcion de filtar
function filtrar_tabla_preguntas() {
    //recorremos la tabla a filtrar
    $(".tablaPreguntas tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();

        $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#filtro_tabla_preguntas").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $(".tablaPreguntas tr:hidden").show();
        $.each(s, function () {
            $(".tablaPreguntas tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });
}//fin 9

function filtrar_tabla_cuestionario() {
    //recorremos la tabla a filtrar
    $(".tablaCuestionario tr:has(td)").each(function () {
        var t = $(this).text().toLowerCase();

        $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
    });

    //Agregar el comportamiento al texto (se selecciona por el ID) 
    $("#txt_buscar_cuestionario").keyup(function () {
        var s = $(this).val().toLowerCase().split(" ");
        $(".tablaCuestionario tr:hidden").show();
        $.each(s, function () {
            $(".tablaCuestionario tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
        });
    });


}//fin 10

//creamos una funcion que marca el tiempo inicial***************************listo
function funcionTiempo1() {
    //deshabilitamos los input de las horas
    $('#horaInicio').prop("disabled", true);
    $('#horaFin').prop("disabled", true);
    

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
        seg = ( "0" + seg);

    //asignamos los valores a variable tiempo
    tiempo = (hora + ":" + min + ":" + seg);
    
    //agregamos tiempo al input
    $('#horaInicio').val(tiempo);
    //al dar click en el objeto dara tiempo en un alert
    $('#tInicio').on("click", function () {
        if ($("#idFolio").val() != "")
            alert("Hora inicio:\n" + $('#horaInicio').val());
    });//fin click inicio

}//fin 11


//creamos una funcion que marca el tiempo final******************************************************************************listo.
function funcionTiempo2() {
    //llamada al metodo data time
    var dfinal = new Date();
   
    //variables de los tiempos
    var hora2 = dfinal.getHours();
    var min2 = dfinal.getMinutes();
    var seg2 = dfinal.getSeconds();
    //variable que almacenara el string del tiempo
    var tiempo2;

    //revisamos si nesecita agregarle cero
    if (hora2 < 10)
        hora2 = ("0" + hora2);
    if (min2 < 10)
        min2 =  ("0" + min2);
    if (seg2 < 10)
        seg2 = ("0" + seg2);
    //asignamos los valores a variable tiempo
    tiempo2 = (hora2 + ":" + min2 + ":" + seg2);

    //parseamos los datos de tiempo asigmnados al input
    hora2 = parseInt(hora2);
    min2 =  parseInt(min2);
    seg2 =  parseInt(seg2);

    //asignamos el valor del tiempo  al input hora final
    $('#horaFin').val(tiempo2);
    
    //llamada a funcion
    var t1 = $('#horaInicio').val();

    //parseamos los valores detiempo obtenidos
    var h1 =   parseInt(t1[0] + t1[1]);
    var m1 =   parseInt(t1[3] + t1[4]);
    var s1 =   parseInt(t1[6] + t1[7]);

    console.log("Inicio:" + $('#horaInicio').val());
    console.log("ahora:"+tiempo2);
    
    if (hora2 > h1) {
        h1 = hora2 - h1;
        m1 = ( min2 + (60* h1 ) ) - m1;

        //checamos si m1 es mayor a 60
        if (m1 >= 120) {
            h1 = 2;
            m1 = m1 - 120;
        }//fin if interno
        else if(m1 >= 60) {
            h1 = 1;
            m1 = m1 - 60; 
        }//fin else if
        else
            h1 -= h1;
    }//fin if 
    else {
        m1 = min2 - m1;
        h1=0;
    }//fin else


    //asignamos valor a los segundos
    if( s1>seg2){
        s1 = (seg2 + 60) - s1;
        m1 = m1-1;
    }//fin if
    else s1 = seg2 - s1;



    //revisamos si nesecita el cero
    if (h1 < 10)        h1 = "0" + h1;
    if (m1 < 10)        m1 = "0" + m1;
    if (s1 < 10)        s1 = "0" + s1;
    

    //retornamos el tiempo tardado
    return h1 + ":" + m1 + ":" + s1;


}//fin  12

//funcion fecha********************************************************************************
function fechaCompleta() {
    var dia = new Date();
    var d = dia.getDate();
    var m = dia.getMonth();
    var a = dia.getFullYear();

    m = m + 1;

    if(m<10)
        m ="0" + m;
    if (d < 10)
        d = "0" + d;

        var f = (a + "-" + m + "-" + d);

   // console.log("Fecha:"+f);
    $('#divDia').val(f);

}//fin 13

//funcion de checkbox.
//recorre los hijos de la tabla y revisa si en los cbx de estos hay un true.
function revisarCkb() {
    //inicializamos el checkBox como na tomando este en true por default
    $('.nacb').each(function (index) {
        $('#na' + index).attr('checked', true);
    });//fin each


    //verifica si se a hecho clck en el cbx si
    $('.sicb').on('change', function () {
        $(".tablaPreguntas tr").each(function (index) {
           console.log("Entro a ckb:"+index);
            if ($('#si' + index).is(':checked')) {
                $(this).attr('checked', true);
                $('#no' + index).attr('checked', false);
                $('#na' + index).attr('checked', false);
                console.log("checkbox si " + index + ":" + $(this).attr('checked'));
            }//fin if
            resultadoConteo();//revisamos los si checados
        });//fin each
       
        //console.log("click dados:"+contador);
    });//fin checar clase si

    //verifica si se a hecho clck en el cbx no
    $('.nocb').on('change', function () {
        $(".tablaPreguntas tr").each(function (index) {
            // console.log("Entro a ckb:"+index);
            if ($('#no' + index).is(':checked')) {
                $(this).attr('checked', true);
                $('#si' + index).attr('checked', false);
                $('#na' + index).attr('checked', false);
                console.log("checkbox no " + index + ":" + $(this).attr('checked'));
            }//fin if
            resultadoConteo();//revisamos los si checados
        });//fin each
        
        //console.log("click dados:"+contador);
    });//fin checar clase no

    //verifica si se a hecho clck en el cbx na
    $('.nacb').on('change', function () {
        $(".tablaPreguntas tr").each(function (index) {
            // console.log("Entro a ckb:"+index);
            if ($('#na' + index).is(':checked')) {
                $(this).attr('checked', true);
                $('#no' + index).attr('checked', false);
                $('#si' + index).attr('checked', false);
                console.log("checkbox na " + index + ":" + $(this).attr('checked'));
            }//fin if
            resultadoConteo();//revisamos los si checados
        });//fin each
        
        //console.log("click dados:"+contador);
    });//fin checar clase na
}//fin 14

//asigna los resultados de las preguntas a sus respectivos marcadores***************************listo 25-02-18
function resultadoConteo() {
    var contadorsi = 0;
    var contadorno = 0;
    var contadorna = 0;
    var total = 0;

    console.log("total*************************");
    //checa los si marcados##################################################
    $('.sicb').each(function (index) {
        //console.log("total de si :"+index);
        if ($(this).is(':checked')) {
            contadorsi++;
        }//fin if
    });//fin each

    //checa los no marcados##################################################
    $('.nocb').each(function (index) {
        //console.log("total de no :" + index);
        if ($(this).is(':checked')) {
            contadorno++;
        }//fin if
       
    });//fin each

    //checa los na marcados##################################################
    $('.nacb').each(function (index) {
        //console.log("total de na :" + index);
        if ($(this).is(':checked')) {
            contadorna++;
        }//fin if
    });//fin each

    console.log("total de si checados:" + contadorsi);
    console.log("total de no checados:" + contadorno);
    console.log("total de na checados:" + contadorna);
    $('#resultadoSi').val(contadorsi);//asigna el conteo de si al marcador
    $('#resultadoNo').val(contadorno);//asigna el conteo de no al marcador
    $('#resultadoNA').val(contadorna);//asigna el conteo de na al marcador

    var rPorsentual = 0;
    if (contadorsi)
        rPorsentual = (contadorsi / (contadorsi + contadorno) * 100);
    else
        rPorsentual = 0;

    total = contadorsi + contadorno + contadorna;
    //var suma = resultadoSi + resultadoNo + resultadoNA;
    $('#resultadoTotal').val(total);

    if (rPorsentual >= 90) {
        $('#porcentual').addClass('positivo');
        console.log('va bien:' + rPorsentual);
    }//fin if
    else {
        $('#porcentual').addClass('negativo');
        console.log('va mal: ' + rPorsentual);
    }

    $('#resultadoPorsentual').val( Math.round(rPorsentual) );
    //document.getElementById('resultadoTotal').innerHTML = suma; rPorsentual.toFixed(2)

}//fin 15

//dar evento a botones de observaciones ***************************************************************************************
function darEventoObservaciones() {
    $('.obsbt').on('click',function(){
        //prompt();
        //al precionar el boton lanza un cuadro de texto para introducir las observaciones.
        $(this).val( prompt("Observacion", $(this).val()));
        if ($(this).val()==="") {//checa si el valor esta vacio le asigna el caracter +.
            $(this).val("+");
        }//fin if 
        //muestra la observacion en consola
        console.log("texto:"+$(this).val());
        
    });//fin de onclick btn observaciones.
}//fin  16

//funcion guardar, enviara todos los datos por medio de ajax al servidor ***************************************************
function GuardarEnviar() {
    //guardamos la hora de finalizacion
    funcionTiempo2();

    /*******variables a enviar*******/
    //listas
    var url = "servicios/checkListServ.asmx/guardar_datos";//direccion del servicio.
    var url_menu = "servicios/checkListServ.asmx/guardar_menu";//segunda url


    var folioSucursal = $('.idFolio1').val();//folio del la sucursal
    var fechaCreacio = $('#divDia').val();// fecha de creacion
    var horaInicio = $('#horaInicio').val();//hora de inicio
    var horaFin = $('#horaFin').val();//hora de termino
    var duracion = funcionTiempo2();//duracion
    var zonaCuestionario = $('.mCuestionario').val();//id de cuestionario
    var aplicador = $('#Label1').text();//nombre del usuario
    var totalPreguntas = $('#resultadoTotal').val();
    var resultado = $('#resultadoPorsentual').val();
    
    //checamos que resultado tenga un valor numerico.
    if (resultado === "NaN")
        resultado = 0;
    
    //variables que guardaran los arreglos generados
    var obj2 = {
        'folio_sucursal': folioSucursal,
        'zona': zonaCuestionario,
        'total_preguntas': totalPreguntas,
        'resultado': resultado+"%",
        'fecha': fechaCreacio,
        'duracion': duracion
    };

    var confirmar= true;
    if (parseInt(resultado)<80)
        confirmar = confirm("Resultado NEGATIVO\n¿Desea cotinuar?");
    
    if (confirmar){
        //llamada a funcion guardar menu y de forma anidada la funcion recorer_objetos
        guardar_menu(url_menu, obj2, console.log("pendiente"), recorrer_objetos(url, aplicador, folioSucursal, fechaCreacio, zonaCuestionario));
        alert('GUARDADO...');
    }//fin if
    else alert("CANSELADO!!!");
   
}//fin 17

//funcion recorrer objetos para enviar***************************************************************************************
function recorrer_objetos(url, aplicador, folioSucursal, fechaCreacio, zonaCuestionario) {
   // var arreglo = new Array();
    //por obtener, en ciclo
    var ordenCuestiones, respuesta = 0, Observaciones;
    //objeto para llenar
    var obj = {};


    //recorre la tabla de preguntas en cada uno de sus puntos
    $('.tablaPreguntas tr').each(function (index) {

        //recorre los hijos del objeto
        $(this).children("td").each(function (subIndex) {
            switch (subIndex) {
                case 0:
                    ordenCuestiones = $(this).text();
                    break;
            }//fin switch
        });//fin each de hijos

        //checamos si se respondi si o no en cuestionario
        if ($('#si' + index).is(':checked') === true) respuesta = 1;
        else if ($('#no' + index).is(':checked') === true) respuesta = 0;
        else if ($('#na' + index).is(':checked') === true) respuesta = 2;

        //asignamos las observaciones
        Observaciones = $('#obs' + index).val();

            //llenamos el objeto
            obj = {
                'aplicador': aplicador,
                'sucursal': folioSucursal,
                'fecha': fechaCreacio,
                'zona': zonaCuestionario,
                'criterio': (index + 1),
                'respuesta': respuesta,
                'observaciones': Observaciones
            }//fin obj

            //funcion ajax a check_list_establecimientos
            enviarDatos(url, obj, console.log("esperando"), console.log("listo"));

    });//fin de primer each

}//fin

//funcion para guardar datos de menu*************************************************************************************
function guardar_menu( url, objeto ) {
    
    enviarDatos(url,objeto);
    console.log("envio de menu y criterios listo...");
}//fin  18


//crea una llamada ajax mediante el polio de cuestionario y retorna todas las preguntas de ese cuestionario
//si la conexion es correcta esta retorna un arreglo y solo consta de llamar en sus puntos.
function crear_tabla( folio ) {
    var urls = "servicios/checkListServ.asmx/asignar_tabla_cuestionarios";
    var obj = {'folio_cuestiono':folio}
    //enviarDatos(url, obj, console.log("algo"), console.log("listo"));
    //cachara la respuesta de la conexion
    var respuesta;
    //llamada ajax tipo post
    $.post({
        type: "POST",//tipo a enviar
        async: false,
        cache: false,
        url: urls,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "post",//tipo de datos.
        beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
            $('#dialog').show();
        }//fin beforeSend.
           ,
        complete: function (response) {
            $('#dialog').hide();
            //response = JSON.stringify(response);
            respuesta = response.responseText;
            //  console.log(response);//respuesta. responseText
            respuesta = JSON.parse(respuesta);

        }//fin complete
    });//fin de ajax
    return respuesta.d;
}//fin  19

//funcion ajax para envio de datos   *************************************************************************************
function enviarDatos(urls, datos,mientras,completado) {

        $.post({
            type: "POST",//tipo a enviar
            async: false,
            cache: false,
            url: urls,
            data: JSON.stringify(datos),
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos.
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada.
                $('#dialog').show();
                mientras;//funcion a ejecutar.
            }//fin beforeSend.
            ,
            complete: function (response) {
                $('#dialog').hide();
                completado;//funcion a ejecutar.
                //response = JSON.stringify(response);
                var text = response.responseText;
                //  console.log(response);//respuesta. responseText
                text = JSON.parse(text);
              
            }//fin complete.
        });//fin llamada ajax
}//fin 20

//llena lascaja superior de resultados de las preguntas
function eventosLlenado() {
    //recorre la tabla creada para revisar los ckb
    revisarCkb();
    //da los eventos de guardar observaciones en valor de boton.
    darEventoObservaciones();
    //dar total 
    resultadoConteo();

}//fin 21

    //funcion a los botones *********************************************************************************************
    $(document).ready(function () {

        $('#idFolio').prop("disabled", true);

        //deshabilitamos los controles de la tabla 
        $('.sicb').prop("disabled", true);
        $('.nocb').prop("disabled", true);
        $('.nacb').prop("disabled", true);
        $('.obsbt').prop("disabled", true);

        $('#btGuardar').on('click', function () {
        
            $('#btn_selec_').removeClass("btnAzul").addClass("btnf");;

            if ($('.mCuestionario').val()) {
                $('#idFolio').prop("disabled", true);
                GuardarEnviar();


                $('#btNuevo').prop("disabled", false);
                $('#btDesacer').prop("disabled", true);
                $('#btGuardar').prop("disabled", true);
            
                $('#horaInicio').val("00:00");
            }

            //deshabilitamos los controles de la tabla 
            $('.sicb').prop("disabled", true);
            $('.nocb').prop("disabled", true);
            $('.nacb').prop("disabled", true);
            $('.obsbt').prop("disabled", true);

            $('#btn_selec_').hide();

            $('#idFolio').prop("disabled", true);
            $('#btNuevo').prop("disabled", false);
            $('#btDesacer').prop("disabled", true);
            $('#btGuardar').prop("disabled", true);
            $('#mCuestionario').prop("disabled", true);
            $('#horaInicio').val("");
            $('#horaFin').val("");
            $('#horaInicio').val("");
            $('.mCuestionario').val("");
            $('#textoCuestioario').val("");
            $('.idFolio1').val("");
            $('#mEstablecimiento').val("");
            $('.textoCuestioario').val("");
            $('#horaInicio').val("");
            $('#resultadoSi').val("");
            $('#resultadoNo').val("");
            $('#resultadoNA').val("");
            $('#resultadoTotal').val(0);
            $('#horaInicio').val("00:00");

            //deshabilitamos los controles de la tabla 
            $('.sicb').prop("disabled", true);
            $('.nocb').prop("disabled", true);
            $('.nacb').prop("disabled", true);
            $('.obsbt').prop("disabled", true);

            //eliminar tr existentes de tabla a llenar
            $('.classcuestionario').each(function (index) {
                $(this).remove();
            });

        });//fin guardar
        $('#btNuevo').on('click', function () {
            buscar_folio_establecimiento();
            $('.modalDialog1').show();
           // $('#idFolio').prop("disabled", false);
                //habilitamos los controles de la tabla 
                $('.sicb').prop("disabled", false);
                $('.nocb').prop("disabled", false);
                $('.nacb').prop("disabled", false);
                $('.obsbt').prop("disabled", false);

                //$('#btn_selec_').show();

                $('#horaFin').val("");

                $('#btGuardar').prop("disabled", false);
                $('#btDesacer').prop("disabled", false);
                $('#btNuevo').prop("disabled", true);

                //da tiempo de inicio y fin
                funcionTiempo1();
            //eliminar tr existentes de tabla a llenar
                $('.classcuestionario').each(function (index) {
                    $(this).remove();
                });


            

        });//fin nuevo
        $('#btDesacer').on('click', function () {


            $('#idFolio').prop("disabled", true);
            $('#btNuevo').prop("disabled", false);
            $('#btDesacer').prop("disabled", true);
            $('#btGuardar').prop("disabled", true);
            $('#horaInicio').val("");
            $('#horaFin').val("");
            $('#horaInicio').val("");
            $('.mCuestionario').val("");
            $('#textoCuestioario').val("");
            $('.idFolio1').val("");
            $('#mEstablecimiento').val("");
            $('.textoCuestioario').val("");
            $('#horaInicio').val("");
            $('#resultadoSi').val("");
            $('#resultadoNo').val("");
            $('#resultadoNA').val("");
            $('#resultadoTotal').val(0);
            $('#horaInicio').val("00:00");

            //deshabilitamos los controles de la tabla 
            $('.sicb').prop("disabled", true);
            $('.nocb').prop("disabled", true);
            $('.nacb').prop("disabled", true);
            $('.obsbt').prop("disabled", true);

            $('#btn_selec_').hide();

            //eliminar tr existentes de tabla a llenar
            $('.classcuestionario').each(function (index) {
                $(this).remove();
            });
        });//fin deshacer..
        //evento para buscar cuestionario
        $('#btn_selec_').on("click", function () {
            //llama a tabla para buscar el cuestionario
            //buscar_cuestionario();
            //muestra la modal
            $('.modalDialog').show();
            console.log("click");
            $('#btn_selec_').show();
           
        });
        buscar_cuestionario();

        //recorre la tabla creada para revisar los ckb
        revisarCkb();
        //da los eventos de guardar observaciones en valor de boton.
        darEventoObservaciones();
        //dar total 
        resultadoConteo();

        //deshabilitamos los controles de la tabla 
        $('.sicb').prop("disabled", true);
        $('.nocb').prop("disabled", true);
        $('.nacb').prop("disabled", true);
        $('.obsbt').prop("disabled", true);
   
        $('#example').modal("show");


        

    });
