class Cabecera extends React.Component {
    render() {
        return(
            <div>
                    <div style={{"width":"300px",display:"inline-block","marginTop":"10px"}}
                         className="form-group">
                        <span className="glyphicon glyphicon-tasks">
                            <label style={{"marginLeft":"5px"}}>ESTABLECIMIENTO:</label> 
                        </span>
                        <select  className="form-control"
                                 onChange={this.props.on_establecimiento}>
                            <option value="-1">SELECCIONAR...</option>
                            {this.establecimientos()}
                        </select>
                    </div>
                    <a className="btn-success btn"
                       style={{"marginLeft":"5px","borderRadius":"5px"}}
                       onClick={this.props.revisar}>
                            <span className="fa fa-pencil-square-o">  Iniciar</span> 
                    </a>
             </div>
            );
    }
    establecimientos() {
        const seleccion = (e) =>e == this.props.estado.folio_establecimiento;
        return this.props.establecimientos.map(e=> <option key={e.folio} selected={seleccion(e.folio)}
                                                           value={e.folio}>{e.nombre}</option>);
    }
}
class Filtro_producto_folio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo_producto: "",
            descripcion: "",
            establecimiento: "",
            existencia_piezas: "",
            fecha: ""
        };
    }
    
    render() {
        return(
            <form style={{"width":"100%","display":"inline-block","height":"70px"," justify-content":"center"}} 
                  onSubmit={this.buscar_producto.bind(this)}
                  className="panel panel-info">
                <span className="glyphicon glyphicon-barcode" 
                       style={{"marginLeft":"10px","marginTop":"10px"}}>
                    <label style={{"marginLeft":"5px"}}>PRODUCTO:</label>
                </span>
                <br />
                <input type="text"
                       style={{"width":"80px","display":"inline-block","marginLeft":"5px"}}
                        id={this.props.nombre_comp||" "}
                       className="form-control"
                       onChange={this.on_productos.bind(this)}
                       placeholder="codigo"
                       value={this.state.codigo_producto} />
                <button className="fa fa-search btn btn-default"
                       type="submit"
                        style={{ "marginLeft": "5px","display": "inline-block" }}
                       onClick={this.buscar_producto.bind(this)}
                       style={{"fontSize":"15px","borderRadius":"20px","marginLeft":"3px","display":"inline-block"}} ></button>
                <input className="form-control" style={{"marginLeft":"5px","width":"60%","display":"inline-block"}} 
                       value={this.state.descripcion} placeholder="Descripcion..." />
            </form>
        );
    }
    /**eventos**/
    on_seleccionar(producto) {
        this.props.obtener_producto(producto);
        this.setState({
            codigo_producto: "",
            descripcion: "",
            establecimiento: "",
            existencia_piezas: "",
            fecha: ""
        });
    }
    on_productos(folio) {
        folio = folio.target.value;
        if (folio != NaN) {
            this.setState({
                codigo_producto: folio,
                descripcion: "",
                establecimiento:"",
                existencia_piezas: "",
                fecha:""
            });
        } else this.setState({
            codigo_producto: ""
        });
    }
    buscar_producto(event) {
        if (this.state.codigo_producto != NaN && this.state.codigo_producto != "" && this.state.codigo_producto != null) {
            if (this.props.establecimiento != "") {
                //console.log("Codigo A enviar:", this.state.codigo_producto);
                this.obtener_producto_folio();
            } else {
                alert("Falta Seleccionar Establecimiento!!!");
            }
        } else alert("Falta Codigo!!!");
        event.preventDefault();
    }
    /**metodos**/
    /**conexiones**/
    obtener_producto_folio() {
        conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos_folio",
            {
                folio: this.state.codigo_producto,
                establecimiento: this.props.establecimiento
            },
            (productos) => {
                //console.log("Productos:", productos.d);
                if (productos.d.length > 0) {
                    const p = productos.d[0];
                    this.setState(p);
                    this.on_seleccionar(p);
                    document.getElementById("dialog").style.display = "none";
                } else {
                    this.setState({
                        codigo_producto: "",
                        descripcion: "",
                        establecimiento: "",
                        existencia_piezas: "",
                        fecha: ""
                    });
                    alert("No Encontrado!!!");
                }
            });
    }
}
class Clasificado_Filtro_Productos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            producto: "",
            clase: "",
            categoria: "",
            familia: "",
            linea: "",
            talla:""
        }
    }
    render() {
        return(
            <div className="panel-body"
                 style={{"height":"400px"}}>
                <h4>FILTRO PRODUCTO INVENTARIO PARCIAL</h4>
                <table className="table " style={{"width":"100%"}}>
                    <tbody >
                        <Item_filtro titulo={"PRODUCTOS"}
                                     valor={this.state.producto}
                                     borrar={this.borrar.bind(this)}
                                     resultado={this.props.resultados_filtro.producto}
                                     buscar={ ()=>this.buscar("producto",this.state.producto)}
                                     tipo_filtro={ (e)=>this.tipo_filtro("producto",e)} />
                        <Item_filtro titulo={"CLASES"}
                                     valor={this.state.clase}
                                     borrar={this.borrar.bind(this)}
                                     resultado={this.props.resultados_filtro.clase}
                                     buscar={ ()=>
                            this.buscar("clase_producto",this.state.clase)}
                            tipo_filtro={ (e)=>this.tipo_filtro("clase_producto",e)}/>
                        <Item_filtro titulo={"CATEGORIAS"}
                                     valor={this.state.categoria}
                                     borrar={this.borrar.bind(this)}
                                     resultado={this.props.resultados_filtro.categoria}
                                     buscar={ ()=>
                            this.buscar("Categoria",this.state.categoria)}
                            tipo_filtro={ (e)=>this.tipo_filtro("Categoria",e)} />
                        <Item_filtro titulo={"FAMILIA"}
                                     valor={this.state.familia}
                                     borrar={this.borrar.bind(this)}
                                     resultado={this.props.resultados_filtro.familia}
                                     buscar={ ()=>
                            this.buscar("familia",this.state.familia)}
                            tipo_filtro={ (e)=>this.tipo_filtro("familia",e)}/>
                        <Item_filtro titulo={"LINEA"}
                                     valor={this.state.linea}
                                     borrar={this.borrar.bind(this)}
                                     resultado={this.props.resultados_filtro.linea}
                                     buscar={ ()=>
                            this.buscar("linea_producto",this.state.linea)}
                            tipo_filtro={ (e)=>this.tipo_filtro("linea_producto",e)}/>
                        <Item_filtro titulo={"TALLA"}
                                     valor={this.state.talla}
                                     borrar={this.borrar.bind(this)}
                                     resultado={this.props.resultados_filtro.talla}
                                     buscar={ ()=>
                            this.buscar("talla",this.state.talla)}
                            tipo_filtro={ (e)=>this.tipo_filtro("talla",e)}/>
                    </tbody>
                </table>
            </div>
        );
    }
    tipo_filtro(filtro,e) {
        this.props.tipo_filtro(filtro, e);
        this.props.deshacer();

        const t = {
            producto: "",
            clase: "",
            categoria: "",
            familia: "",
            linea: "",
            talla: ""
        };
        const evento =e.target.value;
        switch (filtro) {
            case "producto":
                t.producto = evento;
                break;
            case "clase_producto":
                t.clase = evento;
                break;
            case "familia":
                t.familia = evento;
                break;
            case "linea_producto":
                t.linea = evento;
                break;
            case "talla":
                t.talla = evento;
                break;
            case "Categoria":
                t.categoria = evento;
                break;
        }
        this.setState(t);
    }
    buscar(categoria,filtro) {
        this.props.buscar(categoria, filtro);
    }
    borrar() {
        //console.log("Borrar...");
        this.props.deshacer();
        this.setState({
            producto: "",
            clase: "",
            categoria: "",
            familia: "",
            linea: "",
            talla: ""
        });
    }
}
class Modal_clasificadores_productos extends React.Component {
    constructor(props) {
        super(props);
        this.contador = {
            cantidad:-1,
            inicio: 0,
            termino:99
        }
        this.state = {
            filtro:"",
            lista_seleccion:[]
        }
    }
    render() {
        return(
            <div id="mod_productos" className="modal_generica">
                <div className="panel panel-default">
                    <div className="panel panel-heading" style={{"color":"azure","background":"rgb(87, 182, 141)"}}>
                        <span className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></span>
                        <label>FILTRO DE CLASIFICADORES</label>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <span className="glyphicon glyphicon-filter"> BUSQUEDA DE CLASIFICADOR</span>
                            <input type="text" 
                                   onChange={this.filtrado_tabla.bind(this)}
                                   className="form-control"
                                    placeholder="Filtro..." />
                        </div>
                        <div id="contenedor_filtro_productos">
                            <table className="table ">
                                <thead className="panel panel-info">
                                    <tr className="info">
                                        <th>CODIGO</th>
                                        <th>DESCRIPCION</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.datos_tabla()}
                                </tbody>
                            </table>
                        </div>
                        {this.botones_pie_tabla()}
                        <span className="btn btn-primary btn-block" style={{"marginTop":"15px"}}
                              onClick={this.on_guardar_seleccion.bind(this)}>
                            <i className="glyphicon glyphicon-download-alt"> </i>
                            <label style={{"marginLeft":"5px"}}>CARGAR</label>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    /**eventos**/
    on_guardar_seleccion() {
        const seleccion = this.state.lista_seleccion.toString();
        //console.log(seleccion);
        this.props.seleccion_clasificador(seleccion);
        this.setState({ lista_seleccion: [] });
        document.getElementById("mod_productos").style.display = "none";
    }
    cerrar() {
        document.getElementById("mod_productos").style.display = "none";
        this.contador = {
            cantidad: -1,
            inicio: 0,
            termino: 99
        }
        this.setState({ lista_seleccion: [] });
    }
    on_seleccionar(elemento) {
       
        var lista=[];

        if (this.props.limitador_filtro == "in")
            lista = this.seleccion_lista(elemento);
        else
            lista = this.seleccion_unica(elemento);

        this.setState({ lista_seleccion :lista});
    }
    /*****/
    filtrado_tabla(event) {
        //console.log(event.target.value);
        this.setState({ filtro: event.target.value });
    }
    seleccion_lista(elemento) {
        const lista = this.state.lista_seleccion.map(e=>e);
        if (!lista.includes("''" + elemento.folio + "''")) {
            lista.push("''" + elemento.folio + "''")
            //console.log(lista);
        } else {
            const pos = lista.indexOf("''" + elemento.folio + "''");
            if (pos > -1)
                lista.splice(pos, 1);
        }
        return lista;
    }
    seleccion_unica(elemento) {
        var lista = this.state.lista_seleccion.map(e=>e);

        if (!lista.includes("''" + elemento.folio + "''"))
            lista = ["''" + elemento.folio + "''"];
        else 
            lista =[];

        return lista;
    }
    /**componentes**/
    botones_pie_tabla() {
        var botones = new Array(3);
        botones[0] = <i className="btn btn-link">{this.contador.cantidad>99?"100":this.contador.cantidad}</i>
        botones[1] = <i className="btn btn-link"> DE </i>
        botones[2]=<i className="btn btn-link">{ this.contador.cantidad }</i>
       
        return <div className="panel panel-info" style={{"display":"flex","height":"45px","align-items":"center"}}>
                    {botones}
                </div>;
    }
    datos_tabla() {
        const filtro = this.state.filtro.toUpperCase();
       
        var lista = this.props.clasificadores.filter(
            elemento=> elemento.folio.toString().search(filtro)>-1 ||
                       elemento.clasificador.toUpperCase().search(filtro) > -1);
        this.contador.cantidad = lista.length;
        const seleccion = (folio) => this.state.lista_seleccion.includes(folio) ? "glyphicon glyphicon-check" : "glyphicon glyphicon-unchecked";
        lista = lista.filter((e, p) =>p >= this.contador.inicio && p <= this.contador.termino)
        return lista.map(
            (e,p)=><tr onClick={ ()=>this.on_seleccionar(e)}>
                <td style={{"width":"60px","textAlign":"center"}}>{e.folio}</td>
                <td>{e.clasificador}</td>
                <td style={{"width":"60px","textAlign":"center","fontSize":"25px"}}>
                    <i className={seleccion("''"+e.folio+"''")}></i>
                </td>
            </tr>);
    }
}
class Item_filtro extends React.Component {
    render() {
        const seleccionado = (f) =>f === this.props.valor;
        return(
             <tr >
                <td style={{"width":"90px"}}>
                    <label>{this.props.titulo}</label>
                </td>
                <td style={{"width":"110px"}}>
                    <select className="form-control" onChange={this.props.tipo_filtro}>
                        <option value={""} selected={seleccionado("")}>TODOS</option>
                        <option value={"in"} selected={seleccionado("in")}>LISTA </option>
                        <option value={"="} selected={seleccionado(" =")}>IGUAL </option>
                        <option value={">"}selected={seleccionado(">")} >MAYOR </option>
                        <option value={"<"} selected={seleccionado("<")}>MENOR </option>
                        <option value={"!="} selected={seleccionado("!=")}>DIFERENTE</option>
                    </select>
                </td>
                <td >
                    <input type="text" disabled
                        value={this.props.resultado != "0" ? this.props.resultado : ""}
                        className="form-control" />
                </td>
                <td style={{"width":"40px"}}>
                    <a className="glyphicon glyphicon-plus btn btn-info"
                        onClick={this.props.buscar}></a>
                </td>
                <td style={{"width":"40px"}}>
                    <a className="glyphicon glyphicon-trash btn btn-danger"
                       onClick={this.props.borrar}></a>
                </td>
            </tr>
        );
    }
}
class Modal_Entrada_cantidad extends React.Component {
    constructor(props){
        super(props);
        this.state={
            texto: "0",
            signo:'+',
            lista:[]
        }
    }
    render() {
        return (
            <div className="modal_generica" id="m" style={{"display":"none","position":"fixed"}}>
                <div className="panel panel-default"
                    style={{ "position": "fixed", "width": "80%", "height": "450px","maxWidth": "550px"}}>
                    <div className="panel-heading " style={{ "background":"#77d6f5","color":"azure"}}>
                        <span className="glyphicon glyphicon-remove-circle red close" onClick={this.cerrar.bind(this)}></span>
                        <label>Existencia Fisica.</label>
                    </div>
                    <div className="panel panel-body ">
                        <div className="panel-info" >
                            <strong style={{"marginLeft":"10px","borderBottom":"solid 1px black","color":"black"}}>{this.props.producto.codigo_producto}</strong>
                            <label style={{ "marginLeft": "10px","color": "black" }}>{this.props.producto.descripcion}</label>
                            <div className="form-group">
                                <div className="form-group" style={{ "width": "30%", "display": "inline-block" }}>
                                    <label>Suma:</label>
                                    <label className="form-control"
                                        style={{ "textAlign": "right", "fontSize": "20px",}}>
                                        {this.suma_lista()}
                                    </label>
                                </div>
                                <div className="form-group" style={{ "width": "30%", "display": "inline-block" }}>
                                    <label>Fisico:</label>
                                    <label className="form-control" 
                                        style={{ "textAlign": "right", "fontSize": "20px"}}>
                                        {this.props.producto.real}
                                    </label>
                                </div>
                                <div className="form-group" style={{ "width": "40%", "display": "inline-block" }}>
                                    <label>Total:</label>
                                    <label className="form-control" id="vista_texto_total"
                                        style={{ "textAlign": "right", "fontSize": "20px"}}>
                                        {this.state.signo + ' ' + this.state.texto||'0'}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="panel-success"
                            style={{ " justify-content": "center", "display": "flex" }} >

                            <div className="panel panel-info" style={{ "width": "30%", "height": "295px", "overflowX": "auto", "overflowY": "auto" }}>
                                {this.vista_lista()}
                            </div>
                            <table className="table"
                                style={{ "align-items": "center", "marginLeft": "0px", "background": "azure","width":"70%" }}>
                                <tr>
                                    <th style={{ "background": "azure" }}>
                                        <label className="btn glyphicon glyphicon-circle-arrow-left"
                                            style={{ "width": "95%", "height": "50px", "fontSize": "22px","color":"orange","marginLeft": "2px", "marginTop": "2px" }}
                                            onClick={this._borrar.bind(this)}> </label>
                                    </th>
                                    <th style={{ "background": "azure" }}>
                                        <label className="btn glyphicon glyphicon-minus"
                                            style={{ "width": "95%", "height": "50px", "fontSize": "22px", "color": "green", "marginLeft": "2px", "marginTop": "2px" }}
                                            onClick={()=>this._signo("-")}> </label>
                                    </th>
                                    <th style={{ "background": "azure" }}>
                                        <label className="btn glyphicon glyphicon-plus"
                                            style={{ "width": "95%", "height": "50px", "fontSize": "22px", "color": "blue", "marginLeft": "2px", "marginTop": "2px" }}
                                            onClick={()=> this._signo("+")}> </label>
                                    </th>
                                </tr>
                                <tr style={{ "textAlign": "center" }}>
                                    {this.boton_num(7)}
                                    {this.boton_num(8)}
                                    {this.boton_num(9)}
                                </tr>
                                <tr style={{"textAlign":"center"}}>
                                    {this.boton_num(4)}
                                    {this.boton_num(5)}
                                    {this.boton_num(6)}
                                </tr>        
                                <tr style={{ "textAlign": "center" }}>
                                    {this.boton_num(1)}
                                    {this.boton_num(2)}
                                    {this.boton_num(3)}
                                </tr>
                                <tr>
                                    {this.boton_num(0)}
                                    {this.boton_num(".")}
                                    <th style={{ "background": "azure" }}>
                                        <label className="btn btn-primary glyphicon glyphicon-share"
                                            style={{ "width": "95%", "height": "50px", "fontSize": "22px", "marginLeft": "2px", "marginTop": "2px"}}
                                            onClick={this._agregar_lista.bind(this)}> </label>
                                    </th>
                                </tr>
                            </table>
                        </div>
                        <span className="btn btn-success btn-block glyphicon glyphicon-download-alt"
                            onClick={this._salvar.bind(this)}>
                            <label style={{"marginLeft":"5px"}}>Listo</label>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    _boton(valor){
        var texto_ = this.state.texto.toString()//this.props.producto.real.toString();
        
        const comprovar_punto = texto_.split(".");

        if (texto_ == 0)
            texto_ = "";

        if (texto_ + valor <= 100000 && texto_.length<9) {
            if (valor > 0 && valor < 10)
                texto_ += valor;//numero
            else if (texto_.length > 0 && valor == 0)
                texto_ += valor;//cero
            else if (comprovar_punto.length == 1) {
                texto_ = texto_.length > 0 ? texto_ += valor : "0" + valor;//punto
            }
            if (this.state.texto == "") {
                this.setState({ texto: this.props.producto.real});
            }
            //this.props.producto.real = texto_;
            this.setState({texto:texto_ });
        } else {
            document.getElementById("vista_texto_total").style.border = 'solid 3px red';
            setTimeout(()=>document.getElementById("vista_texto_total").style.border = "" , 1000);
        }       
    }
    _agregar_lista() {
        const lista_ = this.state.lista;
        const t = this.state.texto;
        const r = this.state.signo == "-" ? '-' + t : t;
        lista_.push(parseFloat(r));
        this.setState({lista:lista_,texto:'0',signo:'+'});
    }
    _signo(signo_) {
        this.setState({ signo: signo_ });
    }
    _salvar() {
        var suma = this.props.producto.real;

        this.state.lista.forEach(
            dato => suma += dato
        );
        suma += parseInt(this.state.texto);

            if (suma >= 0) {
                this.props.seleccion(suma);
                this.setState({
                    texto: "0",
                    signo: '+',
                    lista: []
                });
                document.getElementById("codigo_barra").select();
            }
    }
    _borrar(){
        var texto_ = this.state.texto.toString();
        texto_ = texto_.length>1 ? texto_.toString().substr(0, (texto_.length - 1)):0;

        this.setState({ texto: texto_ });
    }
    cerrar() {
        this.setState({
            texto: "0",
            signo: '+',
            lista: []
        });
        document.getElementById("m").style.display = "none";
        document.getElementById("codigo_barra").select();
    }
    _eliminar_lista(posicion) {
        const lista_ = this.state.lista;

        lista_.splice(posicion, 1);
        if(confirm("Eliminar..."))
            this.setState({lista:lista_});
    }
    boton_num(titulo){
        return <th style={{"background":"azure"}} >
                    <label className="btn btn-info"
                        style={{"width":"95%","height":"50px","fontSize":"22px","marginLeft":"2px","marginTop":"2px"}} 
                        onClick={ ()=>this._boton(titulo)} >{titulo}</label>
                </th>
    }
    boton_accion(titulo) {
        return <th style={{ "background": "azure" }} >
            <label className="btn btn-info"
                style={{"width": "95%", "height": "50px", "fontSize": "22px", "marginLeft": "2px", "marginTop": "2px"}}
                onClick={() => this._boton(titulo)} ></label>
        </th>
    }
    /*metodos*/
    suma_lista() {
        var suma = this.props.producto.real ;

        this.state.lista.forEach(
            dato => suma += dato
        );
        return suma;
    }
    vista_lista() {
        return this.state.lista.map(
            (e, p) => <table className="table">
                    <tr>
                    <th style={{ "textAlign": "center" }}>{p+1}</th>
                    <th>
                        <label className="form-control" style={{ "textAlign": "right" }}>
                            {e} PZ
                        </label>
                    </th>
                    <td>
                        <i className="glyphicon glyphicon-remove"
                            onClick={()=>this._eliminar_lista(p)}
                            style={{ "marginLeft": "5px" }}></i>
                    </td>
                </tr>
            </table>
        );
    }
}
class Modal_vista_prductos_existencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro: '',
            producto: {
                codigo_producto: "",
                descripcion: "",
                existencia_piezas: "",
                real: 0,
                fecha: "",
                ediciones: 0
            }
        }
    }
    render() {
        return (
            <div className="modal_generica" id={this.props.modal} style={{"display":"none"}}>
                <div className="panel panel-group" style={{ "maxWidth": "600px","width":"90%"}}>
                    <div className="panel-heading" style={{ "background": "#6db65d", "color": "azure" }}>
                        <span className="glyphicon glyphicon-remove-circle red close" onClick={this.cerrar.bind(this)}></span>
                        <label>{this.props.lista.length}</label>
                        <label style={{"marginLeft":"5px"}}>{this.props.titulo}</label>
                    </div>
                    <div className="panel panel-body" style={{ "height": "600px" }}>
                        <div className="panel panel-info">
                            <div className="form-group">
                                <label for="text" className="">Descripcion :</label>
                                <input value={this.state.producto.descripcion}
                                    disabled className="form-control"
                                    placeholder="Descriocion Producto..." />
                                
                            </div>
                        </div>
                        <div className="form-group">
                        <input value={this.state.filtro}
                                className="form-control"
                                onChange={this.on_filtrar.bind(this)}
                                placeholder="Filtro Producto..." />
                        </div>
                        <div className="panel panel-success" style={{ "height": "70%", "overflowX": "auto", "overflowY": "auto"}}>
                            <table className="table">
                                <thead>
                                    <tr className="success">
                                        <th>Folio</th>
                                        <th>Descripcion</th>
                                        <th>Existencia</th>
                                        <th>HH/MM/SS</th>
                                    </tr>
                                </thead>
                                <tbody>{this.datos_tabla()}</tbody>
                            </table>
                        </div>
                        <span className="btn btn-success glyphicon glyphicon-ok btn-block"
                            onClick={this.on_seleccion.bind(this)}>
                            <label style={{"marginLeft":"5px"}}> Seleccionar</label>
                        </span>
                    </div>
                </div>
            </div>
            );
    }
    /*Eventos */
    on_filtrar(e) {
        this.setState({filtro:e.target.value});
    }
    on_seleccion() {
        if (this.state.producto.codigo_producto > 0) {
            this.props.seleccion(this.state.producto);
            this.setState({
                filtro: '',
                producto: {
                    codigo_producto: "",
                    descripcion: "",
                    existencia_piezas: "",
                    real: 0,
                    fecha: "",
                    ediciones: 0
                }
            });
            document.getElementById(this.props.modal).style.display = 'none';
        } else alert("Seleccione Producto!!!");
    }
    seleccion_tabla(producto_) {
        this.setState({ producto: producto_});
    }
    cerrar() {
        document.getElementById(this.props.modal).style.display = 'none';
    }
    /**componentes**/
    datos_tabla() {
        const filtro_ = this.state.filtro.toString().toUpperCase();
        var lista = this.props.lista.filter(
            elemento => elemento.descripcion.toUpperCase().search(filtro_) > -1
                     || elemento.codigo_producto.toString().search(filtro_) > -1
        );
        const hora_fecha = e => {
            e = e.split(" ");
            return e[1];
        };
        const seleccion = folio => folio == this.state.producto.codigo_producto ? { 'background': '#a8faae' } : { 'background': '' };
        lista = lista.filter(  (e,p)=> p<300);
        //console.log("Datos Tabla:",lista);
        return lista.map(
            producto => <tr onClick={() => this.seleccion_tabla(producto)}
                style={seleccion(producto.codigo_producto)}>
                <td>{producto.codigo_producto}</td>
                <td>{producto.descripcion}</td>
                <td >
                    <label className="form-control" style={{ "textAlign": "right","width":"70px" }}>
                        {producto.real}
                    </label>
                 </td>
                <td>
                    <label>
                        {hora_fecha(producto.fecha)}
                    </label>
                </td>
            </tr>);
    }
}
class Tabla_revicion_inventario_parcial extends React.Component {
    render() {
        return (
        <table className="table table-striped">
            <thead className="panel panel-info">
                <tr className="info">
                    <th style={{ "width": "80px", "textAlign": "center" }}>CODIGO</th>
                    <th style={{ "textAlign": "center" }}>DESCRIPCION</th>
                    <th style={{ "width": "80px", "textAlign": "center" }}
                        colspan="3" >EXIST. FISICA</th>
                </tr>
            </thead>
            <tbody>
                {this.datos_tabla()}
            </tbody>
        </table >
        );
    }
    /**conponentes**/
    datos_tabla() {
        //console.log(this.props.estado.lista);
        return this.props.estado.lista.map(
            (elemento, posicion) =>
                <tr>
                    <td style={{ "width": "80px", "textAlign": "center" }}>{elemento.codigo_producto}</td>
                    <td>{elemento.descripcion}</td>
                    <td style={{ "width": "80px", "textAlign": "center" }}>
                        <label className="form-control"
                            style={{ "textAlign": "right" }}>
                            {elemento.real}
                        </label>
                    </td>
                    <td style={{ "width": "30px", "textAlign": "center", "fontSize": "20px" }}>
                        <span className="btn btn-primary glyphicon glyphicon-edit"
                            onClick={() => this.props.on_editar_producto(elemento,posicion)}></span>
                    </td>
                    <th style={{ "width": "30px", "textAlign": "center", "fontSize": "20px" }}>
                        <span className="btn btn-danger fa fa-trash-o"
                            onClick={() => this.props.on_eliminar_producto(posicion)}></span>
                    </th>
                </tr>);
    }
}
const Boton_cavecera_modal_inventarios = (props) => {
    return <i className={"btn btn-"+ props.boton+" btn-sm glyphicon "+props.icono}
        onClick={props.on_}>
        <label style={{ "marginLeft": "5px" }}>{props.titulo}</label>
    </i>
}
class Moda_revicion_inventario_parcial extends React.Component{
    constructor(props) {
        super(props);
        this.producto = {
            codigo_producto:"",
            descripcion:"",
            existencia_piezas:"",
            real:0,
            fecha:"",
            ediciones:0
        }
        this.lista_pendientes = [];
        this.posicion = -1;
        this.state = {
            lista: []
        }
    }
    render() {
        return (
        <div className="modal_generica" id="modal_invemtario_parcial">
            <div className="panel panel-default"
                    style={{ "marginTop": "5px", "height": "98%", "width": "98%", "maxWidth": "900px"}}>
                <div className="panel panel-heading"
                      style={{"color":"azure","background":"rgba(45, 137, 237, 0.97)"}}>
                    <span className="glyphicon glyphicon-remove-circle close" onClick={this.cerrar.bind(this)}></span>
                    <span className="fa fa-cubes"> </span>
                    <label style={{"marginLeft":"5px"}}> INVENTARIOS PARCIALES</label>
                </div>
                <div className="panel-body" style={{"height":"87%","marginTop":"-30px"}}>
                     <Filtro_producto_folio establecimiento={this.props.establecimiento}
                            nombre_comp={"codigo_barra"}
                            obtener_producto={this.on_obtener_producto.bind(this)} />
                    <div className="btn-group">
                            <Boton_cavecera_modal_inventarios
                                on_={() => this.on_generar_pendientes()}
                                boton={"success"} icono={"glyphicon-flash"}
                                titulo={"Pendiente."} />
                            <Boton_cavecera_modal_inventarios
                                on_={() => this.on_revisados()}
                                boton={"success"} icono={"glyphicon-list-alt"}
                                titulo={"capturado."} />
                            <Boton_cavecera_modal_inventarios
                                on_={() => this.on_total()}
                                boton={"success"} icono={"glyphicon-asterisk"}
                                titulo={"inventario."} />
                            <Boton_cavecera_modal_inventarios
                                on_={() => this.imprimir()}
                                boton={"success"} icono={"glyphicon-print"}
                                titulo={"Reporte."} />
                    </div>
                     <div className="panel panel-info" style={{"height":"80%","overflow-x":"auto","overflow-y":"scroll"}}>
                            <Tabla_revicion_inventario_parcial estado={this.state}
                                on_editar_producto={this.on_editar_producto.bind(this)}
                                on_eliminar_producto={this.on_eliminar_producto.bind(this)}/>     
                    </div>
                </div>
                <i className="btn btn-info btn-block glyphicon glyphicon-save"
                   onClick={this.finalizar_inventario.bind(this)} >
                    <label style={{"marginLeft":"10px"}}>
                        GUARDAR INVENTARIO.
                    </label>
                </i>
                    <Modal_Entrada_cantidad producto={this.producto}
                        seleccion={this.agregar_producto_a_lista.bind(this)} />
                    <Modal_vista_prductos_existencia modal={"modal_vista_pendientes"}
                        titulo={"Productos Pendientes"}
                        seleccion={this.on_obtener_producto.bind(this)}
                        lista={this.lista_pendientes}/>
                    <Modal_vista_prductos_existencia modal={"modal_vista_total"}
                        titulo={" Productos Inventario."}
                        seleccion={this.on_obtener_producto.bind(this)}
                        lista={this.props.inventario} />
                    <Modal_vista_prductos_existencia modal={"modal_vista_revisados"}
                        titulo={" Productos Capturados."}
                        seleccion={this.on_obtener_producto.bind(this)}
                        lista={this.state.lista} />
            </div>
        </div>);
    }
    imprimir() {
        const tabla = this.crear_tabla_imprimir();
        console.log(tabla);
        const reporte = window.open('', 'Imprimir', 'width=320');
        const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const t = document.createElement("title");
        const titulo = document.createElement("h4");
        const fecha_ = document.createElement("strong");
        const establecimiento = document.createElement("label");
        const fecha = new Date();

        t.textContent = "Reporte De Inventario Parcial " + this.props.establecimiento + " " + fecha.getDate() + "/" + mes[fecha.getMonth()] + "/" + fecha.getFullYear() ;
        titulo.textContent = "Reporte De Inventario Parcial";
        fecha_.textContent = fecha.getDate() + "/" + mes[fecha.getMonth()] + "/" + fecha.getFullYear()
        establecimiento.textContent = this.props.establecimiento;

        establecimiento.style.marginLeft = '0';
        fecha_.style.marginLeft = '50px';

        reporte.document.head.append(t);
        reporte.document.body.append(titulo,establecimiento,fecha_,tabla);
        reporte.document.close();
        reporte.print();
        reporte.close();
    }
    crear_tabla_imprimir() {
        const table = document.createElement("table"); 
        const cavecera = document.createElement("tr");
        const c_codigo = document.createElement("td");
        const c_descripcion = document.createElement("td");
        const c_cantidad = document.createElement("td");

        c_codigo.innerText = 'codigo';
        c_descripcion.innerText = 'Descripcion';
        c_cantidad.textContent = "Cantidad";

        cavecera.append(c_codigo, c_descripcion, c_cantidad);

        cavecera.style = "border-bottom:solid 2px black";

        table.append(cavecera);

        this.props.inventario.forEach(
            (e,p) => {
                const codigo        = document.createElement("td");
                const descripcion   = document.createElement("td");
                const cantidad      = document.createElement("td");

                codigo.innerText = e.codigo_producto;
                descripcion.innerText = e.descripcion;
                cantidad.textContent = "|";

                cantidad.style="border-bottom:solid 2px black;width:30px;color:azure"
                codigo.style.width = '30px';
                descripcion.style.width = '110px';
                cantidad.style.width = '70px';

                const hijo = document.createElement("tr");

                hijo.append(codigo, descripcion, cantidad);
                hijo.style = ' border-bottom:solid 1px blue ';
                table.append(hijo);
                table.style = ' border:solid 1px gray;width:210px;font-size:10px';
            });
        return table;
    }
    /**eventos**/
    on_obtener_producto(producto) {
        console.log(producto);
        const producto_inventario = this.props.inventario.findIndex(e=>e.codigo_producto == producto.codigo_producto);
        const producto_lista = this.state.lista.findIndex(e => e.codigo_producto == producto.codigo_producto);

        this.producto = {
            codigo_producto: producto.codigo_producto,
            descripcion: producto.descripcion,
            existencia_piezas: producto.existencia_piezas,
            real: producto.real,
            fecha: producto.fecha,
            ediciones: producto.ediciones,
            costo_promedio: producto.costo_promedio,
            precio_venta: producto.precio_venta,
            ultimo_costo: producto.ultimo_costo
        };

        if (producto_inventario == -1) {
            if (confirm("EL PRODUCTO : " + producto.descripcion + "\n NO EXISTE EN LA SELECCION\n ¿AGREGAR?")) {
                document.getElementById("m").style.display = "flex";
                this.setState({});
            }
         }
        else {
            if (producto_lista == -1) {
                document.getElementById("m").style.display = "flex";
                this.setState({});
            }
            else if (producto_lista >= 0) {
                if (confirm("EL PRODUCTO : " + producto.descripcion + "\n SE ENCUENTRA EN REVICION\n ¿MODIFICAR?\n"+producto.fecha)) {
                    this.producto.real = this.state.lista[producto_lista].real;
                    this.producto.fecha = producto.fecha;
                    this.on_editar_producto(this.producto, producto_lista);
                }
            }
        }
    }
    on_editar_producto(producto, posicion) {
        this.posicion = posicion;
        this.producto = {
            codigo_producto: producto.codigo_producto,
            descripcion: producto.descripcion,
            existencia_piezas: producto.existencia_piezas,
            real: producto.real,
            fecha: producto.fecha,
            ediciones: producto.ediciones,
            costo_promedio: producto.costo_promedio,
            precio_venta: producto.precio_venta,
            ultimo_costo: producto.ultimo_costo
        };
        this.setState({});

        document.getElementById("m").style.display = "flex";
    }
    on_eliminar_producto(posicion) {
        const nombre = this.state.lista[posicion].descripcion;
        if (confirm("¿Eliminar? \n" + nombre)) {
            const lista_ = this.state.lista;
            lista_.splice(posicion, 1);
            this.setState({ lista: lista_ });
        }
    }
    agregar_producto_a_lista(cantidad) {
        var lista_ = this.state.lista;
        const comprobar = lista_.findIndex(e => e.codigo_producto == this.producto.codigo_producto);

        if (comprobar == -1) {
            this.producto.real = cantidad;
            lista_.push(this.producto);
        }
        else {
            lista_[comprobar].ediciones += 1;
            lista_[comprobar].real = cantidad;
            lista_[comprobar].fecha = this.producto.fecha;
            this.posicion = -1;
        }
        this.producto = {
            codigo_producto: "",
            descripcion: "",
            existencia_piezas: "",
            real: 0,
            fecha: "",
            ediciones: 0,
            costo_promedio: 0,
            precio_venta: 0,
            ultimo_costo: 0
        }
        this.setState({ lista: lista_ });
        document.getElementById("m").style.display = "none";
    }
    on_generar_pendientes() {
        document.getElementById("dialog").style.display = 'block';
        this.generar_pendientes();
        //console.log(this.lista_pendientes);
        document.getElementById("dialog").style.display = 'none';
        document.getElementById("modal_vista_pendientes").style.display = 'flex';
    }
    on_total() {
        document.getElementById("dialog").style.display = 'block';
        this.empatar_total_fisico();
        //console.log(this.props.inventario);
        document.getElementById("dialog").style.display = 'none';
        document.getElementById("modal_vista_total").style.display = 'flex';
    }
    on_revisados() {
        document.getElementById("modal_vista_revisados").style.display = 'flex';
    }
    finalizar_inventario() {
        const fecha = new Date();
        let h = fecha.getHours() > 9 ? fecha.getHours() : "0" + fecha.getHours();
        let minuto = fecha.getMinutes() > 9 ? fecha.getMinutes() : "0" + fecha.getMinutes();
        let segundos = fecha.getSeconds() > 9 ? fecha.getSeconds() : "0" + fecha.getSeconds();

        const hora =  h + ":" + minuto + ":" + segundos;
        
        //recorre los capturados para agregar los que no esten en lista
        this.generar_pendientes();

        if (this.lista_pendientes.length == 0) {
            //Obtengo los productos en lista de inventario y asigno los resultados
            const inventario = this.state.lista.map(
                producto => {
                    producto.establecimiento = this.props.establecimiento;
                    producto.fecha = producto.fecha + " - " + hora;
                    return producto;
                });
            this.guardado_inventario(inventario);
        }
        else {
            const texto = 'Productos Pendientes:\n' + this.lista_pendientes.length + ' pz';
            alert(texto);
        }
    }
    cerrar() {
        if (confirm("Al Cerrar Se Perderan Los Cambios!!!\n¿Cerrar?")) {
            this.setState({ lista: [] });
            document.getElementById("modal_invemtario_parcial").style.display = "none";
        }
    }
    /**metodos**/
    generar_pendientes() {
    /*recorre los capturados para agregar los que no esten en lista*/
        this.lista_pendientes = [];
        //console.log("Generar Pendientes");
        this.props.inventario.forEach(
            (producto) => {
                const producto_inventario = this.state.lista.findIndex(e => e.codigo_producto == producto.codigo_producto);
                if (producto_inventario == -1) {
                    this.lista_pendientes.push(producto);
                }
            });
        this.setState({});
    }
    empatar_total_fisico() {
        //Obtengo los productos en lista de inventario y asigno los resultados
        const lista = this.state.lista;
        //console.log("Empatar Total fisico");
        this.props.inventario.forEach(
            (producto) => {
                const posicion_lista = lista.findIndex(e => e.codigo_producto == producto.codigo_producto);
                if (posicion_lista > -1) {
                    producto.real = lista[posicion_lista].real;
                    producto.fecha = lista[posicion_lista].fecha;
                } else {
                    producto.real = 0;
                }
            });
        this.setState({});
    }
    /**conexiones**/
    guardado_inventario(inventario_) {
        const listo = conexion_ajax("servicios/inventarios_parciales/conexiones.asmx/Guardar_inventario_grupo_izagar",
            {
                responsable: ID_SCOI,
                inventario: inventario_
            });
        //console.log(listo);
        if (listo > 0) {
            document.getElementById("modal_invemtario_parcial").style.display = "none";
            alert("SE GUARDARON " + listo + " REGISTROS.");
            this.setState({ lista: [] });
        } else alert(listo);
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.lista_establecimientos = [];
        this.lista_clasificadores = [];
        this.lista_productos = [];

        this.resultados_filtro = {
            producto: "0",
            clase: "0",
            categoria: "0",
            familia: "0",
            linea: "0",
            talla: "0"
        };
        this.state = {
            folio_establecimiento: -1,
            establecimiento:"",
            codigo_producto: "",
            descripcion: '',
            existencia: -1,
            captura: 0,
            fecha: '',
            modificacion:0,
            condicion: "'0','0','0','0','0','0'",
            tipo_filtro: "",
            limitador_filtro: ""
        }

        this.obtener_establecimientos();
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
               <Cabecera establecimientos={this.lista_establecimientos}
                         on_establecimiento={this.on_cambio_estableciomiento.bind(this)}
                         revisar={this.obtener_productos.bind(this)}
                         estado={this.state} /> 
                
                <Filtro_producto_folio establecimiento={this.state.establecimiento}
                                       obtener_producto={this.obtener_producto.bind(this)} />
            </div>
               <Clasificado_Filtro_Productos tipo_filtro={this.filtro.bind(this)}
                                 resultados_filtro={this.resultados_filtro}
                                 deshacer={this.on_deshacer.bind(this)}
                                 buscar={this.buscar.bind(this)}/>
               <Modal_clasificadores_productos clasificadores={this.lista_clasificadores}
                                               limitador_filtro={this.state.limitador_filtro}
                                               seleccion_clasificador={this.seleccion_clasificador.bind(this)} />
               <Moda_revicion_inventario_parcial establecimiento={this.state.establecimiento}
                                                 folio_establecimiento={this.state.folio_establecimiento}
                                                 inventario={this.lista_productos} />
            </div>
        );
    }
    /**eventos**/
    on_cambio_estableciomiento(e) {
        var est = '';
        const folio = e.target.value;
        //console.log(folio);
        if (folio > 0) {
            est = this.lista_establecimientos.filter(e=>e.folio == folio)[0].nombre;
            //console.log(est);
        }
        this.setState({
            folio_establecimiento: folio,
            establecimiento:est,
            codigo_producto: "",
            descripcion: '',
            existencia: -1,
            captura: 0,
            fecha: '',
            modificacion: 0,
            condicion: "'" + est + "','0','0','0','0','0','0'",
            tipo_filtro: "",
            limitador_filtro:""
        });
    }
    on_deshacer() {
        this.resultados_filtro = {
            producto: "0",
            clase: "0",
            categoria: "0",
            familia: "0",
            linea: "0",
            talla: "0"
        };
        this.setState({
            tipo_filtro: "",
            limitador_filtro: "",
            codigo_producto: "",
            descripcion: ''
        });
    }
    /**metodos**/
    filtro(tipo, evento) {
        //console.log("Tipo:" + tipo + "\nlimitador:" + evento.target.value);
        this.setState({
            tipo_filtro: tipo,
            limitador_filtro: evento.target.value
        });
    }
    seleccion_clasificador(seleccion) {

        this.resultados_filtro = {
            producto: "0",
            clase: "0",
            categoria: "0",
            familia: "0",
            linea: "0",
            talla: "0"
        };
        if (this.state.limitador_filtro == "in") {
            seleccion = this.state.limitador_filtro + " (" + seleccion+")";
        } else {
            seleccion = this.state.limitador_filtro + " " + seleccion;
        }
        //console.log(this.state.tipo_filtro)
        switch (this.state.tipo_filtro) {
            case "producto":
                this.resultados_filtro.producto = seleccion;
                break;
            case "clase_producto":
                this.resultados_filtro.clase = seleccion;
                break;
            case "familia":
                this.resultados_filtro.familia = seleccion;
                break;
            case "linea_producto":
                this.resultados_filtro.linea = seleccion;
                break;
            case "talla":
                this.resultados_filtro.talla = seleccion;
                break;
            case "Categoria":
                this.resultados_filtro.categoria = seleccion;
                break;
        }
        //console.info(this.resultados_filtro);
        const consulta = "'"+this.state.establecimiento + "','" + this.resultados_filtro.producto + "','" + this.resultados_filtro.clase 
            + "','" + this.resultados_filtro.categoria + "','" + this.resultados_filtro.familia + "','" + this.resultados_filtro.linea
            + "','" + this.resultados_filtro.talla+"'";
        //console.log(consulta);
        this.setState({ condicion: consulta });

    }
    obtener_producto(producto) {
        //console.log("Obtenido:", producto);
        this.resultados_filtro = {
            producto: "0",
            clase: "0",
            categoria: "0",
            familia: "0",
            linea: "0",
            talla: "0"
        };
        this.resultados_filtro.producto = "=(''" + producto.codigo_producto + "'')";

        const consulta = "'" + this.state.establecimiento + "','=(''" + producto.codigo_producto + "'')','0','0','0','0','0'  ";


        this.setState({ limitador_filtro: "=", tipo_filtro: "producto", condicion: consulta });
        document.getElementById("dialog").style.display = "";
    }
    buscar(categoria, limitador) {
        //console.log("padre Buscar");
        var tabla="";
        switch (categoria) {
            case "producto":
                tabla = "productos";
                break;
            case "clase_producto":
                tabla = "clases_productos";
                break;
            case "familia":
                tabla = "familias";
                break;
            case "linea_producto":
                tabla = "lineas_productos";
                break;
            case "talla":
                tabla = "tallas";
                break;
            case "Categoria":
                tabla = "Categorias";
                break;
        }

        if (this.state.establecimiento != "")
            if (limitador != "") {
                //console.log("columna=" + categoria + "\ncondicion=" + limitador + "\nTabla=" + tabla);
                if (categoria == "producto")
                    this.obtener_productos_clasificadores();
                else
                    this.obtener_clasificadores(tabla, categoria);

                this.setState({
                    tipo_filtro: categoria,
                    limitador_filtro: limitador
                });
            }
            else alert('EL LIMITADOR DEL FILTRO PARA \'' + categoria + '\' ES:\n \"TODOS\".');
        else alert("SELECCIONE ESTABLECIMIENTO!!!");
    }
    /**conexiones**/
    obtener_establecimientos() {
        conexion_api_from_body("servicios/matriz/conexiones.asmx/obtener_establecimientos",
            {},
            (establecimientos) => {
                //console.log("Establecimientos:", establecimientos.d);
                this.lista_establecimientos = establecimientos.d;
                this.setState({ folio_establecimiento: -1 });
            });
    }
    obtener_productos_clasificadores() {
        //console.log("POR PRODUCTO");
        conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos_clasificador",
                {
                    est:this.state.establecimiento
                },
                (resp) => {
                    this.lista_clasificadores = resp.d;
                    document.getElementById("mod_productos").style.display = "flex";
                    this.setState({ });
                });
    }
    obtener_clasificadores(_tabla, _columna) {
        conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_clasificadores",
            {
                tabla: _tabla,
                columna: _columna,
                condicion: ""
            },
            (resp) => {
                this.lista_clasificadores = resp.d;
                //console.log(">Clasificadores:", this.lista_clasificadores);
                document.getElementById("mod_productos").style.display = "flex";
                this.setState({});
            });
    }
    obtener_productos() {
        if (this.state.establecimiento != "") {
            conexion_api_from_body("servicios/inventarios_parciales/conexiones.asmx/obtener_productos",
                {
                    condicion: this.state.condicion
                },
                (productos) => {
                    //console.log("Productos:", productos.d);
                    this.lista_productos = productos.d;
                    this.setState({ codigo_producto: "" });
                    document.getElementById("modal_invemtario_parcial").style.display = "flex";
                });
        }else alert("SELECCIONE ESTABLECIMIENTO!!!")
    }
}
ReactDOM.render(
        <App />,
        document.getElementById("container")
    );