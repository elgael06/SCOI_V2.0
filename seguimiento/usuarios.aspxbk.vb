
Public Class usuarios
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        UnobtrusiveValidationMode = System.Web.UI.UnobtrusiveValidationMode.None
        ' Esto sirve para cargar los controles una sola vez y no cada vez que se haga postback
        If Page.IsPostBack Then
            ' aqui no haremos nada

        Else


        End If
    End Sub

    Protected Sub ASPxButton1_Click(sender As Object, e As EventArgs) Handles ASPxButton1.Click
        'ASPxCardViewExporter1.WritePdfToResponse()
    End Sub
End Class