/*Clase pada manejar la tabla*/
class tabla_logica{
    constructor() {
        this.id = "";
        this.pasillo = "";
        this.localizacion = "";
        this.cantidad = 0;
        this.avance = 0;
        this.diferenca = 0;
        this.acumulado = 0.0;
        this.semana = 1;
    }
    get getID() {return this.id;}
    set setID(p) { this.id = p; }
    get getPasillo() {return this.pasillo;}
    set setPasillo(p) { this.pasillo = p; }
    get getLocalizacion() { return this.localizacion; }
    set setLocalizacion(p) { this.localizacion = p; }
    get getCantidad() {return this.cantidad;}
    set setCantidad(c) {this.cantidad = c;}
    get getAvance() {return this.avance;}
    set setAvance(avance) {this.avance = avance ? this.avance += 1 : this.avance;}
    Diferencia() {this.diferenca = this.cantidad - this.avance;}
    Acumulado() {
        var semanas_mes = 4;
        if (this.avance !== 0 && this.cantidad !== 0){
            this.acumulado = Math.round((((this.avance / (this.semana / semanas_mes)) / this.cantidad)) * 1000) / 10;
        }
        else
            this.acumulado = 0;

    }
}

/*Funcion de loguica de negocios*/
function tabla_principal() {
    /***funcion principal ***/
    var pasillos_arr = [];
    //variables globales
    var pasillos = new tabla_logica();
    var clasificado_8020 = new tabla_logica();
    

    clasificado_8020.setPasillo = "80/20";
    var contador_80_20 = 0;
    var contador_pasillo = 0;
    
    //ordenar Productos
    PRODUCTOS_ANALIZADOS.sort(function (a, b) {
        if (a.pasillo > b.pasillo) {
            return 1;
        }
        if (a.pasillo < b.pasillo) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    //obtener 8020
    $.each(PRODUCTOS_ANALIZADOS.filter(cla =>cla.clasificacion_8020 === "8020"), (index,item) => {
        llenar_8020(item);
    });
    pasillos_arr.push (clasificado_8020);
//recorrido datos
    $.each(PRODUCTOS_ANALIZADOS, (index, item) => {
       
        if (index === 0) {
            pasillos = new tabla_logica();
            pasillos.setPasillo =  item.pasillo;
        }
        if (pasillos.getPasillo === item.pasillo) {

            llenar_pasillo(item);
        }
        else if (pasillos.getPasillo !== item.pasillo) {
            
            pasillos_arr.push(pasillos);

            pasillos = new tabla_logica();
            contador_pasillo=0;
            pasillos.setPasillo = item.pasillo;
            llenar_pasillo(item);
        }
    });
    pasillos_arr.push(pasillos);

//funciones
    function llenar_8020(item) {
        
       clasificado_8020.setAvance = (item.BODART_N      > 0 || item.BODART_O        > 0);
       clasificado_8020.setAvance = (item.LEY_PCIO_N    > 0 || item.LEY_PCIO_O      > 0);
       clasificado_8020.setAvance = (item.LOPEZ_N       > 0 || item.LOPEZ_O         > 0);
       clasificado_8020.setAvance = (item.MEZQUITILLO_N > 0 || item.MEZQUITILLO_O   > 0);
       clasificado_8020.setAvance = (item.SORIANA_N     > 0 || item.SORIANA_O       > 0);
       clasificado_8020.setAvance = (item.TERESITA_N    > 0 || item.TERESITA_O      > 0);

       contador_80_20++;

       clasificado_8020.setCantidad = contador_80_20;
       clasificado_8020.Acumulado();
       clasificado_8020.Diferencia();        
    }
    function llenar_pasillo(item) {

        pasillos.setAvance = (item.BODART_N         > 0 || item.BODART_O        > 0) ;
        pasillos.setAvance = (item.LEY_PCIO_N       > 0 || item.LEY_PCIO_O      > 0) ;
        pasillos.setAvance = (item.LOPEZ_N          > 0 || item.LOPEZ_O         > 0) ;
        pasillos.setAvance = (item.MEZQUITILLO_N    > 0 || item.MEZQUITILLO_O   > 0) ;
        pasillos.setAvance = (item.SORIANA_N        > 0 || item.SORIANA_O       > 0) ;
        pasillos.setAvance = (item.TERESITA_N       > 0 || item.TERESITA_O      > 0) ;

        contador_pasillo ++;

        pasillos.setCantidad = contador_pasillo ;
        pasillos.Acumulado();
        pasillos.Diferencia();
    }
    /*Funciones del DOM*/
    ReactDOM.render(
        <div className="tabla_productos">
          <Pasillo datos={pasillos_arr} n_clase={"pasillo"} />
        </div>
      ,$("#principal")[0]
    );
}
function tabla_mueble(ubicacion) {
    /**tabla muebles**/
    //variables globales
    var muebles_arr = [];
    var muebles = new tabla_logica();
    var contador_mueble = 0;
    var filtro=[];
    //ordenar pasillo por mueble
    PRODUCTOS_ANALIZADOS.sort(function (a, b) {
        if (a.localizacion > b.localizacion) {
            return 1;
        }
        if (a.localizacion < b.localizacion) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    if (ubicacion !== "80/20")
        filtro = PRODUCTOS_ANALIZADOS.filter(n =>n.pasillo === ubicacion);
    else
        filtro = PRODUCTOS_ANALIZADOS.filter(n =>n.clasificacion_8020==="8020");
    //recorrido al filtro
    $.each(filtro, (index, item) => {
        if (index === 0) {
            muebles.setLocalizacion = item.localizacion;
        }
        if (item.localizacion === muebles.getLocalizacion) {
            llenar_objMueble(item);
        }
        else if (item) {
            muebles_arr.push(muebles);

            muebles = new tabla_logica();
            muebles.setLocalizacion = item.localizacion;
            contador_mueble=0;
            llenar_objMueble(item);
        }
    });
    muebles_arr.push(muebles);

    //funciones 
    function llenar_objMueble(item) {
        muebles.setAvance = (item.BODART_N > 0 || item.BODART_O > 0);
        muebles.setAvance = (item.LEY_PCIO_N > 0 || item.LEY_PCIO_O > 0);
        muebles.setAvance = (item.LOPEZ_N > 0 || item.LOPEZ_O > 0);
        muebles.setAvance = (item.MEZQUITILLO_N > 0 || item.MEZQUITILLO_O > 0);
        muebles.setAvance = (item.SORIANA_N > 0 || item.SORIANA_O > 0);
        muebles.setAvance = (item.TERESITA_N > 0 || item.TERESITA_O > 0);

        contador_mueble ++;
        muebles.setPasillo = ubicacion;
        muebles.setCantidad = contador_mueble ;
        muebles.Acumulado();
        muebles.Diferencia();
    }

    /*Funciones del DOM*/
    ReactDOM.render(
    <div className="tabla_productos" >
        <Mueble datos={muebles_arr}  n_clase={"mueble"} />
    </div>
   ,$("#principal")[0]
  );
}

function productos(ubicacion,mueble) {
    var productos_arr =[];
    var filtro=[];

    if (ubicacion !== "80/20")
        filtro = PRODUCTOS_ANALIZADOS.filter(n =>n.pasillo === ubicacion && n.localizacion === mueble);
    else
        filtro = PRODUCTOS_ANALIZADOS.filter(n =>n.clasificacion_8020==="8020" && n.localizacion === mueble);

    //recorrido al filtro
    $.each(filtro, (index, item) => {
        productos_arr.push(item);
    });

    /*Funciones del DOM*/
    ReactDOM.render(
    <div className="tabla_productos" >
        <Producto datos={productos_arr} n_clase={"producto"} />
    </div>
     ,$("#principal")[0]
  );
}
/*Tabla de grficos*/
function graficar_datos(Nombre, barras, datos) {
    var ctx = document.getElementById('graficos').getContext('2d');
    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    window.grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: barras,
            datasets: [{
                label: Nombre,
                data: datos,
                backgroundColor: 'rgba(75, 150, 205, 0.6)'
            }]
        },
        options: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 100,
                    fontColor: 'black'
                }
            }
        }
    });
    
}

    /*manejo del DOM*/
    class Pasillo extends React.Component {
        constructor(props) {
            super(props);
            this.lista_datos = props.datos;
            this.clase = props.n_clase;
        }
        listaDatos() {
            const r = this.lista_datos.map(
                (pasillo) => <tr key={pasillo.pasillo} className={this.clase}  onClick={ (e)=>tabla_mueble( pasillo.pasillo ) } style={{"height":"24px"}}>
                    <td>
                        <i className="glyphicon glyphicon-shopping-cart"> </i>
                        {" Pasillo : " + pasillo.pasillo}
                    </td>
                    <td className="numero">
                        {pasillo.cantidad} Producto(s)
                    </td>
                    <td className="numero">
                        {pasillo.avance} Producto(s)
                    </td>
                    <td className="numero">
                        {pasillo.diferenca} Producto(s)
                    </td>
                    <td className="numero">
                        {pasillo.acumulado} %
                         <Checar_acumulado acumulado={ pasillo.acumulado } />
                    </td>
            </tr>);
            return r;
        }
        agregar_geraficos_acumulado() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.acumulado);
            });
            graficar_datos("Acumulado", nombres, datos);
        }
        agregar_geraficos_cantidad() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.cantidad);
            });
            graficar_datos("Cantidad", nombres, datos);
        }
        agregar_geraficos_avance() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.avance);
            });
            graficar_datos("Avance", nombres, datos);
        }
        agregar_geraficos_diferencia() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Pasillo : " + item.pasillo);
                datos.push(item.diferenca);
            });
            graficar_datos("Diferenca", nombres, datos);
        }
        render() {
            const nombres = [<div className="centrar" style={{"display":"inline-block"}}>Super V</div>,
                    <div>
                        <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_cantidad() }} >
                        </i> Cantidad
                    </div>,
                   <div>
                        <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_avance() }} >
                        </i> Avance
                    </div>,
                    <div>
                        <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_diferencia() }}  >
                        </i> Diferencia
                    </div>,
                    <div>
                        <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_acumulado() }} >
                        </i> Acumulado
                    </div>
            ];
            return (
                <table className="table table-bordered">
                    <tbody>
                        <Cavecera_tabla datos={nombres} />
                        {this.listaDatos()}
                    </tbody>
                </table>
          );
        }
    }
    class Mueble extends React.Component {
        constructor(props) {
            super(props);
            this.lista_datos = props.datos;
            this.clase = props.n_clase;
        }
        listaDatos() {
            const r = this.lista_datos.map(
               (Mueble) =>
                <tr key={Mueble.localizacion} style={{"height":"24px"}}
                            className={this.clase}
                            onClick={ (e) => productos(Mueble.pasillo, Mueble.localizacion)}>
                    <td name={Mueble.localizacion} >
                        {" Mueble : " + Mueble.localizacion}
                    </td>
                    <td className="numero">
                        {Mueble.cantidad} Producto(s)
                    </td>
                    <td className="numero">
                        {Mueble.avance} Producto(s)
                    </td>
                    <td className="numero">
                        {Mueble.diferenca} Producto(s)
                    </td>
                    <td className="numero">
                        {Mueble.acumulado} %
                        <Checar_acumulado acumulado={ Mueble.acumulado } />
                    </td>
                </tr>);
            return r;
        }
        agregar_geraficos_acumulado() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.acumulado);
            });
            graficar_datos("Acumulado", nombres, datos);
        }
        agregar_geraficos_cantidad() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.cantidad);
            });
            graficar_datos("Cantidad", nombres, datos);
        }
        agregar_geraficos_avance() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.avance);
            });
            graficar_datos("Avance", nombres, datos);
        }
        agregar_geraficos_diferencia() {
            var nombres = [], datos = [];
            $.each(this.lista_datos, (index, item) => {
                nombres.push("Mueble : " + item.localizacion);
                datos.push(item.diferenca);
            });
            graficar_datos("Diferenca", nombres, datos);
        }
        render() {
            const nombres = [<div className="centrar" style={{"display":"inline-block"}}>Pasillo: {this.lista_datos[0].pasillo} </div>,
                <div>
                    <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_cantidad() }} >
                    </i> Cantidad
                </div>,
                <div>
                    <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_avance() }} >
                    </i>Avance
                </div>,
                <div>
                    <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_diferencia() }} >
                    </i> Diferencia
                </div>,
                <div>
                    <i className="glyphicon glyphicon-stats" data-toggle="modal" data-target="#modal_Grafica" title="Grafica de Barras" onClick={ (e)=>{ this.agregar_geraficos_acumulado() }} >
                    </i>Acumulado
                </div>
            ];
            return (
                <table className="table table-bordered">
                <tbody>
                    <Cavecera_tabla datos={nombres}  />
                    {this.listaDatos()}
                </tbody>
        </table>
            );
        }
    }
    class Producto extends React.Component {
        constructor(props) {
            super(props);
            this.lista_datos = props.datos;
            this.clase = props.n_clase;
            this.capturados = PRODUCTOS_ANALIZADOS.filter(x=> x.BODART_N !== "0" || x.BODART_O !== "0" || x.LEY_PCIO_N !== "0" || x.LEY_PCIO_O !== "0" || x.LEY_PCIO_O !== "0" || x.LOPEZ_N !== "0" || x.MEZQUITILLO_N !== "0" || x.MEZQUITILLO_N !== "0" || x.SORIANA_N !== "0" || x.SORIANA_O !== "0" || x.TERESITA_N !== "0" || x.TERESITA_O !== "0")
        }
        listaDatos() {
            const r = this.lista_datos.map(
                (Producto) =>
                  <tr key={Producto.cod_prod} className={this.clase} style={{"height":"24px"}}
                      onClick={ (e)=>{this.detalles_producto(Producto.cod_prod)}}
                      data-toggle="modal" data-target="#modal_detalles" >
                    <td>
                        {this.clasificado(Producto.clasificacion_8020)}
                        {Producto.descripcion}
                    </td>
                    <td className="centrar">
                        {Producto.cod_prod}
                    </td>
                    <td className="centrar">
                        {Producto.clase_producto}
                    </td>
                    <td className="centrar">
                        {Producto.categoria}
                    </td>
                    <td className="centrar">
                        {Producto.familia}
                    </td>
                    
                    <td className="numero">
                        $ {Producto.ultimo_costo}
                    </td>
                    <td className="numero">
                        $ {Producto.costo_promedio}
                    </td>
                    <td className="numero">
                        $ {Producto.precio_de_venta}
                    </td>
                    <td className="numero">
                        $ {Producto.precio_de_oferta_actual}
                    </td>
                    {this.estatus(Producto)}
                    
                </tr>);
            return r;
        }
        clasificado(c) {
            var r = <i className="glyphicon glyphicon-shopping-cart" style={{"font-size":"22px","margin-right":"5px","color":"blue"}}></i>;
            if (c === "8020") {
                r = <span className="badge bg-green" style={{"font-size":"8px","margin-right":"5px"}}> 80/20 </span>
            }
            return r;
        }
        estatus(item) {
            var contador = this.capturados.indexOf(this.capturados.find(x=>x.descripcion === item.descripcion))
            if (contador > 0) {
                return (
                <td className="centrar" style={{"color":"green","font-size":"12px","width":"120px","height":"24px"}}>
                        <i className="glyphicon glyphicon-ok" > Capturado</i>
                </td>);
            }
            else return (
            <td className="centrar" style={{"color":"orange","font-size":"12px","width":"120px","height":"24px"}}>
                <i className="glyphicon glyphicon-remove"> Pendiente</i> 
                
            </td>);

        }
        detalles_producto(id) {
            //variables
            const producto = PRODUCTOS_ANALIZADOS.find(p => p.cod_prod === id);
            App();

            //funciones
            ReactDOM.render(
                <p>{this.clasificado(producto.clasificacion_8020)}  Producto : {producto.descripcion}.</p> 
                , $("#nombre_rpoducto")[0]
    );
            function Llenar_tabla() {
                return (
                    <div>
                        <div>
                            <table className="table table-bordered">
                                <tbody>
                                   <tr  style={{"background":"#17b3ed"}}>
                                       <th>Venta Ultimos 90 Dias </th>
                                       <th>Clase</th>
                                       <th>Categoria</th>
                                       <th>Familia</th>
                                       <th>Ultimo Costo</th>
                                       <th>Costo Promedio</th>
                                       <th>Margen</th>
                                   </tr>
                                    <tr>
                                        <td className="centrar"  ><h4><a style={{"color":"black"}}>{producto.venta_ultimos_90_dias} .</a></h4></td>
                                        <td>{producto.clase_producto}</td>
                                        <td>{producto.categoria}</td>
                                        <td>{producto.familia}</td>
                                        <td className="numero">$ {producto.ultimo_costo}</td>
                                        <td className="numero">$ {producto.costo_promedio}</td>
                                        <td className="numero">$ {producto.margen}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                        <table className="table table-bordered">
                            <tbody>
                                <tr className="success centrar">
                                    <th className="centrar" >Izagar</th>
                                    <th>Bodart</th>
                                    <th>Ley</th>
                                    <th>Lopez</th>
                                    <th>Mesquitillo</th>
                                    <th>Soriana</th>
                                    <th>Teresita</th>
                                </tr>
                                <tr>
                                    <th className="centrar">Precio : $ {producto.precio_de_venta}</th>
                                    <td className="numero">
                                        $ {producto.BODART_N}
                                </td>
                                <td className="numero">
                                    $ {producto.LEY_PCIO_N}
                                </td>
                                <td className="numero">
                                    $ {producto.LOPEZ_N}
                                </td>
                                <td className="numero">
                                    $ {producto.MEZQUITILLO_N}
                                </td>
                                <td className="numero">
                                    $ {producto.SORIANA_N}
                                </td>
                                <td className="numero">
                                    $ {producto.TERESITA_N}
                                </td>
                </tr>
                 <tr>
                    <th className="centrar">Oferta : $ {producto.precio_de_oferta_actual}</th>
                    <td className="numero">
                        $ {producto.BODART_O}
                    </td>
                    <td className="numero">
                        $ {producto.LEY_PCIO_O}
                    </td>
                    <td className="numero">
                        $ {producto.LOPEZ_O}
                    </td>
                    <td className="numero">
                        $ {producto.MEZQUITILLO_O}
                    </td>
                    <td className="numero">
                        $ {producto.SORIANA_O}
                    </td>
                    <td className="numero">
                        $ {producto.TERESITA_O}
                    </td>
                 </tr>
            </tbody>
        </table>
        </div>
    </div>
           );
            }
            function App(){
                ReactDOM.render(
                    <div>
                        <Llenar_tabla />      
                    </div>
                   , $("#contenido")[0]
                );
            }
        }
        render() {
            const nombres = [<Retornar titulo={this.lista_datos[0].localizacion} pasillo={ this.lista_datos[0].pasillo } />, "Codigo", "Clase", "Categoria", "Familia", " Ultimo Costo", "Costo Promedio", "Precio", "Oferta", "Estatus"];

            return (
                <table className="table table-bordered">
                <tbody>
                 <Cavecera_tabla datos={nombres} />
                    {this.listaDatos()}
                </tbody>
                </table>
          );
        }
    }
class Retornar extends React.Component {
    constructor(props) {
        super(props);
        this.titulo = this.props.titulo;
        this.pasillo = this.props.pasillo;
    }
    render() {
        return (
            <div style={{"display":"inline-block"}}>
                Pasillo : {this.pasillo} <br />
                <i className="fa fa-mail-reply"
                   style={{ "margin-right":"20px", "margin-left":"20px"}}
                   onClick={ ()=>
                    tabla_mueble(this.pasillo)}
                    title="Regresar">
                </i>
                <a style={ {"display":"inline-block",color:"gray"} }>{ this.titulo}</a>
            </div>
        );
    }
}
class Home_icon extends React.Component {
    render() {
        return (
             <span style={{ "margin-right":"20px","font-size":"25px"}}>
              <i className="glyphicon glyphicon-home"
                 title="Regresar."
                 onClick={ (e)=>
                  tabla_principal()} >
              </i>
             </span>
            );
    }
}
class Cavecera_tabla extends React.Component {
    constructor(props) {
        super(props);
        this.datos = this.props.datos;
        this.titulo = this.props.datos[0];
    }
    render() {
        return (
            <tr className="cavecera" style={ {'font-size':'16px','border-bottom':'solid 1px #0094ff','color':'white','background':'#3eb9e1'}}>
                {this.datos.map( (cell)=>{
                if(cell=== this.titulo)
                return (
                        <th style={{"text-align":"left"}}> <Home_icon />{cell}</th>
                );
                return (
                     <th>{cell}</th>
                );
                } )}
            </tr>
        );
    }
}
class Checar_acumulado extends React.Component {
    constructor(props) {
        super(props);
        this.acumulado = this.props.acumulado;
    }
    render() {
        var ac = <i className="glyphicon glyphicon-thumbs-up" style={{"color":"blue"}}></i>;
        if (this.acumulado < 85) {
            ac = <i className="glyphicon glyphicon-thumbs-down" style={{"color":"orange"}}></i>;
        }
        return ( ac );
    }

}

//arreglo de datos
var PRODUCTOS_ANALIZADOS = []; //conexion_ajax();//JSON.parse(localStorage.getItem("Productos"));//

function conexion() {
    document.getElementById("guardar_grafica").addEventListener("click", function () {
        var img_b64 = window.grafica.toBase64Image();//base64 de la imagen
        download(img_b64, "grafica.png", "image/png");

    });

    //variables a usar
    var xhttp = new XMLHttpRequest();
    var respuesta = "";
    xhttp.onreadystatechange = function () {//checamos si hay resultado
        if (this.readyState === 4 && this.status === 200) {
            respuesta = this.responseText;//cachamos el resultado
            respuesta = JSON.parse(respuesta);//parseamos a Json
            PRODUCTOS_ANALIZADOS = respuesta.d;
            tabla_principal();
            $("#dialog").hide();
        }//si no hay resultado manda una alerta
        else if (this.status > 200) {
            alert("Error : " + this.estatus);
            $("#dialog").hide();
        }
    };//fin
    //llamada al servicio
    xhttp.open("post", "servicios/comercializacion/analisis_precio_competenciaServ.asmx/Obtener_analisis", true);
    //tipo de datos
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //Datos a enviar
    xhttp.send();
}//fin
conexion();
 class App_index extends React.Component {
    constructor(props) {
        super(props);
        this.msg = this.props.msg;
    }
    render() {
        return (
            <div className="tabla_productos"  style={{"text-align":"center"}}>
            <div id="dialog" title="Cargando Datos...">
               <br />
               <br />
               <br />
               <img id="cargando" src="../../../../Data/loadin_izagar.gif" />
            </div>
        </div>
        );
    }
}
ReactDOM.render(
    <App_index />
    , $("#principal")[0]
);
