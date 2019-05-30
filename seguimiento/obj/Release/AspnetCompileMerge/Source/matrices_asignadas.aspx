<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="matrices_asignadas.aspx.vb" Inherits="seguimiento.matrices_asignadas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <!-- react--->
    <script  src="vendors/React/react.development.js"></script>
    <script  src="vendors/React/react-dom.development.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="contenedor"  class="panel panel-default">

    </div>
    <style>
        #image_usuario {
            height:90px;
            width:90px;
            margin-top:-105px;
            border:solid #808080 1px;
        }
        .contenedor_datos{
            margin-left:5px;
            display:inline-block;
            width:87%;
        }
        .btn-default {
            margin-top:-40px;
        }
        .contenedor_nombre {
            display:inline-block;
            width:80%;
        }
        .contenedor_puesto {
            margin-left:5px;
            display:inline-block;
            width:45%;
        }
        .contenedor_establecimiento {
            display:inline-block;
            width:50%;
            margin-left:5px;
        }
        .contenedor_calendario {
            display:inline-block;
            border:solid #808080 1px;
        }
        input[type=text] {
            border-radius:5px;
        }
        .tabla_matriz {
            margin-top:10px;
        }
        .glyphicon-search {
            font-size:15px;
            color:#808080;
            background:white;
            top:-34px;
            margin-left:101%;
        }
        .seleccionado {
            background:#9cb6b6;
        }
        .fa-times-circle-o {
            font-size:20px;
            color:red;
        }
        .fa-times-circle-o :hover {
            font-size:20px;
            color:#b43f3f;
        }

    </style>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/Usuarios/seleccion_usuario.jsx?1.01"></script>

    <script type="text/jsx;harmony=true" src="res/js/React/matrices/asignar_matriz.jsx?1.07"></script>
</asp:Content>
