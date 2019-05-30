<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Tabla.aspx.vb" Inherits="seguimiento.Tabla" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"> 
    <link rel="stylesheet" href="res/css/estiloTabla.css?1.0.35"/>   <!--hoja de estilo standard-->
    <link rel ="stylesheet" href="res/css/estiloTablaResponsiva.css?1.0.2"/>     <!--hoja de estilo reponsiva de max 1024px-->
    <script>
        var aplicador; 
        var establecimiento;
        var ultimoId;
        /*var hayVigentes;
        var ultimaMatrizId;*///ultimo id de con folio vigente
        $(document).ready(function () {//jquery es un evento cuando se carga completamente la pagina
            //obtenemos los referencia al selects que se ejecutan en el servidor('runat="server"' es un combobox en asp.net ) 
             aplicador = $('#<%=cbAplicador.ClientID%>');             
             establecimiento=$("#<%=cbEstablecimiento.ClientID%>");
             ultimoId = "<%=ultimoId%>";//variable asp.net ->hacemos referencia a ella con "<(%)=ultimoId(del servidor)(%)>" 
            /* hayVigentes = "<hayVigentes%>";//variable asp.net ->hacemos referencia a ella con "<(%)=ultimoId(del servidor)(%)>" 
             //ultimaMatrizId="<ultimaMatrizId%>";//variable que se llena en el servidor*/
            console.log(aplicador);
            //plugin "select2" para que los selects puedan buscar informacion y filtren
            $('#<%=cbAplicador.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe."; //en caso de no haber resultados
                    }
                }
            });
            

            $('#<%=cbEstablecimiento.ClientID%>').select2({
                language: {
                    noResults: function (params) {
                        return "No existe."; //en caso de no haber resultados
                    }
                }
            });
        });
    </script> 
    <script src="res/js/Tabla.js?1.0.37" type="text/javascript"></script><!--script principal de la tabla contiene todas las funciones de la pagina "Tabla.aspx"(this)-->
    <script src="res/js/carga_ext_checkList.js"></script>

    <!--pag externa-->
     <link href="res/css/ckl.css" rel="stylesheet"/>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

     <script src="res/js/checkList.js"></script>
     <script src="res/js/dist_jspdf.min.js"></script>
    
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>-->

    <link href="res/css/modalckl.css" rel="stylesheet" />
    <script src="res/js/png.js"></script>
    <script src="res/js/zlib.js"></script>
    <script src="res/js/tableToExcel.js"></script>
    <script src="res/js/carga_ext_checkList.js"></script>
    <!---checa el acceso a la paguina--->
    <script src="res/js/acceso_directorios.js"></script>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

  <!--------------inicia matrices-------------->
<div id="matrices">
    <div id="contenedorPrincipal">   

        <div id="contenedorTabEstabAplicador">
            <table id="estabAplicador">
                <thead>
                    <tr><td>Establecimiento</td><td id="estab"></td></tr>
                    <tr><td>Aplicador</td><td id="aplica"></td></tr>
                </thead>

            </table>
        </div><!--contenedorTabEstabAplicador-->

        <div id="botones"></div> <!--div se llenará dinamicamente con botones-->

        <div id="contenedorTabla">
             <table id="tablaPrincipal">
                 <thead id="cabTabPrincipal">
                     <tr id="trcab"><td><div id="numero">#</div></td><td><div id="cabeceraTabs">Metodologia</div></td>
                                         
                     </tr>
                 </thead>
             </table>   
        </div><!--contenedorTabla-->

        <div id="divGuardar">
            <input type="button" id="btFinalizarMatriz" value="Finalizar" onclick="guardarMatriz(0);"/><%-- 0 es para finalizar--%>
            <img id="lista" src="res/img/iconos/lista.png" width="30" height="30" onclick="mostrarLista();"/>
            <input type="button" id="btGuardarMatriz" value="Guardar" onclick="guardarMatriz(1);"/><%-- 1 para guardar sin finalizar--%>
        </div>
    </div><!--contenedorPrincipal-->

   <!-- <div id="flechasAdelAtras">          
       <!-- <img id="atras" src="res/img/iconos/atras.png"/>
        <img id="adelante" src="res/img/iconos/adel.png"/>--
    </div>-->
    
     <div id="ventanaModal">

         <div class="formCol-obs" >
               <header id="titulo"><div id="textoTitulo">Color</div><input type="button" id="cerrarCuadroColor" value="X" onclick="cerrarVentanaColor();"/></header>               
                <section id="contenido">
                     <table id="tabColor">
                        <thead>
                            <tr id="filaColor">
                                <td>Cumple</td><td>No cumple</td><td>No aplica</td>
                            </tr>
                            <tr>
                                <td id="verde" ><div class="cuadroColor" ></div></td>
                                <td id="rojo" ><div class="cuadroColor"></div></td>
                                <td id="amarillo"><div class="cuadroColor"></div></td>
                            </tr>
                        </thead>
                    </table>
                </section>                          
         </div><!--formCol-obs-->

         <div class="formCol-obs">             
             <header id="tituloObs">
                 <div id="textoTituloObs">Observaciones</div>
                 <div id="btnCerrarVentanaObs"><input type="button" id="cerrarObservaciones" value="x" onclick="cerrarVentanaObservaciones();"/></div>
             </header>
             <section id="contenidoObs">
                 <div id="divTxObs"><input type="text" id="txObservacion" ></div>
                 <input type="button" id="btAceptarObservacion" value="Aceptar" onclick="insertarObservacion();"/>
             </section>
         </div><!--formCol-obs-->

         <div id="formAplicEstab"><!--esto es lo primero que se muestras en nuestras pagina 
             por que todo los demas divs y formularios estan ocultos,nos muestran unos selects para escoger aplicador y
             establecimiento al que aplicaremos la evaluacion-->
             <input type="button" id="cerrarFormAplEstab" value="X" onclick="paginaDefault();"/>
             <div id="aplicEstab">                
                <h1>Aplicador</h1>                                     
                <select id="cbAplicador" runat="server" ></select>                    
                <h1>Establecimiento</h1>                                 
                <select id="cbEstablecimiento" runat="server"></select>                    
             </div>             
             <input id="btSiguiente" type="button" value="siguiente" onclick="mostrarTablaAux();"/><!--(1) PRIMER EVENTO-->
         </div><!--formAplicEstab-->

         <div id="formTablaAux">
             <div id="tablaAux">
                 <h1>Matrices Realizadas</h1>
                 <input type="text" id="buscarEnTabla" placeholder="buscar"/>
                 <div id="tabContainer">
                     <table id="tabAux">
                         <thead><tr><td><div class="cabTabAux">Folio</div></td>
                             <td><div class="cabTabAux">Establecimiento</div></td>
                             <td><div class="cabTabAux">Descripcion</div></td></tr>
                         </thead>
                    </table>
                 </div>                 
             </div>
             <div id="btnsTabAux">
                 <input id="flechaAtras" type="button" value="Atras" onclick="mostrarVentanaAplicEstab();"/>
                 <input id="flechaAdel" type="button" value="Adelante" onclick="mostrarContenidoPrincipal();" disabled/>
             </div>
         </div><!--formTablaAux-->

         <div id="ventanaCargando">
             <img src="res/img/gifs/loading.gif" id="imgCargando" />
         </div>

         <div id="formListaObservaciones">
             <div id="btnCerrarDiv"><input id="btnCerrarLista" type="button" value="X" onclick="cerrarLista();"/></div>
            <div id="txtDelForm">
               <table id="tablaListaObservaciones">
                   <!--<tbody>

                       <tr>

                           <!--<td> 
                               <div class="datoObs">Color:Rojo</div>
                               <div class="datoObs">Etapa:Atencion a Clientes</div>
                               <div class="datoObs">Elemento inspección:Uniforme Personal limpio</div>
                               <div class="datoObs">Unidad:Cajas</div>
                               <div class="datoObs">Observacion:Claro todo saldra a la perfeccion</div>
                           </td>--

                           <td><div id="imagenFoto"><img src="res/img/camara1.jpg" id="foto"/></div></td>--

                       </tr>     
                                         
                   </tbody>-->
               </table>
           </div>
         </div>

        <!-- <div id="formObservacion">
             <div id="btnCerrarDiv"><input id="btnCerrarLista" type="button" value="X" onclick="cerrarLista();"/></div>            
               <table id="tablaListaObservaciones">
                   <tbody>
                       <tr>

                           <td> <%-- Observaciones  o Caracterizticas --%>
                               <div class="datoObs">Color:Rojo</div>
                               <div class="datoObs">Etapa:Atencion a Clientes</div>
                               <div class="datoObs">Elemento inspección:Uniforme Personal limpio</div>
                               <div class="datoObs">Unidad:Cajas</div>
                               <div class="datoObs">Observacion:Claro todo saldra a la perfeccion</div>
                           </td>

                           <td><div id="imagenFoto"><img src="res/img/camara1.jpg" id="foto"/></div></td>

                       </tr>                       
                   </tbody>
               </table>           
         </div>-->
     </div><!--fin ventana modal-->
</div>
<!---aqui termina matrices------------------inicia checklist--------------------------------------------------------------------------------->
<div id="check-List">
    <div id="padre">
        <div title="encabezado" style="height:10px" ><h2>Check List. Mejora Continua.</h2></div>

        <div id="Marcoselector" class="Selector" style="">

            <div class="btnf"> <input type="button" title="NUEVO." id="btNuevo" class="btncabeza" value="NUEVO." /></div>
           <!-- <div class="btnf"><input type="button" title="NUEVO." id="btNuevo1" value="NUEVO"/></div>-->
            <div class="btnf"><input type="button" title="RESULTADOS." id="btResultados"  value="CHECK'S." class="btncabeza" /></div>
            <div class="btnf"><input type="button" title="DESHACER." id="btDesacer"  value="DESHACER." class="btncabeza" /></div>
            <div class="btnf"><input type="button" title="GUARDAR." id="btGuardar"  value="GUARDAR." class="btncabeza" /></div>
            

            <div id="manDat">
                
                <div class="f" title="FOLIO DE SUCURSAL." ><a>SUCURSAL:</a>
                    <input type="text" id="idFolio" title="Folio." class="idFolio1" placeholder="FOLIO" style="width:80px;"  />
                    <input type="text" class="mEstablecimiento" id="mEstablecimiento" maxlength="240" placeholder="Nombre de Establecimiento" style="width:160px; resize:none" title="Establecimiento"  />
                </div>

                <div id="selectorFoilo" class="datos">
                     
                   <DIV CLASS="TIEMPO" id="tInicio" style="background-color:cornflowerblue"> Inicio:<input type="time" id="horaInicio" /></DIV>
                    <DIV CLASS="TIEMPO" id="tFinal" style="background-color:cadetblue;margin-top:0"> Fin:<input type="time" id="horaFin" /></DIV>
                </div>
            </div>   
            <div id ="mostrarResultados" class="datos" >
                     <div class="resultados">
                       <h4>SI</h4><input type="text" id="resultadoSi" style="background-color: green; text-align: center; color: azure;"  class="resultado" />
                     </div>
                    <div  class="resultados">
                     <h4>NO</h4><input type="text"  id="resultadoNo" style="background-color:red;text-align:center;color:azure;" class="resultado" />
                    </div>
                    <div  class="resultados">
                      <h4>N/A</h4><input type="text" id="resultadoNA" style="background-color:blue;text-align:center;color:azure;" class="resultado" />
                    </div>
                <div id="TOTALES">
                    <div style="width:70px" class="btnf" >Total :<input type="text" value="0" style="text-align: center" id="resultadoTotal" class="resultado" /></div>
                    <div style="width:100px" class="btnf" >Resultado:<input type="text"  id="resultadoPorsentual" style="text-align:center" class="resultado" />%</div>
                </div>
            </div>
        </div>

        <div id="mostrarCuest" class="Selector">
              
                <h3>Cuestionario:</h3>
             
            <div class="btnf" ></div>
           <div id="selecZona" class="btnf">
                 
                <input type="text" id="mCuestionario" class="mCuestionario" style="width:50px;" />
                <input type="text" class="textoCuestioario" style="width:120px;" >    
                <input type="date" id="divDia" style="margin-left:10px" /> 
            </div>
            <input type="button"  id="btn_selec_"   style=" " title="SELECCIONAR CUESTIONARIO..." value="Buscar Cuestionario" />
            <input type="text" id="filtro_tabla_preguntas" placeholder="filtrar..." style="margin-left:15%;width:50%" /><br />
                <div id="orden" class="FIL">ORDEN</div><div id="pregunta" class="FIL">PREGUNTA</div><div id="si" class="FIL">SI</div><div id="no" class="FIL">NO</div><div id="na" class="FIL">NA</div><div id="obs" class="FIL">OBS.</div>

            <!esta es la tabla donde se colocan los cuestionarios!>
            <div id="mostrarTabla" class="scrolling-table-container">
                <table class="tablaPreguntas" border="0" >
                     
                </table>
            </div>
        </div>
     </div>

    <!--
        SECCION DE MODALES A UTILIZAR
        -->
    <!--MODAL DE BUSQUEDA DE SUCURSAL-->
    <div id="openModal1" class="modalDialog1">
            <div id="cuadro_buscar_sucursal"  class="Selector" style="text-align:center;">
                <input type="button" title="Close" class="cerrar" id="btn_cancelar_sucursal" value="X"/>
                <h3>Buscar Sucursal
                </h3>
                <input type="text"  id="txt_buscar_suc" style="width:50%" />
                 <input type="button" id="btn_selec_cues" style="" title="SELECCIONAR..." class="btnf" value="seleccionar" />

                <div id="mostrarTablaSuc1" class="scrolling-table-container2" >
                    <table class="tablaSuc" style='width:100%' border="0" >
                     
                    </table>
                </div>
                <br />  
            </div>

         </div>
<!--MODAL DE BUSQUEDA DE CUESTIONARIOS-->
    <div id="openModal" class="modalDialog">
		   	    
		    <div id="cuadro_buscar_cuestionario"  class="Selector" style="text-align:center;">
             
                <h3>Buscar Cuestionario</h3>
                 <input type="button" title="Close" class="cerrar" id="btn_cancelar_cuestionario" value="X"/>

                <input type="text"  id="txt_buscar_cuestionario" style="width:80%" />
                <input type="button" id="btn_selec_cuestionario" style="" title="SELECCIONAR..." class="btnf" value="AGREGAR" />

                <div id="mostrarTablaCuestionario" class="scrolling-table-container2" >
                    <table class="tablaCuestionario" style='width:100%' border="0" >
                     
                    </table>
                </div>
                <br />  
        </div>
    </div>
    <!--MODAL DE CUADRO DE RESULTADOS-->
    <div id="respuestas" class="modalDialog4">
		   	    
		    <div id="cuadro_respuestas"  class="Selector" style="text-align:center;">
             
                <h3>Resultados Cuestionario</h3>
                 <input type="button" title="Close" class="cerrar" id="btn_cancelar_respuestas" value="X"/>

                <p class="btnf">SI</p> <input type="text" class="btnf" style="width:20px" value="0" id="cuadro_resultado_total_si" /> 
                <p class="btnf">NO</p><input type="text" class="btnf" style="width: 20px" value="0" id="cuadro_resultado_total_no" />
                <p class="btnf">N/A</p><input type="text" class="btnf" style="width:20px" value="0" id="cuadro_resultado_total_na" />

                <p class="btnf">total:</p> <input type="text" class="btnf" style="width:30px" value="0" id="cuadro_resultado_total_porcentual" />
                <p class="btnf" id="total_ckl_resultado_porsentual">%</p>

                <div id="mostrarTablaRespuestas" class="scrolling-table-container2" >
                    <table class="tablaRespuestas" border="0" id="tablaRespuestas" >
                     
                    </table>
                </div>
               <input type="button" id="btnExp" value="Exportar" />
                 <br />  
        </div>
        <!--MODAL DE RESULTADOS-->
         <div id="accionesExportar">
                     <input type="button" title="Close" class="cerrar" id="cerrar-accionesExportar" value="X" />
                     <div id="gPdf" class="btnExportaG" >
                         PDF 
                         <img class="imgExport" src="res/img/iconos/Pdf-1.png"/>
                     </div>
                     <div id="gXml" class="btnExportaG"  >
                         XML
                         <img class="imgExport" src="res/img/iconos/xml.png"/>
                     </div>
                     <div id="gexcel" class="btnExportaG" >
                         EXCEL
                         <img class="imgExport" src="res/img/iconos/excel.png"/>
                     </div>

               </div>
    </div>
    <!--MODAL DE ANIMACION DE CARGA-->
     <div id="dialog" title="cuadro de carga de datos">
       <br />
         <br />
         <br />
         <img id="cargando" src="Data/cargando2.gif" />
    </div>
</div>
    <br />
    <br />
    <br />
    <br />
    <!--MODAL DE SELECCION DE PANTALLA-->
     <div id="accionesSelec">
       <input type="button" title="Close" class="cerrar" id="cerrar-accionesSelec" value="X" />
       <br />
         <br />
         <br />
     <div id="select-mat"><br />Matrices</div>
    <div id="select-ck"><br />Check-List</div>
    </div>
    

   </asp:Content>

