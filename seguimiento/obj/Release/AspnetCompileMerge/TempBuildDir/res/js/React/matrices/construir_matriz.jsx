
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL + ":90/api/";

class objMatriz {
    constructor(folio, nombre, establecimiento) {
        this.folio = folio || 0;
        this.nombre = nombre || "";
        this.establecimiento = establecimiento || "";
        this.lista  = [];
    }
    llenar(folio,nombre) {
        this.folio = folio;
        this.nombre = nombre;
    }
}

class ConstruirMatriz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seleccion: new objMatriz(),
            matrices:[],
            establecimientos: [],
            etapas: [],
            conceptos: [],
            unidad_inspector: [],
            aspectos:[]
        }
        this.Obtener_establecimientos();
        //eventos
        this.btn_buscar_matriz = this.Obtener_matrices.bind(this);
        this.evMatriz = this.on_matriz.bind(this);
        this.evCambioMatriz = this.handle_matriz.bind(this);
        this.evCambioEstablecimiento = this.handle_establecimiento.bind(this); 
    }
    //evento
    on_matriz(seleccion) {
        console.log("seleccion=>", seleccion);

        this.setState({ seleccion: new objMatriz(seleccion.folio,seleccion.nombre,seleccion.establecimiento)});
        this.Obtener_matriz_por_folio(seleccion.folio);
        document.querySelector("#ModalMatrices").style.display = "none";
    }
    handle_matriz(e) {
        const { seleccion } = this.state;
        seleccion.nombre = e.target.value;
        this.setState({seleccion:seleccion});
    }
    handle_establecimiento(e) {
        const { seleccion } = this.state;
        seleccion.establecimiento = e.target.value;
        this.setState({ seleccion: seleccion });
    }
    //metodos
    llenar_establecimientos(lista) {
        lista.length >= 0 ?
            this.setState({ establecimientos: lista })
            : alert("Sin Establecimientos!!!");
    }
    llenar_matrices(lista) {
        lista.length >= 0 ?
            this.setState({ matrices: lista })
            : alert("Sin Matrices!!!");
        document.querySelector("#ModalMatrices").style.display = "flex";
    }
    llenar_matriz_por_folio(Lista) {
        const { seleccion } = this.state;
        seleccion.lista = Lista;
        lista.length >= 0 ?
        this.setState({seleccion:seleccion})
            : alert("Sin Etapas!!!");
    }
    llenar_Etapas(Lista) {
        this.setState({etapas:Lista});
        document.querySelector("#ModalEtapas").style.display ="flex";
    }
    llenar_Conceptos(Lista) {
        this.setState({ conceptos: Lista });
    }
    llenar_Aspecots(Lista) {
        this.setState({ aspectos: Lista });
    }
    llenar_unidad_inspector(Lista) {
        this.setState({ unidad_inspector: Lista });
    }
    //conexiones
    Obtener_establecimientos() {
        fetch(`${$URL_API}obtener_establecimientos`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json().then(res => this.llenar_establecimientos(res)))
            .catch(err => {
                console.log("Error=>",err);
            });
    }
    Obtener_matrices() {
        fetch(`servicios/matriz/conexiones.asmx/obtener_matriz`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json().then(res => this.llenar_matrices(res.d)))
            .catch(err => {
                console.log("Error=>", err);
            });
    }
    Obtener_matriz_por_folio(folio) {
        fetch(`servicios/matriz/conexiones.asmx/obtener_datos_matriz`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ folio: folio})
        })
            .then(e => e.json().then(res => this.llenar_matriz_por_folio(res.d)))
            .catch(err => {
                console.log("Error=>", err);
            });
    }
    Obtener_Etapas() {
        console.log("Etapas.");
        fetch(`servicios/matriz/conexiones.asmx/obtener_etapas_matriz`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json().then(res => this.llenar_Etapas(res.d)))
            .catch(err => {
                console.log("Error=>", err);
            });
    }
    Obtener_Conceptos() {
        fetch(`servicios/matriz/conexiones.asmx/obtener_conceptos_matriz`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json().then(res => this.llenar_Conceptos(res.d)))
            .catch(err => {
                console.log("Error=>", err);
            });
    }
    Obtener_Aspectos() {
        fetch(`servicios/matriz/conexiones.asmx/obtener_aspectos_matriz`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json().then(res => this.llenar_Aspecots(res.d)))
            .catch(err => {
                console.log("Error=>", err);
            });
    }
    Obtener_Unidad_inspector() {
        fetch(`servicios/matriz/conexiones.asmx/obtener_unidad_inspeccion_matriz`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json().then(res => this.llenar_unidad_inspector(res.d)))
            .catch(err => {
                console.log("Error=>", err);
            });
    }
    render() {
        const { seleccion, establecimientos, matrices, etapas, conceptos, unidad_inspector, aspectos } = this.state;
        return (
            <div className="panel panel-default">
                <Cavecera
                    matriz={seleccion.nombre}
                    selectEst={seleccion.establecimiento || ""}
                    establecimientos={establecimientos}
                    evBuscar={this.btn_buscar_matriz}
                    evCambioMatriz={this.evCambioMatriz}
                    evCambioEstablecimiento={this.evCambioEstablecimiento}
                />
                <VistaEtapas
                    etapas={etapas}
                    evObtenerEtapas={()=>this.Obtener_Etapas()}
                />
                <ModalMatrices
                    lista={matrices}
                    evSeleccion={this.evMatriz}
                />
                <ModalEtapas
                    lista={etapas}
                />
            </div>);
    }
}
const Cavecera = ({ matriz, selectEst, establecimientos, evBuscar, evCambioMatriz, evCambioEstablecimiento }) => {
    return (
        <div className="panel-heading">
            <div>
                <i className={`btn btn-default ${iconos.search}`} onClick={evBuscar} > Buscar</i>
                <i className={`btn btn-primary ${iconos.add}`} > Nuevo</i>
                <i className={`btn btn-info ${iconos.edit}`} > Editar</i>
                <i className={`btn btn-danger ${iconos.cancel}`} > Deshacer</i>
                <i className={`btn btn-success ${iconos.save}`} > Guardar</i>
            </div>
            <div id="text_matrix">
                <label>Matriz:</label>
                <input className="form-control" placeholder="Nombre De Matriz..." onChange={evCambioMatriz} value={matriz} />
            </div>
            <div id="text_establecimientos">
                <label>Establecimiento:</label>
                <select className="form-control" onChange={evCambioEstablecimiento}>
                    {
                        establecimientos.map(e => <option selected={selectEst.toUpperCase() == e.nombre.toUpperCase()} value={e.nombre}>{e.nombre}</option>)
                    }
                </select>
            </div>
        </div>
        );
}

const VistaEtapas = ({ etapas, evObtenerEtapas}) => {

    return (
        <div className="panel-body" id="contenedor_etapas">
            <h3>Etapas:</h3>
            <i className={`btn btn-success ${iconos.add}`} id="btn_agregar_etapa" onClick={evObtenerEtapas}> Agregar Nueva Etapa.</i>
            <div>
                {
                    etapas.map(e=><p>etapa</p>)
                }
            </div>
        </div>
        );
}

const ModalMatrices = ({ lista, evSeleccion }) => {
    const VistaMatriz = ({ matriz }) => {
        const clase = matriz.estatus == "V" ? "primary fa fa-toggle-on" : "danger fa fa-toggle-off";
        return (
            <div className="viewMatriz" >
                <strong>{matriz.nombre}</strong>
                <br />
                <label>{matriz.establecimiento}</label>
                <i className={`btn btn-${clase}`}></i>
                <i className="btn btn-success fa fa-edit" onClick={() => evSeleccion(matriz)}></i>
                <p>Modifico: {matriz.usuario}</p>
            </div>
            );
    }
    return (
        <div className="ventana" id="ModalMatrices">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className={`${iconos.cancel}`} onClick={() => document.querySelector("#ModalMatrices").style.display = "none"}></i>
                    <h3>Matrices</h3>
                </div>
                <div className="panel-body">
                    <input type="text" className="form-control" placeholder="Filtro..." />
                    <div id="contenedor_matrices">
                        {lista.map(e => <VistaMatriz matriz={e} />)}
                    </div>
                </div>
            </div>
        </div>
        );
}

const ModalEtapas = ({lista}) => {

    return (
        <div className="ventana" id="ModalEtapas">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-close"onClick={()=>document.querySelector("#ModalEtapas").style.display ="none"}></i>
                    <h3>Etapas </h3>
                </div>
                <div className="panel-body">                
                <input type="text"  placeholder="Filtro..." id="filtro_etapas" className="form-control" />
                    {
                        lista.map(e=><p>{e.nombre}</p>)
                    }
                </div>
            </div>
        </div>
        );
}

const iconos = {
    add: "fa fa-plus",
    search: "fa fa-search",
    edit: "fa fa-edit",
    save: "fa fa-check",
    cancel:"fa fa-close"
}
location.protocol != "http:"?
    location.protocol = "http:":
    ReactDOM.render(<ConstruirMatriz />, document.querySelector("#contenedor") );