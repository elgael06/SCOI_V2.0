class Cabecera extends React.Component {
    render() {
        return <div>
    <form class="form-inline">
        <div class="input-group">
                  <label class="input-group-addon">Unidad</label>
                  <input className="form-control" type="text" />
        </div>
        <div class="input-group has-feedback  ">
                  <label class="input-group-addon">Estado</label>
                  <select className="form-control">
                  </select>
        </div>
        
</form>
    <div class="input-group has-feedback  ">
                  <label class="input-group-addon">Observaciones</label>
                  <textarea className="form-control" placeholder="Quien atendio la unidad, agregar fecha y observaciones"></textarea>
    </div>
</div>
    }
    //ver_estado(estado) {
    //    const v = []
    //    if (estado == 'S') {
    //        v.push(<option value="S" selected>
    //            Sin Revisar
    //        </option>,
    //        <option value="E">
    //        En Revision
    //    </option>,
    //    <option value="R">
    //        Revisado
    //    </option>)
    //    }
    //    else if(estado=='E')
    //        v.push(<option value="R">
    //            Revisado
    //        </option>, <option value="E" selected>
    //    En Revision
    //</option>,
    //<option value="S">
    //    Sin Revisar
    //</option>)
    //    else
    //        v.push(<option value="R">
    //            Revisado
    //        </option>, <option value="E">
    //            En Revision
    //        </option>,
    //<option value="S" selected>
    //    Sin Revisar
    //</option>)  
    //    return v
    //}
}
class Tabla extends React.Component {
    render() {
        return(
            <div style={estilo_tabla }>
                <table className="table">
                   <thead>
                       <tr style={estilo_cabecera_tabla}>
                           <td>
                               Unidad
                           </td>
                           <td>
                               Estado
                           </td>
                           <td>
                               Observaciones
                           </td>
                       </tr>
                   </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            )
    }
}
class Fallos extends React.Component {
    render()
    {
        return(
            <div>
                <Cabecera/>
                <Tabla />
            </div>
            )
    }
}
const estilo_cabecera_tabla =
    {
        'position': 'sticky'
        , 'min-width': '100%'
        , 'top': '-1px'
        , "background": "rgba(146, 199, 254)"
    }
const estilo_tabla = {
    'overflow-x': 'auto',
    'overflow-y': 'auto',
    'width': '100%',
    'height': '300px',
    'border': 'solid 1px gray',
    'border-radius': '10px'
}
ReactDOM.render(
   <Fallos />
       ,
        document.getElementById("pruebas")
      );