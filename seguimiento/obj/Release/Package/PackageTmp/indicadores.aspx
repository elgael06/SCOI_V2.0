<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="indicadores.aspx.vb" Inherits="seguimiento.indicadores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main id="contenedor" >

    </main>
    <style>
        thead{
            display:normal;
            position:sticky;
            width:100%;
            top:0px;
            z-index:999;
        }
        #barras_char {
            position: absolute;
            left: 0px; top: 0px;
            width: 727px; height: 365px;
            -moz-user-select: none;
            padding: 0px;
            margin: 0px;
            border-width: 0px;

        }
        /*Add Rotation Animation*/
        @keyframes rotate {
            from {transform: rotate(0deg)}
            to {transform: rotate(900deg)}
        }
        @-webkit-keyframes rotate {
            from {-webkit-transform: rotate(0deg)}
              to {-webkit-transform: rotate(900deg)}
        }
        .rotate{
            -webkit-animation: 2s rotate linear infinite;
            animation: 2s rotate linear infinite;
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            margin-right:10px;
        }
        /* Add Zoom Animation */
        .animate {
            -webkit-animation: animatezoom 0.6s;
            animation: animatezoom 0.6s
        }

        @-webkit-keyframes animatezoom {
            from {-webkit-transform: scale(.2)} 
            to {-webkit-transform: scale(1)}
        }
            
        @keyframes animatezoom {
            from {transform: scale(.2)} 
            to {transform: scale(1)}
        }
    </style>
    <script async type="text/jsx;harmony=true" src="res/js/React/indicadores/indicadores_caja.js?1.0.10"></script>
</asp:Content>
