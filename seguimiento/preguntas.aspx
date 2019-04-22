<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="preguntas.aspx.vb" Inherits="seguimiento.preguntas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">   
    <link href="res/css/p.css" rel="stylesheet"/>
        <script type="text/javascript"> 
                $(document).ready(function () {
                   

                });
            var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":27})
        if (!acceso_menu)
            window.location.href="default.aspx"
            </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="padre">
         <div title="encabezado" style="height:10px" ><h2>Preguntas.</h2></div>
        <div id="x"  class="MarcoFiltro">
        <div class="btnf"><input type="button"  class="btncabeza" ID="btNuevo" value="NUEVO" /></div>
        <div class="btnf"><input type="button"  class="btncabeza" ID="btEditar" value="EDITAR" /></div>
        <div class="btnf"><input type="button"  class="btncabeza" ID="btDesacer" value="DESHACER" /></div>
        <div class="btnf"><input type="button"  class="btncabeza" ID="btGuardar" value="GUARDAR" /></div>
      
          <div id="opcioes" >
            <div class="f"><a>FOLIO:<input type="text"  id="idFolio" placeholder="FOLIO" style="width:50px;" /></a></div>
            <div class="f">ESTATUS:
             <select ID="DropDownList1" >
                 <option Value="1">VIGENTE</option>
                 <option Value="0">CANCELADO</option>
                </select><br />
                AREA:<br />
                 <select ID="pertenece" >

                </select>
             </div>
            </div>
        <div id="fp">
            
            <textarea id="formPreguntas" maxlength="340" name="preguntas" aria-setsize="12" placeholder="Pregunta" style="" title="Pregunta" ></textarea><br />
            </div>
            </div>

          <div id="MarcoFiltro" class="MarcoFiltro" style=" height:460px;"> 
            <div id="filtro">
            <a id="A"><h3>PREGUNTAS:</h3></a>
            <input type="text" id="filtroPreguntas" placeholder="fitro" style=""  /><br /><br />
            </div>

            <div  id="IDF" style="width: 60px;margin-left:5PX;" class="FIL">FOLIO</div><div  id="IDP"  class="FIL">PREGUNTA</div><div  id="IDE" style="width: 105px" class="FIL">ESTATUS</div>
              
             <div class="scrolling-table-container" style="height: 320px;">
                <table id="tabla_preguntas" style="width:100%;">
                                            
                </table>
            </div>
            </div>
        <script src="res/js/preguntas.js"></script>

        </div>
</asp:Content>