<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Manejador_cursos_usuarios.aspx.vb" Inherits="seguimiento.Manejador_cursos_usuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="res/css/manejador_cursos_usuarios.css" rel="stylesheet" />
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <script type="text/javascript"> 
                var id_usuario=<%=Session("id_usuario")%>;
                var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":id_usuario,"folio_sub_menu":40})
              if (!acceso_menu)
                window.location.href="default.aspx"
            </script>
     <div id="ContAsignador" class="panel panel-default">
        <div class="panel-heading">
              <div class="input-group">
                  <span class="input-group-addon">
                       <i class="glyphicon glyphicon-bookmark"> Cursos. </i> 
                  </span>
                  <select  id="selector_curso" class="form-control" style="height:39px">
                       <option >Seleccione Curso...</option>
                  </select>
                  <input type="button" value="Guardar." id="btn_guardar" class="btn btn-success "  style="height:34px;margin-left:5px"/>
              </div>
              <div class="input-group">
                  <i class="glyphicon glyphicon-calendar" style="font-size:30px"> </i>
                   <h4>Inicio</h4>: 
                  <input type="date" id="f1"  class="btn btn-default"/>
                  <h4>Termino</h4>: 
                  <input type="date" id="f2"  class="btn btn-default"/>
                  <input type="button" value="Asignados." id="btn_mostrar_asignados" class="btn btn-info" />
            </div> 
         </div>
        <div id="cont_tabla_seleccionados" class="panel-body">

        </div>
         <div class="panel-footer">
                  <input type="button" value="Eliminar Todos." id="btn_eliminar" class="btn btn-danger"/>
                  <input type="button" value="Seleccionar Todos." id="btn_seleccionar" class="btn btn-primary" />
        </div>
    </div>
    <div id="ContUsuarios" class="panel panel-default">
        <div class="panel-heading">
            <div class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-user"> Usuarios</i></span>
              <input type="text" id="filtro_usuarios" placeholder="Filtrar Usuario..." class="form-control" />
                <span class="input-group-addon"><i class="glyphicon glyphicon-filter"> Filtro </i></span>

                <select class="form-control" id="sel_filtro">
                    <option>Nombre</option>
                    <option>Escolaridad</option>
                    <option>Puesto</option>
                    <option>Establecimiento</option>
                </select>
                
            </div>
        </div>
        <div id="cont_tabla_usuarios" class="panel-body">

        </div>
        <div class="panel-footer">
        </div>
    </div>
    <div class="modal-content" id="resultados_usuario" style="display:none">
      <div class="modal-header" style="height:110px;background-color:#eaebeb">
        <i class="glyphicon glyphicon-remove close" onclick="$('#resultados_usuario').hide()"></i>

       <img src="" id="resultados_usuario_foto" class="img-rounded img_modal" style="" alt="foto" />
       <section class="separadores_datos_resultados"><i class="glyphicon glyphicon-user"></i> <h4>Nombre :</h4><p class="modal-title" id="nom_usuario">Nombre De Usuario.</p>.</section>
       <section class="separadores_datos_resultados"><i class="glyphicon glyphicon-tags"></i> <h4>Puesto :</h4><p class="modal-title" id="puesto_usuario">Nombre De Usuario.</p>.</section>
       <section class="separadores_datos_resultados"><i class="glyphicon glyphicon-briefcase"></i> <h4>Establecimiento :</h4><p class="modal-title" id="establecimiento_usuario">Nombre De Usuario.</p>.</section>

      </div>
      <div class="modal-body" id="cont_tabla_r">
         <h3>Cursos Cargados:</h3>
         <table class="table table-bordered" id="tabla_vistas">
             <tr id="cavecera_cursos" class="cavecera_tb">
                <th>ID</th>
                <th>CURSO</th>
                <th>ESTATUS</th>
                 <th>CALIFICACION</th>
                <th>APLICACION</th>
                <th>INICIO</th>
                <th>FINALIZA</th>
                <th>TEMAS</th>
                <th>CUESTIONARIO</th>
                <th>OBSERVACIONES</th>
          </tr>
         </table>
      </div>
    </div>

     <div class="modal-content" id="cargados_curso" style="display:none">
      <div class="modal-header" style="height:110px;background-color:#eaebeb">

        <i class="glyphicon glyphicon-remove close" onclick="$('#cargados_curso').hide()"></i>

       <img src="" id="curso_foto" class="img-rounded img_modal" style="" alt="foto" />
       <section class="separadores_datos_resultados"><i class="glyphicon glyphicon-bookmark"></i> <h4>Curso :</h4><p class="modal-title" id="nom_curso">Nombre De Usuario.</p>.</section>
      </div>
      <div class="modal-body" id="cont_tabla_aplicados">
          <h3>Usuarios Cargados:</h3>
         <table class="table table-bordered" id="tabla_vistas_aplicados">
             <tr id="cavecera_aplicados" class="cavecera_tb">
                <th>ID</th>
                <th>USUARIO</th>
                <th>ESTATUS</th>
                 <th>CALIFICACION</th>
                <th>APLICACION</th>
                <th>INICIO</th>
                <th>FINALIZA</th>
                <th>TEMAS</th>
                <th>CUESTIONARIO</th>
                <th>OBSERVACIONES</th>
          </tr>
         </table>
      </div>
    </div>
     <script src="res/js/Manejador_cursos_usuarios_asignar.js?1.0"></script>
</asp:Content>
