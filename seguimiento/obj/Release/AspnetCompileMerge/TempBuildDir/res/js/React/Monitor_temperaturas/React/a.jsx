class Cabecera extends React.Component
{
    render() {
        const folio_area = this.props.folio_area || '';
        const nombre_area = this.props.nombre_area || '';
        const status_area = this.props.status_area || 'v';
        const cambiar_nombre = this.props.cambiar_nombre;
        const cambiar_status = this.props.cambiar_status;
        return(
            <div className="container" >
                <form class="form-inline">
                    <div class="input-group">
                <label class="input-group-addon">Folio</label>
                <input type="text" value={folio_area} className="form-control" />
                    </div>                    <div class="input-group has-feedback  ">
                <label class="input-group-addon">Areas</label>
                <input type="text" value={nombre_area} onChange={cambiar_nombre} className="form-control"/>
                    </div>                    <div class="input-group has-feedback ">
                <label class="input-group-addon">Estado</label>
                <select onChange={cambiar_status} className="form-control">
                    {this.ver_status(status_area)}
                </select>
                    </div>              
                </form>
                                 <div class="input-group col-lg-2 ">
                <label class="input-group-addon"><span className="fa fa-filter"></span> Filtro</label>
                <input type="text" name="filtro" onChange={this.props.filtro_nombre} className="form-control" />
                                 </div>  
            </div>
            )
                }
    ver_status(status_area) {
              const v = []
              if (status_area == 'v' || status_area == 'V') {
                   v.push(<option value="v" selected>
                      Vigente
                   </option>, <option value="c">
                   Cancelado
               </option>)
               }
                else
                   v.push(<option value="v">
                    Vigente
                  </option>, <option value="c" selected>
               Cancelado
           </option>)
               return v
             }
         }
class Tabla_a extends React.Component
{
    render()
    {
        return (
            <div style={estilo_tabla}>
            <table class="table">
                <thead>
                    <tr style={estilo_cabecera_tabla}>
                        <td>Folio</td>
                        <td>Area</td>
                        <td>Estado</td>
                        <td>Eliminar</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cuerpo}
                </tbody>
            </table>
            </div>
            )
    }
}
class Areas extends React.Component
{
    constructor(props)
    {
    super()
    this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_area_matriz");
    this.cambiar_nombre = this.cambiar_nombre.bind(this);
    this.cambiar_status = this.cambiar_status.bind(this);
    this.nuevo = this.nuevo.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.filtro = this.on_filtro.bind(this);
    this.guardar = this.guardar.bind(this);
    this.state =
        {
            nueva: false,
            editable: false,
            folio_area: 0,
            nombre_area: '',
            status_area: 'v',
            filtro_nombre: ''
        }
    }
    clic(v) {
        if (!this.state.editable) {
            this.setState({
                folio_area: v.folio_area,
                nombre_area: v.nombre_area,
                status_area: v.status_area
            })
        }
        else
            alert('Edicion activa')
    }
    datos()
    {
        console.log(this.lista);
        var nombre_area = this.lista.filter((item) => {
            return item.nombre_area.toUpperCase().search(this.state.filtro_nombre.toUpperCase()) >= 0
        });
        const verificar_estado = (estado) =>estado == 'v' || estado == 'V' ? 'Vigente' : 'Cancelado'
        const checar = (folio) => folio == this.state.folio_area ? "Seleccionado" : "";
        console.log(this.lista);
        const v = nombre_area.map((dato) =>
        <tr className={checar(dato.folio_area)} key={dato.folio_area} onClick={ ()=> this.clic(dato)}>
        <td>
            {dato.folio_area}
        </td>
        <td>
            {dato.nombre_area}
        </td>
        <td>
            {verificar_estado(dato.status_area)}
        </td>
        <td>
                <span className="glyphicon glyphicon-trash" onClick={ ()=>this.eliminar(dato) }></span>
        </td>
    </tr>
    );
        return v;
    }
    nuevo() {
        if (this.lista.length > 0) {
            if (!(this.state.nueva || this.state.editable)) {
                const consecutivo = conexion_ajax('servicios/datos_tabla.asmx/consecutivo_folio_areas')
                this.setState({ nueva: true, editable: true, folio_area: consecutivo, nombre_area: '',status_area:'V'})
                console.log('nuevo')
            }
            else
                alert('Edicion activa')
        }
        else
            this.setState({ nueva: true, editable: true, folio_area: 1, nombre_area: '' })
    }
    editar() {
        if (!(this.state.nueva && this.state.editable) && this.state.folio_area > 0 && this.state.nombre_area != '') {
            this.setState({ nueva: false, editable: true })
        }
        else
            alert('Sin Campos Seleccionados')
    }
    guardar() {
        if (!this.lista.includes(this.lista.filter((item) =>item.nombre_area == this.state.nombre_area && this.state.nueva)[0])) {
            if (this.state.editable) {
                if (this.state.folio_area > 0 && (!this.state.nombre_area == '')) {
                    const respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_area', { folio_area: this.state.folio_area, nombre_area: this.state.nombre_area, status_area: this.state.status_area })
                    this.setState({ nueva: false, editable: false, folio_area: '', nombre_area: '' })
                    this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_area_matriz");
                    console.log(respuesta)
                }
                else
                    alert('Hay campos sin llenar')
            }
            else
                alert('Edicion deshactivada')
        }
        else
            alert('Ya existe un area con el mismo nombre')
    }
    cancelar()
    {
        this.setState({ editable: false, nueva: false, folio_area: '', nombre_area: '',status_area:'V' })
    }
    eliminar(dato) {
        if (!this.state.editable) {
            const respuesta = conexion_ajax('servicios/datos_tabla.asmx/delete_area',
            { folio_area: dato.folio_area })
            this.setState({ folio_area: '', nombre_area: '' })
            this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_area_matriz");
        }
    }
    cambiar_nombre(v) {
        if (this.state.editable)
        this.setState({ nombre_area: v.target.value })
    }
    cambiar_status(v) {
        if (this.state.editable)
        this.setState({ status_area: v.target.value })
    }
    on_filtro(e) {
        this.setState({ filtro_nombre: e.target.value })
    }
    render()
    {
        return (
            <div>
            <Botonera
             nuevo={this.nuevo.bind(this)}
             editar={this.editar.bind(this)}
             guardar={this.guardar.bind(this)}
             deshacer={this.cancelar.bind(this)}
             class_editar={this.state.editable}
             class_nuevo={this.state.nueva}/>
            <Cabecera folio_area={this.state.folio_area} 
                      nombre_area={this.state.nombre_area} 
                      cambiar_status={this.cambiar_status} 
                      status_area={this.state.status_area} 
                      cambiar_nombre={this.cambiar_nombre}
                      filtro_nombre={this.filtro} />
            <Tabla_a cuerpo={this.datos()}/>
            </div>
            )
    }
}
const estilo_cabecera_tabla =
    {
        'position': 'stinky'
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
    'border-radius':'10px'
}
ReactDOM.render(
     <Areas />
            ,
            document.getElementById("pruebas")
    );