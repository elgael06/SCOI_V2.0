
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL + ":90/api/";


class Incicencias_apertura extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carga: 1,
            Folio: 4,
            Fecha: "",
            establecimientos: [],
            incidencias: [],
            seleccion: {}
        }
        this.obtener_estableciminetos();
        setTimeout(()=>this.efectoCarga(0),1000);
    }
    //eventos
    on_estableciminento(e) {
        const $folio = e.target.value;
        console.log(`Folio=${$folio}`);
        this.setState({ Folio: $folio, incidencias:[] });
    }
    on_recargar() {
        console.log(`Recargar`);
        this.state.Fecha != "" ?
            this.obtener_incidencias() :
            alert("Seleccione Fecha...");
    }
    on_fecha(e) {
        const $fecha = this.parseo_fecha( e.target.value );
        console.log(`Fecha=${$fecha}`);
        this.setState({ Fecha: $fecha, incidencias: [] });
    }
    on_resultados() {
        console.log("resultados");
    }
    on_seleccion_departamento(select) {
        document.querySelector("#modal_incidencias").style.display = "flex"; 
        console.log(select);
        this.setState({ seleccion:select});
    }
    //metodos
    parseo_fecha(f) {
        f = f.split("-");
        return f[2] + "-" + f[1] + "-" + f[0];
    }
    llenar_estableciminetos(lista) {
        console.log(lista);
        const folio = lista[0].folio;
        this.setState({ establecimientos: lista, Folio:folio });
    }
    llenar_incidencias(lista) {
        console.log(lista);
        setTimeout(() => this.efectoCarga(0),500);
        lista.length > 0 ?
            this.setState({ incidencias: lista }) : alert("Sin Datos A Mostrar!!!");
    }
    efectoCarga(estatus) {
        this.setState({carga:estatus});
    }
    //conexiones
    obtener_incidencias() {
        const { Folio, Fecha } = this.state;
        this.efectoCarga(1);
        console.log(Folio, Fecha);
        fetch(`${$URL_API}IncidenciasObservacionesApertura?Folio=${Folio}&Fecha=${Fecha}`,
            {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()
                .then(lista => this.llenar_incidencias(lista.Observaciones)))
            .catch(err => console.log("error=>",err));
    }
    obtener_estableciminetos() {
        fetch(`${$URL_API}obtener_establecimientos`,
            {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json().then(lista => this.llenar_estableciminetos(lista)))
            .catch(err => console.log("error=>", err));
    }
    //render
    render() {
        const { establecimientos, incidencias, carga,seleccion} = this.state;
        return (
            <div className="panel panel-default">
                <Cavecera
                    estableciminetos={establecimientos}
                    evEstablecimiento={e=>this.on_estableciminento(e)}
                    evRecargar={() => this.on_recargar()}
                    evFecha={e => this.on_fecha(e)}
                    evResultados={()=>this.on_resultados()}
                />
                <Departamentos
                    departamentos={incidencias}
                    evSeleccion={(e)=>this.on_seleccion_departamento(e)}
                />
                <IncidenciasDepartamento
                    titulo={seleccion.Cuestionario ||"NA"}
                />

                <EfectoCargar
                    estatus={carga}
                />
            </div>
            );
    }
}

const Cavecera = ({ estableciminetos, evEstablecimiento, evRecargar, evFecha, evResultados }) => {

    return (
        <div className="panel-heading">
            <strong>Incidencias</strong>
            <hr />
            <select className="form-control"
                onChange={evEstablecimiento}
                style={{width:"280px",display:"inline-block"}}>
                {
                    estableciminetos.map(e => <option value={e.folio}>{e.nombre}</option>)
                }
            </select>
            <i className="btn btn-success fa fa-refresh"
                style={{marginLeft:"10px",fontSize:"16px",borderRadius:"20px"}}
                onClick={evRecargar}></i>
            <input type="date"
                className="btn btn-default"
                onChange={evFecha}
                style={{ marginLeft: "10px" }}
            />
            <i className="btn btn-primary fa fa-table"
                style={{ marginLeft: "10px", fontSize: "20px"}}
                onClick={evResultados}></i>
        </div>
        );
}
const Departamentos = ({ departamentos, evSeleccion }) => {

    const ViewDepartamento = ({ departamento }) => {
        const indicardor = e => e > 0 ? "#eea236" : "#FFFFFF";
        return (
            <div className="viewDepartamento" onClick={() => evSeleccion(departamento)} >
                <strong className="fa fa-list" style={{ float: "left", padding: "10px" ,fontSize:"25px"}}></strong>
                <h4 style={{ borderBottom: `solid 15px ${indicardor(departamento.NoResueltas)}` }}>{departamento.Cuestionario}</h4>
                <span className="contenedor_indicadores_por_departamento">
                    <label className="btn btn-success" >
                        {departamento.Solucionadas}
                        <i className="fa fa-calendar-check-o"></i>
                    </label>
                    <label className="btn btn-default">
                        {departamento.NoAplica}
                        <i className=" 	fa fa-calendar-minus-o"></i>
                    </label>
                    <label className="btn btn-warning">
                        {departamento.NoResueltas}
                        <i className="fa fa-calendar-o"></i>
                    </label>
                    <label className="btn btn-danger">
                        {departamento.SinSolucion}
                        <i className="fa fa-calendar-times-o"></i>
                    </label>
                </span>
            </div>
            );
    }

    return (
        <div className="panel-body"
            id="contenedor_viewDepartamentos">
            {
                departamentos.map(e => <ViewDepartamento departamento={e} />)
            }
        </div>
        );
}

const IncidenciasDepartamento = ({ titulo }) => {
    const cerrar=()=>{
        document.querySelector("#modal_incidencias").style.display = "none"; 
    }
    return (
        <div className="animate" id="modal_incidencias">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <i className="fa fa-close close" onClick={cerrar}></i>
                    <h4><i className="fa fa-edit"></i>  {titulo}</h4>
                </div>
                <div className="panel-body">

                </div>
            </div>
        </div>
        );
}

if (location.protocol != "http:")
    location.protocol = "http:";

ReactDOM.render( <Incicencias_apertura/>,document.querySelector("#root") );
