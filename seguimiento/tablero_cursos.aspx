<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="tablero_cursos.aspx.vb" Inherits="seguimiento.tablero_cursos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="res/js/tablero_cursos.js"></script>
    <script src="res/js/concurrent.Thread.js"></script>
    <link href="res/css/tablero_cursos.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
            <script type="text/javascript"> 
                var id_usuario=<%=Session("id_usuario")%>;
                var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":id_usuario,"folio_sub_menu":39})
              if (!acceso_menu)
                window.location.href="default.aspx"
            </script>
    <div id="cabecera"  class="panel-heading">
     <h1>Tablero de Cursos Activos.</h1> 
        <input type="text" id="filtro_cuestionarios" placeholder="Filtrar Cursos..." class="form-control" />
    </div>
    <div id="cuestionarios" class="scrolling-table-container panel panel-body">
    </div>
    <div class="modal-content" id="menu_selector">
        <div class="modal-header" style="height:120px">
            <i class="glyphicon glyphicon-remove close" onclick="$(this).parent().parent().hide()"></i>
           <img src="" id="cuestionarios_menu_foto" class="img-rounded img_modal" style="height:100px;max-width:200px;position:absolute;top:10px;" alt="foto" />
           <section class="separadores_datos_historial"><i class="glyphicon glyphicon-list-alt"></i> <h4>Nombre Curso :</h4><p class="modal-title" id="nom_curso">Nombre De Curso.</p></section>

        </div>
            <div class="modal-body" id="cont_tabla_r">
                  <input id="mostrar_curso" type="button" style=" margin-left:10px" title="Puede Repasar El Curso De Forma Indefinida Antes De Iniciar El Cuestionario" value="Presentacion Curso." class="btn btn-primary" />
                <input id="calificar_curso" type="button" style=" margin-left:10px" title="Califique el curso." value="Calificar El Curso." class="btn btn-info" />
                <input id="aplicar_cuestionario" type="button" style=" margin-left:10px" title="Solo Tiene Una Oportunidad Para Aplicarlo!!!" value="Aplicar Cuestionario." class="btn btn-warning" />  
                
         <h4>Historial De Aplicacion Curso:</h4>
         <table class="table table-bordered" id="tabla_vistas">
             <tr id="cavecera_cursos" class="cavecera_tb">
                 <th>FECHA APLICACION</th>
                 <th>CALIFICACION</th>  
                <th>DURACION TEMAS</th>
                <th>DURACION CUESTIONARIO</th>
                <th>OBSERVACIONES</th>
          </tr>
         </table>
        </div>
    </div>
    <div class="curso_activo">
        <div>
            <input type="button" id="cerrar" class="cerrar" value="X" onclick="" />
            Curso: <h3 id="titulo_curso">curso</h3><br />
            <section id="anterior" class="fa fa-caret-square-o-left"></section>
            <p id="posicion">posicion</p> de <p id="total_temas">total</p>
            <section id="siguiente" class="fa fa-caret-square-o-right"></section>
            Tema: <h2 id="tema">tema</h2>

            <div id="contenedor">
              <div id="cont_texto">
                  <textarea id="textarea" wrap="soft" ></textarea>
              </div>
                <div id="cont_imagen" class="entradas">
                    <img src="res/img/imagen.jpg" id="img" height:"400px"  />
                </div>                
            </div>
            <br />
            <div id="pie_tabla">
               Tiempos (
                Transcurso Tema <p id="tiempo_s">00:00</p>                
                Minimo Tema <p id="tiempo_tema">00:00</p>
                Total Curso <p id="tiempo_t">00:00</p>
                Transcurido <p id="tiempo_trasncurso">00:00</p>
                Usuario :<p id="usuario">yo</p>

                )
            </div>
        </div>
    </div>
    <div class="califica_el_curso estrllas">
        <div>
            <h2> <p id="n_usr"></p> Como calificas este curso?</h2>
            <div id="estrellas">
                 <section id="str1" class="fa fa-star estrella brillar"></section>
                 <section id="str2" class="fa fa-star estrella"></section>
                 <section id="str3" class="fa fa-star estrella"></section>
                 <section id="str4" class="fa fa-star estrella"></section>
                 <section id="str5" class="fa fa-star estrella"></section>
            </div>
            <textarea id="comentarios_calificacion" wrap="soft" placeholder="Danos tu comentario sobre el curso...">

            </textarea>
            <input type="button" value="Enviar" id="enviar_calificacion_curso" onclick=' ' />
        </div>
    </div>

    <div class="responder califica_el_curso">
       
        <div >
            <input type="button" id="cerrar_preg" class="cerrar" value="X" onclick="" />

            <div style="display:inline-block;width:170px;left:5px;top:5px;position:absolute;background:#eeecec;border-radius:5px">
                <section id="anterior_p" class="fa fa-chevron-left"> </section>
                     <p id="posicion_p">0</p> de <p id="total__preguntas">0</p>
                <section id="siguiente_p" class="fa fa-chevron-right"> </section>
            </div>
            <h2 style="display:inline-block;font-size:25px;color:black">Cuestionarios</h2>
            <br />
            <section id="cuestion" style="font-size:18px;">datos preguntas</section>
            <div id="respuestas" class="scrolling-table-container2">

            </div>
            
            <section id="indicadoresPos"  style="" >
             </section>
            </div> 
    </div>

</asp:Content>
