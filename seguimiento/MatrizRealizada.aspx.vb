Imports System.Data.SqlClient

Public Class MatrizRealizada
    Inherits System.Web.UI.Page

    Public cn As New SqlConnection
    Public cmd As SqlCommand
    Public dr As SqlDataReader
    Public query As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        CargarEstablecimientos()
        CargarAplicador()
        'CambiarTamanioACombos()
    End Sub

    Protected Sub CargarEstablecimientos()
        Try
            cn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            cn.Open()

            cmd = New SqlCommand("SP_obtenerEstablecimientos", cn)
            cmd.CommandType = CommandType.StoredProcedure
            dr = cmd.ExecuteReader

            If dr.HasRows Then
                While dr.Read
                    cbEstablecimiento.Items.Add(dr.GetValue(0))
                End While
            End If
        Catch ex As Exception
            Throw ex
        End Try
        cn.Close()
    End Sub

    Protected Sub CargarAplicador()
        Try
            cn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            cn.Open()

            cmd = New SqlCommand("SP_obtenerAplicador", cn)
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
        cn.Close()
    End Sub

End Class