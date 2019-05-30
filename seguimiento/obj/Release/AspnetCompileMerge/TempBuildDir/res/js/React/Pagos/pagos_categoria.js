
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nuevo: false,
            edicion:false,
            categoria: {
                folio: -1,
                descripcion: '',
                prioridad: 1,
                color: '#FFFFFF',
                folio_usuario: ID_SCOI,
                estatus: 'V'
            },
            lista_categorias:[]
        }
        this.nuevo = this.on_nuevo.bind(this);
        this.editar = this.on_editar.bind(this);
        this.deshacer = this.on_deshacer.bind(this);
        this.guardar = this.on_guardar.bind(this);

        this.descripcion = this._cambio_descripcion.bind(this);
        this.prioridad = this._cambio_prioridad.bind(this);
        this.color = this._cambio_color.bind(this);
        this.estatus = this._cambio_estatus.bind(this);
        this.seleccion_categoria = this.on_seleccion_categoria.bind(this);
        this.Obtener_categorias();
    }
    render() {
        return (
            <div className="panel panel-default" style={estilos.principal}>
                <Cavecera edicion={this.state.edicion} crear={this.state.nuevo}
                    nuevo={this.nuevo}
                    guardar={this.guardar}
                    editar={this.editar}
                    deshacer={this.deshacer}
                    campos={this.state.categoria}
                    descripcion={this.descripcion}
                    prioridad={this.prioridad}
                    color={this.color}
                    estatus={this.estatus}
                />
                
                <div className="panel-body" style={estilos.cuerpo_tabla}>
                    <TablaCategorias lista={this.state.lista_categorias}
                        seleccion={this.seleccion_categoria}/>
                </div>
            </div>
            );
    }
    on_nuevo() {
        if (!this.state.edicion) {
            console.log("Nuevo...");
            this.setState({
                nuevo: true,
                edicion: true,
                categoria: {
                    folio: -1,
                    descripcion: '',
                    prioridad: 1,
                    color: '#FFFFFF',
                    folio_usuario: ID_SCOI,
                    estatus: 'V'
                
                }
            });
        } else alert("En Edicion...");
    }
    on_editar() {
        if (!this.state.edicion) {
            if (this.state.categoria.folio > 0) {
                console.log("Editar...");
                this.setState({ nuevo: false, edicion: true });
            } else alert("Seleccione Una Categoria A Editar!!!");
        } else alert("En Edicion...");
    }
    on_deshacer() {
        console.log("Deshacer...");
        this.setState({
            nuevo: false,
            edicion: false,
            categoria: {
                folio: -1,
                descripcion: '',
                prioridad: 1,
                color: '#FFFFFF',
                folio_usuario: ID_SCOI,
                estatus: 'V'
            }});
    }
    on_guardar() {
        if (this.state.edicion) {
            if (this.Comprobar_formulario()) {
                console.log("Guardar...");
                this.Enviar_categiria();
            }
        }
    }
    on_seleccion_categoria(seleccion) {
        seleccion.folio_usuario = ID_SCOI;
        this.setState({categoria:seleccion});
    }
    _cambio_descripcion(e) {
        const datos =  this.state.categoria;
        datos.descripcion = e.target.value;
        this.setState({categoria:datos});
    }
    _cambio_prioridad(e) {
        const datos = this.state.categoria;
        datos.prioridad = e.target.value;
        this.setState({ categoria: datos });
    }
    _cambio_color(e) {
        const datos = this.state.categoria;
        datos.color = e.target.value;
        this.setState({ categoria: datos });
    }
    _cambio_estatus(e) {
        const datos = this.state.categoria;
        datos.estatus = e.target.value;
        this.setState({ categoria: datos });
    }
    /*metodos*/
    Comprobar_formulario() {
        return this.state.categoria.descripcion != "";
    }
    /*conexiones*/
    Obtener_categorias() {
        conexion_api_from_body("servicios/Pagos/conexiones.asmx/Obtener_categorias",
            {},
            (lista) => {
                console.log(lista.d);
                this.setState({lista_categorias:lista.d});
            });
    }
    Enviar_categiria() {
        conexion_api_from_body("servicios/Pagos/conexiones.asmx/Guardar_categorias",
            { 
                categoria:this.state.categoria
            },
            (respuesta) => {
                console.log(respuesta.d);
                alert(respuesta.d);
                this.deshacer();
                this.Obtener_categorias();
            });
    }
}

class Cavecera extends React.Component {

    render() {
        return (
            <div className="panel-heading">
                <Botonera crear={this.props.crear} edicion={this.props.edicion}
                    nuevo={this.props.nuevo}
                    editar={this.props.editar}
                    deshacer={this.props.deshacer}
                    guardar={this.props.guardar} />
                <Formulario edicion={this.props.edicion}
                    campos={this.props.campos}
                    descripcion={this.props.descripcion}
                    prioridad={this.props.prioridad}
                    color={this.props.color}
                    estatus={this.props.estatus}
                />
            </div>
        );
    }
}
const Botonera = (props) => {
    const NUEVO = props.crear ? "btn btn-info fa fa-plus-square" : "btn btn-primary fa fa-plus-square";
    const EDICION = props.edicion && !props.crear ? "btn btn-info fa fa-edit" : "btn btn-primary fa fa-edit";
    return (
        <div>
            <Boton titulo={"Nuevo"} evento={props.nuevo} clase={NUEVO} />
            <Boton titulo={"Editar"} evento={props.editar} clase={EDICION} />
            <Boton titulo={"Deshacer"} evento={props.deshacer} clase={"btn btn-primary fa fa-remove"} />
            <Boton titulo={"Guardar"} evento={props.guardar} clase={"btn btn-primary fa fa-download"} />
        </div>
    );
    function Boton(props) {
        return (
            <i className={props.clase} onClick={props.evento}>
                <strong style={estilos.btn}>{props.titulo}</strong>
            </i>
        )
    }
}
const Formulario = (props) => {
    
    const Importancia = () => <div className="form-group" style={estilos.sub_componentes}>
                                <p><label>Prioridad</label></p>
                                
                                <select value={props.campos.prioridad}
                                    disabled={!props.edicion}
                                    onChange={props.prioridad}
                                    defaultValue={props.campos.prioridad}
                                    className="form-control">
                                    <option value="1">Normal</option>
                                    <option value="2">Media</option>
                                    <option value="3">Alta</option>
                                </select>
                             </div>

    const Color = () => <div className="form-group" style={estilos.sub_componentes} >
                            <p><label>Color</label></p>
                            <input type="color" disabled={!props.edicion}
                                className="form-control"
                                style={estilos._control}
                                value={props.campos.color} onChange={props.color} />
                        </div>

    const Estatus = () => <div className="form-group" style={estilos.sub_componentes} >
                            <p><label>Estatus</label></p>
                            <select onChange={props.estatus} disabled={!props.edicion}
                                defaultValue={props.campos.estatus}
                                className="form-control">
                                <option value="V">Vigente</option>
                                <option value="C">Cancelado</option>
                            </select>
                        </div>
    return (
        <div id="formulario">
            <div className="form-group" style={estilos.campo_texto}>
                <label>Descripcion</label>
                <input type="text" className="form-control" disabled={!props.edicion}
                    onChange={props.descripcion}
                    value={props.campos.descripcion} />
            </div>
            <Importancia />
            <Estatus />
            <Color />
        </div>
    );
}

class TablaCategorias extends React.Component {

    render() {
        return (
                <table className="table">
                <thead style={estilos.cavecera}>
                    <tr className="success">
                        <th style={estilos.chico}>Folio</th>
                        <th>Descripcion</th>
                        <th style={estilos.chico}>Prioridad</th>
                        <th style={estilos.chico}>Color</th>
                        <th style={estilos.chico}>Estatus</th>
                        <th style={estilos.chico}>Eliminar</th>
                    </tr>
                </thead>
                <DatosTabla lista={this.props.lista} seleccion={this.props.seleccion} />
                </table>
        );
    }
}
const DatosTabla = (props) => {
    return (
        <tbody>
            <Datos />
        </tbody>);

    function Datos() {
        return props.lista.map(
            e => (
                <tr key={e.folio} onClick={()=>props.seleccion(e)}>
                    <td>{e.folio}</td>
                    <td>{e.descripcion}</td>
                    <td>
                        <Prioridad p={e.prioridad} />
                    </td>                
                    <td >
                        <input type="color" disabled value={e.color} />   
                    </td>
                    <td>{e.estatus.toUpperCase().search("V")>-1?"Vigente":"Cancelado"}</td>
                    <td>
                        <i className="btn btn-danger fa fa-trash-o" onClick={props.borrar(e)}></i>
                    </td>
                </tr>)
        );
    }
    function Prioridad(props) {
        var r;
        if (props.p==1)
           r = <strong>Normal</strong>
        if (props.p==2)
            r = <strong>Media</strong>
        if (props.p==3)
             r = <strong>Alta</strong>
        return r;
    }
}

const estilos = {
    principal: {height: "90%", position: "center" },
    btn: { marginLeft: "5px" },
    sub_componentes: {
        display: "inline-block",
        marginLeft:"10px"
    },
    campo_texto: {
        display: "inline-block",
        marginLeft: "10px",
        width: "650px"
    },
    _control: {
        width:"70px"
    },
    cuerpo_tabla: {
        height: "600px",
        overflow:"auto"
    },
    cavecera: {
        position: "sticky",
        width: "100%",
        top: "0",
        zIndex: "999"
    },
    chico: {
        width: "80px",
        textAlign:"center"
    },
    mediano: {
        width: "150px",
        textAlign: "center"
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("container")
);