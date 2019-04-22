Imports System.Data.SqlClient
Imports System.IO
Imports System.Data
Public Class login
    Inherits System.Web.UI.Page
    Dim com As New objConexionSQL
    Dim Conexion As String = "Data Source=" & com.host & ";Initial Catalog=" & com.dataBase & ";Persist Security Info=True;User ID=" & com.usuario & "; Password=" & com.paswd 'ID=sa;Password=Ragazi/*-1"
    Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=192.168.4.200;Integrated Security=SSPI; User ID=" & com.usuario & "; Password=" & com.paswd & "'"
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(com.nva_conexion)
    Dim Da As New SqlDataAdapter                         'Creamos el objeto DataAdapter para rellenar el DataSet
    Dim Ds As New DataSet                                'DataSet para almacenar Datos
    Dim consulta As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Protected Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If Page.IsPostBack Then
            'aca pones todos lo eventos y funciones que deben cargarse una unica vez
            Dim idusuario As Integer = 0
            Dim nombre As String = ""
            Dim nombrecompleto As String = ""
            Dim nivel As String = ""
            Dim id_scoi As String = ""
            Dim nombreusuario As String = TextBox1.Text
            Dim passwordusuario As String = TextBox2.Text
            Dim foto
            Dim array() As Byte = Encoding.ASCII.GetBytes(convertir_asii(passwordusuario))
            Dim passwB64 = "pasword:" & Convert.ToBase64String(array)
            '            Response.Write("<script language=javascript>alert('Base64 contraseña = " & passwB64 & "');</script>")
            Try
                Dim sqlusuario As String = "verificar_sesion_usuario '" & nombreusuario & "','" & passwB64 & "'"
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
                    id_scoi = row("id_scoi")
                    foto = "data:image/jpeg;base64," & Convert.ToBase64String(row("foto"))
                    'asignamos las variables globales
                    Session.Add("id_usuario", idusuario)
                    Session.Add("usuario", nombre)
                    Session.Add("nomcompleto", nombrecompleto)
                    Session.Add("niv", nivel)
                    Session.Add("id_scoi", id_scoi)
                    Session.Add("pasword", passwordusuario)
                    Session.Add("foto", foto)

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
    Function convertir_asii(dato As String) As String
        Dim auxiliar As String = ""
        Dim n As Integer
        Dim chart As Integer
        Dim pos As String
        For n = 0 To Len(dato) - 1
            pos = dato.Chars(n)
            chart = Asc(pos)
            If n > 0 Then
                auxiliar += "," & chart
            Else
                auxiliar += "" & chart
            End If

        Next n
        Return auxiliar

    End Function
End Class