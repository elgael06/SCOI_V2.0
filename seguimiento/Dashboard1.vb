Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Text
Imports System.Threading.Tasks
Imports DevExpress.DataAccess
Imports DevExpress.DashboardCommon
Imports MySql.Data.MySqlClient
Imports System.IO

Namespace Win_Dashboards
    Partial Public Class Dashboard1
        Inherits DevExpress.DashboardCommon.Dashboard
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
        Public Sub New()
            InitializeComponent()
            combobox()
        End Sub
        Public Sub combobox()
            'se crea una conexion a la base de datos MySQL
            Dim connection As MySqlConnection
            connection = New MySqlConnection
            'se apunta a la cadena de conexion guardada en el archivo Web.config
            connection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("miconexion").ConnectionString
            Dim estadodeconexionprevia As ConnectionState
            estadodeconexionprevia = connection.State
            If connection.State = ConnectionState.Closed Then
                connection.Open()
            End If
            Try
                Dim ComandoSQL As New MySqlCommand("SELECT descripcion_respon FROM responsabilidad", connection)
                Dim ds As New DataSet
                Dim da As New MySqlDataAdapter(ComandoSQL)
                da.Fill(ds)
                ComboBoxDashboardItem1.DataSource = ds.Tables(0)

            Catch ex As Exception
                Throw ex
            End Try

        End Sub
    End Class
End Namespace
