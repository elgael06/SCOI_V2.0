<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="procesos.aspx.vb" Inherits="seguimiento.procesos" %>
<%@ Register assembly="DevExpress.Web.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxPivotGrid.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxPivotGrid" tagprefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
            
.ajax__combobox_inputcontainer {
    border-spacing: 0;
}

        .auto-style1 {
            height: 33px;
            width: 104px;
        }
        .auto-style2 {
            height: 32px;
            width: 305px;
        }

        </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Gestión de Procesos</h2>
    <div style="text-align: left">
                    <dx:ASPxRoundPanel ID="ASPxRoundPanel1" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Descripción del Proceso" ShowCollapseButton="true" Theme="MetropolisBlue" Width="1060px" Collapsed="True">
                        <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxGridView ID="ASPxGridView2" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourceDescProceso" EnableTheming="True" KeyFieldName="codigo_proceso" Theme="MetropolisBlue" Width="1060px" KeyboardSupport="True">
        <SettingsPager AlwaysShowPager="True" Mode="ShowAllRecords">
        </SettingsPager>
        <SettingsEditing Mode="PopupEditForm" NewItemRowPosition="Bottom">
        </SettingsEditing>
        <Settings ShowFilterRow="True" ShowGroupPanel="True" VerticalScrollBarMode="Visible" VerticalScrollBarStyle="VirtualSmooth" />
        <SettingsBehavior ConfirmDelete="True" AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" />
        <SettingsPopup>
            <EditForm HorizontalAlign="WindowCenter" Modal="True" VerticalAlign="WindowCenter" />
        </SettingsPopup>
        <SettingsSearchPanel Visible="True" />
        <EditFormLayoutProperties>
            <Items>
                <dx:GridViewColumnLayoutItem ColumnName="codigo_proceso">
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewColumnLayoutItem ColumnName="nombre_proceso">
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewLayoutGroup ShowCaption="False">
                    <Items>
                        <dx:GridViewColumnLayoutItem ColumnName="objetivo_proceso">
                            <CaptionSettings Location="Top" />
                        </dx:GridViewColumnLayoutItem>
                    </Items>
                </dx:GridViewLayoutGroup>
                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                </dx:EditModeCommandLayoutItem>
            </Items>
        </EditFormLayoutProperties>
        <Columns>
            <dx:GridViewCommandColumn ShowClearFilterButton="True" ShowDeleteButton="True" ShowEditButton="True" ShowInCustomizationForm="True" ShowNewButtonInHeader="True" VisibleIndex="3" ButtonType="Button">
            </dx:GridViewCommandColumn>
            <dx:GridViewDataTextColumn Caption="Codigo del Proceso" FieldName="codigo_proceso" ShowInCustomizationForm="True" VisibleIndex="0">
                <PropertiesTextEdit>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="Se requiere el codigo del Proceso" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesTextEdit>
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn Caption="Nombre del Proceso" FieldName="nombre_proceso" ShowInCustomizationForm="True" VisibleIndex="1">
                <PropertiesTextEdit>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="Se requiere el nombre del proceso" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesTextEdit>
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataMemoColumn Caption="Objetivo del Proceso" FieldName="objetivo_proceso" ShowInCustomizationForm="True" VisibleIndex="2">
                <PropertiesMemoEdit Rows="4">
                </PropertiesMemoEdit>
            </dx:GridViewDataMemoColumn>
        </Columns>
    </dx:ASPxGridView>
    <asp:SqlDataSource ID="SqlDataSourceDescProceso" runat="server" ConnectionString="<%$ ConnectionStrings:DescProcesoConnectionString %>" DeleteCommand="DELETE FROM [procesos] WHERE [codigo_proceso] = @codigo_proceso" InsertCommand="INSERT INTO [procesos] ([codigo_proceso], [nombre_proceso], [objetivo_proceso]) VALUES (@codigo_proceso, @nombre_proceso, @objetivo_proceso)" SelectCommand="SELECT * FROM [procesos]" UpdateCommand="UPDATE [procesos] SET [nombre_proceso] = @nombre_proceso, [objetivo_proceso] = @objetivo_proceso WHERE [codigo_proceso] = @codigo_proceso">
        <DeleteParameters>
            <asp:Parameter Name="codigo_proceso" Type="String" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="codigo_proceso" Type="String" />
            <asp:Parameter Name="nombre_proceso" Type="String" />
            <asp:Parameter Name="objetivo_proceso" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="nombre_proceso" Type="String" />
            <asp:Parameter Name="objetivo_proceso" Type="String" />
            <asp:Parameter Name="codigo_proceso" Type="String" />
        </UpdateParameters>
    </asp:SqlDataSource>
                            </dx:PanelContent>
</PanelCollection>
                    </dx:ASPxRoundPanel>
    <div style="text-align: left">
                    <dx:ASPxComboBox ID="ASPxComboBox1" runat="server" DataSourceID="SqlDataSourceCombobox1" Visible="False">
                        <Columns>
                            <dx:ListBoxColumn FieldName="codigo_proceso" />
                            <dx:ListBoxColumn FieldName="nombre_proceso" />
                        </Columns>
                    </dx:ASPxComboBox>
                    <asp:SqlDataSource ID="SqlDataSourceCombobox1" runat="server" ConnectionString="<%$ ConnectionStrings:ComboProcesosConnectionString %>" SelectCommand="SELECT codigo_proceso, nombre_proceso FROM procesos"></asp:SqlDataSource>
                    <dx:ASPxRoundPanel ID="ASPxRoundPanel2" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Politicas del Proceso" ShowCollapseButton="true" Theme="MetropolisBlue" Width="1060px" Collapsed="True">
                        <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxGridView ID="ASPxGridView3" runat="server" Theme="MetropolisBlue" Width="1060px" AutoGenerateColumns="False" DataSourceID="SqlDataSourcePoliticas" KeyFieldName="id_politica" KeyboardSupport="True">
        <SettingsPager AlwaysShowPager="True" Mode="ShowAllRecords">
        </SettingsPager>
        <SettingsEditing Mode="PopupEditForm">
        </SettingsEditing>
        <Settings ShowFilterRow="True" ShowGroupPanel="True" VerticalScrollBarMode="Visible" VerticalScrollBarStyle="VirtualSmooth" />
        <SettingsBehavior ConfirmDelete="True" AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" />
        <SettingsPopup>
            <EditForm HorizontalAlign="WindowCenter" Modal="True" VerticalAlign="WindowCenter" />
        </SettingsPopup>
        <SettingsSearchPanel Visible="True" />
        <EditFormLayoutProperties>
            <Items>
                <dx:GridViewColumnLayoutItem ColumnName="codigo_proceso">
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewLayoutGroup Caption="" ShowCaption="False">
                    <Items>
                        <dx:GridViewColumnLayoutItem ColumnName="descripcion_politica">
                            <CaptionSettings Location="Top" />
                        </dx:GridViewColumnLayoutItem>
                    </Items>
                </dx:GridViewLayoutGroup>
                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                </dx:EditModeCommandLayoutItem>
            </Items>
        </EditFormLayoutProperties>
        <Columns>
            <dx:GridViewCommandColumn ShowClearFilterButton="True" ShowDeleteButton="True" ShowEditButton="True" ShowInCustomizationForm="True" ShowNewButtonInHeader="True" VisibleIndex="3" ButtonType="Button">
            </dx:GridViewCommandColumn>
            <dx:GridViewDataTextColumn Caption="Id" FieldName="id_politica" ReadOnly="True" ShowInCustomizationForm="True" Visible="False" VisibleIndex="1">
                <EditFormSettings Visible="False" />
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataComboBoxColumn Caption="Codigo del Proceso" FieldName="codigo_proceso" ShowInCustomizationForm="True" VisibleIndex="0">
                <PropertiesComboBox DataSourceID="SqlDataSourceCombobox1" TextField="codigo_proceso" ValueField="codigo_proceso">
                    <Columns>
                        <dx:ListBoxColumn FieldName="codigo_proceso" />
                        <dx:ListBoxColumn FieldName="nombre_proceso" />
                    </Columns>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesComboBox>
            </dx:GridViewDataComboBoxColumn>
            <dx:GridViewDataMemoColumn Caption="Descripcion de la Politica" FieldName="descripcion_politica" ShowInCustomizationForm="True" VisibleIndex="2">
                <PropertiesMemoEdit Rows="4">
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesMemoEdit>
            </dx:GridViewDataMemoColumn>
        </Columns>
    </dx:ASPxGridView>
                            <asp:SqlDataSource ID="SqlDataSourcePoliticas" runat="server" ConnectionString="<%$ ConnectionStrings:PoliticasConnectionString %>" DeleteCommand="DELETE FROM [politicas] WHERE [id_politica] = @id_politica" InsertCommand="INSERT INTO [politicas] ([codigo_proceso], [descripcion_politica]) VALUES (@codigo_proceso, @descripcion_politica)" SelectCommand="SELECT * FROM [politicas]" UpdateCommand="UPDATE [politicas] SET [codigo_proceso] = @codigo_proceso, [descripcion_politica] = @descripcion_politica WHERE [id_politica] = @id_politica">
                                <DeleteParameters>
                                    <asp:Parameter Name="id_politica" Type="Int32" />
                                </DeleteParameters>
                                <InsertParameters>
                                    <asp:Parameter Name="codigo_proceso" Type="String" />
                                    <asp:Parameter Name="descripcion_politica" Type="String" />
                                </InsertParameters>
                                <UpdateParameters>
                                    <asp:Parameter Name="codigo_proceso" Type="String" />
                                    <asp:Parameter Name="descripcion_politica" Type="String" />
                                    <asp:Parameter Name="id_politica" Type="Int32" />
                                </UpdateParameters>
    </asp:SqlDataSource>
                            </dx:PanelContent>
</PanelCollection>
                    </dx:ASPxRoundPanel>
                    <dx:ASPxComboBox ID="ASPxComboBox2" runat="server" DataSourceID="SqlDataSourceCombobox2" Visible="False">
                        <Columns>
                            <dx:ListBoxColumn FieldName="codigo_puesto" />
                            <dx:ListBoxColumn FieldName="nombre_puesto" />
                        </Columns>
                    </dx:ASPxComboBox>
                    <asp:SqlDataSource ID="SqlDataSourceCombobox2" runat="server" ConnectionString="<%$ ConnectionStrings:PerfilesConnectionString7 %>" SelectCommand="SELECT codigo_puesto, nombre_puesto FROM perfiles"></asp:SqlDataSource>
    </div>
    <div style="text-align: left">
                    <dx:ASPxRoundPanel ID="ASPxRoundPanel3" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Actividades del Proceso" ShowCollapseButton="true" Theme="MetropolisBlue" Width="1060px" Collapsed="True">
                        <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxGridView ID="ASPxGridView4" runat="server" Theme="MetropolisBlue" Width="1060px" AutoGenerateColumns="False" DataSourceID="SqlDataSourceActividad" KeyFieldName="id_actividad" KeyboardSupport="True">
        <SettingsPager AlwaysShowPager="True" Mode="ShowAllRecords">
        </SettingsPager>
        <SettingsEditing Mode="PopupEditForm">
        </SettingsEditing>
        <Settings ShowFilterRow="True" ShowGroupPanel="True" VerticalScrollBarMode="Visible" VerticalScrollBarStyle="VirtualSmooth" />
        <SettingsBehavior ConfirmDelete="True" AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" />
        <SettingsPopup>
            <EditForm HorizontalAlign="WindowCenter" Modal="True" VerticalAlign="WindowCenter" />
        </SettingsPopup>
        <SettingsSearchPanel Visible="True" />
        <EditFormLayoutProperties>
            <Items>
                <dx:GridViewColumnLayoutItem ColumnName="codigo_proceso">
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewLayoutGroup Caption="">
                    <Items>
                        <dx:GridViewColumnLayoutItem ColumnName="detalle_actividad">
                            <CaptionSettings Location="Top" />
                        </dx:GridViewColumnLayoutItem>
                    </Items>
                </dx:GridViewLayoutGroup>
                <dx:GridViewColumnLayoutItem ColumnName="orden_actividad">
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewColumnLayoutItem ColumnName="Perfil al que Aplica">
                </dx:GridViewColumnLayoutItem>
                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                </dx:EditModeCommandLayoutItem>
            </Items>
        </EditFormLayoutProperties>
        <Columns>
            <dx:GridViewCommandColumn ShowDeleteButton="True" ShowEditButton="True" ShowInCustomizationForm="True" ShowNewButtonInHeader="True" VisibleIndex="5" ButtonType="Button">
            </dx:GridViewCommandColumn>
            <dx:GridViewDataTextColumn FieldName="id_actividad" ReadOnly="True" ShowInCustomizationForm="True" Visible="False" VisibleIndex="0">
                <EditFormSettings Visible="False" />
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataComboBoxColumn Caption="Codigo del Proceso" FieldName="codigo_proceso" ShowInCustomizationForm="True" VisibleIndex="1">
                <PropertiesComboBox DataSourceID="SqlDataSourceCombobox1" TextField="codigo_proceso" ValueField="codigo_proceso">
                    <Columns>
                        <dx:ListBoxColumn FieldName="codigo_proceso" />
                        <dx:ListBoxColumn FieldName="nombre_proceso" />
                    </Columns>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesComboBox>
            </dx:GridViewDataComboBoxColumn>
            <dx:GridViewDataComboBoxColumn Caption="Perfil Responsable" FieldName="codigo_puesto" ShowInCustomizationForm="True" VisibleIndex="4">
                <PropertiesComboBox DataSourceID="SqlDataSourceCombobox2" TextField="codigo_puesto" ValueField="codigo_puesto">
                    <Columns>
                        <dx:ListBoxColumn FieldName="codigo_puesto" />
                        <dx:ListBoxColumn FieldName="nombre_puesto" />
                    </Columns>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesComboBox>
            </dx:GridViewDataComboBoxColumn>
            <dx:GridViewDataSpinEditColumn Caption="Orden" FieldName="orden_actividad" ShowInCustomizationForm="True" VisibleIndex="3">
                <PropertiesSpinEdit DisplayFormatString="g" Width="50px">
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesSpinEdit>
            </dx:GridViewDataSpinEditColumn>
            <dx:GridViewDataMemoColumn Caption="Detalle de la Actividad" FieldName="detalle_actividad" ShowInCustomizationForm="True" VisibleIndex="2">
                <PropertiesMemoEdit Rows="4">
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesMemoEdit>
            </dx:GridViewDataMemoColumn>
        </Columns>
    </dx:ASPxGridView>
                            <asp:SqlDataSource ID="SqlDataSourceActividad" runat="server" ConnectionString="<%$ ConnectionStrings:ActividadConnectionString %>" DeleteCommand="DELETE FROM [actividadesproceso] WHERE [id_actividad] = @id_actividad" InsertCommand="INSERT INTO [actividadesproceso] ([detalle_actividad], [orden_actividad], [codigo_proceso], [codigo_puesto]) VALUES (@detalle_actividad, @orden_actividad, @codigo_proceso, @codigo_puesto)" SelectCommand="SELECT * FROM [actividadesproceso]" UpdateCommand="UPDATE [actividadesproceso] SET [detalle_actividad] = @detalle_actividad, [orden_actividad] = @orden_actividad, [codigo_proceso] = @codigo_proceso, [codigo_puesto] = @codigo_puesto WHERE [id_actividad] = @id_actividad">
                                <DeleteParameters>
                                    <asp:Parameter Name="id_actividad" Type="Int32" />
                                </DeleteParameters>
                                <InsertParameters>
                                    <asp:Parameter Name="detalle_actividad" Type="String" />
                                    <asp:Parameter Name="orden_actividad" Type="Int32" />
                                    <asp:Parameter Name="codigo_proceso" Type="String" />
                                    <asp:Parameter Name="codigo_puesto" Type="String" />
                                </InsertParameters>
                                <UpdateParameters>
                                    <asp:Parameter Name="detalle_actividad" Type="String" />
                                    <asp:Parameter Name="orden_actividad" Type="Int32" />
                                    <asp:Parameter Name="codigo_proceso" Type="String" />
                                    <asp:Parameter Name="codigo_puesto" Type="String" />
                                    <asp:Parameter Name="id_actividad" Type="Int32" />
                                </UpdateParameters>
    </asp:SqlDataSource>
                            </dx:PanelContent>
</PanelCollection>
                    </dx:ASPxRoundPanel>
                    <dx:ASPxComboBox ID="ASPxComboBox3" runat="server" DataSourceID="SqlDataSourceCombobox3" Visible="False">
                        <Columns>
                            <dx:ListBoxColumn FieldName="id_actividad" />
                            <dx:ListBoxColumn FieldName="detalle_actividad" />
                        </Columns>
                    </dx:ASPxComboBox>
                    <asp:SqlDataSource ID="SqlDataSourceCombobox3" runat="server" ConnectionString="<%$ ConnectionStrings:Combobox3ConnectionString %>" SelectCommand="SELECT id_actividad, detalle_actividad FROM actividadesproceso"></asp:SqlDataSource>
    </div>
    <div style="text-align: left">
                    <dx:ASPxRoundPanel ID="ASPxRoundPanel4" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Descripción de Actividades" ShowCollapseButton="true" Theme="MetropolisBlue" Width="1060px" Collapsed="True">
                        <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxGridView ID="ASPxGridView5" runat="server" Theme="MetropolisBlue" Width="1060px" AutoGenerateColumns="False" DataSourceID="SqlDataSourceDescAct" KeyFieldName="id_descripcionactividad" KeyboardSupport="True">
        <SettingsPager AlwaysShowPager="True" Mode="ShowAllRecords">
        </SettingsPager>
        <SettingsEditing Mode="PopupEditForm">
        </SettingsEditing>
        <Settings ShowFilterRow="True" ShowGroupPanel="True" VerticalScrollBarMode="Visible" VerticalScrollBarStyle="VirtualSmooth" />
        <SettingsBehavior ConfirmDelete="True" AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" />
        <SettingsPopup>
            <EditForm HorizontalAlign="WindowCenter" Modal="True" VerticalAlign="WindowCenter" />
        </SettingsPopup>
        <SettingsSearchPanel Visible="True" />
        <EditFormLayoutProperties>
            <Items>
                <dx:GridViewColumnLayoutItem ColumnName="codigo_proceso">
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewColumnLayoutItem ColumnName="id_actividad">
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewLayoutGroup Caption="">
                    <Items>
                        <dx:GridViewColumnLayoutItem ColumnName="descripcion_actividad" ShowCaption="True">
                            <CaptionSettings Location="Top" />
                        </dx:GridViewColumnLayoutItem>
                    </Items>
                    <SettingsItemCaptions Location="Top" />
                    <SettingsItems ShowCaption="False" />
                </dx:GridViewLayoutGroup>
                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                </dx:EditModeCommandLayoutItem>
            </Items>
        </EditFormLayoutProperties>
        <Columns>
            <dx:GridViewCommandColumn ShowDeleteButton="True" ShowEditButton="True" ShowInCustomizationForm="True" ShowNewButtonInHeader="True" VisibleIndex="4" ButtonType="Button">
            </dx:GridViewCommandColumn>
            <dx:GridViewDataTextColumn FieldName="id_descripcionactividad" ReadOnly="True" ShowInCustomizationForm="True" Visible="False" VisibleIndex="0">
                <EditFormSettings Visible="False" />
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataComboBoxColumn Caption="Codigo del Proceso" FieldName="codigo_proceso" ShowInCustomizationForm="True" VisibleIndex="1">
                <PropertiesComboBox DataSourceID="SqlDataSourceCombobox1" TextField="codigo_proceso" ValueField="codigo_proceso">
                    <Columns>
                        <dx:ListBoxColumn FieldName="codigo_proceso" />
                        <dx:ListBoxColumn FieldName="nombre_proceso" />
                    </Columns>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesComboBox>
            </dx:GridViewDataComboBoxColumn>
            <dx:GridViewDataComboBoxColumn Caption="Actividad" FieldName="id_actividad" ShowInCustomizationForm="True" VisibleIndex="2">
                <PropertiesComboBox DataSourceID="SqlDataSourceCombobox3" TextField="id_actividad" ValueField="id_actividad">
                    <Columns>
                        <dx:ListBoxColumn FieldName="id_actividad" />
                        <dx:ListBoxColumn FieldName="detalle_actividad" />
                    </Columns>
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Requerido" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesComboBox>
            </dx:GridViewDataComboBoxColumn>
            <dx:GridViewDataMemoColumn Caption="Descripción" FieldName="descripcion_actividad" ShowInCustomizationForm="True" VisibleIndex="3">
                <PropertiesMemoEdit Rows="4">
                    <ValidationSettings SetFocusOnError="True">
                        <RequiredField ErrorText="*Se requiere la descripción" IsRequired="True" />
                    </ValidationSettings>
                </PropertiesMemoEdit>
            </dx:GridViewDataMemoColumn>
        </Columns>
    </dx:ASPxGridView>
                            <asp:SqlDataSource ID="SqlDataSourceDescAct" runat="server" ConnectionString="<%$ ConnectionStrings:DescActConnectionString %>" DeleteCommand="DELETE FROM [descripcionactividad] WHERE [id_descripcionactividad] = @id_descripcionactividad" InsertCommand="INSERT INTO [descripcionactividad] ([descripcion_actividad], [id_actividad], [codigo_proceso]) VALUES (@descripcion_actividad, @id_actividad, @codigo_proceso)" SelectCommand="SELECT * FROM [descripcionactividad]" UpdateCommand="UPDATE [descripcionactividad] SET [descripcion_actividad] = @descripcion_actividad, [id_actividad] = @id_actividad, [codigo_proceso] = @codigo_proceso WHERE [id_descripcionactividad] = @id_descripcionactividad">
                                <DeleteParameters>
                                    <asp:Parameter Name="id_descripcionactividad" Type="Int32" />
                                </DeleteParameters>
                                <InsertParameters>
                                    <asp:Parameter Name="descripcion_actividad" Type="String" />
                                    <asp:Parameter Name="id_actividad" Type="Int32" />
                                    <asp:Parameter Name="codigo_proceso" Type="String" />
                                </InsertParameters>
                                <UpdateParameters>
                                    <asp:Parameter Name="descripcion_actividad" Type="String" />
                                    <asp:Parameter Name="id_actividad" Type="Int32" />
                                    <asp:Parameter Name="codigo_proceso" Type="String" />
                                    <asp:Parameter Name="id_descripcionactividad" Type="Int32" />
                                </UpdateParameters>
    </asp:SqlDataSource>
                            </dx:PanelContent>
</PanelCollection>
                    </dx:ASPxRoundPanel>

                    <dx:ASPxRoundPanel ID="ASPxRoundPanel6" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Relacion Actividades/Perfiles" ShowCollapseButton="true" Theme="MetropolisBlue" Width="100%" Collapsed="True">
                        <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxFormLayout ID="ASPxFormLayout1" runat="server" EnableTheming="True" Theme="MetropolisBlue" Width="100%">
        <Items>
            <dx:LayoutItem Caption="ID Actividad" FieldName="id_detalleactividad" Width="700px">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxComboBox ID="ComboIDActividad" runat="server" AutoPostBack="True" DataSourceID="SqlDataSourceRDAP" EnableTheming="True" TextField="descripcion_actividad" Theme="MetropolisBlue" ValueField="id_descripcionactividad" Width="800px">
                            <Columns>
                                <dx:ListBoxColumn Caption="Descripcion de la actividad" FieldName="descripcion_actividad">
                                </dx:ListBoxColumn>
                            </Columns>
                        </dx:ASPxComboBox>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
                <CaptionSettings Location="Top" />
            </dx:LayoutItem>
            <dx:LayoutItem Caption="Detalle de la Actividad" FieldName="detalleactividad" Width="700px">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxMemo ID="MemoDetalleActividad" runat="server" Rows="6" Theme="MetropolisBlue" Width="800px">
                        </dx:ASPxMemo>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
                <CaptionSettings Location="Top" />
            </dx:LayoutItem>
            <dx:LayoutItem Caption="Perfil que realizara la actividad" FieldName="codigo_puesto">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxComboBox ID="ComboPerfil" runat="server" DataSourceID="SqlDataSourcePerfiles" EnableTheming="True" TextField="nombre_puesto" TextFormatString="{0}; {1}" Theme="MetropolisBlue" ValueField="codigo_puesto" Width="500px">
                            <Columns>
                                <dx:ListBoxColumn Caption="Codigo Perfil" FieldName="codigo_puesto" Width="100px">
                                </dx:ListBoxColumn>
                                <dx:ListBoxColumn Caption="Nombre del Perfil" FieldName="nombre_puesto">
                                </dx:ListBoxColumn>
                            </Columns>
                        </dx:ASPxComboBox>
                        <asp:SqlDataSource ID="SqlDataSourcePerfiles" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT [codigo_puesto], [nombre_puesto] FROM [perfiles]"></asp:SqlDataSource>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
            </dx:LayoutItem>
            <dx:LayoutGroup Caption="Adjuntar Documento" ColCount="2">
                <Items>
                    <dx:LayoutItem Caption="">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                <input id="File1" runat="server" class="auto-style2" type="file"></input>
                                </input>
</input>
                                </input>
                                </input>
                                </input>
                                &nbsp;&nbsp;
                                <input id="Submit1" runat="server" class="auto-style1" type="submit" value="Adjuntar"></input>
                            </input>
</input>
                            </input>
                            </input>
                                </input>
                                <asp:TextBox ID="TextBox1" runat="server" Visible="False"></asp:TextBox>
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                    </dx:LayoutItem>
                    <dx:LayoutItem Caption="">
                        <LayoutItemNestedControlCollection>
                            <dx:LayoutItemNestedControlContainer runat="server">
                                
                            </dx:LayoutItemNestedControlContainer>
                        </LayoutItemNestedControlCollection>
                    </dx:LayoutItem>
                </Items>
            </dx:LayoutGroup>
            <dx:LayoutItem Caption="">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxHyperLink ID="LinkAdjunto" runat="server" Target="_blank" Text="Ver Documento Adjunto">
                        </dx:ASPxHyperLink>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
            </dx:LayoutItem>
            <dx:LayoutItem Caption="" HorizontalAlign="Right">
                <LayoutItemNestedControlCollection>
                    <dx:LayoutItemNestedControlContainer runat="server">
                        <dx:ASPxButton ID="BtnAgregar" runat="server" Height="36px" HorizontalAlign="Right" Text="Agregar Relacion" Width="120px" Theme="MetropolisBlue">
                        </dx:ASPxButton>
                    </dx:LayoutItemNestedControlContainer>
                </LayoutItemNestedControlCollection>
            </dx:LayoutItem>
        </Items>
    </dx:ASPxFormLayout>
    <asp:SqlDataSource ID="SqlDataSourceRDAP" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT [id_descripcionactividad], [descripcion_actividad] FROM [descripcionactividad]"></asp:SqlDataSource>
    <asp:SqlDataSource ID="SqlDataSourcePerfil" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT [codigo_puesto], [nombre_puesto] FROM [perfiles]"></asp:SqlDataSource>
    <dx:ASPxGridView ID="ASPxGridView6" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourceRelacionesAP" EnableTheming="True" KeyboardSupport="True" KeyFieldName="id_rap" Theme="MetropolisBlue" Width="100%">
        <SettingsPager Visible="False">
        </SettingsPager>
        <SettingsEditing Mode="PopupEditForm">
        </SettingsEditing>
        <Settings HorizontalScrollBarMode="Visible" ShowGroupPanel="True" VerticalScrollableHeight="300" VerticalScrollBarMode="Visible" />
        <SettingsBehavior AllowSelectByRowClick="True" AllowSelectSingleRowOnly="True" ConfirmDelete="True" />
        <SettingsDataSecurity AllowInsert="False" AllowEdit="False" />
        <SettingsPopup>
            <EditForm HorizontalAlign="WindowCenter" Modal="True" VerticalAlign="WindowCenter" />
        </SettingsPopup>
        <EditFormLayoutProperties>
            <Items>
                <dx:GridViewColumnLayoutItem ColumnName="detalleactividad">
                    <CaptionSettings Location="Top" />
                </dx:GridViewColumnLayoutItem>
                <dx:GridViewColumnLayoutItem ColumnName="codigo_puesto">
                    <CaptionSettings Location="Top" />
                </dx:GridViewColumnLayoutItem>
                <dx:EditModeCommandLayoutItem HorizontalAlign="Right">
                </dx:EditModeCommandLayoutItem>
            </Items>
        </EditFormLayoutProperties>
        <Columns>
            <dx:GridViewDataTextColumn FieldName="id_rap" ReadOnly="True" ShowInCustomizationForm="True" Visible="False" VisibleIndex="0">
                <EditFormSettings Visible="False" />
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn FieldName="id_detalleactividad" ShowInCustomizationForm="True" Visible="False" VisibleIndex="1">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataComboBoxColumn Caption="Detalle de la actividad" FieldName="detalleactividad" ShowInCustomizationForm="True" VisibleIndex="3" Width="550px">
                <PropertiesComboBox DataSourceID="SqlDataSourceRDAP" TextField="descripcion_actividad" ValueField="id_descripcionactividad">
                    <Columns>
                        <dx:ListBoxColumn Caption="Seleccione la Actividad" FieldName="descripcion_actividad">
                        </dx:ListBoxColumn>
                    </Columns>
                </PropertiesComboBox>
            </dx:GridViewDataComboBoxColumn>
            <dx:GridViewDataComboBoxColumn Caption="Perfil responsable de la actividad" FieldName="codigo_puesto" ShowInCustomizationForm="True" VisibleIndex="5" Width="200px">
                <PropertiesComboBox DataSourceID="SqlDataSourcePerfil" TextField="nombre_puesto" ValueField="codigo_puesto">
                    <Columns>
                        <dx:ListBoxColumn Caption="Codigo Perfil" FieldName="codigo_puesto">
                        </dx:ListBoxColumn>
                        <dx:ListBoxColumn Caption="Nombre Perfil" FieldName="nombre_puesto">
                        </dx:ListBoxColumn>
                    </Columns>
                </PropertiesComboBox>
            </dx:GridViewDataComboBoxColumn>
            <dx:GridViewCommandColumn ButtonRenderMode="Button" ButtonType="Button" ShowDeleteButton="True" ShowInCustomizationForm="True" VisibleIndex="2" Width="150px">
            </dx:GridViewCommandColumn>
            <dx:GridViewDataHyperLinkColumn Caption="Documento Adjunto" FieldName="adjunto" ShowInCustomizationForm="True" VisibleIndex="4" Width="200px">
            </dx:GridViewDataHyperLinkColumn>
        </Columns>
    </dx:ASPxGridView>
    <asp:SqlDataSource ID="SqlDataSourceRelacionesAP" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT * FROM [rdap]" DeleteCommand="DELETE FROM [rdap] WHERE [id_rap] = @id_rap" InsertCommand="INSERT INTO [rdap] ([id_detalleactividad], [detalleactividad], [codigo_puesto], [adjunto]) VALUES (@id_detalleactividad, @detalleactividad, @codigo_puesto, @adjunto)" UpdateCommand="UPDATE [rdap] SET [id_detalleactividad] = @id_detalleactividad, [detalleactividad] = @detalleactividad, [codigo_puesto] = @codigo_puesto, [adjunto] = @adjunto WHERE [id_rap] = @id_rap">
        <DeleteParameters>
            <asp:Parameter Name="id_rap" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="id_detalleactividad" Type="Int32" />
            <asp:Parameter Name="detalleactividad" Type="String" />
            <asp:Parameter Name="codigo_puesto" Type="String" />
            <asp:Parameter Name="adjunto" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="id_detalleactividad" Type="Int32" />
            <asp:Parameter Name="detalleactividad" Type="String" />
            <asp:Parameter Name="codigo_puesto" Type="String" />
            <asp:Parameter Name="adjunto" Type="String" />
            <asp:Parameter Name="id_rap" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
                            </dx:PanelContent>
</PanelCollection>
                    </dx:ASPxRoundPanel>
    </div>
    <div style="text-align: left">
                    <dx:ASPxRoundPanel ID="ASPxRoundPanel5" runat="server" AllowCollapsingByHeaderClick="True" HeaderText="Procesos Definidos" ShowCollapseButton="true" Theme="MetropolisBlue" Width="1060px" Collapsed="True">
                        <PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxPivotGrid ID="ASPxPivotGrid1" runat="server" ClientIDMode="AutoID" DataSourceID="SqlDataSourceProcesDef" EnableTheming="True" Theme="MetropolisBlue" Width="1060px">
        <Fields>
            <dx:PivotGridField ID="fieldcodigoproceso" AreaIndex="0" FieldName="codigo_proceso">
            </dx:PivotGridField>
            <dx:PivotGridField ID="fieldnombreproceso" Area="RowArea" AreaIndex="0" FieldName="nombre_proceso">
            </dx:PivotGridField>
            <dx:PivotGridField ID="fieldobjetivoproceso" Area="RowArea" AreaIndex="1" FieldName="objetivo_proceso">
            </dx:PivotGridField>
            <dx:PivotGridField ID="fielddetalleactividad" Area="RowArea" AreaIndex="2" FieldName="detalle_actividad">
            </dx:PivotGridField>
            <dx:PivotGridField ID="fieldordenactividad" Area="RowArea" AreaIndex="3" FieldName="orden_actividad">
            </dx:PivotGridField>
            <dx:PivotGridField ID="fielddescripcionactividad" Area="RowArea" AreaIndex="4" FieldName="descripcion_actividad">
            </dx:PivotGridField>
            <dx:PivotGridField ID="fielddescripcionpolitica" Area="RowArea" AreaIndex="5" FieldName="descripcion_politica">
            </dx:PivotGridField>
        </Fields>
        <OptionsView HorizontalScrollBarMode="Visible" ShowColumnGrandTotalHeader="False" ShowColumnGrandTotals="False" ShowColumnTotals="False" ShowCustomTotalsForSingleValues="True" ShowGrandTotalsForSingleValues="True" ShowRowGrandTotalHeader="False" ShowRowGrandTotals="False" ShowRowTotals="False" ShowTotalsForSingleValues="True" />
    </dx:ASPxPivotGrid>
    <asp:SqlDataSource ID="SqlDataSourceProcesDef" runat="server" ConnectionString="<%$ ConnectionStrings:ProcesDefConnectionString %>" SelectCommand="SELECT procesos.*, perfilesproceso.*, actividadesproceso.*, descripcionactividad.*, politicas.* FROM procesos INNER JOIN actividadesproceso ON procesos.codigo_proceso = actividadesproceso.codigo_proceso INNER JOIN descripcionactividad ON procesos.codigo_proceso = descripcionactividad.codigo_proceso INNER JOIN politicas ON procesos.codigo_proceso = politicas.codigo_proceso FULL OUTER JOIN perfilesproceso ON procesos.codigo_proceso = perfilesproceso.codigo_proceso"></asp:SqlDataSource>
    <dx:ASPxPivotGridExporter ID="ASPxPivotGridExporter1" runat="server" ASPxPivotGridID="ASPxPivotGrid1">
    </dx:ASPxPivotGridExporter>
                            </dx:PanelContent>
</PanelCollection>
                    </dx:ASPxRoundPanel>
                    <br />
    </div>
                    <br />
    </div>
</asp:Content>
