class Tabla extends React.Component {
    render() {
        return(
            <table className="table table-bordered ">
                <thead className="cavecera_tabla" >
                {this.cavecera_tabla()}
                </thead>
                <tbody>
                    {this.props.datos}
                </tbody>
            </table>
            );
    }
    cavecera_tabla() {
        const r = this.props.cavecera.map( (e,index) => <th key={index.toString()}>{e}</th>);
        return ( <tr className="success">{r}</tr> );
    }
}