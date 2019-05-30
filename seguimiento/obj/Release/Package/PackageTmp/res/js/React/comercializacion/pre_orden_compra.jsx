/********************************************
*                    PASO 1                 *
********************************************/
class Cargar_inventario extends React.Component{
    constructor(props) {
        super(props);
    }
    /**Render**/
    render() {
        return (
            <div className="contenedor_carga_inventasrio" style={{"text-align":"center"}} >
                <section><h3> Pre-orden de Compra de Verduras.</h3> </section>
                <div>
                    <input type="button" value=" Cargar Existencia." className="btn btn-info"  onClick={this.Conexion_i.bind(this) } />
                </div>
            </div>
         );
    }
    /**Funciones**/
    Conexion_i() {
        const url = "/servicios/comercializacion/Pre_orden_compra.asmx/inventario_productos";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(respuesta => respuesta.json())
        .then((dato) => {
            localStorage.setItem("inventario_parcial", JSON.stringify(dato.d));
            this.conexion_p();        
        })
        .catch(error=>console.log("Error :  " + error));

    }
    conexion_p() {
        const url = "/servicios/comercializacion/Pre_orden_compra.asmx/proveedores";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(respuesta => respuesta.json())
        .then((dato) => {
            localStorage.setItem("proveedores_verdura", JSON.stringify(dato.d));
            this.llenar_precios();
            checar_datos();
        })
        .catch(error=>console.log("Error :  " + error));
    }
    llenar_precios() {
        const productos = JSON.parse(localStorage.getItem("inventario_parcial"));
        const proveedores = JSON.parse(localStorage.getItem("proveedores_verdura"));
        var arreglo = [];
        proveedores.map((pv) => { return productos.map((pd) => { arreglo.push({ "folio_proveedor": pv.folio_proveedor, "id_producto": pd.codigo,"precio":"0.00" }) }) });

        JSON.parse(localStorage.setItem("pre_orden_compra", JSON.stringify( arreglo) ));
    }
}
/********************************************
*                   PASO 2                  *
********************************************/
class Tabla_comparativa extends React.Component{
    constructor(props) {
        super(props);

        this.inventario = JSON.parse(localStorage.getItem("inventario_parcial"));
        this.proveedores = JSON.parse(localStorage.getItem("proveedores_verdura"));
        this.precios = JSON.parse(localStorage.getItem("pre_orden_compra"));
    }
    /**render**/
    render() {
        return (
            <div >
                <Btn_cotizar datos={this.inventario} />
                <Btn_generar_orden_compra datos={this.inventario} />
                <h3>Cotizador Pre-orden De Compra.</h3>
                <div className="cotizador">
                 <table className="table table-bordered">
                     <thead>
                         <tr>
                             <th className="info" style={{"text-align":"center"}} colspan="6">PRODUCTOS</th>
                             <th className="success" style={{"text-align":"center"}} colspan={this.proveedores.length}> PROVEEDORES</th>
                         </tr>
                         {this.cavecera_tabla()}
                     </thead>
                     <tbody>
                         {this.manejo_datos()}
                     </tbody>
                 </table>
                </div>
            </div>
        );
    }
    cavecera_proveedores() {
        const r = this.proveedores.map((proveedor) =>
            <th  className="success" style={{"text-align":"center"}}>{proveedor.nombre}</th>
        );
        return r;
    }
    datos_proveedores(producto) {

        const r = this.proveedores.map((proveedor) => 
            <td style={{"text-align":"right"}}> $ { 
                this.precios.find( p=> p.folio_proveedor === proveedor.folio_proveedor && p.codigo_producto === producto  ) != undefined  ? this.precios.find( p=> p.folio_proveedor === proveedor.folio_proveedor && p.codigo_producto === producto  ) :"0.00 "  } </td>
        );
        return r;
    }
    manejo_datos() {
        const r = this.inventario.map((producto) =>
            <tr >
                <td style={{"text-align":"center"}}>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td style={{"text-align":"center"}}>{producto.existencia}</td>
                <td style={{"text-align":"center"}}>{producto.pedido}</td>
                <td style={{"text-align":"center"}}>{producto.total_venta}</td>
                <td style={{"text-align":"right"}}> $ {producto.u_costo}</td>
                {this.datos_proveedores(producto.codigo)}
            </tr>
        );
        return r;
    }
    cavecera_tabla() {
        return (
           <tr style={{"text-align":"center"}}>
               <th className="info">Codigo</th>
               <th className="info">Descripcion</th>
               <th className="info">Existencia</th>
               <th className="info">Pedido</th>
               <th className="info">Total Venta</th>
               <th className="info">Ultimo Costo</th>
               { this.cavecera_proveedores() }
           </tr>
        );
    }
}
/**************************************************
                    PASO 2.1
**************************************************/
class Btn_cotizar extends React.Component {
    constructor(props) {
        super(props);
        this.datos = this.props.datos;
    }
    /**render**/
    render() {
        return(
            <input className="btn btn-info" type="button" value="Alimentar Precios." style={{"margin-left":"0"}} onClick={ this.mostrar_modal.bind(this) }
            data-toggle="modal" data-target="#modal_cotizar"
             />
        );
    }
    mostrar_modal() {
        console.log(this.datos);
        this.cavecera();
        this.cuerpo();
        this.state = { proveedor: "", producto: "", precio: "" }

    }
    cavecera() {
        ReactDOM.render(
                    <h3>Capturar Precio.</h3>,
        document.getElementById("cavecera")
        );
    }
    cuerpo() {
        ReactDOM.render(
             <div>
               <div className="input-group">
                   <span className="input-group-addon">
                        <i className="glyphicon glyphicon-tasks"> Proveedor : </i>
                   </span>
                   {this.lista_proveedores()}
               </div>
               <div className="input-group">
                  <span className="input-group-addon">
                        <i className="glyphicon glyphicon-shopping-cart"> Producto : </i>
                  </span>
                    {this.lista_productos()}
               </div> 
               {this.btn_agregar()}
            </div>,
            document.getElementById("contenido")
        );
    }
    lista_proveedores() {
        const r = this.datos[0].proveedores.map((proveedor) =>
            <option value={proveedor} >{proveedor}</option>
           );
        return (<select className="form-control" >{r}</select>);
    }
    lista_productos() {
        const r = this.datos.map((productos) =>
            <option  value={productos.nombre} >{productos.nombre}</option>
           );
        return (<select className="form-control">{r}</select>);
    }
    btn_agregar() {
        return (
        <div style={{"display":"inline-block","width":"50%"}}>
           <div className="input-group">
                <span className="input-group-addon">
                    <i className="glyphicon glyphicon-usd"> Precio : </i>
                </span>
                <input className="form-control" type="text" min="0" rigth placeholder="0.00" onChange={ (e)=>{console.log("z") } }  />
           </div>

             <input type="button" className="btn btn-success" value="Agregar."  />
       </div>
         );
    }
}

class Btn_generar_orden_compra extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.datos;
    }

    /**render**/
    render() {
        return(
            <input className="btn btn-success" type="button" value="Generar Pre-Orden." style={{"margin-left":"0"}} />
        );
    }
}

/********************************************
           CHECAMOS EL PASO
********************************************/
function checar_datos(){
    if (localStorage.getItem("inventario_parcial") && localStorage.getItem("proveedores_verdura")) {
        tabla_comparativa();
    }
    else { 
        cargar_inventario();
    }
}

function cargar_inventario() {
    console.log("inventario");
    ReactDOM.render(
          <Cargar_inventario />,
          document.getElementById("root")
    );
}
function tabla_comparativa() {
    console.log("tabla");
    ReactDOM.render(
           <Tabla_comparativa />,
            document.getElementById("root")
    );
}
/**lanzador**/
checar_datos();