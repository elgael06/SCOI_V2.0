class ListaUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                folio:-1,
                id_scoi: -1,
                foto: '/Data/usr.jpg',
                nombre: '',
                nombre_completo:'',
                correo: ''
            },
            lista: [],
            filtro: '',
            accessos: []
        }
        this.on_filtro = this._filtro.bind(this);
        this.on_edicion = this._edicion.bind(this);
        this.on_accesos_usuario = this._accesos_usuario.bind(this);

        this.Obtener_Usuarios();
    }
    render() {
        return (
            <div className="panel-body" style={{ height: "450px" }}>
                <FiltroUsuarios
                    value={this.state.filtro}
                    event={this.on_filtro}
                />
                <TablaUsuarios
                    lista={this.state.lista}
                    filtro={this.state.filtro}
                    edicion={this.on_edicion}
                    accesos={this.on_accesos_usuario}
                    folio_usiario={this.state.usuario.folio_usiario}
                />
                <ModalEdicionUsuario
                    recargar={this.Obtener_Usuarios.bind(this)}
                    usuario={this.state.usuario} />
                <ModalAccesoUsuario
                    accesos={this.state.accessos}
                    usuario={this.state.usuario}
                />
            </div>
        );
    }
    /*eventos*/
    _filtro(e) {
        this.setState({ filtro:e.target.value});
    }
    _seleccionar(seleccion) {
        const sel =
        {
            folio: seleccion.id_usuario,
            id_scoi: seleccion.id_scoi,
            foto: seleccion.foto,
            nombre: seleccion.nombre_usuario,
            nombre_completo: seleccion.nombrecompleto_usuario,
            correo: seleccion.email_usuario
        }
        this.setState({usuario:sel})
    }
    _edicion(seleccion) {
        this._seleccionar(seleccion);
        document.getElementById("modal_edicion_usuario").style.display = 'flex';
    }
    _accesos_usuario(seleccion) {
        document.getElementById("ico_carga").style.display = 'flex';
        this._seleccionar(seleccion);
        this.Obtener_accesos(seleccion.id_usuario);
    }
    /*metodos*/
    /*conexiones*/
    Obtener_Usuarios() {
        const url = 'servicios/accesoServ.asmx/Obtener_lista_usuarios';
        fetch(url,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(e => {
            e.json()
               .then(r => {
                var lista = [];
                if (r.d.length > 0)
                    lista = r.d;
                else
                       alert("sin Usuarios...");

               document.getElementById("ico_carga").style.display = 'none';
               this.setState({ lista: lista });
               })
        })
        .catch(e => {
            alert(e)
        });
    }
    Obtener_accesos(folio) {
        const url = 'servicios/accesoServ.asmx/checar_acceso';
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    id_usuario: folio
                }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(e => {
                e.json()
                    .then(r => {
                        var lista = [];
                        if (r.d.length > 0)
                            lista = r.d;
                        else
                            alert("sin Usuarios...");
                        console.log(lista);
                        document.getElementById("ico_carga").style.display = 'none';
                        document.getElementById("modal_accesso_usuario").style.display = 'flex';
                        this.setState({ accessos: lista });
                    })
            })
            .catch(e => {
                alert(e)
            });
    }
}
const FiltroUsuarios = ({value,event }) => {
    return (
        <div>
            <strong> Filtro Usuarios:</strong>
            <input className="form-control" placeholder="Filtro..." value={value} onChange={event} />
        </div>
        );
}
const TablaUsuarios = ({ lista, filtro, edicion, accesos }) => {
    const filtro_ = filtro.toUpperCase(); 
    const lista_filtro = lista.filter(
        e => e.id_usuario.toString().search(filtro) > -1 || 
            e.nombre_usuario.toUpperCase().search(filtro_) > -1|| 
            e.nombrecompleto_usuario.toUpperCase().search(filtro_) > -1 || 
            e.id_scoi.toString().search(filtro) > -1
        ); 
    return (
        <div className="panel-default" style={{height:"380px",overflow:"scroll"}}>
            <table className ="table">
                <thead>
                    <tr className="info">
                        <th>folio</th>
                        <th>Nombre</th>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>SCOI</th>
                        <th>Editar</th>
                        <th>Accesos</th>
                    </tr>
                </thead>
                <tbody>
                    {lista_filtro.map(
                        e => <Usuarios
                            usuario={e}
                            accesos={accesos}
                            edicion={edicion}
                            key={e.id_usuario} />)}
                </tbody>
            </table>
        </div>
        );
}

const Usuarios = ({ usuario, edicion, accesos }) => {
    return (
        <tr>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.nombre_usuario}</td>
            <td>{usuario.nombrecompleto_usuario}</td>
            <td>{usuario.email_usuario}</td>
            <td>{usuario.id_scoi}</td>
            <td>
                <i className="btn btn-primary"
                    onClick={() => edicion(usuario)}
                >   Editar
                    <i className="glyphicon glyphicon-edit"
                        style={{ marginLeft: "5px" }}
                    >
                    </i>
                </i>
            </td>
            <td>
                <i className="btn btn-success"
                    onClick={() => accesos(usuario)}
                >   Accesos
                    <i className="glyphicon glyphicon-lock"
                        style={{marginLeft:"5px"}}
                    >
                    </i>
                </i>
            </td>
        </tr>
        );
}
