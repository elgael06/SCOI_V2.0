
class Establecimiento_matriz {
    constructor() {
        this.establecimiento = [];
        this.matriz = [];
        this.unidad_inspeccion = [];
        this.etapas = [];
    }
    obtener_establecimientos() {
        const url = "/servicios/matriz/matriz.asmx/obtener_establecimiento_matriz";
        fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response =>  this.establecimiento= response.d);
    }
    obtener_matriz() {
        const url = "/servicios/matriz/matriz.asmx/obtener_matriz";
        fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.matriz = response.d);
    }
    obtener_unidad_ispeccion() {
        const url = "/servicios/matriz/matriz.asmx/obtener_unidad_inspeccion_matriz";
        fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.unidad_inspeccion = response.d);
    }
    obtener_etapas() {
        const url = "/servicios/matriz/matriz.asmx/obtener_etapas_matriz";
        fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.etapas = response.d);
    }


}