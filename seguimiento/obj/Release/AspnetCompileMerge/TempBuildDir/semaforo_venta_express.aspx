<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="semaforo_venta_express.aspx.vb" Inherits="seguimiento.semaforo_venta_express" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="res/js/semaforo_vta_express.js"></script>
    <link href="res/css/semaforo_vta_express.css" rel="stylesheet" />
    <script src="res/js/concurrent.Thread.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":30})
        if (!acceso_menu)
            window.location.href="default.aspx"
    </script>
  <div id="modal_ventas">
      <div>
          <input type="button"  value="X" class="cerrar" onclick="window.location.href = 'default.aspx';"/>
        <p id="titulo"> Semaforos venta express</p>
          <div id="cavecera">
           <table id="tabla_cabecera">
                <tr  style="font-size:16px;color:white;">
                    <th class="t_semaforo">semaforo</th>
                    <th class='t_estatus'>estatus</th>
                    <th class='t_fVta'>folio venta</th>
                    <th class='t_cliente'>cliente</th>
                    <th class='t_vendedor'>vendedor</th>
                    <th class='t_inicio'>fecha Inicio</th>
                    <th class='t_final'>fecha final</th>
                    <th class='t_proveedor'>proveedor</th>
                    <th  class='t_autorizo'>autorizo</th>
                    <th class='t_establecimiento'>establecimiento</th>
                    <th class='t_notas'>notas</th>
                    <th class='t_total' style="">total venta</th>
                </tr>
            </table>
           </div>
        <div id="scroll_tabla">
            <table id="vista">
               
            </table> 
        </div>
           <input id="refrescar" class="btncabeza" type="button" value="Refrescar" onclick="llenar_tabla();" />
            <select  id="seleccion_estatus">
                <option value="todos">Todos</option>
                <option value="Vigente">Vigente</option>
            </select>
    </div>
  </div>
</asp:Content>
