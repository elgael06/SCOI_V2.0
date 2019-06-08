

<template>
    <div class="panel panel-default" style="margin-top:70px">

        <Controles v-bind:parametros="parametros"
                   v-bind:titulo="'Consulta Analisis Cambio De Precios'"
                   v-bind:estatus="this_Vigencia"
                   v-bind:cambio_vigencia="cambio_vigencia"
                   v-bind:consultar_pasillos="ConsultarAnalisis"
                   v-if="Analisis.Productos.length == 0" />
        <FiltroAnalisis v-else v-bind:parametros="Seleccion"
                        v-bind:Analisis="Analisis" />
        <div class="panel-body">
            <div style="height:400px;overflow:auto">
                <table class="table table-condensed" >
                    <Producto v-for="item in Analisis.Productos" v-bind:producto="item" v-bind:Seleccion="Seleccion" :key="item.Codigo" />
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Controles from '../../PreciosCompetencia/Components/Controles';
    import FiltroAnalisis from './FiltrosAnalisis'
    import Producto from './Producto'

    const $URL_API = "/api/";

    export default {
        components: {
            Controles,
            FiltroAnalisis,
            Producto,
        },
        data() {
            return {
                parametros: {
                    vigencia: "S",
                    fecha: "Enero",
                    anio: '2019'
                },
                Seleccion: {
                    Localizacion: "Todos",
                    Pasillo: "Todos",
                    Clase:"Todos",
                    Categoria: "Todos",
                    Familia: "Todos",
                    CanastaBasica: "Todos",
                    Color: "Todos",
                    Marca: "Todos",
                    Clasificacion8020: "Todos",
                },
                Analisis: {
                    Localizacion: [],
                    Pasillo: [],
                    Clase: [],
                    Categoria: [],
                    Familia: [],
                    CanastaBasica: [],
                    Color: [],
                    Marca: [],
                    Clasificacion8020: [],
                    Productos:[]
                }
            }
        },
        created() {

        },
        methods: {
    
            cambio_vigencia(tipo) {
                this.parametros.vigencia = tipo;
            },
            ConsultarAnalisis() {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                let url = `${$URL_API}monitor_precio_competencia/ConsultaAnalisisPrecioProducto?mes=${this.parametros.fecha}&filtro=${this.parametros.vigencia}&anio=${this.parametros.anio}`;
                fetch(url, {
                    method: 'get',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch(err => {
                        console.error("Error=>", err);
                        alert("fallo En La Consulta!!!");
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    }).then(res => res.json().then(respuesta => {
                        console.log("Consulta Finalizada...");
                        console.log(respuesta);
                        this.Analisis = respuesta;
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    }).catch(e=>alert("Error Faltal")))
            }
        },
        computed: {
            this_Vigencia() {
                return this.parametros.vigencia === "S";
            },
        }
    }
</script>
