Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient



' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class datos_tabla
    Inherits System.Web.Services.WebService

    Dim conexion = New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim lector As SqlDataReader
    Dim dt As DataTable

    Public Sub New()

    End Sub

    <WebMethod()>
    Public Function obtener_catalogo_matriz(folio_establecimiento)
        Dim lista_c = New Collection
        Dim comando = "[mostrar_catalogo] " & folio_establecimiento
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim catalogo_matriz As New refrigeracion_catalogo With {
                    .orden = lector.Item("orden"),
                    .folio_establecimiento = lector.Item("folio_establecimiento"),
                    .nombre_area = lector.Item("nombre_area"),
                    .folio_area = lector.Item("folio_area"),
                    .folio_unidad = lector.Item("folio_unidad"),
                    .nombre_unidad = lector.Item("nombre_unidad"),
                    .estatus = lector.Item("estatus")
                }
                lista_c.Add(catalogo_matriz)
            End While
        End If
        Return lista_c
    End Function
    <WebMethod()>
    Public Function obtener_temperaturas_x_tiempos()
        Dim lista__temperaturas_x_tiempos = New Collection
        Dim comando = "[registros_temperatura] "
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim catalogo_temperatura As New refrigeracion_seguimiento_datos With {
                    .folio_establecimiento = lector.Item("folio_establecimiento"),
                    .nombre_establecimiento = lector.Item("nombre_establecimiento"),
                    .folio_unidad = lector.Item("folio_unidad"),
                    .folio_area = lector.Item("folio_area"),
                    .limite_inferior = lector.Item("limite_inferior"),
                    .limite_superior = lector.Item("limite_superior"),
                    .temperatura_actual = lector.Item("temperatura_actual"),
                    .promedio_temperatura_ultima_hora = lector.Item("promedio_temperatura_ultima_hora"),
                    .promedio_temperatura_ultima_5_horas = lector.Item("promedio_temperatura_ultima_5_horas"),
                    .promedio_temperatura_ultimas_24_horas = lector.Item("promedio_temperatura_ultimas_24_horas"),
                    .promedio_temperatura_ultimos_7_dias = lector.Item("promedio_temperatura_ultimos_7_dias"),
                    .promedio_temperatura_ultimos_15_dias = lector.Item("promedio_temperatura_ultimos_15_dias")
                }
                lista__temperaturas_x_tiempos.Add(catalogo_temperatura)
            End While
        End If
        Return lista__temperaturas_x_tiempos
    End Function
    <WebMethod()>
    Public Function insert_catalogo(datos)
        For Each dato In datos
            Dim consulta As String = "[insert_catalogo] " & dato
            Dim comando As New SqlCommand(consulta, objConexion)
            objConexion.Open()
            comando.ExecuteNonQuery()
            objConexion.Close()
        Next
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function obtener_unidad_matriz()
        Dim lista = New Collection
        Dim comando = "select * from refrigeracion_unidades"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim unidad_matriz As New refrigeracion_unidades With {
                    .folio_unidad = lector.Item("folio_unidad"),
                    .nombre_unidad = lector.Item("nombre_unidad"),
                    .status_unidad = lector.Item("status_unidad"),
                    .limite_inferior = lector.Item("limite_inferior"),
                    .limite_superior = lector.Item("limite_superior")
                }
                lista.Add(unidad_matriz)
            End While
        End If
        Return lista
    End Function
    <WebMethod()>
    Public Function cargar_establecimientos()
        Dim lista_e = New Collection
        Dim comando = "select id_establecimiento,nombre_establecimiento from establecimiento"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim establecimiento_cargar As New refrigeracion_establecimiento With {
                    .folio_establecimiento = lector.Item("id_establecimiento"),
                    .nombre_establecimiento = lector.Item("nombre_establecimiento")
                }
                lista_e.Add(establecimiento_cargar)
            End While
        End If
        lector.Close()
        objConexion.Close()
        Return lista_e
    End Function
    <WebMethod()>
    Public Function cargar_areas()
        Dim lista_a = New Collection
        Dim comando = "select folio_area, nombre_area from refrigeracion_areas"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim area_cargar As New refrigeracion_areas With {
                    .folio_area = lector.Item("folio_area"),
                    .nombre_area = lector.Item("nombre_area")
                }
                lista_a.Add(area_cargar)
            End While
        End If
        lector.Close()
        objConexion.Close()
        Return lista_a
    End Function
    <WebMethod()>
    Public Function cargar_unidades()
        Dim lista_u = New Collection
        Dim comando = "[cargar_unidades]"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim unidad_cargar As New refrigeracion_unidades With {
                    .folio_unidad = lector.Item("folio_unidad"),
                    .nombre_unidad = lector.Item("nombre_unidad")
                }
                lista_u.Add(unidad_cargar)
            End While
        End If
        lector.Close()
        objConexion.Close()
        Return lista_u
    End Function
    <WebMethod()>
    Public Function obtener_establecimiento_matriz()
        Dim lista = New Collection
        Dim comando = "select * from establecimiento"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim establecimiento_matriz As New refrigeracion_establecimiento With {
                    .folio_establecimiento = lector.Item("id_establecimiento"),
                    .nombre_establecimiento = lector.Item("nombre_establecimiento"),
                    .status_establecimiento = "V"
                }
                lista.Add(establecimiento_matriz)
            End While
        End If
        Return lista
    End Function
    <WebMethod()>
    Public Function obtener_area_matriz()
        Dim lista = New Collection
        Dim comando = "select * from refrigeracion_areas"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim obtener_area As New refrigeracion_areas With {
                    .folio_area = lector.Item("folio_area"),
                    .nombre_area = lector.Item("nombre_area"),
                    .status_area = lector.Item("status_area")
                }
                lista.Add(obtener_area)
            End While
        End If
        Return lista
    End Function
    <WebMethod()>
    Public Function consecutivo_folio_establecimiento()
        Dim consulta As String = "select top(1)id_establecimiento+1 as folio_establecimiento from establecimiento  order by id_establecimiento desc"
        Dim respuesta As Integer = 0
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        respuesta = lector.Item("folio_establecimiento")
        lector.Close()
        objConexion.Close()
        Return respuesta
    End Function
    <WebMethod()>
    Public Function consecutivo_folio_unidades()
        Dim consulta As String = "select top(1)folio_unidad+1 as folio_unidad from refrigeracion_unidades  order by folio_unidad desc"
        Dim respuesta As Integer = 0
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        respuesta = lector.Item("folio_unidad")
        lector.Close()
        objConexion.Close()
        Return respuesta
    End Function
    <WebMethod()>
    Public Function consecutivo_folio_areas()
        Dim consulta As String = "select top(1)folio_area+1 as folio_area from refrigeracion_areas  order by folio_area desc"
        Dim respuesta As Integer = 0
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        respuesta = lector.Item("folio_area")
        lector.Close()
        objConexion.Close()
        Return respuesta
    End Function
    <WebMethod()>
    Public Function guardar_establecimiento(folio_establecimiento, nombre_establecimiento, status_establecimiento)
        Dim consulta As String = "[insert_establecimiento] " & folio_establecimiento & ",'" & nombre_establecimiento & "','" & status_establecimiento & "'"
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function guardar_unidad(folio_unidad, nombre_unidad, status_unidad, limite_inferior, limite_superior)
        Dim consulta As String = "[insert_unidad] " & folio_unidad & ",'" & nombre_unidad & "','" & status_unidad & "','" & limite_inferior & "','" & limite_superior & "'"
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function [delete_establecimiento](folio_establecimiento)
        Dim consulta As String = "[delete_establecimiento] " & folio_establecimiento
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function [delete_unidad](folio_unidad)
        Dim consulta As String = "[delete_unidad] " & folio_unidad
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function [delete_area](folio_area)
        Dim consulta As String = "[delete_area] " & folio_area
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function guardar_area(folio_area, nombre_area, status_area)
        Dim consulta As String = "[insert_area] " & folio_area & ",'" & nombre_area & "','" & status_area & "'"
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function eliminar_dato_catalogo(orden)
        Dim consulta As String = "eliminar_dato_catalogo " & orden
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function
    <WebMethod()>
    Public Function obtener_lista_areas(folio_establecimiento)
        Dim lista_areas = New Collection
        Dim comando = "[listar_areas]" & folio_establecimiento
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim catalogo_matriz As New refrigeracion_seguimiento_datos With {
                    .folio_establecimiento = lector.Item("folio_establecimiento"),
                    .folio_area = lector.Item("folio_area"),
                    .nombre_area = lector.Item("nombre_area"),
                    .nombre_establecimiento = lector.Item("nombre_establecimiento"),
                    .limite_inferior = lector.Item("limite_inferior"),
                    .limite_superior = lector.Item("limite_superior"),
                    .temperatura_actual = lector.Item("temperatura_actual"),
                    .promedio_temperatura_ultima_hora = lector.Item("promedio_temperatura_ultima_hora"),
                    .promedio_temperatura_ultima_5_horas = lector.Item("promedio_temperatura_ultima_5_horas"),
                    .promedio_temperatura_ultimas_24_horas = lector.Item("promedio_temperatura_ultimas_24_horas"),
                    .promedio_temperatura_ultimos_7_dias = lector.Item("promedio_temperatura_ultimos_7_dias"),
                    .promedio_temperatura_ultimos_15_dias = lector.Item("promedio_temperatura_ultimos_15_dias")
                }
                lista_areas.Add(catalogo_matriz)
            End While
        End If
        Return lista_areas
    End Function
    <WebMethod()>
    Public Function obtener_lista_unidades(folio_establecimiento, folio_area)
        Dim lista_unidades = New Collection
        Dim comando = "[listar_unidades]" & folio_establecimiento & ",'" & folio_area & "'"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim catalogo_matriz As New refrigeracion_seguimiento_datos With {
                    .folio_unidad = lector.Item("folio_unidad"),
                    .nombre_unidad = lector.Item("nombre_unidad"),
                    .nombre_establecimiento = lector.Item("nombre_establecimiento"),
                    .folio_establecimiento = lector.Item("folio_establecimiento"),
                    .nombre_area = lector.Item("nombre_area"),
                    .limite_inferior = lector.Item("limite_inferior"),
                    .limite_superior = lector.Item("limite_superior"),
                    .temperatura_actual = lector.Item("temperatura_actual"),
                    .promedio_temperatura_ultima_hora = lector.Item("promedio_temperatura_ultima_hora"),
                    .promedio_temperatura_ultima_5_horas = lector.Item("promedio_temperatura_ultima_5_horas"),
                    .promedio_temperatura_ultimas_24_horas = lector.Item("promedio_temperatura_ultimas_24_horas"),
                    .promedio_temperatura_ultimos_7_dias = lector.Item("promedio_temperatura_ultimos_7_dias"),
                    .promedio_temperatura_ultimos_15_dias = lector.Item("promedio_temperatura_ultimos_15_dias")
                }
                lista_unidades.Add(catalogo_matriz)
            End While
        End If
        Return lista_unidades
    End Function
    <WebMethod()>
    Public Function obtener_temperaturas_unidad(folio_unidad)
        Dim lista_temperaturas = New Collection
        Dim comando = "[mostrar_registros_unidad]" & folio_unidad
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim catalogo_matriz As New refrigeracion_seguimiento_datos With {
                    .fecha = lector.Item("fecha"),
                    .hora = lector.Item("hora"),
                    .temperatura = lector.Item("temperatura")
                }
                lista_temperaturas.Add(catalogo_matriz)
            End While
        End If
        lector.Close()
        objConexion.Close()
        Return lista_temperaturas
    End Function
    <WebMethod()>
    Public Function cargar_lista()
        Dim lista_fallos = New Collection
        Dim comando = "[lista_fallas]"
        Dim sql_consulta As New SqlCommand(comando, objConexion)
        objConexion.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                Dim fallos_cargar As New refrigeracion_catalogo With {
                    .folio_unidad = lector.Item("folio_unidad"),
                    .nombre_unidad = lector.Item("nombre_unidad"),
                    .nombre_area = lector.Item("nombre_area"),
                    .nombre_establecimiento = lector.Item("nombre_establecimiento"),
                    .limite_inferior = lector.Item("limite_inferior"),
                    .limite_superior = lector.Item("limite_superior"),
                    .estado = lector.Item("estado")
                }
                lista_fallos.Add(fallos_cargar)
            End While
        End If
        lector.Close()
        objConexion.Close()
        Return lista_fallos
    End Function
    <WebMethod()>
    Public Function obtener_lista_empleados()

        'Dim comando = "select nombrecompleto_usuario,id_scoi from usuarios"
        'Dim sql_consulta As New SqlCommand(comando, objConexion)
        'objConexion.Open()
        'lector = sql_consulta.ExecuteReader
        'If lector.HasRows Then
        '    While lector.Read
        '        Dim obtener_nombres As New usuario With {
        '            .nombrecompleto_usuario = lector.Item("nombrecompleto_usuario"),
        '            .id_scoi = lector.Item("id_scoi")
        '        }
        '        lista.Add(obtener_nombres)
        '    End While
        'End If
        'lector.Close()
        'objConexion.Close()
        Dim lista = New Collection

        Dim lista_usuario = New ususrios_scoiServ

        Dim usuarios = lista_usuario.obtener_usuario("Todos", "Activo")
        For Each usuario As objUsuarioScoi In usuarios
            lista.Add(
                New usuario With {
                .nombrecompleto_usuario = usuario.nombre_completo,
                    .id_scoi = usuario.id_scoi
            })
        Next

        Return lista
    End Function
    <WebMethod()>
    Public Function guardar_fallas(folio_unidad, estado, observaciones, id_scoi)
        Dim consulta As String = "[insert_fallos]" & folio_unidad & ",'" & estado & "','" & observaciones & "','" & id_scoi & "'"
        Dim comando As New SqlCommand(consulta, objConexion)
        objConexion.Open()
        lector = comando.ExecuteReader()
        lector.Read()
        lector.Close()
        objConexion.Close()
        Return "Listo"
    End Function

    <WebMethod()>
    Public Function Obtener_incidencias_24_horas_unidad(ByVal folio As Integer) As List(Of refrigeradores_incidencias_24_horas)
        Dim lista = New List(Of refrigeradores_incidencias_24_horas)

        Dim query As String = String.Format("exec refrigeradores_incidencias_24_horas {0};", folio)

        Try
            Dim comando As New SqlCommand(query, objConexion)
            objConexion.Open()

            lector = comando.ExecuteReader

            If lector.HasRows Then

                While lector.Read

                    lista.Add(
                     New refrigeradores_incidencias_24_horas With {
                        .temperatura = lector.Item("temperatura"),
                        .fecha = lector.Item("fecha"),
                        .hora = lector.Item("hora"),
                        .limite_inferior = lector.Item("limite_inferior"),
                        .limite_superior = lector.Item("limite_superior"),
                        .estatus = lector.Item("estatus")
                    })

                End While

            End If

            objConexion.Close()
        Catch ex As Exception
            Return lista
        End Try

        Return lista
    End Function

    <WebMethod>
    Public Function refrigeradores_monitoreo_por_periodo(ByVal folio As Integer, ByVal periodo As String) As List(Of refrigeradores_incidencias_24_horas)
        Dim lista = New List(Of refrigeradores_incidencias_24_horas)

        Dim query As String = String.Format("exec refrigeradores_monitoreo_por_periodo {0},'{1}';", folio, periodo)

        Try
            Dim comando As New SqlCommand(query, objConexion)
            objConexion.Open()

            lector = comando.ExecuteReader

            If lector.HasRows Then

                While lector.Read

                    lista.Add(
                     New refrigeradores_incidencias_24_horas With {
                        .temperatura = lector.Item("temperatura"),
                        .fecha = lector.Item("fecha"),
                        .hora = lector.Item("hora"),
                        .limite_inferior = lector.Item("limite_inferior"),
                        .limite_superior = lector.Item("limite_superior"),
                        .estatus = lector.Item("estatus")
                    })

                End While

            End If

            objConexion.Close()
        Catch ex As Exception
            Return lista
        End Try
        Return lista
    End Function

End Class

Class refrigeracion_establecimiento
    Public folio_establecimiento
    Public nombre_establecimiento
    Public status_establecimiento
End Class
Class refrigeracion_unidades
    Public folio_unidad
    Public nombre_unidad
    Public status_unidad
    Public limite_inferior
    Public limite_superior
End Class
Class refrigeracion_areas
    Public folio_area
    Public nombre_area
    Public status_area
End Class
Class refrigeracion_catalogo
    'Public folio
    Public folio_establecimiento
    Public orden
    Public folio_area
    Public folio_unidad
    Public folio_usuario_ultima_modificacion
    Public fecha_ultima_modificacion
    Public estatus
    Public nombre_unidad
    Public nombre_area
    Public limite_inferior
    Public limite_superior
    Public nombre_establecimiento
    Public estado
End Class
Class refrigeracion_seguimiento_datos
    Public folio_establecimiento
    Public nombre_establecimiento
    Public folio_area
    Public nombre_area
    Public folio_unidad
    Public nombre_unidad
    Public id_usuario
    Public nombre_usuario
    Public temperatura
    Public fecha_temperatura
    Public hora
    Public promedio_temperatura_ultima_hora
    Public promedio_temperatura_ultima_5_horas
    Public promedio_temperatura_ultimas_24_horas
    Public promedio_temperatura_ultimos_7_dias
    Public promedio_temperatura_ultimos_15_dias
    Public temperatura_actual
    Public limite_inferior
    Public limite_superior
    Public fecha
End Class
Class usuario
    Public nombrecompleto_usuario
    Public id_scoi
End Class
Class catalogos_fallos
    Public folio_unidad
    Public estado
    Public id_scoi
    Public fecha_hora
End Class