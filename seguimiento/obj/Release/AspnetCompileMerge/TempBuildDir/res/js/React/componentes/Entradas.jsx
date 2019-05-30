class Caja_datos extends React.Component {
    render() {
        return (
            <div className="input-group" >
                <span className="input-group-addon"><i className={this.props.icono}></i> {this.props.titulo} </span>
                <input type="text" className="form-control" value={this.props.datos} onChange={this.props.evento} />
             </div>
        );
    }
}
class Caja_datos_select extends React.Component {
    render() {
        return(
            <div className="input-group" >
                <span className="input-group-addon"><i className={this.props.icono}></i> {this.props.titulo} </span>
                <select onChange={this.props.seleccion} className="form-control" >
                    {this.props.opciones}
                </select>
              </div>
        );
    }
}
class Caja_fecha extends React.Component {
    render() {
        return (
            <div style={{"width":"200px","display":"inline-block","margin-left":"20px"}}>
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                    <input type="date" className="form-control" value={this.parseo_fecha()} onChange={this.props.evento} style={{"width":"170px"}} />
                </div>
            </div>
        );
    }
    parseo_fecha() {
        const f = this.props.fecha.split("/");
        return f[2] + "-" + f[1] + "-" + f[0];
    }
}