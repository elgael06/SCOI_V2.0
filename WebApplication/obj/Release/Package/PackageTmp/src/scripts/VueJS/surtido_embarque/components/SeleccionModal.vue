
<template>
    <div className="caja_contenedora_items">
        <div class="">
            <div class="form-group" style="width:70px;display:inline-block;">    
                <i class="btn btn-sm btn-warning" v-on:click="evMostrar('P')" >Pendiente</i>
                <div style="text-align:right" class="form-control">{{total_pendiente}}</div>
            </div>
            <div class="form-group" style="width:70px;display:inline-block;">
                <i class="btn btn-sm btn-info" v-on:click="evMostrar('S')" >Surtido</i>
                div style="text-align:right" class="form-control">{{total_surtido}}</div>
        </div>
        <div class="form-group" style="width:70px;display:inline-block;">          
            <i class="btn btn-sm btn-primary"  v-on:click="evMostrar('E')" >Total</i>
            <div style="text-align:right" class="form-control">{{total_embarque}}</div>
        </div>
        <ModalFiltroEmbarque v-bind:lista="filtro"></ModalFiltroEmbarque>
    </div>
</template>

<script>
    import ModalFiltroEmbarque from './ModalFiltroEmbarque'
    export default {
        props: ['total_pendiente', 'total_surtido','total_embarque'],
        name: 'SeleccionModal',
        components: {
            ModalFiltroEmbarque
        },
        data() {
            return {
                filtro: []
            }
        },
        methods: {
            //eventos
            evMostrar(filtro) {
                let datos = JSON.parse(localStorage.getItem("Embarque")) || [];
                this.filtro = (function () {
                    var resultado = () => null;
                    switch (filtro) {
                        case "P"://pendiente
                            resultado = pendiente => pendiente.embarque == 0;
                            break;
                        case "S"://surtido
                            resultado = surtido => surtido.embarque > 0;
                            break;
                        case "E"://embarque
                            resultado = embarque => embarque
                            break;
                    }
                    document.getElementById("ventana_filtro").style.display = "flex";
                    return datos.filter(resultado);
                }());
                console.log("Tabla=>", this.filtro);

            }
        }
    }
</script>

