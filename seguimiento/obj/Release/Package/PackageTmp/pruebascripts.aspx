<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="pruebascripts.aspx.vb" Inherits="seguimiento.pruebascripts" %>

<%@ Register assembly="DevExpress.Web.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Linear" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Circular" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.State" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Digital" tagprefix="dx" %>

<%@ Register assembly="DevExpress.Dashboard.v17.2.Web, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.DashboardWeb.Designer" tagprefix="dx" %>
<%@ Register assembly="DevExpress.XtraReports.v17.2.Web, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraReports.Web" tagprefix="dx" %>
<%@ Register assembly="DevExpress.XtraReports.v17.2.Web, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraReports.Web.ClientControls" tagprefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style type="text/css">
        #Text1 {
            width: 192px;
            height: 24px;
        }
        .parsley-error {
            width: 450px;
        }
        #inputSuccess3 {
            width: 247px;
            height: 29px;
        }
        #inputSuccess4 {
            width: 380px;
        }
        .auto-style1 {
            width: 100%;
        }
        .auto-style2 {
            width: 153px;
        }
        .auto-style3 {
            width: 542px;
        }
        #Text2 {
            width: 247px;
            height: 25px;
        }
    </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%-- method = "post" enctype="multipart/form-data"--%>
        <div>
        <asp:Button ID="Button1" runat="server" Text="Button" />
    &nbsp;
        <asp:Button ID="Button2" runat="server" Text="Button" />
    </div>
    <div>
        <input type="file" id="File1" name="File1" runat="server" />  <input type="submit" id="Submit1" value="Upload" runat="server" />
    </div>
                         <div>
                             <asp:TextBox ID="TextBox1" runat="server" Height="24px" Width="252px"></asp:TextBox>
                             <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="Se requiere este dato" ForeColor ="Red" ControlToValidate="TextBox1"></asp:RequiredFieldValidator>
                      </div>
    <div>

        <asp:Button ID="Button3" runat="server" Text="Grabar" />

        <br />
        <asp:Label ID="Label2" runat="server"></asp:Label>

        <br />
        <br />
                             <asp:TextBox ID="TextBox2" runat="server" Height="24px" Width="252px" TextMode="Password"></asp:TextBox>
                             <br />
                             <asp:TextBox ID="TextBox3" runat="server" Height="24px" Width="252px" TextMode="Password"></asp:TextBox>
                             <asp:CompareValidator ID="CompareValidator1" runat="server" 
                                 ErrorMessage= "Las contraseñas no coinciden, Verifique!"
                                 ControlToValidate= "TextBox3" ControlToCompare= "TextBox2"
                                 Operator= "Equal" Type ="String" ForeColor ="Red"
                                 ></asp:CompareValidator>
                             <br />

        <asp:Button ID="Button4" runat="server" Text="Grabar" />

        <br />
        <asp:Label ID="Label3" runat="server"></asp:Label>
    </div>
    <div>

        <asp:TextBox ID="TextBox4" runat="server" Height="24px" Width="252px"></asp:TextBox>
        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="Formato de Email Invalido!"
         ControlToValidate="TextBox4"
         ForeColor ="Red" 
         ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
        <br />
        <asp:Button ID="Button5" runat="server" Text="Button" />

    </div>
    <div>

        <table class="auto-style1">
            <tr>
                <td class="auto-style2">Valor porcentaje %</td>
                <td class="auto-style3">
                    <input id="Text1" type="text" /></td>
                <td class= "sidebar-widget">
                        <h4>Profile Completion</h4>
                        <canvas width="150" height="80" id="foo" class="" style="width: 160px; height: 100px;"></canvas>
                        <div class="goal-wrapper">
                          <span id="gauge-text" class="gauge-value pull-left">0</span>
                          <span class="gauge-value pull-left">%</span>
                          <span id="goal-text" class="goal-value pull-right">100%</span>
                        </div>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">&nbsp;</td>
                <td class="auto-style3">&nbsp;</td>
                <td>

                </td>
            </tr>
            <tr>
                <td class="auto-style2">Input Text</td>
                <td class="auto-style3">
                    <input id="Text2" type="text" runat ="server"/>&nbsp;
                    <asp:Button ID="Button6" runat="server" Height="32px" Text="Asignar Valor" Width="100px" />
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>

    </div>
<div>

    <dx:ASPxButton ID="ASPxButton1" runat="server" Text="ASPxButton">
        <Image Url="~/production/images/paypal.png">
        </Image>
    </dx:ASPxButton>

    <asp:Label ID="Label4" runat="server"></asp:Label>
    <br />
    <dx:ASPxCheckBoxList ID="ASPxCheckBoxList1" runat="server" AutoPostBack="True" EnableTheming="True" Theme="Metropolis" ValueType="System.Int32">
        <Items>
            <dx:ListEditItem Text="Opcion 1" Value="1" />
            <dx:ListEditItem Text="Opcion 2" Value="2" />
            <dx:ListEditItem Text="Opcion 3" Value="3" />
        </Items>
    </dx:ASPxCheckBoxList>
    <br />
    <dx:ASPxGaugeControl ID="ASPxGaugeControl1" runat="server" BackColor="Transparent" Height="127px" Value="30" Width="187px">
        <Gauges>
            <dx:CircularGauge Bounds="0, 0, 187, 127" Name="cGauge1">
                <scales>
                    <dx:ArcScaleComponent AcceptOrder="0" AppearanceMajorTickmark-BorderBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMajorTickmark-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMinorTickmark-BorderBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMinorTickmark-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceTickmarkText-Font="Tahoma, 14pt, style=Bold" AppearanceTickmarkText-TextBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" Center="215, 215" EndAngle="-90" MajorTickCount="4" MajorTickmark-FormatString="{0:F0}" MajorTickmark-ShapeScale="1.6, 1.6" MajorTickmark-ShapeType="Circular_Style13_5" MajorTickmark-TextOffset="25" MajorTickmark-TextOrientation="LeftToRight" MaxValue="100" MinorTickCount="4" MinorTickmark-ShapeOffset="20" MinorTickmark-ShapeScale="1.6, 1.6" MinorTickmark-ShapeType="Circular_Style13_4" MinValue="1" Name="scale1" RadiusX="170" RadiusY="170" StartAngle="-180" Value="30">
                    </dx:ArcScaleComponent>
                    <dx:ArcScaleComponent AcceptOrder="1" AppearanceMajorTickmark-BorderBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMajorTickmark-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMinorTickmark-BorderBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceMinorTickmark-ContentBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:White&quot;/&gt;" AppearanceTickmarkText-Font="Tahoma, 12pt" AppearanceTickmarkText-TextBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:Gainsboro&quot;/&gt;" Center="215, 215" EndAngle="-90" MajorTickCount="4" MajorTickmark-FormatString="{0:F0}" MajorTickmark-ShapeScale="1.8, 1.8" MajorTickmark-ShapeType="Circular_Style13_2" MajorTickmark-TextOffset="-20" MajorTickmark-TextOrientation="LeftToRight" MaxValue="1000" MinorTickCount="4" MinorTickmark-ShapeScale="1.8, 1.8" MinorTickmark-ShapeType="Circular_Style13_1" MinValue="1" Name="scale2" RadiusX="115" RadiusY="115" StartAngle="-180" Value="300" ZOrder="-1">
                    </dx:ArcScaleComponent>
                </scales>
                <backgroundlayers>
                    <dx:ArcScaleBackgroundLayerComponent AcceptOrder="-1000" ArcScale="" Name="bg" ScaleCenterPos="0.868, 0.868" ScaleID="scale1" ShapeType="CircularQuarter_Style13Left" ZOrder="1000" />
                </backgroundlayers>
                <needles>
                    <dx:ArcScaleNeedleComponent AcceptOrder="50" ArcScale="" EndOffset="-8" Name="needle" ScaleID="scale1" ShapeType="CircularFull_Style13" StartOffset="-7.5" ZOrder="-50" />
                </needles>
            </dx:CircularGauge>
        </Gauges>
<LayoutPadding All="0" Left="0" Top="0" Right="0" Bottom="0"></LayoutPadding>
    </dx:ASPxGaugeControl>
    <asp:TextBox ID="TextBox5" runat="server" Height="24px" Width="50px"></asp:TextBox>
    <dx:ASPxButton ID="ASPxButton2" runat="server" EnableTheming="True" Text="Nivel" Theme="Metropolis">
    </dx:ASPxButton>
</div>
    <div>

        <dx:ASPxButton ID="ASPxButton3" runat="server" Text="Mostrar Gridview" Theme="Office2010Black">
        </dx:ASPxButton>
        <br />
        <dx:ASPxGridView ID="ASPxGridView1" runat="server" AutoGenerateColumns="False" EnableTheming="True" Theme="Aqua" Width="1061px">
            <SettingsCommandButton>
                <DeleteButton ButtonType="Button" Text="Eliminar">
                </DeleteButton>
                <SelectButton ButtonType="Button" Text="Seleccionar">
                </SelectButton>
            </SettingsCommandButton>
            <Columns>
                <dx:GridViewCommandColumn SelectAllCheckboxMode="Page" ShowDeleteButton="True" ShowSelectCheckbox="True" VisibleIndex="0">
                </dx:GridViewCommandColumn>
                <dx:GridViewDataTextColumn FieldName="ID" VisibleIndex="1">
                </dx:GridViewDataTextColumn>
                <dx:GridViewDataTextColumn FieldName="Nombre Usuario" VisibleIndex="2">
                </dx:GridViewDataTextColumn>
                <dx:GridViewDataTextColumn FieldName="Email" VisibleIndex="4">
                </dx:GridViewDataTextColumn>
                <dx:GridViewDataTextColumn FieldName="Nivel Usuario" VisibleIndex="3">
                </dx:GridViewDataTextColumn>
            </Columns>
        </dx:ASPxGridView>

        <br />
        <dx:ASPxTextBox ID="ASPxTextBox1" runat="server" Theme="BlackGlass" Width="170px">
        </dx:ASPxTextBox>
        <dx:ASPxComboBox ID="ASPxComboBox1" runat="server" EnableTheming="True" Theme="BlackGlass">
            <Items>
                <dx:ListEditItem Text="Opcion 1" Value="1" />
                <dx:ListEditItem Text="Opcion 2" Value="2" />
                <dx:ListEditItem Text="Opcion 3" Value="3" />
            </Items>
        </dx:ASPxComboBox>
        <br />

    </div>
        <!-- gauge.js -->
    <script>
      var opts = {
        lines: 12,
        angle: 0,
        lineWidth: 0.4,
        pointer: {
          length: 0.75,
          strokeWidth: 0.042,
          color: '#1D212A'
        },
        limitMax: 'false',
        colorStart: '#1ABC9C',
        colorStop: '#1ABC9C',
        strokeColor: '#F0F3F3',
        generateGradient: true
      };
      var target = document.getElementById('foo2'),
          gauge = new Gauge(target).setOptions(opts);

      gauge.maxValue = 100;
      gauge.animationSpeed = 32;
      gauge.set(20);
      gauge.setTextField(document.getElementById("gauge-text2"));

      var target = document.getElementById('foo'),
          gauge = new Gauge(target).setOptions(opts);

      gauge.maxValue = 5000;
      gauge.animationSpeed = 32;
      gauge.set(1200);
      gauge.setTextField(document.getElementById("gauge-text"));
    </script>
    <!-- /gauge.js -->

</asp:Content>
