<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="alta_cursos_cuestionarios_dh.aspx.vb" Inherits="seguimiento.alta_cursos_cuestionarios_dh" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="res/js/alta_cursos_cuestionarios_dh.js"></script>
    <link href="res/css/alta_cursos_cuestionarios_dh.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="botonera" >
         <div class="btnf"> <input type="button" style="" title="NUEVO." id="btNuevo" class="btnTabla " value="Nuevo" onclick="" /></div>
         <div class="btnf"><input type="button" style="" title="EDITAR." id="btEditar"  value="Editar" class="btnTabla" /></div>
         <div class="btnf"><input type="button" style="" title="DESHACER." id="btDeshacer" onclick="" value="Deshacer" class="btnTabla" /></div>
         <div class="btnf"><input type="button" style="" title="GUARDAR." id="btGuardar"  onclick="" value="Guardar" class="btnTabla" /></div>
    </div>
    <div id="seleccion">
        <h3>cusro:</h3> 
        <input list="cursos" id="selector_cursos" style="" placeholder="Selector de Cursos al que pertenece." class="entradas" />
        <datalist id="cursos">
        </datalist>
    </div>
    <div id="imagen">
        <img id="img"  src=""  alt="Imagen" />
        <input id="inp" type='file'  accept="image/*" style="display:none" />
    </div>
    
    <div id="tabla_preguntas" class="scrolling-table-container2">
        <table id="lista_preguntas">
            <tr id="cabecera_preguntas"><th>#</th><th>Pregunta</th><th>Tipo</th></tr>

        </table>
    </div>
    <input type="button" title="GUARDAR." id="btnBorrar"  value="Eliminar" style="background-color:red;margin-top:20px;" class="btnTabla" />
    <div class="seleccionar_tipo" id="seleccionar_tipo">
        <div>
            <input type="button" value="X" id="cerrar_menu" class="cerrar" />
            <h1>Seleccione tipo de pregunta</h1>
            <br />
            <section id="normal" >Seleccion De Una Sola Respuesta Correcta.</section>
            <section id="multiple" >Seleccion Multiple Respuestas Check.</section>
            <section id="complemento" >Llenar Parrafo Con Texto De Respueta.</section>
            <section id="enlace" >Enlazar Respuesta Por Color.</section>
        </div>
    </div>

     <div class="seleccionar_tipo" id="alta_cuestionaio" >
        <div>
            <input type="button" value="X" id="cerrar_cuestionario" class="cerrar" />

            <h2 id="titulo">Seleccione tipo de pregunta</h2>

            <div id="edicion_preguntas" class="scrolling-table-container2" >

            </div>
            
        </div>
    </div>

</asp:Content>
