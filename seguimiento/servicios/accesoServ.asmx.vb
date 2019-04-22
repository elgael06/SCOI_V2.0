Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<Script.Services.ScriptService()>
<WebService()>
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class accesoServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'nuevas conexiones

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim dr As SqlDataReader
    Dim dt As DataTable
    <WebMethod>
    Public Function hi()
        Dim js As New JavaScriptSerializer()
        Return js.Serialize("hola")
    End Function

    <WebMethod>
    Public Function checar_accesoUsuario(nombre, password)
        Dim js As New JavaScriptSerializer()
        Dim usuario As New objUsuario
        Dim array() As Byte = Encoding.ASCII.GetBytes(convertir_asii(dato:=password))
        Dim passwB64 = "pasword:" & Convert.ToBase64String(array)

        Dim comando = "verificar_sesion_usuario '" & nombre & "','" & passwB64 & "'"
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                dr.Read()

                usuario.id_usuario = dr.Item("id_usuario")
                usuario.nombre_usuario = dr.Item("nombre_usuario")
                usuario.nombrecompleto_usuario = dr.Item("nombrecompleto_usuario")
                usuario.email_usuario = dr.Item("email_usuario")
                usuario.id_scoi = dr.Item("id_scoi")

            End If
            dr.Close()
            objConexion.Close()

        Catch ex As Exception
        End Try

        Return usuario
    End Function
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
    <WebMethod>
    Public Function checar_acceso(ByVal id_usuario)
        'variables a usar
        Dim lista As New Collection
        'comando sql
        Dim buscar = String.Format("[acceso_usuarios] '{0}'", id_usuario)
        'llamada de comando mediante la coneccion
        Dim SQL_buscar As New SqlCommand(buscar, objConexion)
        Try
            'abrimos conexion
            objConexion.Open()
            'ejecucion de comando en un reader
            dr = SQL_buscar.ExecuteReader
            'revisamos si el reader tiene columnas
            If dr.HasRows Then
                'recorremos las columnas
                While dr.Read
                    'llamamos al objeto acceso que cachara los valores de la consulta
                    lista.Add(New objAcceso With {
                    .id_usuario = id_usuario,
                    .menu = dr.Item("menu"),
                    .id_sub_menu = dr.Item("id_sub_menu"),
                    .sub_menu = dr.Item("sub_menu"),
                    .usuario = dr.Item("usuario"),
                    .acceso = dr.Item("acceso")
                    })
                End While
            End If
            'cerramos coneccion
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        'retornamos la lista generada 
        Return lista
    End Function
    <WebMethod>
    Function obtener_sub_menus()
        Dim lista As New Collection
        Dim comando = "select folio_sub_menu as id,sub_menu,menus.folio as id_menu,menus.menu from sub_menu left join menus on menus.folio= sub_menu.menu order by folio  "
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim Submenus As New objSubmenus
                    Submenus.id = dr.Item("id")
                    Submenus.sub_menu = dr.Item("sub_menu")
                    Submenus.id_menu = dr.Item("id_menu")
                    Submenus.menu = dr.Item("menu")
                    lista.Add(Submenus)
                End While

            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function

    <WebMethod>
    Public Function Obtener_lista_usuarios()
        ' Estilos de nombres
        'inicializamos una variable que contenga los datos
        Dim tablaUsuarios As New Collection
        'creamos las conexiones
        Dim consulta = "select * FROM usuarios"
        Dim SQL_buscar As New SqlCommand(consulta, objConexion)
        Try
            'abrimos la conexion
            objConexion.Open()
            'ejecutamos el leector del comando
            dr = SQL_buscar.ExecuteReader
            'checamos que no este vacioa la consulta
            If dr.HasRows Then
                'leemos cada dato
                While dr.Read
                    'llamamos un objeto que los almacene
                    Dim usuario As New objUsuario
                    'lo llenamos con los datos
                    usuario.id_usuario = dr.Item("id_usuario")
                    usuario.nombre_usuario = dr.Item("nombre_usuario")
                    usuario.nombrecompleto_usuario = dr.Item("nombrecompleto_usuario")
                    usuario.email_usuario = dr.Item("email_usuario")
                    usuario.id_scoi = dr.Item("id_scoi")
                    usuario.foto = "data:image/jpeg;base64," & Convert.ToBase64String(dr.Item("foto"))
                    'y los agregamos ala tabla
                    tablaUsuarios.Add(usuario)
                End While
            End If
            'cerramos conexiones
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        'y retornamos la tabla con los datos
        Return tablaUsuarios
    End Function


    <WebMethod>
    Function Usuarios()
        Dim lista As New Collection
        Dim consulta = "select * FROM usuarios"
        Dim SQL_buscar As New SqlCommand(consulta, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim usuario As New objUsuario
                    usuario.id_usuario = dr.Item("id_usuario")
                    usuario.nombre_usuario = dr.Item("nombre_usuario")
                    usuario.nombrecompleto_usuario = dr.Item("nombrecompleto_usuario")
                    usuario.email_usuario = dr.Item("email_usuario")
                    usuario.id_scoi = dr.Item("id_scoi")
                    usuario.foto = "data:image/jpeg;base64," & Convert.ToBase64String(dr.Item("foto"))

                    lista.Add(usuario)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch ex As Exception

        End Try

        Return lista
    End Function

    <WebMethod>
    Public Sub guardar(ByVal usuario, ByVal folio_sub_menu, ByVal acceso)
        Dim guardar = "acceso_usuario_por_menu_guardar " & usuario & "," & folio_sub_menu & "," & acceso
        Dim SQL_guardar As New SqlCommand(guardar, objConexion)
        Try
            'guardamos los nuevos
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try
    End Sub

    <WebMethod>
    Public Sub borrar(ByVal usuario)
        Dim borra = "delete from sub_menu_usuarios where id_usuario= " & usuario
        Dim SQL_borrar As New SqlCommand(borra, objConexion)
        Try
            'borramos los existentes 
            objConexion.Open()
            SQL_borrar.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try

    End Sub

    <WebMethod>
    Public Function checar_acceso_subMenu(id_usuario, folio_sub_menu)
        Dim comando As New SqlCommand("SELECT acceso FROM Sub_menu_usuarios WHERE id_usuario= " & id_usuario & " and folio_sub_menu =" & folio_sub_menu, objConexion)
        Try
            objConexion.Open()
            dr = comando.ExecuteReader
            If dr.HasRows Then
                dr.Read()
                Return dr.Item("acceso")
            Else
                Return False
            End If
            dr.Close()
            objConexion.Close()
        Catch
            Return False
        End Try
    End Function

    Protected Overrides Sub Finalize()
        MyBase.Finalize()
    End Sub
    <WebMethod>
    Public Function actualizar_usuario(nombre_corto, Nombre_completo, email_usuario, nivel_usuario, pasword, id_scoi, id_usuario)

        Dim comando = "update usuarios set nombre_usuario='" & nombre_corto & "',nombrecompleto_usuario='" & Nombre_completo & "',email_usuario='" & email_usuario & "',nivel_usuario=" & nivel_usuario & ",password_usuario='" & pasword & "',id_scoi=" & id_scoi & " where id_usuario=" & id_usuario
        Dim SQL_update As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_update.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try
        Return True
    End Function
    <WebMethod>
    Public Function guardar_usuario(nombre_corto, Nombre_completo, email_usuario, nivel_usuario, pasword, id_scoi, id_usuario)

        Dim comando = " insert into usuarios values( '" & nombre_corto & "','" & Nombre_completo & "','" & email_usuario & "'," & nivel_usuario & ",'" & pasword & "'," & id_scoi & " )"
        Dim SQL_guardar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try
        Return True
    End Function
    <WebMethod>
    Public Function eliminar_usuario(id_usuario)

        Dim comando = " delete usuarios where id_usuario=" & id_usuario
        Dim SQL_guardar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try
        Return True
    End Function
    <WebMethod>
    Public Function cambio_contrasenia(id, pasword)
        Dim comando = " update  usuarios set  password_usuario='" & pasword & " ' where id_scoi=" & id
        Dim SQL_guardar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try
        Return True

    End Function
    <WebMethod>
    Public Function guardar_lista(ByVal accessos As objAcceso())
        '  Dim guardar = "acceso_usuario_por_menu_guardar " & usuario & "," & folio_sub_menu & "," & acceso
        Dim lista = New Collection

        For Each acceso As objAcceso In accessos

            Dim query = String.Format("acceso_usuario_por_menu_guardar {0},{1},{2}", acceso.id_usuario, acceso.id_sub_menu, acceso.acceso)
            Dim SQL_guardar As New SqlCommand(query, objConexion)
            Try
                'guardamos los nuevos
                objConexion.Open()
                SQL_guardar.ExecuteNonQuery()
                objConexion.Close()
                lista.Add(query)
            Catch
                Return lista.Count
            End Try
        Next
        Return lista.Count
    End Function

    <WebMethod>
    Public Function Comprobar_nombre_corto(ByVal nombre As String)
        Dim estado As Integer = 0

        Dim Query = String.Format("select id_usuario from usuarios where nombre_usuario= '{0}' ", nombre)
        Try
            objConexion.Open()
            Dim comando As New SqlCommand(Query, objConexion)
            dr = comando.ExecuteReader
            If dr.HasRows Then
                dr.Read()
                estado = dr.Item("id_usuario")
            End If

            objConexion.Close()
        Catch ex As Exception

        End Try

        Return estado
    End Function
    <WebMethod>
    Public Function guardar_cambios_usuario(ByVal usuario As Usuario_seleccion_cambios)

        'Dim comando = " insert into usuarios values( '" & nombre_corto & "','" & Nombre_completo & "','" & email_usuario & "'," & nivel_usuario & ",'" & pasword & "'," & id_scoi & " )"
        Dim query = String.Format(
            "update usuarios set nombre_usuario='{0}',nombrecompleto_usuario='{1}',email_usuario='{2}',id_scoi={4} where id_usuario='{3}'",
            usuario.nombre, usuario.nombre_completo, usuario.correo, usuario.folio, usuario.id_scoi)
        Dim SQL_guardar As New SqlCommand(query, objConexion)
        Try
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try
        Return True
    End Function
    <WebMethod>
    Public Function restaurar_pasword_usuario(usuario As Usuario_seleccion_cambios)
        Dim estado As Boolean = True

        Dim query = String.Format(
            "update usuarios set password_usuario='pasword:NDksNTAsNTEsNTIsNTMsNTQsNTUsNTYsNTcsNDg=' where id_usuario='{0}'", usuario.folio)
        Dim SQL_guardar As New SqlCommand(query, objConexion)
        Try
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try

        Return estado
    End Function
End Class

'creamos el objeto acceso para llamar en checar acceso
Public Class objAcceso
    Public menu As String
    Public id_sub_menu As Integer
    Public sub_menu As String
    Public id_usuario As Integer
    Public usuario As String
    Public acceso As Boolean
End Class
Public Class objUsuario
    Public id_usuario
    Public nombre_usuario
    Public nombrecompleto_usuario
    Public email_usuario
    Public id_scoi
    Public notificaciones
    Public foto
End Class
Public Class objSubmenus
    Public id As Integer
    Public sub_menu As String
    Public id_menu As Integer
    Public menu As String
End Class
Public Class Usuario_seleccion_cambios
    Public folio As Integer
    Public id_scoi As Integer
    Public foto As String
    Public nombre As String
    Public nombre_completo As String
    Public correo As String
End Class