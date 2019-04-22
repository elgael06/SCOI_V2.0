<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="MatrizRealizada.aspx.vb" Inherits="seguimiento.MatrizRealizada" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

     <script>
        $(document).ready(function () {                                    
            $('#<%=cbAplicador.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe.";
                    }
                }
            });

            $('#<%=cbEstablecimiento.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe.";
                    }
                }
            });

           /* $(this).bind("contextmenu", function (e) {
                e.preventDefault();
            });*/

        });
    </script>

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
            box-shadow:4px 4px 10px #888888;         
        }
        #tablaCabecera tr{
            padding:0px;
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
            height:57px;
        }
        #divCajas{            
            height:20px;
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
             padding-left:60px;             
             padding-top:30px;             
             background-color:#fff;
             color:#666;    
             position:absolute;
             margin-left:-159px;
             margin-top:-210px;    
             box-shadow:4px 4px 10px #888888;         
         }

        #tablaAux{
             width:400px;
             height:320px;
             overflow:scroll;
             border:1px solid #BDBDBD;
             box-shadow:4px 4px 10px #888888;
         }
        #txCajas{
            margin-right:17%;
            width:40%;
        }
        .form select{
            width:200px;
        }
        #form select{            
            width:300px;
            height:26px;            
            margin-left:-5px;            
            box-shadow:4px 4px 12px #888888;  
        }
        #form #h1{            
            margin-left:30px;
        }
        #form input{            
            box-shadow:4px 5px 12px #888888;  
        }
        #filtro{
            margin-bottom:12px;
            width:380px;
        }
        #tdTienda{                        
            background-color:rgb(72,72,72);
            color:white;
        }
        #tdAplicador{
            background-color:rgb(72,72,72);
            color:white;
        }        
        #txAplicador{            
            width:300px;            
        }
        #txEstablecimiento{
            width:300px;            
        }

        #txObservacion{
                width:80%;
                height:70px;                
        }
        .promedioGen{
           color:black;
        }

        
        @media screen And (max-width:1024px) {/* para pantallas con un maximo de  ->'1024'<-  pixeles*/
            #cuerpo{
                overflow:auto;
                width:100%;
                height:100vh;     
                /*background-color:blue;                  */
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
                box-shadow:4px 4px 10px #888888;         
            }
            #tablaCabecera tr{
                padding:0px;
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
                width:32%;
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
                height:58px;
            }
            #divCajas{
                height:27px;
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
                 padding-left:60px;             
                 padding-top:30px;             
                 background-color:#fff;
                 color:#666;    
                 position:absolute;
                 margin-left:-159px;
                 margin-top:-210px;    
                 box-shadow:4px 4px 10px #888888;         
             }

            #tablaAux{
                 width:400px;
                 height:320px;
                 overflow:scroll;
                 border:1px solid #BDBDBD;
                 box-shadow:4px 4px 10px #888888;
             }
            #txCajas{
                margin-right:17%;
                width:40%;
            }
            .form select{
                width:200px;
            }
            #form select{            
                width:300px;
                height:26px;            
                margin-left:-5px;            
                box-shadow:4px 4px 12px #888888;  
            }
            #form #h1{            
                margin-left:30px;
            }
            #form input{            
                box-shadow:4px 5px 12px #888888;  
            }
            #filtro{
                margin-bottom:12px;
                width:380px;
            }
            #tdTienda{                        
                background-color:rgb(72,72,72);
                color:white;
            }
            #tdAplicador{
                background-color:rgb(72,72,72);
                color:white;
            }        
            #txAplicador{            
                width:300px;            
            }
            #txEstablecimiento{
                width:300px;            
            }

            #txObservacion{
                width:60%;
                height:60px;
                background-color:blueviolet;
            }
        }

        @media screen And (max-width:768px) {/* para pantallas con un maximo de  ->'768'<-  pixeles*/
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
                margin-top:-9%;
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
                box-shadow:4px 4px 10px #888888;         
            }
            #tablaCabecera tr{
                padding:0px;
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
                 padding-left:60px;             
                 padding-top:30px;             
                 background-color:#fff;
                 color:#666;    
                 position:absolute;
                 margin-left:-33%;
                 margin-top:-32%;    
                 box-shadow:4px 4px 10px #888888;         
             }

            #tablaAux{
                 width:400px;
                 height:320px;
                 overflow:scroll;
                 border:1px solid #BDBDBD;
                 box-shadow:4px 4px 10px #888888;
             }
            #txCajas{
                margin-right:17%;
                width:40%;
            }
            .form select{
                width:200px;
            }
            #form select{            
                width:300px;
                height:26px;            
                margin-left:-5px;            
                box-shadow:4px 4px 12px #888888;  
            }
            #form #h1{            
                margin-left:30px;
            }
            #form input{            
                box-shadow:4px 5px 12px #888888;  
            }
            #filtro{
                margin-bottom:12px;
                width:380px;
            }
            #tdTienda{                        
                background-color:rgb(72,72,72);
                color:white;
            }
            #tdAplicador{
                background-color:rgb(72,72,72);
                color:white;
            }        
            #txAplicador{            
                width:300px;            
            }
            #txEstablecimiento{
                width:300px;            
            }
            #btSiguiente{                
                height:35px;
                width:80px;
            }
        }

    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <select id="selectt" style="display:none" runat="server">
        
    </select>

       <div id="cuerpo">        
        <div class="ventanaModal">
            <div id="form">
                <br />
                <br />
                <h1>Aplicador</h1>                    
                <select id="cbAplicador" runat="server" ></select>                
                <br />
                <br />
               <h1>Establecimiento</h1>                                 
                <select id="cbEstablecimiento" runat="server">                    
                </select>
                <br />
                <br />
                <h1>Cantidad de Muestra</h1>                 
                <input type="number" min="1" max="50"  value="5" id="txCajas" />
                <input type="button" id="btSiguiente" value="siguiente" onclick="evSiguiente();"/>
            </div>
          </div>

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
                    <input type="text" id="txObservacion" >
                </div>
                

                <div id="divBtns">
                    <input type="button" id="btAceptarObservacion" value="Aceptar" onclick="insertarObservacion();"/>
                </div>                                
            </div>
           </div>

          <div class="ventanaModal" >                            
            <div id="form">
                <div id="cerrar"></div>
            <h1 id="h1">Matrices Realizadas</h1>                    
                
                <input id="filtro" type="text" class="light-table-filter" data-table="order-table" placeholder="buscar" />
                <div id="tablaAux">                    
                    <table class="order-table table">
				    <thead class="titulo">
				    <tr > 
					    <td>
						    Folio
					    </td>
					    <td >
						    Establecimiento
					    </td>
					    <td>
						    Descripcion
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
                            <td><div id="tdTienda">Tienda</div></td><td>Super 2</td>
                        </tr>
                        <tr>
                            <td><div id="tdAplicador">Aplicador</div></td><td>Hilario Gomez</td>
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
                        </tbody>
                </table>
               </div>

                <div id="tablaParte3">
                    <table id="tabPart3">
                        <thead id="titulo">
                            <tr><td><div id="divCajas">Muestras</div></td></tr>
                        </thead>
                        
                    </table>

                    <div id="tablaPartNumeros">
                    <table id="tablaNumeros">
                        <thead class="titulo">
                            <tr>
                                                   
                            </tr>
                        </thead> 
                        <tbody>                           
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
                        </tbody>    
                    </table>
                </div>

                <div id="tablaParte5">
                    <table id="tabPart5">
                        <thead class="tabCabeceras titulo">
                            <tr><td><div class="tabCabeceras">Promedio</div></td></tr>
                        </thead>
                        <tbody>                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                     
    </div>
    
    <div >
        <input id="btnGuardar" type="button" value="Guardar Matriz"  style="visibility:hidden" onclick="guardarTablaMatriz();"/>
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
        var indice=-1;

        var tamanioFilaAspecto = 30;  
        var saltarFila = false;
        var filaVacia = false;
        var contador = 1;
        var contadorColumnas = 1;
        var contadorEtapa = -1;

        var FilaResPorc = 0;
        var bloquePorcentajesContador = 0;
        var contadorParaClases = 0;
        var contadorArreglo = 0;

        var totalPonderacion = 0;
        var totalPuntosEnJuego = 0;
        var totalPuntosObtenidos = 0;
        var sumaTd = 0;
        var datoEnviar = 0;

        var etapas = new Array();
        var ponderaciones = new Array();

        var condicion = false;
        var condicion1 = false;
        var variableCondi = false;

        var numero = document.getElementById("txCajas");

        var nombreClasePorcen = "";
        var nombreClasePonde = "";
        var nombreClasePuntosJuego = "";
        var nombreClasePuntosObtenidos = "";

        var contadorAspectos = 0;

        var contadorPromedio = 0;
        var folioMatriz = 0;
        var establecimientoMatriz = "";
        var ultimoIdMatriz = 0;
        var establecimiento = "";
        var aplicador = "";
        var observacionesEnPila = new Array();
        
        
        window.onload = function () {
            agregarEvento(colorTabla[0]);
            agregarEvento(colorTabla[1]);
            agregarEvento(colorTabla[2]);
            mostrarVentana(ventana[0]);            
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
                variableCondi = false;
            }
            else if (valor == 1) {
                elemento[indexFila].children[indexColumna].setAttribute("class", "rojo");
                elemento[indexFila].children[indexColumna].style.background = "red";
                mostrarVentanaDescripcion();
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
            /*else if(rojos.length>0 && (verdes.length<1 || amarillos<1)){
                porcentajes[porcentajes.length - 1].textContent = 0 + "%";                
            }*/
            else if (rojos.length > 0 && (verdes.length < 1 || amarillos < 1)) {
                porcentajes[porcentajes.length - 1].textContent = 0 + "%";
                // alert("primer else if");
            }
            else if (suma == 0) {
                //alert("la suma es cero");
                //limpiarResultados();
                porcentajes[porcentajes.length - 1].textContent = 0 + "%";
            }

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
                }

                var numero = parseInt(cadena);

                if (isNaN(numero)) {
                    contador--;
                    continue;
                }
                suma += numero;
            }

           //alert("suma:" + suma);
            if (suma != 0) {
             //   alert("entre a la suma");
                puntos[puntos.length - 1].textContent = suma + "";
                return;
            }
            else if (rojos.length > 0 && (verdes.length < 1 || amarillos < 1)) {                
                puntos[puntos.length - 1].textContent = 0;
               // alert("primer else if");
            }

            else if(suma==0){
                //alert("la suma es cero");
                limpiarResultados();
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
                }                

                var numero = parseInt(cadena);

                if (isNaN(numero)) {
                    contador--;
                    continue;
                }
                suma += numero;
            }            

            /*alert("suma:" + suma);
            alert("IndexColumna:" + indexColumna + " estatus:" + (indexColumna != 0));
            alert("Rojos long:"+rojos.length);*/

            if (suma != 0) {
                puntos[puntos.length - 1].textContent = suma + "";
            }           

            /*else if (suma == 0 && (rojos.length > 0 || amarillos.length > 0)) {
                alert("entre aqui");
                puntos[puntos.length - 1].textContent = 0;
                                
            } */
            else if (rojos.length > 0 && (verdes.length < 1 || amarillos < 1)) {
                puntos[puntos.length - 1].textContent = 0;
                //alert("primer else if");
            }            
            else if (suma == 0) {
               // alert("la suma es cero");
                //limpiarResultados();
                puntos[puntos.length - 1].textContent = 0
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

            for (var i = (inicio+1); i <= fin; i++) {

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
           
            var trs = document.getElementById("tablaNumeros").getElementsByTagName("tr");
           // console.log(trs[indexFila + 1].id);
            totalPonderacion = trs[indexFila + 1].id
            var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
            tr[indexFila + 1].children[1].textContent = totalPonderacion;            
        }

        function puntosEnJuego(elemento) {
            var rojos = elemento[indexFila].querySelectorAll(".rojo");
            var amarillos = elemento[indexFila].querySelectorAll(".amarillo");
            var verdes = elemento[indexFila].querySelectorAll(".verde");

            totalPuntosEnJuego = (rojos.length + amarillos.length + verdes.length) * totalPonderacion;            

            if (totalPuntosEnJuego != 0) {
                var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
                tr[indexFila + 1].children[2].textContent = totalPuntosEnJuego + "";

            }            
            else {
                var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
                //tr[indexFila + 1].children[2].textContent = "";
                limpiarCampo(tr);
            }
                        
        }

        function puntosObtenidos() {
            var elemento = tablaNumerostBody.getElementsByTagName("tr");
            var verdes = elemento[indexFila].querySelectorAll(".verde");
            var rojos = elemento[indexFila].querySelectorAll(".rojo");
            var amarillos = elemento[indexFila].querySelectorAll(".amarillo");

            var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
            var total = (verdes.length * totalPonderacion);
            //alert("total:" + total);

            if (total != 0) {
                tr[indexFila + 1].children[3].textContent = (verdes.length * totalPonderacion) + "";
            }
            else if (total == 0 && (amarillos.length>0||rojos.length>0)) {
                tr[indexFila + 1].children[3].textContent ="0";
            }
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
                                    /*var tr = document.getElementById("tabPart4").getElementsByTagName("tr");                              
                                    limpiarCampo(tr);*/

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

                td[i].addEventListener("mousedown", function (e) {
                    if (e == null) {
                        alert('e==null');
                        indexColumna = e.target.parentNode.rowIndex;
                        td[indexColumna].style.backgroundColor = "red";

                    } else {
                        if (event.button == 2) {                            
                            //alert("click derecho");
                            indexColumna = e.target.cellIndex;
                            indexFila = e.target.parentNode.rowIndex - 1;
                            var elementoTd = tablaNumerostBody.getElementsByTagName("tr");

                            var verdes = elementoTd[indexFila].querySelectorAll(".verde");
                            var rojos = elementoTd[indexFila].querySelectorAll(".rojo");
                            var amarillos = elementoTd[indexFila].querySelectorAll(".amarillo");

                            var ultimaColumna = (verdes.length + rojos.length + amarillos.length);

                            if (indexColumna < ultimaColumna) {
                                variableCondi = true;
                                mostrarVentana(ventana[1]);
                            }
                                                        
                            /*etapaPertenece(indexFila);

                            var elementoTd = tablaNumerostBody.getElementsByTagName("tr");

                            var tab4 = tabla4.getElementsByTagName("tr");

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
                                        /*var tr = document.getElementById("tabPart4").getElementsByTagName("tr");                              
                                        limpiarCampo(tr);*

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

                            }*/
                        }
                                                
                    }
                },false);
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

            puntosObtenidosTotal();
            puntoEnJuegoTotal();            

        }

        function limpiarCampo(elemento) {

            elemento[indexFila + 1].children[0].textContent = " ";
            elemento[indexFila + 1].children[1].textContent = " ";
            elemento[indexFila + 1].children[2].textContent = " ";
            elemento[indexFila + 1].children[3].textContent = " ";                     
            
        }

        function limpiarResultados() {

            limpiarResultado();
            limpiarPromedio();            
            limpiarPuntosObtenidos();
            limpiarPuntosJuego();
        }
        
        function limpiarResultado() {
            
            var porcentajes = document.getElementsByClassName(nombreClasePorcen);

            //console.log(porcentajes[porcentajes.length - 1].textContent);

            porcentajes[porcentajes.length - 1].textContent = "";

           // console.log(porcentajes[porcentajes.length - 1].textContent);
           // porcentajeTotal();
            //console.log(porcentajes[porcentajes.length - 1].textContent);
        }

        function limpiarPromedio() {
            tabla5.children[contadorPromedio].children[0].textContent = "";
            promedioTotal();
        }

        function limpiarPuntosJuego() {
            var porcentajes = document.getElementsByClassName(nombreClasePuntosJuego);

            porcentajes[porcentajes.length - 1].textContent = "";
            //porcentajeTotal();
        }

        function limpiarPuntosObtenidos() {
            var porcentajes = document.getElementsByClassName(nombreClasePuntosObtenidos);

            porcentajes[porcentajes.length - 1].textContent = "";
            //porcentajeTotal();
        }



        function cerrarVentanaColor() {
            cerrarVentana(ventana[1]);
            contadorColumnas--;
        }

        function mostrarVentanaDescripcion() {            
            mostrarVentana(ventana[2]);// ventana para agregar las observaciones
        }

        function cerrarVentanaObservacion() {

            if (variableCondi) {
                cerrarVentana(ventana[2]);
                mostrarVentana(ventana[1])
                return;
            }


            limpiarObservacion();            
            var elementoTd = tablaNumerostBody.getElementsByTagName("tr");
            var tr = document.getElementById("tabPart4").getElementsByTagName("tr");
            /*elementoTd[indexFila].children[indexColumna].style.background = "none";
            elementoTd[indexFila].children[indexColumna].setAttribute("class", "blanco");*/
            celdaBlanca(elementoTd);
            if (indexColumna == 0) {
                limpiarCampo(tr);
            }            
            cerrarVentana(ventana[2]);
        }

        function limpiarObservacion() {
            document.getElementById("txObservacion").value = "";
        }

        function cerrarVentanaObservacionPorInsertar() {
            cerrarVentana(ventana[2]);
            limpiarObservacion();
        }

        function insertarObservacion() {

            var valor = document.getElementById("txObservacion").value;
            if (valor == "") {
                alert("Escribe la observacion");
                return;
            }
            /*observacionesEnPila.push(valor);
            console.log(observacionesEnPila);*/
            var elementoTd = tablaNumerostBody.getElementsByTagName("tr");
            elementoTd[indexFila].children[indexColumna].value = valor;            
            cerrarVentanaObservacionPorInsertar();

        }

        function mostrarVentana(ventana) {
                       
            ventana.style.display = "block";
        }

        function cerrarVentana(ventana) {
            ventana.style.display = "none";
        }

        function evSiguiente() {            

            if (numero.value == "") {
                alert("Rellene todos los campos");
            }                        

            if (numero.value > 0 && numero.value < 50) {
              
                establecimiento = document.getElementById('<%=cbEstablecimiento.ClientID%>').value;
                aplicador = document.getElementById('<%=cbAplicador.ClientID%>').value;                

                cerrarVentana(ventana[0]);
                mostrarVentana(ventana[3]);
                crearTablaAux();
            } else {
                alert("El numero debe de ser mayor que 0 y menor que 50");
            }
            
        }

        function crearTablaAux() {
            var tablaAux = document.getElementsByClassName('order-table table');
            var tbody2 = tablaAux[0].getElementsByTagName("tbody")[0];
            var valorAEnviar = document.getElementById('<%=cbEstablecimiento.ClientID%>').value;
            
            var actionData = "{'dato':'" + valorAEnviar + "'}";            
            var arreglo;

            if (!tbody2) {
                $.ajax({
                    type: "POST",
                    url: "servicioMatrices.asmx/tablaAuxEstablecimiento",
                    contentType: 'application/json; utf-8',
                    data:actionData,
                    dataType: "json",
                    success: function (data) {
                        
                        arreglo = JSON.parse(data.d);

                        tbody = document.createElement("tbody");
                        for (var i = 0; i < arreglo.length; i++) {
                            var tr = document.createElement("tr");
                            var td1 = document.createElement("td");
                            td1.appendChild(document.createTextNode(arreglo[i].FolioMatriz));

                            var td2 = document.createElement("td");
                            td2.appendChild(document.createTextNode(arreglo[i].Establecimiento));

                            var td3 = document.createElement("td");
                            td3.appendChild(document.createTextNode(arreglo[i].Descripcion));


                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);

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
                    cerrarVentana(ventana[3]);
                    datoEnviar = elementoTr[index].firstChild.textContent;
                    establecimientoMatriz = elementoTr[index].children[1].textContent;                    

                    llenarTitulo();
                    crearTitulo();
                    crearTabla();
                    var btnGuardar = document.getElementById("btnGuardar");
                    btnGuardar.style.visibility = "visible";
                    //console.log(btnGuardar);
                    mostrarVentana(tablaModal);
                }, true);
            }
        }

        function llenarTitulo() {
            var tabla = document.getElementById("tablaCabecera");
            var tr = tabla.getElementsByTagName("tr");
            tr[0].children[1].textContent = establecimiento;
            tr[1].children[1].textContent = aplicador;
        }

        function crearTitulo() {            

            for (var i = 1; i <= numero.value; i++) {
                var td = document.createElement("td");                
                td.innerHTML = "&nbsp"+i + "A&nbsp"
                tablaNumerosthead.children[0].appendChild(td);
            }
        }

        function crearTabla() {            
            
            var actionData = "{'valorAEnviar':'" + datoEnviar + "'}";

            var arreglo;
            
            folioMatriz = datoEnviar;
            
                $.ajax({
                    type: "POST",
                    url: "servicioMatrices.asmx/getMatriz",
                    contentType: 'application/json; utf-8',
                    data:actionData,
                    dataType: "json",
                    success: function (data) {
                        var arreglo = JSON.parse(data.d);
                        //console.log(arreglo);
                        var cadenaEtapa = "";
                        var cadenaAspecto = "";
                        var tablaMeto = document.getElementById("tabPart2");                        
                        var cuentame = 0;

                        for (var i = 0; i < arreglo.length; i++) {                            
                            if (arreglo[i].Etapa != cadenaEtapa) {

                                var tbody = document.createElement("tbody");                                
                                tbody.setAttribute("class", "tBodys");                                
                                tablaMeto.appendChild(tbody);      

                                condicion1 = true;
                                filaSinNadaTab2(20, tablaMeto.lastChild);
                                filasVacias(20);
                                condicion1 = false;

                                contadorAspectos++;
                                crearFilaAspecto(arreglo[i].Aspecto, tablaMeto.lastChild);
                                
                                condicion = true;
                                crearFilaUnidad(arreglo[i], tablaMeto.lastChild);
                                condicion = false;
                                
                                cadenaEtapa = arreglo[i].Etapa;
                                
                                etapas.push(cadenaEtapa);
                                cadenaAspecto = arreglo[i].Aspecto;

                            }
                            else {
                                if (arreglo[i].Aspecto != cadenaAspecto) {
                                    condicion1 = true;
                                    contadorAspectos++;
                                    filaSinNadaTab2(20, tablaMeto.lastChild);
                                    filasVacias(20);
                                    condicion1 = false;

                                    crearFilaAspecto(arreglo[i].Aspecto, tablaMeto.lastChild);
                                    cadenaAspecto = arreglo[i].Aspecto;
                                }
                                condicion = true;
                                crearFilaUnidad(arreglo[i], tablaMeto.lastChild);
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
                        filasVacias(20);
                        condicion1 = false;

                       // console.log(ponderaciones);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status + ' ' + thrownError);
                    }
                });              
        }

        function crearFilaEtapaAndPromedio(tamanio) {

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var cadena = etapas[contadorArreglo++];
            var cadenaCortada = "";            

            for (var i = 0; i < cadena.length; i++) {//corta las cadenas para que quepan en la etapa
                
                if ((i % 5) == 0) {

                    cadenaCortada += cadena.substr(i, 5);     
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

            var cadena = data;
            var cadenaCortada = "";
            var ultimaPosicion = 0;

            for (var i = 0; i < cadena.length; i++) {
                
                if ((i % 25) == 0) {

                    cadenaCortada += cadena.substr(i, 25);                    
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

            filasVacias(tamanio);
        }

        function crearFilaUnidad(data, ultimoTbody) {

            var valorUnidad = data.Unidad;
            var valorPonderacion = data.Ponderacion;

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");            
            var td2 = document.createElement("td");
            td2.setAttribute("class", "unidadAspecto" + contadorParaClases);            
            td2.textContent = valorUnidad;

            tr.appendChild(td1);
            tr.appendChild(td2);
            ultimoTbody.appendChild(tr);

            var tamanio = td2.offsetHeight;

            ponderaciones.push(valorPonderacion);

            filasVacias(tamanio);
        }

        function filasVacias(tamanio) {
            filaVaciaTab3(tamanio);
            filaVaciaTab4(tamanio);            
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

        function filaVaciaTab4(tamanio) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");

            if (condicion) {                
                td1.setAttribute("class", "porcentaje" + contadorParaClases);
                td2.setAttribute("class", "ponderacion" + contadorParaClases);
                td3.setAttribute("class", "puntoEnJuego" + contadorParaClases);
                td4.setAttribute("class", "puntosObtenidos" + contadorParaClases);

            }

            if (condicion1) {                
                td1.setAttribute("class", "porcentaje" + contadorParaClases);
                td2.setAttribute("class", "ponderacion" + contadorParaClases);
                td3.setAttribute("class", "puntoEnJuego" + contadorParaClases);
                td4.setAttribute("class", "puntosObtenidos" + contadorParaClases);
                contadorParaClases++;

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

        function filaVaciaTab3(tamanio) {
            var tablaNum = document.getElementById("tablaNumeros");
            var tds = tablaNum.children[0].getElementsByTagName("td");

            var tr = document.createElement("tr");

            for (var i = 0; i < numero.value; i++) {
                var td1 = document.createElement("td");
                tr.appendChild(td1);
            }                                    

            tr.style.height = tamanio + "px";

            if (condicion) {
                var valor = ponderaciones.pop();                
                tr.setAttribute("id", valor+"");
                agregarEventos(tr);
            }

            tabla3.appendChild(tr);
        }

        function guardarTablaMatriz() {

            $.ajax({
                type: 'POST',
                url: " ServicioMatrices.asmx/ultimoIdMatriz",                                
                dataType: "json",
                success: function (data) {
                   // alert('Funciona tio');                    
                    ultimoIdMatriz = data;                    
                },
                complete: function () {
                    generarData();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + ' ' + thrownError);
                }
            });            
        }

        function generarData() {
                                 
            var tbody = document.querySelectorAll(".tBodys");
            var promGen = document.querySelectorAll(".promedioGen");
            var etapas = document.querySelectorAll(".etapa");
            var elementoTd = tablaNumerostBody.getElementsByTagName("tr");
            
            var dataAction = [];
            var celdas = [];
            var observaciones = [];
            var contadorTabla4 = 0;
            var contador = 0;
            
            for (var i = 0; i < tbody.length; i++) {                
                var aspecto = tbody[i].getElementsByClassName("aspecto");
                var promedio = promGen[i].children[0];                                

                for (var j = 0; j < aspecto.length; j++) {                    
                    contadorTabla4++;                    
                    var unidad = document.getElementsByClassName("unidadAspecto" + contadorTabla4);

                    var porcentaje = tabPart4.getElementsByClassName("porcentaje" + contadorTabla4);
                    var ponderacion = tabPart4.getElementsByClassName("ponderacion" + contadorTabla4);
                    var puntoEnJuego = tabPart4.getElementsByClassName("puntoEnJuego" + contadorTabla4);
                    var puntosObtenidos = tabPart4.getElementsByClassName("puntosObtenidos" + contadorTabla4);
                    var porcentajeTotal = porcentaje[porcentaje.length - 1];                    
                    var puntoEnJuegoTotal = puntoEnJuego[puntoEnJuego.length - 1];
                    var puntosObtenidosTotal = puntosObtenidos[puntosObtenidos.length - 1];                                       

                    for (var k = 0; k < unidad.length-1; k++) {
                       
                        var fila = unidad[k].parentNode.rowIndex;
                        var tds = elementoTd[fila - 1];

                        for (var l = 0; l < 50; l++) {

                            try {
                                if (tds.children[l].style.background == "green") {                                    
                                    celdas.push(1);
                                }
                                else if (tds.children[l].style.background == "red") {

                                    var fila = k + 1;
                                    var columna = l + 1;
                                    var observacion = tds.children[l].value;
                                    //alert(observacion);

                                    observaciones.push(
                                        {
                                            NoMatriz: ultimoIdMatriz
                                            , FolioMatriz: folioMatriz
                                            , FilaUnidad: fila
                                            , Columna: columna
                                            , NombreObservacion: observacion
                                        });
                                    
                                    celdas.push(0);
                                }
                                else if (tds.children[l].style.background == "yellow") {
                                    var fila=k+1;
                                    var columna = l + 1;
                                    //var observacion = observacionesEnPila[contador++];
                                    var observacion = tds.children[l].value;
                                   // alert(observacion);

                                    observaciones.push(
                                        {
                                            NoMatriz:ultimoIdMatriz
                                            ,FolioMatriz: folioMatriz
                                            , FilaUnidad: fila
                                            , Columna: columna
                                            ,NombreObservacion:observacion
                                        });

                                    celdas.push(3);
                                } else {
                                    celdas.push(2);
                                }

                            } catch (e) {                                
                                celdas.push(2);
                            }                                                                                        

                        }
                        var cadena = "";

                        cadena = porcentaje[k].textContent;                        
                        var porcenCadena = cadena.replace("%", "");                        
                        if (porcenCadena == "") {
                            porcenCadena = "-1";
                        }
                        
                        cadena = ponderacion[k].textContent;
                        var ponderaCadena = cadena.replace("%", "");
                        if (ponderaCadena== "") {
                            ponderaCadena = "-1";
                        }

                        cadena = puntoEnJuego[k].textContent;
                        var puntosJuego = cadena.replace("%", "");
                        if (puntosJuego == "") {
                            puntosJuego = "-1";
                        }

                        cadena = puntoEnJuego[k].textContent;
                        var puntosJuego = cadena.replace("%", "");
                        if (puntosJuego == "") {
                            puntosJuego = "-1";
                        }

                        cadena = puntosObtenidos[k].textContent;
                        var puntosObte = cadena.replace("%", "");
                        if (puntosObte == "") {
                            puntosObte = "-1";
                        }

                        cadena = porcentajeTotal.textContent;
                        var porcenTotal = cadena.replace("%", "");

                        cadena = promedio.textContent;
                        var promCadena = cadena.replace("%", "");
                        var observacion="observar";                                                

                        dataAction.push(
                            {
                                FolioMatriz: folioMatriz
                                ,Establecimiento:establecimientoMatriz
                                ,Etapa: etapas[i].textContent
                                , Aspecto: aspecto[j].textContent
                                , Unidad: unidad[k].textContent
                                , A1: celdas[0], A2: celdas[1], A3: celdas[2], A4: celdas[3], A5: celdas[4]
                                , A6: celdas[5], A7: celdas[6], A8: celdas[7], A9: celdas[8], A10: celdas[9]
                                , A11: celdas[10], A12: celdas[11], A13: celdas[12], A14: celdas[13], A15: celdas[14]
                                , A16: celdas[15], A17: celdas[16], A18: celdas[17], A19: celdas[18], A20: celdas[19]
                                , A21: celdas[20], A22: celdas[21], A23: celdas[22], A24: celdas[23], A25: celdas[24]
                                , A26: celdas[25], A27: celdas[26], A28: celdas[27], A29: celdas[28], A30: celdas[29]
                                , A31: celdas[30], A32: celdas[31], A33: celdas[32], A34: celdas[33], A35: celdas[34]
                                , A36: celdas[35], A37: celdas[36], A38: celdas[37], A39: celdas[38], A40: celdas[39]
                                , A41: celdas[40], A42: celdas[41], A43: celdas[42], A44: celdas[43], A45: celdas[44]
                                , A46: celdas[45], A47: celdas[46], A48: celdas[47], A49: celdas[48], A50: celdas[49]
                                , Porcentaje: porcenCadena
                                , Ponderacion: ponderaCadena
                                , PuntosEnJuego: puntosJuego
                                , PuntosObtenidos: puntosObte
                                , PorcentajeTotal: porcenTotal
                                , PuntoJuegoTotal: puntoEnJuegoTotal.textContent
                                , PuntosObtenidosTotal: puntosObtenidosTotal.textContent
                                , Promedio: promCadena
                                , Observaciones: observacion
                                ,Aplicador:aplicador

                            });

                        celdas.length = 0;
                    }
                }
            }

            var dato = "{'datos':'" + JSON.stringify(dataAction) + "','id':'" + ultimoIdMatriz + "'}";  
            console.log(dato); 
            alert(dato);
            enviarMatriz(dato);

            if (hayObservaciones()) {
                var dato1 = "{'datos':'" + JSON.stringify(observaciones) + "'}";
                //console.log(dato1);
                alert(dato1);
                enviarObservaciones(dato1);
            }            
        }

        function enviarMatriz(dato) {
           // alert(dato);                        
            //return;
            $.ajax({
                type: 'POST',
                url: " ServicioMatrices.asmx/GuardarMatriz",
                contentType: 'application/json; utf-8',
                data: dato,
                dataType: "json",
                success: function (data) {
                    alert('Registro Guardado');
                    console.log(data.d);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + ' ' + thrownError);
                }
            });
        }

        function enviarObservaciones(dato) {
            alert(dato);
            $.ajax({
                type: 'POST',
                url: " ServicioMatrices.asmx/InsertarObservaciones",
                contentType: 'application/json; utf-8',
                data: dato,
                dataType: "json",
                success: function (data) {
                    alert('Registro Guardado');
                    //console.log(data.d);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + ' ' + thrownError);
                }
            });
        }

        function hayObservaciones() {
            
            var colorRojo = document.getElementsByClassName("rojo");
            var colorAmarillo = document.getElementsByClassName("amarillo");            

            console.log(colorRojo);
            console.log(colorAmarillo);
            if (colorRojo.length > 0 || colorAmarillo.length > 0) {
                alert("hay observaciones");
                return true;
            }

            alert("no hay observaciones");
            return false;
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
