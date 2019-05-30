
class CaveceraSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folio_es: -1,
            lista_establecimientos: [],
            lista_responsables:[],
        }
        this.Obtener_establecimienos();
    }
    render() {
        return (
            <div className="panel-heading row" style={{"width":"95%","marginLeft":"2%"}}>
                <Selector_establecimientos lista={this.state.lista_establecimientos}
                    activo={this.state.folio_es}
                    seleccion={(establecimiento) => this.seleccion_est(establecimiento)} />
                <Selector_responsable nombre={this.props.responsable} />
                <Vista_cuestionario nombre={this.props.cuetionario} />
                <i className="btn btn-info fa fa-cogs col-sm-4 "
                    onClick={this.props.iniciar_evaluacion}
                    style={{ "marginTop": "10px", "fontSize": "19px" }}>
                    <strong style={{ "marginLeft": "5px" }} >
                        Iniciar Evaluacion
                    </strong>
                </i>
        </div>
        );
    }
    /*eventos*/
    seleccion_est(establecimiento) {
        this.props.establecimiento(establecimiento);
        this.setState({folio_es:establecimiento});
    }
    /*conexiones*/
    Obtener_establecimienos(){
        conexion_api_from_body("servicios/matriz/conexiones.asmx/obtener_establecimientos", {},
            (lista) => {
            this.setState({lista_establecimientos:lista.d});
        });
    }
}
const Selector_establecimientos = (props) => {
    return (
        <div className="col-sm-3">
            <strong>
                Establecimientos
            </strong>
            <select className="form-control"
                onChange={(e) => props.seleccion(e.target.value)}>
                <option value={-1}>Seleccionar.</option>
                <Lista />
            </select>
        </div>
    );
    function Lista() {
        return props.lista.map(
            e => <option disabled={e.estatus == 0}
                    value={e.folio}
                    selected={e.folio == props.activo}
                    key={e.folio}>
                    {e.nombre}
                </option>);
    }
}
const Selector_responsable = (props) => {
    return (
        <div className="col-sm-8">
            <strong>
                Responsable
            </strong>
            <input type="text" disabled
                className="form-control"
                value={props.nombre} />
            <i className="btn btn-default fa fa-search" onClick={() => document.getElementById("Modal_responsables").style.display = 'flex'}
                style={{"marginTop":"-52px","marginLeft":"100%","fontSize":"19px","borderRadius":"30px"}}>
            </i>
        </div>
        );
}
const Vista_cuestionario = (props) => {
    return (
        <div className="col-sm-12" style={{"width":"100%"}}>
            <strong>Cuestionario</strong>
            <input type="text" className="form-control" disabled value={props.nombre} />
        </div>
    );
}

class CuerpoVistaCuestionarios extends React.Component{
    render() {
        return (
            <div className="panel-body" style={{ "overflowX": "scroll","overflowY":"scroll","minHeight":"450px"}} >
                <Tabla_cuestionarios lista={this.props.lista_cuestionarios}
                    seleccion={this.props.seleccion}
                    activo={this.props.activo}/>
            </div>
        );
    }
}
const Tabla_cuestionarios = (props) => {
    return (
        <table className="table">
            <thead>
                <tr className="info" >
                    <th>Folio</th>
                    <th>Descripcion</th>
                    <th>Evaluador</th>
                    <th>Inicio</th>
                    <th>Termino</th>
                    <th>Estatus</th>
                </tr>
            </thead>
            <tbody>
                <Datos_tabla />
            </tbody>
        </table>
        );
    function Datos_tabla() {
        const seleccion = (i) => i == props.activo ? { "background": "#f1e99d","color":"azure" } : { "background": "#ffffff" };

        return (props.lista.map(e =>
            <tr onClick={() => props.seleccion(e)} style={seleccion(e.folio)} key={e.folio}>
            <td>{e.folio}</td>
            <td>{e.cuestionario}</td>
            <td>{e.aplicador}</td>
            <td>{e.inicio}</td>
            <td>{e.termino}</td>
            <td>{e.estatus}</td>
        </tr>));
    }
}

class ModalResponsables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro: '',
            responsable: {
                folio: -1,
                nombre: '',
                puesto: ''
            },
            lista_responsables:[]
        }
        this.filtro = this.on_filtro.bind(this);
        this.seleccion = this.on_seleccion.bind(this);
        this.aceptar = this.seleccionar.bind(this);
        this.salir = this.cerrar.bind(this);
        this.Obtener_responsable();
    }
    render() {
        return (
            <div className="modal_generica" id="Modal_responsables" >
                <div className="panel panel-default"
                    style={{ "width": "90%", "maxWidth": "800px", "height": "90%", "maxHeight": "700px" }}>
                    <div className="panel-heading" style={{ "height": "50px", "background":"#00b0a3","color":"#ffffff"}}>
                        <i className="glyphicon glyphicon-remove-circle close" onClick={this.salir}></i>
                        <h4 className="glyphicon glyphicon-user"> Seleccion De Responsable.</h4>
                    </div>
                    <div className="panel-body" style={{"height":"85%"}}>
                        <Datos_responsable nombre={this.state.responsable.nombre} />
                        <div className="form-inline" >
                            <i className="glyphicon glyphicon-filter"></i>
                            <input type="text" style={{ "width": "98%" }}
                                onChange={this.filtro}
                                className="form-control"
                                value={this.state.filtro}
                                placeholder="Filtro..." />
                        </div>
                        <Lista_responsables lista={this.state.lista_responsables}
                            filtro={this.state.filtro}
                            seleccion={this.seleccion}
                            responsable={this.state.responsable.folio}/>
                    </div>
                    <div className="panel-footer" style={{ "marginTop": "5px" }}>
                        <section className="btn btn-success" onClick={this.aceptar}>
                            Seleccionar
                    </section>
                        <section className="btn btn-danger " onClick={this.salir}>
                            Cancelar
                    </section>
                    </div>
                </div>
            </div>
        );
    }
    /*Eventos*/
    on_filtro(e) {
        this.setState({filtro:e.target.value});
    }
    on_seleccion(res) {
        this.setState({responsable:res});
    }
    seleccionar() {
        if (this.state.responsable.folio > 0) {
            this.props.seleccion(this.state.responsable);
            this.salir();
        }
    }
    cerrar() {
        document.getElementById("Modal_responsables").style.display = 'none';
        this.setState({
            filtro: '',
            responsable: {
                folio: -1,
                nombre: '',
                puesto: ''
            }
        });
    }
    /*Conexiones*/
    Obtener_responsable() {
        conexion_api_from_body("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" },
            (lista) => {
                this.setState({ lista_responsables: lista.d });
        });
    }
}
const Datos_responsable = (props) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <div className="group-form">
                    <strong>Responsable</strong>
                    <input className="form-control" value={props.nombre} disabled />
                </div>
            </div>
        </div>
        );
}
const Lista_responsables = (props) => {
    return (
        <div style={{ "overflowX": "scroll", "overflowY": "scroll", "height": "80%" }}>
            <table className="table">
                <thead>
                    <tr className="success">
                        <th>Folio</th>
                        <th>Nombre</th>
                        <th>Puesto</th>
                    </tr>
                </thead>
                <tbody>
                    <Datos />
                </tbody>
            </table>
        </div>
    );
    function Datos() {
        const filtro = props.filtro.toUpperCase();
        const lista = props.lista.filter(e => e.folio.toString().search(filtro) > -1 || e.nombre.toUpperCase().search(filtro) > -1 || e.puesto.toUpperCase().search(filtro) > -1);
        const seleccion = (i) => i == props.responsable ? { "background": "#f1e99d", "color": "azure" } : { "background": "#ffffff" };

        return lista.map(
            e => <tr key={e.folio} style={seleccion(e.folio)} onClick={()=>props.seleccion(e)} >
                <td>{e.folio}</td>
                <td>{e.nombre}</td>
                <td>{e.puesto}</td>
            </tr>);
    }
}

class ModalZonas extends React.Component {
    render() {
        return (
            <div className="modal_generica" id="Modal_zonas" >
                <div className="panel panel-default"
                    style={{ "width": "90%", "maxWidth": "800px", "height": "90%", "maxHeight": "700px" }}>
                    <div className="panel-heading" style={{ "height": "70px", "background":"#4eb5f2","color":"#ffffff"}}>
                        <i className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></i>
                        <h4 className="glyphicon glyphicon-edit"> Seleccion De Zona A Evaluar.</h4>
                    </div>
                    <div className="panel-body" style={{ "height": "85%" }}>
                        <Datos_zona seleccion={this.props.seleccion} lista={this.props.lista}/>
                    </div>
                </div>
            </div>
        );
    }
    cerrar() {
        document.getElementById("Modal_zonas").style.display = "none";
    }
}
const Datos_zona = (props) => {
    return (
        <div style={{ "overflowY": "scroll", "height": "100%","marginTop":"30px"}}>
            <Datos />              
        </div>);
    function Datos() {
        return props.lista.map(
            e => <span className="btn btn-info btn-block" key={e.folio}
                onClick={()=>props.seleccion(e)}
                style={{ "height": "20%", "justifyContent": "center", "alignItems": "center", "display": "flex" }} >
                <strong >
                    {e.nombre}
                </strong>
            </span>
        )
    }
}

class ModalResponderZonas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posicion: -1,
            folio:-1,
            activo: '',
            criterio: ''
        }
        this.responder = this.on_responder.bind(this);
        this.resultado = this.on_resultado.bind(this);
        this.respuesta_no = this.respuesta.bind(this);
        this.observaciones = this.on_observaciones.bind(this);
        this.guardar = this.guardar_evaluacion.bind(this);
    }
    render() {
        return (
            <div className="modal_generica" id="Modal_responder_zonas" >
                <div className="panel panel-default"
                    style={{ "width": "99%", "maxWidth": "800px", "height": "95%", "maxHeight": "1100px" }}>
                    <div className="panel-heading"
                        style={{ "height": "50px", "background": "#88a196", "color": "#ffffff" }}>
                        <i className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></i>
                        <strong className="glyphicon glyphicon-edit"> Evaluar {this.props.estado.zona_evaluar.nombre}.</strong>
                    </div>
                    <div className="panel-body" style={{ "height": "85%" }}>
                        <TablaActivos lista={this.props.estado.lista_activos_por_zona}
                            responder={this.responder} observaciones={this.observaciones}/>
                    </div>
                    <div className="panel-footer">
                        <i type="text"
                            className='btn btn-success btn-block glyphicon glyphicon-download-alt'
                            onClick={this.guardar}>
                            <strong style={{"marginLeft":"10px"}}>Guardar</strong>
                        </i>
                    </div>
                    <ModalSeleccionRespuestaActivo activo={this.state.activo}
                        resultado={this.resultado}
                        criterio={this.state.criterio} />
                    <ModalServicioPorActivo activo={this.state.activo}
                        folio={this.state.folio}
                        respuesta={this.respuesta_no}
                        folio_establecimiento={this.props.estado.folio_establecimiento}
                        folio_departamento={this.props.estado.cuestionario_seleccionado.folio_departamento}
                    />
                    <ModaObservaciones lista={this.props.estado.lista_observaciones_por_activo}
                        activo={this.state.activo}
                        folio={this.state.folio} />
                </div>
            </div>
        );
    }
    on_responder(pos,activo) {
        console.log("Responder:", activo);
        this.setState({ posicion: pos });
        this.seleccionar(pos);
        document.getElementById("Modal_seleccion_respuesta_activo").style.display = "flex";
    }
    on_observaciones(pos,activo) {
        console.log("Observaciones:", activo);
        this.setState({ posicion: pos });
        this.seleccionar(pos);
        document.getElementById("Modal_observaciones_activo").style.display = "flex";
    }
    on_resultado(R) {
        console.log(R);
        if (R != "NO") {
            this.respuesta(R);
        } else if (confirm("Levantar Reporte?")) {
            console.log("Reporte De Servicio...");
            document.getElementById("Modal_servicio_por_activo").style.display = 'flex';
        }
    }
    respuesta(R) {
        this.props.estado.lista_activos_por_zona[this.state.posicion].solucion = R;

        this.setState({
            posicion: -1,
            folio: -1,
            activo: '',
            criterio: ''
        });

        document.getElementById("Modal_seleccion_respuesta_activo").style.display = "none";
    }
    cerrar() {
        document.getElementById("Modal_responder_zonas").style.display = "none";
    }
    seleccionar(posicion) {
        const activo_ = this.props.estado.lista_activos_por_zona[posicion];
        this.setState({
            folio: activo_,
            activo: activo_.detalle_activo,
            criterio: activo_.detalle_criterio
        });
    }
    guardar_evaluacion() {
        const resultados = this.props.estado.lista_activos_por_zona;
        const observaciones = this.props.estado.lista_observaciones_por_activo;
        const lista = [];
        var lista_observaciones = [];
        //alert(observaciones.length)
        const comprobar_respuestas = resultados.filter(
            e => e.solucion == "  "
        );
        if (comprobar_respuestas.length == 0) {
            resultados.forEach(
                (elemento, posicion) => {
                    lista_observaciones = observaciones.filter(obs => elemento.folio_activo == obs.folio_activo ? [posicion, obs.observacion] : []);

                    lista.push(
                        elemento.folio_resultado + "," +
                        this.props.estado.cuestionario_seleccionado.folio + "," +
                        elemento.folio_activo + "," +
                        elemento.folio_criterio + ",'" +
                        elemento.solucion + "'," +
                        ID_SCOI + "," +
                        this.props.estado.responsable.folio
                    );
                });
            console.log("Activos:", lista);
            console.log("Observaciones", lista_observaciones);
            conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/guardar_resultados_cuestionarios_asignados_zona",
                {
                    datos_cuestionario: lista,
                    observaciones: lista_observaciones
                },
                (respuesta) => {
                    console.log(respuesta);
                    alert("Guardado...");
                    document.getElementById("Modal_responder_zonas").style.display = "none";
                });
        } else alert(comprobar_respuestas.length+" Activos Pendientes por Evaluar...");
    }
}
const Respuesta = (props) => {
    var clase = "btn btn-default glyphicon glyphicon-question-sign";

    if (props.r == "SI") clase = "btn btn-success glyphicon glyphicon-ok-sign"
    else if (props.r == "NO") clase = "btn btn-danger glyphicon glyphicon-remove-sign"
    else if (props.r == "NA") clase = "btn btn-primary glyphicon glyphicon-minus-sign"
    return <i className={clase}
        style={{ "width": "90%" }}>
           </i>
}
const TablaActivos = (props) => {
    return <div style={{ "overflowY": "scroll", "height": "100%"}}>
    <table className="table">
        <thead>
            <tr className="success">
                <th>#</th>
                <th>Activo</th>
                <th>Evaluacion</th>
                <th>Observaciones</th>
            </tr>
        </thead>
        <tbody>
                <Datos />
        </tbody>
    </table>
    </div>
    function Datos() { 
        return props.lista.map(
            (e, p) => <tr key={p + 1}>
                <td>{p + 1}</td>
                <td>
                    <strong>
                        {e.detalle_activo}
                    </strong>
                </td>
                <td onClick={() => props.responder(p,e)}>
                    <Respuesta r={e.solucion} />
                </td>
                <td>
                    <i className="btn btn-info glyphicon glyphicon-comment"
                        onClick={() => props.observaciones(p, e)}
                        style={{"width":"90%"}}>
                    </i>
                </td>
            </tr>
        );
    }
}

class ModalSeleccionRespuestaActivo extends React.Component {
    render() {
        return (
             <div className="modal_generica" id="Modal_seleccion_respuesta_activo" >
                <div className="panel panel-default"
                    style={{ "width": "400px", "height": "295px"}}>
                    <div className="panel-heading"
                        style={{ "height": "50px", "background": "#2583cc", "color": "#ffffff" }}>
                        <i className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></i>
                        <strong className="glyphicon glyphicon-edit"> Evaluar.</strong>
                        <p> {this.props.activo}</p>
                    </div>
                    <div className="panel-body" style={{ "height": "55%", "overflowY": "auto"}}>
                        {this.props.criterio}
                    </div>
                    <div className="panel-footer"
                        style={{"width":"100%"}}>
                        <label style={{ "width": "33%" }}
                            onClick={() => this.props.resultado("SI")}>
                            <Respuesta r={"SI"} />
                        </label>
                        <label style={{ "width": "33%" }}
                            onClick={() => this.props.resultado("NO")}>
                            <Respuesta r={"NO"} />
                        </label>
                        <label style={{ "width": "33%" }}
                            onClick={() => this.props.resultado("NA")}>
                            <Respuesta r={"NA"} />
                        </label>
                    </div>
                </div>
            </div>
            );
    }
    cerrar() {
        document.getElementById("Modal_seleccion_respuesta_activo").style.display = "none";
    }
}

class ModalServicioPorActivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folio_prioridad: -1,
            detalle: '',
            lista_Prioridades: [],
            seleccion_servicio:[],
            lista_servicios_cuestionario:[]
        }
        this.cambio_prioridad = this.on_cambio_prioridad.bind(this);
        this.seleccionar = this.on_seleccionar.bind(this);
        this.cambio_texto = this.on_cambiar_detalle.bind(this);

        this.Obtener_servicios();
        this.Obtener_prioridades();
    }
    render() {
        return (<div className="modal_generica" id="Modal_servicio_por_activo" >
            <div className="panel panel-default"
                style={{ "width": "99%", "maxWidth": "800px", "height": "95%", "maxHeight": "1100px"  }}>
                <div className="panel-heading"
                    style={{ "height": "50px", "background": "#e36d26", "color": "#ffffff" }}>
                    <i className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></i>
                    <strong className="glyphicon glyphicon-remove-sign"> Reporte De Servicio Por Activo.</strong>
                </div>
                <div className="panel-body" style={{ "height": "85%" }}>
                    <div className="panel panel-default" style={{ "height": "100%" }}>
                        <div className="panel-heading" style={{"height":"30%"}}>
                            <strong>Activo: {this.props.activo}</strong>
                            <Prioridad lista={this.state.lista_Prioridades}
                                cambio={this.cambio_prioridad}
                                activo={this.state.folio_prioridad} />
                            <textarea style={{ "resize": "none" }} value={this.state.detalle}
                                onChange={this.cambio_texto}
                                placeholder="Describa Claramente El Detalle Del Servicio Solisitado"
                                wrap="soft"
                                characters="on"
                                className="form-control" rows="3"></textarea>
                        </div >
                        <div className="panel-body" style={{ "overflowY": "auto","height":"65%"}} >
                            <TablaServicios lista={this.state.lista_servicios_cuestionario}
                                seleccionar={this.seleccionar}
                                seleccion={this.state.seleccion_servicio}/>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <i className="btn btn-success glyphicon glyphicon-share btn-block"
                        onClick={() => this.on_guardar()}>
                        <strong style={{"marginLeft":"5px"}}> Enviar</strong>
                    </i>
                </div>
            </div>
        </div>);
    }
    on_cambio_prioridad(e) {
        this.setState({ folio_prioridad: e.target.value });
    }
    on_seleccionar(folio) {
        const lista = this.state.seleccion_servicio;
        const existe = lista.includes(folio);

        if (existe) {
            const p = lista.indexOf(folio);
            lista.splice(p, 1);
        } else {
            lista.push(folio);
        }
        this.setState({seleccion_servicio:lista});
    }
    on_cambiar_detalle(e) {
        this.setState({ detalle:e.target.value});
    }
    on_guardar() {
        const servicios = this.state.seleccion_servicio;
        const detalle = this.state.detalle.toUpperCase();
        const prioridad = this.state.folio_prioridad;
        if (servicios.length > 0 && detalle != '' && prioridad > 0) {
            console.log("Enviar...");
            console.log(servicios);
            const lista = [];
            servicios.forEach((e,i)=> {
                const datos = e + `,0,' ${detalle} ',${prioridad} ,${this.props.folio_departamento},${this.props.folio_establecimiento},${ID_SCOI},'${IP_CLIENTE}'`;
                lista.push(datos);
            });
            console.log(lista);
            this.Enviar_solicitud_servicios(lista);
        } else alert("Falta Agregar Campos!!!");
    }
    cerrar() {
        document.getElementById("Modal_servicio_por_activo").style.display = "none";
    }
    Obtener_servicios() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/servicios_por_orden_activo_ckl",
            {
                cuestionario: 0,
                orden: 0
            },
            (lista) => {
                console.log(lista.d);
                this.setState({ lista_servicios_cuestionario: lista.d });
            });
    }
    Obtener_prioridades() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/obtener_lista_prioridades",
            {},
            (lista) => {
                console.log(lista.d);
                this.setState({ lista_Prioridades: lista.d });
            });
    }
    Enviar_solicitud_servicios(datos_consulta) {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/enviar_solicitud_servicio",
            {
                datos: datos_consulta
            },
            (listo) => {
                if (listo.d != 0) {
                    document.getElementById("Modal_servicio_por_activo").style.display = 'none';
                    alert("Guardado\nFolio:" + listo.d.toString());
                    this.setState({
                        folio_prioridad: -1,
                        detalle: '',
                        seleccion_servicio: []
                    });
                    this.props.respuesta("NO");
                } else alert("Error Al Guardar...");
            });
    }
}
const Prioridad = (props) => {
    return (
        <div className="form-group">
            <strong>Prioridad</strong>
            <select onChange={props.cambio} className="form-control">
                <option value={-1}>Seleccione...</option>  
                <Datos />
            </select>
        </div>
    );
    function Datos() {
        const seleccion =(folio)=>folio==props.activo;
        return props.lista.map(
            e => <option value={e.folio}
                key={e.folio}
                selected={e.folio == props.activo}>
                    {e.nombre}
                </option>  
        );
    }
}
const TablaServicios = (props) => {
    return (
        <table className="table">
            <thead>
                <tr className="warning">
                    <th></th>
                    <th>Servicio</th>
                    <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                <Datos />
            </tbody>
        </table>
    );
    function Esta(props){
        const esta = props.seleccion.includes(props.folio) ? "glyphicon glyphicon-check" : "glyphicon glyphicon-unchecked";
        return <i className={esta} key={props.folio} style={{"fontSize":"25px"}}></i>
    }
    function Datos() {
        return props.lista.map(
            e => <tr key={e.folio} onClick={()=>props.seleccionar(e.folio)}>
                <td>
                    <Esta folio={e.folio} seleccion={props.seleccion} />
                </td>
                <td>{e.nombre}</td>
                <td>{e.detalle}</td>
            </tr>
        );
    }

}

class ModaObservaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            observacion:''
        }
        this.cambio = this.on_observacion.bind(this);
        this.agregar = this.on_agregar.bind(this);
    }
    render() {
        return (
            <div className="modal_generica" id="Modal_observaciones_activo" >
                <div className="panel panel-default"
                    style={{ "width": "400px", "height": "295px" }}>
                    <div className="panel-heading"
                        style={{ "height": "50px", "background": "#00c3fe", "color": "#ffffff" }}>
                        <i className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></i>
                        <strong className="glyphicon glyphicon-comment"> Observaciones.</strong>
                        <p> {this.props.activo}</p>
                    </div>
                    <div className="panel-body" id="lista_observaciones" style={{ "height": "65%", "overflowY": "auto" }}>
                        <Observaciones lista={this.props.lista} folio={this.props.folio} />
                    </div>
                    <div className="panel-footer"
                        style={{ "width": "100%" }}>
                        <input className="form-control"
                            value={this.state.observacion}
                            style={{ "width": "87%","display":"inline-block"}}
                            onChange={this.cambio} />
                        <label style={{ "width": "10%" }} className="btn btn-info glyphicon glyphicon-send"
                            onClick={this.agregar}>
                        </label>
                    </div>
                </div>
            </div>
            );
    }
    on_agregar() {
        if (this.state.observacion!='') {
            const dato = {
                folio: this.props.folio,
                observacion: this.state.observacion
            }
            this.props.lista.push(dato);
            document.getElementById("lista_observaciones").style.border = 'solid 2px #00c3fe';
            setTimeout(() => document.getElementById("lista_observaciones").style.border = 'none', 1500);

            console.log("Observacion", dato);
            this.setState({ observacion: '' });
        }
    }
    on_observacion(e) {
        this.setState({observacion:e.target.value});
    }
    cerrar() {
        document.getElementById("Modal_observaciones_activo").style.display = "none";
    }
}
const Observaciones = (props) => {
    return (
        <div>
            <Datos />
        </div>
    );
    function Datos() {
        const filtro = props.lista.filter(e=>e.folio==props.folio);
        return filtro.map(
          e=>  <i className="btn btn-default btn-block">
              {e.observacion}
            </i>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folio_establecimiento: -1,
            cuestionario_seleccionado: {
                folio: -1,
                nombre: '',
                estatus: 'Finalizo',
                folio_departamento:-1
            },
            zona_evaluar: {
                folio: -1,
                nombre: '',
                estatus:null
            },
            responsable: {folio:-1,nombre:''},
            lista_cuestionarios: [],
            lista_zonas_cuestionario: [],
            lista_activos_por_zona: [],
            lista_observaciones_por_activo:[]
        }
        this._seleccion_establecimiento = this.on_seleccion_establecimiento.bind(this);
        this._seleccion_cuestionario = this.on_cuestionario.bind(this);
        this._seleccion_responsable = this.on_responsable.bind(this);
        this.iniciar_evaluacion = this.on_evaluacion.bind(this);
        this._seleccion_zona = this.on_zona.bind(this);
        this.Obtener_cuestionarios(-1);
    }
    render() {
        return (
            <div>
                <div className="panel panel-default ">
                    <CaveceraSelector establecimiento={this._seleccion_establecimiento}
                        cuetionario={this.state.cuestionario_seleccionado.nombre}
                        iniciar_evaluacion={this.iniciar_evaluacion}
                        responsable={this.state.responsable.nombre}/>
                    <CuerpoVistaCuestionarios lista_cuestionarios={this.state.lista_cuestionarios}
                        activo={this.state.cuestionario_seleccionado.folio}
                        seleccion={this._seleccion_cuestionario} />
                </div>
                <ModalResponsables seleccion={this._seleccion_responsable} />
                <ModalZonas seleccion={this._seleccion_zona} lista={this.state.lista_zonas_cuestionario} />
                <ModalResponderZonas estado={this.state}/>
            </div>
        );
    }
    /*Eventos*/
    on_seleccion_establecimiento(seleccion) {
        this.setState({ folio_establecimiento: seleccion, cuestionario_seleccionado: { folio: -1, nombre:'Finalizo'} });
        this.Obtener_cuestionarios(seleccion);
    }
    on_cuestionario(seleccion) {
        console.log(`Cuestionario Seleccinado :`, seleccion);
        const cues = {
            folio: seleccion.folio,
            nombre: seleccion.cuestionario,
            estatus: seleccion.estatus,
            folio_departamento: seleccion.folio_departamento
        }
        console.info("departamento:", cues);
        this.setState({ cuestionario_seleccionado: cues});
    }
    on_responsable(seleccion) {
        const res = { folio: seleccion.folio, nombre: seleccion.nombre }
        this.setState({ responsable:res});
    }
    on_evaluacion() {
        const cuestionario = this.state.cuestionario_seleccionado;
        const responsable = this.state.responsable;

        console.log("Cuestionario:", cuestionario);
        console.log("Responsable:", responsable);
        if (responsable.folio > 0 && cuestionario.folio > 0) {
            document.getElementById("Modal_zonas").style.display = 'flex';
            this.Obtener_zonas_cuestionario();
        } else alert("Falta seleccionar Campos!!!");
    }
    on_zona(zona) {
        console.log("Zona:", zona);
        this.Obtener_activos_zona(zona);
        this.Obtener_observaciones_activos(zona);
        this.setState({ zona_evaluar: zona });
    }
    /*Conexiones*/
    Obtener_cuestionarios(folio_) {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento",
            { folio: folio_},
            (lista) => {
                this.setState({ lista_cuestionarios: lista.d });
            });
    }
    Obtener_zonas_cuestionario() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/obtener_zonas_por_asignacion",
            { folio: this.state.cuestionario_seleccionado.folio },
            (lista) => {
                console.log(lista.d);
                this.setState({ lista_zonas_cuestionario: lista.d });
            });
    }
    Obtener_activos_zona(zona_) {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/obtener_resultados_cuestionarios_asignados_zona",
            { 
                asignacion: this.state.cuestionario_seleccionado.folio,
                zona: zona_.folio
             },
            (activos) => {
                console.log("Activos:", activos.d);

                this.setState({lista_activos_por_zona:activos.d});
        });
    }
    Obtener_observaciones_activos(zona_) {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/servicios_ver_observaciones_por_activo",
            {
                asignacion: this.state.cuestionario_seleccionado.folio,
                folio_zona: zona_.folio
            },
            (obs) => {
                console.log("Observaciones:", obs.d);
                this.setState({ lista_observaciones_por_activo: obs.d });
                document.getElementById("Modal_responder_zonas").style.display = "flex";
        });
    }
}

ReactDOM.render(
<App />,
    document.getElementById("contenedor")
);