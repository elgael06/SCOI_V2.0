Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class conexiones2
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_scoi As New SqlConnection(conexion.conexion_izagar)
    Dim objConexion_scoi_pruebas As New SqlConnection(conexion.conexion_izagar_puebas)
    Dim lector As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hola a todos"
    End Function

    <WebMethod()>
    Public Function Obtener_categorias() As Collection
        Dim lista = New Collection
        Dim query As String = "select folio,descripcion,prioridad,color, usuario_modifico, estatus from pagos_categoria"
        Dim comando As New SqlCommand(query, objConexion_scoi_pruebas)

        Try
            objConexion_scoi_pruebas.Open()
            lector = comando.ExecuteReader

            If lector.HasRows Then
                While lector.Read
                    lista.Add(
                New Pagos_Categoria With {
                .folio = lector.Item("folio"),
                .descripcion = lector.Item("descripcion"),
                .prioridad = lector.Item("prioridad"),
                .color = lector.Item("color"),
                .folio_usuario = lector.Item("usuario_modifico"),
                .estatus = lector.Item("estatus")
                })
                End While
            End If
        Catch
            Return lista
        End Try

        objConexion_scoi_pruebas.Close()

        Return lista
    End Function

    <WebMethod()>
    Public Function Guardar_categorias(ByVal categoria As Pagos_Categoria) As String
        Try
            Dim query As String = String.Format("pagos_insertar_actualizar_categoria {0},'{1}',{2},'{3}',{4},'{5}'",
        categoria.folio, categoria.descripcion, categoria.prioridad, categoria.color, categoria.folio_usuario, categoria.estatus)

            Dim comando As New SqlCommand(query, objConexion_scoi_pruebas)

            objConexion_scoi_pruebas.Open()
            comando.ExecuteNonQuery()
            objConexion_scoi_pruebas.Close()
        Catch
        Return "Error en Insercion de Datos!!!"
        End Try

        Return "Guardado..."
    End Function

End Class