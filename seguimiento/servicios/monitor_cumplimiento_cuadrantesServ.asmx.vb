Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.Security.Cryptography


' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class monitor_cumplimiento_cuadrantesServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL

    Dim objConexion As New SqlConnection(conexion.conexion_izagar)
    Dim objConexion0 As New SqlConnection(conexion.nva_conexion)
    Dim lector As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hola a todos"
    End Function

    <WebMethod()>
    Public Function cuadrantes_reporte_para_monitor_general(fecha_i, fecha_f, Establecimiento)
        Dim lista As New List(Of objCuadrantes)
        Dim comando = "cuadrantes_reporte_para_monitor_general '" & fecha_i & "','" & fecha_f & "','" & Establecimiento & "'"

        Dim SQL_comando As New SqlCommand(comando, objConexion)

        Try
            objConexion.Open()
            lector = SQL_comando.ExecuteReader

            If lector.HasRows Then
                While lector.Read
                    lista.Add(New objCuadrantes With {
                        .folio_colaborador = lector.Item("folio_colaborador"),
                        .folio = lector.Item("folio"),
                        .nombre_colaborador = lector.Item("nombre_colaborador"),
                        .estatus_colaborador = lector.Item("estatus_colaborador"),
                        .folio_turno = lector.Item("folio_turno"),
                        .turno = lector.Item("turno"),
                        .folio_cuadrante = lector.Item("folio_cuadrante"),
                        .nombre_cuadrante = lector.Item("nombre_cuadrante"),
                        .folio_establecimiento = lector.Item("folio_establecimiento"),
                        .establecimiento = lector.Item("establecimiento"),
                        .folio_puesto = lector.Item("folio_puesto"),
                        .puesto = lector.Item("puesto"),
                        .folio_puesto_reporta = lector.Item("folio_puesto_reporta"),
                        .puesto_reporta = lector.Item("puesto_reporta"),
                        .folio_departamento = lector.Item("folio_departamento"),
                        .departamento = lector.Item("departamento"),
                        .folio_actividad = lector.Item("folio_actividad"),
                        .actividad = lector.Item("actividad"),
                        .respuesta = lector.Item("respuesta"),
                        .observacion = lector.Item("observacion"),
                        .folio_aspecto = lector.Item("folio_aspecto"),
                        .aspecto = lector.Item("aspecto"),
                        .valor_respuesta = lector.Item("valor_respuesta"),
                        .semana_del_año = lector.Item("semana_del_año"),
                        .dia_semana = lector.Item("dia_semana"),
                        .mes = lector.Item("mes"),
                        .anio = lector.Item("anio"),
                        .fecha = lector.Item("fecha"),
                        .folio_usuario_capturo = lector.Item("folio_usuario_capturo"),
                        .tipo_actividad = lector.Item("tipo_actividad"),
                        .tolerancia = lector.Item("tolerancia")
                    })

                End While
            End If
            lector.Close()
            objConexion.Close()

        Catch ex As Exception

        End Try

        Return lista
    End Function
    <WebMethod()>
    Function establecimiento_pertenece_empleado(usuario)

        Dim empleado As New empleado_izagar
        Dim comando = "establecimiento_pertenece_empleado '" & usuario & "'"
        Dim SQL_comando As New SqlCommand(comando, objConexion0)
        Try

            objConexion0.Open()
            lector = SQL_comando.ExecuteReader

            If lector.HasRows Then
                While lector.Read
                    empleado.folio = lector.Item("folio_scoi")
                    empleado.nombre = lector.Item("usuario")
                    empleado.establecimiento = lector.Item("estabecimiento")
                End While
            End If
            lector.Close()
            objConexion0.Close()

        Catch ex As Exception

        End Try
        Return empleado
    End Function
End Class
Public Class empleado_izagar
    Public folio
    Public nombre
    Public establecimiento
    Public contrasena
End Class

Public Class objCuadrantes
    Public folio_colaborador
    Public folio
    Public nombre_colaborador
    Public estatus_colaborador
    Public folio_turno
    Public turno
    Public folio_cuadrante
    Public nombre_cuadrante
    Public folio_establecimiento
    Public establecimiento
    Public folio_puesto
    Public puesto
    Public folio_puesto_reporta
    Public puesto_reporta
    Public folio_departamento
    Public departamento
    Public folio_actividad
    Public actividad
    Public respuesta
    Public observacion
    Public folio_aspecto
    Public aspecto
    Public valor_respuesta
    Public semana_del_año
    Public dia_semana
    Public mes
    Public anio
    Public fecha
    Public folio_usuario_capturo
    Public tipo_actividad
    Public tolerancia
End Class