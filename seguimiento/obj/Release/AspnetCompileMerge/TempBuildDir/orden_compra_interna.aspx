<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="orden_compra_interna.aspx.vb" Inherits="seguimiento.orden_compra_interna" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":31})
        if (!acceso_menu)
            window.location.href="default.aspx"
    </script>
    <main id="root"></main>

    
    <link href="res/css/autirizacion_orden_de_gastos/autorizacion_de_ordenes_de_gastos.css" rel="stylesheet"  />
   <script type="text/jsx;harmony=true" src="res/js/React/orden_compra_interna/orden_compra_interna.js?1.2.1"></script>
</asp:Content>
