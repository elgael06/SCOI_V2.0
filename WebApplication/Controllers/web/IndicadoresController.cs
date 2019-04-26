using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication.Manager.Incidencias_personal;
using WebApplication.Manager.MovimientosBancoInterno;
using WebApplication.Manager.Sesion;

namespace WebApplication.Controllers.web
{
    public class IndicadoresController : Controller
    {
         public int usuario = 0;
        // GET: Indicadores
        public ActionResult Index() => Accesos(1);
        public ActionResult EstadosDeResultados() => Accesos(1);
        public ActionResult AuditoriaVenta() => Accesos(1);
        public ActionResult Matrices() => Accesos(1);
        public ActionResult CuestionariosApertura() => Accesos(1);
        public ActionResult CuestionariosServicios() => Accesos(1);
        public ActionResult PreciosCompetencia() => Accesos(1);
        public ActionResult Cuadrantes() => Accesos(1);
        public ActionResult CuadrantesPorEstablecimiento() => Accesos(1);
        public ActionResult OrdenesDePagoEnEfectivo() => Accesos(1);
        public ActionResult MovimientosBancoInterno() => Accesos(1);
        public ActionResult ReporteIncidenciasFecha() => Accesos(1);


        //httpRequest
        public JsonResult concepto_orden_de_pago()=>Json(new Pagos_realizados_en_un_periodo_por_cuenta_consulta().comando_concepto_orden_de_pago_sql("", "", "", ""), JsonRequestBehavior.AllowGet);
        public JsonResult ObtenerReporteIncidenciasFecha(string inicio, string termino) => Json( new Reporte_incidencias_por_fecha().ObtenerReporte(inicio, termino), JsonRequestBehavior.AllowGet);


        private ActionResult Accesos(int ruta) {
            Session["id_usuario"] = Session["id_usuario"] ?? 0;
            usuario = int.Parse(Session["id_usuario"].ToString());

            int acceso = new IncioSesion().AccesoUrl(usuario, ruta);
            if (acceso == 1)
                return View();
            else
                return Redirect("/Home");
        }

        //metodos web
    }
}