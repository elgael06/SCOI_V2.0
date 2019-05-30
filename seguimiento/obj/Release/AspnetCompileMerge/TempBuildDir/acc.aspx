<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="acc.aspx.vb" Inherits="seguimiento.acc" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <%--      <link href="res/css/style_n_usr.css" rel="stylesheet" />--%>
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script type="text/javascript">                 
              var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":6})
              if (!acceso_menu)
                window.location.href="default.aspx"
            </script>
<%--    <script src="res/js/nivel_acceso.js"></script>--%>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main id="container"></main>

        <style>
        
    </style>
    <script type="text/jsx" src="res/js/React/Usuarios/Alta_usuarios/modal_edicion.js"></script>
    <script type="text/jsx" src="res/js/React/Usuarios/Alta_usuarios/modal_acceso.js"></script>
    <script type="text/jsx" src="res/js/React/Usuarios/Alta_usuarios/componente_alta.js"></script>
    <script type="text/jsx" src="res/js/React/Usuarios/Alta_usuarios/componente_lista_usuarios.js"></script>
    <script type="text/jsx" src="res/js/React/Usuarios/acceso_usuarios.js"></script>
</asp:Content>
<%--  <div id="seg_padre">
        <i class="fa fa-users" style="font-size:48px;display:inline-block" ></i>
        <h3 style="font-size:18px;display:inline-block">USUARIOS</h3>       

        <div id="contenedor_usuarios" class="cuerpo_tabla" style="width:99%">
        </div> 
        <!-- Contenedor-->
        <div id="modal_manejo_usuario">
            <div>
                <i  onclick="$('#modal_manejo_usuario').hide()" class="fa fa-times" id="cerrar" ></i>
                <h2 id="titulo_modal">Titulo</h2>
                <div id="contenedor">

                </div>
            </div>    
        </div>
    </div>
    <script>
        mostrar_usuarios_en_contenedor()
    </script>--%>