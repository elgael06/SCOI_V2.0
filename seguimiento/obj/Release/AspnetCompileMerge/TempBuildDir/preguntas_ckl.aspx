<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="preguntas_ckl.aspx.vb" Inherits="seguimiento.preguntas_ckl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
         <h3>Preguntas De Check-List</h3>
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

    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Modal.js?V1.0.1" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Btn_seleccion.js?V1.0.1" ></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Botonera.js?V1.0.1"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.js?V1.0.1"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Tabla.js?V1.0.1"></script>

    <script type="text/jsx;harmony=true" src="res/js/React/check-list/preguntas.js?V2.2" ></script>
</asp:Content>
