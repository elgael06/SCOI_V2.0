Imports System.Data.SqlClient

Public Class Matrices_p
    Inherits System.Web.UI.Page

    Public con As New SqlConnection
    Public estadoDeConeccion As ConnectionState
    Public comando As SqlCommand
    Public adaptador As New SqlDataAdapter
    Public sentencia As String = ""
    Public fecha As Date
    Public comentario As String = ""
    Public lectorDatos As SqlDataReader
    Public data As New DataSet

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Page.IsPostBack Then

        Else
            cargarEstablecimientos()
            cargarEtapas()
            cargarUnidades()
            CargarPonderacion()
            cargarElementosInps()
            posicionarCombobox()

        End If
        Dim acceso As acc = New acc()
        If Not (acceso.asignar_Valores(Session("id_usuario"), 17)) Then
            Response.Redirect("Default.aspx")
        End If
    End Sub

    Protected Sub posicionarCombobox()
        cbEstablecimiento1.SelectedIndex = 0
        cbEtapa1.SelectedIndex = 0
        cbUnidad1.SelectedIndex = 0
        cbCuadranteAspec.SelectedIndex = 0
        cbElementoInsp.SelectedIndex = 0

    End Sub

    Protected Sub cargarEstablecimientos()
        con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
        con.Open()
        sentencia = "select nombre_establecimiento from establecimiento"
        comando = New SqlCommand(sentencia, con)
        lectorDatos = comando.ExecuteReader

        If lectorDatos.HasRows Then
            While lectorDatos.Read
                cbEstablecimiento1.Items.Add(lectorDatos.GetValue(0))
            End While
        End If
        con.Close()
    End Sub

    Protected Sub cargarEtapas()
        con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
        con.Open()
        sentencia = "select etapa from matriz_etapas"
        comando = New SqlCommand(sentencia, con)
        lectorDatos = comando.ExecuteReader

        If lectorDatos.HasRows Then
            While lectorDatos.Read
                cbEtapa1.Items.Add(lectorDatos.GetValue(0))
            End While
        End If
        con.Close()
    End Sub
    Protected Sub cargarUnidades()
        con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
        con.Open()
        sentencia = "select unidades from matriz_unidades"
        comando = New SqlCommand(sentencia, con)
        lectorDatos = comando.ExecuteReader

        If lectorDatos.HasRows Then
            While lectorDatos.Read
                cbUnidad1.Items.Add(lectorDatos.GetValue(0))
            End While
        End If
        con.Close()
    End Sub
    'Protected Sub cargarDepartamentos()
    '    con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
    '    con.Open()
    '    sentencia = "select nombre_departamento from departamento"
    '    comando = New SqlCommand(sentencia, con)
    '    lectorDatos = comando.ExecuteReader

    '    If lectorDatos.HasRows Then
    '        While lectorDatos.Read
    '            cbDepartamento1.Items.Add(lectorDatos.GetValue(0))
    '        End While
    '    End If
    '    con.Close()
    'End Sub

    Protected Sub CargarPonderacion()
        con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
        con.Open()
        sentencia = "select aspecto from cuadrantes_aspecto"
        comando = New SqlCommand(sentencia, con)
        lectorDatos = comando.ExecuteReader

        If lectorDatos.HasRows Then
            While lectorDatos.Read
                cbCuadranteAspec.Items.Add(lectorDatos.GetValue(0))
            End While
        End If
        con.Close()

        cbCuadranteAspec.SelectedIndex = 0
    End Sub
    Protected Sub cargarElementosInps()
        con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
        con.Open()
        sentencia = "select elemento_insp from elemento_inspeccion"
        comando = New SqlCommand(sentencia, con)
        lectorDatos = comando.ExecuteReader

        If lectorDatos.HasRows Then
            While lectorDatos.Read
                cbElementoInsp.Items.Add(lectorDatos.GetValue(0))
            End While
        End If
        con.Close()
    End Sub

End Class