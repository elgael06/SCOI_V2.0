Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.Net.Mail


' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class Atorizacion_Orden_de_GastoServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    Dim objConexion As New SqlConnection(conexion.conexion_izagar)
    'Dim ObjConexionP As New SqlConnection(conexion.conexion_izagar)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function HelloWorld(arreglo) As Array

        Return arreglo
    End Function
    <WebMethod()>
    Public Function obtener_orden_gastos(estatus)
        Dim lista As New Collection
        Dim comando = String.Format("orden_de_gasto_autorizacion_filtro '{0}'", estatus)
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read

                    lista.Add(
                      New objobtener_orden_gastos With {
                        .folio = Integer.Parse(dr.Item("folio")),
                        .proveedor = dr.Item("proveedor"),
                       .consepto_solicitud = dr.Item("concepto_solicitud"),
                        .descripcion_gasto = dr.Item("descripcion_gasto"),
                        .establecimiento = dr.Item("establecimiento"),
                       .importe_total = dr.Item("importe_total"),
                        .usuario_solicita = dr.Item("usuario_solicita"),
                        .fecha = dr.Item("fecha"),
                        .estatus = dr.Item("estatus"),
                        .fecha_autorizacion = dr.Item("fecha_autorizacion"),
                        .usuario_autorizo = dr.Item("usuario_autorizo"),
                        .tipo_proveedor = dr.Item("tipo_proveedor")
                    })
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function
    <WebMethod()>
    Public Function obtener_orden_gastos_folio(folio)
        Dim lista As New Collection
        Dim comando = String.Format("orden_de_gasto_consulta {0}", folio)
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    lista.Add(
                    New objDescripcion_gastos With {
                        .descripcion_producto = dr.Item("descripcion_producto"),
                        .cantidad = dr.Item("cantidad"),
                        .precio_unitario = dr.Item("precio_unitario"),
                        .folio = dr.Item("folio"),
                        .descripcion_gasto = dr.Item("descripcion_gasto"),
                        .cod_estab = dr.Item("cod_estab"),
                        .establecimiento = dr.Item("establecimiento"),
                        .cod_prv = dr.Item("cod_prv"),
                        .proveedor = dr.Item("proveedor"),
                        .tipo_proveedor = dr.Item("tipo_proveedor"),
                        .importe_total = dr.Item("importe_total"),
                        .usuario_solisito = dr.Item("usuario_solicito"),
                        .fecha = dr.Item("fecha"),
                        .fecha_autorizacion = dr.Item("fecha_autorizacion"),
                        .usuario_solicita = dr.Item("usuario_solicita"),
                        .estatus = dr.Item("estatus"),
                        .usuario_autorizo = dr.Item("usuario_autorizo")
                    })
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function

    Public Sub Enviar_correo_orden_gastos(E_to, cuerpo, folio, estatus)
        If estatus = "A" Then
            estatus = "AUTORIZADO"
        ElseIf estatus = "C"
            estatus = "CANCELADO"
        ElseIf estatus = "N"
            estatus = "NEGADO"
        End If

        Dim mail As New MailMessage
        mail.Subject = "Peticion de Gastos.Folio:" & folio & " ," & estatus
        mail.To.Add(E_to)
        mail.From = New MailAddress("scoi.web.grupoizagar@gmail.com", "SCOI GRUPO IZAGAR.", Encoding.UTF8)
        mail.BodyEncoding = System.Text.Encoding.UTF8
        mail.Priority = MailPriority.High
        mail.IsBodyHtml = True
        mail.Body = cuerpo

        Dim smtp As New SmtpClient("smtp.gmail.com")
        smtp.EnableSsl = True
        smtp.Credentials = New Net.NetworkCredential("scoi.web.grupoizagar@gmail.com", "Ragazi/*-1")
        smtp.Port = 587
        smtp.Host = "smtp.gmail.com"
        smtp.Send(mail)

    End Sub
    <WebMethod()>
    Public Function actualizar_estatus_gastos(folio, estatus, autorizo, solicito, equipo, contenido_correo, descripcion)
        'variables a utilizar
        Dim query = String.Format("update orden_de_gasto set estatus='{0}', usuario_autorizo={1},fecha_autorizacion=getdate(),equipo_autorizo='{2}',descripcion_gasto='{3}'  where folio={4}",
        estatus, autorizo, equipo, descripcion, folio
)

        Dim SQL_actualizar As New SqlCommand(query, objConexion)
        Try
            'consulta de guardado
            objConexion.Open()
            SQL_actualizar.ExecuteNonQuery()
            objConexion.Close()
            'consulta de enviar el correo
        Catch
        End Try
        Return {estatus, contenido_correo}
    End Function
End Class
Public Class objobtener_orden_gastos
    Public folio As Integer
    Public proveedor As String
    Public consepto_solicitud As String
    Public descripcion_gasto As String
    Public establecimiento As String
    Public importe_total As Double
    Public usuario_solicita As String
    Public fecha As String
    Public estatus As String
    Public fecha_autorizacion As String
    Public usuario_autorizo As String
    Public tipo_proveedor As String
End Class
Public Class objDescripcion_gastos
    Public descripcion_producto
    Public cantidad
    Public precio_unitario
    Public folio
    Public descripcion_gasto
    Public cod_estab
    Public establecimiento
    Public cod_prv
    Public proveedor
    Public tipo_proveedor
    Public importe_total
    Public usuario_solisito
    Public fecha As String
    Public fecha_autorizacion As String
    Public usuario_solicita
    Public estatus
    Public usuario_autorizo
End Class