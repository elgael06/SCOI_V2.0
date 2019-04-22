﻿<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="usuarios.aspx.vb" Inherits="seguimiento.usuarios" %>
<%@ Register assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" namespace="CrystalDecisions.Web" tagprefix="CR" %>
<%@ Register assembly="DevExpress.Web.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web" tagprefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    </asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Gestion de Usuarios</h2>
    <div>

        <asp:SqlDataSource ID="SqlDataSourceUsuarios" runat="server" ConnectionString="<%$ ConnectionStrings:seguimientoConnectionString1 %>" DeleteCommand="DELETE FROM [usuarios] WHERE [nombre_usuario] = @nombre_usuario" InsertCommand="INSERT INTO [usuarios] ([nombre_usuario], [nombrecompleto_usuario], [email_usuario], [nivel_usuario], [password_usuario]) VALUES (@nombre_usuario, @nombrecompleto_usuario, @email_usuario, @nivel_usuario, @password_usuario)" SelectCommand="SELECT [id_usuario], [nombre_usuario], [nombrecompleto_usuario], [email_usuario], [nivel_usuario], [password_usuario] FROM [usuarios]" UpdateCommand="UPDATE [usuarios] SET [nombrecompleto_usuario] = @nombrecompleto_usuario, [email_usuario] = @email_usuario, [nivel_usuario] = @nivel_usuario, [password_usuario] = @password_usuario WHERE  [id_usuario] = @id_usuario">
            <DeleteParameters>
                <asp:Parameter Name="nombre_usuario" Type="String" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="nombre_usuario" Type="String" />
                <asp:Parameter Name="nombrecompleto_usuario" Type="String" />
                <asp:Parameter Name="email_usuario" Type="String" />
                <asp:Parameter Name="nivel_usuario" Type="String" />
                <asp:Parameter Name="password_usuario" Type="String" />
            </InsertParameters>
            <UpdateParameters>
                <asp:Parameter Name="id_usuario" Type="Int32" />
                <asp:Parameter Name="nombrecompleto_usuario" Type="String" />
                <asp:Parameter Name="email_usuario" Type="String" />
                <asp:Parameter Name="nivel_usuario" Type="String" />
                <asp:Parameter Name="password_usuario" Type="String" />
                <asp:Parameter Name="nombre_usuario" Type="String" />
            </UpdateParameters>
        </asp:SqlDataSource>
                    <br />
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:seguimientoConnectionString4 %>" DeleteCommand="DELETE FROM [usuarios] WHERE [nombre_usuario] = @nombre_usuario" InsertCommand="INSERT INTO [usuarios] ([nombre_usuario], [nombrecompleto_usuario], [email_usuario], [nivel_usuario], [password_usuario]) VALUES (@nombre_usuario, @nombrecompleto_usuario, @email_usuario, @nivel_usuario, @password_usuario)" SelectCommand="SELECT * FROM [usuarios]" UpdateCommand="UPDATE [usuarios] SET [id_usuario] = @id_usuario, [nombrecompleto_usuario] = @nombrecompleto_usuario, [email_usuario] = @email_usuario, [nivel_usuario] = @nivel_usuario, [password_usuario] = @password_usuario WHERE [nombre_usuario] = @nombre_usuario">
            <DeleteParameters>
                <asp:Parameter Name="nombre_usuario" Type="String" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="nombre_usuario" Type="String" />
                <asp:Parameter Name="nombrecompleto_usuario" Type="String" />
                <asp:Parameter Name="email_usuario" Type="String" />
                <asp:Parameter Name="nivel_usuario" Type="String" />
                <asp:Parameter Name="password_usuario" Type="String" />
            </InsertParameters>
            <UpdateParameters>
                <asp:Parameter Name="id_usuario" Type="Int32" />
                <asp:Parameter Name="nombrecompleto_usuario" Type="String" />
                <asp:Parameter Name="email_usuario" Type="String" />
                <asp:Parameter Name="nivel_usuario" Type="String" />
                <asp:Parameter Name="password_usuario" Type="String" />
                <asp:Parameter Name="nombre_usuario" Type="String" />
            </UpdateParameters>
        </asp:SqlDataSource>
                    <br />
        <dx:ASPxCardViewExporter ID="ASPxCardViewExporter1" runat="server" CardViewID="ASPxCardView1" ExportSelectedCardsOnly="True" FileName="Usuarios" PrintSelectCheckBox="True" ReportHeader="{\rtf1\ansi\ansicpg1252\deff0\deflang2058{\fonttbl{\f0\fnil\fcharset0 Arial;}{\f1\fnil\fcharset0 Times New Roman;}}
\viewkind4\uc1\pard\qc\b\fs24 Grupo Izagar\par
Reporte de Usuarios\b0\f1\fs20\par
}
">
        </dx:ASPxCardViewExporter>
        <dx:ASPxButton ID="ASPxButton1" runat="server" EnableTheming="True" Text="Exportar a PDF" Theme="MetropolisBlue">
        </dx:ASPxButton>
        <dx:ASPxCardView ID="ASPxCardView1" runat="server" AutoGenerateColumns="False" DataSourceID="SqlDataSourceUsuarios" EnableTheming="True" KeyFieldName="nombre_usuario" Theme="MetropolisBlue" Width="100%">
            <SettingsPager Mode="EndlessPaging">
            </SettingsPager>
            <SettingsEditing Mode="PopupEditForm">
            </SettingsEditing>
            <Settings ShowHeaderFilterbutton="true" ShowHeaderPanel="True" ShowSummaryPanel="True" ShowTitlePanel="True" VerticalScrollBarMode="Visible" VerticalScrollableHeight="300" />
            <SettingsBehavior AllowFocusedCard="True" AllowSelectByCardClick="True" AllowSelectSingleCardOnly="True" ConfirmDelete="True" />
            <SettingsPopup>
                <EditForm AllowResize="True" Height="200px" HorizontalAlign="WindowCenter" VerticalAlign="WindowCenter" Width="800px" />
            </SettingsPopup>
            <SettingsSearchPanel Visible="True" />
            <SettingsText Title="Cardex de usuarios" />
            <Columns>
                <dx:CardViewTextColumn FieldName="nombre_usuario" Caption="Nombre Usuario" VisibleIndex="0">
                </dx:CardViewTextColumn>
                <dx:CardViewTextColumn FieldName="nombrecompleto_usuario" VisibleIndex="1" Caption="Nombre Completo">
                </dx:CardViewTextColumn>
                <dx:CardViewTextColumn FieldName="email_usuario" VisibleIndex="2" Caption="Email">
                </dx:CardViewTextColumn>
                <dx:CardViewTextColumn FieldName="password_usuario" VisibleIndex="5" Caption="Contraseña">
                    <PropertiesTextEdit Password="True">
                    </PropertiesTextEdit>
                </dx:CardViewTextColumn>
                <dx:CardViewSpinEditColumn Caption="Nivel de usuario" FieldName="nivel_usuario" VisibleIndex="3">
                    <PropertiesSpinEdit DisplayFormatString="g" MaxValue="5">
                    </PropertiesSpinEdit>
                </dx:CardViewSpinEditColumn>
                <dx:CardViewTextColumn Caption="Id" FieldName="id_usuario" ReadOnly="True" Visible="False" VisibleIndex="4">
                </dx:CardViewTextColumn>
            </Columns>
            <CardLayoutProperties>
                <Items>
                    <dx:CardViewCommandLayoutItem HorizontalAlign="Right" ShowDeleteButton="True" ShowEditButton="True" ShowNewButton="True">
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
                    <br />

    </div>
</asp:Content>