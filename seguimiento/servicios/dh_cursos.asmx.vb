Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.IO

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class dh_cursos
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'nuevas conexiones

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_izagar As New SqlConnection(conexion.conexion_izagar)
    Dim dr As SqlDataReader
    Dim dt As DataTable

    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hola a todos"
    End Function
    <WebMethod()>
    Public Function dh_cursos_guardar_actualizar(id_curso, nombre, estatus, puesto, imagen, nombre_pertenece)
        Dim comando = "dh_cursos_guardar_actualizar " & id_curso & ",'" & nombre & "' ,'" & estatus & "'," & puesto & ",'" & imagen & "','" & nombre_pertenece & "'"
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_comando.ExecuteReader
            While dr.Read
                Return dr(0)
            End While
            dr.Close()
            objConexion.Close()
        Catch ex As Exception
            Return ex
        End Try

        Return "Guardado"
    End Function
    <WebMethod()>
    Public Function Obtener_ultimo_folio()
        Dim folio As Integer
        Dim comando = "select top(1)id_curso from dh_cursos order by id_curso desc"
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Return dr.GetValue(0)
                End While
            End If
        Catch ex As Exception
            Return ex
        End Try
        Return folio
    End Function
    <WebMethod()>
    Public Function obtener_datos_cursos()
        Dim lista As New Collection
        Dim comando = "select id_curso,nombre_curso,estatus,puesto_pertenece,nombre_pertenece from dh_cursos"
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim curso As New objCurso
                    curso.id_curso = dr.Item("id_curso")
                    curso.nombre_curso = dr.Item("nombre_curso")
                    curso.estatus = dr.Item("estatus")
                    curso.puesto_pertenece = dr.Item("puesto_pertenece")
                    curso.nombre_pertenece = dr.Item("nombre_pertenece")
                    lista.Add(curso)
                End While
            End If
        Catch ex As Exception

        End Try

        Return lista
    End Function
    <WebMethod()>
    Public Function obtener_imagen_cursos(id)
        Dim curso As New objCurso
        Dim comando = "select imagen from dh_cursos where id_curso=" & id
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    curso.imagen = dr.Item("imagen")
                End While
            End If
        Catch ex As Exception

        End Try

        Return curso
    End Function
    <WebMethod()>
    Public Function obtener_datos_cursos_folio(folio)
        Dim comando = "select * from dh_cursos where id_curso=" & folio
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Dim curso As New objCurso
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader

            If dr.HasRows Then
                While dr.Read
                    curso.id_curso = dr.Item("id_curso")
                    curso.nombre_curso = dr.Item("nombre_curso")
                    curso.estatus = dr.Item("estatus")
                    curso.puesto_pertenece = dr.Item("puesto_pertenece")
                    curso.imagen = dr.Item("imagen")
                    curso.nombre_pertenece = dr.Item("nombre_pertenece")
                End While
            End If
        Catch ex As Exception

        End Try

        Return curso
    End Function


    <WebMethod()>
    Public Function obtener_puestos()
        Dim comando = "select * from tb_puesto"
        Dim lista As New Collection
        Dim SQL_consulta As New SqlCommand(comando, objConexion_izagar)
        Try
            objConexion_izagar.Open()
            dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim puesto As New objPuestos
                    puesto.folio_puesto = dr.Item("folio")
                    puesto.nombre_puesto = dr.Item("nombre")
                    puesto.abreviatura_puesto = dr.Item("abreviatura")
                    puesto.estatus_puesto = dr.Item("status")
                    lista.Add(puesto)
                End While
            End If
            dr.Close()
            objConexion_izagar.Close()
        Catch
            Return comando
        End Try

        Return lista
    End Function
    '''''''''temas de curso
    <WebMethod()>
    Public Function Guardar_actualizar_temas_curso(folio_curso, tema, contenido, imagen, folio_orden, folio_empleado_scoi, tiempo_min, tiempo_max)
        Dim lista As New Collection
        Dim i = 0
        'recorremos los datos en los arreglos resibidos para enviarlos
        For Each posicion In folio_orden

            Dim comando = "Guardar_actualizar_temas_curso " & folio_curso & ",'" & tema(i) & "','" & contenido(i) & "','" & imagen(i) & "'," & posicion & "," & folio_empleado_scoi & ",'" & tiempo_min(i) & "','" & tiempo_max(i) & "'"

            Dim SQL_comando As New SqlCommand(comando, objConexion)

            Try
                objConexion.Open()
                SQL_comando.ExecuteNonQuery()
                objConexion.Close()

            Catch ex As Exception
                MsgBox(comando)
                Return ex
            End Try


            'incrementamos contador
            Dim datos = "{folio_curso:" & folio_curso & ",tema:'" & tema(i) & "',contenido:'" & contenido(i) & "',imagen:'" & imagen(i) & "',posicion:" & posicion & ",empleado:" & folio_empleado_scoi & ",t1:'" & tiempo_min(i) & "',t2:'" & tiempo_max(i) & "'}"
            lista.Add(comando)
            i += 1

        Next
        Return lista
    End Function
    <WebMethod()>
    Public Function obtener_datos_temas_folio(folio)
        Dim lista As New Collection
        Dim comando = "dh_temas_mostrar_guardados " & folio
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim tema As New objTema
                    tema.nombre = dr.Item("tema")
                    tema.contenido = dr.Item("contenido")
                    tema.imagen = dr.Item("imagen")
                    tema.folio_orden = dr.Item("folio_orden")
                    tema.usuario = dr.Item("usuario")
                    tema.fecha = dr.Item("fecha")
                    tema.tiempo_min = dr.Item("tiempo_min")
                    tema.tiempo_max = dr.Item("tiempo_max")
                    'Dim imageBuffer As Byte() = DirectCast(dr.Item("imagen"), Byte())
                    tema.imagen = dr.Item("imagen")
                    lista.Add(tema)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch ex As Exception

        End Try

        Return lista
    End Function

    <WebMethod()>
    Public Function obtener_imagen(folio_curso, folio_orden)
        Dim imagen As String = ""
        Dim comando As String = "select imagen from dh_temas_curso where folio_curso=" & folio_curso & " and folio_orden=" & folio_orden
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader

            If dr.HasRows Then
                While dr.Read
                    imagen = dr.Item("imagen")
                End While
            End If

            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return imagen
    End Function
    <WebMethod>
    Public Sub Guardar_cuestionarios_cursos(id_curso, nombre, preguntas, respuestas, tipo)
        Dim i = 0
        Try
            For Each pregunta In preguntas

                Dim comando = "insert into dh_curso_cuestionarios values(" & id_curso & ",'" & nombre & "','" & pregunta & "','" & respuestas(i) & "','" & tipo & "')"
                Dim SQL_comando As New SqlCommand(comando, objConexion)
                objConexion.Open()
                SQL_comando.ExecuteNonQuery()
                objConexion.Close()
                i += 1
            Next
        Catch
        End Try
    End Sub
    <WebMethod>
    Public Sub Eliminar_cuestionarios_cursos(id_curso)
        Dim comando = "delete dh_curso_cuestionarios where id_curso=" & id_curso
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_comando.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try
    End Sub
    <WebMethod>
    Public Function obtener_cuestionarios_cursos(id_curso)
        Dim lista As New Collection

        Dim comando = "select * from dh_curso_cuestionarios where id_curso=" & id_curso
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_comando.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim cuestionario As New objCuestionario

                    cuestionario.id_curso = dr.Item("id_curso")
                    cuestionario.nombre = dr.Item("nombre")
                    cuestionario.tipo = dr.Item("tipo")
                    cuestionario.preguntas = dr.Item("pregunta")
                    cuestionario.respuestas = dr.Item("respuesta")

                    lista.Add(cuestionario)

                End While
            End If

            dr.Close()
            objConexion.Close()
        Catch
        End Try

        Return lista
    End Function

    <WebMethod>
    Function guardar_cuestionarios_resueltos(id_curso, pregunta, opcion, r, usuario, valor, total_porcentual)
        Dim comando = "insert into dh_cursos_cuestionarios_resueltos values( " & id_curso & ",'" & pregunta & "' ,'" & opcion & "','" & r & "'," & usuario & "," & valor & "," & total_porcentual & ", GETDATE() )"

        Try
            Dim SQL_comando As New SqlCommand(comando, objConexion)
            objConexion.Open()
            SQL_comando.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try

        Return True
    End Function
    <WebMethod>
    Function dh_cursos_evaluacion_temas(id_curso, id_usuario, puntuacion, descrpcion)
        Dim comando = " insert into dh_cursos_evaluacion_temas values(" & id_curso & "," & id_usuario & " ," & puntuacion & ",'" & descrpcion & "', GETDATE() )"

        Try
            Dim SQL_comando As New SqlCommand(comando, objConexion)
            objConexion.Open()
            SQL_comando.ExecuteNonQuery()
            objConexion.Close()
        Catch
            Return False
        End Try

        Return True
    End Function
    <WebMethod()>
    Public Function actualizar_estatus_curso(folio, d_cuestionario, d_tema, estatus_curso, calificacion)
        Dim comando = " update dh_cursos_asignacion_a_usuario 
                       set estatus='" & estatus_curso & "'
					    , fecha_aplicacion=getdate()
					    , duracion_tema='" & d_tema & "'
					    , duracion_cuestionario='" & d_cuestionario & "'
					    , calificacion = " & calificacion &
                     "where folio= " & folio
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_consulta.ExecuteNonQuery()
            objConexion.Close()
        Catch

        End Try


        Return True
    End Function

    <WebMethod>
    Function dh_cursos_estados_vista_ususarios(id_usuario)
        Dim lista As New Collection
        Dim comando = "dh_cursos_estados_vista_ususarios " & id_usuario
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_comando.ExecuteReader
            If dr.HasRows Then

                While dr.Read
                    Dim datos As New objCursoAsignado

                    datos.folio = dr.Item("folio")
                    datos.id_usuario = dr.Item("id_usuario")
                    datos.nombre_usuario = dr.Item("nombre_usuario")
                    datos.estatus_curso = dr.Item("estatus_curso")
                    datos.obs_estado = dr.Item("obs_estado")
                    datos.id_curso = dr.Item("id_curso")
                    datos.nombre_curso = dr.Item("nombre_curso")
                    datos.f1 = dr.Item("f1")
                    datos.f2 = dr.Item("f2")
                    datos.f_aplico = dr.Item("f_aplico")
                    datos.d_tema = dr.Item("d_tema")
                    datos.d_cuestionario = dr.Item("d_cuestionario")
                    datos.calificacion = dr.Item("calificacion")

                    lista.Add(datos)

                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch

        End Try



        Return lista
    End Function
    <WebMethod>
    Function dh_cursos_estados_vista(id_curso)
        Dim lista As New Collection
        Dim comando = "dh_cursos_estados_vista " & id_curso
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_comando.ExecuteReader
            If dr.HasRows Then

                While dr.Read
                    Dim datos As New objCursoAsignado

                    datos.folio = dr.Item("folio")
                    datos.id_usuario = dr.Item("id_usuario")
                    datos.nombre_usuario = dr.Item("nombre_usuario")
                    datos.estatus_curso = dr.Item("estatus_curso")
                    datos.obs_estado = dr.Item("obs_estado")
                    datos.id_curso = dr.Item("id_curso")
                    datos.nombre_curso = dr.Item("nombre_curso")
                    datos.f1 = dr.Item("f1")
                    datos.f2 = dr.Item("f2")
                    datos.f_aplico = dr.Item("f_aplico")
                    datos.d_tema = dr.Item("d_tema")
                    datos.d_cuestionario = dr.Item("d_cuestionario")
                    datos.calificacion = dr.Item("calificacion")

                    lista.Add(datos)

                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch

        End Try


        Return lista
    End Function
    <WebMethod>
    Function dh_asignar_curso_a_usuario(id_usuario, id_curso, f1, f2)
        Dim acceso As Integer = 0
        Dim comando = "dh_asignar_curso_a_usuario " & id_usuario & "," & id_curso & ",'" & f1 & "','" & f2 & "'"
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            dr = SQL_comando.ExecuteReader
            If dr.HasRows Then
                dr.Read()
                acceso = dr.Item("acceso")
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try

        Return acceso
    End Function

End Class

Public Class objCurso
    Public id_curso
    Public nombre_curso
    Public estatus
    Public puesto_pertenece
    Public imagen = ""
    Public nombre_pertenece = ""
End Class
Public Class objPuestos
    Public folio_puesto
    Public nombre_puesto
    Public abreviatura_puesto
    Public estatus_puesto
End Class
Public Class objTema
    Public nombre
    Public contenido
    Public imagen
    Public folio_orden
    Public usuario
    Public fecha
    Public tiempo_min
    Public tiempo_max
End Class
Public Class objCuestionario
    Public id_curso
    Public nombre
    Public preguntas
    Public respuestas
    Public tipo
End Class
Class objCursoAsignado
    Public folio
    Public id_usuario
    Public nombre_usuario
    Public estatus_curso
    Public obs_estado
    Public id_curso
    Public nombre_curso
    Public f1 As String
    Public f2 As String
    Public f_aplico As String
    Public d_tema As String
    Public d_cuestionario As String
    Public calificacion
End Class