Imports MySql.Data.MySqlClient
Imports System.Data
Imports System.IO

Public Class bitacoras
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
            cargar_usuarios()
            cargar_tipoevidencias()
            TextBox2.Text = "" : TextBox3.Text = "" : TextBox4.Text = "" : TextBox5.Text = "" : TextBox6.Text = "" : TextBox7.Text = "" : TextBox8.Text = ""
        End If
    End Sub
    Sub cargar_usuarios()
        ComboBox1.Items.Clear()
        '----------------------------cargar DDL2---------------------------
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select nombre_usuario from usuario ORDER BY nombre_usuario ASC;"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                ComboBox1.Items.Add(datareader.GetValue(0))
            End While
        End If
        conn.Close()
    End Sub
    Sub cargar_tipoevidencias()
        DropDownList2.Items.Clear()
        '----------------------------cargar DDL2---------------------------
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select tipo_evidencia from evidencias"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                DropDownList2.Items.Add(datareader.GetValue(0))
            End While
        End If
        conn.Close()
    End Sub
    Sub limpiar_campos()
        TextBox4.Text = "" : TextBox5.Text = "" : TextBox6.Text = "" : TextBox7.Text = "" : TextBox8.Text = "" : TextBox9.Text = "" : TextBox10.Text = ""
        TextBox14.Text = ""
        Label11.Text = ""
    End Sub


    Protected Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If ComboBox2.Text = "NO CUMPLO" Then

        ElseIf ComboBox2.Text = "REGISTRAR AVANCE" Then

        ElseIf ComboBox2.Text = "ACTIVIDAD TERMINADA" Then

        End If
        guardar_avance()

    End Sub
    Sub guardar_avance()

        Dim hoy As String
        hoy = Now.ToString
        TextBox13.Text = CDate(hoy).ToString("yyyy-MM-dd") ' Aqui asignamos la fecha de hoy

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
        Dim ComandoSQL As New MySqlCommand("INSERT INTO bitacoras (fecha_realizado, id_actividad, actividad, evidencia, id_estado, estado, codigo_proceso, nombre_proceso, id_detalle, detalle_proceso, id_usuario, nombre_usuario) VALUES ('" & CDate(TextBox13.Text).ToString("yyyy-MM-dd") & "', '" & TextBox8.Text & "', '" & TextBox7.Text & "', '" & TextBox10.Text & "', '" & TextBox15.Text & "', '" & ComboBox2.Text & "', '" & TextBox2.Text & "', '" & TextBox4.Text & "', '" & TextBox3.Text & "', '" & TextBox5.Text & "', '" & TextBox1.Text & "', '" & ComboBox1.Text & "')", connection)
        cuentalineas = ComandoSQL.ExecuteNonQuery
        If cuentalineas > 0 Then ' si se encontraron registros entonces hacemos esto
            Label13.Text = "¡La actividad se ha agregado correctamente!"
            limpiar_campos()
        Else
            Label13.Text = "¡La actividad no se ha agregado correctamente!"
        End If
        'Catch ex As Exception ' si hay algun error se hace esto
        'Label13.Text = "¡ha ocurrido un error al conectar con la base de datos!"
        'End Try
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

    Protected Sub ComboBox1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox1.SelectedIndexChanged
        ' cargamos el id del proceso
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select id_usuario from usuario where nombre_usuario = '" & ComboBox1.Text & "'"
        comando = New MySqlCommand(consulta, conn)
        datareader = comando.ExecuteReader
        If datareader.HasRows Then
            While datareader.Read
                TextBox1.Text = datareader.GetValue(0)
            End While
        End If
        conn.Close()
        limpiar_campos()
        cargar_gridview()
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
            Dim ComandoSQL As New MySqlCommand("SELECT * FROM actividades WHERE id_usuario = '" & TextBox1.Text & "'", connection)
            Dim ds As New DataSet
            Dim da As New MySqlDataAdapter(ComandoSQL)
            da.Fill(ds)
            GridView1.DataSource = ds.Tables(0)
            GridView1.DataBind()
            GridView1.Visible = True
            conn.Close()
        Catch ex As Exception
            Throw ex
        End Try

    End Sub

    Protected Sub GridView1_SelectedIndexChanged(sender As Object, e As EventArgs) Handles GridView1.SelectedIndexChanged

        ' Obtiene la el valor de la linea seleccionada actualmente
        Dim row As GridViewRow = GridView1.SelectedRow

        'asignamos el id de la actividad al textbox8
        TextBox8.Text = row.Cells(1).Text

        'cargamos los datos relativos a la actividad seleccionada
        buscar_datos_actividad()
        TabContainer1.ActiveTabIndex = 1
    End Sub
    Sub buscar_datos_actividad()
        ' REALIZAMOS LA CONSULTA DEL REGISTRO SOLICITADO EN TEXTBOX8.TEXT
        conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
        conn.Open()
        consulta = "select actividad, vencimiento, peridiocidad, codigo_proceso, nombre_proceso, id_detalle, detalle_proceso, tipo_evidencia, detalle_evidencia, ruta_adjunto from actividades where id_actividad= '" & TextBox8.Text & "'"
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
                DropDownList2.Text = datareader.GetValue(7)
                TextBox6.Text = datareader.GetValue(8)
                TextBox14.Text = datareader.GetValue(9)
            End While
            'cerramos la conexion
            conn.Close()
        End If
    End Sub

    Protected Sub ComboBox2_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ComboBox2.SelectedIndexChanged
        If ComboBox2.Text = "NO CUMPLO" Then
            textbox15.text = 0
        ElseIf ComboBox2.Text = "REGISTRAR AVANCE" Then
            TextBox15.Text = 1
        ElseIf ComboBox2.Text = "ACTIVIDAD TERMINADA" Then
            TextBox15.Text = 2
        End If
    End Sub
End Class