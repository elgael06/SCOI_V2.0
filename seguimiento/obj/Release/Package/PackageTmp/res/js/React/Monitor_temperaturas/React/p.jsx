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
                <div class="input-group has-feedback col-lg-2 ">
                <label class="input-group-addon"><span className="fa fa-filter"></span> Filtro</label>
                <input type="text" name="filtro" onChange={this.props.filtro_nombre} className="form-control" />
                </div>
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
class Tabla_e extends React.Component
     {
            render(){
                return (
        <div style={estilo_tabla}>
        <table class="table">
       <thead>
        <tr
            style={estilo_cabecera_tabla}
            >
            <th>Folio</th>
            <th>Establecimiento</th>
            <th>Estado</th>
            <td>Eliminar</td>
        </tr>
       </thead>
            <tbody>
                {this.props.cuerpo}
            </tbody>
                </table>
                </div>
                );
            }
      }
class Establecimientos extends React.Component
{
    constructor(props)
    {
        super(props)
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
        this.cancelar = this.cancelar.bind(this)
        this.nuevo = this.nuevo.bind(this)
        this.cambiar_nombre_establecimiento = this.cambiar_nombre_establecimiento.bind(this);
        this.cambiar_status = this.cambiar_status.bind(this);
        this.eliminar = this.eliminar.bind(this);
        this.filtro = this.on_filtro.bind(this);
        this.guardar = this.guardar.bind(this);
        this.state =
        {
            nueva:false,
            editable:false,
            folio_establecimiento: 0,
            nombre_establecimiento: '',
            status_establecimiento: 'v',
            filtro_nombre: ''
        }
    }
    clic_tabla(e)
    {
        console.log(e)
        if (!this.state.editable) {
            this.setState({
                folio_establecimiento: e.folio_establecimiento,
                nombre_establecimiento: e.nombre_establecimiento,
                status_establecimiento: e.status_establecimiento
            })
        }
        else
            alert('Edicion activa')
    }
    data()
    {
        console.log(this.lista);
        var nombre_establecimiento = this.lista.filter((item) => {
            return item.nombre_establecimiento.toUpperCase().search(this.state.filtro_nombre.toUpperCase()) >= 0
        });
        const checar = (folio) => folio == this.state.folio_establecimiento ? "Seleccionado" : "";
        const verificar_estado = (estado) =>estado == 'v' || estado == 'V' ? 'Vigente' : 'Cancelado'
        console.log(this.lista);
        const e = nombre_establecimiento.map((dat) =>
            <tr className={checar(dat.folio_establecimiento)} key={dat.folio_establecimiento} onClick={ ()=>this.clic_tabla(dat) }>
                <td>
                {dat.folio_establecimiento}
                </td>
                <td>
                {dat.nombre_establecimiento}
                </td>
                <td>
                {verificar_estado(dat.status_establecimiento)}
                </td>
                <td>
                        <span className="glyphicon glyphicon-trash" onClick={ ()=>this.eliminar(dat) }></span>
                </td>
            </tr>
                  );
        return e;
    }
    nuevo() {
        if (this.lista.length > 0) {
            if (!(this.state.nueva || this.state.editable)) {
                const consecutivo = conexion_ajax('servicios/datos_tabla.asmx/consecutivo_folio_establecimiento')
                this.setState({ nueva: true, editable: true, folio_establecimiento: consecutivo, nombre_establecimiento: '' ,status_establecimiento:'V'})
                console.log('nuevo')
            }
            else
                alert('Edicion activa')
        }
        else {
            this.setState({ nueva: true, editable: true, folio_establecimiento: 1, nombre_establecimiento: '' ,status_establecimiento:'V'})
        }
    }
    editar()
    {
        if (!(this.state.nueva && this.state.editable) && this.state.folio_establecimiento > 0 && this.state.nombre_establecimiento != '') {
            this.setState({ nueva: false, editable: true })
        }
        else
        alert('Sin Campos Seleccionados')
    }
    guardar() {
        if (!this.lista.includes(this.lista.filter((item) =>item.nombre_establecimiento == this.state.nombre_establecimiento && this.state.nueva)[0])) {
            if (this.state.editable) {
                if (this.state.folio_establecimiento > 0 && (!this.state.nombre_establecimiento=='')) {
                    const respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_establecimiento', { folio_establecimiento: this.state.folio_establecimiento, nombre_establecimiento: this.state.nombre_establecimiento, status_establecimiento: this.state.status_establecimiento })
                    this.setState({ nueva: false, editable: false, folio_establecimiento: '', nombre_establecimiento: '' })
                    this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
                    console.log(respuesta)
                }
                else
                    alert('Hay campos sin llenar')
            }
            else
                alert('Edicion deshactivada')
        }
        else
            alert('Ya existe un establecimiento con el mismo nombre')
    }
    eliminar(dat) {
        if (!this.state.editable) {
            const respuesta = conexion_ajax('servicios/datos_tabla.asmx/delete_establecimiento',
                { folio_establecimiento: dat.folio_establecimiento })
            this.setState({ editable: false, nueva: false, folio_establecimiento: '', nombre_establecimiento: '' })
            this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_establecimiento_matriz");
            alert(respuesta)
        }
    }
    cancelar() {
        this.setState({ editable:false,nueva:false,folio_establecimiento: 0, nombre_establecimiento: '',status_establecimiento:'V'})
        console.log('cancelar')
    }
    cambiar_nombre_establecimiento(e) {
        if(this.state.editable)
        this.setState({nombre_establecimiento:e.target.value})
    }
    cambiar_status(e) {
        if (this.state.editable)
        this.setState({ status_establecimiento: e.target.value })
    }
    on_filtro(e) {
        this.setState({ filtro_nombre: e.target.value })
    }
    render() {
        return (
            <div>
                <Botonera nuevo={this.nuevo.bind(this)}
                          editar={this.editar.bind(this)}
                          guardar={this.guardar.bind(this)}
                          deshacer={this.cancelar.bind(this)}
                          class_editar={this.state.editable}
                          class_nuevo={this.state.nueva}/>
               <Cabecera folio_establecimiento={this.state.folio_establecimiento} 
                         nombre_establecimiento={this.state.nombre_establecimiento} 
                         cambiar_status={this.cambiar_status} 
                         status_establecimiento={this.state.status_establecimiento} 
                         cambiar_nombre_establecimiento={this.cambiar_nombre_establecimiento}
                         filtro_nombre={this.filtro}/>
                <Tabla_e cuerpo={this.data()}/>
            </div>
            )
    }
}
const estilo_cabecera_tabla =
    {
        'position': 'sticky'
        , 'min-width': '100%'
        , 'top': '-1px'
        , "background": "#dd8000"
    }
const estilo_tabla = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '100%',
    'height': '300px',
    'border': 'solid 1px gray',
    'border-radius': '10px'
}
ReactDOM.render(
   <Establecimientos/>
       ,
        document.getElementById("pruebas")
      );