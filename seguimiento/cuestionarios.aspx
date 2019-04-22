<%@ Page Title="" Language="vb" AutoEventWireup="true" EnableEventValidation="true" MasterPageFile="~/main.Master" CodeBehind="cuestionarios.aspx.vb" Inherits="seguimiento.WebForm1" %>    
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
            <script type="text/javascript"> 
                
            </script>
            </asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":28})
        if (!acceso_menu)
            window.location.href="default.aspx"
    </script>
    <div id="padre">
        <div title="encabezado" style="height:10px;"><h2>Cuestionario</h2></div>
        <div id="x" class="MarcoFiltro" style="border-bottom:none;  border-bottom-left-radius:0;border-bottom-right-radius:0">
            <div class="btnf"><input type="button" id="btn_selec_"   style=" " title="SELECCIONAR..." class="btncabeza" value="BUSCAR CUESTIONARIO" /></div>
            <div class="btnf"><input type="button" title="NUEVO."  class="btncabeza cuestionarios" id="btNuevo1" value="NUEVO"/></div>
            <div class="btnf"><input type="button" title="EDITAR."   class="btncabeza cuestionarios" id="btEditar"  value="EDITAR"  /></div>
            <div class="btnf"><input type="button" title="DESHACER."  class="btncabeza cuestionarios" id="btDesacer"  value="DESHACER"  /></div>
            <div class="btnf"><input type="button" title="GUARDAR."  class="btncabeza gdr cuestionarios" id="btGuardar"  value="GUARDAR"  /></div>
    
            <br />
            <div style="text-align:center;font-size:18px;">
                <div style="display:inline;height:18px;font-size:18px">Folio:<input type="text" id="mCuestionario" class="mCuestionario" style="width:50px;" /></div>
                <div style="display:inline;height:20px;font-size:18px"> <input type="text" class="textoCuestioario" id="textoCuestioario" style=""/>  </div>
                 <div style="display:inline-table;height:20px;font-size:18px">
                    ESTATUS:
                        <select  id="vigencia">
                            <optgroup label="ESTATUS">
                            <option value=' true' selected>VIGENTE</option>
                            <option value=' false'>CANCELADO</option>
                                </optgroup>
                        </select>
                     </div>
             </div>
                <br />
            </div>
         
          <div class="MarcoFiltro" id="y" style=""> 
            <div id="Busqueda">
                <input class="titulo_"  style="height:40px;background-color:#8c95a1;" value="EDITAR PREGUNTAS" type="button"  title="Si selecciono un cuestionario puede agregar/quitar preguntas de este. "/>
                   
                <div class="btnf"><input type="button" id="btn_selec_p"  class="btncabeza preguntas"  title="SELECCIONAR..." value="BUSCAR" /></div>
               <div class="btnf"> <input type="button" id="btnAgregar"  class="btncabeza preguntas" value="GUARDAR." title="AGREGA PREGUNTA SELECCIONADA "/></div>
               <div class="btnf"><input type="button" id="btnEliminar"  class="btncabeza preguntas" value="ELIMINAR." title="ELIMINAR PREGINTA SELECCIONADA."/></div>

                <br />
             &nbsp;<input type="text" id="BuscarPreguntas" class="BuscarPreguntas" placeholder="campo de busqueda de preguntas." style="width: 550px;margin-left:20px;" autofocus="autofocus" title="campo de busqueda de preguntas." />
              

                 <br />
                <br />
            </div>

            <div  id="IDFB" class="FIL" title="ORDEN DE ACOMODO DE LAS PREGUNTAS."><input type="button" id="btnSubir" value="▲" class="FIL subir" />Pos.<input type="button" value="▼" id="btnBajar" class="FIL subir" /></div><div  id="IDPB" class="FIL" title="PREGUNTA AGREGADA AL CUESTIONARIO.">PREGUNTA</div><div  id="IDEB" class="FIL" title="EL VALOR QUE TENDRA LA PREGUNTA POR AGREGAR.">POND.</div><div  class="FIL" style="width:60PX">AREA</div>
              <div class="scrolling-table-container2" style="height:70%;" >
                  <table  id="tabla_preguntas_cuest" class="tabla_preguntas_cuest" style="width: 99%; margin-left:5px; background-color:azure; color:blue " border="0"   title="TABLA, CLICK PARA ELIMINAR.">

                  </table>
              </div> 
            </div> 
    </div><!--div padre cierre -->
   
        <div id="resultados" class="resultados"></div>
    <script type="text/javascript" src="res/js/cuestionario.js">
    </script>
    <div>

        
       
    </div>

    <div id="openModal" class="modalDialog">
		   
		    
		    <div id="cuadro_buscar_cuestionario"  class="Selector" style="text-align:center;">
             
                <h3>Buscar Cuestionario</h3>
                <input type="button"" title="Close" class="cerrar" value="X" id="btn_cancelar_cuestionario" />

                <input type="text"  id="txt_buscar_cuestionario" style="width:50%" />
                <input type="button" id="btn_selec_cuestionario" style="" value="seleccionar" title="SELECCIONAR..." class="btnf"  />

                <div id="mostrarTablaCuestionario" class="scrolling-table-container" style=" height:70%;">
                    <table class="tablaCuestionario" style='width:100%' border="0" >
                     
                    </table>
                </div>
                <br />  
        </div>
    </div>     
    
    
    
    <div id="openModalpreg" class="modalDialogPreg">
		   	    
		    <div id="cuadro_buscar_preguntas"  class="Selector" style="text-align:center;">
             
                <h2>Buscar Pregunta</h2>
                 <input type="button" title="Close" class="cerrar" value="X"  id="btn_cancelar_Pregunta" />

                <input type="text"  id="txt_buscar_pregunta" style="width:50%" />
                 <input type="button" id="btn_selec_pregunta" style="" title="SELECCIONAR..." class="btnf" value="Agregar" />

                <div id="mostrarTablapregunta" class="scrolling-table-container" style="width:100%;margin-left:5px">
                    <table class="tablaBpreg" style='width:100%' border="0" >
                     
                    </table>
                </div>
                <br />  
        </div>
    </div>   
    <!--<script src="res/js/checkList.js"></script>-->
    <link href="res/css/modalckl.css" rel="stylesheet" />
</asp:Content>