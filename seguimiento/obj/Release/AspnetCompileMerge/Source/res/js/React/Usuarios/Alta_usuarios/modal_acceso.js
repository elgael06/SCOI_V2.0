
class ModalAccesoUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="modal_accesso_usuario" style={{
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.49)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9991,
                display: "none"
            }}
            >
                <div className="panel panel-default animate" style={{ height: "90%", minHeight: "400px", width: "95%", maxWidth: "700px", minWidth: "400px" }} >
                    <Heading cerrar={()=>this.cerrar()} />
                    <div className="panel-success" style={{ height: "87%" }}  >
                        <DatosUsuario usuario={this.props.usuario} />
                        <h4 style={{ marginLeft: "10px"}}>Accesos:</h4>
                        <ListaAccesos
                            evento={this._cambiar.bind(this)}
                            lista={this.props.accesos} />
                    </div>
                    <PieModal
                        guardar={()=>this.Guardar_accesos()}
                        cerrar={() => this.cerrar()} />
                </div>
            </div>
        );
    }
    /*eventos */
    cerrar() {
        document.getElementById("modal_accesso_usuario").style.display = 'none';
    }
    _cambiar(posicion) {
        this.props.accesos[posicion].acceso = !this.props.accesos[posicion].acceso;
        this.setState({});
    }
    /*Metodos */

    /*Conexiones */
    Guardar_accesos() {
        document.getElementById("ico_carga").style.display = 'flex';
        const url = 'servicios/accesoServ.asmx/guardar_lista';
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    accessos: this.props.accesos
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
                        alert(`Se Actualizaron ${r.d} Accesos.`);
                        this.cerrar(); 
                        document.getElementById("ico_carga").style.display = 'none';
                    })
            })
            .catch(e => {
                alert(e)
            });
    }
}
const Heading = ({ cerrar}) => {

    return (
            <div className="panel-heading" style={{ height: "8%", background: "#009933", color: "#e6ffee", fontSize: "18px" }} >
                <i className="close fa fa-close"
                onClick={cerrar}></i>
            <i className="glyphicon glyphicon-lock"
                style={{ marginLeft: "5px" }}
            >
            </i>
                <strong>Edicion Accesos Usuario.</strong>
            </div>
        );
}
const DatosUsuario = ({usuario})=>{

    return (
        <div className="panel-heading">
            <div style={{ display: "inline-block", marginRight: "15px" }} >
                <img alt={usuario.id_scoi} src={usuario.foto} style={{ width: "90px" }}
                    className="img-thumbnail"
                />
            </div>
            <div style={{ width: "70px", display: "inline-block" }}>
                <strong>ID SCOI</strong>
                <i className="form-control" > {usuario.id_scoi} </i>
            </div>
            <div style={{ width: "330px",marginLeft:"10px", display: "inline-block" }}>
                <strong>NOMBRE</strong>
                <i className="form-control" > {usuario.nombre_completo} </i>
            </div>
        </div>
        );
}
const ListaAccesos = ({ lista, evento }) => {

    const Acceso = ({ acceso, posicion }) => {
        const dato = acceso ? "success fa fa-unlock" : "warning fa fa-lock";//fa fa-toggle-on fa fa-toggle-off
        const texto = !acceso ?"Bloqueo.":"Acceso.";

        return <i onClick={() => evento(posicion)} className={`btn btn-${dato}`}> {texto}</i>
    }
    const FilaSubMenu = ({ e,p }) => {
        return (
            <tr key={e.id_sub_menu}>
                <td>{e.sub_menu}</td>
                <th style={{width:"100px"}}>
                    <Acceso acceso={e.acceso} posicion={p} />
                </th>
            </tr>
            );
    }
    const FilaMenu = ({ e }) => {
        return (
            <tr key={e.id_sub_menu} style={{ background:"#336600"}}>
                <th style={{color:"azure"}} colSpan="2">{e.menu}</th>
            </tr>
            );
    }
    var menu = ''; 
    return (
        <div className="panel-body" style={{height:"450px",overflow:"scroll"}}>
            <table className="table">
                <tbody>
                    {
                        lista.map((e, p) => {
                            const Datos = [];
                            if (menu != e.menu) {
                                menu = e.menu
                                Datos.push(<FilaMenu e={e} />);
                            }
                            if (menu == e.menu){
                                Datos.push(<FilaSubMenu e={e} p={p} />);
                            }

                            return Datos;
                        })
                    }
                </tbody>
            </table>
        </div>
        );
}
const PieModal = ({ guardar, cerrar }) => {

    return (
        <div className="panel-footer"   >
            <i className="btn btn-success" onClick={guardar}>
                Guardar
                            <i className="glyphicon glyphicon-download-alt"
                    style={{ marginLeft: "5px" }}></i>
            </i>
            <i className="btn btn-default" style={{ float: "right" }} onClick={cerrar} >
                Salir
                            <i className="fa fa-close"
                    style={{ marginLeft: "5px" }}></i>
            </i>
        </div>
        );
}