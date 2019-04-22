
class Check_list extends React.Component {
    constructor(props) {
        super(props);
        //datos
        this.lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
        this.lista_datos_cuestionario = [];
        this.asignacion_seleccionada = [];
        this.lista_zonas_por_asignacion = [];
        this.lista_datos_por_zona = [];
        this.lista_responsables = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" }) || [];
        this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento",
            {
                folio: this.lista_establecimientos[0].folio
            }) || [];

        this.lista_servicios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_detalles_ckl") || [];
        this.lista_servicios_por_cuestionario = [];
        this.lista_datos_cuestionario = [];
        this.nombre_cuestionario = "";
        this.filtro_responsable ="";
        this.responsable_tienda = "";
        //modal
        this.titulo_modal = "";
        this.titulo_seleccion = "";
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        this.cavecera_tabla_de_modal = [""];
        this.cuerpo_tabla_modal = [];
        //eventos
        //estados
        this.state = {
            folio_establecimiento: this.lista_establecimientos[0].folio,
            establecimiento :this.lista_establecimientos[0].nombre,
            id_cuestionario: 0,
            cuestionario: "",
            folio_asignacion: 0,
            id_responsable: 0,
            responsable:"",
            filtro_tabla_responsable_modal: "",
            evaluando: false,
            seleccion_zona: { folio: 0, nombre: "" }
        }
        this.lista_observaciones = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_ver_observaciones_por_activo",
            {
                asignacion: this.state.folio_asignacion,
                folio_zona: this.state.seleccion_zona.folio
        }) || [];
        //tablas
        this.cavecera_tabla_principal = ["Folio", "Cuestionario", "Evaluador", "Inicio", "Termino", "Estatus"];
        this.tabla_principal = this.datos_cuestionarios();
    }
    render() {
        return (
            <div>
                <div style={{"width":"30%","display":"inline-block","margin-left":"20px"}}>
                    <Caja_datos_select titulo={""}
                        icono={"glyphicon glyphicon-briefcase"}
                        seleccion={this.on_seleccion_establecimiento.bind(this)}
                        opciones={this.opciones_establecimientos()} />
                </div>    
                 <div style={{"width":"60%","display":"inline-block","margin-left":"20px"}}>
                    <Caja_datos icono={"glyphicon glyphicon-edit"}
                                titulo={"Cuestionario"}
                                datos={this.state.cuestionario} />
                 </div>
                {this.seleccion_responsable_boton()}
                {this.boton_evaluar()}
                 <div className="tabla_matriz">
                    <Tabla cavecera={this.cavecera_tabla_principal}
                           datos={this.tabla_principal} />
                  </div>
                 <Modal_con_tabla id={"modal_"} 
                                  titulo_modal={this.titulo_modal}  
                                icono_seleccion={"glyphicon glyphicon-edit"}
                                titulo_seleccion={this.titulo_seleccion}
                                seleccionado={this.seleccion_tabla_modal.dato}
                                texto_filtro={this.state.filtro_tabla_responsable_modal}
                                evento_filtrar={this.on_filtro_tabla_modal.bind(this)}
                                cavecera_tabla={this.cavecera_tabla_de_modal}
                                lista_tabla={this.cuerpo_tabla_modal}
                                guardar={this.seleccionar_de_tabla_modal.bind(this)}
                                deshacer={this.des_seleccionar_de_tabla_modal.bind(this)}/>
                <Modal_cuestionario zona={this.state.seleccion_zona}
                                    datos_zona={this.lista_datos_por_zona}
                                    establecimiento={this.state.establecimiento}
                                    folio_establecimiento={this.state.folio_establecimiento}
                                    asignacion={this.state.folio_asignacion}
                                    departamento={this.state.departamento}
                                    responsable={this.state.id_responsable}
                                    lista_observacion={this.lista_observaciones}
                                    cuestionario={this.state.id_cuestionario} /> 
            </div>
             );
    }
    //
    seleccionar_de_tabla_modal() {
        console.log(this.seleccion_tabla_modal);
        this.setState({
            id_responsable : this.seleccion_tabla_modal.folio,
            responsable: this.seleccion_tabla_modal.dato
        });
        this.seleccion_tabla_modal = {folio:0,dato:""}
    }
    des_seleccionar_de_tabla_modal() {
    }
    on_filtro_tabla_modal(e) {
        this.cuerpo_tabla_modal = this.datos_responsables(e.target.value);
        this.setState({ filtro_tabla_responsable_modal: e.target.value });
    }
    on_seleccion_establecimiento(e) {
        this.nombre_cuestionario = "";
        this.cavecera_tabla_principal = ["Folio", "Cuestionario", "Evaluador", "Inicio", "Termino", "Estatus"];
        const posicionest = this.lista_establecimientos.filter(est => est.folio == e.target.value)[0];
        console.log(e.target.value);
        this.cambio_vistas_servicios(e.target.value);
        this.setState({
            id_cuestionario: 0,
            cuestionario: "",
            folio_asignacion: 0,
            id_responsable: 0,
            responsable: "",
            filtro_tabla_responsable_modal: "",
            folio_establecimiento: e.target.value,
            establecimiento: posicionest.nombre,
            evaluando: false,
            seleccion_zona:{folio:0,nombre:""}
        });
    }
    on_seleccionar_cuestionario_de_tabla(cuestionario_seleccionado) {
        console.log(cuestionario_seleccionado);
        if (cuestionario_seleccionado.id_aplicador == ID_SCOI) {
            this.cavecera_tabla_principal = ["Folio", "Cuestionario",  "Evaluador", "Inicio", "Termino", "Estatus"];
            this.asignacion_seleccionada = cuestionario_seleccionado;
            this.setState({
                id_cuestionario: cuestionario_seleccionado.folio_cuestionario,
                cuestionario: cuestionario_seleccionado.cuestionario,
                folio_asignacion: cuestionario_seleccionado.folio,
                departamento: cuestionario_seleccionado.departamento
            });
        } else alert("Cuestionario No Seleccionable Por Usuario!!!");
    }
    on_seleccionar_de_tabla_modal_responsable() {
        console.log("Responsable...");
        this.titulo_modal = " Seleccion De Responsable Tienda";
        this.titulo_seleccion = "Responsable Tienda : ";
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        this.cavecera_tabla_de_modal = ["Folio","Nombre","Puesto"];
        this.cuerpo_tabla_modal = this.datos_responsables("");
        this.setState({ filtro_tabla_responsable_modal: "" });
    }
    seleccion_responsable_de_modal(responsable) {
        console.log(responsable);
        this.seleccion_tabla_modal = { folio: responsable.folio, dato: responsable.nombre };
        this.cuerpo_tabla_modal = this.datos_responsables("");
        this.setState({ filtro_tabla_responsable_modal: "" });
    }
    //
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : 0 + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);

        return dia + '/' + mes + '/' + d.getFullYear();
    }
    fechas_vigentes(estatus) {
        console.log("Estatus : "+estatus);
        if (estatus == "Vigente") {
            console.log("fecha Vigente");
            return true;
        }
        console.log("Fuera De Rango De Fecha!!!");
        return false;
    }
    cambio_vistas_servicios(folio_establecimiento) {
        this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento",
            {
                folio: folio_establecimiento
            }) || [];
        this.lista_zonas_por_asignacion = [];
        console.log(this.lista_cuestionarios_asignados);
        this.tabla_principal = this.datos_cuestionarios();
    }
    motrar_datos_evaluacion_curso() {
        if (this.fechas_vigentes(this.asignacion_seleccionada.estatus)) {
            if (this.state.id_responsable != ID_SCOI) {
                console.log("Asignacion " + this.state.folio_asignacion);
                this.lista_zonas_por_asignacion = conexion_ajax("servicios/servicios_generales/conexiones.asmx/obtener_zonas_por_asignacion", { folio: this.state.folio_asignacion });
                console.log(this.state.id_cuestionario);
                console.log(this.lista_datos_cuestionario);
                console.log(this.lista_zonas_por_asignacion);
                this.datos_zonas_cuestionarios();
                this.setState({ filtro_tabla_responsable_modal: "", evaluando: true });
            } else alert("Usuario Aplicador Y Usuario Responsable\n Son La Misma Persona!!!");
        }
        else
            alert("Fuera De Rango De Fecha !!!")
    }
    //
    opciones_establecimientos() {
        const r = this.lista_establecimientos.map(
            (e) => {
                return  <option  selected={e.folio==this.state.folio_establecimiento} value={e.folio}> { e.nombre }</option>
            });
        return r;
    }
    boton_evaluar() {
        if (this.state.id_responsable > 0 && this.state.id_cuestionario)
            return <input type="button" className="btn btn-success btn-block" 
                          value="Iniciar Evaluacion De Cuestionario." 
                          onClick={this.motrar_datos_evaluacion_curso.bind(this)} />
    }
    seleccion_responsable_boton() {
        const input = [<Caja_datos icono={"glyphicon glyphicon-user"}
                                    titulo={"Responsable"}
                                    datos={this.state.responsable} />];
        if (this.state.evaluando === false) {
            input.push(<i className="glyphicon glyphicon-search"
                            data-toggle="modal" data-target="#modal_"
                            onClick={this.on_seleccionar_de_tabla_modal_responsable.bind(this)}>
                    </i>);
        }
        return <div style={{"width":"90%","display":"inline-block","margin-left":"20px"}}>{input}</div>
    }
    datos_cuestionarios() {
        console.log("Asignados");
        const r = this.lista_cuestionarios_asignados.map(
            //
            e=>{
            return <tr  onClick={ ()=>{this.on_seleccionar_cuestionario_de_tabla(e)}}>
                    <td>{e.folio}</td>
                    <td>{e.cuestionario}</td>
                    <td>{e.aplicador}</td>
                    <td>{e.inicio}</td>
                    <td>{e.termino}</td>
                    <td>{e.estatus}</td>
                </tr>
            });
    return r;
   }
    datos_zonas_cuestionarios() {
        this.cavecera_tabla_principal = ["Zonas De Evaluacion : "];
        console.log("Zonas")
        this.tabla_principal = this.lista_zonas_por_asignacion.map(
            zona =><input type="button" 
                          className="btn btn-info btn-block btn-zonas" 
                          data-toggle="modal" data-target="#moda_ckl" 
                          value={zona.nombre||'indefinida'} onClick={()=>this.mostrar(zona) } />);
    }
    motrar_responsables() {
        console.log(this.state.id_responsable+"=>" + this.state.responsable);
    }
    datos_responsables(filtro) {
        const filtro_tabla = this.lista_responsables.filter(
           (elemento) => {
               return elemento.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0 || elemento.puesto.toUpperCase().search(filtro.toUpperCase()) >= 0
           });
        return filtro_tabla.map(
            (item) => {
                if (item.id_aplicador != parseInt(ID_SCOI))
                    return <tr onClick={ ()=>this.seleccion_responsable_de_modal(item)}>
                           <td>{item.folio}</td>
                           <td>{item.nombre}</td>
                           <td>{item.puesto}</td>
              </tr>
                else console.log(item.id_aplicador);
            });
    }
    mostrar(zona) {
        console.log("Folio Zona : " + zona.folio +","+ zona.nombre);
        this.lista_datos_por_zona = conexion_ajax("servicios/servicios_generales/conexiones.asmx/obtener_resultados_cuestionarios_asignados_zona", { asignacion: this.state.folio_asignacion, zona: zona.folio });
        console.log(this.state.id_cuestionario);
        console.log(this.lista_datos_por_zona);
        this.lista_observaciones = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_ver_observaciones_por_activo",
            {
                asignacion: this.state.folio_asignacion,
                folio_zona: zona.folio
            }) || [];
        this.setState({ seleccion_zona:zona});
    }
}
/********************************modal cuestionario**/
class Modal_cuestionario extends React.Component {
    constructor(props) {
        super(props);
        this.lista_observaciones = [];
        this.activo = {folio:0,nombre:"",criterio:"",orden:0}
        this.componentes_observaciones = this.datos_observaciones();
        this.lista_servicios_por_cuestionario = [];
        this.state = {
            posicion:-1,
            cantidad_obs: 0,
            texto_observacion:""
        }
    }
    
    render() {
        this.lista_observaciones = this.lista_observaciones.length == 0 ? this.props.lista_observacion : this.lista_observaciones;
        const est = { folio: this.props.folio_establecimiento, nombre: this.props.establecimiento }
        const titulo = <div> 
                            <h4>{this.props.establecimiento}</h4>
                            <h5>Zona : {this.props.zona.nombre}.</h5>
                       </div>;
        return( <div>
                    <div id="modal_responder_cuestionario">
                         <Modal cavecera={titulo}
                                cuerpo={this.cuerpo_modal()} 
                                id={"moda_ckl"}
                                cerrar={this.on_deshacer.bind(this)} />
                        <Enviar_servicio_moda departamento={this.props.departamento} 
                                              establecimiento={est}
                                              activo={this.activo}
                                              servicios={this.lista_servicios_por_cuestionario}
                                              on_guardar={()=>this.responder("NO")}  />
                    </div>
                </div>
            );
    }
    cuerpo_modal() {
        return <div>
                   <Caja_datos icono={"glyphicon glyphicon-edit"}
                               titulo={"Activo"}
                               datos={this.activo.nombre} />
                    <Caja_datos icono={"glyphicon glyphicon-edit"}
                                titulo={"Criterio"}
                                datos={this.activo.criterio} />  
                   {this.componente_evaluacion()}
                   {this.componente_observaciones()}
                    <div className="tabla_cuestiones">
                        <Tabla cavecera={["#","Activo A Inspeccionar","Evaluacion"]}
                               datos={this.datos_tabla()} />
                    </div>
                    <input type="button" 
                           className="btn btn-success btn-block" 
                           value="Guardar Evaluacion" 
                           onClick={this.on_guardar_resultados_cuestionario.bind(this)}
                    />
               </div>
    }
    on_guardar_resultados_cuestionario() {
        console.log("Guardar...");
        console.log(this.props.datos_zona);
        console.log(this.lista_observaciones);
        var lista_guargar = [];
        var lista_descripcion = [];
        this.props.datos_zona.forEach(
            (elemento,posicion)=>{
                if (elemento.solucion != "  ") {
                    this.lista_observaciones.forEach((item)=>{
                        if(elemento.folio_activo==item.folio)
                            lista_descripcion.push([posicion,item.observacion]);
                    });
                    lista_guargar.push(
                        elemento.folio_resultado + "," +
                         this.props.asignacion + "," +
                        elemento.folio_activo + "," +
                        elemento.folio_criterio + ",'" +
                        elemento.solucion + "'," +
                        ID_SCOI + "," +
                        this.props.responsable
                        );
                }
            });
         if (lista_guargar.length == this.props.datos_zona.length) {
             console.log(lista_guargar);
             console.log(lista_descripcion);
             conexion_api_from_body("servicios/servicios_generales/conexiones.asmx/guardar_resultados_cuestionarios_asignados_zona",
                 {
                     datos_cuestionario: lista_guargar,
                     observaciones: lista_descripcion
                 },
                 (respuesta) => {
                     console.log(respuesta);
                     alert("Guardado...");
                     this.on_deshacer();
                    // document.getElementById("modal_responder_cuestionario").style.display = "none";
                 });
         } else alert("Datos incompletos!!!");
    }
    on_deshacer() {
        console.log("Deshacer");
        this.lista_observaciones = [];
        this.activo = { folio: 0, nombre: "", criterio: "", orden: 0 }
        this.componentes_observaciones = this.datos_observaciones();
        this.lista_servicios_por_cuestionario = [];
        this.setState({
            posicion: -1,
            cantidad_obs: 0,
            texto_observacion: ""
        });
    }
    on_tabla_activo(elemento, pos) {
        console.log(elemento)
        this.activo = { folio: elemento.folio_activo, nombre: elemento.detalle_activo, criterio: elemento.detalle_criterio, orden: elemento.orden }
        console.log("Posicion : " + pos);
        this.componentes_observaciones = this.datos_observaciones();
        this.setState({ posicion: pos });
    }
    texto_observaciones(e) {
        this.setState({ texto_observacion: e.target.value });
    }
    agregar_observacion() {
        if (this.state.texto_observacion && this.activo.folio>0) {
            this.lista_observaciones.push({
                folio: this.activo.folio,
                observacion: this.state.texto_observacion
            });
            console.log({
                folio: this.activo.folio,
                observacion: this.state.texto_observacion
            });
            this.componentes_observaciones = this.datos_observaciones();
            this.setState({ texto_observacion: "" });
        } else alert("Coloque Texto En El Campo!!!");
    }
    eliminar_observaciones(obs) {
        const posicion = this.lista_observaciones.indexOf(obs);
        this.lista_observaciones.splice(posicion, 1);
        this.componentes_observaciones = this.datos_observaciones();
        this.setState({ cantidad_obs: this.lista_observaciones.length });
    }
    //
    seleccion_icono_res(res) {
        var clase = "glyphicon glyphicon-question-sign";
        if (res == "SI") clase = "glyphicon glyphicon-ok-sign"
        else if (res == "NO") clase = "glyphicon glyphicon-remove-sign"
        else if (res == "NA") clase = "glyphicon glyphicon-minus-sign"
        return clase;
    }
    get_servicios() {
        this.lista_servicios_por_cuestionario = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_por_orden_activo_ckl",
            {
                cuestionario: this.props.cuestionario,
                orden: this.activo.orden
            }) || [];
        this.setState({ texto_observacion: "" });
    }
    responder(res) {
        console.log(res);
        const p = this.state.posicion;
        if (p >-1) {
            this.props.datos_zona[p].solucion = res;
            this.setState({ posicion: p });
        } else alert("Seleccione Un Activo!!!");
    }
    //
    componente_evaluacion() {
        const p = this.state.posicion;
        if (p > -1) {
        return <div className="botonera_respuesta" style={{"text-align":"center"}}>
                   <span title="SI" className={this.seleccion_icono_res("SI")} 
                         onClick={()=>this.responder("SI")}></span>
                   <span title="NO" className={this.seleccion_icono_res("NO")}
                         data-toggle="modal" data-target="#moda_servicios"
                         onClick={()=>this.get_servicios()}
                          ></span>
                   <span title="NA" className={this.seleccion_icono_res("NA")} 
                         onClick={()=>this.responder("NA")}></span>
               </div>
        }
    }
    componente_observaciones() {
        const tit = <p style={{"font-size":"15px","display":"inline-block","margin-bottom":"0"}}>Observaciones  </p>
        return <div>
                    <label>
                       <Botones_dropdown titulo={tit}
                                         opciones_menu={this.componentes_observaciones} />
                    </label>
                   <input type="text" style={{"width":"70%","display":"inline-block"}}
                          className="form-control" placeholder="Agregar Observaciones"
                          value={this.state.texto_observacion}
                          onChange={this.texto_observaciones.bind(this)} />
                   <i     className="glyphicon glyphicon-plus-sign blue"
                          style={{"display":"inline-block","font-size":"30px","margin-left":"10px"}}
                          onClick={this.agregar_observacion.bind(this)} ></i>
                </div>
    }
    datos_observaciones() {
        return this.lista_observaciones.map(
            elemento=>{
                console.log(elemento.folio+":"+this.activo.folio)
                if (elemento.folio == this.activo.folio) {
                return <div  style={{'height':'30px'}} key={elemento.folio}>
                            {elemento.observacion}
                            <section className="glyphicon glyphicon-remove close" 
                                    onClick={ ()=>{this.eliminar_observaciones(elemento)}}>
                            </section>
                        </div>}
            });
    }
    datos_tabla() {
        return this.props.datos_zona.map(
            (elemento,posicion)=>{
                const clase = this.seleccion_icono_res(elemento.solucion);
                return <tr title={elemento.detalle_criterio} onClick={()=>this.on_tabla_activo(elemento,posicion)}>
                                <td>{posicion+1}</td>
                                <td>
                                    <h4>Activo : {elemento.detalle_activo}</h4>
                                    <p>Criterio : {elemento.detalle_criterio}</p>
                                </td>
                                <td style={{'width':'50px'}}>
                                    <span className={clase} ></span>
                                </td>  
                            </tr>});
    }
}
/************************modal  solicitud de servicio********/
class Enviar_servicio_moda extends React.Component {
    constructor(props) {
        super(props);
        this.lista_Prioridades = conexion_ajax("servicios/servicios_generales/conexiones.asmx/obtener_lista_prioridades") || [];
        this.lista_servicios_cuestionario = [];
        this.state = {
            descripcion: "",
            folio_departamento:-1,
            servicio: { folio: 1, nombre: "", folio_departamento:-1 },
            prioridad: this.lista_Prioridades[0].folio
        }
    }
    render() {
        this.titulo = <div>
                        <h5>Descripcio De La Solisitud Del Servicio.</h5>
                        Establecimiento : {this.props.establecimiento.nombre}.
                    </div>;
        return (
             <Modal cavecera={this.titulo}
                    cuerpo={this.cuerpo_modal()} 
                    id={"moda_servicios"}
                    cerrar={this.props.on_deshacer} />
            );
    }
    cuerpo_modal() {
        return <div className="form-group">
                <label>Activo : {this.props.activo.nombre}
                </label>
                <br />
                <label>Prioridad : </label>
                <select className="form-control" onChange={this.on_prioridad.bind(this)}>
                    {this.datos_prioridades()}
                </select>
                <br />
                <label>Describa el Detalle Del Servicio Solicitado</label>
             
                <textarea style={{"resize":"none"}} value={this.state.descripcion} 
                          onChange={this.on_cambiar_detalle.bind(this)} 
                          placeholder="Describa Claramente El Detalle Del Servicio Solisitado"
                          wrap="soft"
                          characters="on"
                          className="form-control" rows="3"></textarea>
                 <br />
                 <div className="tabla_matriz">
                    <Tabla cavecera={["","Folio","Servicio","Descripcion"]}
                           datos={this.datos_servicios()} />
                 </div>
                <input type="button"
                       value="Guardar."
                       data-dismiss="modal" 
                       className="btn btn-success btn-block"
                       onClick={this.on_enviar_servicio.bind(this)} />
            </div>;
    }
    on_prioridad(e) {
        console.log(e.target.value);
        this.setState({prioridad:e.target.value});
    }
    on_cambiar_detalle(e) {
        this.setState({ descripcion :e.target.value});
    }
    on_enviar_servicio() {
        if (this.state.servicio.folio > 0 && this.state.descripcion != "" && this.state.prioridad) {
            this.props.on_guardar();
            var datos_consulta = this.state.servicio.folio + "," + this.props.activo.folio + ",'" + this.state.descripcion + "'," +
                this.state.prioridad + "," +
                this.state.servicio.folio_departamento + "," + this.props.establecimiento.folio + "," + ID_SCOI + ",'" + IP_CLIENTE + "'"
            console.log(datos_consulta);
            var folio = conexion_ajax("servicios/servicios_generales/conexiones.asmx/enviar_solicitud_servicio", { datos: datos_consulta });
            if (folio > 0)
                alert("Guardado...\n" + "Folio : " + folio);
        } else alert("Datos Incompletos...\nCancelado!!!");

        this.setState({
            descripcion: "",
            folio_departamento: -1,
            servicio: { folio: 1, nombre: "", folio_departamento: -1 },
            prioridad: this.lista_Prioridades[0].folio
        });
    }
    //
    datos_prioridades() {
        return this.lista_Prioridades.map(
            elemento =><option value={elemento.folio} selected={elemento.folio==this.state.prioridad} >{elemento.nombre}</option>);
    }
    datos_servicios() {
        this.lista_servicios_cuestionario;
        return this.props.servicios.map(
            elemento=><tr>           
                         <td>
                            <input type="checkbox"
                                   onClick={()=>this.checar_servicio_seleccionado(elemento)}
                                   checked={this.state.servicio.folio == elemento.folio}
                                />
                            </td>
                            <td>{elemento.folio}</td>
                            <td>{elemento.nombre}</td>
                            <td>{elemento.detalle}</td>
                       </tr>);
    }
    checar_servicio_seleccionado(elemento) {

        this.setState({ servicio: elemento });
    }
}
ReactDOM.render(
    <Check_list />,
        document.getElementById("contenedor")
    );
