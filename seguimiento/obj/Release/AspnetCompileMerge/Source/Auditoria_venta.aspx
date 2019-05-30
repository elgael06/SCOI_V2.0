<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Auditoria_venta.aspx.vb" Inherits="seguimiento.Auditoria_venta" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
          <script type="text/javascript">                 
              var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":50})
              if (!acceso_menu)
                window.location.href="default.aspx"
            </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main id="root">
        <h2>Activa JavaScript...</h2>
    </main>
    <link href="src/estylos/Monitor_auditorio_ventas/main.css?1.0.3" rel="stylesheet" />
    <script type="text/javascript" src="res/js/React/Estaticos/efecto_carga.js?1.0.0"></script>
    <script type="text/javascript" src="res/js/React/Estaticos/BotonToggle.js?1.0.0"></script>
    <script type="text/javascript" src="src/js/Monitor_auditorio_ventas/Monitor.js?1.2.0" ></script>
</asp:Content>
