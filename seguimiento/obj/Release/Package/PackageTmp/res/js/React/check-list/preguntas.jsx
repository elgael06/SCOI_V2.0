class Vista_Preguntas extends React.Component {
    constructor(props) {
        super(props);
        this.lista_zonas = conexion_ajax("servicios/preguntasServ.asmx/obtener_preguntas") || [];
        this.lista_pertenece = conexion_ajax("servicios/preguntasServ.asmx/obtener_areas") || [];
        this.state = {
            folio_pregunta: "",
            pregunta: '',
            estatus: true,
            pertenece: "",
            edicion: false,
            nuevo: false,
            posicion: -1
        };
    }
    render() {
        const fol = "folio : " + this.state.folio_pregunta;
        return (
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
                    onClick={(e) => alert(e.target.value)}
                    className="btn btn-default caja_folio" />
                <label className="caja_nombre">
                    <Caja_datos icono={"glyphicon glyphicon-edit"}
                        titulo={"Pregunta"}
                        datos={this.state.pregunta}
                        evento={this.on_cambio_nombre_zona.bind(this)} />
                </label>
                <label className="">
                    <Caja_datos_select icono={"glyphicon glyphicon-question-sign"}
                        titulo={"Estatus"}
                        seleccion={this.on_cambio_estatus.bind(this)}
                        opciones={this.opciones_estatus()} />
                </label>
                <label className="">
                    <Caja_datos_select icono={"glyphicon glyphicon-question-sign"}
                        titulo={"Pertenece"}
                        seleccion={this.on_cambio_pertenece.bind(this)}
                        opciones={this.opciones_pertenece()} />
                </label>
                <Tabla_preguntas lista_zonas={this.lista_zonas} posicion={this.state.posicion} on_seleccion_de_tabla={this.on_seleccion_de_tabla.bind(this)} />
            </div>
        );
    }
    nueva() {
        if (!this.state.edicion) {
            console.log("Nuevo");
            this.setState({
                folio_pregunta: 0,
                pregunta: '',
                estatus: true,
                edicion: true,
                nuevo: true,
                pertenece: "",
                posicion: -1
            });
        } else alert("Edicion Activada!!!")
    }
    editar() {
        if (!this.nuevo)
            if (this.state.folio_pregunta != "") {
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
            const url = "/servicios/preguntasServ.asmx/guardar_datos";
            const obj = {
                "folio_pregunta": this.state.folio_pregunta,
                "pregunta": this.state.pregunta,
                "estatus": this.state.estatus ? 1 : 0,
                "pertenece": this.state.pertenece
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    response.json().then((myJson) => {
                        this.lista_zonas = conexion_ajax("servicios/preguntasServ.asmx/obtener_preguntas") || [];
                        this.deshacer();
                        alert("Guardado...\nFolio : " + myJson.d);
                    });
                })
                .catch(error => alert('Error:', error))
        }
    }
    deshacer() {
        console.log("Deshacer...");
        this.setState({
            folio_pregunta: "",
            pregunta: '',
            estatus: true,
            edicion: false,
            nuevo: false,
            pertenece: "",
            posicion: -1
        });
    }
    on_cambio_nombre_zona(e) {
        if (this.state.edicion)
            this.setState({ pregunta: e.target.value });
        else alert("edicion Inactiva")
    }
    on_cambio_estatus(e) {
        var estatus = e.target.value == "V";
        this.setState({ estatus: estatus });
    }
    on_cambio_pertenece(e) {
        this.setState({ pertenece: e.target.value });
    }
    on_seleccion_de_tabla(seleccion, pos) {
        if (!(this.state.edicion || this.state.nuevo)) {
            this.setState({
                folio_pregunta: seleccion.folio_pregunta,
                pregunta: seleccion.pregunta,
                estatus: seleccion.estatus,
                pertenece: seleccion.pertenece,
                posicion: pos
            });
        } else alert("Edicion En Proceso...");
    }
    borrar_zona(zona) {
        console.log("folio A Borrar :" + zona.folio_pregunta);
        if (confirm("Desea Borrar la Zona : " + zona.pregunta)) {
            const url = "servicios/servicios_generales/conexiones.asmx/servicios_borrar_criterio";
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ "folio": zona.folio_pregunta }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    response.json().then((myJson) => {
                        this.lista_zonas = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_criterio") || [];
                        this.deshacer();
                        alert("Borrado...\nFolio : " + myJson.d);
                    });
                })
                .catch(error => alert('Error:', error))
        }
    }
    opciones_estatus() {
        const est = this.state.estatus;
        return [
            <option selected={est} value="V">Vigente</option>,
            <option selected={!est} value="C" >Cancelado</option>
        ]
    }
    opciones_pertenece() {
        const est = this.state.pertenece;

        const a=this.lista_pertenece.map(elemento => {
            return <option value={elemento} selected={this.state.pertenece == elemento}>{elemento}</option>
        });
        return [<option value="-1" >Seleccione..</option>,a];
    }
}
class Tabla_preguntas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro:''
        }
    }
    render() {
        return (
            <div>
                <input type="text"
                    className="form-control"
                    placeholder="filtro"
                    onChange={this.on_filtro.bind(this)}
                    value={this.state.filtro}/>
                <div className="cuerpo_tabla">
                    <Tabla cavecera={[<h5>Folio</h5>, <h5>Criterios</h5>, <h5>Estatus</h5>, <h5>Pertenece</h5>]}
                        datos={this.datos_zonas()} />
                </div>
            </div>
            );
    }
    on_filtro(event) {
        this.setState({ filtro:event.target.value});
    }
    datos_zonas() {
        const filtro_ = this.state.filtro.toUpperCase() ;
        const lista = this.props.lista_zonas.filter(
            e => e.folio_pregunta.toString().search(filtro_) > -1 ||
                e.pregunta.toUpperCase().search(filtro_)>-1
        );
        return lista.map(
            (elemento, pos) => {
                const clase = this.props.posicion == pos ? "seleccio" : "";
                return <tr className={clase} style={{ "border-bottom": "solid 1px  #000000" }}
                    onClick={() => this.props.on_seleccion_de_tabla(elemento, pos)}>
                    <td style={{ "width": "50px" }}>{elemento.folio_pregunta}</td>
                    <td>{elemento.pregunta}</td>
                    <td style={{ "width": "90px" }}>{elemento.estatus ? "Vigente" : "Cancelado"}</td>
                    <td style={{ "width": "10px" }}>{elemento.pertenece}</td>
                </tr>
            }
        );
    }
}
ReactDOM.render(
    <Vista_Preguntas />,
    document.getElementById("container")
);