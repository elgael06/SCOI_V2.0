<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="actividades.aspx.vb" Inherits="seguimiento.actividades" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }
        .auto-style2 {
            width: 224px;
            text-align: right;
        }
        .auto-style4 {
            width: 224px;
            text-align: right;
        }
        .auto-style5 {
            width: 224px;
            height: 36px;
            text-align: right;
        }
        .auto-style6 {
            height: 36px;
        }
        .auto-style7 {
            width: 224px;
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
        .auto-style11 {
            width: 224px;
            text-align: right;
            height: 37px;
        }
        .auto-style12 {
            height: 37px;
        }
        #File1 {
            width: 116px;
        }
        .auto-style13 {
        height: 38px;
        width: 350px;
    }
    .auto-style14 {
        height: 38px;
        width: 467px;
        text-align: right;
    }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Gestión de Tareas (Planeación Semanal)</h2>
    <div>

        <table class="auto-style1">
            <tr>
                <td class="auto-style4">Seleccione el Proceso&nbsp; </td>
                <td>
                    <ajaxToolkit:ComboBox ID="ComboBox1" runat="server" Height="24px" Width="552px" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="True">
                    </ajaxToolkit:ComboBox>
                </td>
                <td>
                    <asp:TextBox runat="server" Height="24px" Width="22px" ID="TextBox2" Visible="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style4">Seleccione el detalle del Proceso&nbsp; </td>
                <td>
                    <ajaxToolkit:ComboBox ID="ComboBox2" runat="server" Height="24px" Width="552px" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="True">
                    </ajaxToolkit:ComboBox>
&nbsp;&nbsp;
                    </td>
                <td>
                    <asp:TextBox runat="server" Height="24px" Width="22px" ID="TextBox3" Visible="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style4">&nbsp;</td>
                <td>
                    <asp:Label ID="Label12" runat="server" Font-Bold="True" ForeColor="Red"></asp:Label>
                </td>
                <td>
                    &nbsp;</td>
            </tr>
            </table>
    </div>
    <div>

        <table class="auto-style1">
            <tr>
                <td class="auto-style5">
                    <asp:Label ID="Label2" runat="server" Text="Proceso"></asp:Label>
&nbsp;</td>
                <td class="auto-style6" colspan="3">
                                <asp:TextBox runat="server" Height="24px" Width="729px" ID="TextBox4"></asp:TextBox>

                            </td>
                <td class="auto-style6">
                    <asp:TextBox runat="server" Height="24px" Width="22px" ID="TextBox11" Visible="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style5">
                    <asp:Label ID="Label14" runat="server" Text="Dueño del Proceso"></asp:Label>
&nbsp; </td>
                <td class="auto-style6" colspan="3">
                                <asp:TextBox runat="server" Height="24px" Width="729px" ID="TextBox12"></asp:TextBox>

                            </td>
                <td class="auto-style6">&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style4">
                    <asp:Label ID="Label3" runat="server" Text="Detalle"></asp:Label>
&nbsp;</td>
                <td colspan="3" rowspan="4">
                                <asp:TextBox runat="server" TextMode="MultiLine" Height="120px" Width="729px" ID="TextBox5"></asp:TextBox>

                            </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style7"></td>
                <td class="auto-style8"></td>
            </tr>
            <tr>
                <td class="auto-style9">
                    <asp:Label ID="Label7" runat="server" Text="Ingresar Actividad"></asp:Label>
&nbsp;</td>
                <td class="auto-style10">
                                <asp:TextBox runat="server" Height="24px" Width="607px" ID="TextBox7"></asp:TextBox>

                                <ajaxToolkit:TextBoxWatermarkExtender runat="server" WatermarkText="Escriba aqui la actividad a realizar" BehaviorID="TextBox7_TextBoxWatermarkExtender" TargetControlID="TextBox7" ID="TextBox7_TextBoxWatermarkExtender"></ajaxToolkit:TextBoxWatermarkExtender>

                &nbsp;&nbsp;&nbsp;
                    <asp:Button runat="server" Text="Nuevo" Height="32px" Width="102px" ID="Button2"></asp:Button>

                </td>
                <td class="auto-style10"></td>
                <td class="auto-style10"></td>
                <td class="auto-style10">
                    <asp:TextBox runat="server" Height="24px" Width="22px" ID="TextBox8" Visible="False"></asp:TextBox>
                    </td>
            </tr>
            <tr>
                <td class="auto-style9">
                    <asp:Label ID="Label15" runat="server" Text="Asignar actividad a"></asp:Label>
&nbsp;</td>
                <td class="auto-style10">
                    <ajaxToolkit:ComboBox ID="ComboBox3" runat="server" Height="24px" Width="552px" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="True">
                    </ajaxToolkit:ComboBox>

                </td>
                <td class="auto-style10">&nbsp;</td>
                <td class="auto-style10">&nbsp;</td>
                <td class="auto-style10">
                    <asp:TextBox runat="server" Height="24px" Width="22px" ID="TextBox13" Visible="False"></asp:TextBox>
                    </td>
            </tr>
            <tr>
                <td class="auto-style11">
                    <asp:Label ID="Label8" runat="server" Text="Peridiocidad"></asp:Label>
&nbsp;</td>
                <td class="auto-style12">
                    <asp:DropDownList ID="DropDownList1" runat="server" Height="24px" Width="182px" AutoPostBack="True">
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
                <td class="auto-style12">&nbsp;</td>
                <td class="auto-style12"></td>
                <td class="auto-style12"></td>
            </tr>
            <tr>
                <td class="auto-style11">
                    <asp:Label ID="Label9" runat="server" Text="Cada dia"></asp:Label>
&nbsp; </td>
                <td class="auto-style12">
                    <asp:TextBox runat="server" Height="24px" Width="182px" ID="TextBox9"></asp:TextBox>
                    <asp:DropDownList ID="DropDownList3" runat="server" Height="24px" Width="182px" AutoPostBack="True" Visible="False">
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
                <td class="auto-style12">&nbsp;</td>
                <td class="auto-style12">&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style9">
                    <asp:Label ID="Label4" runat="server" Text="Tipo de Evidencia"></asp:Label>
&nbsp;</td>
                <td class="auto-style10">
                    <ajaxToolkit:ComboBox ID="ComboBox4" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="True" Height="24px" Width="352px">
                    </ajaxToolkit:ComboBox>
                </td>
                <td class="auto-style10"></td>
                <td class="auto-style10"></td>
                <td class="auto-style10"></td>
            </tr>
            <tr>
                <td class="auto-style9">
                    <asp:Label ID="Label16" runat="server" Text="Seleccione Query"></asp:Label>
&nbsp;</td>
                <td class="auto-style10">
                    <ajaxToolkit:ComboBox ID="ComboBox5" runat="server" AppendDataBoundItems="True" AutoCompleteMode="SuggestAppend" AutoPostBack="True" Height="24px" Width="729px">
                    </ajaxToolkit:ComboBox>
                </td>
                <td class="auto-style10">&nbsp;</td>
                <td class="auto-style10">&nbsp;</td>
                <td class="auto-style10">
                    <asp:TextBox runat="server" Height="24px" Width="22px" ID="TextBox14"></asp:TextBox>
                    </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="Label5" runat="server" Text="Detalle Evidencia"></asp:Label>
                &nbsp;</td>
                <td colspan="3" rowspan="2">
                                <asp:TextBox runat="server" TextMode="MultiLine" Height="55px" Width="729px" ID="TextBox6"></asp:TextBox>

                                <ajaxToolkit:TextBoxWatermarkExtender runat="server" WatermarkText="Ingrese aqui la consulta SQL o bien el detalle de la evidencia" BehaviorID="TextBox7_TextBoxWatermarkExtender" TargetControlID="TextBox6" ID="TextBox6_TextBoxWatermarkExtender"></ajaxToolkit:TextBoxWatermarkExtender>

                            </td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
        <div>

        <table class="auto-style1">
            <tr>
                <td class="auto-style9">
                    &nbsp;</td>
                <td class="auto-style13">
                    &nbsp;</td>
                <td class="auto-style14">
                    El archivo a adjuntar no debe pesar mas de 4MB y no debe contener espacios.</td>
                <td class="auto-style10">&nbsp;</td>
                <td class="auto-style10">&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style9">
                    <asp:Label ID="Label10" runat="server" Text="Adjuntar Formato Entrega"></asp:Label>
                &nbsp;</td>
                <td class="auto-style13">
                    <input type="file" id="File1" name="File1" runat="server" />  <input type="submit" id="Submit1" value="Cargar" runat="server" /><asp:HyperLink ID="HyperLink1" runat="server">HyperLink</asp:HyperLink>
                </td>
                <td class="auto-style14">
                    &nbsp;<asp:Label ID="Label11" runat="server"></asp:Label>
&nbsp;<asp:TextBox runat="server" Height="24px" Width="264px" ID="TextBox10" style="margin-bottom: 0px"></asp:TextBox>
                    <ajaxToolkit:TextBoxWatermarkExtender ID="TextBox10_TextBoxWatermarkExtender" runat="server" BehaviorID="TextBox10_TextBoxWatermarkExtender" TargetControlID="TextBox10" WatermarkText="Nombre de archivo sin espacios" />
&nbsp;
                    <asp:LinkButton ID="LinkButton2" runat="server">Ver Adjunto</asp:LinkButton>
                </td>
                <td class="auto-style10">&nbsp;</td>
                <td class="auto-style10">&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style9" colspan="2">
                    <asp:Label ID="Label13" runat="server" Font-Bold="True" ForeColor="#33CC33"></asp:Label>
                </td>
                <td class="auto-style14">
                    <asp:Button runat="server" Text="Eliminar Actividad" Height="32px" Width="120px" ID="Button5"></asp:Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Button runat="server" Text="Aplicar Cambios" Height="32px" Width="120px" ID="Button4"></asp:Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Button runat="server" Text="Agregar actividad" Height="32px" Width="120px" ID="Button3"></asp:Button>
                </td>
                <td class="auto-style10">&nbsp;</td>
                <td class="auto-style10">&nbsp;</td>
            </tr>
        </table>

        </div>
    </div>
    <div style="text-align: center">

    <div style="text-align: center">

        <asp:GridView ID="GridView1" runat="server" AutoGenerateSelectButton="True" BackColor="White" BorderColor="#999999" BorderStyle="Solid" BorderWidth="1px" CellPadding="3" ForeColor="Black" GridLines="Vertical" style="text-align: left" Width="1065px">
            <AlternatingRowStyle BackColor="#CCCCCC" />
            <FooterStyle BackColor="#CCCCCC" />
            <HeaderStyle BackColor="#FF3300" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="#999999" ForeColor="Black" HorizontalAlign="Center" />
            <SelectedRowStyle BackColor="#000099" Font-Bold="True" ForeColor="White" />
            <SortedAscendingCellStyle BackColor="#F1F1F1" />
            <SortedAscendingHeaderStyle BackColor="#808080" />
            <SortedDescendingCellStyle BackColor="#CAC9C9" />
            <SortedDescendingHeaderStyle BackColor="#383838" />
        </asp:GridView>

    </div>

    </div>
</asp:Content>
