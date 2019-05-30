<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="servicios_generales_cuestionarios.aspx.vb" Inherits="seguimiento.servicios_generales_cuestionarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="contenedor">
    </div>
    <style>
        .modal_generica {
            display:none;
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
        .glyphicon-search {
            font-size:15px;
            color:#bdb6b6;
            background:white;
            top:-34px;
            margin-left:96%;
            z-index:1000
        }
        .fa-cogs {
            font-size:25px;
            color:#797e7e;
        }
        .cajas_datos_cuestionarios{
            margin-top:5px;
            margin-bottom:5px;
            margin-left:20px;
            height:40px;
            width:40%;
            display:inline-block
        }
        .tabla_seleccionada {
            background:#6cc6f3;
        }
        thead {
            position:sticky;
            width:100%;
            top:-15px;
            z-index:999;
        }
    </style>

    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.jsx"></script>

    <script type="text/jsx;harmony=true" src="res/js/React/servicios_generales/alta_cuestionarios.jsx?2.03"></script>
   <!-- <script type="text/jsx;harmony=true" src="res/js/React/servicios_generales/cuestionarios.jsx?1.02_B"></script>
    -->

</asp:Content>
