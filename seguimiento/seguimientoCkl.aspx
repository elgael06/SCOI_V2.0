<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="seguimientoCkl.aspx.vb" Inherits="seguimiento.seguimientoCkl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="res/js/seguimientoCkl.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div id="padre" >
        <div id="modalSeg">
            <p id="establecimiento"></p>
            <input type="date"  id="fecha"/>
            <div id="scroll_container" >
                <table id="tabla_seguimiento">

                </table>
            </div>

        </div>
    </div>
</asp:Content>
