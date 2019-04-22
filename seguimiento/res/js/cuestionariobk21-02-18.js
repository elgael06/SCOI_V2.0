/*
autor: Cristian valenzuela
fecha:
    de: 10-02-18.
    a : 16-02-18.

    funcuinalidad:
                  crea tabla de cuestionarios si el folio id cuenta con una, añade nuevas tablasa cuestionario y genera su inder de ordenamiento,
                  genera un objeto con los valores de la tabla generada para enviarolo con ajax al servidor.
                  crea los efectos de transicion entre los menus debusqueda de datos, da eventos a los botones elimina o agrega celdas a la tabla
                  cuestionarios, revisa si el txt folio tiene datos.
     recurso por programar:
                           funcion de ajax o http,post para enviar los objetos generados al servidor.
        
*/

//variable globales 
var CuestionariosDatos = new Array;
var datosCuestionarios = new Object;
var foliotemporal = $('.idFolio1').val();

//lector de documento thml
$(document).ready(function () {
    

    //valores iniciales a objetos html
    $('.nomCuestionarios').hide();
    $('.tablaCuestionarios').hide();
    $('#btnBuscar').prop('disabled', true);
    $('#btnAgregar').prop('disabled', true);
    $('.BuscarPreguntas').prop('disabled', true);
    $('.ponderacionCues').prop('disabled', true);


    //llamada a funciones
   // recuperarDatosTablaCuestionario_a_Objetos()
    agregarDatosTablaCuestionario()
    eventoBtnEnviar_Buscar_Filtrar()
    eliminarDeTablaCuestionario()
    checarFolioLlenarCampos()
    //efectoCeldas()

});// fin de lectura de documento




//funciones a utilizar ***************************************************************************************************************************
function efectoCeldas() {

    //da el efecto de sombra al pasar cursor sobre la tabla 
    $('tr').on({
        mouseenter: function () {
            $(this).addClass("sombras");
            console.log("sombra");
        },
        mouseleave: function () {
            $(this).removeClass("sombras").addClass("classcuestionario");
            console.log("sin sombra");
        }
    });
}
//revisa si hay un folio en la caja de folios para poder proceder con los datos
function checarFolioLlenarCampos() {
    //checa si hay folio vigente para uso llenar tabla
    if ($('.idFolio1').val() != "") {

        $('#btnBuscar').prop('disabled', false);
        $('#btnAgregar').prop('disabled', false);

        var dat = "<tr class='classcuestionario'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";
        var nom_cuestionarioCom = new Array;

        $(".nomCuestionarios tr").each(function (index) {
            var campo1, campo2, campo3;
            $(this).children("td").each(function (subIndex) {

                switch (subIndex) {
                    case 0:
                        campo1 = $(this).text();
                        break;
                    case 1:
                        campo2 = $(this).text();
                        break;
                    case 2:
                        campo3 = $(this).text();
                        break;
                }//fin switch

            });//fin each td
            obj = {
                'orden': campo1,
                'pregunta': campo2,
                'ponderacion': campo3
            }
            nom_cuestionarioCom.push(obj);

        }); //fin each tabla


        $(".tablaCuestionarios tr").each(function (index) {
            console.log(index);
            /** console.log("ya:");
             var tds2 = $('.GridView3').find('td:eq(0)').html();
             var ponderacion2 = $('.GridView3').find('td:eq(2)').html();
             var pregunta2 = $('.GridView3').find('td:eq(1)').html();
             */
            var campo1, campo2, campo3;
            $('.ponderacionCues').prop('disabled', true);
            $(this).children("td").each(function (subIndex) {
                
                switch (subIndex) {
                    case 0:
                        campo1 = $(this).text();
                        break;
                    case 1:
                        campo2 = $(this).text();
                        break;
                    case 2:
                        campo3 = $(this).text();
                        break;
                }//fin switch
            
            });//fin segundo each
            //recorre los campos dentro del arreglo 
            for (i in nom_cuestionarioCom) {
                //compara 
                if (nom_cuestionarioCom[i].orden === campo2)
                    //asigna el valor
                    campo2 = nom_cuestionarioCom[i].pregunta;
            }//fin for in

            dat = "<tr runat='server' class='classcuestionario'>" + "<td STYLE='width: 61px;text-align:center' class='prierCelda' runat='server' >" + (index + 1) + "</td>" + "<td class='IDPB'>" + campo2 + "</td>" + "<td STYLE='width: 105px;text-align:center'>" + campo3 + "</td>" + "</tr>";
            
            $('.tabla_preguntas_cuest').append(dat);

        });//fin primer each
    }//fin de pregunta
}//fin
//crear evento eliminar de tabla
function eliminarDeTablaCuestionario() {
    //funcion eliminar de tabla cuestionario
    $('.tabla_preguntas_cuest').mouseenter(function () {
       // console.log($('.classcuestionario').hasClass("classcuestionario"));
        
        $('.classcuestionario').dblclick(function () {
            if ($(this).hasClass("classcuestionario")) {
                //alert("ELIMINADO");
                $(this).removeClass("classcuestionario").addClass("eliminar");
                console.log("Elimiar...");  
            }//FIN IF
        });//fin click cuestionario
        
        $('.eliminar').dblclick(function () {
            if ($(this).hasClass("eliminar")) {
                //alert("ELIMINADO");
                $(this).removeClass("eliminar").addClass("classcuestionario");
                console.log("Salvar...");                
            }//fin if
            });//fin click eliminar
            
    });//fin mouseenter
    $('tr').mouseenter(function () {
        $(this).addClass("sombras");
    });
    $('tr').mouseleave(function () {
        $(this).removeClass("sombras");
    });
}//fin

function eventoBtnEnviar_Buscar_Filtrar() {
    //llama a div de busqueda para optener las preguntas
    $('#btnBuscar').click(function () {
        $('.ponderacionCues').prop('disabled', false);
        $('#cuadrobusquda').show();
        $('#x').hide();
        $('#y').hide();
    });
    //asigna el valor de los datos al cuadro de preguntas
    $('#enviarBuscar').click(function () {
        $('#cuadrobusquda').hide();
        $('#x').show();
        $('#y').show();
        $('#BuscarPreguntas').val($('#filtroPreguntas').val());
        $('#filtroPreguntas').val('');
    });
    //SELECCIONAMOS LA CELDA Y AGREGAMOS EL VALOR A EL CUADRO DE TEXTO
    $('.filtrar tr').on('click', function () {
        var dato = $(this).find('td:nth-child(2)').html();
        console.log(dato);
        //alert('hola ' + dato);
        $('.filtroPreguntas').val(dato);
        $('#BuscarPreguntas').val(dato);
        //("tr").css("background-color", "#ECF8E0");
    });
    //filtrar modificado cuadro de texto buscar
    $(".filtroPreguntas").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".filtrar tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

}//fin

function agregarDatosTablaCuestionario() {

    //agrega tabla con datos
    $('.btnAgregarCuestion').click(function () {
        var tds = $(".tabla_preguntas_cuest").find('tr').length;
        var ponderacion = $('.ponderacionCues').val();
        var pregunta = $('.BuscarPreguntas').val();
        var objJSON_Enviar = {
            'orden': (tds + 1),
            'Cuestionario': foliotemporal,
            'pregunta': pregunta,
            'ponderacion': ponderacion
        }//obj fin
        $('.ponderacionCues').prop('disabled', true);

        //alert("agrego:"+" "+pregunta);
        //alert(ponderacion+" "+pregunta);
        var dat = "<tr class='classcuestionario'>" + "<td>a</td>" + "<td>b</td>" + "<td>c</td>" + "</tr>";
        dat = "<tr runat='server' class='classcuestionario'>" + "<td STYLE='width: 61px;text-align:center' class='prierCelda' runat='server' >" + (tds + 1) + "</td>" + "<td class='IDPB'>" + pregunta + "</td>" + "<td STYLE='width: 105px;text-align:center'>" + ponderacion + "</td>" + "</tr>";

        if (pregunta){ 
            //AQUI VAMOS A AGREGAR LA CUESTION AL CUESTIONARIO 
            $('.tabla_preguntas_cuest').append(dat);
           //llamamos al la funcion de ajax para enviar los datos a la tabla
            agregar_A_tabla(objJSON_Enviar);
            //mandamos  post ajax se ejecuta en segundo plano
            console.log("objeto enviado:\t");
           
        }
        else {
            //elimina seleccionados en rojo si hay de lo contrario pide que ingrese una pregunta
            if ($('.eliminar').length > 0) {
                eliminarDeTabla();
                alert("ELIMINADO");
                $('.eliminar').remove();
                

            }
            else
                alert("ingrese una pregunta");
        }
        $('#BuscarPreguntas').val("");
        $(".tabla_preguntas_cuest tbody tr").each(function (index) {
            $(this).children("td").each(function (index2) {
                switch (index2) {
                    case 0:
                        $(this).text(index + 1);
                }
            });
        });
    });//fin agregar datos

}//fin
//envia los datos al servidor en un ciclo que recorre los punto en el objeto que los almacena

//funcion aniadir tabla por ajax
    function agregar_A_tabla( dat ) {
        var urlProyecto = "cuestionsrioServ.asmx/getCuestionario";
        console.log(dat);
        $.ajax({
            type: "POST",//tipo a enviar
            url: urlProyecto,//url a la cual conectarse 
            data: JSON.stringify(dat) ,// resultado'{"orden":"' + campo1 + '","pregunta":"'+campo2+'","ponderacion":"'+campo3+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada
                $('#y').hide();
                $('#btnRecorrer').prop('disabled', true);
            },
            complete: function (response) {
                $('#btnRecorrer').prop('disabled', false);
                $('#y').show();
                console.log("!DATOS ENVIADOS...!");
                console.log(response);

            }//fin de success
        });//fin llamada ajax


}//fin


//funcion eliminar de tabla  por ajax
function eliminarDeTabla() {
    var urlBorrar = "cuestionsrioServ.asmx/deleteCuestionario"
    $('.eliminar').each(function (index) {
        console.log(index);
        var campo1;
        $(this).children("td").each(function (subIndex) {//recorre los tr en la tabla

            switch (subIndex) {//sub recorrido en los td del tr.
                case 0:
                    campo1 = $(this).text();//guarda los datos de la primera posicion 'orden'
                    break;
            }//fin switch
                   
        });//fin each td

        console.log("no hay datos en la tabla..");
        var datoProvicional = JSON.stringify({ 'Cuestionario': campo1 });

        $.ajax({
            type: "POST",//tipo a enviar
            url: urlBorrar,//url a la cual conectarse 
            data: datoProvicional,// resultado'{"orden":"' + campo1 + '","pregunta":"'+campo2+'","ponderacion":"'+campo3+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada
                $('#y').hide();
                $('#btnRecorrer').prop('disabled', true);
            },
            complete: function (response) {
                $('#btnRecorrer').prop('disabled', false);
                $('#y').show();
                console.log("!DATOS ELIMINADOS...!");
            }//fin de success

        });//fin de sentencia borrar

    });//fin de each
           

}//fin funcion 


/*esta funcion envia y resive todas las columnas en un arreglo por ajax

function recuperarDatosTablaCuestionario_a_Objetos() {

    //consulta ajax prueba
    //variables internas
    //var url = 'http://192.168.4.117:8080/cuestionario/conexion.php';//prueba a php
    var urlProyecto = "cuestionsrioServ.asmx/getCuestionario";
    var urlEnvarArreglo = "cuestionsrioServ.asmx/ConexionCuestionarios";
    
    // var urlthis='<%@url.Action("getCuestionario","Home")%>'
   
    var datoo = { "enviado": "ok" };

    
    /*al dar click en el boton guardar se ejecuta la funcion que recorre los datos de la tabla preguntas en sus tr's y los td's colocarlos en
    *campos para estos campos colocarlos dentro de un objeto, ese objeto se parsea para generar un archivo json el cual se va a mandar con ajax
    *mediante el protocolo post ala funcion getCuestionario el cual los almacenara para enviarlos a una base de datos. 
    **OJO se enviara pregunta por pregunta** 
    
$("#btnRecorrer").click(function () {
       
    $(".tabla_preguntas_cuest tr").each(function (index) {
        var campo1, campo2, campo3;
        $(this).children("td").each(function (subIndex) {//recorre los tr en la tabla

            switch (subIndex) {//sub recorrido en los td del tr.
                case 0:
                    campo1 = $(this).text();//guarda los datos de la primera posicion 'orden'
                    break;
                case 1:
                    campo2 = $(this).text();//guarda los datos de la segunda posicion 'pregunta'
                    break;
                case 2:
                    campo3 = $(this).text();//guarda los datos de la tercera posicion 'ponderacion'
                    break;
            }//fin switch

        });//fin each td
        //creamos el objeto para almacenar la variables a enviar 
        obj = {
            'orden': campo1,
            'Cuestionario': foliotemporal,
            'pregunta': campo2,
            'ponderacion': campo3
        }//obj fin

        //empuja los objetos dentro de un arreglo
        CuestionariosDatos.push(obj);
           
        if(CuestionariosDatos>0){
            console.log('este es el arreglo de objetos orden:\t' + CuestionariosDatos[index].orden);
            console.log('este es el arreglo de objetos pregunta:\t' + CuestionariosDatos[index].pregunta);
            console.log('este es el arreglo de objetos pomderacion:\t' + CuestionariosDatos[index].ponderacion);
        }

    }); //fin each tabla
        
    console.log('tamaño arreglo1:\t' + CuestionariosDatos.length);
    if (CuestionariosDatos) {
        //console.log(' pregunta:\t' + CuestionariosDatos[0].pregunta);
        //revisa el arreglo con los objetos dentro y los envia 

        // for (datos in CuestionariosDatos) {

        // console.log("cantidad de datos:" + datos);
        //mandamos  post ajax se ejecuta en segundo plano
        // console.log("objeto enviado:\t");
        //console.log(CuestionariosDatos[datos]);
        //var parseObj = JSON.stringify(CuestionariosDatos[datos]);
        //console.log("parse obj:" + parseObj); { 'datos': parseObj }
        //nuevo proceso para arreglo
        console.log("************************");
        console.log('tamaño arreglo:\t' + CuestionariosDatos.length);
        datosCuestionarios = CuestionariosDatos;
        var arrray = [1,2,3,4];
        var objJSON = JSON.stringify(CuestionariosDatos);
        console.log(objJSON);
        console.log("************************");
        alert(objJSON);    

        $.ajax({
            type: "POST",//tipo a enviar
            url: urlEnvarArreglo,//url a la cual conectarse 
            data: JSON.stringify(CuestionariosDatos),// resultado'{"orden":"' + campo1 + '","pregunta":"'+campo2+'","ponderacion":"'+campo3+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "post",//tipo de datos
            beforeSend: function () {//funcion que se ejecuta mientras hacemos la llamada
                $('#y').hide();
                $('#btnRecorrer').prop('disabled', true);
            },
            complete: function (response) {
                $('#btnRecorrer').prop('disabled', false);
                $('#y').show();
                console.log("!DATOS ENVIADOS...!");
                console.log(response);

            }//fin de success
        });//fin llamada ajax

        //}//fin de for in
    }//fin de conprobacion que tenga datos
       
});//termina funcion click
//le damos al id el valor de 0 o nulo.
//prueba para enviar arreglo respaldo
    
}//fin




*/