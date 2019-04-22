Imports MySql.Data.MySqlClient
Imports System.Data
Imports System.IO
Imports DevExpress.Web.ASPxGridView

Public Class pruebascripts
    Inherits System.Web.UI.Page
    'Protected WithEvents Submit1 As System.Web.UI.HtmlControls.HtmlInputButton
    'Protected WithEvents File1 As System.Web.UI.HtmlControls.HtmlInputFile
    Public conn As New MySqlConnection
    Public estadodeconexionprevia As ConnectionState
    Public comando As MySqlCommand
    Public adaptador As New MySqlDataAdapter
    Public consulta As String = ""
    Public fecha As Date
    Public comentario As String = ""
    Public datareader As MySqlDataReader
    Public data As New DataSet
    Dim mensajemod As String = ""
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        UnobtrusiveValidationMode = System.Web.UI.UnobtrusiveValidationMode.None
        ' Esto sirve para cargar los controles una sola vez y no cada vez que se haga postback
        If Page.IsPostBack Then
            ' aqui no haremos nada
        Else
            'aca pones todos lo eventos y funciones que deben cargarse una unica vez
            TextBox1.Text = "datos"
            cargar_usuarios()
        End If
    End Sub
    Private Sub Submit1_ServerClick(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Submit1.ServerClick
        If Not File1.PostedFile Is Nothing And File1.PostedFile.ContentLength > 0 Then

            Dim fn As String = System.IO.Path.GetFileName(File1.PostedFile.FileName)
            Dim SaveLocation As String = Server.MapPath("Data") & "\" & fn
            Try
                File1.PostedFile.SaveAs(SaveLocation)
                Response.Write("El archivo ha sido cargado.")
            Catch Exc As Exception
                Response.Write("Error: " & Exc.Message)
            End Try
        Else
            Response.Write("Seleccione un archivo para cargar.")
        End If
    End Sub

    Protected Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        mensajemod = "has hecho clic en el boton 1"
        Session.Add("mensajemodal", mensajemod)
        ClientScript.RegisterStartupScript(Me.GetType(), "alert", "ShowPopup();", True)

    End Sub

    Protected Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        mensajemod = "has hecho clic en el boton 2"
        Session.Add("mensajemodal", mensajemod)
        ClientScript.RegisterStartupScript(Me.GetType(), "alert", "ShowPopup();", True)

    End Sub


    Protected Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If (Page.IsValid) Then
            Label2.ForeColor = System.Drawing.Color.Green
            Label2.Text = "Se han guardado los datos correctamente"
        Else
            Label2.ForeColor = System.Drawing.Color.Red
            Label2.Text = "Valide la informacion entrada e intente guardar de nuevo"
        End If

    End Sub

    Protected Sub Button4_Click(sender As Object, e As EventArgs) Handles Button4.Click
        If (Page.IsValid) Then
            Label3.ForeColor = System.Drawing.Color.Green
            Label3.Text = "Se han guardado los datos correctamente"
        Else
            Label3.ForeColor = System.Drawing.Color.Red
            Label3.Text = "Valide la informacion entrada e intente guardar de nuevo"
        End If
    End Sub

    Protected Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click
        mensajemod = "Este es un valor asignado"
        Text2.Value = mensajemod
    End Sub

    Protected Sub ASPxButton1_Click(sender As Object, e As EventArgs) Handles ASPxButton1.Click
        Label4.Text = "Has presionado el boton"
    End Sub

    Protected Sub ASPxCheckBoxList1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ASPxCheckBoxList1.SelectedIndexChanged
        If ASPxCheckBoxList1.SelectedItem.Selected = 1 Then
            Label4.Text = "Has seleccionado el primer valor"
        ElseIf ASPxCheckBoxList1.SelectedItem.Value = 2 Then
            Label4.Text = "Has seleccionado el segundo valor"
        ElseIf ASPxCheckBoxList1.SelectedItem.Value = 3 Then
            Label4.Text = "Has seleccionado el tercer valor"
        End If
    End Sub

    Protected Sub ASPxButton2_Click(sender As Object, e As EventArgs) Handles ASPxButton2.Click
        ASPxGaugeControl1.Value = Val(TextBox5.Text)
    End Sub

    Protected Sub ASPxButton3_Click(sender As Object, e As EventArgs) Handles ASPxButton3.Click
        cargar_usuarios()
    End Sub
    Sub cargar_usuarios()
        ' mostramos el catalogo de usuarios completo
        'se crea una conexion a la base de datos MySQL
        Dim connection As MySqlConnection
        connection = New MySqlConnection
        'se apunta a la cadena de conexion guardada en el archivo Web.config
        connection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        Dim estadodeconexionprevia As ConnectionState
        estadodeconexionprevia = connection.State
        'Try
        If connection.State = ConnectionState.Closed Then
            connection.Open()
        End If
        'se ejecuta una consulta SQL
        Dim ComandoSQL As New MySqlCommand("SELECT id_usuario as 'ID', nombre_usuario as 'Nombre Usuario', nivel_usuario as 'Nivel Usuario', email_usuario as 'Email' FROM usuario", connection)
        Dim ds As New DataSet
        Dim da As New MySqlDataAdapter(ComandoSQL)
        da.Fill(ds)
        ASPxGridView1.KeyFieldName = "ID"

        ASPxGridView1.SettingsBehavior.AllowFocusedRow = True
        ASPxGridView1.DataSource = ds.Tables(0)
        ASPxGridView1.DataBind()

        'Catch ex As Exception
        '    Response.Write("<script language=javascript>alert('Error de conexion a la base de datos');</script>")
        'End Try
    End Sub

End Class