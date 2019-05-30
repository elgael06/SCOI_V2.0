
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL+":90/api/"

class CompraInterna extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            estado: "T",
            filtro: "",
            registros: 0,
            gastos: [],
            Detalle:null   
        }
        this.on_estado = this.On_estado.bind(this);
        this.on_filtro = this.On_filtro.bind(this);
        this.Obtener = this.Obtener_Gastos_por_Estatus.bind(this);
        this.BuscarPorFolio = this.Buscar_gasto_por_folio.bind(this);
        this.Autorizacion = this.Autorizacion_gasto.bind(this);
        setTimeout(() => { document.getElementById("carga").style.display="none" },1000);
    }

    render() {
        return (
            <div className="panel panel-default">
                <CaveceraMain
                    evEstado={this.on_estado}
                    registros={this.state.registros}
                    evActualizar={this.Obtener}
                />
                <ContenedorTabla
                    gastos={this.state.gastos}
                    filtro={this.state.filtro}
                    evFiltro={this.on_filtro}
                    evSeleccion={this.BuscarPorFolio}
                />
                <ModalAlimentacion
                    seleccion={this.state.Detalle}
                    evAutorizacion={this.Autorizacion}
                />
            <Cargar
                    nombre={"carga"}
                />    
            </div>
            );
    }
    /*Eventos*/
    On_estado(e) {
        this.setState({estado:e.target.value,registros:0,gastos:[]});
    }
    On_filtro(event) {
        this.setState({ filtro :event.target.value});
    }
    /*Metodos*/
    Actualizar(lista) {
        const $registros = lista.length;
        const $gastos = lista;
        this.setState({registros:$registros,gastos:$gastos});
    }
    Seleccionar_gasto(seleccion) {
        this.setState({ Detalle: seleccion });
        if (typeof seleccion == "object") {
            document.getElementById("modal_detalle_gasto").style.display = "flex";
        }
    }
    Autorizar(res) {
        document.getElementById("carga").style.display = "none";
        document.getElementById("modal_detalle_gasto").style.display = "none";
        alert(res);
        this.Obtener_Gastos_por_Estatus();
        console.log(res)
    }
    /*Conexiones*/
    Obtener_Gastos_por_Estatus() {
        const $estatus = this.state.estado;
            document.getElementById("carga").style.display = "flex";
            fetch(`${$URL_API}/Obtener_OCI/?estatus=${$estatus}`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
                .then(e => e.json().then(
                    res => {
                        console.log(res);
                        this.Actualizar(res);
                        document.getElementById("carga").style.display = "none";
                    })
                    .catch(err => console.log("Error En Formato JSON!"))
                )
                .catch(err => console.error(err))
    }
    Buscar_gasto_por_folio(folio) {
        document.getElementById("carga").style.display = "flex";
        fetch(`${$URL_API}/Detalle_OCI/?folio=${folio}`, {
            method: 'get',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json().then(
                res => {
                    console.log(res);
                    this.Seleccionar_gasto(res);
                    document.getElementById("carga").style.display = "none";
                })
                .catch(err => console.log("Error En Formato JSON!"))
            )
            .catch(err => console.error(err))
    }
    Autorizacion_gasto(estado) {
        const autirizacion = {
            Folio: this.state.Detalle.Folio,
            Estatus: estado==1?'A':'C',
            Usiario:parseInt(ID_SCOI),
            Pc:"SISTEMA_WEB",
            Ip: IP_CLIENTE
        } 
        console.log("autirizacion=>", autirizacion);
        document.getElementById("carga").style.display = "flex";
        fetch(`${$URL_API}Autorizacion_OCI/`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(autirizacion),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(e => e.json()
                .then(res => {
                    this.Autorizar(res);
                })
                .catch(err => {
                    alert("Error En Formato De ResPuesta...")
                })
        )
            .catch(err => {
                alert('Error En Conexion!!!');
                console.error(err)
            });
    }
}
const CaveceraMain = ({ evEstado, registros , evActualizar}) => {

    return (
        <div className="panel-heading">
            <h3>Autorizacion De Orden De Compra Interna.</h3>
            <div>
                <div className="form-group contenedores_cavecera">
                    <strong>Registros.</strong>
                    <label className="form-control" id="numero_de_registros">
                        {registros}
                </label>
                </div>
                <div className="form-group contenedores_cavecera">
                    <strong>Estatus.</strong>
                    <select className="form-control" id="estatus" onChange={evEstado}>
                             <option value="T">Todos.</option>
                            <optgroup id="grupo_de_estatus" label="Estatus">
                                <option value="E">En Validacion.</option>
                                <option value="A">Autorizado.</option>
                                <option value="S">Surtido.</option>
                                <option value="C">Cancelado</option>
                               
                            </optgroup>
                    </select>
                </div>
                <i class="btn btn-info glyphicon glyphicon-refresh" style={{marginLeft:"20px"}} onClick={evActualizar} id="btn_refrescar"></i>
            </div>
        </div>);
}

const ContenedorTabla = ({ gastos, filtro, evFiltro, evSeleccion}) => {
    const iterar_en_objeto_filtro = (objeto,filtro) => {
        var $result = false;
        for (var i in objeto) {
            $result = objeto[i].toString().search(filtro) > -1 ? true : $result;
        }
        return $result;
    }
    const DatosTabla = () => {
        const $filtro = filtro.toUpperCase();
        const $lista = gastos.filter(elem => iterar_en_objeto_filtro( elem,$filtro) );
        return $lista.map(elemento => <tr style={{ color: "black" }}>
            <th style={{textAlign:"right"}}>{elemento.Folio}</th>
                <td>{elemento.Uso_mercancia}</td>
                <td>{elemento.Tipo_solicitante}</td>
                <td>{elemento.Nombre_solicitante}</td>
                <td>{elemento.Fecha}</td>
                <td>{elemento.Establecimiento}</td>
                <td>{elemento.Estatus}</td>
                <td>{elemento.Fecha_autorizacion}</td>
            <td>{elemento.Usuario_autorizo}</td>
            <td style={{ width: "30px", position: "sticky", right: "1px", zIndex: "980", background:"rgba(194, 214, 214,16)"}}>
                <i className="btn btn-success" onClick={() => evSeleccion(elemento.Folio)} style={{ fontSize: "28px", borderRadius: "40px"}}>
                    <i className="fa fa-edit"></i>
                </i>
            </td>
            </tr>);
    }

    return (
        <div className="panel-body">
            <div>
                <strong>
                    Filtro
                </strong>
                <input type="text" className="form-control" onChange={evFiltro} />
            </div>
            <div id="contedor_tabla_datos">
                <table className="table" id="tabla_gastos">
                    <thead>
                        <tr>
                            <th style={{ width: "50px" }}>Folio</th>
                            <th style={{ width: "250px"}}>Uso De La Mercancia.</th>
                            <th style={{ width: "90px" }}>Tipo De Solicitante.</th>
                            <th style={{ width: "310px"}}>Nombre De Solicitante.</th>
                            <th style={{ width: "150px"}}>Fecha.</th>
                            <th style={{ width: "180px"}}>Establecimiento.</th>
                            <th style={{ width: "120px"}}>Estatus.</th>
                            <th style={{ width: "120px"}}>Fecha Autorizacion.</th>
                            <th style={{ width: "380px" }}>Usuario Autorizo.</th>
                            <th style={{ width: "30px", right: "1px" }}>Accion</th>
                        </tr>
                    </thead>
                    <tbody id="datos_gastos">
                        <DatosTabla />
                    </tbody>
                </table>
            </div>
        </div>
        );
}

const ModalAlimentacion = ({ seleccion,evAutorizacion }) => {

    const HeadingModal = () => {

        if (seleccion != null)
            return (
                <div className="panel-heading">
                    <i className="btn btn-success" id="btn_aceptar_estatus" onClick={() => evAutorizacion(1)}> <i className="glyphicon glyphicon-ok"> </i>Autorizar</i>
                    <i className="btn btn-danger" id="btn_cancelar_estatus" onClick={() => evAutorizacion(0)}> <i className="glyphicon glyphicon-remove"> </i>cancelar</i>
                    <div className="panel-heading" style={{ marginTop: "15px" }}>
                        <div style={{ width: "80px", display: "inline-block"}}>
                            <strong>Folio</strong>
                            <div className="form-control" style={{ textAlign: "right" }}>{seleccion.Folio || 0}</div>
                        </div>
                        <div style={{ width: "50%", display: "inline-block" }}>
                            <strong>Descripcion</strong>
                            <input className="form-control" disable value={seleccion.Uso_mercancia || "NA"} />
                        </div>
                        <div style={{ width: "25%", display: "inline-block"}}>
                            <strong>Destino</strong>
                            <input className="form-control" disable value={seleccion.Establecimiento || "NA"} />
                        </div>
                        <br />
                        <div style={{ width: "80px", display: "inline-block"}}>
                            <strong>Folio</strong>
                            <input className="form-control" style={{textAlign:"right"}} disable value={seleccion.Folio_solicitante || "NA"} />
                        </div>
                        <div style={{ width: "50%", display: "inline-block"}}>
                            <strong>Nombre</strong>
                            <input className="form-control" disable value={seleccion.Nombre_solicitante || "NA"} />
                        </div>
                        <div style={{ width: "25%", display: "inline-block" }}>
                            <strong>Solicitante</strong>
                            <input className="form-control" disable value={seleccion.Solicitante || "NA"} />
                        </div>
                        
                    </div>
                </div>
            );
        else return null;
    }
    const BodyModal = () => {
        const DatosTabla = () => {
            if (seleccion != null)
                return (
                    seleccion.Productos.map(elemento =>
                        <tr>
                            <td>{elemento.Descripcion}</td>
                            <td>{elemento.Cantidad}</td>
                            <td>{elemento.Unidad}</td>
                        </tr>
                        )
                    );
            else return null;
        }
        return (
            <div className="panel-body">
                <table className="table table-bordered">
                    <thead>
                        <tr className="info" >
                            <th >Descripcion</th>
                            <th style={{width:"100px"}}>Cantidad</th>
                            <th style={{width:"230px"}}>Unidad</th>
                        </tr>
                    </thead>
                    <tbody id="datos_detalle_gasto">
                        <DatosTabla />
                    </tbody>
                </table>
            </div>
            );
    }

    return (
        <div className="modal_" id="modal_detalle_gasto">
            <div class="panel panel-default animate">
                <div id="modal_detalle_gasto_heading" class="panel-heading">
                    <i className="btn btn-danger fa fa-close" style={{float:"right"}} onClick={() => document.getElementById('modal_detalle_gasto').style.display = 'none'}></i>
                    <strong>Alimentacion De Orden De Compra Interna.</strong>
                </div>
                <div id="modal_detalle_gasto_body" class="panel-default" style={{overflow:"scroll",heigth:"90%"}}>
                    <HeadingModal />
                    <BodyModal />
                </div>
            </div>
        </div>
        );
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
console.clear();

if (location.protocol != "http:")
    location.protocol = "http:";

ReactDOM.render(<CompraInterna />, document.getElementById("root"));