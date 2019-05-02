using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.monitor_orden_compra_interna;

namespace WebApplication.Manager.monitor_orden_compra_interna
{
    public class Manager_monitor_orden_compra_interna
    {
        private SqlConnection CONEXION_SCOI = new ConexionesSQL().Scoi();
        private SqlDataReader LECTOR;


        public List<Modelo_monitor_orden_compra_interna> Obtener(string f1,string f2,string tipo_orden,string estatus,string tipo_recibe,int recibe ,int establecimiento, string cod_prod)
        {
            List<Modelo_monitor_orden_compra_interna> lista = new List<Modelo_monitor_orden_compra_interna>();
            string query = string.Format("exec monitor_orden_compra_interna '{0}','{1}','{2}','{3}','{4}',{5},{6},'{7}';",
                f1,f2, tipo_orden, estatus, tipo_recibe,recibe, establecimiento, cod_prod);
            SqlCommand comando = new SqlCommand(query,CONEXION_SCOI);

            CONEXION_SCOI.Open();

            LECTOR = comando.ExecuteReader();
            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    lista.Add(new Modelo_monitor_orden_compra_interna {
                        tipo_orden_compra_interna = LECTOR["tipo_orden_compra_interna"].ToString(),
                        cod_estab = int.Parse( LECTOR["cod_estab"].ToString()),
                        establecimiento_solicito = LECTOR["establecimiento_solicito"].ToString(),
                        folio_scoi_oci = int.Parse(LECTOR["folio_scoi_oci"].ToString()),
                        fecha_ultima_modificacion = LECTOR["fecha_ultima_modificacion"].ToString(),
                        semana_del_año = int.Parse(LECTOR["semana_del_año"].ToString()),
                        mes  = LECTOR["mes"].ToString(),
                        anio = int.Parse(LECTOR["año"].ToString()),
                        estatus = LECTOR["estatus"].ToString(),
                        folio_bms = LECTOR["folio_bms"].ToString(),
                        establecimiento_surte = LECTOR["establecimiento_surte"].ToString(),
                        folio_servicio = int.Parse(LECTOR["folio_servicio"].ToString()),
                        persona_solicito_oci = LECTOR["persona_solicito_oci"].ToString(),
                        tipo_de_solicitante = LECTOR["tipo_de_solicitante"].ToString(),
                        uso_de_mercancia = LECTOR["uso_de_mercancia"].ToString(),
                        cod_prod = LECTOR["cod_prod"].ToString(),
                        descripcion = LECTOR["descripcion"].ToString(),
                        cantidad = double.Parse(LECTOR["cantidad"].ToString()),
                        abreviatura = LECTOR["abreviatura"].ToString(),
                        ultimo_costo = double.Parse(LECTOR["ultimo_costo"].ToString()),
                        costo_promedio = double.Parse(LECTOR["costo_promedio"].ToString()),
                        precio_venta = double.Parse(LECTOR["precio_venta"].ToString()),
                        Total = double.Parse(LECTOR["Total"].ToString()),
                        empleado_elaboro_oci = LECTOR["empleado_elaboro_oci"].ToString(),
                        empleado_autorizo_oci = LECTOR["empleado_autorizo_oci"].ToString(),
                        usuario_recoge = LECTOR["usuario_recoge"].ToString(),
                        empleado_surtio_oci = LECTOR["empleado_surtio_oci"].ToString(),
                        persona_recoge_mercancia = LECTOR["persona_recoge_mercancia"].ToString(),
                        tipo_persona_recoge = LECTOR["tipo_persona_recoge"].ToString(),
                    });
                }
            }

            CONEXION_SCOI.Close();

            return lista;
        }
    }
}