<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Revicion_matriz.aspx.vb" Inherits="seguimiento.Revicion_matriz" %>
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
        .tabla_matriz {
            height: 300px;
            width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            z-index: 1;
            background: #e7ebf3;
        }
    </style>
    <script src="res/js/React/componentes/Entradas.min.js"></script>
    <script src="res/js/React/componentes/Tabla.min.js"></script>
    <script src="res/js/React/matrices/revicion_matriz.js"></script>
</asp:Content>
