Imports System.Data.SqlClient
Imports System.IO
Imports System.Data
Public Class main
    Inherits System.Web.UI.MasterPage
    Dim Conexion As String = "Data Source=localhost;Initial Catalog=seguimiento_2;Persist Security Info=True;User ID=sa;Password=Ragazi/*-1"
    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(Conexion)
    Dim Da As New SqlDataAdapter                         'Creamos el objeto DataAdapter para rellenar el DataSet
    Dim Ds As New DataSet                                'DataSet para almacenar Datos
    Dim dr As SqlDataReader
    Dim consulta As String

    Public nivelUsuario As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Session("usuario") = "" Then
            Response.Redirect("login.aspx")

        Else
            Label1.Text = Session("usuario")
            nivelUsuario = Session("niv")
            verificar()
        End If
    End Sub
    Public Sub verificar()
        Dim acceso As acc = New acc()
        nivel_acces_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 6)
        preguntas_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 27)
        cuestionarios_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 28)
        asignacion_cuestionarios_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 29)
        checkList_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 26)
        matrices_ckl_2.Visible = acceso.asignar_Valores(Session("id_usuario"), 26)
        matrices_ckl.Visible = acceso.asignar_Valores(Session("id_usuario"), 26)
        resultados_checkList.Visible = acceso.asignar_Valores(Session("id_usuario"), 20)
        semaforo_vta_express_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 30)
        orden_gasto_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 31)
        insidencias_ckl_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 32)
        monitor_tiendas_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 33)
        Alta_Cursos_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 35)
        Alta_Temas_en_Cursos_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 36)
        alta_cursos_cuestionarios_dh_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 38)
        tablero_cursos_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 39)
        control_cursos_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 40)
        monitor_Analisis_Precios_Competencia_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 41)
        Pre_Orden_Compra_Verdura_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 42)
        alta_cuestionarios_menu.Visible = acceso.asignar_Valores(Session("id_usuario"),45)
        asignaciones_cuestionarios_menu.Visible = acceso.asignar_Valores(Session("id_usuario"),46)
        revicion_cuestionarios_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 47)
        inventarios_parciales_menu.Visible = acceso.asignar_Valores(Session("id_usuario"), 48)
    End Sub
End Class