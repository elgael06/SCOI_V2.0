class Botonera extends React.Component {
    render() {
        var nuevo = "btn btn-primary";
        var editar = "btn btn-primary";
        var guardar = "btn btn-primary";
        var deshacer = "btn btn-primary";
        if (this.props.class_editar && !this.props.class_nuevo)
            editar = "btn btn-info";
        else if (this.props.class_nuevo)
            nuevo = "btn btn-info";
        if (this.props.class_editar || this.props.class_nuevo) {
            guardar = "btn btn-success";
            deshacer = "btn btn-warning";
        }
        return(
            <div className="btn-group" style={{"margin-bottom":"10px"}}>
                <input type="button" value="Nuevo" className={nuevo} onClick={this.props.nuevo}  />
                <input type="button" value="Editar" className={editar} onClick={this.props.editar} />
                <input type="button" value="Guardar" className={guardar} onClick={this.props.guardar} />
                <input type="button" value="Deshacer" className={deshacer} onClick={this.props.deshacer} />
            </div>
        );
    }
}
