Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.Net.Mail
' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
 <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class conexiones
    Inherits System.Web.Services.WebService
    Dim conexion = New objConexionSQL
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(conexion.nva_conexion)
    Dim objConexion_scoi As New SqlConnection(conexion.conexion_izagar )
    Dim objConexion_scoi_pruebas As New SqlConnection(conexion.conexion_izagar_puebas)
    Dim lector As SqlDataReader
    Dim dt As DataTable
    <WebMethod()> _
    Public Function departamentos()
        Dim lista = New Collection
        Dim consulta As New SqlCommand("select * from tb_departamento",objConexion_scoi)
        objConexion_scoi.Open
        lector = consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim departamento As New servicios_departamento With{
                .folio= lector.Item("folio"),
                .nombre = lector.Item("departamento"),
                .estatus = lector.Item("status")    
                }
                lista.Add(departamento)
            End While
        End If
        objConexion_scoi.Close

        Return lista
    End Function
    <WebMethod()> _
    Public Function cuestionarios()
        Dim lista = New Collection
        Dim consulta As New SqlCommand("servicios_cuestionarios_ckl ",objConexion_scoi)
        objConexion_scoi.Open
        lector = consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim cuestionario As New servicios_cuestionarios With {
                .folio = lector.Item("folio"),
                .cuestionario = lector.Item("cuestionario"),
                .folio_zona = lector.Item("folio_zona"),
                .zona = lector.Item("zona"),
                .folio_establecimiento = lector.Item("folio_establecimiento"),
                .establecimiento = lector.Item("establecimiento"),
                .usuario_modifico = lector.Item("usuario_modifico"),
                .usuario_creo = lector.Item("usuario_creo"),
                .modificacion = lector.Item("modificacion"),
                .creacion = lector.Item("creacion"),
                .estatus = lector.Item("estatus"),
                .departamento_aplica = lector.Item("folio_departamento"),
                .nombre_departamento_aplica = lector.Item("departamento")
                }
                lista.Add(cuestionario)
            End While
        End If
        objConexion_scoi.Close

        Return lista
    End Function
    <WebMethod>
    Function servicios_cuestionarios_eliminar(folio)
        Dim sqlcomando As New SqlCommand("servicios_cuestionarios_eliminar_ckl " & folio ,objConexion_scoi)
        objConexion_scoi.Open
        sqlcomando.ExecuteNonQuery
        objConexion_scoi.Close

        Return folio
    End Function
    <WebMethod>
    public Function datos_cuestionarios(folio)
        Dim lista = New Collection
        Dim comando As New SqlCommand("servicios_vista_datos_cuestionario  "& folio ,objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim  datos As New servicios_datos_cuestionarios()With{
                    .folio = lector.Item("folio"),
                    .folio_cuestionario =lector.Item("folio_cuestionario"),
                    .cuestionario = lector.Item("cuestionario"),
                    .orden = lector.Item("orden"),
                    .folio_zona =lector.Item("folio_zona"),
                    .zona = lector.Item("zona"),
                    .folio_activo =lector.Item("folio_activo"),
                    .activo = lector.Item("activo"),
                    .folio_criterio =lector.Item("folio_criterio"),
                    .criterio = lector.Item("criterio"),
                    .n_servicio = lector.Item("servicios")
                }
                lista.Add(datos)
            End While
        End If
        Return lista
    End Function
     <WebMethod()> 
    Public Function servicios_por_activos_ckl(folio)
        Dim lista = New Collection
        Dim consulta As New SqlCommand("select folio_zona,orden, folio_servicio from servicios_por_activo_check_list where folio_cuestionario=" & folio,objConexion_scoi)
        objConexion_scoi.Open
        lector = consulta.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add( New servicios_por_activos With{
                .folio_servicio = lector.Item("folio_servicio"),
                .orden = lector.Item("orden"),
                .folio_zona = lector.Item("folio_zona")    
                })
            End While
        End If
        Return lista
    End Function
    <WebMethod()> _
    Public Function servicio_guardar(cuestionario,activo,serivicios_por_activo)
        Dim folio As Integer
        Dim comando As New SqlCommand("servicios_guardar_actualizar_ckl " & cuestionario  ,objConexion_scoi)
        Try
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                folio = lector.Item("folio")
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        For Each consulta In activo
            dim d = folio &","& consulta
                guardar_datos_activos(d)
                Debug.Write(d)
        Next
        For Each consulta In serivicios_por_activo
            dim d = folio &","& consulta
                guardar_datos_servicios(d)
                Debug.Write(d)
        Next
        Catch
            return 0
        End Try
        Return folio
    End Function
    Private Sub guardar_datos_servicios(datos)
         Dim comando As New SqlCommand("servicios_guardar_por_ckl " & datos  ,objConexion_scoi)
        objConexion_scoi.Open
        comando.ExecuteNonQuery
        objConexion_scoi.Close
    end Sub
    Private sub guardar_datos_activos(datos)
         Dim comando As New SqlCommand("servicios_guardar_datos_ckl " & datos  ,objConexion_scoi)
        objConexion_scoi.Open
        comando.ExecuteNonQuery
        objConexion_scoi.Close
End Sub

    <WebMethod()> _
    Public Function servicio_zona()
         Dim lista = New Collection
        Dim comando  As New SqlCommand("select * from servicios_zonas_check_list " ,objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim zona As New servicio_zona With{
                    .folio = lector.Item("folio"),
                    .nombre = lector.Item("zona"),
                    .estatus = lector.Item("estatus")
                }
                lista.Add(zona)
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod()> _
    Public Function servicios_activos_ckl(establecimiento,departamento)
        Dim lista = New Collection
        Dim comando  As New SqlCommand("servicios_activos_ckl " & establecimiento & "," & departamento,objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim activo As New servicios_activos With{
                    .folio = lector.Item("folio"),
                    .descripcion = lector.Item("descripcion"),
                    .caracteristicas = lector.Item("caracteristicas"),
                    .fecha = lector.Item("fecha_compra")
                }
                lista.Add(activo)
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return lista
    End Function
     <WebMethod()> _
    Public Function servicio_criterio()
         Dim lista = New Collection
        Dim comando  As New SqlCommand("select * from servicios_criterios_check_list " ,objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim criterio As New servicio_criterio With{
                    .folio = lector.Item("folio"),
                    .nombre = lector.Item("criterio"),
                    .estatus = lector.Item("estatus")
                }
                lista.Add(criterio)
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod()> _
    Public Function servicios_detalles_ckl()
        Dim lista = New Collection
        Dim comando  As New SqlCommand("servicios_detalles_ckl ",objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                Dim detalle As New servicios_detalles With{
                    .folio = lector.Item("folio"),
                    .nombre = lector.Item("servicio"),
                    .detalle = lector.Item("detalle"),
                    .prioridad = lector.Item("prioridad")    
                }
                lista.Add(detalle)
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod >
    public Function  servicios_asignados_vista_por_establecimiento(folio)
        Dim lista  = New Collection
        Dim comando As New SqlCommand(" servicios_asignados_vista_por_establecimiento " & folio , objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New servicios_asignados_por_establecimiento With {
                    .folio = lector.Item("folio"),
                    .folio_cuestionario = lector.Item("folio_cuestionario"),
                    .cuestionario = lector.Item("cuestionario"),
                    .folio_departamento = lector.Item("folio_departamento"),
                    .id_aplicador = lector.Item("id_aplicador"),
                    .aplicador = lector.Item("aplicador"),
                    .inicio = lector.Item("inicio"),
                    .termino = lector.Item("termino"),
                    .estatus = lector.Item("estatus")
                }
                )
            End While
        End If
        lector.Close
        objConexion_scoi.Close

        Return lista
    End Function
    <WebMethod >
    public Function servicios_guardar_asignados_cuestionario(datos,eliminar)
        Dim lista = New Collection
        For Each dato In datos
            Dim comando As New SqlCommand("servicios_guardar_asignacion_cuestionarios " & dato,objConexion_scoi)
            objConexion_scoi.Open
            comando.ExecuteReader
            objConexion_scoi.Close
            lista.Add(
                New objRespuesta With{
                   .respuesta = dato
                })
        Next
        For Each dato In eliminar 
            eliminar_asignados(dato)
        Next
        Return lista
        
    End Function
    Private sub eliminar_asignados(asignado)
         Dim comando As New SqlCommand("delete servicios_asignacion_cuestionario where folio= " & asignado,objConexion_scoi)
            objConexion_scoi.Open
            comando.ExecuteNonQuery
            objConexion_scoi.Close

    End sub
    ''checklist
    <WebMethod>
    public Function obtener_zonas_por_asignacion(folio)
        Dim lista = New Collection
        Dim comando As New SqlCommand("servicos_zonas_por_asignacion " &folio ,objConexion_scoi )
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New servicio_zona With{
                .folio = lector.Item("folio_zona"),
                .nombre = lector.Item("zona")
                }
                )
            End While
        End If
        Return lista
    End Function
     <WebMethod>
    public Function obtener_resultados_cuestionarios_asignados_zona(asignacion,zona)
        Dim lista = New Collection
        Dim comando As New SqlCommand("servicios_vista_datos_por_asignacion_cuestionario " & asignacion & "," & zona,objConexion_scoi )
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New vista_datos_por_asignacion_cuestionario With{
                    .folio_resultado = lector.Item("folio_resultado"),
                    .orden = lector.Item("orden"),
                    .folio_zona = lector.Item("folio_zona"),
                    .folio_activo = lector.Item("folio_activo"),
                    .detalle_activo = lector.Item("detalle_activo"),
                    .folio_criterio = lector.Item("folio_criterio"),
                    .detalle_criterio = lector.Item("detalle_criterio"),
                    .solucion = lector.Item("solucion")
                })
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return lista
     End Function
    <WebMethod>
    Public Function servicios_ver_observaciones_por_activo(asignacion,folio_zona)
        Dim lista = New Collection
        Dim comando As New SqlCommand("servicios_ver_observaciones_por_activo " &asignacion & "," & folio_zona ,objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New obj_observaciones With{
                .folio = lector.Item("folio_activo"),
                .observacion = lector.Item("observacion")
                })
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return lista
    End Function
     <WebMethod>
    public Function guardar_resultados_cuestionarios_asignados_zona(datos_cuestionario,observaciones)
        Dim lista = New Collection
        Dim lista_folios= New Collection
            For Each datos As String In datos_cuestionario
                Dim comando As New SqlCommand("servicios_guardar_resultados_cuestionario " & datos,objConexion_scoi)
                objConexion_scoi.Open
                lector = comando.ExecuteReader
                If lector.HasRows
                    While lector.Read
                       lista_folios.Add(lector.Item("folio"))
                    End While
                End If
                lector.Close
                objConexion_scoi.Close
            Next
        For Each folio As Integer in lista_folios
            Dim comando As New SqlCommand("delete servicio_cuestionario_observaciones where folio_resultado=" & folio ,objConexion_scoi)
            objConexion_scoi.Open
            comando.ExecuteNonQuery
            objConexion_scoi.Close
        Next
        Try
            Dim pos As Integer = 0
            For Each folio As Integer In lista_folios
                For Each observacion In observaciones
                    If observacion(0).Equals(pos) Then
                        lista.Add(folio & ",'" & observacion(1).ToString)
                        guardar_observaciones(folio & ",'" & observacion(1).ToString)
                    End If
                Next
                pos += 1
            Next
        Catch
            Return lista_folios
        End Try

        Return lista
     End Function
    Private sub guardar_observaciones(d)
        Dim obs As New SqlCommand("insert into servicio_cuestionario_observaciones values( " & d &"' )",objConexion_scoi)
        objConexion_scoi.Open
        obs.ExecuteNonQuery
        objConexion_scoi.Close
    End sub

    Function enviar_correo_servicio( folio)
         Dim mail As New MailMessage
        mail.Subject = "Reporte De Servico :"
        mail.To.Add("elgael06@gmail.com")
        mail.From = New MailAddress("scoi.web.grupoizagar@gmail.com", "SCOI GRUPO IZAGAR.", Encoding.UTF8)
        mail.BodyEncoding = System.Text.Encoding.UTF8
        mail.Priority = MailPriority.High
        mail.IsBodyHtml = True
        mail.Body = "Cuerpo"

        Dim smtp As New SmtpClient("smtp.gmail.com")
        smtp.EnableSsl = True
        smtp.Credentials = New Net.NetworkCredential("scoi.web.grupoizagar@gmail.com", "Ragazi/*-1")
        smtp.Port = 587
        smtp.Host = "smtp.gmail.com"
        smtp.Send(mail)
        Return mail
    End Function
    <WebMethod>
    Public Function enviar_solicitud_servicio(datos() As String)
        Dim lista = New Collection
        Try
            For Each dato As String In datos
                Dim ultimo_folio = New Folio_siguiente_por_transiccion().obtener_folio(40)
                dato = ultimo_folio & "," & dato
                objConexion_scoi.Open()
                Dim insertar As New SqlCommand("[sp_guardar_servicios_web] " & dato, objConexion_scoi)
                insertar.ExecuteNonQuery()
                objConexion_scoi.Close()
                lista.Add(ultimo_folio)
            Next
        Catch
            Return 0
        End Try
        Return lista
    End Function
    <WebMethod>
    public Function obtener_lista_prioridades()
        Dim lista = New Collection
        Dim comando As  New SqlCommand("select * from tb_prioridad",objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New obj_prioridad With{
                .folio = lector.Item("folio_prioridad"),
                .nombre = lector.Item("nombre"),
                .estatus = lector.Item("estatus")
                })
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod>
    public Function servicios_por_orden_activo_ckl(cuestionario,orden)
        Dim lista = New Collection
        Dim comando As New SqlCommand("servicios_por_orden_activo_ckl " & cuestionario & ","& orden,objConexion_scoi)
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows
            While lector.Read
                lista.Add(
                New servicios_detalles With{
                .folio_departamento = lector.Item("folio_departamento"),
                .folio = lector.Item("folio_servicio"),
                .nombre = lector.Item("servicio"),
                .detalle = lector.Item("detalle"),
                .prioridad = lector.Item("folio_prioridad")
                })
            End While
        End If
        objConexion_scoi.Close
        Return lista
    End Function
    <WebMethod>
    public Function servicios_guardar_actualizar_zonas_ckl(folio As Integer,nombre As String,estatus As String) As Integer
        Dim comando As new SqlCommand( "servicios_guardar_actualizar_zonas_ckl " & folio & ",'" & nombre & "','" & estatus & "'"  ,objConexion_scoi )
        Dim folio_r As Integer
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                folio_r = lector.GetValue(0)
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return folio_r
    End Function
     <WebMethod>
    public Function servicios_borrar_zona(folio As Integer)
        Dim comando As New SqlCommand("delete servicios_zonas_check_list where folio=" & folio,objConexion_scoi)
        objConexion_scoi.Open
        comando.ExecuteNonQuery
        objConexion_scoi.Close

        Return folio
     End Function
     <WebMethod>
    public Function servicios_guardar_actualizar_criterio_ckl(folio As Integer,nombre As String,estatus As String) As Integer
        Dim comando As new SqlCommand( "servicios_guardar_actualizar_criterios_ckl " & folio & ",'" & nombre & "','" & estatus & "'"  ,objConexion_scoi )
        Dim folio_r As Integer
        objConexion_scoi.Open
        lector = comando.ExecuteReader
        If lector.HasRows Then
            While lector.Read
                folio_r = lector.GetValue(0)
            End While
        End If
        lector.Close
        objConexion_scoi.Close
        Return folio_r
    End Function
    <WebMethod>
    Public Function servicios_borrar_criterio(folio As Integer)
        Dim comando As New SqlCommand("delete servicios_criterios_check_list where folio=" & folio, objConexion_scoi)
        objConexion_scoi.Open
        comando.ExecuteNonQuery
        objConexion_scoi.Close

        Return folio
    End Function
    'MODIFICACIONES
    <WebMethod>
    Public Function guardar_cuestionario_servicios(ByVal cuestionario As servicios_cuestionarios) As Integer
        Dim folio As Integer
        Dim query = "servicios_guardar_actualizar_ckl " & cuestionario.folio & ",'" & cuestionario.cuestionario & "'," & cuestionario.departamento_aplica & "," & cuestionario.folio_zona & "," & cuestionario.folio_establecimiento & ",'" & cuestionario.estatus & "'," & cuestionario.usuario_modifico
        Dim comando As New SqlCommand(query, objConexion_scoi)
        Try
            objConexion_scoi.Open()
            lector = comando.ExecuteReader
            If lector.HasRows Then

                While lector.Read
                    folio = lector.Item("folio")
                End While
            End If
            lector.Close()
            objConexion_scoi.Close()
        Catch
        End Try
        Return folio
    End Function
    <WebMethod>
    Public Function Guardar_activos_por_cuestionario(ByVal ParamArray datos() As servicios_datos_cuestionarios)
        '@cuestionario int , @folio int , @orden int ,@zona int , @activo int , @criterio int , @servicio int 
        Dim total = 0
        Try
            For Each activo As servicios_datos_cuestionarios In datos
                Dim query = "servicios_guardar_datos_ckl " &
                    activo.folio_cuestionario & "," & activo.folio & "," & activo.orden & "," & activo.folio_zona &
                    "," & activo.folio_activo & "," & activo.folio_criterio & ",0"
                Dim comando As New SqlCommand(query, objConexion_scoi)
                objConexion_scoi.Open()
                comando.ExecuteNonQuery()
                objConexion_scoi.Close()
                total += 1
            Next
        Catch
            Return total
        End Try
        Return total
    End Function
End Class