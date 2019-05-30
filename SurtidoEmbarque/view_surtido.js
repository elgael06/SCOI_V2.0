/**
     Acceso a la localStorange para obtener los productos y de esa forma editar el surtido de productos
 */

const viewSurtido = new Vue({
    el: "#captura_surtido_view",
    data() {
        return {
            seleccion: {
                folio: 0,
                descripcion: "",
                existencia: 0,
                cantidad: 0,
                pedido: 0,
                surtido: '0000000',
                total: 0,
                operador: "+",
                punto: false,
            },
            Productos: [],
        }
    },
    created() {
        console.log("Funciona...");
        this.Productos = JSON.parse(localStorage.getItem("Embarque"));
    },
    updated() {
        this.seleccion.total = parseInt(this.seleccion.cantidad) + parseInt(this.seleccion.surtido) || 0;
    },
    methods: {
        //eventos
        on_guardad_cambios(event) {
            //alert("Listo...");
            event.preventDefault();
            document.querySelector("#captura_surtido_view").style.display = "none";
            document.querySelector("#main").style.display = "";
            document.querySelector("#entrada_codigo_producto").disabled = false;
            document.querySelector("#entrada_codigo_producto").select();
            init();
        },
        handle_cambio_surtir(value) {
            console.log("cambio")
            this.seleccion.surtido = this.seleccion.surtido.length > 0 ? this.checar_cantidad_maxima_surtido() : 0;
        },
        //Funciones
        checar_cantidad_maxima_surtido() {
            let { surtido } = this.seleccion;
            return surtido < 10000 ? parseInt( surtido ) : 9999;
        },
        obtener_seleccion(producto) {
            console.log("producto=>", producto);
            this.Productos = JSON.parse(localStorage.getItem("Embarque"));
            let filtro = this.Productos.find(e => parseInt(e.cod_prod) == parseInt(producto.Codigo));
            this.seleccion = {
                folio: producto.Codigo,
                descripcion: producto.Descripcion,
                existencia: producto.Existencia,
                cantidad: filtro.embarque,
                pedido: filtro.pedido,
                surtido: 0,
                total: filtro,
                operador: "+",
                punto: producto.decimales,
            };
            document.querySelector("#main").style.display = "none";
            document.querySelector("#captura_surtido_view").style.display = "";
            document.querySelector("#entrada_codigo_producto_vista").select();

        },
        cargarProductonLocalStorange(lista) {
            localStorage.setItem("Embarque", JSON.stringify(lista));
        },
    },
});


