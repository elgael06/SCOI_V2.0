
$(document).ready(function () {
    //oculta paguinas principales
    $('#matrices').hide()
    $('#check-List').hide()

    //checamos silos acceso son verdaderos
    if (checar_accesos(20) && checar_accesos(21)) {
        funcionagregarPag2('#agregarTablaMatriz', "/checkList.aspx #padre", '#mostrarEsterna');

        //selector de folio
        $('#select-mat').on('click', function () { elegir_carga(1), $('#select-mat').hide(), $('#select-ck').show() });
        $('#select-ck').on('click', function () { elegir_carga(2), $('#select-ck').hide(), $('#select-mat').show() });
        $('#cerrar-accionesSelec').on('click', function () { location = "/default.aspx" });
        //boton que exporta la tabla a excel
        $('#btGuardarMatriz').on("click", function () {
            guardar_tabla_principal_mat_excel();
        });//fin onclick
    }//fin if
    else if (checar_accesos(20)) { $('#accionesSelec').hide(), $('#check-List').show();}//fin elseIf
    else if (checar_accesos(21)) { $('#accionesSelec').hide(), $('#matrices').show() }
});
function funcionagregarPag2( boton,pagina,alojador) {
    $(boton).on('click', function () {
        $(alojador).load(pagina);
    });
}//fin funcion

function elegir_carga(eleccion) {
    if (eleccion==1){
        $('#matrices').show()
        $('#accionesSelec').hide()
    }
    else if (eleccion==2){
        $('#check-List').show()
        $('#accionesSelec').hide()
    }

}//fin eleguir

function agregar_celdas_tabla_principal_mat(r) {
    for (var i = 1; i <= r;i++) {
        var ultimo = $('#trcab td').length;
        $('#trcab').append("<td><div class='celdas'> " + (ultimo-1) + " </div></td>");
        cadena = "<td><div class='celdas'> "+ i + " </div></td>"
        //console.log("# " + (ultimo - 1));
    }
    
}//fin
function guardar_tabla_principal_mat_excel() {
    var tds = "";
    var trs = "";

    $('#tablaPrincipal').append("<tr></tr>");
//recorremos la tabla cabecera
    $('#estabAplicador tr').each(function (a) {
        tds = "", trs = "";
        $(this).children("td").each(function (b) {

            tds +=  "<td>"+$(this).text() + "</td>";

        });
        trs += "<tr>" + tds + "</tr>"

        $('#tablaPrincipal').append(trs);
    });

    tableToExcel('tablaPrincipal', 'matriz');

    $('#tablaPrincipal tr').each(function (textoTabla) {

        if ($('#estabAplicador tr')[0].textContent == $(this).text())
        {
            console.log($(this).text());
            console.log(textoTabla);
            $(this).remove();
        }
        if ($('#estabAplicador tr')[1].textContent == $(this).text()) {
            console.log($(this).text());
            console.log(textoTabla);
            $(this).remove();
        }
    });
    
    /*$('#tablaPrincipal tr').length
    $('#tablaPrincipal tr').remove($('#tablaPrincipal tr').length - 1);
    $('#tablaPrincipal tr')[8].textContent
    */
}//fin

//checar acceso 
function checar_accesos(menu) {
    //llamamos a la funcion que tiene los resultados de accesos
    var acceso = accesos_submenus($('#Label1').text());
    //creamos una variable que obtenga la respuesta por default es false
    var respuesta = false;
    //recorremos los datos de acceso
    for (ac in acceso) {
        //revisamos si el acceso coincide con el menu
        if (acceso[ac].folio_sub_menu == menu) {
            console.log("accesos")
            //asignamos el valor a la respuesta
            respuesta = acceso[ac].acceso;
        }//fin if
    }//fin forIn
    //retornamos el valor
    return respuesta;
}//fin