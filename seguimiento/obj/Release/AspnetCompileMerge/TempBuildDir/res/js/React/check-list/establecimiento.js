class objEstablecimieto {
    constructor() {
        this.id = "";
        this.nombre = "";
        this.encargado = {};
        this.fecha = "";
        this.cuestionario = {};
        this.lista_cuestionadios = [];
        this.preguntas = [];
    }
    get getId() {
        return this.id;
    }
    set setId(id) {
        this.id = id;
        if (id > 0) {
            var f = this.fecha.split("-");
            f = f[2] + "-" + f[1] + "-" + f[0];
            this.lista_cuestionadios = conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_R", { "id_establecimiento": id, "fecha": f });
        }
    }
    get getNombre() {
        return this.nombre;
    }
    set setNombre(n) {
        this.nombre = n;
    }
    get getEncargado() {
        return this.encargado;
    }
    set setEncargado(e) {
        this.encargado = e;
    }
    get getFecha() {
        const d = new Date();
        const dia = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        const mes = d.getMonth() >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);

        const full = d.getFullYear() + "-" + mes + "-" + d.getDate();

        this.fecha = this.fecha === "" ? full : this.fecha;
        return this.fecha;
    }
    set setFecha(f) {

        this.fecha = f;
    }
    get getCuestionario() {
        return this.cuestionario;
    }
    set setCuestionario(c) {
        this.cuestionario = c;
    }
    get getLista_cuestionarios() {
        return this.lista_cuestionadios;
    }
    set setLista_cuestionarios(c) {
        var f = this.fecha.split("-");
        f = f[2] + "-" + f[1] + "-" + f[0];
        this.lista_cuestionadios = conexion_ajax("servicios/checkListServ.asmx/cuestionarios_por_establecimiento_R", { "id_establecimiento": this.id, "fecha": f });
    }
    get getPreguntas() {
        return this.preguntas;
    }
    set setPreguntas(cuestionario) {
        var f = this.fecha.split("-");
        this.preguntas =  conexion_ajax("servicios/checkListServ.asmx/obtener_Preguntas_cuestionario", {
            'establecimiento': this.id,
            'cuestionario': cuestionario,
            'fecha': f[2] + "-" + f[1] + "-" + f[0]
        });
    }
}