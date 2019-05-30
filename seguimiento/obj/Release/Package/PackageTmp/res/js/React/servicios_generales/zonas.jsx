class Vista_Zonas extends React.Component{
    constructor(props) {
        super(props);
        this.lista_zonas = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_zona") || [];
        
        this.state = {
            folio: "",
            nombre: '',
            estatus: 'V',
            edicion: false,
            nuevo: false,
            posicion :-1
        };
    }
    render() {
        const fol = "folio : " + this.state.folio;
        return(
            <div>
                <Botonera nuevo={this.nueva.bind(this)}
                          editar={this.editar.bind(this)}
                          guardar={this.guardar.bind(this)}
                          deshacer={this.deshacer.bind(this)}
                          class_editar={this.state.edicion}
                          class_nuevo={this.state.nuevo} />
                <br />
                <input type="button" 
                       value={fol}
                       onClick={ (e)=>alert(e.target.value)}
                       className="btn btn-default caja_folio" />
                <label className="caja_nombre">
                    <Caja_datos icono={"glyphicon glyphicon-edit"}
                                titulo={"Zona"}
                                datos={this.state.nombre }
                                evento={this.on_cambio_nombre_zona.bind(this)} />
                </label>
                <label className="caja_estatus">
                    <Caja_datos_select icono={"glyphicon glyphicon-question-sign"}
                                       titulo={""}
                                       seleccion={this.on_cambio_estatus.bind(this)}
                                       opciones={this.opciones_estatus()} />
                </label>
                <br />
                <div className="cuerpo_tabla">
                    <Tabla cavecera={[<h5>Folio</h5>,<h5>Zona</h5>,<h5>Estatus</h5>,<h5>Borrar</h5>]}
                           datos={this.datos_zonas()} />
                </div>
            </div>
            );
    }
    nueva() {
        if (!this.state.edicion) {
            console.log("Nuevo");
            this.setState({
                folio: 0,
                nombre: '',
                estatus: 'V',
                edicion: true,
                nuevo: true,
                posicion: -1
            });
        }else alert("Edicion Activada!!!")
    }
    editar() {
        if (!this.nuevo)
            if (this.state.folio != "") {
                console.log("Editar...");
                this.setState({
                    edicion: true,
                    nuevo: false
                });
            } else alert("Sin Datos A editar!!!");
        else alert("Nueva Zona En Proceso...");
    }
    guardar() {
        if (this.state.edicion) {
            const url = "/servicios/servicios_generales/conexiones.asmx/servicios_guardar_actualizar_zonas_ckl";
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
             .then(response=> {
                 response.json().then((myJson) => {
                    this.lista_zonas = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_zona") || [];
                    this.deshacer();
                   alert("Guardado...\nFolio : " + myJson.d);
                 });
             })
             .catch(error =>alert('Error:', error))
        }
    }
    deshacer() {
        console.log("Deshacer...");
        this.setState({
            folio:"",
            nombre: '',
            estatus: 'V',
            edicion: false,
            nuevo: false,
            posicion:-1
       });
    }
    on_cambio_nombre_zona(e) {
        if( this.state.edicion )
            this.setState({ nombre: e.target.value });
        else alert("edicion Inactiva")
    }
    on_cambio_estatus(e) {
        var estatus = e.target.value;
        this.setState({ estatus: estatus });
    }
    on_seleccion_de_tabla(seleccion,pos) {
        if (!(this.state.edicion || this.state.nuevo)) {
            this.setState({
                folio: seleccion.folio,
                nombre: seleccion.nombre,
                estatus: seleccion.estatus,
                posicion: pos
            });
        } else alert("Edicion En Proceso...");
    }
    borrar_zona(zona) {
        console.log("folio A Borrar :" + zona.folio);
        if (confirm("Desea Borrar la Zona : " + zona.nombre)) {
            const url = "servicios/servicios_generales/conexiones.asmx/servicios_borrar_zona";
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ "folio": zona.folio }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
             .then(response=> {
                 response.json().then((myJson) => {
                     this.lista_zonas = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_zona") || [];
                     this.deshacer();
                     alert("Borrado...\nFolio : " + myJson.d);
                 });
             })
             .catch(error =>alert('Error:', error))
        }
    }

    opciones_estatus() {
        const est = this.state.estatus == 'V';
        return [
                    <option selected={est} value="V">Vigente</option>,
                    <option selected={!est} value="C" >Cancelado</option>
               ]
    }
    datos_zonas() {
        return this.lista_zonas.map(
            (elemento, pos) =>{
                const clase = this.state.posicion == pos ? "seleccio" : "";
             return <tr className={clase} style={{ "border-bottom":"solid 1px  #000000"}} onClick={()=>this.on_seleccion_de_tabla(elemento,pos)}>
                        <td style={{"width":"50px"}}>{elemento.folio}</td>
                        <td>{elemento.nombre}</td>
                        <td style={{"width":"90px"}}>{elemento.estatus =="V"?"Vigente":"Cancelado"}</td>
                        <td style={{"width":"10px"}}>
                            <span className="fa fa-close" onClick={()=>this.borrar_zona(elemento)}></span>
                        </td>
                    </tr>}
            );
    }
}

ReactDOM.render(
    <Vista_Zonas />,
    document.getElementById("container")
    );