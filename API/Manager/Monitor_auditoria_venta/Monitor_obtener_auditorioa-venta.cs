using api_seguimiento.Models.Monitor_auditoria_venta;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager
{
    public class Monitor_obtener_auditorioa_venta
    {
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        //Metodos Publicos
        public List<Monitor_clasificador_venta> Clasificadores(string fecha)
        {
            List<Monitor_clasificador_venta> lista = new List<Monitor_clasificador_venta>();
            List<MonitorVenta> datos = ObtenerSQL(fecha);

            foreach (MonitorVenta dato in datos)
            {
                int index = lista.FindIndex(clasificador_ => clasificador_.Nombre == dato.Clasificador);
                if (index == -1)
                {
                    var filtro = datos.Where(clasificador_ => clasificador_.Clasificador == dato.Clasificador).ToList();

                    lista.Add(new Monitor_clasificador_venta(filtro) {
                        Nombre = dato.Clasificador
                    });
                }
            }

            return lista;
        }

        //Metodos Privados
        private List<MonitorVenta> ObtenerSQL(string fecha)
        {
            List<MonitorVenta> lista = new List<MonitorVenta>();

            string query = string.Format("exec monitor_auditoria_ventas '{0}';",fecha);

            SqlCommand comando = new SqlCommand(query,conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista.Add(new MonitorVenta() {
                        Clasificador            = (string)lector["clasificacion"],
                        Cod_Establecimiento     = (int)lector["cod_estab"],
                        Nom_establecimiento     = (string)lector["establecimiento"],
                        Total                   = (double)lector["total"],
                        Asignacion              = (string)lector["asignacion"],
                        Fecha_venta             = (string)lector["fecha_venta"],
                        Fecha_Inicial           = (string)lector["fecha_inicial"],
                        Fecha_Liquidacion       = (string)lector["fecha_liquidacion"],
                        Corte                   = (string)lector["corte"],
                        Folio_trabajo_de_Corte  = (string)lector["folio_trabajo_de_Cortes"],
                        Folio_Banco_Interno     = (string)lector["folio_banco_interno"]
                    });
                }
            }

            conexion_scoi.Close();

            return lista;
        }
    }
}