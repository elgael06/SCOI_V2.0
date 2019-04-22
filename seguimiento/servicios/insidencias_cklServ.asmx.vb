Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.Data

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class insidencias_cklServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'nuevas conexiones
    'Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=" & conexion.host & ";Integrated Security=SSPI;"

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function guardar_datos(ByVal folio, ByVal solucion, ByVal usuario, ByVal fecha, ByVal folio_sucursal)
        Dim lista As New Collection
        Dim contador = 0
        For Each datos In folio
            'variable 
            Dim com = "guardar_insidencias_resueltas "
            com += folio(contador) & ","
            com += solucion(contador) & ","
            com += usuario & ","
            com += "'" & fecha & "',"
            com += folio_sucursal
            Dim SQL_buscar As New SqlCommand(com, objConexion)
            Try
                'conexion
                objConexion.Open()
                SQL_buscar.ExecuteNonQuery()
                objConexion.Close()
                lista.Add("{ folio: " & folio(contador) & ",solucion:" & solucion(contador) & "}")
                contador += 1
            Catch
            End Try
        Next
        'CREAMOS UNA VARIABLE QUE RETORNA LOS DATOS
        Return lista
    End Function

    <WebMethod()>
    Public Function hola()

        Return True
    End Function
    <WebMethod>
    Public Function insicencias_cuestionarios_R(sucursal, fecha)
        Dim lista As New Collection
        Dim comando = "select * from insidencias_resueltas where folio_sucursal= " & sucursal & " and  fecha='" & fecha & "'"
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim respuesta As New objCheckList
                    respuesta.criterio_cuestion = dr.Item("folio_insidencia")
                    respuesta.respuesta = dr.Item("solucion_insidencia")
                    respuesta.usuario = dr.Item("usuario")
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
    Public Function obtener_observaciones(ByVal folio_establecimiento, ByVal fecha)
        Dim lista As New Collection
        Dim comando = "select * from check_list_mejora_continua_observaciones_insidencias where folio_establecimiento= " & folio_establecimiento & " AND FECHA=" & ",'" & fecha & "'"
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim observaciones As New objobservaciones
                    observaciones.posicion = dr.Item("[posicion_pregunta]")
                    observaciones.observaciones = dr.Item("[observaciones]")
                    observaciones.usuario = dr.Item("usuario")
                    lista.Add(observaciones)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function
    <WebMethod>
    Sub guardar_observaciones(folio_establecimiento, fecha, id_cuestionario, posicion_pregunta, observaciones, usuario)
        Dim comando = "insert into check_list_mejora_continua_observaciones_insidencias
	(folio_establecimiento,fecha,id_cuestionario,posicion_pregunta,observaciones,usuario)
	values (" & folio_establecimiento & ",'" & fecha & "'," & id_cuestionario & "," & posicion_pregunta & ",'" & observaciones & "','" & usuario & "')"
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_comando.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try
    End Sub
    <WebMethod>
    Sub Eliminar_observaciones(folio)
        Dim comando = "delete  from check_list_mejora_continua_observaciones_insidencias where folio=" & folio
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_comando.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try
    End Sub
    <WebMethod>
    Public Function insicencias_cuestionarios_R_sucursales(fecha)
        Dim lista As New Collection
        Dim comando = "correcciones_insidencias_sucursales '" & fecha & "'"
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
                    lista.Add(respuesta)
                End While
            End If
            dr.Close()
            objConexion.Close()

        Catch ex As Exception
        End Try
        Return lista
    End Function
End Class
Class objCorreccionIncidencias
    Public folio_suc
    Public sucursal
    Public insidencias
    Public solucionadas
    Public promedio
    Public total
    Public aplicador
    Public H_inicio
    Public H_fin
    Public diferencias
End Class