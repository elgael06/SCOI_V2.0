Imports System.Data.SqlClient
Public Class Tabla
    Inherits System.Web.UI.Page
    ' Public objConexion As New SqlConnection
    Public cmd As SqlCommand
    Public dr As SqlDataReader
    Public query As String
    Public ultimoId As Integer
    Public hayVigentes As Integer
    Public ultimaMatrizId As Integer

    Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=localhost;Integrated Security=SSPI;"

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(nva_conexion)
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load 'primer metodo en ejecutarse en el servidor
        CargarEstablecimientos()
        CargarAplicador()
        CargarUltimoId()
        'VerMatricesRealizadas()
        Dim acceso As acc = New acc()
        If acceso.asignar_Valores(Session("id_usuario"), 21) Or acceso.asignar_Valores(Session("id_usuario"), 20) Then

        Else
            Response.Redirect("Default.aspx")
        End If
    End Sub

    Protected Sub CargarEstablecimientos()
        Try

            objConexion.Open()

            cmd = New SqlCommand("SP_obtenerEstablecimientos", objConexion)
            cmd.CommandType = CommandType.StoredProcedure
            dr = cmd.ExecuteReader

            If dr.HasRows Then 'si trae filas
                While dr.Read
                    cbEstablecimiento.Items.Add(dr.GetValue(0))
                End While
            End If
        Catch ex As Exception
            Throw ex
        End Try
        objConexion.Close()
    End Sub

    Protected Sub CargarAplicador()


        If Not Session("usuario") = "" Then
            Dim elemento = Session("usuario")
            cbAplicador.Items.Add(elemento)
            Return
            Try
                objConexion.Open()
                cmd = New SqlCommand("SP_obtenerAplicador", objConexion)
                cmd.CommandType = CommandType.StoredProcedure
                dr = cmd.ExecuteReader

                If dr.HasRows Then
                    While dr.Read
                        cbAplicador.Items.Add(dr.GetValue(0))
                    End While
                End If
            Catch ex As Exception
                Throw ex
            End Try
            objConexion.Close()
        Else
            Response.Redirect("Default.aspx")
        End If
    End Sub

    Protected Sub CargarUltimoId()
        Try
            objConexion.Open()

            cmd = New SqlCommand("SP_ultimoIdMatrizRealizada", objConexion)
            cmd.CommandType = CommandType.StoredProcedure
            dr = cmd.ExecuteReader

            If dr.HasRows Then
                While dr.Read
                    ultimoId = dr.GetValue(0)
                End While
            End If
        Catch ex As Exception
            'Throw ex
            ultimoId = 1
        End Try
        objConexion.Close()

    End Sub

    Protected Sub VerMatricesRealizadas()
        Try
            objConexion.Open()
            cmd = New SqlCommand("select max(noMatriz) from matriz_realizada where estatus='v'", objConexion)
            dr = cmd.ExecuteReader

            If dr.HasRows Then
                While dr.Read
                    hayVigentes = 1 'si hay elementos con estatus 'v' los obtiene
                    ultimaMatrizId = dr.GetValue(0)
                End While
            End If

        Catch ex As Exception
            hayVigentes = 0
            objConexion.Close()
            'Throw ex
        End Try
        objConexion.Close()
    End Sub

End Class