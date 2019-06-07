using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.PropuestaCombioPrecios;

namespace WebApplication.Manager.PropuestaCombioPrecios
{
    public class ObtenerAnalisis
    {
        private SqlConnection CONEXION_BMS = new ConexionesSQL().Bms();
        private SqlDataReader LECTOR;

        public List<string> Localizacion = new List<string>();
        public List<string> Pasillo = new List<string>();
        public List<string> Clase = new List<string>();
        public List<string> Categoria = new List<string>();
        public List<string> Familia = new List<string>();
        public List<string> CanastaBasica = new List<string>();
        public List<string> Color = new List<string>();
        public List<string> Marca = new List<string>();
        public List<string> Clasificacion8020 = new List<string>();

        public List<ModeloProductoCambioPrecios> Productos = new List<ModeloProductoCambioPrecios>();

        public ObtenerAnalisis( string mes ,string filtro ,string anio)
        {
            Consultar(mes:mes,filtro:filtro,anio:anio);
        }

        private void Consultar(string mes, string filtro, string anio)
        {
            string query = string.Format("exec sp_analisis_precios_de_competencia_propuesta_cambio_precios '{0}','{1}','{2}'  ;", mes, filtro, anio);
            SqlCommand comando = new SqlCommand(cmdText: query, connection:CONEXION_BMS);

            CONEXION_BMS.Open();

            LECTOR = comando.ExecuteReader();

            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    Productos.Add(new ModeloProductoCambioPrecios {
                        Codigo = LECTOR["cod_prod"].ToString(),
                    });
                }
            }

            CONEXION_BMS.Close();
        }

    }
}