
class Saludo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.saludo
        }
    }

    render() {
        return (
            <div>
                <h1>
                    saludo { this.state.nombre }
                 </h1>
                 <i className="fa fa-mail-reply" onClick={ ()=>this.regregar() }> Restaurar</i>
                 <br />
                <input type="text" value={this.state.nombre} onChange={ (e)=>this.cambiar(e)} />
            </div>
            );
    }
    cambiar(e) {
        this.setState({ nombre: e.target.value });
    }
    regregar() {
        this.setState({ nombre: this.props.saludo });
    }
}
ReactDOM.render(
    <Saludo  saludo={"gael"}/>,
    document.getElementById("padre")
    );
