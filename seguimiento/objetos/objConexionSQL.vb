Public Class objConexionSQL
    Public host = "seguimiento_iza"
    Public host_izagar = "192.168.2.98"
    Public dataBase_izagar = "Grupo_Izagar"
    Public dataBase_izagar_pruebas = "Grupo_Izagar_P"
    Public dataBase_bms = "BMSIZAGAR"
    Public usuario = "sa"
    Public paswd = "Ragazi/*-1"
    Public dataBase = "SEGUIMIENTO_2"
    Public nva_conexion As String = "Initial Catalog=" & dataBase & ";Data Source=" & host & ";Persist Security Info=True;User ID=" & usuario & ";Password='" & paswd & "'"
    Public conexion_izagar As String = "Initial Catalog=" & dataBase_izagar & ";Data Source=" & host_izagar & ";Persist Security Info=True;User ID=" & usuario & ";Password='" & paswd & "'"
    Public conexion_izagar_puebas As String = "Initial Catalog=" & dataBase_izagar_pruebas & ";Data Source=" & host_izagar & ";Persist Security Info=True;User ID=" & usuario & ";Password='" & paswd & "'"
    Public conexion_bms As String = "Initial Catalog=" & dataBase_bms & ";Data Source=" & host_izagar & ";Persist Security Info=True;User ID=" & usuario & ";Password='" & paswd & "'"

    Public Function set_conexion_local(db, host)
        Return "Initial Catalog=" & db & ";Data Source=" & host & ";Persist Security Info=True;User ID=" & usuario & ";Password='" & paswd & "'"
    End Function
End Class
