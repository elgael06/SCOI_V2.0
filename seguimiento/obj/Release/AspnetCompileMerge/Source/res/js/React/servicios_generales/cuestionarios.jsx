

class Servicios extends React.Component {
    constructor(props) {
        super(props);

        //datos
        this.lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
        this.lista_departamentos = conexion_ajax("servicios/servicios_generales/conexiones.asmx/departamentos") || [];
        this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
        this.lista_departamentos_aplica_cuestionario = conexion_ajax("servicios/servicios_generales/conexiones.asmx/departamentos") || [];
        this.lista_datos_cuestionario = [];
        this.servicios_seleccionados = [{folio_zona:1,orden:1,folio_servicio:0}];
        this.seleccionado_filtro = [];
        this.lista_servicios_nombre = [];
        //tablas
        this.cavecera_tabla_cuestionarios = ["Folio", "Cuestionario", "Zona", "Establecimiento", "modificacion", "Estatus",""];
        this.cavecera_tabla_datos_cuestionario = ["#", "ZONA", "ACTIVO", "CRITERIO", "SERVICIO", ""];
        //modal
        this.titulo_modal = "";
        this.titulo_sel_modal = "";
        this.cavecera_tabla_modal = [];
        this.cuerpo_tabla_modal = [];
        this.seleccion_tabla_modal = {folio:0,dato:""};
        //eventos
        this.nuevo = this.on_nuevo.bind(this);
        this.editar = this.on_editar.bind(this);
        this.guardar = this.on_guardar.bind(this);
        this.deshacer = this.on_deshacer.bind(this);
        this.on_cuestionario = this.on_click_cuestionario.bind(this);
        this.cambio_estatus = this.on_cambio_estatus.bind(this);
        this.cambio_departamento = this.on_cambio_departamento.bind(this);
        this.seleccion_establecimiento = this.on_seleccion_establecimiento.bind(this);

        //estados
        this.state = {
            id_cuestionario: 0,
            cuestionario: "",
            estatus: "V",
            id_departamento_aplica_cuestionario:-1,
            edicion: false,
            nuevo: false,
            departamento: 0,
            establecimiento: 0,
            id_zona: 0,
            id_activo: 0,
            id_criterio: 0,
            id_servicio: 0,
            filtro_tabla_modal: "",
            modal_activa: "",
            fila_tabla_seleccionada:null
        }

        this.nom_Zona = "";
        this.nom_activo = "";
        this.nom_criterio = "";
        this.nom_servicio = "";
        this.nom_servicio_detalle = "";
    }
    render() {
        return (
            <div>
                <Botonera nuevo={this.nuevo}
                          editar={this.editar}
                          guardar={this.guardar}
                          deshacer={this.deshacer}
                          class_editar={this.state.edicion}
                          class_nuevo={this.state.nuevo}
                           />
               <br />
               <label>
                     <div style={{"width":"700px","display":"inline-block","margin-left":"20px"}}>
                        <Caja_datos icono={"glyphicon glyphicon-edit"}
                                    titulo={"Cuestionario"}
                                    datos={this.state.cuestionario}
                                    evento={this.on_cuestionario} />
                     </div>
                    <div style={{"width":"250px","display":"inline-block","margin-left":"20px"}}>
                        <Caja_datos_select icono={"glyphicon glyphicon-question-sign"}
                                           titulo={"Estatus"}
                                           seleccion={this.cambio_estatus}
                                           opciones={this.opciones_estatus()} />
                    </div>

                <div style={{"width":"350px","display":"inline-block","margin-left":"20px"}}>
                        <Caja_datos_select icono={"glyphicon glyphicon-question-sign"}
                                           titulo={"Departamento Aplica"}
                                           seleccion={this.cambio_departamento_aplica_cuestionario.bind(this)}
                                           opciones={this.opciones_departamentos_aplica_cuestionario()} />
                </div>
               </label>
                <label>
                    {this.seleccion_zona_establecimiento()}
                </label>
                { this.seleccion_tabla() }
                <Modal_con_tabla id={"modal_"}
                                 titulo_modal={this.titulo_modal}
                                 icono_seleccion={"glyphicon glyphicon-edit"}
                                 titulo_seleccion={this.titulo_sel_modal}
                                 seleccionado={this.seleccion_tabla_modal.dato}
                                 texto_filtro={this.state.filtro_tabla_modal}
                                 evento_filtrar={this.on_filtro_tabla_modal.bind(this)}
                                 cavecera_tabla={this.cavecera_tabla_modal}
                                 lista_tabla={this.cuerpo_tabla_modal}
                                 guardar={this.seleccionar_de_tabla_modal.bind(this)}
                                 deshacer={this.des_seleccionar_de_tabla_modal.bind(this)}
                       />
            </div>
        );
    }
    seleccion_zona_establecimiento() {
        const cuest = this.lista_cuestionarios.filter(d=>d.folio == this.state.id_cuestionario)[0] != undefined ? this.lista_cuestionarios.filter(d=>d.folio == this.state.id_cuestionario)[0] : { folio_establecimiento: 1 };
        if (cuest.folio_departamento == undefined) {
            cuest.folio_departamento = this.state.departamento;
            cuest.folio_establecimiento = this.state.establecimiento;
        }
        var caja = [<Caja_datos icono={"glyphicon glyphicon-edit"}
                                titulo={"Zona"}
                                datos={this.nom_Zona} />];
        if(this.lista_datos_cuestionario.length==0)
            caja.push(<i className="glyphicon glyphicon-search" 
                             data-toggle="modal" data-target="#modal_"
                             onClick={this.on_seleccion_zona.bind(this)}></i>);
        return <div>
                    <div className="cajas_datos_cuestionarios">
                        {caja}
                    </div>
                    <div style={{"width":"40%","display":"inline-block","margin-left":"20px"}}>
                         <Caja_datos_select titulo={"Establecimiento"}
                                            icono={"glyphicon glyphicon-briefcase"}
                                            seleccion={this.seleccion_establecimiento}
                                            opciones={this.opciones_establecimientos()} />
                    </div>
                </div>                                     

    }
    on_nuevo() {
        console.log("nuevo");
        const folio = this.lista_cuestionarios[this.lista_cuestionarios.length-1].folio+1|| 1;
        const dep = this.lista_departamentos[0].folio;
        const est = this.lista_establecimientos[0].folio;

        this.nom_Zona = "";
        this.nom_activo = "";
        this.nom_criterio = "";
        this.nom_servicio = "";
        this.nom_servicio_detalle = "";
        this.lista_datos_cuestionario = [];

        this.setState({
            id_cuestionario:folio,
            edicion: true,
            nuevo:true,
            departamento: 0,
            establecimiento: 0,
        });
    }
    on_editar() {
        if (this.state.id_cuestionario && !this.state.nuevo) {
            this.lista_datos_cuestionario = conexion_ajax("servicios/servicios_generales/conexiones.asmx/datos_cuestionarios", { folio: this.state.id_cuestionario });
            this.servicios_seleccionados = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_por_activos_ckl", { folio: this.state.id_cuestionario });
            this.setState({
                edicion: true,
                nuevo: false,
                estatus: "V",
            });
        } else alert("seleccione Un campo!!!");
    }
    on_guardar() {
        console.log("guardar");
        if (this.lista_datos_cuestionario.length > 0 && this.state.cuestionario.length>0) {
            const cuestionario_dato = this.state.id_cuestionario+ ",'" + this.state.cuestionario + "',"+this.state.id_departamento_aplica_cuestionario +"," + this.state.id_zona + "," + this.state.establecimiento + ",'" + this.state.estatus + "'," + ID_SCOI
            const datos_cuestionarios = this.lista_datos_cuestionario.map(
                (d) => {
                    return d.folio + "," + d.orden + "," + d.folio_zona + "," + d.folio_activo + "," + d.folio_criterio + "," + 0
                });
            const servicio = [];
            console.log(this.servicios_seleccionados);
            this.servicios_seleccionados.sort((a, b) => {
                return a.orden >= b.orden ? 1:-1;
            });
            console.log(this.servicios_seleccionados);
            this.servicios_seleccionados.forEach(
                (dato, index) => {
                    if(index>0)
                        servicio.push(dato.folio_zona + "," + dato.orden + "," + dato.folio_servicio);
                    else {
                        servicio.push(dato.folio_zona + "," + 0 + "," + dato.folio_servicio);
                    }
                })

            const maximo = this.lista_datos_cuestionario[this.lista_datos_cuestionario.length - 1].orden;

            console.log({
                cuestionario: cuestionario_dato + "," + maximo,
                activo: datos_cuestionarios,
                serivicios_por_activo: servicio
            });
          const a = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_guardar", {
                cuestionario: cuestionario_dato + "," + maximo,
                activo: datos_cuestionarios,
                serivicios_por_activo: servicio
            });
            if (a > 0) { 
                alert("Guardado...\n Folio: " + a);
                this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
                this.lista_datos_cuestionario = [];
                this.servicios_seleccionados = [];
                this.on_deshacer();
            }
        } else alert("Sin Datos En Tabla Para Guardar!!!");
    }
    on_deshacer() {
        console.log("deshacer");
        this.servicios_seleccionados = [];
        this.nom_Zona = "";
        this.nom_activo = "";
        this.nom_criterio = "";
        this.nom_servicio = "";
        this.nom_servicio_detalle = "";

        this.lista_datos_cuestionario = [];
        this.setState({
            id_cuestionario: 0,
            cuestionario: "",
            estatus: "V",
            id_departamento_aplica_cuestionario:-1,
            edicion: false,
            nuevo: false,
            departamento: 0,
            establecimiento: 0,
            id_zona: 0,
            id_activo: 0,
            id_criterio: 0,
            id_servicio: 0,
            filtro_tabla_modal: "",
            modal_activa: "",
            fila_tabla_seleccionada: null
        });
    }
    on_tabla_datos_cuestionarios(cuestionario) {
        console.log(cuestionario);
        this.nom_Zona = cuestionario.zona;
        this.setState({
            id_cuestionario: cuestionario.folio,
            cuestionario: cuestionario.cuestionario,
            estatus: cuestionario.estatus,
            id_zona: cuestionario.folio_zona,
            establecimiento: cuestionario.folio_establecimiento,
            id_departamento_aplica_cuestionario: cuestionario.departamento_aplica
        });
    }
    on_click_cuestionario(e) {
        if(this.state.edicion)
            this.setState({ cuestionario: e.target.value });
    }
    on_seleccion_establecimiento(e) {
        const folio = this.lista_datos_cuestionario.length === 0 ? e.target.value : this.state.establecimiento;
        this.setState({
            establecimiento: folio
        });
    }
    on_cambio_estatus(e) {

        this.setState({ estatus: e.target.value });
    }
    on_seleccion_zona() {
        this.lista_Zonas = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_zona") || [];
        console.log("zona");
        //datos Modal
        this.titulo_modal = "Seleccion Zona : ";
        this.titulo_sel_modal = "Zona";
        this.cavecera_tabla_modal = ["Folio", "Zona", "Estatus"];
        this.zona("");

        //asignador de estado
        this.setState({ filtro_tabla_modal: "", modal_activa: "zona" });
    }
    on_cambio_departamento(e) {
        this.setState({
            departamento: e.target.value
        });
    }
    cambio_departamento_aplica_cuestionario(e) {
        this.setState({
            id_departamento_aplica_cuestionario: e.target.value
        });
    }
    on_seleccion_activo() {
        this.lista_activo = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_activos_ckl",
            {
                establecimiento: this.state.establecimiento,
                departamento: this.state.departamento
            }) || [];
        console.info(this.lista_activo);
        console.log("activo");
        //datos Modal
        this.titulo_modal = "Seleccion Activo : ";
        this.titulo_sel_modal = "Activo";
        this.cavecera_tabla_modal = ["folio", "Descripcion", "Fecha", "Estado"];
        this.actividad("");

        this.setState({ filtro_tabla_modal: "", modal_activa: "actividad" });
    }
    on_seleccion_criterios() {
        this.lista_criterios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicio_criterio") || [];
        console.log("criterios");
        //datos Modal
        this.titulo_modal = "Seleccion Criterio : ";
        this.titulo_sel_modal = "Criterio ";
        this.cavecera_tabla_modal = ["Folio", "Criterio", "Estatus"];
        this.criterio("");

        this.setState({ filtro_tabla_modal: "", modal_activa: "criterio" });
    }
    cuestionarios_eliminar(folio_cuestion) {
        if (confirm("Eliminar Cuestionario?\n Al Eliminarlo Se Borrara Tambien Los Criterios Y Respuestas Que Contenga!!")) {
            conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_cuestionarios_eliminar", { folio: folio_cuestion });
            this.lista_cuestionarios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/cuestionarios") || [];
            this.on_deshacer();
        } else console.log("Cancelado Elimnar Folio: " + folio_cuestion);
    }
    on_filtro_tabla_modal(e) {
        const dato = e.target.value;
        if (this.state.modal_activa == "zona") { this.zona(dato) }
        else if (this.state.modal_activa == "criterio") { this.criterio(dato) }
        else if (this.state.modal_activa == "servicio") { this.servicio(dato) }
        else if (this.state.modal_activa == "actividad") { this.actividad(dato) }

        this.setState({ filtro_tabla_modal: dato });
    }
    seleccion_folio_modal(folio) {
    
        this.seleccion_tabla_modal.folio = folio;
        if (this.state.modal_activa == "zona") { this.seleccion_tabla_modal.dato = this.lista_Zonas.filter(dat => dat.folio == folio)[0].nombre || "" }
        else if (this.state.modal_activa == "criterio") { this.seleccion_tabla_modal.dato = this.lista_criterios.filter(dat => dat.folio == folio)[0].nombre || "q" }
        else if (this.state.modal_activa == "servicio") { this.seleccion_tabla_modal.dato = this.lista_servicios.filter(dat => dat.folio == folio)[0].nombre || "q" }
        else if (this.state.modal_activa == "actividad") { this.seleccion_tabla_modal.dato = this.lista_activo.filter(dat => dat.folio == folio)[0].descripcion || "" }
        this.setState({ filtro_tabla_modal: "" });
    }
    seleccionar_de_tabla_modal() {

        console.log("Seleccion Modal");
        const insercion = { filtro_tabla_modal: "", modal_activa: "", fila_tabla_seleccionada: null };

        if (this.state.modal_activa == "zona") {
            this.nom_Zona = this.seleccion_tabla_modal.dato;
            insercion.id_zona = this.seleccion_tabla_modal.folio;
        }
        else if (this.state.modal_activa == "criterio") {
            this.nom_criterio = this.seleccion_tabla_modal.dato;
            insercion.id_criterio = this.seleccion_tabla_modal.folio;
        }
        else if (this.state.modal_activa == "servicio") {
            this.colocar_servicios_en_lista();
            this.seleccionado_filtro = [];
        }
        else if (this.state.modal_activa == "actividad") {
            this.nom_activo = this.seleccion_tabla_modal.dato;
            insercion.id_activo = this.seleccion_tabla_modal.folio;
        }
        this.setState(insercion);
        this.seleccion_tabla_modal = { folio: 0, dato: "" };  
    }
    des_seleccionar_de_tabla_modal() {
        console.log("Deshacer Seleccion Modal");

        this.seleccionado_filtro = [];
        this.seleccion_tabla_modal = { folio: 0, dato: "" };
        this.setState({ filtro_tabla_modal: "", modal_activa: "", fila_tabla_seleccionada: null });
    }
    on_seleccion_servicios() {
        this.lista_servicios = conexion_ajax("servicios/servicios_generales/conexiones.asmx/servicios_detalles_ckl") || [];
        console.log("servicios");
        //datos Modal
        this.titulo_modal = "Seleccion Servicio : ";
        this.titulo_sel_modal = "Servicio ";
        this.cavecera_tabla_modal = ["Seleccion","Folio","Servicio","Detalle","Prioridad"];
        this.servicio("");

        this.setState({ filtro_tabla_modal: "", modal_activa: "servicio" });
    }
    on_agregar_datos_cuestionario_a_tabla() {
        var orden_ = 1
        if(this.lista_datos_cuestionario.length>0)
            orden_ = this.lista_datos_cuestionario[this.lista_datos_cuestionario.length-1].orden+1 || 1; 

        //crear objeto a agregar a tabla
        const objeto = {
            folio: 0,
            orden: orden_,
            folio_cuestionario: this.state.id_cuestionario,
            cuestionario: this.state.cuestionario,
            folio_zona: this.state.id_zona,
            zona: this.nom_Zona,
            folio_activo: this.state.id_activo,
            activo: this.nom_activo,
            folio_criterio: this.state.id_criterio,
            criterio: this.nom_criterio,
            folio_servicio: this.state.id_servicio,
            n_servicio: 0,
            detalle: this.nom_servicio_detalle
        }
        const activo_repetido = this.lista_datos_cuestionario.filter(e=>e.folio_activo == this.state.id_activo && e.folio_zona == this.state.id_zona);
        console.log(activo_repetido);
        console.log(objeto)
        //revisamos que contenga todos los folios
        if (this.state.id_activo > 0 && this.state.id_criterio > 0 && this.state.id_cuestionario > 0  && this.state.id_zona > 0 ) {
            if (activo_repetido.length == 0)
                this.lista_datos_cuestionario.push(objeto);
            else alert("El Activo Ya Se Encuentra En La Tabla...");

            this.nom_activo = "";
            this.nom_criterio = "";
            this.nom_servicio = "";
            this.nom_servicio_detalle = "";
            this.seleccionado_filtro = [];

            this.setState({
                id_activo: 0,
                id_criterio: 0,
                fila_tabla_seleccionada: null
            });
        } else alert("Fata seleccionar un Campo!!!");
    }
    on_mover_datos_cuestionario_en_tabla(mover) { //BASE DEL PENDIENTE
        if (this.state.fila_tabla_seleccionada != null) {
            const previo = this.lista_datos_cuestionario.indexOf(this.state.fila_tabla_seleccionada);
            const nuevo = previo + mover;
            
            if (nuevo >= 0 && nuevo < this.lista_datos_cuestionario.length) {
                //asigna las nuevas posiciones cuestionarios
                this.lista_datos_cuestionario[previo] = this.lista_datos_cuestionario[nuevo];
                this.lista_datos_cuestionario[nuevo] = this.state.fila_tabla_seleccionada;
                //asigna las nuevas posiciones a servicios
                const seleccionados_previos = this.servicios_seleccionados.filter(
                    elemento=> {
                        if (elemento.folio_zona === this.lista_datos_cuestionario[previo].folio_zona && elemento.orden === this.lista_datos_cuestionario[previo].orden) {
                            elemento.orden = previo + 1;
                        } else if (elemento.folio_zona === this.lista_datos_cuestionario[nuevo].folio_zona && elemento.orden === this.lista_datos_cuestionario[nuevo].orden) {
                            elemento.orden = nuevo + 1;
                        }
                        return (elemento.folio_zona === this.lista_datos_cuestionario[previo].folio_zona && elemento.orden === this.lista_datos_cuestionario[previo].orden) ||
                                (elemento.folio_zona === this.lista_datos_cuestionario[nuevo].folio_zona && elemento.orden === this.lista_datos_cuestionario[nuevo].orden)
                    });
                //filtramos los elementos de servicios omitiemdo los de cambio
                this.servicios_seleccionados = this.servicios_seleccionados.filter(
                    elemento=> !((elemento.folio_zona === this.lista_datos_cuestionario[previo].folio_zona && elemento.orden === this.lista_datos_cuestionario[previo].orden) ||
                                (elemento.folio_zona === this.lista_datos_cuestionario[nuevo].folio_zona && elemento.orden === this.lista_datos_cuestionario[nuevo].orden)));

                this.servicios_seleccionados = seleccionados_previos.concat(this.servicios_seleccionados);
                //da el nuevo orden a los activos
                this.lista_datos_cuestionario = this.lista_datos_cuestionario.map(
                    (elemento) => {
                        elemento.orden = this.lista_datos_cuestionario.indexOf(elemento) + 1;
                        return elemento;
                    });
                this.setState({ fila_tabla_seleccionada: this.lista_datos_cuestionario[nuevo] });
            }
        }
        else alert("Seleccione Una Fila Para Desplazar!!!");
    }
    on_seleccion_fila_datos(dato) {

        this.seleccionado_filtro = this.servicios_seleccionados.filter(
            est=> est.folio_zona == dato.folio_zona && est.orden == dato.orden);

        this.setState({ fila_tabla_seleccionada :dato});
    }

    seleccion_tabla() {
        if (!this.state.edicion )
            return <div className="tabla_matriz">{this.tabla_cuestionarios()}</div>;
        else
            return [this.selector_datos(),<div className="tabla_matriz">{this.tabla_datos_cuestionario()}</div>];
    }
    opciones_estatus() {
        if (this.state.estatus == "V") {
            return [
                <option selected="" value="V">Vigente</option>,
                <option value="C" >Cancelado</option>
            ];
        } else if(this.state.estatus == "C")
            return [
            <option value="V">Vigente</option>,
            <option selected="" value="C">Cancelado</option>
            ];
    }
    opciones_departamento() {
        return this.lista_departamentos_aplica_cuestionario.map(
            elemento=> <option value={elemento.folio} > {elemento.nombre} </option>);
    }
    opciones_departamentos_aplica_cuestionario() {
        const aplica = (folio) => folio == this.state.id_departamento_aplica_cuestionario;
        const r = this.lista_departamentos_aplica_cuestionario.map((e) => {
            return  <option selected={aplica(e.folio)} key={e.folio} value={e.folio}> { e.nombre }</option>
        });
        return[ <option selected={aplica(0)} key="0" value="0"> ----</option>  , r];
    }
    opciones_establecimientos() {
        const aplica = (folio) => folio == this.state.establecimiento;
        const r = this.lista_establecimientos.map(
            (e) => {
                return  <option  selected={aplica(e.folio)} value={e.folio}> { e.nombre }</option>
            });
        return r;
    }
    tabla_cuestionarios() {
        return  <Tabla cavecera={this.cavecera_tabla_cuestionarios}
                       datos={this.datos_cuestionarios()} />
    }
    datos_cuestionarios() {

        const r = this.lista_cuestionarios.map(
            cuestionario=> 
                <tr onClick={ ()=>this.on_tabla_datos_cuestionarios(cuestionario)}>
                    <td>{cuestionario.folio}</td>
                    <td>{cuestionario.cuestionario}</td>
                    <td>{cuestionario.zona}</td>
                    <td>{cuestionario.establecimiento}</td>
                    <td>{cuestionario.modificacion}</td>
                    <td>{cuestionario.estatus =="V"?"VIGENTE":'CANCELADO'}</td>
                   <td><input type="button" 
                              className="btn btn-danger" 
                              value="Eliminar"
                              onClick={ ()=>this.cuestionarios_eliminar(cuestionario.folio)} /></td>
                </tr>
            );
        return r;
    }
    selector_datos() {
        const tabla = <div>
                        <div style={{"width":"40%","display":"inline-block","margin-left":"20px"}}>
                            <Caja_datos_select icono={"glyphicon glyphicon-tasks"}
                                               titulo={"Departamento"}
                                               seleccion={this.cambio_departamento}
                                               opciones={this.opciones_departamento()} />
                        </div>
                        <div className="cajas_datos_cuestionarios">
                            <Caja_datos icono={"glyphicon glyphicon-edit"}
                                        titulo={"Activo"}
                                        datos={this.nom_activo} />
                            <i className="glyphicon glyphicon-search"
                               data-toggle="modal" data-target="#modal_"
                               onClick={this.on_seleccion_activo.bind(this)}></i>
                        </div>
                        <div className="cajas_datos_cuestionarios" style={{"width":"90%"}}>
                            <Caja_datos icono={"glyphicon glyphicon-edit"}
                                        titulo={"Criterio"}
                                        datos={this.nom_criterio} />
                            <i className="glyphicon glyphicon-search"
                                   data-toggle="modal" data-target="#modal_"
                                   onClick={this.on_seleccion_criterios.bind(this)}></i>
                        </div>
                        <input type="button" 
                                value="Agregar Datos A Cuestionario" 
                                className="btn btn-success "
                                onClick={this.on_agregar_datos_cuestionario_a_tabla.bind(this)} />
                        <input type="button"
                               value="Subir"
                               className="btn btn-default "
                               onClick={ ()=>this.on_mover_datos_cuestionario_en_tabla(-1)} />
                        <input type="button"
                               value="Bajar"
                               className="btn btn-default "
                               onClick={ ()=>this.on_mover_datos_cuestionario_en_tabla(1)} />
                        <i className="fa fa-cogs"
                            data-toggle="modal" data-target="#modal_"
                            onClick={() =>this.on_seleccion_servicios()}> Servicios.</i>
                      </div>

        return tabla;
    }
    servicios_datos_cuestionario() {
        const r = this.lista_datos_cuestionario.map(
            dato => <tr key={dato.orden} className={ this.state.fila_tabla_seleccionada==dato?"tabla_seleccionada":"" } 
                        onClick={ ()=>this.on_seleccion_fila_datos(dato)}>
                        <td>{dato.orden}</td>
                        <td>{dato.zona}</td>
                        <td>{dato.activo}</td>
                        <td>{dato.criterio}</td>
                        <td style={{'text-align':'center'}}
                            onClick={()=>this.ver_servicios_lista_dropdown(dato)}>
                             <Botones_dropdown titulo={dato.n_servicio}
                                opciones_menu={this.lista_servicios_nombre} />
                        </td>
                        <td>
                            <input type="button" 
                                   className="btn btn-danger" 
                                   value="Eliminar"
                                   onClick={ ()=>this.eliminar_de_tabla_datos_cuestionario(dato)} />
                        </td>
            </tr>
            );

        return r;
    }
    ver_servicios_lista_dropdown(elemento) {
        console.log(elemento);
        this.datos_vista_servicios();
    }
    datos_vista_servicios() {

        const datos = [];
        this.lista_servicios_nombre = datos.map(
            elemento=>{
                console.log(elemento.folio+":"+this.activo.folio)
                if (elemento.folio == this.activo.folio) {
                    return <div  style={{'height':'40px'}} key={elemento.folio}>
                                {elemento.observacion}
                   </div>}
        }) || ["Sin Datos..."];
    }
    eliminar_de_tabla_datos_cuestionario(dato) {//PENDIENTE
        //se selecciona la posicionde dato para eliminar
        const eliminar = this.lista_datos_cuestionario.indexOf(dato);
        this.lista_datos_cuestionario.splice(eliminar, 1);
                
        //filtramos los elementos de servicios omitiemdo el eliminado
        this.servicios_seleccionados = this.servicios_seleccionados.filter(
            elemento=> !(elemento.folio_zona === dato.folio_zona && elemento.orden === dato.orden));

        //recorremos lista de datos cuestionarios para asignar orden
        this.lista_datos_cuestionario.length
        this.lista_datos_cuestionario = this.lista_datos_cuestionario.map(
            (elemento) => {
                //lo mismo para la lista de servicios
                this.servicios_seleccionados = this.servicios_seleccionados.map(
                            (dat) => {
                                if (dat.orden == elemento.orden && dat.folio_zona == elemento.folio_zona) {
                                    dat.orden = this.lista_datos_cuestionario.indexOf(elemento) + 1; }
                                return dat;
                            });
                elemento.orden = this.lista_datos_cuestionario.indexOf(elemento) + 1;
                return elemento;
            });
        console.log(this.servicios_seleccionados);

        this.seleccionado_filtro = [];
        this.setState({ filtro_tabla_modal: "", fila_tabla_seleccionada:null });
    }
    tabla_datos_cuestionario() {
        return  <Tabla cavecera={this.cavecera_tabla_datos_cuestionario}
                       datos={this.servicios_datos_cuestionario()} />
    }
    //tablas de modal
    zona(filtro) {
        const dato = this.lista_Zonas.filter(
            zona=> zona.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0
            );
        this.cuerpo_tabla_modal = dato.map(
        (zona) => {
            return <tr onClick={ ()=>this.seleccion_folio_modal(zona.folio)}>
                <td>{zona.folio}</td>
                <td>{zona.nombre}</td>
                <td>{zona.estatus=="V"?"Vigente":"Cancelado"}</td>
            </tr>
        });
    }
    actividad(filtro) {
        const dato = this.lista_activo.filter(
            activo => activo.descripcion.toUpperCase().search(filtro.toUpperCase()) >= 0
            );
        this.cuerpo_tabla_modal = dato.map(
           (activo) => {
               return <tr onClick={ ()=>this.seleccion_folio_modal(activo.folio)}>
                    <td>{activo.folio}</td>
                    <td>{activo.descripcion}</td>
                    <td>{activo.fecha}</td>
                    <td>{activo.caracteristicas}</td>
            </tr>
           });
    }
    criterio(filtro) {
        const dato = this.lista_criterios.filter(
            criterio=>criterio.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0
            );
        this.cuerpo_tabla_modal = dato.map(
            (criterio) => {
                return <tr onClick={ ()=>this.seleccion_folio_modal(criterio.folio)}>
                    <td>{criterio.folio}</td>
                    <td>{criterio.nombre}</td>
                    <td>{criterio.estatus=="V"?"Vigente":"Cancelado"}</td>
            </tr>
            });
    }
    servicio(filtro) {
        const dato = this.lista_servicios.filter(
            servicios=>servicios.nombre.toUpperCase().search(filtro.toUpperCase()) >= 0);
        this.cuerpo_tabla_modal = dato.map(
            (activos) => {
                const folio = activos.folio;
                return <tr onClick={ ()=>this.seleccion_folio_modal(activos.folio)}>
                    <td>
                        <input type="checkbox"
                               onClick={ ()=>this.checar_servicio_seleccionado(activos.folio)}
                               checked={ this.seleccionado_filtro.filter( e=>e.folio_servicio == folio).length > 0 }         
                        />
                    </td>
                    <td>{activos.folio}</td>
                    <td>{activos.nombre}</td>
                    <td>{activos.detalle}</td>
                    <td>{activos.prioridad}</td>
            </tr>
        });
    }
    checar_servicio_seleccionado(filtro) {
        const filla = this.state.fila_tabla_seleccionada;
        console.log(filla);
        const posicion = this.seleccionado_filtro.find(d=> d.folio_servicio == filtro);
        console.log(posicion);
        if (filla != null) {
            if (posicion == undefined)
                this.seleccionado_filtro.push({
                    folio_servicio: filtro,
                    orden: filla.orden,
                    folio_zona: filla.folio_zona
                });
            else {
                this.seleccionado_filtro = this.seleccionado_filtro.filter(
                    elemento =>  elemento != posicion);
            }
            console.log(this.seleccionado_filtro)
            this.servicio(this.state.filtro_tabla_modal);
            this.setState({ fila_tabla_seleccionada: filla });
        } else alert("No Seleciono Activo Para Servicio!!!");
    }
    colocar_servicios_en_lista() {
        console.log("colocar Servicios:");
        const seleccion = this.state.fila_tabla_seleccionada;

        this.servicios_seleccionados = this.servicios_seleccionados.filter(
            elemento => !(elemento.folio_zona == seleccion.folio_zona && elemento.orden == seleccion.orden) );

        this.seleccionado_filtro.forEach((item)=>{
                this.servicios_seleccionados.push(item);
        });

        this.lista_datos_cuestionario = this.lista_datos_cuestionario.map(
            (servicio) => {
                if (servicio.folio_zona == seleccion.folio_zona && servicio.orden == seleccion.orden)
                    servicio.n_servicio = this.seleccionado_filtro.length;

                return servicio;
            });
    }
}
ReactDOM.render(
    <Servicios />,
    document.getElementById("contenedor")
    );
