Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class ususrios_scoiServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'nuevas conexiones

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_izagar As New SqlConnection(conexion.conexion_izagar)
    Dim lector As SqlDataReader
    Dim dt As DataTable


    <WebMethod()>
    Public Function obtener_usuario(tipo, filtro) As Collection
        Dim listUsuario As New Collection
        Dim comando = String.Format("dh_curso_empleados_activos '{0}', '{1}'", tipo, filtro)

        Dim SQL_comando As New SqlCommand(comando, objConexion_izagar)
        Try
            objConexion_izagar.Open()
            lector = SQL_comando.ExecuteReader
            If lector.HasRows Then

                While lector.Read
                    Dim datos As New objUsuarioScoi

                    datos.id_scoi = lector.Item("id_scoi")
                    datos.nombre_completo = lector.Item("nombre_completo")
                    datos.folio_establecimiento = lector.Item("folio_establecimiento")
                    datos.establecimiento = lector.Item("establecimiento")
                    datos.departamento = lector.Item("departamento")
                    datos.puesto = lector.Item("puesto")
                    datos.escolaridad = lector.Item("escolaridad")
                    datos.turno = lector.Item("turno")
                    datos.horario = lector.Item("horario")
                    datos.estatus_empleado = lector.Item("estatus_empleado")

                    listUsuario.Add(datos)
                End While
            End If

            lector.Close()
            objConexion_izagar.Close()
        Catch
            Return listUsuario
        End Try
        Return listUsuario
    End Function
    <WebMethod()>
    Public Function obtener_usuario_imagen(tipo, filtro)
        Dim datos As New objUsuarioScoi
        Dim comando = String.Format("dh_curso_empleados_activos '{0}', '{1}'", tipo, filtro)

        Dim SQL_comando As New SqlCommand(comando, objConexion_izagar)

        objConexion_izagar.Open()
        lector = SQL_comando.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                datos.foto = "data:image/jpeg;base64," & Convert.ToBase64String(lector.Item("foto"))
            End While
        End If

        lector.Close()
        objConexion_izagar.Close()

        Return datos
    End Function

    <WebMethod()>
    Public Function Comprobar_usuario(folio)
        Dim estado = 0
        Dim query = String.Format("select id_usuario from usuarios where id_scoi={0}", folio)
        Dim comando As New SqlCommand(query, objConexion)
        Try
            objConexion.Open()
            lector = comando.ExecuteReader
            If lector.HasRows Then
                While lector.Read
                    estado = lector.Item("id_usuario")
                End While
            End If
        Catch ex As Exception
            objConexion.Close()
            Return estado
        End Try
        objConexion.Close()

        Return estado
    End Function
    <WebMethod()>
    Public Function Guardar_usuario_por_id_scoi(ByVal id_scoi As Integer)
        Dim query = String.Format("exec alta_usuararios_desde_scoi '{0}'", id_scoi)
        Dim comando As New SqlCommand(query, objConexion)
        Try
            objConexion.Open()
            comando.ExecuteNonQuery()
            objConexion.Close()
        Catch ex As Exception
            Return 0
        End Try

        Return id_scoi
    End Function

End Class
Class objUsuarioScoi
    Public id_scoi
    Public nombre_completo
    Public foto As String
    Public folio_establecimiento
    Public establecimiento
    Public departamento
    Public puesto
    Public escolaridad
    Public turno
    Public horario
    Public estatus_empleado
End Class