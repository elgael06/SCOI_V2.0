<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="matrices_ckl_2.aspx.vb" Inherits="seguimiento.matrices_ckl" %>
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
    <div id="padre" >

    </div>
    <!---Ventanas modal--->
    <div id="modal_reporte" class="modal fade" role="dialog"> </div>
     <div id="modal_lideres" class="modal fade" role="dialog"> </div>
     <div id="modal_cuestionarios" class="modal fade" role="dialog"> </div>
     <div id="modal_resolver_cuestionarios" class="modal fade" role="dialog"> </div>
    <!--stylos--->
    <style>
        .glyphicon-search {
            position:center;
            top:-40px;
            left:101%;
            font-size:20px;
        }
        #moda_cuestionario {
            display:none;
            position:absolute;
            top:0;
            bottom:-10px;
            left:0;
            right:0;
            background-color:rgba(142, 135, 135, 0.67);
            z-index:9999;
        }
         .moda_cresponder {
            display:none;
            position:absolute;
            top:0;
            bottom:-10px;
            left:0;
            right:0;
            background-color:rgba(142, 135, 135, 0.67);
            z-index:999;
            justify-content: center;
            align-items: center;
        }
        #cuerpo_cuestionario {
            position:absolute;
            top:10px;
            bottom:1px;
            left:10px;
            right:10px;
            border-radius:0;
            border:none;
            min-height:780px;
        }
        .cuerpo_responder {
            border-radius:0;
            border:none;
            height:280px;
            width:400px;
            margin-top:-50px
        }
        #cavecera_cuestionario {
            height:70px;
            background-color:#1d8af2;
            border-radius:0;
            border:none;
            color:white;
        }
        #contenedor_respuestas {
            height:75%;
            border:solid 2px #808080;
            overflow-x:auto;
            overflow-y:auto;
            margin-top:45px;
            margin-bottom:15px;   
            margin-left:5px;
            margin-right:5px;
            border-radius:5px;
            width
        }
        tr .glyphicon {
            font-size:30px
        }
        #contenedor_marcadores {
            position:absolute;
            font-size:20px;
            margin-top:10px;
            color:black;
            margin-left:50px;
        }
        .marcadores {
            height:30px;
            width:70px;
            text-align:center;
            margin-left:5px;
            margin-right:5px;  
            color:white; 
            font-size:20px;
            display:inline-block;
        }
        #total_obsercaciones > div {
            position:absolute;
            height:70%;
            width:80%;
        }
        #total_Resultados > div {
            position:absolute;
            height:80%;
            width:80%;
        }
    </style>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.js?1" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.js?1" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.js?1"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.js?1"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.js?1"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/Usuarios/seleccion_usuario.js?1"></script>

    <script type="text/jsx;harmony=true" src="res/js/React/check-list/check_list_2.1.js?2.6" ></script>
    <script src="res/js/tableToExcel.js"></script>
</asp:Content>
