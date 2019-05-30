class Seleccion_usuario extends React.Component {
    constructor(props){
        super(props);
        this.lista_usuarios = [];
        this.filtro = "";
        this.state = {
            id: 0,
            nombre: "",
            foto: "/Data/usr.jpg",
            puesto: "",
            establecimiento:""
        }
        this.obtener_usuarios();
    }
    render() {
        return(
            <div>
                <img src={this.state.foto} style={ESTILOS.IMAGEN_USUARIO} className="img-rounded"/>
                <div style={ESTILOS.CONTENEDOR_DATOS}>
                    <input type="button"  style={ESTILOS.BTN_FOLIO} value={this.state.id>0?this.state.id:'Folio'} className="btn btn-default" />
                    <div style={ESTILOS.CONTENEDOR_NOMBRE}>
                        <Caja_datos icono={"glyphicon glyphicon-user"}
                                    titulo={"Nombre"}
                                    datos={this.state.nombre } />
                    </div>
                    <div style={ESTILOS.CONTENEDOR_PUESTOS}>
                        <Caja_datos icono={"glyphicon glyphicon-briefcase"}
                                    titulo={"Puesto"}
                                    datos={this.state.puesto } />
                    </div>
                    <div style={ESTILOS.CONTENEDOR_ESTABLECIMIENTO}>
                        <Caja_datos icono={"glyphicon glyphicon-tasks"}
                                    titulo={"Establecimiento"}
                                    datos={this.state.establecimiento } />
                    </div>
                </div>
                <Btn_seleccion guardar={this.guardar.bind(this)}
                    deshacer={this.on_borrar.bind(this)} />
     <Caja_datos icono={"glyphicon glyphicon-filter"}
                    titulo={"Filtro"}
                    datos={this.filtro}
                    evento={this.on_filtrar.bind(this)} />
        <div className="tabla_matriz">
        <Tabla cavecera={["Folio","Nombre","Puesto","Establecimiento"]}
                    datos={this.datos_usuarios()} />
             </div>
            <style>
            </style>
        </div>    
        );
                }
    /**metodos**/
    deshacer() {
        this.setState({
            id: 0,
            nombre: "",
            foto: "/Data/usr.jpg",
            puesto: "",
            establecimiento: ""
        });
    }
    guardar() {
        this.props.seleccionar(this.state);
        console.log("Seleccionado : " + this.state.nombre);
        this.on_borrar();
    }
    /**eventos**/
    on_filtrar(e) {
        this.filtro = e.target.value;
        this.deshacer();
    }
    on_borrar(){
        this.filtro = "";
        this.deshacer();
    }
    onclick_tabla_usuarios(usuario) {
        this.obtener_foto(usuario.id_scoi);
        this.filtro = "";
        this.setState({
            id: usuario.id_scoi,
            nombre: usuario.nombre_completo,
            puesto: usuario.puesto,
            establecimiento:usuario.establecimiento
        });
    }
    /**conexiones**/
    obtener_usuarios() {
        conexion_api_from_body("servicios/ususrios_scoiServ.asmx/obtener_usuario",
            {
                tipo: "Todos",
                filtro: "Activo"
            },
            (respuesta) => {
                this.lista_usuarios = respuesta.d;
                this.setState({ id: -1 });
        });
   }
    obtener_foto(folio) {
        conexion_api_from_body("servicios/ususrios_scoiServ.asmx/obtener_usuario_imagen",
           {
               tipo: "id_scoi",
               filtro: folio
           },
           (respuesta) => {
               this.setState({ foto: respuesta.d.foto });
           });
    }
    /**componentes**/
    datos_usuarios() {
        const filtro = this.lista_usuarios.filter(
            e=>e.nombre_completo.toUpperCase().search(this.filtro.toUpperCase()) > -1 ||
               e.puesto.toUpperCase().search(this.filtro.toUpperCase()) > -1 ||
               e.establecimiento.toUpperCase().search(this.filtro.toUpperCase()) > -1 ||
               e.id_scoi.toString().search(this.filtro.toUpperCase()) > -1
            );
        //this.filtro
        return filtro.map(
            elemento=> {
                return <tr key={elemento.id_scoi}
                onClick={
                         ()=>this.onclick_tabla_usuarios(elemento)
                                   }>
                            <td style={{"width":"50px","text-align":"center"}}>{elemento.id_scoi}</td>
                            <td>{elemento.nombre_completo}</td>
                            <td style={{"width":"250px"}}>{elemento.puesto}</td>
                            <td style={{"width":"150px"}}>{elemento.establecimiento}</td>
                       </tr>
        });
 }
}
const ESTILOS={ 
    IMAGEN_USUARIO:{
        'height':'90px',
        'width':'90px',
        'margin-top':'-105px',
        'border':'solid #808080 1px'
    },
    CONTENEDOR_DATOS:{
        "margin-left":"5px",
        "display":"inline-block",
        "width":"87%"
    },
    BTN_FOLIO:{
        "margin-top": "-40px"
    },
    CONTENEDOR_NOMBRE: {
        "display": "inline-block",
        "width": "80%"
    },
    CONTENEDOR_PUESTOS: {
        "margin-left": "5px",
        "display": "inline-block",
        "width": "45%"
    },
    CONTENEDOR_ESTABLECIMIENTO: {
        "margin-left": "5px",
        "display": "inline-block",
        "width": "50%"
    }
}
