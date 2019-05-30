class Cabecera extends React.Component {
    render() {
        const orden = this.props.orden || '';
        const estatus = this.props.estatus || 'V' ||'C';
        const nombre_establecimiento = this.props.nombre_establecimiento || '';
        const nombre_area = this.props.nombre_area || '';
        const nombre_unidad = this.props.nombre_unidad || '';
        const seleccionar_estatus = this.props.seleccionar_estatus;
        const folio_establecimiento = this.folio_establecimiento;
        const opcion_establecimiento = this.props.opcion_establecimiento;
        const opcion_areas = this.props.opcion_areas;
        const opcion_unidades = this.props.opcion_unidades;
        const on_area = this.props.on_area;
        const on_unidad = this.props.on_unidad;
        const on_establecimiento = this.props.on_establecimiento;
        return (
            <div class="input-group">
                    <div class="input-group col-lg-8">
                <label class="input-group-addon">Establecimientos</label>
                <select onChange={on_establecimiento}  className="form-control" >
                    <option value="0">Seleccione una opcion</option>
                    {this.props.nombre_establecimiento}
                </select>
                </div>
                <br />
                <form class="form-inline">
                    <div class="input-group">
                  <label  class="input-group-addon">Areas</label>
                    <select onChange={on_area} className="form-control">
                    <option value="0">Seleccione una opcion</option>
                    {this.props.nombre_area}
                </select>
                     </div>
                    <div class="input-group has-feedback ">
                <label  class="input-group-addon">Unidades</label>
                <select onChange={on_unidad} className="form-control">
                    <option value="0">Seleccione una opcion</option>
                    {this.props.nombre_unidad}
                </select>
                    </div>
                    <div class="input-group has-feedback">
                <label class="input-group-addon">Estado</label>
                <select onChange={seleccionar_estatus} className="form-control">
                    {this.ver_status(estatus)}
                </select>
                    </div>
                </form>
            </div>
            )
    }
    ver_status(estatus) {
        const v = []
        if (estatus =='v'|| estatus=='V' ) {
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
class Tabla extends React.Component
{
    render()
    {
        return (
            <div style={estilo_tabla}>
            <table className="table">
                <thead style={estilo_cabecera_tabla}>
                    <tr style={{"background":"#dd8000"}}>
                        <td>Orden</td>
                        <td>Area</td>
                        <td>Unidad</td>
                        <td>Estado</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                   {this.props.tabla}
                </tbody>
            </table>
            </div>
            );
    }
}
class Botonera extends React.Component {
    render() {
        var nuevo = "btn btn-primary";
        var editar = "btn btn-primary";
        var guardar = "btn btn-primary";
        var deshacer = "btn btn-primary";
        if (this.props.class_editar && !this.props.class_nuevo)
            editar = "btn btn-info";
        else if (this.props.class_nuevo)
            nuevo = "btn btn-info";
        if (this.props.class_editar || this.props.class_nuevo) {
            guardar = "btn btn-success";
            deshacer = "btn btn-warning";
        }
        return(
            <div className="btn-group" style={{"margin-bottom":"10px"}}>
                <input type="button" value="Nuevo" className={nuevo} onClick={this.props.nuevo}  />
                <input type="button" value="Editar" className={editar} onClick={this.props.editar} />
                <input type="button" value="Guardar" className={guardar} onClick={this.props.guardar} />
                <input type="button" value="Deshacer" className={deshacer} onClick={this.props.deshacer} />
            </div>
        );
}
}
class Botones extends React.Component
{
    render()
    {
        const agregar = this.props.agregar;
        return (
            <form className="form-inline col-lg-offset-8">
                <div className="input-group">
                    <div className="input-group ">
                        <input type="button" value="Agregar" name="agregar" onClick={agregar} className="btn btn-primary" />
                    </div>
                </div>
            </form>)
    }
}
class Datos extends React.Component
{
    constructor(props)
    { super()
        this.lista_e = conexion_ajax("servicios/datos_tabla.asmx/cargar_establecimientos");
        this.lista_a = conexion_ajax("servicios/datos_tabla.asmx/cargar_areas");
        this.lista_u = conexion_ajax("servicios/datos_tabla.asmx/cargar_unidades");
        this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", {
            folio_establecimiento: this.lista_e[0].folio_establecimiento
        });
        this.state =
            {
                nueva: false,
                editable: false,
                orden: 0,
                folio_establecimiento: this.lista_e[0].folio_establecimiento,
                folio_area: 0,
                folio_unidad: 0,
                nombre_area: '',
                nombre_unidad: '',
                folio_usuario_ultima_modificacion: '',
                estatus: 'V'
            }
        this.opcion_establecimiento = this.opcion_establecimiento.bind(this);
        this.seleccionar_estatus = this.seleccionar_estatus.bind(this);
        this.on_area = this.on_area.bind(this);
        this.on_establecimiento = this.on_establecimiento.bind(this);
        this.on_unidad = this.on_unidad.bind(this);
        this.opcion_areas = this.opcion_areas.bind(this);
        this.opcion_unidades = this.opcion_unidades.bind(this);
        this.agregar = this.agregar.bind(this);
        this.guardar = this.guardar.bind(this);
        this.nuevo = this.nuevo.bind(this);
        this.editar = this.editar.bind(this);
        this.cancelar = this.cancelar.bind(this);   
    }
opcion_establecimiento() {
        const v = this.lista_e.map((dato) =>
            <option value={dato.folio_establecimiento} selected ={dato.folio_establecimiento==this.state.folio_establecimiento} >
                 {dato.nombre_establecimiento}
            </option>);
        console.log(v);
        return v;
}
opcion_areas() {
        const v = this.lista_a.map((dato)=>
            <option value={dato.folio_area} selected ={dato.folio_area==this.state.folio_area}>
            {dato.nombre_area}
            </option>);
        console.log(v);
        return v;
}
opcion_unidades()
{ 
        const v = this.lista_u.map((dato) =>
            <option value={dato.folio_unidad} selected={dato.folio_unidad==this.state.folio_unidad}>
                {dato.nombre_unidad}
    </option>);
        return v;
}
    clic(e) {
        console.log(e)
        if (!this.state.editable) {
            this.setState({
                orden: e.orden
                , nombre_area: e.nombre_area
                , folio_area: e.folio_area
                , folio_unidad: e.folio_unidad
                , nombre_unidad: e.nombre_unidad
                , estatus: e.estatus
            })
        }
        else
            alert('Edicion activa')
    }
dato()
{
    const verificar_estado=(estado)=>estado=='v'||estado=='V'?'Vigente':'Cancelado'
    const checar = (folio) => folio == this.state.orden ? "Seleccionado" : "";
    const v = this.lista_c.map((dat, posision) =>
    {
        dat.orden = posision + 1
        console.log(dat)
           return <tr className={checar(dat.orden)} key={dat.orden} onClick={ ()=>this.clic(dat)}>
                <td>
                {posision+1}
                </td>
                <td>
                {dat.nombre_area}
                </td>
                <td>
                {dat.nombre_unidad}
                </td>
                <td>
                {verificar_estado(dat.estatus)}
                </td>
                <td>
                    <div>
                        <span class="glyphicon glyphicon-trash" onClick={() =>this.eliminar_de_tabla(dat)}></span>
                    </div>
                </td>
                <td>   
                        <span class="glyphicon glyphicon-chevron-up" onClick={() =>this.mover(-1,dat)}></span>
                        <span class="glyphicon glyphicon-chevron-down" onClick={() =>this.mover(1,dat)}></span>
                </td>
            </tr>});
                    return v;
}
    on_unidad(e) {
        const nombre= this.lista_u.filter(unidad=>unidad.folio_unidad == e.target.value)[0].nombre_unidad || ''
        if (this.state.editable)
        this.setState({folio_unidad: e.target.value,nombre_unidad:nombre})
    }
    on_establecimiento(e) {
        this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", { folio_establecimiento:e.target.value });
        this.setState({ folio_establecimiento: e.target.value })
    }
    on_area(e)
    {
        const nombre = this.lista_a.filter(area=>area.folio_area == e.target.value)[0].nombre_area || ''   
        const obj = { folio_area: e.target.value, nombre_area: nombre }
        console.log(obj)
        console.log(this.state)
        if (this.state.editable)
            this.setState({ folio_area: e.target.value,nombre_area:nombre })
    }
    seleccionar_estatus(e) {
        if (this.state.editable)
        this.setState({estatus: e.target.value})
    }
    guardar()
    {
        if (!this.state.editable) {
            var datos_guardar = []
            this.lista_c = this.lista_c.map((elemento) => {
                datos_guardar.push(
                elemento.orden + ',' +
                elemento.folio_establecimiento + ',' +
                elemento.folio_area + ',' +
                elemento.folio_unidad + ',' +
                elemento.estatus + ',' +
                ID_SCOI
                )
            })
            console.log(datos_guardar)
            conexion_ajax("servicios/datos_tabla.asmx/insert_catalogo", { datos: datos_guardar })
            this.setState({ nueva: false, editable: false })
            this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", {
                folio_establecimiento: this.state.folio_establecimiento});
            this.lista_u = conexion_ajax("servicios/datos_tabla.asmx/cargar_unidades");
            this.setState({ nueva: false, editable: false, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' })
        }
        else {
            alert('Primero debes de agregar para guardar los cambios')
        }
    }
    agregar()
    {
        if(this.state.folio_area>0 && this.state.folio_unidad>0){
    if (this.state.editable) {
            const obj = {
                orden: this.state.orden,
                folio_establecimiento: this.lista_e.filter(est=>est.folio_establecimiento == this.state.folio_establecimiento)[0].folio_establecimiento,
                folio_area: this.state.folio_area,
                folio_unidad: this.state.folio_unidad,
                nombre_unidad: this.state.nombre_unidad,
                nombre_area: this.state.nombre_area,
                estatus: this.state.estatus,
                folio_usuario_ultima_modificacion: ID_SCOI
            }
            console.log(this.state)
            console.log(obj)
            console.log(this.state.orden)
            console.log(this.lista_c.length)
            if (this.state.orden < this.lista_c.length+1) {
                var caja = this.lista_c.filter(element=>element.orden == this.state.orden)
                const pos = this.lista_c.indexOf(caja[0])
                this.lista_c[pos] = obj;
                console.log('esta en la lista ' + caja[0].orden)
            }
            else if (this.lista_c.filter((item) =>item.folio_unidad == this.state.folio_unidad).length == 0) {
                console.log(this.lista_c.length - 1)
                console.log(obj)
                this.lista_c.push(obj)
            }
            this.setState({ nueva: false, editable: false, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' })
        }   
        else
            alert('habilitar edicion')
        }
        else 
            alert('Faltan campos por completar')
}
cancelar() {
    this.setState({ editable: false, nueva: false, orden: 0, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' })
    this.lista_c = conexion_ajax("servicios/datos_tabla.asmx/obtener_catalogo_matriz", {
        folio_establecimiento: this.state.folio_establecimiento
    });
    this.setState({ editable: false, nueva: false, orden: 0, folio_area: 0, folio_unidad: 0, nombre_area: '', nombre_unidad: '', estatus: 'V' })
}
nuevo()
{
    if (!(this.state.nueva && this.state.editable))
        this.setState({ nueva: true, editable: true, orden: this.lista_c.length + 1, estatus: 'V' })
    else {
        alert('Edicion activa')
    }
}
editar()
{
    if (!(this.state.nueva && this.state.editable) && this.state.orden > 0 && this.state.folio_area >0 && this.state.folio_unidad>0) {
        this.setState({ editable: true })
    }
    else
        alert('Sin Campos Seleccionados')
}
mover(mover,fila)
{
    if(!this.state.editable){
        console.info(fila)
        console.info(this.state)
    const posision_inicial=this.lista_c.indexOf(fila);
    const posision_nueva=posision_inicial+mover
    if (posision_nueva < this.lista_c.length)
    {
        this.lista_c[posision_inicial] = this.lista_c[posision_nueva];
        this.lista_c[posision_nueva] = fila;
        this.lista_c = this.lista_c.map((dato, posision) =>
        {
            dato.orden=posision+1
            console.log(posision)
            return dato;
        })
        this.setState({ editable:false})
    }
    else
        alert('Edicion activada')
}
    }
    eliminar_de_tabla(dat)
    {
        if (!this.state.editable) {
            const eliminar = this.lista_c.indexOf(dat);
            this.lista_c.splice(eliminar, 1)
            this.setState({ orden: '' })
            if (this.lista_c.length > 0)
                this.lista_c = this.lista_c.map((tito) => {
                    tito.orden = this.lista_c.indexOf(tito) + 1;
                    return tito
                })
        }
    }
        render() {
        return(
            <div>
            <Botonera
                      nuevo={this.nuevo.bind(this)}
                      editar={this.editar.bind(this)}
                      deshacer={this.cancelar.bind(this)}
                      class_editar={this.state.editable}
                      guardar={this.guardar.bind(this)}
                      class_nuevo={this.state.nueva} />
            <Cabecera nombre_establecimiento={this.opcion_establecimiento()} 
                      nombre_area={this.opcion_areas()} 
                      nombre_unidad={this.opcion_unidades()}
                      orden={this.orden}
                      estatus={this.state.estatus}
                      folio_establecimiento={this.state.folio_establecimiento}
                      opcion_establecimiento={this.opcion_establecimiento}
                      seleccionar_estatus={this.seleccionar_estatus.bind(this)}
                      opcion_areas={this.opcion_areas}
                      opcion_unidades={this.opcion_unidades}
                      on_area={this.on_area.bind(this)}
                      on_unidad={this.on_unidad.bind(this)}
                      on_establecimiento={this.on_establecimiento.bind(this)}/>
            <Botones agregar={this.agregar}
                     guardar={this.guardar}/>
            <Tabla tabla={this.dato()} />
        </div>
        )
    }
}
const estilo_cabecera_tabla =
    {
        'position': 'stinky'
        , 'min-width': '100%'
        , 'top': '-1px'
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
   <Datos/>
       ,
        document.getElementById("pruebas")
      );