class Cavecera_datos_edicion extends React.Component {
    
    render() {
        return(
            <div className="col-sm-12">
                <div className="form-group col-sm-2">
                    <label for="text" className="">Folio</label>
                    <input type="text"
                        disabled
                        className="form-control"
                        value={this.props.folio_cuestionario > 0 ? this.props.folio_cuestionario : ''}/>
                </div>
                <div className="form-group col-sm-10">
                    <label for="text" className="">Cuestionario</label>
                    <input type="text"
                        disabled={!this.props.edicion}
                        className="form-control"
                        value={this.props.nombre_cuestionario}
                        onChange={this.props.evento_cuestionario}
                        placeholder="Nombre Cuestionario" />
                </div>
                <div className="form-group col-sm-4">
                    <label className="">Estatus</label>
                    <select className="form-control"
                        onChange={this.props.evento_estatus}
                        disabled={!this.props.edicion}>
                        {this.estatus_com()}
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label className="">Establecimiento</label>
                    <select className="form-control"
                        onChange={this.props.evento_establecimiento}
                        disabled={!this.props.edicion} >
                        {this.establecimientos_com()}
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label className="">Departamento Aplica</label>
                    <select className="form-control"
                        onChange={this.props.evento_departamento_aplica}
                        disabled={!this.props.edicion} >
                        {this.depatamentos_com()}
                    </select>
                </div>
            </div>
        );
    }
    /**componentes**/
    estatus_com() {
        const estatus = (e) => e == this.props.estatus;
        return [
            <option value="V" selected={estatus("V")}>Vigente</option>,
            <option value="C" selected={estatus("C")}>Cancelado</option>
        ];
    }
    establecimientos_com() {
        const seleccion = (folio) => folio == this.props.folio_establecimiento;
        const r = this.props.lista_establecimientos.map(
            establecimiento => <option key={establecimiento.folio} selected={seleccion(establecimiento.folio)}
                value={establecimiento.folio}>
                {establecimiento.nombre}
            </option>);
        return [<option selected={seleccion(-1)}>Seleccion</option>, r];
    }
    depatamentos_com() {
        const seleccion = (folio) => folio == this.props.folio_departamento;
        const r = this.props.lista_departamentos_aplica_cuestionario.map(
            departamento => <option key={departamento.folio}
                value={departamento.folio}
                selected={seleccion(departamento.folio)}>
                {departamento.nombre}
            </option>);
        return [<option value="-1" selected={seleccion(-1)}>Seleccion</option>, r];
    }
}   
class Tabla_cuestionarios extends React.Component {

    render() {
        return (
            <table className="table">
                <thead className="panel panel-info">
                    <tr className="info">
                        <th>Folio</th>
                        <th>Cuestionario</th>
                        <th>Establecimiento</th>
                        <th>Departamento Aplica</th>
                        <th>Modificacion</th>
                        <th>Estatus</th>
                        <th colSpan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.lista_cuestionarios()}
                </tbody>
            </table>
     );
    }
    lista_cuestionarios() {
        return this.props.lista.map(
            (cuestionario,posicion) => <tr key={cuestionario.folio}>
                <td onClick={() => this.props.seleccion_cuestionario(cuestionario)}>{cuestionario.folio}</td>
                <td onClick={() => this.props.seleccion_cuestionario(cuestionario)}>{cuestionario.cuestionario}</td>
                <td onClick={() => this.props.seleccion_cuestionario(cuestionario)}>{cuestionario.establecimiento}</td>
                <td onClick={() => this.props.seleccion_cuestionario(cuestionario)}>{cuestionario.nombre_departamento_aplica}</td>
                <td onClick={() => this.props.seleccion_cuestionario(cuestionario)}>{cuestionario.modificacion}</td>
                <td onClick={() => this.props.seleccion_cuestionario(cuestionario)}>{cuestionario.estatus=="V"?'Vigente':'Cancelado'}</td>
                <td>
                    <span className="btn btn-info glyphicon glyphicon-cog"
                        onClick={(e) => this.props.mostrar_activos(cuestionario, posicion)}></span>
                </td>
                <td>
                    <span className="btn btn-danger glyphicon glyphicon-trash"
                        onClick={()=> this.props.borrar(cuestionario)}></span>
                </td>
            </tr>);
    }
}
class Modal_seleccion_zona extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro: '',
            seleccion: {folio:-1,nombre:'',estatus:'V'}
        }
    }
    render() {
        return (
            <div id="Modal_seleccion_zona" className="modal_generica">
                <div className="panel panel-default " style={{ "width":"70%","maxWidth": "600px"}}>
                    <div className="panel-heading col-sm-12"
                        style={{ "background": "green", "color": "azure", "zIndex": "1","fontSize":"18px" }}>
                        <span className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></span>
                        <label >Zonas  </label>
                    </div>
                    <div className="form-group col-sm-11" style={{ "height": "50px" }}>
                        <label for="text" className="">Zona</label>
                        <input type="text" disabled className="form-control"
                            value={this.state.seleccion.nombre}
                            placeholder="Nombre Zona" />
                    </div>
                    <span className="btn btn-success glyphicon glyphicon-ok"
                          onClick={this._guardar.bind(this)}
                          style={{ "marginTop": "20px" }} >
                    </span>
                    <input type="text" className="form-control" placeholder="Filtro..."
                            style={{"borderRadius":"5px"}}
                            value={this.state.filtro}
                            onChange={this._filtro.bind(this)} />
                    <div className="panel panel-body col-sm-12"
                        style={{ "height": "470px", "overflowX": "auto", "zIndex": "0" }}>
                        <table className="table">
                            <thead>
                                <tr className="success">
                                    <th style={{"width":"60px","textAlign":"center"}}>#</th>
                                    <th style={{"textAlign": "center" }}>Descripcion</th>
                                    <th style={{ "width": "80px", "textAlign": "center"}}>Estatus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.zona()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            );
    }
    _guardar() {
        if (this.state.seleccion.nombre != '') {
            this.props.evento_zona(this.state.seleccion);
            this.cerrar();
        } else alert("Seleccione Zona!!!");
    }
    cerrar() {
        this.setState({ filtro: '', seleccion: { folio: -1, nombre: '', estatus: 'V' } });
        document.getElementById("Modal_seleccion_zona").style.display = 'none';
    }
    _filtro(e) {
        this.setState({ filtro:e.target.value});
    }
    seleccion(zona) {
        if (zona.estatus == 'V' || zona.estatus == 'v')
            this.setState({ seleccion: zona });
        else alert("Estatus Cancelado!!!");
    }
    zona() {
        const dato = this.props.lista.filter(
            zona => zona.nombre.toUpperCase().search(this.state.filtro.toUpperCase()) >= 0
        );
        return dato.map(
            (zona) => {
                return <tr onClick={() => this.seleccion(zona)} key={zona.folio}>
                    <td style={{"textAlign": "center" }}>{zona.folio}</td>
                    <td>{zona.nombre}</td>
                    <td style={{"textAlign": "center" }}>{zona.estatus == "V" ? "Vigente" : "Cancelado"}</td>
                </tr>
            });
    }
}
class Modal_seleccion_activo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro: '',
            seleccion: { folio: -1, nombre: '' }
        }
    }
    render() {
        return (
            <div id="Modal_seleccion_activo" className="modal_generica">
                <div className="panel panel-default" style={{ "width": "70%","maxWidth": "600px" }}>
                    <div className="panel-heading col-sm-12"
                        style={{ "background": "#00b9ea", "color": "azure", "zIndex": "1", "fontSize": "18px" }}>
                        <span className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></span>
                        <label >Seleccion Activos  </label>
                    </div>
                    <div className="form-group col-sm-11" style={{ "height": "50px" }}>
                        <label for="text" className="">Activos</label>
                        <input type="text" disabled className="form-control"
                            value={this.state.seleccion.nombre}
                            placeholder="Nombre Activo..." />
                    </div>
                    <span className="btn btn-info glyphicon glyphicon-ok"
                        onClick={this._guardar.bind(this)}
                        style={{ "marginTop": "20px" }} >
                    </span>
                    <input type="text" className="form-control" placeholder="Filtro..."
                        style={{ "borderRadius": "5px" }}
                        value={this.state.filtro}
                        onChange={this._filtro.bind(this)} />
                    <div className="panel panel-body col-sm-12"
                        style={{ "height": "470px", "overflowX": "auto", "zIndex": "0" }}>
                        <table className="table">
                            <thead>
                                <tr className="info">
                                    <th style={{ "width": "60px", "textAlign": "center" }}>#</th>
                                    <th style={{ "textAlign": "center" }}>Activo</th>
                                    <th style={{ "width": "80px", "textAlign": "center" }}>Estatus</th>
                                    <th style={{ "textAlign": "center" }}>Descripcion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.activo()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    _guardar() {
        if (this.state.seleccion.nombre != '') {
            this.props.evento_activo(this.state.seleccion);
            this.cerrar();
        } else alert("Seleccione Activo!!!");
    }
    cerrar() {
        this.setState({ seleccion: { filtro: '',folio: -1, nombre: '', estatus: 'V' } });
        document.getElementById("Modal_seleccion_activo").style.display = 'none';
    }
    _filtro(e) {
        this.setState({ filtro: e.target.value });
    }
    seleccion(activo) {
        this.setState({ seleccion: { folio: activo.folio, nombre: activo.descripcion } });
    }
    activo() {
        const dato = this.props.lista.filter(
            activo => activo.descripcion.toUpperCase().search(this.state.filtro.toUpperCase()) >= 0
        );
        return dato.map(
            (activo) => {
                return <tr onClick={() => this.seleccion(activo)} key={activo.folio}>
                    <td>{activo.folio}</td>
                    <td>{activo.descripcion}</td>
                    <td>{activo.fecha}</td>
                    <td>{activo.caracteristicas}</td>
                </tr>
            });
    }
}
class Modal_seleccion_criterio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro: '',
            seleccion: { folio: -1, nombre: '' }
        }
    }
    render() {
        return (
            <div id="Modal_seleccion_criterio" className="modal_generica">
                <div className="panel panel-default" style={{ "width": "70%","maxWidth": "600px" }}>
                    <div className="panel-heading col-sm-12"
                        style={{ "background": "#fe8832", "color": "azure", "zIndex": "1", "fontSize": "18px" }}>
                        <span className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></span>
                        <label >Criterios Activos  </label>
                    </div>
                    <div className="form-group col-sm-11" style={{ "height": "50px" }}>
                        <label for="text" className="">Criterio</label>
                        <input type="text" disabled className="form-control"
                            value={this.state.seleccion.nombre}
                            placeholder="Descripcion Criterio..." />
                    </div>
                    <span className="btn btn-warning glyphicon glyphicon-ok"
                        onClick={this._guardar.bind(this)}
                        style={{ "marginTop": "20px" }} >
                    </span>
                    <input type="text" className="form-control" placeholder="Filtro..."
                        style={{ "borderRadius": "5px" }}
                        value={this.state.filtro}
                        onChange={this._filtro.bind(this)} />
                    <div className="panel panel-body col-sm-12"
                        style={{ "height": "470px", "overflowX": "auto", "zIndex": "0" }}>
                        <table className="table">
                            <thead>
                                <tr className="warning">
                                    <th style={{ "width": "60px", "textAlign": "center" }}>#</th>
                                    <th style={{ "textAlign": "center" }}>Descripcion</th>
                                    <th style={{ "width": "80px", "textAlign": "center" }}>Estatus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.criterio()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    _guardar() {
        if (this.state.seleccion.nombre != '') {
            this.props.evento_criterio(this.state.seleccion);
            this.cerrar();
        } else alert("Seleccione Criterio!!!");
    }
    cerrar() {
        this.setState({ filtro:'',seleccion: { folio: -1, nombre: '', estatus: 'V' } });
        document.getElementById("Modal_seleccion_criterio").style.display = 'none';
    }
    _filtro(e) {
        this.setState({ filtro: e.target.value });
    }
    seleccion(criterio) {
        if (criterio.estatus == 'V' || criterio.estatus == 'v')
            this.setState({ seleccion: criterio });
        else alert("Estatus Cancelado!!!");
    }
    criterio() {
        const dato = this.props.lista.filter(
            criterio => criterio.nombre.toUpperCase().search(this.state.filtro.toUpperCase()) >= 0
        );
        return dato.map(
            (criterio) => {
                return <tr onClick={() => this.seleccion(criterio)} key={criterio.folio}>
                    <td>{criterio.folio}</td>
                    <td>{criterio.nombre}</td>
                    <td>{criterio.estatus == "V" ? "Vigente" : "Cancelado"}</td>
                </tr>
            });
    }
}
class Tabla_armado_activos extends React.Component {
    render() {
        return (
            <table className="table" >
                <thead style={{ "marginTop": "1px" }}>
                    <tr className="success" >
                        <th>#</th>
                        <th>ZONA</th>
                        <th>ACTIVO</th>
                        <th>CRITERIO</th>
                    </tr>
                </thead>
                <tbody>
                    {this.datos_table()}
                </tbody>
            </table>
            );
    }
    seleccion(elemento) {
        this.props.seleccion(elemento);
    }
    datos_table() {
        const seleccion = (p) => p == this.props.orden ? '#96f0f8' : '';

        return this.props.lista.map(
            (elemento, posicion) => {
                elemento.orden = posicion + 1;
              return  <tr key={elemento.orden}
                    style={{ "background": seleccion(elemento.orden) }}
                    onClick={() => this.seleccion(elemento)}>
                    <td>{elemento.orden}</td>
                    <td>{elemento.zona}</td>
                    <td>{elemento.activo}</td>
                    <td>{elemento.criterio}</td>
                </tr>
            });
    }
}
class Cavecera_modal_armado extends React.Component {
    render() {
        return (
            <div className="col-sm-12 panel panel-info">
                <div className="form-group col-sm-2">
                    <label for="text" className="">Folio</label>
                    <input type="text" disabled
                        className="form-control"
                        value={this.props.cuestionario.folio} />
                </div>
                <div className="form-group col-sm-10">
                    <label for="text" className="">Cuestionario</label>
                    <input type="text" disabled
                        className="form-control"
                        value={this.props.cuestionario.nombre}
                        placeholder="Nombre Cuestionario" />
                </div>
                <div className="form-group col-sm-5" style={{ "height": "50px" }}>
                    <label for="text" className="">Departamento Aplica</label>
                    <input type="text" disabled
                        className="form-control"
                        value={this.props.cuestionario.departamento}
                        placeholder="Nombre Departamento" />
                </div>
                <div className="form-group col-sm-5" style={{ "height": "50px" }}>
                    <label for="text" className="">Zona</label>
                    <input type="text" disabled className="form-control"
                        value={this.props.estado.zona}
                        placeholder="Nombre Zona" />
                    <span className="btn btn-success glyphicon glyphicon-search"
                        onClick={this.buscar_zona.bind(this)}></span>
                </div>
                <div className="form-group col-sm-5">
                    <label for="text" className="">Departamento</label>
                    <select className="form-control" onChange={this.props.evento_departamento}> {this.props.depatamentos} </select>
                </div>
                <div className="form-group col-sm-5" style={{ "height": "50px" }}>
                    <label for="text" className="">Activo</label>
                    <input type="text" disabled className="form-control"
                        value={this.props.estado.activo}
                        placeholder="Nombre Activo" />
                    <span className="btn btn-primary glyphicon glyphicon-search "
                        onClick={this.buscar_activo.bind(this)}></span>
                </div>
                <div className="form-group col-sm-12" style={{ "height": "50px" }}>
                    <label for="text" className="">Criterio</label>
                    <input type="text" disabled className="form-control col-sm-10"
                        value={this.props.estado.criterio}
                        placeholder="Nombre Criterio" />
                    <span className="btn btn-warning glyphicon glyphicon-search"
                        onClick={this.buscar_criterio.bind(this)}></span>
                </div>
            </div>
            );
    }
    /*eventos*/
    buscar_zona() {
        document.getElementById("Modal_seleccion_zona").style.display = 'flex';
        this.props.obtener_zonas();
    }
    buscar_activo() {
        document.getElementById("Modal_seleccion_activo").style.display = 'flex';
        this.props.obtener_activos();
    }
    buscar_criterio() {
        document.getElementById("Modal_seleccion_criterio").style.display = 'flex';
        this.props.obtener_criterios();
    }
} 
class Modal_armado_activos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folio: -1,
            orden:-1,
            folio_zona: -1,
            zona: '',
            folio_departamento: -1,
            depatamento: '',
            folio_activo: '',
            activo: '',
            folio_criterio:-1,
            criterio: '',
            lista_zonas: [],
            lista_activos: [],
            lista_criterios:[]
        }
    }
    render() {
        return (
            <div id="Modal_armado_activos" className="modal_generica">
                <div className="panel-default col-sm-11" style={{ "maxWidth": "1100px" }}>
                    <div className="panel panel-heading col-sm-12"
                        style={{ "fontSize": "18px", "background": "#0aa5fc", "color": "azure", "zIndex": "1" }}>
                        <span className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></span>
                        <label>Añadir Activos A Cuestionario.</label>
                    </div>
                    <div className="panel panel-body col-sm-12"
                        style={{ "height": "680px", "overflowX": "auto", "marginTop": "-30px", "zIndex": "0" }} >
                        
                        <Cavecera_modal_armado cuestionario={this.props.cuestionario}
                            estado={this.state}
                            evento_departamento={this.cambio_departamento.bind(this)}
                            depatamentos={this.depatamentos_com()}
                            obtener_zonas={this.obtener_zonas.bind(this)}
                            obtener_activos={this.obtener_activos.bind(this)}
                            obtener_criterios={this.obtener_criterios.bind(this)}/> 
                        <div className="panel panel-success col-sm-12"
                            style={{ "marginTop": "-15px" }}>
                            <span className="btn btn-info glyphicon glyphicon-ok col-sm-5"
                                onClick={this._agregar_a_tabla.bind(this)}>
                                <label style={{"marginLeft":"5px"}}> Agregar</label>
                            </span>
                            <span className="btn btn-primary glyphicon glyphicon-upload "
                                onClick={()=>this._mover_seleccion(-1)}
                                style={{ "fontSize": "18px" }}>
                                <label style={{ "marginLeft": "5px" }}> </label>
                            </span>
                            <span className="btn btn-primary glyphicon glyphicon-download"
                                onClick={() => this._mover_seleccion(1)}
                                style={{ "fontSize": "18px" }}>
                                <label style={{ "marginLeft": "5px" }}> </label>
                            </span>
                            <span className="btn btn-danger glyphicon glyphicon-trash"
                                onClick={this._borrar_seleccion.bind(this)}
                                style={{ "fontSize": "18px" }} >
                                <label style={{ "marginLeft": "5px"}}> </label>
                            </span>
                       
                            <div className="col-sm-12 panel panel-body" style={{ "height": "260px", "overflowX": "auto" ,"marginTop":"1px"}}>
                                <Tabla_armado_activos seleccion={this._seleccion_tabla.bind(this)}
                                    orden={this.state.orden}
                                    lista={this.props.cuestionario.lista_datos_cuestionarios} />
                            </div>
                            <div className="col-sm-12">
                                <span className="btn btn-success glyphicon glyphicon-download-alt btn-block"
                                    onClick={this._guardar_activos_cuestionario.bind(this)}>
                                <label style={{ "marginLeft": "5px" }}> Guardar</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <Modal_seleccion_zona evento_zona={this.seleccion_zona.bind(this)}
                        lista={this.state.lista_zonas}/>
                    <Modal_seleccion_activo evento_activo={this.seleccion_activo.bind(this)}
                        lista={this.state.lista_activos}/>
                    <Modal_seleccion_criterio evento_criterio={this.seleccion_criterio.bind(this)}
                        lista={this.state.lista_criterios}/>
                </div>
            </div>
        );
    }
    /**eventos**/
    _guardar_activos_cuestionario() {
        const lista_guardar = this.props.cuestionario.lista_datos_cuestionarios.filter(activo => this.verifivar_datos_agregar(activo));
        const total = this.props.cuestionario.lista_datos_cuestionarios.length;
        if (lista_guardar.length == total) {
            console.log(lista_guardar);
            this.enviar_activos_cuestionario(lista_guardar);
        } else alert("Datos Corruptos...");

    }
    cambio_departamento(e) {
        const filtro_departamento = this.props.departamentos.find(dep => dep.folio == e.target.value);
        this.setState({ folio_departamento: e.target.value, depatamento: filtro_departamento.nombre});
    }
    _agregar_a_tabla() {
        const lista = this.props.cuestionario.lista_datos_cuestionarios;
        const orden = lista.length > 0 ? lista[lista.length - 1].orden + 1 : 1;
        const existe_activo = this.props.cuestionario.lista_datos_cuestionarios.findIndex(
            activo => activo.folio_activo == this.state.folio_activo);
        const item = {
            folio: this.state.folio,
            orden: orden,
            folio_cuestionario: this.props.cuestionario.folio,
            cuestionario: this.props.cuestionario.nombre,
            folio_zona: this.state.folio_zona,
            zona: this.state.zona,
            folio_activo: this.state.folio_activo,
            activo: this.state.activo,
            folio_criterio: this.state.folio_criterio,
            criterio:this.state.criterio
        }
        if (existe_activo == -1) {
            if (this.verifivar_datos_agregar(item)) {
                this.props.cuestionario.lista_datos_cuestionarios.push(item);
                this.setState({
                    folio: -1,
                    folio_zona: -1,
                    orden: -1,
                    zona: '',
                    folio_departamento: -1,
                    depatamento: '',
                    folio_activo: '',
                    activo: '',
                    folio_criterio: -1,
                    criterio: ''
                });
            } else alert("Faltan Campos!!!");
        } else alert("Activo Ya Seleccionado...\nPosicion: " + (existe_activo+1));
    }
    _seleccion_tabla(items) {
        this.setState({
            orden: items.orden,
        });
    }
    _borrar_seleccion() {
        if (confirm("Eliminar Dato De Tabla")) {
            const _item = this.props.cuestionario.lista_datos_cuestionarios.findIndex(elemento => elemento.orden == this.state.orden);
            console.log(_item);
            this.props.cuestionario.lista_datos_cuestionarios.splice(_item, 1);
            this._asignar_orden();
        }
    }
    _mover_seleccion(posicion) {
       
        const lista = this.props.cuestionario.lista_datos_cuestionarios;
        const pos_actual = this.props.cuestionario.lista_datos_cuestionarios.findIndex(elemento => elemento.orden == this.state.orden);
        const pos_nuevo = posicion + pos_actual;

        if (pos_nuevo >= 0 && pos_nuevo < lista.length) {
            const actual = lista[pos_actual];
            const nuevo = lista[pos_nuevo];
            lista[pos_actual] = nuevo;
            lista[pos_nuevo] = actual;
            this.props.cuestionario.lista_datos_cuestionarios = lista;
            this._asignar_orden();
            this.setState({ orden: pos_nuevo + 1 });
        } else console.log("Limite Tabla");
    }
    _asignar_orden() {
        this.props.cuestionario.lista_datos_cuestionarios.forEach(
            (item, index) => {
                item.orden = index + 1;
            });
        this.setState({});
    }
    /**eventos modal**/
    seleccion_zona(_zona) {
        this.setState({ folio_zona: _zona.folio, zona: _zona.nombre});
    }
    seleccion_activo(_activo) {
        this.setState({folio_activo:_activo.folio,activo:_activo.nombre});
    }
    seleccion_criterio(_criterio) {
        this.setState({folio_criterio:_criterio.folio,criterio:_criterio.nombre});
    }
    /**metodos**/
    cerrar() {
        document.getElementById("Modal_armado_activos").style.display = 'none';
        this.setState({
            folio: -1,
            orden:-1,
            folio_zona: -1,
            zona: '',
            folio_departamento: -1,
            depatamento: '',
            folio_activo: '',
            activo: '',
            folio_criterio:-1,
            criterio: '',
            lista_zonas: [],
            lista_activos: [],
            lista_criterios: []
        });
    }
    verifivar_datos_agregar(item) {
        return item.folio != 0 && item.folio_activo > 0 && item.folio_criterio > 0 && item.folio_cuestionario > 0 && item.folio_zona;
    }
    /**conexiones**/
    obtener_zonas() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/servicio_zona",
            {},
            (zonas) => {
                this.setState({ lista_zonas: zonas.d });
            });
    }
    obtener_activos() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/servicios_activos_ckl",
            {
                establecimiento: this.props.cuestionario.folio_establecimiento,
                departamento: this.state.folio_departamento
            },
            (activos) => {
                this.setState({ lista_activos: activos.d });
            });
    }
    obtener_criterios() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/servicio_criterio",
            {},
            (criterios) => {
                this.setState({ lista_criterios: criterios.d });
            });
    }
    enviar_activos_cuestionario(datos) {
        const listo = conexion_ajax("servicios/servicios_generales/conexiones.asmx/Guardar_activos_por_cuestionario", { datos });
        if (listo > 0) {
            document.getElementById("Modal_armado_activos").style.display = 'none';
            alert("Se Guardaron :\n" + listo + " datos.");
        }
    }
    /**componentes**/
    depatamentos_com() {
        const seleccion = (folio) => folio == this.state.folio_departamento;
        const r = this.props.departamentos.map(
            departamento => <option key={departamento.folio}
                value={departamento.folio}
                selected={seleccion(departamento.folio)}>
                {departamento.nombre}
            </option>);
        return [<option value="-1" selected={seleccion(-1)}>Seleccion</option>, r];
    }

}
class App extends React.Component {
    constructor(props) {
        super(props);
        //datos
        this.lista_establecimientos = [];
        this.lista_departamentos_aplica_cuestionario = [];
        this.lista_cuestionarios = [];
        this.cuestionario_armado_activos = {
            folio: -1,
            folio_establecimiento:-1,
            nombre: '',
            departamento: '',
            lista_datos_cuestionarios:[]
        }
        this.state = {
            edicion: false,
            nuevo: false,
            folio_cuestionario:-1,
            nombre_cuestionario: '',
            estatus: 'V',
            folio_establecimiento: -1,
            folio_departamento_aplica:-1
        };
        this.obtener_establecimientos();
        this.obtener_departamentos_aplica();
        this.obtener_cuestionarios();
    }
    render() {
        return(
            <div className="panel panel-default col-sm-12">
                <div className="panel panel-heading col-sm-12">
                 <Botonera nuevo={this.on_nuevo.bind(this)}
                           editar={this.on_editar.bind(this)}
                           guardar={this.on_guardar.bind(this)}
                           deshacer={this.on_deshacer.bind(this)}
                           class_editar={this.state.edicion}
                           class_nuevo={this.state.nuevo} />
                    <Cavecera_datos_edicion
                        folio_cuestionario={this.state.folio_cuestionario}
                        nombre_cuestionario={this.state.nombre_cuestionario}
                        folio_establecimiento={this.state.folio_establecimiento}
                        folio_departamento={this.state.folio_departamento_aplica}
                        lista_establecimientos={this.lista_establecimientos}
                        lista_departamentos_aplica_cuestionario={this.lista_departamentos_aplica_cuestionario}
                        edicion={this.state.edicion}
                        estatus={this.state.estatus}
                        evento_cuestionario={this._cambio_cuestionario.bind(this)}                        
                        evento_estatus={this._cambio_estatus.bind(this)}
                        evento_establecimiento={this._cambio_establecimiento.bind(this)}
                        evento_departamento_aplica={this._cambio_departamento_aplica.bind(this)}
                        />
                </div>
                <div className="panel panel-body col-sm-12"
                    style={{ "height": "400px","overflowX":"auto"}} >
                    <Tabla_cuestionarios
                        seleccion_cuestionario={this._seleccion_cuestionario.bind(this)}
                        borrar={this._borrar_cuestionario.bind(this)}
                        mostrar_activos={this._activos_por_cuestionario.bind(this)}
                        lista={this.lista_cuestionarios} />
                </div>
                <Modal_armado_activos cuestionario={this.cuestionario_armado_activos}
                    departamentos={this.lista_departamentos_aplica_cuestionario}/>
            </div>
        );
    }
    /**eventos**/
    on_nuevo() {
        console.log("nuevo");
        if(!(this.state.edicion || this.state.nuevo))
            this.setState({ edicion: true, nuevo: true ,folio_cuestionario:-1});
        else alert("En Edicion");
    }
    on_editar() {
        console.log("editar");
        if (!(this.state.edicion || this.state.nuevo))
            if (this.state.folio_cuestionario > 0) {
                this.setState({ edicion: true });
            }else alert("Seleccione Cuestionario!!!")
        else alert("En Edicion");
    }
    on_guardar() {
        console.log("guardar");
        if (this.state.nombre_cuestionario != '' && this.state.folio_establecimiento > 0 && this.state.folio_departamento_aplica>0) {
            const objeto = {
                folio: this.state.folio_cuestionario > 0 ? this.state.folio_cuestionario : 0,
                cuestionario: this.state.nombre_cuestionario,
                folio_zona: 0,
                folio_establecimiento: this.state.folio_establecimiento,
                establecimiento: '',
                usuario_creo: '',
                usuario_modifico: ID_SCOI,
                creacion: '',
                modificacion: '',
                estatus: this.state.estatus,
                departamento_aplica: this.state.folio_departamento_aplica
            }

            this.guardar_actualizar(objeto);

            this.setState({ edicion: false, nuevo: false });
        } else alert("Falta Verificar Campos!!!");
    }
    on_deshacer() {
        console.log("deshacer");
        this.setState({
            edicion: false,
            nuevo: false,
            folio_cuestionario: -1,
            nombre_cuestionario: '',
            estatus: 'V',
            folio_establecimiento: -1,
            folio_departamento_aplica: -1
        });
    }
    /**Metodos**/
    _seleccion_cuestionario(cuestionario) {
        if (!(this.state.edicion || this.state.nuevo)) {
            this.setState({
                edicion: false,
                nuevo: false,
                folio_cuestionario: cuestionario.folio,
                nombre_cuestionario: cuestionario.cuestionario,
                estatus: cuestionario.estatus,
                folio_establecimiento: cuestionario.folio_establecimiento,
                folio_departamento_aplica: cuestionario.departamento_aplica
            });
        }
        else alert("En Edicion");
    }
    _activos_por_cuestionario(cuestionario) {
        if (!(this.state.edicion || this.state.nuevo)) {   
            this.cuestionario_armado_activos = {
                folio: cuestionario.folio,
                folio_establecimiento: cuestionario.folio_establecimiento,
                nombre: cuestionario.cuestionario,
                departamento: cuestionario.nombre_departamento_aplica,
                lista_datos_cuestionarios: []
            }
            this.obtener_activos_cuestionario();
            this.on_deshacer();
            document.getElementById("Modal_armado_activos").style.display = 'flex';
        }else alert("En Edicion");
    }
    _borrar_cuestionario( cuestionario) {
        if (!(this.state.edicion || this.state.nuevo)) {
            if (confirm("Eliminar Cuestionario?\n Al Eliminarlo Se Borrara Tambien Los Criterios Y Respuestas Que Contenga!!")) {
                this.eliminar_cuestionario(cuestionario.folio); 
            } else console.log("Cancelado Elimnar Folio: " + cuestionario.folio );

            this.on_deshacer();
        }
        else alert("En Edicion");
    }
    _cambio_cuestionario(e) {
        this.setState({nombre_cuestionario:e.target.value});
    }
    _cambio_estatus(e){
        this.setState({ estatus: e.target.value });
    }
    _cambio_establecimiento(e) {
        this.setState({ folio_establecimiento: e.target.value });
    }
    _cambio_departamento_aplica(e) {
        this.setState({ folio_departamento_aplica: e.target.value });
    }
    /**conexiones**/
    obtener_establecimientos() {
        conexion_api_from_body("servicios/matriz/conexiones.asmx/obtener_establecimientos",
            {},
            (establecimientos) => {
                this.lista_establecimientos = establecimientos.d;
                this.setState({ folio_establecimiento: -1 });
            });
    }
    obtener_departamentos_aplica() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/departamentos",
            {},
            (departamento) => {
                this.lista_departamentos_aplica_cuestionario = departamento.d;
                this.setState({ folio_departamento_aplica: -1 });
            });
    }
    obtener_cuestionarios() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/cuestionarios",
            {},
            (cuestionario) => {
                this.lista_cuestionarios = cuestionario.d;
                this.setState({ folio_cuestionario: -1 });
            });
    }
    obtener_activos_cuestionario() {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/datos_cuestionarios",
            {
                folio: this.cuestionario_armado_activos.folio
            },
            (respuesta) => {
                this.cuestionario_armado_activos.lista_datos_cuestionarios = respuesta.d
                this.setState({});
            });
    }
    eliminar_cuestionario(_folio) {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/servicios_cuestionarios_eliminar",
            { 
                folio: _folio
            },
            (folio) => {
                this.obtener_cuestionarios();
                this.setState({ folio_cuestionario: -1 });
                this.on_deshacer();
                alert("Se Elimino Folio" + folio.d);
            });
    }
    guardar_actualizar(cuestionario) {
        conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/guardar_cuestionario_servicios",
            { cuestionario},
            (folio) => {
                this.obtener_cuestionarios();
                this.setState({ folio_cuestionario: -1 });
                this.on_deshacer();
                alert("Se Guardo Folio" + folio.d);
            });
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("contenedor")
    );