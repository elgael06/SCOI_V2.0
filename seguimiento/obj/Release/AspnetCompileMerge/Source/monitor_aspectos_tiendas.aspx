<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="monitor_aspectos_tiendas.aspx.vb" Inherits="seguimiento.monitor_aspectos_tiendas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="res/js/concurrent.Thread.js"></script>
    <script src="res/js/conexion_ajax.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <script>
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":33})
        if (!acceso_menu)
            window.location.href="default.aspx"
    </script>
     <div id="modal_aspectos">
        <div>
            <i class="fa fa-remove" id="cerrar" onclick="location.href ='Default.aspx'"></i>
            <i class="material-icons" style="font-size:60px;color:#7ca59f">assessment</i>
            <i class="material-icons" style="position:absolute;font-size:40px;margin-left:-45px;margin-top:.5px;z-index:999999; color:#343030">search</i>
            <input type="date" id="fecha_larga" /><input type="date" id="fecha_larga2" />
            <i class="material-icons" style="color:#343030" onclick="isFactible()" title="Actualizar">refresh</i>
            <h2 style="display:inline-block">Monitor Online De Evaluacion De Aspectos tiendas.</h2>
            <section>Evaluacion.</section>
            <div class="scroll">
                <table id="tabla_monitora" style="background-color:#ffffff;">
                    <tr style="background-color:#7ca59f;text-align:center;position:sticky;width:100%;top:0;">
                        <th colspan >Establecimiento</th>
                        <th>General</th>
                        <th>Señalizacion</th>
                        <th>Surtido</th>
                        <th>Caducidad</th>
                        <th>Limpieza</th>
                        <th>Imagen</th>
                        <th>Promedio</th>
                        <th>Aplicador</th>
                        <th>Tiempo</th>
                        <th>Inicio</th>
                        <th>Termino</th>
                    </tr>
                </table>
            </div>
            <section>Correcciones.</section>
            <div class="scroll">
                <table id="tabla_monitora_correc" style="background-color:#ffffff">
                    <tr style="background-color:#7ca59f;text-align:center;position:sticky;width:100%;top:0;">
                        <th>Establecimiento</th>
                        <th>Total</th>
                        <th>Incidencias</th>
                        <th>Correccion</th>
                        <th>N/A</th>
                        <th>Promedio</th>
                        <th>Aplicador</th>
                        <th>Tiempo</th>
                        <th>Inicio</th>
                        <th>Termino</th>

                    </tr>
                </table>
            </div>

            <div id="modal_vista_observaciones">
                <div class="scroll">
                    <h1 id="nom_sucursal">Sucursal</h1>
                    <div class="scroll" style="width:97%;height:75%;background-color:azure">
                        <table id="tabla_vistas_observaciones" style="width:100%;text-align:left"></table>
                    </div>
                    <input type="button" class="btncabeza" value="Aceptar" onclick='$("#modal_vista_observaciones").hide()' />
                </div>
            </div>

        </div>
    </div>

    <div id="mini_modal" onclick='$("#mini_modal").hide()'>
        <div id="datos_obs" style="">
        </div>
    </div>
    <style>
        tr {
            border-bottom-color: rgba(99, 101, 103, 1);
        }
    </style>
    <link href="res/css/base.css" rel="stylesheet" />
    <link href="res/css/monitor_aspectos_tiendas.css" rel="stylesheet" />
    <script src="res/js/monitor_aspectos_tiendas.js"></script>
</asp:Content>
