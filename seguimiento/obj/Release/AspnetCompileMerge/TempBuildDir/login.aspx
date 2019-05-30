<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="login.aspx.vb" Inherits="seguimiento.login" %>

<%@ Register assembly="DevExpress.Web.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web" tagprefix="dx" %>

<%@ Register assembly="DevExpress.Web.ASPxScheduler.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxScheduler.Controls" tagprefix="dxwschsc" %>

<!DOCTYPE html>
<html lang="es">
  <head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Login SCOI Grupo Izagar</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <!-- Bootstrap -->
    <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- Animate.css -->
    <link href="../vendors/animate.css/animate.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="../build/css/custom.min.css" rel="stylesheet">
    <link href="res/css/login/main.css" rel="stylesheet" />
      <style type="text/css">
          .auto-style1 {
              width: 100%;
          }
          .auto-style2 {
              width: 57px;
          }
          .menu {
            font-size:20px;
            float:right;
            z-index:999;
            margin-top:-20px
          }
          #Button1 {
            font-size:17px
          }
      </style>
  </head>

  <body class="login">

    <div>
      <div class="login_wrapper">        
        <div class="animate form login_form">
          <section class="login_content">
              <i class="btn btn-default menu"
                onclick="mostrar_modal(true)">
                <i class="fa fa-bars"></i>
            </i>
              <form id="form1" runat="server">
              <h1 style="padding:10px">INICIO</h1>
              <div style="text-align: center">
                  <i class="glyphicon glyphicon-user"  style="font-size:18px"></i>
                  <asp:TextBox ID="TextBox1" runat="server" Height="32px" Width="180px" placeholder="USUARIO"></asp:TextBox>
              </div>
              <div style="text-align: center; height: 103px;">
                  <i class="glyphicon glyphicon-lock" style="font-size:18px"></i>
                  <asp:TextBox ID="TextBox2" runat="server" Height="32px" Width="180px"  TextMode="Password" placeholder="CONTRASEÑA"></asp:TextBox>
                      <br />
                      <table class="auto-style1">
                          <tr>
                              <td class="auto-style2">&nbsp;</td>
                              <td>
                                <asp:Button ID="Button1" runat="server" class="btn btn-primary" Text="ENTRAR" Width="178px" />
                              </td>
                              <td>&nbsp;</td>
                          </tr>
                          <tr>
                              <td class="auto-style2">&nbsp;</td>
                              <td>
                                  &nbsp;</td>
                              <td>&nbsp;</td>
                          </tr>
                  </table>
              </div>
                  <div>
                      <div>
                          <p style="text-align: center">
                              <asp:Image ID="Image1" runat="server" ImageUrl="~/production/images/izagar-150.png" Height="92px" Width="92px" />
                          </p>
                          <p style="text-align: center">
                                SCOI WEB ©2017.</p>
                      </div>
                  </div>
              </form>
          </section>
        </div>
          <div class="modal_menu">
              <div class="panel panel-default">
                  <div class="panel-heading">
                      <i class="fa fa-close close" onclick="mostrar_modal(false)"></i>
                      <i class="glyphicon glyphicon-link"> <strong> Accesos</strong></i>
                  </div>
                  <div class="panel-body">
                    <div>
                        <a href="crear_codigo_de_barras.html"><i class="fa fa-barcode"> </i>Crear Etiquetas.</a>
                        <hr />
                        <a href="crear_codigo_de_barras_g.html"><i class="fa fa-barcode"> </i>Crear Etiquetas Grandes.</a>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <script type="text/javascript">
        function mostrar_modal(estado) {
            console.log(estado);
            document.querySelector(".modal_menu").style.display = estado ? "flex" : "none";
        }
    </script>
  </body>
</html>
