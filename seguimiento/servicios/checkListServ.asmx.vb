Imports System.Web.Services
Imports System.Data.SqlClient
Imports System.IO
Imports System.Data
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Web.Script.Serialization

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService()>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class checkListServ
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'nuevas conexiones
    'Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=" & conexion.host & ";Integrated Security=SSPI;"

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_scoi As New SqlConnection(conexion.conexion_izagar )
    Dim dr As SqlDataReader
    Dim dt As DataTable


    <WebMethod()>
    Public Function guardar_datos(ByVal sucursal, ByVal fecha, ByVal zona, ByVal criterio, ByVal respuesta, ByVal datos_pregunta, ByVal observaciones, ByVal aplicador)
        'variable 
        Dim SQL_buscar As New SqlCommand("guardar_datos_check_list  " & sucursal & ",'" & fecha & "'," & zona & "," & criterio & "," & respuesta & ",'" & datos_pregunta & "','" & observaciones & "','" & aplicador & "'", objConexion)
        Try
            'conexion
            objConexion.Open()
            SQL_buscar.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try
        'CREAMOS UNA VARIABLE QUE RETORNA LOS DATOS
        Dim datos As Array = {sucursal, fecha, zona, criterio, respuesta, observaciones, aplicador}
        Return datos
    End Function
    <WebMethod()>
    Public Function guardar_datos_2(sucursal, fecha, zona, criterio, respuestas, observaciones, aplicador, datos_pregunta,encargado)
        Dim pos = 0
            For Each item In respuestas
                'variable 
                Dim SQL_buscar As New SqlCommand("[guardar_datos_check_list]  " & sucursal & ",'" & fecha & "'," & zona & "," & criterio(pos) & "," & respuestas(pos) & ",'" & datos_pregunta(pos) & "','" & observaciones & "','" & aplicador & "'" & ",'" & encargado & "'", objConexion)

                'conexion
                objConexion.Open()
                SQL_buscar.ExecuteNonQuery()
                objConexion.Close()
                pos += 1
            Next
        Return pos
    End Function
     <WebMethod()>
     Public Function guardar_datos_3(sucursal, fecha, zona, criterio, respuestas, observaciones, aplicador, datos_pregunta,encargado)
        Dim pos = 0
        Try
            For Each item In respuestas
                'variable 
                Dim SQL_buscar As New SqlCommand("guardar_datos_check_list_3  " & sucursal & ",'" & fecha & "'," & zona & "," & criterio(pos) & "," & respuestas(pos) & ",'" & datos_pregunta(pos) & "','" & observaciones & "'," & aplicador &  ",'" & encargado & "'", objConexion)

                'conexion
                objConexion.Open()
                SQL_buscar.ExecuteNonQuery()
                objConexion.Close()
                pos += 1
            Next
            Catch
            End Try
        Return pos
    End Function
    <WebMethod()>
    Public Function guardar_menu(ByVal folio_sucursal, ByVal fecha, ByVal zona, ByVal aplicador, ByVal duracion)
        ' Dim SQL_guardar As New SqlCommand("INSERT INTO check_list_menu(folio_sucursal,fecha,zona_inspeccion,total_preguntas,resultado,duracion) VALUES('" & folio_sucursal & "','" & fecha & "'," & zona & "," & total_preguntas & ",'" & resultado & "', '" & duracion & "')", objConexion)
        Dim SQL_borrar As New SqlCommand("DELETE FROM check_list_menu  WHERE folio_sucursal=" & folio_sucursal & " and  fecha='" & fecha & "'  and zona_inspeccion=" & zona, objConexion)
        Dim cont_limpieza = 0, cont_surtido = 0, cont_imagen = 0
        Dim suma_limpieza = 0, suma_surtido = 0, suma_imagen = 0
        Dim pregunta_folio As Integer
        Dim pregunta_orden As Integer
        Dim resultado_lim = 0.0, resultado_surt = 0.0, resultado_imag = 0.0
        Dim respuesta As Integer
        Dim usuario As Integer
        Try
            'camviar nombre por clave de usuario
            Dim SQL_aplicador As New SqlCommand("select id_usuario from usuarios where nombre_usuario='" & aplicador & "'", objConexion)
            objConexion.Open()
            dr = SQL_aplicador.ExecuteReader
            If dr.HasRows Then
                dr.Read()
                usuario = dr.Item("id_usuario")
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        'checamos check-list resuelto por zona **********************************************************************************************************
        Dim SQL_ckl As New SqlCommand("select * from check_list_mejora_continua where fecha='" & fecha & "' and zona_inspeccion=" & zona & " and folio_sucursal=" & folio_sucursal, objConexion)
        Dim ckl_lista As New Collection
        Try
            objConexion.Open()
            dr = SQL_ckl.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim ckl As New objCheckList
                    ckl.folio_sucursal = dr.Item("folio_sucursal")
                    ckl.fecha = dr.Item("fecha")
                    ckl.zona_inspeccion = dr.Item("zona_inspeccion")
                    ckl.criterio_cuestion = dr.Item("criterio_cuestion")
                    ckl.respuesta = dr.Item("respuesta")
                    ckl_lista.Add(ckl)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Try
            'recorremos los datos en el check-list>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            For Each dato In ckl_lista
                'asignamos el valor del orden de la pregunta
                pregunta_orden = dato.criterio_cuestion
                respuesta = dato.respuesta
                'hacemos la conexion 
                'checamos los cuestionarios **********************************************************************************************************
                Dim SQL_cuestionarios As New SqlCommand("select folio_preguntas from menu_Cuestionarios where folio_cuestiono =" & zona & " and orden=" & pregunta_orden, objConexion)
                objConexion.Open()
                dr = SQL_cuestionarios.ExecuteReader
                'revisamos si hay un resultado
                If dr.HasRows Then
                    'leemos el resultado
                    dr.Read()
                    'asignamos el resultado
                    pregunta_folio = dr.Item("folio_preguntas")
                End If
                'cerramos las conexiones
                dr.Close()
                objConexion.Close()
                'checamos si las respuesta es si o no (1,0)
                If respuesta < 2 Then
                    'preguntas********************************************************************************************************************************
                    Dim SQL_buscarPregunas As New SqlCommand("SELECT pertenece FROM [dbPreguntas] where folio_pregunta=" & pregunta_folio, objConexion)
                    Dim pertenece As String
                    'creamos la conexion 
                    objConexion.Open()
                    dr = SQL_buscarPregunas.ExecuteReader
                    'checamos que tenga columnas
                    If dr.HasRows Then
                        'leemos cada columna
                        dr.Read()
                        pertenece = dr.Item("pertenece")
                        'checamos a cual pertenece y sumamos las respuesas
                        If pertenece = "LIMPIEZA" Then
                            cont_limpieza += 1
                            suma_limpieza += respuesta
                        ElseIf pertenece = "SURTIDO" Then
                            cont_surtido += 1
                            suma_surtido += respuesta
                        ElseIf pertenece = "IMAGEN" Then
                            cont_imagen += 1
                            suma_imagen += respuesta
                        End If
                    End If
                    dr.Close()
                    objConexion.Close()
                End If
            Next 'fin de recorrido
        Catch
        End Try
        'revisamos si los resultados son diferente de cero
        If suma_limpieza > 0 And cont_limpieza > 0 Then
            'creamos los resultados
            resultado_lim = (suma_limpieza / cont_limpieza) * 100

        End If
        If suma_surtido > 0 And cont_surtido > 0 Then
            resultado_surt = (suma_surtido / cont_surtido) * 100

        End If
        If suma_imagen > 0 And cont_imagen > 0 Then
            resultado_imag = (suma_imagen / cont_imagen) * 100

        End If
        'creamos los resultados
        Dim guardar = "insert into check_list_menu ( folio_sucursal,fecha,zona_inspeccion,limpieza,surtido,imagen,aplicador,duracion ) values" &
        "(" & folio_sucursal & ",'" & fecha & "'," & zona & "," & resultado_lim & "," & resultado_surt & "," & resultado_imag & "," & usuario & ",'" & duracion & "')"
        'creamos el objeto a guardar
        Dim SQL_guardar As New SqlCommand(guardar, objConexion)
        Try
            objConexion.Open()
            SQL_borrar.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try
        Try
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()
        Catch
        End Try
        Dim check_list_menu As New objCheckList_menu

        check_list_menu.folio_sucursal = folio_sucursal
        check_list_menu.fecha = fecha
        check_list_menu.zona = zona
        check_list_menu.limpieza = resultado_lim
        check_list_menu.surtido = resultado_surt
        check_list_menu.imagen = resultado_imag
        check_list_menu.aplicador = usuario
        check_list_menu.duracion = duracion

        Return {{resultado_lim}, {resultado_surt}, {resultado_imag}} 'check_list_menu
    End Function

    <WebMethod>
    Public Function asignar_tabla_cuestionarios(ByVal folio_cuestiono)
        Dim tabla As New Collection

        'buscamos en cuestionario por su folio
        Dim SQL_buscar_cuestionario As New SqlCommand("cuestionarios_preguntas  " & folio_cuestiono, objConexion)

        objConexion.Open()

        Try
            dr = SQL_buscar_cuestionario.ExecuteReader

            If dr.HasRows Then 'revisamos si tiene columnas
                While dr.Read 'leemos el resultado del comando
                    'llamamos a objeto
                    Dim cuestionario As New objCuestionario_menu
                    'asignamos valores a objCuestionario
                    cuestionario.orden = dr.Item("orden")
                    cuestionario.folio_cuestionario = dr.Item("id_cuestionario")
                    cuestionario.cuestionario = dr.Item("cuestionario")
                    cuestionario.folio_pregunta = dr.Item("id_pregunta")
                    cuestionario.pregunta = dr.Item("pregunta")
                    cuestionario.ponderacion = dr.Item("ponderacion")
                    cuestionario.area = dr.Item("area")
                    'agregamos el objeto al una lista
                    tabla.Add(cuestionario)
                End While

            End If
            dr.Close()
            objConexion.Close()
            'Dim SQL_buscar_pregunta As New SqlCommand("SELECT pregunta FROM dbPreguntas WHERE folio_pregunta='" & folio_pregunta & "'", objConexion
        Catch

        End Try
        Return tabla
    End Function

    <WebMethod>
    Public Function buscar_establecimiento()
        Dim lista As New Collection
        'buscamos en cuestionario por su folio
        Dim SQL_buscar_establecimiento As New SqlCommand("SELECT * FROM [establecimiento] ", objConexion)

        objConexion.Open()
        Try
            dr = SQL_buscar_establecimiento.ExecuteReader

            If dr.HasRows Then 'revisamos si tiene columnas
                While dr.Read 'leemos el resultado del comando
                    'llamamos a objeto
                    Dim est As New objEstablecimiento

                    est.id_establecimiento = dr.Item("id_establecimiento")
                    est.nombre_establecimiento = dr.Item("nombre_establecimiento")
                    lista.Add(est)
                End While
                dr.Close()
                objConexion.Close()
            End If
        Catch
        End Try
        Return lista
    End Function
    <WebMethod>
    Public Function buscar_establecimiento_por_folio(folio)
        Dim nombre As String = ""
        'buscamos en cuestionario por su folio
        Dim SQL_buscar_establecimiento As New SqlCommand("SELECT nombre_establecimiento FROM [establecimiento] where id_establecimiento=" & folio, objConexion)

        objConexion.Open()
        Try
            dr = SQL_buscar_establecimiento.ExecuteReader

            If dr.HasRows Then 'revisamos si tiene columnas
                dr.Read()
                nombre = dr.Item("nombre_establecimiento")
                dr.Close()
                objConexion.Close()
            End If
        Catch
        End Try
        Return nombre
    End Function

    <WebMethod>
    Public Function retornar_preguntas()
        Dim lista As New Collection
        Dim SQL_buscar As New SqlCommand("SELECT * FROM [dbPreguntas]", objConexion)
        Try

            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim preg As New objPreguntas
                    preg.folio_pregunta = dr.Item("folio_pregunta")
                    preg.pregunta = dr.Item("pregunta")
                    preg.estatus = dr.Item("estatus")
                    preg.pertenece = dr.Item("pertenece")
                    lista.Add(preg)
                End While

            End If

            dr.Close()
            objConexion.Close()
        Catch
        End Try

        Return lista
    End Function

    <WebMethod>
    Public Function nombres_cuestionarios()
        Dim lista As New Collection
        Dim SQL_buscar As New SqlCommand("Select * FROM [dbCuestionarios]", objConexion)


        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then

                While dr.Read
                    Dim nombres As New objCuestionarios

                    nombres.folio = dr.Item("folio")
                    nombres.nom_cuestionario = dr.Item("nom_cuestionario")
                    nombres.estatus = dr.Item("estatus")

                    lista.Add(nombres)
                End While
            End If

            dr.Close()
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function


    <WebMethod>
    Public Function conexion_reultados_ckl_total(ByVal folio_sucursal, ByVal fecha)
        'se crea la lista que guardara la coleccion de respuestas
        Dim lista As New Collection
        'creamos la conexion
        Dim SQL_buscar As New SqlCommand("select * from check_list_mejora_continua where folio_sucursal=" & folio_sucursal & " and fecha='" & fecha & "'", objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader

            If dr.HasRows Then

                While dr.Read
                    Dim cuestiones As New objCheckList

                    cuestiones.folio_sucursal = dr.Item("folio_sucursal")
                    cuestiones.fecha = dr.Item("fecha")
                    cuestiones.zona_inspeccion = dr.Item("zona_inspeccion")
                    cuestiones.criterio_cuestion = dr.Item("criterio_cuestion")
                    cuestiones.observaciones = dr.Item("observaciones")
                    cuestiones.respuesta = dr.Item("respuesta")
                    cuestiones.usuario = dr.Item("usuario")
                    cuestiones.datos_pregunta = dr.Item("datos_pregunta")
                    lista.Add(cuestiones)
                End While
                dr.Close()
            End If
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function

    <WebMethod>
    Public Function conexion_reultados_parcial(ByVal folio_sucursal, ByVal fecha, ByVal zona)
        'se crea la lista que guardara la coleccion de respuestas
        Dim lista As New Collection
        'creamos la conexion
        Dim SQL_buscar As New SqlCommand("select * from check_list_mejora_continua where folio_sucursal=" & folio_sucursal & " and fecha='" & fecha & "' and zona_inspeccion=" & zona, objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader

            If dr.HasRows Then

                While dr.Read
                    Dim cuestiones As New objCheckList

                    cuestiones.folio_sucursal = dr.Item("folio_sucursal")
                    cuestiones.fecha = dr.Item("fecha")
                    cuestiones.zona_inspeccion = dr.Item("zona_inspeccion")
                    cuestiones.criterio_cuestion = dr.Item("criterio_cuestion")
                    cuestiones.observaciones = dr.Item("observaciones")
                    cuestiones.respuesta = dr.Item("respuesta")
                    cuestiones.usuario = dr.Item("usuario")
                    cuestiones.datos_pregunta = dr.Item("datos_pregunta")
                    lista.Add(cuestiones)
                End While
                dr.Close()
            End If
            objConexion.Close()
        Catch
        End Try
        Return lista
    End Function

    <WebMethod>
    Public Function resultados_respuestas(ByVal folio_sucursal, ByVal fecha, ByVal respuesta)
        '  Dim respuesta_si, respuesta_no, respuesta_na As Int32
        'Dim arreglo As New Collection
        ' Dim si = 1, no = 0, na = 2
        Dim r As Integer
        Dim consulta = "select count(datos_pregunta) from check_list_mejora_continua  where folio_sucursal=" & folio_sucursal & "  and fecha='" & fecha & "' and respuesta=" & respuesta

        Dim SQL_consulta_si As New SqlCommand(consulta, objConexion)
        Try
            objConexion.Open()
            dr = SQL_consulta_si.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    r = dr.GetValue(0)
                End While
            End If
            dr.Close()
        Catch
        End Try
        Return r
    End Function
    <WebMethod>
    Public Function resultados_respuestas_zona(ByVal folio_sucursal, ByVal fecha, ByVal Zona)
        Dim respuesta = 0
        Dim r As Integer
        Dim lista As New Collection
        Try
            While respuesta < 3
                Dim consulta = "select count(datos_pregunta) from check_list_mejora_continua  where folio_sucursal=" & folio_sucursal & "  and fecha='" & fecha & "' and respuesta=" & respuesta & " and zona_inspeccion=" & Zona
                Dim SQL_consulta_si As New SqlCommand(consulta, objConexion)
                objConexion.Open()
                dr = SQL_consulta_si.ExecuteReader
                If dr.HasRows Then
                    While dr.Read
                        r = dr.GetValue(0)
                        lista.Add(r)
                    End While
                End If
                respuesta += 1
                dr.Close()
                objConexion.Close()
            End While
        Catch
        End Try
        Return lista
    End Function
    'funcion que retorna todos los datos resueltos,obtenidos por fecha y folio sucursal
    <WebMethod>
    Public Function procedimiento_resultados_cuestionario_por_dia(fecha, folio_establecimiento)
        'lista que almacenara los datos
        Dim lista As New Collection
        'creamos la consulta al procedimiento almacenado
        Dim consulta = "resultados_cuestionario_por_dia '" & fecha & "' , " & folio_establecimiento
        'creamos el comando
        Dim SQL_consulta As New SqlCommand(consulta, objConexion)
        Try
            ''abrimos conexion
            objConexion.Open()
            'ejecuta el comando en el dr
            dr = SQL_consulta.ExecuteReader
            'si el comando tiene columnas
            If dr.HasRows Then
                'ejecuta el lector de datos mientras tenga datos
                While dr.Read
                    'llamamos al objeto resultados
                    Dim res As New objResultados_por_dia
                    'le agregamos los datos
                    res.zona_inspeccion = dr.Item("zona_inspeccion")
                    res.posicion = dr.Item("posicion")
                    res.pregunta = dr.Item("pregunta")
                    res.rsi = dr.Item("rsi")
                    res.rno = dr.Item("rno")
                    res.rna = dr.Item("rna")
                    res.limpieza = dr.Item("limpieza")
                    res.surtido = dr.Item("surtido")
                    res.imagen = dr.Item("imagen")
                    'y lo agregamos a unalista
                    lista.Add(res)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        'retornamos la lista con los datos
        Return lista
    End Function
        <WebMethod>
    Public Function procedimiento_resultados_cuestionario_por_rango_fechas(inicio,termino, folio_establecimiento)
        'lista que almacenara los datos
        Dim lista As New Collection
        'creamos la consulta al procedimiento almacenado
        Dim consulta = "resultados_cuestionario_en_rango_de_fecha '" & inicio & "','" & termino &"'," & folio_establecimiento
        'creamos el comando
        Dim SQL_consulta As New SqlCommand(consulta, objConexion)
        Try
            ''abrimos conexion
            objConexion.Open()
            'ejecuta el comando en el dr
            dr = SQL_consulta.ExecuteReader
            'si el comando tiene columnas
            If dr.HasRows Then
                'ejecuta el lector de datos mientras tenga datos
                While dr.Read
                    'llamamos al objeto resultados
                    Dim res As New objResultados_por_dia
                    'le agregamos los datos
                    res.zona_inspeccion = dr.Item("zona_inspeccion")
                    res.posicion = dr.Item("posicion")
                    res.pregunta = dr.Item("pregunta")
                    res.rsi = dr.Item("rsi")
                    res.rno = dr.Item("rno")
                    res.rna = dr.Item("rna")
                    res.limpieza = dr.Item("limpieza")
                    res.surtido = dr.Item("surtido")
                    res.imagen = dr.Item("imagen")
                    res.generales = dr.Item("generales")
                    res.senializacion = dr.Item("señalizacion")
                    res.caducidad = dr.Item("caducidad")
                    'y lo agregamos a unalista
                    lista.Add(res)
                End While
            End If
            dr.Close()
            objConexion.Close()
        Catch
        End Try
        'retornamos la lista con los datos
        Return lista
    End Function

    <WebMethod>
    Function buscar_resultados_menu_ckl(ByVal establecimiento, ByVal f_inicio, ByVal f_termino)
        Dim lista As New Collection
        'datos de conexion
        Dim SQL_buscar As New SqlCommand("select * from check_list_menu where folio_sucursal=" & establecimiento & " and fecha>='" & f_inicio & "' and fecha<='" & f_termino & "'", objConexion)
        Try
            objConexion.Open()
            dr = SQL_buscar.ExecuteReader
            If dr.HasRows Then
                While dr.Read
                    Dim resultado As New objCheckList_menu
                    resultado.zona = dr.Item("zona_inspeccion")
                    resultado.limpieza = dr.Item("limpieza")
                    resultado.surtido = dr.Item("surtido")
                    resultado.imagen = dr.Item("imagen")
                    resultado.fecha = dr.Item("fecha")
                    resultado.aplicador = dr.Item("aplicador")
                    resultado.duracion = dr.Item("duracion")
                    lista.Add(resultado)
                End While
            End If
        Catch
        End Try
        Return lista
    End Function
    'esta funcion retorna los datos de promedios por fecha y aspecto
    <WebMethod>
    Function resultados_cuestionario_por_fechas_establecimiento(ByVal establecimiento, ByVal fecha)
        'lista que contendra los resultados 
        Dim lista As New Collection
        'comando a ejecutar  --llamada a procedimiento almacenado
        Dim consulta = "resultados_cuestionario_por_fechas_establecimiento '" & fecha & "', " & establecimiento
        Dim SQL_consulta As New SqlCommand(consulta, objConexion)

        Try
            'abrimos conexion 
            objConexion.Open()
        dr = SQL_consulta.ExecuteReader
        'checamos si hay resultado
        If dr.HasRows Then
            'recorremos los datos
            While dr.Read
                'llamamos al objeto a llenar
                Dim resultados As New objresultados_cuestionario_por_fechas_establecimiento
                'llenamos los datos 
                resultados.establecimiento = dr.Item("establecimiento")
                resultados.fecha = dr.Item("fecha")
                resultados.aspecto = dr.Item("aspecto")
                resultados.cantidad_total = dr.Item("cantidad_total_preguntas")
                resultados.cantidad_cumplido = dr.Item("cantidad_cumplio")
                resultados.cantidad_no_cumplio = dr.Item("cantidad_no_cumplio")
                resultados.promedio = dr.Item("promedio")
                lista.Add(resultados)
            End While
        End If
        'cerramos conexion
        dr.Close()
            objConexion.Close()

        Catch ex As Exception

        End Try
        'retornamos el arreglo
        Return lista
    End Function
    <WebMethod>
    Function resultados_cuestionario_por_dia(fecha, establecimiento, cuestionario)
        'lista que almacenara los datos
        Dim lista As New Collection
        'comando a ejecutar
        Dim comando = " reesultado_cuestionario_por_dia '" & fecha & "', " & establecimiento & "," & cuestionario
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            'abrimos conexion
            objConexion.Open()
        dr = SQL_consulta.ExecuteReader
        'checamos si hay resultado
        If dr.HasRows Then
            'leemos los datos
            While dr.Read
                'inicializamos el objeto que cachara los datos
                Dim resultados As New objreesultado_cuestionario_por_dia
                'llenamos los datos
                resultados.cuestionario = dr.Item("cuestionario")
                resultados.aspecto = dr.Item("aspecto")
                resultados.cantidad_cumplio = dr.Item("cantidad_cumplio")
                resultados.cantidad_no_cumplio = dr.Item("cantidad_no_cumplio")
                resultados.total_pregunta = dr.Item("cantidad_total_preguntas")
                resultados.promedio = dr.Item("promedio")
                'agregamos los datos a la lista
                lista.Add(resultados)
            End While
        End If
        'cerramos conexion
        dr.Close()
            objConexion.Close()

        Catch ex As Exception

        End Try
        'creamos una nueva lista para acomodar los datos 
        'Dim nueva_lista As New Collection
        'recorremos la lista llena
        '  For Each datos In lista

        'Next
        'Dim promedio = {"imagen" = "--", "limpieza" = "--", "surtido" = "--"}


        Return lista
    End Function
    <WebMethod>
    Function consulta_cuestionarios_por_fechas(establecimiento, f_inicio, f_termino)
        Dim lista As New Collection
        Dim comando = "consulta_cuestionarios_por_fechas " & establecimiento & ",'" & f_inicio & "','" & f_termino & "'"
        Dim SQL_consulta As New SqlCommand(comando, objConexion)

        'Try
            objConexion.Open()
            dr = SQL_consulta.ExecuteReader
        'checamos si hay resultado
        If dr.HasRows Then
            'leemos los datos
            While dr.Read
                Dim resultados As New objcuestionarios_por_fecha
                'llenamos los datos 
                resultados.cuestionario = dr.Item("cuestionario")
                resultados.fecha = dr.Item("fecha")
                resultados.id_cuestionario = dr.Item("id_cuestionario")
                resultados.aplicador = dr.Item("aplicador")

                lista.Add(resultados)

            End While
        End If
        'cerramos conexion
        dr.Close()
            objConexion.Close()

       ' Catch ex As Exception

        'End Try
        Return lista
    End Function

    <WebMethod>
    Function resultados_ckl_total_por_fechas_establecimiento(id_sucursal, f_inicio, f_termino)
        Dim lista As New Collection
        Dim comando = "resultados_ckl_total_por_fechas_establecimiento '" & f_inicio & "','" & f_termino & "'," & id_sucursal
        Dim SQL_consulta As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
        dr = SQL_consulta.ExecuteReader
        'checamos si hay resultado
        If dr.HasRows Then
            'leemos los datos
            While dr.Read
                Dim resultados As New objresultados_ckl_total_por_fechas_establecimiento
                'llenamos los datos 
                resultados.establecimiento = dr.Item("establecimiento")
                resultados.aspecto = dr.Item("aspecto")
                resultados.cantidad_total_preguntas = dr.Item("cantidad_total_preguntas")
                resultados.cantidad_cumplio = dr.Item("cantidad_cumplio")
                resultados.cantidad_no_cumplio = dr.Item("cantidad_no_cumplio")
                resultados.promedio = dr.Item("promedio")

                lista.Add(resultados)

            End While
        End If
        'cerramos conexion
        dr.Close()
            objConexion.Close()

        Catch ex As Exception

        End Try
        Return lista
    End Function
    <WebMethod>
    Public Function resultados_cuestionarios_total_por_fechas(inicio, fin, establecimiento, cuestionario)
        'lista que contendra los datos
        Dim lista As New Collection
        'comando que llama a procedimiento almacenado
        Dim comando = "check_list_establecimientos_cuestionarios '" & inicio & "', '" & fin & "'," & establecimiento & "," & cuestionario
        'llamada al comando
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            'abrimos la conexion
            objConexion.Open()
        'ejecutamos el comando
        dr = SQL_comando.ExecuteReader
        'revisamos si tiene datos
        If dr.HasRows Then
            'leemos los datos
            While dr.Read
                Dim resultados As New objresultados_cuestionarios_total_por_fechas
                resultados.establecimiento = dr.Item("establecimiento")
                resultados.cuestionario = dr.Item("cuestionario")
                resultados.aspecto = dr.Item("aspecto")
                resultados.cantidad_total_preguntas = dr.Item("cantidad_total_preguntas")
                resultados.cantidad_cumplio = dr.Item("cantidad_cumplio")
                resultados.cantidad_no_cumplio = dr.Item("cantidad_no_cumplio")
                resultados.promedio = dr.Item("promedio")
                lista.Add(resultados)
            End While
        End If
        dr.Close()
            objConexion.Close()

        Catch ex As Exception

        End Try
        Return lista
    End Function
    <WebMethod>
    Public Function cuestionarios_por_establecimiento(id_establecimiento)
        Dim lista As New Collection
        Dim comando = "cuestionarios_por_establecimiento " & id_establecimiento
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
        dr = SQL_comando.ExecuteReader
        If dr.HasRows Then
            While dr.Read
                Dim resueltos As New objcuestionarios_por_establecimiento
                resueltos.id_establecimiento = dr.Item("id_establecimiento")
                resueltos.establecimiento = dr.Item("establecimiento")
                resueltos.id_cuestionario = dr.Item("id_cuestionario")
                resueltos.cuestionario = dr.Item("cuestionario")
                resueltos.establecimiento = dr.Item("establecimiento")
                lista.Add(resueltos)

            End While
        End If
        dr.Close()
        objConexion.Close()

        Catch ex As Exception

        End Try
        Return lista
    End Function
     <WebMethod>
    Public Function cuestionarios_por_establecimiento_R(id_establecimiento ,fecha)
        Dim lista As New Collection
        Dim comando = "cuestionarios_por_establecimiento_2 " & id_establecimiento & ", '" & fecha & "'"
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
        dr = SQL_comando.ExecuteReader
        If dr.HasRows Then
            While dr.Read
                Dim resueltos As New objcuestionarios_por_establecimiento With{
                        .id_cuestionario = dr.Item("id_cuestionario"),
                        .cuestionario = dr.Item("cuestionario"),
                        .resueltos =dr.Item("resueltos")
                    }
                lista.Add(resueltos)

            End While
        End If
        dr.Close()
        objConexion.Close()

        Catch ex As Exception

        End Try
        Return lista
    End Function
    <WebMethod>
    Sub cuestionarios_por_establecimiento_guardar(id_establecimiento, cuestionario)
        Dim comando = "cuestionarios_por_establecimiento_guardar " & cuestionario & "," & id_establecimiento
        Dim SQL_guardar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_guardar.ExecuteNonQuery()
            objConexion.Close()

        Catch ex As Exception

        End Try
    End Sub
    <WebMethod>
    Sub cuestionarios_por_establecimiento_borrar(id_establecimiento, cuestionario)
        Dim comando = "cuestionarios_por_establecimiento_borrar  " & cuestionario & "," & id_establecimiento
        Dim SQL_guardar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
        SQL_guardar.ExecuteNonQuery()
            objConexion.Close()

        Catch ex As Exception

        End Try
    End Sub

    <WebMethod>
    Public Function revisar_acceso_usuarios(usuario, folio_sub_menu)
        Dim acceso As Boolean = False
        Dim comando As New SqlCommand("[acceso_usuarios_por_menu] '" & usuario & "'," & folio_sub_menu, objConexion)
        Try
            objConexion.Open()

        dr = comando.ExecuteReader()

        If dr.HasRows Then
            dr.Read()
            acceso = dr.Item("acceso")

        End If
        dr.Close()
            objConexion.Close()

        Catch ex As Exception

        End Try
        Return acceso
    End Function

    <WebMethod>
    Public Function obtener_observaciones(ByVal folio_establecimiento, ByVal fecha)
        Dim lista As New Collection
        Dim comando = "check_list_observaciones " & folio_establecimiento & ",'" & fecha & "'"
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()

        dr = SQL_buscar.ExecuteReader
        If dr.HasRows Then
            While dr.Read
                Dim observaciones As New objobservaciones
                observaciones.folio = dr.Item("folio")
                observaciones.cuestionario = dr.Item("cuestionario")
                observaciones.posicion = dr.Item("posicion")
                observaciones.pregunta = dr.Item("pregunta")
                observaciones.observaciones = dr.Item("observaciones")
                observaciones.usuario = dr.Item("usuario")
                lista.Add(observaciones)
            End While
        End If

        dr.Close()
        objConexion.Close()

        Catch ex As Exception

        End Try
        Return lista
    End Function
    <WebMethod>
    Sub guardar_observaciones(folio_establecimiento, fecha, id_cuestionario, posicion_pregunta, observaciones, usuario)
        Dim comando = "insert into check_list_mejora_continua_observaciones
	(folio_establecimiento,fecha,id_cuestionario,posicion_pregunta,observaciones,usuario)
	values (" & folio_establecimiento & ",'" & fecha & "'," & id_cuestionario & "," & posicion_pregunta & ",'" & observaciones & "','" & usuario & "')"
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_comando.ExecuteNonQuery()
            objConexion.Close()

        Catch ex As Exception

        End Try
    End Sub
    <WebMethod>
    Sub Eliminar_observaciones(folio)
        Dim comando = "delete  from check_list_mejora_continua_observaciones where folio=" & folio
        Dim SQL_comando As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
            SQL_comando.ExecuteNonQuery()
            objConexion.Close()

        Catch ex As Exception
        End Try
    End Sub
    <WebMethod>
    Public Function check_list_establecimientos_cuestionarios_por_fecha(f1, f2)
        Dim lista As New Collection
        Dim comando As String = "check_list_establecimientos_cuestionarios_por_fecha '" & f1 & "','" & f2 & "'"
        Dim SQL_buscar As New SqlCommand(comando, objConexion)
        Try
            objConexion.Open()
        dr = SQL_buscar.ExecuteReader
        If dr.HasRows Then
            While dr.Read
                Dim datos As New check_list_establecimientos_cuestionarios_por_fecha
                datos.id = dr.Item("id")
                datos.establecimiento = dr.Item("establecimiento")
                datos.folio = dr.Item("folio")
                datos.cuestionario = dr.Item("cuestionario")
                lista.Add(datos)
            End While
        End If
        dr.Close()
            objConexion.Close()
        Catch ex As Exception
        End Try
        Return lista
    End Function
    <WebMethod>
    Public Function check_list_insidencias(sucursal, fecha)
        Dim lista As New Collection
        Dim consulta = "check_list_insidencias " & sucursal & ",'" & fecha & "'"
        Dim SQL_consulta As New SqlCommand(consulta, objConexion)
        Try
            objConexion.Open()
        dr = SQL_consulta.ExecuteReader
        If dr.HasRows Then
            While dr.Read
                Dim obj As New objcheck_list_insidencias
                obj.folios = dr.Item("folio")
                obj.establecimiento = dr.Item("establecimiento")
                obj.id = dr.Item("id")
                obj.cuestionario = dr.Item("cuestionario")
                obj.posicion = dr.Item("posicion")
                obj.pregunta = dr.Item("pregunta")
                obj.respuesta = dr.Item("respuesta")
                obj.usuarios = dr.Item("usuario")
                lista.Add(obj)
            End While
        End If
        dr.Close()
        objConexion.Close()

        Catch ex As Exception
        End Try
        Return lista
    End Function
    Function retornarHTML(arreglo)
        Dim i = 0
        Dim datos As String
        For Each item In arreglo
            If i = 0 Then
                datos = " "
                i = 1
            End If

        Next

        Return arreglo
    End Function
    <WebMethod>
    public Function obtener_lideres( tienda )
        Dim lista = New Collection
        Dim comando  = "ws_obtener_lider_tienda " & "'" & tienda & "'"

        Dim SQL_comando As New SqlCommand( comando,objConexion_scoi )

        objConexion_scoi.Open
        dr  = SQL_comando.ExecuteReader
        If dr.HasRows
            While dr.Read
                Dim lider As New objLider With{
                .folio = dr.Item("folio"),
                .nombre  = dr.Item("nombre_Empleado"),
                .puesto  = dr.Item("puesto")    
                }
                lista.Add(lider)
            End While
        End If

        dr.Close
        objConexion_scoi.Close

        Return lista
    End Function
      <WebMethod>
    public Function obtener_Preguntas_cuestionario(establecimiento, cuestionario,fecha)
        Dim lista = new Collection()
        Dim comando = "[cuestionarios_preguntas_2] " & establecimiento & ","& cuestionario & ",'"&fecha & "'"
        
       Dim SQL_comando As New SqlCommand(comando,objConexion )
        objConexion.Open
        dr = SQL_comando.ExecuteReader
        If dr.HasRows
            While dr.Read
                Dim pregunta As New objPregunta With{
                    .orden = dr.Item("orden"),
                    .pregunta = dr.Item("pregunta"),
                    .pertenece = dr.Item("pertenece"),
                    .respuesta = dr.Item("respuesta"),
                    .observaciones = dr.Item("observaciones")   
                }
                lista.Add(pregunta)
            End While
        End If 

        Return lista
      End Function

End Class
Class objPregunta
    public orden
    Public pregunta
    Public pertenece
    Public respuesta
    Public observaciones 
End Class
Class objcheck_list_insidencias
    Public folios As Integer
    Public establecimiento As String
    Public id As Integer
    Public cuestionario As String
    Public posicion As Integer
    Public pregunta As String
    Public respuesta As Integer
    Public usuarios As String
End Class
Public Class check_list_establecimientos_cuestionarios_por_fecha
    Public id As Integer
    Public establecimiento As String
    Public folio As Integer
    Public cuestionario As String
End Class


Public Class objobservaciones
    Public folio As Integer
    Public folio_establecimiento As Integer
    Public establecimiento As String
    Public id_cuestionario As Integer
    Public cuestionario As String
    Public posicion As Integer
    Public pregunta As String
    Public respuesta As Integer
    Public observaciones As String
    Public usuario As String
    Public fecha As String
End Class

Public Class objcuestionarios_por_establecimiento
    Public id_establecimiento As Integer
    Public establecimiento As String
    Public id_cuestionario As Integer
    Public cuestionario As String
    Public estatus As Boolean
    Public resueltos
End Class

Public Class objResultados_por_dia
    Public zona_inspeccion
    Public posicion
    Public pregunta
    Public rsi
    Public rno
    Public rna
    Public limpieza
    Public surtido
    Public imagen
    Public generales
    Public senializacion
    Public caducidad
    Public observaciones
End Class
Public Class objresultados_cuestionario_por_fechas_establecimiento
    Public establecimiento As String
    Public fecha As String
    Public aspecto As String
    Public cantidad_total As Integer
    Public cantidad_cumplido As Integer
    Public cantidad_no_cumplio As Integer
    Public promedio As Double
End Class
Public Class objreesultado_cuestionario_por_dia
    Public cuestionario As String
    Public aspecto As String
    Public promedio As Double
    Public total_pregunta As Integer
    Public cantidad_cumplio As Integer
    Public cantidad_no_cumplio As Integer
End Class
Public Class objresultados_ckl_total_por_fechas_establecimiento
    Public establecimiento As String
    Public aspecto As String
    Public cantidad_total_preguntas As Integer
    Public cantidad_cumplio As Integer
    Public cantidad_no_cumplio As Integer
    Public promedio As Double

End Class
Public Class objcuestionarios_por_fecha
    Public fecha As String
    Public id_cuestionario As Integer
    Public cuestionario As String
    Public aplicador As String
End Class
Public Class objresultados_cuestionarios_total_por_fechas
    Public establecimiento As String
    Public cuestionario As String
    Public aspecto As String
    Public cantidad_total_preguntas As Integer
    Public cantidad_cumplio As Integer
    Public cantidad_no_cumplio As Integer
    Public promedio As Double

End Class
Public Class objLider
    Public folio
    Public nombre
    Public puesto
End Class