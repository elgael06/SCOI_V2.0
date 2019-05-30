<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="descargar_scoi.aspx.vb" Inherits="seguimiento.descargar_scoi" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="container">
        <h3>Descargar SCOI</h3>
        <input type="button" value="Descargar Scoi." onclick="descargar()" />
    </div>
    <!---/descargas/SCOI.rar--->
    <script type="text/javascript">
        function descargar() {
            console.log(location.href);
            location.href = 'descargas/SCOI.rar';

        }
    </script>
</asp:Content>
