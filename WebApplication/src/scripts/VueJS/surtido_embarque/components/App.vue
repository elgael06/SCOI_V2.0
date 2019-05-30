
<template>
    <div>
        <div v-if="existe_pedido">
            <div class="">
                <i class="btn btn-danger glyphicon glyphicon-trash btn-round" id="btn_cancelar_embarque_pedido" v-on:click="eliminar_embarque_localStorange"></i>
                <div class="form-inline" style="margin-left:-10px;width:120px;display:inline-block">
                    <label>Folio :</label>
                    <strong style="color:black">{{Pedido.Folio}}</strong>
                </div>
            </div>
        </div>
        <div class="" style="">
            <div class="form-group" style="width:95px;display:inline-block">
                <label>Del:</label>
                <div class="form-control" style="text-align: left">{{Pedido.Alterno}}</div>
            </div>
            <div class="form-group" style="width:95px;display:inline-block">
                <label>Al:</label>
                <div class="form-control" style="text-align: left">{{Pedido.Establecimiento}}</div>
            </div>
            <BuscarProducto v-bind:establecimiento="Pedido.Alterno" />
        </div>
    </div>
</template>


<script>
    import BuscarProducto from './BuscarProducto.vue'

    export default {
        data() {
            return {
                Pedido: JSON.parse(localStorage.getItem("Pedido")) || {},
                Embarque: JSON.parse(localStorage.getItem("Embarque")) || [],
            }
        },
        components: {
           BuscarProducto
        },
        created() {
            setTimeout(()=> document.querySelector("#entrada_codigo_producto").select(),100);
        },
        methods: {
            //eventos
            eliminar_embarque_localStorange() {
                let e = prompt("Escriba '1379' Para Confirmar Borrado!!!") || " ";
                if (e.toUpperCase() === '1379') {
                    console.log(e.toUpperCase())
                    if (confirm("Esta Seguro De Eliminar los Cambios De Embarque?")) {
                        localStorage.removeItem('Embarque');
                        localStorage.removeItem('Pedido');
                        this.Pedido = {};
                        this.Embarque = [];
                        return null;
                    }
                }
                else
                    alert("Eliminacion Cancelada!!!");
            },
            guardar_embarque() {
                guardar_embarque();
            }
            //funciones

        },
        computed: {
            total_pendiente() {
                return this.Embarque.filter(e => e.embarque == 0).length;
            },
            total_surtido() {
                return this.Embarque.filter(e => e.embarque > 0).length;
            },
            total_embarque() {
                return this.Embarque.length
            },
            existe_pedido() {
                return this.Pedido.Folio ? true : false;
            }
        }
    }
</script>