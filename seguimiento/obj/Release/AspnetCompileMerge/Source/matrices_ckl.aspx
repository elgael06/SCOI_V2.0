<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="matrices_ckl.aspx.vb" Inherits="seguimiento.matrices_ckl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <!-- styles -->
    <link href="res/css/ckl.css" rel="stylesheet"/>
    <link href="res/css/modalckl.css" rel="stylesheet" />
    <script src="res/js/React/check-list/establecimiento.js"></script>

    </asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <script>
         var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":26})
              if (!acceso_menu)
                  window.location.href="default.aspx"
              const EDICION_CKL = conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu", { "id_usuario":<%=Session("id_usuario")%>, "folio_sub_menu": 29 });
     </script>
    <div id="padre" class="panel panel-default">
        <div class="panel-heading" id="cavecera">

        </div>
        <div class="panel-body" id="cuerpo">

        </div>
    </div>
    <!---Ventanas modal--->
    <div id="modal_reporte" class="modal fade" role="dialog"> </div>
     <div id="modal_lideres" class="modal fade" role="dialog"> </div>
     <div id="modal_cuestionarios" class="modal fade" role="dialog"> </div>
     <div id="modal_resolver_cuestionarios" class="modal fade" role="dialog"> </div>
    <!--stylos--->
    <style>
       
    </style>
    <script type="text/jsx;harmony=true" src="res/js/React/check-list/check_list.jsx?2.0" ></script>
    <script src="res/js/tableToExcel.js"></script>
</asp:Content>
