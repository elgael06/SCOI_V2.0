//crear base de modal para crear al ser llamada.
function crear_base_modal( contenido) {
    //crea los bjetos de HTML
    var base = '<div  class="modal"><div  style="text-align:center;"><input type="button" title="Close" class="cerrar" id="btnCerrar" onclick=" destruir_modal( )  " value="X" />' +
                        contenido + ' </div>' + estilo_modal(); +'</div>';
    
    //agrega los objetos al contenedor.
    $(".nav-md").append(base);
}//fin fn
//dar estilo a modal
function estilo_modal() {
    var estilo = ".modal{" +
    " position: fixed;font-family: Arial, Helvetica, sans-serif;top: 0;right: 0;bottom: 0;left: 0;background: rgba(99, 101, 103, 0.60) ;z-index: 99999;opacity:1;-webkit-transition: opacity 400ms ease-in;-moz-transition: opacity 800ms ease-in;transition: opacity 800ms ease-in;"+
    "}\n";
    estilo += ".modal > div{" + "	position: relative;	top:1%;right:1%;bottom:1%;left:1%;width:98%;    height:98%;	padding: 5px 20px 13px 20px;	border-radius: 5px; background-color:rgb(0, 190, 219); color:azure;  -webkit-transition: opacity 400ms ease-in;-moz-transition: opacity 400ms ease-in;transition: opacity 400ms ease-in; border:none; /**sombra*/ -webkit-box-shadow: 0px 0px 23px 6px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 23px 6px rgba(0,0,0,0.75);box-shadow: 0px 0px 23px 6px rgba(250,250,250,0.75);}"
    estilo = "<style>" + estilo + "</style>"


    return estilo;
}//fin
//elimina contenido por id
function destruir_modal() {
    // id = '"#' + id + '"';
    // $(id).remove();
    $(".modal").remove()
}//fin

function llamar_modal() {
    var contenido = '<div > hola<br /><input type="button" value="ok"/> </div>';
    var clasePadre = "modalPrueba";
    crear_base_modal(contenido);
}