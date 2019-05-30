 class AltaUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                id_scoi: -1,
                foto: '/Data/usr.jpg',
                nombre: '',
                establecimiento: '',
                departamento: '',
                puesto: '',
                correo: ''
            }
        }
    }
    render() {
        return (
            <div className="panel-heading">
                <h3 style={{ marginLeft: "5px" }}> Agregar Usuario SCOI Web.</h3>
                <i className="btn btn-info" style={{ position: "absolute", marginTop: "63px", marginLeft: "105px" }}
                    onClick={()=>this.Agregar_usuaruio()}>
                    <strong> Agregar</strong>
                    <i className="glyphicon glyphicon-download-alt" style={{marginLeft:"5px"}}></i>
                </i>
                <ObtenerUsuario
                    usuario={this.state.usuario}
                    colocar={(e) => this.on_id_scoi(e)}
                    Buscar={() => this.on_buscar_usuario()}
                />
                <DatosUsiario
                    usuario={this.state.usuario} />

                <Cargar nombre={"ico_carga"} />
            </div>
        );
    }
    /*eventos*/
    on_id_scoi(event) {
        const usuario = this.state.usuario;
        usuario.id_scoi = event.target.value;
        this.setState({ usuario: usuario });
    }
    on_buscar_usuario() {
        const id = this.state.usuario.id_scoi;
        if (id > 0) {
            document.getElementById("ico_carga").style.display = 'flex';
            this.Obtener_usuario(id);
        } else {
            alert("Coloque ID SCOI");
            this.setState({
                usuario: {
                    id_scoi: -1,
                    foto: '/Data/usr.jpg',
                    nombre: '',
                    establecimiento: '',
                    departamento: '',
                    puesto: '',
                    correo: ''
                }
            });
        }
    }
    /*metodos*/
     Agregar_usuaruio() {
         const id = this.state.usuario.id_scoi;
         console.log(`Usuario : ${id}.`);
         if (id > 0) {
             document.getElementById("ico_carga").style.display = 'flex';
             this.Obtener_usuario(id);
             this.Comprobar_usuario();
         } else alert("Error de Usuario...");

     }
    /*conexiones*/
    Obtener_usuario(id) {
        fetch("servicios/ususrios_scoiServ.asmx/obtener_usuario",
            {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    tipo: 'id_scoi',
                    filtro:id
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(e => {
            e.json().then(r => {
                const usuario_ = r.d[0];
                var usuario = this.state.usuario;
                if (usuario_) {
                    usuario.nombre = usuario_.nombre_completo;
                    usuario.establecimiento = usuario_.establecimiento;
                    usuario.departamento = usuario_.departamento;
                    usuario.puesto = usuario_.puesto;
                    this.Obtener_foto(id);
                }
                else {
                    usuario = {
                        id_scoi: -1,
                        foto: "/Data/usr.jpg",
                        nombre: '',
                        establecimiento: '',
                        departamento: '',
                        puesto: '',
                        correo: ''
                    }
                    alert("ID SCOI NO VALIDO O INACTIVO...");
                }
                this.setState({ usuario: usuario});
                document.getElementById("ico_carga").style.display = 'none';
            })
        })
        .catch(e => {
            alert(e)
        });
     }
    Obtener_foto(id) {
         fetch("servicios/ususrios_scoiServ.asmx/obtener_usuario_imagen",
             {
                 method: 'POST', // or 'PUT'
                 body: JSON.stringify({
                     tipo: 'id_scoi',
                     filtro: id
                 }), // data can be `string` or {object}!
                 headers: {
                     'Content-Type': 'application/json'
                 }
             }
         )
             .then(e => {
                 e.json().then(r => {
                     const usuario_ = r.d;
                     var usuario = this.state.usuario;
                     if (usuario_) {
                         usuario.foto = usuario_.foto;
                     }
                     else {
                         usuario.foto = "/Data/usr.jpg";
                         alert("ERROR DE FOTO...");
                     }
                     this.setState({ usuario: usuario });

                 })
             })
             .catch(e => {
                 alert(e)
             });
     }
     Comprobar_usuario() {
         document.getElementById("ico_carga").style.display = 'flex';
        fetch("servicios/ususrios_scoiServ.asmx/Comprobar_usuario",
            {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    folio: this.state.usuario.id_scoi
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }
         )
        .then(e => {
            e.json().then(r => {
                if (r.d > 0) {
                    document.getElementById("ico_carga").style.display = 'none';
                    if (confirm(`Usuario Folio : ${r.d}, Se Encuentra Registrado.\n¿Desea Modifocar el Usuario?`))
                        this.Guardar_usuario();
                }
                else {
                    this.Guardar_usuario();
                }
                this.setState({});
            })
        })
        .catch(e => {
            alert(e)
        });
     } 
     Guardar_usuario() {
         document.getElementById("ico_carga").style.display = 'flex';
         console.info(this.state.usuario);
         fetch("servicios/ususrios_scoiServ.asmx/Guardar_usuario_por_id_scoi",
             {
                 method: 'POST', // or 'PUT'
                 body: JSON.stringify({
                     id_scoi: this.state.usuario.id_scoi
                 }), // data can be `string` or {object}!
                 headers: {
                     'Content-Type': 'application/json'
                 }
             }
         )
             .then(e => {
                 e.json().then(r => {
                     if (r.d == 0) {
                         alert(`Usuario Folio : ${r.d},No Se Pudo Registrar.`);
                     }
                     else {
                         alert(`Se Registro Con Exito el Usuario ${this.state.usuario.nombre} En Sistema Web.`);
                         this.setState({
                             usuario: {
                                 id_scoi: -1,
                                 foto: "/Data/usr.jpg",
                                 nombre: '',
                                 establecimiento: '',
                                 departamento: '',
                                 puesto: '',
                                 correo: ''
                             }
                         });
                         document.getElementById("ico_carga").style.display = 'none';
                     }
                 })
             })
             .catch(e => {
                 alert(e)
             });
     }
}
const ObtenerUsuario = ({ usuario, colocar, Buscar }) => {
    const id = usuario.id_scoi > 0 ? usuario.id_scoi : '';

    const on_buscar = (e) => {
        Buscar();
        e.preventDefault();
    }
    return (
        <form  style={{ display: "inline-block" }}>
            <div style={{ display: "inline-block", marginRight: "15px" }} >
                <img alt={id} src={usuario.foto} style={{ width: "90px"}}
                    className="img-thumbnail"
                 />
            </div>
            <div style={{ width: "70px", display: "inline-block" }}>
                <strong>ID SCOI</strong>
                <input type="text" className="form-control" value={id} onChange={colocar} />
            </div>
            <button className="btn btn-default glyphicon glyphicon-search"
                onClick={(e) => on_buscar(e)}>
            </button>
        </form>
    );
}
const DatosUsiario=({ usuario }) => {
    return (
        <div style={{ display: "inline-block", position: "absolute"}} >
            
            <div style={{ display: "inline-block", minWidth: "300px"}} >
                <label>Nombre</label>
                <div className="form-control">
                    {usuario.nombre}
                </div>
            </div>
            <div style={{ display: "inline-block", minWidth: "180px",marginLeft:"5px" }} >
                <label>Establecimiento</label>
                <div className="form-control">
                    {usuario.establecimiento}
                </div>
            </div>
            <div style={{ display: "inline-block", minWidth: "130px", marginLeft: "5px" }} >
                <label>Departamento</label>
                <div className="form-control">
                    {usuario.departamento}
                </div>
            </div>
            <div style={{ display: "inline-block", minWidth: "300px", marginLeft: "5px" }} >
                <label>Puesto</label>
                <div className="form-control">
                    {usuario.puesto}
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
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                fontSize: "40px"
            }}>
            <label id={nombre + 1}>
                <i className="fa fa-circle-o-notch rotate" ></i>
                <strong style={{ fontSize: "20px" }}> Cargando...</strong><br />
            </label>
        </div>
    )
}