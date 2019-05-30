class Botonera_accion extends React.Component {
    render() {
        return(
            <div className="btn-group">
                <span className="btn btn-primary"
                      onClick={this.props.on_ecxel}>
                 <label className="fa fa-file-excel-o"></label> ECXEL
                </span>
                <span className="btn btn-primary"
                      onClick={this.props.on_resultados}>
                    <label className="fa fa-area-chart"></label>  RESULTADOS
                </span>
                <span className="btn btn-primary"
                      onClick={this.props.on_deshacer}>
                    <label className="fa fa-close"></label>  DESHACER
                </span>
            </div>
        );
    }
}
class Elementos extends React.Component {
    render() {
        return(
            <div>
                <div style={{"width":"200px","display":"inline-block"}}
                     className="form-group">
                        <span className="glyphicon glyphicon-tasks">
                            <label style={{"marginLeft":"5px"}}>ESTABLECIMIENTO:</label>
                        </span>
                        <select className="form-control"
                                onChange={this.props.on_establecimiento}>
                            <option value="-1">SELECCIONAR...</option>
                            {this.establecimientos()}
                        </select>
                </div>
                <div style={{"width":"200px","display":"inline-block","marginLeft":"15px","marginTop":"0px","position":"absolute"}}
                      className="form-group">
                    <span className="fa fa-calendar">
                            <label style={{"marginLeft":"5px"}}>INICIO:</label>
                    </span>
                     <input type="date" className="form-control" 
                            value={this.parseo_fecha(this.props.fecha_1)} 
                            onChange={this.props.seleccion_fecha_1} />
                </div>
                <div style={{"width":"200px","display":"inline-block","marginLeft":"225px","marginTop":"0px","position":"absolute"}}
                     className="form-group">
                    <span className="fa fa-calendar">
                            <label style={{"marginLeft":"5px"}}>TERMINO:</label>
                    </span>
                     <input type="date" className="form-control"
                            value={this.parseo_fecha(this.props.fecha_2)}
                            onChange={this.props.seleccion_fecha_2} />
                </div>
            </div>
        );
    }
    /*****/
    parseo_fecha(fecha) {
        const f = fecha.split("/");
        return f[2] + "-" + f[1] + "-" + f[0];
    }
    /**componentes**/
    establecimientos() {
        const seleccion = (e) =>e == this.props.estado.folio_establecimiento;
        return this.props.establecimientos.map(e=> <option key={e.id_establecimiento} selected={seleccion(e.id_establecimiento)}
            value={e.id_establecimiento}>{e.nombre_establecimiento}</option>);
    }
}
class Resultados extends React.Component {
    render() {
        return (
            <div>
                {this.total_limpieza()}
                {this.total_surtido()}
                {this.total_imagen()}
                {this.total_caducidad()}
                {this.total_senializacion()} 
                {this.total_generales()}
                {this.total_abs()}
            </div>
            );
    }
    resultados(filtro) {
        var si = 0, no = 0, na = 0, total = 0;
        const lista = this.props.lista.filter(filtro);
        lista.forEach((item, index) => {
            si += item.rsi;
            no += item.rno;
            na += item.rna;
        });
        total = Math.round((si / (si + no)) * 10000) / 100 || "--";

        return total ;
    }
    total_limpieza() {
        var total=0;
        total = this.resultados((e) =>e.limpieza > 0);
        return this.resultado(total, "LIMPIEZA");
    }
    total_surtido() {
        var total = 0;
        total = this.resultados((e) =>e.surtido > 0);
        return this.resultado(total, "SURTIDO");
    }
    total_imagen() {
        var total = 0;
        total = this.resultados((e) =>e.imagen > 0);
        return this.resultado(total, "IMAGEN");
    }
    total_caducidad() {
        var total = 0;
        total = this.resultados((e) =>e.caducidad > 0);
        return this.resultado(total, "CADUCADO");
    }
    total_senializacion() {
        var si = 0, no = 0, na = 0, total = 0;
        total = this.resultados((e) =>e.senializacion > 0);
        return this.resultado(total, "SEÑALIZACION");
    }
    total_generales() {
        var total = 0;
        total = this.resultados((e) =>e.generales > 0);
        return this.resultado(total, "GENERAL");
    }
    total_abs() {
        var total = 0;
        const limpieza = this.resultados((e) =>e.limpieza > 0);
        const surtido = this.resultados((e) =>e.surtido > 0);
        const imagen = this.resultados((e) =>e.imagen > 0);
        const caducidad = this.resultados((e) =>e.caducidad > 0);
        const senializacion = this.resultados((e) =>e.senializacion > 0);
        const generales = this.resultados((e) =>e.generales > 0);
        var n = 0;
        total = [limpieza, surtido, imagen, caducidad, senializacion, generales].filter(
            (item) => {
                if (item >= 0) {
                    n += item;
                    return true;
                }
                return false;
            });

        total = (n / total.length) || 0;
        total = Math.round(total * 100) / 100 || "--";

        console.log("Total:",total);
        return this.resultado(total, "TOTAL:");
    }
    resultado(filtro, titulo) {
        return <div style={{"width":"85px","display":"inline-block","marginLeft":"35px","textAlign":"center"}}>
                   <label>{titulo}</label>
                   <span className="form-control" style={{"width":"70px","display":"inline-block","textAlign":"right"}}>
                     {filtro}
                   </span>
                   <span className="fa fa-percent"
                         style={{"display":"inline-block"}}></span>
                </div>
    }
}
class Tabla_departamentos extends React.Component {
    render() {
        return (
            <div id="contenedor_resultados">
                <table id="resultados" className="table table-bordered">
                    <thead></thead>
                    <tbody>
                        {this.construir_cuerpo()}
                    </tbody>
                </table>
            </div>
            );
    }
    /****/
    resultados_pertenece(filtro) {
        var si = 0, no = 0, na = 0, total = 0;
        const lista = this.props.lista.filter(filtro);
        lista.forEach((item, index) => {
            si += item.rsi;
            no += item.rno;
            na += item.rna;
        });
        total = Math.round((si / (si + no)) * 10000) || 0;

        return total / 100;
    }
    construir_cuerpo() {
        var filtro = "",cuestionario="";
        return this.props.lista.map(
            (elemento, pos) =>{
                var res = [];
                if (pos == 0) {
                    cuestionario = elemento.zona_inspeccion;
                    res.push(this.cavecera(cuestionario));
                }
                if (cuestionario == elemento.zona_inspeccion) {
                    res.push(this.fila(elemento));
                } else {
                    res.push(this.pie_departamento(cuestionario));
                    cuestionario = elemento.zona_inspeccion;
                    res.push(this.cavecera(cuestionario));
                    res.push(this.fila(elemento));
                }
                if (pos == this.props.lista.length - 1) {
                    res.push(this.pie_departamento(cuestionario));
                }
                return res;
        });
    }
    /*****/
    cavecera(elemento) {
        return <tr className="info">
                    <th>#</th>
                    <th>{elemento}</th>
                    <th style={{"background":"green","color":"azure"}}>SI</th>
                    <th style={{"background":"red","color":"azure"}}>NO</th>
                    <th style={{"background":"blue","color":"azure"}}>NA</th>
                    <th>LIMPIEZA</th>
                    <th>SURTIDO</th>
                    <th>IMAGEN</th>
                    <th>GENERALES</th>
                    <th>SEÑALIZACION</th>
                    <th>CADUCIDAD</th>
                </tr>
    }
    fila(elemento) {
        const si = (e) => e > 0 ? "green" : "black";
        const no = (e) => e > 0 ? "red" : "black";
        const na = (e) => e > 0 ? "blue" : "black";

        const res = (r, si, no, na) =>r > 0 ? (si>0?"green":no>0?"red":"blue") : "";

        return <tr>
                    <td>{elemento.posicion}</td>
                    <td>{elemento.pregunta}</td>
                    <td style={{"color": si(elemento.rsi)}}>{elemento.rsi}</td>
                    <td style={{"color": no(elemento.rno)}}>{elemento.rno}</td>
                    <td style={{"color": na(elemento.rna)}}>{elemento.rna}</td>
                    <td style={{"background": res(elemento.limpieza,elemento.rsi,elemento.rno,elemento.rna)}}>
                        {elemento.limpieza}
                    </td>
                    <td style={{"background": res(elemento.surtido,elemento.rsi,elemento.rno,elemento.rna)}}>
                        {elemento.surtido}
                    </td>
                    <td style={{"background": res(elemento.imagen,elemento.rsi,elemento.rno,elemento.rna)}}>
                        {elemento.imagen}
                    </td>
                    <td style={{"background": res(elemento.generales,elemento.rsi,elemento.rno,elemento.rna)}}>
                        {elemento.generales}
                    </td>
                    <td style={{"background": res(elemento.senializacion,elemento.rsi,elemento.rno,elemento.rna)}}>
                        {elemento.senializacion}
                    </td>
                    <td style={{"background": res(elemento.caducidad,elemento.rsi,elemento.rno,elemento.rna)}}>
                        {elemento.caducidad}
                    </td>
                </tr>
    }
    pie_departamento(filtro) {
        var total = 0;
        const limpieza      = this.resultados_pertenece((e) =>e.limpieza > 0 && e.zona_inspeccion==filtro);
        const surtido       = this.resultados_pertenece((e) =>e.surtido > 0 && e.zona_inspeccion==filtro);
        const imagen        = this.resultados_pertenece((e) =>e.imagen > 0 && e.zona_inspeccion==filtro);
        const caducidad     = this.resultados_pertenece((e) =>e.caducidad > 0 && e.zona_inspeccion==filtro);
        const senializacion = this.resultados_pertenece((e) =>e.senializacion > 0 && e.zona_inspeccion == filtro);
        const generales     = this.resultados_pertenece((e) =>e.generales > 0 && e.zona_inspeccion==filtro);
        
        total = ((limpieza + surtido + imagen + caducidad + senializacion + generales) / 6) || 0;
        return <tr className="success">
                    <th colspan="5"><span>TOTAL</span></th>
                    <td style={{"textAlign":"right"}}>
                        {limpieza}<span className="fa fa-percent"></span>
                    </td>
                    <td style={{"textAlign":"right"}}>
                        {surtido}<span className="fa fa-percent"></span>
                    </td>
                    <td style={{"textAlign":"right"}}>
                        {imagen}<span className="fa fa-percent"></span>
                    </td>
                    <td style={{"textAlign":"right"}}>
                        {generales}<span className="fa fa-percent"></span>
                    </td>
                    <td style={{"textAlign":"right"}}>
                        {senializacion}<span className="fa fa-percent"></span>
                    </td>
                    <td style={{"textAlign":"right"}}>
                        {caducidad}<span className="fa fa-percent"></span>
                    </td>
                </tr>
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.lista_establecimientos = [];
        this.lista_resultados = [];
        this.state = {
            folio_establecimiento: -1,
            inicio: this.fecha_hoy(),
            termino: this.fecha_hoy()
        };

        this.obtener_establecimientos();
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <Botonera_accion on_ecxel={this.hand_ecxel.bind(this)}
                                     on_resultados={this.hand_resultados.bind(this)}
                                     on_deshacer={this.hand_deshacer.bind(this)} />
                <Elementos establecimientos={this.lista_establecimientos}
                           on_establecimiento={this.hand_establecimiento.bind(this)}
                           estado={this.state}
                           fecha_1={this.state.inicio}
                           seleccion_fecha_1={this.on_seleccion_fecha1.bind(this)}
                           fecha_2={this.state.termino}
                           seleccion_fecha_2={this.on_seleccion_fecha2.bind(this)} />
                <Resultados lista={this.lista_resultados} />
                </div>
                <div className="panel-body">
                    <Tabla_departamentos lista={this.lista_resultados} />
                </div> 
            </div>
            );
    }
    /**eventos**/
    hand_ecxel() {
        console.log("ecxel");
        tableToExcel("resultados", "Establecimientos.xlsx");
    }
    hand_resultados() {
        console.log("resultados");
        if (this.state.folio_establecimiento > 0) {
            this.obtener_resultados();
        }
    }
    hand_deshacer() {
        console.log("deshacer");
        this.lista_resultados = [];
        this.setState ({
            folio_establecimiento: -1,
            inicio: this.fecha_hoy(),
            termino: this.fecha_hoy()
        });
    }
    hand_establecimiento(e) {
        console.log(e.target.value);
        this.lista_resultados = [];
        this.setState({
            folio_establecimiento: e.target.value
        });
    }
    on_seleccion_fecha1(e) {
        console.info(e.target.value);
        const f = e.target.value.split("-");
        if (f[0] > 0) {
            this.setState({ inicio: f[2] + "/" + f[1] + "/" + f[0] });
        } else this.setState({ inicio: this.fecha_hoy() });
    }
    on_seleccion_fecha2(e) {
        console.info(e.target.value);
        const f = e.target.value.split("-");
        if (f[0] > 0) {
            this.setState({ termino: f[2] + "/" + f[1] + "/" + f[0] });
        } else this.setState({ termino: this.fecha_hoy() });
    }
    /**metodos**/
    fecha_hoy() {
        var d = new Date();
        const dia = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const mes = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        return dia + '/' + mes + '/' + d.getFullYear();
    }
    /**conexiones**/
    obtener_establecimientos() {
        conexion_api_from_body("servicios/checkListServ.asmx/buscar_establecimiento",
            {},
            (establecimientos) => {
                console.log("Establecimientos:", establecimientos.d);
                this.lista_establecimientos = establecimientos.d;
                this.setState({ folio_establecimiento: -1 });
        });
    }
    obtener_resultados() {
        conexion_api_from_body("servicios/checkListServ.asmx/procedimiento_resultados_cuestionario_por_rango_fechas",
            {
                inicio: this.state.inicio,
                termino: this.state.termino,
                folio_establecimiento: this.state.folio_establecimiento
            },
            (establecimientos) => {
                console.log("Resultados:", establecimientos.d);
                this.lista_resultados = establecimientos.d;
                this.setState({});
                if (this.lista_resultados.length == 0)
                    alert("SIN RESULTADOS...");
            });
    }
}
ReactDOM.render(
<App />,
    document.getElementById("container"));