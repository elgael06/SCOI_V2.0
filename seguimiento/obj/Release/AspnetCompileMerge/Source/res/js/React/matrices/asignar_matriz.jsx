
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL + ":90/api/"
const $URL_API_IZA = $MI_URL + ":180/api/"


class Asignar_matriz extends React.Component {
    constructor(props) {
        super(props);
        /*arreglo de datos*/
        this.lista_asignaciones = [];
        this.lista_establecimientos = [];
        this.lista_matrices = [];
        /*indicador de seleccion*/
        this.position = -1;
        this.state = {
            folio: -1,
            folio_establecimiento: -1,
            folio_matriz:-1,
            fecha_asignacion: this.fecha_hoy(),
            id_usuario: -1,
            usuario: "",
            Editable:false,
            nueva :false
        }
        this.obtener_asignaciones();
        this.obtener_establecimientos();
    }
    render() {
        return(
            <div>
                <h3>Asignacion Matrices.</h3>
                <Botonera nuevo={this.nuevo.bind(this)}
                          editar={this.editar.bind(this)}
                          guardar={this.guardar.bind(this)}
                          deshacer={this.deshacer.bind(this)}
                          class_editar={this.state.Editable}
                          class_nuevo={this.state.nueva} />
                 <div className="contenedor_datos">
                    <input type="button" value={this.state.folio>0?"F : "+this.state.folio:'Folio'} className="btn btn-default" />
                    <div style={{"width":"20%","display":"inline-block","margin-left":"5px"}}>
                         <Caja_datos_select titulo={""}
                                            icono={"glyphicon glyphicon-tasks"}
                                            seleccion={this.on_seleccion_establecimiento.bind(this)}
                                            opciones={this.opciones_establecimientos()} />
                    </div>
                    <div style={{"width":"40%","display":"inline-block","margin-left":"5px"}}>
                         <Caja_datos_select titulo={"Matriz"}
                                            icono={"glyphicon glyphicon-list-alt"}
                                            seleccion={this.on_seleccion_matriz.bind(this)}
                                            opciones={this.opciones_matrices()} />
                    </div>
                    <Caja_fecha fecha={this.state.fecha_asignacion}
                                evento={this.on_seleccion_fecha.bind(this)} />
                    <div className="" style={{"width":"70%","display":"inline-block","margin-left":"10px"}}>
                        <Caja_datos icono={"glyphicon glyphicon-user"}
                                    titulo={"Usuario"}
                                    datos={this.state.usuario} />
                        <i className="glyphicon glyphicon-search"
                           title="Buscar Usuario"
                           data-toggle="modal" data-target="#modal_usuarios"></i>
                    </div>
                 </div>
                <h3>Matrices Asignadas.</h3>
                 <div className="tabla_matriz">
                     <Tabla cavecera={["Folio","Matriz","Establecimiento","Fecha Asignacion","Usuario","Estatus",""]}
                            datos={this.datos_asignaciones()} />
                </div>
                <Modal id="modal_usuarios"
                       cerrar={ ()=>
                    {console.log("cancelar")}}
                    cavecera={<h3>Seleccion Usuario</h3>}
                    cuerpo={<Seleccion_usuario seleccionar={this.on_seleccion_usuario.bind(this)}  />}
                           />
                 </div>
        );
    }
    /**metodos**/
    nuevo() {
        console.log("nuevo");
        if (!this.state.Editable) {
            this.setState({
                folio: -1,
                folio_establecimiento: -1,
                fecha_asignacion: this.fecha_hoy(),
                id_usuario: -1,
                usuario: "",
                Editable: true,
                nueva: true
            });
        } else alert("Edicion Activa!!!");
    }
    editar() {
        
        if (this.position > -1) {
            if (!this.state.Editable && !this.state.nueva) {
                console.log("editar");
                this.setState({
                    Editable: true
                });
            } else alert("Edicion Activa!!!");
        } else alert("Seleccione una Matriz de la Tabla!!!");
    }
    guardar() {
        if (this.state.Editable) {
            console.log("guardar");
            console.log(this.comprobar_campos());
            if (this.comprobar_campos()) {
                const campos = this.state.folio + "," + this.state.folio_matriz + "," + this.state.id_usuario + ",'" + this.state.fecha_asignacion + "'";
                console.log(campos);
                this.enviar_datos(campos);
            } else alert("Verifique los Campos");
        } else alert("Nada Por Guardar...");
    }
    deshacer() {
        console.log("deshacer");
        this.obtener_asignaciones();
        this.obtener_establecimientos();
        this.position = -1;
        this.setState({
            folio: -1,
            folio_establecimiento: -1,
            folio_matriz:-1,
            fecha_asignacion: this.fecha_hoy(),
            id_usuario: -1,
            usuario: "",
            Editable: false,
            nueva: false
        });
    }
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        return dia + '/' + mes + '/' + d.getFullYear();
    }
    comprobar_campos() {
        return this.state.folio_establecimiento > -1 && this.state.id_usuario > -1 && this.state.usuario != "" && this.state.folio_matriz>-1;
    }
    /**eventos**/
    on_seleccion_establecimiento(e) {
        this.setState({ folio_establecimiento: e.target.value });
        this.obtener_matrices(e.target.value);
    }
    on_seleccion_usuario(usuario) {
        if (this.state.Editable)
            this.setState({ id_usuario: usuario.id, usuario: usuario.nombre });
        else {
            this.setState({ id_usuario: -1, usuario: "" });
            alert("Active Edicion...");
        }
    }
    on_seleccion_matriz(folio) {
        this.setState({folio_matriz:folio.target.value});
    }
    on_seleccion_fecha(e) {
        const f = e.target.value.split("-");
        console.log(f);
        if (f[0] > 0) {
            this.setState({ fecha_asignacion: f[2] + "/" + f[1] + "/" + f[0] });
        } else this.setState({ fecha_asignacion: this.fecha_hoy() });
        
    }
    on_seleccion_de_tabla_asignacion(asignacion, posicion) {
        console.log(asignacion);
        if (!this.state.Editable) {
            if (asignacion.estatus != 'Evaluacion' && asignacion.estatus != 'Finalizado') {
                if (asignacion.fecha_asignacion.search(" ") > -1)
                    asignacion.fecha_asignacion = asignacion.fecha_asignacion.split(" ")[0];

                this.position = posicion;
                this.obtener_matrices(asignacion.folio_establecimiento);

                this.setState({
                    folio: asignacion.folio,
                    folio_establecimiento: asignacion.folio_establecimiento,
                    folio_matriz: asignacion.folio_matriz,
                    fecha_asignacion: asignacion.fecha_asignacion,
                    id_usuario: asignacion.id_usuario,
                    usuario: asignacion.usuario,
                    Editable: false,
                    nueva: false
                });
            } else alert("No Editable...");
        } else alert("Edicion Activa!!!");
    }
    /**conexiones**/
    obtener_asignaciones() {
        conexion_api(`${$URL_API}Lista_asignaciones/`,
            (respuesta) => {
                this.lista_asignaciones = respuesta;
                this.setState({ folio: -1 });
        });
    }
    obtener_establecimientos() {
        conexion_api_2(`${$URL_API}obtener_establecimientos/`,
            (respuesta) => {
                this.lista_establecimientos = respuesta;
                this.obtener_matrices(-1);
                this.setState({ Editable: false });
        });
    }
    obtener_matrices(folio) {
        conexion_api_2(`${$URL_API}Lista_matrices/?folio_establecimiento=${folio}`,
            (respuesta) => {
                this.lista_matrices = respuesta;
                this.setState({ folio_matriz: -1 });
            });
    }
    enviar_datos(campos) {
        conexion_api_2(`${$URL_API}Lista_asignaciones/?Asignacion=${campos}`,
            (respuesta) => {
                this.deshacer();
                this.obtener_asignaciones();
                alert(respuesta);
            });
    }
    eliminar_asignacion(folio) {
        if (confirm("Eliminar...\n Folio : " + folio)) {
            conexion_api_2(`http://${$URL_API}Lista_asignaciones/?eliminar=${folio}`,
                (respuesta) => {
                    this.deshacer();
                    this.obtener_asignaciones();
                    alert(respuesta);

            });
        }
    }
    /**componentes**/
    datos_asignaciones() {
        var seleccionado = (posicion) =>posicion == this.position ? "seleccionado" : "";
        return this.lista_asignaciones.map(
            (elemento,posicion)=><tr key={elemento.folio} className={seleccionado(posicion)} onClick={ ()=>this.on_seleccion_de_tabla_asignacion(elemento,posicion)}>
                        <td>{elemento.folio}</td>
                        <td>{elemento.matriz}</td>
                        <td>{elemento.establecimiento}</td>
                        <td>{elemento.fecha_asignacion}</td>
                        <td title={elemento.id_usuario}>{elemento.usuario}</td>
                        <td>{elemento.estatus}</td>
                        <td><span className="glyphicon glyphicon-trash close" 
                                  title="Eliminar"
                                  onClick={(e)=>{
                                if(!e) var e = window.event;
                                e.cancelBubble = true;
                                if (e.stopPropagation) e.stopPropagation();
                                this.eliminar_asignacion(elemento.folio)}}></span></td>
                     </tr>
            );
    }
    opciones_establecimientos() {
        const r = this.lista_establecimientos.map(
            (e,p) => {
                const r = e.folio == this.state.folio_establecimiento;
                return  <option  selected={r} value={e.folio}> { e.nombre }</option>
            });
        return [<option value="-1"> Seleccion</option>
                , r];
    }
    opciones_matrices() {
        const r = this.lista_matrices.map(
            (e) => {
                const r = e.folio == this.state.folio_matriz;
                return  <option  selected={r} value={e.folio}> { e.nombre }</option>
            });
        return [<option value="-1"> Seleccion</option>
           , r];
    }
}

if (location.protocol != "http:")
    location.protocol = "http:";

ReactDOM.render(
    <Asignar_matriz />,
    document.getElementById("contenedor")
);