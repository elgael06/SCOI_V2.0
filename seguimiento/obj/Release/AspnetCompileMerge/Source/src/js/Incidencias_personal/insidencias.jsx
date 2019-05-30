
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL + ":90/api/"

class ObjIncidencia {
    constructor() {
        this.Checador="",
        this.Color="#FFFFFF",
        this.Descripcion= "",
        this.Folio= -1,
        this.Incidencia= 0,
        this.Nombre= "",
        this.Puesto=""
    }
}

class Incidencias extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            Establecimiento: 0,
            diferencia: 0,
            Departamentos: [],
            Establecimientos: [],
            Seleccion: {},
            Incidencia: new ObjIncidencia(),
            vistaReporte:0
        }

        this.Seleccion_departamento = this.on_departamento.bind(this);

        this.incidencia = this.on_incidencia.bind(this);
        this.incidencia_detalle = this.on_incidencia_detalle.bind(this);

        this.cambioIncidencia = this.on_cambio_incidencia.bind(this);
        this.cambioIncidencia_detalle = this.on_cambio_incidencia_descripcion.bind(this);

        this.evGuardarCambioEmpleado = this.on_guardar_cambio_Incidencia_empleado.bind(this);
        this.evGuardarCambioEmpleado_detalle = this.on_guardar_observaciones_incidencia.bind(this);

        this.evReporte = this.on_reporte.bind(this);

        this.guardado = this.on_guardar_incidemcas_departamento.bind(this);

        setTimeout(() => document.getElementById("pantalla_carga").style.display = 'none', 1000);
        setTimeout(this.ObtenerEstablecimientos(), 100);
    }
    /*eventos*/
    on_establecimiento(e) {
        console.log(e.target.value);
        this.setState({Establecimiento:e.target.value,Departamentos:[]});
    }
    on_dia(e) {
        this.setState({ diferencia: e.target.value, Departamentos: [] });
    }
    on_recargar() {
        this.setState({ Departamentos: [] });
        this.ObtenerDepartamentos();
    }
    on_departamento(departamento) {
        console.log(departamento);
        this.setState({ Seleccion: departamento });
        document.getElementById("modal_incidencias").style.display = "flex";
    }
    on_incidencia(pocision) {
        this.Seleccion_incidencia(pocision);
        console.log("Incidencia=>", this.state.Incidencia);
        document.querySelector("#Cambio_incidencia").style.display = "flex";
    }
    on_incidencia_detalle(pocision) {
        this.Seleccion_incidencia(pocision);
        console.log("Detalle=>", this.state.Incidencia);
        document.querySelector("#Cambio_incidencia_observacion").style.display = "flex";
    }
    on_cambio_incidencia({ Color, Criterio }) {
        const dato = this.state.Incidencia;

        dato.Color = Color;
        dato.Checador = Criterio;

        this.setState({Incidencia:dato});
    }
    on_cambio_incidencia_descripcion(Descripcion) {
        const dato = this.state.Incidencia;

        dato.Descripcion = Descripcion.target.value;

        this.setState({ Incidencia: dato });
    }
    on_guardar_cambio_Incidencia_empleado() {

        const { Checador, Color, Folio } = this.state.Incidencia;
        const { Seleccion } = this.state;
        const { Lista } = Seleccion;
        const $posicion = Lista.findIndex(e => e.Folio == Folio);
        const $seleccion = Lista.find(e => e.Folio == Folio);

        $seleccion.Checador = Checador;
        $seleccion.Color = Color;

        Lista[$posicion] = $seleccion;

        this.setState({ Seleccion: Seleccion });
        document.querySelector("#Cambio_incidencia").style.display = "none";
    }
    on_guardar_observaciones_incidencia() {
        console.log("Guardado=>", this.state.Seleccion);
        document.querySelector("#Cambio_incidencia_observacion").style.display = "none";

        const { Folio,Descripcion } = this.state.Incidencia;
        const { Seleccion } = this.state;
        const { Lista } = Seleccion;
        const $posicion = Lista.findIndex(e => e.Folio == Folio);
        const $seleccion = Lista.find(e => e.Folio == Folio);

        $seleccion.Descripcion = Descripcion;

        Lista[$posicion] = $seleccion;

        this.setState({ Seleccion: Seleccion });
    }
    on_guardar_incidemcas_departamento() {
        const { Seleccion } = this.state;
        this.Cargando(1);
        console.log("Datos=>", Seleccion);
        this.enviarDatosGuardar(Seleccion);
    }
    on_reporte(estado) {
        this.setState({ vistaReporte: estado });
        document.querySelector('#modal_reporte').style.display = estado == 1 ? 'flex' : '';
    }
    /*Metodos*/
    LlenarEstablecimientos(lista) {
        this.setState({ Establecimientos: lista, Establecimiento: lista[0]["folio"] });
        this.Cargando(0);
    }
    LlenarDepartamentos(lista) {
        this.setState({ Departamentos: lista });
        this.Cargando(0);
    }
    Cargando(estado) {
        if (document.getElementById("pantalla_carga"))
            document.getElementById("pantalla_carga").style.display = estado == 1 ? 'flex' : 'none';
    }
    Seleccion_incidencia(pocision) {
        const $seleccion = this.state.Seleccion.Lista[pocision] || null;
        if (Selection != null) {
            console.log("Seleccion => ", $seleccion);
            const $incidencia = {
                Checador: $seleccion.Checador,
                Color: $seleccion.Color,
                Descripcion: $seleccion.Descripcion,
                Folio: $seleccion.Folio,
                Incidencia: $seleccion.Incidencia,
                Nombre: $seleccion.Nombre,
                Puesto: $seleccion.Puesto
            }
            this.setState({ Incidencia: $incidencia });
        }
    }
    QuitarSeleccion(respuesta) {
        this.Cargando(0);
        console.log("respuesta=>", respuesta);
        alert("Guardado...");
        document.querySelector("#modal_incidencias").style.display = "none";
        this.setState({ Seleccion: {} });
        this.ObtenerDepartamentos();
    }
    /*Conexiones*/
    ObtenerEstablecimientos() {
        this.Cargando(1);
        fetch(`${$URL_API}obtener_establecimientos`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json().then(e=>this.LlenarEstablecimientos(e)))
        .catch(err=>console.log(err))
    }
    ObtenerDepartamentos() {
        this.Cargando(1);
        fetch(`${$URL_API}Pesonal_Incidencia/?folio=${this.state.Establecimiento}&diferencia=${this.state.diferencia}`, {
            method: 'get',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json().then(e=>this.LlenarDepartamentos(e)))
        .catch(err=>console.log(err))
    }
    enviarDatosGuardar(Seleccion) {
        const { Lista } = Seleccion;
        fetch(`${$URL_API}PersonalInsidenciasGuardar?capturo=${parseInt(ID_SCOI)}&fecha=${Seleccion.Dia}`, {
            method: 'post',
            body: JSON.stringify(Lista),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })  
            .then(res => res.json().then(e => this.QuitarSeleccion(e)))
            .catch(err => console.log(err))
    }
    render() {
        const { Establecimiento, Establecimientos, diferencia, Departamentos, Seleccion, Incidencia, vistaReporte } = this.state;
        let seleccionado = Establecimientos.find(e => e.folio == Establecimiento) || {}; 
        return (
            <div className="panel panel-default">
                <Cavecera
                    establecimientos={Establecimientos}
                    diferencia={diferencia}
                    evEstablecimiento={e=> this.on_establecimiento(e)}
                    evDia={e=>this.on_dia(e)}
                    evReload={()=>this.on_recargar()}
                />
                <TablaDepartamentos
                    Departamentos={Departamentos}
                    evDepartamento={this.Seleccion_departamento}
                />
                <ModalChecarIncidencias
                    depatamento={Seleccion}
                    evIncidencia={this.incidencia}
                    evDescripcion={this.incidencia_detalle}
                    evGuardar={this.guardado}
                />
                <ModalCambioIcidecia
                    empleado={Incidencia}
                    listaInsidencias={Seleccion.Criterios || []}
                    evCambiarPuesto={this.cambioIncidencia}
                    evGuardar={this.evGuardarCambioEmpleado}
                />
                <ModalAgregarObservaciones
                    empleado={Incidencia}
                    evObservaciones={this.cambioIncidencia_detalle}
                    evGuardar={this.evGuardarCambioEmpleado_detalle}
                />
                <Resultados
                    Establecimiento={seleccionado}
                    Departamentos={Departamentos}
                    evReporte={this.evReporte}
                />
                <Cargar
                    nombre={"pantalla_carga"}
                />
            </div>
         );
    }
}
const Cargar = ({ nombre }) => {
    return (
        <div id={nombre}
            style={{
                display: "flex",
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(242, 242, 242, 0.79)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                fontSize: "40px"
            }}>
            <label id={nombre + 1}>
                <i className="fa fa-circle-o-notch rotate" ></i>
                <strong style={{ fontSize: "20px" }}> Cargando...</strong><br />
            </label>
        </div>
    )
}
const Cavecera = ({  establecimientos,dia,evEstablecimiento,evDia,evReload}) => {
    return (
        <div className="panel-heading">
            <div id="contenedor_establecimiento">
                <strong>Establecimiento</strong>
                <select className="form-control" onChange={evEstablecimiento}>
                    {
                        establecimientos.map(elemento => <option value={elemento.folio}>{elemento.nombre}</option>)
                    }
                </select>
            </div>
            <div id="contenedor_diferencia">
                <strong>Dias Diferencia:</strong>
                <select className="form-control" default={dia} onChange={evDia}>
                    <option value="0">Hoy</option>
                    <option value="1">Ayer</option>
                    <option value="2">Hace 2</option>
                    <option value="3">Hace 3</option>
                    <option value="4">Hace 4</option>
                    <option value="5">Hace 5</option>
                    <option value="6">Hace 6</option>
                </select>
            </div>
            <i className="btn btn-success" id="recargar" title="Recargar"
                onClick={evReload}
            >
               <i className=" fa fa-refresh"></i>
            </i>
        </div>
        );
}

const TablaDepartamentos = ({ Departamentos ,evDepartamento}) => {
    const CuerpoTabla = () => {
        return Departamentos.map(dep => {
            return (<ViewDepartamento depatamento={dep} />)
        });
    }
    const ViewDepartamento = ({ depatamento }) => {
        const color = estado => estado ? "panel panel-success ViewDepartamento" : "panel panel-default ViewDepartamento"; 
        return (
            <div className={color(depatamento.Revicion)}>
                <div className="panel-heading">
                    <i className="fa fa-calendar" style={{ float: "left", fontSize: "25px"}}> </i>
                    <h4 style={{marginLeft:"35px"}}> {depatamento.Descripcion}</h4>
                </div>
                <div className="panel-body">
                    <label style={{width:"200px"}} >
                        <i className="fa fa-users" style={{ float: "left", marginLeft: "5px", color: "#000000", fontSize: "20px"}}> </i>
                        <h4 style={{ marginLeft: "35px",color:"#000000"}}>Plantilla</h4>
                        <span style={{width:"40%"}}>
                            <strong>Autorizada :</strong> {depatamento.Plantilla_autorizada}.
                        </span>
                        <span style={{ width: "40%", marginLeft: "15px"}}>
                            <strong>Real :</strong> {depatamento.Plantilla_real}.
                        </span>
                    </label>
                    <i className="btn btn-primary btn_check"
                        onClick={() => evDepartamento(depatamento)}
                        style={{ fontSize: "25px", borderRadius: "34px" }}>
                        <i className="fa fa-edit"></i>
                    </i>
               </div>
        </div>);
    }

    return (<div className="panel-body" id="cuerpo_tabla">
            <h4>Departamentos</h4>
            <div className="panel-group">
                <CuerpoTabla />
            </div>
        </div> );
}

const ModalChecarIncidencias = ({ depatamento, evIncidencia, evDescripcion, evGuardar }) => {

    const ListaPlantilla=()=> {
        const $lista = depatamento.Lista || [];
        const incidencia = incidencia => "btn " + (incidencia > 0 ? "btn-success fa fa-calendar-check-o" : " btn-default fa fa-calendar-minus-o");
        return (
            $lista.map((e,p) =>
                <div style={{ fontSize: "12px" }} className="panel panel-info indicador_empleado">
                    <div style={{ height: "60px", fontSize: "18px" }}
                        className="panel-heading">
                        <i className="fa fa-user" style={{ float: "left", fontSize: "20px" }}></i>
                        <strong style={{ color: "#000000",marginLeft:"20px"}}>{e.Nombre}</strong>
                        <i className={incidencia(e.Incidencia)} style={{float:"right",fontSize:"20px"}}></i>
                    </div>
                    <div style={{ height: "70px" }}
                         className="panel-body">
                        <label>{e.Puesto}</label>
                        <i className="btn btn-primary" style={{ float: "right", borderRadius: "30px", fontSize: "15px" }}
                            onClick={() => evDescripcion(p)}
                        >
                            <i className="fa fa-commenting-o"></i>
                        </i>
                        <i className="btn btn-default fa fa-edit"
                            onClick={() => evIncidencia(p)}
                            style={{ float: "right", fontSize: "15px", marginRight: "15px" }}>
                            <strong style={{ marginLeft:"5px"}}>
                                {e.Checador}
                            </strong>
                            <i className="btn btn-default fa fa-exchange"
                               style={{ background: e.Color, marginLeft: "5px", borderRadius: "23px" }}>
                            </i>
                        </i>
                    </div>
                </div>)
            );
    }

    return (<div id="modal_incidencias"
            className="modal_incidencias">
            <div className="panel panel-default">
                <div className="panel-heading" style={{color:"#FFFFFF", background:"#4dc3ff"}}>
                    <i className="btn btn-danger fa fa-close" style={{ float: "right", fontSize:"18px" }}
                        onClick={() => document.getElementById("modal_incidencias").style.display="none"}
                    ></i>
                    <i className="fa fa-edit" style={{float:"left"}}></i>
                    <h4 style={{marginLeft:"40px"}}>{depatamento.Descripcion|| ""}</h4>
                </div>
                <div className="panel-body" style={{ height: "90%" }}>
                    <h3>Plantilla Dia {depatamento.Dia || ""}</h3>
                    <div style={{ height: "87%", overflow: "auto", border: "solid #bfbfbf 1px", background:"#f2f2f2"}}>
                        <ListaPlantilla />
                    </div>
                    <i className="btn btn-success btn-block" onClick={evGuardar} style={{marginTop:"10px"}}>
                        <strong>Guardar</strong>
                        <i className="fa fa-download" style={{marginLeft:"5px"}}></i>
                    </i>
                </div>
            </div>
        </div> );
}

const BtnCriterio = ({ color, criterio, evento }) => {
    return (<label
        className="btn btn-default"
        onClick={evento}
        style={{ background: color }} >
        {criterio}
    </label>);
}
const ModalCambioIcidecia = ({ empleado, listaInsidencias, evCambiarPuesto, evGuardar }) => {
    const { Nombre, Checador, Color, Descripcion, Puesto} = empleado;
    
    return (
        <div id="Cambio_incidencia"
            className="modal_incidencias">
            <div >
                <i id="btn_cerrar_incidencia" className="fa fa-close" onClick={() => document.querySelector("#Cambio_incidencia").style.display = "none"}></i>
                <strong>{Nombre}</strong>
                <hr />
                <BtnCriterio
                    color={Color}
                    criterio={Checador}
                />
                <div id="contenedor_criterios">
                    {
                        listaInsidencias.map(e => <BtnCriterio
                            color={e.Color}
                            criterio={e.Criterio}
                            evento={()=>evCambiarPuesto(e)}
                        />)
                    }
                </div>
                <i className="btn btn-success fa fa-save" id="guardar_cambio_incidencias" onClick={evGuardar}> Guardar</i>
            </div>
        </div>);
}

const ModalAgregarObservaciones = ({ empleado, evObservaciones, evGuardar }) => {
    const { Nombre, Checador, Color, Descripcion, Puesto } = empleado;

    return (
        <div id="Cambio_incidencia_observacion"
            className="modal_incidencias">
            <div >
                <i id="btn_cerrar_incidencia" className="fa fa-close" onClick={() => document.querySelector("#Cambio_incidencia_observacion").style.display = "none"}></i>
                <strong>{Nombre}</strong>
                <hr />
                <BtnCriterio
                    color={Color}
                    criterio={Checador}
                />
                <div id="contenedor_criterios_descripcion">
                    <textarea rows="4" className="form-control" cols="50" onChange={evObservaciones} value={Descripcion}></textarea>
                </div>
                <i className="btn btn-success fa fa-save" id="guardar_cambio_incidencias" onClick={evGuardar}>Guardar</i>
            </div>
        </div>
        );
}

const Resultados = ({ Establecimiento, Departamentos, evReporte }) => {
    const obtenerFecha = (fecha) => {
        let a = fecha.split(' ');
        return a[0];
    }
    const DepartamentosView = () => {
        return (Departamentos.map(e => [<tr  >
            <td style={{ color: "#FFFFFF", background: "#ff6a00", fontSize: '18px'  }}>#</td>
            <td style={{ color: "#FFFFFF", background: "#ff6a00", fontSize: '18px'  }} colSpan="2">{e.Descripcion}</td>
            <td style={{ color: "#FFFFFF", background: "#ff6a00", fontSize: '18px'  }}>{obtenerFecha(e.Dia)}</td>
        </tr>,
        <Empeados
            lista={e.Lista}
        />
        ]));
    }
    const Empeados = ({ lista }) => {
        return (lista.map(e => <tr>
            <td>{e.Folio}</td>
            <td>{e.Nombre}</td>
            <td>{e.Puesto}</td>
            <td style={{ background: e.Color }}>{e.Checador}</td>
        </tr>));
    }
    return (<div>
        <i className="btn btn-default fa fa-calendar" id="btn_reporte" onClick={() => evReporte(1)}> Reporte Asistencias Establecimineto.</i>
        <div className="modal_incidencias" id="modal_reporte">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-close" onClick={() => evReporte(0)}></i>
                    <strong>Reporte {Establecimiento['nombre'] || ''}</strong>
                </div>
                <div className="panel-body">
                    <table className="table" id="tabla_reporte_empleados">
                        {Departamentos ? <DepartamentosView /> : <p>Sin Datos</p> }
                    </table>
                </div>
                <i className="btn btn-success fa fa-file-excel-o"
                    onClick={e => tableToExcel("tabla_reporte_empleados", `Plantilla_${Establecimiento['nombre']}`)}
                    style={{ marginTop: "15px" }}>
                    <span style={{ marginLeft: "5px" }}>Guardar A Ecxel.</span>
                </i>
            </div>
        </div>
    </div>);
}


const tableToExcel = (() => {
    let uri = 'data:application/vnd.ms-excel;base64,';
    let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="https://www.w3.org/TR/html401/"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    const base64 = s => window.btoa(unescape(encodeURIComponent(s)));
    const format = (s, c) => s.replace(/{(\w+)}/g, (m, p) => c[p]);

    return (table, name) => {
        if (!table.nodeType) table = document.getElementById(table)
        let ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
})()

if (location.protocol != "http:")
    location.protocol = "http:";
ReactDOM.render(<Incidencias />,document.getElementById("root"));