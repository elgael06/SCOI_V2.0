

/************************
           selector Establecimiento
 ********************************/
class Seleccion_establecimoento extends React.Component {
    constructor(props) {
        super(props);
        this.lista_establecimientos= conexion_ajax("servicios/checkListServ.asmx/buscar_establecimiento")
        this.state = {
            establecimiento: this.props.establecimiento != undefined ? this.propsestablecimiento : this.lista_establecimientos[0],
            matrices: [],
            encargados: [],
            etapa:[]
        }
    }
    lideres() {
        ReactDOM.render(
           <Lideres  establecimiento={this.state.establecimiento} />,
    document.getElementById("modal_matriz")
    );
    }
    establecimientos() {
        const r = this.lista_establecimientos.map((est) =>
            <option key={est.id_establecimiento} value={est.id_establecimiento}>{est.nombre_establecimiento }</option>);
                return r;
    }
    cambio_establecimiento(e) {
        const selecionado = this.lista_establecimientos.filter((est) => est.id_establecimiento == e.target.value);
        console.log(selecionado[0]);
        this.setState({ establecimiento: selecionado[0] });
        ReactDOM.render(
        <div>
            <Regresar_inicio />
            <h2 style={{"display":"inline-block","margin-left":"20px"}}>
               Establecimiento : { selecionado[0].nombre_establecimiento}
            </h2>
            <Selector_lideres  establecimiento={selecionado[0]} lider={{folio:"",nombre:"",puesto:""}} />
            <input type="button" className="btn btn-info" value="Seleccionar" data-toggle="modal" data-target="#modal_matriz" />
        </div>,
            document.getElementById("cavecera")
        );
    }
    render() {
        this.lideres();
        return(
            <div>
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-edit"></i> Establecimiento </span>
                    <select  className="form-control" onChange={ (e)=>this.cambio_establecimiento(e)} >
                        <option value="">Seleccionar Establecimientos</option>
                        {this.establecimientos()}
                    </select>
                </div>
           </div>
        );
    }
}
class Regresar_inicio extends React.Component {

    regresar() {
        ReactDOM.render(
            <Seleccion_establecimoento />,
            document.getElementById("cavecera")
        );
    }
    render() {
        return(
            <i className="glyphicon glyphicon-circle-arrow-left" style={{"font-size":"25px"}} onClick={ ()=>this.regresar()}>     </i>
            );
    }
}
/************************
  selector lider
************************/
class Selector_lideres extends React.Component {
    constructor(props) {
        super(props);
        this.state = { establecimiento: this.props.establecimiento };
    }
    render() {
        const lider = this.props.lider //!= undefined? this.props.lider:"";
        return(
           <div className="input-group">
               <span className="input-group-addon" ><i className="glyphicon glyphicon-user"></i> Encargado</span>
               <input className="form-control" id="Nom_Encargados" value={lider.nombre} type="text" disabled />
            </div> 
       );
    }
}
/************************
    filtro lider
************************/
class Lideres extends React.Component {
    constructor(props) {
        super(props);
        this.lideres_tienda = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" });
        this.lideres_tienda.sort(function (a, b) {
            if (a.nombre > b.nombre) { return 1;}
            if (a.nombre < b.nombre) { return -1;}
            return 0;
        });
        this.state = {
            lider: "",
            filtro: this.lideres_tienda
        }
    }
    cambioTexto(e) {
        const filtrados = this.state.filtro.filter((a) => {
            return (a.nombre.toUpperCase().search(e.target.value.toUpperCase()) >= 0 || a.puesto.toUpperCase().search(e.target.value.toUpperCase()) >= 0) ? true : false
        });
        this.setState({
            lider: "", filtro: e.target.value === "" ? this.lideres_tienda : filtrados
        });
    }
    crear_tabla() {
        return(
         <div className="tabla_lideres">
    <table className="table table-bordered">
        <thead>
            <tr className="info cavecera_tabla_lideres" >
                <th >ID</th>
                <th >NOMBRE</th>
                <th >PUESTO</th>
            </tr>
        </thead>
        <tbody>
            { this.lista() }
        </tbody>
    </table>
 </div>
       );
    }
    lista() {
        const r = this.state.filtro.map((empleado) =>
            <tr key={empleado.folio} style={{"background":"white"}} onClick={ ()=>{this.seleccion(empleado)} }>
        <td>{empleado.folio}</td>
        <td>{empleado.nombre}</td>
        <td>{empleado.puesto}</td>
    </tr>
            );
            return r;
        }
    seleccion(dato) {
        this.setState({ lider: dato });
    }
    seleccionar() {
        ReactDOM.render(
            <div>
                <Regresar_inicio />
                <h2 style={{"display":"inline-block","margin-left":"20px"}}>
                    Establecimiento : { this.props.establecimiento.nombre_establecimiento}
                </h2>
                <Selector_lideres  establecimiento={this.state.lider} lider={this.state.lider} />
                <input type="button" className="btn btn-success" value="Cambiar" data-toggle="modal" data-target="#modal_matriz" />
                <Seleccionar_matriz />
                <input type="button" value="Matriz" className="btn btn-info" data-toggle="modal" data-target="#modal_matriz_2"/>
            </div>,
            document.getElementById("cavecera")
        );
        ReactDOM.render(
            <Matriz matriz={{nombre:"",id:""}} establecimiento={this.props.establecimiento.nombre_establecimiento} />,
            document.getElementById("modal_matriz_2")
            );
        this.setState({ lider: ""});
    }
    render() {
        return(
           <div className="modal-dialog" style={{ "width":"97%","height":"600px"}}>
                <div className="modal-content" >
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4>lideres Tienda</h4>
                        <div className="input-group">
                            <span className="input-group-addon">
                                Seleccion :
                            </span>
                            <input className="form-control" type="text" disabled value={this.state.lider.nombre} placeholder="Seleccione De La Tabla..." />
                        </div>
                        <input type="button" className="btn btn-default"  data-dismiss="modal" value="Seleccionar."  onClick={ ()=>this.seleccionar()} />
                    </div>
            <div className="modal-body">
                <div className="input-group">
                <span className="input-group-addon">Filtro : </span>
                <input className="form-control selector" type="text" placeholder="Filtro..." onChange={ (e)=>{this.cambioTexto(e)}} />
                
                </div>
                {this.crear_tabla()}
            </div> 
            </div>
        </div>
        );
    }
}
class Seleccionar_matriz extends React.Component {
    render() {
        return (
             <div className="input-group">
               <span className="input-group-addon" ><i className="glyphicon glyphicon-th"></i> Matriz</span>
               <input className="form-control" id="Nom_Encargados"  type="text" disabled />
            </div> 
             
            );
    }
}
class Matriz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matriz:this.props.matriz
        }
    }
    render() {
        return(
           <div className="modal-dialog" style={{ "width":"97%","height":"600px"}}>
                <div className="modal-content" >
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4>Establecimiento: {this.props.establecimiento}</h4>
                        <div className="input-group">
                            <span className="input-group-addon">
                                Seleccion :
                            </span>
                            <input className="form-control" type="text" disabled value={this.state.matriz.nombre} placeholder="Seleccione De La Tabla..." />
                        </div>
                        <input type="button" className="btn btn-default"  data-dismiss="modal" value="Seleccionar."  />
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                        <span className="input-group-addon">Filtro : </span>
                        <input className="form-control selector" type="text" placeholder="Filtro..." onChange={ (e)=>{this.cambioTexto(e)}} />
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Seleccion_establecimoento />,
    document.getElementById("cavecera")
    );