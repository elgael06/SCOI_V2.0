class Cuestionario extends React.Component {
    constructor(props) {
        super(props);
        this.lista_establecimientos = [];
        this.lista_cuestionarios = [];
        this.state = {
            folio: -1,
            nombre: "",
            asignados:[]
        };

        this.obtener_establecimientos();
        this.obtener_cuestionarios();
    }
    render() {
        return(
            <div>
                <Caja_datos_select titulo={"Establecimiento"}
                                   icono={"glyphicon glyphicon-tasks"}
                                   seleccion={this.on_seleccion_establecimiento.bind(this)}
                                   opciones={this.opciones_establecimientos()} />
                <div className="tabla_matriz">
                    <table className="table table-bordered">
                        <thead className="cavecera_tabla"  >
                             <tr style={{'background-color':'rgb(114, 183, 235)',"z-index":"99"}}>
                                 <th><span className="glyphicon glyphicon-list-alt"></span></th>
                                 <th>Folio</th>
                                 <th>Cuestionario</th>
                                 <th>Estatus</th>
                             </tr>
                        </thead>
                        <tbody>
                            {this.opciones_cuestionarios()}
                        </tbody>
                    </table>
                </div>
            </div>

            );
    }
    /**eventos**/
    on_seleccion_establecimiento(e) {
        this.setState({ folio: e.target.value });
        this.obtener_cuestionarios_establecimiento(e.target.value);
    }
    /**metodos**/
    agregar(elemento) {
        if (this.state.folio > 0) {
            const lista = this.state.asignados;
            if (!lista.includes(elemento)){
                this.guardar_cuestionario(elemento.folio);
                lista.push(elemento);
            }
            else {
                const p = lista.findIndex(e=>e.folio === elemento.folio);
                lista.splice(p, 1);
                this.borrar_cuestionario(elemento.folio);
            }

            this.setState({ asignados: lista });
        }
        else alert("Seleccione Establecimiento!!!");
    }
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        return dia + '/' + mes + '/' + d.getFullYear();
    }
    /**conexiones**/
    obtener_establecimientos() {
        conexion_api_2("servicios/checkListServ.asmx/buscar_establecimiento",
            (respuesta) => {
                this.lista_establecimientos = respuesta.d
                this.setState({
                    folio: -1
                });
            });
    }
    obtener_cuestionarios() {
        conexion_api_2("servicios/checkListServ.asmx/nombres_cuestionarios",
            (respuesta) => {
                this.lista_cuestionarios = respuesta.d
                this.setState({
                    folio: -1
                });
            });
    }
    obtener_cuestionarios_establecimiento(folio) {
        conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_R",
            {
                "id_establecimiento": folio, "fecha": this.fecha_hoy()
            },
            (respuesta) => {
                const lista =[];
                respuesta.d.forEach((elemento,posicion)=>{
                    lista.push(this.lista_cuestionarios.find(e=>e.folio == elemento.id_cuestionario));
                });

                this.setState({
                    asignados: lista
                });
            });
    }
    guardar_cuestionario(folio) {
        conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_guardar",
            {
                "id_establecimiento": this.state.folio,
                "cuestionario": folio
            },
           (respuesta) => {
               this.obtener_cuestionarios_establecimiento(this.state.folio);
           });
    }
    borrar_cuestionario(folio) {
        conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_borrar",
            {
                "id_establecimiento": this.state.folio,
                "cuestionario": folio
            },
           (respuesta) => {
               this.obtener_cuestionarios_establecimiento(this.state.folio);
           });
    }
    /**componentes**/
    opciones_establecimientos() {
        return [ <option value="-1">Seleccione Establecimiento</option>,
        this.lista_establecimientos.map(
        elemento=><option key={elemento.id_establecimiento} value={elemento.id_establecimiento}>{elemento.nombre_establecimiento}</option>)];
    }
    opciones_cuestionarios() {
        const checar = (elemento) => this.state.asignados.includes(elemento) ? "glyphicon glyphicon-check" : "glyphicon glyphicon-unchecked";
        return this.lista_cuestionarios.map(
                e=><tr onClick={ ()=>{this.agregar(e)}}>
                    <td>
                        <span style={{"z-index":0}} className={checar(e)}></span>
                    </td>
                    <td>{e.folio}</td>
                    <td>{e.nom_cuestionario}</td>
                    <td>{e.estatus?"Vigente":"Cancelado"}</td>        
                </tr>
            );
    }
}
ReactDOM.render(
    <Cuestionario />,
    document.getElementById("container")
    );