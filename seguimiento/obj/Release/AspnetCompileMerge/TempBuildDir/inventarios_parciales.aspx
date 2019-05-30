<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="inventarios_parciales.aspx.vb" Inherits="seguimiento.inventarios_parciales" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script type="text/javascript">
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":48})
              if (!acceso_menu)
                window.location.href="default.aspx"
    </script>
    <main id="container">

    </main>
    <style>
        .modal_generica {
            position:fixed;
            justify-content: center;
            align-items: center;
            background-color:rgba(144, 144, 146, 0.29);
            top:0;
            bottom:0;
            left:0;
            right:0;
            z-index:9999;
        }
        #mod_productos {
            display:none;
        }
        #mod_productos>div {
            height:600px;
            width:90%;
            min-width:400px;
            max-width:700px
        }
        #contenedor_filtro_productos {
            height:350px;
            overflow-x:auto;
            overflow-y:auto;
            border:solid 1px #808080;
            border-radius:5px;
        }

        #modal_invemtario_parcial {
            display:none;
        }
        #modal_invemtario_parcial>div{
            height:650px;
            width:90%;
            min-width:400px;
            max-width:700px;
        }
        thead {
            position:sticky;
            width:100%;
            top:0;
            z-index:999;
        }
    </style>

    <script type="text/jsx;harmony=true" src="res/js/React/inventarios_parciales/inventarios_parciales.js?2.0.1"></script>

</asp:Content>
