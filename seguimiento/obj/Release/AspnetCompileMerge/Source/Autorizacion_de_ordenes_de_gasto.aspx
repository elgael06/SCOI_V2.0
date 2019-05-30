<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Autorizacion_de_ordenes_de_gasto.aspx.vb" Inherits="seguimiento.Autorizacion_de_ordenes_de_gasto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        var acceso_menu= conexion_ajax("servicios/accesoServ.asmx/checar_acceso_subMenu",{"id_usuario":<%=Session("id_usuario")%>,"folio_sub_menu":31})
        if (!acceso_menu)
            window.location.href="default.aspx"
    </script>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3>Autorizacio De Ordenes De Gasto.</h3>
            <div class="form-group contenedores_cavecera">
                <strong>Registros.</strong>
                <label class="form-control" id="numero_de_registros">
                    0
                </label>
            </div>
            <div class="form-group contenedores_cavecera">
                <strong>Estatus.</strong>
                <select class="form-control" id="estatus">
                    <option value="0" selected>Seleccionar.</option>
                    <optgroup id="grupo_de_estatus" label="Estatus">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Autorizado">Autorizado</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="negado">negado</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Terminado">Terminado</option>
                        <option value="En Validacion">En Validacion</option>
                        <option value="Pago Cheque">Pago Cheque</option>
                    </optgroup>
                </select>
            </div>
            <i class="btn btn-info glyphicon glyphicon-refresh" id="btn_refrescar"></i>
        </div>
        <div class="panel-body">
            <div id="contedor_tabla_datos">
                <table class="table" id="tabla_gastos">
                    <thead>
                        <tr>
                            <th style="width:50px">Folio</th>
                            <th style="width:210px">Proveedor</th>
                            <th style="width:150px">Concepto</th>
                            <th style="width:380px">Descripcion Gasto</th>
                            <th style="width:120px">Establecimiento</th>
                            <th style="width:90px">Importe</th>
                            <th style="width:250px">Solicita</th>
                            <th style="width:130px">Fecha</th>
                            <th style="width:120px">Estatus</th>
                            <th style="width:130px">Fecha Autirizacion</th>
                            <th style="width:220px">Autorizo</th>
                            <th style="width:150px">Tipo Proveedor</th>
                            <th style="width:30px;right:1px">Accion</th>
                        </tr>
                    </thead>
                    <tbody id="datos_gastos">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal_" id="modal_detalle_gasto">
        <div class="panel panel-default animate" style="overflow:auto">
            <div id="modal_detalle_gasto_heading" class="panel-heading">
                <i class="btn btn-danger fa fa-close" style="float:right" onclick="document.getElementById('modal_detalle_gasto').style.display='none'"></i>
                <strong>Detalle De Gasto.</strong> 
            </div>
            <div id="modal_detalle_gasto_body" class="panel-default">
                <div class="panel-heading">
                    <i class="btn btn-success" id="btn_aceptar_estatus"> <i class="glyphicon glyphicon-ok"> </i>Autorizar</i>
                    <i class="btn btn-warning" id="btn_cancelar_estatus"> <i class="glyphicon glyphicon-remove"> </i>cancelar</i>
                    <i class="btn btn-danger" id="btn_negar_estatus"><i class="glyphicon glyphicon-trash"> </i> Negar</i>
                    <br />
                    <div class="form-group" style="width:80px;display:inline-block;font-size:14px">
                        <label>Folio</label>
                        <div class="form-control" id="folio_modal"></div>
                    </div>
                    <div class="form-group" style="width:130px;display:inline-block;font-size:14px">
                        <label>Estatus</label>
                        <div class="form-control" id="estatus_modal"></div>
                    </div>
                    <div class="form-group" style="width:170px;display:inline-block;font-size:14px">
                        <label>Establecimiento</label>
                        <div class="form-control" id="establecimiento_modal"></div>
                    </div>
                    <div class="form-group" style="width:140px;display:inline-block;font-size:14px">
                        <label>Concepto</label>
                        <div class="form-control" id="concepto_modal"></div>
                    </div>
                    <div class="form-group" style="width:230px;display:inline-block;font-size:14px">
                        <label>Tipo</label>
                        <div class="form-control" id="tipo_modal"></div>
                    </div>
                    <div class="form-group" style="width:360px;display:inline-block;font-size:14px">
                        <label>Solicita</label>
                        <div class="form-control" id="solicita_modal"></div>
                    </div>
                    <div class="form-group" style="width:430px;display:inline-block;font-size:14px">
                        <label>Proveedor</label>
                        <div class="form-control" id="proveedor_modal"></div>
                    </div>
                    <div class="form-group" style="width:100%;display:inline-block;font-size:14px">
                        <label>Detalle</label>
                        <textarea class="form-control" cols="3" autofocus disabled wrap="soft" style="resize:none" id="detalle_modal">

                        </textarea>
                    </div>
                </div>
                <div class="panel-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="info" >
                                <th >Descripcion</th>
                                <th style="width:100px">Cantidad</th>
                                <th style="width:120px">Precio/unidad</th>
                                <th style="width:230px">Importe</th>
                            </tr>
                        </thead>
                        <tbody id="datos_detalle_gasto">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
     <div class="modal_" id="carga">
            <label>
                <i class="fa fa-circle-o-notch rotate" ></i>
                <strong style= "font-size:20px"> Cargando...</strong><br />
            </label>
        </div>
    <link href="res/css/autirizacion_orden_de_gastos/autorizacion_de_ordenes_de_gastos.css" rel="stylesheet"  />
    <script src="res/js/typeScript/Autorizacion_orden_de_gastos/autirizacion_ordenes.js?1.0.2"></script>
</asp:Content>
