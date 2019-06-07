using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace WebApplication.Models.PropuestaCombioPrecios
{
    public class ModeloProductoCambioPrecios
    {
        public string Codigo        { get; set; }
        public string Descripcion   { get; set; }
        public string Tipo          { get; set; }
        public bool   Estado        { get; set; }
        public string Fecha         { get; set; }

        public ModeloCompetenciaCambioPrecios Competencias = new ModeloCompetenciaCambioPrecios();

        public string Localizacion  { get; set; }
        public string Pasillo       { get; set; }
        public string Clase         { get; set; }
        public string Categoria     { get; set; }
        public string Familia       { get; set; }
        public string CanastaBasica { get; set; }
        public string Color         { get; set; }
        public string Marca         { get; set; }
        public string Clasificacion8020 { get; set; }
    }
}


/*
 localizacion
pasillo
clase_producto
categoria
familia
canasta_basica
color
clasificacion_8020
marca

     */
