Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class analisis_precio_competenciaServ
    Inherits System.Web.Services.WebService

    Dim conexion = New objConexionSQL
    'nuevas conexiones

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion_BMS As New SqlConnection(conexion.set_conexion_local("BMSIZAGAR", "192.168.2.98"))
    Dim lector As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Function Obtener_analisis()
        Dim lista = New Collection
        Dim SQL_comando As New SqlCommand("sp_analisis_precios_de_competencia_mensual", objConexion_BMS)

        'Try
            objConexion_BMS.Open()
            lector = SQL_comando.ExecuteReader
            If lector.HasRows Then
                While lector.Read
                    Dim objeto = New objAnalisis_precios_competencia
                    objeto.familia = lector.Item("familia")
                    objeto.categoria = lector.Item("categoria")
                    objeto.clase_producto = lector.Item("clase_producto")
                    objeto.cod_prod = lector.Item("cod_prod")
                    objeto.descripcion = lector.Item("descripcion")
                    objeto.costo_promedio = lector.Item("costo_promedio")
                    objeto.ultimo_costo = lector.Item("ultimo_costo")
                    objeto.precio_de_venta = lector.Item("precio_de_venta")
                    objeto.margen = lector.Item("margen")
                    objeto.margen_meta_familia = lector.Item("margen_meta_familia")
                    objeto.precio_de_oferta_actual = lector.Item("precio_de_oferta_actual")
                    objeto.localizacion = lector.Item("localizacion")
                    objeto.pasillo = lector.Item("pasillo")
                    objeto.precio_de_venta_captura = lector.Item("precio_de_venta_captura")
                    objeto.venta_ultimos_90_dias = lector.Item("venta_ultimos_90_dias")
                    objeto.clasificacion_8020 = lector.Item("clasificacion_8020")
                    objeto.LEY_PCIO_N = lector.Item("LEY_PCIO_N")
                    objeto.LEY_PCIO_O = lector.Item("LEY_PCIO_O")
                    objeto.SORIANA_N = lector.Item("SORIANA_N")
                    objeto.SORIANA_O = lector.Item("SORIANA_O")
                    objeto.TERESITA_N = lector.Item("TERESITA_N")
                    objeto.TERESITA_O = lector.Item("TERESITA_O")
                    objeto.BODART_N = lector.Item("BODART_N")
                    objeto.BODART_O = lector.Item("BODART_O")
                    objeto.MEZQUITILLO_N = lector.Item("MEZQUITILLO_N")
                    objeto.MEZQUITILLO_O = lector.Item("MEZQUITILLO_O")
                    objeto.LOPEZ_N = lector.Item("LOPEZ_N")
                    objeto.LOPEZ_O = lector.Item("LOPEZ_O")

                    lista.Add(objeto)
                End While
            End If

      '  Catch ex As Exception
       '     MsgBox(ex)
        'End Try

        Return lista
    End Function
End Class
Class objAnalisis_precios_competencia : Inherits objProducto

    Public localizacion
    Public pasillo
    Public precio_de_venta_captura
    Public venta_ultimos_90_dias
    Public clasificacion_8020


End Class

Class objProducto : Inherits objCompetencia
    Public familia
    Public categoria
    Public clase_producto
    Public cod_prod
    Public descripcion
    Public costo_promedio
    Public ultimo_costo
    Public precio_de_venta
    Public margen
    Public margen_meta_familia
    Public precio_de_oferta_actual

End Class
Class objCompetencia
    Public LEY_PCIO_N
    Public LEY_PCIO_O
    Public SORIANA_N
    Public SORIANA_O
    Public TERESITA_N
    Public TERESITA_O
    Public BODART_N
    Public BODART_O
    Public MEZQUITILLO_N
    Public MEZQUITILLO_O
    Public LOPEZ_N
    Public LOPEZ_O
End Class