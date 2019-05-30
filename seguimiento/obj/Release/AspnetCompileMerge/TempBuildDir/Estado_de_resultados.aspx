<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Estado_de_resultados.aspx.vb" Inherits="seguimiento.comparativo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <script type="text/javascript">                
              var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":49})
              if (!acceso_menu)
                window.location.href="default.aspx"
            </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main id="root"></main>
    
     <script type="text/jsx;harmony=true" src="res/js/React/comparativo_resultados/tabla_main.min.js?1.1.5" ></script>
</asp:Content>
