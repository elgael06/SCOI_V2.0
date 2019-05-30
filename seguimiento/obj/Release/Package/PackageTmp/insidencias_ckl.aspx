<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="insidencias_ckl.aspx.vb" Inherits="seguimiento.insidencias_ckl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

     <link href="res/css/ckl.css" rel="stylesheet"/>
    <link href="res/css/base.css" rel="stylesheet" />
    <link href="res/css/estilos_insidencias_ckl.css" rel="stylesheet" />
    <link href="res/css/modalckl.css" rel="stylesheet" />
    <script src="res/js/insidencias_ckl.js"></script>
    <script src="res/js/tableToExcel.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script >
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":32})
        if (!acceso_menu)
            window.location.href="default.aspx"
        var id_usuario=<%=Session("id_usuario")%>;
    </script>
    <div id="padre">
        <div title="encabezado" style="height:10px" ><h2>Incidencias Check List. Mejora Continua.</h2></div>

        <div id="Marcoselector" class="Selector" style="">
            <div class="btn-group">
                <input type="button" title="NUEVO." id="btNuevo" class="btn btn-primary" value="ACTUALIZAR" onclick="if (parseInt($('#idFolio').val())) { crear_btn_cuestionario() }" />
                <input type="button" title="RESULTADOS." id="btResultados"  value="RESULTADOS" class="btn btn-primary"  onclick="if (parseInt($('#idFolio').val())) { crear_tabla_resultados() }" />
                <input type="button" title="OBSERVACIONES." id="btObs"  value="REPORTE OBS." class="btn btn-primary" onclick="if (parseInt($('#idFolio').val())) { tabla_observacioes_cuestionario() }" />
                <input type="button" title="TERMINAR." id="btGuardar2"  value="TERMINAR" class="btn btn-primary" onclick="window.location.href = 'Default.aspx';" />
            </div>
             <br />   
           SUCURSAL:
              <select id="idFolio" title="Folio." class="idFolio1" onchange="if( parseInt($('#idFolio').val())){crear_btn_cuestionario()}else $('.n_c').remove(); $('.Quitar').remove()" style="width:140px;height:30px;font-size:18px;"  ><option value="0">-----</option><optgroup label="SUCURSALES:"></optgroup></select> 
         FECHA: <input type="date" id="divDia" onchange="if( parseInt($('#idFolio').val())){ crear_btn_cuestionario()}else $('.n_c').remove(); $('.Quitar').remove()" style=" width:180px;background-color:yellow;height:30px;font-size:18px;"/>           
           
        </div>
    
      <div id="mostrarCuest" class="Selector">
           <h1>incidencias</h1>
        <div id="listar_cuestionarios" style="height:100%;">

             <div id="mostrarTabla_areas" class="scrolling-table-container2" style="background-color:#e3e3e4;border-top:groove;">
            <table id="lista_cuest" style="width:100%">

            </table>
            </div>
        </div>
      </div>
    </div>
       <!--modal busqueda de sucursal-->
    <div id="modal_sucursal" class="modalDialog1"> 
      <div id="cuadro_buscar_sucursal"  class="Selector" style="text-align:center;">
         <input type="button" title="Close" class="cerrar" id="btn_cancelar_sucursal" value="X"/>
         <h3>
         <P id="folio_cuestionario" style="display:inline-block" >ZONA:</P>
         <p id="txt_buscar_suc" style="display:inline-block" >CUESTIONARIO</p>
          </h3>
         <div id="mostrarTablaSuc1" class="scrolling-table-container2" >
           <table class="tablaSuc" style='width:100%' border="0" >
           </table>
         </div>
          
         <input type="button" id="btn_selec_cues" style="" title="SELECCIONAR..." class="btncabeza" value="GUARDAR" />
         <br />  
       </div>
     </div>
     <!-- modal de preguntas observaciones-->
    <div id="moda_observaciones_cues"  class="modalDialog4">
        <div id="cuadro_observaciones">
              <h2>OBSERVACIONES</h2>
                <input type="button" title="Close" class="cerrar" id="btn_cancelar_obs_cues" value="X"/>

                  <div  class="scrolling-table-container2" >
                    <table class="mostrar_observaciones_cuestionario" id="mostrar_observaciones_cuestionario" style="width:110%;text-align:left">
                        <tbody></tbody>
                    </table>
                  </div>
            <input type="button" value="Exportar" class="btncabeza"  id="btn_agregar_obs_cuestionario" />
        </div>
    </div>
     <!--modal resultados-->
    <div id="resultados" class="modalDialog4">
		   	 
		    <div id="cuadro_resultados"  class="Selector" style="text-align:center;">
             
                <h3>Resultados Cuestionario</h3>
                 <input type="button" title="Close" class="cerrar" id="btn_cancelar_resultados" value="X"/>

                <p class="btnf">SI</p> <input type="text" class="btnf" style="width:40px;color:black" value="0" id="cuadro_resultado_total_si" /> 
                <p class="btnf">NO</p><input type="text" class="btnf" style="width: 40px;color:black" value="0" id="cuadro_resultado_total_no" />
                <p class="btnf">N/A</p><input type="text" class="btnf" style="width:40px;color:black" value="0" id="cuadro_resultado_total_na" />

                <p class="btnf">total:</p> <input type="text" class="btnf" style="width:50px;color:black" value="0" id="cuadro_resultado_total_porcentual" />
                <p class="btnf" id="total_ckl_resultado_porsentual">%</p>

                <div id="mostrarTablaresultados" class="scrolling-table-container2" >
                    <table class="tablaRespuestas" border="1" id="tablaRespuestas" style="color:white; border-color:black;width:110%" >
                     
                    </table>
                </div>
               <input type="button"  id="btnExp" value="Exportar" />

               
                <br />  
        </div>
      </div>
</asp:Content>
