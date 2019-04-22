Imports System.Web.Services
Imports System.Data.SqlClient
Imports System.IO
Imports System.Data
Imports System.Web.Services.Protocols
Imports System.ComponentModel

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService()>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class cuestionsrioServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'nuevas conexiones
    ' Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=" & conexion.host & ";Integrated Security=SSPI;"

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    'en esta funcuin se obtiene los datos enviados de script ajax con los datos de cada celda de la tabla tabla_preguntas_cuest de cuestionarios 
    <WebMethod()>
    Public Sub getCuestionario(ByVal orden, ByVal Cuestionario, ByVal pregunta, ByVal ponderacion)
        'creamos el comando para insertar datos a base de datos
        Dim comando As String = "INSERT INTO menu_Cuestionarios(orden, folio_cuestiono, folio_preguntas, ponderacion) VALUES (" & orden & ", " & Cuestionario & ", (select folio_pregunta from dbPreguntas where pregunta='" & pregunta & "'), " & ponderacion & ")"
        Try
            objConexion.Open() 'abrimos conexion a base de datos
        Dim sql_Guardar As New SqlCommand(comando, objConexion) 'insertar datos a base de datos menu_Cuestionarios
        sql_Guardar.ExecuteNonQuery() ''''''''''''''''''''''''''''''
            objConexion.Close()

        Catch ex As Exception
        End Try
    End Sub

    <WebMethod()>
    Public Function deleteCuestionario(ByVal orden, ByVal folio) As String
        Dim comando As String = "delete from menu_cuestionarios where orden =" & orden & " and folio_cuestiono=" & folio
        Dim sql_removerMenu As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
        sql_removerMenu.ExecuteNonQuery()
        objConexion.Close()
            'MsgBox(comando)

        Catch ex As Exception
        End Try
        Return "listo"
    End Function

    <WebMethod()>
    Public Sub deleteCuestionarioAll(ByVal folio)

        Dim comando As String = "delete from menu_cuestionarios where folio_cuestiono =" & folio
        Dim sql_removerMenu As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
        sql_removerMenu.ExecuteNonQuery()
        objConexion.Close()

        Catch ex As Exception
        End Try
    End Sub


    <WebMethod()>
    Public Function guardar_foilo_cuestionario(ByVal folio, ByVal nom_cuestionario, ByVal estatus)

        'inicializamos la lista
        Dim lista As New Collection

        'comandos sql
        Dim sql_Guardar As New SqlCommand("INSERT INTO dbCuestionarios(Nom_Cuestionario,estatus) VALUES ('" & nom_cuestionario & "', " & estatus & ")", objConexion)
        Dim sql_Actualizar As New SqlCommand(" UPDATE dbCuestionarios SET Nom_Cuestionario='" & nom_cuestionario & "' , estatus=" & estatus & " where folio=" & folio, objConexion)
        Dim sql_Buscar As New SqlCommand("SELECT folio FROM dbCuestionarios where folio= " & folio, objConexion)
        Dim sql_mostrar_Guardado As New SqlCommand("SELECT folio FROM dbCuestionarios where Nom_Cuestionario= '" & nom_cuestionario & "'", objConexion)

        Try
            'llamamos al objeto cuestionario
            Dim cuestionario As New objCuestionarios
            objConexion.Open()
            'revisa si el folio se encuentra en la base de datos
            dr = sql_Buscar.ExecuteReader
            If dr.Read Then
                dr.Close()
                'si se encuentra lo actualiza
                sql_Actualizar.ExecuteNonQuery()
                objConexion.Close()

            Else 'de lo contrario guarda como nuevo folio
                dr.Close()

                sql_Guardar.ExecuteNonQuery()
                objConexion.Close()

            End If

            'buscamos y agregamos el folio al texto del folio
            objConexion.Open()
            dr = sql_mostrar_Guardado.ExecuteReader
            dr.Read()

            'agregamos los datos al objeto
            cuestionario.folio = dr.GetValue(0)
            cuestionario.nom_cuestionario = dr.GetValue(1)
            cuestionario.estatus = dr.GetValue(2)

            'cerramos las conexiones
            dr.Close()
            objConexion.Close()

            'agregamos el cuestionario a la lista
            lista.Add(cuestionario)

            objConexion.Close()
        Catch

        End Try


        Return lista
    End Function

    <WebMethod()>
    Public Function nuevo_cuestionario()
        Dim lista As New Collection

        Dim cuestionario As New objCuestionarios

        Dim sentencia = "select Max(folio)+1 from dbCuestionarios"
        Dim comando = New SqlCommand(sentencia, objConexion)
        Try
            objConexion.Open()
        'ejecutamos el reader
        dr = comando.ExecuteReader

        'checamos si el reader regreso un dato
        If dr.HasRows Then
            While dr.Read
                'asignamos el folio al cuestionario
                cuestionario.folio = dr.GetValue(0)
            End While
        Else
            cuestionario.folio = 1
        End If
        lista.Add(cuestionario)
        'cerramos conexion
        dr.Close()
        objConexion.Close()

        Catch ex As Exception
        End Try
        Return lista
    End Function

    <WebMethod()>
    Public Sub ConexionCuestionarios(ByVal cuestionarios() As Object)
        ' Write("<script type='text/javascript'> console.log('listo');</script>")
        'For Each puntos In cuestionarios
        'Write("<script type='text/javascript'> console.log('" & puntos.orden & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.Cuestionario & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.pregunta & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.ponderacion & "');</script>")

        For Each d In cuestionarios
            MsgBox(cuestionarios(d).orden & cuestionarios(d).Cuestionario & cuestionarios(d).pregunta & cuestionarios(d).ponderacion)
        Next

    End Sub

    <WebMethod()>
    Public Function ConexionCuestionarios2(ByVal cuestionarios()) As Object
        ' Write("<script type='text/javascript'> console.log('listo');</script>")
        'For Each puntos In cuestionarios
        'Write("<script type='text/javascript'> console.log('" & puntos.orden & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.Cuestionario & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.pregunta & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.ponderacion & "');</script>")


        'Next

        Return True
    End Function
    <WebMethod()>
    Public Function ConexionCuestionarios3(ByVal cuestionarios() As Object) As String
        ' Write("<script type='text/javascript'> console.log('listo');</script>")
        'For Each puntos In cuestionarios
        'Write("<script type='text/javascript'> console.log('" & puntos.orden & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.Cuestionario & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.pregunta & "');</script>")
        'Write("<script type='text/javascript'> console.log('" & puntos.ponderacion & "');</script>")


        'Next

        Return True
    End Function

    <WebMethod>
    Public Function nombres_cuestionarios_por_folio(ByVal folio)
        Dim SQL_buscar As New SqlCommand("Select * FROM [dbCuestionarios] where folio=" & folio, objConexion)
        Dim nombre As String = ""
        Dim estatus As String =""


        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                dr.Read()
                nombre = dr.Item("nom_cuestionario")
                estatus = dr.Item("estatus")
            End If

            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return {nombre, estatus}
    End Function



End Class