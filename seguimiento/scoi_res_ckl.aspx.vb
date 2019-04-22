Imports System.Data.SqlClient
Public Class scoi_res_ckl
    Inherits System.Web.UI.Page

    Dim com As New objConexionSQL

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(com.nva_conexion)

    Dim Da As New SqlDataAdapter                         'Creamos el objeto DataAdapter para rellenar el DataSet
    Dim Ds As New DataSet                                'DataSet para almacenar Datos
    Dim consulta As String

    Public nombreusuario = "scoi"
    Public passwordusuario = "123456789"

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Acceso_Usuario()
    End Sub
    Public Sub Acceso_Usuario()

        If Page.IsPostBack Then
            'aca pones todos lo eventos y funciones que deben cargarse una unica vez
            Dim idusuario As Integer = 0
            Dim nombre As String = ""
            Dim nombrecompleto As String = ""
            Dim nivel As String = ""

            Try
                Dim sqlusuario As String = "SELECT * FROM usuarios WHERE nombre_usuario = '" & nombreusuario & "' AND password_usuario = '" & passwordusuario & "'"
                Dim comando As New SqlCommand(sqlusuario, objConexion)
                Dim da As SqlDataAdapter = New SqlDataAdapter(comando)
                Dim dt As New DataTable
                da.Fill(dt)

                If dt.Rows.Count > 0 Then
                    Dim row As DataRow = dt.Rows(0)
                    'asignamos a variables locales los registros encontrados
                    idusuario = row("id_usuario")
                    nombre = row("nombre_usuario")
                    nombrecompleto = row("nombrecompleto_usuario")
                    nivel = row("nivel_usuario")
                    'asignamos las variables globales
                    Session.Add("id_usuario", idusuario)
                    Session.Add("usuario", nombre)
                    Session.Add("nomcompleto", nombrecompleto)
                    Session.Add("niv", nivel)

                    'abrimos la pagiina de default
                    Response.Redirect("Default.aspx")
                Else
                    Response.Write("<script language=javascript>alert('Usuario o contraseña invalidos, ¿Verifique!');</script>")
                End If
            Catch ex As Exception
                Response.Write("<script language=javascript>alert('Hay un error de conexion con la base de datos!');</script>")
            End Try

        Else

        End If
    End Sub

End Class