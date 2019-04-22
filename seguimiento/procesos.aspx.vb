

Imports System.Data.SqlClient
Public Class procesos
    Inherits System.Web.UI.Page
    'Creamos la cadena de conexion'
    Dim MiConexion As String = "Data Source=SERVERCSERVER\SQLEXPRESS;Initial Catalog=seguimiento;Persist Security Info=True;User ID=sa;Password=Ragazi/*-1"

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(MiConexion)
    Dim Da As New SqlDataAdapter                         'Creamos el objeto DataAdapter para rellenar el DataSet
    Dim Ds As New DataSet                                'DataSet para almacenar Datos
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ' Esto sirve para cargar los controles una sola vez y no cada vez que se haga postback
        If Page.IsPostBack Then
            ' aqui no haremos nada
        Else
            'aca pones todos lo eventos y funciones que deben cargarse una unica vez
            MemoDetalleActividad.Text = ""
        End If
        Dim acceso As acc = New acc()
        If Not (acceso.asignar_Valores(Session("id_usuario"), 8)) Then
            Response.Redirect("Default.aspx")
        End If
    End Sub

    Protected Sub ComboIDActividad_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboIDActividad.SelectedIndexChanged
        MemoDetalleActividad.Text = ComboIDActividad.Text
    End Sub
    Private Sub Submit1_ServerClick(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Submit1.ServerClick
        If Not File1.PostedFile Is Nothing And File1.PostedFile.ContentLength > 0 Then

            Dim fn As String = System.IO.Path.GetFileName(File1.PostedFile.FileName)
            Dim SaveLocation As String = Server.MapPath("Adjuntos") & "\" & fn
            Try
                File1.PostedFile.SaveAs(SaveLocation)
                TextBox1.Text = "~/Adjuntos/" & fn
                LinkAdjunto.NavigateUrl = "~/Adjuntos/" & fn

            Catch Exc As Exception
                Response.Write("Error: " & Exc.Message)
            End Try
        Else
            Response.Write("<script language=javascript>alert('Es necesario que elija un archivo!');</script>")
        End If
    End Sub

    Protected Sub BtnAgregar_Click(sender As Object, e As EventArgs) Handles BtnAgregar.Click
        'agregamos la relacion actividad perfil
        agregar_relacion()
    End Sub
    Sub agregar_relacion()
        objConexion.Close()
        ' guardamos los registros en la tabla 
        Dim sqlmatrizhk As String = "INSERT INTO rdap (id_detalleactividad, detalleactividad, codigo_puesto, adjunto) VALUES (@id_detalleactividad, @detalleactividad, @codigo_puesto, @adjunto)"
        Dim comando As New SqlCommand(sqlmatrizhk, objConexion)
        'Try
        comando.CommandType = CommandType.Text
        'agregamos los elementos que ya conocemos de la tabla de matrizhoshin
        comando.Parameters.Add("@id_detalleactividad", SqlDbType.Int).Value = ComboIDActividad.Value
        comando.Parameters.Add("@detalleactividad", SqlDbType.VarChar).Value = ComboIDActividad.Text
        comando.Parameters.Add("@codigo_puesto", SqlDbType.VarChar).Value = CStr(ComboPerfil.Value)
        comando.Parameters.Add("@adjunto", SqlDbType.VarChar).Value = TextBox1.Text

        objConexion.Open()
        comando.ExecuteNonQuery()
        ' hacemos un databind del gridview
        ASPxGridView6.DataBind()
        MemoDetalleActividad.Text = ""

    End Sub
End Class