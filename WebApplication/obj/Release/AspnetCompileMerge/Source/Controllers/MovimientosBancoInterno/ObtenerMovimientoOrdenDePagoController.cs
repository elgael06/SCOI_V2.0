using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Manager.MovimientosBancoInterno;
using WebApplication.Models.MovimientosBancoInterno;

namespace WebApplication.Manager.MovimientosBancoInterno
{
    public class ObtenerMovimientoOrdenDePagoController : ApiController
    {
        // GET api/<controller>
        public List<Pagos_realizados_en_un_periodo_por_cuenta> Get()=>new Pagos_realizados_en_un_periodo_por_cuenta_consulta().comando_concepto_orden_de_pago_sql("","","","");

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}