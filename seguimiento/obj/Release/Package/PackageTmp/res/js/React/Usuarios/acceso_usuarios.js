
class App extends React.Component {

    render() {
        return (
            <div className="panel panel-default">
                <AltaUsuario />
                <ListaUsuarios />
            </div>
        );
    }
}

ReactDOM.render(<App />,document.getElementById("container"));