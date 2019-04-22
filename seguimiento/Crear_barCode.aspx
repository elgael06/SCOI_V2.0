<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Crear_barCode.aspx.vb" Inherits="seguimiento.Crear_barCode" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="vendors/jsbarCode/JsBarcode.all.min.js"></script>
    <link rel="stylesheet" href="res/css/crear_barcode/main.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="panel panel-default">
        <div class="panel-heading" style="font-size:15px">
            <form action="on_pedir_codigo_de_producto()" >
                <div class="form-group" id="contenedor_barcode">
                    <label>Codigo</label>
                    <input type="text" id="codigo_producto" class="form-control"/>
                </div>
                <button class="btn btn-primary fa fa-download" id="btn_buscar_barcode"></button>
            </form>
            <i class="btn btn-success " id="btn_imprimir">
                Imprimir
                <span class="fa fa-print"></span>
            </i>
        </div>
        <div class="panel-body">            
            <h5>Vista Previa</h5>
            <div id="contenedor_vista_barcode">
                <div id="etiqueta" style="height: 250px;width: 650px;">
                    <div id="contenedor_barras">
                        <svg id="barcode">

                        </svg>
                    </div>
                    <div id="contenedor_texto_etiquet">
                        <div>
                            <h3 id="descripcion_producto">
                                esta es la descripcion del producto
                            </h3>
                        </div>
                        <div id="contenedor_precio">
                            <strong id="costo_producto"> 
                                $0.00
                            </strong>
                        </div>                        
                        <strong id="fecha">
                            19/03/2019
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="vendors/html2Camvas/html2canvas.js"></script>
    <script src="src/js/Codigos_barra/codigos_de_barras.js?1.0.1"></script>
</asp:Content>
