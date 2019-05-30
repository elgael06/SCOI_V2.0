<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="tareas.aspx.vb" Inherits="seguimiento.tareas" %>

<%@ Register Assembly="DevExpress.Web.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxScheduler.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxScheduler.Controls" tagprefix="dxwschsc" %>
<%@ Register assembly="DevExpress.Web.ASPxScheduler.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxScheduler" tagprefix="dxwschs" %>
<%@ Register assembly="DevExpress.XtraScheduler.v17.2.Core, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraScheduler" tagprefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Programación y seguimiento de tareas</h2>
    <div>
        <dx:ASPxRoundPanel ID="ASPxRoundPanel1" runat="server" ShowCollapseButton="true" Width="100%" AllowCollapsingByHeaderClick="True" HeaderText="Programación de Tareas" Theme="MetropolisBlue"><PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxComboBox ID="ASPxComboBox2" runat="server" Caption="Seleccione el tipo de tarea" EnableTheming="True" Theme="MetropolisBlue" Width="400px">
        <Items>
            <dx:ListEditItem Text="Ticket de Soporte" Value="Ticket de Soporte" />
            <dx:ListEditItem Text="Solicitud de Reporte o Información" Value="Solicitud de Reporte o Información" />
            <dx:ListEditItem Text="Solicitud de Ayuda o Apoyo" Value="Solicitud de Ayuda o Apoyo" />
        </Items>
        <CaptionSettings Position="Top" />
    </dx:ASPxComboBox>
    <br />
    <dx:ASPxMemo ID="ASPxMemo1" runat="server" Caption="Describa la tarea a realizar" Height="71px" Width="600px">
        <CaptionSettings Position="Top" />
    </dx:ASPxMemo>
    <br />
    <dx:ASPxComboBox ID="ASPxComboBox1" runat="server" Caption="Seleccione el usuario responsable de ejecutar esta tarea" Theme="MetropolisBlue" Width="400px" DataSourceID="SqlDataSourceUsuarioTarea" TextField="nombre_usuario" ValueField="id_usuario">
        <Columns>
            <dx:ListBoxColumn FieldName="nombre_usuario">
            </dx:ListBoxColumn>
        </Columns>
        <CaptionSettings Position="Top" />
    </dx:ASPxComboBox>
    <asp:SqlDataSource ID="SqlDataSourceUsuarioTarea" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" SelectCommand="SELECT [id_usuario], [nombre_usuario], [email_usuario] FROM [usuarios]"></asp:SqlDataSource>
    <br />
    <dx:ASPxComboBox ID="ASPxComboBox3" runat="server" Caption="Seleccione la prioridad" EnableTheming="True" Theme="MetropolisBlue">
        <Items>
            <dx:ListEditItem Text="BAJA" Value="BAJA" />
            <dx:ListEditItem Text="NORMAL" Value="NORMAL" />
            <dx:ListEditItem Text="IMPORTANTE" Value="IMPORTANTE" />
            <dx:ListEditItem Text="URGENTE" Value="URGENTE" />
            <dx:ListEditItem Text="PREVENTIVO" Value="PREVENTIVO" />
        </Items>
    </dx:ASPxComboBox>
    <br />
    <dx:ASPxDateEdit ID="ASPxDateEdit1" runat="server" Caption="Seleccione la Fecha de Ejecución" Theme="MetropolisBlue">
    </dx:ASPxDateEdit>
    <br />
    Si esta tarea se ejecutara periodicamente entonces marque la casilla de abajo<br />
    <dxwschsc:AppointmentRecurrenceForm ID="AppointmentRecurrenceForm1" runat="server" ClientIDMode="AutoID" EnableHourlyRecurrence="False" End="2017-05-08" Start="2017-05-08" Theme="MetropolisBlue">
    </dxwschsc:AppointmentRecurrenceForm>
            <br />
    <dx:ASPxButton ID="ASPxButton1" runat="server" HorizontalAlign="Right" Text="Guardar Tarea" Theme="MetropolisBlue">
        <Image IconID="save_save_32x32">
        </Image>
    </dx:ASPxButton>
    <br />
    <dx:ASPxGridView ID="ASPxGridView2" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourceListaTareas" EnableTheming="True" KeyFieldName="id_tarea" Theme="MetropolisBlue" Width="100%">
        <Settings ShowGroupPanel="True" />
        <SettingsDataSecurity AllowInsert="False" />
        <Columns>
            <dx:GridViewDataTextColumn FieldName="id_tarea" ReadOnly="True" ShowInCustomizationForm="True" Visible="False" VisibleIndex="1">
                <EditFormSettings Visible="False" />
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn Caption="Tipo Tarea" FieldName="tipo_tarea" ShowInCustomizationForm="True" VisibleIndex="2">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn Caption="Descripcion" FieldName="descripcion_tarea" ShowInCustomizationForm="True" VisibleIndex="3">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn Caption="Prioridad" FieldName="prioridad_tarea" ShowInCustomizationForm="True" VisibleIndex="4">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataDateColumn Caption="Fecha de entrega" FieldName="fecha_tarea" ShowInCustomizationForm="True" VisibleIndex="5">
            </dx:GridViewDataDateColumn>
            <dx:GridViewDataTextColumn Caption="Calificacion" FieldName="calificacion_tarea" ShowInCustomizationForm="True" VisibleIndex="6">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn Caption="Comentarios Calificacion" FieldName="comentario_calificacion" ShowInCustomizationForm="True" VisibleIndex="7">
            </dx:GridViewDataTextColumn>
            <dx:GridViewDataTextColumn Caption="Adjunto" FieldName="documento_adjunto" ShowInCustomizationForm="True" VisibleIndex="8">
            </dx:GridViewDataTextColumn>
            <dx:GridViewCommandColumn ShowDeleteButton="True" ShowEditButton="True" ShowInCustomizationForm="True" VisibleIndex="0">
            </dx:GridViewCommandColumn>
            <dx:GridViewDataTextColumn Caption="Responsable Asignado" FieldName="responsable_ejecuta" ShowInCustomizationForm="True" VisibleIndex="9">
            </dx:GridViewDataTextColumn>
        </Columns>
    </dx:ASPxGridView>
    <asp:SqlDataSource ID="SqlDataSourceListaTareas" runat="server" ConnectionString="<%$ ConnectionStrings:ConexionHK %>" DeleteCommand="DELETE FROM [tareas] WHERE [id_tarea] = @id_tarea" InsertCommand="INSERT INTO [tareas] ([tipo_tarea], [descripcion_tarea], [responsable_ejecuta], [usuario_genera], [prioridad_tarea], [fecha_tarea], [calificacion_tarea], [comentario_calificacion], [documento_adjunto]) VALUES (@tipo_tarea, @descripcion_tarea, @responsable_ejecuta, @usuario_genera, @prioridad_tarea, @fecha_tarea, @calificacion_tarea, @comentario_calificacion, @documento_adjunto)" SelectCommand="SELECT * FROM [tareas]" UpdateCommand="UPDATE [tareas] SET [tipo_tarea] = @tipo_tarea, [descripcion_tarea] = @descripcion_tarea, [responsable_ejecuta] = @responsable_ejecuta, [usuario_genera] = @usuario_genera, [prioridad_tarea] = @prioridad_tarea, [fecha_tarea] = @fecha_tarea, [calificacion_tarea] = @calificacion_tarea, [comentario_calificacion] = @comentario_calificacion, [documento_adjunto] = @documento_adjunto WHERE [id_tarea] = @id_tarea">
        <DeleteParameters>
            <asp:Parameter Name="id_tarea" Type="Int32" />
        </DeleteParameters>
        <InsertParameters>
            <asp:Parameter Name="tipo_tarea" Type="String" />
            <asp:Parameter Name="descripcion_tarea" Type="String" />
            <asp:Parameter Name="responsable_ejecuta" Type="Object" />
            <asp:Parameter Name="usuario_genera" Type="String" />
            <asp:Parameter Name="prioridad_tarea" Type="String" />
            <asp:Parameter DbType="Date" Name="fecha_tarea" />
            <asp:Parameter Name="calificacion_tarea" Type="Int32" />
            <asp:Parameter Name="comentario_calificacion" Type="String" />
            <asp:Parameter Name="documento_adjunto" Type="String" />
        </InsertParameters>
        <UpdateParameters>
            <asp:Parameter Name="tipo_tarea" Type="String" />
            <asp:Parameter Name="descripcion_tarea" Type="String" />
            <asp:Parameter Name="responsable_ejecuta" Type="Object" />
            <asp:Parameter Name="usuario_genera" Type="String" />
            <asp:Parameter Name="prioridad_tarea" Type="String" />
            <asp:Parameter DbType="Date" Name="fecha_tarea" />
            <asp:Parameter Name="calificacion_tarea" Type="Int32" />
            <asp:Parameter Name="comentario_calificacion" Type="String" />
            <asp:Parameter Name="documento_adjunto" Type="String" />
            <asp:Parameter Name="id_tarea" Type="Int32" />
        </UpdateParameters>
    </asp:SqlDataSource>
            </dx:PanelContent>
</PanelCollection>
        </dx:ASPxRoundPanel>
    </div>
    <div>
        <dx:ASPxRoundPanel ID="ASPxRoundPanel2" runat="server" ShowCollapseButton="true" Width="100%" AllowCollapsingByHeaderClick="True" HeaderText="Seguimiento de Mis Tareas" Theme="MetropolisBlue"><PanelCollection>
<dx:PanelContent runat="server">
    <dx:ASPxGridView ID="ASPxGridView1" runat="server" Theme="MetropolisBlue" Width="100%">
        <SettingsPager Visible="False">
        </SettingsPager>
        <Settings ShowGroupPanel="True" />
        <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False" />
    </dx:ASPxGridView>
            </dx:PanelContent>
</PanelCollection>
        </dx:ASPxRoundPanel>
    </div>
</asp:Content>
