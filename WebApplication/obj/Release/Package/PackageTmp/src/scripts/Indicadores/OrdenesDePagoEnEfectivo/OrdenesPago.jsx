

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
//Metodos 
const obtener_concepto_compra_gasto = lista => {
    let lista_conceptos = [];

    lista.forEach(c_g => {
        if (lista_conceptos.findIndex(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto) === -1 ) {
            lista_conceptos.push({
                concepto_compra_gasto: c_g.concepto_compra_gasto,
                establecimientos: lista.filter(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto)
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
                conceptos: lista.filter(e => e.cod_estab === esta.cod_estab)
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
                detalles: lista.filter(e => e.concepto_orden_de_pago === concep.concepto_orden_de_pago)
            });
        }
    });


    return lista_res;
}
/*Componentes*/
const TablaMonitor = ({ datos }) => {
    let conceptos = obtener_concepto_compra_gasto(datos || []);
    console.log(conceptos);
    return (<div style={{ height: "510px",overflow:"auto" }}>
        <table className="table">
            <tbody>
                {
                    conceptos.map(e => [
                        <tr name="conceptos">
                            <td>
                                <strong> {e.concepto_compra_gasto}</strong>
                            </td>
                        </tr>,
                        <VistaEstablecimiento
                            lista={e.establecimientos}
                        />
                    ])
                }
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
    </tr>);
}

const llenar_tabla_pagos = lista => {
    console.log("lista Pagos =>", lista);
    ReactDOM.render(<MostrarProveedores lista={lista} />, document.querySelector("#resultados_tabla"));
}

