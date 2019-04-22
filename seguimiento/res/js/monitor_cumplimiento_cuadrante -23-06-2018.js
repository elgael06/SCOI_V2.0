//leector del documento
$(document).ready(function () {
    eventos_estaticos()
    obtener_cuadrantes()
    llenar_indicadores()
   
    
});
/********************************
    variables globales
*********************************/
//Arreglos
var CUADRANTES = [], PERSONAS = [], DEPARTAMENTOS = [], PUESTOS = [], PERSONA_CUADRANTES = [],ESTABLECIMIENTOS=[];
//Objetos
var OBJ_PERSONA = {}, OBJ_PERSONA_CUADRANTE = {}, OBJ_DEPARTAMENTO = {}, OBJ_PUESTOS = {}, OBJ_ESTABLECIMIENTO = {};

/********************************************************
            clases a utilizar
*******************************************************/
class manejo_numeros {

    static checar_numero(dato) {
        if (dato > 0)
            return dato
        else return 0
    }
    static convertir_porciento(dato) {
        return Math.round((dato * 10000)) / 100
    }
}
class llenar_objetos_datos {

    static recorrer_cuadrantes_llenar_datos_porcentuales(objeto,arreglo) {

        var c_gral = 0, c_sl = 0, c_surt = 0, c_cad = 0, c_lip = 0, c_prom = 0;
        //recorrido de cuadrantes para llenar objetos
        CUADRANTES.forEach(function (item, index) {
            if (index == 0) {

                objeto.establecimiento = item.establecimiento;

                objeto.Generales = 0.0;
                objeto.Señalizacion = 0.0;
                objeto.Surtido = 0.0;
                objeto.Caducidades = 0.0;
                objeto.Limpieza = 0.0;

                console.log(item.establecimiento)
            }
            if (objeto.establecimiento == item.establecimiento) {

                if (item.aspecto == "Generales") { objeto.Generales += item.valor_respuesta, c_gral += 1 }
                else if (item.aspecto == "Señalizaciones") { objeto.Señalizacion += item.valor_respuesta, c_sl += 1 }
                else if (item.aspecto == "Surtido") { objeto.Surtido += item.valor_respuesta, c_surt += 1 }
                else if (item.aspecto == "Caducidades") { objeto.Caducidades += item.valor_respuesta, c_cad += 1 }
                else if (item.aspecto == "Limpieza") { objeto.Limpieza += item.valor_respuesta, c_lip += 1 }

            }
            else if (objeto.establecimiento != item.establecimiento) {
                console.log(item.establecimiento)

                objeto.Generales = (objeto.Generales / c_gral)
                objeto.Señalizacion = (objeto.Señalizacion / c_sl)
                objeto.Surtido = (objeto.Surtido / c_surt)
                objeto.Caducidades = (objeto.Caducidades / c_cad)
                objeto.Limpieza = (objeto.Limpieza / c_lip)

                arreglo.push(objeto)

                objeto = {}

                objeto.establecimiento = item.establecimiento;

                c_gral = 0, c_sl = 0, c_surt = 0, c_cad = 0, c_lip = 0, c_prom = 0

                objeto.Generales = 0.0;
                objeto.Señalizacion = 0.0;
                objeto.Surtido = 0.0;
                objeto.Caducidades = 0.0;
                objeto.Limpieza = 0.0;

                if (item.aspecto == "Generales") { objeto.Generales += item.valor_respuesta, c_gral += 1 }
                else if (item.aspecto == "Señalizaciones") { objeto.Señalizacion += item.valor_respuesta, c_sl += 1 }
                else if (item.aspecto == "Surtido") { objeto.Surtido += item.valor_respuesta, c_surt += 1 }
                else if (item.aspecto == "Caducidades") { objeto.Caducidades += item.valor_respuesta, c_cad += 1 }
                else if (item.aspecto == "Limpieza") { objeto.Limpieza += item.valor_respuesta, c_lip += 1 }

            }
        })
        objeto.Generales = (objeto.Generales / c_gral)
        objeto.Señalizacion = (objeto.Señalizacion / c_sl)
        objeto.Surtido = (objeto.Surtido / c_surt)
        objeto.Caducidades = (objeto.Caducidades / c_cad)
        objeto.Limpieza = (objeto.Limpieza / c_lip)

        arreglo.push(objeto)
    }

}

/********************************
        funciones generales
*********************************/
function eventos_estaticos() {
    $(".fa-refresh").on("click", function () {
        //Arreglos
        CUADRANTES = [], PERSONAS = [], DEPARTAMENTOS = [], PUESTOS = [], PERSONA_CUADRANTES = [], ESTABLECIMIENTOS = [];
        //Objetos
        OBJ_PERSONA = {}, OBJ_PERSONA_CUADRANTE = {}, OBJ_DEPARTAMENTO = {}, OBJ_PUESTOS = {}, OBJ_ESTABLECIMIENTO = {};
        obtener_cuadrantes()
        llenar_indicadores()
    })
}
//eventos dinamicos: estos eventos son lanzados al cambiar la tabla
eventos_dinamocos_tablas = function () {
    $(".area").on("click", function () {
        console.log($(this).children(":nth-child(1)").text() + ":" + $(this).attr("name"));
        var departamento = $(this).children(":nth-child(1)").text();
        DEPARTAMENTOS.forEach(function (item, index) {
            if (item.departamento == departamento) {
                $("#contenedor").children("*").remove();

                OBJ_DEPARTAMENTO = item;
                llenar_cavecera(OBJ_DEPARTAMENTO.establecimiento)
                llenar_padre_tabla(OBJ_DEPARTAMENTO)
            }
        });
    })

}
//funcion
obtener_cuadrantes = function () {

    CUADRANTES = conexion_ajax("../servicios/monitor_cumplimiento_cuadrantesServ.asmx/cuadrantes_reporte_para_monitor_general"
        , {
            fecha_i: "8/06/2018"
            , fecha_f: "22/06/2018"
            , Establecimiento: "Todos"
        });

    //funciones de llenado
    //
    var c_gral = 0, c_sl = 0, c_surt = 0, c_cad = 0, c_lip = 0, c_prom = 0;
    llenar_establecimientos = function (item, index) {

        if (index == 0) {
           
            OBJ_ESTABLECIMIENTO.establecimiento = item.establecimiento;

            OBJ_ESTABLECIMIENTO.Generales = 0.0;
            OBJ_ESTABLECIMIENTO.Señalizacion = 0.0;
            OBJ_ESTABLECIMIENTO.Surtido = 0.0;
            OBJ_ESTABLECIMIENTO.Caducidades = 0.0;
            OBJ_ESTABLECIMIENTO.Limpieza = 0.0;

            console.log(item.establecimiento)
        }
        if (OBJ_ESTABLECIMIENTO.establecimiento == item.establecimiento) {

            if (item.aspecto == "Generales") { OBJ_ESTABLECIMIENTO.Generales += item.valor_respuesta, c_gral +=1 }
            else if (item.aspecto == "Señalizaciones") { OBJ_ESTABLECIMIENTO.Señalizacion += item.valor_respuesta, c_sl += 1 }
            else if (item.aspecto == "Surtido") { OBJ_ESTABLECIMIENTO.Surtido += item.valor_respuesta, c_surt += 1 }
            else if (item.aspecto == "Caducidades") { OBJ_ESTABLECIMIENTO.Caducidades += item.valor_respuesta, c_cad += 1 }
            else if (item.aspecto == "Limpieza") { OBJ_ESTABLECIMIENTO.Limpieza += item.valor_respuesta, c_lip += 1 }

        }
        else if (OBJ_ESTABLECIMIENTO.establecimiento != item.establecimiento) {
            console.log(item.establecimiento)

            OBJ_ESTABLECIMIENTO.Generales = (OBJ_ESTABLECIMIENTO.Generales / c_gral)
            OBJ_ESTABLECIMIENTO.Señalizacion = (OBJ_ESTABLECIMIENTO.Señalizacion / c_sl)
            OBJ_ESTABLECIMIENTO.Surtido = (OBJ_ESTABLECIMIENTO.Surtido / c_surt)
            OBJ_ESTABLECIMIENTO.Caducidades = (OBJ_ESTABLECIMIENTO.Caducidades / c_cad)
            OBJ_ESTABLECIMIENTO.Limpieza = (OBJ_ESTABLECIMIENTO.Limpieza / c_lip)

            ESTABLECIMIENTOS.push(OBJ_ESTABLECIMIENTO)

            OBJ_ESTABLECIMIENTO = {}

            OBJ_ESTABLECIMIENTO.establecimiento = item.establecimiento;

            c_gral = 0, c_sl = 0, c_surt = 0, c_cad = 0, c_lip = 0, c_prom = 0

            OBJ_ESTABLECIMIENTO.Generales = 0.0;
            OBJ_ESTABLECIMIENTO.Señalizacion = 0.0;
            OBJ_ESTABLECIMIENTO.Surtido = 0.0;
            OBJ_ESTABLECIMIENTO.Caducidades = 0.0;
            OBJ_ESTABLECIMIENTO.Limpieza = 0.0;

            if (item.aspecto == "Generales") { OBJ_ESTABLECIMIENTO.Generales += item.valor_respuesta, c_gral += 1 }
            else if (item.aspecto == "Señalizaciones") { OBJ_ESTABLECIMIENTO.Señalizacion += item.valor_respuesta, c_sl += 1 }
            else if (item.aspecto == "Surtido") { OBJ_ESTABLECIMIENTO.Surtido += item.valor_respuesta, c_surt += 1 }
            else if (item.aspecto == "Caducidades") { OBJ_ESTABLECIMIENTO.Caducidades += item.valor_respuesta, c_cad += 1 }
            else if (item.aspecto == "Limpieza") { OBJ_ESTABLECIMIENTO.Limpieza += item.valor_respuesta, c_lip += 1 }

        }
    }
    //
    var d_gral = 0, d_sl = 0, d_surt = 0, d_cad = 0, d_lip = 0, d_prom = 0;
    llenar_departamentos = function (item, index) {

        if (index == 0) {

            OBJ_DEPARTAMENTO.departamento = item.departamento
            OBJ_DEPARTAMENTO.establecimiento = item.establecimiento

            OBJ_DEPARTAMENTO.Generales = 0.0;
            OBJ_DEPARTAMENTO.Señalizacion = 0.0;
            OBJ_DEPARTAMENTO.Surtido = 0.0;
            OBJ_DEPARTAMENTO.Caducidades = 0.0;
            OBJ_DEPARTAMENTO.Limpieza = 0.0;
        }
        if (OBJ_DEPARTAMENTO.departamento == item.departamento) {
          
            if (item.aspecto == "Generales") { OBJ_DEPARTAMENTO.Generales += item.valor_respuesta, d_gral++ }
            else if (item.aspecto == "Señalizaciones") { OBJ_DEPARTAMENTO.Señalizacion += item.valor_respuesta, d_sl++ }
            else if (item.aspecto == "Surtido") { OBJ_DEPARTAMENTO.Surtido += item.valor_respuesta, d_surt++ }
            else if (item.aspecto == "Caducidades") { OBJ_DEPARTAMENTO.Caducidades += item.valor_respuesta, d_cad++ }
            else if (item.aspecto == "Limpieza") { OBJ_DEPARTAMENTO.Limpieza += item.valor_respuesta, d_lip++ }
        }
        else if (OBJ_DEPARTAMENTO.departamento != item.departamento) {

            OBJ_DEPARTAMENTO.Generales = (OBJ_DEPARTAMENTO.Generales / d_gral)
            OBJ_DEPARTAMENTO.Señalizacion = (OBJ_DEPARTAMENTO.Señalizacion / d_sl)
            OBJ_DEPARTAMENTO.Surtido = (OBJ_DEPARTAMENTO.Surtido / d_surt)
            OBJ_DEPARTAMENTO.Caducidades = (OBJ_DEPARTAMENTO.Caducidades / d_cad)
            OBJ_DEPARTAMENTO.Limpieza = (OBJ_DEPARTAMENTO.Limpieza / d_lip)

            DEPARTAMENTOS.push(OBJ_DEPARTAMENTO)

            OBJ_DEPARTAMENTO = {}

            d_gral = 0, d_sl = 0, d_surt = 0, d_cad = 0, d_lip = 0, d_prom = 0;

            OBJ_DEPARTAMENTO.Generales = 0.0;
            OBJ_DEPARTAMENTO.Señalizacion = 0.0;
            OBJ_DEPARTAMENTO.Surtido = 0.0;
            OBJ_DEPARTAMENTO.Caducidades = 0.0;
            OBJ_DEPARTAMENTO.Limpieza = 0.0;

            OBJ_DEPARTAMENTO.departamento = item.departamento
            OBJ_DEPARTAMENTO.establecimiento = item.establecimiento
            
            if (item.aspecto == "Generales") { OBJ_DEPARTAMENTO.Generales += item.valor_respuesta, d_gral++ }
            else if (item.aspecto == "Señalizaciones") { OBJ_DEPARTAMENTO.Señalizacion += item.valor_respuesta, d_sl++ }
            else if (item.aspecto == "Surtido") { OBJ_DEPARTAMENTO.Surtido += item.valor_respuesta, d_surt++ }
            else if (item.aspecto == "Caducidades") { OBJ_DEPARTAMENTO.Caducidades += item.valor_respuesta, d_cad++ }
            else if (item.aspecto == "Limpieza") { OBJ_DEPARTAMENTO.Limpieza += item.valor_respuesta, d_lip++ }
        }
    }
    //
    var respuestas_puestos = 0, contador_puestos
    llenar_puestos = function (item, index) {

        if (index == 0) {

            OBJ_PUESTOS.puesto = item.puesto
        }
        if (OBJ_PUESTOS.puesto == item.puesto) {

            OBJ_PUESTOS.departamento = item.departamento
            OBJ_PUESTOS.establecimiento = item.establecimiento
            OBJ_PUESTOS.aspecto = item.aspecto
            respuestas_puestos += item.valor_respuesta
            contador_puestos += 1;
        }
        else if (OBJ_PUESTOS.puesto != item.puesto) {


            OBJ_PUESTOS.valor_respuesta = respuestas_puestos;
            OBJ_PUESTOS.suma_respuestas = contador_puestos;
            OBJ_PUESTOS.promedio = function () {
                return Math.round((respuestas_puestos / contador_puestos) * 10000) / 100
            }()

            PUESTOS.push(OBJ_PUESTOS)

            OBJ_PUESTOS = {}
            respuestas_puestos = 0;
            contador_puestos = 0;

            OBJ_PUESTOS.puesto = item.puesto
            OBJ_PUESTOS.departamento = item.departamento
            OBJ_PUESTOS.establecimiento = item.establecimiento
            OBJ_PUESTOS.aspecto = item.aspecto
            respuestas_puestos += item.valor_respuesta
            contador_puestos += 1;
        }
        else {
            OBJ_PUESTOS.valor_respuesta = respuestas_puestos;
            OBJ_PUESTOS.suma_respuestas = contador_puestos;
            OBJ_PUESTOS.promedio = function () {
                return Math.round((respuestas_puestos / contador_puestos) * 10000) / 100
            }()

            PUESTOS.push(OBJ_PUESTOS)
        }
    }
    //
    var contador_cuadrante = 0, si_cuadrante = 0, no_cuadrante = 0, na_cuadrante = 0;
    llenar_personas = function (item, index) {

        if (index == 0) {

            OBJ_PERSONA.nombre_cuadrante = item.nombre_cuadrante
        }
        if (OBJ_PERSONA.nombre_cuadrante == item.nombre_cuadrante) {

            OBJ_PERSONA.nombre_colaborador = item.nombre_colaborador
            OBJ_PERSONA.actividad = item.actividad
            OBJ_PERSONA.puesto = item.puesto

            if (item.respuesta == "Si" || item.respuesta == "si") { si_cuadrante += 1 }
            else if (item.respuesta == "No" || item.respuesta == "no") { no_cuadrante += 1 }
            else { na_cuadrante += 1 }
            contador_cuadrante+=1
        }
        else if (OBJ_PERSONA.nombre_cuadrante != item.nombre_cuadrante) {

            OBJ_PERSONA.si = si_cuadrante;
            OBJ_PERSONA.no = no_cuadrante;
            OBJ_PERSONA.na = na_cuadrante;
            OBJ_PERSONA.contador = contador_cuadrante;
            PERSONAS.push(OBJ_PERSONA)

            OBJ_PERSONA = {}
            contador_cuadrante = 0, si_cuadrante = 0, no_cuadrante = 0, na_cuadrante = 0;

            OBJ_PERSONA.nombre_cuadrante = item.nombre_cuadrante
            OBJ_PERSONA.nombre_colaborador = item.nombre_colaborador
            OBJ_PERSONA.actividad = item.actividad
            OBJ_PERSONA.puesto = item.puesto

            if (item.respuesta == "Si" || item.respuesta == "si") { si_cuadrante += 1 }
            else if (item.respuesta == "No" || item.respuesta == "no") { no_cuadrante += 1 }
            else { na_cuadrante += 1 }
        }
        else {
            OBJ_PERSONA.si = si_cuadrante;
            OBJ_PERSONA.no = no_cuadrante;
            OBJ_PERSONA.na = na_cuadrante;
            OBJ_PERSONA.contador = contador_cuadrante;
            PERSONAS.push(OBJ_PERSONA)
        }

    }
    //
    llenar_cuadrantes_por_persona = function (item,index) {
        if (index == 0) {
            OBJ_PERSONA_CUADRANTE.nombre = item.nombre_colaborador
        }
        if (OBJ_PERSONA_CUADRANTE.nombre == item.nombre_colaborador) {

        }
        else if(OBJ_PERSONA_CUADRANTE.nombre != item.nombre_colaborador) {

        }
    }


    //recorrido de cuadrantes para llenar objetos
    CUADRANTES.forEach(function (item, index) {

        llenar_establecimientos(item, index)
        llenar_departamentos(item, index)
        llenar_puestos(item, index)
        llenar_personas(item, index)

    });

    //ultima posicion de objetos
    OBJ_ESTABLECIMIENTO.Generales = (OBJ_ESTABLECIMIENTO.Generales / c_gral)
    OBJ_ESTABLECIMIENTO.Señalizacion = (OBJ_ESTABLECIMIENTO.Señalizacion / c_sl)
    OBJ_ESTABLECIMIENTO.Surtido = (OBJ_ESTABLECIMIENTO.Surtido / c_surt)
    OBJ_ESTABLECIMIENTO.Caducidades = (OBJ_ESTABLECIMIENTO.Caducidades / c_cad)
    OBJ_ESTABLECIMIENTO.Limpieza = (OBJ_ESTABLECIMIENTO.Limpieza / c_lip)
    ESTABLECIMIENTOS.push(OBJ_ESTABLECIMIENTO)
       
    OBJ_DEPARTAMENTO.Generales = (OBJ_DEPARTAMENTO.Generales / d_gral)
    OBJ_DEPARTAMENTO.Señalizacion = (OBJ_DEPARTAMENTO.Señalizacion / d_sl)
    OBJ_DEPARTAMENTO.Surtido = (OBJ_DEPARTAMENTO.Surtido / d_surt)
    OBJ_DEPARTAMENTO.Caducidades = (OBJ_DEPARTAMENTO.Caducidades / d_cad)
    OBJ_DEPARTAMENTO.Limpieza = (OBJ_DEPARTAMENTO.Limpieza / d_lip)
    DEPARTAMENTOS.push(OBJ_DEPARTAMENTO)
}
/********************************
    manejo de DOM
*********************************/
llenar_indicadores = function () {
   
    $("#contenedor").children("*").remove();
    //funciones
    //llamada a funcines
    llenar_cavecera()
    ESTABLECIMIENTOS.forEach(function (item, index) {
        llenar_padre_tabla(item)
    })
    eventos_dinamocos_tablas();
}

llenar_cavecera = function (dato) {
    if (dato == null)
        dato = "ELDORADO";

    $("#contenedor").append(
        $("<table>").append(
            $("<tr>").append(
                $("<th>").append(dato)
                , $("<th>").append("")
                , $("<th>").append("GENERALES").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("SEÑALIZACIONES").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("SURTIDO").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("CADUCIDADES").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("LIMPIEZA").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("PROMEDIO").css({ "text-align": "center" })
                ).css({ "background": "#0094ff", "color": "white", "font-size": "14px" }).addClass("cavecera")
            ).addClass("indicadores")
        );
}

//esta funcion va dentro de un ciclo que recorrera los datos a colocar de parametro
llenar_hijo_tabla = function (area) {
    //clase para manejo de datos numericos
    var manejo_datos = manejo_numeros;

    var promedio, Generales = manejo_datos.checar_numero(area.Generales)
        , Señalizacion = manejo_datos.checar_numero(area.Señalizacion)
        , Surtido = manejo_datos.checar_numero(area.Surtido)
        , Caducidades = manejo_datos.checar_numero(area.Caducidades)
        , Limpieza = manejo_datos.checar_numero(area.Limpieza)

    promedio = (Generales + Señalizacion + Surtido + Caducidades + Limpieza) / 5

    $(".indicadores").append(
           $("<tr>").append(
               $("<td>").append(area.departamento)
               , $("<td>").append(" ")
               , $("<td>").append(manejo_datos.convertir_porciento(Generales)).css({ "text-align": "center" }).attr({ "colspan": "3" })
               , $("<td>").append(manejo_datos.convertir_porciento(Señalizacion)).css({ "text-align": "center" }).attr({ "colspan": "3" })
               , $("<td>").append(manejo_datos.convertir_porciento(Surtido)).css({ "text-align": "center" }).attr({ "colspan": "3" })
               , $("<td>").append(manejo_datos.convertir_porciento(Caducidades)).css({ "text-align": "center" }).attr({ "colspan": "3" })
               , $("<td>").append(manejo_datos.convertir_porciento(Limpieza)).css({ "text-align": "center" }).attr({ "colspan": "3" })
               , $("<td>").append(manejo_datos.convertir_porciento(promedio)).css({ "text-align": "center" })
           ).addClass("area").css({ "background": "#f1cfff", "color": "#217dbf" }).attr("name", area.establecimiento)
       )
    //aqui va la llamada de tabla empleado
}
llenar_padre_tabla = function (Establecimiento) {
    //clase para manejo de datos numericos
    var manejo_datos = manejo_numeros;

    var promedio, Generales = manejo_datos.checar_numero(Establecimiento.Generales)
        , Señalizacion = manejo_datos.checar_numero(Establecimiento.Señalizacion)
        , Surtido = manejo_datos.checar_numero(Establecimiento.Surtido)
        , Caducidades = manejo_datos.checar_numero(Establecimiento.Caducidades)
        , Limpieza = manejo_datos.checar_numero(Establecimiento.Limpieza)

    promedio = (Generales + Señalizacion + Surtido + Caducidades + Limpieza) / 5

    //console.log(promedio)

    $(".indicadores").append(
            $("<tr>").append(

                $("<th>").append(Establecimiento.establecimiento)
                , $("<th>").append("")
                , $("<th>").append(manejo_datos.convertir_porciento(Generales)).css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append(manejo_datos.convertir_porciento(Señalizacion)).css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append(manejo_datos.convertir_porciento(Surtido)).css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append(manejo_datos.convertir_porciento(Caducidades)).css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append(manejo_datos.convertir_porciento(Limpieza)).css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append(manejo_datos.convertir_porciento(promedio)).css({ "text-align": "center" })
            ).css({ "background": "#f1ffff", "color": "#547c98" }).addClass(Establecimiento.establecimiento)
        )


    DEPARTAMENTOS.forEach(function (dato, indice) {
        if (dato.establecimiento == Establecimiento.establecimiento) { llenar_hijo_tabla(dato) }
    })

}
