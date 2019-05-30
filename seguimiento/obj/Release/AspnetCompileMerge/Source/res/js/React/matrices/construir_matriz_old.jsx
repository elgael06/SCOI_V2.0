
class Botonera extends React.Component {
    constructor(props) {
        super(props);
        this.buscar = this.props.buscar;
        this.guardar = this.props.guardar;
        this.editar = this.props.editar;
        this.deshacer = this.props.deshacer;
        this.nuevo = this.props.nuevo;
    }
    render() {
        return(
            <div className="btn-group">
                <input type="button" value="Buscar" className="btn btn-primary" data-toggle="modal" data-target="#modal" onClick={ this.buscar}  />
                <input type="button" value="Nuevo" className="btn btn-primary" onClick={ this.nuevo} />
                <input type="button" value="Editar" className="btn btn-primary" onClick={  this.editar} />
                <input type="button" value="Guardar" className="btn btn-primary" onClick={  this.guardar} />
                <input type="button" value="Deshacer" className="btn btn-primary" onClick={ this.deshacer} />
            </div>
        );
    }
}
class Btn_seleccion extends React.Component {
    constructor(props) {
        super(props);
        this.guardar = this.props.guardar;
        this.deshacer = this.props.deshacer;
    }
    render() {
        return(
                <div className="btn-group">
                    <input type="button" value="Listo" className="btn btn-success" data-dismiss="modal" onClick={ this.guardar} />
                    <input type="button" value="Deshacer" className="btn btn-danger" data-dismiss="modal" onClick={ this.deshacer} />
                </div>
            );
    }
}
class Caja_datos extends React.Component {
    render() {
        const titilo = this.props.titilo;
        const icono = this.props.icono;
        const caja = this.props.datos;
        return(
            <div className="input-group" >
                <span className="input-group-addon"><i className={icono}></i> {titilo} </span>
                  {caja}
              </div>
            );
    }
}
class Tabla extends React.Component {
    render() {
        const cavecera = this.props.cavecera;
        const datos = this.props.datos;
        return(
            <table className="table table-bordered ">
                <thead className="cavecera_tabla" >
                {this.cavecera_tabla(cavecera)}
                </thead>
                <tbody>
                    {datos}
                </tbody>
            </table>
            );
    }
    cavecera_tabla(dat) {
        const r = dat.map((e) => <th>{e}</th>);
        return ( <tr className="success">{r}</tr> );
    }
}
class Modal extends React.Component {
    render() {
        const id_modal = this.props.id;
        const cavecera = this.props.cavecera || <h3>Sin datos</h3>;
        const cuerpo = this.props.cuerpo || <h3>Sin datos</h3>;
        return (
            <div id={id_modal} className="modal fade" role="dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        {cavecera}
                    </div>
                    <div className="modal-body">
                        {cuerpo}
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
         );
    }
}
class Modal_con_tabla extends React.Component {
    /*** seleccionado,titulo,fn guardar,fn deshacer,cavecera "tabla",lista    "tabla"***/
    render() {
        const texto = (<Caja_texto_modal estatus={true} 
                                         valor={this.props.seleccionada.nombre }  
                                         />);
        const titulo = <h3> {this.props.titulo}</h3>;
        const caja_filtro = <input type="text" 
                                   className="form-control" 
                                   value={this.props.texto_filtro} 
                                   onChange={this.props.filtrar} />;
        const cuerpo_modal = [
                         <Btn_seleccion guardar={this.props.guardar} 
                                        deshacer={this.props.deshacer} />,
                        <Caja_datos titilo={this.props.titilo} 
                                    icono={this.props.icono} 
                                    datos={texto} />,
                         <Caja_datos titilo ={"Filtro"} 
                                     icono={"glyphicon glyphicon-filter"}
                                     datos={caja_filtro} />,
                        <div className="tabla_matriz">
                            <Tabla cavecera={this.props.cavecera} 
                               datos={this.props.lista}/></div> 
                        ];
        return(
            <div>
               <Modal cavecera={titulo} 
                cuerpo={cuerpo_modal} id={this.props.id} />
            </div>
        );
    }
}
class Modal_tabla_posiciones extends React.Component {
    render() {
        const titulo =<div>
                        <h3>{this.props.titulo || "Mover Posiciones."}</h3>
                        <Btn_seleccion guardar={this.props.guardar}
                                       deshacer={this.props.deshacer} />
                      </div>;
        const cuerpo = [
            <div >
                <i className="glyphicon glyphicon-chevron-up" style={{"margin-left":"20px","font-size":"25px"}} onClick={ this.props.subir}></i>
                <i className="glyphicon glyphicon-chevron-down" style={{"margin-left":"20px","font-size":"25px"}} onClick={ this.props.bajar} ></i>
                <section style={{"margin-left":"10px","font-size":"17px","display":"inline-block"}}>Mover Posicion.</section>
            </div>,
            <div className="tabla_matriz">
                <Tabla cavecera={this.props.cavecera}  datos={this.props.lista}/>
            </div> 
        ]
        return (
            <div>
                <Modal cavecera={titulo}
                       cuerpo={cuerpo} id={this.props.id} />
            </div>
         );
    }
}

class Caja_texto_modal extends React.Component {
    render() {
        this.valor = this.props.valor || "";
        this.status = this.props.estatus;
        this.evento = this.props.evento;
        return(
            <textarea  className="form-control" rows="1" 
                        style={{"width":"90%","resize": "none","display":"inline-block"}}
                        maxlength="200" id="comment" 
                        value={this.valor}
                        placeholder="Nombre"
                        disabled={this.status}
                        onChange={this.evento}  >
            </textarea>
            
            );
    }

}

class Matriz extends React.Component {
    constructor(props) {
        super(props);

        /**datos**/
        this.lista_matrices = [];
        this.lista_establecimientos = this.props.lista_establecimientos;
        this.lista_unidad_inspeccion = this.props.lista_unidad_inspeccion;
        this.lista_etapa = this.props.lista_etapa;
        this.lista_concepto = this.props.lista_concepto;
        this.lista_aspectos = this.props.lista_aspectos;
        this.cavecera_tabla = ["Orden Etapa", "Etapa", "Concepto", "Orden U. Inspecccion", "Unidad Inspeccion", "Pond.", "Sugerido Muestra", "Aspecto", "Borrar"];
        this.orden_etapas = [];
        this.orden_unidad_inspeccion = [];
        this.datos_tabla = [];
        this.tabla_filtro = [];
        this.matriz_seleccionada = { folio: 0, nombre: "" };
        this.consepto_seleccionada = { folio: 0, nombre: "" };
        this.unidad_inspector_seleccionada = { folio: 0, nombre: "" };

        //datos default
        this.default = {
            matriz: 0,
            nombre_matriz :"",
            matriz_estado: true,
            establecimiento: 1,
            etapa: 1,
            consepto: 1,
            unidad_de_inspeccion: 1,
            aspecto: 0,
            sugerido_m: 1,
            ponderacion: 1,
            editable: false,
            texto_filtro: "",
            filtro_etapas: [],
            filtro_u_i:[]
        }
        //datos cambio Parcial
        this.cambio = {
            matriz_estado: false,
            etapa: 1,
            consepto: 1,
            unidad_de_inspeccion: 1,
            aspecto: 0,
            sugerido_m: 1,
            ponderacion: 1,
            texto_filtro: ""
        }

        /**eventos**/
        this.buscar = this.buscar.bind(this);
        this.nuevo = this.nuevo.bind(this);
        this.guardar = this.guardar_matriz.bind(this);
        this.editar = this.editar.bind(this);
        this.deshacer = this.deshacer.bind(this);
        this.mostrar_etapas = this.mostrar_etapas.bind(this);
        this.mostrar_unidad_de_inspeccion = this.mostrar_unidad_de_inspeccion.bind(this);
        this.agregar_a_tabla = this.agregar_a_tabla.bind(this);
        
        //eventos de objetos
        this.on_establecimientos = this.on_establecimientos.bind(this);
        this.on_etapa = this.on_etapa.bind(this);
        this.on_aspecto = this.on_aspecto.bind(this);
        this.on_matriz = this.on_matriz.bind(this);
        this.on_consepto = this.on_consepto.bind(this);
        this.on_unidad_de_inspeccion = this.on_unidad_de_inspeccion.bind(this);
        this.sugerido_muestra = this.on_sugerido_muestra.bind(this);
        this.on_ponderacion = this.on_ponderacion.bind(this);
        this.filtrar_tabla = this.filtrar_tabla.bind(this);
        this.selector_moda_matriz = this.selector_moda_matriz.bind(this);
        this.deshacer_selector_matrix = this.deshacer_selector_matriz.bind(this);
        this.selector_moda_consepto = this.selector_moda_consepto.bind(this);
        this.deshacer_selector_consepto = this.deshacer_selector_consepto.bind(this);
        this.selector_moda_ui = this.selector_moda_ui.bind(this);
        this.deshacer_selector_ui = this.deshacer_selector_ui.bind(this);
        
        /**estados**/
        this.state = this.default;
    }
    render() {
        
        return(
            <div>
                <Botonera buscar={ this.buscar } 
                          guardar={this.guardar} 
                          nuevo={this.nuevo}
                          editar={this.editar} 
                          deshacer={this.deshacer} />
                <Caja_datos titilo={"Matriz"} 
                            icono={"glyphicon glyphicon-list-alt"} 
                            datos={<Caja_texto_modal estatus={!this.state.editable} valor={this.state.nombre_matriz!=""? this.state.nombre_matriz:""} evento={this.on_matriz}  />} />
                <Caja_datos titilo={"Establecimiento"} 
                            icono={"glyphicon glyphicon-briefcase"} 
                            datos={ this.selector("establecimientos", this.on_establecimientos,this.opciones_seleccion(this.lista_establecimientos,this.state.establecimiento),this.state.establecimiento)} />
                <Caja_datos titilo={"Etapa"} 
                            icono={"glyphicon glyphicon-new-window"} 
                            datos={this.selector("etapa", this.on_etapa,this.opciones_seleccion(this.lista_etapa,this.state.etapa),this.state.etapa)} />
                <Caja_datos titilo={"Concepto"} 
                            icono={"glyphicon glyphicon-asterisk"} 
                            datos={this.entrada_modal(this.lista_concepto.filter( dato=>dato.folio == this.state.consepto)[0].nombre,this.on_consepto,"modal_consepto")} />
                <Caja_datos titilo={"Unidad De Inspeccion"} 
                            icono={"glyphicon glyphicon-search"} 
                            datos={this.entrada_modal(this.lista_unidad_inspeccion.filter( dato=>dato.folio == this.state.unidad_de_inspeccion)[0].nombre, this.on_unidad_de_inspeccion,"modal_unidad_inspeccion")} />
                <Caja_datos titilo={"Aspecto"} 
                            icono={"glyphicon glyphicon-tower"} 
                            datos={ this.selector("aspecto", this.on_aspecto,this.opciones_seleccion(this.lista_aspectos,this.state.aspecto),this.state.aspecto,"50%")} />
                <div className="caja_muestra">
                    <Caja_datos titilo={"Sugerido Muestra"}
                                icono={"glyphicon glyphicon-th"}
                                datos={ this.caja_numeros( this.state.sugerido_m,1,80, this.sugerido_muestra)} />
                    <Caja_datos titilo={"Ponderacion"}
                                icono={"glyphicon glyphicon-flash"}
                                datos={ this.caja_numeros( this.state.ponderacion,1,10, this.on_ponderacion)} />
                </div>
                <input type="button" 
                       className="btn btn-default  botones_tabla" 
                       disabled={!this.state.editable} 
                       onClick={ this.mostrar_etapas} 
                       value="Etapas" 
                       data-toggle="modal" data-target="#modal_Etapas" />
                <input  type="button" 
                        className="btn btn-default  botones_tabla" 
                        disabled={!this.state.editable} 
                        onClick={ this.mostrar_unidad_de_inspeccion} 
                        value="Unidad De Inspeccion"
                        data-toggle="modal" data-target="#modal_u_i" />
                <input  type="button" className="btn btn-success  botones_tabla" disabled={!this.state.editable} onClick={ this.agregar_a_tabla} value="Agregar A Tabla"  />
                <div className="tabla_matriz">
                    <Tabla cavecera={this.cavecera_tabla } datos={this.vista_datos_tabla()} />
                </div>
                
                 <Modal_con_tabla seleccionada={this.matriz_seleccionada}
                                  titulo={"Matrices"}
                                  cavecera={["Folio","Nombre matriz","Establecimiento","Estatus","Usuario"]}
                                  lista={this.cuerpo_tabla_lista_matrices()}
                                  id={"modal"}
                                  icono={"glyphicon glyphicon-list-alt"}
                                  guardar={this.selector_moda_matriz}
                                  deshacer={this.deshacer_selector_matriz} 
                                  texto_filtro={this.state.texto_filtro}
                                  filtrar={this.filtrar_tabla}
                                  />
                <Modal_con_tabla seleccionada={this.consepto_seleccionada}
                                 titulo={"Conceptos"} 
                                 cavecera={["Folio","Concepto","Estatus"]}
                                 lista={this.lista_tabla_conseptos()} 
                                 id={"modal_consepto"}
                                 icono={"glyphicon glyphicon-asterisk"}
                                 guardar={this.selector_moda_consepto}
                                 deshacer= {this.deshacer_selector_consepto}
                                 texto_filtro={this.state.texto_filtro}
                                  filtrar={this.filtrar_tabla}
                                 />
                <Modal_con_tabla seleccionada={this.unidad_inspector_seleccionada}
                                 titulo={"Unidad Inspeccion"}
                                 cavecera={["Folio","Unidad Inspeccion","Estatus"]}
                                 lista={this.lista_tabla_u_i()}
                                 id={"modal_unidad_inspeccion"}
                                 icono={"glyphicon glyphicon-search"}
                                 guardar={this.selector_moda_ui}
                                 deshacer={this.deshacer_selector_ui} 
                                 texto_filtro={this.state.texto_filtro}
                                 filtrar={this.filtrar_tabla}
                                 />
                <Modal_tabla_posiciones 
                                 id={"modal_Etapas"}
                                 titulo={"Mover Posicion Etapas"}
                                 cavecera={["posicion","Etapa"]}
                                 lista ={this.lista_mover_posiciones_etapas()}
                                 subir={ ()=>this.on_mover_posicio_etapa(-1)}
                                 bajar={ ()=>this.on_mover_posicio_etapa(1)}
                                 deshacer={ ()=>this.deshacer_mover_posicion_etapa()}
                                 guardar={ ()=>this.guardar_posicion_etapa()}
                                        />
                <Modal_tabla_posiciones id={"modal_u_i"}
                                        titulo={"Posiciones Etapa : " + this.lista_etapa.filter(e=>e.folio==this.state.etapa)[0].nombre || "n" }
                                        cavecera={["posicion","Unidad de Inspeccion"]}
                                        lista={this.lista_mover_posiciones_u_i()}
                                        subir={ ()=>this.on_mover_posicio_u_i(-1)}
                                        bajar={ ()=>this.on_mover_posicio_u_i(1)}
                                        deshacer={ ()=>this.deshacer_mover_posicion_u_i()}
                                        guardar={ ()=>this.guardar_posicion_u_i()}
                    />
</div>
        );
    } /*** seleccionado,titulo,fn guardar,fn deshacer,cavecera "tabla",lista    "tabla"***/
    /**eventos*/
    buscar() { 
        this.lista_matrices = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_matriz") || [];
        this.setState(this.default);
    }
    nuevo() {
        const folio = conexion_ajax("servicios/matriz/conexiones.asmx/ultimo_folio_matriz");
        this.setState({ matriz: folio, matriz_estado: false, editable: true });
    }
    guardar_matriz() {
        if (this.datos_tabla.length > 0 && this.state.editable) {

            const orden_etapa_lista             = this.datos_tabla.map(e=> e.orden_etapa );
            const etapa_lista                   = this.datos_tabla.map(e=> e.etapa);
            const consepto_lista                = this.datos_tabla.map(e=> e.consepto);
            const orden_unidad_inspector_lista  = this.datos_tabla.map(e=> e.orden_unidad_de_inspeccion);
            const unidad_inspector_lista        = this.datos_tabla.map(e=> e.unidad_de_inspeccion);
            const ponderacion_lista             = this.datos_tabla.map(e=> e.ponderacion);
            const sugerido_muestra_lista        = this.datos_tabla.map(e=> e.sugerido_m);
            const aspectos_lista                = this.datos_tabla.map(e=> e.aspecto );

            const matriz = {
                folio: this.state.matriz,
                descripcion: this.state.nombre_matriz,
                id_establecimiento: this.state.establecimiento,
                id_usuario: ID_SCOI,
                orden_etapas: orden_etapa_lista,
                etapas: etapa_lista,
                conseptos: consepto_lista,
                orden_unidad_de_inspeccion: orden_unidad_inspector_lista,
                unidad_de_inspeccion: unidad_inspector_lista,
                ponderaciones: ponderacion_lista,
                sugerido_muestra: sugerido_muestra_lista,
                aspectos: aspectos_lista
            }
            const a = conexion_ajax("servicios/matriz/conexiones.asmx/guardar_crear_armado_matriz", matriz);
            alert("Guardado\n");
            this.deshacer();
        }
        else alert("Nada Que Guardar");
    }
    guardar_posicion_etapa() {
        this.orden_etapas = this.state.filtro_etapas.map(e=>e);

        this.datos_tabla.map(
            (datos) => {
                
                datos.orden_etapa = (this.orden_etapas.indexOf(datos.etapa) + 1);

            return datos
            });

        this.setState({ filtro_etapas: this.orden_etapas.map(e=>e),etapa:1 });
    }
    guardar_posicion_u_i() {
        this.orden_unidad_inspeccion = this.state.filtro_u_i.map(e=>e);

        this.datos_tabla.map(
            (datos) => {
                if (datos.etapa == this.state.etapa)
                datos.orden_unidad_de_inspeccion = (this.orden_unidad_inspeccion.indexOf(datos.unidad_de_inspeccion) + 1);

                return datos
            });

        this.setState({ filtro_u_i: this.orden_unidad_inspeccion.map(e=>e), unidad_de_inspeccion: 1 });
    }
    editar() {
        if (this.state.matriz > 0) {
            this.setState({ matriz_estado: false, editable:true });
        }
        else {
            this.deshacer();
            alert("Selecione Matriz!!!");
        }
    }
    deshacer() {
        this.setState(this.default);
        this.datos_tabla = [];
    }
    selector_moda_matriz() {
        this.datos_tabla = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_datos_matriz", { folio: this.matriz_seleccionada.folio }) || [];
        this.setState({ matriz: this.matriz_seleccionada.folio, editable: false, texto_filtro: "" });
        //orden de los datos
        this.datos_tabla.map((e)=>{
            if (!this.orden_etapas.includes(parseInt(e.etapa))) {
                this.orden_etapas.push(parseInt(e.etapa));
                this.state.filtro_etapas.push(parseInt(this.state.etapa))
                return e;
            }
          }
        )
    }
    deshacer_selector_matriz() {
        this.setState( this.default );
    }
    selector_moda_consepto() {
        this.setState({ consepto: this.consepto_seleccionada.folio, texto_filtro: "" });
    }
    deshacer_selector_consepto() {
        this.setState({consepto:1 });
    }
    selector_moda_ui() {
        this.setState({ unidad_de_inspeccion: this.unidad_inspector_seleccionada.folio, texto_filtro: "" });
    }
    deshacer_selector_ui() {
        this.setState({unidad_de_inspeccion:1});
    }
    deshacer_mover_posicion_etapa() {
        this.state.filtro_etapas = this.orden_etapas;
        this.setState({ etapa: 1 });
    }
    deshacer_mover_posicion_u_i() {
        this.state.filtro_u_i = this.orden_unidad_inspeccion;
        this.setState({ unidad_de_inspeccion: 1 });
    }
    mostrar_etapas() {
        console.log(this.orden_etapas);
        this.state.filtro_etapas = this.orden_etapas;
        this.setState({ filtro_etapas: this.orden_etapas .map(e=>e)});
    }
    mostrar_unidad_de_inspeccion() {
        this.seleccionar_etapa_tabla(this.state.etapa);
    }
    agregar_a_tabla() {
        if (this.state.aspecto > 0) {
            //crear el orden de etapa
            if (!this.orden_etapas.includes(parseInt(this.state.etapa))) {
                this.orden_etapas.push(parseInt(this.state.etapa));
                this.state.filtro_etapas.push(parseInt(this.state.etapa))
            }
            const u_i = this.datos_tabla.filter((e) => e.etapa == this.state.etapa);
            
            const datos = {
                orden_etapa: this.orden_etapas.indexOf( parseInt(this.state.etapa))+1,
                etapa:parseInt(this.state.etapa),
                consepto:parseInt(this.state.consepto),
                orden_unidad_de_inspeccion: u_i.length +1 || 1,
                unidad_de_inspeccion: parseInt(this.state.unidad_de_inspeccion),
                ponderacion: parseInt(this.state.ponderacion),
                sugerido_m: parseInt(this.state.sugerido_m),
                aspecto: parseInt(this.state.aspecto)
            };
            this.datos_tabla.push(datos);
            this.setState(this.cambio);


        }
        else alert("Seleccione Aspecto!!!");
    }
    eliminar_de_tabla(posicion) {
        const pos = this.datos_tabla.indexOf(posicion);
        this.datos_tabla.splice(pos, 1);
        this.state.filtro_etapas.splice(pos, 1);
        this.setState(this.cambio);

    }
    /**eventos objetos**/
    on_establecimientos(e) {
        this.setState({ matriz_estado: e.target.value != 1, establecimiento: e.target.value });
    }
    on_etapa(e) {
        this.setState({ etapa: e.target.value });
    }
    filtrar_tabla(e) {
        this.setState({ texto_filtro: e.target.value });
    }
    on_aspecto(e) {
        this.setState({ aspecto: e.target.value });
    }
    on_matriz(e) {
        this.setState({ nombre_matriz : e.target.value });
    }
    on_sugerido_muestra(e) {
        this.setState({ sugerido_m: e.target.value });
    }
    on_consepto() {/*bug al seleccionar concepto */
        console.log("on_consepto ");

    }
    on_unidad_de_inspeccion() {
        console.log("on_unidad_de_inspeccion  ");

    }
    on_tabla_filtro_etapa(e) {
        this.setState({ etapa: e });
    }
    on_tabla_filtro_u_i(e) {
        this.setState({ unidad_de_inspeccion: e });
    }
    on_mover_posicio_etapa(mover) {
        const et = this.state.etapa;
        const pos = this.state.filtro_etapas.indexOf(this.state.etapa)
       
        if ((pos > 0 || mover == 1) && (pos + mover) < this.state.filtro_etapas.length) {
            const prev = this.state.filtro_etapas[pos + mover];
            this.state.filtro_etapas[pos + mover] = this.state.etapa;
            this.state.filtro_etapas[pos] = prev;
            this.setState({etapa:et});
        }
    }
    on_mover_posicio_u_i(mover) {
        const et = this.state.unidad_de_inspeccion;
        const pos = this.state.filtro_u_i.indexOf(this.state.unidad_de_inspeccion)

        if ((pos > 0 || mover == 1) && (pos + mover) < this.state.filtro_u_i.length) {
            const prev = this.state.filtro_u_i[pos + mover];
            this.state.filtro_u_i[pos + mover] = this.state.unidad_de_inspeccion;
            this.state.filtro_u_i[pos] = prev;
            this.setState({ unidad_de_inspeccion: et });
        }
    }
    on_ponderacion(e) {
        this.setState({ ponderacion: e.target.value });
    }
    obtener_nombre_de_lista_matrices(m) {
        this.matriz_seleccionada = m;
        this.setState({ nombre_matriz:m.nombre});
    }
    obtener_nombre_de_lista_conseptos(m) {
        this.consepto_seleccionada = m;
        this.setState({ consepto: m.folio });
    }
    obtener_nombre_de_lista_u_i(m) {
        this.unidad_inspector_seleccionada = m;
        this.setState({ unidad_de_inspeccion: m.folio });
    }
    seleccionar_etapa_tabla(etapa_sel) {
        const datos = []//this.datos_tabla.filter((datos) => datos.etapa==etapa_sel);
        this.datos_tabla.map((e) => {
            if (e.etapa == etapa_sel) {
                datos.push(e.unidad_de_inspeccion);
            }
            return e;
        })
        this.setState({
            etapa: etapa_sel,
            filtro_u_i: datos
        });
    }
    /************************************************************
                        objetos html
    ************************************************************/
    selector(nombre, evento, datos,valor, estilos) {
        estilos = estilos != undefined ? estilos : "100%";
        return (  <select  className="form-control" onChange={evento} value={valor} disabled={!this.state.editable}  style={{"width":estilos}}>
                    {datos} 
                  </select>);
    }
    opciones_seleccion(dato, seleccion) {
        
        const r = dato.map((e) =>{
            if (e.folio == seleccion){
                return  <option key= {e.folio} value={e.folio} selected > { e.nombre }</option>
                }
            else 
                return  <option key= {e.folio} value={e.folio} > { e.nombre }</option>
                }
            );
        return r;
    }
    caja_numeros( valor,min,max, evento) {
        return (
            <input type="number" 
                   className="form-control" 
                   style={{"width":"65px"}} 
                   disabled={!this.state.editable}  
                   value={valor} min={min} max={max} 
                   onChange={ evento } />
            );
    }
    entrada_modal(nombre, evento,modal) {
        const r = [<input type="text" 
                          className="form-control" 
                          value={nombre} 
                          disabled
                          style={{"width":"90%"}} />]
        if (this.state.editable) {
            r.push(<i className="glyphicon glyphicon-plus-sign" 
                      onClick={evento}
                      style={{"font-size":"30px","color":"#32c3c0","margin-left":"10px"}}
                       data-toggle="modal" data-target={"#"+modal}>
                    </i>);
        }
        return r;
    }
    vista_datos_tabla() {
        var lista_datos = [];
        //ordenar por unidad inspector
        this.datos_tabla.sort((a, b) => a.orden_unidad_de_inspeccion <= b.orden_unidad_de_inspeccion);
        this.datos_tabla.sort((a, b) => a.orden_etapa >= b.orden_etapa);

       /**muestra la tabla con datos capturados**/
       this.datos_tabla.map((item) => {
            if ( ! lista_datos.includes( item ) ) {
                this.datos_tabla.map((e) => { 
                    if (e.etapa === item.etapa) {
                        lista_datos.push(e);
                    } 
                    return e });
            }
            return item;
          }
        );
        const r = lista_datos.map(
            (e)=>   <tr key={e.orden_etapa+"-"+e.orden_unidad_de_inspeccion} onClick={ ()=>this.seleccionar_etapa_tabla(e.etapa)} >
                        <td style={{"text-align":"center"}}>{e.orden_etapa}</td>
                        <td>{ this.lista_etapa.filter(dat=>dat.folio == e.etapa )[0].nombre}</td>
                        <td>{this.lista_concepto.filter(dat=>dat.folio == e.consepto )[0].nombre}</td>
                        <td style={{"text-align":"center"}}>{e.orden_unidad_de_inspeccion}</td>
                        <td>{ this.lista_unidad_inspeccion.filter(dat=>dat.folio == e.unidad_de_inspeccion )[0].nombre}</td>
                        <td style={{"text-align":"center"}}>{e.ponderacion}</td>
                        <td style={{"text-align":"center"}}>{e.sugerido_m}</td>
                        <td>{ this.lista_aspectos.filter(dat=>dat.folio==e.aspecto)[0].nombre}</td>
                        <td style={{"text-align":"center"}}><input type="button" value="X" disabled={!this.state.editable}   className="btn btn-danger btn-sm" onClick={ ()=>this.eliminar_de_tabla(e)} />  </td>
                    </tr>
            );
        return r;///<i className="glyphicon glyphicon-remove-circle close red" onClick={ ()=>this.eliminar_de_tabla(e)}></i>
    }
    cuerpo_tabla_lista_matrices() {
        const filtro = this.lista_matrices.filter((dato) => {
            return (dato.nombre.toUpperCase().search(this.state.texto_filtro.toUpperCase()) >= 0 )? true : false;
            });

        const r = filtro.map(
            (m) => <tr key={m.folio} onClick={ ()=>this.obtener_nombre_de_lista_matrices(m)}>
                    <td style={{"text-align":"center"}}>{m.folio}</td>
                    <td style={{"width":"570px"}}>{m.nombre}</td>
                    <td>{m.establecimiento}</td>
                    <td style={{"text-align":"center"}}>{m.estatus=="V"?"Vigente":"Cancelado"}</td>
                    <td>{m.usuario}</td>
                  </tr>);
        return r;
    }
    lista_tabla_conseptos() {
        const filtro = this.lista_concepto.filter((dato) => {
            return (dato.nombre.toUpperCase().search(this.state.texto_filtro.toUpperCase()) >= 0) ? true : false;
        });
        const r = filtro.map(
           (m) => <tr key={m.folio} onClick={ ()=>this.obtener_nombre_de_lista_conseptos(m)}>
                    <td style={{"text-align":"center"}}>{m.folio}</td>
                    <td>{m.nombre}</td>
                    <td style={{"text-align":"center"}}>{m.estatus=="V"?"Vigente":"Cancelado"}</td>
                  </tr>);
        return r;
    }
    lista_tabla_u_i() {
        const filtro = this.lista_unidad_inspeccion.filter((dato) => {
            return (dato.nombre.toUpperCase().search(this.state.texto_filtro.toUpperCase()) >= 0) ? true : false;
        });
        const r = filtro.map(
           (m) => <tr key={m.folio} onClick={ ()=>this.obtener_nombre_de_lista_u_i(m)}>
                    <td style={{"text-align":"center"}}>{m.folio}</td>
                    <td>{m.nombre}</td>
                    <td style={{"text-align":"center"}}>{m.estatus=="V"?"Vigente":"Cancelado"}</td>
                  </tr>);
            return r;
    }
    lista_mover_posiciones_etapas() {
        const r = this.state.filtro_etapas.map(
          (e) =>{
              const clase = e == this.state.etapa ? "lista_seleccionada" : "";
              return  <tr className={ clase } onClick={ ()=>this.on_tabla_filtro_etapa(e)}>
                        <td>{ this.state.filtro_etapas.indexOf(e)+1 }</td>
                        <td>{ this.lista_etapa.filter(et=> et.folio== e)[0].nombre }</td>
                    </tr>
            }
            );
        return r;
    }
    lista_mover_posiciones_u_i() {
        const r = this.state.filtro_u_i.map(
          (e) =>{
              const clase = e == this.state.unidad_de_inspeccion ? "lista_seleccionada" : "";
              return  <tr className={ clase } onClick={ ()=>this.on_tabla_filtro_u_i(e)}>
                        <td>{ this.state.filtro_u_i.indexOf(e)+1 }</td>
                        <td>{ this.lista_unidad_inspeccion.filter(et=>et.folio==e)[0].nombre || "otro"}</td>
                    </tr>
              }
            );
              return r;
          }
}
function App() {
    /**conexiones ajax**/
   const lista_establecimientos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_establecimientos") || [];
   const lista_unidad_inspeccion = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_unidad_inspeccion_matriz") || [];
   const lista_etapa = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_etapas_matriz") || [];
   const lista_concepto = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_conceptos_matriz") || [];
   const lista_aspectos = conexion_ajax("servicios/matriz/conexiones.asmx/obtener_aspectos_matriz") || [];

    ReactDOM.render(
        <Matriz
                lista_establecimientos={lista_establecimientos}
                lista_unidad_inspeccion={lista_unidad_inspeccion}
                lista_etapa={lista_etapa}
                lista_concepto={lista_concepto}
                lista_aspectos={lista_aspectos}
                 />,
        document.getElementById("contenedor")
        );
}
/**Run App**/
App();