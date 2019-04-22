Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.Data

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
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
    Public Function guardar_datos(ByVal sucursal, ByVal fecha, ByVal zona, ByVal criterio, ByVal respuesta, ByVal datos_pregunta, ByVal aplicador)
        Dim lista As New Collection
        'variable 
        Dim SQL_buscar As New SqlCommand("guardar_datos_check_list  " & sucursal & ",'" & fecha & "'," & zona & "," & criterio & "," & respuesta & ",'" & datos_pregunta & "','" & aplicador & "'", objConexion)
        'conexion
        objConexion.Open()
        SQL_buscar.ExecuteNonQuery()
        objConexion.Close()

        'CREAMOS UNA VARIABLE QUE RETORNA LOS DATOS
        lista.Add(respuesta)
        Return lista
    End Function

    <WebMethod()>
    Public Function hola()

        Return True
    End Function

End Class