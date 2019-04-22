Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<WebService()>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class retornar_semana_anio
    Inherits System.Web.Services.WebService

    Dim conexion = New objConexionSQL
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim lector As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function retornar_semana_anio(dia)
        Dim comando = "retornar_semana_anio '" & dia & "'"
        Dim sem As New obj_retornar_semana_anio

        Dim SQL_comando As New SqlCommand(comando, objConexion)

        Try
            objConexion.Open()

            lector = SQL_comando.ExecuteReader

            If lector.HasRows Then
                lector.Read()
                sem.lunes = lector.Item("Lunes")
                sem.domingo = lector.Item("Domingo")
                sem.semana = lector.Item("Semana")
                sem.anio = lector.Item("Anio")
            End If
        Catch
        End Try

        Return sem
    End Function

End Class
Class obj_retornar_semana_anio
    Public lunes As String
    Public domingo As String
    Public semana As Integer
    Public anio As Integer
End Class