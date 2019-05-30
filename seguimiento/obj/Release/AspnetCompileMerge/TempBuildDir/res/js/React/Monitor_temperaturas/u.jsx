class Cabecera extends React.Component {
    render() {
        const folio_unidad = this.props.folio_unidad || '';
        const nombre_unidad = this.props.nombre_unidad || '';
        const status_unidad = this.props.status_unidad || 'v';
        const cambiar_nombre_u = this.props.cambiar_nombre_u;
        const cambiar_status_u = this.props.cambiar_status_u;
        const limite_inferior = this.props.limite_inferior || '';
        const limite_superior = this.props.limite_superior || '';
        const cambiar_lim_inf = this.props.cambiar_lim_inf;
        const cambiar_lim_sup = this.props.cambiar_lim_sup;
        return (
    <div className="container">
                <form class="form-inline">
                        <div class="input-group">
                    <label class="input-group-addon">Folio</label>
                    <input type="text" value={folio_unidad} className="form-control" />
                        </div>
                        <div class="input-group has-feedback  ">
                    <label class="input-group-addon">Unidad</label>
                    <input type="text" value={nombre_unidad} onChange={cambiar_nombre_u} className="form-control" />
                        </div>
                        <div class="input-group has-feedback ">
                    <label class="input-group-addon">Estado</label>
                    <select onChange={cambiar_status_u} className="form-control">
                        {this.ver_status(status_unidad)}
                    </select>
                        </div>
                </form>
                <form class="form-inline">
                        <div class="input-group has-feedback ">
                <label class="input-group-addon">Limite inferior</label>
                <input type="number" min="-100" max="100" value={limite_inferior} onChange={cambiar_lim_inf} className="form-control" />
                        </div>
                     <div class="input-group has-feedback ">
                <label class="input-group-addon">Limite Superior</label>
                <input type="number" min="-100" max="100" value={limite_superior} onChange={cambiar_lim_sup} className="form-control" />
                     </div>
                </form>
            <div class="input-group has-feedback col-lg-2 ">
                <label class="input-group-addon"> <span className="fa fa-filter"></span> Filtro</label>
                <input type="text" name="filtro" onChange={this.props.filtro_nombre} className="form-control" />
            </div>
</div>)
    }
    ver_status(status_unidad) {
        const v = []
        if (status_unidad == 'v' || status_unidad == 'V') {
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
class Tabla_u extends React.Component {
    render() {
        return (
             <div style={estilo_tabla}>
                <table className="table">
                <thead>
    <tr style={estilo_cabecera_tabla}>
        <td>Folio</td>
        <td>Unidades</td>
        <td>Estado</td>
        <td>Limite minimo</td>
        <td>Limite maximo</td>
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
class Unidades extends React.Component {
    constructor(props) {
        super()
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_unidad_matriz");
        this.state =
         {
            nueva: false
            , editable: false
            , folio_unidad: 0
            , nombre_unidad: ''
            , status_unidad: 'v'
            , filtro_nombre: ''
            , limite_inferior: 0
            ,limite_superior:0
        }
        this.nuevo = this.nuevo.bind(this)
        this.cambiar_nombre_u = this.cambiar_nombre_u.bind(this)
        this.cambiar_status_u = this.cambiar_status_u.bind(this)
        this.cancelar = this.cancelar.bind(this)
        this.eliminar = this.eliminar.bind(this)
        this.filtro = this.on_filtro.bind(this);
        this.cambiar_lim_inf = this.cambiar_lim_inf.bind(this)
        this.cambiar_lim_sup = this.cambiar_lim_sup.bind(this)
    }
    clic_tabla_u(v) {
        console.table(v)
        if (!this.state.editable) {
            this.setState
            ({
                folio_unidad: v.folio_unidad,
                nombre_unidad: v.nombre_unidad,
                status_unidad: v.status_unidad,
                limite_inferior: v.limite_inferior,
                limite_superior:v.limite_superior
            })
        }
        else
            alert('Edicion activa')
    }
    dato() {
        //filtro
        console.log(this.lista);
        var nombre_unidad = this.lista.filter((item) => {
            return item.nombre_unidad.toUpperCase().search(this.state.filtro_nombre.toUpperCase()) >= 0
        });
        const verificar_estado = (estado) =>estado == 'v' || estado == 'V' ? 'Vigente' : 'Cancelado'
        const checar = (folio) => folio == this.state.folio_unidad ? "Seleccionado" : "";
        console.log(nombre_unidad)
        const v = nombre_unidad.map((dat) =>
                <tr className={checar(dat.folio_unidad)} key={dat.folio_unidad} onClick={ ()=>
                    this.clic_tabla_u(dat) }>
                <td>
                    {dat.folio_unidad}
                </td>
                <td>
                    {dat.nombre_unidad}
                </td>
                <td>
                    {verificar_estado(dat.status_unidad)}
                </td>
                <td>
                    {dat.limite_inferior}
                </td>
                <td>
                    {dat.limite_superior}
                </td>
                <td>
                    <span className="glyphicon glyphicon-trash" onClick={ ()=>this.eliminar(dat) }></span>
                </td>
                </tr>);
        return v;
    }
    nuevo() {
        if (this.lista.length > 0) {
            if (!(this.state.nueva || this.state.editable)) {
                const consecutivo_u = conexion_ajax('servicios/datos_tabla.asmx/consecutivo_folio_unidades');
                this.setState({ nueva: true, editable: true, folio_unidad: consecutivo_u, nombre_unidad: '', limite_inferior: 0, limite_superior: 0 ,status_unidad:'V'})
                console.log('nuevo')
            }
            else
                alert('Edicion activa')
        }
        else
            this.setState({ nueva: true, editable: true, folio_unidad: 1, nombre_unidad: '', limite_inferior: 0, limite_superior: 0 })
    }
    editar() {
        console.log(this.state)
        if (!(this.state.nueva && this.state.editable) && this.state.folio_unidad > 0 && this.state.nombre_unidad != '' && this.state.limite_inferior != null && this.state.limite_superior !=null ) {
            this.setState({ nueva: false, editable: true })
        }
        else
            alert('Sin Campos Seleccionados')
    }
    guardar() {
        if (!this.lista.includes(this.lista.filter((item) =>item.nombre_unidad == this.state.nombre_unidad && this.state.nueva)[0])) {
            if (this.state.editable) {
                if (this.state.folio_unidad > 0 && (!this.state.nombre_unidad == '') && (!this.state.limite_inferior == '') && (!this.state.limite_superior == '')) {
                    const respuesta = conexion_ajax('servicios/datos_tabla.asmx/guardar_unidad', { folio_unidad: this.state.folio_unidad, nombre_unidad: this.state.nombre_unidad, status_unidad: this.state.status_unidad, limite_inferior: this.state.limite_inferior, limite_superior: this.state.limite_superior })
                    this.setState({ nueva: false, editable: false, folio_unidad: 0, nombre_unidad: '',limite_inferior:0,limite_superior:0 ,status_unidad:'V'})
                    this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_unidad_matriz");
                    console.log(respuesta)
                }
                else
                    alert('Hay campos sin llenar')
            }
            else
                alert('Edicion deshactivada')
        }
        else
            alert('Ya existe una unidad con el mismo nombre')
    }
    cancelar() {
        this.setState({ editable: false, nueva: false, folio_unidad: 0, nombre_unidad: '',limite_inferior:0,limite_superior:0,status_unidad:'V'})
    }
    eliminar(dat) {
        if (!this.state.editable) {
            const respuesta = conexion_ajax('servicios/datos_tabla.asmx/delete_unidad',
            { folio_unidad: dat.folio_unidad })
            this.setState({ folio_unidad: '', nombre_unidad: '', limite_inferior: 0, limite_superior: 0 })
            this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_unidad_matriz");
        }
    }
    cambiar_nombre_u(v) {
        if (this.state.editable)
            this.setState({ nombre_unidad: v.target.value })
    }
    cambiar_lim_inf(v) {
        if (this.state.editable)
            this.setState({ limite_inferior: v.target.value })
    }
    cambiar_lim_sup(v) {
        if (this.state.editable)
            this.setState({ limite_superior: v.target.value })
    }
    cambiar_status_u(v) {
        if (this.state.editable)
            this.setState({ status_unidad: v.target.value })
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
                              class_nuevo={this.state.nueva} />
                <Cabecera folio_unidad={this.state.folio_unidad}
                          nombre_unidad={this.state.nombre_unidad}
                          cambiar_nombre_u={this.cambiar_nombre_u}
                          status_unidad={this.state.status_unidad}
                          cambiar_status_u={this.cambiar_status_u}
                          limite_inferior={this.state.limite_inferior}
                          limite_superior={this.state.limite_superior}
                          cambiar_lim_inf={this.cambiar_lim_inf}
                          cambiar_lim_sup={this.cambiar_lim_sup}
                          filtro_nombre={this.filtro} />
                <Tabla_u cuerpo={this.dato()} />
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
   <Unidades />
       ,
        document.getElementById("pruebas")
      );