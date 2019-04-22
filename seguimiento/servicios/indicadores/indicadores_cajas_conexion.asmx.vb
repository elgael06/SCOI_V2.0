Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class indicadores_cajas
    Inherits System.Web.Services.WebService

    Dim conexion = New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_scoi As New SqlConnection(conexion.conexion_izagar)
    Dim objConexion_bms As New SqlConnection(conexion.conexion_bms)
    Dim objConexion_scoi_pruebas As New SqlConnection(conexion.conexion_izagar_puebas)
    Dim lector As SqlDataReader
    'metodos web'
    <WebMethod()>
    Public Function Obtener_indicadores_caja_establecimiento(ByVal fecha As String, ByVal establecimiento As Integer)
        Return datos_indicadores_caja(fecha, establecimiento)
    End Function
    <WebMethod>
    Public Function lista_indicadores(ByVal fecha As String)
        Return indicadores(fecha)
    End Function
    <WebMethod>
    Public Function Obtener_indicadores_colaborador(ByVal fecha As String, ByVal folio_establecimiento As Integer, ByVal folio_scoi As Integer)
        Return indicadores_colaborador(fecha, folio_establecimiento, folio_scoi)
    End Function
    <WebMethod>
    Public Function Indicadores_monitor() As List(Of indicador_monitor)
        Return Obtener_indicador_monitor()
    End Function
    'funciones '
    Private Function indicadores(ByVal fecha As String)
        Dim lista = New Collection

        Dim query As String = String.Format("exec monitor_indicadores_cajeros '{0}';", fecha)

        Dim comando As New SqlCommand(query, objConexion_scoi)
        objConexion_scoi.Open()
        lector = comando.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                lista.Add(
                New Indocador_modelo With {
                    .folio_establecimiento_venta = lector.Item("cod_estab_venta"),
                    .establecimiento_venta = lector.Item("establecimiento"),
                    .folio_empleado = lector.Item("folio_empleado"),
                    .nombre_empleado = lector.Item("nombre_colaborador"),
                    .departamento = lector.Item("departamento"),
                    .puesto = lector.Item("puesto"),
                    .estatus_empleado = lector.Item("estatus_colaborador"),
                    .fecha_ingreso = lector.Item("fecha_ingreso"),
                    .antiguedad = lector.Item("antiguedad"),
                    .foto = "",'"data:image/jpeg;base64," & Convert.ToBase64String(lector.Item("foto")),
                    .indicado_venta_x_100 = lector.Item("indicador_venta_x100"),
                    .indicacor_diferencia_x_1000 = lector.Item("indicador_diferencias_x1000"),
                    .indicador_cancelacion_x_100 = lector.Item("indicador_de_cancelaciones_x100"),
                    .total_diferencia_de_corte = lector("total_diferiencia_de_corte"),
                    .venta_por_semana_empleado = lector.Item("venta_por_semana_cajero"),
                    .venta_por_semana_establecimiento = lector.Item("venta_por_semana_estab"),
                    .semana_anio = lector.Item("semana_anio"),
                    .mes = lector.Item("mes")
                })
            End While
        End If
        objConexion_scoi.Close()

        Return lista
    End Function
    Private Function indicadores_colaborador(fecha, folio_est, id_scoi)
        Dim lista = New Collection
        Dim lista_indicadores As Collection = indicadores(fecha)

        For Each indicador As Indocador_modelo In lista_indicadores
            If indicador.folio_empleado = id_scoi And folio_est = indicador.folio_establecimiento_venta Then
                lista.Add(indicador)
            End If
        Next

        Return lista
    End Function
    Private Function datos_indicadores_caja(ByVal fecha As String, ByVal establecimiento As Integer)
        Dim lista_indicadores As Collection = indicadores(fecha)
        Dim lista = New Collection

        For Each indicador As Indocador_modelo In lista_indicadores
            If establecimiento = indicador.folio_establecimiento_venta Then

                lista.Add(
                New Indicadores_cajas_modelo With {
                    .id_scoi = indicador.folio_empleado,
                    .nombre = indicador.nombre_empleado,
                    .puesto = indicador.puesto,
                    .antiguedad = indicador.antiguedad,
                    .fecha = indicador.fecha_ingreso,
                    .foto = indicador.foto
                })
            End If
        Next

        Return lista
    End Function
    Private Function Obtener_indicador_monitor() As List(Of indicador_monitor)
        Dim lista As New List(Of indicador_monitor)
        Dim query As String = String.Format("select * from monitor_indicadores ;")
        Try
            Dim comando As New SqlCommand(query, objConexion_scoi)
            objConexion_scoi.Open()
            lector = comando.ExecuteReader
            If lector.HasRows Then
                While lector.Read
                    lista.Add(
                    New indicador_monitor With {
                        .Indicador = lector.Item("Indicador"),
                        .Valor_optimo_indicador = lector.Item("valor_optimo_indicador"),
                        .Operador = lector.Item("operador")
                    })
                End While
            End If
        Catch ex As Exception
            Return lista
        End Try

        Return lista
    End Function


End Class