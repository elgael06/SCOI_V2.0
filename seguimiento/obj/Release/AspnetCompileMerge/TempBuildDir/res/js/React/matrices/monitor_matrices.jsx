
class Modal_vista_unidad extends React.Component {
    render() {
        return(
            <div id="moda_vista_unidad">
                <div className="panel panel-default">
                    <div class="panel-heading"
                         style={{"fontSize":"18px"}}>
                        <span className="close fa fa-close"
                              onClick={this.cerrar_moda.bind(this)}></span>
                        <span className="fa fa-cube"
                              style={{"marginLeft":"10px"}}></span>
                        <label style={{"marginLeft":"10px"}}>
                            {this.props.titulo}
                        </label>
                    </div>
                    <div class="panel-body">
                        <div style={{"fontSize":"15px","borderBottom":"solid 1px black","heigth":"40px"}}>
                            <label>
                                <span className="fa fa-binoculars"></span>
                                <label style={{"marginLeft":"10px"}}>
                                    RESULTADOS:
                                </label>
                            </label>
                            <span className="fa fa-check-circle-o"
                                  style={{"marginLeft":"20px","color":"green","fontSize":"28px"}}>
                                <label style={{"marginLeft":"10px","fontSize":"18px"}}>
                                    {this.props.resultados.si}
                                </label>
                            </span>
                            <span className="fa fa-times-circle-o"
                                  style={{"marginLeft":"20px","color":"red","fontSize":"28px"}}>
                                <label style={{"marginLeft":"10px","fontSize":"18px"}}>
                                    {this.props.resultados.no}
                                </label>
                            </span>
                            <span className="fa fa-question-circle-o"
                                  style={{"marginLeft":"20px","color":"blue","fontSize":"28px"}}>
                                <label style={{"marginLeft":"10px","fontSize":"18px"}}>
                                    {this.props.resultados.na}
                                </label>
                            </span>
                            <span className="fa fa-edit"
                                  style={{"marginLeft":"20px","fontSize":"28px"}}>
                                <label style={{"marginLeft":"10px","fontSize":"18px"}}>
                                    {this.props.resultados.total}
                                </label>
                            </span>
                        </div>
                        <label style={{"marginTop":"10px"}}>CRITERIO:</label>
                        <div className="form-control"
                                  style={{"height":"50px","overflow-x":"auto","overflow-y":"auto"}}>
                            {this.props.concepto}
                        </div>
                        <label style={{"marginTop":"10px"}}>OBSERVACIONES:</label>
                        <div className="form-control"
                             style={{"height":"130px","overflow-x":"auto","overflow-y":"auto"}}>
                            {this.datos_observaciones()}
                        </div>
                    </div>
                </div>
            </div>
            );
    }
    cerrar_moda() {
        document.getElementById("moda_vista_unidad").style.display = "none";
    }
    datos_observaciones() {
        console.log("lista:",this.props.observacion);
        const r= this.props.observacion.map(
            (e,p)=><tr >
                   <th style={{"textAlign":"center","width":"50px"}}>{p+1}</th>
                   <td> <label style={{"marginLeft":"10px"}}>{e}</label></td>
            </tr>);
        return <table className="table table-bordered">
                <tbody>
                    {r}
                </tbody>
                </table>
    }
}
class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.periodo = {
            anio: "",
            diferencia: -1,
            inicio: "",
            temino: ""
        };
        this.lista_observaciones = [];
        this.state = {
            fecha1: this.fecha_hoy(),
            fecha2: this.fecha_hoy(),
            semana1: -1,
            semana2: -1,
            folio_establecimiento: -1,
            establecimiento: "",
            folio_matriz: -1,
            matriz:"",
            folio_etapa: -1,
            etapa: "",
            folio_u_i: -1,
            u_i: "unidad",
            resultados:{si:0,no:0,na:0,total:0},
            posicion_u_i: -1,
            concepto: "",
            lista_observaciones:[]
        }

        this.comando_conexion = this.obtener_monitor_establecimientos.bind(this);
        this.tabla_datos = <h2>cargando...</h2>;
        this.obtener_semanas_anio();
    }
    render()
    {
        return(<div className="panel panel-default"
                    style={estilos.panel.default}>
                       <Cavecera_panel estado={this.state}
                                       periodo={this.periodo}
                                       recargar={this.obtener_fecha_por_semana_anio.bind(this)}
                                       on_senama_i={this.on_senama_i.bind(this)}
                                       on_senama_f={this.on_senama_f.bind(this)} />
                    <div className="panel panel-body"
                          style={estilos.panel.cuerpo}>
                         <div className="contenedor_tabla">
                             {this.tabla_datos}
                         </div>
                    </div>
                    <Modal_vista_unidad titulo={this.state.u_i}
                                        concepto={this.state.concepto}
                                        resultados={this.state.resultados}
                                        observacion={this.state.lista_observaciones} />
                </div>);
    }
    /**Eventos**/
    on_senama_i(e) {
        console.log("Semana inicio:" + e.target.value);
        const refrescar = document.getElementById("refrescar");
        refrescar.style.color = "green";
        this.setState({
            semana1: e.target.value,
            semana2: e.target.value
        });
    }
    on_tabla_matriz(tabla) {
        console.log(tabla);

        this.obtener_monitor_matrices(tabla.folio_establecimiento, tabla.folio_matriz);
        
        this.setState({
            folio_establecimiento: tabla.folio_establecimiento,
            establecimiento: tabla.establecimiento,
            folio_matriz: tabla.folio_matriz,
            matriz: tabla.matriz
        });
    }
    on_tabla_etapa(tabla) {
        console.log(tabla);
        this.obtener_monitor_etapas(tabla.folio_etapa, tabla.etapa);
       
        this.setState({
            folio_etapa: tabla.folio_etapa,
            etapa: tabla.etapa
        });
    }
    on_tabla_unidad(tabla) {
        console.log(tabla);

        this.obtener_observaciones_por_unidad(tabla.folio_unidad_de_inspeccion);
        document.getElementById("moda_vista_unidad").style.display = "flex";
        this.setState({
            folio_u_i: tabla.folio_unidad_de_inspeccion,
            posicion_u_i: tabla.orden_unidad_de_inspeccion,
            u_i: tabla.unidad_de_inspeccion,
            concepto: tabla.concepto,
            resultados: { si: tabla.r_si, no: tabla.r_no, na: tabla.r_na, total: (tabla.r_si + tabla.r_no + tabla.r_na) }
        });

    }
    on_senama_f(e) {
        console.log("Semana termino:" + e.target.value);
        const inicio = this.state.semana1 > e.target.value ? e.target.value : this.state.semana1;
        document.getElementById("refrescar").style.color = "green";
        this.setState({
            semana1: inicio,
            semana2: e.target.value
        });
    }

    /**Metodos**/
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);

        this.periodo.anio = d.getFullYear() > this.periodo.anio ? d.getFullYear() : this.periodo.anio;
        return dia + '/' + mes + '/' + d.getFullYear();
    }
    /**conexiones**/
    obtener_semanas_anio() {
        console.log("Obtener Semana Del Año");
        this.tabla_datos =  <h2>cargando semana Del año...</h2>;
        conexion_api_2("http://" + location.host + ":453/api/Manejo_fechas/?f1=" + this.state.fecha1 + "&f2=" + this.state.fecha2,
            (e) => {
                this.periodo = {
                    anio: e.anio_termino,
                    diferencia: e.semanas,
                    inicio: e.lunes,
                    temino: e.domingo
                }
                this.comando_conexion();
                this.tabla_datos =  <h2>cargando...</h2>;
                this.setState({
                    fecha1: e.lunes,
                    fecha2: e.domingo,
                    semana1: e.semana_inicio,
                    semana2: e.semana_termino
                });
            });
    }
    obtener_fecha_por_semana_anio() {
        this.tabla_datos =  <h2>cargando fecha por semana Año...</h2>;
        conexion_api_2("http://" + location.host + ":453/api/Manejo_fechas/?si=" + this.state.semana1 + "&st=" + this.state.semana2,
            (e) => {
                this.periodo = {
                    anio: e.anio_termino,
                    diferencia: e.semanas,
                    inicio: e.lunes,
                    temino: e.domingo
                }
                console.log("Periodo",e);
                const refrescar = document.getElementById("refrescar");
                this.comando_conexion();
                refrescar.style.color = "#0094ff";
                this.setState({
                    fecha1: e.lunes,
                    fecha2: e.domingo,
                    semana1: e.semana_inicio,
                    semana2: e.semana_termino
                });
            });
    }
    obtener_monitor_establecimientos() {
        this.tabla_datos = <h2>cargando datos Establecimientos...</h2>;
        conexion_api_from_body("../servicios/matriz/conexiones.asmx/obtener_monitoreo_matriz_por_establecimiento",
            {
                consulta: "'" + this.periodo.inicio + "','" + this.periodo.temino + "'" + " ,'todo'"
            },
            (respuesta) => {
                console.log("Establecimientos:", respuesta.d);
                this.comando_conexion = this.obtener_monitor_establecimientos.bind(this);
                this.tabla_datos =<Tabla_establecimiento lista={respuesta.d}
                                                         evento={this.on_tabla_matriz.bind(this)} />;
                console.log("ok");
                this.setState({
                    fecha1: this.periodo.inicio,
                    fecha2:this.periodo.temino
                });
            });
    }
    obtener_monitor_matrices(folio_establecimiento, folio_matriz) {
        this.tabla_datos = <h2>cargando datos Matriz...</h2>;
        conexion_api_from_body("../servicios/matriz/conexiones.asmx/obtener_monitoreo_matriz_por_matriz",
            {
                consulta: "'" + this.periodo.inicio + "','" + this.periodo.temino + "'" + " ,'matriz'," + folio_establecimiento+","+ folio_matriz
            },
            (respuesta) => {
                console.log(respuesta.d);
                this.comando_conexion = () =>this.obtener_monitor_matrices(this.state.folio_establecimiento, this.state.folio_matriz);
                this.tabla_datos =<Tabla_matriz lista={respuesta.d}
                                                regresar={this.obtener_monitor_establecimientos.bind(this)}
                                                matriz={this.state.matriz}
                                                establecimiento={this.state.establecimiento}
                                                evento={this.on_tabla_etapa.bind(this)} />;
                this.setState({
                    folio_establecimiento: folio_establecimiento,
                    folio_matriz: folio_matriz
                });
            });
    }
    obtener_monitor_etapas(folio_etapa, etapa) {
        this.tabla_datos = <h2>cargando datos Etapa...</h2>;
        conexion_api_from_body("../servicios/matriz/conexiones.asmx/obtener_monitoreo_matriz_por_etapa",
            {
                consulta: "'" + this.periodo.inicio + "','" + this.periodo.temino + "'" + " ,'etapa'," + this.state.folio_establecimiento + "," + this.state.folio_matriz + "," + folio_etapa
            },
            (respuesta) => {
                console.log(respuesta.d);
                this.comando_conexion = () =>this.obtener_monitor_etapas(this.state.folio_etapa, this.state.etapa);
                this.tabla_datos =<Tabla_etapa lista={respuesta.d}
                                               subir={ ()=>this.obtener_monitor_matrices(this.state.folio_establecimiento, this.state.folio_matriz)}
                                                regresar={this.obtener_monitor_establecimientos.bind(this)}
                                                matriz={this.state.matriz}
                                                etapa={this.state.etapa}
                                                establecimiento={this.state.establecimiento}
                                                evento={this.on_tabla_unidad.bind(this)} />;
                // Tabla_etapa
                this.setState({
                    id_etapa: folio_etapa,
                    etapa: etapa
                });
            });
    }
    obtener_observaciones_por_unidad(unidad_) {
        conexion_api_from_body("../servicios/matriz/conexiones.asmx/obtener_observaciones_por_unidad",
            { folio: this.state.folio_matriz, etapa: this.state.folio_etapa, unidad:unidad_},
            (res) => {
                console.log(res);
                this.lista_observaciones = res.d.map(e=>e.observacion);
                console.log("R:", this.lista_observaciones);
                this.setState({ lista_observaciones: this.lista_observaciones });
            });
    }
}

class Tabla_establecimiento extends React.Component {

    render() {
        return(
            <table className="table table-bordered">
                <thead>
                    <tr style={{"background":"#1d8af2","color":"azure"}}>
                        <td colspan="8" style={{"fontSize":"20px"}}>
                            <span className="glyphicon glyphicon-tasks"
                                  style={{"marginLeft":"15px"}}>
                                <label style={{"marginLeft":"15px"}}> Establecimientos </label>
                            </span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.cuerpo()}
                </tbody>
            </table>
        );
    }
    cuerpo() {
        console.debug("Crear Lista");
        const cavecera = (elemento) => {
            console.debug("cavecera");
            return [<tr  className="info" >
                    <th style={{"textAlign":"center","fontSize":"15px"}} >{elemento.folio_establecimiento}</th>
                    <th >{elemento.establecimiento}</th>
                    <th colspan="5" style={{"textAlign":"center","fontSize":"15px"}}>Resultados</th>
                  </tr>,
                  <tr className="success">
                    <th style={{"textAlign":"center","fontSize":"20px","color":"blue","width":"50px"}}>
                      <span className="fa fa-bar-chart"></span>
                    </th>
                    <th >Matrices</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>SI</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>NO</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>NA</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>TOTAL</th>
                    <th>INFO</th>
                  </tr>]
                };

        const fila = (elemento) =><tr>                    
                    <td style={{"textAlign":"center","fontSize":"16px","width":"50px"}}>{elemento.folio_matriz}</td>
                    <td>{elemento.matriz}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"green","width":"50px"}}>{elemento.r_si}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"red","width":"50px"}}>{elemento.r_no}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"blue","width":"50px"}}>{elemento.r_na}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"black","width":"70px"}}>{elemento.r_si+elemento.r_no+elemento.r_na}</td>
                    <td  style={{"textAlign":"center","fontSize":"16px","width":"50px"}}>
                        <span className="btn btn-info glyphicon glyphicon-info-sign" 
                              onClick={ ()=>this.props.evento(elemento)}></span>
                    </td>
                </tr>
        const pie = (filtro) =>{
            var si = 0, no = 0, na = 0, total = 0;
            const lista = this.props.lista.filter(e=>e.folio_establecimiento==filtro);
            lista.forEach((elemento) => {
                si += elemento.r_si;
                no += elemento.r_no;
                na += elemento.r_na;
                total += elemento.total;
            });
            return <tr>
                    <th style={{"textAlign":"center","fontSize":"18px"}} colspan="2">TOTAL </th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"green","width":"50px"}}>{si}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"red","width":"50px"}}>{no}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"blue","width":"50px"}}>{na}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"black","width":"50px"}}>{si+no+na}</th>
                </tr>};
        var filtro = 0;
        return this.props.lista.map(
            (elemento,pos)=> {
                const resultados = [];
                if (pos == 0) {
                    filtro = elemento.folio_establecimiento;
                    resultados.push(cavecera(elemento));
                }
                if (filtro == elemento.folio_establecimiento) {
                    resultados.push(fila(elemento));
                } else {
                    resultados.push(pie(filtro));
                    filtro = elemento.folio_establecimiento;
                    resultados.push(cavecera(elemento));
                    resultados.push(fila(elemento));
                }
                if (pos == this.props.lista.length -1) {
                    resultados.push(pie(filtro));
                }
                
                return resultados;
            });
    }
}
class Tabla_matriz extends React.Component {

    render() {
        return(
            <table className="table table-bordered">
                <thead>
                    <tr style={{"background":"#1d8af2","color":"azure"}}
                        onClick={this.props.regresar.bind(this)}>
                        <th  style={{"fontSize":"25px","textAlign":"center","width":"50px"}}>
                            <span className="btn btn-primary fa fa-home">                                
                            </span>
                        </th>
                         <th colspan="7" style={{"fontSize":"20px"}}>
                            <label style={{"marginLeft":"15px"}}> {this.props.establecimiento}. </label>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                        {this.cuerpo()}
                </tbody>
         </table>
        );
    }
    cuerpo() {
        console.debug("Crear Lista");
        const cavecera = (elemento) => {
            console.debug("cavecera");
            return [<tr  className="info" >
                    <th style={{"textAlign":"center","fontSize":"15px"}} >{elemento.folio_matriz}</th>
                    <th >Matriz : {this.props.matriz}</th>
                    <th colspan="5" style={{"textAlign":"center","fontSize":"15px"}}>Resultados</th>
                  </tr>,
                  <tr className="success">
                    <th style={{"textAlign":"center","fontSize":"20px","color":"blue","width":"50px"}}>
                      <span className="glyphicon glyphicon-list-alt"></span>
                    </th>
                    <th >Etapas</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>SI</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>NO</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>NA</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>TOTAL</th>
                    <th>INFO</th>
                  </tr>]
                    };

            const fila = (elemento) =><tr>                    
                    <td style={{"textAlign":"center","fontSize":"16px","width":"50px"}}>{elemento.orden_etapa}</td>
                    <td>{elemento.etapa}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"green","width":"50px"}}>{elemento.r_si}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"red","width":"50px"}}>{elemento.r_no}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"blue","width":"50px"}}>{elemento.r_na}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"black","width":"70px"}}>{elemento.r_si+elemento.r_no+elemento.r_na}</td>
                    <td  style={{"textAlign":"center","fontSize":"16px","width":"50px"}}>
                        <span className="btn btn-info glyphicon glyphicon-info-sign" 
                              onClick={ ()=>this.props.evento(elemento)}></span>
                    </td>
                </tr>;
        const pie = () =>{
            var si = 0, no = 0, na = 0, total = 0;
            const lista = this.props.lista.map(e=>e);
            lista.forEach((elemento) => {
                si += elemento.r_si;
                no += elemento.r_no;
                na += elemento.r_na;
                total += elemento.total;
            });
            return <tr>
                    <th style={{"textAlign":"center","fontSize":"18px"}} colspan="2">TOTAL </th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"green","width":"50px"}}>{si}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"red","width":"50px"}}>{no}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"blue","width":"50px"}}>{na}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"black","width":"50px"}}>{si+no+na}</th>
                </tr>};
        var filtro = 0;
        return this.props.lista.map(
            (elemento,pos)=> {
                const resultados = [];
                if (pos == 0) {
                    filtro = elemento.orden_etapa;
                    resultados.push(cavecera(elemento));
                }
                resultados.push(fila(elemento));
                if (pos == this.props.lista.length - 1) {
                    resultados.push(pie());
                }
                return resultados;
            });
         }
}
class Tabla_etapa extends React.Component {

    render() {
        return(
            <table className="table table-bordered">
                <thead>
                    <tr style={{"background":"#1d8af2","color":"azure"}}>
                        <th  style={{"fontSize":"25px","textAlign":"center","width":"50px"}}>
                            <span className="btn btn-primary fa fa-home"
                                  onClick={this.props.regresar.bind(this)}>                                
                            </span>
                        </th>
                         <th colspan="7" style={{"fontSize":"20px"}}>
                            <label style={{"marginLeft":"15px"}}> {this.props.establecimiento}.</label>
                        </th>
                    </tr>
                    <tr className="info" >
                        <th>
                            <span className="btn btn-link fa fa-mail-reply"
                                  onClick={this.props.subir.bind(this)}>
                            </span>
                        </th>
                        <th colspan="7">
                            MATRIZ : {this.props.matriz}. 
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {this.cuerpo()}
                </tbody>
         </table>
        );
    }
    cuerpo() {
        console.debug("Crear Lista");
        const cavecera = (elemento) => {
            console.debug("cavecera");
            return [<tr className="success" >
                    <th style={{"textAlign":"center","fontSize":"15px"}} >{elemento.folio_etapa}</th>
                    <th >Etapa : {this.props.etapa}</th>
                    <th colspan="5" style={{"textAlign":"center","fontSize":"15px"}}>Resultados</th>
                  </tr>,
                  <tr className="warning">
                    <th style={{"textAlign":"center","fontSize":"20px","color":"blue","width":"50px"}}>
                      <span className="glyphicon glyphicon-list-alt"></span>
                    </th>
                    <th >Unidades De Inspeccion</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>SI</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>NO</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>NA</th>
                    <th style={{"textAlign":"center","fontSize":"15px"}}>TOTAL</th>
                    <th>INFO</th>
                  </tr>]
                    };

            const fila = (elemento) =><tr>                    
                    <td style={{"textAlign":"center","fontSize":"16px","width":"50px"}}>{elemento.orden_unidad_de_inspeccion}</td>
                    <td>{elemento.unidad_de_inspeccion}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"green","width":"50px"}}>{elemento.r_si}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"red","width":"50px"}}>{elemento.r_no}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"blue","width":"50px"}}>{elemento.r_na}</td>
                    <td style={{"textAlign":"center","fontSize":"16px","color":"black","width":"70px"}}>{elemento.r_si+elemento.r_no+elemento.r_na}</td>
                    <td  style={{"textAlign":"center","fontSize":"16px","width":"50px"}}>
                        <span className="btn btn-info glyphicon glyphicon-info-sign" 
                              onClick={ ()=>this.props.evento(elemento)}></span>
                    </td>
                </tr>;
        const pie = () =>{
            var si = 0, no = 0, na = 0, total = 0;
            const lista = this.props.lista.map(e=>e);
            lista.forEach((elemento) => {
                si += elemento.r_si;
                no += elemento.r_no;
                na += elemento.r_na;
                total += elemento.total;
            });
            return <tr>
                    <th style={{"textAlign":"center","fontSize":"18px"}} colspan="2">TOTAL </th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"green","width":"50px"}}>{si}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"red","width":"50px"}}>{no}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"blue","width":"50px"}}>{na}</th>
                    <th style={{"textAlign":"center","fontSize":"16px","color":"black","width":"50px"}}>{si+no+na}</th>
                </tr>};
        var filtro = 0;
        return this.props.lista.map(
            (elemento,pos)=> {
                const resultados = [];
                if (pos == 0) {
                    filtro = elemento.orden_unidad_de_inspeccion;
                    resultados.push(cavecera(elemento));
                }
                resultados.push(fila(elemento));
                if (pos == this.props.lista.length - 1) {
                    resultados.push(pie());
                }
                return resultados;
            });
         }
}
class Cavecera_panel extends React.Component {
    render() {
        return(
            <div className="panel panel-heading">
                    <h2 style={estilos.panel.titulo}>Monitor Revisión De Matrices.</h2>
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
                    
                </div>
            );
    }
    on_guardar_tabla() {
        tableToExcel("tabla_principal", "monitor de Mtrices");
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
            "marginLeft": "20px",
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
            "width": "460px",
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
            "height": "90%"
        }
    },
    tabla: {
        cavecera: {
            "height": "20px",
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
        <App />,
        document.getElementById("contenedor")
    );
