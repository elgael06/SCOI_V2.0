<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="servicios_generales_criterios.aspx.vb" Inherits="seguimiento.servicios_generales_criterios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <h3>Criterios De Revicion De Servicios</h3>
    <div id="container">

    </div>
    <style>
        .caja_folio {
            margin-top:-50px;
            width:130px;
        }
        .caja_nombre {
            width:60%;
        }
        .caja_estatus {
        width:160px;
        }
        h5 {
        font-weight: bold;
        color:black;
        }
        h5 {
        font-weight: bold;
        }
        .cuerpo_tabla {
            overflow-x:auto;
            overflow-y:auto;
            background:#eceff1;
            height:500px;
            border-radius:10px;
        }
        .seleccio {
            background:#c4d7d7;
        }
        .fa-close {
            color:red;
        }
    </style>

    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.jsx?V1.0" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.jsx?V1.0" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.jsx?V1.0"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.jsx?V1.0"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.jsx?V1.0"></script>

    <script type="text/jsx;harmony=true" src="res/js/React/servicios_generales/criterios.jsx?V1.0" ></script>
</asp:Content>
