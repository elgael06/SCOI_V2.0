<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="perfil.aspx.vb" Inherits="seguimiento.perfil" %>
<%@ Register assembly="DevExpress.Web.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Linear" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Circular" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.State" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Digital" tagprefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
    .auto-style1 {
        width: 100%;
    }
    .auto-style2 {
        width: 199px;
    }

</style>
    <script type="text/javascript">
        function OnGridFocusedRowChanged() {
            // Query the server for the "EmployeeID" and "Notes" fields from the focused row 
            // The values will be returned to the OnGetRowValues() function
            DetailNotes.SetText("Cargando...");
            grid.GetRowValues(grid.GetFocusedRowIndex(), 'id_entrada;id_entrada', OnGetRowValues);

        }
        // Value array contains "EmployeeID" and "Notes" field values returned from the server 
        function OnGetRowValues(values) {
            DetailNotes.SetText(values[1]);
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Perfil de Usuario</h2>
    <div>

        <table class="auto-style1">
            <tr>
                <td class="auto-style2">
                    <dx:ASPxPanel ID="ASPxPanel1" runat="server" Height="286px" Width="257px">
                        <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxImage ID="ASPxImage1" runat="server" ImageUrl="~/production/images/user.png" ShowLoadingImage="True" Height="255px" Width="258px" ImageAlign="Middle">
    </dx:ASPxImage>
                            </dx:PanelContent>
</PanelCollection>
                    </dx:ASPxPanel>
                </td>
                <td>
                    <dx:ASPxCardView ID="ASPxCardView1" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourcePerfil" EnableTheming="True" KeyFieldName="nombre_usuario" Theme="MetropolisBlue" Width="156px">
                        <SettingsEditing Mode="PopupEditForm">
                        </SettingsEditing>
                        <SettingsBehavior AllowSelectByCardClick="True" AllowSelectSingleCardOnly="True" />
                        <SettingsDataSecurity AllowDelete="False" AllowInsert="False" />
                        <SettingsPopup>
                            <EditForm HorizontalAlign="WindowCenter" Modal="True" VerticalAlign="WindowCenter" />
                        </SettingsPopup>
                        <Columns>
                            <dx:CardViewTextColumn FieldName="id_usuario" ReadOnly="True" Visible="False" VisibleIndex="5">
                            </dx:CardViewTextColumn>
                            <dx:CardViewTextColumn Caption="Usuario ID" FieldName="nombre_usuario" ReadOnly="True" VisibleIndex="0">
                            </dx:CardViewTextColumn>
                            <dx:CardViewTextColumn Caption="Nombre Completo" FieldName="nombrecompleto_usuario" VisibleIndex="1">
                            </dx:CardViewTextColumn>
                            <dx:CardViewTextColumn Caption="Correo Electronico" FieldName="email_usuario" VisibleIndex="3">
                            </dx:CardViewTextColumn>
                            <dx:CardViewTextColumn Caption="Nivel de Usuario" FieldName="nivel_usuario" ReadOnly="True" VisibleIndex="4">
                            </dx:CardViewTextColumn>
                            <dx:CardViewTextColumn Caption="Contraseña" FieldName="password_usuario" VisibleIndex="2">
                                <PropertiesTextEdit Password="True">
                                    <ValidationSettings CausesValidation="True" ErrorText="Es necesario proporcionar la contraseña" SetFocusOnError="True">
                                        <RequiredField ErrorText="* Es necesario proporcionar la contraseña" IsRequired="True" />
                                    </ValidationSettings>
                                </PropertiesTextEdit>
                            </dx:CardViewTextColumn>
                        </Columns>
                        <EditFormLayoutProperties>
                            <Items>
                                <dx:CardViewCommandLayoutItem HorizontalAlign="Right">
                                </dx:CardViewCommandLayoutItem>
                                <dx:CardViewColumnLayoutItem ColumnName="password_usuario">
                                </dx:CardViewColumnLayoutItem>
                                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                                </dx:EditModeCommandLayoutItem>
                            </Items>
                        </EditFormLayoutProperties>
                        <CardLayoutProperties>
                            <Items>
                                <dx:CardViewCommandLayoutItem HorizontalAlign="Right" ShowEditButton="True">
                                </dx:CardViewCommandLayoutItem>
                                <dx:CardViewColumnLayoutItem ColumnName="nombre_usuario">
                                </dx:CardViewColumnLayoutItem>
                                <dx:CardViewColumnLayoutItem ColumnName="nombrecompleto_usuario">
                                </dx:CardViewColumnLayoutItem>
                                <dx:CardViewColumnLayoutItem ColumnName="email_usuario">
                                </dx:CardViewColumnLayoutItem>
                                <dx:CardViewColumnLayoutItem ColumnName="nivel_usuario">
                                </dx:CardViewColumnLayoutItem>
                                <dx:CardViewColumnLayoutItem ColumnName="password_usuario">
                                </dx:CardViewColumnLayoutItem>
                                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                                </dx:EditModeCommandLayoutItem>
                            </Items>
                        </CardLayoutProperties>
                    </dx:ASPxCardView>
                    <asp:SqlDataSource ID="SqlDataSourcePerfil" runat="server" ConnectionString="<%$ ConnectionStrings:Conexion %>" SelectCommand="SELECT * FROM [usuarios] WHERE ([nombre_usuario] = @nombre_usuario)">
                        <SelectParameters>
                            <asp:SessionParameter Name="nombre_usuario" SessionField="usuario" Type="String" />
                        </SelectParameters>
                    </asp:SqlDataSource>
                </td>
            </tr>
        </table>
    </div>
    <div>

        <dx:ASPxRoundPanel ID="ASPxRoundPanel1" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Mis Indicadores HK" Height="300px" ShowCollapseButton="true" Theme="MetropolisBlue" Width="100%">
            <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxGridView ID="grid" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourceHKMiPerfil" EnableTheming="True" KeyboardSupport="True" KeyFieldName="id_entrada" Theme="MetropolisBlue" Width="100%" ClientInstanceName="grid" PreviewFieldName="id_entrada" EnableRowsCache="false">
        <Settings HorizontalScrollBarMode="Visible" ShowFilterRow="True" ShowGroupPanel="True" VerticalScrollableHeight="300" VerticalScrollBarMode="Visible" />
        <SettingsBehavior AllowFocusedRow="True" />
        <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False"/>
        <Columns>
            <dx:GridViewDataTextColumn FieldName="id_entrada" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="0" Visible="False">
                <EditFormSettings Visible="False" />
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="codigo_matriz" ShowInCustomizationForm="True" VisibleIndex="1" Caption="Codigo Matriz">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="que" ShowInCustomizationForm="True" VisibleIndex="2" Caption="¿Que?">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="como" ShowInCustomizationForm="True" VisibleIndex="3" Caption="¿Como?">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="periodicidad" ShowInCustomizationForm="True" VisibleIndex="4" Caption="Periodicidad">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="unidad_medida" ShowInCustomizationForm="True" VisibleIndex="5" Caption="Medida">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="medicion" ShowInCustomizationForm="True" VisibleIndex="6" Caption="Medicion" Width="300px">
            </dx:GridViewDataTextColumn>
            <dx:GridViewBandColumn Caption="Objetivos" ShowInCustomizationForm="True" VisibleIndex="7">
                <Columns>
                    <dx:GridViewDataTextColumn Caption="Semanal" FieldName="objetivo_periodo" ShowInCustomizationForm="True" VisibleIndex="0" Width="70px">
                        <HeaderStyle HorizontalAlign="Center" />
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Mensual" FieldName="objetivo_mensual" ShowInCustomizationForm="True" VisibleIndex="1" Width="70px">
                        <HeaderStyle HorizontalAlign="Center" />
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Anual" FieldName="objetivo_anual" ShowInCustomizationForm="True" VisibleIndex="2" Width="70px">
                        <HeaderStyle HorizontalAlign="Center" />
                    </dx:GridViewDataTextColumn>
                </Columns>
                <HeaderStyle HorizontalAlign="Center" />
            </dx:GridViewBandColumn>
            <dx:GridViewBandColumn Caption="Logrado" ShowInCustomizationForm="True" VisibleIndex="8">
                <Columns>
                    <dx:GridViewDataTextColumn Caption="Avance" FieldName="objetivo_panterior" ShowInCustomizationForm="True" VisibleIndex="0">
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataDateColumn Caption="Fecha Avance" FieldName="fecha_ultima_entrada" ShowInCustomizationForm="True" VisibleIndex="1">
                    </dx:GridViewDataDateColumn>
                </Columns>
            </dx:GridViewBandColumn>
            <dx:GridViewBandColumn Caption="Aplica a" ShowInCustomizationForm="True" VisibleIndex="9">
                <Columns>
                    <dx:GridViewDataTextColumn Caption="Mes" FieldName="mes_aplica" ShowInCustomizationForm="True" VisibleIndex="0">
                    </dx:GridViewDataTextColumn>
                    <dx:GridViewDataTextColumn Caption="Año" FieldName="ano_aplica" ShowInCustomizationForm="True" VisibleIndex="1">
                    </dx:GridViewDataTextColumn>
                </Columns>
            </dx:GridViewBandColumn>
        </Columns>
        <ClientSideEvents FocusedRowChanged="function(s, e) { OnGridFocusedRowChanged();}" />         
    </dx:ASPxGridView>
    <asp:SqlDataSource ID="SqlDataSourceHKMiPerfil" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT * FROM [matrizhoshin] ORDER BY [codigo_matriz], [que], [id_entrada]">
    </asp:SqlDataSource>
                </dx:PanelContent>
</PanelCollection>
        </dx:ASPxRoundPanel>
    </div>
<div>
  <asp:SqlDataSource ID="SqlDataSourceBitacoraHK" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT * FROM [bitacorahk]"></asp:SqlDataSource>
</div>
    <div>

        <dx:ASPxTextBox ID="DetailNotes" runat="server" Theme="MetropolisBlue" Width="170px" ClientInstanceName="DetailNotes" AutoPostBack="True" Visible="False">
        </dx:ASPxTextBox>

    </div>
    <div>

        <dx:ASPxRoundPanel ID="ASPxRoundPanel2" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Registro de Indicadores" ShowCollapseButton="true" Theme="MetropolisBlue" Width="100%">
            <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxFormLayout ID="ASPxFormLayout1" runat="server">
        <Items>
            <dx:LayoutItem Caption="Seleccione Indicador">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxComboBox ID="ComboIDEntrada" runat="server" AutoPostBack="True" DataSourceID="SqlDataSourceComboIndHK" ValueField="id_entrada" Width="800px" Theme="MetropolisBlue">
                            <Columns>
                                <dx:ListBoxColumn Caption="Codigo Matriz" FieldName="codigo_matriz" />
                                <dx:ListBoxColumn Caption="¿Que?" FieldName="que" />
                                <dx:ListBoxColumn Caption="¿Como?" FieldName="como" />
                                <dx:ListBoxColumn Caption="Mes" FieldName="mes_aplica">
                                </dx:ListBoxColumn>
                                <dx:ListBoxColumn Caption="Año" FieldName="ano_aplica">
                                </dx:ListBoxColumn>
                            </Columns>
                        </dx:ASPxComboBox>
                        <asp:SqlDataSource ID="SqlDataSourceComboIndHK" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT * FROM [matrizhoshin] ORDER BY [codigo_matriz], [como], [mes_aplica] DESC">
                        </asp:SqlDataSource>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
            </dx:LayoutItem>
            <dx:LayoutItem Caption="Codigo Matriz">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxTextBox ID="TxtCodigoMatriz" runat="server" AutoPostBack="True">
                        </dx:ASPxTextBox>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
            </dx:LayoutItem>
            <dx:LayoutGroup Caption="" ColCount="3" GroupBoxDecoration="HeadingLine">
                <Items>
                    <dx:LayoutItem Caption="¿Que?">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtQue" runat="server" Width="300px">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="¿Como?">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtComo" runat="server" Width="300px">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Unidad de Medida">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtUnidadMedida" runat="server" Width="170px">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Mes Aplica">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="ASPxFormLayout1_E1" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Año Aplica">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="ASPxFormLayout1_E2" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                </Items>
            </dx:LayoutGroup>
            <dx:LayoutItem Caption="Medicion">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxMemo ID="TxtMedicion" runat="server" Height="36px" Width="750px">
                        </dx:ASPxMemo>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
                <CaptionSettings Location="Top" />
            </dx:LayoutItem>
            <dx:LayoutGroup Caption="Objetivos" ColCount="3" GroupBoxDecoration="HeadingLine">
                <Items>
                    <dx:LayoutItem Caption="Semanal">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtOsemanal" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Mensual">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtOMensual" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Anual">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtOAnual" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                </Items>
            </dx:LayoutGroup>
            <dx:LayoutGroup Caption="" ColCount="3" GroupBoxDecoration="HeadingLine">
                <Items>
                    <dx:LayoutItem Caption="Periodo Anterior" HelpText=".">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtPAnterior" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="MPAA" HelpText="Mismo Periodo Año Anterior">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtMpaa" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Periodo Actual" HelpText=".">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtPActual" runat="server" AutoPostBack="True">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                </Items>
            </dx:LayoutGroup>
            <dx:LayoutGroup Caption="Indicadores Mensuales" ColCount="3" GroupBoxDecoration="HeadingLine">
                <Items>
                    <dx:LayoutItem Caption="Acumulado Mensual" HelpText="Si aplica">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtAMensual" runat="server" AutoPostBack="True">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Presupuesto Acum. Mensual" HelpText=".">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtPAMensual" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Desfase Acum. Mensual" HelpText=".">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtDAMensual" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                </Items>
            </dx:LayoutGroup>
            <dx:LayoutGroup Caption="Indicadores Anuales" ColCount="3" GroupBoxDecoration="HeadingLine">
                <Items>
                    <dx:LayoutItem Caption="Acumulado Anual">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtAAnual" runat="server" AutoPostBack="True">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Presupuesto Acumulado Anual">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtPAAnual" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="Desfase Acumulado Anual">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <dx:ASPxTextBox ID="TxtDAAnual" runat="server">
                                </dx:ASPxTextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                        <CaptionSettings Location="Top" />
                    </dx:LayoutItem>
                </Items>
            </dx:LayoutGroup>
            <dx:LayoutItem Caption="¿Qué factor(es) estan ocasionando la desviacion" RowSpan="6">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxMemo ID="TxtFactores" runat="server" Height="36px" Width="750px">
                        </dx:ASPxMemo>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
                <CaptionSettings Location="Top" />
            </dx:LayoutItem>
            <dx:LayoutItem Caption="Accion(es) o decision(es) con base a la desviacion" RowSpan="6">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxMemo ID="TxtAcciones" runat="server" Height="36px" Width="750px">
                        </dx:ASPxMemo>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
                <CaptionSettings Location="Top" />
            </dx:LayoutItem>
            <dx:LayoutItem Caption="" HorizontalAlign="Right">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxButton ID="BtnGuardar" runat="server" Height="36px" Text="Guardar Indicador" Width="80px" Enabled="False">
                        </dx:ASPxButton>
                        
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
            </dx:LayoutItem>
        </Items>
        <ClientSideEvents Init="function(s, e) {
}" />
    </dx:ASPxFormLayout>
<dx:ASPxGridView ID="ASPxGridView1" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourceEntradasHK" EnableTheming="True" KeyboardSupport="True" KeyFieldName="id_entradabitacora" Theme="MetropolisBlue" Width="100%">
                            <SettingsEditing Mode="PopupEditForm">
                            </SettingsEditing>
                            <Settings HorizontalScrollBarMode="Visible" ShowFilterRow="True" ShowGroupPanel="True" VerticalScrollableHeight="400" VerticalScrollBarMode="Visible" />
                            <SettingsBehavior AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" ConfirmDelete="True" />
                            <SettingsDataSecurity AllowInsert="False" />
                            <SettingsPopup>
                                <EditForm HorizontalAlign="WindowCenter" Modal="True" VerticalAlign="WindowCenter" />
                            </SettingsPopup>
                            <SettingsSearchPanel Visible="True" />
                            <Columns>
                                <dx:GridViewDataTextColumn FieldName="id_entradabitacora" ReadOnly="True" ShowInCustomizationForm="True" Visible="False" VisibleIndex="0">
                                    <EditFormSettings Visible="False" />
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="id_entrada" ShowInCustomizationForm="True" Visible="False" VisibleIndex="1">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Codigo Matriz" FieldName="codigo_matriz" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="3">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="¿Que?" FieldName="que" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="4">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="¿Como?" FieldName="como" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="5">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="responsable" ShowInCustomizationForm="True" Visible="False" VisibleIndex="6">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="periodicidad" ShowInCustomizationForm="True" Visible="False" VisibleIndex="7">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Medida" FieldName="unidad_medida" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="9">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="rojo" ShowInCustomizationForm="True" Visible="False" VisibleIndex="10">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="azul" ShowInCustomizationForm="True" Visible="False" VisibleIndex="11">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="minimo" ShowInCustomizationForm="True" Visible="False" VisibleIndex="12">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="maximo" ShowInCustomizationForm="True" Visible="False" VisibleIndex="13">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="medicion" ShowInCustomizationForm="True" Visible="False" VisibleIndex="14">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="operador_rojo" ShowInCustomizationForm="True" Visible="False" VisibleIndex="15">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="operador_azul" ShowInCustomizationForm="True" Visible="False" VisibleIndex="16">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="MPAA" FieldName="mppa" ShowInCustomizationForm="True" VisibleIndex="18">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewBandColumn Caption="Objetivos" ShowInCustomizationForm="True" VisibleIndex="8">
                                    <Columns>
                                        <dx:GridViewDataTextColumn Caption="Semanal" FieldName="objetivo_periodo" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="0">
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Mensual" FieldName="objetivo_mensual" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="1">
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Anual" FieldName="objetivo_anual" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="2">
                                        </dx:GridViewDataTextColumn>
                                    </Columns>
                                </dx:GridViewBandColumn>
                                <dx:GridViewBandColumn Caption="Periodos" ShowInCustomizationForm="True" VisibleIndex="17">
                                    <Columns>
                                        <dx:GridViewDataTextColumn Caption="Periodo Actual" FieldName="periodo_actual" ShowInCustomizationForm="True" VisibleIndex="0">
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Periodo Anterior" FieldName="periodo_anterior" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="1">
                                        </dx:GridViewDataTextColumn>
                                    </Columns>
                                </dx:GridViewBandColumn>
                                <dx:GridViewBandColumn Caption="Factores Mensuales" ShowInCustomizationForm="True" VisibleIndex="19">
                                    <Columns>
                                        <dx:GridViewDataTextColumn Caption="Acumulado" FieldName="acumulado_mensual" ShowInCustomizationForm="True" VisibleIndex="0">
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Presup. Acum." FieldName="presupuesto_acumulado" ShowInCustomizationForm="True" VisibleIndex="1">
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Desfase Acum." FieldName="desfase_acum_mensual" ShowInCustomizationForm="True" VisibleIndex="2">
                                        </dx:GridViewDataTextColumn>
                                    </Columns>
                                </dx:GridViewBandColumn>
                                <dx:GridViewBandColumn Caption="Factores Anuales" ShowInCustomizationForm="True" VisibleIndex="20">
                                    <Columns>
                                        <dx:GridViewDataTextColumn Caption="Acumulado" FieldName="acumulado_anual" ShowInCustomizationForm="True" VisibleIndex="0">
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Presup. Acum." FieldName="acumulado_anual_presup" ShowInCustomizationForm="True" VisibleIndex="1">
                                        </dx:GridViewDataTextColumn>
                                        <dx:GridViewDataTextColumn Caption="Desfase Acum." FieldName="desfase_acum_anual" ShowInCustomizationForm="True" VisibleIndex="2">
                                        </dx:GridViewDataTextColumn>
                                    </Columns>
                                </dx:GridViewBandColumn>
                                <dx:GridViewDataMemoColumn Caption="¿Qué factor(es) estan ocasionando la desviacion" FieldName="factores" ShowInCustomizationForm="True" VisibleIndex="25">
                                    <PropertiesMemoEdit Rows="4">
                                    </PropertiesMemoEdit>
                                </dx:GridViewDataMemoColumn>
                                <dx:GridViewDataMemoColumn Caption="Accion(es) o decision(es) con base a la desviacion" FieldName="acciones" ShowInCustomizationForm="True" VisibleIndex="22">
                                    <PropertiesMemoEdit Rows="4">
                                    </PropertiesMemoEdit>
                                </dx:GridViewDataMemoColumn>
                                <dx:GridViewDataDateColumn Caption="Fecha Registro" FieldName="fecha_registro" ReadOnly="True" ShowInCustomizationForm="True" VisibleIndex="2">
                                </dx:GridViewDataDateColumn>
                                <dx:GridViewBandColumn Caption="Avance en este periodo" ShowInCustomizationForm="True" VisibleIndex="28">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <Columns>
                                        <dx:GridViewDataButtonEditColumn Caption="Nivel de Avance" FieldName="porc_avancepactual" ShowInCustomizationForm="True" VisibleIndex="1" Width="200px">
                                            <DataItemTemplate>
                                                <dx:ASPxGaugeControl ID="ASPxGaugeControl1" runat="server" AlternateText='<%# Eval("porc_avancepactual") %>' BackColor="White" Height="160px" LayoutInterval="6" Theme="MetropolisBlue" Value='<%# Eval("porc_avancepactual") %>' Width="181px">
                                                    <Gauges>
                                                        <dx:CircularGauge Bounds="6, 6, 169, 148" Name="circularGauge1">
                                                            <scales>
                                                                <dx:ArcScaleComponent AcceptOrder="0" AppearanceMajorTickmark-BorderBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMajorTickmark-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMinorTickmark-BorderBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMinorTickmark-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceTickmarkText-Font="Tahoma, 9pt" AppearanceTickmarkText-TextBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:#484E5A&quot;/&gt;" Center="125, 165" EndAngle="0" MajorTickCount="6" MajorTickmark-FormatString="{0:F0}" MajorTickmark-ShapeOffset="-13" MajorTickmark-ShapeType="Circular_Style16_1" MajorTickmark-TextOrientation="LeftToRight" MaxValue="120" MinorTickCount="4" MinorTickmark-ShapeOffset="-9" MinorTickmark-ShapeType="Circular_Style16_2" Name="scale1" RadiusX="98" RadiusY="98" StartAngle="-180">
                                                                    <ranges>
                                                                        <dx:ArcScaleRangeWeb AppearanceRange-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:Red&quot;/&gt;" EndThickness="14" EndValue="95" Name="Range0" ShapeOffset="0" StartThickness="14" />
                                                                        <dx:ArcScaleRangeWeb AppearanceRange-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:Blue&quot;/&gt;" EndThickness="14" EndValue="120" Name="Range2" ShapeOffset="0" StartThickness="14" StartValue="96" />
                                                                    </ranges>
                                                                </dx:ArcScaleComponent>
                                                            </scales>
                                                            <backgroundlayers>
                                                                <dx:ArcScaleBackgroundLayerComponent AcceptOrder="-1000" ArcScale="" Name="bg" ScaleCenterPos="0.5, 0.695" ScaleID="scale1" ShapeType="CircularHalf_Style16" Size="250, 179" ZOrder="1000" />
                                                            </backgroundlayers>
                                                            <needles>
                                                                <dx:ArcScaleNeedleComponent AcceptOrder="50" ArcScale="" EndOffset="3" Name="needle" ScaleID="scale1" ShapeType="CircularFull_Style16" ZOrder="-50" />
                                                            </needles>
                                                            <rangebars>
                                                                <dx:ArcScaleRangeBarComponent AcceptOrder="0" ArcScale="" Name="ArcScaleRangeBarComponent0" />
                                                            </rangebars>
                                                            <spindlecaps>
                                                                <dx:ArcScaleSpindleCapComponent AcceptOrder="100" ArcScale="" Name="circularGauge1_SpindleCap1" ScaleID="scale1" ShapeType="CircularFull_Style16" Size="25, 25" ZOrder="-100" />
                                                            </spindlecaps>
                                                        </dx:CircularGauge>
                                                    </Gauges>
                                                    <LayoutPadding All="6" Bottom="6" Left="6" Right="6" Top="6" />
                                                </dx:ASPxGaugeControl>
                                            </DataItemTemplate>
                                        </dx:GridViewDataButtonEditColumn>
                                        <dx:GridViewDataTextColumn Caption="%" FieldName="porc_avancepactual" ShowInCustomizationForm="True" VisibleIndex="0" Width="50px">
                                        </dx:GridViewDataTextColumn>
                                    </Columns>
                                </dx:GridViewBandColumn>
                            </Columns>
                        </dx:ASPxGridView>
                </dx:PanelContent>
</PanelCollection>

        </dx:ASPxRoundPanel>
    </div>
    <div>

        <asp:TextBox ID="TxtResponsable" runat="server" Height="22px" Visible="False" Width="70px"></asp:TextBox>
        <asp:TextBox ID="TxtPeriodicidad" runat="server" Height="22px" Visible="False" Width="70px"></asp:TextBox>
        <asp:TextBox ID="TxtRojo" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtAzul" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtMinimo" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtMaximo" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtOperadorRojo" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtOperadorAzul" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtSemana" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtMes" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TxtAno" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

        <br />
        <asp:TextBox ID="TxtPorc_AvancePActual" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

        <asp:TextBox ID="TxtPorc_AvancePAnterior" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

        <asp:TextBox ID="TxtPorc_DAM" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

        <asp:TextBox ID="TxtPorc_DAA" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

        <asp:TextBox ID="TxtIDQuery" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

        <asp:TextBox ID="TxtStrConexion" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

        <asp:TextBox ID="TxtStrConsulta" runat="server" Height="22px" Width="70px" Visible="False"></asp:TextBox>

    </div>
    <div>
        <asp:SqlDataSource ID="SqlDataSourceEntradasHK" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" DeleteCommand="DELETE FROM [bitacorahk] WHERE [id_entradabitacora] = @id_entradabitacora" InsertCommand="INSERT INTO [bitacorahk] ([id_entrada], [codigo_matriz], [que], [como], [responsable], [periodicidad], [objetivo_periodo], [unidad_medida], [rojo], [azul], [objetivo_mensual], [objetivo_anual], [minimo], [maximo], [medicion], [operador_rojo], [operador_azul], [periodo_actual], [periodo_anterior], [mppa], [acumulado_mensual], [presupuesto_acumulado], [desfase_acum_mensual], [acumulado_anual], [acumulado_anual_presup], [desfase_acum_anual], [factores], [acciones], [fecha_registro]) VALUES (@id_entrada, @codigo_matriz, @que, @como, @responsable, @periodicidad, @objetivo_periodo, @unidad_medida, @rojo, @azul, @objetivo_mensual, @objetivo_anual, @minimo, @maximo, @medicion, @operador_rojo, @operador_azul, @periodo_actual, @periodo_anterior, @mppa, @acumulado_mensual, @presupuesto_acumulado, @desfase_acum_mensual, @acumulado_anual, @acumulado_anual_presup, @desfase_acum_anual, @factores, @acciones, @fecha_registro)" SelectCommand="SELECT * FROM [bitacorahk] WHERE ([responsable] = @responsable)" UpdateCommand="UPDATE [bitacorahk] SET [id_entrada] = @id_entrada, [codigo_matriz] = @codigo_matriz, [que] = @que, [como] = @como, [responsable] = @responsable, [periodicidad] = @periodicidad, [objetivo_periodo] = @objetivo_periodo, [unidad_medida] = @unidad_medida, [rojo] = @rojo, [azul] = @azul, [objetivo_mensual] = @objetivo_mensual, [objetivo_anual] = @objetivo_anual, [minimo] = @minimo, [maximo] = @maximo, [medicion] = @medicion, [operador_rojo] = @operador_rojo, [operador_azul] = @operador_azul, [periodo_actual] = @periodo_actual, [periodo_anterior] = @periodo_anterior, [mppa] = @mppa, [acumulado_mensual] = @acumulado_mensual, [presupuesto_acumulado] = @presupuesto_acumulado, [desfase_acum_mensual] = @desfase_acum_mensual, [acumulado_anual] = @acumulado_anual, [acumulado_anual_presup] = @acumulado_anual_presup, [desfase_acum_anual] = @desfase_acum_anual, [factores] = @factores, [acciones] = @acciones, [fecha_registro] = @fecha_registro WHERE [id_entradabitacora] = @id_entradabitacora">
            <DeleteParameters>
                <asp:Parameter Name="id_entradabitacora" Type="Int32" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="id_entrada" Type="Int32" />
                <asp:Parameter Name="codigo_matriz" Type="String" />
                <asp:Parameter Name="que" Type="String" />
                <asp:Parameter Name="como" Type="String" />
                <asp:Parameter Name="responsable" Type="String" />
                <asp:Parameter Name="periodicidad" Type="String" />
                <asp:Parameter Name="objetivo_periodo" Type="Decimal" />
                <asp:Parameter Name="unidad_medida" Type="String" />
                <asp:Parameter Name="rojo" Type="Decimal" />
                <asp:Parameter Name="azul" Type="Decimal" />
                <asp:Parameter Name="objetivo_mensual" Type="Decimal" />
                <asp:Parameter Name="objetivo_anual" Type="Decimal" />
                <asp:Parameter Name="minimo" Type="Decimal" />
                <asp:Parameter Name="maximo" Type="Decimal" />
                <asp:Parameter Name="medicion" Type="String" />
                <asp:Parameter Name="operador_rojo" Type="String" />
                <asp:Parameter Name="operador_azul" Type="String" />
                <asp:Parameter Name="periodo_actual" Type="Decimal" />
                <asp:Parameter Name="periodo_anterior" Type="Decimal" />
                <asp:Parameter Name="mppa" Type="Decimal" />
                <asp:Parameter Name="acumulado_mensual" Type="Decimal" />
                <asp:Parameter Name="presupuesto_acumulado" Type="Decimal" />
                <asp:Parameter Name="desfase_acum_mensual" Type="Decimal" />
                <asp:Parameter Name="acumulado_anual" Type="Decimal" />
                <asp:Parameter Name="acumulado_anual_presup" Type="Decimal" />
                <asp:Parameter Name="desfase_acum_anual" Type="Decimal" />
                <asp:Parameter Name="factores" Type="String" />
                <asp:Parameter Name="acciones" Type="String" />
                <asp:Parameter DbType="Date" Name="fecha_registro" />
            </InsertParameters>
            <SelectParameters>
                <asp:SessionParameter Name="responsable" SessionField="nomcompleto" Type="String" />
            </SelectParameters>
            <UpdateParameters>
                <asp:Parameter Name="id_entrada" Type="Int32" />
                <asp:Parameter Name="codigo_matriz" Type="String" />
                <asp:Parameter Name="que" Type="String" />
                <asp:Parameter Name="como" Type="String" />
                <asp:Parameter Name="responsable" Type="String" />
                <asp:Parameter Name="periodicidad" Type="String" />
                <asp:Parameter Name="objetivo_periodo" Type="Decimal" />
                <asp:Parameter Name="unidad_medida" Type="String" />
                <asp:Parameter Name="rojo" Type="Decimal" />
                <asp:Parameter Name="azul" Type="Decimal" />
                <asp:Parameter Name="objetivo_mensual" Type="Decimal" />
                <asp:Parameter Name="objetivo_anual" Type="Decimal" />
                <asp:Parameter Name="minimo" Type="Decimal" />
                <asp:Parameter Name="maximo" Type="Decimal" />
                <asp:Parameter Name="medicion" Type="String" />
                <asp:Parameter Name="operador_rojo" Type="String" />
                <asp:Parameter Name="operador_azul" Type="String" />
                <asp:Parameter Name="periodo_actual" Type="Decimal" />
                <asp:Parameter Name="periodo_anterior" Type="Decimal" />
                <asp:Parameter Name="mppa" Type="Decimal" />
                <asp:Parameter Name="acumulado_mensual" Type="Decimal" />
                <asp:Parameter Name="presupuesto_acumulado" Type="Decimal" />
                <asp:Parameter Name="desfase_acum_mensual" Type="Decimal" />
                <asp:Parameter Name="acumulado_anual" Type="Decimal" />
                <asp:Parameter Name="acumulado_anual_presup" Type="Decimal" />
                <asp:Parameter Name="desfase_acum_anual" Type="Decimal" />
                <asp:Parameter Name="factores" Type="String" />
                <asp:Parameter Name="acciones" Type="String" />
                <asp:Parameter DbType="Date" Name="fecha_registro" />
                <asp:Parameter Name="id_entradabitacora" Type="Int32" />
            </UpdateParameters>
        </asp:SqlDataSource>
    </div>
    <div>

        <dx:ASPxRoundPanel ID="ASPxRoundPanel3" runat="server" HeaderText="Perfil del Puesto" ShowCollapseButton="true" Theme="MetropolisBlue" Width="100%" AllowCollapsingByHeaderClick="True" Collapsed="True">
            <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxCardView ID="ASPxCardView2" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourcePerfiles" EnableTheming="True" KeyFieldName="codigo_puesto" Theme="MetropolisBlue" Width="100%">
        <ClientSideEvents CardClick="function(s, e) {

}" />
        <SettingsPager AlwaysShowPager="True" EnableAdaptivity="True" Mode="EndlessPaging">
            <SettingsTableLayout ColumnCount="2" RowsPerPage="2" />
        </SettingsPager>
        <SettingsEditing Mode="PopupEditForm">
        </SettingsEditing>
        <Settings ShowHeaderFilterBlankItems="False" VerticalScrollableHeight="600" VerticalScrollBarMode="Visible" />
        <SettingsBehavior AllowFocusedCard="True" AllowSelectByCardClick="True" AllowSelectSingleCardOnly="True" ConfirmDelete="True" SortMode="DisplayText" />
        <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False" />
        <SettingsPopup>
            <EditForm AllowResize="True" HorizontalAlign="Center" Modal="True" VerticalAlign="Middle" />
        </SettingsPopup>
        <SettingsText Title="Gestion de Perfiles de Puestos" />
        <Columns>
            <dx:CardViewTextColumn Caption="Codigo Puesto" FieldName="codigo_puesto" Name="codigopuesto" ShowInCustomizationForm="True" VisibleIndex="0">
                <PropertiesTextEdit>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="Se requiere el Codigo de Puesto" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Nombre del Puesto" FieldName="nombre_puesto" ShowInCustomizationForm="True" VisibleIndex="1">
                <PropertiesTextEdit>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="Se requiere el nombre del puesto" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Ejemplo Titulos" FieldName="ejemplo_titulos" ShowInCustomizationForm="True" VisibleIndex="8">
                <PropertiesTextEdit NullText="Enliste ejemplos específicos de Título (s), área(s) de estudio, y/o licencias denotando (R) si es Requisito o (P) si es preferible.">
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Entrenamiento" FieldName="entrenamiento" ShowInCustomizationForm="True" VisibleIndex="9">
                <PropertiesTextEdit NullText="Habilidades, conocimiento y/o experiencia Enliste ejemplos específicos denotando (E)Excelente, (MB) Muy bueno, (B) Bueno.">
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Experiencia General" FieldName="experiencia_gral" ShowInCustomizationForm="True" VisibleIndex="10">
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Experiencia Especial" FieldName="experiencia_esp" ShowInCustomizationForm="True" VisibleIndex="11">
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="% Int" FieldName="porcentaje_int" ShowInCustomizationForm="True" VisibleIndex="12">
                <PropertiesTextEdit Width="100px">
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="% Ext" FieldName="porcentaje_ext" ShowInCustomizationForm="True" VisibleIndex="13">
                <PropertiesTextEdit Width="100px">
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Relaciones Internas" FieldName="internas" ShowInCustomizationForm="True" VisibleIndex="14">
                <PropertiesTextEdit Width="200px">
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Relaciones Externas" FieldName="externas" ShowInCustomizationForm="True" VisibleIndex="15">
                <PropertiesTextEdit Width="200px">
                </PropertiesTextEdit>
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Ambiente de Trabajo" FieldName="ambiente_trabajo" ShowInCustomizationForm="True" VisibleIndex="16">
            </dx:CardViewTextColumn>
            <dx:CardViewTextColumn Caption="Esfuerzo Fisico" FieldName="esfuerzo_fisico" ShowInCustomizationForm="True" VisibleIndex="17">
            </dx:CardViewTextColumn>
            <dx:CardViewCheckColumn Caption="Viajes" FieldName="viajes" ShowInCustomizationForm="True" VisibleIndex="18">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="Laptop" FieldName="laptop" ShowInCustomizationForm="True" VisibleIndex="19">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="PC" FieldName="pc" ShowInCustomizationForm="True" VisibleIndex="20">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="Celular" FieldName="celular" ShowInCustomizationForm="True" VisibleIndex="21">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="Ext." FieldName="extension" ShowInCustomizationForm="True" VisibleIndex="22">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="Auto Propio" FieldName="auto_propio" ShowInCustomizationForm="True" VisibleIndex="23">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="Ld/Cell" FieldName="ldcel" ShowInCustomizationForm="True" VisibleIndex="24">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="Otro" FieldName="otro" ShowInCustomizationForm="True" VisibleIndex="25">
            </dx:CardViewCheckColumn>
            <dx:CardViewCheckColumn Caption="Auto Compañia" FieldName="auto_comp" ShowInCustomizationForm="True" VisibleIndex="26">
            </dx:CardViewCheckColumn>
            <dx:CardViewComboBoxColumn Caption="Puesto Tipo" FieldName="puesto_tipo" ShowInCustomizationForm="True" VisibleIndex="3">
                <PropertiesComboBox Width="200px">
                </PropertiesComboBox>
            </dx:CardViewComboBoxColumn>
            <dx:CardViewComboBoxColumn Caption="Unidad de Negocio" FieldName="unidad_negocio" ShowInCustomizationForm="True" VisibleIndex="4">
            </dx:CardViewComboBoxColumn>
            <dx:CardViewComboBoxColumn Caption="Departamento" FieldName="departamento" ShowInCustomizationForm="True" VisibleIndex="5">
            </dx:CardViewComboBoxColumn>
            <dx:CardViewComboBoxColumn Caption="Reporta a" FieldName="reportaa" ShowInCustomizationForm="True" VisibleIndex="6">
            </dx:CardViewComboBoxColumn>
            <dx:CardViewComboBoxColumn Caption="Nivel Educativo" FieldName="nivel_educacion" ShowInCustomizationForm="True" VisibleIndex="7">
            </dx:CardViewComboBoxColumn>
            <dx:CardViewMemoColumn Caption="Objetivo del Puesto" FieldName="objetivo_puesto" ShowInCustomizationForm="True" VisibleIndex="2">
                <PropertiesMemoEdit Rows="3">
                </PropertiesMemoEdit>
            </dx:CardViewMemoColumn>
            <dx:CardViewTextColumn FieldName="otros" ShowInCustomizationForm="True" VisibleIndex="27">
            </dx:CardViewTextColumn>
            <dx:CardViewButtonEditColumn ShowInCustomizationForm="True" VisibleIndex="28">
                <PropertiesButtonEdit>
                    <Buttons>
                        <dx:EditButton Text="Responsabilidades">
                            <Image IconID="grid_columnautowidth_32x32">
                            </Image>
                        </dx:EditButton>
                    </Buttons>
                </PropertiesButtonEdit>
            </dx:CardViewButtonEditColumn>
        </Columns>
        <EditFormLayoutProperties>
            <Items>
                <dx:CardViewCommandLayoutItem HorizontalAlign="Right">
                </dx:CardViewCommandLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="codigo_puesto" Width="400px">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="nombre_puesto">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem Caption="Objetivo del Puesto" ColumnName="objetivo_puesto">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewLayoutGroup Caption="" ColCount="5" GroupBoxDecoration="Box" HorizontalAlign="Right" RowSpan="2">
                    <Items>
                        <dx:CardViewColumnLayoutItem Caption="Puesto Tipo" ColumnName="puesto_tipo" VerticalAlign="Top">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Unidad de Negocio" ColumnName="unidad_negocio" VerticalAlign="Top">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Departamento" ColumnName="departamento" VerticalAlign="Top">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Reporta a" ColumnName="reportaa" VerticalAlign="Top">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Nivel Educativo Requerido" ColumnName="nivel_educacion" VerticalAlign="Top">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                    </Items>
                </dx:CardViewLayoutGroup>
                <dx:CardViewColumnLayoutItem Caption="Enliste Titulos" ColumnName="ejemplo_titulos" RowSpan="4">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem Caption="Entrenamiento" ColumnName="entrenamiento">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem Caption="Experiencia general en el campo de" ColumnName="experiencia_gral">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem Caption="Experiencia especifica en el puesto de" ColumnName="experiencia_esp">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewLayoutGroup Caption="Indique las principales interacciones del puesto y su tipo de relación" ColCount="4" GroupBoxDecoration="Box" HorizontalAlign="Right" RowSpan="2">
                    <Items>
                        <dx:CardViewColumnLayoutItem Caption="Relaciones Internas" ColumnName="internas">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="% Internas" ColumnName="porcentaje_int">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Relaciones Externas" ColumnName="externas">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="% Externas" ColumnName="porcentaje_ext">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                    </Items>
                </dx:CardViewLayoutGroup>
                <dx:CardViewColumnLayoutItem Caption="Ambiente de trabajo" ColumnName="ambiente_trabajo">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem Caption="Esfuerzo físico" ColumnName="esfuerzo_fisico">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewLayoutGroup Caption="" ColCount="9" GroupBoxDecoration="Box" HorizontalAlign="Right">
                    <Items>
                        <dx:CardViewColumnLayoutItem Caption="Viajes nac./intles." ColumnName="viajes" Width="150px">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Laptop" ColumnName="laptop">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="PC" ColumnName="pc">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Celular" ColumnName="celular">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Extension" ColumnName="extension">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Auto Propio" ColumnName="auto_propio">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Larga Distancia/Cel/Intl." ColumnName="ldcel">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Auto de la compañía" ColumnName="auto_comp">
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Otro" ColumnName="otro">
                        </dx:CardViewColumnLayoutItem>
                    </Items>
                </dx:CardViewLayoutGroup>
                <dx:CardViewColumnLayoutItem Caption="Si otros Indique" ColumnName="otros">
                </dx:CardViewColumnLayoutItem>
                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                </dx:EditModeCommandLayoutItem>
            </Items>
            <SettingsItemCaptions HorizontalAlign="Right" />
        </EditFormLayoutProperties>
        <CardLayoutProperties>
            <Items>
                <dx:CardViewCommandLayoutItem HorizontalAlign="Right">
                </dx:CardViewCommandLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="codigo_puesto">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="nombre_puesto">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="objetivo_puesto">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewLayoutGroup Caption="" ColCount="5" GroupBoxDecoration="Box" HorizontalAlign="Center">
                    <Items>
                        <dx:CardViewColumnLayoutItem Caption="Puestos Tipo" ColumnName="puesto_tipo">
                            <CaptionSettings Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Unidad de Negocio" ColumnName="unidad_negocio" HorizontalAlign="Center">
                            <CaptionSettings Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="departamento" HorizontalAlign="Center">
                            <CaptionSettings Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Reporta a" ColumnName="reportaa" HorizontalAlign="Center">
                            <CaptionSettings Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Nivel Educativo" ColumnName="nivel_educacion" HorizontalAlign="Center">
                            <CaptionSettings Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                    </Items>
                </dx:CardViewLayoutGroup>
                <dx:CardViewColumnLayoutItem ColumnName="ejemplo_titulos">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="entrenamiento">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="experiencia_gral">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewColumnLayoutItem ColumnName="experiencia_esp">
                </dx:CardViewColumnLayoutItem>
                <dx:CardViewLayoutGroup Caption="" ColCount="4" HorizontalAlign="Center">
                    <Items>
                        <dx:CardViewColumnLayoutItem ColumnName="internas" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="porcentaje_int" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="externas" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="porcentaje_ext" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                    </Items>
                </dx:CardViewLayoutGroup>
                <dx:CardViewLayoutGroup Caption="" ColCount="2" GroupBoxDecoration="HeadingLine">
                    <Items>
                        <dx:CardViewColumnLayoutItem ColumnName="ambiente_trabajo" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Esfuerzo Fisico" ColumnName="esfuerzo_fisico" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                    </Items>
                </dx:CardViewLayoutGroup>
                <dx:CardViewLayoutGroup Caption="" ColCount="8">
                    <Items>
                        <dx:CardViewColumnLayoutItem ColumnName="viajes" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="laptop" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="pc" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="celular" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="extension" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="auto_propio" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="ldcel" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="auto_comp" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem ColumnName="otro" HorizontalAlign="Center">
                            <CaptionSettings HorizontalAlign="Center" Location="Top" />
                        </dx:CardViewColumnLayoutItem>
                        <dx:CardViewColumnLayoutItem Caption="Si otro indique" ColumnName="otros" HorizontalAlign="Center">
                        </dx:CardViewColumnLayoutItem>
                    </Items>
                    <SettingsItemCaptions Location="Top" />
                </dx:CardViewLayoutGroup>
                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                </dx:EditModeCommandLayoutItem>
            </Items>
        </CardLayoutProperties>
    </dx:ASPxCardView>
    <asp:SqlDataSource ID="SqlDataSourcePerfiles" runat="server" ConnectionString="<%$ ConnectionStrings:PerfilesConnectionString %>" DeleteCommand="DELETE FROM [perfiles] WHERE [nombre_puesto] = @nombre_puesto" InsertCommand="INSERT INTO [perfiles] ([codigo_puesto], [unidad_negocio], [departamento], [reportaa], [nombre_puesto], [objetivo_puesto], [nivel_educacion], [ejemplo_titulos], [entrenamiento], [experiencia_gral], [experiencia_esp], [porcentaje_int], [porcentaje_ext], [internas], [externas], [ambiente_trabajo], [esfuerzo_fisico], [viajes], [laptop], [pc], [celular], [extension], [auto_propio], [ldcel], [otro], [auto_comp], [puesto_tipo], [otros]) VALUES (@codigo_puesto, @unidad_negocio, @departamento, @reportaa, @nombre_puesto, @objetivo_puesto, @nivel_educacion, @ejemplo_titulos, @entrenamiento, @experiencia_gral, @experiencia_esp, @porcentaje_int, @porcentaje_ext, @internas, @externas, @ambiente_trabajo, @esfuerzo_fisico, @viajes, @laptop, @pc, @celular, @extension, @auto_propio, @ldcel, @otro, @auto_comp, @puesto_tipo, @otros)" SelectCommand="SELECT * FROM [perfiles] WHERE ([codigo_puesto] = @codigo_puesto)" UpdateCommand="UPDATE [perfiles] SET [codigo_puesto] = @codigo_puesto, [unidad_negocio] = @unidad_negocio, [departamento] = @departamento, [reportaa] = @reportaa, [objetivo_puesto] = @objetivo_puesto, [nivel_educacion] = @nivel_educacion, [ejemplo_titulos] = @ejemplo_titulos, [entrenamiento] = @entrenamiento, [experiencia_gral] = @experiencia_gral, [experiencia_esp] = @experiencia_esp, [porcentaje_int] = @porcentaje_int, [porcentaje_ext] = @porcentaje_ext, [internas] = @internas, [externas] = @externas, [ambiente_trabajo] = @ambiente_trabajo, [esfuerzo_fisico] = @esfuerzo_fisico, [viajes] = @viajes, [laptop] = @laptop, [pc] = @pc, [celular] = @celular, [extension] = @extension, [auto_propio] = @auto_propio, [ldcel] = @ldcel, [otro] = @otro, [auto_comp] = @auto_comp, [puesto_tipo] = @puesto_tipo, [otros] = @otros WHERE [nombre_puesto] = @nombre_puesto">
        <DeleteParameters>
            <asp:Parameter Name="nombre_puesto" Type="String" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="codigo_puesto" Type="String" />
            <asp:Parameter Name="unidad_negocio" Type="String" />
            <asp:Parameter Name="departamento" Type="String" />
            <asp:Parameter Name="reportaa" Type="String" />
            <asp:Parameter Name="nombre_puesto" Type="String" />
            <asp:Parameter Name="objetivo_puesto" Type="String" />
            <asp:Parameter Name="nivel_educacion" Type="String" />
            <asp:Parameter Name="ejemplo_titulos" Type="String" />
            <asp:Parameter Name="entrenamiento" Type="String" />
            <asp:Parameter Name="experiencia_gral" Type="String" />
            <asp:Parameter Name="experiencia_esp" Type="String" />
            <asp:Parameter Name="porcentaje_int" Type="String" />
            <asp:Parameter Name="porcentaje_ext" Type="String" />
            <asp:Parameter Name="internas" Type="String" />
            <asp:Parameter Name="externas" Type="String" />
            <asp:Parameter Name="ambiente_trabajo" Type="String" />
            <asp:Parameter Name="esfuerzo_fisico" Type="String" />
            <asp:Parameter Name="viajes" Type="Boolean" />
            <asp:Parameter Name="laptop" Type="Boolean" />
            <asp:Parameter Name="pc" Type="Boolean" />
            <asp:Parameter Name="celular" Type="Boolean" />
            <asp:Parameter Name="extension" Type="Boolean" />
            <asp:Parameter Name="auto_propio" Type="Boolean" />
            <asp:Parameter Name="ldcel" Type="Boolean" />
            <asp:Parameter Name="otro" Type="Boolean" />
            <asp:Parameter Name="auto_comp" Type="Boolean" />
            <asp:Parameter Name="puesto_tipo" Type="String" />
            <asp:Parameter Name="otros" Type="String" />
        </InsertParameters>
        <SelectParameters>
            <asp:SessionParameter Name="codigo_puesto" SessionField="IDPerfil" Type="String" />
        </SelectParameters>
        <UpdateParameters>
            <asp:Parameter Name="codigo_puesto" Type="String" />
            <asp:Parameter Name="unidad_negocio" Type="String" />
            <asp:Parameter Name="departamento" Type="String" />
            <asp:Parameter Name="reportaa" Type="String" />
            <asp:Parameter Name="objetivo_puesto" Type="String" />
            <asp:Parameter Name="nivel_educacion" Type="String" />
            <asp:Parameter Name="ejemplo_titulos" Type="String" />
            <asp:Parameter Name="entrenamiento" Type="String" />
            <asp:Parameter Name="experiencia_gral" Type="String" />
            <asp:Parameter Name="experiencia_esp" Type="String" />
            <asp:Parameter Name="porcentaje_int" Type="String" />
            <asp:Parameter Name="porcentaje_ext" Type="String" />
            <asp:Parameter Name="internas" Type="String" />
            <asp:Parameter Name="externas" Type="String" />
            <asp:Parameter Name="ambiente_trabajo" Type="String" />
            <asp:Parameter Name="esfuerzo_fisico" Type="String" />
            <asp:Parameter Name="viajes" Type="Boolean" />
            <asp:Parameter Name="laptop" Type="Boolean" />
            <asp:Parameter Name="pc" Type="Boolean" />
            <asp:Parameter Name="celular" Type="Boolean" />
            <asp:Parameter Name="extension" Type="Boolean" />
            <asp:Parameter Name="auto_propio" Type="Boolean" />
            <asp:Parameter Name="ldcel" Type="Boolean" />
            <asp:Parameter Name="otro" Type="Boolean" />
            <asp:Parameter Name="auto_comp" Type="Boolean" />
            <asp:Parameter Name="puesto_tipo" Type="String" />
            <asp:Parameter Name="otros" Type="String" />
            <asp:Parameter Name="nombre_puesto" Type="String" />
        </UpdateParameters>
    </asp:SqlDataSource>
                </dx:PanelContent>
</PanelCollection>
        </dx:ASPxRoundPanel>

    </div>
    <div>

        <dx:ASPxRoundPanel ID="ASPxRoundPanel4" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Actividades a realizar segun procesos" ShowCollapseButton="true" Theme="MetropolisBlue" Width="100%" Collapsed="True">
            <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxGridView ID="ASPxGridView2" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourceActProcesos" EnableTheming="True" KeyboardSupport="True" KeyFieldName="id_rap" Theme="MetropolisBlue" Width="100%">
        <SettingsPager Mode="ShowAllRecords">
        </SettingsPager>
        <Settings HorizontalScrollBarMode="Visible" ShowGroupPanel="True" VerticalScrollBarMode="Visible" />
        <SettingsBehavior AllowFixedGroups="True" AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" AutoExpandAllGroups="True" />
        <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False" />
        <SettingsSearchPanel Visible="True" />
        <Columns>
            <dx:GridViewDataTextColumn FieldName="id_rap" ReadOnly="True" ShowInCustomizationForm="True" Visible="False" VisibleIndex="0">
                <EditFormSettings Visible="False" />
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="id_detalleactividad" ShowInCustomizationForm="True" VisibleIndex="1" Visible="False">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn Caption="Descripción de la actividad a realizar" FieldName="detalleactividad" ShowInCustomizationForm="True" VisibleIndex="2" Width="700px">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="codigo_puesto" ShowInCustomizationForm="True" Visible="False" VisibleIndex="3">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataHyperLinkColumn Caption="Documento Adjunto" FieldName="adjunto" ShowInCustomizationForm="True" VisibleIndex="4" Width="300px">
            </dx:GridViewDataHyperLinkColumn>
        </Columns>
    </dx:ASPxGridView>
    <asp:SqlDataSource ID="SqlDataSourceActProcesos" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT * FROM [rdap] WHERE ([codigo_puesto] = @codigo_puesto)">
        <SelectParameters>
            <asp:SessionParameter Name="codigo_puesto" SessionField="IDPerfil" Type="String" />
        </SelectParameters>
    </asp:SqlDataSource>
                </dx:PanelContent>
</PanelCollection>
        </dx:ASPxRoundPanel>
    </div>
    <div>

    </div>
</asp:Content>
