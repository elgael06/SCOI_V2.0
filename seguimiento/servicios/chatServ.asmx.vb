Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel

Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService()>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class chatServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'nuevas conexiones
    'Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=" & conexion.host & ";Integrated Security=SSPI;"


    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    'envia los datos a la base de datos 
    <WebMethod()>
    Public Function enviar_mensajes_chat(ByVal emisor, ByVal reseptor, ByVal fecha, ByVal hora, ByVal mensaje, ByVal clave_chat)
        Dim guardar = "INSERT INTO chat_tabla(emisor_chat,reseptor_chat,fecha_chat,hora_chat,mensaje_chat, clave_chat) VALUES (" & emisor & "," & reseptor & ",'" & fecha & "','" & hora & "','" & mensaje & "','" & clave_chat & "')"
        Dim SQL_guardar As New SqlCommand(guardar, objConexion)
        Try
            'guardamos los nuevos
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try
        Return True
    End Function
    'lee los datos de la base de datos siempre y cuando estos no esten ya leidos por el usuario
    <WebMethod()>
    Public Function leer_mensaje(ByVal emisor, ByVal reseptor, ByVal clave_chat, ByVal ultimo_Folio)
        'variables a usar
        Dim lista As New Collection
        Dim buscar = "select * from  chat_tabla where clave_chat='" & clave_chat & "' and folio >" & ultimo_Folio & " and  leido=0"
        Dim SQL_buscar As New SqlCommand(buscar, objConexion)
        'checamos el ultimo folio de mensaje
        Dim sentencia = "select Max(folio) from chat_tabla"
        Dim comando = New SqlCommand(sentencia, objConexion)

        objConexion.Open()
        'ejecutamos el reader
        dr = comando.ExecuteReader

        'checamos si el reader regreso un dato
        'If dr.Read > ultimo_Folio Then
        dr.Close()
        objConexion.Close()
        'si hay un nuevo folio se revisa los datos de este
        'abbrimos conexion
        objConexion.Open()
        'ejecutamos el reader
        dr = SQL_buscar.ExecuteReader
        'checamos si hay filas
        If dr.HasRows Then
            'recorremos las filas
            While dr.Read
                'creamos un objeto que guarde los datos
                Dim chat As New objChat
                'llenamos el objet
                chat.folio = dr.Item("folio")
                chat.mensaje_chat = dr.Item("mensaje_chat")
                chat.hora_chat = dr.Item("hora_chat")
                chat.emisor_chat = dr.Item("emisor_chat")
                chat.reseptor_chat = dr.Item("reseptor_chat")
                chat.clave_chat = dr.Item("clave_chat")
                'actualizamos el status de leido
                'mensaje_leido(chat.folio)
                'agregamos el objeto a una lista
                lista.Add(chat)
            End While
        ElseIf lista.Count = 0 Then
            Dim chat As New objChat
            chat.folio = 0
            chat.mensaje_chat = ""
            chat.hora_chat = ""
            chat.emisor_chat = emisor
            chat.reseptor_chat = 0
            chat.clave_chat = clave_chat
            lista.Add(chat)
        End If
        dr.Close()
        objConexion.Close()
        ' End If
        Return lista
    End Function
    'cambia el estatus de leido
    <WebMethod()>
    Public Sub mensaje_leido(ByVal ultimo_folio)
        Dim buscar = "update chat_tabla set leido=1 where folio=" & ultimo_folio
        Dim SQL_cambio As New SqlCommand(buscar, objConexion)

        If ultimo_folio > 0 Then
            SQL_cambio.ExecuteNonQuery()
        End If
    End Sub
    <WebMethod()>
    Public Function obtenerultimo_folio_chat(ByVal folio)
        Dim ultimo_folio = 0
        'checamos el ultimo folio de mensaje
        Dim sentencia = "select Max(folio) from chat_tabla  where	clave_chat='" & folio & "'"
        Dim comando = New SqlCommand(sentencia, objConexion)
        Try
            objConexion.Open()
            'ejecutamos el reader
            dr = comando.ExecuteReader
            dr.Read()
            ultimo_folio = dr.GetValue(0)
            'checamos si el reader regreso un dato
            'If dr.Read > ultimo_Folio Then

        Catch
            Return 0
        End Try
        dr.Close()
        objConexion.Close()

        Return ultimo_folio
    End Function

End Class

Public Class objChat
    Public folio As Int32
    Public emisor_chat As Int32
    Public reseptor_chat As Int32
    Public fecha_chat As String
    Public hora_chat As String
    Public mensaje_chat As String
    Public leido As Int16
    Public clave_chat As String

End Class