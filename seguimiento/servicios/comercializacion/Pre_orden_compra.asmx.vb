Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<Script.Services.ScriptService()>
<WebService()>
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class pre_orden_compra
    Inherits WebService

    Dim conexion = New objConexionSQL
    'nuevas conexiones

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion_scoi As New SqlConnection(conexion.set_conexion_local("Grupo_Izagar", "192.168.2.98"))
     Dim objConexion_web As New SqlConnection(conexion.set_conexion_local("SEGUIMIENTO_2", "192.168.4.200"))
    Dim lector As SqlDataReader


    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hola a todos"
    End Function
    <WebMethod()>
    Public Function Lista_productos()
        Dim lista = New Collection
        Dim i = 0

        Dim Proveedor = New Collection
        Proveedor.Add("CANARIO")
        Proveedor.Add("VARELA")
        Proveedor.Add("ARMENTA")
        Proveedor.Add("MONTOYA")

        Dim Codigo = New String() {"3963", "3017", "3004", "3025"}
        Dim Descripcion = New String() {"LECHUGA", "PAPA", "AGUACATE HASS", "ZANAHORIA"}
        Dim Existencia = New String() {"10", "13", "15", "17"}
        Dim Pedido = New String() {"20", "17", "10", "13"}
        Dim Total_vta = New String() {"30", "30", "25", "30"}
        Dim U_costo = New Double() {9.0, 12.3, 18.2, 6.5}

        For Each dato As String In Codigo
            Dim producto As New ObjProducto_compra_externa With {
                .codigo = dato,
                .nombre = Descripcion(i),
                .existencia = Existencia(i),
                .pedido = Pedido(i),
                .total_venta = Total_vta(i),
                .u_costo = U_costo(i)
            }
            lista.Add(producto)

            i += 1
        Next

        Return lista
    End Function
    <WebMethod()>
    Public Function inventario_productos()
        Dim lista = New Collection
        Dim seleccion = "select * from pre_orden_existencia"
        Dim comando as new sqlCommand( seleccion ,objConexion_web)

        objConexion_web.Open()
        lector = comando.ExecuteReader()
        If lector.HasRows 
            While lector.Read
                 Dim producto As New ObjProducto_compra_externa With {
                .codigo = lector.Item("folio_producto"),
                .nombre = lector.Item("descripcion"),
                .existencia = lector.Item("existencia"),
                .pedido = lector.Item("pedido"),
                .total_venta = lector.Item("total_venta"),
                .u_costo = lector.Item("ultimo_costo")
            }
            lista.Add(producto)
            End While
        End If
        lector.Close()
        objConexion_web.Close()
         
        Return lista
    End Function
     <WebMethod()>
    public Function proveedores()
        Dim lista = New Collection
        Dim consulta = "  select * from tb_proveedores where tipo_proveedor = 'V'"
        Dim comando As New SqlCommand(consulta,objConexion_scoi )

        objConexion_scoi.Open()
        lector = comando.ExecuteReader()

        If lector.HasRows
            While lector.Read
                Dim proveedor As New objProveedor With{
                    .folio_proveedor = lector.Item("folio_proveedor"),
                    .nombre = lector.Item("nombre"),
                    .ap_paterno = lector.Item("ap_paterno"),
                    .ap_materno = lector.Item("ap_materno"),
                    .direccion = lector.Item("direccion"),
                    .telefono = lector.Item("telefono"),
                    .fecha_mov = lector.Item("fecha_mov"),
                    .estatus = lector.Item("status"),
                    .plazo = lector.Item("plazo"),
                    .tipo_proveedor = lector.Item("tipo_proveedor")
                }
                lista.Add(proveedor)
            End While
        End If
         lector.Close()
        objConexion_web.Close()

        Return lista
     End Function
End Class


Public Class ObjProducto_compra_externa
    Public codigo
    Public nombre
    Public existencia
    Public pedido
    Public total_venta
    Public u_costo
End Class
Public Class objProveedor
    Public folio_proveedor
    Public nombre
    Public ap_paterno
    Public ap_materno
    Public direccion
    Public telefono
    Public fecha_mov
    Public estatus
    Public plazo
    Public tipo_proveedor
End Class
