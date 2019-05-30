<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Revision_matriz.aspx.vb" Inherits="seguimiento.Revicion_matriz" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <!-- react--->
    <script  src="vendors/React/react.development.js"></script>
    <script  src="vendors/React/react-dom.development.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div id="container" class="panel panel-default">

    </div>
    <style>
        .cavecera_tabla {
            position:sticky;
            min-width:100%;
            max-width:200px;
            top:1px;
        }
        input[type=text] {
            border-radius:5px;
        }
         input[type=number] {
             width:50px;
            border-radius:5px;
        }
        .tabla_matriz {
            height: 300px;
            width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            z-index: 1;
            background: #e7ebf3;
        }
        .glyphicon-search {
            position:relative;
            font-size:15px;
            color:#808080;
            background:white;
            top:-45px;
            margin-left:100%;
            border-radius:40px

        }
        .glyphicon-share {
            font-size:15px;
            color:#0f62f8;            
        }
        .contenedor_sugerido {
            height: 500px;
            width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            z-index: 1;
            background: #cfd6e5;
        }
        .seleccion_matriz {
            background:#46afeb;
        }
        #modal_observaciones {
            display:none;
            position:absolute;
            top:4px;
            left:4px;
            right:4px;
            bottom:4px;
            background:rgba(128, 128, 128, 0.73);
        }
         #modal_observaciones >div{
           position: absolute;
           top: 50%;
           left: 50%;
           width: 500px;
           height: 300px;
           margin-top: -250px; /* Half the height */
           margin-left: -250px; /* Half the width */
           border:solid 3px #808080;
           border-radius:5px;
           text-align:center;
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
        .moda_cresponder > div {
             position:absolute;
            height:92%;
            width:98%;    
        }
        .glyphicon-save {
            position:absolute;
            top:80px;
            right:20px;
        }
    </style>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/Usuarios/seleccion_usuario.jsx?1.02"></script>

    
    <script type="text/jsx;harmony=true" src="res/js/React/matrices/revicion_matriz.jsx?1.10"></script>
</asp:Content>
