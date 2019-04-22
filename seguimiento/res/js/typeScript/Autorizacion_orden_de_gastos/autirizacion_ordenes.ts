interface Autorizacion {
    folio               : number;
    proveedor           : string;
    consepto_solicitud  : string;
    descripcion_gasto   : string;
    establecimiento     : string;
    importe_total       : number;
    usuario_solicita    : string;
    fecha               : string;
    estatus             : string;
    fecha_autorizacion  : string;
    usuario_autorizo    : string;
    tipo_proveedor      : string;
}
interface RespuestaGastos {
    folio                : number;
    cod_estab            : number;
    establecimiento      : string;
    descripcion_producto : string;
    cantidad             : number;
    precio_unitario      : number;
    descripcion_gasto    : string;
    cod_prv              : number;
    proveedor            : string;
    tipo_proveedor       : string;
    importe_total        : number;
    usuario_solisito     : number;
    usuario_solicita     : string;
    fecha                : Date;
    fecha_autorizacion   : Date;
    estatus              : string;
    usuario_autorizo     : string;
}
interface RespuestaEstado {
    folio: number;
    estatus: string;
    autorizo: number;
    solicito: number;
    equipo: string;
    descripcion: string;
    contenido_correo: string;
}
const moneyFormat = (numero_:number) => {

    const decimal_con_cero = (i) => i > 9 || i.search(0) > -1 ? i : i + "0";
    const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

    const numero_string = numero_.toString();
    const decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    const unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return `$${unidades}.${decimal}`;
}
function redondeo(numero: number) {
    return Math.round(numero * 100) / 100;
}

class Autorizacion_gastos {
    Lista_gastos        : Autorizacion[];
    gasto_seleccionado  : Autorizacion;
    registros           : number;
    estatus             : string;
    input_registros     = document.getElementById("numero_de_registros");
    tabla_datos         =  document.getElementById("datos_gastos");

    constructor() {
        this.estatus = "0";
    }
    /*Eventos*/
    public on_estatus(estatus:any) {
        console.log(estatus.value);
        this.estatus    = estatus.value;
        this.Lista_gastos   = [];
        this.getRegusitro(0);
    }
    public getRegusitro(numero:number){
        this.registros = numero;
        this.input_registros.textContent = numero.toString();
        this.Llenar_tabla();
    } 
    private Llenar_tabla() {
        var $lista = "";
        this.tabla_datos.removeChild;

        this.Lista_gastos.forEach((gasto: Autorizacion) => {
            $lista += `
            <tr >
                <th style="text-align:right">${gasto.folio}</th>
                <td>${gasto.proveedor}</td>
                <td>${gasto.consepto_solicitud}</td>
                <td>${gasto.descripcion_gasto}</td>
                <td>${gasto.establecimiento}</td>
                <td style="text-align:right">${moneyFormat(redondeo(gasto.importe_total))}</td>
                <td>${gasto.usuario_solicita}</td>
                <td>${gasto.fecha}</td>
                <td>${gasto.estatus}</td>
                <td>${gasto.fecha_autorizacion}</td>
                <td>${gasto.usuario_autorizo}</td>
                <td>${gasto.tipo_proveedor}</td>
                <td style="width:30px;position:sticky;right:1px;z-index:980;background-color:rgba(194, 214, 214,16)">
                    <i class="btn btn-success" onclick='evento_Folio(${gasto.folio})' style="font-size:28px;border-radius:40px">
                        <i class="fa fa-edit"></i>
                    </i>
                </td>
            </tr>`
        });
        this.tabla_datos.innerHTML = $lista;
    }
}

const gastos = new Autorizacion_gastos();
var respuesta= {
    folio:0,estatus:"",
    autorizo:0,
    solicito:0,
    equipo:0,
    descripcion:"",
    contenido_correo:""
};

const evento_Folio = (folio:number) => {
    const obtener_orden_gastos_folio = (orden: Autorizacion) => {
        gastos.gasto_seleccionado = orden;
        document.getElementById("carga").style.display = "flex";
        fetch("servicios/Atorizacion_Orden_de_GastoServ.asmx/obtener_orden_gastos_folio",
            {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify({ folio:folio}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => e.json().then((respuesta: any) => {
                document.getElementById("carga").style.display = "none";
                Llenar_datos_modal(orden, respuesta.d);
            }))
        .catch(err=>console.error(err))
    }
    const Llenar_datos_modal = (orden: Autorizacion, datos: RespuestaGastos[]) => {
        const $tabla_ = document.getElementById("datos_detalle_gasto");
        var $lista = "";
        console.log("Seleccion:",orden);
        console.log("Respuesta=>", datos);
        document.getElementById("folio_modal").textContent = orden.folio.toString() ;
        document.getElementById("estatus_modal").textContent = orden.estatus;
        document.getElementById("establecimiento_modal").textContent = orden.establecimiento;
        document.getElementById("concepto_modal").textContent = orden.consepto_solicitud;
        document.getElementById("solicita_modal").textContent = orden.usuario_solicita;
        document.getElementById("tipo_modal").textContent = orden.tipo_proveedor;
        document.getElementById("proveedor_modal").textContent = orden.proveedor;
        document.getElementById("detalle_modal").textContent = orden.descripcion_gasto;

        $tabla_.removeChild;

        datos.forEach((gasto: RespuestaGastos, index: number) => {
            if (index == 0)
                respuesta.solicito = gasto.usuario_solisito;
            $lista += `
                <tr>
                    <td>${gasto.descripcion_gasto}</td>
                    <td style="text-align:right">${redondeo(gasto.cantidad)}</td>
                    <td style="text-align:right">${moneyFormat(redondeo(gasto.precio_unitario))}</td>
                    <td style="text-align:right">${moneyFormat(redondeo(gasto.importe_total))}</td>
                </tr>
            `;
        });
        $tabla_.innerHTML = $lista;

        document.getElementById("modal_detalle_gasto").style.display = "flex";
    }

    console.log(folio);
    const $seleccion = gastos.Lista_gastos.filter(e => e.folio == folio) || [];

    if ($seleccion.length > 0) {
        obtener_orden_gastos_folio($seleccion[0]);
    }
}
const cambiar_estatus_gasto = (estatus:string) => {
    console.log("Estatus=>", estatus);
    console.log(gastos.gasto_seleccionado);
    respuesta.folio = gastos.gasto_seleccionado.folio;
    respuesta.estatus = estatus;
    respuesta.descripcion = gastos.gasto_seleccionado.descripcion_gasto;

    console.log(respuesta);

}

const tabla_principal = () => {

    const Obtener_gastos = () => {
        console.log(gastos.estatus);
        if (gastos.estatus!="0") {
            document.getElementById("carga").style.display = "flex";
            fetch("servicios/Atorizacion_Orden_de_GastoServ.asmx/obtener_orden_gastos",
                {
                    method: 'post',
                    credentials: 'same-origin',
                    body: JSON.stringify({ estatus: gastos.estatus }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(e => {
                    e.json().then(res => {
                        document.getElementById("carga").style.display = "none";
                        console.log(res.d);
                        if (res.d.length > 0) {
                            gastos.Lista_gastos = res.d;
                            gastos.getRegusitro(gastos.Lista_gastos.length);
                        } else {
                            alert("Sin Datos A Mostrar!!!");
                        }
                    })
                })
                .catch(error => {
                    console.log(`Se Presento El Siguiente Error ${error}`);
                    document.getElementById("carga").style.display = "none";
                });
        } else alert("seleccione Estatus!!!");
    }

    const btn_estatus = document.getElementById("estatus");
    const btn_refrescar = document.getElementById("btn_refrescar");

    document.getElementById("btn_aceptar_estatus").addEventListener("click",    () => cambiar_estatus_gasto("aceptar"));
    document.getElementById("btn_cancelar_estatus").addEventListener("click",   () => cambiar_estatus_gasto("cancelar"));
    document.getElementById("btn_negar_estatus").addEventListener("click",      () => cambiar_estatus_gasto("negar"));  

    btn_estatus.addEventListener("change", () => gastos.on_estatus(btn_estatus));
    btn_refrescar.addEventListener("click",Obtener_gastos);

    document.getElementById("carga").style.display = "none";
    console.clear();
    console.info("listo...");
}

setTimeout(tabla_principal, 1000);

