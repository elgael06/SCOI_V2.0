Imports MySql.Data.MySqlClient
Imports System.Data
Imports System.IO

Public Class actividades
    Inherits System.Web.UI.Page
    Public conn As New MySqlConnection
    Public estadodeconexionprevia As ConnectionState
    Public comando As MySqlCommand
    Public adaptador As New MySqlDataAdapter

    Public consulta As String = ""
    Public sentencia As String = ""
    Public fecha As Date
    Public comentario As String = ""
    Public datareader As MySqlDataReader
    Public data As New DataSet
    Dim existe As Boolean
    Dim vencimiento As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ' Esto sirve para cargar los controles una sola vez y no cada vez que se haga postback
        If Page.IsPostBack Then
            ' aqui no haremos nada
        Else
            'aca pones todos lo eventos y funciones que deben cargarse una unica vez
            'limpiar_campos()
            cargar_procesos()
            cargar_usuarios()
            cargar_tipoevidencias()
            cargar_querys()
            TextBox2.Text = "" : TextBox3.Text = "" : TextBox4.Text = "" : TextBox5.Text = "" : TextBox6.Text = "" : TextBox7.Text = "" : TextBox8.Text = ""
            deshabilitar_objetosact()

        End If
    End Sub
    Sub limpiar_campos()
        TextBox4.Text = "" : TextBox5.Text = "" : TextBox6.Text = "" : TextBox7.Text = "" : TextBox8.Text = "" : TextBox9.Text = "" : TextBox10.Text = ""
        TextBox13.Text = ""
        Label11.Text = ""
    End Sub
    Sub cargar_procesos()
        ComboBox1.Items.Clear()
        '----------------------------cargar DDL2---------------------------
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select nombre_proceso from procesos ORDER BY nombre_proceso ASC;"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                ComboBox1.Items.Add(datareader.GetValue(0))
            End While
        End If
        conn.Close()
    End Sub
    Sub cargar_usuarios()
        ComboBox3.Items.Clear()
        '----------------------------cargar DDL2---------------------------
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select nombre_usuario from usuario ORDER BY nombre_usuario ASC;"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                ComboBox3.Items.Add(datareader.GetValue(0))
            End While
        End If
        conn.Close()
    End Sub
    Sub cargar_detalleprocesos()
        ComboBox2.Items.Clear()
        '----------------------------cargar DDL2---------------------------
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select detalle_proceso from detalleprocesos where codigo_proceso = '" & TextBox2.Text & "' ORDER BY detalle_proceso ASC"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                ComboBox2.Items.Add(datareader.GetValue(0))
            End While
        End If
        conn.Close()
    End Sub
    Sub cargar_tipoevidencias()
        ComboBox4.Items.Clear()
        '----------------------------cargar DDL2---------------------------
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select tipo_evidencia from evidencias"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                ComboBox4.Items.Add(datareader.GetValue(0))
            End While
        End If
        conn.Close()
    End Sub
    Sub cargar_querys()
        ComboBox5.Items.Clear()
        '----------------------------cargar DDL2---------------------------
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select nombre_query from querys"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                ComboBox5.Items.Add(datareader.GetValue(0))
            End While
        End If
        conn.Close()
    End Sub

    Protected Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click

        If ComboBox1.Text <> "" Or ComboBox2.Text <> "" Then
            ' primeros creamos el id para la actividad
            Label12.Text = "Por favor seleccione los datos requeridos"
            ' despues mostramos los objetos para capturar lo relacionado a la o las actividades
            habilitar_objetosact()
            ' mostramos los datos de la seleccion
            TextBox4.Text = ComboBox1.Text
            TextBox5.Text = ComboBox2.Text
        Else
            'mostramos el mensaje que sea necesario para indicar que se verifique que se complete la informacion
        End If
    End Sub
    Sub habilitar_objetosact()
        TextBox4.Enabled = True : TextBox5.Enabled = True : TextBox6.Enabled = True : TextBox7.Enabled = True : TextBox8.Enabled = True : TextBox10.Enabled = True
        Button3.Enabled = True
        GridView1.Visible = True
    End Sub
    Sub deshabilitar_objetosact()
        TextBox4.Enabled = False : TextBox5.Enabled = False : TextBox6.Enabled = False : TextBox7.Enabled = False : TextBox8.Enabled = False : TextBox10.Enabled = False
        Button3.Enabled = False
        ComboBox5.Enabled = False
        TextBox14.Text = ""
        limpiar_campos()
        'GridView1.Visible = False
    End Sub

    Protected Sub ComboBox2_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox2.SelectedIndexChanged
        ' cargamos el id del  detalle del proceso
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select id_detalle from detalleprocesos where detalle_proceso = '" & ComboBox2.Text & "'"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                TextBox3.Text = datareader.GetValue(0)
                TextBox5.Text = ComboBox2.Text
            End While
            cargar_gridview()
            GridView1.Visible = True
            GridView1.AutoGenerateDeleteButton = True
        End If
        conn.Close()
        ' limpiamos los objetos  para la captura de las actividades
        limpiar_campos()
        ' cargamos las actividades relacionadas con este proceso y detalle de procesos y los mostramos en el gridview1

        ' ocultamos los objetos
        deshabilitar_objetosact()
    End Sub

    Protected Sub ComboBox1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox1.SelectedIndexChanged
        ' cargamos el id del proceso
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select codigo_proceso, codigo_perfil from procesos where nombre_proceso = '" & ComboBox1.Text & "'"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                TextBox2.Text = datareader.GetValue(0)
                TextBox4.Text = ComboBox1.Text
                TextBox11.Text = datareader.GetValue(1)
            End While
        End If
        conn.Close()
        buscar_responsable_proceso()
        ' cargamos la responsabilidades del perfil seleccionado
        cargar_detalleprocesos()
        ' limpiamos los objetos para la captura de las actividades
        limpiar_campos()
        ' ocultamos los objetos
        deshabilitar_objetosact()
    End Sub
    Sub buscar_responsable_proceso()
        ' cargamos el id del proceso
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select nombre_usuario from relacionup where codigo_puesto = '" & TextBox11.Text & "'"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                TextBox12.Text = datareader.GetValue(0)
            End While
        End If
        conn.Close()
    End Sub

    Protected Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If TextBox7.Text <> "" Then
            'se crea una conexion a la base de datos MySQL
            Dim connection As MySqlConnection
            Dim cuentalineas As Integer
            connection = New MySqlConnection
            'se apunta a la cadena de conexion guardada en el archivo Web.config
            connection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
            Dim estadodeconexionprevia As ConnectionState
            estadodeconexionprevia = connection.State
            'Try
            If connection.State = ConnectionState.Closed Then
                connection.Open()
            End If
            'se ejecuta una consulta SQL
            If ComboBox4.Text = "SQL" Then
                Dim ComandoSQL As New MySqlCommand("INSERT INTO actividades (actividad, vencimiento, peridiocidad, codigo_proceso, nombre_proceso, id_detalle, detalle_proceso, tipo_evidencia, id_query, nombre_query, detalle_evidencia, ruta_adjunto, usuario_asignado, id_usuario) VALUES ('" & TextBox7.Text & "', '" & TextBox9.Text & "', '" & DropDownList1.Text & "', '" & TextBox2.Text & "', '" & ComboBox1.Text & "', '" & TextBox3.Text & "', '" & ComboBox2.Text & "', '" & ComboBox4.Text & "', '" & TextBox14.Text & "', '" & ComboBox5.Text & "', '" & TextBox6.Text & "', '" & TextBox10.Text & "', '" & ComboBox3.Text & "', '" & TextBox13.Text & "')", connection)
                cuentalineas = ComandoSQL.ExecuteNonQuery
            Else
                Dim ComandoSQL As New MySqlCommand("INSERT INTO actividades (actividad, vencimiento, peridiocidad, codigo_proceso, nombre_proceso, id_detalle, detalle_proceso, tipo_evidencia, detalle_evidencia, ruta_adjunto, usuario_asignado, id_usuario) VALUES ('" & TextBox7.Text & "', '" & TextBox9.Text & "', '" & DropDownList1.Text & "', '" & TextBox2.Text & "', '" & ComboBox1.Text & "', '" & TextBox3.Text & "', '" & ComboBox2.Text & "', '" & ComboBox4.Text & "', '" & TextBox6.Text & "', '" & TextBox10.Text & "', '" & ComboBox3.Text & "', '" & TextBox13.Text & "')", connection)
                cuentalineas = ComandoSQL.ExecuteNonQuery
            End If
            If cuentalineas > 0 Then ' si se encontraron registros entonces hacemos esto
                Label13.Text = "¡La actividad se ha agregado correctamente!"
                limpiar_campos()
                cargar_gridview()
                GridView1.Visible = True
            Else
                Label13.Text = "¡La actividad no se ha agregado correctamente!"
            End If
            'Catch ex As Exception ' si hay algun error se hace esto
            'Label13.Text = "¡ha ocurrido un error al conectar con la base de datos!"
            'End Try
        Else
            ' aqui mostramos el mensaje que indique que al menos se necesita este dato
            Label13.Text = "¡Es necesario que escriba la actividad a agregar!"
        End If
    End Sub
    Private Sub Submit1_ServerClick(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Submit1.ServerClick
        If Not File1.PostedFile Is Nothing And File1.PostedFile.ContentLength > 0 Then

            Dim fn As String = System.IO.Path.GetFileName(File1.PostedFile.FileName)
            Dim SaveLocation As String = Server.MapPath("Data") & "\" & fn
            Try
                File1.PostedFile.SaveAs(SaveLocation)
                TextBox10.Text = fn
                'Response.Write("El archivo ha sido cargado.")
                Label11.Text = "Se cargo el archivo:"

            Catch Exc As Exception
                Response.Write("Error: " & Exc.Message)
            End Try
        Else
            Label11.Text = "Seleccione un archivo para cargar."
        End If
    End Sub

    Protected Sub DropDownList1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles DropDownList1.SelectedIndexChanged
        If DropDownList1.Text = "SEMANAL" Then
            TextBox9.Visible = False : TextBox9.TextMode = TextBoxMode.SingleLine
            DropDownList3.Visible = True
        ElseIf DropDownList1.Text = "FECHA ESPECIFICA" Then
            TextBox9.TextMode = TextBoxMode.Date : TextBox9.Visible = True
            DropDownList3.Visible = False
        Else
            TextBox9.TextMode = TextBoxMode.SingleLine : TextBox9.Visible = True
            DropDownList3.Visible = False
        End If
    End Sub

    Private Sub DropDownList3_Load(sender As Object, e As EventArgs) Handles DropDownList3.Load
        TextBox9.Text = DropDownList3.Text
    End Sub

    Protected Sub DropDownList3_SelectedIndexChanged(sender As Object, e As EventArgs) Handles DropDownList3.SelectedIndexChanged
        TextBox9.Text = DropDownList3.Text
    End Sub

    Protected Sub GridView1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles GridView1.SelectedIndexChanged
        'asignamos el id de la actividad al textbox8
        ' Obtiene la el valor de la linea seleccionada actualmente
        Dim row As GridViewRow = GridView1.SelectedRow
        'Call limpiar_campos()
        TextBox8.Text = row.Cells(1).Text
        'GridView1.Visible = False
        'cargamos los datos relativos a la actividad seleccionada
        buscar_datos_actividad()
    End Sub
    Sub buscar_datos_actividad()
        ' REALIZAMOS LA CONSULTA DEL REGISTRO SOLICITADO EN TEXTBOX1.TEXT
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select actividad, vencimiento, peridiocidad, codigo_proceso, nombre_proceso, id_detalle, detalle_proceso, tipo_evidencia, detalle_evidencia, ruta_adjunto, usuario_asignado, id_query, nombre_query, id_usuario from actividades where id_actividad= '" & TextBox8.Text & "'"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        ' si encontramos registros entonces colocamos la informacion en los textboxes correspondientes
        If datareader.HasRows Then
            While datareader.Read
                ' colocamos la informacion del query en cada uno de los elementos
                TextBox7.Text = datareader.GetValue(0)
                DropDownList1.Text = datareader.GetValue(2)
                If datareader.GetValue(2) = "SEMANAL" Then
                    TextBox9.Text = datareader.GetValue(1)
                    DropDownList3.Visible = True
                    DropDownList3.Text = datareader.GetValue(1)
                Else
                    TextBox9.Text = datareader.GetValue(1)
                    DropDownList3.Visible = False
                End If
                TextBox2.Text = datareader.GetValue(3)
                TextBox4.Text = datareader.GetValue(4)
                TextBox3.Text = datareader.GetValue(5)
                TextBox5.Text = datareader.GetValue(6)
                ComboBox4.Text = datareader.GetValue(7)
                TextBox6.Text = datareader.GetValue(8)
                TextBox10.Text = datareader.GetValue(9)

                If IsDBNull(datareader("usuario_asignado")) Then
                Else
                    ComboBox3.Text = datareader.GetValue(10)
                End If
                If datareader.GetValue(7) = "SQL" Then
                    If IsDBNull(datareader("id_query")) Then
                    Else
                        TextBox14.Text = datareader.GetValue(11)
                    End If
                    If IsDBNull(datareader("nombre_query")) Then
                    Else
                        ComboBox5.Text = datareader.GetValue(12)
                    End If
                    TextBox13.Text = datareader.GetValue(13)
                End If
            End While
            'cerramos la conexion
            conn.Close()
        End If
    End Sub
    Sub cargar_gridview()
        'se crea una conexion a la base de datos MySQL
        Dim connection As MySqlConnection
        connection = New MySqlConnection
        'se apunta a la cadena de conexion guardada en el archivo Web.config
        connection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        Dim estadodeconexionprevia As ConnectionState
        estadodeconexionprevia = connection.State
        Try
            If connection.State = ConnectionState.Closed Then
                connection.Open()
            End If
            Dim ComandoSQL As New MySqlCommand("SELECT * FROM actividades WHERE id_detalle = '" & TextBox3.Text & "' and codigo_proceso = '" & TextBox2.Text & "'", connection)
            Dim ds As New DataSet
            Dim da As New MySqlDataAdapter(ComandoSQL)
            da.Fill(ds)
            GridView1.DataSource = ds.Tables(0)
            GridView1.DataBind()
            GridView1.Visible = True
        Catch ex As Exception
            Throw ex
        End Try
    End Sub

    Protected Sub LinkButton2_Click(sender As Object, e As EventArgs) Handles LinkButton2.Click
        'Try
        'Process.Start("\data\" & TextBox10.Text)
        'Catch
        'Code to handle the error.
        'End Try
        'LinkButton2.OnClientClick = "\data\" & TextBox10.Text
    End Sub

    Protected Sub Button4_Click(sender As Object, e As EventArgs) Handles Button4.Click
        'MODIFICAMOS LA INFORMACION DEL REGISTRO SOLICITADO
        Try
            If ComboBox4.Text = "SQL" Then
                consulta = "update actividades set actividad = '" & TextBox7.Text & "', vencimiento = '" & TextBox9.Text & "', peridiocidad= '" & DropDownList1.Text & "', tipo_evidencia = '" & ComboBox4.Text & "', id_query = '" & TextBox14.Text & "', nombre_query = '" & ComboBox5.Text & "', detalle_evidencia = '" & TextBox6.Text & "', ruta_adjunto = '" & TextBox10.Text & "', usuario_asignado = '" & ComboBox3.Text & "', id_usuario = '" & TextBox13.Text & "' where id_actividad= '" & TextBox8.Text & "'"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
                conn.Open()
                comando = New MySqlCommand(consulta, conn)
                comando.ExecuteNonQuery()
            Else
                consulta = "update actividades set actividad = '" & TextBox7.Text & "', vencimiento = '" & TextBox9.Text & "', peridiocidad= '" & DropDownList1.Text & "', tipo_evidencia = '" & ComboBox4.Text & "', detalle_evidencia = '" & TextBox6.Text & "', ruta_adjunto = '" & TextBox10.Text & "', usuario_asignado = '" & ComboBox3.Text & "', id_usuario = '" & TextBox13.Text & "' where id_actividad= '" & TextBox8.Text & "'"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
                conn.Open()
                comando = New MySqlCommand(consulta, conn)
                comando.ExecuteNonQuery()
            End If
            Label13.Text = "¡Los cambios han sido aplicados correctamente!"
        Catch ex As Exception
            'Label13.Text = "¡Ha ocurrido un error, verifique por favor!"
        End Try
        conn.Close()
        limpiar_campos()
        cargar_gridview()
    End Sub

    Protected Sub Button5_Click(sender As Object, e As EventArgs) Handles Button5.Click
        ' eliminamos la responsabilidad seleccionada del gridview1
        Dim connection As MySqlConnection
        connection = New MySqlConnection
        'se apunta a la cadena de conexion guardada en el archivo Web.config
        connection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        Dim estadodeconexionprevia As ConnectionState
        estadodeconexionprevia = connection.State
        If connection.State = ConnectionState.Closed Then
            connection.Open()
        End If
        Dim query As String = "DELETE FROM actividades where id_actividad=" & Val(TextBox8.Text)
        Dim cmd As New MySqlCommand(query, connection)
        cmd.ExecuteNonQuery()
        limpiar_campos()
        cargar_gridview()
    End Sub

    Protected Sub ComboBox3_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox3.SelectedIndexChanged
        ' cargamos el id del usuario asignado
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select id_usuario from usuario where nombre_usuario = '" & ComboBox3.Text & "'"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                TextBox13.Text = datareader.GetValue(0)
            End While
        End If
        conn.Close()
    End Sub

    Protected Sub ComboBox4_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox4.SelectedIndexChanged
        If ComboBox4.Text = "SQL" Then
            ComboBox5.Enabled = True
        Else
            ComboBox5.Enabled = False
        End If
    End Sub

    Protected Sub ComboBox5_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox5.SelectedIndexChanged
        ' cargamos el id del proceso
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select id_query, consulta from querys where nombre_query = '" & ComboBox5.Text & "'"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                TextBox14.Text = datareader.GetValue(0)
                TextBox6.Text = datareader.GetValue(1)
            End While
        End If
        conn.Close()
    End Sub
End Class