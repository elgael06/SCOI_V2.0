<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="bitacoras.aspx.vb" Inherits="seguimiento.bitacoras" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
                
.ajax__combobox_inputcontainer {
    border-spacing: 0;
}

        .auto-style1 {
            width: 100%;
        }
        .auto-style6 {
            height: 36px;
        }
        .auto-style7 {
            width: 178px;
            height: 42px;
            text-align: right;
        }
        .auto-style8 {
            height: 42px;
        }
        .auto-style9 {
            text-align: right;
            height: 38px;
        }
        .auto-style10 {
            height: 38px;
        }
        .auto-style12 {
            height: 37px;
        }
        .auto-style13 {
        height: 38px;
        width: 350px;
    }
    .auto-style14 {
        height: 38px;
        width: 467px;
        text-align: center;
    }
        .auto-style17 {
            width: 596px;
        }
        .auto-style18 {
            height: 38px;
            width: 467px;
            text-align: left;
        }
        .auto-style20 {
            width: 173px;
            text-align: right;
        }

        .auto-style21 {
            width: 178px;
            height: 36px;
            text-align: right;
        }
        .auto-style22 {
            text-align: right;
            height: 38px;
            width: 178px;
        }
        .auto-style23 {
            width: 178px;
            text-align: right;
            height: 37px;
        }
        .auto-style24 {
            width: 178px;
            text-align: right;
        }

        </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Gestión de Bitacora de Actividades</h2>
    <div>

        <ajaxToolkit:TabContainer ID="TabContainer1" runat="server" ActiveTabIndex="1" Height="695px" ScrollBars="Auto" Width="1070px" style="display:block; visibility:visible">
            <ajaxToolkit:TabPanel runat="server" HeaderText="TabPanel1" ID="TabPanel1">
                <HeaderTemplate>
                    Despliegue de actividades
                </HeaderTemplate>
                <ContentTemplate>
                    <table class="auto-style1">
                        <tr>
                            <td class="auto-style20">
                                <asp:Label ID="Label16" runat="server" Text="Seleccione el usuario"></asp:Label>
                            </td>
                            <td class="auto-style17">
                                <ajaxToolkit:ComboBox ID="ComboBox1" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="True" Height="24px" MaxLength="0" Width="552px">
                                </ajaxToolkit:ComboBox>
                            </td>
                            <td>
                                <asp:TextBox ID="TextBox1" runat="server" Height="24px" Width="22px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style20">&nbsp;</td>
                            <td class="auto-style17">&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                    <asp:GridView ID="GridView1" runat="server" BackColor="White" BorderColor="#999999" BorderStyle="Solid" BorderWidth="1px" CellPadding="3" ForeColor="Black" GridLines="Vertical" Width="1049px" AutoGenerateSelectButton="True">
                        <AlternatingRowStyle BackColor="#CCCCCC" />
                        <FooterStyle BackColor="#CCCCCC" />
                        <HeaderStyle BackColor="#FF6600" Font-Bold="True" ForeColor="White" />
                        <PagerStyle BackColor="#999999" ForeColor="Black" HorizontalAlign="Center" />
                        <SelectedRowStyle BackColor="#000099" Font-Bold="True" ForeColor="White" />
                        <SortedAscendingCellStyle BackColor="#F1F1F1" />
                        <SortedAscendingHeaderStyle BackColor="Gray" />
                        <SortedDescendingCellStyle BackColor="#CAC9C9" />
                        <SortedDescendingHeaderStyle BackColor="#383838" />
                    </asp:GridView>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel runat="server" HeaderText="TabPanel2" ID="TabPanel2">
                <HeaderTemplate>
                    Documentar actividad
                </HeaderTemplate>
                <ContentTemplate>
                    <table class="auto-style1">
                        <tr>
                            <td class="auto-style21">
                                <asp:Label ID="Label2" runat="server" Text="Proceso"></asp:Label>
                                &nbsp;</td>
                            <td class="auto-style6" colspan="3">
                                <asp:TextBox ID="TextBox4" runat="server" Height="24px" Width="729px"></asp:TextBox>
                            </td>
                            <td class="auto-style6">
                                <asp:TextBox ID="TextBox2" runat="server" Height="24px" Width="22px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style24">
                                <asp:Label ID="Label3" runat="server" Text="Detalle"></asp:Label>
                                &nbsp;</td>
                            <td colspan="3" rowspan="4">
                                <asp:TextBox ID="TextBox5" runat="server" Height="120px" TextMode="MultiLine" Width="729px"></asp:TextBox>
                            </td>
                            <td>
                                <asp:TextBox ID="TextBox3" runat="server" Height="24px" Width="22px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style24">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style7"></td>
                            <td class="auto-style8"></td>
                        </tr>
                        <tr>
                            <td class="auto-style22">
                                <asp:Label ID="Label7" runat="server" Text="Actividad"></asp:Label>
                                &nbsp;</td>
                            <td class="auto-style10">
                                <asp:TextBox ID="TextBox7" runat="server" Height="24px" Width="607px"></asp:TextBox>
                                &nbsp;&nbsp;&nbsp; </td>
                            <td class="auto-style10"></td>
                            <td class="auto-style10"></td>
                            <td class="auto-style10">
                                <asp:TextBox ID="TextBox8" runat="server" Height="24px" Width="22px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style22">
                                <asp:Label ID="Label8" runat="server" Text="Peridiocidad"></asp:Label>
                            </td>
                            <td class="auto-style10">
                                <asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True" Height="24px" Width="182px">
                                    <asp:ListItem>DIARIO</asp:ListItem>
                                    <asp:ListItem>SEMANAL</asp:ListItem>
                                    <asp:ListItem>QUINCENAL</asp:ListItem>
                                    <asp:ListItem>MENSUAL</asp:ListItem>
                                    <asp:ListItem>BIMESTRAL</asp:ListItem>
                                    <asp:ListItem>TRIMESTRAL</asp:ListItem>
                                    <asp:ListItem>SEMESTRAL</asp:ListItem>
                                    <asp:ListItem>ANUAL</asp:ListItem>
                                    <asp:ListItem>FECHA ESPECIFICA</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td class="auto-style10">&nbsp;</td>
                            <td class="auto-style10">&nbsp;</td>
                            <td class="auto-style10">
                                <asp:TextBox ID="TextBox13" runat="server" Height="24px" Width="22px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style23">
                                <asp:Label ID="Label9" runat="server" Text="Cada dia"></asp:Label>
                            </td>
                            <td class="auto-style12">
                                <asp:TextBox ID="TextBox9" runat="server" Height="24px" Width="182px"></asp:TextBox>
                                <asp:DropDownList ID="DropDownList3" runat="server" AutoPostBack="True" Height="24px" Width="182px">
                                    <asp:ListItem>LUNES</asp:ListItem>
                                    <asp:ListItem>MARTES</asp:ListItem>
                                    <asp:ListItem>MIERCOLES</asp:ListItem>
                                    <asp:ListItem>JUEVES</asp:ListItem>
                                    <asp:ListItem>VIERNES</asp:ListItem>
                                    <asp:ListItem>SABADO</asp:ListItem>
                                    <asp:ListItem>DOMINGO</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td class="auto-style12">&nbsp;</td>
                            <td class="auto-style12"></td>
                            <td class="auto-style12"></td>
                        </tr>
                        <tr>
                            <td class="auto-style23">&nbsp;
                                <asp:Label ID="Label17" runat="server" Text="Formato Sugerido"></asp:Label>
                            </td>
                            <td class="auto-style12">
                                <asp:TextBox ID="TextBox14" runat="server" Height="24px" Width="607px"></asp:TextBox>
                                &nbsp;&nbsp;
                                <asp:Button ID="Button2" runat="server" Height="32px" Text="Abrir Formato" Width="130px" />
                            </td>
                            <td class="auto-style12">&nbsp;</td>
                            <td class="auto-style12">&nbsp;</td>
                            <td class="auto-style12">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style22">
                                <asp:Label ID="Label4" runat="server" Text="Tipo de Evidencia"></asp:Label>
                                &nbsp;</td>
                            <td class="auto-style10">
                                <asp:DropDownList ID="DropDownList2" runat="server" Height="24px" Width="352px">
                                </asp:DropDownList>
                            </td>
                            <td class="auto-style10"></td>
                            <td class="auto-style10"></td>
                            <td class="auto-style10"></td>
                        </tr>
                        <tr>
                            <td class="auto-style24">
                                <asp:Label ID="Label5" runat="server" Text="Observaciones actividad"></asp:Label>
                                &nbsp;</td>
                            <td colspan="3" rowspan="2">
                                <asp:TextBox ID="TextBox6" runat="server" Height="55px" TextMode="MultiLine" Width="729px"></asp:TextBox>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style24">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                    <table class="auto-style1">
                        <tr>
                            <td class="auto-style22"></td>
                            <td class="auto-style13"></td>
                            <td class="auto-style14">El archivo a adjuntar no debe pesar mas de 4MB.</td>
                            <td class="auto-style10"></td>
                            <td class="auto-style10"></td>
                        </tr>
                        <tr>
                            <td class="auto-style22">
                                <asp:Label ID="Label10" runat="server" Text="Adjuntar Entregable"></asp:Label>
                                &nbsp;</td>
                            <td class="auto-style13">
                                <input type="file" id="File1" runat="server" />  &nbsp; </input><input type="submit" id="Submit1" value="Cargar" runat="server" />
                            &nbsp;</input></td>
                            <td class="auto-style18">&nbsp;<asp:Label ID="Label11" runat="server"></asp:Label>
                                &nbsp;<asp:TextBox ID="TextBox10" runat="server" Height="24px" style="margin-bottom: 0px" Width="264px"></asp:TextBox>
                                <ajaxToolkit:TextBoxWatermarkExtender ID="TextBox10_TextBoxWatermarkExtender" runat="server" BehaviorID="TextBox10_TextBoxWatermarkExtender" TargetControlID="TextBox10" WatermarkText="Nombre de archivo sin espacios" />
                                &nbsp; </td>
                            <td class="auto-style10">&nbsp;</td>
                            <td class="auto-style10">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="auto-style22">
                                <asp:Label ID="Label18" runat="server" Text="Registrar avance"></asp:Label>
                            </td>
                            <td class="auto-style13">
                                <ajaxToolkit:ComboBox ID="ComboBox2" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="True" Height="24px" MaxLength="0" Width="252px">
                                    <asp:ListItem>NO CUMPLO</asp:ListItem>
                                    <asp:ListItem>REGISTRAR AVANCE</asp:ListItem>
                                    <asp:ListItem>ACTIVIDAD TERMINADA</asp:ListItem>
                                </ajaxToolkit:ComboBox>
                            </td>
                            <td class="auto-style14">
                                <asp:Button ID="Button3" runat="server" Height="32px" Text="Registrar actividad" Width="144px" style="text-align: center" />
                            </td>
                            <td class="auto-style10">&nbsp;</td>
                            <td class="auto-style10">
                                <asp:TextBox ID="TextBox15" runat="server" Height="24px" Width="22px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="auto-style9" colspan="2">
                                <asp:Label ID="Label13" runat="server" Font-Bold="True" ForeColor="#33CC33"></asp:Label>
                            </td>
                            <td class="auto-style14">&nbsp;</td>
                            <td class="auto-style10">&nbsp;</td>
                            <td class="auto-style10">&nbsp;</td>
                        </tr>
                    </table>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
        </ajaxToolkit:TabContainer>

    </div>
    </asp:Content>
