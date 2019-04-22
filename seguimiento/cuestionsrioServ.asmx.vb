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
    Dim Conexion As String = "Data Source=localhost;Initial Catalog=seguimiento_2;Persist Security Info=True;User ID=sa;Password=Ragazi/*-1"
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(Conexion)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    'en esta funcuin se obtiene los datos enviados de script ajax con los datos de cada celda de la tabla tabla_preguntas_cuest de cuestionarios 
    <WebMethod()>
    Public Function getCuestionario(ByVal orden As String, ByVal Cuestionario As String, ByVal pregunta As String, ByVal ponderacion As String) As String
        Dim folio_pregunta As Integer


        'consultar si cuestionario esta en base de datos
        Dim sql_BuscarCuest As New SqlCommand("SELECT folio FROM dbCuestionarios WHERE folio= " & Cuestionario, objConexion)
        Dim sql_BuscarPreg As New SqlCommand("select * from dbPreguntas where pregunta='" & pregunta & "'", objConexion)

        Try
            objConexion.Open() 'abrimos conexion a base de datos
            dr = sql_BuscarCuest.ExecuteReader 'executamos el comando para ver si existe el filo en la base de datos 
            If dr.Read Then ' revisamos si tiene algun valor
                dr.Close() 'cerramos conexion de busqueda de cuestionario

                dr = sql_BuscarPreg.ExecuteReader 'ejecutamos la busqueda en la bd preguntas
                'MsgBox("folio_pregunta" & pregunta)
                dr.Read()
                ' MsgBox(dr.GetSqlInt32(0))
                folio_pregunta = dr.Item("folio_pregunta") 'asignamos el valor del folio pregunta a una variable.
                dr.Close() 'cerramos conexion de

                Dim sql_removerMenu1 As New SqlCommand("delete from menu_cuestionarios where folio_cuestiono =" & Cuestionario & " and  orden > =" & orden, objConexion)
                Dim sql_removerMenu2 As New SqlCommand("delete from menu_cuestionarios where folio_cuestiono =" & Cuestionario & " AND folio_preguntas=" & folio_pregunta & " and  orden > =" & orden, objConexion)
                sql_removerMenu1.ExecuteNonQuery() 'removenos los datos existentes del cuestionario 
                objConexion.Close()


                objConexion.Open() 'abrimos conexion a base de datos
                'creamos el comando para insertar datos a base de datos
                Dim comando As String = "INSERT INTO menu_Cuestionarios(orden, folio_cuestiono, folio_preguntas, ponderacion) VALUES (" & orden & ", " & Cuestionario & ", " & folio_pregunta & ", " & ponderacion & ")"

                Dim sql_Guardar As New SqlCommand(comando, objConexion) 'insertar datos a base de datos menu_Cuestionarios
                sql_Guardar.ExecuteNonQuery() ''''''''''''''''''''''''''''''
                objConexion.Close()
                ' Write("<script type='text/javascript'> console.log(' este es el comando a usar: ," & comando & "');</script>")


                Return comando
            Else
                MsgBox("guarde el cuestionario antes de colocarle preguntas.")

                objConexion.Close()
                Return False
                objConexion.Close()
            End If
        Catch
            Write("<script type='text/javascript'> alert('¡¡ERROR AL AGREGAR:" & Cuestionario & " !!')</script>")
        End Try



    End Function

    <WebMethod()>
    Public Function deleteCuestionario(ByVal orden, ByVal folio) As String
        Dim comando As String = "delete from menu_cuestionarios where orden =" & orden & " and folio_cuestiono=" & folio
        Dim sql_removerMenu As New SqlCommand(comando, objConexion)
        objConexion.Open()
        sql_removerMenu.ExecuteNonQuery()
        objConexion.Close()
        'MsgBox(comando)

        Return "listo"
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

End Class