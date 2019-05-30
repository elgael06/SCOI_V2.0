<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="asignar_cuestionarios.aspx.vb" Inherits="seguimiento.asignar_cuestionarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
         var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":29})
              if (!acceso_menu)
                  window.location.href="default.aspx"
     </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="container" class="panel panel-default">

    </div>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.js" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.js" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.js"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.js"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.js"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/Usuarios/seleccion_usuario.js"></script>

    <script type="text/jsx;harmony=true" src="res/js/React/check-list/asignacion_cuestionario.js?1.1"></script>
</asp:Content>
