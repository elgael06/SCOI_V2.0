class Asignar extends React.Component {
    constructor(props) {
        super(props);
        //datos
        this.lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
        this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
        this.lista_aplicadores = conexion_ajax("servicios/checkListServ.asmx/obtener_lideres", { "tienda": "todos" }) || [];
        this.modal_activa = "";
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        this.cuerpo_tabla_modal = [];
        this.asignados_a_eliminar = [];
        this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento",
            {
                folio: this.lista_establecimientos[0].folio
            }) ||[];
        this.cavecera_tabla_de_modal = [];
        this.titulo_modal = "";
        this.titulo_seleccion = "";
        this.posicion_seleccionado = 0;
        this.state = {
            edicion: false,
            nuevo: false,
            filtro_tabla_modal: "",
            folio:0,
            folio_cuestionario:0,
            cuestionario: "",
            folio_establecimiento: this.lista_establecimientos[0].folio,
            establecimiento: this.lista_establecimientos[0].nombre,
            estatus: "V",
            fecha: this.fecha_hoy(),
            fecha2: this.fecha_hoy(),
            id_aplicador:0,
            aplicador:""
        };
    }
    render() {
        return(<div>
                  <Botonera nuevo={this.nuevo.bind(this)}
                            editar={this.editar.bind(this)}
                            guardar={this.guardar.bind(this)}
                            deshacer={this.deshacer.bind(this)}
                            class_editar={this.state.edicion}
                            class_nuevo={this.state.nuevo} />
                <br />
               <label>
                   {this.componente_establecimiento()}
                   <div style={{"display":"inline-block","margin-left":"20px"}}>
                        <div style={{"width":"220px","display":"inline-block"}}>
                            <Caja_datos_select icono={"glyphicon glyphicon-question-sign"}
                                               titulo={"Estatus"}
                                               seleccion={this.cambio_estatus.bind(this)}
                                               opciones={this.opciones_estatus()} />
                        </div>
                       <label>
                           <Caja_fecha fecha={this.state.fecha}
                                       evento={this.on_fecha.bind(this)} />
                           <Caja_fecha fecha={this.state.fecha2}
                                       evento={this.on_fecha2.bind(this)} />
                       </label>
                   </div>
                   <div style={{"width":"75%","display":"inline-block","margin-left":"20px"}}>
                        <Caja_datos icono={"glyphicon glyphicon-edit"}
                                    titulo={"Cuestionario"}
                                    datos={this.state.cuestionario} />
                         <i className="glyphicon glyphicon-search"
                            data-toggle="modal" data-target="#modal_"
                            onClick={this.seleccionar_de_tabla_modal_cuestionario.bind(this)}></i>
                   </div>
                   
                   <div style={{"width":"75%","display":"inline-block","margin-left":"20px"}}>
                        <Caja_datos icono={"glyphicon glyphicon-user"}
                                    titulo={"Aplicador"}
                                    datos={this.state.aplicador} />
                         <i className="glyphicon glyphicon-search"
                            data-toggle="modal" data-target="#modal_"
                            onClick={this.seleccionar_de_tabla_modal_aplicador.bind(this)}></i>
                   </div>
                </label>
             
                {this.boton_editar()}
                  <div className="tabla_matriz">
                    <Tabla cavecera={["Cuestionario","Departamento","Evaluador","Inicio","Termino","Estatus",""]}
                           datos={this.datos_cuestionarios()} />
                </div>
               <Modal_con_tabla id={"modal_"}
                                titulo_modal={this.titulo_modal}  
                                icono_seleccion={"glyphicon glyphicon-edit"}
                                titulo_seleccion={this.titulo_seleccion}
                                seleccionado={this.seleccion_tabla_modal.dato}
                                texto_filtro={this.state.filtro_tabla_modal}
                                evento_filtrar={this.on_filtro_tabla_modal.bind(this)}
                                cavecera_tabla={this.cavecera_tabla_de_modal}
                                lista_tabla={this.cuerpo_tabla_modal}
                                guardar={this.seleccionar_de_tabla_modal.bind(this)}
                                deshacer={this.des_seleccionar_de_tabla_modal.bind(this)} />
                </div>);
    }
    componentes_dias() {
        return    <div className="contenedor_dias">
                    <label className="checkbox-inline"><input type="checkbox" value="" />Domingo</label>
                    <label className="checkbox-inline"><input type="checkbox" value="" />Lunes</label>
                    <label className="checkbox-inline"><input type="checkbox" value="" />Martes</label> 
                    <label className="checkbox-inline"><input type="checkbox" value="" />Miercoles</label>
                    <label className="checkbox-inline"><input type="checkbox" value="" />Jueves</label>
                    <label className="checkbox-inline"><input type="checkbox" value="" />Viernes</label> 
                    <label className="checkbox-inline"><input type="checkbox" value="" />Sabado</label> 
                </div>

    }
    componente_establecimiento() {
        if( this.state.nuevo || !this.state.edicion )
        return <div style={{"width":"20%","display":"inline-block","margin-left":"20px"}}>
                         <Caja_datos_select titulo={""}
                                            icono={"glyphicon glyphicon-briefcase"}
                                            seleccion={this.on_seleccion_establecimiento.bind(this)}
                             opciones={this.opciones_establecimientos()} />
                </div>
        else return <div style={{"width":"20%","display":"inline-block","margin-left":"20px"}}>
                        <h3>Establecimiento : {this.state.establecimiento}</h3>
                    </div>
    }
    boton_editar(){
        if( this.state.edicion)
        return <input type="button" className="btn btn-success btn-block" value="Agregar" onClick={this.agregar_a_tabla.bind(this)} />
    }
    //acciones de botonera
    nuevo() {
        console.log("nuevo");
        this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
        this.posicion_seleccionado = this.lista_cuestionarios_asignados.length
        if (this.posicion_seleccionado == 0)
            this.setState({ folio: 0, edicion: true, nuevo: true });
        else alert(" El Establecimiento\n \"Ya Tiene Campos\"");
    }
    editar() {
        console.log("editar");
        this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
        this.posicion_seleccionado = this.lista_cuestionarios_asignados.length+1;
        if (this.posicion_seleccionado > 1)
            this.setState({ edicion: true, nuevo: false });
        else alert("De En \"Nuevo\" \n ParaAgregar Datos Por Primera Vez!!!");
    }
    guardar() {
        if (this.state.edicion) {
            if (this.lista_cuestionarios_asignados.length > 0) {
                console.log("guardar");
                //folio,folio_cuestionario,folio_establecimiento,id_usuario,inicio,termino,estatus
                const datos_a_enviar = [];
                var validar_fecha = 0;
                const datos_error = [];
                const auxiliar =  this.lista_cuestionarios_asignados

                auxiliar.map(
                    asignado=> {
                        asignado.estatus = asignado.estatus == 'Cancelado' ? "C" : "V";
                        datos_a_enviar.push(
                            asignado.folio + "," +
                            asignado.folio_cuestionario + "," +
                            this.state.folio_establecimiento + "," +
                            asignado.id_aplicador + ",'" +
                            asignado.inicio + "','" +
                            asignado.termino + "'," +
                            asignado.estatus
                            );
                        if (this.fecha_hoy() > asignado.inicio && asignado.inicio < asignado.termino ) {
                            datos_error.push(asignado.folio + "," +
                            asignado.folio_cuestionario + "," +
                            this.state.folio_establecimiento + "," +
                            asignado.id_aplicador + ",'" +
                            asignado.inicio + "','" +
                            asignado.termino + "'," +
                            asignado.estatus);
                        }
                        return asignado;
                    });
                console.log(datos_a_enviar);
                console.log(this.asignados_a_eliminar);
                this.asignados_a_eliminar.push(0);
                console.log(validar_fecha);
                //enviar datos
                if ( datos_error.length ==0) {
                    var a = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_guardar_asignados_cuestionario",
                        {
                            datos: datos_a_enviar,
                            eliminar: this.asignados_a_eliminar
                        }) || [];
                    if (a.length > 0) {
                        var b = "";
                        a.map(r=> { b += r.respuesta + '\n'; return r })
                        alert("Guardado...\n" + b);
                        console.log(a);
                        this.deshacer();
                    }
                } else {
                    alert("Falta Validar La fecha De Uno o mas Campos!!!")
                    console.log("Error:");
                    console.log(datos_error);

                }
            }else alert("Coloque Datos En La Tabla Para Guardar!!!")
        } else alert("Edicion \"desactivada\" ");
    }
    deshacer() {
        console.log("deshacer");
        this.setState({
            edicion: false,
            nuevo: false,
            filtro_tabla_modal: "",
            folio: 0,
            folio_cuestionario: 0,
            cuestionario: "",
            folio_establecimiento: this.lista_establecimientos[0].folio,
            establecimiento: this.lista_establecimientos[0].nombre,
            estatus: "V",
            fecha: this.fecha_hoy(),
            fecha2: this.fecha_hoy(),
            id_aplicador: 0,
            aplicador: ""
        });
        this.asignados_a_eliminar = [];
        this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento",
            {
                folio: this.lista_establecimientos[0].folio
            }) || [];
    }
    agregar_a_tabla() {

        var estado = this.state.estatus == "C" ? "Cancelado" : "Vigente";
        // estado = !(this.fecha_hoy() >= this.state.fecha && this.fecha_hoy() <= this.state.fecha2 && this.state.estatus == "V") ? "Previo" : estado;
        console.log(this.state);
        console.log(this.fecha_hoy());
        console.log(this.checar_fecha());
        if (this.fecha_hoy() <= this.state.fecha && this.state.fecha <= this.state.fecha2 && this.checar_fecha()) {
            if (this.state.folio_cuestionario > 0 && this.state.id_aplicador > 0) {
                    console.log( this.posicion_seleccionado )
                    this.lista_cuestionarios_asignados[this.posicion_seleccionado]={
                        folio: this.state.folio,
                        folio_cuestionario: this.state.folio_cuestionario,
                        cuestionario: this.state.cuestionario,
                        departamento: this.lista_cuestionarios.filter(e=>e.folio == this.state.folio_cuestionario)[0].departamento,
                        id_aplicador: this.state.id_aplicador,
                        aplicador: this.state.aplicador,
                        inicio: this.state.fecha,
                        termino: this.state.fecha2,
                        estatus: estado
                    };
                    console.log(this.lista_cuestionarios_asignados);
                    this.setState({
                        folio: 0,
                        folio_cuestionario: 0,
                        cuestionario: "",
                        estatus: "V",
                        fecha: this.fecha_hoy(),
                        fecha2: this.fecha_hoy(),
                        id_aplicador: 0,
                        aplicador: ""
                    });
                    this.posicion_seleccionado = this.lista_cuestionarios_asignados.length + 1;
                } else alert("Falta Seleccion Datos!!!");
            } else alert("Error En Las Fechas");
    }
    eliminar_de_tabla_datos_cuestionarios(dato) {
        if (this.state.edicion) { 
        const posicion = this.lista_cuestionarios_asignados.indexOf(dato);
        console.log("Dato Eliminado De Posicion :" + posicion);
        this.lista_cuestionarios_asignados.splice(posicion, 1);

        this.setState({
            filtro_tabla_modal: "",
            folio_cuestionario: 0,
            cuestionario: "",
            estatus: "V",
            fecha: this.fecha_hoy(),
            fecha2: this.fecha_hoy(),
            id_aplicador: 0,
            aplicador: ""
        });

        this.posicion_seleccionado = this.lista_cuestionarios_asignados.length + 1;

        if (dato.folio>0)
            this.asignados_a_eliminar.push(dato.folio);
        console.log(this.asignados_a_eliminar);

        } else alert("Edicion Deshabilitada!!!")
    }
    //eventos de modal globales
    seleccionar_de_tabla_modal() {
        if(this.modal_activa == "cuestionario")
            this.seleccionar_cuestionario();
        else 
            if (this.modal_activa == "aplicador") {
                this.seleccionar_aplicador();
            }
    }
    des_seleccionar_de_tabla_modal() {
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        this.setState({ filtro_tabla_modal: "" });
    }
    //eventos modal cuestionarios
    seleccion_cuestionario(cuestionario) {
        console.log(cuestionario);
        console.log(this.state);
        this.seleccion_tabla_modal = { folio: cuestionario.folio, dato: cuestionario.cuestionario };
        this.setState({ filtro_tabla_modal: "" });
    }
    seleccion_aplicador(aplicador) {
        console.log(aplicador);
        console.log(this.state);
        this.seleccion_tabla_modal = { folio: aplicador.folio, dato: aplicador.nombre };
        this.setState({ filtro_tabla_modal: "" });
    }
    seleccionar_de_tabla_modal_cuestionario() {
        console.log("Seleccion Cuestionario");
        this.modal_activa = "cuestionario";
        this.titulo_modal = "Seleccion Cuestionario";
        this.titulo_seleccion = "Seleccion Cuestionario";
        this.cavecera_tabla_de_modal = ["folio", "Cuestionario", "Departamento", "Estatus"]
        this.crear_tabla_modal("");

        this.setState({ filtro_tabla_modal: "", folio_cuestionario: this.seleccion_tabla_modal.folio, cuestionario: this.seleccion_tabla_modal.dato });
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
    }
    seleccionar_de_tabla_modal_aplicador() {
        console.log("Seleccion Aplicador");
        this.modal_activa = "aplicador";
        this.titulo_modal = "Seleccion Aplicador";
        this.titulo_seleccion = "Seleccion Aplicador";
        this.cavecera_tabla_de_modal = ["folio", "Nombre", "Puesto"]
        this.crear_tabla_modal("");

        this.setState({ filtro_tabla_modal: ""});
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
    }
    seleccionar_cuestionario() {
        this.setState({ filtro_tabla_modal: "", folio_cuestionario: this.seleccion_tabla_modal.folio, cuestionario: this.seleccion_tabla_modal.dato });
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
    }
    seleccionar_aplicador() {
        this.setState({ filtro_tabla_modal: "", id_aplicador: this.seleccion_tabla_modal.folio, aplicador: this.seleccion_tabla_modal.dato });
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
    }
    //eventos de cambio ventana principal
    on_seleccion_establecimiento(e) {
        this.setState({
            folio_establecimiento: e.target.value,
            establecimiento: this.lista_establecimientos.filter(est=>est.folio == e.target.value)[0].nombre,
        });
        this.lista_cuestionarios_asignados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_asignados_vista_por_establecimiento", { folio: e.target.value });
    }
    on_fecha(e) {
        const f = e.target.value.split("-");
        console.log(f);
        this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0] });
    }
    on_fecha2(e) {
        const f = e.target.value.split("-");
        console.log(f);
        this.setState({ fecha2: f[2] + "/" + f[1] + "/" + f[0] });
    }
    checar_fecha() {
        var estado = false;
        if (this.state.fecha != "undefined/undefined/") {
            if (this.state.fecha2 != "undefined/undefined/") {
                estado = true;
            }
        }
        return estado;
    }
    cambio_estatus(e) {
        this.setState({ estatus: e.target.value });
    }
    on_filtro_tabla_modal(e) {
        this.crear_tabla_modal(e.target.value);
        this.setState({ filtro_tabla_modal: e.target.value });
    }
    seleccionar_cuestionario_de_tabla(cuestionario_seleccionado) {
        console.log(cuestionario_seleccionado);
        console.log(this.lista_cuestionarios_asignados);

        this.posicion_seleccionado = this.lista_cuestionarios_asignados.indexOf(
                            this.lista_cuestionarios_asignados.filter(
                                elemento =>elemento == cuestionario_seleccionado)[0] );
        console.log("posicion:" + this.posicion_seleccionado);
        this.setState({
            folio:cuestionario_seleccionado.folio,
            folio_cuestionario: cuestionario_seleccionado.folio_cuestionario,
            cuestionario: cuestionario_seleccionado.cuestionario,
            estatus: cuestionario_seleccionado.estatus=="C"?"Cancelado":"Vigente",
            fecha: cuestionario_seleccionado.inicio,
            fecha2: cuestionario_seleccionado.termino,
            id_aplicador: cuestionario_seleccionado.id_aplicador,
            aplicador: cuestionario_seleccionado.aplicador
        });
    }
    //funciones de datos
    crear_tabla_modal(filtro) {
        if (this.modal_activa == "cuestionario")
            this.tabla_cuestionarios(filtro);
        else
            if (this.modal_activa == "aplicador") {
                this.tabla_aplicadores(filtro);
    }
    }
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);

        return dia + '/' + mes + '/' + d.getFullYear();
    }
    //funciones de creacion de componentes
    opciones_estatus() {
            return [<option selected={this.state.estatus == "V"} value="V">Vigente</option>,
                   <option selected={this.state.estatus == "C"} value="C">Cancelado</option>]
    }
    opciones_establecimientos() {
        const r = this.lista_establecimientos.map(
            (e) => {
                return  <option  selected={e.folio==this.state.folio_establecimiento} value={e.folio}> { e.nombre }</option>
            });
        return r;
    }
    //componentes de tablas
    tabla_cuestionarios(filtro) {
        const filtro_tabla = this.lista_cuestionarios.filter(
            (elemento) => {
                return elemento.cuestionario.toUpperCase().search(filtro.toUpperCase()) >= 0 && elemento.folio_establecimiento == this.state.folio_establecimiento
            });
        console.log(filtro_tabla);
        console.log(this.state.folio_establecimiento);

        this.cuerpo_tabla_modal = filtro_tabla.map(
            e=> <tr onClick={ ()=>this.seleccion_cuestionario(e)}>
                   <td>{e.folio}</td>
                   <td>{e.cuestionario}</td>
                   <td>{e.departamento}</td>
                   <td>{e.estatus=="V"?"Vigente":"Cancelado"}</td>
                </tr>);
    }
    tabla_aplicadores(filtro) {
        const filtro_tabla = this.lista_aplicadores.filter(
            (elemento) => {
                return elemento.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0
            });
        this.cuerpo_tabla_modal = filtro_tabla.map(
            e=><tr onClick={ ()=>{this.seleccion_aplicador(e)}}>
                    <td>{e.folio}</td>
                    <td>{e.nombre}</td>
                    <td>{e.puesto}</td>
               </tr>);
    }
    datos_cuestionarios() {
        console.log("Asignados");
        const r = this.lista_cuestionarios_asignados.map(
            //
            e=> <tr onClick={ ()=>{this.seleccionar_cuestionario_de_tabla(e)}}>
                    <td>{e.cuestionario}</td>
                    <td>{e.departamento}</td>
                    <td>{e.aplicador}</td>
                    <td>{e.inicio}</td>
                    <td>{e.termino}</td>
                    <td>{e.estatus}</td>
                    <td><i className="glyphicon glyphicon-remove red" onClick={()=>{this.eliminar_de_tabla_datos_cuestionarios(e)}}></i></td>
                </tr>);
        return r;
    }
}

ReactDOM.render(
    <Asignar />,
    document.getElementById("contenedor")
    );