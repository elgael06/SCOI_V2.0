Imports System.Data.SqlClient

Public Class Folio_siguiente_por_transiccion

    Dim conexion = New objConexionSQL

    Dim objConexion_scoi As New SqlConnection(conexion.conexion_izagar)
    Dim objConexion_scoi_pruebas As New SqlConnection(conexion.conexion_izagar_puebas)
    Dim lector As SqlDataReader

    Public Function obtener_folio(transaccion As Integer)
        Dim folio As String = ""
        Dim consulta As New SqlCommand("exec folio_siguiente_por_transaccion " & transaccion, objConexion_scoi)
        objConexion_scoi.Open()
        lector = consulta.ExecuteReader
        If lector.HasRows Then
            lector.Read()
            folio = lector.GetValue(0).ToString()
            lector.Close()
        End If
        objConexion_scoi.Close()
        Return folio
    End Function

    Public Function obtener_folio_pruebas(transaccion As Integer)
        Dim folio As String = ""
        Dim consulta As New SqlCommand("exec folio_siguiente_por_transaccion " & transaccion, objConexion_scoi_pruebas)
        objConexion_scoi_pruebas.Open()
        lector = consulta.ExecuteReader
        If lector.HasRows Then
            lector.Read()
            folio = lector.GetValue(0).ToString()
            lector.Close()
        End If
        objConexion_scoi_pruebas.Close()
        Return folio
    End Function
End Class
