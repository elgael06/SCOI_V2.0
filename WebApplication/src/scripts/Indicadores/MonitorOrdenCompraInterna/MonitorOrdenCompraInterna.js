
///Globales/Tipo_orden_compra_interna
//api/obtener_establecimientos
//ObtenerMonitorOrdenCompraInterna?f1="",f2=""&tipo_orden="S"&estatus="S"&tipo_recibe=""&recibe=0&establecimiento=0&cod_prod="0"

let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "/api/";


const pase_fecha = fecha => {
    let f = fecha.split("-");
    return `${f[2]}-${f[1]}-${f[0]}`
}

const parametros = new Vue({
    el: "#cavecera_monitor",
    data: {
        parametros: {
            fi: '2019-01-01',
            ff: '2019-01-01',
            tipo_orden: 'S',
            estatus: 'SURTIDO',
            tipo_recibe: 'Todos',
            recibe: 0,
            nombre_recibe:"",
            establecimiento: 0,
            cod_prod:'0'
        },
        btn_parametros: {
            icono: "fa fa-close",
            descripcion: "Falta Colocar Parametros.",
            estado:"btn btn-danger btn-round"
        },
        ListaEstablecimientos: [],
        ListaTipoOrden:[]
    },
    created() {
        console.log("Parametros...");
        this.obtener_establecimientos();
        this.obtener_tipoOrden();
        comprovar_btn_parametros();
    },
    updated() {
        //console.log("parametros=>",this.parametros);
        this.parametros_correctos;
    },
    methods: {
    //eventos
    //funciones
        comprovar_btn_parametros() {
            let est = !this.parametros_correctos;
            this.btn_parametros.btn_parametros = {
                icono: est ? "fa fa-close" :"fa fa-download",
                descripcion: est ? "Falta Colocar Parametros.":"Consultar orden De Compra Interna.",
                estado: est ? "btn btn-danger btn-round" :"btn btn-success btn-round"
            };
        },
    //conexiones
        obtener_establecimientos() {
            fetch(`${$URL_API}obtener_establecimientos`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    this.ListaEstablecimientos = lista;
                }))
        },
        obtener_tipoOrden() {
            fetch(`${$URL_MVC}Tipo_orden_compra_interna`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    this.ListaTipoOrden = lista;
                    this.parametros.tipo_orden = lista[0];
                }))
        },
        obtener_consulta() {
            let { fi, ff, tipo_orden, estatus, tipo_recibe, recibe, nombre_recibe, establecimiento, cod_prod } = this.parametros;
            let f1 = pase_fecha(fi);
            let f2 = pase_fecha(ff);
            fetch(`ObtenerMonitorOrdenCompraInterna?f1=${f1}&f2=${f2}&tipo_orden=${tipo_orden}&estatus=${estatus}&tipo_recibe=${tipo_recibe}&recibe=${recibe}&establecimiento=${establecimiento}&cod_prod=${cod_prod}`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    console.log("Respuesta=>",lista);
                }))
        }
    },
    computed: {
        parametros_correctos() {
            let { fi, ff, estatus, tipo_recibe, recibe, nombre_recibe, establecimiento, cod_prod } = this.parametros;
            let estatus_ = false;

            this.parametros.recibe = this.recibe ? this.parametros.recibe : 0;
            estatus_ = fi != "" && ff != "" && this.recibe;

            return estatus_;
        },
        recibe() {
            this.parametros.recibe = this.parametros.tipo_recibe != "Todos" ? this.parametros.recibe : 0;
            return this.parametros.tipo_recibe == "Todos" || this.parametros.recibe!=0;
        }
    }
});