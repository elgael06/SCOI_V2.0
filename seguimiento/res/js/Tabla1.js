var etapa;
var contadorAspectos = 1;
var cuadroAColorear;
var ultimaFila;
var folioMatriz;
var contadorFilas = 1;
var objData = [];
var observaciones = [];
var observacionesTemp = [];
var ultimoIdMatriz;
var color;
var colorCelda = 'rgb(164, 164, 164)';
var celdas;
var hayVigentes;
var ultimaMatrizId;
var idNuevo;

/*$(document).ready(function () {
    
});*/

function obtenerPlantilla() {//inicia todo
    obtenerDistintasEtapas();// obtenemos las distintas etapas que hay para la matriz 
    establecerValoresPorDefecto();//establecemos algunos valores por defecto 
}

function obteneDataTabAux() {
    var actionData = "{ 'dato' :'" + establecimiento.val() + "'}";    // creamos una cadena JSON que sera enviada a un webservices
    $.ajax({
        async: false,//se envia la informacion de manera sincrona
        type: "POST",//tipo de envio
        //direccion a enviar-(ServicioMatrices.asmx es un webservices(o clase)
        //y tablaAuxEstablecimiento es una funcion dentro de la clase ServicioMatrices)
        url: "ServicioMatrices.asmx/tablaAuxEstablecimiento",        
        contentType: "application/json; utf-8",//tipo de contenido(JSON de tipo UTF-8)
        data: actionData,//la data o informacion del la cadena JSON creada con anterioridad arriba
        dataType: "json",//tipo de dato a enviar
        success: function (data) {//funcion evento-esta funcion se realiza una vez que el servidor da respuesta positiva del dato recibido          
            crearFilaTablaAux(JSON.parse(data.d));//enviamos el dato recibido y lo enviamos a una funcion-JSON.parse(data.d) transforma la cadena JSON a objeto javascript
        }
    });
}

function crearFilaTablaAux(data) {//se genera fila de la tabla auxiliar
    
    if (data.length > 0) {    //si obtenemos data del servidor entra  esta condicion    
        for (var i = 0; i < data.length; i++) {//ciclamos la cantidad de datos(data) para generar las filas con javascript
            var $tr = $("<tr></tr>");    //crea una fila
            $tr.addClass("filasTabAux");//le asignamos una clase para poder identificarlos
            //$tr.on("click", function () { obtenerFolioMatriz(); });

            /*creamos celdas dentro la fila concurrente creada, y a la vez le asignamos eventos de tipo 'click' a esas celdas para poder llamar a la funcion
            -obtenerFolioMatriz()-y le pasamos el parametro this.parent que hace referencia a padre de las celdas en este caso la fila o 'tr' para poder manipular el color
            que se le dara al mismo(padre,tr o fila) */
            $tr.append($("<td></td>").append(data[i].Folio).on("click", function () { obtenerFolioMatriz($(this).parent()); }));
            $tr.append($("<td></td>").append(data[i].Establecimiento).on("click", function () { obtenerFolioMatriz($(this).parent()); }));
            $tr.append($("<td></td>").append(data[i].Descripcion).on("click", function () { obtenerFolioMatriz($(this).parent()); }));
            $("#tabAux").append($tr);//agregamos la fila a la tabla 
        }        
    }    
}

function obtenerFolioMatriz(parent) {//funcion llamada por evento click desde la function 'crearFilaTablaAux'     
    $("#flechaAdel").prop("disabled", false);//atributo de id "#flechaAdel" 

    if (parent.css("background-color") === "rgba(0, 0, 0, 0)") { //si el color de la fila es "blanca o vacia" la pintará
        parent.css({ "background-color": "#A4A4A4" });//pinta fondo "Gris" de la fila
        parent.css({ "color": "white" });             //pinta la letra blanca de la fila
        folioMatriz = parent.children().eq(0).text();//obtenemos el folio de la matriz -esta está en la fila seleccionada
        if (parent != ultimaFila) {//ultimaFila es una variable global. decimos que si el parent(la fila de la celda seleccionada) es diferente de la ultima fila seleccionada
            if (ultimaFila != undefined) {//entonce si la ultima fila esta indefinida o null-entra
                ultimaFila.css({ "background-color": "rgba(0, 0, 0, 0)" });//vuelve blanca la fila
                ultimaFila.css({ "color": "" });//regresa la letra al color por defecto
            }            
        }
        ultimaFila = parent;
    }    
}

function crearBotones() {
    var inputACrear;
    //etapa es un array
    for (var i = 0; i < etapa.length; i++) {
        inputACrear = "<input class='btns' type='button' value='" +etapa[i].NombreEtapa + "' name='"+etapa[i].Etapa+"' />";//creamos botones deacuerdo a la cantidad de etapas             
        $("#botones").append(inputACrear); //agregamos al div con id "#botones" el boton creado arriba                
    }
    $(".btns").on("click", function () {//damos evento de click a todos los botones de etapas
        cambiarTabla(event);//enviamos el evento lanzado por el navegador
    });
}

function obtenerDistintasEtapas() {
    var actionData = "{'valor':'" + folioMatriz + "'}";//el folio de la matriz lo obtuvimos de la fila de la tabla aux    
    $.ajax({
        async:false,//envia dato sincronamente
        type: "POST",
        url: "ServicioMatrices.asmx/obtenerDistintasEtapas",//Web services ServicioMatrices y su funcion obtenerDistintasEtapas
        contentType: 'application/json; utf-8',
        data: actionData,//el dato a enviar
        dataType: "json",
        success: function (data) {            
            etapa = JSON.parse(data.d);//obtenemos la etapa del servidor y lo parseamos a objeto javascript
            //etapa será un array
        },
        complete: function () {//completada la consulta 
            crearBotones();//crea los botonones correspondientes a las etapas
            for (var i = 0; i < etapa.length; i++){
                obtenerMatrizCorta(etapa[i].Etapa,etapa[i].NombreEtapa);
            }                     
        }
    });
}

function establecerValoresPorDefecto() {    
    $(".tbodys[value!=1]").hide();//ocultamos el tbody que sean diferentes del primero--esto es para que solo muestre el primero
    darEventos();    //damos algunos eventos
}

function darEventos() {
    //todos los elementos con la 'class' celda se les da un evento de click, al dar click mostramos la ventana para asignar color a la celda que generò el evento
    $(".celda").on("click", function () { mostrarVentanaColor(); });
    $(".cuadroColor").on("click", function () { colorear(); });//coloreamos de acuerdo al color seleccionado        
}

function agregarEstabAplica() {
    // agregamos el valor del establecimiento-> la variable establecimiento se encuentra en la cabecera de el archivo Tabla.aspx(es el html)
    //PD. esta variable se carga desde el servidor
    $("#estab").text(establecimiento.val());
    //es el mismo que arriba
    $("#aplica").text(aplicador.val());
    //("#estab" y "#aplica" son id's de unas celdas en la que se mostrar el el contenido principal el aplicador y el establecimiento)
}

function obtenerMatrizCorta(etapa,nombreEtapa) {//paremetros
    var actionData = "{'folio_matriz':'"+folioMatriz+"','folio_etapa':'"+etapa+"'}";
    $.ajax({
        async:false,//sincrono
        type: "POST",
        url: "ServicioMatrices.asmx/obtenerMatrizCorta",
        contentType: 'application/json; utf-8',
        data: actionData,//informacion a enviar
        dataType: "json",
        success: function (data) {            
            generarDatosTabla(JSON.parse(data.d),etapa,nombreEtapa);//parseamos y enviamos mas parametros a la funcion
        }
    });
}

function generarDatosTabla(data, etapa,nombreEtapa) {
    var $tbody = $("<tbody class=tbodys value=" + etapa + "></tbody>");//crea un tbody para agregar a la tabla
    var aspecto = "";

    //llamamos a la funcion que crea una fila vacia
    filaVacia($tbody);//recibe el tbody que sera afectado -solo es para agregar filas vacias
    
    for (var i = 0; i < data.length; i++) {//ciclará la cantidad de datos devueltos por el jSON en la funcion obtenerMatrizCorta();
        var $tr = $("<tr></tr>").attr('id',''+(contadorFilas++));        //creamos una fila y le damos un id de contador de fila (para saber que fila se esta creando)
        if (aspecto != data[i].ElementoInspeccion) {//si es diferente del elemento de inspeccion entra
            var $tr1 = $("<tr></tr>");//creamos una fila
            $tr1.append("<td>" + contadorAspectos + "</td>");//agregamos una celda a la fila con el contador de aspectos
            $tr1.append($("<td>" + data[i].ElementoInspeccion + "</td>").css({// cambiamos el fondo de la celda que contendra el texto de el aspecto o elemento de inspeccion
                "background-color": "#484848",//gris
                "color":"white" //color letra blanco
            }));
            $tbody.append($tr1);//agregamos al tbody la fila
            contadorAspectos++;  //aumentamos al siguiente aspecto
            aspecto = data[i].ElementoInspeccion;//ahora el aspecto sera el aspecto concurrente
            /*enviamos un $tbody, $tr a los cuales se les agregaran unas celdas al tr
            enviamos false por que nuestro campos vacios no generan eventos de tipo click*/
            generarCamposVacios($tbody,$tr1,false,0);//genera celdas normales ya que la fila del elemento de inspeccion no genera evento ninguna celda
        }
        $tr.append("<td></td>");//agregamos a la fila una celda
        $tr.append($("<td>" + data[i].Unidad + "</td>").css({// se deja asi por si se quiere cambiar el color de la letra de las unidades
            "color":"black"//valor por defecto "" ahorita negro
        }));
        $tbody.append($tr);//agregamo la fila al tbody

        objData.push({//generamos una pila de informacion -array objeto javascript --estos datos seran necesarios para enviar al servidor
            Etapa: nombreEtapa,
            ElementoInsp:data[i].ElementoInspeccion,
            Aspecto: data[i].Aspecto,
            Unidad:data[i].Unidad
        });

        generarCamposVacios($tbody,$tr,true,data[i].CantidadCelda);//true por que si generarán eventos
    }    
    $("#tablaPrincipal").append($tbody);//agregamos el tbody al la tabla principal. los tbodys dependeran de la cantidad de etapas--PD solo se muestra un tbody a la vez
}

function filaVacia($tbody) {
    var $tr = $("<tr></tr>");//creamos una fila
    for (var i = 0; i < 52; i++) {//le agregamos 52 celdas
        $tr.append($("<td></td>").css({
            "height":"20px"// damos un tamaño de 20 pixeles
        }));
    }
    $tbody.append($tr); //agregamos fila al tbody
}

function generarCamposVacios($tbody, $tr, hasEvent, numeroCeldasConEvent) {//generamos las celdas que se evaluaran      
    if (hasEvent) {// decimos que si tiene eventos generamos celdas con una clase que los identificará
        for (var i = 0; i < 50; i++) {//creamos 50 celdas para la evaluacion de la muestra            
            if(i<numeroCeldasConEvent){//se dara eventos solo al numero de celdas con evento
                $tr.append($("<td></td>").addClass("celda"));//la clase se llama celda y se la agregamos a cada celda creada
            } else {                
                $tr.append($("<td></td>").css({
                    "background-color": "#A4A4A4"
                }).addClass("celda"));//la clase se llama celda y se la agregamos a cada celda creada;
            }            
        }

        /*for (var i = 0; i < 4; i++) {
            $tr.append($("<td></td>"));
        }*/
    } else {//celdas sin clase--celdas que estaran vacias o que no tienen evento
        for (var i = 0; i < 50; i++) {
            $tr.append($("<td></td>"));
        }
        /*for (var i = 0; i < 4; i++) {
            $tr.append($("<td></td>"));
        }*/
    }

    $tbody.append($tr);
}

function cambiarTabla(evento) {
    cambiarColorBoton(evento.srcElement.name);
    // las tabla se crean de acuerdo a la catidad de botones--tienen el mismo nombre que la etapa del boton
    $(".tbodys[value=" + evento.srcElement.name + "]").show();//mostramos la tabla correspondiente al nombre del boton de la etapa
    $(".tbodys[value!=" + evento.srcElement.name + "]").hide();//ocultamos la tabla correspondiente al nombre del boton de la etapa

}

function cambiarColorBoton(boton) {//esto es para efecto visual,para saber cual boton tiene el "foco"
    console.log(boton);//muestra en consola--solo lo ve programador
    $(".btns[name=" + boton + "]").css({//cambia color aquellos que botones que sean iguales al nombre del boton
        "background-color": "#484848",        
      });

    $(".btns[name!=" + boton + "]").css({//cambia color aquellos que botones que sean diferentes al nombre del boton
         "background-color":"#888888" 
    });
}

function colorear() {   //evento click a esta funcion por el (cuadro colorear) cuando escogemos un color
    cerrarVentanaColor();//cerrarmos la ventana modal y cuadro

    /*obtenemos el objectivo clickado y su padre junto con el id 
    que puede ser "verde","amarillo","rojo" para saber el color el */

    color = event.target.parentElement.id;
    var observacionIngresada="";

    if (color == "verde") {

        cuadroAColorear.style.backgroundColor = "green";//coloreamos verde              
        cuadroAColorear.value = "verde";//asignamos un value a la celda sera verde para saber el color
        cuadroAColorear.name = "";//si pintamos verde la casilla limpiamos el -'name'(observacion)-
        cerrarVentanaColor();
    }    

    if (color == "amarillo") {        

        observacionIngresada=prompt("Inserte Observacion","");
        if(observacionIngresada){
            cuadroAColorear.name=observacionIngresada;
            cuadroAColorear.style.backgroundColor = "yellow";//coloreamos amarillo
            cuadroAColorear.value = "amarillo";//asignamos un value a la celda sera amarillo para saber el color*/    
        }
        /*mostrarVentanaObservaciones();
        cuadroAColorear.style.backgroundColor = "yellow";//coloreamos amarillo
        cuadroAColorear.value = "amarillo";//asignamos un value a la celda sera amarillo para saber el color*/

    }
    if (color == "rojo") {         

        observacionIngresada=prompt("Inserte Observacion","");
        if(observacionIngresada){
            cuadroAColorear.name=observacionIngresada;
            cuadroAColorear.style.backgroundColor = "red";//coloreamos rojo
            cuadroAColorear.value = "rojo";//asignamos un value a la celda sera rojo para saber el color*/
        }
       /* mostrarVentanaObservaciones();
        cuadroAColorear.style.backgroundColor = "red";//coloreamos rojo
        cuadroAColorear.value = "rojo";//asignamos un value a la celda sera rojo para saber el color*/
    }
}

function hayObservacion(colorObservacion){
   // alert(colorObservacion);    
    if(colorObservacion=="amarillo"){

        observacionIngresada=prompt("Inserte Observacion","");//aparece ventana que nos muestra un textbox para ingresar la observacion
        if(observacionIngresada){//si hay infomacion
            cuadroAColorear.name=observacionIngresada;//agregamos la observacion al atributo 'name' del cuadro a colorear-->cuadro a colorea apunta a la celda que generò el evento
            cuadroAColorear.style.backgroundColor = "yellow";//coloreamos amarillo
            cuadroAColorear.value = "amarillo";//asignamos un value a la celda sera amarillo para saber el color*/ 
        }
    }
}

function mostrarVentanaColor() {    
    cuadroAColorear = event.target;// cuadro que coloreare       
    console.log(event);
    color = cuadroAColorear.style.backgroundColor;//paso el color de fondo a la variable color

    $("#cerrarObservaciones").show();//siempre mostramos el boton(cerrarObservaciones) para cerrar las observaciones ya que mas abajo se deshabilitará cuando se escoja una celda ya coloreada
   // alert(color);
    if (color == "red" || color == "green" || color == "yellow") {// tiene color la casilla seleccionada 

        if (quitarColorUltimaCelda(cuadroAColorear)) {//si estoy seleccionando la ultima celda coloreada la descolorea
            cuadroAColorear.style.backgroundColor = "";//la volvemos (blanca) con background=""(vacio)
            cuadroAColorear.name = "";//vacia la observacion
            cuadroAColorear.value = "";//vacia el value para identificarlo                
        }
        else {
            $("#ventanaModal").show();//se muestra ventana modal con show
            $(".formCol-obs").eq(0).show();//mostramos el formulario(cuadro colorear) para colorear casilla
            $("#cerrarObservaciones").hide();//aqui es donde se deshabilita el boton(cerrarObservaciones) para dejar de cerrar la observacion--SERA OBLIGATORIO DAR OBSERVACION
        }
        
    } else {//y si no mostramos cuadro de color para colorear casilla
        /*alert(color);
        alert(color=='rgb(164, 164, 164)');*/
        if (color==colorCelda) { return; }//si es del color de las celdas en gris no produce evento
        if (colorearColumnaPorColumna(cuadroAColorear)) {//pasamos el cuadro a colorear para validarlo
            $("#ventanaModal").show();//se muestra ventana modal con show
            $(".formCol-obs").eq(0).show();//mostramos el formulario(cuadro colorear) para colorear casilla
        }        
    }    
}
//columna por columna o celda por celda(es igual)
function colorearColumnaPorColumna(cuadroAColorear) {//la validacion sera que solo se puede seleccionar una celda a la vez desde el principio hasta el fin y solo en ese orden
                                                    //por que asi se requiriò--
    var elements = cuadroAColorear.parentElement.children;//obtenmos todos los elementos hijos del cuadro a colorear y se almacena en 'elements'
    
    if (!elements[2].value /*&& !elements[2].attributes.value*/) {//value es solo para identificar que tipo de celda es(amarilla,roja o verde) solo funciona si clickamos la primera celda siempre
        //console.log(elements[2].attributes.value);
       // alert("aqui esta");
        if (cuadroAColorear.cellIndex == 2) {//desimos que si la celda escogida es la numero 2      
            //(que en la aplicacion seria la primera por que esta la celda del  0-"#",1-"Metodologia" y 2-"1" y es apartir de a1 donde se empieza a evaluar)
            return true;//regresa true si es la primera la que clickamos
        } else {
            return false;//false si no es la primera
        }
    } else {//si no se clicka la primera celda comprueba los value de las celdas
//        alert("else");
        var celda;
        for (var i = 2; i < elements.length; i++) {//desde 2 ya que es la primera celda a evaluar "1"
            //console.log(elements[i].attributes.value);
            if (elements[i].value /*|| elements[i].attributes.value*/) { celda = i }//si la celda recorrida tiene un value la variable celda almacena en que posicion sucedio eso
            else { break; }//si no hay valores (value) rompe el ciclo y se queda con el ultimo valor de i la variable celda
           // alert("dentro del for la celda vale:"+celda);
        }
        //arriba se comprobó cual fue la ultima celda seleccionada
        if (cuadroAColorear.cellIndex == (celda + 1)) { return true; }//ahora queremos saber si la celda seleccionada es la siguiente
        else { return false; }
    }
    
}
                            //obtenemos la celda
function quitarColorUltimaCelda(cuadroAColorear) {//quitamos la ultima celda seleccionada(coloreada)

    var elements = cuadroAColorear.parentElement.children;//obtenemos todos los elementos de la fila 
    console.log(elements);
    var celda;
    for (var i = 2; i < elements.length; i++) {//ciclamos
        
        if (elements[i].value || elements[i].attributes.value) { celda = i }//verificamos la ultima celda
            else { break; }
           // alert("dentro del for la celda vale:"+celda);
        }
       /* alert("numero de celda"+cuadroAColorear.cellIndex);
        alert(celda);*/

        if (cuadroAColorear.cellIndex == celda) { return true; }//decimos que si el numero de la ultima celda es igual a la seleccionada returna true
        else { return false; }
}

function cerrarVentanaColor() {

    $("#ventanaModal").hide();//ocultamos ventana modal
    $(".formCol-obs").eq(0).hide();//ocultamos cuadro (cuadro colorear)
}

function mostrarTablaAux() {    //(1) PRIMER EVENTO QUE SERÁ LLAMADO           
    cerrarVentanaAplicEstab(); //cerramos la ventana que nos muestra los establecimientos y los aplicadores
    obteneDataTabAux();        //obtenemos la informacion de las matrices(platillas) creadas para escoger una.
    $("#formTablaAux").show(); //mostramos la ventana de tabla auxiliar de las plantillas creadas--> por defecto el elemento html con id="#formTablaAux" esta oculto con css
    //En caso de escoger una matriz y precionar el boton "adelante" este genera un evento de click que te envia a la funcion -mostrarContenidoPrincipal();-
}

function cerrarVentanaTablaAux() {
    $("#formTablaAux").hide();//cerramos el form de la tabla auxiliar
}

function cerrarVentanaAplicEstab() {
    $("#formAplicEstab").hide();//cerramos el form donde escogemos aplicador y establecimiento
}
function mostrarVentanaAplicEstab() {//lo genera el boton #flechaAtras--ATRAS
    $("#flechaAdel").prop("disabled", true);//el boton #flechaAdel tiene el atributo inactivo
    $(".filasTabAux").remove();//quito las filas que pudieron haberse creado antes al haber dado al boton #flechaAtras

    cerrarVentanaTablaAux();    //cerramos la tabla auxiliar una vez que se haya escogido la fila de la matriz a evaluar--PD esto solo pasa si seleccionamos la fila y damos click en el boton #flechaAdel
    $("#formAplicEstab").show();//mostramos de nuevo el form donde escogemos el aplicador y establecimiento 
}
function cerrarVentanaModal() {
    $("#ventanaModal").hide();//cerramos ventana modal
}
function mostrarVentanaModal() {
    $("#ventanaModal").show();//mostramos la ventana modal
}
function mostrarContenidoPrincipal() {// muestra el contenido principal o la TABLA en si
    agregarEstabAplica(); //Agregamos el aplicador a la celda
    cerrarVentanaModal(); //cerrarmos la ventana modal (el fondo negro transparente)
    cerrarVentanaTablaAux(); //cerramos la tabla auxiliar donde escogemos la matriz a evaluar(plantillas)     
    isPlantillaEvaluada();//verifica si se usara un plantilla o se evaluara una matriz pendiente de dar por finalizada(con estatus 'f')
   /* alert(hayVigentes);
    alert(ultimaMatrizId);*/
    $("#contenedorPrincipal").show();//ya finalizado la carga de las variable y valores por defecto mostramos el contenedor principal, en el que se encuentra la tabla y algunos botones etc.
}
function isPlantillaEvaluada() {
    //alert("vigente:" + hayVigentes);
    verSiHayVigente();
    if (hayVigentes == 1) {
        //alert("hay vigentes");
        alert("quedo una matriz vigente");
        obtenerMatrizEvaluada();

    } else {        
        alert("Plantilla");
        obtenerPlantilla();//Iniciamos algunas variable y valores por defecto->ver la funcion
    }
}

function verSiHayVigente() {
    var actionData = "{'folio_matriz':'" + folioMatriz + "'}";

    $.ajax({
        async: false,
        type: 'POST',
        url: " ServicioMatrices.asmx/vigentesMatriz",
        contentType: 'application/json; utf-8',
        data: actionData,// dato a enviar
        dataType: "json",
        // beforeSend: function () { iniciaCargaImg(); },
        success: function (data) {            
            var dato = JSON.parse(data.d);
            hayVigentes = dato.HayVigente;
            ultimaMatrizId = dato.UltimaMatrizId;
        },
        error: function (xhr, ajaxOptions, thrownError) { 
            alert(xhr.status + ' ' + thrownError);
        }        
    });
}

function mostrarVentanaObservaciones() {
    mostrarVentanaModal();          //mostramos la ventana modal
    $(".formCol-obs").eq(1).show();//mostramos el primer form de la class "formCol-obs" 
    $("#txObservacion").focus();  //pone el foco en el textbox donde se introducirá la observacion
}

function cerrarVentanaObservaciones() {
    cuadroAColorear.style.backgroundColor = "";//volvemos blanca la celda
    cuadroAColorear.name = "";                //volvemos vacio el nombre(donde se almacena la observacion)
    cuadroAColorear.value = "";              //volvermos vacio el value (donde se almacena el nombre del color)    
    cerrarVentanaModal();                   // cerrar ventana modal
    limpiarTxObservacion();                // limpiamos la ventana de observacion
    $(".formCol-obs").eq(1).hide();       // escondemos el primer form
}

function limpiarTxObservacion() {
    $("#txObservacion").val("");//ponemos el val en vacio
}


function insertarObservacion() {
    if ($("#txObservacion").val() == "") {// si esta vacia la observacion
        alert("inserte Observacion"); 
        return;
    }
    cerrarVentanaModal();//cerramos ventana modal
    $(".formCol-obs").eq(1).hide();//escondemos el form 1
    //cuadroAColorear.style.name = $("#txObservacion").val();
    cuadroAColorear.name = $("#txObservacion").val();//agregamos la observacion de 
    limpiarTxObservacion();//limpiamos el textbox observacion
}

function guardarMatriz(opcion) {        ////////la opcion es para saber el tipo de guardardo que tendra, osea->0 matriz finalizada--1 matriz guardada normal
    if (opcion==0) {
        if (confirm("Desea Finalizar la matriz?")) {                        

            if (hayVigentes == 1) { //comprobamos si la matriz quedó en vigente para hacer un 'update' o mejor dicho un drop de esos campos
                alert("hay vigentes");
                generarDataMatriz("f",1);         // se genera toda la informacion de la tabla para enviarse
                generarDataObservaciones(1); // se genera toda la informacion de la observaciones (si es que las hay)

                /*generarDataMatriz("v", 1);
                generarDataObservaciones(); // se genera toda la informacion de la observaciones (si es que las hay)*/
            } else {
                // se genera toda la informacion de la tabla para enviarse enviamos como parametros el estatus de la matriz y si aguarda si es 
                //0 o si es 1 de actualiza
                generarDataMatriz("f", 0);         // se genera toda la informacion de la tabla para enviarse
                generarDataObservaciones(0); // se genera toda la informacion de la observaciones (si es que las hay)

            }
            location.reload(true);//recarga la pagina

        }
    } else {
        if (confirm("Desea Guardar la matriz?")) {

            if (hayVigentes == 1) { //comprobamos si la matriz quedó en vigente para hacer un 'update' o mejor dicho un drop de esos campos
                alert("hay vigentes");
                generarDataMatriz("v", 1);
                generarDataObservaciones(1); // se genera toda la informacion de la observaciones (si es que las hay)
            } else {
                // se genera toda la informacion de la tabla para enviarse enviamos como parametros el estatus de la matriz y si aguarda si es 
                //0 o si es 1 de actualiza
                generarDataMatriz("v",0); 
                generarDataObservaciones(0); // se genera toda la informacion de la observaciones (si es que las hay)
            }            
            location.reload(true);//recarga la pagina
        }
    }     
   // alert("recarga");   
}

function iniciaCargaImg() {
    mostrarVentanaModal();
    $("#imgCargando").show();
}

function terminaCargaImg() {
    cerrarVentanaModal();
    $("#imgCargando").hide();
}

function generarDataMatriz(estado, guardarOActualizar) {
    /*alert(estado);
    alert(guardarOActualizar);*/

    var celdas = [];
    var t = document.getElementsByClassName("celda"); //obtenemos todas las CELDAS con class 'celda'
        
    for (var i = 0; i < t.length; i++) {//recorremos

        if (t[i].value=="verde") {
            celdas.push(1);//insertamos 1 si la celda es verde
        }
        else if (t[i].value == "amarillo") {
            celdas.push(3);//insertamos 2 si la celda es amarillo
        }
        else if (t[i].value == "rojo") {
            celdas.push(2);//insertamos 1 si la celda es rojo
        }
        else {
            celdas.push(0);//celdas vacias
        }
    }
    //generamos la data para enviar el servidor    

    if (guardarOActualizar == 0) {
        idNuevo = ultimoId;
    } else {
        idNuevo = ultimaMatrizId;
    }
    var data = {    //OBJETO JAVASCRIPT
        id: idNuevo
        , folioMatriz: parseInt(folioMatriz)
        , establecimiento: establecimiento.val()
        , aplicador: aplicador.val()
        , etaAspUni: JSON.stringify(objData)// aqui se introduce un arreglo dentro de otro
        , celdas: celdas
        , estatus: estado
        ,guardar:guardarOActualizar
    }

   /* console.log(data);
    console.log(JSON.stringify(data));*/

    enviarMatriz(JSON.stringify(data));
}

function generarDataObservaciones(guardarOActualizar) {
    var observaciones = [];//array de objetos
    var t = document.getElementsByClassName("celda");//obtenemos todas las CELDAS
    var contadorObservaciones = 0;
    console.log(t)    
    for (var i = 0; i < t.length ; i++) {
        
        if (!t[i].name) { continue; }//si en el atributo 'name' es vacio continua hacia la otra celda            
        var color ;
        if (t[i].value=="rojo") { color = 2; }
        if (t[i].value=="amarillo") { color = 3; }
        //alert(color);
            observaciones.push({//enpujamos dentro de la pila de objetos 
            Fila: parseInt(t[i].parentElement.id)//en el id de cada padre(tr o fila)ponemos el numero de fila, esto desde el html--ver documento
            , Columna: (parseInt(t[i].cellIndex) - 1)//numero de celda. es -1 por que la celda inicia en el numero 2--porque?--por que la primera columna es el numero(#,pos:0)  y la segunda columna es la metodologia('metodologia',pos:1)
            , Observacion: t[i].name//en 'name' almacenamos la observacion que el usuario introduce
            ,Color:color
        });
        contadorObservaciones++;
    }

    if (contadorObservaciones == 0) { /*alert("cero observaciones returna");*/ return; }//returna si no hay observaciones
    

    var data = {//Objeto que sera transformado en JSON para enviar al servidor
        noMatriz: idNuevo,
        datos: JSON.stringify(observaciones),//convertimos el objeto
        guardar:guardarOActualizar
    }

    enviarObservaciones(JSON.stringify(data));//enviamos observaciones ->con JSON.stringify serializamos el objeto en JSON string array
}

function enviarMatriz(dato) {
   // alert(dato);
    console.log(dato);//para programador  == System.out.println(),Console.WriteLine(),print()
    //return;
    $.ajax({
        async:false,
        type: 'POST',
        url: " ServicioMatrices.asmx/SaveMatriz",
        contentType: 'application/json; utf-8', 
        data: dato,// dato a enviar
        dataType: "json",
       // beforeSend: function () { iniciaCargaImg(); },
        success: function (data) {
            alert('Registro Guardado');
            //console.log(data.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + thrownError);
        }
        //complete: function () { terminaCargaImg(); }
    });
}

function enviarObservaciones(dato) {
  //  alert(dato);
    console.log(dato);    

    $.ajax({
        async:false,
        type: 'POST',
        url: " ServicioMatrices.asmx/InsertarObservaciones",
        contentType: 'application/json; utf-8',
        data: dato,
        dataType: "json",
        success: function (data) {
            alert('Observaciones Guardadas');
            //console.log(data.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + thrownError);
        }
    });

}




//motor para obtener el contenido de una matriz evaluada pero no terminada
function obtenerMatrizEvaluada() {
    obtenerPorEtapas();
    establecerValoresPorDefecto();
}

function obtenerPorEtapas() {//esta funcion es exactamente igual obtenerDistintasEtapas()
    var actionData = "{'valor':'" + ultimaMatrizId + "'}";//el folio de la matriz lo obtuvimos de la fila de la tabla aux    
   // alert(actionData);
    $.ajax({
        async: false,//envia dato sincronamente
        type: "POST",
        url: "ServicioMatrices.asmx/getDistintasEtapas",//Web services ServicioMatrices y su funcion obtenerDistintasEtapas
        contentType: 'application/json; utf-8',
        data: actionData,//el dato a enviar
        dataType: "json",
        success: function (data) {
            etapa = JSON.parse(data.d);//obtenemos la etapa del servidor y lo parseamos a objeto javascript   
            console.log(etapa);
            return;
        },
        complete: function () {//completada la consulta 
            crearBotones();//crea los botonones correspondientes a las etapas
            obtenerObservaciones();            
            for (var i = 0; i < etapa.length; i++) {
                getMatrizCorta(etapa[i].Etapa, etapa[i].NombreEtapa);
            }
            colocarObservaciones();
        }
    });
}

function getMatrizCorta(etapa,nombreEtapa) {
    var actionData = "{'folio_matriz':'" + ultimaMatrizId + "','folio_etapa':'" + etapa + "'}";
    $.ajax({
        async: false,//sincrono
        type: "POST",
        url: "ServicioMatrices.asmx/getMatrizCorta",
        contentType: 'application/json; utf-8',
        data: actionData,//informacion a enviar
        dataType: "json",
        success: function (data) {
            // generarDatosTabla(JSON.parse(data.d), etapa, nombreEtapa);//parseamos y enviamos mas parametros a la funcion          
            console.log(JSON.parse(data.d));
            //antes de generar data obtenemos la cantidad de celdas
            obtenerCantidadCeldas(etapa);            
            generarData(JSON.parse(data.d), etapa, nombreEtapa);
        }
    });
}

function obtenerCantidadCeldas(etapa) {/////////////////

    var actionData = "{'folio_matriz':'" + folioMatriz + "','folio_etapa':'" + etapa + "'}";
    $.ajax({
        async: false,//sincrono
        type: "POST",
        url: "ServicioMatrices.asmx/obtenerCantidadCeldas",
        contentType: 'application/json; utf-8',
        data: actionData,//informacion a enviar
        dataType: "json",
        success: function (data) {
            // generarDatosTabla(JSON.parse(data.d), etapa, nombreEtapa);//parseamos y enviamos mas parametros a la funcion          
            console.log(JSON.parse(data.d));
            //antes de generar data obtenemos la cantidad de celdas
            celdas = JSON.parse(data.d);            
        }
    });
}

function obtenerObservaciones() {
    var actionData = "{'folio_matriz':'" + ultimaMatrizId + "'}";
    
    $.ajax({
        async: false,//sincrono
        type: "POST",
        url: "ServicioMatrices.asmx/obtenerObservaciones",
        contentType: 'application/json; utf-8',
        data: actionData,//informacion a enviar
        dataType: "json",
        success: function (data) {
            // generarDatosTabla(JSON.parse(data.d), etapa, nombreEtapa);//parseamos y enviamos mas parametros a la funcion          
            console.log(JSON.parse(data.d));
            observacionesTemp = JSON.parse(data.d);
           // colocarObservaciones();
        }
    });
}

function colocarObservaciones() {

    //obtendremos las celdas para agregarles las matrices
    var celdas = document.getElementsByClassName("celda");    
    
    for (var i = 0; i < celdas.length; i++) {          
        for (var j = 0; j < observacionesTemp.length; j++) {            
            if (celdas[i].parentElement.id == observacionesTemp[j].Fila.toString() ) {
                //alert(observacionesTemp[j].Fila);
                var colObs = observacionesTemp[j].Columna + 1;

                /*alert("celdas:" + celdas[i].cellIndex);
                alert("observacion:" + colObs);*/

                if (celdas[i].cellIndex == colObs) {                    
                    celdas[i].name = observacionesTemp[j].Observacion                                  
                }
            }
        }
    }
        
    console.log(celdas);
    console.log(celdas.length);
}

function generarData(data, etapa, nombreEtapa) {    
    var $tbody = $("<tbody class=tbodys value=" + etapa + "></tbody>");//crea un tbody para agregar a la tabla
    var aspecto = "";
    //llamamos a la funcion que crea una fila vacia
    filaVacia($tbody);//recibe el tbody que sera afectado -solo es para agregar filas vacias

    for (var i = 0; i < data.length; i++) {//ciclará la cantidad de datos devueltos por el jSON en la funcion obtenerMatrizCorta();
        var $tr = $("<tr></tr>").attr('id', '' + (contadorFilas++));        //creamos una fila y le damos un id de contador de fila (para saber que fila se esta creando)
        if (aspecto != data[i].Elemento) {//si es diferente del elemento de inspeccion entra
            var $tr1 = $("<tr></tr>");//creamos una fila
            $tr1.append("<td>" + contadorAspectos + "</td>");//agregamos una celda a la fila con el contador de aspectos
            $tr1.append($("<td>" + data[i].Elemento + "</td>").css({// cambiamos el fondo de la celda que contendra el texto de el aspecto o elemento de inspeccion
                "background-color": "#484848",//gris
                "color": "white" //color letra blanco
            }));
            $tbody.append($tr1);//agregamos al tbody la fila
            contadorAspectos++;  //aumentamos al siguiente aspecto
            aspecto = data[i].Elemento;//ahora el aspecto sera el aspecto concurrente
            
            /*enviamos un $tbody, $tr a los cuales se les agregaran unas celdas al tr
            enviamos false por que nuestro campos vacios no generan eventos de tipo click*/
            generarCamposVacios2($tbody, $tr1, false, data[i].CantidadCelda,0);//genera celdas normales ya que la fila del elemento de inspeccion no genera evento ninguna celda
        }
        $tr.append("<td></td>");//agregamos a la fila una celda
        $tr.append($("<td>" + data[i].Unidad + "</td>").css({// se deja asi por si se quiere cambiar el color de la letra de las unidades
            "color": "black"//valor por defecto "" ahorita negro
        }));
        $tbody.append($tr);//agregamo la fila al tbody

        objData.push({//generamos una pila de informacion -array objeto javascript --estos datos seran necesarios para enviar al servidor
            Etapa: nombreEtapa,
            ElementoInsp: data[i].Elemento,
            Aspecto: data[i].Aspecto,
            Unidad: data[i].Unidad
        });        
        generarCamposVacios2($tbody, $tr, true, celdas[i].Celda,data[i].Celdas);//true por que si generarán eventos

    }
    $("#tablaPrincipal").append($tbody);//agregamos el tbody al la tabla principal. los tbodys dependeran de la cantidad de etapas--PD solo se muestra un tbody a la vez
}

function generarCamposVacios2($tbody, $tr, hasEvent, numeroCeldasConEvent, dataCeldas) {//generamos las celdas que se evaluaran   
   // alert(numeroCeldasConEvent);
    if (hasEvent) {// decimos que si tiene eventos generamos celdas con una clase que los identificará

        for (var i = 0; i < 50; i++) {//creamos 50 celdas para la evaluacion de la muestra            
            /****editar****/
            if (i < numeroCeldasConEvent) {//se dara eventos solo al numero de celdas con evento
                if (dataCeldas[i] == 1) {

                    var td = document.createElement("td");
                    td.style.backgroundColor = "green";
                    td.value = "verde";
                    td.className = "celda";
                    $tr.append(td);

                   /* $tr.append($("<td></td>").css({
                        "background-color": "green"
                    }).addClass("celda").attr("value","verde"));//la clase se llama celda y se la agregamos a cada celda creada;   */

                }
                else if (dataCeldas[i] == 2) {
                    /*$tr.append($("<td></td>").css({
                        "background-color": "red"
                    }).addClass("celda").attr("value", "rojo"));//la clase se llama celda y se la agregamos a cada celda creada;*/

                    var td = document.createElement("td");
                    td.style.backgroundColor = "red";
                    td.value = "rojo";
                    td.className = "celda";                    
                    $tr.append(td);
                }
                else if (dataCeldas[i] == 3) {
                   /* $tr.append($("<td></td>").css({
                        "background-color": "yellow"
                    }).addClass("celda").attr("value", "yellow"));//la clase se llama celda y se la agregamos a cada celda creada;*/

                    var td = document.createElement("td");
                    td.style.backgroundColor = "yellow";
                    td.value = "amarillo";
                    td.className = "celda";
                    $tr.append(td);

                } else {
                   $tr.append($("<td></td>").addClass("celda"));//la clase se llama celda y se la agregamos a cada celda creada
                }

            } else {                
                $tr.append($("<td></td>").css({
                    "background-color": "#A4A4A4"
                }).addClass("celda"));//la clase se llama celda y se la agregamos a cada celda creada;
            }
        }

        /*for (var i = 0; i < 4; i++) {
            $tr.append($("<td></td>"));
        }*/
    } else {//celdas sin clase--celdas que estaran vacias o que no tienen evento
        for (var i = 0; i < 50; i++) {
            $tr.append($("<td></td>"));
        }
        /*for (var i = 0; i < 4; i++) {
            $tr.append($("<td></td>"));
        }*/
    }

    $tbody.append($tr);
}

function mostrarLista() {    //llamada por el boton con el id='lista'
    
    if (hayObservaciones()) {
        $("#ventanaModal").show();//mostrarmos la ventana modal
        $("#formListaObservaciones").show();//mostramos el form de las observaciones hechas
    } else {
        alert("No hay observaciones");
    }
}

function cerrarLista() {
    //cerramos por el boton con el id='lista'
    $("#ventanaModal").hide();//ocultamos la ventana modal
    $("#formListaObservaciones").hide();//ocultamos el form de las observaciones hechas
    limpiarListaObservaciones();
}

function hayObservaciones() {

    var celdas = document.getElementsByClassName("celda")
    var $tabla = $("#tablaListaObservaciones");
    var condicion = false;

    console.log(celdas);

    for (var i = 0; i < celdas.length; i++) {
        if(celdas[i].value=="amarillo" || celdas[i].value=="rojo"){
            alert("la observacion es:" + celdas[i].name);

            var elementoInspeccion = buscarElementoInspeccion(celdas[i]);
            var etapaLocal = buscarEtapa(celdas[i]);
            var $tbody = $("<tbody></tbody>");
            var $tr = $("<tr></tr>");
            var $td1 = $("<td></td>");
            var $td2 = $("<td></td>");

            var $div0 = $("<div class='datoObs'></div>");
            var $div1 = $("<div class='datoObs'></div>");
            var $div2 = $("<div class='datoObs'></div>");
            var $div3 = $("<div class='datoObs'></div>");
            var $div4 = $("<div class='datoObs'></div>");
            var $div5 = $("<div id='imagenFoto'><img src='res/img/camara1.jpg' id='foto' /></div>");

            $div0.append("Color:"+ celdas[i].value );
            $div1.append("Etapa:"+etapaLocal);
            $div2.append("Elemento inspección:"+elementoInspeccion);
            $div3.append("Unidad:"+celdas[i].parentElement.cells[1].textContent);
            $div4.append("Observacion:"+celdas[i].name);

            $td1.append($div0);
            $td1.append($div1);
            $td1.append($div2);
            $td1.append($div3);
            $td1.append($div4);

            $td2.append($div5);

            $tr.append($td1);
            $tr.append($td2);            

            $tbody.append($tr);

            $tabla.append($tbody);

            condicion = true;
        }
    }

    return condicion;
}

function limpiarListaObservaciones() {
    $("#tablaListaObservaciones").empty();//elimina todos lo elementos dentro de la tabla 
}

function buscarElementoInspeccion(celda) {//recimos la celda que contiene la observacion
    var tbody = celda.parentElement.parentElement;//obtenemos el padre del padre(abuelo),osea el tbody->tr->td
    var filaInicio = celda.parentElement.sectionRowIndex;//obtenemos el numero de fila que es el elemento padre del td--eso es por que desde ahi empezará el barrido
    //console.log(tbody);

    var trs = tbody.getElementsByTagName("tr");//obtenemos todas las fila del tbody sobre el que estamos.
    //console.log(trs);

    for (var i = filaInicio; i >= 0; i--) {//hacemos el barrido
        //alert(i);
      //  console.log(trs[i]);
        //si la la fila no tiene id,significa que es la fila que contiene el titulo del elemento de inspeccion
        if (trs[i].id == "") {
            alert(trs[i].cells[1].textContent);
            return trs[i].cells[1].textContent; //regresa el contenido de la celda 
        }
    }
}

function buscarEtapa(celda) {
    var tbody = celda.parentElement.parentElement;//obtenemos el padre del padre(abuelo),osea el tbody->tr->td
    /*console.log(tbody);
    alert(tbody.attributes.value.value);*/
    for (var i = 0; i < etapa.length; i++) {
        if (etapa[i].Etapa == tbody.attributes.value.value) {
            //alert(etapa[i].NombreEtapa);
            return etapa[i].NombreEtapa
        }
    }
}

function paginaDefault() {
    var canvas = document.createElement("canvas");
    var imagen = document.getElementById("Image1");

    console.log(imagen);
    
    canvas.width = imagen.width;
    canvas.height = imagen.height;

    console.log(canvas);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imagen, 0, 0);
    
    var dataUrl = canvas.toDataURL("image/png");
    alert(dataUrl);
    console.log(dataUrl);
    //window.location.href = "Default.aspx";
}


