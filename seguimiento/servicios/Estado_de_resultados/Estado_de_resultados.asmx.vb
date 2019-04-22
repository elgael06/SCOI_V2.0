Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Net
Imports System.IO

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class Estado_de_resultados
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    Public Function HelloWorld() As String
        Return "Hola a todos"
    End Function
    <WebMethod()>
    Public Function Get_resultados(ByVal fecha As String, ByVal meses As Integer)
        Dim hwr As HttpWebRequest
        Dim url As String = String.Format(
        "http://192.168.4.200:90/api/Estado_de_resultados?fecha={0}&meses={1}",
        fecha, meses
        )
        hwr = WebRequest.Create(url)

        'Try
        Dim wr As WebResponse
            wr = hwr.GetResponse()

            If CType(wr, HttpWebResponse).StatusCode = HttpStatusCode.OK Then
                Dim st As Stream
                st = wr.GetResponseStream()
                Dim sr As StreamReader
                sr = New StreamReader(st)
                Dim res As Boolean
                res = sr.ReadToEnd()
                If res Then
                    Return res
                End If
            End If
        'Catch ex As Exception
        '    Return ex
        'End Try

        Return 1
    End Function



End Class