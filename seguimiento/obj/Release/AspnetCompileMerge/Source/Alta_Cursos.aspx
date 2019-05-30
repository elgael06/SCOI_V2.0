<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Alta_Cursos.aspx.vb" Inherits="seguimiento.Alta_Cursos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="res/js/alta_cursos_dh.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script> var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":35})
              if (!acceso_menu)
                window.location.href="default.aspx"
            </script>
        <div id="botonera" style="">
         <div class="btnf"> <input type="button" style="" title="NUEVO." id="btNuevo" class="botonera" value="Nuevo" onclick="" /></div>
         <div class="btnf"><input type="button" style="" title="EDITAR." id="btEditar"  value="Editar" class="botonera" /></div>
         <div class="btnf"><input type="button" style="" title="DESHACER." id="btDeshacer" onclick="" value="Deshacer" class="botonera" /></div>
         <div class="btnf"><input type="button" style="" title="GUARDAR." id="btGuardar"  onclick="" value="Guardar" class="botonera" /></div>
    </div>
    <div id="edicion">
        <h3>Cursos:</h3>
        <input type="text" class="cajadatos" id="folio_curso" style="width:60px"  placeholder="Folio." />
       <input type="text" id="Nombre_curso" class="cajadatos" style="" placeholder="Nombre Del Curso A crear." />
        <br />
         Estatus: <select id="estatus_cusro" class="cajadatos" >
            <option value="V">Vigente</option>
            <option value="C">Cancelado</option>
        </select>
        <input list="puestos" id="selector_puestos" style=" " placeholder="Selector de Puestos Al que esta Dirigido."  class="cajadatos"  />
        <datalist id="puestos">

        </datalist>
     </div>
    <div id="imagen">
               <img id="img" src="res/img/camar.jpg" alt="Seleccione Imagen.">
    </div>
    <input id="inp" type='file'  accept="image/*" style="display:none" />
    <div id="tablas" style="top:50px">
        <h3>Cursos Guardados:</h3>
        <input type="text" class="cajadatos" id="filtro_tabla_cursos" placeholder="Filtro De Cursos..." autofocus />
        <div class="scrolling-table-container" style="height:400px;background-color:#ffffff">
            <table id="tabla_cursos" style="width:100%;border-bottom-left-radius:5px;border-bottom-right-radius:5px">
                <tr class="cabecera_tabla">
                    <th style="width:40px">Folio</th>
                    <th>Nombre Curso</th>
                    <th style="width:40px">Folio Puesto</th>
                    <th>Puesto Pertenece</th>
                    <th style="width:90px">Estatus</th>
                </tr>
            </table>
        </div>
    </div>
        <link href="res/css/alta_cursos_dh.css" rel="stylesheet" />
</asp:Content>
