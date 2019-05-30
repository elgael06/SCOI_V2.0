<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="servicios_generales_ckl.aspx.vb" Inherits="seguimiento.servicios_generales_ckl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <main id="contenedor">
    </main>
    <style>
        .glyphicon-search {
            font-size:15px;
            color:#bdb6b6;
            background:white;
            top:-34px;
            margin-left:98%;
            z-index:1000
        }
        .cajas_datos_cuestionarios{
            margin-top:5px;
            margin-bottom:5px;
            height:40px;
            width:100%;
        }
        .tabla_seleccionada {
            background:#6cc6f3;
        }
        .btn-zonas {
            height:55px;
            width:95%;
        }
        .tabla_cuestiones {
             margin-top:5px;
            margin-bottom:5px;
            height:350px;
            width:100%;
            overflow-x:auto;
            overflow-y:auto;
            z-index:1;
            background:#f1f5fc;
            border:solid 1px rgba(153, 153, 157, 0.90);
            border-radius:5px;
        }
        .botonera_respuesta>span {
            margin-left:50px;
             margin-right:50px;
            font-size:65px;
        }
        /***Nuevo*/
        .contenedor {
            position:static;
            height:100%;
        
        }
        .modal_generica {
            /*display:flex;*/
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
        thead {
            position:sticky;
            width:100%;
            top:0;
            z-index:1
        }
    </style>

<%--    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.jsx?1.0" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.jsx?1.0" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.jsx?1.0"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.jsx?1.0"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.jsx"?1.0></script>

    <script type="text/jsx;harmony=true" 
            src="res/js/React/servicios_generales/check_list.jsx?1.5">
    </script>--%>
    <script type="text/jsx;harmony=true"  src="res/js/React/servicios_generales/servicios_generales_ckl.js?2.0.1"></script>
</asp:Content>
