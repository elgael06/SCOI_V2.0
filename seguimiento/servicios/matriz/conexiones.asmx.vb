Imports System.Web.Services
Imports System.Data.SqlClient
Imports System.ComponentModel

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")> _
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class matriz1
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_scoi As New SqlConnection(conexion.conexion_izagar )
    Dim lector As SqlDataReader
    Dim dt As DataTable

    <WebMethod()> _
    public Function obtener_matriz()
        Dim lista = New Collection
        Dim comando = "exec matrices_vista_datos "

        Dim sql_consulta As New SqlCommand( comando,objConexion_scoi)
        objConexion_scoi.Open()
        lector = sql_consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim matriz As New Matrices_ With{
                    .folio= lector.Item("folio"),
                    .nombre = lector.Item("nombre"),
                    .establecimiento = lector.Item("establecimiento"),
                    .estatus = lector.Item("status"),
                    .usuario = lector.Item("usuario"),
                    .alta = lector.Item("alta"),
                    .modificacion = lector.Item("modificacion"),
                    .cancelacion = lector.Item("cancelacion")
                }
                lista.Add(matriz)
            End While
        End If
        lector.Close()
        objConexion_scoi.Close()

        Return lista
    End Function
    <WebMethod()> _
    public Function obtener_establecimientos()
        Dim lista = New Collection
        Dim comando = "select folio,nombre,status from tb_establecimiento"
        Try
            Dim sql_consulta As New SqlCommand(comando, objConexion_scoi)
            objConexion_scoi.Open
            lector = sql_consulta.ExecuteReader
            If lector.HasRows Then

                While lector.Read
                    Dim establecimiento_matriz As New establecimiento_matriz With {
                    .folio = lector.Item("folio"),
                    .nombre = lector.Item("nombre"),
                    .estatus = lector.Item("status")
                }
                    lista.Add(establecimiento_matriz)
                End While
            End If
        Catch
        End Try
        lector.Close
        objConexion_scoi.Close
        Return lista
    End Function
     <WebMethod()> _
    public Function obtener_unidad_inspeccion_matriz()
        Dim lista = New Collection
        Dim comando = "select * from matrices_unidad_de_inspeccion"

        Dim sql_consulta As New SqlCommand( comando,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql_consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim unidad_inspeccion_matriz As New unidad_inspeccion_matriz With{
                    .folio= lector.Item("folio"),
                    .nombre = lector.Item("unidad_de_inspeccion"),
                    .abreviatura = lector.Item("abreviatura"),
                    .estatus = lector.Item("status"),
                    .alta = lector.Item("fecha"),
                    .modificacion = lector.Item("ultima_modificacion")
                }
                lista.Add(unidad_inspeccion_matriz)
            End While
        End If
        lector.Close
        objConexion_scoi.Close

        Return lista
    End Function
    <WebMethod()> _
    public Function obtener_etapas_matriz()
        Dim lista = New Collection
        Dim comando = "select * from matrices_etapas"

        Dim sql_consulta As New SqlCommand( comando,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql_consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim matrices_etapas As New matrices_etapas With{
                    .folio= lector.Item("folio"),
                    .nombre = lector.Item("etapa"),
                    .estatus = lector.Item("status")   
                }
                lista.Add(matrices_etapas)
            End While
        End If
        lector.Close
        objConexion_scoi.Close

        Return lista
    End Function
     <WebMethod()> _
    public Function obtener_conceptos_matriz()
        Dim lista = New Collection
        Dim comando = "select * from matrices_conceptos"

        Dim sql_consulta As New SqlCommand( comando,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql_consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim matrices_conceptos As New matrices_conceptos With{
                    .folio= lector.Item("folio"),
                    .nombre = lector.Item("concepto"),
                    .estatus = lector.Item("status"),
                    .abreviatura = lector.Item("abreviatura")
                }
                lista.Add(matrices_conceptos)
            End While
        End If
        lector.Close
        objConexion_scoi.Close

        Return lista
    End Function
         <WebMethod()> _
    public Function obtener_aspectos_matriz()
        Dim lista = New Collection
        Dim comando = "select * from cuadrantes_aspecto"

        Dim sql_consulta As New SqlCommand( comando,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql_consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim matrices_aspecto As New cuadrantes_aspecto With{
                    .folio= lector.Item("folio"),
                    .nombre = lector.Item("aspecto"),
                    .estatus = lector.Item("estatus"),
                    .ponderacion = lector.Item("ponderacion"),
                    .orden = lector.Item("orden")
                }
                lista.Add(matrices_aspecto)
            End While
        End If
        lector.Close
        objConexion_scoi.Close

        Return lista
    End Function
    <WebMethod()> _
    Public Function ultimo_folio_matriz()
        Dim folio As Integer = 1
        Dim comando = "select top(1)folio+1 as folio from matrices order by folio desc"
        Dim SQL As New SqlCommand(comando,objConexion_scoi)
        objConexion_scoi.Open
        lector = SQL.ExecuteReader
        If lector.HasRows
            While lector.Read
                folio = lector.Item("folio")
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return folio
    End Function
     <WebMethod()> _
     public Function obtener_datos_matriz(folio)
        Dim lista = New Collection
        Dim comando = "select * from matrices_datos where folio_matriz=" & folio
        Dim sql As New SqlCommand(comando,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim matriz  As New Obj_matriz_datos With {
                    .folio=lector.Item("folio"),
                    .matriz=lector.Item("folio_matriz"),
                    .orden_etapa = lector.Item("orden_etapa"),
                    .etapa = lector.Item("folio_etapa"),
                    .orden_unidad_de_inspeccion = lector.Item("orden_unidad_de_inspeccion"),
                    .unidad_de_inspeccion = lector.Item("folio_unidad_de_inspeccion"),
                    .consepto = lector.Item("folio_concepto") ,
                    .ponderacion=lector.Item("ponderacion"),
                    .sugerido_m = lector.Item("muestra_sugerida"),
                    .aspecto  = lector.Item("folio_aspecto")
                }
                lista.Add(matriz)
            End While
        End If
        lector.Close
        objConexion_scoi.Close

        Return lista
     End Function
    <WebMethod()> _
    public Function guardar_crear_armado_matriz(folio,descripcion,id_establecimiento,id_usuario,orden_etapas,etapas,conseptos,orden_unidad_de_inspeccion,unidad_de_inspeccion,ponderaciones,sugerido_muestra,aspectos   )
        Dim comando_matriz = "matriz_insertar_actualizar " & folio & ",'" & descripcion & "'," & id_establecimiento & "," & id_usuario 
        Dim folio_r As Integer = 1
        
        Dim SQL_matriz As New SqlCommand(comando_matriz,objConexion_scoi )
        objConexion_scoi.Open
        lector = SQL_matriz.ExecuteReader
        If lector.HasRows
            While lector.Read
                folio_r = lector.Item("folio")
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Dim vueltas = new Collection 
        Dim i =0
        For Each item In orden_etapas

            Dim comando_datos="matriz_llenar_datos_creacion " & folio_r & "," & orden_etapas(i) & "," & etapas(i) & "," & conseptos(i) & "," & orden_unidad_de_inspeccion(i) & "," & unidad_de_inspeccion(i) & "," & ponderaciones(i) & "," & sugerido_muestra(i) & ","  & aspectos(i)
             Dim SQL_matriz_datos As New SqlCommand(comando_datos,objConexion_scoi )
            Try 
                vueltas.Add(comando_datos)
                objConexion_scoi.Open()
                SQL_matriz_datos.ExecuteNonQuery()
                objConexion_scoi.Close()
            Catch 
            End Try

           i +=1
        Next 
        Return vueltas
    End Function

     <WebMethod()> _
    public Function matrices_asignadas()
        Dim lista = New Collection
        Dim  sql As New SqlCommand("matrices_asignadas",objConexion_scoi)
        objConexion_scoi.Open
        lector = sql.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim matriz As New matrices_asignacion With {
                .folio= lector.Item("folio"),
                .folio_matriz=lector.Item("folio_matriz"),
                .matriz= lector.Item("matriz"),
                .id_usuario = lector.Item("id_usuario"),
                .usuario = lector.Item("usuario"),
                .asignacion = lector.Item("fecha_asignacion"),
                .fecha = lector.Item("fecha"),
                .id_establecimiento = lector.Item("folio_establecimiento"),
                .establecimiento = lector.Item("establecimiento")    
                }
                lista.Add(matriz)
            End While
        End If
        Return lista
     End Function
    <WebMethod()> _
    public Function matrices_asignadas_por_establecimiento(folio)
        Dim lista = New Collection
        Dim  sql As New SqlCommand("matrices_asignadas_por_establecimiento " & folio ,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim matriz As New matrices_asignacion With {
                .folio= lector.Item("folio"),
                .folio_matriz=lector.Item("folio_matriz"),
                .matriz= lector.Item("matriz"),
                .id_usuario = lector.Item("id_usuario"),
                .usuario = lector.Item("usuario"),
                .asignacion = lector.Item("fecha_asignacion"),
                .fecha = lector.Item("fecha"),
                .id_establecimiento = lector.Item("folio_establecimiento"),
                .establecimiento = lector.Item("establecimiento")    
                }
                lista.Add(matriz)
            End While
        End If
        Return lista
     End Function
    <WebMethod()> _
    Function ultimo_folio_matrices_asignadas()
        Dim folio As Integer
        Dim sql As New SqlCommand("select top(1)folio+1 as folio from matrices_asignacion order  by folio desc" ,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql.ExecuteReader
        If lector.HasRows
            While lector.Read
                folio= lector.Item("folio")
            End While
        End If
        objConexion_scoi.Close
        Return folio
    End Function
    <WebMethod()> _
    public Function guardar_matriz_asignada( folio,folio_matriz,id_usuario,fecha)
    
        Dim sql As New SqlCommand("matriz_asignada_guardar " & folio & "," & folio_matriz & ","& id_usuario & ", '" & fecha & "'" ,objConexion_scoi )
        Try
            objConexion_scoi.Open
            sql.ExecuteNonQuery
            objConexion_scoi.Close
        Catch ex As Exception
            Return false
        End Try
        Return True
    End Function
    <WebMethod()> _
    public Function matrices_guardar_resultados(datos,observaciones)
        For Each dato in datos 
             Dim sql As New SqlCommand("matrices_guardar_resultados " & dato ,objConexion_scoi )
            Try
                objConexion_scoi.Open
                sql.ExecuteNonQuery
                objConexion_scoi.Close
            Catch ex As Exception
                Return ex
            End Try
        Next

        For Each dato in observaciones 
             Dim sql As New SqlCommand("insert into matrices_resultados_observaciones values(" & dato  & ",getdate())",objConexion_scoi )
            Try
                objConexion_scoi.Open
                sql.ExecuteNonQuery
                objConexion_scoi.Close
            Catch ex As Exception
                Return -1
            End Try
        Next
        Return 1
    End Function
   <WebMethod()> _
   public Function obtener_observaciones_por_etapa( folio, etapa)
        Dim lista = New Collection
         Dim sql As New SqlCommand("matrices_observaciones_obtener " & folio & "," & etapa ,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New matrices_observaciones_resultados With{
                    .folio = lector.Item("folio"),
                    .posicion = lector.Item("posicion"),
                    .respuesta = lector.Item("respuesta"),
                    .observacion = lector.Item("observaciones")
                })
            End While
        End If
        objConexion_scoi.Close

        Return lista
   End Function
     <WebMethod()> _
    Public Function finalizar_asignacion_matriz(folio_matriz)
        
        Try
        Dim sql As New SqlCommand("update matrices_asignacion set estatus='F' where fecha=CONVERT(varchar(20),getdate(),103) and folio= " & folio_matriz ,objConexion_scoi)
        objConexion_scoi.Open
        sql.ExecuteNonQuery
        objConexion_scoi.Close
        Catch
            Return 0
        End Try
        Return 1
    End Function
    ''''tabla de monitoreo
    <WebMethod()> _
    public Function obtener_monitoreo_matriz_por_establecimiento(ByVal consulta As String ) As Collection
        Dim lista = New Collection 

        Dim comando As New SqlCommand("matrices_monitor_resultados_filtro " + consulta , objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                lista.Add(
                 New matrices_monitor_establecimiento With {
                .folio_establecimiento = lector.Item("folio_establecimiento"),
                .establecimiento = lector.Item("establecimiento"),
                .folio_matriz = lector.Item("folio_matriz"),
                .matriz = lector.Item("matriz"),
                .r_si = lector.Item("r_si"),
                .r_no = lector.Item("r_no"),
                .r_na = lector.Item("r_na"),
                .total = lector.Item("total")    
                })
            End While
        End If
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod()> _
    public Function obtener_monitoreo_matriz_por_matriz(ByVal consulta As String ) As Collection
        Dim lista = New Collection 

        Dim comando As New SqlCommand("matrices_monitor_resultados_filtro " + consulta , objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                lista.Add(
                 New matrices_monitor_matriz With {
                .folio_matriz = lector.Item("folio_matriz"),
                .matriz = lector.Item("matriz"),
                .folio_etapa = lector.Item("folio_etapa"),
                .orden_etapa = lector.Item("orden_etapa"),
                .etapa = lector.Item("etapa"),
                .r_si = lector.Item("r_si"),
                .r_no = lector.Item("r_no"),
                .r_na = lector.Item("r_na"),
                .total = lector.Item("total")      
                })
            End While
        End If
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod()> _
    public Function obtener_monitoreo_matriz_por_etapa(ByVal consulta As String ) As Collection
        Dim lista = New Collection 

        Dim comando As New SqlCommand("matrices_monitor_resultados_filtro " + consulta , objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                lista.Add(
                 New matrices_monitor_etapa With {
                .folio_etapa = lector.Item("folio"),
                .etapa = lector.Item("etapa"),
                .folio_unidad_de_inspeccion= lector.Item("folio_unidad_de_inspeccion"),
                .orden_unidad_de_inspeccion = lector.Item("orden_unidad_de_inspeccion"),
                .unidad_de_inspeccion = lector.Item("unidad_de_inspeccion"), 
                .concepto = lector.Item("concepto"),
                .r_si = lector.Item("r_si"),
                .r_no = lector.Item("r_no"),
                .r_na = lector.Item("r_na"),
                .total = lector.Item("total")      
                })
            End While
        End If
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod()> _
   public Function obtener_observaciones_por_unidad( folio, etapa,unidad)
        Dim lista = New Collection
    
         Dim sql As New SqlCommand( "select  pos,observaciones from matrices_resultados_observaciones as obs
                                            left join matrices_asignacion as asig on asig.folio=obs.folio_asignacion
                                            where asig.folio_matriz = " & folio & " and folio_etapa=" & etapa & " and folio_unidad= " & unidad ,objConexion_scoi)
        objConexion_scoi.Open
        lector = sql.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New matrices_observaciones_resultados With{
                    .posicion = lector.Item("pos"),
                    .observacion = lector.Item("observaciones")
                })
            End While
        End If
        objConexion_scoi.Close

        Return lista
   End Function
End Class
