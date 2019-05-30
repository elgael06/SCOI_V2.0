<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="temperaturas.aspx.vb" Inherits="seguimiento.temperaturas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="pruebas">
    </div>	
<%--<meta http-equiv="refresh" content="300" />--%>
    <style>
        .btn_regresar {
            display:inline-block;
            width:50px;   
        }
        .glyphicon-home {
            font-size:20px;
            display:inline-block; 
        }
        .texto_cavecera {
            display:inline-block;
            width:100px;
        }
         .line-container {
          width: 230px;
          height: 20px;
        }
        .single-line {
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .Rojo {
            background:#dc5959;
        }
        .Azul {
        background:#0094ff;
        }
        .verde {
        background:#3fba49;
        }
        .amarillo {
        background:#d4d551;
        }
         .close{
            color: white;
        }
        .modal {
            display:none;
            position:absolute;
            top:0;
            bottom:-10px;
            left:0;
            right:0;
            background-color:rgba(142, 135, 135, 0.67);
            z-index:999;
            justify-content: center;
            align-items: center;
        }
        #mi_modal>div{
            width: 995px;
            height: 600px;
            background:white;
            border-radius:5px;
        }
        .cavecera_modal{
            margin-left:5px;
            margin-right:5px;
            margin-top:-3px;
            margin-bottom:5px;
            height: 30px;
            background:rgba(90, 175, 235, 0.59); 
            color:white;
            border-radius:3px;
        }
        .textarea_tamaño {
        height:50px;
        width:98.5%;
        margin-left:5px;
        margin-right:5px;
        margin-top:4px;
        margin-bottom:5px;
        resize: none;
        }
    </style>
        <script type="text/jsx;harmony=true" src="res/js/React/Monitor_temperaturas/tablero.jsx?1.2" ></script>
</asp:Content>
