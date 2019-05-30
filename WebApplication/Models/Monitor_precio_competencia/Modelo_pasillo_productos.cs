using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Modelo_pasillo_productos
    {
        public string Pasillo { get; set; }
        public int Cantidad { get; set; }
        public int Avance { get; set; }
        public int Diferencia { get; set; }
        public double Acumulado { get; set; }
        public List<Model_producto> Productos = new List<Model_producto>();

        public Modelo_pasillo_productos(List<Model_monitor_precio_competencia> lista)
        {
            foreach (var p in lista ) {

                Productos.Add(new Model_producto(p));
            }
            Obtener_analisis(lista);
        }
        private void Obtener_analisis(List<Model_monitor_precio_competencia> filtro)
        {
            Cantidad = filtro.Count();
            Avance = filtro.Where(p => p.LEY_PCIO_N > 0 || p.LEY_PCIO_O > 0 ||
                                       p.LOPEZ_N > 0 || p.LOPEZ_O > 0 ||
                                       p.MEZQUITILLO_N > 0 || p.MEZQUITILLO_O > 0 ||
                                       p.SORIANA_N > 0 || p.SORIANA_O > 0 ||
                                       p.TERESITA_N > 0 || p.TERESITA_O > 0).ToList().Count();

            if (Cantidad > 0 && Avance > 0)
            {
                Diferencia = Cantidad - Avance;
                Acumulado = (double.Parse(Avance.ToString()) / double.Parse(Cantidad.ToString()));
            }
            else
            {
                Diferencia = 0;
                Acumulado = 0.0;
            }
        }
    }
}