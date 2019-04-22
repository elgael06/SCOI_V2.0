Imports System.Web.Services
Imports System.Data.SqlClient
Imports System.IO
Imports System.Data
Imports System.Web.Services.Protocols
Imports System.ComponentModel

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class semaforo_vta_expressServ
    Inherits System.Web.Services.WebService

    Dim conexion = New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function consulta_semaforo_vta_express()
        Dim lista As New Collection
        Dim SQL_consulta As New SqlCommand("venta_express_reporte_de_estatus", objConexion)
        Try
            objConexion.Open()
        dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim semafor As New objSemaforos
                    semafor.folio = dr.Item("folio")
                    semafor.semaforo = dr.Item("semaforo")
                    semafor.estatus = dr.Item("estatus")
                    semafor.cliente = dr.Item("cliente")
                    semafor.fecha_inicio = dr.Item("fecha")
                    semafor.fecha_final = dr.Item("fecha_surtido")
                    semafor.vendedor = dr.Item("vendedor")
                    semafor.proveedor = dr.Item("proveedor")
                    semafor.autorizo = dr.Item("nombre_autorizo")
                    semafor.establecimiento = dr.Item("establecimiento")
                    semafor.notas = dr.Item("nota")
                    semafor.total_venta = dr.Item("total_venta")
                    lista.Add(semafor)
                End While
            End If

        Catch ex As Exception
        End Try
        Return lista
    End Function

End Class

Public Class objSemaforos
    Public folio As Integer '
    Public semaforo As Double '
    Public estatus As String '
    Public cliente As String '
    Public fecha_inicio As String '
    Public fecha_final As String '
    Public vendedor As String '
    Public proveedor As String '
    Public autorizo As String '
    Public establecimiento As String '
    Public notas As String '
    Public total_venta As Double '
End Class