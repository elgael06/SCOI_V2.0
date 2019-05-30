<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="checkList.aspx.vb" Inherits="seguimiento.checkList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="res/css/ckl.css" rel="stylesheet"/>


     <script src="res/js/checkList.js"></script>
     <script src="res/js/dist_jspdf.min.js"></script>
    <script src="res/js/conexion_ajax.js"></script>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>-->
    <!---- hilos-->
    <script src="res/js/concurrent.Thread.js"></script>   

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <script>
         $(document).ready(function () {
            
         });
           var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":26})
              if (!acceso_menu)
                window.location.href="default.aspx"
    </script>
    <div id="padre">
        <div title="encabezado" style="height:10px" ><h2>Check List. Mejora Continua.</h2></div>
        <div id="Marcoselector" class="Selector" style="">
            <div class="btnf"> <input type="button" title="NUEVO." id="btNuevo" class="btncabeza" value="ACTUALIZAR" onclick="if (parseInt($('#establecimientos').val())) { agregar_establecimiento(); funcionTiempo1(); } else alert('Seleccione un Establecimiento')" /></div>
            <div class="btnf"><input type="button" title="RESULTADOS." id="btResultados"  value="RESULTADOS" class="btncabeza" /></div>
            <div class="btnf"><input type="button" title="OBSERVACIONES." id="btObs" onclick="if (parseInt($('#establecimientos').val())) { tabla_observacioes_cuestionario(); }" value="REPORTE OBS." class="btncabeza" /></div>
            <div class="btnf"><input type="button" title="TERMINAR." id="btGuardar2"  value="TERMINAR" class="btncabeza" /></div>
            <input type="date"  id="divDia" onchange="if( parseInt($('#establecimientos').val())){agregar_establecimiento();funcionTiempo1();}elseelse $('#mostrarTabla_areas [type=button]').remove();" style=" width:180px;background-color:yellow;height:30px;font-size:18px;border-radius:5px""/>     
           
             <br />
            <div class="input-group" >
                <span class="input-group-addon"><i class="fa fa-edit"></i> Establecimiento </span>
                <select class="form-control" id="establecimientos" onchange="if( parseInt($('#establecimientos').val())){ $('#Nom_Encargados').val('NA');  $('#mostrarTabla_areas [type=button]').remove();}else $('#mostrarTabla_areas [type=button]').remove();" >
                            <option value="">Seleccionar Establecimientos</option>
                </select>  
            </div> 
           <div class="cont_tiempo" style="position:absolute;margin-top:-1000px" >
             <DIV CLASS="TIEMPO" id="tInicio" style="background-color:cornflowerblue"> Inicio:<br /><input type="time" value="--:--:--" id="horaInicio" /></DIV>
            <DIV CLASS="TIEMPO" id="tFinal" style="background-color:cadetblue;"> Termino:<br /><input type="time" value="--:--:--" id="horaFin" /></DIV>
            </div>
            <div class="input-group" >
                <span class="input-group-addon" data-toggle="modal" data-target="#modal_lideres" ><i class="glyphicon glyphicon-user"></i> Encargado</span>
                <select class="form-control" id="Nom_Encargados"  >
                    <option onclick="alert('seleccione un establecimiento y despues el encarga una vez hecho se cargaran los cuestionarios...')"> Info </option>
                </select>
            </div>
            <br />
        </div>
      <div id="mostrarCuest" class="Selector">
           <input type="button"  id="btn_selec_" style=" border-style:none; height:60px; color:azure" title="SELECCIONAR CUESTIONARIO..." value="Agregar Cuestionario" /><br />
        <div id="listar_cuestionarios" style="height:100%;">

             <div id="mostrarTabla_areas" class="scrolling-table-container2" style="background-color:#e3e3e4;border-top:groove;">
            <table id="lista_cuest" style="width:100%">            </table>
            </div>
        </div>
      </div>
    </div>
    <!--modal resultados-->
 <div  class="modalckl">
     <div  style="text-align:center;">
         <input type="button" title="Close" class="cerrar" id="btnCerrar"  value="X" />
         <input type="text" id="mCuestionario" class="mCuestionario" style="width:50px;height:30px;font-size:18px;color:black; margin-top:15px" /><input type="text" class="textoCuestioario" style="width:230px;height:30px;font-size:18px;color:black;" >
         <br />   
         <div class="resultados">
                      SI<input type="text" id="resultadoSi" style="background-color: green; text-align: center; color: azure;"  class="resultado" />
                     </div>
                    <div  class="resultados">
                     NO<input type="text"  id="resultadoNo" style="background-color:red;text-align:center;color:azure;" class="resultado" />
                    </div>
                    <div  class="resultados">
                      N/A<input type="text" id="resultadoNA" style="background-color:blue;text-align:center;color:azure;" class="resultado" />
                    </div>

                    <div class="resultados" >Total :<input type="text" value="0" style="text-align: center;color:black;" id="resultadoTotal" class="resultado" /></div>
                    <div class="resultados" >Porcentua:<input type="text"  id="resultadoPorsentual" style="text-align:center;color:black;" class="resultado" /></div>
         <div id="mostrarTabla" class="scrolling-table-container2" style="height:75%">
         <table class="tablaPreguntas" border="0"  >          </table>
     </div>   
     <input type="button" title="GUARDAR." id="bt_Guardar_m" onclick='if (recorrer_checkbox()){ GuardarEnviar(); $(".modalckl").hide();}else alert("Falta preguntas por aplicar...")' value="GUARDAR"  class="btncabeza" />
     </div>
 </div>
    <!--modal resultados-->
    <div id="respuestas" class="modalDialog4">
		   	 
		    <div id="cuadro_respuestas"  class="Selector" style="text-align:center;">
             
                <h3>Resultados Cuestionario</h3>
                 <input type="button" title="Close" class="cerrar" id="btn_cancelar_respuestas" value="X"/>

                SI <input type="text" style="width:40px;display:inline-block;color:black" value="0" id="cuadro_resultado_total_si" /> 
                NO<input type="text" style="width: 40px;display:inline-block;color:black" value="0" id="cuadro_resultado_total_no" />
                N/A<input type="text" style="width:40px;display:inline-block;color:black" value="0" id="cuadro_resultado_total_na" />
                total:<input type="text" style="width:50px;display:inline-block;color:black" value="0" id="cuadro_resultado_total_porcentual" /> %
                <div id="mostrarTablaRespuestas" class="scrolling-table-container2" >
                    <table class="tablaRespuestas" border="1" id="tablaRespuestas" style="color:white; border-color:black;width:110%" >
                     
                    </table>
                </div>
               <input type="button"  id="btnExp" value="Exportar" />

               
                <br />  
        </div>
        <!----modal de exportacion--->
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
    <div id="openModal" class="modalDialog">
		   	    
		    <div id="cuadro_buscar_cuestionario"  class="Selector" style="text-align:center;">
             
                <h3>Buscar Cuestionario</h3>
                 <input type="button" title="Close" class="cerrar" id="btn_cancelar_cuestionario" value="X"/>

                <input type="text"  id="txt_buscar_cuestionario" style="width:80%;height:30px;font-size:18px;" />
                <input type="button" id="btn_selec_cuestionario" style="" title="SELECCIONAR..." class="btnf" value="Responder" />

                <div id="mostrarTablaCuestionario" class="scrolling-table-container2" >
                    <table class="tablaCuestionario" style='width:100%' border="0" >
                     
                    </table>
                </div>
                <br />  
        </div>
    </div>
    <!-- modal de preguntas observaciones-->
    <div id="moda_observaciones_cues"  class="modalDialog4">
        <div id="cuadro_observaciones">
              <h2>OBSERVACIONES</h2>
                <input type="button" title="Close" class="cerrar" id="btn_cancelar_obs_cues" value="X"/>

                  <div  class="scrolling-table-container2" >
                    <table class="mostrar_observaciones_cuestionario" id="mostrar_observaciones_cuestionario" style="width:100%;text-align:left">
                        <tbody></tbody>
                    </table>
                  </div>
            <input type="button" value="Exportar" class="btncabeza"  id="btn_agregar_obs_cuestionario" />
        </div>
    </div>
    <div id="modal_lideres" class="modal fade" role="dialog"> </div> 

    <link href="res/css/modalckl.css" rel="stylesheet" />
     <script src="res/js/png.js"></script>
     <script src="res/js/zlib.js"></script>
    <script src="res/js/tableToExcel.js"></script>

    <!-- react--->
    <script  src="vendors/React/react.development.js"></script>
    <script  src="vendors/React/react-dom.development.js"></script>

    <script src="res/js/React/check-list/check_list.js" ></script>
  
   </asp:Content>
