Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class preguntasServ
    Inherits System.Web.Services.WebService

    '  Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=localhost;Integrated Security=SSPI;"
    Dim conexion As New objConexionSQL

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim dr As SqlDataReader
    'esta funcion crea la conexion para guardar o actualizar los datos
    <WebMethod>
    Public Function guardar_datos(ByVal folio_pregunta, ByVal pregunta, ByVal estatus, ByVal pertenece)

        Dim sql_Guardar As New SqlCommand("INSERT INTO dbPreguntas(pregunta,estatus,pertenece) VALUES ('" & pregunta & "', " & estatus & ",'" & pertenece & "')", objConexion)
        Dim sql_Actualizar As New SqlCommand(" UPDATE dbPreguntas SET pregunta='" & pregunta & "' , estatus=" & estatus & ", pertenece= '" & pertenece & "'  where folio_pregunta=" & folio_pregunta, objConexion)
        Dim sql_Buscar As New SqlCommand("SELECT * FROM dbPreguntas WHERE folio_pregunta= " & folio_pregunta, objConexion)
        Try
            'revisamos si esta el folio en la base de datos si no esta lo crea y guarda
            objConexion.Open()
        dr = sql_Buscar.ExecuteReader
            If dr.Read Then
                dr.Close()
                sql_Actualizar.ExecuteReader()
                objConexion.Close()
            Else
                dr.Close()
                sql_Guardar.ExecuteReader()
                objConexion.Close()
            End If
            objConexion.Close()

        Catch ex As Exception
        End Try
        Return folio_pregunta
    End Function
    'checa el ultimo folio y retorna mas uno
    <WebMethod>
    Public Function checar_ultimo_folio()
        Dim ultimo_folio = 1
        Dim sentencia = "select Max(folio_pregunta)+1 from dbPreguntas"
        Dim comando = New SqlCommand(sentencia, objConexion)
        Try
            'checamos el ultimo folio y agregamos el valor al folio nuevo
            objConexion.Open()
        dr = comando.ExecuteReader
        If dr.Read Then
            ultimo_folio = dr.GetValue(0)
        End If
            dr.Close()
        Catch ex As Exception
        End Try
        Return ultimo_folio
    End Function

    <WebMethod>
    Public Function obtener_preguntas()
        'creamos una lista
        Dim lista As New Collection
        'sentencias SQL
        Dim sentencia = "select * from dbPreguntas"
        Dim comando = New SqlCommand(sentencia, objConexion)
        Try
            'ejecutamos el lector de datos
            objConexion.Open()
        dr = comando.ExecuteReader
        'checamos si hay filas leidas
        If dr.HasRows Then
            'mientras tenga columnas de datos los leera
            While dr.Read
                'creamos el objeto que contendra los datos
                Dim preg As New objPreguntas
                'asignamos los valores a los datos
                preg.folio_pregunta = dr.Item("folio_pregunta")
                preg.pregunta = dr.Item("pregunta")
                preg.estatus = dr.Item("estatus")
                preg.pertenece = dr.Item("pertenece")
                'agregamos las preguntas a la lista
                lista.Add(preg)
            End While
            dr.Close()
        End If
            objConexion.Close()

        Catch ex As Exception
        End Try
        Return lista
    End Function

    <WebMethod>
    Public Function obtener_preguntas_por_folio(folio)
        'creamos una lista
        Dim lista As New Collection
        'sentencias SQL
        Dim sentencia = "select * from dbPreguntas where folio_pregunta=" & folio
        Dim comando = New SqlCommand(sentencia, objConexion)
        Try
            'ejecutamos el lector de datos
            objConexion.Open()
        dr = comando.ExecuteReader
        'checamos si hay filas leidas
        If dr.HasRows Then
            'mientras tenga columnas de datos los leera
            While dr.Read
                'creamos el objeto que contendra los datos
                Dim preg As New objPreguntas
                'asignamos los valores a los datos
                preg.folio_pregunta = dr.Item("folio_pregunta")
                preg.pregunta = dr.Item("pregunta")
                preg.estatus = dr.Item("estatus")
                preg.pertenece = dr.Item("pertenece")
                'agregamos las preguntas a la lista
                lista.Add(preg)
            End While
            dr.Close()
        End If
            objConexion.Close()

        Catch ex As Exception
        End Try
        Return lista
    End Function

    <WebMethod>
    Public Function obtener_areas()
        Dim lista As New Collection
        Dim comando = "select aspecto from aspectos"
        Dim aspecto = ""
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
            While dr.Read
                aspecto = dr.Item("aspecto")
                lista.Add(aspecto)
            End While
        End If
        dr.Close()
            objConexion.Close()

        Catch ex As Exception
        End Try
        Return lista
    End Function


End Class
