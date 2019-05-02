using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_cuadrantes;

namespace WebApplication.Manager.Monitor_cuadrantes
{
    public class Obtener_monitor_cuadrantes
    {
        private SqlConnection CONEXION_SCOI = new ConexionesSQL().Scoi();
        private SqlDataReader LECTOR;
        public List<Modelo_monitor_cuadrantes> cuadrantes = new List<Modelo_monitor_cuadrantes>();
        public string query { get; set; }
        public List<string> errores = new List<string>();
        public Obtener_monitor_cuadrantes(string fi, string ff, string establecimiento) {
            Consultar_cuadrantes_sql(fi,ff,establecimiento);
        }
        public Obtener_monitor_cuadrantes(string fi, string ff, string establecimiento, int folio_empleado)
        {

        }
        private void Consultar_cuadrantes_sql(string fi, string ff, string establecimiento)
        {
           query = string.Format("exec cuadrantes_reporte_para_monitor_general '{0}','{1}','{2}'",
                fi,ff,establecimiento);
            Console.Out.WriteLine("Comando => " ,query);
            SqlCommand comando = new SqlCommand(query,CONEXION_SCOI);

            CONEXION_SCOI.Open();
            try
            {
                LECTOR = comando.ExecuteReader();
                if (LECTOR.HasRows)
                {
                    while (LECTOR.Read())
                    {
                        cuadrantes.Add(Llenar_modelo_monitor_cuadrantes(LECTOR));
                    }
                }
            }
            catch (Exception e)
            {
                errores.Add(e.ToString());

            }
            CONEXION_SCOI.Close();
        }

        private Modelo_monitor_cuadrantes Llenar_modelo_monitor_cuadrantes(SqlDataReader datos)
        {
            return new Modelo_monitor_cuadrantes {
                folio_colaborador       = int.Parse( datos["folio_colaborador"].ToString()),
                folio                   = int.Parse(datos["folio"].ToString()),
                nombre_colaborador      = datos["nombre_colaborador"].ToString(),
                estatus_colaborador     = datos["estatus_colaborador"].ToString(),
                folio_turno             = int.Parse(datos["folio_turno"].ToString()),
                turno                   = datos["turno"].ToString(),
                folio_cuadrante         = int.Parse(datos["folio_cuadrante"].ToString()),
                nombre_cuadrante        = datos["nombre_cuadrante"].ToString(),
                folio_establecimiento   = int.Parse(datos["folio_establecimiento"].ToString()),
                establecimiento         = datos["establecimiento"].ToString(),
                folio_puesto            = int.Parse(datos["folio_puesto"].ToString()),
                puesto                  = datos["puesto"].ToString(),
                folio_puesto_reporta    = int.Parse(datos["folio_puesto_reporta"].ToString()),
                puesto_reporta          = datos["puesto_reporta"].ToString(),
                folio_departamento      = int.Parse(datos["folio_departamento"].ToString()),
                departamento            = datos["departamento"].ToString(),
                folio_actividad         = int.Parse(datos["folio_actividad"].ToString()),
                actividad               = datos["actividad"].ToString(),
                respuesta               = datos["respuesta"].ToString(),
                observacion             = datos["observacion"].ToString(),
                folio_aspecto           = int.Parse(datos["folio_aspecto"].ToString()),
                aspecto                 = datos["aspecto"].ToString(),
                valor_respuesta         = int.Parse(datos["valor_respuesta"].ToString()),
                semana_del_año          = int.Parse(datos["semana_del_año"].ToString()),
                dia_semana              = int.Parse(datos["dia_semana"].ToString()),
                mes                     = datos["mes"].ToString(),
                anio                    = int.Parse(datos["anio"].ToString()),
                fecha                   = datos["fecha"].ToString(),
                folio_usuario_capturo   = int.Parse(datos["folio_usuario_capturo"].ToString()),
                tipo_actividad          = datos["tipo_actividad"].ToString(),
                Tolerancia              = datos["tolerancia"].ToString(),
            };
        }
    }
}