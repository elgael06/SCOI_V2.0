using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Monitor_auditoria_venta
{
    public class Monitor_clasificador_venta
    {
        //Atributos
        public string Nombre { get; set; }
        public List<Monitor_establecimiento_venta> Lista_establecimientos = new List<Monitor_establecimiento_venta>();
        public double Total { get; set; }
        //Contructor
        public Monitor_clasificador_venta(List<MonitorVenta> lista)
        {
            foreach (MonitorVenta dato in lista)
            {
               int index= Lista_establecimientos.FindIndex(e => e.Folio == dato.Cod_Establecimiento);
                SumarTotal(dato.Total);
                if (index == -1)
                {
                    var filtro = lista.Where(e => e.Cod_Establecimiento == dato.Cod_Establecimiento).ToList();

                    Lista_establecimientos.Add(new Monitor_establecimiento_venta(filtro) {
                        Folio = dato.Cod_Establecimiento,
                        Nombre = dato.Nom_establecimiento
                    });
                }
            }
        }
        /*Metodos*/
        private void Enlistar_monitoreo_por_establecimineto(List<MonitorVenta> lista)
        {

        }
        private void SumarTotal(double valor)
        {
            Total += valor;
        }
    }
}