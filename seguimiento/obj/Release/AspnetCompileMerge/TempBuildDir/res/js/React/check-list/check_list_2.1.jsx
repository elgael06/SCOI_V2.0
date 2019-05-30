
class Botonera extends React.Component {
    render() {
        return(
            <div>
                <input type="button" className="btn btn-primary" value="Actualizar" onClick={ ()=>this.props.actualizar()} />
                <input type="button" className="btn btn-primary" value="Resultados" onClick={ ()=>this.props.resultados()} />
                <input type="button" className="btn btn-primary" value="Observaciones" onClick={ ()=>this.props.observaciones()} />
            </div>
            );
    }
}
class Lists_cuestionas_a_responder extends React.Component {
    render() {
        const checar_responsable = () =>this.props.id_usuario > 0;
        const resuelto = () =>  this.props.resueltos > 0 ? "btn btn-info btn-lg btn-block" : "btn btn-warning btn-lg btn-block";
        return(
            <input type="button" value={this.props.nombre} 
                   key={this.props.identificador}
                   className={resuelto()}
                   disabled={!checar_responsable()}
                   onClick={ ()=>this.props.evento()}/>
            );
    }
}
class Modal_responder extends React.Component{
    render() {
        return(
            <div id="moda_cuestionario">
               <div id="cuerpo_cuestionario" className="panel panel-default">
                   <div id="cavecera_cuestionario" className="panel-heading">
                    <span className="glyphicon glyphicon-remove-circle close red" onClick={this.cerrar_modal.bind(this)} ></span>
                    <span style={{"fontSize":"20px","marginLeft":"10px"}} className="glyphicon glyphicon-edit"> </span>
                    <label style={{"fontSize":"20px","marginLeft":"10px"}}>
                        {this.props.titulo}
                    </label>
                   </div>
                   {this.props.marcador}
                   <div id="contenedor_respuestas" className="panel-body">
                       <table className="table table-striped">
                           <tbody>
                               {this.props.tabla_pregintas}
                           </tbody>
                       </table>
                   </div>
                   <span className="btn btn-info btn-block" onClick={this.props.guardar.bind(this)}>
                        <label style={{"fontSize":"20px"}}>Guardar  </label>
                        <span style={{"marginLeft":"10px","fontSize":"25px"}} className="glyphicon glyphicon-saved"> </span>
                   </span>
               </div>
               <Responder titulo={this.props.titulo_responder}
                          cuerpo={this.props.cuerpo_responder} />
            </div>
        );
    }
    cerrar_modal() {
        document.getElementById("moda_cuestionario").style.display = "none";
    }
}
class Responder extends React.Component {
    render() {
        return(
                <div className="moda_cresponder" id="responder_modal">
                    <div className="panel panel-default cuerpo_responder">
                         <div className="panel-heading cavecera_responder" style={{"background-color":"#58c174","color":"black"}}>
                            <span className="glyphicon glyphicon-remove-circle close red" onClick={this.cerrar_modal.bind(this)} ></span>
                                <h3>{this.props.titulo}</h3>
                        </div>
                        <div className="panel-body">
                            {this.props.cuerpo}
                        </div>
                    </div>
                </div>
            );
    }
    cerrar_modal() {
        document.getElementById("responder_modal").style.display = "none";
    }
}
class Cuerpo_observaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            observacion: ""
        }
    }
    render() {
        return(
            <div>

                <input type="text" className="form-control"
                       style={{"width":"277px","marginRight":"5px","display":"inline-block"}}
                       onChange={this.on_observaciones_pregunta.bind(this)}
                       value={this.state.observacion} />
                <input type="button" value="Agregar" 
                       className="btn btn-info"
                       onClick={this.on_agregar.bind(this)} />
                <div className="form-control" style={{"marginTop":"10px","height":"140px","overflow-x":"auto","overflow-y":"auto"}}>
                    <table className="table table-bordered">
                        {this.props.lista_observaciones}
                    </table>
                </div>
            </div>
        );
    }
    on_observaciones_pregunta(e) {
        console.log(e.target.value);
        this.setState({ observacion: e.target.value });
    }
    on_agregar() {
        const observacion = this.state.observacion;
        if (observacion != "")
            this.props.on_agregar_observacion(observacion);
        else
            alert("Sin Observaciones...");
        this.setState({observacion:""});
    }
}
class Vista_observaciones extends React.Component
{
    render() {
        return(
            <div id={this.props.identificador} className="moda_cresponder">
                <div className="panel panel-default">
                    <div className="panel-heading" >
                        <span className="glyphicon glyphicon-remove-circle close red" onClick={this.cerrar_modal.bind(this)}></span>
                        <h3>{this.props.titulo}</h3>
                    </div>
                    <div className="panel-body" style={{"height":"80%","overflow-x":"auto","overflow-y":"auto"}}>
                        <table className="table table-bordered" id= {this.props.identificador+"reporte_cuestionarios"}>
                            <tbody>
                                   {this.props.observaciones}
                            </tbody>
                        </table>
                    </div>
                    <span className="btn btn-info btn-block" onClick={this.exportar.bind(this)} >
                        <label >Guardar  </label>
                        <span style={{"marginLeft":"10px"}} className="glyphicon glyphicon-download-alt" > </span>
                    </span>
                </div>
            </div>
        );
    }
    cerrar_modal() {
        const id = this.props.identificador;
        document.getElementById(id).style.display = "none";
    }
    exportar() {
        console.log("Exportar...");
        tableToExcel(this.props.identificador + 'reporte_cuestionarios', "Reporte");
    }
}
class Ckl_establecimiento extends React.Component
{
    constructor(props) {
        super(props);
        //listas
        this.lista_establecimientos = [];
        this.lista_cuestionario_por_establecimiento = [];
        this.lista_preguntas_cuestionario = [];
        this.lista_observaciones = [];
        this.resultados = [];
        this.titulo_responder = "";
        this.cuerpo_responder = [];
        this.orden = -1;
        //estados
        this.state = {
            folio_establecimiento: -1,
            fecha: this.fecha_hoy(),
            id_usuario: -1,
            usuario: "",
            id_cuestionario: -1,
            cuestionario: ""
        };
        //conexiones iniciales
        this.obtener_establecimientos();
    }
    render()
    {
        return(
                <div className="panel panel-default">
                    <div className="panel-heading" id="cavecera">
                        <Botonera actualizar={this.on_actualizar_.bind(this)}
                                  resultados={this.on_resultados_.bind(this)}
                                  observaciones={this.on_observaciones_.bind(this)} />
                        <div style={{"width":"60%","display":"inline-block","marginLeft":"5px"}}>
                                 <Caja_datos_select titulo={"Establecimiento"}
                                                    icono={"glyphicon glyphicon-tasks"}
                                                    seleccion={this.on_seleccion_establecimiento.bind(this)}
                                                    opciones={this.opciones_establecimientos()} />
                        </div>
                        <div style={{"width":"25%","display":"inline-block","marginLeft":"5px"}}>
                             <Caja_fecha fecha={this.state.fecha}
                                         evento={this.on_seleccion_fecha.bind(this)} />
                        </div>
                        <div className="" style={{"width":"85%","display":"inline-block","margin-left":"10px"}}>
                                <Caja_datos icono={"glyphicon glyphicon-user"}
                                            titulo={"Responsable"}
                                            datos={this.state.usuario} />
                                <i className="glyphicon glyphicon-search"
                                   title="Buscar Usuario"
                                   data-toggle="modal" data-target="#modal_usuarios"></i>
                        </div>

                        <Modal id="modal_usuarios"
                               cerrar={ ()=>
                            {console.log("cancelar")}}
                            cavecera={<h3>Seleccion Usuario</h3>}
                            cuerpo={<Seleccion_usuario seleccionar={this.on_seleccion_usuario.bind(this)} />}
                            />
                    </div>
                     <div className="panel-body" id="cuerpo">
                         <div id="contenedor_botones_cuestionarios">
                             {this.opciones_cuestionarios_por_establecimiento()}
                         </div>
                     </div>
                    <Modal_responder titulo={this.state.cuestionario}
                                     marcador={this.datos_marcador_preguntas()}
                                     tabla_pregintas={this.datos_preguntas()}
                                     titulo_responder={this.titulo_responder}
                                     guardar={this.guardar_respuestas.bind(this)}
                                     cuerpo_responder={this.cuerpo_responder} />
                    <Vista_observaciones identificador={"total_obsercaciones"}
                                         titulo={"Resultados."}
                                         observaciones={this.datos_tabla_obsercaciones()} />
                    <Vista_observaciones identificador={"total_Resultados"}
                                         titulo={"Resultados."}
                                         observaciones={this.datos_tabla_resultados()} />
                </div>  
            );
    }
    /**eventos**/
    on_actualizar_() {
        console.log("actualizar");
        const folio = this.state.folio_establecimiento;
        if (folio > 0)
            this.obtener_cuestionarios_establecimiento(folio);
        else alert("Seleccione Establecimiento...");
    }
    on_resultados_() {
        console.log("resultados");        
        conexion_api_from_body("servicios/checkListServ.asmx/procedimiento_resultados_cuestionario_por_dia",
           {
               folio_establecimiento: this.state.folio_establecimiento,
               fecha: this.state.fecha
           },
           (respuesta) => {
               this.resultados = respuesta.d;
               this.setState({});
               document.getElementById("total_Resultados").style.display = "flex";
           });
    }
    on_observaciones_() {
        console.log("observaciones");
        conexion_api_from_body("servicios/checkListServ.asmx/obtener_observaciones",
            {
                folio_establecimiento: this.state.folio_establecimiento,
                fecha: this.state.fecha
            },
            (respuesta) => {
                this.lista_observaciones = respuesta.d;
                this.setState({});
                document.getElementById("total_obsercaciones").style.display = "flex";  
        });
    }
    on_seleccion_establecimiento(e) {
        this.obtener_cuestionarios_establecimiento(e.target.value);
        this.setState({
            folio_establecimiento: e.target.value,
            id_usuario: -1,
            usuario: ""
        });
    }
    on_seleccion_fecha(e) {
        const f = e.target.value.split("-");
        if (f[0] > 0) {
            this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0] });
        } else this.setState({ fecha: this.fecha_hoy() });
        this.on_actualizar_();
    }
    on_seleccion_usuario(usuario) {
            this.setState({ id_usuario: usuario.id, usuario: usuario.nombre });
    }
    on_seleccionar_cuestionario(seleccion_cuestionario) {
        console.info(seleccion_cuestionario);

        this.obtener_preguntas(seleccion_cuestionario.id_cuestionario)
        this.obtener_observaciones();

        this.setState({
            cuestionario: seleccion_cuestionario.cuestionario
        });
        document.getElementById("moda_cuestionario").style.display = "block";
    }
    on_responder(elemento) {
       
        this.titulo_responder = elemento.pregunta;
        this.cuerpo_responder = this.cuerpo_responder_ico(elemento);
        document.getElementById("responder_modal").style.display = "flex";

        this.setState({});
    }
    on_observaciones(elemento) {
        this.titulo_responder = "Lista De Observaciones.";
        this.orden = elemento.orden;

        var observaciones = this.lista_observaciones.filter(
           e=> e.posicion == elemento.orden && e.cuestionario == this.state.cuestionario);

        observaciones = <tbody>{observaciones.map((e,p)=> <tr>
                                                            <td>{p+1}</td>
                                                            <td>
                                                                <label>{e.observaciones}</label>
                                                            </td>  
                                                            <td>
                                                                <span className="glyphicon glyphicon-trash red"
                                                                      onClick={ ()=>this.remover_observaciones(e.folio)}></span>
                                                            </td>
                                                           </tr>)}</tbody> ;
        
        this.cuerpo_responder = <Cuerpo_observaciones on_agregar_observacion={this.agregar_observacion.bind(this)}
                                                      lista_observaciones={observaciones}/>;
        this.setState({});
        document.getElementById("responder_modal").style.display = "flex";
    }
    /**metodos**/
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        return dia + '/' + mes + '/' + d.getFullYear();
    }
    /**conexiones**/
    obtener_establecimientos() {
        conexion_api_2("servicios/checkListServ.asmx/buscar_establecimiento",
            (respuesta) => {
                this.lista_establecimientos = respuesta.d
                this.setState({
                    folio_establecimiento: -1
                });
            });
    }
    obtener_cuestionarios_establecimiento(folio) {
        conexion_api_from_body("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_R",
            {
                "id_establecimiento": folio, "fecha": this.state.fecha
            },
            (respuesta) =>{
                console.log(respuesta.d);
                this.lista_cuestionario_por_establecimiento = respuesta.d;
                this.setState({
                    id_cuestionario: -1,
                    cuestionario: ""
                });
        });
    }
    obtener_preguntas(folio_cuestionario) {
        conexion_api_from_body("servicios/checkListServ.asmx/obtener_Preguntas_cuestionario",
           {
               "establecimiento": this.state.folio_establecimiento, 'cuestionario': folio_cuestionario, "fecha": this.state.fecha
           },
           (respuesta) => {
               console.log(respuesta.d);
               this.lista_preguntas_cuestionario = respuesta.d;
               this.setState({
                   id_cuestionario: folio_cuestionario,
               });
           });
    }
    obtener_observaciones() {
        conexion_api_from_body("servicios/checkListServ.asmx/obtener_observaciones",
            {
                folio_establecimiento: this.state.folio_establecimiento,
                fecha:this.state.fecha
            },
            (respuesta) =>{
                this.lista_observaciones = respuesta.d;
                console.log(respuesta.d);
                this.setState({});
            });
    }
    agregar_observacion(observacion) {
        console.log(this.orden,observacion);
        conexion_api_from_body("servicios/checkListServ.asmx/guardar_observaciones",
            {
                fecha: this.state.fecha,
                folio_establecimiento: this.state.folio_establecimiento,
                id_cuestionario: this.state.id_cuestionario,
                observaciones: observacion,
                posicion_pregunta: this.orden,
                usuario:ID_SCOI
            },
           () =>{
               document.getElementById("responder_modal").style.display = "none";
               this.obtener_observaciones();
            });
    }
    remover_observaciones(folio) {
        console.log("remover:", folio);
        if (confirm("Eliminar Observacion?")){
            conexion_api_from_body("servicios/checkListServ.asmx/Eliminar_observaciones",
            {
                "folio":folio
            },
           () => {
               document.getElementById("responder_modal").style.display = "none";
               this.obtener_observaciones();
           });
        }

    }
    guardar_respuestas() {
        console.log(this.lista_preguntas_cuestionario);
        const respuestas = this.lista_preguntas_cuestionario.filter(e=>e.respuesta < 3).length;
        if (respuestas === this.lista_preguntas_cuestionario.length) {
            console.info("SI");
            conexion_api_from_body("servicios/checkListServ.asmx/guardar_datos_3",
          {
              'sucursal':this.state.folio_establecimiento,
              'fecha': this.state.fecha,
              'zona': this.state.id_cuestionario,
              'criterio': this.lista_preguntas_cuestionario.map((p) =>  p.orden ),
              'respuestas': this.lista_preguntas_cuestionario.map((p) => p.respuesta ),
              'datos_pregunta': this.lista_preguntas_cuestionario.map((p) => p.pregunta ),//datos_pregunta
              'observaciones': "00:00:00",//observaciones
              'aplicador': parseInt(ID_SCOI),
              'encargado': this.state.usuario ||"NA"
          },
         () => {
             document.getElementById("moda_cuestionario").style.display = "none";
             this.obtener_cuestionarios_establecimiento(this.state.folio_establecimiento);
             alert("Guardado!!!");
         });
        }
        else alert("Hay Preguntas Por Responder...");
    }
    /**componentes**/
    opciones_establecimientos() {
        return [ <option value="-1">Seleccione Establecimiento</option>,
            this.lista_establecimientos.map(
            elemento=><option key={elemento.id_establecimiento} value={elemento.id_establecimiento}>{elemento.nombre_establecimiento}</option>)];
    }
    opciones_cuestionarios_por_establecimiento() {
        const user = this.state.id_usuario;
        console.info("Cuestionarios");
        return this.lista_cuestionario_por_establecimiento.map(
            elemento=><Lists_cuestionas_a_responder id_usuario={user}
                                                    resueltos={elemento.resueltos}
                                                    evento={ ()=>this.on_seleccionar_cuestionario(elemento)}
                                                    identificador={elemento.id_cuestionario}
                                                    nombre={elemento.cuestionario} />);
    }
    datos_marcador_preguntas() {
        const respuesta_si = this.lista_preguntas_cuestionario.filter(e=>e.respuesta === 1).length;
        const respuesta_no = this.lista_preguntas_cuestionario.filter(e=>e.respuesta === 0).length;
        const respuesta_na = this.lista_preguntas_cuestionario.filter(e=>e.respuesta === 2).length;
        var promedio = Math.round(respuesta_si / (respuesta_si + respuesta_no) * 10000) / 100;
        promedio = promedio > 0 ? promedio : 0;
        promedio = promedio < 100 ? promedio : 100;
        return <div id="contenedor_marcadores">
                    <span> SI : 
                        <input style={{"background-color":"green"}} className="marcadores form-control" value={respuesta_si} />
                    </span>
                    <span> NO 
                         <input style={{"background-color":"red"}} className="marcadores form-control" value={respuesta_no} />
                    </span>
                    <span> NA 
                         <input style={{"background-color":"blue"}} className="marcadores form-control" value={respuesta_na} />
                    </span>
                    <span> TOTAL 
                        <input style={{"background-color":"gray"}} className="marcadores form-control" value={promedio} /> % 
                    </span>
               </div>
    }
    datos_preguntas() {
        const respuesta = r=> r == 1 ? "glyphicon glyphicon-ok-sign" :
                          r == 2 ? "glyphicon glyphicon-info-sign" :
                          r == 0 ? "glyphicon glyphicon-remove-sign" : "glyphicon glyphicon-question-sign";
        const colores = ["red","green","blue","gray"];
        return this.lista_preguntas_cuestionario.map(
            elemento=><tr>
                          <td>
                              <h3>{elemento.orden}</h3>
                          </td>
                          <td style={{"textAlign":"left"}}>
                              <div style={{"fontSize":"15px"}}>
                                <label>CRITERIO : </label> {elemento.pregunta}
                              </div>                             
                              <div>
                                <label>AREA: </label> {elemento.pertenece}
                              </div>
                          </td>
                          <td  onClick={()=>this.on_responder(elemento)}>
                            {this. componente_vista_respuesta(elemento.respuesta)}    
                          </td>
                        <td> <span style={{"color":"#2877a0","fontSize":"35px"}} 
                                   className="fa fa-comments"
                                   onClick={()=>this.on_observaciones(elemento)}
                                   title="Observaciones"></span>
                        </td>
                     </tr>);
    }
    componente_vista_respuesta(valor) {
        const respuesta = r=> r == 1 ? "glyphicon glyphicon-ok-sign" :
                         r == 2 ? "glyphicon glyphicon-info-sign" :
                         r == 0 ? "glyphicon glyphicon-remove-sign" : "glyphicon glyphicon-question-sign";
        const colores = ["red", "green", "blue", "gray"];
      return  <span style={{"color":colores[valor]}} 
                 className={respuesta(valor)}>
              </span>
    }
    datos_tabla_obsercaciones() {
         return this.lista_observaciones.map(
                (e, p) =><tr>
                            <td>{p+1}</td>
                            <td>{e.observaciones}</td>
                            <td>
                                <span className="glyphicon glyphicon-trash red"
                                onClick={ ()=>this.remover_observaciones(e.folio)}></span>
                            </td>
                        </tr>);
    }
    cuerpo_responder_ico(elemento) {
        const cerrar = (valor) => {
            elemento.respuesta = valor
            document.getElementById("responder_modal").style.display = "none";
            this.setState({});
        };
        return  <div>
                    <label onClick={ ()=>cerrar(1)} style={{"fontSize":"50px","marginLeft":"70px"}}> {this. componente_vista_respuesta(1)}</label>
                    <label onClick={ ()=>cerrar(0)} style={{"fontSize":"50px","marginLeft":"30px"}}> {this. componente_vista_respuesta(0)}</label>
                    <label onClick={ ()=>cerrar(2)} style={{"fontSize":"50px","marginLeft":"30px"}}> {this. componente_vista_respuesta(2)}</label>
                </div>;
    }
    datos_tabla_resultados() {
        console.log("Resultado:", this.resultados);
        return <Resultados datos={this.resultados} />;
    }

}
class Resultados extends React.Component {
    render() {
        return(this.tabla_datos());
    }
    tabla_datos() {
        var i = 0;
        var posicion_cuestionario = 1;
        var cuestionario = "";
        var lista = [];
        var resultados = [];
        const r = this.props.datos.map((res) => {
            if (i == 0) {                
                cuestionario = res.zona_inspeccion;
                lista.push(this.cavecera_res(res));
                lista.push(this.puntos_res());
            }
            if (res.zona_inspeccion == cuestionario) {
                
                if (res.posicion == 1) {
                    lista.push(this.cuerpo_resultados(res));
                }
                else {
                    lista.push(this.cuerpo_resultados(res));
                }
            }
            else {
                i = 0;
                cuestionario = res.zona_inspeccion;
                lista.push(this.cavecera_res(res));
                lista.push(this.puntos_res());
                lista.push(this.cuerpo_resultados(res));
            }
            i = 1;
        }
          );
        return lista;
    }
    cavecera_res(res) {
        return (
        <tr className="info" >
            <th rowspan="2"  style={{"width":"50px","text-align":"center"}}>#</th>
            <th rowspan="2" style={{"text-align":"center"}} >{res.zona_inspeccion}</th>
            <th colspan="3"  style={{"width":"150px","text-align":"center"}}>CUMPLE</th>
            <th rowspan="2" style={{"width":"50px","text-align":"center"}}>PERTENECE</th>
        </tr>);
            }
    puntos_res() {
        return (
        <tr>
            <td>SI</td>
            <td>NO</td>
            <td>NA</td>
    
        </tr>);
    }
    cuerpo_resultados(res) {
        const si = (res.rsi == 1 & res.rno == 0) ? "green" : "";
        const no = (res.rsi == 0 & res.rno == 1) ? "red" : "";
        
        var per = res.caducidad == 1 ? "limpieza" : (res.surtido == 1 ? "surtido" : (res.imagen == 1 ? "imagen" : (res.generales == 1 ? "generales" : (res.senializaciores == 1 ? "señalizacion" : res.limpieza==1?"limpieza":"NA"))));

        return (
       <tr className="table">
            <td>{res.posicion}</td>
            <td style={{"text-align":"left"}}>{res.pregunta}</td>
            <td style={{"background":si}}>{res.rsi==1?"X":""}</td>
            <td style={{"background":no}}>{res.rno==1?"X":""}</td>
            <td>{res.rna==1?"X":""}</td>
            <td>{per}</td>
       </tr>);
            }
    resultados() {

        const si = this.props.datos.filter((res) =>res.rsi == 1).length;
        const no = this.props.datos.filter((res) =>res.rno == 1).length;
        const na = this.props.datos.filter((res) =>res.rna == 1).length;

        return (<span className="marcador_r" style={{"top":"35px","right":"30px"}}>
                <span className="success">SI : {si}</span>
                <span className="danger">NO : {no}</span>
                <span className="info">NA : {na}</span>
                <span>TOTAL : { Math.round(si/ (no+si)*1000)/10 >= 0 ? Math.round(si/ (no+si)*1000)/10 : 0} % </span>
               </span>);
    }
}
ReactDOM.render(
    <Ckl_establecimiento />,
    document.getElementById("padre")
);
