$(document).ready(function () {
    
    $("#modal_vista").hide()
    $("#dialog").hide()
    llenar_tabla_vistas(5)
})
function tem_indicadores(contador) {
    var obj = {
        establecimiento: "super "
        , n_surtido:1
        , n_agotado:0
        , r_m_p:100
        , r_t_p:1
        , merma:50
        , n_obsoleto:70
        , o_com_pend_aut:0
        , n_pedidos_comp:1
        , n_pedido_t:1
        , n_plantilla:80
    }, arreglo = [];
    for (i = 1;i<=contador;i++){
        arreglo.push(obj);
    }
    return arreglo;
}
function nivel_establecimiento(selector) {
   
    var consulta;
    console.log(selector.establecimiento)
    $("#modal_vista").show();
    $("#nom_sucursal").text(selector.establecimiento)
    $("#nivel_indicador").val(selector.indicador).attr("onclick", 'nivel_establecimiento( { establecimiento: "' + selector.establecimiento + '", indicador: "' + selector.indicador + '"} )');

    //reviar tipo de indicador y lanza la funcion asociada
    switch (selector.indicador) {
        case "nivel_surtido": nivel_surtido(selector.establecimiento)
            break;
        case "nivel_agotado": nivel_agotado(selector.establecimiento)
            break;
        case "Recepcion_Mercancia_Pendiente": Recepcion_Mercancia_Pendiente(selector.establecimiento)
            break;
        case "Recepcion_Transf_pendiente": Recepcion_Transf_pendiente(selector.establecimiento)
            break;
        case "Merma": Merma(selector.establecimiento)
            break;
        case "Nivel_De_Obsoleto": Nivel_De_Obsoleto(selector.establecimiento)
            break;
        case "Ordenes_De_Compras_Pendiente_De_Aut": Ordenes_De_Compras_Pendiente_De_Aut(selector.establecimiento)
            break;
        case "Nivel_De_Pedidos_Completos": Nivel_De_Pedidos_Completos(selector.establecimiento)
            break;
        case "Nivel_De_Pedidos_En_Tiempo": Nivel_De_Pedidos_En_Tiempo(selector.establecimiento)
            break;
        case "Nivel_De_Plantilla": Nivel_De_Plantilla(selector.establecimiento)
            break;
    }
    //remueve los botones sueperiores
    $("#nivel_clase").remove()
    $("#categoria").remove()
    $("#familia").remove()
    $("#producto").remove()
    $("#nivel_folio").remove()
}

/********************************
        manejo de DOM
*******************************/

function llenar_tabla_vistas(c) {
    var indicadores = tem_indicadores(c)
    $(".indicadores").remove()
    $.each(indicadores,function (indice, datos) {
        var filla = $("<tr></tr>");
        filla.append( $("<td >").append(datos.establecimiento+" "+indice)
                    , $("<td>").append(datos.n_surtido).attr("name","nivel_surtido")
                    , $("<td>").append(datos.n_agotado).attr("name", "nivel_agotado")
                    , $("<td>").append(datos.r_m_p).attr("name", "Recepcion_Mercancia_Pendiente")
                    , $("<td>").append(datos.r_t_p).attr("name", "Recepcion_Transf_pendiente")
                    , $("<td>").append(datos.merma).attr("name", "Merma")
                    , $("<td>").append(datos.n_obsoleto).attr("name", "Nivel_De_Obsoleto")
                    , $("<td>").append(datos.o_com_pend_aut).attr("name", "Ordenes_De_Compras_Pendiente_De_Aut")
                    , $("<td>").append(datos.n_pedidos_comp).attr("name", "Nivel_De_Pedidos_Completos")
                    , $("<td>").append(datos.n_pedido_t).attr("name", "Nivel_De_Pedidos_En_Tiempo")
                    , $("<td>").append(datos.n_plantilla).attr("name", "Nivel_De_Plantilla")
            ).addClass("indicadores");
        $("#tabla_monitora").append(filla)
    });
    var estab = "", objIndicadores = {
        establecimiento: ""
        , indicador: ""
        ,valor:""
    };
        $(".indicadores td").on("click", function () {
            $(this).parent().children("td").each(function (i, t) {
                if (i == 0)
                    objIndicadores.establecimiento = $(this).text();
            })
            objIndicadores.indicador = $(this).attr("name");
            objIndicadores.valor = $(this).text();
            if (objIndicadores.indicador)
                nivel_establecimiento(objIndicadores)
        })
}
//agregar eventos
function evento_clase(){
    //funcion nivel
    $(".nivel_clase").on("click", function () {
        var nivel = $(this).text();
        var boton = $("<input type='button' />");
        boton.addClass('menu');
        boton.attr("id", 'nivel_clase');
        boton.val(nivel);
        boton.attr("onclick", "nivel_clase('" + nivel + "')");
        $("#btnera_modal").append(boton);
        nivel_clase(nivel);
    });
}
function evento_folio() {
    //funcion nivel
    $(".nivel_folio").on("click", function () {
        var nivel = $(this).text();
        var boton = $("<input type='button' />");
        boton.addClass('menu');
        boton.attr("id", 'nivel_folio');
        boton.val(nivel);
        //boton.attr("onclick", "nivel_clase('" + nivel + "')");
        $("#btnera_modal").append(boton);
        nivel_folio(nivel);
    });
}

//funciones de primer nivel de indicadores
//indicador 1
function nivel_surtido(suc) {
    console.log("nivel_surtido listo")
    $("#nivel_indicador").val("Nivel De Surtido Canasta Basica.")

    $("#categoria").remove()
    $("#familia").remove()
    $("#producto").remove()

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 20; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }

        filla.append($("<td></td>").append("datos de nivel surtido " + i)).addClass("nivel_clase")

        $("#tabla_vistas").append(filla);
    }
    //funcion nivel
    evento_clase()
}
//indicador 2
function nivel_agotado(suc) {
    console.log("nivel_agotado listo")
    $("#nivel_indicador").val("Nivel de Agotado")

    $("#categoria").remove()
    $("#familia").remove()
    $("#producto").remove()

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }
        filla.append($("<td></td>").append("datos de nivel agotado " + i)).addClass("nivel_clase")
        $("#tabla_vistas").append(filla);
    }
    //funcion nivel
    evento_clase();
}
//indicador 3
function Recepcion_Mercancia_Pendiente(suc) {
    console.log("Recepcion_Mercancia_Pendiente listo")
    $("#nivel_folio").remove()
    $("#nivel_indicador").val("Resepciones De Mercancia Pendientes")

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.addClass("cabecera_tabla")
            $("#tabla_vistas").append( filla.append($("<th></th>").append("Establecimieno"))
                ,filla.append($("<th></th>").append("Folio"))
                ,filla.append($("<th></th>").append("Fecha"))
                ,filla.append($("<th></th>").append("Proveedor"))
            );
            filla = $("<tr></tr>")
        }
        filla.addClass("nivel_folio")
        $("#tabla_vistas").append(filla.append($("<th></th>").append("Establecimieno"))
            ,filla.append($("<th></th>").append(i))
            ,filla.append($("<th></th>").append("Fecha"))
            ,filla.append($("<th></th>").append("Proveedor"))
        );
    }
    //funcion nivel
    evento_folio()
}
//indicador 4
function Recepcion_Transf_pendiente(suc) {
    console.log("Recepcion_Transf_pendiente listo")
    $("#nivel_folio").remove()
    $("#nivel_indicador").val("Resepciones Trasferencia Pendientes")

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla.append($("<th></th>").append("Establecimieno"))
                ,filla.append($("<th></th>").append("Surte"))
                ,filla.append($("<th></th>").append("Folio"))
                ,filla.append($("<th></th>").append("Fecha"))
            );
            filla = $("<tr></tr>")
        }
        filla.addClass("nivel_folio")
        $("#tabla_vistas").append(filla.append($("<th></th>").append("Establecimieno"))
            ,filla.append($("<th></th>").append("Surte"))
            ,filla.append($("<th></th>").append(i))
            ,filla.append($("<th></th>").append("Fecha"))
          );
    }
    //funcion nivel
    evento_folio()
}
//indicador 5
function Merma(suc) {
    console.log("Merma listo")
    $("#nivel_indicador").val("Merma")

    $("#categoria").remove()
    $("#familia").remove()
    $("#producto").remove()

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }

        filla.append($("<td></td>").append("datos de nivel Merma " + i)).addClass("nivel_clase")

        $("#tabla_vistas").append(filla);
    }
    //funcion nivel
    evento_clase()
}
//indicador 6
function Nivel_De_Obsoleto(suc) {
    console.log("Nivel_De_Obsoleto listo")
    $("#nivel_indicador").val("Nivel De Obsoleto")

    $("#categoria").remove()
    $("#familia").remove()
    $("#producto").remove()

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }

        filla.append($("<td></td>").append("datos de nivel Obsoleto " + i)).addClass("nivel_clase")

        $("#tabla_vistas").append(filla);
    }
    //funcion nivel
    evento_clase()
}
//indicador 7
function Ordenes_De_Compras_Pendiente_De_Aut(suc) {
    console.log("Ordenes_De_Compras_Pendiente_De_Aut listo")
    $("#nivel_folio").remove()
    $("#nivel_indicador").val("Ordenes De Compras Pendientes De Autorizar")

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla.append($("<th></th>").append("Establecimieno"))
                ,filla.append($("<th></th>").append("Solicita"))
                ,filla.append($("<th></th>").append("Proveedor"))
                ,filla.append($("<th></th>").append("Fecha"))
            );
            filla = $("<tr></tr>")
        }
        filla.addClass("nivel_folio")
        $("#tabla_vistas").append(filla.append($("<th></th>").append("Establecimieno"))
            ,filla.append($("<th></th>").append("Solicita"))
            ,filla.append($("<th></th>").append("Proveedor"))
            ,filla.append($("<th></th>").append("Fecha"))
        );
    }
    //funcion nivel
    evento_folio()
}
//indicador  8
function Nivel_De_Pedidos_Completos(suc) {
    console.log("Nivel_De_Pedidos_Completos listo")
    $("#nivel_folio").remove()
    $("#nivel_indicador").val("Nivel De Pedidos Completos")

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla.append($("<th></th>").append("Folio"))
                ,filla.append($("<th></th>").append("Establecimieno"))
                ,filla.append($("<th></th>").append("Surte"))
                ,filla.append($("<th></th>").append("Cant. Surtido"))
                ,filla.append($("<th></th>").append("Cant. Pendiente"))
            );
            filla = $("<tr></tr>")
        }
        filla.addClass("nivel_folio")
        $("#tabla_vistas").append(filla.append($("<th></th>").append(i))
            ,filla.append($("<th></th>").append("Establecimieno"))
            ,filla.append($("<th></th>").append("Surte"))
            ,filla.append($("<th></th>").append("Cant. Surtido"))
            ,filla.append($("<th></th>").append("Cant. Pendiente"))
        );
    }
    //funcion nivel
    evento_folio()
}
//indicador 9
function Nivel_De_Pedidos_En_Tiempo(suc) {
    console.log("Nivel_De_Pedidos_En_Tiempo listo")
    $("#nivel_indicador").val("Nivel De Pedidos En Tiempo")

    $("#nivel_folio").remove()

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla.append($("<th></th>").append("Folio"))
                ,filla.append($("<th></th>").append("Establecimieno"))
                ,filla.append($("<th></th>").append("Surte"))
                ,filla.append($("<th></th>").append("Cant. Surtido"))
                ,filla.append($("<th></th>").append("Cant. Pendiente"))
            );
            filla = $("<tr></tr>")
        }
        filla.addClass("nivel_folio")
        $("#tabla_vistas").append(filla.append($("<th></th>").append(i))
            ,filla.append($("<th></th>").append("Establecimieno"))
            ,filla.append($("<th></th>").append("Surte"))
            ,filla.append($("<th></th>").append("Cant. Surtido"))
            ,filla.append($("<th></th>").append("Cant. Pendiente"))
        );
    }
    //funcion nivel
    evento_folio()
}
//indicador 10
function Nivel_De_Plantilla(suc) {
    console.log("Nivel_De_Plantilla listo")
    $("#nivel_folio").remove()
    $("#nivel_indicador").val("Nivel De Plantilla")

    $("#tabla_vistas tr").remove()
    //llenar tabla de nivel surtido
    for (i = 0; i <= 34; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }

        filla.append($("<td></td>").append("datos de nivel Nivel_De_Plantilla  " + i)).addClass("nivel_folio")

        $("#tabla_vistas").append(filla);
    }
    //funcion nivel
    evento_folio()
}

//Niveles 
function nivel_clase(nivel) {
    console.log("nivel_clase. listo")
    
    $("#categoria").remove()
    $("#familia").remove()
    $("#producto").remove()

    $("#tabla_vistas tr").remove()

    for (i = 0; i <= 50; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }
        filla.append($("<td></td>").append("datos de nivel Clase " + i)).addClass("categoria")

        $("#tabla_vistas").append(filla);
    }
        //funcion nivel
    $(".categoria").on("click", function () {
            var nivel = $(this).text();
            var boton = $("<input type='button' />'");
            boton.addClass('menu');
            boton.attr("id", 'categoria');
            boton.val(nivel);
            boton.attr("onclick", "categoria('" + nivel + "')");
            $("#btnera_modal").append(boton);
            categoria(nivel);
        });
}//fin nivel

function categoria(nivel) {
    console.log("categoria. listo")

    $("#familia").remove()
    $("#producto").remove()

    $("#tabla_vistas tr").remove()
    for (i = 0; i <= 35; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }
        filla.append($("<td></td>").append("datos de nivel categoria " + i)).addClass("familia")

        $("#tabla_vistas").append(filla);
    }
    $(".familia").on("click", function () {
        var nivel = $(this).text();
        var boton = $("<input type='button' />'");
        boton.addClass('menu');
        boton.attr("id", 'familia');
        boton.val(nivel);
        boton.attr("onclick", "familia('" + nivel + "')");
        $("#btnera_modal").append(boton);
        familia(nivel)

        $("#producto").remove()
        //$("#nivel_folio").remove()
    });

}//fin funcion categoria
function familia(nivel) {
    console.log("familia. listo")
    $("#producto").remove()
    $("#tabla_vistas tr").remove()
    for (i = 0; i <= 47; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }
        filla.append($("<td></td>").append("datos de nivel familia " + i)).addClass("producto")

        $("#tabla_vistas").append(filla);
    }
    $(".producto").on("click", function () {
        var nivel = $(this).text();
        var boton = $("<input type='button' />'");
        boton.addClass('menu');
        boton.attr("id", 'producto');
        boton.val(nivel);
        //boton.attr("onclick", "producto('" + nivel + "')");
        $("#btnera_modal").append(boton);
        producto(nivel)

        //$("#nivel_folio").remove()
    });
   
}//fin funcion familia
function producto(nivel) {
    console.log("producto. listo")

    $("#tabla_vistas tr").remove()
    for (i = 0; i <= 63; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }
        filla.append($("<td></td>").append("datos de nivel producto " + i))

        $("#tabla_vistas").append(filla);
    }
}//fin funcion producto

function nivel_folio(){
    console.log("nivel_folio. listo")

    $("#tabla_vistas tr").remove()
    for (i = 0; i <= 63; i++) {
        var filla = $("<tr></tr>")
        if (i == 0) {
            filla.append($("<th></th>").append("Cabecera")).addClass("cabecera_tabla")
            $("#tabla_vistas").append(filla);
            filla = $("<tr></tr>")
        }
        filla.append($("<td></td>").append("datos de nivel Folio " + i))

        $("#tabla_vistas").append(filla);
    }
}

