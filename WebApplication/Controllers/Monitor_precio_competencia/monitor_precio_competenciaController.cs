﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Manager.Monitor_precio_competencia;

namespace WebApplication.Controllers.Monitor_precio_competencia
{
    public class monitor_precio_competenciaController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public Obtener_Monitor_precio_competencia Post(string mes,string filtro,string anio) => new Obtener_Monitor_precio_competencia(mes, filtro, anio);

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