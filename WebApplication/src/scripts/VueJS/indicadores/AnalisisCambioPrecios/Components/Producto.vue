
<template>
    <tbody v-if="filtros">
        <tr class="active">
            <td>Codigo</td>
            <td>Descripcion</td>
            <td>Costo Promedio</td>
            <td>Ultimo Costo</td>
            <td>Precio De Venta</td>
            <td>Precio De Oferta Actual</td>
            <td>Venta 90 Dias</td>
            <td>Margen</td>
            <td>Margen Meta</td>
            <td rowspan="2"><i :class="producto8020"></i></td>
        </tr>
        <tr>
            <td>{{producto.Codigo}}</td>
            <td>{{producto.Descripcion}}</td>
            <td>{{producto.Costo_promedio}}</td>
            <td>{{producto.Ultimo_costo}}</td>
            <td>{{producto.Precio_venta}}</td>
            <td>{{producto.Precio_oferta_actual}}</td>
            <td>{{producto.Venta_90_dias}}</td>
            <td>{{producto.Margen}}</td>
            <td>{{producto.Margen_familia}}</td>
        </tr>
        <tr class="active">
            <td>Precio Venta</td>
            <td>Margen</td>
            <td>Precio Captura</td>
            <td>Competencia</td>
            <td>Ley</td>
            <td>Soriana</td>
            <td>Teresita</td>
            <td>Bodart</td>
            <td>Mezquitillo</td>
            <td>Lopez</td>
        </tr>
        <tr>
            <td>
                $<input type="text" v-model="producto.Precio_venta_nvo" class="form-control" />
            </td>
            <td>
                <input type="text" v-model="producto.Margen_nvo" class="form-control" />%
            </td>
            <td rowspan="2">{{producto.Precio_venta_captura}}</td>
            <td class="active"><label>Normar</label></td>
            <td>{{producto.Competencias.Ley.Normal}}</td>
            <td>{{producto.Competencias.Soriana.Normal}}</td>
            <td>{{producto.Competencias.Teresita.Normal}}</td>
            <td>{{producto.Competencias.Bodart.Normal}}</td>
            <td>{{producto.Competencias.Mesquitillo.Normal}}</td>
            <td>{{producto.Competencias.Lopez.Normal}}</td>
        </tr>
        <tr>
            <td>Diferencia Margen</td>
            <td>{{diferenciaMargen}} %</td>
            <td class="active"><label>Oferta</label></td>
            <td>{{producto.Competencias.Ley.Oferta}}</td>
            <td>{{producto.Competencias.Soriana.Oferta}}</td>
            <td>{{producto.Competencias.Teresita.Oferta}}</td>
            <td>{{producto.Competencias.Bodart.Oferta}}</td>
            <td>{{producto.Competencias.Mesquitillo.Oferta}}</td>
            <td>{{producto.Competencias.Lopez.Oferta}}</td>
        </tr>
        <tr>
            <td colspan="10"></td>
        </tr>
    </tbody>
</template>

<script>
    export default {
        name: 'Producto',
        props: ['producto','Seleccion'],
        data() {
            return {
                difMargen: 0,
            }
        },
        computed: {
            producto8020() {
                return this.producto.Clasificacion8020 == "8020" ? "btn btn-info fa fa-shopping-cart" : "btn btn-default fa fa-info";
            },
            diferenciaMargen() {
                return this.producto.Margen - this.producto.Margen_nvo;
            },
            filtros() {
                let { Localizacion, Pasillo, Clase, Categoria, Familia, CanastaBasica, Color, Marca } = this.Seleccion;

                return (Localizacion == "Todos" || Localizacion == this.producto.Localizacion) && (Pasillo == "Todos" || Pasillo == this.producto.Pasillo) &&
                    (Clase == "Todos" || Clase == this.producto.Clase) && (Categoria == "Todos" || Categoria == this.producto.Categoria) &&
                    (Familia == "Todos" || Familia == this.producto.Familia) && (CanastaBasica == "Todos" || CanastaBasica == this.producto.CanastaBasica) &&
                    (Color == "Todos" || Color == this.producto.Color) && (Marca == "Todos" || Marca == this.producto.Marca)

            },
        },
    }
</script>
