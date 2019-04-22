using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication.Manager.Globales;

namespace WebApplication.Controllers.web
{
    public class GlobalesController : Controller
    {
        // GET: Globales
        public string Index()
        {
            return "Datos De Interaccion Globales";
        }
        [HttpPost]
        public JsonResult Combos(string tipo) => Json(new Combos(tipo).Lista_combos);
        [HttpPost]
        public JsonResult Conceptos_de_orden_de_pago() => Json(new conceptos_de_orden_de_pago().Lista_conceptos);
    }
}