//variables Globales
const ESTABLECIMIENTOS = conexion_ajax("servicios/checkListServ.asmx/buscar_establecimiento");

const establecimieto = new objEstablecimieto();

/************************
    botonera header
************************/
class Header_btn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fecha : establecimieto.getFecha };
    }
    render() {
        return (
            <div>
                 <div className="btn-group">
                    <input type="button" className="btn btn-primary" onClick={ ()=> this.actualizar()} value="Actualizar" />
                    <input type="button" className="btn btn-primary" value="Resultados" data-toggle="modal" data-target="#modal_reporte" onClick={ ()=>this.resultados()} />
                    <input type="button" className="btn btn-primary" value="Observaciones"  data-toggle="modal" data-target="#modal_reporte"  onClick={ ()=>this.reporte_observaciones() } />
                </div>
                <div className="contenedor_calendario">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                        <input type="date" className="form-control" value={ this.state.fecha } onChange={ (e)=>{this.asignar_fecha(e)} } />
                    </div>
                </div>
            </div>
        );
    }
    actualizar() {
        if (establecimieto.getId > 0) {
            establecimieto.setLista_cuestionarios = establecimieto.getId;
            Render_header_comp();
            Render_body_comp();
        }
        else
            alert("seleccione un Establecimiento!!!");
    }
    asignar_fecha(e) {
        establecimieto.setFecha = e.target.value;
        this.setState({ fecha: e.target.value });
    }
    reporte_observaciones() {
        const f = establecimieto.getFecha.split("-");
        const datos = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { 'folio_establecimiento': establecimieto.getId, 'fecha': f[2] + "-" + f[1] + "-" + f[0] })
        
        obtener_observaciones(datos);
    }
    resultados() {
        const f = establecimieto.getFecha.split("-");
        const r = conexion_ajax("servicios/checkListServ.asmx/procedimiento_resultados_cuestionario_por_dia", { 'fecha': f[2] + "-" + f[1] + "-" + f[0], 'folio_establecimiento': establecimieto.getId });
        resultados_ckl(r);
    }
}
        /************************
            selector Sucursal
        ************************/
        class Selector_sucursales extends React.Component {
            render() {
                return(
                <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-edit"></i> Establecimiento </span>
             <select className="form-control" id="establecimientos" onChange={ (e)=>{this.cambio_establecimiento(e)}} >
                 <option value="">Seleccionar Establecimientos</option>
                 { this.lista_establecimientos()}
             </select>
        </div>    
                );
            }
            lista_establecimientos() {
                const r = ESTABLECIMIENTOS.map((est) =>
                    <option key={est.id_establecimiento} value={est.id_establecimiento}>{est.nombre_establecimiento }</option>);
                return r;
            }
            cambio_establecimiento(e) {
                const est = ESTABLECIMIENTOS.filter((est) => est.id_establecimiento == e.target.value)

                establecimieto.setId = e.target.value;
                establecimieto.setNombre = est[0].nombre_establecimiento;
                establecimieto.setEncargado = {
                    folio: 0,
                    nombre: "",
                    puesto: ""
                };
                Render_header_comp();
                Render_body_comp();
            }
        }
        /************************
            selector lider
        ************************/
        class Selector_lideres extends React.Component {
            render() {
                const lider = this.props.lider;
                return(
                   <div className="input-group">
               <span className="input-group-addon" data-toggle="modal" data-target="#modal_lideres"><i className="glyphicon glyphicon-user"></i> Encargado</span>
               <input className="form-control" id="Nom_Encargados" value={lider.nombre} type="text" disabled />
           </div> 
               );
            }
        }
        /************************
            filtro lider
        ************************/
        class Lideres extends React.Component {
            constructor(props) {
                super(props);
                this.lideres_tienda = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" });
                this.lideres_tienda.sort(function (a, b) {
                    if (a.nombre > b.nombre) { return 1;}
                    if (a.nombre < b.nombre) { return -1;}
                    return 0;
                });
            }  
            render() {
                return(
                   <div className="modal-dialog" style={{ "width":"97%","height":"600px"}}>
              <div className="modal-content" >
                  <Header_Modal_lideres seleccion={  establecimieto.getEncargado.nombre } titulo= "Responsable Tienda" />
                  <Body_modal_lideres datos={  this.lideres_tienda } />
              </div>
          </div>
                 );
            }

        }
        /***************************************************
                cuerpo de modal
        ***************************************************/
        class Header_Modal_lideres extends React.Component {
            render() {                
                return (
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <label>{this.props.titulo}</label>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon">
                            Seleccion :
                        </span>
                        <input className="form-control" type="text" disabled value={this.props.seleccion} placeholder="Seleccione De La Tabla..." />
                    </div>
                </div> );
            }
        }
        /***************************************************
                cuerpo de modal lider
        ***************************************************/
        class Body_modal_lideres extends React.Component{
            constructor(props) {
                super(props);
                this.datos = props.datos;
                this.state = {
                    encargado: "",
                    filtro: this.datos
                };
            }
            render() {
                return(
                 <div className="modal-body">
            <div className="input-group">
                <span className="input-group-addon">Filtro : </span>
            <input className="form-control" type="text" placeholder="Filtro..."  onChange={ (e)=>{this.cambioTexto(e)}} />
        </div>
            {this.crear_tabla()}
        </div>    
              );
            }
            cambioTexto(e) {
                const filtrados = this.datos.filter((a) => {
                    return (a.nombre.toUpperCase().search(e.target.value.toUpperCase()) >= 0 || a.puesto.toUpperCase().search(e.target.value.toUpperCase()) >= 0) ? true : false
                });
                this.setState({
                    encargado: "", filtro: e.target.value === "" ? this.datos : filtrados
                });
            }
            crear_tabla() {
                return(
                 <div className="tabla_lideres">
            <table className="table table-bordered">
                <thead>
                    <tr className="info cavecera_tabla_lideres" >
                        <th >ID</th>
                        <th >NOMBRE</th>
                        <th >PUESTO</th>
                    </tr>
                </thead>
                <tbody>
                    { this.lista() }
                </tbody>
            </table>
         </div>
               );
            }
            lista() {
                const r = this.state.filtro.map((empleado) =>
                    <tr key={empleado.folio} style={{"background":"white"}} onClick={ ()=>{this.seleccion(empleado)} }>
                <td>{empleado.folio}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.puesto}</td>
            </tr>
                    );
                return r;
            }
            seleccion(dato) {
                this.setState({ encargado: dato.nombre });
                establecimieto.setEncargado = dato;
                Render_header_comp();
            }
        }
        //funcion de renderizado
        function Render_header_comp() {
            //hedader
            ReactDOM.render(
                <div>
            <h2>Check List. Mejora Continua.</h2>
            <Header_btn />
            <Selector_sucursales />
            <Selector_lideres lider={establecimieto.getEncargado}  />
        </div>,
                document.getElementById("cavecera")
            );
            //modal
            ReactDOM.render(
                <Lideres />,
                document.getElementById("modal_lideres")
            );
        }
        /*******************************
             agregar Cuestionario a ckl
        *******************************/
        class Agergar_cuestionarios extends React.Component {
            render() {
                return(
                    <div>
                        {this.checar_permiso()}
                    </div>
                );
            }
            abrir() {
                establecimieto.setCuestionario = {folio: 0, nom_cuestionario: "", estatus:false};
                Render_body_comp();
            }
            checar_permiso() {
               
                if (true) {
                    return <input type="button"className="btn btn-success btn-block"  onClick={ ()=>this.abrir() }  value="Gestion Cuestionarios" data-toggle="modal" data-target="#modal_cuestionarios" />
                }
                else{
                    return <h3>Cuestionarios</h3>
                }
            }
                }
        /***************************************************
                    modal de lista cuestionario
        ***************************************************/
        class Modal_cuestionarios extends React.Component {

            render() {
                return (
                    <div className="modal-dialog" style={{ "width":"97%","height":"600px"}}>
                <div className="modal-content" >
                    <Header_Modal_lideres seleccion={  establecimieto.getCuestionario.nom_cuestionario } 
                                          titulo= {<p><i className="glyphicon glyphicon-list-alt">  Gestion Cuestionarios</i></p>  }/>
                        <br />
                        {this.checar_si_esta()}
                    <Body_modal_cuestionarios />
                </div>
          </div>
                );
            }
            aniadir_cuestionario() {
                if (establecimieto.getId > 0 && establecimieto.getCuestionario.folio > 0) {
                    conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_guardar", { "id_establecimiento": establecimieto.getId, "cuestionario": establecimieto.getCuestionario.folio });
                    establecimieto.setCuestionario = { folio: 0, nom_cuestionario: "", estatus: false };
                    establecimieto.setLista_cuestionarios = establecimieto.getId;
                    Render_header_comp();
                    Render_body_comp();
                }
                else alert("Seleccione los Campos:\n\"ESTABLECIMIENTO  Y CUESTIONARIO\"\n para agregar!!!");
            }
            eliminar_cuestionario() {
                if (establecimieto.getId > 0 && establecimieto.getCuestionario.folio > 0) {
                    conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_borrar", { "id_establecimiento": establecimieto.getId, "cuestionario": establecimieto.getCuestionario.folio });
                    establecimieto.setCuestionario = { folio: 0, nom_cuestionario: "", estatus: false };
                    establecimieto.setLista_cuestionarios = establecimieto.getId;
                    Render_header_comp();
                    Render_body_comp();

                }
                else alert("Seleccione los Campos:\n\"ESTABLECIMIENTO Y CUESTIONARIOA\"\n para agregar!!!");
            }
            checar_si_esta() {
                const esta = establecimieto.getLista_cuestionarios.filter((e) =>e.id_cuestionario == establecimieto.getCuestionario.folio).length > 0 ? false : true;
                var evento = ()=>this.eliminar_cuestionario(),
                    color="btn btn-danger";
                if (esta) {
                    evento = ()=>this.aniadir_cuestionario();
                    color = "btn btn-info ";
                }
                return  <input type="button" 
                               value="Agregar" 
                               style={{"margin-left":"30px","margin-top":"10px"}}
                               className={color}  
                               onClick={evento} />;
            }
        }
        /***************************************************
                cuerpo de modal
        ***************************************************/
        class Body_modal_cuestionarios extends React.Component{
            constructor(props) {
                super(props);
                this.datos = conexion_ajax("servicios/checkListServ.asmx/nombres_cuestionarios");
                this.state = {
                    encargado: "",
                    filtro: this.datos
                };
            }
            render() {
                return(
                 <div className="modal-body">
            <div className="input-group">
                <span className="input-group-addon">Filtro : </span>
        <input className="form-control" type="text" placeholder="Filtro..."  onChange={ (e)=>{this.cambioTexto(e)}} />
    </div>
        {this.crear_tabla()}
        </div>    
              );
            }
            cambioTexto(e) {
                const filtrados = this.datos.filter((a) => {
                    return (a.nom_cuestionario.toUpperCase().search(e.target.value.toUpperCase()) >= 0 ) ? true : false
                });
                this.setState({
                    encargado: "", filtro: e.target.value === "" ? this.datos : filtrados
                });
            }
            crear_tabla() {
                return(
                 <div className="tabla_lideres">
            <table className="table table-bordered">
                <thead>
                    <tr className="info cavecera_tabla_lideres" >
                        <th >ID</th>
                        <th >NOMBRE</th>
                    </tr>
                </thead>
                <tbody>
                    { this.lista() }
                </tbody>
            </table>
         </div>
               );
            }
            
            lista() {
                const r = this.state.filtro.map((cuest) =>
                    <tr key={cuest.folio} style={{"background":"white"}} onClick={ ()=>{this.seleccion(cuest)} }>
                <td>{cuest.folio}</td>
                <td>{cuest.nom_cuestionario}</td>
            </tr>
                    );
                return r;
            }
            seleccion(dato) {
                establecimieto.setCuestionario = dato;
                Render_body_comp();
            }
        }
        /*******************************
             Responder Cuestionario a ckl
        *******************************/
        class Lista_cuestionarios_por_establecimiento extends React.Component {
           
            render() {
                return (
                    <div id="contenedor_botones_cuestionarios">
                { this.obtener_cuestionarios()}
            </div>
                    );
            }
            obtener_cuestionarios() {
                var r;
                if (establecimieto.getId > 0) { 
                    const cuestionarios = establecimieto.getLista_cuestionarios;
                    r = cuestionarios.map((cuest)=>
                        <input type="button" 
                               value={cuest.cuestionario} 
                               data-toggle="modal" 
                               data-target="#modal_resolver_cuestionarios" 
                               key={cuest.cuestionario} 
                               className={this.checar_estado(cuest.resueltos)}
                               onClick={ ()=>this.mostrar_preguntas( cuest ) } />
                        );
                    return r;
                }
            }
            checar_estado( estado) {
                return estado > 0 ? "btn btn-info btn-lg btn-block" : "btn btn-warning btn-lg btn-block";
            }
            mostrar_preguntas(cuestionario) {
                
                if (establecimieto.getEncargado.nombre != "") {
                    establecimieto.setPreguntas = cuestionario.id_cuestionario;
                    const res = establecimieto.getLista_cuestionarios.filter((c) =>c.cuestionario == cuestionario.cuestionario);
                    responder_cuestionario(res[0]);
                }
                else {
                    alerta_ckl("Falta Seleccionar Encargado Tienda!!!");
                }
            }
        }
        /***************************************************
                modulo para responder preguntas
        ***************************************************/
        class Responder_cuestionarios extends React.Component {
            constructor(props) {
                super(props);
                
                this.state = {
                    seleccion: {
                        observaciones: 0,
                        orden: 0,
                        pertenece: "",
                        pregunta: "",
                        respuesta: 3
                    },
                    observacion: "",
                    lista_observaciones:[]
                }
            }
            render() {
                const titulo = <div><i className="glyphicon glyphicon-edit"> {this.props.cuestionario.cuestionario} </i></div>;
                const pregunta = this.state.seleccion.pregunta;
                //if (this.props.cuestionario.cuestionario!=)
                return(
                    <div className="modal-content" >
                    <div onClick={ ()=>this.deseleccion()}>
                        <Header_Modal_lideres seleccion={ pregunta } titulo={titulo} />
                    </div>
                    <div className="modal-body">
                        <div >
                            {this.respuestas()}
                        </div>
                        {this.observaciones()}
                        {this.lista_observaciones_pregunta()}
                        {this.titulo_preguntas()}
                        {this.tabla_preguntas()}
                    </div>
                         <input type="button" value="Guardar" onClick={ ()=> this.guardar_respuestas_cuestionario() } className="btn btn-info btn-block" />
                    
                    </div>
                );
            }
            deseleccion() {
                this.setState({
                    seleccion: {
                        observaciones: 0,
                        orden: 0,
                        pertenece: "",
                        pregunta: "",
                        respuesta: 3
                    },
                    observacion: "",
                    lista_observaciones: []
                });
            }
            titulo_preguntas() {

                return(
                    <div>
                         <h4 style={{"display":"inline-block"}}>Preguntas:</h4>
                        <span className="marcador_r">
                               <span>si : {this.totales(1)} </span>
                               <span>no : {this.totales(0)} </span>
                               <span>na : {this.totales(2)} </span>
                               <span>R  : { Math.round(this.totales(1)/ (this.totales(0)+this.totales(1))*1000)/10 >= 0 ? Math.round(this.totales(1)/ (this.totales(0)+this.totales(1))*1000)/10:0} %.</span>
                        </span>
                    </div>
                    );
            }
            tabla_preguntas() {
                const r = establecimieto.getPreguntas.map((pregunta) =>
                    <tr onClick={ ()=>this.seleccionar_pregunta(pregunta)  } key={pregunta.orden}>
                        <td>{pregunta.orden}</td>
                        <td style={{"text-align":"left"}}>{pregunta.pregunta}</td>
                        <td>{this.convercion_respuesta(pregunta.respuesta)}</td>
                        <td>
                            <i className="glyphicon glyphicon-eye-open blue" title="Observaciones" > {pregunta.observaciones}</i>
                        </td>
                   </tr> );

                return  <div className="tabla_lideres" style={{"height":"380px"}}>
                            <table className="table table-bordered">
                                <tbody>
                                   {r}
                                </tbody>
                            </table>
                        </div>;
            }
            convercion_respuesta(r) {
                if (r == 1) { return      <i className="glyphicon glyphicon-ok respuestas si" ></i> }
                else if (r == 0) { return <i className="glyphicon glyphicon-remove respuestas no" ></i> }
                else if (r == 2) { return <i className="glyphicon glyphicon-ban-circle respuestas na" ></i> }
                return <i className="glyphicon glyphicon-alert respuestas pendiente" ></i>
            }
            seleccionar_pregunta(pregunta) {
                this.setState({
                    id: this.props.cuestionario.id_cuestionario,
                    nombre: this.props.cuestionario.cuestionario,
                    seleccion: pregunta,
                    lista_observaciones: []
                });
            }
            respuestas() {
                return (
                    <div>
                       <div>
                            <i className="glyphicon glyphicon-ok respuestas si"  onClick={ ()=>{this.responder(1)}}></i>
                            <i className="glyphicon glyphicon-remove respuestas no" onClick={ ()=>{this.responder(0)}} ></i>
                            <i className="glyphicon glyphicon-ban-circle respuestas na" onClick={ ()=>{this.responder(2)}} ></i>
                        </div>
                    </div>);
            }
            responder(r) {
                this.state.seleccion.respuesta = r;
                this.setState({ seleccion: { orden: 0, pregunta: "", pertenece: "", respuesta:3 } });
            }
            totales(r) {
                const cantidad = establecimieto.getPreguntas.filter(p=>p.respuesta == r);
                return cantidad.length;
            }
            observaciones_porPregunta() {
                var datos = [];
                if (establecimieto.getId > 0 && this.state.seleccion.observaciones > 0) {
                    const f = establecimieto.getFecha.split("-");
                    datos = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { 'folio_establecimiento': establecimieto.getId, 'fecha': f[2] + "-" + f[1] + "-" + f[0] });
                }
                this.setState({ lista_observaciones: datos.filter((obs) =>obs.pregunta == this.state.seleccion.pregunta & obs.cuestionario == this.state.nombre)});

            }
            lista_observaciones_pregunta() {
                var obs;
                if(this.state.lista_observaciones.length>0){
                    var r  = this.state.lista_observaciones.map((ob)=> 
                        <tr  className="lista_observaciones">
                               <td >
                                    {ob.observaciones}
                                    <i className="glyphicon glyphicon-remove-circle red close" onClick={ ()=>this.remover_obs(ob.folio)}></i>
                                </td>
                            </tr>
                        );
                    obs = <table className="table table-bordered ">
                            <tbody>
                                {r}
                            </tbody>
                        </table>

                }
                return <div className="tabla_observaciones_por_pregunta">{ obs} </div>;
            }
            remover_obs(id) {
                if (id > 0) {
                    establecimieto.getPreguntas.filter((e) => { e.orden == this.state.seleccion.orden ? e.observaciones-=1 : e.observaciones; return e });
                    conexion_ajax("servicios/checkListServ.asmx/Eliminar_observaciones", { 'folio': id });
                    this.deseleccion();
                }
            }
            observaciones() {
                return <div className="input-group">
                                <span className="input-group-addon" onClick={ ()=>this. observaciones_porPregunta() }><i className="glyphicon glyphicon-eye-open"></i> Ver : </span>
                                <input className="form-control" type="text" style={{"width":"87%"}} placeholder="Observaciones..." value={this.state.observacion} onChange={ (e)=>this.agregar_observaciones(e)} />
                                <i className="glyphicon glyphicon-plus  respuestas blue" title="Observaciones" onClick={ ()=>{this.enviar_observaciones()}} ></i>
                            </div>
            }
            agregar_observaciones(e) {
                if (this.state.seleccion.orden > 0) {
                    this.setState({ observacion: e.target.value }); 
                }
                else {
                    alert("Seleccione Una Pregunta!!!");
                }
            }
            enviar_observaciones() {
                const obs = this.state.observacion;
                const f = establecimieto.getFecha.split("-");
                var user = USUARIOS.filter((u) =>u.id_scoi == ID_SCOI);
                user = user[0]
                
                if (this.state.seleccion.orden > 0) {
                    if (obs != "" && obs != " ") {
                    this.setState({ observacion: "" });
                    const objeto = {
                        'folio_establecimiento': establecimieto.getId,
                        'id_cuestionario': this.state.id,
                        'fecha': f[2] + "-" + f[1] + "-" + f[0],
                        'posicion_pregunta': this.state.seleccion.orden,
                        'observaciones': obs,
                        'usuario': user.nombre_usuario
                    }
                    conexion_ajax("servicios/checkListServ.asmx/guardar_observaciones", objeto);
                    establecimieto.getPreguntas.filter((e) => { e.orden == this.state.seleccion.orden ? e.observaciones++ : e.observaciones; return e });
                    this.deseleccion();
                    //this.observaciones_porPregunta();
                    
                    }
                    else alert("Coloque Una Observacion!!!")
                }
                else {
                    alert("Seleccione Una Pregunta!!!");
                }
            }
            guardar_respuestas_cuestionario() {
                const respuestas = establecimieto.getPreguntas.filter((r) =>r.respuesta != 3);
                const total = respuestas.length === establecimieto.getPreguntas.length ? true : false;
                const url = "servicios/checkListServ.asmx/guardar_datos_3";
                if (total) {
                    const f = establecimieto.getFecha.split("-");
                    var user = USUARIOS.filter((u) =>u.id_scoi == ID_SCOI);
                    user = user[0]
                     const DATA = {
                            'sucursal': establecimieto.getId,
                            'fecha': f[2] + "-" + f[1] + "-" + f[0],
                            'zona': this.state.id,
                            'criterio': establecimieto.getPreguntas.map((p) => { return p.orden }),
                            'respuestas': establecimieto.getPreguntas.map((p) => { return p.respuesta }),
                            'datos_pregunta': establecimieto.getPreguntas.map((p) => { return p.pregunta }),//datos_pregunta
                            'observaciones': "00:00:00",//observaciones
                            'aplicador': ID_SCOI,
                            'encargado': establecimieto.getEncargado.nombre!=""?establecimieto.getEncargado.nombre:"NA"
                        }//fin obj
                        fetch(url, {
                            method: 'POST',
                            body: JSON.stringify(DATA), 
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then((response)=>{
                                return response.json();
                            })
                            .then((myJson) => {

                                establecimieto.setLista_cuestionarios = establecimieto.getId;
                                Render_header_comp();
                                Render_body_comp();
                                alerta_ckl("Guardado...");
                            })
                        .catch(error =>alert('Error:', error))
                        
                }
                else alert("falta por responder")
            }
        }
        /***************************************************
                cuerpo de modal aletas
        ***************************************************/
        class Aleta_ckl extends React.Component {
            render() {
                const dato = this.props.dato;
                return (<div>
                    <div className="modal-content">
                        <div className="modal-body" style={{"text-align":"center"}} >
                            <h3>{dato}</h3>
                             <input type="button" value="OK" data-dismiss="modal" className="btn btn-info btn-block" />
                        </div>
                </div>
               </div>);
            }
        }
class Lista_observaciones extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datos: []
        }
    }
    render() {
        return(
            <div className="modal-content">
                <div className="modal-header">
                     <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h3 onClick={ ()=>this.checar()}>Observaciones</h3>
                </div>
                <div className="modal-body tabla_lideres" style={{"text-aling":"center"}} > 
                    {this.lista_observaciones()}
                </div>
                <div className="modal-footer">
                    <input type="button" value="Exportar" className="btn btn-info btn-block" onClick={ ()=>this.exportar()} />
                </div>
           </div>
        );
    }
    lista_observaciones() {
        this.state={ datos:this.props.datos};
        var i = 1;
        const r = this.state.datos.map((observaciones) =>
            <tr key={observaciones.folio}>
                <td style={{"height":"10px"}}>{i++}</td>
                <td>
                   { observaciones.observaciones}
                </td>
                <td style={{"height":"10px"}}><i className="glyphicon glyphicon-remove" onClick={ ()=>this.remover(observaciones.folio) }></i></td>
            </tr>
            );
        return (
            <table className="table table-bordered" id="mostrar_observaciones_cuestionario">
                <tbody>
                    {r}
                </tbody>
            </table>);
    }
    remover(id) {
        conexion_ajax("servicios/checkListServ.asmx/Eliminar_observaciones", { 'folio': id });
        const f = establecimieto.getFecha.split("-");
        this.checar();
    }
    exportar() {
        if (this.state.datos.length>0)
            tableToExcel('mostrar_observaciones_cuestionario', "observaciones-" + "-" + establecimieto.getNombre);
        else 
            alert("Sin Datos!!!")
    }
    checar() {
        const f = establecimieto.getFecha.split("-");
        const datos = conexion_ajax("servicios/checkListServ.asmx/obtener_observaciones", { 'folio_establecimiento': establecimieto.getId, 'fecha': f[2] + "-" + f[1] + "-" + f[0] });
        obtener_observaciones(datos);
    }
}
class Resultados_ckl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="modal-content">
                <div className="modal-header">
                     <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h3 >Resultados Cuestionarios</h3>
                    {this.resultados() }
                </div>
                <br />
                <div className="modal-body tabla_lideres" style={{"text-aling":"center"}} > 
                   {this.tabla_datos()}
                </div>
                <br />
                <div >
                    <input type="button" value="Exportar" className="btn btn-info btn-block" onClick={ ()=>this.exportar()} />
                </div>
           </div>
        );
    }
    tabla_datos() {
        var i = 0;
        var posicion_cuestionario = 1;
        var cuestionario = "";
        var lista = [];
        var resultados = [];
        const r = this.state.datos.map((res) => {
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
          return <table className="table table-bordered " id="reporte_cuestionarios">
                    <tbody>
                        {lista}
                    </tbody>
                 </table>
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
        this.state = { datos: this.props.datos }

        const si = this.state.datos.filter((res) =>res.rsi == 1).length;
        const no = this.state.datos.filter((res) =>res.rno == 1).length;
        const na = this.state.datos.filter((res) =>res.rna == 1).length;

        return (<span className="marcador_r" style={{"top":"35px","right":"30px"}}>
                <span className="success">SI : {si}</span>
                <span className="danger">NO : {no}</span>
                <span className="info">NA : {na}</span>
                <span>TOTAL : { Math.round(si/ (no+si)*1000)/10 >= 0 ? Math.round(si/ (no+si)*1000)/10 : 0} % </span>
               </span>);
    }
    exportar() {
        if (this.state.datos.length > 0)
            tableToExcel('reporte_cuestionarios', "Reporte-" + "-" + establecimieto.getNombre);
        else
            alert("Sin Datos!!!")
    }

}
        //funcion de renderizado body
        function Render_body_comp() {
            ReactDOM.render(
                <div style={{ "height":"100%"}}>
                    <Agergar_cuestionarios />
                    <Lista_cuestionarios_por_establecimiento />
                </div>,
                document.getElementById("cuerpo")
            );

            ReactDOM.render(
                <Modal_cuestionarios />,
                document.getElementById("modal_cuestionarios")
            );
        }
        //responder Cuestionario
        function responder_cuestionario(cuestionario) {
            ReactDOM.render(
                <Responder_cuestionarios cuestionario={cuestionario} />,
                document.getElementById("modal_resolver_cuestionarios")
            );
        }
        function alerta_ckl(t) {
            ReactDOM.render(
                <Aleta_ckl dato={t} />,
                document.getElementById("modal_resolver_cuestionarios")
            );
        }
        function obtener_observaciones(datos){
           ReactDOM.render(
            <Lista_observaciones datos={datos} />,
            document.getElementById("modal_reporte")
          );
        }
        function resultados_ckl(datos) {
            ReactDOM.render(
                <Resultados_ckl datos={datos} />,
                document.getElementById("modal_reporte")
          );
        }
        //lanzar
        Render_header_comp();
        Render_body_comp();