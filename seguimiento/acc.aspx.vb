Imports System.Data.SqlClient
Imports System.IO
Imports System.Data

Public Class acc
    Inherits System.Web.UI.Page
    'Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=localhost;Integrated Security=SSPI;"
    Dim conexion As New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim Da As New SqlDataAdapter                         'Creamos el objeto DataAdapter para rellenar el DataSet
    Dim Ds As New DataSet                                'DataSet para almacenar Datos
    Dim dr As SqlDataReader
    Dim consulta As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub


    Public Function asignar_Valores(id_usr, folio_sub_menu)
        Dim id_usuario As Integer = id_usr
        Dim f_sub_menu As Integer = folio_sub_menu
        Dim comando As New SqlCommand("SELECT * FROM Sub_menu_usuarios WHERE id_usuario= " & id_usuario & " and folio_sub_menu =" & f_sub_menu & " and acceso=1", objConexion)
        Try
            objConexion.Open()
            dr = comando.ExecuteReader()

            If dr.Read() Then
                objConexion.Close()
                Return True
            Else
                objConexion.Close()
                Return False
            End If
            dr.Close()
        Catch
            Return False
        End Try

    End Function


End Class