class CajerosPorEstablecimientos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            establecimiento: '0',
            fecha: this.fecha_hoy(),
            usuario: {
                id_scoi: -1,
                nombre: '',
                puesto: '',
                fecha: '',
                antigurdad: '',
                foto: ''
            },
            lista_establecimientos:[],
            lista: [],
            Lista_indicadores: [
                {
                    folio: 1,
                    descripcion: 'VENTA',
                    actual: 9,
                    anterior: 8
                },
                {
                    folio: 2,
                    descripcion: 'CANCELACION',
                    actual: 0,
                    anterior: 0
                },
                {
                    folio: 3,
                    descripcion: 'DIFERENCIA',
                    actual: 1,
                    anterior: 2
                }
            ]
        }
        this.Obtener_establecimientos();
    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading" style={{"display":"flex","top":"-10px"}} >
                    <div className="group-control" style={{ "width": "240px","display":"inline-block"}}>
                        <strong >Establecimiento</strong>
                        <select className="form-control"
                            defaultValue={this.state.establecimiento}
                            onChange={this.on_establecimiento.bind(this)}>
                            <option value="0">Seleccione una opcion</option>
                            {this.state.lista_establecimientos.map(est => <option value={est.folio}>{est.nombre}</option>)}
                        </select>
                    </div>
                    <div className="group-control" style={{ "width": "170px", "display": "inline-block","marginLeft":"15px"}}>
                        <strong>Fecha</strong>
                        <input type="date" className="form-control" value={this.parseo_fecha()} onChange={this.on_fecha.bind(this)} />
                    </div>
                    <div>
                        <i className="btn btn-default fa fa-download"
                            onClick={this.on_obtener_cajeros.bind(this)}
                            style={{"marginTop":"20px","marginLeft":"20px","fontSize":"20px"}}> </i>
                    </div>
                </div>
                <div className="panel-body" style={{ 'height': '460px', 'overflowY': 'scroll' }}>
                    <div className="panel-group" style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                        {this.state.lista.map(e => < ViewUsuario usuario={e} seleccion={() => this.on_usuario(e)} />)}
                    </div>
                </div>
                <ModalUsuario usuario={this.state.usuario} lista={this.state.Lista_indicadores} />
            </div>
        )
    }
    /*eventos*/
    on_usuario(usuario) {
        console.log(usuario);
        this.setState({ usuario: usuario });
        document.getElementById("modal_usuario").style.display = 'flex';
    }
    on_obtener_cajeros() {
        if (this.state.establecimiento > 0)
            this.Obtener_lista_cajeros();
        else alert("Seleccione Establecimiento...");
    }
    on_establecimiento(e) {
        this.setState({ establecimiento: e.target.value,lista:[] });
    }
    on_fecha(e) {
        const f = e.target.value.split("-"); 
        this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0], lista: []})
    }
    /*Metodos*/
    fecha_hoy() {
        const f = new Date();
        const dia = f.getDay() > 10 ? f.getDay() : "0" + f.getDay();
        const mes = f.getMonth() > 10 ? f.getMonth() : "0" + f.getMonth();
        const anio = f.getFullYear();

        return dia + "/" + mes + "/" + anio;
    }
    parseo_fecha() {
        const f = this.state.fecha.split("/");
        return f[2] + "-" + f[1] + "-" + f[0];
    }
    /**Conexiones**/
    Obtener_lista_cajeros() {
        fetch("servicios/indicadores/indicadores_cajas_conexion.asmx/Obtener_indicadores_caja_establecimiento", {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fecha: this.state.fecha,
                establecimiento: this.state.establecimiento
            })
        }).then(respuesta => {
                if (respuesta.status == "200")
                    respuesta.text().then(
                        (r) => {
                            r = JSON.parse(r);
                            if (r.d.length > 0)
                                this.setState({ lista: r.d });
                            else alert("Sin Datos A Mostrar!!!");
                        })
                        .catch(err => alert("Error en ", err));
                else alert("Error De Conexion!!!")
            })
            .catch((error) => {
                console.log(error)
                alert('Error:', error)
            })
    }
    Obtener_establecimientos() {
        fetch("servicios/matriz/conexiones.asmx/obtener_establecimientos", {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
        })
        .then(respuesta => {
            if (respuesta.status == "200")
                respuesta.text().then((r) =>
                {
                    r = JSON.parse(r);
                    this.setState({ lista_establecimientos: r.d });
                })
                .catch(err => alert("Error en ", err));
            else alert("Error De Conexion!!!")
        })
            .catch((error) => {
                console.log(error)
                alert('Error:', error)
            })
    }
}
const ViewUsuario=({usuario,seleccion})=>{
   return (
   <div className="panel panel-default" style={{'width':'580px','display':'inline-block','marginLeft':'20px','marginTop':'20px'}}>
        <div className="panel panel-heading">
            <div style={{'display':'inline-block','marginTop':'20px','height':'120px'}}>
                <img src={usuario.foto} width='110'className="img-rounded"/>
            </div>
            <Formularios
                nombre={usuario.nombre}
                puesto={usuario.puesto}
                fecha={usuario.fecha}
                antigurdad={usuario.antiguedad}
                seleccion={seleccion} />
        </div>
    </div>);
}
const Formularios = ({nombre,puesto,fecha,antigurdad,seleccion}) =>{
    const ComponenteGrande =({titulo,valor})=>(
        <div className="form-group"  style={{'width':'430px','display':'inline-block','marginLeft':'20px'}}>
            <strong>{titulo}</strong>
            <label className="form-control">{valor}</label>
        </div>);
    const ComponenteCorto=({titulo,valor})=>(
        <div style={{'width':'205px','display':'inline-block','marginLeft':'20px'}}>
            <strong>{titulo}</strong>
            <label className="form-control">{valor.substr(0, 21)+"."}</label>
        </div>
        );
    return(
        <div style={{'width':'500px','display':'inline-block','marginLeft':'100px','marginTop':'-110px','fontFamily':'consolas'}}>
            <ComponenteGrande titulo={'Nombre'}
                              valor={nombre}/>
            <ComponenteCorto titulo={'Puesto'}
                              valor={puesto}/>
            <ComponenteCorto titulo={'Antiguedad en puesto'}
                             valor={antigurdad} />                 
            <ComponenteCorto titulo={'Fecha Ingreso'}
                             valor={fecha}/>
            <i className="btn btn-info glyphicon glyphicon-calendar" 
                onClick={seleccion}
                style={{'marginTop':'0px','marginLeft':'25px','width':'205px','background':'#71b9d6'}}> 
                <label style={{'marginLeft':'0px'}}> Indicadores</label>
            </i>                                                           
        </div>
      
        );
}

class ModalUsuario extends React.Component{
    constructor(props){
        super(props);
        this.state={
            indicador:{
                folio:-1,
                descripcion:'',
                actual:0,
                anterior:0
            },
           lista_ultimas_semanas:[2,4,3,3,5,3,8,1,2]
        };
        this.vista_detalle = this.on_vista_detalle.bind(this);
    }
    render(){
        return(
            <div style={styles.modal_base} className="animate" id="modal_usuario">
                <div className="panel panel-default" style={styles.vista}>
                    <div className="panel-heading" style={styles.cavecera}>
                        <i className="close glyphicon glyphicon-remove-circle"
                            onClick={()=>document.getElementById("modal_usuario").style.display = 'none'}></i>
                        <label>Indicadores Caja.</label>
                    </div>
                    <div className="panel-heading">
                        <Cavecera nombre={this.props.usuario.nombre} 
                            puesto={this.props.usuario.puesto} 
                            foto={this.props.usuario.foto} />
                    </div>
                    <div className="panel-body" style={styles.cuerpo}>
                        <h4>Resultados Mensules</h4>
                        <ListaIndicadores lista={this.props.lista} evento={this.vista_detalle} />
                    </div>  
                    <div className="panel-footer" style={styles.pie}>
                        <i className="btn btn-default glyphicon glyphicon-remove" 
                            style={styles.pie.cerrar}
                            onClick={()=>document.getElementById("modal_usuario").style.display = 'none'}> <label>Salir</label></i>
                    </div>
                    <UltimaSemanas lista={this.state.lista_ultimas_semanas} />
                </div>
            </div>
        );
    }
    on_vista_detalle(folio){
        document.getElementById("modal_vista_semana").style.display="flex"; 
        console.log("Folio : ",folio);
        this.Grafica_Semanas();
    }
    Grafica_Semanas(){
        console.log("CHAR...");

        var popCanvas = document.getElementById("popChart");
        var barChart = new Chart(popCanvas, {
        type: 'bar',
        data: {
            labels: ["Semana 1","Semana 2","Semana 3","Semana 4","Semana 5","Semana 6","Semana 7","Semana 8","Semana 9"],
            datasets: [{
            label: 'INDICADOR CAJAS',
            data: this.state.lista_ultimas_semanas,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)'
            ]
            }]
        }
        });
    }
}
const Cavecera=({nombre,puesto,foto})=>{
    return(
      <div>
        <div style={styles.cavecera.foto} >
            <img src={foto} classNames="img-rounded" alt="foto" width="60" height="60" /> 
        </div>
        <div>
            <div className="form-group" style={styles.cavecera.contenedor_nombre}>
                <strong>Nombre:</strong>
                <h5 style={styles.cavecera.nombre}>{nombre}</h5>
            </div>
            <div className="form-group" style={styles.cavecera.contenedor_puesto}>
                <strong>Puesto:</strong>
                <h5 style={styles.cavecera.puesto}>{puesto}</h5>
            </div>
        </div>
      </div>  
    );

}
const ListaIndicadores =({lista,evento})=>{
    return(
        <div>
            <table className="table">
                <thead>
                    <tr className="info"> 
                        <th>
                            <strong>Indicador</strong>
                        </th>
                        <th style={styles.cuerpo.tabla.cavecera_indicador_ch}>Actual</th>
                        <th style={styles.cuerpo.tabla.cavecera_indicador_ch}>Anterior</th>
                        <th style={styles.cuerpo.tabla.cavecera_indicador_ch}></th>
                    </tr>
                </thead>
                <tbody>
                   <DatosIndicador lista={lista} evento={evento}/> 
                </tbody>
            </table>
        </div>
    );
}
const DatosIndicador=({lista,evento})=>{
    return lista.map(
        e=>(
        <tr>
            <td>{e.descripcion}</td>
            <td style={styles.cuerpo.tabla.cavecera_indicador_ch}> <Cumple valor={e.actual} condicion={e.actual<7} /></td>
            <td style={styles.cuerpo.tabla.cavecera_indicador_ch}> <Cumple valor={e.anterior} condicion={e.anterior<2} /></td>
            <td style={styles.cuerpo.tabla.cavecera_indicador_ch}> 
                    <i className="btn btn-info glyphicon glyphicon-list-alt" onClick={()=>evento(e.folio)}>
                        <label style={{marginLeft:"5px"}}>Detalle</label>
                    </i>
                </td>
        </tr>)
    );
    function Cumple({valor,condicion}){
        var cumple= condicion?"btn btn-success glyphicon glyphicon-ok":"btn btn-danger glyphicon glyphicon-remove";

        return (
        <i className={cumple}> 
            <label style={{marginLeft:"5px"}}>{valor}</label>
        </i>);
    }
}

const styles= {
    modal_base:{
        position:"fixed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"rgba(144, 144, 146, 0.29)",
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:9991,
        display:"none"
    },
    vista:{
        height:"700px",
        width:"800px"
    },
    cavecera:{
        height:"40px",
        backgroundColor:"#349CEB",
        color:"#FFFFFF",
        foto:{
            height:"50px",
            display:"inline-block",
            width:"60px"
        },
        contenedor_nombre:{
            marginLeft:"10px",
            display:"inline-block",
            width:"480px",
            marginTop:"-60px",
            marginLeft:"68px"
        },
        contenedor_puesto:{ 
            marginLeft:"10px",
            display:"inline-block",
            marginTop:"-70px",
            width:"210px"
        },
        nombre:{
            borderBottom:"solid 1px #000000"
        },
        puesto:{
            borderBottom:"solid 1px #000000" 
        }
    },
    cuerpo:{
        height:"550px",
        tabla:{
            cavecera_indicador_ch:{
                width:"80px",
                textAlign:"center"
            }
        }
    },
    pie:{
        height:"50px",
        cerrar:{
            marginLeft:"690px",
            marginTop:"-6px"
        }
    }

}

class UltimaSemanas extends React.Component {
    render(){
        return(
            <div style={styles.modal_base} className="animate" id="modal_vista_semana">
                <div className="panel panel-default" style={styles2.vista}>
                    <div className="panel-heading" style={styles2.cavecera}>
                        <i className="close glyphicon glyphicon-remove-circle" onClick={()=>document.getElementById("modal_vista_semana").style.display="none"}></i>
                        <label>Indicadores Ultmas semanas.</label>
                    </div>
                    <div className="panel-heading"  style={styles2.tabla}>
                        <h4>Resultados Semanales</h4>
                        <label>Grafica : </label>
                        <TablaSemana lista={this.props.lista}/>
                    </div>
                    <div className="panel-body" style={styles2.cuerpo}>
                        <canvas id="popChart" width="650" height="230">
                
                        </canvas>
                    </div>  
                    <div className="panel-footer" style={styles2.pie}>
                        <i className="btn btn-default glyphicon glyphicon-remove" 
                            onClick={()=>document.getElementById("modal_vista_semana").style.display="none"}
                            style={styles2.pie.cerrar}> <label>Salir</label></i>
                    </div>
                </div>
            </div>
        );
    }
}
const TablaSemana=({lista})=>{
    return(
        <table className="table">
            <thead>
                <th><i className="glyphicon glyphicon-calendar"></i> 1</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 2</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 3</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 4</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 5</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 6</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 7</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 8</th>
                <th><i className="glyphicon glyphicon-calendar"></i> 9</th>
            </thead>
            <tbody>
                <Datos />
            </tbody>
        </table>
    );
    function Datos(){
        return <tr>{lista.map(
            (e,p)=><td key={p}> <Comparar actual={e} anterior={lista[p-1]} /></td>
        )}</tr>
    }
    function Comparar({actual,anterior}){
        var res
        if(actual!=anterior && anterior!=null)
            res=anterior>actual?" btn btn-danger glyphicon glyphicon-download":"btn btn-success glyphicon glyphicon-upload";
        else res = anterior==actual ?"btn btn-info glyphicon glyphicon-minus":"btn btn-default glyphicon glyphicon-play-circle";

        return <i className={res}>
                    <label style={{marginLeft:"5px"}}>{actual}</label>
                </i>
    }
}


const styles2 = {
    vista:{
        height:"500px",
        width:"700px"
    },
    cavecera:{
        height:"40px",
        backgroundColor:"#2EAB64",
        color:"#FFFFFF"
    },
    tabla:{
        height:"170px"
    },
    cuerpo:{
        height:"270px",
        tabla:{
            cavecera_indicador_ch:{
                width:"80px",
                textAlign:"center"
            }
        }
    },
    pie:{
        height:"50px",
        cerrar:{
            marginLeft:"590px",
            marginTop:"-6px"
        }
    }
}

ReactDOM.render(
    <CajerosPorEstablecimientos />,
    document.getElementById("contenedor")
);
