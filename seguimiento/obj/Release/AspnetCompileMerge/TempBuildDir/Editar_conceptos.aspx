<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Editar_conceptos.aspx.vb" Inherits="seguimiento.Editar_conceptos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main id="root">
        <h3>Aqui Se ejecuta el codigo...</h3>
    </main>
    <script type="text/javascript" src="res/js/React/Estaticos/efecto_carga.js" ></script>
    <script type="text/javascript" src="src/js/Matrices/editar_conceptos.js?1.0.1" ></script>
    <style>
        .entrada_corta {
            width:200px;
            display:inline-block;
            margin-right:20px;
            margin-top:10px;
        }
        #contenedor_tabla {
            height:500px;
            overflow:auto;
        }
    </style>
</asp:Content>
