class Tabla_matriz extends React.Component
{
    constructor(props)
    {
        super(props);

        this.lista_matrices = [];
        this.lista_etapas = [];
        this.filtro = "";
        this.state = {
            id_establecimiento: -1,
            establecimiento: "",
            estatus: '',
            folio:-1,
            folio_matriz: -1,
            matriz: "",
            id_usuario: -1,
            usuario: "",
            folio_etapa: -1,
            etapa: "",
            filtro_estatus: ""
        }
        this.lista_observaciones = [];
        this.lista_punto_revicion = [];
        this.lista_cantidad_muestra = [];
        this.obtener_matrices("Aplicable");
        this.cavecera_tabla_matrices_asignadas = [<span style={{"fontSize":"20px"}} className="glyphicon glyphicon-edit "></span>, "folio", "Matriz", "Establecimiento", "Usuario", "Fecha Asignacion",
        <select className="form-control" style={{"with":"235px"}} onChange={this.on_cambio_estatus.bind(this)}>
            {this.datos_estatus()}
        </select>];
    }
    render()
    {
        return(
            <div>
                <div id="seleccion_matrices">
                <h3>MATRICES A EVALUAR</h3>
                <div className="" style={{"width":"90%","display":"inline-block","margin-left":"10px","height":"40px"}}>
                    <Caja_datos icono={"glyphicon glyphicon-user"}
                                titulo={"Responsable Establecimiento"}
                                datos={this.state.usuario} />
                            <i className="glyphicon glyphicon-search  btn btn-default"
                               title="Buscar Usuario"
                               data-toggle="modal" data-target="#modal_usuarios"></i>
                </div>
                    <div style={{"margin-top":"-20px"}}>
                        <input style={{"width":"15%","margin-top":"-50px"}} 
                               type="button" 
                               value="Iniciar Evaluacion" 
                               onClick={this.on_evaluar.bind(this)}
                               className="btn btn-success" />
                        <label style={{"width":"70%"}}>
                            <Caja_datos icono={"glyphicon glyphicon-filter"}
                                        titulo={""}
                                        datos={this.filtro}
                                        evento={this.on_filtrar_matriz.bind(this)} />
                        </label>
                    </div>
                    <div className="tabla_matriz">
                        <Tabla cavecera={this.cavecera_tabla_matrices_asignadas}
                               datos={this.datos_tabla_matrices()} />
                    </div>
                </div>
                <div id="seleccion_etapa" style={{"display":"none"}}>
                    <label style={{"font-size":"20px","margin-left":"10px"}}>
                        <span style={{"color":"black"}}>MATRIZ : </span>
                        <span style={{"border-bottom":"solid 1px #808080"}}>{this.state.matriz}.</span>
                     </label> 
                    <br />
                    <span style={{"font-size":"25px","margin-left":"10px"}} className="glyphicon glyphicon-circle-arrow-left btn btn-link"
                          onClick={this.regresar_matrices.bind(this)}> </span>
                    <h4 style={{"display":"inline-block","margin-left":"10px"}}>ETAPAS #{this.lista_etapas.length}</h4>
                    <br />
                     <label style={{"font-size":"15px","margin-left":"10px"}}>
                        <span style={{"color":"black"}}>ESTABLECIMIENTO : </span>
                        <span style={{"border-bottom":"solid 1px #808080"}}>{this.state.establecimiento}.</span>
                     </label>
                    <label style={{"font-size":"15px","margin-left":"10px"}}>
                        <span style={{"color":"black"}}>RESPONSABLE : </span>
                        <span style={{"border-bottom":"solid 1px #808080"}}>{this.state.usuario}.</span>
                    </label> 
                    <span className="btn btn-warning glyphicon glyphicon-save"
                          onClick={this.on_finalizar_matriz.bind(this)}>
                        <label style={{"marginLeft":"20px"}}>Finalizar Matriz</label>
                    </span> 
                    <div className="tabla_matriz">
                    <Tabla cavecera={["#","Etapas","Evaluar"]}
                           datos={this.datos_etapas()} />
                    </div>
                </div>
                 <Modal id="modal_usuarios"
                        cerrar={ ()=>
                     {console.log("cancelar")}}
                     cavecera={<h3>Seleccion Usuario</h3>}
                     cuerpo={<Seleccion_usuario seleccionar={this.on_seleccion_usuario.bind(this)} />}
                     />
                <Vista_muestras_por_etapa estado_padre={this.state}
                                          lista_punto_revicion={this.lista_punto_revicion}
                                          muestra={this.lista_punto_revicion_muestra}
                                          cambiar_muestra={this.cambiar_muestra.bind(this)} />
                <Tablero_evaluacion estado_padre={this.state}
                                    obtener_etapas={this.obtener_etapas.bind(this)}
                                    lista_punto_revicion={this.lista_punto_revicion}
                                    lista_observaciones={this.lista_observaciones} />
            </div>
            );
    }
    /**eventos objetos**/
    on_seleccion_usuario(usuario) {
        this.setState({ id_usuario: usuario.id, usuario: usuario.nombre });
    }
    on_marcar_matriz(mat) {
        console.log(mat)
        if (ID_SCOI == mat.id_usuario) {
            if (mat.estatus == "Aplicable" || mat.estatus == "Evaluacion") {
                this.setState({
                    folio: mat.folio,
                    folio_matriz: mat.folio_matriz,
                    matriz: mat.matriz,
                    id_establecimiento: mat.folio_establecimiento,
                    establecimiento: mat.establecimiento
                });
            } else alert(mat.estatus);
            if (mat.folio == this.state.folio) {
                this.on_deshacer();
            }
        } else alert("Su Usuario No Corresponde A La Matriz Asignada.");
    }
    on_cambio_estatus(e)
    {
        this.obtener_matrices(e.target.value);
        this.filtro = "";
        this.setState({
            estatus: e.target.value
        });
    }
    on_filtrar_matriz(e) {
        this.filtro = e.target.value;
        this.on_deshacer();
    }
    on_deshacer()
    {
        this.setState({
            id_establecimiento: -1,
            establecimiento: "",
            folio: -1,
            folio_matriz: -1,
            matriz: "",
            id_usuario: -1,
            usuario: "",
            folio_etapa: -1,
            etapa: ""
        });
    }
    on_finalizar_matriz() {
        console.log("Estado : ",this.state);
        console.log("Etapas : ", this.lista_etapas);
        const por_evaluar = this.lista_etapas.filter(e=>e.aplicado == 'NO');
        if (por_evaluar.length > 0) {
            console.log("Etapas por Evaluar: ", por_evaluar);
            por_evaluar.forEach((etapa) => { 
                this.obtener_y_guardar_etapafiltrada(etapa);
            });
        }
        this.finalizar_matriz();
    }
    on_evaluar()
    {
        if (this.state.id_usuario > 0 && this.state.folio_matriz > 0) {
            document.getElementById("seleccion_etapa").style.display = "block";
            document.getElementById("seleccion_matrices").style.display = "none";
            console.log(this.state.folio_matriz);
            this.obtener_etapas();
        } else alert("Falta Seleccionar Campos");
    }
    /**metodos**/
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        return dia + '/' + mes + '/' + d.getFullYear();
    }
    regresar_matrices()
    {
        const div_etapa = document.getElementById("seleccion_etapa");
        const div_matrices = document.getElementById("seleccion_matrices");
        div_etapa.style.display = "none";
        div_matrices.style.display = "block";
    }
    cambiar_muestra(event, posicion) {
        this.lista_punto_revicion[posicion].muestra_sugerida = event.target.value;
        this.lista_punto_revicion[posicion].respuestas.length = event.target.value;
        for (var i = 0; i < event.target.value; i++) {
            this.lista_punto_revicion[posicion].respuestas[i] = "NO"
        }
    }
    cambiar_muestra(event, posicion) {
        this.lista_punto_revicion[posicion].muestra_sugerida = event.target.value;
        this.lista_punto_revicion[posicion].respuestas.length = event.target.value;
        for (var i = 0; i < event.target.value; i++) {
            this.lista_punto_revicion[posicion].respuestas[i] = "NO"
        }
        console.log(this.lista_punto_revicion);
        this.setState({});
    }
    obtener_y_guardar_etapafiltrada(etapa) {
        //obtener los puntos de revicion
        this.obtener_puntos_revicion_2(etapa);
        this.lista_punto_revicion_muestra 
        this.lista_punto_revicion
        
    }
    on_guardar(etapa) {
        const revisar_respuesta = (r) => r == "SI" ? 1 : r == "NO" ? 0 : r == "NA" ? 2 : 3;
        console.log("Armado Lista");
        var lista_evaluaciones = [],
            lista_guardado = [];
        for (var i = 0; i < 80; i++) {
            lista_evaluaciones.push(i + 1);
        };
        console.log("TOTAL POSICIONES:", lista_evaluaciones);
        console.log("Puntos Revicion:", this.lista_punto_revicion);
        this.lista_punto_revicion.forEach(elemento =>
            lista_evaluaciones.forEach(
                  (e, p) => {
                      const resp = revisar_respuesta(elemento.respuestas[e - 1] || "");
                      lista_guardado.push(this.state.folio + "," + etapa.folio_etapa + "," + this.state.id_usuario + ","
                        + elemento.folio + "," + e + "," + resp);
                  })
            );
        console.log("Lista Guardar", lista_guardado)
    this.guardado_automatico_etapa(lista_guardado);
    }
    /**conexiones**/
    guardado_automatico_etapa(lista_guardado) {
        conexion_api_from_body("servicios/matriz/conexiones.asmx/matrices_guardar_resultados",
       {
           datos: lista_guardado,
           observaciones: []
       },
       (respuesta) => {
           if (respuesta.d = 1) {
               this.setState({});
               this.obtener_etapas();
               alert("Guardado... ");
           } else alert("Error!!!");
       });
    }
    obtener_matrices(estatus) {
        conexion_api_2(`http://192.168.4.200:453/api/Lista_asignaciones/?estatus=${estatus}`,
            (respuesta) => {
                console.log(respuesta);
                this.lista_matrices = respuesta;
                this.on_deshacer();
            });
    }
    obtener_etapas() {
        conexion_api_2(`http://192.168.4.200:453/api/Evaluacion_matriz/?folio_matriz=${this.state.folio}`,
            (respuesta) => {
                this.lista_etapas = respuesta;
                console.log("Etapas:",respuesta);
                this.setState({
                    folio_etapa: -1,
                    etapa: ""
                });
            });
    }
    obtener_puntos_revicion(etapa) {
        conexion_api_2(`http://192.168.4.200:453/api/Evaluacion_matriz/?etapa=${etapa.folio_etapa}&matriz=${this.state.folio_matriz}`,
            (respuesta) => {
                this.lista_punto_revicion = Array.from(respuesta);
                console.log(respuesta);
                conexion_api_2(`http://192.168.4.200:453/api/Evaluacion_matriz/?etapa=${etapa.folio_etapa}&matriz=${this.state.folio_matriz}`,
                    (respues) => {
                        this.lista_punto_revicion_muestra = Array.from(respues);
                        this.lista_observaciones = [];
                        console.log(respues);
                        document.getElementById("modal_sugerido_muestra").style.display = "flex";
                        this.setState({
                            folio_etapa: etapa.folio_etapa,
                            etapa: etapa.etapa
                        });
                    });
            });
    }
    obtener_puntos_revicion_2(etapa) {
        conexion_api_2(`http://192.168.4.200:453/api/Evaluacion_matriz/?etapa=${etapa.folio_etapa}&matriz=${this.state.folio_matriz}`,
            (respuesta) => {
                this.lista_punto_revicion = Array.from(respuesta);
                console.log(respuesta);
                conexion_api_2(`http://192.168.4.200:453/api/Evaluacion_matriz/?etapa=${etapa.folio_etapa}&matriz=${this.state.folio_matriz}`,
                    (respues) => {
                        this.lista_punto_revicion_muestra = Array.from(respues);
                        this.lista_observaciones = [];
                        this.on_guardar(etapa);
                        console.log(respues);
                        this.setState({
                            folio_etapa: etapa.folio_etapa,
                            etapa: etapa.etapa
                        });
                    });
            });
    }
    obtener_observaciones_por_etapa(etapa_) {
        conexion_api_from_body("servicios/matriz/conexiones.asmx/obtener_observaciones_por_etapa",
       {
           folio: this.state.folio,
           etapa: etapa_.folio_etapa
       },
       (respuesta) => {
           this.lista_observaciones = respuesta.d;
           console.log("observaciones obtenidas:", this.lista_observaciones)
           this.setState({
               folio_etapa: etapa_.folio_etapa,
               etapa: etapa_.etapa
           });
       });
    }
    obtener_puntos_evicion_guardados(etapa) {
        conexion_api_2("http://192.168.4.200:453/api/Evaluacion_matriz/?fecha=" + this.fecha_hoy() + "&etapa=" + etapa.folio_etapa + "&matriz=" + this.state.folio_matriz,
           (respuesta) => {
               this.lista_punto_revicion_muestra = respuesta;
               this.lista_punto_revicion = respuesta;
               console.log(respuesta);
               document.getElementById("modal_tablero_evaluacion").style.display = "flex";
               this.obtener_observaciones_por_etapa(etapa);
              this.setState({
                    folio_etapa: etapa.folio_etapa,
                    etapa: etapa.etapa
              });
          });
    }
    finalizar_matriz() {
        conexion_api_from_body("servicios/matriz/conexiones.asmx/finalizar_asignacion_matriz",
            {
                folio_matriz:this.state.folio
            },
            (respuesta) => {
                if (respuesta.d == 1) {
                    document.getElementById("seleccion_etapa").style.display = "none";
                    document.getElementById("seleccion_matrices").style.display = "block";
                    this.obtener_matrices("Aplicable");
                }
                else alert("Error");

               this.setState({
                   folio_etapa: -1,
                   etapa: ""
               });
           });
    }
    /**componentes**/
    datos_iconos_estatus(e){
        var a = 'fa fa-calendar-times-o btn btn-warning';
        switch (e) {
            case 'Evaluacion': a = 'fa fa-cogs btn btn-info'
                break;
            case 'Pendiente': a = 'fa fa-calendar btn btn-primary'
                break;
            case 'Vencida': a = 'fa fa-clock-o btn btn-danger'
                break;
            case 'Aplicable': a = 'fa fa-calendar-check-o btn btn-success'
                break;
        }
        return <span style={{"fontSize":"25px" ,"marginRight":"5px"}} className={a}></span>;
    }
    datos_estatus()
    {
        const checar=(e)=>  e==this.state.estatus ;
        return <optgroup label="Estatus">
                   <option selected={checar("Aplicable")} value="Aplicable">Aplicables</option>
                   <option selected={checar("todos")} value="todos">Todos</option>
                   <option selected={checar("Vigente")} value="Vigente">Vigentes</option>
                   <option selected={checar("Finalizado")} value="Finalizado">Finalizadas</option>
                   <option selected={checar("Vencida")} value="Vencida">Vencido</option>
                </optgroup>
    }
    datos_tabla_matrices() {
        var checar = (f) => f == this.state.folio;
        const filtro = this.lista_matrices.filter(
            e=>e.folio.toString().search(this.filtro.toUpperCase()) > -1 ||
                e.matriz.toUpperCase().search(this.filtro.toUpperCase()) > -1 ||
                e.establecimiento.toUpperCase().search(this.filtro.toUpperCase()) > -1 ||
                e.usuario.toUpperCase().search(this.filtro.toUpperCase()) > -1 ||
                e.fecha_asignacion.toUpperCase().search(this.filtro.toUpperCase()) > -1);

        
        return filtro.map(
            matriz =>
                <tr key={matriz.folio} className={ checar(matriz.folio)?"seleccion_matriz":"" } style={{"background":checar(matriz.folio)?"#4ce0b3":""}}>
                    <td style={{"with":"30px","text-align":"center"}}>
                        {this.datos_iconos_estatus(matriz.estatus)}
                    </td>
                    <td style={{"text-align":"center"}}> {matriz.folio}</td>
                    <td>{matriz.matriz}</td>
                    <td>{matriz.establecimiento}</td>
                    <td>{matriz.usuario}</td>
                    <td style={{"text-align":"center"}}>{matriz.fecha_asignacion}</td>
                    <td style={{"with":"235px","text-align":"center"}}>
                         <label className="btn btn-default"  onClick={ ()=>this.on_marcar_matriz(matriz)}>
                            <span className={ checar(matriz.folio)?"fa fa-check-circle-o":"fa fa-circle-o"} style={{"font-size":"25px","marginRight":"5px"}}></span>
                             {matriz.estatus}
                         </label>
                    </td>
                </tr>
        );
    }
    datos_etapas() {
        const evaluado = (elemento) => {
            if (elemento.aplicado == "NO") {
                return <i className="glyphicon glyphicon glyphicon-edit btn btn-success" style={{"font-size":"25px"}}
                          onClick={ ()=>this.obtener_puntos_revicion(elemento)}></i>
            } else {
               return <i className="glyphicon glyphicon glyphicon-check  btn btn-info" style={{"font-size":"25px"}}
                           onClick={ ()=>this.obtener_puntos_evicion_guardados(elemento)}></i>
            }
        };
        if (this.state.id_usuario>0)
            return this.lista_etapas.map(
                et=> <tr style={{"width":"100%","text-align":"center"}}>
                        <td style={{"width":"50px"}}>{et.orden_etapa}</td>
                        <td>{et.etapa}</td>
                        <td style={{"width":"40px","text-align":"center"}}>
                            {evaluado(et)}      
                        </td>
                    </tr>);
    }
}


class Vista_muestras_por_etapa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cantidad:1
        }
    }
    render() {
        const BASE = this.props.estado_padre;
        return(
            <div className="moda_cresponder" id="modal_sugerido_muestra">
                <div  className="panel panel-default" style={{"height":"65%","max-width":"800px"}}>
                    <div className="panel-heading" >
                        <span className="glyphicon glyphicon-remove-circle close red" 
                              onClick={()=>document.getElementById("modal_sugerido_muestra").style.display = "none"}></span>
                       <h3>{BASE.usuario}</h3>
                    </div>
                    <div  className="panel-body" style={{"height":"90%","overflow-x":"auto","overflow-y":"auto"}} >
                        {this.cuerpo(BASE)}
                    </div>
                </div>
            </div>
           );
    }
    /**componentes**/
    cuerpo(BASE) {
        return <div>
                    <label style={{"font-size":"20px","margin-left":"10px"}}>
                        <span style={{"color":"black"}}>ESTABLECIMIENTO : </span> 
                        <span style={{"border-bottom":"solid 1px #808080"}}>{BASE.establecimiento}.</span> 
                    </label>
                    <label style={{"font-size":"20px","margin-left":"30px"}}>
                       <span style={{"color":"black"}}>ETAPA : </span> 
                       <span style={{"border-bottom":"solid 1px #808080"}}> {BASE.etapa}.</span>
                    </label>
                    <div className="tabla_matriz">
                        <Tabla cavecera={["#","Unidad De Inspeccion","Sugerido","Real"]}
                               datos={this.datos_revicion()} />
                    </div>
                    <input type="button" 
                           style={{"margin-top":"15px"}}
                           value="Iniciar Evaluacion." 
                           data-dismiss="modal"
                           onClick={()=>this.cerrar()}
                           className="btn btn-info btn-block" />
                </div>
    }
    cerrar() {
        document.getElementById("modal_tablero_evaluacion").style.display = "flex";
        document.getElementById("modal_sugerido_muestra").style.display = "none";
    }
    datos_revicion() {

        return this.props.lista_punto_revicion.map(
            (elemento, pos) =>{
                
                return <tr>
                         <td>{pos+1}</td>
                         <td>{elemento.unidad_de_inspeccion}</td>                         
                         <td style={{"width":"90px"}}>
                            <input type="number" min="1" max="80"  value={this.props.muestra[pos].muestra_sugerida} disabled /></td>
                         <td style={{"width":"40px"}} >
                             <input type="number" min="1" max="80" 
                                    value={elemento.muestra_sugerida}
                                    onChange={(e)=>this.props.cambiar_muestra(e,pos)} />
                         </td>
                       </tr>
            });
    }
}
class Tablero_evaluacion extends React.Component
{
    constructor(props)
    {
        this.lista_evaluaciones = [];
        this.lista_observaciones_evaluaciones = [];
        
        for (var i = 0; i < 80; i++)
        {
            this.lista_evaluaciones.push(i + 1);
        };
        super(props);
        this.state = {
            posicion: -1,
            folio:-1,
            respuesta:"",
            observacion:""
        }
    }
    render()
    {
        return (
            <div className="moda_cresponder" id="modal_tablero_evaluacion">
                <div  className="panel panel-default">
                    <div className="panel-heading" >
                        <span className="glyphicon glyphicon-remove-circle close red" 
                              onClick={()=>document.getElementById("modal_tablero_evaluacion").style.display = "none"}></span>
                        <h3>REVISIÓN : { this.props.estado_padre.establecimiento }</h3>
                    </div>
                    <div  className="panel-body" style={{"height":"90%","overflow-x":"auto","overflow-y":"auto"}} >
                        {this.cuerpo_modal()}
                    </div>
                </div>
            </div>
            );

    }
    /**eventos objetos**/
    on_respuesta(elemento,posicion,respuesta,observacion)
    {
        console.log("observaciones : ",this.props.lista_observaciones);
        const previa_obs = this.props.lista_observaciones.filter(
                e=>e.folio == elemento.folio && e.posicion == posicion
                );
        if (respuesta === "SI") {
            elemento.respuestas[posicion] = respuesta;
            if (previa_obs.length > 0) {
                console.log(previa_obs[0]);
                const indice = this.props.lista_observaciones.indexOf(previa_obs[0]);
                console.log("index : " + indice);
                this.props.lista_observaciones.splice(indice, 1)
            }
            this.setState({ observacion: "" });
        }
        else {
            this.setState({
                folio:elemento.folio,
                posicion: posicion,
                respuesta: respuesta,
                observacion:previa_obs.length > 0 ? previa_obs[0].observacion : ""
            });

            document.getElementById("modal_observaciones").style.display = "block";
        }
    }
    on_observaciones(e)
    {
        this.setState({ observacion: e.target.value });
    }
    on_ocultar_observaciones()
    {
        if (this.state.observacion != "") {
            const elemento = this.props.lista_punto_revicion.filter(
                    e=>e.folio == this.state.folio
                    )[0];
            const previa_obs = this.props.lista_observaciones.filter(
                e=>e.folio == this.state.folio && e.posicion == this.state.posicion
                );
            
            if (previa_obs.length == 0) {
                this.props.lista_observaciones.push(this.state);
            } else {
                previa_obs[0].observacion = this.state.observacion;
            }
            elemento.respuestas[this.state.posicion] = this.state.respuesta;
            this.setState({
                folio: -1,
                posicion: -1,
                respuesta: "",
                observacion: ""
            });
            document.getElementById("modal_observaciones").style.display = "none";

        } else alert("Coloque Observaciones!!!");
    }
    /**conexiones**/
    on_guardar() {
        const revisar_respuesta = (r) => r == "SI" ? 1 : r == "NO" ? 0 : r == "NA" ? 2 : 3;
        const lista_faltantes = [];
        console.info("datos");
        console.log(this.props.lista_punto_revicion);
        console.info("Observaciones");
        console.log(
        this.props.lista_observaciones
        );
        console.log(this.props.estado_padre);

        var lista_guardado = [];
        var lista_observaciones = [];
        this.props.lista_punto_revicion.forEach(elemento =>
        this.lista_evaluaciones.forEach(
              (e,p) => {
                  const previa_obs = this.props.lista_observaciones.find(
                    r=>r.folio == elemento.folio && r.posicion == e - 1
                    );
                  const resp = revisar_respuesta(elemento.respuestas[e - 1] || "");

                  const observa = previa_obs != undefined ?previa_obs.observacion :"";
                     
                  if (resp == 0  && observa == "") {
                    lista_faltantes.push((p+1)+"-"+ elemento.unidad_de_inspeccion);
                  } else if (observa != "") {
                        lista_observaciones.push(
                            this.props.estado_padre.folio + "," + this.props.estado_padre.folio_etapa + "," + elemento.folio + "," + e + ",'" + observa + "'"
                        );
                    }

                  lista_guardado.push(this.props.estado_padre.folio + "," + this.props.estado_padre.folio_etapa + "," + this.props.estado_padre.id_usuario + ","
                         + elemento.folio + "," + e + "," + resp);
            })
        );
        console.info("Enviar: ", lista_guardado);
        console.log("Pendiente: ", lista_faltantes);
        console.log("Observaciones : ", lista_observaciones);
        if (lista_faltantes.length == 0) {
            conexion_api_from_body("servicios/matriz/conexiones.asmx/matrices_guardar_resultados",
         {
             datos: lista_guardado,
             observaciones: lista_observaciones
         },
         (respuesta) => {
             if (respuesta.d=1) {
                 this.setState({});
                 document.getElementById("modal_tablero_evaluacion").style.display = "none";
                 alert("Guardado... ");
                 this.props.obtener_etapas();
             } else alert("Error!!!");
         });
        } else alert("Unidad De Inspeccion Faltantes :\n" + lista_faltantes.toString());

    }
    /**componentes**/
    cuerpo_modal()
    {
        return <div style={TABLA_EVALUACIONES.cuerpo_modal}>
                    <label style={{"font-size":"12px","margin-left":"10px"}}>
                            <span style={{"color":"black"}}>RESPONSABLE : </span>
                            <span style={{"border-bottom":"solid 1px #808080"}}>{this.props.estado_padre.usuario}.</span>
                    </label>
                    <label style={{"font-size":"12px","margin-left":"30px"}}>
                           <span style={{"color":"black"}}>ETAPA : </span>
                           <span style={{"border-bottom":"solid 1px #808080"}}> {this.props.estado_padre.etapa}.</span>
                    </label>
                <br />
                    {this.tabla_datos()} 
                   {this.tabla_respuestas()}
                <span style={{"fontSize":"20px"}} 
                       onClick={this.on_guardar.bind(this)}
                        className="btn btn-success btn-block glyphicon glyphicon-send" >
                        <label style={{"marginLeft":"10px","fontSize":"15px"}}>
                            Enviar Revisión Etapa
                        </label>
                    </span>
                <div id="modal_observaciones"  >
                   <div className="panel panel-primary">
                       <div className="panel panel-heading" style={{"witdh":"500px","height":"50px"}}>
                           <span className="glyphicon glyphicon-remove-sign close " onClick={()=>document.getElementById("modal_observaciones").style.display = "none"}></span>
                           <h4>Observaciones</h4>
                       </div>
                       <div className="panel panel-body">
                            <textarea className="form-control" style={{"resize":"none","height":"140px","border":"solid 2px #3c8cfb;"}} 
                                      wrap="soft"
                                     placeholder="observacion..." value={this.state.observacion}
                                     onChange={this.on_observaciones.bind(this)}>

                            </textarea>
                       </div>
                        <input type="button" value="agregar"
                               className="btn btn-info btn-block"
                               onClick={this.on_ocultar_observaciones.bind(this)} />
                       
                    </div>
                </div>
            </div>
    }
    tabla_datos()
    {
        return <div style={TABLA_EVALUACIONES.cuerpo_tabla_evaluacion}>
                <Tabla cavecera={["#","Unidad De Inspeccion"]}
                       datos={this.datos_revicion()} />
                </div>
    }
    tabla_respuestas()
    {   
        return <div style={TABLA_EVALUACIONES.cuerpo_tabla_evaluacion}>
                    <Tabla cavecera={this.lista_evaluaciones}
                           datos={this.datos_respuestas()} />
               </div>
    }
    datos_revicion()
    {
        return this.props.lista_punto_revicion.map(
               (elemento, pos) => <tr>
                                    <td style={{"text-align":"center","width":"30px"}}>{pos+1}</td>
                                    <td>{elemento.unidad_de_inspeccion}</td>                         
                                </tr>);
    }

    datos_respuestas()
    {
        const lista_opciones =(el,pos)=> [
            <div>
                <h5>{ el.consepto+" #"+ (pos+1)}</h5>
                <span style={TABLA_EVALUACIONES.cuerpo_respuesta} 
                      className="glyphicon glyphicon-ok-circle green"
                      onClick={ ()=>this.on_respuesta(el,pos,"SI")}> </span>
                <span style={TABLA_EVALUACIONES.cuerpo_respuesta} 
                      className="glyphicon glyphicon-remove-circle red"
                      onClick={ ()=>this.on_respuesta(el,pos,"NO")}> </span>
                <span style={TABLA_EVALUACIONES.cuerpo_respuesta} 
                      className="glyphicon glyphicon-ban-circle blue"
                      onClick={ ()=>this.on_respuesta(el,pos,"NA")}> </span>
            </div>
        ];
        const casillas = (elemento) => {
            const fondo = (p) => {
                return elemento.respuestas[p] == "NO" ? { "background": "red" } :
                       elemento.respuestas[p] == "SI" ? { "background": "green" } :
                    elemento.respuestas[p] == "NA" ? { "background": "blue" } :
                    { "background": "#b0b4bb" };
            }
            const titulo = elemento.unidad_de_inspeccion + "Posicion :";
            return this.lista_evaluaciones.map(
                (e, p) => {
                    var dato=null;
                    if (p < elemento.muestra_sugerida)
                    dato = <Botones_dropdown titulo={""}
                                             opciones_menu={lista_opciones(elemento,p)} />
                    return <td style={fondo(p)}>
                               {dato}                        
                            </td>});
        }
        return this.props.lista_punto_revicion.map(
            elemento=><tr>
                        {casillas(elemento)}
                      </tr>);
    }
}

const TABLA_EVALUACIONES =
{
    cuerpo_modal:{
        "height": "100%",
        "min-height": "330px",
        "width": "100%",
        "border": "solid 1px black",
        "border-radius": "5px ",
        "margin-top": "-5px"
    },
    cuerpo_tabla_evaluacion: {
        "height": "85%",
        "width": "50%",
        "overflow-x": "auto",
        "overflow-y": "auto",
        "display": "inline-block"
    },
    cuerpo_respuesta: { "font-size": "40px", "margin-left": "10px" }
}
ReactDOM.render(
    <Tabla_matriz />,
    document.getElementById("container")
    );