Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class servCuestionario
    Inherits System.Web.Services.WebService

    <WebMethod()>
    Public Sub GetCuestionarios(preg As Array)
        Dim objCuestiones As Array = {}
        Dim get_orden As Integer = preg(0)
        Dim get_pregunta As String = preg(1)
        Dim get_ponderacion As Integer = preg(2)

    End Sub

End Class