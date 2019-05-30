<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="reporte_apertura_tienda.aspx.vb" Inherits="seguimiento.reporte_apertura_tienda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main id="container">

    </main>
    <style>
        #contenedor_resultados {
            height:400px;
            border-radius:5px;
            border:solid 2px black;
            overflow-x:auto;
            overflow-y:auto;
        }
    </style>
    <script src="res/js/tableToExcel.js"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/componentes/Entradas.js"></script>
    <script type="text/jsx;harmony=true" src="res/js/React/check-list/resultados.js? 2.0.0"></script>
</asp:Content>
