<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="res_ckl.aspx.vb" Inherits="seguimiento.res_ckl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<script src="res/js/res_ckl.js"></script>
    <link href="res/css/ckl.css" rel="stylesheet" />
    <link href="res/css/res_ckl.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":20})
        if (!acceso_menu)
            window.location.href="default.aspx"
    </script>
    <div id="padre"  style="">
        <div id="area_cabecera">
            <div class="btn-group">
                <input type="button" title="GUARDAR." id="btNuevo" class="btn btn-primary " value="EXCEL" onclick=" guardar_tabla_datos_a_excel()" />
                <input type="button" title="RESULTADOS." id="btResultados"  onclick="llenar_tabla_res()" value="RESULTADOS" class="btn btn-primary " />
                <input type="button" title="DESHACER." id="btDeshacer"  onclick=" remover_datos_tabla()" value="DESHACER" class="btn btn-primary " />
            </div>
            <br />
            <section >
                <h2>Establecimiento:</h2>
                <select id="sect_Establecimientos" onclick=" remover_datos_tabla()" class="selector_resultados" autofocus="autofocus" >
                   
                     <optgroup label="Establecimientos">
                         <option value="0">-Seleccionar-</option>
                        <option value="todos">Todos</option>
                    </optgroup>
                </select>
            </section>
            <section >  <h2>Fecha:</h2>Inicia:<input type="date" id="fecha_inicio" onclick=" remover_datos_tabla()" class="selector_resultados" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Termina:<input type="date" id="fecha_termino" onclick=" remover_datos_tabla()" class="selector_resultados" /></section >
             <div class="btnf cuadros_totales"><h2>Limpieza:</h2><input id="total_limpieza" class="resultados"/>%</div>
             <div class="btnf cuadros_totales"><h2>Surtido:</h2><input id="total_surtido" class="resultados" />% </div>
             <div class="btnf cuadros_totales"><h2>Imagen:</h2><input id="total_imagen" class="resultados"/>%   </div>
            <div class="btnf cuadros_totales"><h2>Total:</h2><input id="total_neto" class="resultados"/>%   </div>
        </div>
        <div id="cuerpo" style="">
            <div id="scrool_table" class="scrolling-table-container2">
                <table id="tabla_res" style="width:100%" >
                   
                </table>

            </div>
        </div>
    </div>
    <div id="respuestas" class="modal_cuestionario">
		   	 
		    <div id="cuadro_respuestas"  class="Selector" style="text-align:center;">
             
                <h3>Resultado Cuestionario</h3>
                 <input type="button" title="Close" class="cerrar" id="btn_cancelar_respuestas" value="X"/>

                <p class="btnf">SI</p> <input type="text" class="btnf" style="width:40px" value="0" id="cuadro_resultado_total_si" /> 
                <p class="btnf">NO</p><input type="text" class="btnf" style="width: 40px" value="0" id="cuadro_resultado_total_no" />
                <p class="btnf">N/A</p><input type="text" class="btnf" style="width:40px" value="0" id="cuadro_resultado_total_na" />

                <p class="btnf">total:</p> <input type="text" class="btnf" style="width:50px" value="0" id="cuadro_resultado_total_porcentual" />
                <p class="btnf" id="total_ckl_resultado_porsentual">%</p>

                <div id="mostrarTablaRespuestas" class="scrolling-table-container2" >
                    <table class="tablaRespuestas"  id="tablaRespuestas" style="color:white; border-color:black;width:100%" >
                    
                    </table>
                </div>  
            </div>
        </div>
    <script src="res/js/tableToExcel.js"></script>
</asp:Content>
