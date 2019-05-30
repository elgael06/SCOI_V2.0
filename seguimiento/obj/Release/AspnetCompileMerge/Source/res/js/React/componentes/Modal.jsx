class Modal extends React.Component {
    render() {
        return (
            <div id={this.props.id} className="modal fade" role="dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.props.cerrar}>&times;</button>
                        {this.props.cavecera || <h3>Sin datos</h3>}
                    </div>
                    <div className="modal-body" style={estylo_cuerpo_modal}>
                        {this.props.cuerpo || <h3>Sin datos</h3>}
                    </div>
               </div>
            </div>
         );
            }
}
class Modal_con_tabla extends React.Component {
    /*** seleccionado,titulo,fn guardar,fn deshacer,cavecera "tabla",lista    "tabla"***/
    render() {
        const titulo = <h3> {this.props.titulo_modal}</h3>;
        const cuerpo_modal = [
                        <Btn_seleccion guardar={this.props.guardar} 
                                       deshacer={this.props.deshacer} />,
                        <Caja_datos titulo={this.props.titulo_seleccion} 
                                    icono={this.props.icono_seleccion} 
                                    datos={this.props.seleccionado} />,
                        <Caja_datos titulo ={"Filtro"} 
                                    icono={"glyphicon glyphicon-filter"}
                                    datos={this.props.texto_filtro}
                                    evento={this.props.evento_filtrar}/>,
                        <div className="tabla_matriz">
                            <Tabla cavecera={this.props.cavecera_tabla} 
                                   datos={this.props.lista_tabla}/>
                        </div> 
                ];
            return(
            <div>
            <Modal cavecera={titulo} 
                   cuerpo={cuerpo_modal} id={this.props.id}
                   cerrar={this.props.deshacer}  />
            </div>
);
    }
}
const estylo_cuerpo_modal={
    "height": "90%",
    "min-height": "350px",
    "width": "100%"
}