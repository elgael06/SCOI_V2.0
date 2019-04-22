

class MostrarProveedores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro: "",
            seleccion:-1
        }
    }
    handle_filter(event) {
        
    }
    handle_beneficiary(select) {

    }
    render() {
        const { lista } = this.props;
        return (<div className="panel panel-info" style={{ height: "550px" }}>
            <p>Cantidad De Registros = <strong>{lista.length || 0}</strong></p>
            <TablaMonitor
                datos={lista}
            />
        </div>);
    }
}
/* Metodos */
const obtener_concepto_compra_gasto = lista => {
    let lista_conceptos = [];

    lista.forEach(c_g => {
        if (lista_conceptos.findIndex(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto) === -1 ) {
            lista_conceptos.push({
                concepto_compra_gasto: c_g.concepto_compra_gasto,
                establecimientos: lista.filter(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto),
                total: obtener_suma_total_lista( lista.filter(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto))
            });
        }
    });
    return lista_conceptos;
}
const obtener_establecimientos = lista => {
    let lista_establecimientos = [];
    lista.forEach(esta => {
        if (lista_establecimientos.findIndex(e => e.cod_estab === esta.cod_estab) === -1) {
            lista_establecimientos.push({
                cod_estab: esta.cod_estab,
                establecimimiento: esta.establecimimiento,
                conceptos: lista.filter(e => e.cod_estab === esta.cod_estab),
                total: obtener_suma_total_lista(lista.filter(e => e.cod_estab === esta.cod_estab))
            });
        }
    });

    return lista_establecimientos;
}
const obtener_conceptos = (lista) => {
    const lista_res = [];
    lista.forEach(concep => {
        if (lista_res.findIndex(e => e.concepto_orden_de_pago === concep.concepto_orden_de_pago) === -1) {
            lista_res.push({
                concepto_orden_de_pago: concep.concepto_orden_de_pago,
                detalles: lista.filter(e => e.concepto_orden_de_pago === concep.concepto_orden_de_pago),
                total: obtener_suma_total_lista( lista.filter(e => e.concepto_orden_de_pago === concep.concepto_orden_de_pago))
            });
        }
    });


    return lista_res;
}
const obtener_suma_total_lista = lista => {
    return moneyFormat (lista.map(e => e.cantidad).reduce((a, b) => a + b));
}
const moneyFormat = numero_ => {

    const decimal_con_cero = (i) => i > 9 || i.search(0) > -1 ? i : i + "0";
    const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

    const numero_string = function () {
        return Math.round(numero_ * 100) / 100;
    }().toString();
    const decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    const unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return `$ ${unidades || 0}.${decimal || 0}`;
}
const obtener_semanas_ocupadas_por_anio = lista => {
    const lista_meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    lista.sort((a, b) => a.anio_pago > b.anio_pago ? 1 : -1);

    let lista_anios = [];
    lista.forEach(anio => {
        if (lista_anios.findIndex(e => e.anio === anio.anio_pago) === -1) {
            let num_semana = semanas_obtenidas(lista.filter(e => e.anio_pago === anio.anio_pago));
            num_semana.sort((a, b) => lista_meses.findIndex(e => e == a.mes_pago) > lista_meses.findIndex(e => e == b.mes_pago) ? 1 : -1)
            lista_anios.push({
                anio: anio.anio_pago,
                meses: obtener_semanas_por_mes(num_semana),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_anios;
}
const obtener_semanas_por_mes = lista => {
    let lista_meses = [];
    lista.forEach(mes => {
        if (lista_meses.findIndex(e => e.mes === mes.mes_pago) === -1) {
            let num_semana = semanas_obtenidas(lista.filter(e => e.mes_pago === mes.mes_pago));
            num_semana.sort((a, b) => a.semana_del_anio_pago > b.semana_del_anio_pago ? 1 : -1)
            lista_meses.push({
                mes: mes.mes_pago,
                semanas: num_semana.map(e => e.semana_del_anio_pago),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_meses;
}
const semanas_obtenidas = semanas => {
    let num_semana = [];
    semanas.forEach(sem => {
        if (num_semana.findIndex(e => e.semana_del_anio_pago === sem.semana_del_anio_pago) === -1) {
            num_semana.push(sem);//semana_del_anio_pago
        }
    });
    return num_semana;
}
/* Componentes */
const CeldaTotal = ({ total }) => {
    return <td style={{ textAlign: "right" }}> <label>{total}</label></td>
}
const CaveceraTabla = ({ anios }) => {
    let lista = [],
        meses = [],
        semanas = [];

    console.log("anios=>", anios);
    //fila años
    lista.push(<tr>
        <th rowSpan="3"> <label>CONCEPTOS</label></th>
        {anios.map(e => {
         //agrega los meses
          meses = meses.concat(e.meses.map(m => m)) || meses;
          return <th colSpan={e.cantidad_semanas}>{e.anio}</th>
        })}
        <th rowSpan="3">
            <label>TOTAL</label>
        </th>
    </tr>);

    //fila meses 
    lista.push(<tr>
        {meses.map(m => {
            //agrega las semanas
            semanas = semanas.concat(m.semanas)
            return <th colSpan={m.cantidad_semanas}>{m.mes}</th>
        })}
    </tr>);

    //fila semanas 
    lista.push(<tr>
        {semanas.map(s => <th>{s}</th>)}
    </tr>);
        
    return lista;
}

const ObtenerSemanasResultados = ({ Lista }) => {
    let lista_semanas = [];

    return lista_semanas;
}

const TablaMonitor = ({ datos }) => {
    datos.sort((a, b) => a.establecimimiento > b.establecimimiento ? 1 : -1);
    let conceptos = obtener_concepto_compra_gasto(datos || []);

    console.log("conceptos=>",conceptos);
    return (<div style={{ height: "510px",overflow:"auto" }}>
        <table className="table">
            <thead>
                <CaveceraTabla
                    anios={obtener_semanas_ocupadas_por_anio(datos)}
                />
                
            </thead>
            <tbody>
                {conceptos.map(e => [
                <tr name="conceptos">
                    <td>
                        <strong> {e.concepto_compra_gasto}</strong>
                    </td>
                    <ObtenerSemanasResultados
                    />
                    <CeldaTotal 
                            total={e.total}
                    />
                </tr>,
                <VistaEstablecimiento
                    lista={e.establecimientos}
                />])}
            </tbody>
        </table>
    </div>);
}

const VistaEstablecimiento = ({ lista }) => {
    let establecimientos = obtener_establecimientos(lista || []);
    console.log(establecimientos);
    return establecimientos.map(e => [
        <tr name="estalbelcimientos">
            <td>
                <strong>{e.establecimimiento}</strong>
            </td>
            <CeldaTotal total={e.total} />
        </tr>,
        <VistaConceptos
            lista={e.conceptos}
        />]);
}

const VistaConceptos = ({ lista }) => {
    let conceptos = obtener_conceptos(lista);
    console.log("conceptos=>",conceptos)
    return conceptos.map(e => <tr name="ordenes">
        <td>
            <label>{e.concepto_orden_de_pago}</label>
        </td>
        <CeldaTotal total={e.total} />
    </tr>);
}

const llenar_tabla_pagos = lista => {
    console.log("lista Pagos =>", lista);
    ReactDOM.render(<MostrarProveedores lista={lista} />, document.querySelector("#resultados_tabla"));
}

