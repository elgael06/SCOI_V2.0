<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Alta_Temas_en_Cursos.aspx.vb" Inherits="seguimiento.Alta_Temas_en_Cursos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <script> var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":36})
              if (!acceso_menu)
                window.location.href="default.aspx"
            </script>
    <div id="botonera" style="">
         <div class="btnf"> <input type="button" style="" title="NUEVO." id="btNuevo" class="btnTabla " value="Nuevo" onclick="" /></div>
         <div class="btnf"><input type="button" style="" title="EDITAR." id="btEditar"  value="Editar" class="btnTabla" /></div>
         <div class="btnf"><input type="button" style="" title="DESHACER." id="btDeshacer" onclick="" value="Deshacer" class="btnTabla" /></div>
         <div class="btnf"><input type="button" style="" title="GUARDAR." id="btGuardar"  onclick="" value="Guardar" class="btnTabla" /></div>
    </div>
    <input list="cursos" id="selector_cursos" style="" placeholder="Selector de Cursos al que pertenece."  class="entradas" />
    <datalist id="cursos">
    </datalist>
    <h3 style="display:inline">Nombre Tema:</h3>
    <input type="text" id="nombre_tema" placeholder="Agregar Nombre De Tema..."  class="entradas" />
    <br />
    <div id="cont_texto">
        <h3>Contenido:</h3>
        <textarea placeholder="Descripcion De tema..." onfocus="" wrap="soft" class="entradas"></textarea>
    </div>
    <div  id="cont_imagen" class="entradas">
    <img src="res/img/imagen.jpg" id="img"  />
    <input type="button" id="selector_imag" class="entradas" value="Seleccionar Imagen Para Tema." />     
   </div>
    <input id="inp" type='file'  accept="image/*" style="display:none" />
    <div  id="tiempo"> 
        Minimo:<input type="time" id="contador_tiempo_i" class="tiempo" value="00:02"  />
        Maximo:<input type="time" id="contador_tiempo_f" class="tiempo"  value="00:20"  />
    </div>
    <br />
    <input type="button" class="btnTabla" id="agregar_a_tabla" value="Agregar." />
    <input type="button" class="btnTabla" id="modificar_a_tabla" value="Modificar." />
    
    <input type="button" class="btnTabla" id="subir_orden" value="Subir." />
    <input type="button" class="btnTabla" id="bajar_orden" value="Bajar." />
    <input type="button" class="btnTabla" id="borrar_activo" value="Eliminar." />
    <div class="scrolling-table-container" id="scroll">
        <table id="tabla_temas">
            <tr class="cabecera_tabla"><th>Orden</th>
                <th>Tema</th>
                <th>Contenido</th>
                <th>Usuario Modifico</th>
                <th>Fecha</th>
            </tr>

        </table>
    </div>


    <script src="res/js/alta_temas_cursos.js"></script>
    <script>
        var id_usuario="<%=Session("id_usuario")%>"
    </script>
    <link href="res/css/alta_temas_curso.css" rel="stylesheet" />
</asp:Content>
