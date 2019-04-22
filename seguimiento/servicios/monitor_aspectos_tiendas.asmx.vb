Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient


' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class WebService1
    Inherits System.Web.Services.WebService
    'conexion
    Dim conexion = New objConexionSQL

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hola a todos"
    End Function

    <WebMethod>
    Public Function obtener_aspectos_tiendas(fecha1, fecha2)
        Dim lista As New Collection
        Dim comando = "[monitor_aspectos_tiendas] '" & fecha1 & "','" & fecha2 & "'"
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim resultados As New ObjMonitoreoAspectosTienda
                    resultados.sucursal = dr.Item("establecimiento")
                    resultados.aspecto = dr.Item("aspecto")
                    resultados.promedio = dr.Item("promedio")
                    resultados.cantidad_total_no_cumplio = dr.Item("cantidad_no_cumplio")
                    resultados.total_preguntas = dr.Item("cantidad_total_preguntas")
                    resultados.aplicador = dr.Item("usuario")
                    resultados.id_establecimiento = dr.Item("id_establecimiento")
                    resultados.h_inicio = dr.Item("h_inicio")
                    resultados.h_termino = dr.Item("h_termino")
                    resultados.diferencia = dr.Item("diferencia")
                    lista.Add(resultados)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch ex As Exception

        End Try
        Return lista
    End Function
    'funcion que retorna todos los datos resueltos,obtenidos por fecha y folio sucursal
    <WebMethod>
    Public Function procedimiento_resultados_cuestionario_por_dia1_a_dia2(fecha, fecha2, folio_establecimiento)
        'lista que almacenara los datos
        Dim lista As New Collection
        'creamos la consulta al procedimiento almacenado
        Dim consulta = "[resultados_cuestionario_por_dia1_a_dia2] '" & fecha & "', '" & fecha & "' , " & folio_establecimiento
        'creamos el comando
        Dim SQL_consulta As New SqlCommand(consulta, objConexion)
        Try
            ''abrimos conexion
            objConexion.Open()
            'ejecuta el comando en el dr
            dr = SQL_consulta.ExecuteReader
            'si el comando tiene columnas
            If dr.HasRows Then
                Dim i = 0
                Dim pos = 0
                While dr.Read
                    Dim res As New objResultados_por_dia
                    res.zona_inspeccion = dr.Item("zona_inspeccion")
                    res.posicion = dr.Item("posicion")
                    res.pregunta = dr.Item("pregunta")
                    res.rsi = dr.Item("rsi")
                    res.rno = dr.Item("rno")
                    res.rna = dr.Item("rna")
                    res.limpieza = dr.Item("limpieza")
                    res.surtido = dr.Item("surtido")
                    res.imagen = dr.Item("imagen")
                    res.generales = dr.Item("generales")
                    res.senializacion = dr.Item("senializacion")
                    res.caducidad = dr.Item("caducidad")
                    res.observaciones = dr.Item("observaciones")

                    lista.Add(res)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function

    <WebMethod>
    Public Function obtener_observaciones_por_fechas(ByVal folio_establecimiento, ByVal fecha, ByVal fecha2)
        Dim lista As New Collection
        Dim comando = "[check_list_observaciones_por_fechas] " & folio_establecimiento & ",'" & fecha & "','" & fecha2 & "'"
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()

            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim observaciones As New objobservaciones
                    observaciones.folio = dr.Item("folio")
                    observaciones.cuestionario = dr.Item("cuestionario")
                    observaciones.posicion = dr.Item("posicion")
                    observaciones.pregunta = dr.Item("pregunta")
                    observaciones.observaciones = dr.Item("observaciones")
                    observaciones.usuario = dr.Item("usuario")
                    lista.Add(observaciones)
                End While
            End If

            dr.Close()
            objConexion.Close()

        Catch ex As Exception

        End Try
        Return lista
    End Function
    <WebMethod>
    Public Function insicencias_cuestionarios_R_sucursales_por_fechas(fecha, fecha2)
        Dim lista As New Collection
        Dim comando = "[correcciones_insidencias_sucursales_por_fecha] '" & fecha & "','" & fecha2 & "'"
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim respuesta As New objCorreccionIncidencias
                    respuesta.folio_suc = dr.Item("folio_suc")
                    respuesta.sucursal = dr.Item("sucursal")
                    respuesta.insidencias = dr.Item("insidencias")
                    respuesta.solucionadas = dr.Item("solucionadas")
                    respuesta.promedio = dr.Item("promedio")
                    respuesta.total = dr.Item("total")
                    respuesta.aplicador = dr.Item("aplicador")
                    respuesta.H_inicio = dr.Item("H_inicio")
                    respuesta.H_fin = dr.Item("H_fin")
                    respuesta.diferencias = dr.Item("diferencia")
                    lista.Add(respuesta)
                End While
            End If
            dr.Close()
            objConexion.Close()

        Catch ex As Exception
        End Try
        Return lista
    End Function
    <WebMethod>
    Public Function resultados_insidencias_por_fechas(f1, f2)
        Dim lista As New Collection
        Dim comando = "select folio_sucursal,folio_insidencia,Solucion_insidencia from insidencias_resueltas where fecha>='" & f1 & "' and fecha<='" & f1 & "'"
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim correcciones As New objCorreccionIncidencias
                    correcciones.folio_suc = dr.Item("folio_sucursal")
                    correcciones.insidencias = dr.Item("folio_insidencia")
                    correcciones.solucionadas = dr.Item("Solucion_insidencia")
                    lista.Add(correcciones)
                End While
            End If
            Return lista
        Catch ex As Exception

            Return ex
        End Try
    End Function

End Class
Public Class ObjMonitoreoAspectosTienda
    Public sucursal
    Public aspecto
    Public promedio
    Public cantidad_total_cumplio
    Public cantidad_total_no_cumplio
    Public total_preguntas
    Public aplicador
    Public id_establecimiento
    Public h_inicio
    Public h_termino
    Public diferencia
End Class