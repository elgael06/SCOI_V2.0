<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="cumplimiento_cuadrantes_por_establecimiento.aspx.vb" Inherits="seguimiento.monitor_cumplimiento_cuadrantes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="../res/css/monitor_cumplimiento_cuadrantes.css" rel="stylesheet" />
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href='//fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
    
    <script src="../res/js/monitor_cumplimiento_cuadrante.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="modal_contenedora">
        <div id="modal_principal">
             <a class="fa fa-pencil-square-o" style="font-size:50px"></a>
            <p id="fecha_1" class="fecha" >Fecha Inicio<br /> <input type="date" onchange="" /></p>
            <p id="fecha_2" class="fecha" >Fecha Fin<br /> <input type="date" disabled  /></p>
            <h2 id="titulo">Monitor De Cumplimiento De Cuadrantes.</h2>
            <i class="fa fa-refresh" style="font-size:30px"></i>
            <p class="fecha">Semana:<input type="number" id="selector_semana" disabled step="1" min=0 max=52  style="width:35px"/></p>
            <p class="fecha">Año:<input type="number" id="selector_anio" disabled style="width:50px" /></p>

            <div id="contenedor">

            </div>
        </div>
    </div>
    <div id="modal_empleado">
        <div>
            <section id="cerrar" class="fa fa-remove"></section>
            <h3 id="nombre_empleado" style="display:inline-block">Nombre Empleado</h3>
             <i id="gdr_tabla_semana" class="material-icons" title="Guardar" >file_download</i>
             <div id="contenido_datos"> 

            </div>
        </div>
    </div>
    <script>
        filtrar_por_ususario()
    </script>
    <script src="res/js/tableToExcel.js"></script>
</asp:Content>
