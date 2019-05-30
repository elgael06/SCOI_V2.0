class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            id:-1,
            nombre:'',
            folio_cat:'',
            folio_tipo_pago:'',
            hora_inicio:0,
            fecha:{inicial:0,termina:0},
            dias:[],
            mes:[],
            descripcion:''
        }
    }
    render()
    {
        return(
            <div>
                <Cabecera 
                          on_nombre={this.on_nombre.bind(this)}
                          on_categoria={this.on_categoria.bind(this)}
                          on_Tipo_pago={this.on_Tipo_pago.bind(this)}
                          on_hora={this.on_hora.bind(this)}
                          on_inicio={this.on_inicio.bind(this)}
                          on_termina={this.on_termina.bind(this)}
                          datos={this.state}/>
                <RadioSemanal 
                              dias={this.state.dias} 
                              evento={this.on_seleccion_dia.bind(this)} />
                <Mensual
                              mes={this.state.mes}
                              evento_m={this.on_seleccion_dia_mes.bind(this)}
                              descripcion={this.state.descripcion}
                              on_descripcion={this.on_descripcion.bind(this)}/>
                    
            </div>
        );
    }
    on_nombre(e)
    {
    console.log(e.target.value)
        this.setState({nombre:e.target.value})
    }
on_categoria(e){
    this.setState({folio_cat:e.target.value})
    }
on_Tipo_pago(e)
    {
    this.setState({folio_tipo_pago:e.target.value})
    }
on_hora(e)
    {
    this.setState({hora_inicio:e.target.value})
    }
on_inicio(e)
    {
    this.setState({inicial:e.target.value})
    }
on_termina(e)
    {
    this.setState({termina:e.target.value})
}
on_descripcion(e){
    this.setState({descripcion:e.target.value})
}
on_seleccion_dia(dia){
    console.log(dia);
    const lista = this.state.dias;
    if(lista.includes(dia)){
        const pos = lista.findIndex(e=>e==dia);
        lista.splice(pos,1);
    }else{
        lista.push(dia);
    }
    this.setState({dias:lista});
}
on_seleccion_dia_mes(dia_m,e){
    console.log(dia_m);
    console.log(this.state.mes)
    const lista = [];
    const pos = lista.findIndex(e=>e==dia_m);
    if(this.state.mes.includes(dia_m)){
        lista.splice(pos,1);
    }else{
        lista.push(dia_m);
    }
    this.setState({mes:lista});
    e.preventDefault()
}
}
const Cabecera=({
                datos,
                on_nombre,
                on_categoria,
                on_Tipo_pago,
                on_hora,
                on_inicio,
                on_termina})=>
{
    const Nombre_pago=()=>(
            <div className="form-group" style={{'width':'400px','display':'inline-block'}}>
                    <strong >Nombre Pago</strong>
                    <input className="form-control" type="text" value={datos.nombre} onChange={on_nombre}/>
             </div>
    )
    const List_select=({titulo,valor})=>(
        <div className="form-group" style={{'width':'400px','display':'inline-block'}}>
                <strong >{titulo}</strong>
                <select className="form-control">
                    <option value={valor}>
                    </option>
                </select>
        </div>
    )
    const Vista_hora=({titulo,valor})=>(
        <div className="form-group" style={{'width':'400px','display':'inline-block'}}>
                    <strong >{titulo}</strong>
                    <input type="time" value={valor} onChange={on_hora} className="form-control"/>
        </div>
    )
    const Vista_fecha=({titulo,fecha})=>(
        <div className="form group" style={{'width':'400px','display':'inline-block'}}>
                <strong >{titulo}</strong>
                <input type="date" value={fecha} className="form-control"/>
        </div>
    )
    return(
        <div  style={{'width':'930px','display':'inline-block','fontFamily':'Comic Sans MS'}}>
            <div>
                <div style={{'width':'400px','display':'inline-block'}}>
            <Nombre_pago />
                </div>
                <div style={{'width':'400px','display':'inline-block','marginLeft':'130px'}}>
            <List_select titulo={'Categoria'}
                         valor={datos.folio_cat} />
                </div>
            </div>
                <div >
                    <div style={{'width':'400px','display':'inline-block'}}>
            <List_select titulo={'Tipo de pago'}
                         valor={datos.folio_tipo_pago} />
                    </div>
                    <div style={{'width':'400px','display':'inline-block','marginLeft':'130px'}}>
            <Vista_hora titulo={'Hora inicio'}
                        valor={datos.hora_inicio} />
                    </div>
                </div>
            <div>
                <div style={{'width':'400px','display':'inline-block'}}>
            <Vista_fecha titulo={'Inicia'}
                         valor={datos.fecha.fechaInicio} />
                </div>
                <div style={{'width':'400px','display':'inline-block','marginLeft':'130px'}}>
            <Vista_fecha titulo={'Termina'}
                         valor={datos.fecha.fechaTermino} />
                </div>
            </div>
            </div>
        )
}
const RadioSemanal=({dias,evento})=>{
    const comprobar=(dia)=> dias.includes(dia)?"fa fa-check-circle-o":"fa fa-circle-o";
    const Componente=({titulo})=>(
        <div>
            <span className={comprobar(titulo)} onClick={()=>evento(titulo)}>
                
            </span>
            <label style={{"marginLeft":"5px",'fontFamily':'Comic Sans MS','fontSize':"15px"}}> {titulo}</label>
            </div>
        )
    return(
        <div style={{'width':'930px','display':'inline-block'}}><br />
            <h3>Semanal</h3>
            <table className="table">
                        <tr style={{'background':'#edfbd4','height':'20px'}} className="table">
                            <td>
                                <Componente
                                            titulo={'Lunes'} />
                            </td>
                            <td>
                                <Componente titulo={'Martes'} />
                            </td>
                            <td>
                                <Componente titulo={'Miercoles'} />
                            </td>
                            <td>
                                <Componente titulo={'Jueves'}/>
                            </td>
                            <td>
                                <Componente titulo={'Viernes'} />
                            </td>
                            <td>
                                <Componente titulo={'Sabado'}/>
                            </td>
                            <td>
                                <Componente titulo={'Domingo'}/>
                            </td>
                        </tr>
            </table>
        </div>
        )
}
const Mensual=({mes,evento_m,descripcion,on_descripcion})=>{
    const comprobar_numero=(dia_m)=> mes.includes(dia_m)?"btn btn-warning":"btn btn-info";
    const Numero=({titulo})=>(
        <div>
            <br />
            <button style={{'width':'50px'}} className={comprobar_numero(titulo)} onClick={(e)=>evento_m(titulo,e)}>
                            <span style={{"marginLeft":"5px",'fontFamily':'Comic Sans MS','fontSize':"15px"}}> {titulo}</span>
            </button>
            </div>
        )
    const Dia_selec=({titulo})=>(
     <div>   
         <h3 style={{'display':'inline-block'}}>Mensual</h3> 
            <span style={{'background':'#fca442','fontSize':"20px","marginLeft":"200px",'display':'inline-block'}}>El dia: <label className="bg-warning" style={{'width':'30px'}}>{titulo}</label></span> 
         <br /> 
     </div>
     )
    const Pie=({titulo})=>(
         <div>
                    <h3>Descripcion: </h3>
                    <textarea onChange={on_descripcion} value={titulo} style={{'width':'950px','height':'100px','resize': 'none'}}>
                        
                    </textarea>
                </div> 
        )
    return(
        <div>
                    <Dia_selec titulo={mes} />
                    <table style={{'width':'950px'}}>
                        <tr>
                            <td><Numero titulo={'1'} />  </td>
                            <td><Numero titulo={'2'} />  </td>
                            <td><Numero titulo={'3'} />  </td>
                            <td><Numero titulo={'4'} />  </td>
                            <td><Numero titulo={'5'} />  </td>
                            <td><Numero titulo={'6'} />  </td>
                            <td><Numero titulo={'7'} />  </td>
                            <td><Numero titulo={'8'} />  </td>
                            <td><Numero titulo={'9'} />  </td>
                            <td><Numero titulo={'10'} />  </td>
                            <td><Numero titulo={'11'} />  </td>
                            <td><Numero titulo={'12'} />  </td>
                            <td><Numero titulo={'13'} />  </td>
                            <td><Numero titulo={'14'} />  </td>
                            <td><Numero titulo={'15'} />  </td>
                        </tr>
                        <tr>
                            <td><Numero titulo={'16'} />  </td>
                            <td><Numero titulo={'17'} />  </td>
                            <td><Numero titulo={'18'} />  </td>
                            <td><Numero titulo={'19'} />  </td>
                            <td><Numero titulo={'20'} />  </td>
                            <td><Numero titulo={'21'} />  </td>
                            <td><Numero titulo={'22'} />  </td>
                            <td><Numero titulo={'23'} />  </td>
                            <td><Numero titulo={'24'} />  </td>
                            <td><Numero titulo={'25'} />  </td>
                            <td><Numero titulo={'26'} />  </td>
                            <td><Numero titulo={'27'} />  </td>
                            <td><Numero titulo={'28'} />  </td>
                            <td><Numero titulo={'29'} />  </td>
                            <td><Numero titulo={'30'} />  </td>
                        </tr>
                    </table>
            <Pie
                 titulo={descripcion}/>      
                    
        </div>
        )
}
ReactDOM.render(
    <App/>,
    document.getElementById('pruebas')
)
//ReactDOM.render(
//    <App/>,
//    document.getElementById('contenedor')
//)
//class Prueba extends React.Component
//{
//    constructor(props)
//    {
//        super(props)
//        this.state={
//            usuario:{
//                id:-1,
//                nombre:'',
//                puesto:'',
//                fecha:'',
//                aantigurdad:'',
//                foto:''
//            },
//            lista:[
//                {id:0,
//                    nombre:'luz elena bermudez medina',
//                    puesto:'programadora',
//                    fecha:'01/09/2017',
//                    aantigurdad:'1 año',
//                    foto:'data:image/png;base64,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'
//                }
//                ,{
//                    id:1,
//                    nombre:'gael',
//                    puesto:'programador master',
//                    fecha:'09/06/1992',
//                    aantigurdad:'10 años',
//                    foto:'data:image/jpeg;base64,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'},
//                    {
//                        id:2,
//                        nombre:'marco',
//                        puesto:'gerente de sistemas',
//                        fecha:'19/12/1967',
//                        aantigurdad:'50 años',
//                        foto:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEhUQEhAWFRUVFRUVGBUVEBYVGBcWFRYWFxYSFRUYHSggGBolIBUVITEhJSkrLi4uFx8zODMsNygvLi0BCgoKDg0OGxAQGy0lHyUtLS8tLS0tLS8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQoAvgMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EAEMQAAEDAgMEBgcFBQgDAQAAAAEAAgMEEQUhMQYSQVETYXGBkaEUIjJSsdHwB0JicsEjM4KSshVDU6LC0uHxRGOTJP/EABoBAQACAwEAAAAAAAAAAAAAAAABAwIEBQb/xAA0EQACAQIEBAMHAwUBAQAAAAAAAQIDEQQSITEFE0FRMmHwInGBobHB0UKR4RQVIzPxYiT/2gAMAwEAAhEDEQA/APcUAIAQAgBACAEAIBCUAx0oCArVFeyMXe8NHNzgB4lAY822lC02NdTg8vSY/wDcguLT7X0chsysgceQqIyfDeQGpHXtcLggjmCgJ2VIKAmbIgHAoBUAIAQAgBACAEAIAQAgBACAEAhKAjfJZAcFtR9qFLSuMUN6ma9tyI+qHZ5OkzF8tGhx6ghFzzfHtu8Undubxpwf7qFm6+x94m8gP8vYpIOddhNTMd6QOcfelkue8uJclxYmbszNzYP4nf7VFxYHbMzc4z/Ef9qXFhsFDV0x3ojIzrilI8mm58FNwb+EfaRW053ZwJgNQ9vRyD+IC3iD2oTc9K2Z29p6yzWv3ZP8N+Tv4eDu4+CgXOwp6wO4oSXGvugHoAQAgBACAEAIAQAgBACAQlAZuNYvFSROnmkDGNGbj5NA1JOgAzKA8pxTF6vGQ52+aLDveP7ycX0y1B5D1fz6CSNyjFHDAOjpIuibaxkv+2ePxSatH4W2HwWNwNhpw0WAA7BbvQEwjUAd0aAXo0A0xoCCpo2yCz2hw6xfw5KQYFfs196F1iMw0k6jTddqD2+IU3Fjb2W29lpnCnrd4tGQkPtN5b/vt/Fr2qRc9fwzFGyAEOBBAIINwQdCCoJNmKS6AlCAEAIAQAgBACAEAIBCgKGL4lHTRPmleGsY0uc48AOrieAHElAeQSyOxZ/9o1wLKKNxFNS8Znab7hxvxOmo9kHebEC19c+ocC6waMmMb7LByA/X/pQCNkagEoagHAIBbIAsgEsgELUBG5iAoYlhzJm7rx2EajsP6KQVtmcdkwyUQTG8Dj6ruDL/AHhybzHDXtkHs+FYiHgZoSbkb7oCVACAEAIAQAgBACAjkdZAeQ7T139sVrqXfLaCiO/UOabCWQEjowRnqHNFuTzruoQVMSrjUPB3d1jRuxxjIMYNAAMr5D/oBQCNjFAJgEAtkAqAEAIAQAgGlAMc1AUMSoWysLHDsPEHgQpBa2Axt8TzRTH1o82H3mch2cOrsUhHruG1W8AhJqNKAcgBACAEAIAQCFAcr9omNuo6KWVh/aECOPn0kh3WkcyLl38KA8uwwCGkjpWXzcZJne/IcgL8WtAChsgsxNUAnaEBsR4YyRocx5F+YBseXBARvwd40c0+I/RAQuw2Ufdv2OHzQDPQJPcPkgFbh0p+54kfNAW4cGP3ngdQF/MoC5Fhsbfu3/Mb+WiAnfuRtLiGtaBc5ABAecYti755PR6Rpc95ObM9Tow8AOLtB5qdErsK7dkRGKqoHBtU09G7LeLt8N6w7lzH0cYVIVF7LMpQlDxD8biLNypj9uEh3aziOzXuJWSMT03ZbFBIxrwcnAEdhF1JJ21M+4QFhACAEAIAQAgGvKA8k+1yuDp6aBxAZGH1L7nK/wC7i+MiEHOUNSyT2Hh1tbHPwUA0mBQB5cACSbAC5PIDigOepsarZ5SKJjrDg1gNxw6Qu9Vt+WSSlGCvJkxjKTtFHUU+L4hGP/0YaXW1dDI0n/5hziT3qpV6T2kWOjUX6RW7cUoO7K2aF3uyQkEdzblWpX1RU9NyzHthRO/8kd8co+LVNmLiu2uoh/5I7mSH4NSzBWm26o26Pe/qbC4f1hqWYuY1f9o2R6Gnt+KV2naxuv8AMpUSLlCGgxDFXAyFzYr33nt6OMD8DNXnrz7VTUxFOnu9fIthRnPZHo2zeARUbNyJtybb8h9p1uZ4DqGS5lWvKq9dux0KdGNNeZr4phEc0To3jeaRmDoesclCvH2ovUhtS0ktDy3EaQ0DugmN4XXEUp5cYZORA0OhHZl06NZVV59TRq0nTfkXfs6rbMMd7iORzRf3b3afNXlSPXsMluAhJphAKgBACAEAICOY5IDwj7SKR1Vibomm1mRNJOYaGsdJe3H975hV1aipxzMyhTc5WRXfsHKxokp57yNzDXDcv1Ndci/UcjxK1oY1N2ki+eFaV4su4XUmWMOIs4Xa9um69ps5tuGYW4aomLMc9jYGGzp5GQg2vbfPrOI5BocsZSUU5PoSouTSXU73CMKZBG2GJu6xviTxc48XHiVxZzlUlmZ1oxUFZF/0cdaxsTmIKvDmSjdexr2+69gcPA3UpuOqYdno0c7W7BUchv0BYeccjgO5ty0eCvji60etyl4ek+hlO+zSn/x5x2mP/Yrf6+fZfP8AJX/Rx7v5Fim+zqkb7Rmk/NIB/Q1pWLxtV7WXrzMlhKa3ub2G7NU8FjFTMaRo4jed/O+7vNUTrVJ+JlsadOGyNdsHMquxnmJwLaKSCWF3BZxZXNdTB2jw5k0UkcjA4WJt2C4tyPWmaUNY7mVlJWexwWBQNgq5GMvuuZE/W+d3tNj3BdPC1nVp5nuaFemqc7I9awOS4C2Co32IByAEAIAQAgIZ9EB4/j9hi0zTq+ON46xusYfAsHitXGL/AB/E2MK/8nwOxoGg8Bay0EbUmzjcco/R6x1haOqb0jeqZlhK3vbuO/mW/hamaFu30NPEQyyv3IsJZ0mIRN4QxSzHld1om36/WJTFytSfm7fcYaN6i8j0VjbCy5Z0GOQAgBACAEAIAQAgAGxupRDV0QV2p7Fk9zGOx5lQstVHqY0f53/JbPDFanL3lON8a9x6ngGgXSNI6RiAcgBACAEAICOYZIDzDbXCr19PUg2s1zT1hu9l23kB/hWri5Whbv8A9L8Ovbv2NjDpPV7rLnJ6G7JalbarDDU053P3sZEsR/G37vYQXN71ZRqcud+nUwqwzxsc99nBM0tRUlpG86KINP3dxu89vi4K/HS8MfiU4ReJ/A9AWibYIAQAgBACAEAIAQCOUkFTEH5dwCmT0EFqefYa3eqHu/FbuF3f6it7h8bUr92/x9jUxbvU+CPT8CZ6oW8ap0LEA5ACAEAIAQDXhAcdtvAei6QDON7X93snycT3LXxSvTfkXUHaaMvDptDwP0FykzotXRtxFSYkNFh7InOMbA0PcZHWFt57gAXHryHgobb36EpJLQuqACAEAIAQAgBACAEA15UkGNjFTutc73Wk99lhJ2LIo5TZuG7u+/jnZdfCRy0YnMxDvUZ6lhEdgFslJsNQCoAQAgBACAQoDIxmmD2OadCCD2EWUSipJpkp2dzz/DXFpdE72mEtPz+upcJpxbi+h14yTV0dHRTXFuKJkSVi80qTEcoJAoAQAgBACAEAIAKAr1MlgjdgldnI7T1VmiPi43PYPmbeBVeR1JKmur+RZKShFy7Euy9LoV6FKysjit31PR8PjsApBfCAEAIAQAgBACArVUdwgPPdpqQwyioAyPqv/R31yC5uNpWfMXxN3C1P0P4ElNLoQVpM3Ua9NUXyOqlMwcbFoFSYiqCQQAgBACAEAICOWQAXKbBK5lVtSAC5xsAL9gWDfVlqVtDi3yGomLuF8hyA0H1zW9gKO9aXXb3fyaOLq/oXxO92dorAZLpmkdfAywQEyAEAIAQAgBACAa8IDExihD2kEXBFiFEoqSsyU2ndHCtaad/RO9kn1HH+g9a41ak6Usr26P7HTpVVNX69TWheqWi9F+GoI1zRSIcE9i0yQHQrJNMwaaHoQCAEAIAKAhknA0zUORkoMozy3zJWO5Zaxx+OYl0zuijPq3zPvHn2DzVmHoc+X/lb+fkU163KXmaWzuF6Gy7iVtEck9Cw2m3QFINRoQCoAQAgBACAEAIAQEE0d0BzOO4W17SCLrCpTjOOWWxlGTi7o5WOpMDtyQ3bwdx7COPauNiKToP2tV0f5OpQqqotN0bVLM14u1wI6j8eSoTT1ReWQgHiQjipuyHFMcJz1eCnMyMiF9IPUmZjIhOmP0FGZjIhjnE6lQZJWKtXVsiF3uA+J7BqVDko7k2uchjmPGQ9GwENPie3q6vFXYag8RrtH5v8FGIrcnS2r/YlwLDd4gldyEIwSjFWRyZScndnoeEUAaBksiDeiZZASoAQAgBACAEAIAQAgI3lAchtPj+6/wBGp2dLO77v3WA8XnnxtyzNhrp4jFZHkgryNzD4XOs83aP1MSmihpnGSokE1SBdwJ9SPq6+wLk1ZxhLNUeafbojoqM5xy01lh82YbcT35nPA6PeJI3cs73zF+PL4rSlUbebr5G2sMsqSf7mxQ4y9xLdzpd3MljTcDmbC3wVsKk5bK/uTKalPJ4tC9HjcR1Jb2tP+m6lV4dTDKyYYjEf71vebfFZ8yHcWYOxKEf3re43+CcyHcWZWkx2IZN3nnk1p/1WWHPh01JysZNJWSMLo6dzGgXzA3z+UOtfuCPnSV1G31MVKnezkZmHsieHSSOJcD62+cx1luvVx0WpPfU2+W1a2pztTIXEutlfLLTkD1q+jUlSleDszOrSjUjlmrnS7K4i1x3Tk4cOrmF6LC4pVl2Z57FYR0Xdar1uei4fMCFtmoaTSgHoAQAgBACAEAIAQDXFAcxtTtAYd2CAb9RL7DdQ0adI7q5DjbkCtXE4jlK0dZPZG1h8PzPalpFbnI1EnoTXRMk36mQ3ml4tvnuNPM6378srcavW5MXFP23u+x16NPnNSatFbI52S73bg7+3iuanZZmdG3QsVFMNzL7vw4qqFT2tSxx0PRNl6xk1O0xtazd9VzGgNAeNSAOB1713KM88dDz+KpuFT2nfszRnoY5Pbja78zAfMrN0lLdFCm1syo7Z6mOsDe4uHwKx/pab/SZc+fcczZ6mH9w3vufiVksLTX6UQ68+5dp6JkfsRtb+Vgb8ArY0ktkVym3uyfcWWQxzGDtVgMUsUk27uyMY5we3IndaTuu94ZW5hU4jDRnBvqbeFxM4TUb6N7HnVIy7Tfif0C4NR2kjvpaFSeMxOD2kixyPEFbNCs07p2aKKtNNWa0Z3Gy+P9ILOycLXHbo4dRXpcLiVWjfr1POYrDOjLyex3FHU7wW0apeBQCoAQAgBACAEAhKAxdpcabSQuldmfZY2+b3nRo+J5AFVVqypQcmW0aLqzyo5GjY6naZ5TvVdR6xJH7th0AHDkB1dRvxqlV005y8cvkvXrQ6VlUeSPgj82c62A7x3joSS4/HrJ/VcaV3LU7MWsqaK2Gt9o8cvNRWeyLYI0AtcsJ9ncS9DqBvH9lJZruocHfwk+BK6WCr5Za7dTSxmH5sLLdbfj4nqAYvQKB5pyHBiyyEZhH2aC5xAAzJJsAOZJ0U5LBNt2RWpMTp5XbsdRG93utkaT3C+axhKEnaLT+JZOlVgryi0vcXujV2QpzGXtVJ0dHO7/1lve/1B/UqcSlGjJ+RsYRZq8V5/TU8uo2+oOu/15LyFR+0eritCDELbu7xNsu9Z0b3uYT2LRonxMZI395GMxzBNyw9l/Jb9Gu6U88TnVIxqpwlszsNnMXEjQQdfLmCvT06iqRUl1PP1KbpycZdDsKaW4WZgWAgFQAgBACAEBFM+yA85fWCtqn1T86al9WMcJJPe67keAHMrj16yqVHJ+GPzZ1YU3SpqC8Ut/JEFTU3JlkOZP8A00LkVqrk3KRu0aW0YmdLKXm58PrVaM5tnSp01FWKJpnMN2fXV1rPPGStIyytbDxUuGrPIhRy4vZk5n2BzxKCBqMxdQk4O40keg7AYwJoegef2kIt2s0ae7Q93Neq4dWjUp5eq+nQ81xKg6dTOtpfXr+TocSro6aN00rrNb4k8GgcSVu1JQpxcpbGlSpzqyUI7nm1ZiMmJSubI8xxszbCO21zfVw5kZXyAXnMXi51ZW2Xb8noaGHhh43jq319dBs+AxBpIc5pAJvcHTO5FvktJSdy1VZE+zm2c0Fmz70sV7bxze3qDj7XYc+vguthuIThpU1j3NXFcPp1Naeku3R/g29vcVjkomGJ4e2aRuY5NBcbjUEENFjotviFaMsOnF3TZp8OoSjiHnVmkcUWuDAG62H/ADZeWunK7PR620I8PkbG8OeDvfiHmDz6yrsz6bFUoZlY6F1nC40KzizQlFp2Zj00hpp7fckNx1O5d/yXX4biMsuW9nt7/X2NTHUeZT5i3W/u9fc9Ewes3gM13TjG9G66AegBACAEAhKA5Db/ABYxQdEw/tJz0bbagH23DuNu1wWpja3Lp6bs28FR5lS72Wpz0rWwRspx7MQu8jjIfaPd7IXCryypU+2/v9aHSpp1JOffb3GVJKXm57hyC5k5XZ1qdNRVhQFUXDlBJFUTbg6zoFnGOZmLdiOmiIu52p8lM5LZbCK6smp6t9LMypj1acxwIOrT1EfotnB4mVKaa6fNFGJoRqwcX1+T7nWMmNfIKmQEQsJ6GI8xkZXjibjLlbvPpaX/ANEubLwrwr7s89Wl/TQ5MPE/E/svX8Y+2NMyNzJ2EtkcdBxsM39R0HXdaXFKUFafV/M2+FVZyTpvwr1YozR1kjS1wsLZ+yCeo2z7lxtDpJ009DS2S6KWB8DmA+tdwP3g72XdRFrZaWB4rvcO5dSi6bXvOTxLmU60asX008rdDFxmgEM/QseXNydY/d3tQeZsBnysuZjqaoScIvTf3HSwVZ16anJWe3vsSrkHRGTgbpvpZZRvfQh7C4TUFjRfQ6/oVc5WkUTp54+ZZxil34zbUesD8lsRk1qjTjo7PqaGymJbzRfXQ9o1Xq8PV5tNSOBiKXKqOPqx6BRS3CuKC4EAIAQAgIpnWCA8uxWu9IxB8mrKcbjOW+Dmf5j4MC4WNrZq3lH6nZw9PJQt1l9P+FGslud2+mZ6yuNVnfQ6eHp2VxjAtZm4iQLEkEJKcR/ane14fpbuV0vArGC8RbVJmI5txY8VKdiC9stiPQyejvPqvPqk8HHQdjvj2r0HC8Xry5bPb3/ycXimEzR5kd1v5r+PoS407pq1kfCMC/b7Z8bsCx4pUvVy9l9Rw6GTDuXd/wAfk01yi8wcMf6PW7t7NcS3qs8bzfA2C6PD6uSsr7PQxxtPm4Z23Wv7fwUTP000kx4kkdhyaO4Cy0sbW5k3Lu/kbuGpcumodl/0sBaJslSZ3SO3BoNSrorIszMHq7FndsLKq5kXKGW4LDw07OS2aUuhpYiFnmRn0L+gqHM4OzH12WXc4VVs3Tfr19jl8Sp5oRqL4+vf9T0nBam4C7ZxzeYUA5ACACgMjaKv9Hgkm9xjnDrIHqjvNgsKk8kHLsWUoZ5qPc8qwsGOIuOZOdzxPX33K8nOW7PRZc01EIwtKTN+KJwq2WDlBIICCog3sxkRoVnCeX3GLVyOGpIO6/I8/n81nKnfWJCl0ZaVJmRVUO8MtRp8lZTnlZjJXRd2eeZJJJXuu+wF+Jvqf8oW3VqSm80t2aU4qEVGK0N0qoqOZ2nb+0aebB5E/NZLY2KOxHSR7rRzOZWtUd5G1FWRFVTG+43U6/JZQj+pkSfRE9PFui3iVhKWZmSViQrEDWv3SHDh9WVkXZmE45lYjx0brmSjq8Po+S6OGqcurGRzp089KUH69M6/ZqquAvWHmjtKd1wgJkAIBHIDhftOqrU7Y/8AElaD+Vt3nza1aHEZ5aNu5v8ADoZqt+yOPmyaxnIXPbp815qq9LHcoK7ch0YWqzcRKFgZCoSIgBARzQhwz8VlGTjsQ1crNe6LI5t+tPkrWoz1W5hdxLkcgcLgqlprczTuQ75hkEre8c76jv8Air6crqzKqkLo6mGYPaHtORF7/NZGk1Z2OXrJ/SJi77rch2D5m6TeWJt0oWQlVPu+qPaPl/yqYQvq9i6TClg3czqfqyTnm0WwirFgKsyBAMcFkjFhWjfgtxabeWXxHgtmD0TNRq1R+aNLZKpuG9i9hh5ZqUX5HmMRDLVkvM9HoX3CuKS6gBANeUB5l9pMm9PTx8myO/mLGj4Fcjir0ijrcMVlKRhTG7z228F5+q9Ts0FaKJWLXZsokCxJBCREAIAQARfIoQVJactO8zw+tVdGalpIxcbbCx1IcN12V/D/AIR03HVBST3EbUyRtdANHEeB1t25K1STVypwWa43pOjG43Nx17f1Vds7u9iy9tETU1Pu+sc3HyWE530WxklYnVZkKEAIBpUogG+xIOpp8Cr4bM16i9qLDZd9jbkSPNes4fK9BHm+IRtXfw/B6hhT7gLdNI1AgFQEcuiA8t25N66Mf+pnnI75LhcVf+SK8vydnh3+qT9/0MZpuSes/FcOe52YLRFlipZch4WJkCARACAEAqAEBBPTB2eh+tVZGo4mLjcq+jvGVu+/1ZW54Mwsy1T04bnqfrRVTnmM1GxMqzIEAqAEAhUogY05P/KfiFdT6lNRbe8iwA2kd+Yr1HCn/g+P2R53if8AuXu+7PUcGPqhdI5xtNQCoCOXRAeXbdi1ZE7nGP8ALISf6lxOKr24s7PDXenJetjEj1XBnudqGxaYqWWoeFiZAUAiAEAIAQCoAQAgEQAgBACAVAIVKIIXuyPWLeYP6K2JVIZgGbyfxH4r1fDI2oI83xJ3rfA9SwYeqF0Dnm01AKgGSaIDzf7SafOGXk57D/GA4f0HxXK4rC9NS7HU4XO0pROZjdc3Xm57nehsWmKllyJAsSQKEiIAQAgBACAEAIAQAgBAKgBANcpRDKtQ+wJ5BWwV3YqkyfZiLML2eEhloxXl9dTymLnmrSfrTQ9RwllgFsGsawQCoBrkByu2mHmane0D1gN5v5m5gd9rd6oxNPmUnEvw1Tl1VI8tbMQA9unELybim8rPUJ9TQpagO015LXnBxL4yuWgqTMVCQQCIAQAgBACAEAIAQAgFQAUIKs9SB6rcz5DtVsafV7GDkVK9+QbxPwC28HR5tVRNbE1eXTcux0my9LovYnktz0agZYBAXggBAIUBSrorhAeR7RYd6PORb9nKS5vIOPtM/Udq87xLDOE88dmegwGI5kMr3RkPZunq4Fc9PMjobFqGtcNc+3XxVUqSZYpsuR1jTrl2ql0pIsUkTtcDoQewrBprckVQSCAEAIAQAgBAFkA17wNSB3qUm9iLkEla0aZ+QVipPqYuSKc1U53Gw5BXRppGDk2Phj3BvO1t4BYyeZ2RG2pDSMMsl/qy9HwzDZI5312ODxLEZpctdNz0bZ2isBkuqco6+BtggJkAIAQEcrboDl9pcHbOwscNdDxBGjh1qurSjUi4yLKVWVOSlE80nhdE4wyjPgeDhzHWvL4rCzoSPS4fERqxuiF8JGYzHmFQpJ7mwNDlLRNxwKxJJGzuH3j4rFwi+hN2SCrfz8gseXEnMxwrXdXh/wAqOVEZ2L6c7kPA/NOUic7D053IeB+acpDOxDWu6vBTyokZmNNU/n5BTy4jMyN0zjq4+KlRS6EXZHdZEAM8gmwLMUIb6ztfIKuUs2iJtYqzSmU7rdPj1rqYDAuo80tvWhzcdjFSWWO/rU6jZ7C9DZekSsedbvqz0HDabdAQGo0IBUAIAQCFAV6iG4QHJbQ4E2VpDm35cweYKrq0o1I5ZFlKrKlLNE4Ssopac+sC5nvAZj8w/VefxXDZQ9qOqO9hsfCpo9H62IA1j8x4j9QubeUdGdBWYx1O4aZ/XJSpoWIzlrl2rLcC3SxNwulgLdQAugC6AS6mwFaCdBdQ7LcEzKU/eNvMrB1F0JsPfKyMdfiSoUZTZDkolU78ptbLl8+a7eD4Z+qp+3X+PqcjFcSS9mnq+/T+fodFguC6EhdxJRVkcSUnJ3e53mFYeGgZKSDcjZZASIAQAgBACAQhAV54AUBhYjhIdwQHHYpsyLlzQWnm3LxC1K2CpVeln5G5RxtWnpe68zEmpJo9QHjqyK5FbhM14dTqUuJ05eLQh9LAycCO0LnTw1SD1RvwrQmrxdxwdG73e42+CrtNFl0O9Hb1+KjPIWQnozeZ8vknMYsg9GbzPl8k5jFkL6O3r8UzyJshC6Nvu95ulpsi6Q11cOAJ7rBW08LUqPRFdSvCC9p2I9+R+gt2fNdOjwiT1noc6txSC8GpcosFc45hdijhadLwrXucqtiqlXxPTsdRhWA2tktg1jrKDDg3ggNaOOyAlQAgBACAEAIAQCEIBj47oCnUUQPBAZNXgwPBAYlXs8DwRq+5KdtUY1TswPdVEsLRlvFfT6F8cVWjtJ/X6lGTZwjS471RLh1B9H+5cuI1l2/YhOBvH3neKr/tdHu/l+CxcUq9l8/yN/saTm7xKf2uj3fy/A/ulXsvn+RW4C463VkeHUF0f7lb4jWfb9izDs6eSvjhaMdor17ymWKrS3k/p9DRptnOpXmu9TYo9nwOCA26TCAOCA1oKQDggLLWWQD0AIAQAgBACAEAIAQAgGlARvCAqyhAU5WjkgKcrRyHggK7mDkPBAM3ByHggHsYOQ8EBZiaOQ8EBdhaOSAuRBAWWhASBAKgBACAEAID/9k='
//                    },
//            {
//                id:3,
//                nombre:'Rodolfo',
//                puesto:'Ayudante de santa',
//                fecha:'12/11/0000',
//                aantigurdad:'10000',
//                foto:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUXGCIaGBgYFx8gHxsbHx4aGh0bHR8dHiggHh4nHR8fITEhJSotLi4uGiAzOTMsNygtLisBCgoKDg0OGxAQGzUlICUyMjUyLTI1LTctNTAtLy0tLS81LS0vLS8tLS0vLS0tLS0tLS01LS4tLS0rLS0tLS8tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABBEAACAgAFAgUCBAQEBAUEAwABAgMRAAQSITEFQQYTIlFhMnEHQoGRFCNSobHB0eEVM2LwJENygvE0krLCF1OD/8QAGwEAAQUBAQAAAAAAAAAAAAAAAgEDBAUGAAf/xAAxEQABAwMCBAMIAwEBAQAAAAABAAIDBBEhEjEFE0FRFGHwInGBkaGxweEjMtHxBkL/2gAMAwEAAhEDEQA/AE/QfEb5QtoiQhqKht9HuU1aqJO4PAJbY3sklyxCA0mlmu1WqYiynG1CvSNhe2H+ZnaXT5rqQqCMelRSAg0u2x2+rnc43630uNNBj/5Ug1pZUsLAtGYb2Oa2G+NS2RodtYn8JnlkhJIck3lFpTMsRVvJpSUeVTsm50jctZG4s+5wJJlQLtgSKqgaYEXqBNbDYcb38YsnSunqxEc5m8p9kKEkK+41ldwao7Dc++IM0smZkRfMMzDTFFahAUANWSaWvkm75wbZc7+vW6ExkJJl8rI9JGrtqYUqgm2o1sOWq671fzjI4iDbjUI+UZgO/wBIDX+Y2VAP5r7nDIwyi+V0ED0bepbANrsW59XJ3wKsdNbqSO/qon9d+++C5zb2ujFPIW6gEz6p4rkmUL5MCDTpP8tW1L6TyV2JI3I522Fb11YQxolVuzZsAd+wJ+APtgmNwGFcg9xYNe4OxHxgmKAmwdKhvzFdhW/poEjeht7i9sc0sYPZQGN/UIULJl2BjlUF4tzE90r7MjGtm23XttjXKzPl3R4tKSIDTghrDrXuV2UkVWxJvcYkbL0tkgb1W98XfFV25uzxhh0rw3PmC3lKraACx1bAGiTYsWBuRz2AJ2wpkaBdxwhLCDZEdF6hkiiCYNFmdRP8UgB0HUG1kKu7Xve9AEWAawkl6XLK8hUPJINckrMAtrs4cajyVYMV532vBWYyUzq8jKDofy3I0hi5JO6j1MSSd69hjIun6mTLkOkrOAFchUVm4Y91OkjerwjSGkkH8+vcu03QMkJIaZYSYRSFitKH0D+nYN+YC9+TycaySyojQMWVNQdozsNWkUxHvpr9MGTgszKl6eSoI02i0zUnoPBOocjfvgiDpzp5bnSoZylWCy0oZjX5fSwo872PfAT1TIIjI/YC6chhMjwxu5SCaH00E3u73uqG3NV34vfnEWVcIyiQFotas6AgFgOwarBokfrixygBGrgDYYTz5ksgT0hQd6UAsRuCx/MQGIv2rmsVnDeN+MkMZZbtlT63h3h2hwddDdS8pmLRIY0shYzbFVHBLE+pj3A9vnEQyxDMpZAVG/qBBNXQK2CT27fIw36J01ZZEUqz7sXRWVDoUWSrudN/Hx3vb3zjIiISPKi1MikUxDNqKFlWyxG1nYH2xeiSxsPXr0VVlqAycpjN1yP/AJ/yw4ykocVhfncpyUsqGOlipF/B+a/1wLlpyp9iDuMYnjtI7nmXo7Y/haHhlSOWGdk26pm8wsRgEjGFiCUY6uBQClrKiuwrj4wkEbqtBlKuASAVN0TV1ZUg3tscWKWpEvAU0qSTg5iRkV9IeUWxjA2YlQo1WACAOARzRGLLgXEXTRmB/wDZvzI/JCjcSpGxP5jdioMpniqsiFkWRVSUXs9EtvtsB7e/32biMVVD9sVyeRS1JWlTQYAjWN6cgk0SO3xixwtZP2GKn/0L3+Jt2/Sn8IDeWfNVbqSeWzJQIYggldxV/Se3O4HxjQ5hTEESMo4vzZA7EOhI0hk4AU1v32wx6zHqI34va/hcRJreIRLGihLLyKtOysy7SG/UoaqFY01G4yUrJX9sn3dVR1LQ2dzG91Fm+mKkrQxyDMPa6Gh3RrGphZo2Nh7bHBK5eLyljaLRIH9U4ZidO/pMd6Tv3FYbdOyCRrwC3fE2YphR/fFOf/RxMl0tZdve9j77fgqyHBXujuXWd2/arvmlTpjvSCdAZV1AsALFcPsKI4oVidOsTqUkMod0RoVWQByiVVUy0BuaNk2Dxh/P4jL5ePKR5eGMABRIqgyWWBJ1EbtdGxpNgGxxhB1uBInlSKYTIW06nQq+1Encem2sWDZo2Be+lBEljp32934uqTbC3y+cGiQeU4J/5BjZgInNaze7NaCtJJPPHOIc60DuBl4pIwUVQmsOWl2F2apWPYfHHAYZPO5oAvFEXy7SOI1dP5YkMZ1FQhCrIEs7cDCrpmfeEghmpTrUCqLgaRq71pJBrffbCtacm319erriV7oWONhNBL5xIMYb0po9SsWGz3Y2INWu94WxRE3x6RZsgbbcWdz8DfDzrvXp81Is2Y0yMqkbggGwRdAjcbcf0j5tTARpJH1rvuygafi9y9ngdr9scAQLu3XX7L1JgqPHJEzsQBES7L5TEgsQnB1Daj98DZqDQdNnUNnBBGlrIK/NVzgrqOdlnbzJSzs5+tuWIpee9bD9sCyxFSVIplNEexGxGG9AKJT5rqDPGkWhFRCWUKu9kDUSxtiNromhvVYHlAFaTqsAnaqPcfNe+DMj1aWCUyQERMUKHSL9LLpb6r55++NYul6wCkkXG4eRIyG5IAdrI/6uD+mBA07YXLor2rB1tbA0nSt2tWRQ2Njkb/ucMBFA0KIVWJ9G0wqrVdTK4FszkCh7Fhse42YCAAgSBmrWzFaZNqCqFAXgjUOe/fDLJRwmVWc1kwdZVmtgxXdLS2J2uqF8bE7wnPNlY8toz9kmeGURatLiGRtieGK2BZG2oAn++BMxEm9MTuKtasdydzXtW93h7n8mkYdl/nQNYhKy/S/5S4oE1v2F++FkuTWiQrbEVa1YYE39R9tqsH3HGCa87hdZjv7FC5fLSOdEasSSAFW923oe10D/AHxPJ0+WMI8sdKwJALgFhejbk2DvVYny0DSMoQBbIX6tI1UaJJOxIB3/AMLwKSA1MNVEgi+ee4+d/n9cKS52EV42bFRZaeSLXoqnXS9qpsA3W4PfHsmccxrE8lIhZlU8KW3PAvfiuBePQjUHokA81YsEcj7kc7G63xuYH0B3XSjkgSMnpJXcgEAkb7bf4A4JwNuiBjoy+7ktbMTQOGjkjYvFvopgA2xRtQ2cdwOLG+NoHlQAJs1WTGbLcMASD+XfbtveJqXT2Buqo8VzdV8ViSDMvGweJyjC6ZRuLBU1fwT++Oa5wwQjkiieLg5QBzLa1lunXcOAA12W1WOTZ5+3thr00RkTGWGaWYh2l1SrGjIVD3q5aTUQ+jk4VTEySOGNlUFWBbE2xLe535NnAkOcaI2vF7od1NEHg2Ow7dt8Vs3GGNmMWm1uvrojbw68eq6LHnGOZ1ygaJqjLyxAGNkW20EFQj7EmvbezeAsqzI3ltY02dPsWC77dyKw88RdZfOsv8sBVWwBQsAXZIAuhf8AoDhNmomWT1ABt7AAA4Stl24r/wCcPcTeXUTr9bfcIKSLRM0qbNP/ACW+2BOlzOFOlmX16hR7hQAfuLP74mn3iYYL6G8Qy4MhckSgiEClkSyGLODYI3A27972peAgc8ntf/FN4qTyx8FDmNDUQqqeNCqdIAAoglibO9j/AF2NhyBk813lj0wIL/mDUw+lVj2IY3Q9vnEuUhjnzFrGFQszGHWEAjAulkY/V+nb52gkzgkCKwQLGDo2Idlu1jZwLJA9IJArGuLjsFRBq0GYkUaI5HMaEuNiADp0l9NnT6SQTfBwB1zpDxH1KVkH1xkEMFoEHitwbFHgfa7VmIMtFFFmIHlZtaiRapaq2jDBjRZbv6q49N4XZny3kaRQQGe1ismlsekueBpuiL47YalayojLHDB+d04zUx2pqR9Mn2+MSlirq6UGUhlNA7g2Njsd8RND5ckiVQDAgewIDD+zf2x474wx1085LDYgrRi0sQDhgovrUyzMpTUFFMwat5DqMjjTsAznYCtq2x7G1YWnMgY9HUVwVVNLUu1vHyQ08bIBpaipg24BIDUSPcrdX+/6frjbKwAGz24+T7/YYEHUFxIM6MPGvqfC+F6d+tuyBtNDz+cd/pfumTSYHaUE1dbWT7D/AFPA+f1xHlFeZ1jSgWNAsQBZ+Tt/lhmuY0wHLvoSMSFyyqfMkZQyEiSihAI0+3Hzh/hnBnzOD5RZv1P6TddxNrAWMOfsgsiy6XRy/wBJESKqsDI1LR1fSKAGobihWGmQ8KdRT+dF5a+huSG/lEFS42ZSDwK9W98b4D6p1Z8xoqJI1HpRY10qW2BvszHaz7VeApZJULqGPo2YoxKjlR6htW5Udtzjaua4iwsPLdZoEInoubhkU5WcGpCxLhL8lwL/AJUSkLZ0AFx2JFHnFc1pWwe9J/p+u9jX9Ncjm++Ho8//AJqRpLCS0SF4kEeooNVIDpWQKt38ck4lyskMxMUeWESSRBA0s7eXHmFRm87URQLKCNLe5+cDq0X7evXwRWukWXljEbaoi8t+glqQLRDBlG5PcG9iBiPOZKEKhilMjeVqlDqE0vdaFJPr2rj/AGG38TblyEYmyRppd7HC0B7itrAx4gQqbJDjcezcekAC9V72SBQ98GR1SBRKFVZI5o5fMoCIatIjYm2LKw3sVttht07we80MsomjTyrEiuVUhgDaj170QLJrayLqiJ1dZxO4zQfzrGvzDbcCtRs/lr9MCSEqSoYbEi1bb2JBGxBG19xgC0kXBS3XmZ6lJJGkRCrGhLKiqNiwAJv6jdXuSN+2IJYuNJLWATYqj3A3Nj52v2xLJIGN6VXjZRtsK9z9z8k41mrbSb2F36aPcDc2Pnb7DBBoC667HlppZWBfz5EVNKBWQFCBSnilAYfVQ2qye4UUUflaWBJJU69dLGTyNAssaB35G23ufF1WSJah1IxPrYtYYUAF0gBR9xuRW/fA/wDAalVmzACnUXG5KvpJ3HctVWLO4vFWDbyCn6bIXJ5VCQHZkieQW2obL6hZAFlh2NVz7jA65ZWahJ6dYUSP6QAQ27Luw47cd+cGZjp3lIZG0SiRP5eiYXGx3BcAWxG3sOfjAkvTJFZVcNEGKlXkAACsGNlRbHccg7VvzgwQc3SLzNRpUbK5kI9MnmL6FokKF31MukX+g4ugd1HoghVJYJVn0gu4G5jC0Laq4Y87E2KGxJWZTKOz0ChOrSpcgISb3ayCFoE3R3oHnA8SshJ9OpeBROo3WxHt9QPxtgvcUllOchMh1Okqj6iyiztuH2PGoj1XXtdYzIq0oMRkYCmcgv6aA1HZiAWLV37HYnBE3W83L/zJJdCjfRew20giwD6gKvfc84XZuSIANUoUJchbST5m96dx6SaAvfc47UQLusk0lbQZJpLEduwXUQBQ0gWxskG1Jqq+cePGhQkzEuukImg0VPqPqNBdJJFVubIwvGclYCl9IuhZNXV/vQvbtgjKdbKvGZEDCM+lXGpKu6PDVe9cDfjERnE6Z7tIf+PqU+6jmaLlqi6rGWQZguNatpYMxLspJYMLFaVJIP8A6ie2FTLe+LXkmgkcNmNXlAMajs6hdrEu9Im5G3G/3xWFYI7KL0hiBZs0CQLPc1ycVPGacNeJW9d1N4fLccs9Ed4enYeZAI0fzBYseoabY6G5B/NQ5ojA0z6m24H+PevjYD98RZjMRntgQ5r2xDdWySU3II+KkCBrJdd/gjpE2rscb9Od1UhXZdJv0mq5IP39Tb/fEOXzgOxxjMVNj/5Ht/vgeG1Php7vGDg/6iq4ubH7Ks+Z6VA2V8/zkWav+SqkCgQoIFE3dg71e9gbYURAFgZS5AWhVXsKUWdgvG+9DtifJTI7rI0epCfUi2t1sVBF6TguPpkkhs+kcDUSSFHC+9AbY1j6qKJt3vwdv11VPHBI82aLocLKBpjeQopLgCxW2kvpBIU0aJ9sQwjTpPO+67jYV3+eNtxX2xYMt0EDl2/TbBS9JUbi7HucV7uN07drn4Ke3hkp3wufyHVJI227kbcbUv8AljyHL+ZKsQZU1NRZuFHdj8Ab/wBsXPM9JUbmND8hQD+60cKU6YIS7BNeqqLG9ABJIFc3tufYfrQ05bU1PtG1zdTpoHww4z63Q0nhnQ8zJEczDCaZ2LKp5ALUR3rYe3cb426b0SGw3kxy6f8AmByyRqCD9b6gbB3pQe2HGezMcojSCJ41RQHbVdk1ZUE6Q7N6VHewT9OHnS+hKAplAYrusf5E+wP1t7u1kncVi5q62OIcuNgv3sPV1Ww0fMOpxKqOT8MwWGEbTL30xuFP2a7/AF2xB1XowiJkEGmMg0pGnTsFsE7miQa7733rrMC4pn4mvr8qMLrKAuw1VWqo1I3BJuyB3rfa8R+H1Mhqm6iCD0sPwAirIIxCQwZ73P8AqpkMsflsWYLKleX/ACy2uydeom02BFah2AGHuT63FPIP+JO0kaxjylj2CcHSAq2G2GqzxqBuwMJp4AmYEeXLAM4EcuZASiLV9QNpp12LI20/voucHlNBIy+XHIa0INbGmFLKFNLe41WPVfHGudpfn/o93rus+GkKfN5kzgq8jCKMMmVXywQx2qLWqrQqjqbgEXWNc1ks1l0MKl//ABEZZkipleJT6XtSSRYJ4G1bkHEHUpZ5m88QtGjroHloVjKioyL+miaDEmrO+AJXaIkJK2tdSM0benTQHpdSCQdwdgOOcJ2A+Xrz+qO3dNf+OykK0EapJIXHmBQLXTpaJST5bKEolqDWf1KF5k00FJ9O9tsH7OoAHA7G97w76QGk1vm0/wDDz/yTMEj1I8a6wI1JUI1KAWrj5wM2b/iTUeSiuREgBVGAVxxIoThygs3q2BPGBa/TcW9evWUhCUnNNqMljUb30rW4IPprT39tu1YIzcmWMaCJZEdUuRpG1a3BrSgUUqkG7b2r7ndXgzGTLJmMuizSnWJWX1KN1ZV28uiDZABrUODwiRAbs6SBtsTqOwC7ce9nbbHar5CUBbSK1Kx4YmiWu6oHuSP1xHOKZlsGiRamwe1g9x84OmE2VM+WkjRWcKsgdVZl4caW30miLIPGAc0ig6V3rYkNYZrNlTQ9J7d8cHriFvmPMIErK2ltg+ilYqAKBACkgVdfrieGCJwCZhEeCHRms92BRKC+wO+2JMomZzR8tBJMVBcRrwoUDUwUUoNAWQLJ9ycAyyLtpsbC7N2e5FVQ+N/vhRnF0JXb85CDp0K/A1amu2G1jsNqH2x4cqgSt2DaSTZHlsT6gF/PYFWONsMjFewG3sLrYb9+cEJAiode4JojT6kcCxVmt9r+PbFNzLBXT4wFWYckjN6iUUsLYm9Km+3Ldtxt++If4MMaL0NQUO5+lN69O7EbDjYce2HjZMFQfSdTUAH3XnkHcA+91784HmyIBqQGP1C2b8oN76eWHG4/zw5rQ6QEgcEHVs4U6Rq3sb1sd6oe222PMnA5t0XV5Y1m62HF0TuQfbe8PpsiloqgB9rMukJvZU776NG/GxK3zjSTpoMaT5cI7JfmRoTJocGgaPqFj1XvRHO4OF5qX2UnjyJKCUMW3JYJZkSuHb2tq3vAnUeiZiXLExxyHUdQOoAOI/UwINWe4s8jg4b5rJNG+hfM1qv84pd6ibC7c0aBvvftgSWAFVcLJ5Y9LkkH+aRZIHYH0877Y5xD2lp2KUR5uCqHluoOvB/Q4NHUo2+td/cYe9V6Xl5CtWSVGpq0kNvYFH1AdicKc14ZI+iWxVjUlc89+xsX3rFFNwp4PsZ+hU9tQ4CxQTzqm8TsPcdv9P1wveWsNR4am7ui7WPq3+3pxsnhxVP80lj7H0r+31G+1c4b8JK1n8hs0d0BfqPsNyUky6SSkiJC1cnsPueBiw5PwxGIhJLNrkLEGEAgAVs2vvv2FYsnTelzCMrHHpRgLDyvGGA3Hoj3oHjVjyboko38lf8A2Zhif2kQj++HIKikjPtNJ88fZC+mmdufgLqtz9GjIOhtBAJ3JINb1vvZ4HG+IOndPYvUoIVd6/qvgA+3v3/e8Ohl7tSNxZN+l64oqzaSP+pSdz9hg3I5afNTIuotI9IGbcKqg7muyqD9zQwVfJSyMHJ/uen6R00cjHXk/qN1NkIuAoAA2AAoD7DthskdYsDeCTElwTs0gH0y6dD/AAdK2n3F17HChm1LekowNMjcqw2Kn5HvweRscU76R8Yu5WMFfFObMUayY3DYD1Y3WTDN1M0o/pWQGZzCQsWCaGkcqaJClVC3yNRbkb0pw+6n4FhK3ly0TjgF2ZG+CGJK/df2PGOZeMuvZrJRpNlZfKZm0OwUElaLAeoEDcHC7w3+NGehcDNaczFfq9IVwPdSoAP2I39xi3pYWPhBIWZ4jUSx1J0uItZWNnMElSqRoamUkCmrv27gg8EMCOcMU8VwcbX7ebH/APqxP9sMfG8cObysWfy7BlcBSa+pWNJqHukh078B3xz1gYSupd/qUOAylGG3pIon5/StsOUvDmvc5uq1ulv2pHjXSsa62evwVzl8YoI9SxliTpUi9F1dFiAeN9gcUzqXWJdetqf1F99gGqgdvbagSRt8m4ViFarG5rkXxfF3XzVdseMoII2OxG4B522vuPf33xdU9HFBkZPcqM8vkwVH1nxE+auWaXRNEB5IWMaW3IOonZdK0Bd398Kf5oiVJGkSKmaMFW0swJ4GwJuxqN19tsMMtkwgc6ZDLt5RSiBudWpSCTtxWDc7nmzYBnldiikILFLtQGnYKNt63xODw3DdvWyg+GJNigYesTyZYxTZnMjLohEUaC0cqAPKJFUuk7k2BYsYh6plo3kdMkJGVrPlKxkpEr6jQLUQW3BAGnfBj5aQeY8yO5kjMaSEmPTQG/pADgLQKnY3vhx0rwWDH538UY+QGAKhxR9ClbOsgWUu6Bte+O5zW5/4hNM4bqtSdfm0+YiiNnZh/ECy7JoCNEWYnUoFHf1WecCdIgR5Y1BSM0f5krehHALK+wFcBdJ1Ak9+MO8vlqCSZjLmbLhiupAEZqjOlQ9aiiimrjgn596HkYcxHJGsI87TUUmtqkk+ry6LBfM0WVqr01W+DErQDj1+kD4C3dIc11CWR/OkkZ5KI1mjzYPI3G57bAiqoUCgXSwNAjcN6jq2rRV0L51EdsWuXVl8tJJmY9E802mJnTTKNO0zbighB0VW5b4wtmjhk0JDE8bpAzSajfmMgLlhdaF0At/7aruT1g7DCb0pGYCApoANdbjtV2BuP1G/a8ZIgUkWGo1Y4Pax8HDPMf8Ahmmy80UXmMFUlqYxcNaMrEAkEWd9sM+m9M6fJDI0uZEcqWFUGxIQD6hekheGF1f03ZrHF9hdIQq/MZ6E5Eiq9qsgBUNQ0soIoH07EfvjaCCBgC0vkkbEFGezX1AqAAO2neq53xDPnJJANbswHAJ2BoCwOAaAGw7YilYGtI07UbN2e5HFD4/vgsobL6HyHWFYK0RQbmjuCSQD35I5/wBsFFgz6pdRHcD3+P8AX54rHKst1DyZC3lxuNJQKdWkEryN9WobN9yeOzvo3iySNLlqaOwrBlp9XJCMLArbc1dihziHLw8jManNqwf7K9ywZcVIFJRm0ldwybWao0e3J/2mihYQylHVwg1RNfrQHZhXK+n9jxhZ0nxjkJBoYNFqokObAO9Ua2++C/PTLS0xQE7aCfqQ3weDtW+IDo5GmzgU614eN0r6k0SiOSWVU1qLkkBNk6hxvemqrm8VP8OYJsv1HTMaLSd5V4OoAaLLhia9LVQ/TFw8cdViyuXgzMKyOAxRaYaUfd/WOWbmlvSa3xzZBlGlifIl1zCtrJkkKmVyVGmIlLYsx2G357ra5cDS5hHQ3Hrso0013DyXS54ykrwIzNPIS8nlg6gl0FDbA+prajsF3wzPRdIbVHUSMdK668w8a5LoabF3fAoDfdD498UzZbNLBCojBXXJpNNIxFn1V6QP7nFdzPVzmDplkCqilrYMxZq2Gx/Me54r2wEdI97Q+9gU94pxVtz8c9El4wtfk8sIRX0gD1E3sP8ALC2CMJpfl1KlFZQV078/rdAYXdFdiyh1ZImjMupiCQiqCxUjtewB9xhzCqPGXSN2s2rCyAvsaHOBdEWGymR1DC1CoELDzIwyXuBsau6H9I52Fc4hcMknmKpJQHUtksY2Kmt9tSjSR8Cu+xsTgrsQV713+/c42bKjf08Cz8Dbf+4/fAPjD2lrk7zRuFNl83HILRwfjg/sd8bTEKNTEADuTQwum6ZG2/0n3Br/ACIPtuP7Y8/4MgQappybry9RUBa2NppP6f8AZp3cNk1WBFvXkn/Fst1uk3iPqEBrnUD6SQQT8Ktaz+1ffDz8NIgZWkIIZY2FEURbR3YO4O398DN4fSP0+X5ZPqujZFbWd7vt8k2cD9Az5y/UG8xjTmiSe0gjpiT2Eiaf/wDQYU0DYC2Quvm3llMT1L5YXMA9BRfjF+IcsEn8FlHKMFBmkU+oXuEU/lNbk87jFR/DLrrtLLBK7P5g1gs1nUOdzvuKP6YUfipCy9UzOoH1MGHypUV/p+mIfC3TpEkWc+gLuvuTVftg6rSIjqUDh4fz26B7/cui9YzvllVBAZjyfyqK1N88gD5ON840FIYsxOW/MSBV/C77foMVrPGQlJXB0NaBjxfP+RF++NRMQKvFdTyxRj22XutzBRMqG69Rx2TPqafxmVkialkB2PbUN1b4BG3xZxzrM+Hs0nMLn5Uav/xvHVvBfThMszuDpsKhvuoOquxFkD7jG/Wci0LAcqfpP+R+f+/sbJnQk6B7J6dlU1HDoKqbQXEEYv3Sr8NeqvH0/OZWZXALI0IYEbsfXV9hpDbf54j6kACdtzvZO1cVX33vEySb42kzTxukiEBlBokA80vB24J/fEqiqXOqgSN8Jmp4YKSGzTfP6QkOYWNxIqo6g6QsoDfl3JUG6smjxt7jEWXzGkEA2CNwQD2O/wBxZIxE8VDUCKuqsA8Xx7b84IzEaxlNMscmqO2oEhS1godQ+oe/+GNHa+wVUTpOSFtltVjTertpu7/Te8Ft08rEjSKyo6nya0lSLbV8/Uf2v4xBkZY6ZaYymvLKNwb3sAW1jYVj1IF7kqADxXPI57XzgHXBRNN9kbI5nRmlMkkkUbMusnQ8aUWjtaZSAdWx/bBnQBG+YjOXaLypT5WYysr1rjNANGHPq5ur1KV2u8eZPq2XyjL5kU5cDkSgG2Av0FAukjsbvg3zhZ4r6QtjN5UE5WU2pC6fJcco3OncWL24AwG+Nh9Ey5tyQcLTrmanDZ2RnlSWCQQIoYgRQsWUlRsNDaVQUK9XvRwvgnkkUzTJDBlpIf4aSRYl3CA6WSO9TOGCqWQUO9Vt0HL9Sg6hlcxHKjrmNKzSwqQDOIwGDoxFqGpb5oAVzeOVde6ks0ikRrEiII40Uk0i3W7G2Nkkna7w5C6+LWUV8Z6q7+I38pslnZJiSuRVMtE4LSvOUZSzDelVmBJJslQMedK8K5uWFGkSVZs0r+fmpt2ii1BFQBz/AOYurYDV6gPSLOCE6vLlOj5edoh/FebJDDLKtvGjFmLAMObUgX/tjnvV+t5jM7ZjNSyjmmYkX76eP7Y6MOdgdDv7vXzTJYrZ1OPNxnyMimWgiQ0Y1ky7ZgC61zl2JBPNA0o2NYofWGJnk1SiY6iPMFU9bAituPbEYyJKF1UsoZUsf1MGKrXJJCnj2OGuf6Cy5n+EhDSzIv8AN0ixrq2CgC9K7LfJIPGJUYDTZAQlE0zMSzGyeSfgUP7ADGkxBrSNNAA2bs92GwoH27YmzUDIxV1KspoggggjsQd8QE4eNwhIVr6rmWKHSIrR6DRoA7UqsVZixZhW/td4k6c+UaBZG86R9JDx0FBOkhPLO9gPWrVWx2GC8uGnSKcQov8ADIQxjB9QUWWcXyAQSx2ws6PP5TzilKShGoLbBNV+mTSQnqIU3zqUb4HViwQKXqssKgLEdRGlpCUKlXa7RBqNpvVn2G5w06T44zOXMcJm8yIMAyBBKyq1k6NQoMoFaSdtXG2yzpGXM7OTCsmk+ZJGraHZBZPl8kJ7kWRS4QZf+ZKVjtWkkARRbNvqqiB6q2F8m798K4NeNLsrguw9Nzy9Ty2ayyRpFmlIlQp6fMKkgGlYU+n0k3XqGIfwm8ENG7ZzNRmPyyRFE4qmGzOQew4X3sn2OOfZtZslNGVkVJwNWuMghW3FekkE1yD77jHePHeadOlStqXWY1WydIYsVUgdgWuh235HOIFReMBjDh5+I6H4IxnJ6Li/iXqbZjPyzUhpjcbMAT+VQvuQACaPbErP55jWKEXpC0ltqI5Y80TtxttgDKQpIypFrll1t50aoAqou6aHB1Fi1n081XHNly2UUwvI5SJ2kKRsytSaEDOx08MbUCxQNn2qdrawY6YH22QglOPBU2tnieMmoSIy8eqhRLIxrePWLVTwVq+bm6dl5o9MuYmjjljUOmXBWMKD+eQKPSCeQBZ2sgYI8DdedTm3ldpEjh1o7uGGpSVcBqvSx00NuO5s4Q9Vh2bU7ZnMTESxtEXYCM3rcqBQVmAUX/T2AFwzd0jhtt+/d5o74R7Z0h9UoQMwYqsTpyap/TZZb/q3O++NZM3LpKkLakOW2sCgK54Ng1hJlZkRFfzUZklFwFT6uDbkDcXtR43w6zHSpBGJFKEv6hAnqZQ1mhVnSBwfhrqsOFrW7rg9w2Kmyue1AllIAG5AJA9r9r43741n6nX0rZ924/x5wqXqBu91JFEjYVVcChVYMyaFmpPUT6VAX6rNV6qqxv78ffCcpoyU94l9rKaLq/8AUKNcm6Ndvv29vnFe8UKxkVypUldLWCL5I2PuCfvWGmZho0edwRfBBog1xviFoRNG6GRF0rrXVe7CgACBf6HbnjDFXSNmhc1u/T3p+mrTHK1zjgb+5VfOuZXV5fW6LpVm3IUbgX3rte+NZJTR+2JZI9+KPce2PAmMY8O1WduO63gZAIbxgC/ZX2NcuyjLsYz6B/LJFlRwa5/XESeEMt3V69vMav8AG/74rMechkjEWaTWq/S++pfkEeoH5HPfEqdNiIpOp5pF/pMoNfFmjh5ugjdUTpJoyQ36GyuPVOr5fJRAuQgApI1G7eyoo/8AjCfOPM+VVsxSyySaxH//AFrRpPkgcn3OFvTsnkcs/mAvmJu0kjayPt+UffnBb5ppm1N+g7Af998LI9oFm5S0oeJA92LdEvEBwJ1V6I42H+Nf6f44fPGACTsALJxXP+KusnmxHS4J0tydJGmqNji96vfFnwSldJPzCMN+/RBxuvvGGXyVtFLocSqEYXQSQBvy7krsCN9j7j4wJly4OhOGNaTvZogbUd9zRG4xA+ZOixV6tPO/F3Xt8++F/mSB9Wr1V7A7V8gjjv2xsw0AYWVLwU16x0qbLuokikV3vQADZq+K/cfFYDg63oUqys5/KdQrg87WRdcdrxLL1AzqfO8yac0IWDm13JYaQLewaA/L222wKcl5Ucc0q1HMjGKmUk0dNnmgD2IBrgjCEBwtJv62RMkLTdpsin63PKwlkTXq9IYk9gBp1GxsK27WMWfpHWXgLGCR1U7NajSR/wBSmx8e+K30uICR4JIWEhjJj8yTylQ1qDtqoEEdu9jBHUIJUfQyzKEBMmqIgRgXRIQtsdvVxv3G+GXU8LjayPxL7WJV98O+L9eajXMxQkE6Vl0CNkDKQD8oQa+xwu6X+H+aGdkyxVY8qRplkA/5sGosoF3TnZSQQRX71bMGUZEPJIR/NDxZeQJpZGRl82tXmfbbTxVjcdd/B3qE83Tg08nmFZGRSRuFWqDH8x+fasV1VFyGF8Zxt+0glucLnP409fRsxHkol/l5VaNf1kDYf+laH3J9sUKFY2DMxZQFNGrthwNzsK7/ABg3xJFI2clMiOkksrMFkGnZnOn6q27Xxthv4W8P5ls1rzEMnlZdWmcOvpYIpZUFgq2sgDbteLFkEUUIuenz9FN8w7Jd0PONlpE8yJ/4eQo0oKE6kJ9Dr7MLJVgbu9+Ri7+JOkSyZrMa54Mnkiyh5QiRtK5USGIMQrO2okksQoI34rFZ8I9czA6jlVdiIZpgfIQ/ytMrVQj3AAO+kixV7HfDnxw/8Xnp55pF/gclIIimolmarKqq7lncEFtqAO/prDMoIlAAtjffqLY7pNV1XfEXT6QmAZX+HTcus6vIzcU7NTlj/Sihe4urxWhnPej9wDhjFmpIJvOmgPnk6qdAi6Tp/wDL0AbixxVNY3F40611tp5A5WKM6QKjiVV771W3OJjC4Cxz5+t0OpPsnk55YjHkw9TMyBPM1NoUepGICnSTtbAKSR98ZmoDl4jAwkjnRz5mtbRU4V0NA0DSktsS214X5YS0HXVaK2mSL1FVX0u1CzGqht5CO9g98PvD+aGYlRRlY5JB9c2lW9Cgl8w/mnyw49PqZDwe53huLm56JFBnpTl0ys0SrRgAQliriQPIrPYNkFjqr/pUdqxahnoPJ/jNMOXkWQR56SGNWkqRfTJE2/lluCAOWN1iMdQ6fmXhTMKsv8LCGlzkJEUdq26gBQSup1PoAJbaiMWHMdMy+ZyvUXijl0yIpMrksJTE2u9Ox1DjbkUOxGIj5MC4tnfyJ9HZEAqx4mkeeLKQwBVWOAyrKZK8pdRXWX2tdArSNvX3oY6JGTn+jLo3aXLirP51A2J/9S4pXWunzZbp0eW9Ks3qknaVVGXi1LIIgb1t6gNlB5IF2MOfwUzlQy5UypJobzIzHq0+W9jSNSg2GU2K/MPfDM9jHqZ/8m/13+aIb5XI4mCO50qsaGmXYam1DTpYb2p9VgjYdxtjosvRH6n04PDlzHM+YDFg+lX9BV5jqsgHYMByVFcYqvjrpUOUmzcbu5ZpCwj0jQ0TaXj3FMpVi242OgX89BkzqQdJyUE0czLLCC+hzGyxrpLFiu4+sWNu+JU8pcGFgyTj5dkIHdV3qvUU6NlI4cq6zyTkiXMHQ4LR1cQQmwgJJsg1Z5LWNYvFk8kSq+UNTL6JMtqjcxikBGiwdBI9J2BI2FiwOodA6SmZYSZqVUQahA6u2oUGQrKgJMZU3X1drGIc+wfzJctnTmc3G/mqU8yLyo69SwRtaso9II5AHBxzGsO4JJ6kEe7PrySElL+p52KPNyRTTS5lVj0+YxAIkoFTqiLFwKC+o82NqwNL1cjMhxaSBfSEkO1rYGoHjSfe+b74r3Us85IXUSC2o7n1EnVbd233s3ztWPZI5JZrhjZmeyEQM23cDliABd89ziW1ukEHohuri3iSMyAEVqsdtqoWQB7D+2G+RnieMPHIXOplYaSBQ+lgT/VzVbYp3S8u2YJlLMp3AYbWpXSRt8bbfN84bZPpQhOqM770Oxaq47fpiBPxCkik5Tn2Pxt8cKZFQVMkfMa3CsWn02pBUneuQRY37jm/nEbE1prYG6r/AE3/AL4U9FzYiCDMRSPGQ2pUamB+muNr7EEVsbGN89nBI8iI7RRKweMMCdVaRoBVRRI/q22Nne8SRIy9rj33CimN/ZG9Sysc8lxquX1EAEsSgWt9WxbnexxfBxXswjI2lwVPIvgjsV9webGLb0fTLEaAZgSBZ+9Egcnj9uDjPGaJl4XkIBjVajWRRbMQSBQ53s37A4q6/h8Mx1A6T36GysKHik1OOWct7dvcqW741U4WdKDsgJYkn/usNIss3/T/AHxkpGhhIJWiY8yAOtujcriwZGLa9gByxNAfcnCKCE96/TDPIRK8iLIxCX6iNyFAs6fkjb9Rg6aznBlrkrp7sYXXsAguqZ6SQkRatCgmwCCRwSfYb1v7/OFrQSxFXV6P5WjffjfiiOa7d+cXDqnRUBLwm4vYn1gACyRyBuN/ckUNsK2yGxFWxqiP72K3vb++PQKdrI2BrBYLGySOkcXO3VZGWYkKASTwBycMD4azK8DSTtQfffYrt78V84Y9V6jl8lHZdf4i1XQtlgpBLSC/SDWx3HG2K74Q8TPDmGhzQIWZraxRV2ACt9qoV7VgZKwB+kJRHjKNynhCVmIdli09yd79gMTv4Cn28so59hYJxb+p5ZVoKGBAp7r6r/LX5fvgWPMtrWlDVwgBAPeqWid9+cHz5DkIbBKsj0Kdcnmo/KBcmMlmCsTH6lZEJsg2VO25ANb4tnh7LZlVOUzMYDPGwykkilhsury3BFMhAJCvxpO3GDX6iqRtFm2i1SFNMMYCMh2r1AfXvsm5s4Z9MzuV/iY4k82aRD6pLsRH6aJVQum9ttsQ5Z3OBuPP6D157Ig1cnXMTyxSTSa/OSWMhX3R/OR0AMRGkEKBpKjjbsMdR/CXLzZaKXJz0HQrIqgg0jgirHJDK13vgzIdESJ55fKVv5myUvqcOJEc3t6TTA8jC/wp0aPKZvzEdbltHUMTux1D4PqHYnk4GoqGTRuaMdvXTr80rWkG65R+IvT3TqGYjd2b12pYk0jepQL/ACgNwNucdW6D1nLMhy0Ad48vAfpJaxp0Ad9Wo/SObxN+JXh1Jf5ojUyOFj1km0olgRvW9kEn2GA/wyyEmWXNySDUKQA72SoahbdgCoGDlmbNSg9R088BIAQ5II8jD02T+OzYj/jfLuHKx2wViK8yVvfte3JqzVK8h4xzchd3yuXkUAuzLGU0Pp06/MQEqx9QBO9vQIw263kcjKVzDrLA0rMzyLqnGqySjKPWhK0VNV22oY2n6p0wRBIs0kSI4VY3RwWdhqLvq9RFgDVppeMOgsIu5pLjjbbyFv8Afehz0VU6zJFmIRUmb169XlSv5iIao6XY+Z78/r74rb9JN9/2xYuveLo2mkM2XYzE+ptSgcLRGnY7cGyCG/XAkfjKACv4dv3GJjA5rcBDa6W5+Aq1xkJ5iiMKrdtgykCjTN2YAfcC8T5bPPFBNAkBSVUKSyFtTaNYDKooBBq0gnc9rx0Twv0OKeF6CVRI1URpv8xG4odzV4j6h4DUiPyliAQevRKCX35Gs0p7bbb4ZdLDq0uxZcA6y5q/Up1TyzGPKJt1RANR3CszKNTaS1gMauhWL/4XzMmXZM1EaiRQJlrddXpdXjsMAWVdL1v6b4rBzw5aDRIUXKHdGDp5hmFKGKolekED1WAGSwCScHRjpsUk/UZczL5Ulo0cibSsVBKUdTv2NHixvthiV7dJwbH77W+P/UTb3SX8TckmYjPU4XOYgao3J3OWpgfSu2xbYhuNXtuFf4V9blTqmXjZmKSo6URR3GtSw+6Cvg4tf4feJpM9LJlJYFihmgdkTywoAtUFALuuk/Ux3rbFP8B5GVuuRalGuGV1kqqGhHUkb3V1hn2uU+M9B9EXUFdW8ceDYc5NDPPKscMa/wA4ED+YoZXRSx+lQbvudVYoXi/q3/EJWmy7ARZb+WgJpn39UirVlL2vtpxavxrz0kcGXCCwZtT2ARpUbAhgRuxFGtiBjmXVOsPmnEzxxxjyyCV0rwQCRdG/bnfVXJGEoI3ECQ7bBdIRsgfEDa3UskuoRBTItkOUAVD8EKKPc8gc3X8sNQNKxpdR9wg5YiqAvv2xdsx0LN5mNmgdJIlBC+U2ly4ArVrC2rbnbf4GK717oWYy7FGDvDHqZJWQoGPpLFQ9Gw21d6sbYnCRt9KCyg6n02CIHVmleUPWmJS6FAgYMsooH1UhHI39sLZc4Q3mJcbaiV0kgqCCKB5qtuePfEcbEkHmjZ+2PWiaRyqgC22AugOwF2aA2xz9TQXHb/EQFyAFe/CnWB/DuGXU5AXVQ2oBdv0GCf4muMBxJpAF2aFn3oAf4DHuPO6moa+Zz2CwJK2tPE5kTWPOQEUczjRsxiHTjdYbw34h6c5IKjkn+Lwo8Rxu0SuFqNWo0NrI2P8Aav1xasj0sMfVxhvn4omhaEqNDCiB/j973xKgqJGkPccJqSlaRYDK534azC6fKPI3HyP9sWjL5bvik9V6XLlXBN6b9Eg4PtfsfjFs8O9eSVQjUso7Hhvkf6c4OrptR50eWlLSygfxPwQmHlYXdW6gcv5ZX6nYr+mm/wD8gv8AfDhzineKZteYjjH/AJSs7ft/sP3wnC7+LZbuk4oB4V91MesTFXomgCxocCxZvsLI/fDb/ipykC5jNet5P+VCHAOkVYNC1LA/V2B2snarnp7PGHQo5LEeWpuRaoainZSSADe+GfijMZfJTsUk/iszpUR+YlLlgF4Zdw0gPbgcmzjd10nLZZvVYqFublLj4Yz+dkbNHKzeS7X2BCdgusiwBsDxjXpvhGVdfnwP9I00e+tRsVse4x0H8KfF7SxGLMzR6w+hLc+a9gsxKm7HyCBtVYtGa6iUZ8qY1CncGhZuvj/e6N4qWR6s7p/VYqg/h94nkKPkJSVlA0DUN2VeYzfDLX3r7Ys+SCMWbyfMkDit6jG11oXcm964wRm+kQMVYIA68lqsMP6TVisSKkm4Ch7BCiqCkkMWAFb7H9ziWCAE2Qq/onExmTSZCSzMwUnuSVLbq2+xXf2wq8N9FdJiYyY5g4pbpZE3tRuNThtPpJ72ASMXPJpI4ZKjVNmZ2B9NXVEWb34G5w2XLZXMsP5jK627yCPSKG+pragb3se/GCdMG9EmlGZfOfx8SnSUzMYvy3GzWN6B/wCxhLIHiI1DSdnFUTtdd9t+xwfN4hVMyoy2hY9Q1t5YBkJI1EtXf3oYC8Y9LaPONKpIWRb4sXVHaxvY5+cR422dpOARcD8IicK+57L/AMRBQ9JcBgT24OFeenijglhjPmMq024+qhsT2NVt2FYYzalyhFesQ1QNerTVX2374qmbZoEjVBb3v3ttvf7D9hiLCzVi/VETZVzqUYgy8ZK+t2Eg3HpO4pqtSNNgjj/PlfizOyGcIxVY9OpdRYg0Pc2bJFUNrPYcXnr/AFA6n8/zfVGWRECWkhbcsCdl5sDcbbbjC6Pwt/F5cSvpV1ak0E6iPco12DVn5OLZzXiP2TY901cXVCIQpqQHnc3wK+kivezqvEGOg5vwfPJK7XrnlNNqj07UtAIgABoc8UTt3wszXgOdT/TYsAq3HuNuMTaeou20mChcOy6D4TykuXzEqJaALq5qxQsjUKbfevnF4yvWB/5saGu4AB/Y/wCXzjmCeP1ZlZkUX2BNJ23sd+dif0wyg8XqxYUhC+0q7716bq/fbtviunpnyG7gla4BXfrXS8rmlGkxrIBQNUwG+wPY7muRfY45F4qEwdMuI4o44rC0wkktiC0hJKAk6QK2AAxast4sjZtGkhiaFFWvt+/tjfP5zLazHmFW12ZXC6ht3sYSOJ8Zsb42S6gVVej9Zn6fPl83KZ5YSBGrMG0NHuagJrYWaDDf27jsfh3pvT5p26nlSGeVSrsrGifSTan6X2APB3Pvjmz9IyEg0IAUJ2USGrsbquohCaAJWiQKO2Ou+G+jx5TLpBGulVFkf9R3Y2ed8Raw2AJwTj4I2Lkf455/XmooBrAjjB1L9IZ2/P8AHpXnudsc6gJYA2q6Wo21B0O5FHlr4A7X7Y6f44ymWkmnzEsRcht6dhYFKoO9Vt+/ziloemOjko8EifSoY2wPJBb02P6Tue2LKlBbEAAmnEEq3+BJY41m0EsWNHUNNDswAJ297POLYczHfp2HbXtf3vb32BN45x0bKLl9M0Uy5gtalGBV4xY9RsEG99tv17dI6Fk45og0bgne1P1Kfke19/jDFSADrSjsl2d8N5Gay8EbSat6pdv2DX8Yr3ijwbk8uq5iAuJHkAKWNK2HLUANuAK7ewx0DNdD4Fg1xtX223HOEfXunymCRaDV6gON1OrtY9wOBiHM90kLmtccgp2BwZK1x6ELnxjONdODARjzRjHuhstq2S5Q6rgqEY1C4mQYa02UhpuiEkxsDeIkxKuFJJwjBspzGrKVYBgeQRYOKv1jwhGfVA3lnnSbK/oeV/vixmSsAdTzelCfbDsc74v6FNSxMkHthVZes5iC45RqIGzc0B3Ncgfvhn0boDaZ2kKvNINK0bABog2a+qwd+AMP/A/hfLzhJ8zqdj6woBbkkKmkA7V6jfcjntfc10OFkYRZdkvk6aB+9H+4oitjh9tTynh7W53JHkfoqWeoB/jcbjpfz7nquI57PLkw8eWIlzIW5JhVRDhljvlt6LfOK109VBV5I1mtgxBkPCn1K4X1DV789xjomZ8M9FyrNHmmnMm7gB9tN0AtAWb29/STxjQDw4KCjNj5t9vgiu/x7dsaQyvqbS7g7KhDQw6SkHU+lxZcxTJ5iamD0pFpfqpCdzXAv9cXvo3Vx1DLCTYZqAU6jv8AI+G5+DiuZsdCcinzarQAYBiRXemUgk/6Yj6XL0/Kv5+Vzs5lX8s0VRutjUjEDuOD2O+JMQc1LIWu2V+ysmpdVHbYj2I2P99sHLNYrSS5bkUBVcV73ivdM8TZNLSDMLGJB/MVn5bUdhtQH2NV98OP+JQuFJmjo3pOtQtWQa3qtW23fDjhlNAohW1A+3689h98EZZEKOFU2V9bFh9N2Qo25NXzgSPMDSVDgK1Egnki6v8A7rBWfyQi0lnDA9lIsbfrv/t74bI6JboNYkRfp9d2HB4FEEV84t+Qz2WzgSNyPOUatF01CgSPdbq/uMU15NO+qjV2Dxtv/ocW/wAF9P0oZdQbXVV2HcH5vb9MN1AAZqO/RcN046tIFj3NCx/risFxJuDRQ38jawf8MO/ETWAvwTih9Cnd5c4pidCFQAHhrvdSOQRWG6dnsEpSUr6tCHLF6cncne7J3s+977Yi6X1JI49JcKQ4VVCflr6rFLQ9uTZOD0kCFtSksV9O5UxtfPG5Ff3xVeoC5dzVjbSo5qlFAgbmhfyTv3uWN1jSVHBsrwmblU6gquedQ57e9/8AfxiPM9QZjckchb9/7g745t4j61n8s/lAMCh3BT1DYek1ytb/AK4Xp+IedUUVT9VP+uIj9DHWP5ToJIXTc54GysoOlRGaJJU1VfB2J+MV/q3hLM1HplGYjhXSkbHQdF3pBWr3PveOgsv2Hx7Y1mCqkkjsFSNSzOboAf44VtQ9vVAWgrjTZPNQm2glU0QTo1bEUeLHHfkdsE/xjrEkskqMrSFDFrHmjSAdRDA0N+T/AJ46sTpAYsqhhtqIW7G31Ecg/fcYRdf6pkohKuYMMskamobUsWH5bo6ffEgVgO4Q8tVzwTlpn6hk45I1VZalFonqjW5Ay+w1L8HH0M52Nc1jkn4aJkWzqzZVWoq6BgjBAwCMy7k01N25BPzjruKriMwkkFuyejbYL5Qz2dMkZDRkyLIzSS6m+liAqFfpADXRPcgYHyq+baEiwCVJO5r8o9z8Ys3iToMmXzuZ05KaRPMYKxZfLHmG0bToG1kVZofpjfL9Bky8bzSZaOGZBqjSV2OsbhiGLBQw7KQbv25vBVR6cJgsK16PlQVZWOsCwhOx7USATuPa63wzjzRgmYwu4jXdWcgPW1j07He6HsMJsp1GSNTJryAbQSP5pLXp2IAYjWOwIq+2N5884TzDm8qQwraBzqFqG0kiiwsWB9trwy6UE5Shq6H0rxo5FSAMDwwNEYe5XrEchqwCf6iB7nnHKperQogjieR5GlsOuUKAxhCQoRlYkh9zR3A5GBj4gzWokyHbf/6E1Z342rfEYwMflosiyE161CIp5FX6L1KKqlYBgK+LofAGFqdTjvSTpP8A1bf44ky7u665DbGr9OngAcdjtf3wo8Rx1X2xi5ng1DmDa5WyijLadrzvYJ+DiVDiTo3RV/gomjJMoTzJN/f1aedqBofb5xoq46rpX05Ad1R0NWyoBLem63DY9140OBJ56xCup5NkTJLhfm21bYY5XoWblXWselSLBdgLHIIAs/2whz8rxStFItOvPP3BFjcH3w86mma3U5tgonjIXksa4Eqz9G8Uz5fL+VD5YkDgq8iFgV3uNiDa9qbcACq746TB4rhkj1Rhnat0CmwT2YkaV+5NY49kEZt6xe/CSVC+3/mbn/2pWH6SmbUP0E2VTxGBsbebbcpF1j8OmzUgllzvr06WJQsTuWJ9TADdiAo4AGMg/C/LCMo80rE1bBUBFX9Ng0D35uhi73jdJaoijv7e2NQ27GhrdgqK98qnL+GuUOnXLmH00ACUAKjsSqg388/OA81+FsTLoGZkHyQDfff33/wxffMs2d+9f/HGNhG1aq298Lrd3XWXO89+EiyKojmEfloFdljY6yCbd7kIs/FDA3/8SqzEzZ2Rye+gC/1Zjjor5wK2g7X87f7++CS9ittzerf7V9sJc9Vy5rH+FWXr/wCqzF8DZf24OxwfB+HQD6/47M6VHrtwLA7X73Xzt2xbWkCPbNtpsc/UexrYX2+xwF1HMBgQpI1XdbVfsa965w4NR2SGyRdS6a0iq2VzAgK8tpZvM2obFzW13XJPxjrHQMo0WWhjdtTLGoZgKtq3Ndt8UbIzpHGIUDA7UwJbat1A7X3x0gDEercbALmqn+Oc3IoZI/qdRVCzzVjY8c/NYSTZSbLIjkh5Sp8wrtuaII9qxb+vxhXWbe9On+94CWfzISpQWR7Wd6qq/wC+MHFJZgsMdVxCownU2JbDybqSD9Vn0luLPY9zWKvm8/HLqbXUqsFEYXsNidQoKQdq5POLvnspoIokMOexBB/xwgz3SY5GLstORWpRuSBS3VA8D/fFtC5u6YKl6L4gSW9enXxqJ1FuARqO/Ybc4dsR/SP2GKJNkGgtDHoIbf00244N7/O/ffB+X65IqgHesOPiBy1IvY4vEWYFiVINiStIlb7CwCSSO2IPEXRuqJCsuZzUcyQxsGiJZQ6bkhqouTdb70OcZjMVEbf5AE/fCN6xnekSQwfxGYj1LGLEKgsSyBWDFV2NHT22A9rxT+rZ7o+jTl8vPtZ16tNmiACSWNd+Me4zCsNpdI6JSMLpf4c5rODM5dT06LLZZ4yddjUQUsMADsWKrdi6+wx1zGYzEOp/siauSfi90eQZiHMx5iZGahpDHRac7CtyCO/Y4T9QyCZxT5scssmgqrvqYg/Fmgfmuw9sZjMToD/CD1Tbt1PH4bTQYhlY1FFSXUA1tTbcnm+2GWZ6WrWgl0xD6VZQW2rkgVzuPsMZjMHrJXALI+kFjdyOQdjeC26S4DSMg2BY335J+2MxmGnzualDASqbADQvmt/v3/vhB4rO5+F/yOMxmMXDmQErdVAtEQF1XqeqLJkLsfLCV2F0tj9Df3xV4Y8ZjMWfF3XlaPL8qp4C0cp58/wtpYdsVTq81yFRwNj9/bGYzFa1ourWoOAO66r4Ml8zJQHmk0H4KEr7+w74pv4qZYLmMu22po2BNchWFX/9xxmMxoZ3aqW57D8LLUzQ2ssO5/K96RHca/bFp8Lr/wA1fbS372v/AOv+GMxmKjhptOLeav8Ai7QaU+Vvun5jFXfq7j4+/vjJUWzpXSDXO5v74zGY0qyK90irPIIoV2++NvOcLoDenjGYzCIrIXNRFtrC1tajc/Jvb+2PIcrpsam9Qpr78d6vsMZjMLfouWq5NfULPqokWdyOLx6mSj3sD9dr+2MxmFuUllNC4X6Vo9qGLjG1gH3F4zGYYqRsuaUv8QQ6oSf6SDx27/23/TFVTME0qje9t637Y8xmHKbLCkdutZCtuHUOxsGyfS178HfjA5yyEWSdVihQqq5v3xmMxLaMIF5J07WxU6SzbMzEG+OWPbYd8Dz+HyhoiMHmhpNfB+cZjMDzHA2BXWC//9k='
//            },
//            {
//                id:4,
//                nombre:'Tito',
//                puesto:'Soporte',
//                fecha:'18/09/1995',
//                aantigurdad:'2 años',
//                foto:'data:image/jpeg;base64,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'
//            },
//            {
//                id:5,
//                nombre:'Casper',
//                puesto:'fantasma de izagar',
//                fecha:'06/12/1759',
//                aantigurdad:'123 años',
//                foto:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNMQG5ZzTR9Kfbdh_j1WX09zXI-b2D_-QBhRNA9qFv1o0OKQ8mlA'
//            }]
//        }
//    }
//    render()
//    {
//        return (
//                <div className="panel panel-default">
//                    <div className="panel-heading" >
//                        <h4 >Establecimientos</h4>
//                <select className="form-control">
//                    <option value="0">Seleccione una opcion</option>
//                </select>
//                    </div>
//                    <div className="panel-body" style={{'height':'460px','overflowY':'scroll'}}>
//                        <div className="panel-group" style={{'alignItems':'center','justifyContent':'center'}}>
                            
//                              {this.state.lista.map(e=><Usuario usuario={e}/>)}
//                        </div>
//                    </div>
//                </div>
//            )
//    }
//}
//const Usuario=({usuario})=>(
//    <div className="panel panel-default" style={{'width':'600px','display':'inline-block','marginLeft':'20px','marginTop':'20px'}}>
//      <div className="panel panel-heading">
//                                    <div style={{'display':'inline-block','marginTop':'20px','height':'120px'}}>
//                                        <img src={usuario.foto} width='90' height='90' className="img-rounded"/>  
//                                    </div>
//                                    <Formularios
//                                                 nombre={usuario.nombre}
//                                                 puesto={usuario.puesto}
//                                                 fecha={usuario.fecha}
//                                                 aantigurdad={usuario.aantigurdad} />
//                                </div>
//                                </div>
//    );
//const Formularios = ({nombre,puesto,fecha,aantigurdad}) =>{
//    const ComponenteGrande =({titulo,valor})=>(
//        <div className="form-group"  style={{'width':'430px','display':'inline-block','marginLeft':'20px'}}>
//            <strong>{titulo}</strong>
//            <label className="form-control">{valor}</label>
//        </div>);
//    const ComponenteCorto=({titulo,valor})=>(
//        <div style={{'width':'205px','display':'inline-block','marginLeft':'20px'}}>
//            <strong>{titulo}</strong>
//             <label className="form-control">{valor}</label>
//        </div>
//        );
//    return(
//        <div style={{'width':'500px','display':'inline-block','marginLeft':'100px','marginTop':'-110px','fontFamily':'consolas'}}>
//            <ComponenteGrande
//                              titulo={'Nombre'}
//                              valor={nombre}/>
//            <ComponenteCorto
//                              titulo={'Puesto'}
//                              valor={puesto}/>
//            <ComponenteCorto titulo={'Antiguedad en puesto'}
//                             valor={aantigurdad} />                 
//                <ComponenteCorto
//                                 titulo={'Fecha Ingreso'}
//                                 valor={fecha}/>
                 
//                <i className="btn btn-info glyphicon glyphicon-calendar" style={{'marginTop':'0px','marginLeft':'25px','width':'205px','background':'#71b9d6'}}> <label style={{'marginLeft':'0px'}}> Indicadores</label></i>                                                           
//            </div>
//        );
//}
//ReactDOM.render(
//   <Prueba/>
//       ,
//        document.getElementById("pruebas")
//      );