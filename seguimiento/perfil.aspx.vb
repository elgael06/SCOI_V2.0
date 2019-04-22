Imports System.Data.SqlClient
Public Class perfil
    Inherits System.Web.UI.Page
    'Creamos la cadena de conexion'
    Dim MiConexion As String = "Data Source=SERVERCSERVER\SQLEXPRESS;Initial Catalog=seguimiento;Persist Security Info=True;User ID=sa;Password=Ragazi/*-1"

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(MiConexion)
    Dim Da As New SqlDataAdapter                         'Creamos el objeto DataAdapter para rellenar el DataSet
    Dim Ds As New DataSet                                'DataSet para almacenar Datos
    Public fechadehoy As Date = Today.Date ' asignamos la fecha de hoy
    Public semana, mes, ano As Integer
    Public msg As String
    Public encontrosemana, encontromes As Boolean
    Public perfil As String = ""

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ' Esto sirve para cargar los controles una sola vez y no cada vez que se haga postback
        If Page.IsPostBack Then
            ' aqui no haremos nada
        Else
            'aca pones todos lo eventos y funciones que deben cargarse una unica vez
            limpiar_campos()
            ' determinamos el numero de semana
            semana = DatePart(DateInterval.WeekOfYear, fechadehoy)
            TxtSemana.Text = semana
            'determinamos el numero del mes
            mes = DatePart(DateInterval.Month, fechadehoy)
            TxtMes.Text = mes
            'determinamos el numero de año
            ano = DatePart(DateInterval.Year, fechadehoy)
            TxtAno.Text = ano
            'MsgBox("Semana: " & semana & " Mes: " & mes & " Año: " & ano)
            buscaperfil()
        End If
    End Sub
    Sub buscaperfil()
        'primero buscamos al usuario en la base de datos de la relacion de perfiles
        Dim sqlbuscarup As String = "SELECT * FROM rup WHERE usuario = @usuario"
        Dim comando As New SqlCommand(sqlbuscarup, objConexion)
        comando.Parameters.Add("@usuario", SqlDbType.VarChar).Value = Session("usuario")
        Dim da As SqlDataAdapter = New SqlDataAdapter(comando)
        Dim dt As New DataTable
        da.Fill(dt)

        If dt.Rows.Count > 0 Then
            Dim row As DataRow = dt.Rows(0)
            perfil = row("perfil")
            'asignamos las variables globales
            Session.Add("IDPerfil", perfil)
            ASPxCardView2.DataBind()
        End If
    End Sub
    Sub limpiar_campos()
        TxtMpaa.Text = "" : TxtPActual.Text = "" : TxtAMensual.Text = "" : TxtPAMensual.Text = "" : TxtDAMensual.Text = ""
        TxtAAnual.Text = "" : TxtPAAnual.Text = "" : TxtDAAnual.Text = "" : TxtFactores.Text = "" : TxtAcciones.Text = ""
    End Sub

    Public Sub buscar_indicador()
        Dim sqlbuscaind As String = "SELECT * FROM matrizhoshin WHERE id_entrada = @id_entrada"
        Dim comando As New SqlCommand(sqlbuscaind, objConexion)
        comando.Parameters.AddWithValue("@id_entrada", Val(ComboIDEntrada.Value))
        Dim da As SqlDataAdapter = New SqlDataAdapter(comando)
        Dim dt As New DataTable
        da.Fill(dt)

        If dt.Rows.Count > 0 Then
            Dim row As DataRow = dt.Rows(0)
            TxtCodigoMatriz.Text = CStr(row("codigo_matriz"))
            TxtQue.Text = CStr(row("que"))
            TxtComo.Text = CStr(row("como"))
            TxtUnidadMedida.Text = CStr(row("unidad_medida"))
            TxtOsemanal.Text = CStr(row("objetivo_periodo"))
            TxtOMensual.Text = CStr(row("objetivo_mensual"))
            TxtOAnual.Text = CStr(row("objetivo_anual"))
            TxtMedicion.Text = CStr(row("medicion"))
            If IsDBNull(row("objetivo_panterior")) Then
            Else
                TxtPAnterior.Text = CStr(row("objetivo_panterior"))
            End If
            'mes aplica
            If IsDBNull(row("mes_aplica")) Then
            Else
                ASPxFormLayout1_E1.Text = CStr(row("mes_aplica"))
            End If
            'año aplica
            If IsDBNull(row("ano_aplica")) Then
            Else
                ASPxFormLayout1_E2.Text = CStr(row("ano_aplica"))
            End If
            'asignamos a las variables
            TxtResponsable.Text = CStr(row("responsable"))
            TxtPeriodicidad.Text = CStr(row("Periodicidad"))
            TxtRojo.Text = CStr(row("rojo"))
            TxtAzul.Text = CStr(row("azul"))
            TxtMinimo.Text = CStr(row("minimo"))
            TxtMaximo.Text = CStr(row("maximo"))
            TxtOperadorRojo.Text = CStr(row("operador_rojo"))
            TxtOperadorAzul.Text = CStr(row("operador_azul"))
            If IsDBNull(row("query")) Then

            Else
                TxtIDQuery.Text = CStr(row("query"))
                'buscamos el query para este indicador
                buscarquery()
            End If

            'buscamos si este indicador ya fue registrado en el periodo indicado
            buscaregistro()
        End If
    End Sub
    Public Sub buscaregistro()
        encontrosemana = False : encontromes = False
        If TxtPeriodicidad.Text = "Semanal" Then
            'establecemos el procedimiento para  buscar si existe este indicador en el mes
            Dim sqlbuscasemana As String = "SELECT * FROM bitacorahk WHERE id_entrada = @id_entrada AND semana = @semana AND mes_aplica = @mes_aplica AND ano_aplica = @ano_aplica"
            Dim comando As New SqlCommand(sqlbuscasemana, objConexion)
            comando.Parameters.Add("@id_entrada", SqlDbType.Int).Value = ComboIDEntrada.Value
            comando.Parameters.Add("@semana", SqlDbType.Int).Value = Val(TxtSemana.Text)
            comando.Parameters.Add("@mes_aplica", SqlDbType.VarChar).Value = ASPxFormLayout1_E1.Text
            comando.Parameters.Add("@ano_aplica", SqlDbType.Int).Value = Val(ASPxFormLayout1_E2.Text)
            Dim da As SqlDataAdapter = New SqlDataAdapter(comando)
            Dim dt As New DataTable
            da.Fill(dt)

            If dt.Rows.Count > 0 Then
                'si encontramos que existe entonces mandamos el mensaje
                encontrosemana = True
                BtnGuardar.Enabled = False
                MsgBox("encontrosemana = verdadero")
            Else
                BtnGuardar.Enabled = True
                MsgBox("encontrosemana = falso")
            End If
        End If
        If TxtPeriodicidad.Text = "Mensual" Then
            ' establecemos el procedimiento para buscar si existe este indicador en el mes del año
            Dim sqlbuscames As String = "SELECT * FROM bitacorahk WHERE id_entrada = @id_entrada AND mes = @mes AND ano = @ano"
            Dim comando As New SqlCommand(sqlbuscames, objConexion)
            comando.Parameters.Add("@id_entrada", SqlDbType.Int).Value = ComboIDEntrada.Value
            comando.Parameters.Add("@mes", SqlDbType.Int).Value = Val(TxtMes.Text)
            comando.Parameters.Add("@ano", SqlDbType.Int).Value = Val(TxtAno.Text)
            Dim da As SqlDataAdapter = New SqlDataAdapter(comando)
            Dim dt As New DataTable
            da.Fill(dt)

            If dt.Rows.Count > 0 Then
                'si encontramos que existe entonces mandamos el mensaje
                encontromes = True
                BtnGuardar.Enabled = False
                MsgBox("encontromes = verdadero")
            Else
                BtnGuardar.Enabled = True
                MsgBox("encontromes = falso")
            End If
        End If
    End Sub
    Sub buscarquery()
        TxtIDQuery.Text = "" : TxtStrConexion.Text = "" : TxtStrConsulta.Text = ""

        'establecemos el procedimiento para  buscar si existe este indicador en el mes
        Dim sqlbuscasemana As String = "SELECT * FROM queries WHERE id_query = @id_query"
        Dim comando As New SqlCommand(sqlbuscasemana, objConexion)
        comando.Parameters.Add("@id_query", SqlDbType.Int).Value = Val(TxtIDQuery.Text)
        Dim da As SqlDataAdapter = New SqlDataAdapter(comando)
        Dim dt As New DataTable
        da.Fill(dt)

        If dt.Rows.Count > 0 Then
            Dim row As DataRow = dt.Rows(0)
            'si encontramos que existe entonces mandamos el mensaje
            TxtStrConexion.Text = CStr(row("strconexion"))
            TxtStrConsulta.Text = CStr(row("strconsulta"))
        Else

        End If
    End Sub

    Protected Sub ComboIDEntrada_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboIDEntrada.SelectedIndexChanged
        buscar_indicador()
        limpiar_campos()
    End Sub

    Protected Sub BtnGuardar_Click(sender As Object, e As EventArgs) Handles BtnGuardar.Click
        insertar_objetivo()
    End Sub
    Public Sub insertar_objetivo()

        objConexion.Close()
        ' guardamos los registros en la tabla 
        Dim sqlmatrizhk As String = "INSERT INTO bitacorahk (id_entrada, codigo_matriz, que, como, responsable, periodicidad, objetivo_periodo, unidad_medida, rojo, azul, objetivo_mensual, objetivo_anual, minimo, maximo, medicion, operador_rojo, operador_azul, periodo_anterior, mppa, periodo_actual, acumulado_mensual, presupuesto_acumulado, desfase_acum_mensual, acumulado_anual, acumulado_anual_presup, desfase_acum_anual, factores, acciones, fecha_registro, semana, mes, ano, porc_avancepactual, porc_avancepanterior, porc_dam, porc_daa, mes_aplica, ano_aplica) VALUES (@id_entrada, @codigo_matriz, @que, @como, @responsable, @periodicidad, @objetivo_periodo, @unidad_medida, @rojo, @azul, @objetivo_mensual, @objetivo_anual, @minimo, @maximo, @medicion, @operador_rojo, @operador_azul, @periodo_anterior, @mppa, @periodo_actual, @acumulado_mensual, @presupuesto_acumulado, @desfase_acum_mensual, @acumulado_anual, @acumulado_anual_presup, @desfase_acum_anual, @factores, @acciones, @fecha_registro, @semana, @mes, @ano, @porc_avancepactual, @porc_avancepanterior, @porc_dam, @porc_daa, @mes_aplica, @ano_aplica)"
        Dim comando As New SqlCommand(sqlmatrizhk, objConexion)
        'Try
        comando.CommandType = CommandType.Text
        'agregamos los elementos que ya conocemos de la tabla de matrizhoshin
        comando.Parameters.Add("@id_entrada", SqlDbType.Int).Value = ComboIDEntrada.Value
        comando.Parameters.Add("@codigo_matriz", SqlDbType.VarChar).Value = TxtCodigoMatriz.Text
        comando.Parameters.Add("@que", SqlDbType.VarChar).Value = TxtQue.Text
        comando.Parameters.Add("@como", SqlDbType.VarChar).Value = TxtComo.Text
        comando.Parameters.Add("@responsable", SqlDbType.VarChar).Value = TxtResponsable.Text
        comando.Parameters.Add("@periodicidad", SqlDbType.VarChar).Value = TxtPeriodicidad.Text
        comando.Parameters.Add("@objetivo_periodo", SqlDbType.Decimal).Value = Val(TxtOsemanal.Text)
        comando.Parameters.Add("@unidad_medida", SqlDbType.VarChar).Value = TxtUnidadMedida.Text
        comando.Parameters.Add("@rojo", SqlDbType.Decimal).Value = Val(TxtRojo.Text)
        comando.Parameters.Add("@azul", SqlDbType.Decimal).Value = Val(TxtAzul.Text)
        comando.Parameters.Add("@objetivo_mensual", SqlDbType.Decimal).Value = Val(TxtOMensual.Text)
        comando.Parameters.Add("@objetivo_anual", SqlDbType.Decimal).Value = Val(TxtOAnual.Text)
        comando.Parameters.Add("@minimo", SqlDbType.Decimal).Value = Val(TxtMinimo.Text)
        comando.Parameters.Add("@maximo", SqlDbType.Decimal).Value = Val(TxtMaximo.Text)
        comando.Parameters.Add("@medicion", SqlDbType.VarChar).Value = TxtMedicion.Text
        comando.Parameters.Add("@operador_rojo", SqlDbType.VarChar).Value = TxtOperadorRojo.Text
        comando.Parameters.Add("@operador_azul", SqlDbType.VarChar).Value = TxtOperadorAzul.Text
        comando.Parameters.Add("@periodo_anterior", SqlDbType.Decimal).Value = TxtPAnterior.Text
        'agregamos los elementos nuevos
        comando.Parameters.Add("@mppa", SqlDbType.Decimal).Value = Val(TxtMpaa.Text)
        comando.Parameters.Add("@periodo_actual", SqlDbType.Decimal).Value = Val(TxtPActual.Text)
        comando.Parameters.Add("@acumulado_mensual", SqlDbType.Decimal).Value = Val(TxtAMensual.Text)
        comando.Parameters.Add("@presupuesto_acumulado", SqlDbType.Decimal).Value = Val(TxtPAMensual.Text)
        comando.Parameters.Add("@desfase_acum_mensual", SqlDbType.Decimal).Value = Val(TxtDAMensual.Text)
        comando.Parameters.Add("@acumulado_anual", SqlDbType.Decimal).Value = Val(TxtAAnual.Text)
        comando.Parameters.Add("@acumulado_anual_presup", SqlDbType.Decimal).Value = Val(TxtPAMensual.Text)
        comando.Parameters.Add("@desfase_acum_anual", SqlDbType.Decimal).Value = Val(TxtDAMensual.Text)
        comando.Parameters.Add("@factores", SqlDbType.VarChar).Value = TxtFactores.Text
        comando.Parameters.Add("@acciones", SqlDbType.VarChar).Value = TxtAcciones.Text
        comando.Parameters.Add("@fecha_registro", SqlDbType.Date).Value = fechadehoy
        comando.Parameters.Add("@semana", SqlDbType.Int).Value = Val(TxtSemana.Text)
        comando.Parameters.Add("@mes", SqlDbType.Int).Value = Val(TxtMes.Text)
        comando.Parameters.Add("@ano", SqlDbType.Int).Value = Val(TxtAno.Text)
        comando.Parameters.Add("@porc_avancepactual", SqlDbType.Decimal).Value = Val(TxtPorc_AvancePActual.Text)
        comando.Parameters.Add("@porc_avancepanterior", SqlDbType.Decimal).Value = Val(TxtPorc_AvancePAnterior.Text)
        comando.Parameters.Add("@porc_dam", SqlDbType.Decimal).Value = Val(TxtPorc_DAM.Text)
        comando.Parameters.Add("@porc_daa", SqlDbType.Decimal).Value = Val(TxtPorc_DAA.Text)
        comando.Parameters.Add("@mes_aplica", SqlDbType.VarChar).Value = ASPxFormLayout1_E1.Text
        comando.Parameters.Add("@ano_aplica", SqlDbType.Decimal).Value = Val(ASPxFormLayout1_E2.Text)
        objConexion.Open()
        comando.ExecuteNonQuery()
        ' hacemos un databind del gridview
        ASPxGridView1.DataBind()
        ' modificamos el periodo anterior
        modificar_periodoanterior()

    End Sub
    Public Sub modificar_periodoanterior()
        objConexion.Close()
        ' guardamos los registros en la tabla folioencuestas
        Dim sqlactualizaPA As String = "UPDATE matrizhoshin SET objetivo_panterior= @objetivo_panterior, fecha_ultima_entrada= @fecha_ultima_entrada WHERE id_entrada = @id_entrada"
        Dim comando As New SqlCommand(sqlactualizaPA, objConexion)
        'Try
        comando.CommandType = CommandType.Text
        comando.Parameters.Add("@id_entrada", SqlDbType.Int).Value = ComboIDEntrada.Value
        comando.Parameters.Add("@objetivo_panterior", SqlDbType.Decimal).Value = Val(TxtPActual.Text)
        comando.Parameters.Add("@fecha_ultima_entrada", SqlDbType.Date).Value = fechadehoy
        objConexion.Open()
        comando.ExecuteNonQuery()
        grid.DataBind()
        'limpiamos los campos
        limpiar_campos()
    End Sub

    Protected Sub TxtAMensual_TextChanged(sender As Object, e As EventArgs) Handles TxtAMensual.TextChanged
        Dim porcdam As Decimal = 0
        If Val(TxtAMensual.Text) <> 0 Then
            TxtDAMensual.Text = Val(TxtAMensual.Text) - Val(TxtPAMensual.Text)
            porcdam = (Val(TxtDAMensual.Text) / Val(TxtAMensual.Text)) * 100 ' determinamos el % de avance con relacion al acumulado mensual
            TxtPorc_DAM.Text = porcdam
        Else
            TxtDAMensual.Text = 0
        End If

    End Sub

    Protected Sub TxtAAnual_TextChanged(sender As Object, e As EventArgs) Handles TxtAAnual.TextChanged
        Dim porcdaa As Decimal = 0
        If Val(TxtAAnual.Text) <> 0 Then
            TxtDAAnual.Text = Val(TxtAAnual.Text) - Val(TxtPAAnual.Text)
            porcdaa = (Val(TxtDAAnual.Text) / Val(TxtAAnual.Text)) * 100 ' determinamos el % de avance con relacion al acumulado anual
            TxtPorc_DAA.Text = porcdaa
        Else
            TxtDAAnual.Text = 0
        End If
    End Sub

    Protected Sub TxtPActual_TextChanged(sender As Object, e As EventArgs) Handles TxtPActual.TextChanged
        Dim porcpac, porcpan As Decimal
        porcpac = 0 : porcpan = 0
        porcpac = (Val(TxtPActual.Text) / Val(TxtOsemanal.Text)) * 100 ' determinamos el % de avance con relacion al periodo actual
        TxtPorc_AvancePActual.Text = porcpac
        porcpan = (Val(TxtPAnterior.Text) / Val(TxtOsemanal.Text)) * 100 ' determinamos el % de avance con relacion al periodo anterior
        TxtPorc_AvancePAnterior.Text = porcpan

    End Sub
End Class