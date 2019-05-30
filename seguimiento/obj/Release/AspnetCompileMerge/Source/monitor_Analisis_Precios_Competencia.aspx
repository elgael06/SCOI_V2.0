<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="monitor_Analisis_Precios_Competencia.aspx.vb" Inherits="seguimiento.monitor_Analisis_Precios_Competencia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script  src="vendors/React/react.development.js"></script>
    <script  src="vendors/React/react-dom.development.js"></script>

    <script type="text/javascript"> 
       var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":41})
        if (!acceso_menu)
            window.location.href="default.aspx";
        $("#dialog").show();
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1 >Monitor Analisis Precios Competencias</h1>
    <div id="principal">

    </div>
    
     <!-- Modal -->
  <div class="modal" id="modal_detalles" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
            <i class="glyphicon glyphicon-menu-right" > </i>
          <h4 class="modal-title" id="nombre_rpoducto">Detalles Producto.</h4>
        </div>
        <div class="modal-body" id="contenido">
            
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar.</button>
        </div>
      </div>
      
    </div>
  </div>
        <!-- Modal -->
  <div class="modal" id="modal_Grafica" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
            <i class="glyphicon glyphicon-menu-right" > </i>
            <h4 class="modal-title" id="nombre_tabla">Grafica.</h4>
        </div>
          <canvas id="graficos" width="300" height="200">

        </canvas>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" id="guardar_grafica" >
                <i class="glyphicon glyphicon-save">  Guardar.</i>
                </button>
          <button type="button" class="btn btn-default" data-dismiss="modal">
              <i class="glyphicon glyphicon-remove">  Cerrar.</i></button>
        </div>
      </div>
      
    </div>
  </div>

<style>
    #principal {
        height:90%;
        width:100%;
    }
    .cavecera {
        position:sticky;
        min-width:100%;
        max-width:200px;
        top:0px;
        z-index:99;
        border-radius:5px;
        border-bottom:solid 1px #0094ff;       
    }
   .info > tr {
       height:24px;
        }
    body {
        font-family:'Times New Roman', Times, serif;
    }
    #nombre_rpoducto {
        display:inline-block;
    }
    #id_producto {
        display:inline-block;
    }
    .centrar {
        text-align:center;
    }
    .numero {
    text-align:right;
    }
    .tabla_productos {
        border:solid 1px #808080;
        border-radius:5px;
        height:600px;
        width:100%;
        overflow-x:auto;
        overflow-y:auto;
    }
    #graficos {
        background:#ffffff;
    }
    .glyphicon {
        margin-left:5px;
        margin-right:20px;
    }
    #modal_detalles>div {
        width:90%;
    }
</style>
    <script > $("#dialog").show();
    </script>
    <script type="text/javascript" src="res/js/React/comercializacion/monitor_analisis_precios_competencia.js"></script>
</asp:Content>
