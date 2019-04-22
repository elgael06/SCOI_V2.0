Imports System.Net

Public Class Autorizacion_de_ordenes_de_gasto
    Inherits System.Web.UI.Page
    Public hostName As String = Dns.GetHostName()
    Public ip_host = Dns.GetHostEntry(hostName)
    Public ip As IPAddress() = ip_host.AddressList

    ' Public host_entry = Request.UserHostName()
    'Public otra = Server.HtmlEncode(Request.RequestType)
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load


    End Sub
End Class