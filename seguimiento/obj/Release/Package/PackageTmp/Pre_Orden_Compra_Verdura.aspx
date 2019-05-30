<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Pre_Orden_Compra_Verdura.aspx.vb" Inherits="seguimiento.Pre_Orden_Compra_Verdura" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript"> 
             var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":42})
              if (!acceso_menu)
                window.location.href="default.aspx"
    </script>
    
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <div id="root">

    </div>
         <!-- Modal -->
  <div class="modal" id="modal_cotizar" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header" >
          <button type="button" class="close" onclick="checar_datos();" data-dismiss="modal">&times;</button>
            <div id="cavecera"></div>
        </div>
        <div class="modal-body" id="contenido">
            
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" onclick="checar_datos();" data-dismiss="modal">Cerrar.</button>
        </div>
      </div>
      
    </div>
  </div>
    <style>
        .cotizador {
            border:solid 1px #808080;
        border-radius:5px;
        height:600px;
        width:100%;
        overflow-x:auto;
        overflow-y:auto;
        }
        .cotizador > table {
        
        }
    </style>
    <script src="res/js/React/comercializacion/pre_orden_compra.js"></script>
</asp:Content>
