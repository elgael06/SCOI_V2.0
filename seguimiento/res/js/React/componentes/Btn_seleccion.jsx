class Btn_seleccion extends React.Component {
    render() {
        return(
                <div className="btn-group-sm">
                    <input type="button" value="Listo" className="btn btn-success" data-dismiss="modal" onClick={ this.props.guardar} />
                    <input type="button" value="Deshacer" className="btn btn-danger" data-dismiss="modal" onClick={ this.props.deshacer} />
                </div>
            );
    }
}