<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="servicios_generales_asignaciones.aspx.vb" Inherits="seguimiento.servicios_generales_asignaciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="contenedor">
    </div>
     <style>
        .glyphicon-search {
            font-size:15px;
            color:#bdb6b6;
            background:white;
            top:-34px;
            margin-left:96%;
            z-index:1000
        }
         
        .cajas_datos_cuestionarios{
            margin-top:50px;
            margin-bottom:5px;
            margin-left:20px;
            height:10px;
            width:40%;
            display:inline-block
        }
        .tabla_seleccionada {
            background:#6cc6f3;
        }
         .contenedor_dias{
            text-align:center;
            margin-bottom:20px;
         }
         .checkbox-inline {
             margin-left:20px;
            font-size:17px
         }
    </style>
    
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.jsx" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.jsx"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.jsx"></script>

    <script type="text/jsx;harmony=true" src="res/js/React/servicios_generales/asignaciones.jsx"></script>
</asp:Content>
