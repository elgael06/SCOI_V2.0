using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Monitor_precio_competencia
{
    public class Model_pasillo : Interface_Analisis
    {
        public string Pasillo { get; set; }
        public List<Model_mueble> Muebles = new List<Model_mueble>();
        public int Cantidad { get; set; }
        public int Avance { get; set; }
        public int Diferencia { get; set; }
        public double Acumulado { get; set; }

        public Model_pasillo(List<Model_monitor_precio_competencia> productos)
        {
            Obtener_muebles(productos);
            Obtener_analisis(productos);
        }
        public void Obtener_muebles(List<Model_monitor_precio_competencia> productos)
        {
            foreach (Model_monitor_precio_competencia producto in productos)
            {
                if (Muebles.FindIndex(m => m.Mueble == producto.localizacion) == -1)
                {
                    List<Model_monitor_precio_competencia> filtro = productos.Where(p => p.localizacion == producto.localizacion).ToList();

                    Muebles.Add(new Model_mueble(filtro)
                    {
                        Mueble= producto.localizacion
                    });
                }
            }
        }
        private void Obtener_analisis(List<Model_monitor_precio_competencia> filtro)
        {
            Cantidad = filtro.Count();
            Avance = filtro.Where(p => p.LEY_PCIO_N > 0 || p.LEY_PCIO_O > 0 ||
                                       p.LOPEZ_N > 0 || p.LOPEZ_O > 0 ||
                                       p.MEZQUITILLO_N>0 || p.MEZQUITILLO_O>0 ||
                                       p.SORIANA_N>0 || p.SORIANA_O>0 ||
                                       p.TERESITA_N>0 || p.TERESITA_O>0 ).ToList().Count();
            
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