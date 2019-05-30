class Cabecera extends React.Component
{
    render() {
        const folio_establecimiento = this.props.folio_establecimiento || '';
        const nombre_establecimiento = this.props.nombre_establecimiento || '';
        const status_establecimiento = this.props.status_establecimiento || 'v';
        const cambiar_nombre_establecimiento = this.props.cambiar_nombre_establecimiento;
        const cambiar_status = this.props.cambiar_status;
        return(
            <div className="container">
                <h1 class="text-info">Establecimientos</h1>
                <br />
                                <div class="input-group has-feedback col-lg-2 ">
                <label class="input-group-addon" >Filtro</label>
                <input type="text" name="filtro" onChange={this.props.filtro_nombre} className="form-control" />
                                </div>
                <form class="form-inline">
                    <div class="input-group">
                <label class="input-group-addon" >Folio</label>
                <input type="text" value={folio_establecimiento} className="form-control"/>
                    </div>                    
                    <div class="input-group has-feedback  ">
                <label class="input-group-addon">Establecimientos</label>
                <input type="text" value={nombre_establecimiento} onChange={cambiar_nombre_establecimiento} className="form-control"/>
                    </div>                    
                    <div class="input-group has-feedback ">
                <label class="input-group-addon">Estado</label>
                <select onChange={cambiar_status} className="form-control">
                    {this.ver_status(status_establecimiento)}
                </select>
                    </div>
                </form>
            </div>
            )
    }
    ver_status(status_establecimiento) {
        const e = []
        if (status_establecimiento == 'v' || status_establecimiento == 'V') {
            e.push(<option value="v" selected>
                Vigente
            </option>, <option value="c">
                Cancelado
            </option>)
        }
        else
            e.push(<option value="v">
                Vigente
            </option>, <option value="c" selected>
                Cancelado
            </option>)
        return e
    }
}
class Botones extends React.Component
{
    render() {
        const cancelar = this.props.cancelar;
        const nuevo = this.props.nuevo;
        const agregar = this.props.agregar;
        const eliminar = this.props.eliminar;
        const modificar = this.props.modificar;
        return(
            <div>
                <input value="Nuevo" type="button" className="btn btn-warning" onClick={nuevo}/>
                <input value="Agregar" type="button" className="btn btn-warning" onClick={agregar}/>
                <input value="Eliminar" type="button" className="btn btn-warning" onClick={eliminar}/>
                <input value="Cancelar" type="button" className="btn btn-warning" onClick={cancelar}/>
                <input value="Modificar" type="button" className="btn btn-warning" onClick={modificar}/>
            </div>
            )
    }
}
class Tabla_e extends React.Component
     {
            render(){
                return (   
                <table class="table">
       <thead>
        <tr className="warning">
            <th>Folio</th>
            <th>Establecimiento</th>
            <th>Estado</th>
           
        </tr>
       </thead>
            <tbody>
                {this.props.cuerpo}
            </tbody>
                </table>
                );
            }
      }
class Establecimientos extends React.Component
{
    constructor(props)
    {
        super(props)
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
        this.state = { folio_establecimiento: 0, nombre_establecimiento: '', status_establecimiento: 'v', filtro_nombre: ''}
        this.cancelar = this.cancelar.bind(this)
        this.nuevo = this.nuevo.bind(this)
        this.agregar = this.agregar.bind(this)
        this.cambiar_nombre_establecimiento = this.cambiar_nombre_establecimiento.bind(this);
        this.cambiar_status = this.cambiar_status.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.filtro = this.on_filtro.bind(this);
        this.modificar = this.modificar.bind(this);
    } 
    clic_tabla(e)
    {
        this.setState({ folio_establecimiento: e.folio_establecimiento, nombre_establecimiento: e.nombre_establecimiento, status_establecimiento: e.status_establecimiento })
    }
    data()
    {
        console.log(this.lista);
        var nombre_establecimiento = this.lista.filter((item) => {
            return item.nombre_establecimiento.toUpperCase().search(this.state.filtro_nombre.toUpperCase()) >= 0
        });
        console.log(this.lista);
        const e = nombre_establecimiento.map((dat) =>
            <tr key={dat.folio_establecimiento} onClick={ ()=>this.clic_tabla(dat) }>
                <td>
                {dat.folio_establecimiento}
                </td>
                <td>
                {dat.nombre_establecimiento}
                </td>
                <td>
                {dat.status_establecimiento}
                </td>

            </tr>
                  );
        return e;
    }
    nuevo() {
       const consecutivo = conexion_ajax('servicios/datos_tabla.asmx/consecutivo_folio_establecimiento')
       this.setState({ folio_establecimiento: consecutivo, nombre_establecimiento: '' })
        console.log('nuevo')
    }
    agregar() {
        if (this.state.nombre_establecimiento) {
            const respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_establecimiento', { folio_establecimiento: this.state.folio_establecimiento, nombre_establecimiento: this.state.nombre_establecimiento, status_establecimiento: this.state.status_establecimiento })
            this.setState({ folio_establecimiento: '', nombre_establecimiento: '' })
           this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
            console.log(respuesta)
    }
    }
    modificar() {
            if (this.state.nombre_establecimiento) {
                const respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_establecimiento', { folio_establecimiento: this.state.folio_establecimiento, nombre_establecimiento: this.state.nombre_establecimiento, status_establecimiento: this.state.status_establecimiento })
                this.setState({ folio_establecimiento: '', nombre_establecimiento: '' })
                this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
        }

    }
    eliminar() {
        if (this.state.folio_establecimiento > 0) {
            const respuesta = conexion_ajax('servicios/datos_tabla.asmx/delete_establecimiento', { folio_establecimiento: this.state.folio_establecimiento })
            this.setState({ folio_establecimiento: '', nombre_establecimiento: '' })
            this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
        console.log(respuesta)
        console.log('eliminar')
        }
        else
            alert('No hay elemento seleccionado')
    }
    cancelar() {
        this.setState({ folio_establecimiento: '', nombre_establecimiento: '' })
        console.log('cancelar')
    }
    cambiar_nombre_establecimiento(e) {
        this.setState({nombre_establecimiento:e.target.value})
    }
    cambiar_status(e) {
        this.setState({ status_establecimiento: e.target.value })
    }
    on_filtro(e) {
        this.setState({ filtro_nombre: e.target.value })
    }
    render() {
        return (
            <div>
               <Cabecera folio_establecimiento={this.state.folio_establecimiento} 
                         nombre_establecimiento={this.state.nombre_establecimiento} 
                         cambiar_status={this.cambiar_status} 
                         status_establecimiento={this.state.status_establecimiento} 
                         cambiar_nombre_establecimiento={this.cambiar_nombre_establecimiento}
                         filtro_nombre={this.filtro}/>
                <Botones cancelar={this.cancelar} 
                         nuevo={this.nuevo} 
                         agregar={this.agregar} 
                         eliminar={this.eliminar}
                         modificar={this.modificar}/>
                <Tabla_e cuerpo={this.data()}/>
            </div>
            )
    }
    }
ReactDOM.render(
   <Establecimientos/>
       ,
        document.getElementById("pruebas")
      );