
<template>
    <div class="modal" id="modal_detalle_embarque">
        <div class="panel panel-primary" >
            <div class="panel-heading">
                <i class="fa fa-close close" @click="cerrar"></i>
                <label>Detalles Embarque</label>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-2">
                        <label>Folio :</label>
                        <i class="form-control">{{Seleccion.Pedido.Folio}}</i>
                    </div>
                    <div class="col-sm-2">
                        <label>Elaboracion :</label>
                        <i class="form-control">{{Seleccion.Pedido.Elaboraccion}}</i>
                    </div>
                    <div class="col-sm-4">
                        <label>Surte :</label>
                        <i class="form-control">{{Seleccion.Pedido.Alterno}}</i>
                    </div>
                    <div class="col-sm-4">
                        <label>Recibe :</label>
                        <i class="form-control">{{Seleccion.Pedido.Establecimiento}}</i>
                    </div>
                    <div class="col-sm-8">
                        <label>Capturo :</label>
                        <i class="form-control">{{Seleccion.Pedido.Usuario_capturo}}</i>
                    </div>
                    <div class="col-sm-4">
                        <label>Estatus :</label>
                        <i class="form-control">{{Seleccion.Pedido.Estatus_surtido}}</i>
                    </div>
                    <hr />
                    <label>Productos <i class="badge bg-blue">{{Seleccion.Embarque.length}}</i></label>
                    <div style="width:1000px;overflow:auto;max-height:300px;">
                        <table class="table table-condensed" v-if="Seleccion.Embarque.length>0" id="pantallla_detalle_producto">
                            <thead>
                                <tr class="bg-primary">
                                    <th>CODIGO</th>
                                    <th>DESCRIPCION</th>
                                    <th>PEDIDO</th>
                                    <th>PENDIENTE</th>
                                    <th>EXISTENCIA</th>
                                    <th>EMBARQUE</th>
                                </tr>
                            </thead>
                            <tbody v-for="item in Seleccion.Embarque">
                                <tr :class="cantidad(item.embarque)">
                                    <th>{{item.cod_prod}}</th>
                                    <th>{{item.descripcion}}</th>
                                    <th>{{item.pedido}}</th>
                                    <th>{{item.pendiente}}</th>
                                    <th>{{item.disponible}}</th>
                                    <th>{{item.embarque}}</th>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else style="padding:50px" class="bg-danger">
                            <label>SIN PRODUCTOS !!!</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <i class="btn btn-success fa fa-file-excel-o" v-if="Seleccion.Embarque.length > 0" @click="ExportToExcel"> Exportar A Excel</i>
                <i class="btn btn-success fa fa-file-excel-o disabled" v-else > Exportar A Excel</i>
                <i class="btn btn-danger fa fa-close" style="float:right" @click="cerrar"> Cerrar</i>
            </div>
        </div>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';


    export default {
        name: 'ModalDetalle',
        props: ['Seleccion'],
        methods: {
            cerrar() {
                document.querySelector("#modal_detalle_embarque").style.display ="none"
            },
            cantidad(surtido) {

                return surtido>0 ? "bg-warning" : "bg-danger";
            },
            imprimir() {
                console.log("imprimir...");
                html2canvas(document.querySelector("#pantallla_detalle_producto")).then(canvas=> {
                var printWin = window.open(canvas.toDataURL('imagejpeg', 1.0), 'Barcode', 'width=1024,height=720,,top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no');
                printWin.focus();
                printWin.print();
                //printWin.close();

                });
            },
            ExportToExcel() {
                let htmlExport = jQuery('#pantallla_detalle_producto').prop("outerHTML"); //document.querySelector("#pantallla_detalle_producto");
                let ua = window.navigator.userAgent;
                let msie = ua.indexOf("MSIE ");
    
                //other browser not tested on IE 11
                // If Internet Explorer
                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
                {
                    jQuery('body').append(" <iframe id=\"iframeExport\" style=\"display:none\"></iframe>");
                    iframeExport.document.open("txt/html", "replace");
                    iframeExport.document.write(htmlExport);
                    iframeExport.document.close();
                    iframeExport.focus();
                    sa = iframeExport.document.execCommand("SaveAs", true, "Lista_Embarque.xls");
                }
                else {      
                    var link = document.createElement('a');
    
                    document.body.appendChild(link); // Firefox requires the link to be in the body
                    link.download = `Lista_Embarque-${this.Seleccion.Pedido.Folio}.xls`;
                    link.href = 'data:application/vnd.ms-excel,' + escape(htmlExport);
                    link.click();
                    document.body.removeChild(link);
                }
            },
        },
    }
</script>


