class Tabla_monitora extends React.Component
{
    constructor(props)
    {
        super(props);
        this.lista_datos =[];
        this.cavecera_tabla = ["folio","Establecimiento","SI","NO","NA","%"];
        this.cuerpo_tabla = [];
        
        this.periodo = {
            anio: "",
            diferencia: -1,
            inicio: "",
            temino:""
        }
        this.activo = { folio: -1, nombre: "", departamento: "", criterio: "", resultado: "", aplicador: "", responsable: "" };
        this.lista_observaciones = [];
        this.state = {
            fecha1 : this.fecha_hoy(),
            fecha2 : this.fecha_hoy(),
            semana1 : -1,
            semana2 : -1,
            id_establecimiento: -1,
            nombre_establecimiento : "",
            id_departamento : -1,
            nombre_departamento: "",
            id_cuestionario:-1,
            cuestionario: "",
            folio_activo:-1
        }
        this.tabla_datos =  <h2>cargando...</h2>;
        this.comando_tabla = this.obtener_establecimientos.bind(this);
        this.obtener_semanas_anio();
    }
    render()
    {
        return (
            <div className="panel panel-default" style={estilos.panel.default}>
                <Cavecera_panel estado={this.state}
                                periodo ={this.periodo} 
                                recargar={this.obtener_fecha_por_semana_anio.bind(this)}
                                on_senama_i={this.on_senama_i.bind(this)}
                                on_senama_f={this.on_senama_f.bind(this)}/>
                <div className="panel panel-body" style={estilos.panel.cuerpo}>
                    <div className="contenedor_tabla">
                        {this.tabla_datos}
                    </div>
                </div>
                <div id="modal_observaciones">
                    <div className="panel panel-primary">
                        <div className="panel panel-heading">
                        <span
                               value="X"
                               className="glyphicon glyphicon-remove-circle close"
                               onClick={ ()=>document.getElementById("modal_observaciones").style.display = "none"} ></span>
                            <h4>Detalle Activo Por Departamento.</h4>
                        </div>
                        <div className="panel panel-body">
                            {this.activo.resultado}
                             <label style={estilos.panel.sub_titulo}>
                                <span style={estilos.panel.texto_sub_titulo}>
                                    Activo:   
                                </span>
                                <span style={estilos.panel.texto_sub_titulo2}> {this.activo.nombre}</span>.
                            </label><br />
                            <label style={estilos.panel.sub_titulo}>
                                <span style={estilos.panel.texto_sub_titulo}>
                                    Pertenece: 
                                </span>
                                <span style={estilos.panel.texto_sub_titulo2}> {this.activo.departamento}</span>.
                            </label><br />
                            <label style={estilos.panel.sub_titulo}>
                                <span style={estilos.panel.texto_sub_titulo}>
                                    Aplicador: 
                                </span>
                                <span style={estilos.panel.texto_sub_titulo2}> {this.activo.aplicador}</span>.
                            </label><br />
                            <label style={estilos.panel.sub_titulo}>
                                <span style={estilos.panel.texto_sub_titulo}>
                                    Responsable Tienda:
                                </span>
                                <span style={estilos.panel.texto_sub_titulo2}> {this.activo.responsable}</span>.
                            </label><br />
                            <label  style={estilos.panel.sub_titulo}>criterio:</label>
                            <textarea className="form-control" style={{"resize":"none","height":"80px","border":"solid 2px #3c8cfb;"}} 
                                      wrap="soft"
                                      value={this.activo.criterio}>
                            </textarea>
                             <label style={estilos.panel.sub_titulo}>Observaciones:</label>
                            <div 
                                      className="form-control" style={{"overflow-x":"auto","overflow-y":"auto","height":"100px","border":"solid 2px #3c8cfb;"}} 
                                      wrap="soft">
                                {this.lista_observaciones}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
    /**metodos**/
    on_activo(elemento) {
    //    console.log(elemento);
        document.getElementById("modal_observaciones").style.display = "block";
        this.activo = {
            folio: elemento.folio_activo,
            nombre: elemento.activo,
            departamento: elemento.activo_por_departamento,
            criterio: elemento.criterio,
            resultado: 0,
            aplicador: elemento.aplicador,
            responsable: elemento.responsable
        }
        this.obtener_observaciones_por_activo(elemento.folio);
        this.activo.resultado = elemento.solucion_si == 1 ? <span style={{"color":"#72d45a"}} className="glyphicon glyphicon-ok-sign close" > BIEN</span> :
                                elemento.solucion_no == 1 ? <span style={{"color":"#f32222"}} className="glyphicon glyphicon-remove-sign close" > MAL</span> :
                                <span style={{"color":"#0094ff"}} className="glyphicon glyphicon-info-sign close" > NA</span>;
        this.setState({ folio_activo: elemento.folio_activo });
    }
    on_senama_i(e) {
    //    console.log("Semana inicio:" + e.target.value);
        const refrescar = document.getElementById("refrescar");
        refrescar.style.color = "green";
        this.setState({
            semana1: e.target.value,
            semana2: e.target.value
        });
    }
    on_senama_f(e) {
    //    console.log("Semana termino:" + e.target.value);
        const inicio = this.state.semana1 > e.target.value ? e.target.value : this.state.semana1;
        const refrescar = document.getElementById("refrescar");
        refrescar.style.color = "green";
        this.setState({
            semana1: inicio,
            semana2: e.target.value
        });
    }
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);

        this.periodo.anio = d.getFullYear() > this.periodo.anio ? d.getFullYear() : this.periodo.anio;
        return dia + '/' + mes + '/' + d.getFullYear();
    }
    /**conexiones**/
    obtener_semanas_anio() {
        this.tabla_datos =  <h2>cargando...</h2>;
        conexion_api_2("https://" + location.host + ":453/api/Manejo_fechas/?f1=" + this.state.fecha1 + "&f2=" + this.state.fecha2,
            (e) => {
                this.periodo = {
                    anio: e.anio_termino,
                    diferencia: e.semanas,
                    inicio: e.lunes,
                    temino: e.domingo
                }
                this.tabla_datos =  <h2>cargando...</h2>;
                this.elemento;
                this.comando_tabla();
                this.setState({
                    fecha1: e.lunes,
                    fecha2: e.domingo,
                    semana1: e.semana_inicio,
                    semana2: e.semana_termino
                });
        });
    }
    obtener_fecha_por_semana_anio() {
        this.tabla_datos =  <h2>cargando...</h2>;
        conexion_api_2("https://" + location.host + ":453/api/Manejo_fechas/?si=" + this.state.semana1 + "&st=" + this.state.semana2,
            (e) => {
                this.periodo = {
                    anio: e.anio_termino,
                    diferencia: e.semanas,
                    inicio: e.lunes,
                    temino: e.domingo
                }
                const refrescar = document.getElementById("refrescar");
                refrescar.style.color = "#0094ff";
                this.comando_tabla();
                this.setState({
                    fecha1: e.lunes,
                    fecha2: e.domingo,
                    semana1: e.semana_inicio,
                    semana2: e.semana_termino
                });
            });
    }
    obtener_observaciones_por_activo(folio) {
        conexion_api_2("https://" + location.host + ":453/api/Monitor_servicios_resultados/?activo=" + folio,
            (resultado) => {
                this.lista_observaciones = resultado.map(
                    (elemento, pos) =><p><span>{pos+1}</span>-<label>{elemento}</label></p>);

                this.setState({
                    fecha1: this.periodo.inicio,
                    fecha2: this.periodo.temino
                });
            });
    }
    obtener_establecimientos() {
        this.tabla_datos = <h2>cargando...</h2>;
        this.setState({
            fecha1: this.periodo.inicio,
            fecha2: this.periodo.temino
        });
        conexion_api_2("https://" + location.host + ":453/api/Monitor_servicios_resultados/?f1=" + this.periodo.inicio + "&f2=" + this.periodo.temino,
            (resultado) =>{
                this.cavecera_tabla = ["FOLIO", "ESTABLECIMIENTOS"];
                this.lista_datos = resultado;
                this.datos_establecimientos();
                this.comando_tabla = this.obtener_establecimientos.bind(this);
            //    console.log(resultado);
                this.setState({
                    fecha1: this.periodo.inicio,
                    fecha2: this.periodo.temino
                });
            });
    }
    obtener_zonas(elemento) {
        this.tabla_datos =  <h2>cargando...</h2>;
        this.elemento = elemento;
        this.setState({
            id_departamento: elemento.folio_departamento,
            id_establecimiento: elemento.folio_establecimiento,
            nombre_establecimiento: elemento.establecimiento,
            nombre_departamento: elemento.departamento
        });
        conexion_api_2("https://" + location.host + ":453/api/Monitor_servicios_resultados/?f1=" + this.periodo.inicio + "&f2=" + this.periodo.temino + "&establecimiento=" + elemento.folio_establecimiento + "&departamento=" + elemento.folio_departamento,
            (resultado) =>{
                const regresar = <span className="glyphicon glyphicon-home"
                                       onClick={this.obtener_establecimientos.bind(this)}></span>
                this.cavecera_tabla = [regresar, elemento.establecimiento + " > " + elemento.departamento, "SI", "NO", "NA", "%"];
                this.lista_datos = resultado;
                this.datos_zonas();
            //    console.log(resultado);
                this.comando_tabla = () =>this.obtener_zonas(elemento);
                this.setState({
                    id_departamento: elemento.folio_departamento,
                    id_establecimiento: elemento.folio_establecimiento,
                    nombre_establecimiento: elemento.establecimiento,
                    nombre_departamento: elemento.departamento
                });
            });
    }
    obtener_activos(elemento) {
        this.tabla_datos = <h2>cargando...</h2>;
        this.setState({
            id_cuestionario: elemento.folio_cuestionario,
            cuestionario: elemento.cuestionario
        });
        conexion_api_2("https://" + location.host + ":453/api/Monitor_servicios_resultados/?f1=" + this.periodo.inicio + "&f2=" + this.periodo.temino + "&establecimiento=" + this.state.id_establecimiento + "&departamento=" + this.state.id_departamento + "&cuestionario=" + elemento.folio_cuestionario,
           (resultado) =>{
           //    console.log(resultado);
               const regresar = <span className="glyphicon glyphicon-circle-arrow-left"
               onClick={()=>this.obtener_zonas(this.elemento)}></span>
               this.cavecera_tabla = [[regresar,"ATRAS"], this.state.nombre_establecimiento + " > " + this.state.nombre_departamento + " : " + elemento.cuestionario, "SI", "NO", "NA", "%"];
               this.lista_datos = resultado;
               this.datos_areas();
               this.comando_tabla = () =>this.obtener_activos(elemento);
               this.setState({
                   id_cuestionario: elemento.folio_cuestionario,
                   cuestionario: elemento.cuestionario
               });

        });
    }
    /**componentes**/
    datos_establecimientos() {
        const estableciniento   = (elemento)=><tr className="est" style={{"color":"white",'background':'#a5c4d9'}}>
                                                <td style={estilos.tabla.celda} colspan="2" > <label>{elemento.folio_establecimiento}</label></td>
                                                <td ><label>{elemento.establecimiento}</label></td>
                                               <td className="green" style={estilos.tabla.celda}>SI</td>
                                                <td className="red" style={estilos.tabla.celda}>NO</td>
                                                <td className="blue" style={estilos.tabla.celda}>NA</td>
                                                <td style={estilos.tabla.celda}>%</td>
                                            </tr>,
              departamento      = (elemento)=><tr onClick={()=>this.obtener_zonas(elemento)}>
                                                <td style={estilos.tabla.celda}><span className="glyphicon glyphicon-chevron-right"></span></td>
                                                <td style={estilos.tabla.celda} >{elemento.folio_departamento}</td>
                                                <td >{elemento.departamento}</td>
                                                <td style={estilos.tabla.celda}>{elemento.solucion_si}</td>
                                                <td style={estilos.tabla.celda}>{elemento.solucion_no}</td>
                                                <td style={estilos.tabla.celda}>{elemento.solucion_na}</td>
                                                <td style={estilos.tabla.celda}>{elemento.promedio/100}</td>
                                            </tr>;
      
        var estab = "";
        this.cuerpo_tabla = this.lista_datos.map(
            (elemento,posicion)=>{
                const contenedor = new Array();
                
               // console.log(elemento);
                elemento.promedio = Math.round((elemento.promedio) * 100);
                if (posicion === 0) {
                    estab = elemento.folio_establecimiento;
                    contenedor.push(estableciniento(elemento));
                }
                if (estab == elemento.folio_establecimiento) {
                    contenedor.push(departamento(elemento));
                } else {
                    estab = elemento.folio_establecimiento;
                    contenedor.push(estableciniento(elemento));
                    contenedor.push(departamento(elemento));
                }
                return contenedor;
            });
        this.tabla_datos =  <Tabla_zona cavecera={["FOLIO","ESTABLECIMIENTO"]}  cuerpo={this.cuerpo_tabla} />;
    }
    datos_zonas() {
        const ZONA = (elemento)=><tr className="est" style={{"color":"white",'background':'#a5c4d9'}}>
                                                <td style={estilos.tabla.celda} colspan="2" > <label>{elemento.folio_zona}</label></td>
                                                <td><label>{elemento.zona}</label></td>
                                                <td className="green" style={estilos.tabla.celda}>SI</td>
                                                <td className="red" style={estilos.tabla.celda}>NO</td>
                                                <td className="blue" style={estilos.tabla.celda}>NA</td>
                                                <td style={estilos.tabla.celda}>%</td>
                                            </tr>,
             CUESTIONARIO = (elemento)=><tr onClick={()=>this.obtener_activos(elemento)}>
                                           <td style={estilos.tabla.celda}><span className="glyphicon glyphicon-chevron-right"></span></td>
                                                <td style={estilos.tabla.celda}>{elemento.folio_cuestionario}</td>
                                                <td>{elemento.cuestionario}</td>
                                                <td style={estilos.tabla.celda}>{elemento.solucion_si}</td>
                                                <td style={estilos.tabla.celda}>{elemento.solucion_no}</td>
                                                <td style={estilos.tabla.celda}>{elemento.solucion_na}</td>
                                                <td style={estilos.tabla.celda}>{elemento.promedio/100}</td> 
                                        </tr>
        //
        var zona = "";
        this.cuerpo_tabla = this.lista_datos.map(
            (elemento, posicion) => {
                const contenedor = new Array();

               // console.log(elemento);
                elemento.promedio = Math.round((elemento.promedio) * 100);
                if (posicion === 0) {
                    zona = elemento.folio_zona;
                    contenedor.push(ZONA(elemento));
                }
                if (zona == elemento.folio_zona) {
                    contenedor.push(CUESTIONARIO(elemento));
                } else {
                    zona = elemento.folio_zona;
                    contenedor.push(ZONA(elemento));
                    contenedor.push(CUESTIONARIO(elemento));
                }
                return contenedor;
            });
        this.tabla_datos =  <Tabla_zona cavecera={this.cavecera_tabla}
                                                    cuerpo={this.cuerpo_tabla} />;
    }
    datos_areas() {
        const revisar = (valor) => {
            if (valor > 0)
                return <span className="glyphicon glyphicon-remove"></span>
            else return "";
        };
        const es_negativo = (v) => v == 1 ? { "color": "red" } : { "": "" };
        const departamento_activo =(elemento)=><tr className="est" style={{"color":"white",'background':'#a5c4d9'}}>
                                                <td colspan="3"><label>{elemento.activo_por_departamento}</label></td>
                                                <td className="green" style={estilos.tabla.celda}>SI</td>
                                                <td className="red" style={estilos.tabla.celda}>NO</td>
                                                <td className="blue" style={estilos.tabla.celda}>NA</td>
                                                <td style={estilos.tabla.celda}>%</td>
                                         </tr>;
        const activo = (elemento) => <tr style={es_negativo(elemento.solucion_no)}
                                         onClick={()=>this.on_activo(elemento)}>
                                                <td style={estilos.tabla.celda}>
                                                    <span className="glyphicon glyphicon-chevron-right"></span>
                                                </td>
                                                <td style={estilos.tabla.celda}>{elemento.folio_activo}</td>
                                                <td>{elemento.activo}</td>
                                                <td style={estilos.tabla.celda}>{revisar(elemento.solucion_si)}</td>
                                                <td style={estilos.tabla.celda}>{revisar(elemento.solucion_no)}</td>
                                                <td style={estilos.tabla.celda}>{revisar(elemento.solucion_na)}</td>
                                                <td style={estilos.tabla.celda}></td> </tr>;
        const pie = (
          elemento) =>{
            var suma=0, total=0;
            const dep = this.lista_datos.filter(
                    (e) =>e.activo_por_departamento === elemento.activo_por_departamento
                );
           // console.log("total", dep);
            dep.forEach((dato, pos) => {
                
                suma += dato.solucion_no ==1 ? (dato.solucion_si / (dato.solucion_si + dato.solucion_no)):1;
            });
            suma = (suma / dep.length) * 10000;
            suma = Math.round(suma);
            return <tr style={{"background":"white"}}>
                       <td colspan="2"></td>
                       <td >
                            <label style={estilos.panel.texto_sub_titulo}>TOTAL</label>
                       </td>
                       <td colspan="4" style={{"text-align":"center"}}>
                            <label style={estilos.panel.texto_sub_titulo}>{suma/100}%</label>
                       </td>
                   </tr>
        };
        
        var departamento = "";
        var total;
        this.cuerpo_tabla = this.lista_datos.map(
            (elemento, posicion) => {
                const contenedor = new Array();

             //   console.log(elemento);
                elemento.promedio = Math.round((elemento.promedio) * 100);
                if (posicion === 0) {
                    departamento = elemento.activo_por_departamento;
                    contenedor.push(departamento_activo(elemento));
                    total = pie(elemento);
                }
                if (departamento == elemento.activo_por_departamento) {
                    contenedor.push(activo(elemento));
                } else {
                    contenedor.push(total)
                    departamento = elemento.activo_por_departamento;
                    contenedor.push(departamento_activo(elemento));
                    contenedor.push(activo(elemento));
                    total = pie(elemento);
                }
                if (this.lista_datos.length == posicion +1)
                    contenedor.push(total)
                return contenedor;
            });
        this.tabla_datos =  <Tabla_zona cavecera={this.cavecera_tabla}
        cuerpo={this.cuerpo_tabla} />;
    }
}
class Tabla_zona extends React.Component {
    render() {
        return(
            <table id="tabla_principal" className="table table-bordered">
                <thead style={estilos.tabla.cavecera} className="cavecera_tabla" >
                    <tr>
                        <th style={estilos.tabla.celda} colspan="2">{this.props.cavecera[0]}</th>
                        <th  colspan="5">{this.props.cavecera[1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cuerpo}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
            );
    }
}
class Cavecera_panel extends React.Component {
    render() {
        return(
            <div className="panel panel-heading">
                    <h2 style={estilos.panel.titulo}>Monitor Revisión De Servicos.</h2>
                    <span className="glyphicon glyphicon-refresh"
                          id="refrescar"
                          style={estilos.panel.btn_refrescar}
                          onClick={() =>{this.props.recargar()}}></span>
                    <span style={estilos.panel.contenedor_fechas}>
                        <Caja_fecha fecha={this.props.estado.fecha1} />
                        <Caja_fecha fecha={this.props.estado.fecha2} />
                    </span>
                    <br />
                    <label style={estilos.panel.sub_titulo}>
                        <span style={estilos.panel.texto_sub_titulo}>
                            INICIO : 
                            <input type="number"
                                   min="1" max="53"
                                   className="form-control"
                                   onChange={this.props.on_senama_i}
                                   style={estilos.panel.selector_semana}
                                   value={this.props.estado.semana1} />
                            TERMINO : 
                            <input type="number"
                                   min="1" max="53"
                                   className="form-control"
                                   onChange={this.props.on_senama_f}
                                   style={estilos.panel.selector_semana}
                                   value={this.props.estado.semana2} />
                        </span>
                    </label>
                    <label style={estilos.panel.sub_titulo}>
                        <span style={estilos.panel.texto_sub_titulo}>  DEL AÑO  </span>
                        <span style={estilos.panel.texto_sub_titulo2}> {this.props.periodo.anio} </span>
                    </label>
                    <label style={estilos.panel.sub_titulo}>
                        
                        <span style={estilos.panel.texto_sub_titulo}>PERIODO  </span>
                        <span style={estilos.panel.texto_sub_titulo2}> {this.props.periodo.diferencia}  </span>
                        SEMANA(S).
                    </label>
                    <span title="Guardar Tabla..." 
                          onClick={this.on_guardar_tabla.bind(this)}
                          className="glyphicon glyphicon-floppy-save"></span>
                </div>
            );
    }
    on_guardar_tabla() {
        tableToExcel("tabla_principal", "monitor de servicios");
    }
}
const estilos = {
    panel: {
        default: {
            "height": "600px"
        },
        titulo: {
            "display": "inline-block"
        },
        sub_titulo: {
            "marginLeft":"20px",
            "fontSize": "15px"
        },
        texto_sub_titulo2: {
            "borderBottom": "solid 1px #808080"
        },
        selector_semana: {
            "width": "65px",
            "display": "inline-block",
            "marginLeft": "10px"
        },
        contenedor_fechas: {
            "width":"460px",
            "position": "absolute",
            "top": "15px",
            "right": "10px"
        },
        btn_refrescar: {
            "marginTop": "-40px",
            "fontSize": "25px",
            "marginLeft": "10px"
        },
        texto_sub_titulo: {
            "color": "black"
        },
        cavecera: {
            "height": "10%"
        },
        cuerpo: { 
            "height": "90%" }
    },
    tabla: {
        cavecera: {
            "height":"20px",
            "fontSize": "18px",
            "background": "#0094ff",
            "color": "white",
            "font-family": '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol'
        },
        cuerpo: {},
        celda: {
            "width": "60px",
            "textAlign": "center"
        },
        lista: {}
    }
}
ReactDOM.render(
    <Tabla_monitora />,
    document.getElementById("contenedor")
);