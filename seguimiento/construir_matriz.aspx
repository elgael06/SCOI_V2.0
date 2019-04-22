<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="construir_matriz.aspx.vb" Inherits="seguimiento.construir_matriz" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="res/css/Matrices/crear_matriz.css?1.0.1" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="contenedor">
        <label>Activa Tu JavaScript.</label>
    </div>    
    <style>
        .caja_muestra {
            position:initial;
            margin-top:-45px;
            margin-left:60%;
        }
        .caja_muestra >input{
        display:inline-block;
        }
        .botones_tabla{
            position:initial;
            margin-top:-55px;
            margin-bottom:10px;
        }
        .cavecera_tabla {
            position:sticky;
            min-width:100%;
            max-width:200px;
            top:1px;
        }
        .tabla_matriz {
            height:300px;
            width:100%;
            overflow-x:auto;
            overflow-y:auto;
            z-index:1;
            background:#e7ebf3;
        }
        .btn-group {
            margin-bottom:10px
        }
        .lista_seleccionada {
            background:#31d4f8;
        }
    </style>
     <script type="text/jsx;harmony=true" src="res/js/React/matrices/construir_matriz_old.jsx?1.07"></script>
</asp:Content>
