Imports System.Data.SqlClient
Imports System.IO
Imports System.Data
Public Class login
    Inherits System.Web.UI.Page
    Dim Conexion As String = "Data Source=localhost;Initial Catalog=seguimiento_2;Persist Security Info=True;User ID=sa;Password=Ragazi/*-1"
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(Conexion)
    Dim Da As New SqlDataAdapter                         'Creamos el objeto DataAdapter para rellenar el DataSet
    Dim Ds As New DataSet                                'DataSet para almacenar Datos
    Dim consulta As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Protected Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If Page.IsPostBack Then
            'aca pones todos lo eventos y funciones que deben cargarse una unica vez
            Dim nombre As String = ""
            Dim nombrecompleto As String = ""
            Dim nivel As String = ""
            Dim nombreusuario As String = TextBox1.Text
            Dim passwordusuario As String = TextBox2.Text

            'Try
            Dim sqlusuario As String = "SELECT * FROM usuarios WHERE nombre_usuario = '" & nombreusuario & "' AND password_usuario = '" & passwordusuario & "'"
            Dim comando As New SqlCommand(sqlusuario, objConexion)
            Dim da As SqlDataAdapter = New SqlDataAdapter(comando)
            Dim dt As New DataTable
            da.Fill(dt)

            If dt.Rows.Count > 0 Then
                Dim row As DataRow = dt.Rows(0)
                'asignamos a variables locales los registros encontrados
                nombre = row("nombre_usuario")
                nombrecompleto = row("nombrecompleto_usuario")
                nivel = row("nivel_usuario")
                'asignamos las variables globales
                Session.Add("usuario", nombre)
                Session.Add("nomcompleto", nombrecompleto)
                Session.Add("niv", nivel)

                'abrimos la pagiina de default
                Response.Redirect("Default.aspx")
            Else
                Response.Write("<script language=javascript>alert('Usuario o contraseña invalidos, ¿Verifique!');</script>")
            End If
            'Catch ex As Exception
            '    Response.Write("<script language=javascript>alert('Hay un error de conexion con la base de datos!');</script>")
            'End Try

        Else

        End If
    End Sub
End Class