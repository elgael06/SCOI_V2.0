Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
 <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class conexiones1
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_scoi As New SqlConnection(conexion.conexion_izagar)
    Dim objConexion_bms As New SqlConnection(conexion.conexion_bms)
    Dim objConexion_scoi_pruebas As New SqlConnection(conexion.conexion_izagar_puebas)
    Dim lector As SqlDataReader

    <WebMethod()> _
    Public Function obtener_clasificadores( ByVal tabla ,ByVal columna,ByVal condicion ) As Collection
        Dim lista = New Collection

        If condicion IsNot "" Then
            condicion = "  where jerarquia " & condicion
        End If

        Dim query As String = String.Format("select {0} as folio,upper(rtrim(ltrim(nombre))) as clasificador from BMSIZAGAR.dbo.{1}{2} order by nombre",
        columna, tabla, condicion)

        Dim consulta As New SqlCommand(query,objConexion_scoi)
        objConexion_scoi.Open
        lector = consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New invertarios_parciales_clasificadores With{
                    .folio = lector.Item("folio"),
                    .clasificador = lector.Item("clasificador")
                })
            End While
        End If
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod()> _
    Public Function obtener_productos_clasificador(ByVal est)
             Dim lista = New Collection

        Dim query As String = String.Format("Inventario_productos_por_establecimiento '{0}'", est)

        Dim consulta As New SqlCommand(query,objConexion_scoi)
        objConexion_scoi.Open
        lector = consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New invertarios_parciales_clasificadores With{
                    .folio = lector.Item("cod_prod"),
                    .clasificador = lector.Item("descripcion")
                })
            End While
        End If
        objConexion_scoi.Close
        Return lista
    End Function 
    <WebMethod()> _
    public Function obtener_productos(ByVal condicion) As Collection
        Dim  lista  = New Collection
        Dim consulta As New SqlCommand("exec inventarios_parciales_consulta_por_clasificadores " & condicion,objConexion_scoi)
        Try
            objConexion_scoi.Open()
            lector = consulta.ExecuteReader
            If lector.HasRows Then

                While lector.Read
                    Dim existencia As Integer = lector.Item("exist_piezas")
                    If existencia > 0 Or existencia < 0 Then
                        lista.Add(
                        New inventarios_parciales_consulta_por_clasificador With {
                            .codigo_producto = lector.Item("cod_prod"),
                            .descripcion = lector.Item("descripcion"),
                            .existencia_piezas = lector.Item("exist_piezas"),
                            .establecimiento = lector.Item("establecimiento"),
                            .fecha = lector.Item("fecha")
                        })
                    End If
                End While
            End If
            objConexion_scoi.Close()
        Catch
        End Try
        Return lista
    End Function
    <WebMethod()> _
    public Function obtener_productos_folio(ByVal folio , ByVal establecimiento) As Collection
        Dim  lista  = New Collection
        Dim consulta As New SqlCommand("sp_datos_productos_por_establecimiento_y_servidor '" & folio & "','" & establecimiento & "'"  ,objConexion_scoi)
         objConexion_scoi.Open
        lector = consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New inventarios_parciales_consulta_por_clasificador With {
                    .codigo_producto = lector.Item("cod_prod"),
                    .descripcion = lector.Item("descripcion"),
                    .existencia_piezas = lector.Item("existencia"),
                    .costo_promedio = lector.Item("costo_promedio"),
                    .precio_venta = lector.Item("precio_venta"),
                    .ultimo_costo = lector.Item("ultimo_costo"),
                    .establecimiento = establecimiento,
                    .fecha = lector.Item("fecha_actual").ToString
                })
            End While
        End If
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod()>
    Public Function guardar_inventario_parcial(ByVal responsable As Integer, ByVal ParamArray inventario() As inventarios_parciales_consulta_por_clasificador)
        Dim lista = New Collection
        For Each producto As inventarios_parciales_consulta_por_clasificador In inventario
            Dim comando = "inventarios_parciales_guardado '" & producto.codigo_producto & "'," & producto.establecimiento & "," &
                producto.existencia_piezas & "," & producto.real & ",'" & producto.fecha & "'," & responsable
            Dim consulta As New SqlCommand(comando, objConexion_scoi)
            objConexion_scoi.Open
            consulta.ExecuteNonQuery
            objConexion_scoi.Close
            lista.Add(producto)
        Next
        Return lista.Count
    End Function

    <WebMethod()>
    Public Function Guardar_inventario_grupo_izagar(ByVal responsable As Integer, ByVal ParamArray inventario() As inventarios_parciales_consulta_por_clasificador)
        'Funcion de prueba'
        Dim lista = New Collection
        Dim folio_inventario = New Folio_siguiente_por_transiccion().obtener_folio(70)

        For Each producto As inventarios_parciales_consulta_por_clasificador In inventario
            Dim diferencia = producto.real- producto.existencia_piezas

            Dim query As String = String.Format("sp_insert_inventario_parcial_fisico   {0},'{1}',{2},{3},{4},{5},{6},{7},'{8}','V','{9}';",
               folio_inventario, producto.codigo_producto, producto.existencia_piezas, producto.real,
               diferencia, producto.ultimo_costo, producto.costo_promedio, responsable, producto.establecimiento, inventario(0).fecha)

            Dim comando As New SqlCommand(query, objConexion_scoi)

            Try
                objConexion_scoi.Open()
                comando.ExecuteNonQuery()
                objConexion_scoi.Close()

                lista.Add(producto)

            Catch ex As Exception
                Return "Error de Guardado En \n:" & producto.descripcion
            End Try
        Next

        Return lista.Count
    End Function

End Class