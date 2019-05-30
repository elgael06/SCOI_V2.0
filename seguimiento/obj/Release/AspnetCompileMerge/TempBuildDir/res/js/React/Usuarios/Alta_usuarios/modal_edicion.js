
class ModalEdicionUsuario extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
   
    render() {
        return (
            <div id="modal_edicion_usuario" style={{
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9991,
                display: "none"
            }} >

                <div className="panel panel-default animate" style={{ height: "240px", width: "95%", maxWidth: "700px", minWidth: "500px" }} >
                    <div className="panel-heading" style={{ height: "50px", background: "#0194ae", color: "azure", fontSize: "18px" }} >
                        <i className="close fa fa-close"
                            onClick={() => this.cerrar()}></i>
                        <strong>Edicion Usuario.</strong>
                    </div>
                    <div className="panel-default" style={{ height: "85%" }}  >
                        <Imagen
                            foto={this.props.usuario.foto}
                        />
                        <div style={{ width: "70px", display: "inline-block" }}>
                            <strong>Folio</strong>
                            <input
                                className="form-control"
                                disabled
                                value={this.props.usuario.folio}
                            />
                        </div>
                        <div style={{ width: "70px", marginLeft: "10px", display: "inline-block" }}>
                            <strong>ID SCOI</strong>
                            <input
                                className="form-control"
                                required
                                onChange={this.on_id_scoi.bind(this)}
                                value={this.props.usuario.id_scoi}
                            />
                        </div>
                        <div style={{ width: "330px", marginLeft: "10px", display: "inline-block" }}>
                            <strong>NOMBRE</strong>
                            <input
                                className="form-control"
                                required
                                onChange={this.on_nombre_completo.bind(this)}
                                value={this.props.usuario.nombre_completo}
                            />
                        </div>
                        <br />
                        <i style={{ marginLeft: "10px" }}
                            title="Reestablecer."
                            onClick={() => this.resetPass()}
                            className="btn btn-warning fa fa-history">
                            <strong style={{ marginLeft: "5px" }}>Contraseña</strong>
                        </i>
                        <div style={{ width: "210px", marginLeft: "10px", display: "inline-block" }}>
                            <strong>NOMBRE CORTO</strong>
                            <input
                                className="form-control"
                                required
                                onChange={this.on_nombre_corto.bind(this)}
                                value={this.props.usuario.nombre}
                            />
                        </div>
                        <div style={{ width: "270px", marginLeft: "10px", display: "inline-block", marginBottom: "10px" }}>
                            <strong>CORREO</strong>
                            <input
                                type="email"
                                className="form-control"
                                required
                                onChange={this.on_correo.bind(this)}
                                value={this.props.usuario.correo}
                            />
                        </div>
                        <PieModal
                            guardar={()=>this.guardar()}
                            cerrar={() => this.cerrar()}
                        />
                    </div>

                </div>
            </div>
        );
    }
    on_id_scoi(e) {
        this.props.usuario.id_scoi = e.target.value;
        this.setState({});
    }
    on_nombre_completo(e) {
        this.props.usuario.nombre_completo = e.target.value;
        this.setState({});
    }
    on_nombre_corto(e) {
        this.props.usuario.nombre= e.target.value;
        this.setState({});
    }
    on_correo(e) {
        this.props.usuario.correo = e.target.value;
        this.setState({});
    }
    guardar() {
        console.log(this.props.usuario);
        const usuario = this.props.usuario;
        if (usuario.nombre != "" && usuario.nombre_completo && usuario.correo != "") {
            this.Comprobar_nombre_corto(usuario.nombre);
        } else alert("Faltan Campos Por LLenar!!!");
    }
    cerrar() {
        document.getElementById("modal_edicion_usuario").style.display = 'none';
        this.props.recargar();
    }
    Comprobar_nombre_corto(nombre) {
        document.getElementById("ico_carga").style.display = 'flex';
        const url = 'servicios/accesoServ.asmx/Comprobar_nombre_corto';
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    nombre: nombre
                }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => {
                e.json()
                    .then(r => {
                        if (r.d == this.props.usuario.folio || r.d <=0 )
                            this.enviar_cambios();
                        else alert(`El Nombre Corto "${this.props.usuario.nombre}" Ya Esta En Uso !!!`);
                    })
            })
            .catch(e => {
                alert(e);
            });
    }
    enviar_cambios() {
        document.getElementById("ico_carga").style.display = 'flex';
        const url = 'servicios/accesoServ.asmx/guardar_cambios_usuario';
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    usuario: this.props.usuario
                }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => {
                e.json()
                    .then(r => {
                        if (r.d) {
                            alert(`Se Actualizaron Los Campos.`);
                            this.cerrar();
                            document.getElementById("ico_carga").style.display = 'none';
                        } else alert("Error A Guardar !!!");
                    })
            })
            .catch(e => {
                alert(e);
            });
    }
    resetPass() {
        document.getElementById("ico_carga").style.display = 'flex';
        const url = 'servicios/accesoServ.asmx/restaurar_pasword_usuario';
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    usuario: this.props.usuario
                }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => {
                e.json()
                    .then(r => {
                        if (r.d) {
                            alert(`Se Restauro La Contrasela A "1234567890".`);
                            document.getElementById("ico_carga").style.display = 'none';
                        } else alert("Error A Guardar !!!");
                    })
            })
            .catch(e => {
                alert(e);
            });
    }
}
const Imagen = ({ foto }) => {
    return (
        <div style={{ display: "inline-block", marginRight: "15px" }} >
            <img alt={usuario.id_scoi} src={foto} style={{ width: "90px" }}
                className="img-thumbnail"
            />
        </div>
    );
}
