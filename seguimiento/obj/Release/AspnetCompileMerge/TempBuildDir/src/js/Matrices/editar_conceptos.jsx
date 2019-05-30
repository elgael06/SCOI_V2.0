
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL + ":90/api/"
const $URL_API_IZA = $MI_URL + ":180/api/"

class concepto_modelo {
    constructor() {
        this.Folio = 0;
        this.Concepto = '';
        this.Abreviatura = '';
        this.Estatus = 'V';
        this.Fecha = '';
        this.Fecha_modificacion = '';
    }
}

class EdicionConceptos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            concepto:new concepto_modelo,
            lista_cuestionarios:[],
            estatus:1
        }
        
        this.seleccionar = this.on_seleccion_concepto.bind(this);
        setTimeout(()=> this.cambiar_estatus(0), 1000);
        this.Obtner_conceptos();
    }
    //eventos
    on_concepto(e) {
        let desc = e.target.value;
        const { concepto } = this.state;
        concepto.Concepto = desc;
        this.setState({concepto:concepto});
    }
    on_estado(e) {
        let desc = e.target.value;
        const { concepto } = this.state;
        concepto.Estatus = desc;
        this.setState({ concepto: concepto });
    }
    on_abreviatura(e) {
        let desc = e.target.value;
        const { concepto } = this.state;
        concepto.Abreviatura = desc;
        this.setState({ concepto: concepto });
    }
    on_seleccion_concepto(seleccion) {
        const { Folio, Concepto, Estatus, Fecha, Fecha_modificacion, Abreviatura } = seleccion;
        this.setState({ concepto: { Folio, Concepto, Estatus, Fecha, Fecha_modificacion, Abreviatura}});
    }
    on_cancelar() {
        this.setState({ concepto:new concepto_modelo });
    }
    //Metodo
    llenar_conceptos(lista) {
        this.setState({ lista_cuestionarios: lista });
        this.cambiar_estatus(0);
    }
    guardado(concepto) {
        this.setState({ concepto:new concepto_modelo });
        alert(`Folio Concepto:${concepto.Folio} Guardado...`);
        this.Obtner_conceptos();
    }
    comprobar_concepto() {
        const { Concepto, Abreviatura } = this.state.concepto;
        Concepto != "" && Abreviatura != "" ? this.cambiar_estatus(1): this.cambiar_estatus(0);
        return Concepto != "" && Abreviatura != "";
    }
    cambiar_estatus(est) {
        this.setState({ estatus: est });
    }
    //Conexiones
    Obtner_conceptos() {
        fetch(`${$URL_API}Mostrar_conceptos`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => {
                e.json().then(res => this.llenar_conceptos(res))
            })
            .catch(err => console.error("Error=>", err));
    }
    Guardar_Concepto() {
        const { concepto } = this.state;
        this.comprobar_concepto()?
        fetch(`${$URL_API}Editar_conceptos`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(concepto)
        })
            .then(e => {
                e.json().then(res => this.guardado(res))
            })
            .catch(err => console.error("Error=>", err))
        : alert(`Falta Agregar Los Siguientes Campos:\nConcepto,Abreviatura!!!`);
    }
    render() {
        const { concepto, lista_cuestionarios, estatus } = this.state;
        return (
            <div className="panel panel-default">
                <Cavecera
                    concepto={concepto}
                    evConcepto={e => this.on_concepto(e)}
                    evEstado={e => this.on_estado(e)}
                    evAbreviatura={e => this.on_abreviatura(e)}
                    evAgregar={() => this.Guardar_Concepto()}
                    evCancelar={() => this.on_cancelar()}
                />
                <Cuerpo
                    Lista={lista_cuestionarios}
                    evSeleccion={this.seleccionar}
                />
                <EfectoCargar
                    estatus={estatus}
                />
            </div>
            );
    }
}

const Cavecera = ({ concepto, evConcepto, evEstado, evAbreviatura, evAgregar, evCancelar }) => {
    const { Concepto, Abreviatura, Estatus } = concepto;
    return (
        <div className="panel-heading">
            <label>Agregar Concepto</label>
            <input className="form-control"
                value={Concepto}
                onChange={evConcepto}
                placeholder="Descripcion De Concepto..."
            />
            <div>
                <div className="entrada_corta">
                    <label>Estado:</label>
                    <select className="form-control"
                        onClick={evEstado}
                    >
                        <option selected={Estatus=="V"} value="V">Vigente</option>
                        <option selected={Estatus=="C"} value="C">Cancelado</option>
                    </select>
                </div>
                <div className="entrada_corta">
                    <label>Abreviatura:</label>
                    <input className="form-control"
                        onChange={evAbreviatura}
                        value={Abreviatura}
                        placeholder="Abreviatura ..."
                    />
                </div>
                <i className="btn btn-success fa fa-plus" onClick={evAgregar}>Agregar</i>
                <i className="btn btn-danger fa fa-close" onClick={evCancelar}>Cancelar</i>
            </div>
        </div>
        );
}
const Cuerpo = ({ Lista ,evSeleccion}) => {
    return (
        <div className="panel-body">
            <strong>Lista Conceptos:</strong>
            <div id="contenedor_tabla">
                <table className="table">
                    <tbody>
                        {
                            Lista.map(concepto => <tr onClick={() => evSeleccion(concepto)}>
                                <td>{concepto.Folio}</td>
                                <td>{concepto.Concepto}</td>
                                <td>{concepto.Abreviatura}</td>
                                <td>{concepto.Estatus=="V"?"Vigente.":"Cancelado."}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
        );
}
if (location.protocol != "http:")
    location.protocol = "http:";
ReactDOM.render(<EdicionConceptos />,document.querySelector("#root"));
