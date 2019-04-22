<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="MatrizGuardada.aspx.vb" Inherits="seguimiento.MatrizGuardada" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>        
        #cuerpo{
            overflow:auto;
            width:100%;
            height:100vh;                
        }

        .ventanaModal{             
            width:100%;
            height:100vh; 
            position:fixed; 
            background:rgba(0,0,0,0.2);           
            top:0;
            left:0;
            display:none;           
        }
        .form{
            top:50%;
            left:50%;
            width:25%;
            height:25vh;
            position:absolute;
            background-color:#fff;
            margin-left:-5%;
            margin-top:-5%;
            padding:10px;
            text-align:center;
            font-size:15px;  
            box-shadow:5px 5px 20px 5px #888888;
        }

        #tablaModal{
            display:none;                         
        }
        #tablaCabecera{
            border-collapse: collapse;
            width: 50%;
            text-align: center;
            margin-left:2%;
            margin-bottom:1%;            
        }
        td {
            padding: 0.25rem;
            border: 1px solid #BDBDBD;
        }
        #divTabla{                 
            text-align:center;      
            height:100vh;
        }
        #tablaParte1{            
            max-width:8%;
            height:90.8%;
            float:left;           
        }
        #tablaParte2{
            width:19%;
            height:90.8%;
            float:left;            
        }
        #tablaParte3{
            width:35%;
            height:90.8%;
            float:left;            
        }
        #tablaParte4{
            width:28%;
            height:90.8%;
            float:left; 
                       
        }
        #tablaParte4 td{
            padding:0px;    
        }

        #tablaParte5{            
            width:9%;
            height:90.8%;
            float:left;            
        }
        #tabPart1{
            width:100%;             
        }
        #tabPart2{
            width:100%;
        }
        #tabPart3{
            width:100%;
        }
        #tablaNumeros{
            width:100%;
        }
        #tabPart4{
            width:100%;
        }
        #tabPart5{
            width:100%;
        }
        .tabCabeceras {            
            height:50px;            
        }
        .tabCabeceras2{
            height:54px;
        }
        #divCajas{            
            height:25px;
            width:100%;
        }
        #tdOce{
            height:82vh;
        }
        #tdEtapa{
            height:82vh;
        }
        #tx{
            width:100%;
            border:none;
            height:40px;
        }
        #tablaPartNumeros{
            overflow-x:scroll;
        }
         .titulo{
            background: #484848 ;
            color: white;
        }
         #btsAgrEliFila{
             margin-top:10px;
         }
         #btDivAgregarAspecto{
             margin-top:25px;
         }
         #titulo{
             background: #484848 ;
            color: white;
         } 
         
         #tablaColor{             
             width:50%;
             margin-left:26%;
             box-shadow:4px 4px 10px #888888;
         }        
         #tabColor{
             width:100%;                          
         }
         .cuadroColor{
             height:30px;             
         }
         #amarillo{
             background-color:yellow;
         }
         #rojo{
             background-color:red;
         }
         #verde{
             background-color:green;
         }
         #divColorTitulo{
             width:100%;
             height:35%;                          
         }
         #divColorTitulo h2{
             margin-left:45%;
         }

         #cerrarModalColor{
             float:left;
             margin-left:20%;
         }
        .form h2{            
            float:left;
            margin-left:6%;
        }
        #divObservacionTitulo h2{
            float:left;            
            margin-left:30%;
        }
        #divObservacionTitulo textarea{
            width:250px;
            height:70px;
            box-shadow:10px 10px 15px #888888;
        }
        #btAceptarObservacion{
            margin-top:10px;
        }
        #form{
             top:50%;
             left:50%;
             width:525px;
             height:480px;
             padding:25px;
             background-color:#fff;
             color:#666;    
             position:absolute;
             margin-left:-159px;
             margin-top:-210px;     
             box-shadow:4px 4px 10px #888888;             
         }
        #form h1{
            margin-left:60px;
        }
        #form input{
            margin-left:44px;
            margin-bottom:12px;
            width:320px;
            box-shadow:4px 4px 10px #888888; 
        }        

        #tablaAux{
             width:400px;
             height:300px;
             overflow:scroll;
             margin-left:35px;
             box-shadow:4px 4px 10px #888888; 
         }

        #txCajas{
            margin-right:17%;
            width:40%;
        }
        .form select{
            width:200px;
        }

        @media screen And (max-width:1024px) {
             #cuerpo{
            overflow:auto;
            width:100%;
            height:100vh;                                        
        }

        .ventanaModal{             
            width:100%;
            height:100vh; 
            position:fixed; 
            background:rgba(0,0,0,0.2);           
            top:0;
            left:0;
            display:none;           
        }
        .form{
            top:50%;
            left:50%;
            width:25%;
            height:25vh;
            position:absolute;
            background-color:#fff;
            margin-left:-5%;
            margin-top:-5%;
            padding:10px;
            text-align:center;
            font-size:15px;  
            box-shadow:5px 5px 20px 5px #888888;
        }

        #tablaModal{
            display:none;                         
        }
        #tablaCabecera{
            border-collapse: collapse;
            width: 50%;
            text-align: center;
            margin-left:2%;
            margin-bottom:1%;            
        }
        td {
            padding: 0.25rem;
            border: 1px solid #BDBDBD;
        }
        #divTabla{                 
            text-align:center;      
            height:100vh;
        }
        #tablaParte1{            
            max-width:8%;
            height:90.8%;
            float:left;               
        }
        #tablaParte2{
            width:19%;
            height:90.8%;
            float:left;                        
        }
        #tablaParte3{
            width:35%;
            height:90.8%;
            float:left;                       
        }
        #tablaParte4{
            width:28%;
            height:90.8%;
            float:left;            
        }
        #tablaParte4 td{
            padding:0px;    
        }

        #tablaParte5{            
            width:9%;
            height:90.8%;
            float:left;                
        }
        #tabPart1{
            width:100%; 
            font-size:9px; 
        }
        #tabPart2{
            width:100%;
            font-size:9px; 
        }
        #tabPart3{
            width:100%;
            font-size:9px; 
        }
        #tablaNumeros{
            width:100%;
            font-size:9px; 
        }
        #tabPart4{
            width:100%;
            font-size:9px; 
        }
        #tabPart5{
            width:100%;
            font-size:9px; 
        }
        .tabCabeceras {            
            height:50px;            
        }
        .tabCabeceras2{
            height:54px;
        }
        #divCajas{            
            height:35px;
            width:100%;
        }
        #tdOce{
            height:82vh;
        }
        #tdEtapa{
            height:82vh;
        }
        #tx{
            width:100%;
            border:none;
            height:40px;
        }
        #tablaPartNumeros{
            overflow-x:scroll;
        }
         .titulo{
            background: #484848 ;
            color: white;
        }
         #btsAgrEliFila{
             margin-top:10px;
         }
         #btDivAgregarAspecto{
             margin-top:25px;
         }
         #titulo{
             background: #484848 ;
            color: white;
         } 
         
         #tablaColor{             
             width:50%;
             margin-left:26%;
             box-shadow:4px 4px 10px #888888;
         }        
         #tabColor{
             width:100%;                          
         }
         .cuadroColor{
             height:30px;             
         }
         #amarillo{
             background-color:yellow;
         }
         #rojo{
             background-color:red;
         }
         #verde{
             background-color:green;
         }
         #divColorTitulo{
             width:100%;
             height:35%;                          
         }
         #divColorTitulo h2{
             margin-left:45%;
         }

         #cerrarModalColor{
             float:left;
             margin-left:20%;
         }
        .form h2{            
            float:left;
            margin-left:6%;
        }
        #divObservacionTitulo h2{
            float:left;            
            margin-left:30%;
        }
        #divObservacionTitulo textarea{
            width:250px;
            height:70px;
            box-shadow:10px 10px 15px #888888;
        }
        #btAceptarObservacion{
            margin-top:10px;
        }
        #form{
             top:50%;
             left:50%;
             width:525px;
             height:480px;
             padding:25px;
             background-color:#fff;
             color:#666;    
             position:absolute;
             margin-left:-159px;
             margin-top:-210px;     
             box-shadow:4px 4px 10px #888888;             
         }
        #form h1{
            margin-left:60px;
        }
        #form input{
            margin-left:44px;
            margin-bottom:12px;
            width:320px;
            box-shadow:4px 4px 10px #888888; 
        }        

        #tablaAux{
             width:400px;
             height:300px;
             overflow:scroll;
             margin-left:35px;
             box-shadow:4px 4px 10px #888888; 
         }

        #txCajas{
            margin-right:17%;
            width:40%;
        }
        .form select{
            width:200px;
        }
        }

    </style> 

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div id="cuerpo">        
        <!--<div class="ventanaModal">
            <div class="form">
               <h2>Selecciona el establecimiento</h2> 
                <br />
                <br />
                <select id="cbEstablecimiento" runat="server">
                    
                </select>
                <br />
                <br />
                <h2>Cantidad de cajas</h2> 
                <br />
                <input type="number" min="1" max="50"  value="5" id="txCajas" />
                <input type="button" id="btSiguiente" value="siguiente" onclick="evSiguiente();"/>
            </div>
          </div>-->

          <div class="ventanaModal">
            <div class="form">
                <div id="divColorTitulo">
                    <h2>Color</h2><input type="button" id="cerrarModalColor" value="X" onclick="cerrarVentanaColor();"/> 
                </div>
                <br />

                <div id="tablaColor">
                    <table id="tabColor">
                        <thead id="cabColorTab">
                            <tr>
                                <td id="verde"><div class="cuadroColor"></div></td>
                                <td id="rojo"><div class="cuadroColor"></div></td>
                                <td id="amarillo"><div class="cuadroColor"></div></td>

                            </tr>
                        </thead>
                    </table>
                </div>                                
            </div>
          </div>

           <div class="ventanaModal">
                <div class="form">
                <div id="divObservacionTitulo">
                    <h2>Observaciones</h2><input type="button" id="cerrarObservaciones" value="x" onclick="cerrarVentanaObservacion();"/>
                    <textarea id="txObservacion"></textarea> 
                </div>
                

                <div id="divBtns">
                    <input type="button" id="btAceptarObservacion" value="Aceptar" "/>
                </div>                                
            </div>
           </div>

          <div class="ventanaModal" >                            
            <div id="form">
                
            <h1 >Matrices Guardadas</h1>                    
                
                <input id="filtro" type="text" class="light-table-filter" data-table="order-table" placeholder="buscar"/>
                <div id="tablaAux">                    
                    <table class="order-table table">
				    <thead class="titulo">
				    <tr > 
                        <td>
                            No.Matriz
                        </td>
					    <td>
						    Folio
					    </td>
					    <td >
						    Establecimiento
					    </td>
					    <td>
						    Descripcion
					    </td>     
                        <td>
						    Aplicador
					    </td>                
				    </tr>
			     </thead>
               
			    </table>
               </div>
            </div>
        </div>

        <div id="tablaModal">            
            <div id="divTablaCabecera">
                <table id="tablaCabecera">    
                    <thead>
                        <tr>
                            <td>Tienda</td><td></td>
                        </tr>
                        <tr>
                            <td>Aplicador</td><td></td>
                        </tr>
                    </thead>            

                </table>                
            </div>

            <div id="divTabla">
                <div id="tablaParte1">
                     <table id="tabPart1">
                         <thead class="titulo">
                             <tr>
                                 <td><div class="tabCabeceras">oce</div></td>
                                 <td><div class="tabCabeceras">Etapa<br />clave</div></td>
                             </tr>
                         </thead>
                         <tbody>
                             <!--<tr>
                                <td><!--<div id="tdOce"></div>--</td>
                                 <td><!--<div id="tdEtapa"></div>--</td>
                             </tr>-->
                         </tbody>
                     </table>
                </div>

               <div id="tablaParte2">
                <table id="tabPart2">                     
                        <thead class="titulo">
                            <tr>                            
                                <td><div class="tabCabeceras">&nbsp</div></td>
                                <td><div class="tabCabeceras">Metodologia</div></td>                                                        
                            </tr>
                        </thead>
                        <tbody>
                            <!--<tr><td>1</td><td><input type="text" id="tx" /></td></tr>-->
                        </tbody>
                </table>
               </div>

                <div id="tablaParte3">
                    <table id="tabPart3">
                        <thead id="titulo">
                            <tr><td><div id="divCajas">Muestras</div></td></tr>
                        </thead>
                        <!--<tbody class="titulo">                            
                            <tr><td><div id="divCajas">Cajas</div></td></tr>
                        </tbody>-->
                    </table>

                    <div id="tablaPartNumeros">
                    <table id="tablaNumeros">
                        <thead class="titulo">
                            <tr>
                                <!--<td>1&nbsp</td>
                                <td>2&nbsp</td>
                                <td>3&nbsp</td>
                                <td>4&nbsp</td>
                                <td>5&nbsp</td>
                                <td>6&nbsp</td>
                                <td>7&nbsp</td>
                                <td>8&nbsp</td>
                                <td>9&nbsp</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>   
                                <td>21</td> 
                                <td>22</td>
                                <td>23</td>
                                <td>24</td>-->    
                                                   
                            </tr>
                        </thead> 
                        <tbody>
                           <!-- <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>-->
                        </tbody>                       
                    </table>
                    </div>
                </div>

                <div id="tablaParte4">
                    <table id="tabPart4">
                        <thead class="titulo">
                            <tr>
                                <td><div class="tabCabeceras2">Porcentaje</div></td>
                                <td><div class="tabCabeceras2">Ponderacion</div></td>
                                <td><div class="tabCabeceras2">Puntos en <br />Juego</div></td>
                                <td><div class="tabCabeceras2">Puntos<br />Obtenidos</div></td>                                
                            </tr>
                        </thead>
                        <tbody>
                           <!-- <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>                               
                            </tr>-->
                        </tbody>    
                    </table>
                </div>

                <div id="tablaParte5">
                    <table id="tabPart5">
                        <thead class="tabCabeceras titulo">
                            <tr><td><div class="tabCabeceras">Promedio</div></td></tr>
                        </thead>
                        <tbody>
                           <!-- <tr><td><!--<div id="tdPromedio"> </div>--</td></tr>-->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

    <script>         
        var tdHead = document.getElementsByClassName("titulo");        
        var tBodysGeneral = document.getElementsByTagName("tbody");        
        var ventana = document.getElementsByClassName("ventanaModal");        
        var tablaModal = document.getElementById("tablaModal");
        var tablaNumerostBody = document.getElementById("tablaNumeros").children[1];
        var tablaNumerosthead = document.getElementById("tablaNumeros").children[0];

        var tabla1 = tBodysGeneral[0];
        var tabla2 = tBodysGeneral[1];
        var tabla3 = tBodysGeneral[2];
        var tabla4 = tBodysGeneral[3];
        var tabla5 = tBodysGeneral[4];

        var colorTabla = document.getElementsByClassName("cuadroColor");        

        var indexColumna;
        var indexFila;
        var index;

        var tamanioFilaAspecto = 30;  
        var saltarFila = false;
        var filaVacia = false;
        var contador = 1;
        var contadorColumnas = 1;
        var contadorEtapa = -1;
        var contadorFila = -1;

        var FilaResPorc = 0;
        var bloquePorcentajesContador = 0;
        var contadorParaClases = 0;
        var contadorArreglo = 0;
        var arregloCopia;

        var totalPonderacion = 0;
        var totalPuntosEnJuego = 0;
        var totalPuntosObtenidos = 0;
        var sumaTd = 0;
        var datoEnviar = 0;

        var etapas = new Array();
        var promedios = new Array();

        var condicion = false;
        var condicion1 = false;
        var variableCondi = true;

        var numero = document.getElementById("txCajas");

        var nombreClasePorcen = "";
        var nombreClasePonde = "";
        var nombreClasePuntosJuego = "";
        var nombreClasePuntosObtenidos = "";

        var contadorAspectos = 0;

        var contadorPromedio = 0;
        var folioMatriz = 0;
        var establecimientoMatriz = "";

        var establecimiento = "";
        var aplicador = "";
        
        
        window.onload = function () {
            agregarEvento(colorTabla[0]);
            agregarEvento(colorTabla[1]);
            agregarEvento(colorTabla[2]);

            crearTablaAux();
            mostrarVentana(ventana[2]);            
        }

        function agregarEvento(elemento) {            

            elemento.addEventListener("click", function (e) {

                if (e == null) {
                    alert('e==null');
                    index = e.target.parentNode.rowIndex;
                    td[index].style.backgroundColor = "red";
                } else {                    
                    index = e.target.parentNode.cellIndex;
                    var elementoTd=tablaNumerostBody.getElementsByTagName("tr");
                    agregarColor(index,elementoTd);
                }

            }, false);

        }

        function agregarColor(valor, elemento) {            

            if (valor == 0) {
                elemento[indexFila].children[indexColumna].setAttribute("class","verde");
                elemento[indexFila].children[indexColumna].style.background = "green";
            }

            else if (valor == 1) {
                elemento[indexFila].children[indexColumna].setAttribute("class", "rojo");
                elemento[indexFila].children[indexColumna].style.background = "red";
                
            }

            else if (valor == 2) {
                elemento[indexFila].children[indexColumna].setAttribute("class", "amarillo");
                elemento[indexFila].children[indexColumna].style.background = "yellow";
                mostrarVentanaDescripcion();
            }

            cerrarVentana(ventana[1]);
            agregarPorcentaje(elemento);
            ponderacion(elemento);
            puntosEnJuego(elemento);
            puntosObtenidos();

            porcentajeTotal();
            puntoEnJuegoTotal();
            puntosObtenidosTotal();

            promedioTotal();
        }

        function agregarAspecto() {            
            if (!(tBodysGeneral[0].children[0])) {                
                saltarFila = true;
                agregarFila(tamanioFilaAspecto);                
            } else {
                filaVacia = true;
                saltarFila = false;
                agregarFila(24);                

                porcentajeTotal();
                puntoEnJuegoTotal();
                puntosObtenidosTotal();

                FilaResPorc++;

                saltarFila = true;
                filaVacia = false;
                agregarFila(tamanioFilaAspecto);
            }
            bloquePorcentajesContador++;
        }

        function agregarPorcentaje(elemento) {            

            var rojos = elemento[indexFila].querySelectorAll(".rojo");
            var amarillos = elemento[indexFila].querySelectorAll(".amarillo");
            var verdes = elemento[indexFila].querySelectorAll(".verde");

            if (rojos.length == 0 && amarillos.length == 0 && verdes.length == 0) {                
                return;
            }

            var cantidadColores = rojos.length + amarillos.length + verdes.length;            

            if (amarillos.length > 0) {
                
                if ((rojos.length + verdes.length) == 0) {                    
                    return;                    
                } else {
                    cantidadColores = (rojos.length + verdes.length);
                }
                
            }                                   
            
            var texto = Math.round((verdes.length / cantidadColores) * 100) + "%";            
            var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
            tr[indexFila + 1].children[0].style.padding = "0px";
            tr[indexFila + 1].children[0].textContent = texto;            
        }

        function porcentajeTotal() {

            var elemento = tablaNumerostBody.getElementsByTagName("tr");

            var rojos = elemento[indexFila].querySelectorAll(".rojo");
            var amarillos = elemento[indexFila].querySelectorAll(".amarillo");
            var verdes = elemento[indexFila].querySelectorAll(".verde");
            
            var porcentajes = document.getElementsByClassName(nombreClasePorcen);            
            var suma = 0;
            var contador = 0;
            
            for (var i = 0; i < porcentajes.length-1; i++) {
                var cadena = porcentajes[i].textContent;
                contador++;                
                if (cadena == "") {                    
                    contador--;
                    continue;
                } else {
                    
                }
                var cadenaCortada = cadena.replace("%", "");                

                var numero = parseFloat(cadenaCortada);                
                if (isNaN(numero)) {
                    contador--;
                    continue;                    
                }
                suma += numero;
            }            

            if (suma > 0) {                
                porcentajes[porcentajes.length - 1].style.padding = "0px";

                if ((suma / contador) % 1 == 0) {
                    porcentajes[porcentajes.length - 1].textContent = (suma / contador) + " %";
                } else {
                    porcentajes[porcentajes.length - 1].textContent = (suma / contador).toFixed(1) + " %";
                }
                
            }
            else if(rojos.length>0 && (verdes.length<1 || amarillos<1)){
                porcentajes[porcentajes.length - 1].textContent = 0+ "%";
            }

        }

        function ponderacionTotal() {
            
        }

        function puntoEnJuegoTotal() {

            var elemento = tablaNumerostBody.getElementsByTagName("tr");

            var rojos = elemento[indexFila].querySelectorAll(".rojo");
            var amarillos = elemento[indexFila].querySelectorAll(".amarillo");
            var verdes = elemento[indexFila].querySelectorAll(".verde");

            var puntos = document.getElementsByClassName(nombreClasePuntosJuego);
            
            
            var suma = 0;

            for (var i = 0; i < puntos.length - 1; i++) {
                var cadena = puntos[i].textContent;
                contador++;
                if (cadena == "") {
                    
                    contador--;
                    continue;
                } else {
                 
                }             

                var numero = parseInt(cadena);

                if (isNaN(numero)) {
                    contador--;
                    continue;
                }
                suma += numero;
            }            

            if (suma != 0) {
                puntos[puntos.length - 1].textContent = suma +"";
            }
            else if (rojos.length > 0 && (verdes.length < 1 || amarillos < 1)) {
                puntos[puntos.length - 1].textContent = 0;
            }

        }

        function puntosObtenidosTotal() {

            var elemento = tablaNumerostBody.getElementsByTagName("tr");

            var rojos = elemento[indexFila].querySelectorAll(".rojo");
            var amarillos = elemento[indexFila].querySelectorAll(".amarillo");
            var verdes = elemento[indexFila].querySelectorAll(".verde");

            var puntos = document.getElementsByClassName(nombreClasePuntosObtenidos);

            //console.log(puntos);

            var suma = 0;

            for (var i = 0; i < puntos.length - 1; i++) {
                var cadena = puntos[i].textContent;
                contador++;
                if (cadena == "") {
                    
                    contador--;
                    continue;
                } else {
                    
                }                

                var numero = parseInt(cadena);

                if (isNaN(numero)) {
                    contador--;
                    continue;
                }
                suma += numero;
            }            

            if (suma != 0) {
                puntos[puntos.length - 1].textContent = suma + "";
            }
            else if (rojos.length > 0 && (verdes.length < 1 || amarillos < 1)) {
                puntos[puntos.length - 1].textContent = 0;
            }
            
        }


        function promedioTotal() {

            var suma = 0;
            var contador = 0;
            var inicio = 0;
            var fin = 0;

            var tbodys = document.querySelectorAll(".tBodys");                        

            for (var i = 0; i < contadorPromedio; i++) {
                var td = tbodys[i].querySelectorAll(".aspecto");                
                inicio += td.length;
            }

            for (var i = 0; i <= contadorPromedio; i++) {
                var td = tbodys[i].querySelectorAll(".aspecto");
                fin += td.length;                
            }            

            for (var i = (inicio+1); i <= fin/*contadorAspectos*/; i++) {

                var porcentajes = document.getElementsByClassName("porcentaje" + i);
                var cadena = porcentajes[porcentajes.length - 1].textContent;  
                contador++;

                if (cadena == "") {                    
                    contador--;
                    continue;
                }
                        
                var cadenaCortada = cadena.replace("%", "");                
                var numero = parseFloat(cadenaCortada);

                if (isNaN(numero)) {
                    contador--;
                    continue;
                }
                suma += numero;

                if (suma != 0) {                    
                    
                    tabla5.children[contadorPromedio].children[0].textContent = (suma / contador).toFixed(2) + "%";
                }                

            }

        }

        function etapaPertenece(fila) {
            var tbodys = document.querySelectorAll(".tBodys");
            var numeroFilas = 0;
            
            for (var i = 0; i < tbodys.length; i++) {
                numeroFilas += tbodys[i].childElementCount;
                

                if (numeroFilas > fila) {
                    
                    contadorPromedio = i;
                    break;
                }                
            }

        }

        function ponderacion(elemento) {
            var verdes = elemento[indexFila].querySelectorAll(".verde");
            totalPonderacion = verdes.length;
            //alert('ponderacion:' + totalPonderacion);
            var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
            tr[indexFila + 1].children[1].textContent = totalPonderacion+"";
        }

        function puntosEnJuego(elemento) {
            var rojos = elemento[indexFila].querySelectorAll(".rojo");
            var amarillos = elemento[indexFila].querySelectorAll(".amarillo");

            if (rojos.length <= 0 && amarillos.length <= 0) {
                
                var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
                tr[indexFila + 1].children[2].textContent = totalPonderacion + "";
            } else {
                
                totalPuntosEnJuego = (rojos.length + amarillos.length+totalPonderacion) * totalPonderacion;
                var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
                tr[indexFila + 1].children[2].textContent = totalPuntosEnJuego + "";
            }            
                        
        }

        function puntosObtenidos() {
            var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
            tr[indexFila + 1].children[3].textContent = (totalPonderacion*totalPonderacion)+"" ;
        }

        function agregarEventos(elemento) {

            var td = elemento.getElementsByTagName("td");        

            for (var i = 0; i < td.length; i++) {                
                
                td[i].addEventListener("click", function (e) {                                                                

                    if (e == null) {
                        alert('e==null');
                        indexColumna = e.target.parentNode.rowIndex;
                        td[indexColumna].style.backgroundColor = "red";
                         
                    } else {
                                                
                        indexColumna = e.target.cellIndex;                                               
                        indexFila = e.target.parentNode.rowIndex - 1;

                        etapaPertenece(indexFila);

                        var elementoTd = tablaNumerostBody.getElementsByTagName("tr");

                        var tab4 = tabla4.getElementsByTagName("tr");
                        //console.log(tab4);

                        nombreClasePorcen = tab4[indexFila].children[0].className;
                        nombreClasePonde = tab4[indexFila].children[1].className;
                        nombreClasePuntosJuego = tab4[indexFila].children[2].className;
                        nombreClasePuntosObtenidos = tab4[indexFila].children[3].className;
                                                                        

                        if (indexFila > 2 && (elementoTd[indexFila].children[0].style.background != "red"
                            && elementoTd[indexFila].children[0].style.background != "yellow"
                            && elementoTd[indexFila].children[0].style.background != "green")) {                            
                            contadorColumnas = 1;
                        }

                        if (indexFila > 2 && (elementoTd[indexFila].children[0].style.background == "red"
                            || elementoTd[indexFila].children[0].style.background == "yellow"
                            || elementoTd[indexFila].children[0].style.background == "green")) {
                            var rojos = elementoTd[indexFila].querySelectorAll(".rojo");
                            var amarillos = elementoTd[indexFila].querySelectorAll(".amarillo");
                            var verdes = elementoTd[indexFila].querySelectorAll(".verde");
                            contadorColumnas = (rojos.length + amarillos.length + verdes.length) + 1;
                        }


                        if (elementoTd[indexFila].children[indexColumna].style.background == "red"
                            || elementoTd[indexFila].children[indexColumna].style.background == "yellow"
                            || elementoTd[indexFila].children[indexColumna].style.background == "green") {

                            var rojos = elementoTd[indexFila].querySelectorAll(".rojo");
                            var amarillos = elementoTd[indexFila].querySelectorAll(".amarillo");
                            var verdes = elementoTd[indexFila].querySelectorAll(".verde");
                            
                            contadorColumnas = (rojos.length + amarillos.length + verdes.length) + 1;
                            
                            contadorColumnas--;
                            
                           
                            if (contadorColumnas - 1 == indexColumna) {                                

                                celdaBlanca(elementoTd);
                                
                                if (indexColumna == 0) {                                    
                                    var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
                                                                      
                                    limpiarCampo(tr);

                                }                                
                                
                            } else {                                                                
                                contadorColumnas++;
                            }                            
                        }
                        else {                            
                            if (indexColumna < contadorColumnas) {                                
                                contadorColumnas++;
                                mostrarVentana(ventana[1]);                                
                            } 
                            
                        }                        
                    }
                                        
                }, false);
            }

        }

        function celdaBlanca(elemento) {
            elemento[indexFila].children[indexColumna].setAttribute("class", "blanco");
            elemento[indexFila].children[indexColumna].style.background = "white";

            var elementoTd = tablaNumerostBody.getElementsByTagName("tr");
            agregarPorcentaje(elementoTd);
            ponderacion(elementoTd);
            puntosEnJuego(elementoTd);
            puntosObtenidos();
            porcentajeTotal();
            promedioTotal();

            puntoEnJuegoTotal();
            puntosObtenidosTotal();

        }

        function limpiarCampo(elemento) {

            elemento[indexFila + 1].children[0].textContent = " ";
            elemento[indexFila + 1].children[1].textContent = " ";
            elemento[indexFila + 1].children[2].textContent = " ";
            elemento[indexFila + 1].children[3].textContent = " ";                     

            limpiarResultado();
            limpiarPromedio();
            limpiarPuntosJuego();
            limpiarPuntosObtenidos();

        }
        
        function limpiarResultado() {
            var porcentajes = document.getElementsByClassName(nombreClasePorcen);

            porcentajes[porcentajes.length - 1].textContent = "";
            porcentajeTotal();
        }

        function limpiarPromedio() {
            tabla5.children[contadorPromedio].children[0].textContent = "";
            promedioTotal();
        }

        function limpiarPuntosJuego() {
            var porcentajes = document.getElementsByClassName(nombreClasePuntosJuego);

            porcentajes[porcentajes.length - 1].textContent = "";
            porcentajeTotal();
        }

        function limpiarPuntosObtenidos() {
            var porcentajes = document.getElementsByClassName(nombreClasePuntosObtenidos);

            porcentajes[porcentajes.length - 1].textContent = "";
            porcentajeTotal();
        }



        function cerrarVentanaColor() {
            cerrarVentana(ventana[1]);
            contadorColumnas--;
        }

        function mostrarVentanaDescripcion() {
            
            mostrarVentana(ventana[2]);
        }

        function cerrarVentanaObservacion() {
            cerrarVentana(ventana[2]);
        }

        function mostrarVentana(ventana) {
                       
            ventana.style.display = "block";
        }

        function cerrarVentana(ventana) {
            ventana.style.display = "none";
        }

        function crearTablaAux() {
            var tablaAux = document.getElementsByClassName('order-table table');
            var tbody2 = tablaAux[0].getElementsByTagName("tbody")[0];
            /*var valorAEnviar = "Super i";
            
            var actionData = "{'dato':'" + valorAEnviar + "'}";    */                    

            if (!tbody2) {
                $.ajax({
                    type: "POST",
                    url: "servicioMatrices.asmx/matrizDisponibles",
                    //contentType: 'application/json; utf-8',
                    //data:actionData,
                    dataType: "json",
                    success: function (data) {
                        
                        console.log(data);                        
                          
                        tbody = document.createElement("tbody");
                        for (var i = 0; i < data.length; i++) {
                            var tr = document.createElement("tr");

                            var td0 = document.createElement("td");
                            td0.appendChild(document.createTextNode(data[i].IdMatrizNueva));

                            var td1 = document.createElement("td");
                            td1.appendChild(document.createTextNode(data[i].FolioMatriz));

                            var td2 = document.createElement("td");
                            td2.appendChild(document.createTextNode(data[i].Establecimiento));

                            var td3 = document.createElement("td");
                            td3.appendChild(document.createTextNode(data[i].Descripcion));

                            var td4 = document.createElement("td");
                            td4.appendChild(document.createTextNode(data[i].Aplicador));


                            tr.appendChild(td0);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);

                            tbody.appendChild(tr);
                        }
                        tablaAux[0].appendChild(tbody);
                    },
                    complete: function () {                        
                        agregaEvTablaAux();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status + ' ' + thrownError);
                    }
                });
            } else {
                borrarTablaAux(tablaAux[0]);
                crearTablaAux();
            }
            
        }

        function agregaEvTablaAux() {
            var tablaAux = document.getElementsByClassName('order-table table');
            var tabla = document.getElementById("tabla");
            var elementoTr = tablaAux[0].getElementsByTagName("tr");

            for (var i = 0; i < elementoTr.length; i++) {
                elementoTr[i].addEventListener("click", function (e) {
                    index = e.target.parentNode.rowIndex;
                    rowSeleccionada = index;
                    elementoTr[index].style.background = "red";
                    cerrarVentana(ventana[2]);
                    datoEnviar = elementoTr[index].firstChild.textContent;
                    
                    establecimientoMatriz = elementoTr[index].children[1].textContent;                    

                    crearTitulo();

                    crearTabla();
                    mostrarVentana(tablaModal);
                }, true);
            }
        }

        function crearTitulo() {            

            for (var i = 1; i <= 50; i++) {
                var td = document.createElement("td");
                //td.textContent = i;
                td.innerHTML = "&nbsp"+i + "A&nbsp"
                tablaNumerosthead.children[0].appendChild(td);
            }
        }

        function crearTabla() {            
            
            var actionData = "{'valorAEnviar':'" + datoEnviar + "'}";
            
            
            folioMatriz = datoEnviar;
            
            
                $.ajax({
                    type: "POST",
                    url: "servicioMatrices.asmx/obtenerMatrizGuardada",
                    contentType: 'application/json; utf-8',
                    data:actionData,
                    dataType: "json",
                    success: function (data) {
                        
                        var arreglo = JSON.parse(data.d);
                        arregloCopia = arreglo;

                        console.log(arregloCopia);
                        var cadenaEtapa = "";
                        var cadenaAspecto = "";
                        var tablaMeto = document.getElementById("tabPart2");                        
                        var cuentame = 0;

                        aplicador = arreglo[0].Aplicador;
                        establecimiento = arreglo[0].Establecimiento;

                        for (var i = 0; i < arreglo.length; i++) {                            
                            if (arreglo[i].Etapa != cadenaEtapa) {

                                var tbody = document.createElement("tbody");                                
                                tbody.setAttribute("class", "tBodys");                                
                                tablaMeto.appendChild(tbody);      

                                condicion1 = true;
                                filaSinNadaTab2(20, tablaMeto.lastChild);
                                filasVacias(20,-1);
                                condicion1 = false;

                                contadorAspectos++;
                                crearFilaAspecto(arreglo[i].Aspecto, tablaMeto.lastChild);
                                
                                condicion = true;
                                crearFilaUnidad(arreglo[i].Unidad, tablaMeto.lastChild,arreglo);
                                condicion = false;
                                
                                cadenaEtapa = arreglo[i].Etapa;
                                promedios.push(arreglo[i].Promedio);
                                etapas.push(cadenaEtapa);
                                cadenaAspecto = arreglo[i].Aspecto;

                            }
                            else {
                                if (arreglo[i].Aspecto != cadenaAspecto) {
                                    condicion1 = true;
                                    contadorAspectos++;
                                    filaSinNadaTab2(20, tablaMeto.lastChild);
                                    filasVacias(20,-1);
                                    condicion1 = false;

                                    crearFilaAspecto(arreglo[i].Aspecto, tablaMeto.lastChild);
                                    cadenaAspecto = arreglo[i].Aspecto;
                                }
                                condicion = true;
                                crearFilaUnidad(arreglo[i].Unidad, tablaMeto.lastChild,arreglo);
                                condicion = false;
                            }
                        }
                    },
                    complete: function () {
                        var tbodys = document.querySelectorAll(".tBodys");                        
                        var tabPart2 = document.getElementById("tabPart2");


                        for(var i=0;i<tbodys.length;i++){
                            crearFilaEtapaAndPromedio(tbodys[i].offsetHeight + 21);

                            if (i == (tbodys.length - 1) && tbodys.length>1) {                                                             
                                tabla1.lastChild.style.height = (tabla1.lastChild.offsetHeight - 22) + "px";
                                tabla5.lastChild.style.height = (tabla1.lastChild.offsetHeight) + "px";
                            }
                        }                        
                        condicion1 = true;
                        filaSinNadaTab2(20, tabPart2.lastChild);
                        filasVacias(20,-1);
                        condicion1 = false;
                        llenarPromedios();
                        llenarApEst();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status + ' ' + thrownError);
                    }
                });              
        }

        function llenarApEst() {
            var tabla = document.getElementById("tablaCabecera");
            var tr = tabla.getElementsByTagName("tr");
            tr[0].children[1].textContent = establecimiento;
            tr[1].children[1].textContent = aplicador;
        }

        function llenarPromedios() {
            var valor = document.getElementsByClassName("promedioGen");
            
            for (var i = 0; i < valor.length; i++) {                
                valor[i].children[0].textContent= promedios[i]+"%";
            }
        }

        function crearFilaEtapaAndPromedio(tamanio) {

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var cadena = etapas[contadorArreglo++];
            var cadenaCortada = "";            

            for (var i = 0; i < cadena.length; i++) {
                
                if ((i % 7) == 0) {

                    cadenaCortada += cadena.substr(i, 7);                    
                    cadenaCortada+="<br/>"                                   
                }
            }            
            
            td2.innerHTML = cadenaCortada;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.style.height = tamanio + "px";
            tr.setAttribute("class", "etapa");

            tabla1.appendChild(tr);

            var tr1 = document.createElement("tr");
            var td3 = document.createElement("td");                        

            tr1.appendChild(td3);            
            tr1.style.height = tamanio + "px";
            tr1.setAttribute("class", "promedioGen");

            tabla5.appendChild(tr1);
        }
           

        function crearFilaAspecto(data, ultimoTbody) {

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");            
            var td2 = document.createElement("td");

            td1.textContent=  contadorAspectos;
            //td1.textContent = 1000;

            var cadena = data;
            var cadenaCortada = "";
            var ultimaPosicion = 0;

            for (var i = 0; i < cadena.length; i++) {
                
                if ((i % 26) == 0) {

                    cadenaCortada += cadena.substr(i, 26);                    
                    cadenaCortada += "<br/>"                    
                }
            }

            td2.innerHTML= cadenaCortada;
            
            td2.style.background = "#484848";
            td2.style.color = "white";
            td2 .setAttribute("class","aspecto");
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            ultimoTbody.appendChild(tr);

            var tamanio = td2.offsetHeight;
            

            filasVacias(tamanio,-1);
        }

        function crearFilaUnidad(data,ultimoTbody,arreglo) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");            
            var td2 = document.createElement("td");
            td2.setAttribute("class", "unidadAspecto" + contadorParaClases);
            td2.textContent = data;

            tr.appendChild(td1);
            tr.appendChild(td2);
            ultimoTbody.appendChild(tr);

            var tamanio = td2.offsetHeight;
            contadorFila++;
            filasVacias(tamanio,arreglo);
        }

        function filasVacias(tamanio,arreglo) {
            filaVaciaTab3(tamanio,arreglo);
            filaVaciaTab4(tamanio,arreglo);
            //filaVaciaTab5(tamanio);
        }

        function filaSinNadaTab2(tamanio,ultimoTbody) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            td2.setAttribute("class", "unidadAspecto" + contadorParaClases);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.style.height = tamanio + "px";

            ultimoTbody.appendChild(tr);
        }

        function filaVaciaTab4(tamanio,arreglo) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");

            if (condicion) { //porcentaje de fila
                td1.setAttribute("class", "porcentaje" + contadorParaClases);
                td2.setAttribute("class", "ponderacion" + contadorParaClases);
                td3.setAttribute("class", "puntoEnJuego" + contadorParaClases);
                td4.setAttribute("class", "puntosObtenidos" + contadorParaClases);
                if (arreglo != -1) {
                    if ((arreglo[contadorFila]["Porcentaje"] + "%") == "-1%") {
                        alert("es -1%");
                        td1.textContent = "";
                    } else {
                        td1.textContent = arreglo[contadorFila]["Porcentaje"] + "%";
                    }
                    
                    if ((td2.textContent = arreglo[contadorFila]["Ponderacion"])=="-1") {
                        td2.textContent = "";
                    } else {
                        td2.textContent = arreglo[contadorFila]["Ponderacion"];
                    }

                    if ((td3.textContent = arreglo[contadorFila]["PuntosEnJuego"])=="-1") {
                        td3.textContent = "";
                    } else {
                        td3.textContent = arreglo[contadorFila]["PuntosEnJuego"];
                    }

                    if ((td4.textContent = arreglo[contadorFila]["PuntosObtenidos"]) == "-1") {
                        td4.textContent = "";
                    } else {
                        td4.textContent = arreglo[contadorFila]["PuntosObtenidos"];
                    }                    
                }
                
                
            }

            if (condicion1) {//porcentaje columna
                td1.setAttribute("class", "porcentaje" + contadorParaClases);
                td2.setAttribute("class", "ponderacion" + contadorParaClases);
                td3.setAttribute("class", "puntoEnJuego" + contadorParaClases);
                td4.setAttribute("class", "puntosObtenidos" + contadorParaClases);
                if (contadorFila!= -1) {                                        
                    td1.textContent = arregloCopia[contadorFila]["PorcentajeTotal"] + "%";
                    td3.textContent = arregloCopia[contadorFila]["PuntoJuegoTotal"];
                    td4.textContent = arregloCopia[contadorFila]["PuntosObtenidosTotal"];
                }
                
                contadorParaClases++;

                /*td1.style.background = "red";
                td2.style.background = "red";
                td3.style.background = "red";
                td4.style.background = "red ";*/

            }

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tr.style.height = tamanio + "px";

            tabla4.appendChild(tr);
        }

        function filaVaciaTab5(tamanio) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");            

            tr.appendChild(td1);            

            tr.style.height = tamanio + "px";

            tabla5.appendChild(tr);
        }

        function filaVaciaTab3(tamanio,arregloColores) {
            var tablaNum = document.getElementById("tablaNumeros");
            var tds = tablaNum.children[0].getElementsByTagName("td");

            var tr = document.createElement("tr");
            var array = [];            
            for (var i = 0; i < 50; i++) {                
                if (arregloColores != -1) {

                    var contenido = arregloColores[contadorFila]["A" + (i + 1)];                    
                    var td1 = document.createElement("td");
                    if (contenido==1) {
                        td1.style.background = "green";
                    }
                    else if (contenido==0) {
                        td1.style.background = "red";
                    }
                    else if (contenido == 3) {
                        td1.style.background = "yellow";
                    }
                    tr.appendChild(td1);

                } else {

                    var td1 = document.createElement("td");
                    tr.appendChild(td1);
                }
                                
            }                                                
            tr.style.height = tamanio + "px";

            if(condicion){
                agregarEventos(tr);
            }


            tabla3.appendChild(tr);
        }

        
    </script>

     <script type="text/javascript">
        (function(document) {
          'use strict';

          var LightTableFilter = (function(Arr) {

            var _input;

            function _onInputEvent(e) {
              _input = e.target;
              var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
              Arr.forEach.call(tables, function(table) {
                Arr.forEach.call(table.tBodies, function(tbody) {
                  Arr.forEach.call(tbody.rows, _filter);
                });
              });
            }

            function _filter(row) {
              var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
              row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
            }

            return {
              init: function() {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function(input) {
                  input.oninput = _onInputEvent;
                });
              }
            };
          })(Array.prototype);

          document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
              LightTableFilter.init();
            }
          });

        })(document);
    </script>

</asp:Content>
