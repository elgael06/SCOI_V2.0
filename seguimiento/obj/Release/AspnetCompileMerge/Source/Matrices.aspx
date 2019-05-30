<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Matrices.aspx.vb" Inherits="seguimiento.Matrices_p" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">    
     <script src="res/js/Matrices.js?0.0.0" type="text/javascript"></script>
     <script>
        $(document).ready(function () {

            $('#<%=cbEstablecimiento1.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe.";
                    }
                }
            });
            $('#<%=cbEtapa1.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe.";
                    }
                }
            });
            $('#<%=cbElementoInsp.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe.";
                    }
                }
            });
            $('#<%=cbCuadranteAspec.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe.";
                    }
                }
            });
            $('#<%=cbUnidad1.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe.";
                    }
                }
            });
        });
    </script>

    <style>     
        
         #cuerpo{
            margin-left:20px;            
        }

        #pie{
            border:1px solid #000000;
            width:860px;
            height:350px;
            overflow:scroll;
            margin-top:3px;
        }
        #cabecera{
            width:900px;
            padding:5px ;
        }
        #medio{
            width:900px;
            padding:5px;            
        }
        #descripcion{
            margin-bottom:4px;
            margin-top:7px;
        }
        #txDescripcion{
            width:600px;
            height:25px;    
        }

        #btns cabecera{
            width:900px;            
        }
        .titulo{
            background: #484848 ;
            color: white;
        }
    	table {
                border-collapse: collapse;
                width: 100%;
                text-align: center;
                margin: auto;
        }
         td {
            padding: 0.25rem;
            border: 1px solid #ccc;
        }
         tr, td {
         padding: 0.25rem;
         border: 1px solid #ccc;
        }
         #ventanaModal{             
             width:100%;
             height:100%;             
             position:fixed;
             background:rgba(0,0,0,0.5);
             top:0;
             left:0;
             display:none;
             z-index:99999;
         }
         #form{
             top:50%;
             left:50%;
             width:450px;
             height:480px;
             padding:25px;
             background-color:#fff;
             color:#666;    
             position:absolute;
             margin-left:-159px;
             margin-top:-210px;         
         }
         #cerrar{
             text-align:right;
             color:red;
             font-weight:900;
         }
         #tablaAux{
             width:400px;
             height:300px;
             overflow:scroll;
         }
         .order-table.table td{
             padding: 0.25rem;
             border: 1px solid #ccc
         }
         #comboBox1{
             margin-bottom:7px;
         }
         #comboBox2{
             margin-bottom:7px;
         }  
         #comboBox1 select{
             width:400px;             
         }
         #comboBox2 select{
             width:400px;             
         }
         #combobox3{
             width:850px;                   
         }
         #combobox3 select{             
             width:400px;             
             float:left;
         }
         #combobox3 input{             
             margin-right:10px;
         }                
         #btnsPie {
             margin-top:10px; 
             width:850px;           
         }
         #btnsPie #btGuardar{
             float:right;
             margin-right:10px;
         }
         #btnsPie #btExportar{
             float:right;
             margin-right:10px;
         }
         #lbEstaEtapa{
             height:20px;             
         }
         #establecimiento{
             width:100px;
             float:left;             
         }
         #etapa{
             width:100px;          
             float:right;                
             margin-right:360px;
         }
         #unidadDepartamento{
             height:20px;             
         }
         #unidad{
             width:150px;
             float:left; 
         }
         #departamento{
             width:100px;          
             float:right;                
             margin-right:360px;
         }
         .botones{
             height:30px;
         }         
         #spinner{
            margin-left:20px;     
            width:160px;        
            float:left;
         }
         #cantidadCeldasSpinner{             
             width:200px;       
             float:left;      
         }
         #aspecto{
             width:430px;             
             float:left;
         }
         #btnsAgregarQuitar{
             
         }
         #titulos{
            
         }
         #divBotones{
             margin-top:10px;                                       
             width:120px;
             margin-left:690px;                         
         }
         #spinners{
             border:1px solid #ccc;             
             width:280px;
             float:right;
             padding:4px;
             margin-right:139px;
             border-radius: 3px 3px;
         }

        @media screen And (max-width:768px) {
             #cuerpo{
            margin-left:20px;                     
            width:650px;                                
        }

        #pie{            
            width:450px;
            height:850px;
            overflow: scroll;
            margin-top:  10px;            
        }
        #cabecera{
            width:650px;
            padding:5px ;
        }
        #medio{
            width:650px;
            padding:5px;            
        }
        #descripcion{
            margin-bottom:4px;
            margin-top:  7px;
        }
        #txDescripcion{
            Height:20px;
            Width:403px;
        }
        #btns cabecera{
            width:650px;            
        }
        .titulo{
            background:   #484848 ;
            color: white;
        }
    	Table {
            border-collapse: collapse;
            width: 100%;
            Text-align: center;
            margin: auto;
        }
         td {
            padding:   0.25rem;
            border: 1px solid #ccc;
        }
         tr, td {
         padding: 0.25rem;
         border: 1px solid #ccc;
        }
         #ventanaModal{             
             width:100%;
             height:100%;             
             position: fixed;
             background: rgba(0, 0, 0, 0.5);
             top:0;
             left:0;
             display: none;
         }
         #form{
             top:50%;
             left:50%;
             width:450px;
             height:480px;
             padding:25px;
             background-color:  #fff;
             color:#666;    
             position: absolute;
             margin-Left:  -159px;
             margin-top:  -210px;             
         }
         #cerrar{
             Text-align:right;
             color: red;
             font-weight:  900;
         }
         #tablaAux{
             width:400px;
             height:300px;
             overflow: scroll;
         }
         .order-Table.table td{
             padding: 0.25rem;
             border: 1px solid #ccc
         }
         #comboBox1{
             margin-bottom:7px;             
         }
         #comboBox1 Select{
             width:300px;                    
         }
         #comboBox2{
             margin-bottom:7px;
         }
         #comboBox2 Select{
             width:300px;
         }
         #combobox3 Select{
             width:300px;
         }
         #combobox3 input{
             float: right;
         }
         #combobox3{
             width:650px;
         }
         #btnsPie {
             margin-top:10px; 
             width:650px;           
         }
         #btnsPie #btGuardar{
             float: right;
             width:100px;
         }
         #btnsPie #btExportar{
             visibility: hidden;
             width:0px;
         }
          #lbEstaEtapa{
             height:20px;             
         }
         #establecimiento{
             width:100px;
             float: Left;             
         }
         #etapa{
             width:100px;          
             float: Right;                
             margin-Right:  210px;
         }
         #unidadDepartamento{
             height:20px;             
         }
         #unidad{
             width:150px;
             float: Left; 
         }
         #departamento{
             width:100px;          
             float: Right;                
             margin-Right:  210px;
         }

        }

          @media screen And (max-width:1024px) {
             #cuerpo{
            margin-left:20px;            
            width:680px;
        }

        #pie{
            border:1px solid #000000;
            width:650px;
            height:250px;
            overflow: scroll;
            margin-top:  10px;
        }
        #cabecera{
            width:650px;
            padding:5px ;
        }
        #medio{
            width:650px;
            padding:5px;            
        }
        #descripcion{
            margin-bottom:4px;
            margin-top:  7px;
        }
        #txDescripcion{
            Height:20px;
            Width:403px;
        }
        #btns cabecera{
            width:650px;            
        }
        .titulo{
            background:   #484848 ;
            color: white;
        }
    	Table {
            border-collapse: collapse;
            width: 100%;
            Text-align: center;
            margin: auto;
        }
         td {
            padding:   0.25rem;
            border: 1px solid #ccc;
        }
         tr, td {
         padding: 0.25rem;
         border: 1px solid #ccc;
        }
         #ventanaModal{             
             width:100%;
             height:100%;             
             position: fixed;
             background: rgba(0, 0, 0, 0.5);
             top:0;
             left:0;
             display: none;
         }
         #form{
             top:50%;
             left:50%;
             width:450px;
             height:480px;
             padding:25px;
             background-color:  #fff;
             color:#666;    
             position: absolute;
             margin-left:  -159px;
             margin-top:  -210px;             
         }
         #cerrar{
             Text-align:right;
             color: red;
             font-weight:  900;
         }
         #tablaAux{
             width:400px;
             height:300px;
             overflow: scroll;
         }
         .order-Table.table td{
             padding: 0.25rem;
             border: 1px solid #ccc
         }
         #comboBox1{
             margin-bottom:7px;
         }
         #comboBox1 Select{
             width:300px;
         }
         #comboBox2{
             margin-bottom:7px;
         }
         #comboBox2 Select{
             width:300px;
         }
         #combobox3 Select{
             width:300px;
         }
         #combobox3 input{
             float: right;
         }
         #combobox3{
             width:650px;
         }
         #btnsPie {
             margin-top:17px; 
             width:650px;           
         }
         #btnsPie #btGuardar{
             float: right;
             width:100px;
         }
         #btnsPie #btExportar{
             visibility: hidden;
             width:0px;
         }

           #lbEstaEtapa{
             height:20px;             
         }
         #establecimiento{             
             width:335px;
             float: left;             
         }
         #etapa{
             width:100px;          
             float: left;                
             margin-Right:  150px;             
         }
         #unidadDepartamento{
             height:20px;             
         }
         #unidad{
             width:335px;
             float: left;              
         }
         #departamento{
             width:70px;          
             float: left;                
             margin-Right:  210px;             
         }

        }

          @media screen And (max-width:600px){
                 #cuerpo{
            margin-left:0px;                       
            width:520px;
            float: left;
        }

        #pie{
            border:1px solid #000000;
            width:450px;
            height:200px;
            overflow: scroll;
            margin-top:  10px;
        }
        #cabecera{
            width:480px;
            padding:5px ;
        }
        #medio{
            width:470px;
            padding:5px;            
        }
        #descripcion{
            margin-bottom:4px;
            margin-top:  7px;
        }
        #txDescripcion{
            Height:20px;
            Width:370px;
        }
        #btns cabecera{
            width:550px;                        
        }
        .titulo{
            background:   #484848 ;
            color: white;
        }
    	Table {
            border-collapse: collapse;
            width: 100%;
            Text-align: center;
            margin: auto;
        }
         td {
            padding:   0.25rem;
            border: 1px solid #ccc;
        }
         tr, td {
         padding: 0.25rem;
         border: 1px solid #ccc;
        }
         #ventanaModal{             
             width:100%;
             height:100%;             
             position: fixed;
             background: rgba(0, 0, 0, 0.5);
             top:0;
             left:0;
             display: none;
         }
         #form{
             top:50%;
             left:50%;
             width:450px;
             height:480px;
             padding:25px;
             background-color:  #fff;
             color:#666;    
             position: absolute;
             margin-Left:  -159px;
             margin-top:  -210px;             
         }
         #cerrar{
             Text-align:right;
             color: red;
             font-weight:  900;
         }
         #tablaAux{
             width:400px;
             height:300px;
             overflow: scroll;
         }
         .order-Table.table td{
             padding: 0.25rem;
             border: 1px solid #ccc
         }
         #comboBox1{
             margin-bottom:7px;
         }
         #comboBox1 select{
             width:200px;
         }
         #comboBox2{
             margin-bottom:7px;
         }
         #comboBox2 select{
             width:200px;
         }
         #combobox3 select{
             width:200px;
         }
         #combobox3 input{
             float:right;
         }
         #combobox3{
             width:450px;
         }
         #btnsPie {
             margin-top:10px; 
             width:470px;           
         }
         #btnsPie #btGuardar{
             float:right;
             width:100px;
         }
         #btnsPie #btExportar{
             visibility:hidden;
             width:0px;
         }

          }
    </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div id="cuerpo">
        <div id="ventanaModal" >                            
            <div id="form">
                <div id="cerrar"><input  id="cerrarVentana" type="button" value="X" onclick="cerrarTabla();"/></div>
            <h1 >Matrices Realizadas</h1>                    
                
                <input id="filtro" type="text" class="light-table-filter" data-table="order-table" placeholder="buscar"/>
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

        <div id="cabecera">
            <div id="btns cabecera">

                <asp:Label ID="lbFolio" runat="server" Text="Folio"></asp:Label>
                &nbsp;&nbsp;&nbsp;
                <asp:TextBox ID="txFolio" runat="server" Text="" width="50px" ></asp:TextBox>
                <input id="btMostrarTabla" type="button" value="Mostrar tabla" onclick="mostrarTabla();" class="botones"/>
                &nbsp;&nbsp;&nbsp;&nbsp;<input id="btBuscar" type="button" value="Buscar" class="botones"/>
                <input id="btNuevo" type="button" value="Nuevo" onclick="evNuevo();" class="botones"/>
                <input id="btDeshacer" type="button" value="Deshacer" onclick="evDeshacer();" class="botones"/>
                <input id="btEditar" type="button" value="Editar"  onclick="eventoEditar();" class="botones"/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <!--<input id="btReporte" type="button" value="Reporte" onclick="evReporte();"/>-->

            </div>

            <div id="descripcion">
                <asp:Label ID="lbDescripcion" runat="server" Text="Descripcion"  ></asp:Label>
               <!-- <asp:TextBox ID="txDescripcion" runat="server" Enabled="false" ></asp:TextBox>-->
                <input type="text" id="txDescripcion" />

            </div>
        </div>
        <div id="medio">
            <div id="lbEstaEtapa">
                <div id="establecimiento">
                    <asp:Label ID="lbEstablecimiento" runat="server" Text="Establecimiento"></asp:Label>                
                </div>
                <div id="etapa">
                    <asp:Label ID="lbEtapa" runat="server" Text="Etapa"></asp:Label>
                </div>
                
            </div>

            <div id="comboBox1">
                <!--<ajaxToolkit:ComboBox id="cbEstablecimiento" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="false" Width="400px" Enabled="false"></ajaxToolkit:ComboBox>
                <ajaxToolkit:ComboBox id="cbEtapa" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="false" Width="400px" Enabled="false"></ajaxToolkit:ComboBox>-->
                <select id="cbEstablecimiento1" runat="server"  disabled></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select id="cbEtapa1" runat="server"   disabled></select>
            </div>

            <div id="unidadDepartamento">

                <div id="unidad">
                    <asp:Label ID="lbUnidadInsp" runat="server" Text="Elemento Inspeccion"></asp:Label>               
                </div>
                <div id="departamento">
                    <asp:Label ID="lbDepartamento" runat="server" Text="Aspectos"></asp:Label>
                </div>

            </div>

            <div id="comboBox2">
                 <!--<ajaxToolkit:ComboBox id="cbUnidad" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="false" Width="400px" Enabled="false"></ajaxToolkit:ComboBox>
                <ajaxToolkit:ComboBox id="cbDepartamento" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="false" Width="400px" Enabled="false"></ajaxToolkit:ComboBox>-->
                <select  id="cbElementoInsp"  runat="server"   disabled></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select id="cbCuadranteAspec" runat="server"   disabled></select>
            </div>

            <div id="btnsAgregarQuitar" >
                <div id="titulos">
                    <div id="aspecto">
                        Unidad de Inspeccion
                    </div>
                    <div id="cantidadCeldasSpinner">
                        Cantidad de Celdas
                    </div>
                </div>                

                <div id="combobox3">
                    <!--<ajaxToolkit:ComboBox id="elementoInsp" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="false" Width="400px" Enabled="false"></ajaxToolkit:ComboBox>-->
                    
                    <select id="cbUnidad1"  runat="server"  disabled></select>  
                    <div id="spinners">
                        <input id="spinner" type="range" min="1" max="50" step="1" value="1"/>       
                        <input id="spinBox" type="number" min="1" max="50" step="1" value="1" style="text-align:center"/>           
                    </div>                    
                    
                </div>      
                <div id="divBotones">
                    <input id="btAgregar" type="button" value="Agregar" disabled onclick="crearFila();" class="botones"/>
                    <input id="btQuitar" type="button" value="Quitar" disabled onclick="eliminarFila();" class="botones" />                                        
                </div>                         

            </div>
        </div>
        <div id="pie">
            <div id="div tabla">
               <table id="tabla">
				<thead class="titulo">
				<tr > 
					<td>
						Orden
					</td>
					<td >
						Etapa
					</td>
					<td>
						Unidad de inspeccion
					</td>
                    <td>
						Aspecto
					</td>
                    <td>
						Elemento Inspeccion
					</td>
                    <td>
						Cantidad de celdas
					</td>

				</tr>
			</thead>

			</table>

            </div>
            
        </div>
        <div id="btnsPie" >

                &nbsp;&nbsp;&nbsp;&nbsp;

                <input type="button" id="arriba" value="Arriba" onclick="moverFilaArriba();" disabled class="botones"/>
                &nbsp;
                <input type="button" id="abajo" value="Abajo" onclick="moverFilaAbajo();" disabled class="botones"/>       
                <input type = "button" onclick = "descargarExcel();" value = "Exportar Excel..." id="btExportar" class="botones"/>                                      
                <input id="btGuardar" value="Guardar" type="button" onclick="guardarRegistro();" disabled class="botones"/>                

            </div>
    </div>  
  
    <script>
        var rowSeleccionada=0;
        var botonBuscar = document.getElementById('btBuscar');
        var arreglo;
        var contadorFila = 0;
        var contadorPosicion = 0;
        var establecimientoGlobal;
        var banderaActualizar = false;        

        var txFolio = document.getElementById('<%=txFolio.ClientID%>');
        var txDescripcion = document.getElementById('txDescripcion');
        var cbEstablecimiento = document.getElementById('<%=cbEstablecimiento1.ClientID%>');
        var cbEtapa = document.getElementById('<%=cbEtapa1.ClientID%>');
        var cbUnidad = document.getElementById('<%=cbUnidad1.ClientID%>');
        var cbDepartamento = document.getElementById('<%=cbCuadranteAspec.ClientID%>');
        var elementoInsp = document.getElementById('<%=cbElementoInsp.ClientID%>');
        
        var btArriba = document.getElementById('arriba');
        var btAbajo = document.getElementById('abajo');        
        var btGuardar = document.getElementById('btGuardar');
        var btExportar = document.getElementById('btExportar');
        
        //console.log(texFolio);
        botonBuscar.addEventListener("click", function () {
            var valorAEnviar = document.getElementById('<%=txFolio.ClientID%>').value;
            //  alert('valor a enviar:' + valorAEnviar);
            if (valorAEnviar && (valorAEnviar != '')) {
                var tabla = document.getElementById("tabla");
                borrarFilas(tabla);             
                enviarDatos(valorAEnviar);
            }else{
                alert('Ingrese valores');
            }

        }, false);

        function darEventoCambioTabla() {
            $("#tabla").on()        }

        function enviarDatos(valorAEnviar) {
            var actionData = "{'valorAEnviar':'" + valorAEnviar + "'}";            
          //  alert(actionData);

            $.ajax({
                type:'POST',
                url: " ServicioMatrices.asmx/getMatriz",
                data: actionData,
                contentType: 'application/json; utf-8',
                dataType: "json",
                success: function (data) {
                    //alert('todo bien caoon valorAEnviar vale' + valorAEnviar);
                    arreglo= JSON.parse(data.d);                   

                    var table = document.getElementsByTagName('table')[0];
                    var tbody = document.createElement("tbody");                    
                    txDescripcion.value = arreglo[0].Descripcion;

                    for (var i = 0; i < arreglo.length; i++) {
                        //alert('hola');
                        
                        var tr = document.createElement("tr");
                        var td1 = document.createElement("td");//crea un tag td
                        var td2 = document.createElement("td");//crea un tag td
                        var td3 = document.createElement("td");//crea un tag td
                        var td4 = document.createElement("td");//crea un tag td
                        var td5 = document.createElement("td");//crea un tag td
                        var td6 = document.createElement("td");//crea un tag td

                        td1.appendChild(document.createTextNode(arreglo[i].Orden));
                        tr.appendChild(td1);

                        td2.appendChild(document.createTextNode(arreglo[i].Etapa));
                        tr.appendChild(td2);

                        td3.appendChild(document.createTextNode(arreglo[i].Unidad));
                        tr.appendChild(td3);

                        td4.appendChild(document.createTextNode(arreglo[i].Aspecto));
                        tr.appendChild(td4);

                        td5.appendChild(document.createTextNode(arreglo[i].ElementoInsp));
                        tr.appendChild(td5);

                        td6.appendChild(document.createTextNode(arreglo[i].CantidadCelda));
                        tr.appendChild(td6);
                        
                        //al final agregamos la fila en i(0,1,2,3.etc) al tbody
                        tbody.appendChild(tr);
                        
                    }

                    tabla.appendChild(tbody);                    
                },
                complete: function () {
                    console.log(arreglo.length);
                    //alert('se completo tarea');                                        
                    agregarEventos();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + ' ' + thrownError);
                }
            });
        }

        function borrarFilas(laTabla) {
            //var tabla = document.getElementById("tabla");
            var tabla = laTabla;
            //var tabla = document.getElementsByTagName("table");
            var tbody = tabla.children[1];
            if (tbody) {
                //alert('funciona caoon');
                tabla.removeChild(tbody);
            } else {
                //alert('nada pasa con la borrada');
            }
            console.log(tabla);
            console.log(tbody);
        }

        function agregarEventos() {
                        
            //console.log(elemento.length);
            var tabla = document.getElementById("tabla");
            var elemento = tabla.getElementsByTagName("tr");
                     

                     var ultimoIndex;//variable tomara el valor de la ultima fila seleccionada
                     var index;//valor de la fila actualmente seleccionada

                     for (var j = 1; j < elemento.length; j++) {//ciclo para crearle los eventos a cada fila o tag 'tr'
                         //alert('dentro de los eventos');
                         //agregamos eventos a cada uno de los tr que se encuentran en le arreglo elemento
                         //como se comento var elemento = document.getElementsByTagName("tr"); nos regresa todos lo tr en la pagina
                         //los eventos son de tipo "click" y ponemos a la escucha a los tr
                         elemento[j].addEventListener("click", function (e) {
                             
                             if (e == null) {//decimos que si e o evento es == a nulo entoces..

                                 index = e.target.parentNode.rowIndex;//a index le agregamos el numero de fila que genere eventos el tr
                                 elemento[index].style.background = "#D8D8D8";//cambiamos el color para indicar que esa fila esta seleccionada


                                 if (ultimoIndex != index && ultimoIndex != undefined) {//esta condicion nos dirá cual fue la ultima fila
                                     //para deseleccionarla o volverla blanca
                                     elemento[ultimoIndex].style.background = "#FAFAFA";//la vuelve blanca
                                 }
            
                                 ultimoIndex = index;
                             } else {
                                 
                                 index = e.target.parentNode.rowIndex;
                                 rowSeleccionada = index;
                                 elemento[index].style.background = "#D8D8D8";
                                 contadorPosicion = rowSeleccionada - 1;
                                 //alert('entre a segundo');
                                 //alert(ultimoIndex != index);                                
                                 
                                 if (ultimoIndex != index && ultimoIndex != undefined) {//cambia a blanco la ultima fila seleccionada 
                                     
                                     elemento[ultimoIndex].style.background = "#FAFAFA";
                                 }
                                 
                                 ultimoIndex = index;
                                
                             }

                         }, true);
                     }

        }
        function agregaEvTablaAux() {
            var tablaAux = document.getElementsByClassName('order-table table');
            var tabla = document.getElementById("tabla");
            var elementoTr = tablaAux[0].getElementsByTagName("tr");
            
            for(var i=0;i<elementoTr.length;i++){
                elementoTr[i].addEventListener("click",function(e){                                                    
                    index = e.target.parentNode.rowIndex;
                    rowSeleccionada = index;
                                            
                    borrarFilas(tabla);
                    var datoEnviar = elementoTr[index].firstChild.textContent;
                    //alert('datoEnviar:' + datoEnviar);
                    txFolio.value = datoEnviar;
                    cerrarTabla();
                    enviarDatos(datoEnviar);
                    btGuardar.disabled = true;
                },true);
            }   
        }

        function crearFila() {            
            contadorFila++;            
            var tabla = document.getElementById("tabla");
            var hijo = tabla.children[1];
            var tbody;           

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var td5 = document.createElement("td");
            var td6 = document.createElement("td");//creamos una celda para la cantidad de celdas que tendra la fila de la matriz

            td1.appendChild(document.createTextNode(contadorFila));
            td2.appendChild(document.createTextNode(cbEtapa.value));
            td3.appendChild(document.createTextNode(cbUnidad.value));
            td4.appendChild(document.createTextNode(cbDepartamento.value));
            td5.appendChild(document.createTextNode(elementoInsp.value));
            console.log(td6);
            td6.innerText=$("#spinBox").val();// le asignamos el valor del spinner en ese momento

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);//agregamos a la fila

            if (hijo) {                
                hijo.appendChild(tr);
            } else {
                //alert('nada pasa con la borrada');
                tbody = document.createElement("tbody");

                tbody.appendChild(tr);

                tabla.appendChild(tbody);
            }                       
            agregarEventos();
            btGuardar.disabled = false;
        }

        function eliminarFila() {
            
            contadorFila--;

            if (contadorFila < 0) {
                contadorFila = 0;
            }
            var tabla = document.getElementById("tabla");
            var tbody = tabla.getElementsByTagName("tbody")[0];
            tbody.removeChild(tbody.children[rowSeleccionada - 1]);                            
            var trs = tbody.getElementsByTagName("tr");
            modificarOrden(trs);
            btGuardar.disabled = false;
        }

        function modificarOrden(trs) {//modifica el orden de las filas en la tabla--ejemplo si se elimina el "4" todas las demas filas
            //que siguen se modificaran sus numeros para que se adapten al "4" eliminado. 

            for (var i = rowSeleccionada-1; i < trs.length; i++) {
                trs[i].firstChild.textContent =i+1;
            }
            console.log(trs);
        }
        
        function evNuevo() {
            //alert('funciona el boton nuevo');
            //btGuardar.disabled = false;
            btExportar.disabled = false;
            //contadorFila = 0;
            $.ajax({
                asyn:false,
                url: 'ServicioMatrices.asmx/ultimoFolio',//agregamos la url del servicio web para crear la coneccion con ajax--"servicoEtapa.asmx" es una clase creada en el proyeto(this)
                method: 'post',
                dataType: 'json',
                success: function (data) {
                    //alert('funciona ajax');                    
                    txFolio.value = data;
                    txFolio.disabled = true;
                    var tabla = document.getElementById("tabla");
                    borrarFilas(tabla);
                },
                complete: function () {
                    volverEditables();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + ' ' + thrownError);
                }
            });
        }

        function volverEditables() {            
            
            txDescripcion.disabled = false;
            cbEstablecimiento.disabled =false;
            cbEtapa.disabled = false;
            cbUnidad.disabled = false;
            cbDepartamento.disabled = false;
            elementoInsp.disabled = false;

            btAgregar.disabled = false;
            btQuitar.disabled = false;

            //establecimientoGlobal = cbEstablecimiento;
        }

        function eventoEditar() {            
            //volverIneditables();
            volverEditables();
            btArriba.disabled = false;
            btAbajo.disabled = false;
            txFolio.disabled = true;
            
            btGuardar.disabled = true;
            btExportar.disabled = true;

            banderaActualizar = true;

            buscarUltimaFila();
        }

        function evDeshacer() {
            var tabla = document.getElementById("tabla");   
            borrarFilas(tabla);
            //alert('Deshacer');
            volverIneditables();            
            txDescripcion.value = " ";
            txFolio.value = "";
            banderaActualizar = false;
            contadorFila = 0;
        }
        function volverIneditables() {            
            
            txFolio.disabled = false;            
            txDescripcion.disabled = true;
            cbEstablecimiento.disabled = true;
            cbEtapa.disabled = true;
            cbUnidad.disabled = true;
            cbDepartamento.disabled = true;
            elementoInsp.disabled = true;

            btAgregar.disabled = true;
            btQuitar.disabled = true;

            btArriba.disabled = true;
            btAbajo.disabled = true;
            //establecimientoGlobal = cbEstablecimiento;
        }
        function evReporte() {
            alert('funciona el boton reporte');           
        }

        function guardarRegistro(){
            if (banderaActualizar) {
                alert('actualizar registro');
                actualizar();
            } else {
                alert('guardar registro');
                var table = document.getElementById('tabla');
                var trs = tabla.getElementsByTagName("tr");
                var folioMatriz1 = txFolio.value;
                var descripcionMatriz = txDescripcion.value;
                var establecimiento1 = cbEstablecimiento.value;
                var actionData = [];

                console.log(trs);
                //console.log(establecimientoGlobal.value);

                for (var i = 1; i < trs.length; i++) {

                    var orden1 = i;
                    var etapa1 = trs[i].children[1].textContent;
                    var unidad1 = trs[i].children[2].textContent;
                    var departamento1 = trs[i].children[3].textContent;
                    var elemento = trs[i].children[4].textContent;
                    var celda=trs[i].children[5].textContent;
                    actionData.push({ FolioMatriz: folioMatriz1, Descripcion: descripcionMatriz, Orden: orden1, Etapa: etapa1, Unidad: unidad1, ElementoInsp: elemento, Aspecto: departamento1, Establecimiento: establecimiento1,CantidadCelda:parseInt(celda) });

                }
                var dato = "{'datos':'" + JSON.stringify(actionData) + "'}";
                console.log(dato);
                alert(dato);
                guardar(dato);
            }
        }

        function guardar(dato) {           

           // alert(dato);

           // return;
            $.ajax({
                type: 'POST',
                url: " ServicioMatrices.asmx/insertarData",                
                contentType: 'application/json; utf-8',
                data:dato,
                dataType: "json",
                success: function (data) {
                    alert('Registro Guardado');
                },
                error: function (xhr, ajaxOptions, thrownError) {                   
                    alert(xhr.status+' '+thrownError);
                }
            });
        }

        function descargarExcel() {
            //Creamos un Elemento Temporal en forma de enlace
            var tmpElemento = document.createElement('a');
            // obtenemos la información desde el div que lo contiene en el html
            // Obtenemos la información de la tabla
            var data_type = 'data:application/vnd.ms-excel';
            var tabla_div = document.getElementById('tabla');
            var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            //Asignamos el nombre a nuestro EXCEL
            tmpElemento.download = 'tabla.xls';
            // Simulamos el click al elemento creado para descargarlo
            tmpElemento.click();
        }

        function mostrarTabla() {
            //alert('funciona');
            var tablaAux = document.getElementById('ventanaModal');            
            tablaAux.style.display = "block";            
            crearTablaAux();            
        }

        function cerrarTabla() {
            //alert('funciona cerrar tabla');
            var tablaAux = document.getElementById('ventanaModal');
            tablaAux.style.display = "none";
            document.getElementById("filtro").value = "";
        }

        function crearTablaAux() {
            var tablaAux = document.getElementsByClassName('order-table table');
            var tbody2=tablaAux[0].getElementsByTagName("tbody")[0];

            if(!tbody2){
                $.ajax({
                    type: "POST",
                    url: "servicioMatrices.asmx/tablaAux",
                    dataType: "json",
                    success: function (data) {
                        //alert('todo bien! folio matriz vale:'+data[0].FolioMatriz);
                        console.log(data);                    
                        tbody = document.createElement("tbody");
                        for (var i = 0; i < data.length; i++) {
                            var tr = document.createElement("tr");
                            var td1 = document.createElement("td");
                            td1.appendChild(document.createTextNode(data[i].FolioMatriz));

                            var td2 = document.createElement("td");
                            td2.appendChild(document.createTextNode(data[i].Establecimiento));

                            var td3 = document.createElement("td");
                            td3.appendChild(document.createTextNode(data[i].Descripcion));
                        

                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);

                            tbody.appendChild(tr);
                        }
                        tablaAux[0].appendChild(tbody);
                    },
                    complete: function () {
                        var elementoTr = tbody.getElementsByTagName("tr");
                        var condicion = true;
                        console.log(elementoTr);  
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
        function borrarTablaAux(laTabla) {
            var tabla = laTabla;            
            var tbody = tabla.children[1];                       
            tabla.removeChild(tbody);
        }

        function acomodoAsc() {
            acomodar();
        }

        function acomodoDesc() {
            acomodar();
        }

        function acomodar() {            
            var tabla = document.getElementById('tabla');
            var tbody = tabla.children[1];

            if (tbody) {                
                var tbodyNuevo = document.createElement("tbody");
                var trs = tbody.getElementsByTagName("tr");               

                for (var i = trs.length - 1; i >= 0; i--) {
                    tbodyNuevo.appendChild(trs[i]);
                }
                console.log(tbodyNuevo);
                tabla.removeChild(tbody);
                tabla.appendChild(tbodyNuevo);
            }            
        }

        function moverFilaArriba() {            
            var tabla = document.getElementById('tabla');
            var tbody = tabla.children[1];
            var trs = tbody.getElementsByTagName("tr");
                            
            if (contadorPosicion != 0) {
                tbody.insertBefore(trs[contadorPosicion], trs[--contadorPosicion]);                
                rowSeleccionada = 1;//siempre inicia en la fila 1 para modificar todas las filas
                modificarOrden(trs);
            }                                    
        }

        function moverFilaAbajo() {
            var tabla = document.getElementById('tabla');
            var tbody = tabla.children[1];
            var trs = tbody.getElementsByTagName("tr");
            
            if (contadorPosicion != trs.length - 1) {                
                tbody.insertBefore(trs[++contadorPosicion], trs[--contadorPosicion]);
                contadorPosicion++;
                rowSeleccionada = 1;//siempre inicia en la fila 1 para modificar todas las filas
                modificarOrden(trs);
            }
                        
        }

        function actualizar() {           
            eliminar();
            banderaActualizar = false;
            guardarRegistro();
        }

        function eliminar() {
            var dato = "{'dato':'"+txFolio.value+"'}";
            $.ajax({
                type: 'POST',
                url: " ServicioMatrices.asmx/eliminar",
                contentType: 'application/json; utf-8',
                data: dato,
                dataType: "json",
                success: function (data) {                    
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status + ' ' + thrownError);
                }
            });
        }

        function buscarUltimaFila() {
            var tabla = document.getElementById('tabla');
            var tbody = tabla.children[1];
            var trs = tbody.getElementsByTagName("tr");
            contadorFila = trs[trs.length - 1].firstChild.textContent;
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
