<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/main.Master" CodeBehind="Incidencias_apertura_tienda.aspx.vb" Inherits="seguimiento.Incidencias_apertura_tienda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="src/estylos/Incidencias_apertura_tienda/main.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main id="root" >

    </main>
    <script>

        const ObtenerIncidencias=(Folio,Fecha)=>{
            fetch()
                .then(res => res.json().then(lista => {
                    console.log(lista);
                }))
                .catch(err=>console.log(err));
        }

    </script>
    <script src="res/js/React/Estaticos/efecto_carga.js"></script>
    <script src="src/js/Incidencias_apertura_tienda/Incidencia.js?1.0.0.1"></script>
</asp:Content>
