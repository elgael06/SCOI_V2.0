using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Manager.Sesion;
using WebApplication.Models.Manejador_usuarios;

namespace WebApplication.Controllers.Accesos
{
    public class Usuarios_webController : ApiController
    {
        // GET api/<controller>
        public List<Manejador_usuarios> Get() => new usuarios_acceso().Obtener_usuarios();

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public bool Post([FromBody]Manejador_usuarios Usuario) => new usuarios_acceso().ActualizarUsuario_web(Usuario);

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