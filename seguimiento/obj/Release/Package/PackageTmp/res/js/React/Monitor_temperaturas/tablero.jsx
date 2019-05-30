class Tabla extends React.Component {
    constructor(props)
    {
        super(props)
        this.lista__temperaturas_x_tiempos = conexion_ajax("servicios/datos_tabla.asmx/obtener_temperaturas_x_tiempos");
        this.cuerpo = [];
        this.establecimientos();
        this.boton_regresar = null;
        this.boton_regresar_1 = null;
        this.cambia_nombre = this.props.nombre_establecimiento || 'Establecimientos';
        this.state={
            folio_unidad: 0,
            nombre_establecimiento: '',
            nombre_area: '',
            nombre_unidad: '',
            limite_inferior: 0,
            limite_superior: 0,
            periodos_por_unidad:[]
        }
        this.barChart = null;
        console.log(this.lista_fallos)
    }   
    render() {
        return (
        <div>
            <div style={estilo_tabla}>
                    <table className="table">
                    <thead >
                        <tr style={estilo_cabecera_tabla}>
                            <td>
                                {this.boton_regresar} {this.cambia_nombre}
                            </td>
                            <td>{this.props.Departamento ||"Departamento"}</td>
                            <td>Unidad</td>
                            <td style={{width:"80px"}}> Actual.</td>
                            <td style={{width:"80px"}}> 1 Hora.</td>
                            <td style={{width:"80px"}}> 5 Horas.</td>
                            <td style={{width:"80px"}}> 24 Horas.</td>
                            <td style={{width:"80px"}}> 7 Dias.</td>
                            <td style={{width:"80px"}}> 15 Dias.</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cuerpo}
                    </tbody>
                    </table>
            </div>
                <ModalPeriodosPorUnidad
                    unidad={this.state.nombre_unidad}
                />
        </div>
        )
    }
    nomb(dato){
         return (
            <span className="texto_cavecera"> {dato.nombre_establecimiento} </span>)
    }
    establecimientos(){
        this.cambia_nombre = 'Establecimientos';
        var temperaturas = [];
        var establecimiento = { folio_establecimiento: 0, nombre_establecimiento: '', folio_area: 0, nombre_area: '', folio_unidad: 0, nombre_unidad: '', temperatura: 0, limite_inferior: 0, limite_superior :0}
        var lista_establecimiento = [];
        this.lista__temperaturas_x_tiempos.forEach((dato,posision) => {
            //asignamos la primera posision
            if (posision==0)
            {
                establecimiento = dato;
            }
            if (establecimiento.folio_establecimiento == dato.folio_establecimiento)
            {
                var auxiliar_temp = 0;
                temperaturas.push(dato.temperatura)
                if (posision == this.lista__temperaturas_x_tiempos.length - 1) {
                    temperaturas.forEach((item) => { auxiliar_temp += item })
                    establecimiento.temperatura = (auxiliar_temp / temperaturas.length)
                    lista_establecimiento.push(establecimiento)
                }
            }
            else
                if (establecimiento.folio_establecimiento != dato.folio_establecimiento)
             {
                var aux = 0;
                temperaturas.forEach((item) => {
                    aux += item
                })
                establecimiento.temperatura = (aux / temperaturas.length)
                lista_establecimiento.push(establecimiento)
                establecimiento = dato
                temperaturas = [dato.temperatura];
                    //preguntamos si posision esta dentro de lista
                if (establecimiento.folio_establecimiento == dato.folio_establecimiento) {
                    var auxiliar_temp = 0;
                    temperaturas.push(dato.temperatura)
                    //se hace un recorrido de la lista para saber la longitud y calcular el promedio
                    if (posision == this.lista__temperaturas_x_tiempos.length - 1) {
                        temperaturas.forEach((item) => { auxiliar_temp += item })
                        //se hace la operacion para sacar el promedio
                        establecimiento.temperatura = (auxiliar_temp / temperaturas.length)
                        lista_establecimiento.push(establecimiento)
                    }
                }
             }
        })
        console.log(this.lista__temperaturas_x_tiempos)
     this.cuerpo = lista_establecimiento.map((dato,posision)=>
             <tr key={dato.nombre_establecimiento+posision} onClick={ ()=>this.areas(dato)}>
                    <td>{dato.nombre_establecimiento}</td>
                    <td></td>
                    <td></td>
                    <td>{dato.temperatura_actual}</td>
                    <td>{dato.promedio_temperatura_ultima_hora}</td>
                    <td>{dato.promedio_temperatura_ultima_5_horas}</td>
                    <td>{dato.promedio_temperatura_ultimas_24_horas}</td>
                    <td>{dato.promedio_temperatura_ultimos_7_dias}</td>
                    <td>{dato.promedio_temperatura_ultimos_15_dias}</td>
             </tr>);
        this.setState({folio_establecimiento:0})
    }
    areas(dato){
        this.cambia_nombre = this.nomb(dato);
        this.boton_regresar = this.regresar_establecimientos();
        const listar_areas = conexion_ajax("servicios/datos_tabla.asmx/obtener_lista_areas", { folio_establecimiento: dato.folio_establecimiento });
            this.cuerpo= listar_areas.map((area,posision) =>
                <tr key={area.nombre_area+posision} onClick={ ()=>this.unidades(area)}  >
                    <td></td>
                    <td>
                        <div>
                        <div className="single-line">
                            {area.nombre_area} <span className="fa fa-fast-forward"></span>
                        </div>
                        </div>
                    </td>
                    <td></td>
                    <td>{area.temperatura_actual}</td>
                    <td>{area.promedio_temperatura_ultima_hora}</td>
                    <td>{area.promedio_temperatura_ultima_5_horas}</td>
                    <td>{area.promedio_temperatura_ultimas_24_horas}</td>
                    <td>{area.promedio_temperatura_ultimos_7_dias}</td>
                    <td>{area.promedio_temperatura_ultimos_15_dias}</td>
                </tr>);
        this.setState({ folio_establecimiento: dato.folio_establecimiento });
        console.log(listar_areas)
    }
    unidades(dato) {
        this.boton_regresar_1 = this.regresar_areas(dato)
        const lista_unidades = conexion_ajax("servicios/datos_tabla.asmx/obtener_lista_unidades", { folio_establecimiento: this.state.folio_establecimiento, folio_area: dato.folio_area });
        const checar = (temperatura) => {
            const frio = temperatura.temperatura_actual < temperatura.limite_inferior
            const caliente = temperatura.temperatura_actual > temperatura.limite_superior
            return frio ?
                "Azul" : (caliente ?
                "Rojo" : "")
        }
        const checar_1_hora = (temperatura) => {
            const frio = temperatura.promedio_temperatura_ultima_hora < temperatura.limite_inferior
            const caliente = temperatura.promedio_temperatura_ultima_hora > temperatura.limite_superior
            return frio ?
                "Azul" : (caliente ?
                "Rojo" : "")
        }
        const checar_5_horas = (temperatura) => {
            const frio = temperatura.promedio_temperatura_ultima_5_horas < temperatura.limite_inferior
            const caliente = temperatura.promedio_temperatura_ultima_5_horas > temperatura.limite_superior
            return frio ?
                "Azul" : (caliente ?
                "Rojo" : "")
        }
        const checar_24_horas = (temperatura) => {
            const frio = temperatura.promedio_temperatura_ultimas_24_horas < temperatura.limite_inferior
            const caliente = temperatura.promedio_temperatura_ultimas_24_horas > temperatura.limite_superior
            return frio ?
                "Azul" : (caliente ?
                "Rojo" : "")
        }
        this.cuerpo = lista_unidades.map((unidad, posision) => {
            return (
            <tr key={unidad.nombre_area + posision}>
                    <td>
                        {this.boton_regresar_1}
                    </td>
                    <td>
                        {unidad.nombre_area}
                    </td>
                    <td>
                        {unidad.nombre_unidad}
                    </td>
                    <td className={checar(unidad)}>
                            {unidad.temperatura_actual}
                    </td>
                    <td className={checar_1_hora(unidad)}>
                        <i className="btn btn-default" style={btn_unidades}
                            onClick={() => this.Obtener_temperaturas_por_periodo(unidad.folio_unidad, '1_h', unidad.nombre_area, unidad.nombre_unidad) }>
                            {unidad.promedio_temperatura_ultima_hora}
                            <i className="fa fa-thermometer-quarter" style={{marginLeft:"3px"}}></i>
                        </i>
                    </td>
                    <td className={checar_5_horas(unidad)}>
                        <i className="btn btn-default" style={btn_unidades}
                            onClick={() => this.Obtener_temperaturas_por_periodo(unidad.folio_unidad, '5_h', unidad.nombre_area, unidad.nombre_unidad)}>
                            {unidad.promedio_temperatura_ultima_5_horas}
                            <i className="fa fa-thermometer-quarter" style={{ marginLeft: "3px" }}></i>
                        </i>
                    </td>
                    <td className={checar_24_horas(unidad)}>
                        <i className="btn btn-default" style={btn_unidades}
                            onClick={() => this.Obtener_temperaturas_por_periodo(unidad.folio_unidad, '1_d', unidad.nombre_area, unidad.nombre_unidad)}>
                            {unidad.promedio_temperatura_ultimas_24_horas}
                            <i className="fa fa-thermometer-quarter" style={{ marginLeft: "3px" }}></i>
                        </i>
                    </td>
                    <td>
                        <i className="btn btn-default" style={btn_unidades}
                            onClick={() => this.Obtener_temperaturas_por_periodo(unidad.folio_unidad, '7_d', unidad.nombre_area, unidad.nombre_unidad)}>
                            {unidad.promedio_temperatura_ultimos_7_dias}
                            <i className="fa fa-thermometer-quarter" style={{ marginLeft: "3px" }}></i>
                        </i>
                    </td>
                    <td>
                        <i className="btn btn-default" style={btn_unidades}
                            onClick={() => this.Obtener_temperaturas_por_periodo(unidad.folio_unidad, '15_d', unidad.nombre_area, unidad.nombre_unidad)}>
                            {unidad.promedio_temperatura_ultimos_15_dias}
                            <i className="fa fa-thermometer-quarter" style={{ marginLeft: "3px" }}></i>
                        </i>
                    </td>
            </tr>)
        });
        this.setState({ folio_area: dato.folio_area })
        console.log(lista_unidades)
    }
    regresar_establecimientos(){
        return <span className="glyphicon glyphicon-home" onClick={() =>this.establecimientos()}> </span>                
    }
    regresar_areas(unidad){
        return <span className="fa fa-mail-reply" onClick={() =>this.areas(unidad)}> </span>
    }
    grafica_periodos({ lista_seleccion, max, min, titulo, labs }) {
        var ctx = document.getElementById("barras_char");

        const updateGraph = () => {
            return new Promise((resolver, cancelar) => {
                console.log("previo:", this.barChart.options.title.text);
                console.log("nuevo:", titulo);

                this.barChart.data.labels = labs;
                this.barChart.options.title.text = titulo;
                this.barChart.options.scales.yAxes[0].ticks.callback = (value, index, values) => `(${value}) c.`;

                this.barChart.data.datasets[0].data = lista_seleccion;
                this.barChart.data.datasets[1].data = max;
                this.barChart.data.datasets[2].data = min;
                console.log("Cambio:", this.barChart.options.title.text);

                resolver(this.barChart);
            });
        }
        async function cambios(bar){
            bar.update();
            document.getElementById("modal_periodos_por_unidad").style.display = "flex";
        }
        if (this.barChart != null) {
            this.barChart.clear();
            //this.barChart.destroy();

                updateGraph()
                .then(cambios);
        }
        else {
            this.barChart = new Chart(ctx,
                {
                    type: 'line',
                    data: {
                        labels: labs,
                        datasets: [
                            {
                                label: "Captura.",
                                data: lista_seleccion,
                                borderColor: "#00b300",
                                fill: false
                            },
                            {
                                label: "Maximo.",
                                data: max,
                                borderColor: "#ff0000",
                                fill: false
                            },
                            {
                                label: "Minimo.",
                                data: min,
                                borderColor: "#0099ff",
                                fill: false
                            }]
                    },
                    options: {
                        title: {
                            display: false,
                            text: titulo
                        },
                        responsive: true,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        callback: (value, index, values) => `(${value}) c.`
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Temperatura ( c ).'
                                    }
                                }
                            ]
                        }
                    }
                });

            this.barChart.update();
            document.getElementById("modal_periodos_por_unidad").style.display = "flex";
        }

    }

    Obtener_temperaturas_por_periodo(folio, periodo,area, unidad) {
        var titulo = "";
        switch (periodo) {
            case "15_d":
                titulo = ` ${unidad} : periodo 15 Dias.`;
                break;
            case "7_d":
                titulo = ` ${unidad} : periodo 7 Dias.`;
                break;
            case "1_d":
                titulo = ` ${unidad} : periodo 24 Horas.`;
                break;
            case "5_h":
                titulo = ` ${unidad} : periodo 5 Horas.`;
                break;
            case "1_h":
                titulo = ` ${unidad} : periodo 1 Hora.`;
                break;
        }
        fetch("servicios/datos_tabla.asmx/refrigeradores_monitoreo_por_periodo",
            {
                method: 'POST',
                body: JSON.stringify({
                    folio: folio,
                    periodo: periodo
                }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => {
                e.json()
                    .then(r => {
                        console.table(r.d);
                        if (r.d.length > 0) {
                            const resultados = {
                                lista_seleccion :[],
                                max :[],
                                min :[],
                                labs: [],
                                titulo: titulo
                            }
                            r.d.forEach(e => {
                                resultados.lista_seleccion.push(e.temperatura);
                                resultados.labs.push(`${e.hora} ${e.fecha}`)
                                resultados.max.push(e.limite_superior);
                                resultados.min.push(e.limite_inferior);
                            });
                            this.setState({ periodos_por_unidad: r.d });
                            this.grafica_periodos(resultados);
                            
                            this.setState({ nombre_unidad: area });
                        } else alert("Error Al Cargar Datos!!!\n Sin Datos A Mostrar.");
                    });
            })
            .catch(
                e => alert('Error!!!')
            );
    }
}
const ModalPeriodosPorUnidad = ({unidad}) => {

    return (
        <div id="modal_periodos_por_unidad" style={{
            position: "fixed",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(144, 144, 146, 0.49)",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9991,
            display: "none"
        }}>
            <div className="panel panel-default" style={{ height: "90%", minHeight: "650px", width: "80%",minWidth: "550px" }}>
                <div className="panel-heading"
                    style={{ background:"#009933",color:"azure"}}
                >
                    <i className="close fa fa-close"
                        style={{fontSize:"15px"}}
                        onClick={() => cerrar()}></i>
                    <strong>Seguimiento De Temperaturas : Departamento {unidad}.</strong>
                </div>
                <div className="panel-body" style={{
                    overflow:"scroll"
                }}>
                    <canvas id="barras_char">
                    </canvas>
                </div>
            </div>
        </div>
    );
    function cerrar() {
        document.getElementById("modal_periodos_por_unidad").style.display = "none";
    }
}
const PeriodosUnidad = ({lista }) => {

    return (
        <div style={{height:"400px"}}>
            <Table>

            </Table>
        </div>
        );
}
class TablaFallos extends React.Component {
    constructor(props){
        super(props)
        this.lista_fallos = conexion_ajax("servicios/datos_tabla.asmx/cargar_lista");
        this.state =
            {
                folio_unidad: 0,
                nombre_establecimiento: '',
                nombre_area: '',
                nombre_unidad: '',
                limite_inferior: 0,
                limite_superior: 0,
                estado: 'S',
                observaciones: '',
                id_scoi: 0
            }
        this.datos = []
        this.datos_incidencias = [];

        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_lista_empleados");
        this.opcion_empleados=this.opcion_empleados.bind(this);
        this.on_empleados = this.on_empleados.bind(this);
        this.guardar = this.guardar.bind(this);
        this.on_estado = this.on_estado.bind(this);
        this.on_observaciones = this.on_observaciones.bind(this);
        //actualiza los campos
        setInterval(()=>this.Recargar_datos(), 300000);
    }
    render() {
        return (
            <div >
          <center><h3><span style={{'color':'#ffd600'}} className="fa fa-exclamation-triangle"></span><label style={{'color':'red','marginLeft':'10px','marginRight':'10px'}}>Historico De Fallas</label><span style={{'color':'#ffd600'}} className="fa fa-exclamation-triangle"></span></h3></center>
                <div style={estilo_tabla}>
            <table className="table">
                <thead>
                    <tr style={estilo_cabecera_tabla_fallos} >
                        <td>Establecimiento</td>
                        <td>Area</td>
                        <td>Unidad</td>
                        <td>Limite min</td>
                        <td>Limite max</td>
                        <td>Estado</td>
                    </tr>
                </thead>
                <tbody>
                    {this.datos_fallos()}
                </tbody>
            </table>
                </div>
                <Modal 
                       
                       identidad={"mi_modal"}
                       cavecera={<center><h4>Inspeccion Temperaturas de Unidad.</h4></center>} 
                       cuerpo={[this.cabecera(),this.datos_cuerpo_mi_moda()]}
                       rodilla={this.observaciones()}
                       pie={this.empleados()}
                       />
                </div>
            )
    }
    on_modal1(e) {
        document.getElementById("mi_modal").style.display = 'flex';
        console.log(this.state)
        const lista_temperaturas = conexion_ajax("servicios/datos_tabla.asmx/obtener_temperaturas_unidad",
            {
                folio_unidad: e.folio_unidad
            });
        const lista_temperaturas_incidencias = conexion_ajax("servicios/datos_tabla.asmx/Obtener_incidencias_24_horas_unidad",
            {
                folio: e.folio_unidad
            });
        this.datos_incidencias = lista_temperaturas_incidencias.map((e) => {
            return (
            <tr key={e.folio_unidad} >
                <td>{e.fecha}</td>
                <td>{e.hora}</td>
                <td>{e.temperatura}</td>
                <td>{e.limite_inferior}</td>
                <td>{e.limite_superior}</td>
                <td>{e.estatus}</td>
            </tr>)
        });
        this.datos= lista_temperaturas.map((e) => {
            return <tr key={e.folio_unidad} >
                <td>{e.fecha}</td>
                <td>{e.hora}</td>
                <td>{e.temperatura}</td>
            </tr>
        });
        console.log(this.state)

        this.setState({
            nombre_establecimiento: e.nombre_establecimiento,estado:e.estado,
            nombre_area: e.nombre_area, nombre_unidad: e.nombre_unidad, folio_unidad: e.folio_unidad, limite_inferior: e.limite_inferior, limite_superior: e.limite_superior
        })
    }
    datos_cuerpo_mi_moda()
    {
        return (
            <div style={{'marginTop':'0px'}}>
                <div style={estilo_tabla_modal}>
                    <table className="table">
                        <thead>
                            <tr style={estilo_cabecera_tabla_fallos}>
                                <td>Fecha</td>
                                <td>Hora</td>
                                <td>Temperatura</td>
                            </tr>
                        </thead>
                        <tbody>
                           {this.datos} 
                        </tbody>
                    </table>
                </div><div style={{
                    overflowX: 'auto',
                    overflowY: 'auto',
                    display: "inline-block",
                    width: '570px',
                    height: '180px',
                    border: 'solid 1px gray',
                    borderRadius: '5px',
                    marginLeft: '7px',
                    marginTop: "10px"
                }}>
                    <table className="table">
                        <thead>
                            <tr style={estilo_cabecera_tabla_fallos}>
                                <td>Fecha</td>
                                <td>Hora</td>
                                <td>Temperatura</td>
                                <td>Inferior</td>
                                <td>Superior</td>
                                <td>estatus</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.datos_incidencias} 
                        </tbody>
                    </table>
                </div>
            </div>
            )
    }
    empleados()
        {
            return <div className="container" style={{'marginLeft':'5px','width':'725px'}}>
            <div class="input-group">
                <label class="input-group-addon">Atendio</label>
                <select required onChange={this.on_empleados}  className="form-control" >
                    <option value="0">Seleccione un empleado</option>
                        {this.opcion_empleados(this.state.nombrecompleto_usuario)}
                </select>
                </div>
                <i onClick={this.guardar}
                    style={{ 'marginTop': '-4px', background:"#0077ff" }}
                    value="Guardar"
                    className="form-control btn btn-info"  >  Guardar  <span className="fa fa-save"></span></i>                    
    </div>
    }
    guardar()
     {
          if(this.state.id_scoi > 0 &&(!this.state.observaciones=='')){
                conexion_ajax('servicios/datos_tabla.asmx/guardar_fallas', 
                { folio_unidad: this.state.folio_unidad, 
                  estado: this.state.estado, 
                  observaciones: this.state.observaciones,
                  id_scoi:this.state.id_scoi })
                  this.state = { folio_unidad: 0, estado: 'S', observaciones: '', id_scoi: 0 }
                  document.getElementById("mi_modal").style.display = 'none';
                  this.lista_fallos = conexion_ajax("servicios/datos_tabla.asmx/cargar_lista");
                  console.log(this.state)

                  this.setState({estado:'S',observaciones:'',id_scoi:''});
                        }
          else {
              alert('Hay campos sin llenar')
          }        
    }
    opcion_empleados() {
        const v = this.lista.map((dato)=>
            <option value={dato.id_scoi} selected={dato.id_scoi==this.state.id_scoi}>
            {dato.nombrecompleto_usuario}
            </option>);
            return v;
    }
    on_empleados(e) {
        this.setState({ id_scoi: e.target.value })
    }
    observaciones() {
        return <div>
                    <textarea onChange={this.on_observaciones} value={this.state.observaciones} placeholder=" * Observaciones de reparacion"  className="textarea_tamaño form-control">
                    </textarea>
               </div>
    }
    on_observaciones(e) {
        this.setState({ observaciones: e.target.value })
    }
    datos_fallos() {
        const checar_estadoo = (esta) => {
            const Sin = esta.estado == 'S'
            const Rev = esta.estado == 'R'
            return Sin ?
                "Rojo" : (Rev ? "verde" : "amarillo")
        }
        const verificar_estado = (estado) => {
            const Sin = estado == 'S'
            const Rev = estado == 'R'
            return Sin ?
                "Sin revisar" : (Rev ? "Revisado" : "En revision")
        }
        return this.lista_fallos.map((dato) => 
            <tr className={checar_estadoo(dato)} key={dato.nombre_establecimiento} onClick={()=>this.on_modal1(dato)}>
                        <td>{dato.nombre_establecimiento}</td>
                        <td>{dato.nombre_area}</td>
                        <td>{dato.nombre_unidad}</td>
                        <td>{dato.limite_inferior}</td>
                        <td>{dato.limite_superior}</td>
                        <td>{verificar_estado(dato.estado)}</td>
                   </tr>
        );
    }
    cabecera()
    {
        console.log(this.state)
        return <div className="panel panel-default" >
        <div className="container">
               <div class="form-inline"  >
                <div class="input-group" style={{'marginLeft':'5px','width':'32.9%'}}>
                    <label class="input-group-addon">Establecimiento</label>
                    <input disabled type="text" size="14" value={this.state.nombre_establecimiento} className="form-control" />
                </div>
                <div class="input-group has-feedback  " style={{'width':'32.9%'}}>
                    <label class="input-group-addon">Area</label>
                    <input disabled type="text" size="13" value={this.state.nombre_area} className="form-control"/>
                </div>
                <div class="input-group has-feedback  " style={{'width':'32.9%'}}>
                    <label class="input-group-addon">Unidad</label>
                    <input disabled type="text" size="14" value={this.state.nombre_unidad} className="form-control"/>
                </div>
                </div>
                        <div class="form-inline" style={{'marginTop':'-3px'}}>
                <div class="input-group  " style={{'marginLeft':'5px','width':'32.9%'}}>
                    <label class="input-group-addon">Limite Superior</label>
                    <input disabled type="text" size="8" value={this.state.limite_superior} className="form-control"/>
                </div>
                <div class="input-group has-feedback" style={{'width':'32.9%'}}>
                    <label class="input-group-addon">Limite Inferior</label>
                    <input disabled type="text" size="8" value={this.state.limite_inferior} className="form-control"/>
                </div>
                <div class="input-group has-feedback" style={{'width':'32.9%'}}>
                    <label class="input-group-addon">Estado</label>
                    <select onChange={this.on_estado} className="form-control">
                        {this.ver_estado(this.state.estado)}
                    </select>
                </div>
                        </div>
               </div>
               </div>
    }
    ver_estado(estado)
    {
        const e = []
        if (estado == 'S') {
            e.push(<option value="S" selected>
                Sin Revisar
            </option>, <option value="E">
        En Revision
    </option>, <option value='R'>
    Revisado
        </option>)
        }
        else if (estado == 'E') 
            e.push(<option value="S" >
                Sin Revisar
            </option>, <option value="E" selected>
            En Revision
        </option>, <option value='R'>
            Revisado
                </option>)
        else
            e.push(<option value="S" >
                Sin Revisar
            </option>, <option value="E" >
        En Revision
    </option>, <option value='R' selected>
        Revisado
            </option>)
        return e
    }
    on_estado(e) {
            this.setState({ estado: e.target.value })
    }
    Recargar_datos(){
        this.lista_fallos = conexion_ajax("servicios/datos_tabla.asmx/cargar_lista");
        this.lista = conexion_ajax("servicios/datos_tabla.asmx/obtener_lista_empleados");
        this.setState({});
    }
}
const Modal = ({ identidad, cavecera, cuerpo, rodilla, pie}) =>{
        return (
            <div className="modal" id={identidad}>
                <div className="hijo_modal panel panel-default" style={{heigth :"600px"}}>
                    <div className=" panel-heading" style={{ "color": "azure", background:"#0077ff"}}>
                    <span className="glyphicon glyphicon-remove close" 
                           onClick={()=>cerrar()} ></span>
                            {cavecera}
                </div>
                <div className=" panel-body">
                    {cuerpo}
                </div>
                <div className="rodilla">
                    {rodilla}
                </div>
                <div className="panel-footer">
                    {pie}
                </div>
            </div>
        </div>);
   function cerrar() {
        document.getElementById(identidad).style.display = 'none';
    }
}
const Tablero = ()=>{
        return(
        <div>
            <h4 style={{color:"black"}}>Promedio De Temperatura. </h4>
            <Tabla />
            <TablaFallos/>
        </div>
        )
}



/* Archivos de Estilos CSS */
const estilo_cabecera_tabla =
    {
        'position': 'sticky'
        , 'min-width': '100%'
        , 'top': '-1px'
        , "background": "rgba(146, 199, 254)"
    }
const estilo_cabecera_tabla_fallos=
    {
        'position': 'sticky'
        , 'min-width': '100%'
        , 'top': '-1px'
        , "background": "#66adff"
    }
const estilo_tabla = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '100%',
    'height': '300px',
    'border': 'solid 1px gray',
    'border-radius': '10px'
}
const estilo_tabla_modal = {
    overflowX: 'auto',
    overflowY: 'auto',
    display:"inline-block",
    width: '372px',
    height: '180px',
    border: 'solid 1px gray',
    borderRadius: '5px',
    marginLeft: '7px',
    marginTop:"10px"
}
const btn_unidades = {
    width: "90px",
    background:"#e6f1ff"
}
ReactDOM.render(<Tablero /> ,document.getElementById("pruebas"));