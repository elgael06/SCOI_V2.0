Public Class main
    Inherits System.Web.UI.MasterPage
    Public nivelUsuario As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If "usuarios" Then
            Label1.Text = Session("usuario")
            ASPxLabel1_1.Text = Session("nomcompleto")
            nivelUsuario = Session("niv")
        End If
    End Sub
End Class