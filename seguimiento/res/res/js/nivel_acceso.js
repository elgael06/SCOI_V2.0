
console.log("inicio......");

var Gestion_Infraestructura = new Array[6];
var Gestion_Estrategica = new Array[3];
var Despliegue_procesos     = new Array[1];
var hk = new Array[3];
var Catalogos               = new Array[4];
var Alimentacion            = new Array[1];

var menu_usuario = new Array(Gestion_Infraestructura, Gestion_Estrategica, Despliegue_procesos, hk, Catalogos, Alimentacion);

console.log(menu_usuario);

	//alert("Datos Guardado...");
	//datos Administracion
	var menu_orgnigrama	= Gestion_Infraestructura[0];
	var menu_usuarios = Gestion_Infraestructura[1];
	var menu_permisos = Gestion_Infraestructura[2];
	var menu_perfiles = Gestion_Infraestructura[3];
	var menu_relaciones = Gestion_Infraestructura[4];
	var menu_nivel_acces = Gestion_Infraestructura[5];

	var menu_unidad_n = Gestion_Estrategica[0];
	var menu_procesos = Gestion_Estrategica[1];
	var menu_evidencias = Gestion_Estrategica[2];

	//datos monitoreo_ind
	var menu_config = Despliegue_procesos[0];

	var menu_mvv            = hk[0];
	var menu_objetovos_hk   = hk[1];
	var menu_indicadores_hk = hk[2];
	//datos matrices
	var menu_etapas = Catalogos[0];
	var menu_unidad_insp = Catalogos[1];
	var menu_elem_insp = Catalogos[2];
	var menu_matrices = Catalogos[3];

	var menu_alim_matrices = Alimentacion[0];

	console.log(menu_orgnigrama);
    /**MENU Administracion**/
	if(menu_orgnigrama) $(document.getElementById('organigrama_menu')).show();
			else $(document.getElementById('organigrama_menu')).hide();

	if(menu_usuarios) $(document.getElementById('usuario_menu')).show();
			else $(document.getElementById('usuario_menu')).hide();

	if(menu_permisos) $(document.getElementById('permisos_menu')).show();
			else $(document.getElementById('permisos_menu')).hide();

	if(menu_perfiles) $(document.getElementById('perfiles_menu')).show();
			else $(document.getElementById('perfiles_menu')).hide();

	if(menu_relaciones) $(document.getElementById('relaciones_menu')).show();
			else $(document.getElementById('relaciones_menu')).hide();

	if(menu_unidad_n) $(document.getElementById('unidad_n_menu')).show();
			else $(document.getElementById('unidad_n_menu')).hide();

	if(menu_procesos) $(document.getElementById('procesos_menu')).show();
			else $(document.getElementById('procesos_menu')).hide();

	if(menu_evidencias) $(document.getElementById('evidencias_menu')).show();
			else $(document.getElementById('evidencias_menu')).hide();

	/**MENU monitoreo_ind**/
	if(menu_config) $(document.getElementById('config_menu')).show();
			else $(document.getElementById('config_menu')).hide();

	if(menu_mvv) $(document.getElementById('mvv_menu')).show();
			else $(document.getElementById('mvv_menu')).hide();

	if(menu_objetovos_hk) $(document.getElementById('objetovos_hk_menu')).show();
			else $(document.getElementById('objetovos_hk_menu')).hide();

	if(menu_indicadores_hk) $(document.getElementById('indicadores_hk_menu')).show();
			else $(document.getElementById('indicadores_hk_menu')).hide();

	/**MENU mstrices**/
	if(menu_etapas) $(document.getElementById('etapas_menu')).show();
			else $(document.getElementById('etapas_menu')).hide();

	if(menu_unidad_insp) $(document.getElementById('unidad_insp_menu')).show();
			else $(document.getElementById('unidad_insp_menu')).hide();

	if(menu_elem_insp) $(document.getElementById('elem_insp_menu')).show();
			else $(document.getElementById('elem_insp_menu')).hide();

	if(menu_matrices) $(document.getElementById('matrices_menu')).show();
			else $(document.getElementById('matrices_menu')).hide();

	if(menu_alim_matrices) $(document.getElementById('alim_matrices_menu')).show();
	    else $(document.getElementById('alim_matrices_menu')).hide();

	if (menu_nivel_acces) $(document.getElementById('nivel_acces_menu')).show();
	        else $(document.getElementById('nivel_acces_menu')).hide();



/**evento para chekbox 1************************************************listo*******/
/**function click1(){
    var ck1 = document.getElementById('cbx_gest_infr').checked;
  if(ck1)   {console.log("avilitado "+" "+ck1);
	//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
      for (var i = 0; i < Gestion_Infraestructura.length; i++) {
          Gestion_Infraestructura[i] = true;
      }
	}
	else    {console.log("apagado "+" "+ck1);
	document.getElementById('cbx_gest_infr').checked = false;
	for (var i = 0; i < Gestion_Infraestructura.length; i++) {
	    Gestion_Infraestructura[i] = false;
	}
					}
//asigna valores a sub-chekbox
  document.getElementById('organigrama_item').checked = ck1;
  document.getElementById('usuario_item').checked = ck1;
  document.getElementById('permisos_item').checked = ck1;
  document.getElementById('perfiles_item').checked = ck1;
  document.getElementById('relaciones_item').checked = ck1;

  console.log(Gestion_Infraestructura);

  return ck1;
}**/

/**evento para chekbox 1-1*******listo**/
function click1_1(){
    var i = document.getElementById('organigrama_item').checked;

    if (i) {
        console.log("avilitado" + " " + i);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        Gestion_Infraestructura[0] = i;
    }
    else {
        console.log("apagado" + " " + i);
        document.getElementById('cbx_gest_infr').checked = false;
        document.getElementById('organigrama_item').checked = false;
        Gestion_Infraestructura[0] = i;
    }
	console.log(Gestion_Infraestructura);
  return i;
}
/**evento para chekbox 1-2**/
function click1_2(){
    var i = document.getElementById('usuario_item').checked;

	if (i) {console.log("avilitado"+" "+i);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
	    document.getElementById('usuario_item').checked = true;
	    Gestion_Infraestructura[1] = i;
	    if (Gestion_Infraestructura[0] === true && Gestion_Infraestructura[1] === true && Gestion_Infraestructura[2] === true && Gestion_Infraestructura[3] === true && Gestion_Infraestructura[4] === true)
			    document.getElementById('cbx_gest_infr').checked = true;
			}
	else {console.log("apagado"+" "+i);
	document.getElementById('cbx_gest_infr').checked = false;
	document.getElementById('usuario_item').checked = false;
	Gestion_Infraestructura[1] = i;
			}
	console.log(Gestion_Infraestructura);
  return i;
}
/**evento checkbox 1-3******listo**/
function click1_3(){
    var i = document.getElementById('permisos_item').checked;

	if (i) {console.log("avilitado"+" "+i);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
	    document.getElementById('permisos_item').checked = true;
	    Gestion_Infraestructura[2] = i;
	    if (Gestion_Infraestructura[0] === true && Gestion_Infraestructura[1] === true && Gestion_Infraestructura[2] === true && Gestion_Infraestructura[3] === true && Gestion_Infraestructura[4] === true)
	        document.getElementById('cbx_gest_infr').checked = true;
			}
	else {console.log("apagado"+" "+i);
	document.getElementById('cbx_gest_infr').checked = false;
       document.getElementById('permisos_item').checked = false;
       Gestion_Infraestructura[2] = i;
			}
	console.log(Gestion_Infraestructura);
  return i;
}
/**evento checkbox 1-4**************listo**/
function click1_4() {
    var i = document.getElementById('perfiles_item').checked;

    if (i) {
        console.log("avilitado" + " " + i);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('perfiles_item').checked = true;
        Gestion_Infraestructura[3] = i;
        if (Gestion_Infraestructura[0] === true && Gestion_Infraestructura[1] === true && Gestion_Infraestructura[2] === true && Gestion_Infraestructura[3] === true && Gestion_Infraestructura[4] === true)
            document.getElementById('cbx_gest_infr').checked = true;
    }
    else {
        console.log("apagado" + " " + i);
        document.getElementById('cbx_gest_infr').checked = false;
        document.getElementById('perfiles_item').checked = false;
        Gestion_Infraestructura[3] = i;
    }
    console.log(Gestion_Infraestructura);
    return i;
}
/**evento checkbox 1-5**/
function click1_5() {
    var i = document.getElementById('relaciones_item').checked;

    if (i) {
        console.log("avilitado" + " " + i);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('relaciones_item').checked = true;
        Gestion_Infraestructura[4] = i;
        if (Gestion_Infraestructura[0] === true && Gestion_Infraestructura[1] === true && Gestion_Infraestructura[2] === true && Gestion_Infraestructura[3] === true && Gestion_Infraestructura[4] === true)
            document.getElementById('cbx_gest_infr').checked = true;
    }
    else {
        console.log("apagado" + " " + i);
        document.getElementById('cbx_gest_infr').checked = false;
        document.getElementById('relaciones_item').checked = false;
        Gestion_Infraestructura[4] = i;
    }
    console.log(Gestion_Infraestructura);
    return i;
}
/**evento checkbox 2********************************listo***************************/
function click2(){
  var j = document.getElementById('cbx_gest_estra').checked;
  if(j)   {console.log("avilitado 2 "+" "+j);
		//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
      document.getElementById('cbx_gest_estra').checked = true;
      for (var i = 0; i < Gestion_Estrategica.length; i++) {
          Gestion_Estrategica[i] = true;
		}
		}
		else  {  console.log("apagado  2 "+" "+j);
		document.getElementById('cbx_gest_estra').checked = false;
		for (var i = 0; i < Gestion_Estrategica.length; i++) {
		    Gestion_Estrategica[i] = false;
						}
				}
//asigna valores a sub-chekbox
  document.getElementById('unidad_n_item').checked = j;
  document.getElementById('procesos_item').checked = j;
  document.getElementById('evidencias_item').checked = j;

  console.log(Gestion_Estrategica);
  return j;
}
/**evento para chekbox 2-1*************listo**/
function click2_1(){
    var j = document.getElementById('unidad_n_item').checked;

	if(j)  {console.log("avilitado 2-1 "+" "+j);
		//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
	    document.getElementById('unidad_n_item').checked = true;
	    Gestion_Estrategica[0] = j;
	    if (Gestion_Estrategica[0] === true && Gestion_Estrategica[1] === true && Gestion_Estrategica[2] === true)
		    document.getElementById('cbx_gest_estra').checked = true;
		}
	else   {console.log("apagado 2-1 "+" "+j);
	document.getElementById('cbx_gest_estra').checked = false;
        document.getElementById('unidad_n_item').checked = false;
        Gestion_Estrategica[0] = j;
				}
	console.log(Gestion_Estrategica);
  return j;
}
/**evento para chekbox 2-2**********listo**/
function click2_2(){
    var j = document.getElementById('procesos_item').checked;

    if (j) {
        console.log("avilitado 2-1 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('procesos_item').checked = true;
        Gestion_Estrategica[1] = j;
        if (Gestion_Estrategica[0] === true && Gestion_Estrategica[1] === true && Gestion_Estrategica[2] === true)
            document.getElementById('cbx_gest_estra').checked = true;
    }
    else {
        console.log("apagado 2-1 " + " " + j);
        document.getElementById('cbx_gest_estra').checked = false;
        document.getElementById('procesos_item').checked = false;
        Gestion_Estrategica[1] = j;
    }
    console.log(Gestion_Estrategica);
    return j;
}
/**evento checkbox 2-3***************listo**/
function click2_3(){
    var j = document.getElementById('evidencias_item').checked;

    if (j) {
        console.log("avilitado 2-1 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('evidencias_item').checked = true;
        Gestion_Estrategica[2] = j;
        if (Gestion_Estrategica[0] === true && Gestion_Estrategica[1] === true && Gestion_Estrategica[2] === true)
            document.getElementById('cbx_gest_estra').checked = true;
    }
    else {
        console.log("apagado 2-1 " + " " + j);
        document.getElementById('cbx_gest_estra').checked = false;
        document.getElementById('evidencias_item').checked = false;
        Gestion_Estrategica[2] = j;
    }
    console.log(Gestion_Estrategica);
    return j;
}
/**evento checkbox 3********************listo******************/
function click3(){
    var j = document.getElementById('cbx_des_proc').checked;
    if (j) {
        console.log("avilitado 2 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('cbx_gest_estra').checked = true;
        for (var i = 0; i < Despliegue_procesos.length; i++) {
            Despliegue_procesos[i] = true;
        }
    }
    else {
        console.log("apagado  2 " + " " + j);
        document.getElementById('cbx_des_proc').checked = false;
        for (var i = 0; i < Despliegue_procesos.length; i++) {
            Despliegue_procesos[i] = false;
        }
    }
    //asigna valores a sub-chekbox
    document.getElementById('config_item').checked = j;

    console.log(Despliegue_procesos);
    return j;
}
/**evento para chekbox 3-1******************listo**/
function click3_1(){
    var j = document.getElementById('config_item').checked;

    if (j) {
        console.log("avilitado 2-1 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('config_item').checked = true;
        Despliegue_procesos[0] = j;
        if (Despliegue_procesos[0] === true)
            document.getElementById('cbx_des_proc').checked = true;
    }
    else {
        console.log("apagado 2-1 " + " " + j);
        document.getElementById('cbx_des_proc').checked = false;
        document.getElementById('config_item').checked = false;
        Despliegue_procesos[0] = j;
    }
    console.log(Despliegue_procesos);
    return j;
}
/**evento checkbox 4******************************listo*****************************/
function click4() {
    var j = document.getElementById('cbx_hk').checked;
    if (j) {
        console.log("avilitado 2 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('cbx_hk').checked = true;
        for (var i = 0; i < hk.length; i++) {
            hk[i] = true;
        }
    }
    else {
        console.log("apagado  2 " + " " + j);
        document.getElementById('cbx_hk').checked = false;
        for (var i = 0; i < hk.length; i++) {
            hk[i] = false;
        }
    }
    //asigna valores a sub-chekbox
    document.getElementById('mvv_item').checked = j;
    document.getElementById('objetivos_hk_item').checked = j;
    document.getElementById('indicadores_hk_item').checked = j;

    console.log(hk);
    return j;
}
/**evento para chekbox 4-1***************/
function click4_1() {
    var j = document.getElementById('mvv_item').checked;

    if (j) {
        console.log("avilitado 2-1 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('mvv_item').checked = true;
        hk[0] = j;
        if (hk[0] === true && hk[1] === true && hk[2] === true)
            document.getElementById('cbx_hk').checked = true;
    }
    else {
        console.log("apagado 2-1 " + " " + j);
        document.getElementById('cbx_hk').checked = false;
        document.getElementById('mvv_item').checked = false;
        hk[0] = j;
    }
    console.log(hk);
    return j;
}
/**evento para chekbox 4-2*********listo**/
function click4_2() {
    var j = document.getElementById('objetivos_hk_item').checked;

    if (j) {
        console.log("avilitado 2-1 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('objetivos_hk_item').checked = true;
        hk[1] = j;
        if (hk[0] === true && hk[1] === true && hk[2] === true)
            document.getElementById('cbx_hk').checked = true;
    }
    else {
        console.log("apagado 2-1 " + " " + j);
        document.getElementById('cbx_hk').checked = false;
        document.getElementById('objetivos_hk_item').checked = false;
        hk[1] = j;
    }
    console.log(hk);
    return j;
}
/**evento checkbox 4-3**************listo**/
function click4_3() {
    var j = document.getElementById('indicadores_hk_item').checked;

    if (j) {
        console.log("avilitado 2-1 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('indicadores_hk_item').checked = true;
        hk[2] = j;
        if (hk[0] === true && hk[1] === true && hk[2] === true)
            document.getElementById('cbx_hk').checked = true;
    }
    else {
        console.log("apagado 2-1 " + " " + j);
        document.getElementById('cbx_hk').checked = false;
        document.getElementById('indicadores_hk_item').checked = false;
        hk[2] = j;
    }
    console.log(hk);
    return j;
}
/**evento para chekbox 5************************************************listo*******/
function click5() {
    var ck1 = document.getElementById('ckb_cat').checked;
    if (ck1) {
        console.log("avilitado " + " " + ck1);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        for (var i = 0; i < Catalogos.length; i++) {
            Catalogos[i] = true;
        }
    }
    else {
        console.log("apagado " + " " + ck1);
        document.getElementById('ckb_cat').checked = false;
        for (var i = 0; i < Catalogos.length; i++) {
            Catalogos[i] = false;
        }
    }
    //asigna valores a sub-chekbox
    document.getElementById('etapas_item').checked = ck1;
    document.getElementById('unidad_insp_item').checked = ck1;
    document.getElementById('elem_insp_item').checked = ck1;
    document.getElementById('matrices_item').checked = ck1;

    console.log(Catalogos);

    return ck1;
}
/**evento para chekbox 5-1*******listo**/
function click5_1() {
    var i = document.getElementById('etapas_item').checked;

    if (i) {
        console.log("avilitado" + " " + i);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        Catalogos[0] = i;
        if (Catalogos[0] === true && Catalogos[1] === true && Catalogos[2] === true && Catalogos[3] === true)
            document.getElementById('ckb_cat').checked = true;
    }
    else {
        console.log("apagado" + " " + i);
        document.getElementById('ckb_cat').checked = false;
        document.getElementById('etapas_item').checked = false;
        Catalogos[0] = i;
    }
    console.log(Catalogos);
    return i;
}
/**evento para chekbox 5-2********listo**/
function click5_2() {
    var i = document.getElementById('unidad_insp_item').checked;

    if (i) {
        console.log("avilitado" + " " + i);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        Catalogos[1] = i;
        if (Catalogos[0] === true && Catalogos[1] === true && Catalogos[2] === true && Catalogos[3] === true)
            document.getElementById('ckb_cat').checked = true;
    }
    else {
        console.log("apagado" + " " + i);
        document.getElementById('ckb_cat').checked = false;
        document.getElementById('unidad_insp_item').checked = false;
        Catalogos[1] = i;
    }
    console.log(Catalogos);
    return i;
}
/**evento checkbox 5-3******listo**/
function click5_3() {
    var i = document.getElementById('elem_insp_item').checked;

    if (i) {
        console.log("avilitado" + " " + i);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        Catalogos[2] = i;
        if (Catalogos[0] === true && Catalogos[1] === true && Catalogos[2] === true && Catalogos[3] === true)
            document.getElementById('ckb_cat').checked = true;
    }
    else {
        console.log("apagado" + " " + i);
        document.getElementById('ckb_cat').checked = false;
        document.getElementById('elem_insp_item').checked = false;
        Catalogos[2] = i;
    }
    console.log(Catalogos);
    return i;
}
/**evento checkbox 5-4**************listo**/
function click5_4() {
    var i = document.getElementById('matrices_item').checked;

    if (i) {
        console.log("avilitado" + " " + i);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        Catalogos[3] = i;
        if (Catalogos[0] === true && Catalogos[1] === true && Catalogos[2] === true && Catalogos[3] === true)
            document.getElementById('ckb_cat').checked = true;
    }
    else {
        console.log("apagado" + " " + i);
        document.getElementById('ckb_cat').checked = false;
        document.getElementById('matrices_item').checked = false;
        Catalogos[3] = i;
    }
    console.log(Catalogos);
    return i;
}
/**evento checkbox 6********************listo******************/
function click6() {
    var j = document.getElementById('ckb_alim').checked;
    if (j) {
        console.log("avilitado 2 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('ckb_alim').checked = true;
        for (var i = 0; i < Alimentacion.length; i++) {
            Alimentacion[i] = true;
        }
    }
    else {
        console.log("apagado  2 " + " " + j);
        document.getElementById('ckb_alim').checked = false;
        for (var i = 0; i < Alimentacion.length; i++) {
            Alimentacion[i] = false;
        }
    }
    //asigna valores a sub-chekbox
    document.getElementById('alim_mat_item').checked = j;

    console.log(Alimentacion);
    return j;
}
/**evento para chekbox 3-1******************listo**/
function click6_1() {
    var j = document.getElementById('alim_mat_item').checked;

    if (j) {
        console.log("avilitado 2-1 " + " " + j);
        //AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
        document.getElementById('alim_mat_item').checked = true;
        Alimentacion[0] = j;
        if (Alimentacion[0] === true)
            document.getElementById('ckb_alim').checked = true;
    }
    else {
        console.log("apagado 2-1 " + " " + j);
        document.getElementById('alim_mat_item').checked = false;
        document.getElementById('ckb_alim').checked = false;
        Alimentacion[0] = j;
    }
    console.log(Alimentacion);
    return j;
}

$(document).ready(function () {
    $("#list_gest_infra").click(function () {
        $('#muno').toggle();
    });
    $("#list_gest_estra").click(function () {
        $('#mdos').toggle();
    });
    $("#list_deso_pro").click(function () {
        $('#mtres').toggle();
    });
    $("#list_hk").click(function () {
        $('#mcuat').toggle();
    });
    $("#list_hk").click(function () {
        $('#mcua').toggle();
    });
    $("#list_cat").click(function () {
        $('#mcin').toggle();
    });
    $("#list_alim").click(function () {
        $('#msei').toggle();
    });
    $("#enc_gu").click(function () {
        $('#card_usr').toggle();
        $('#padre_ac_usr').toggle();
    });
    $("#nau").click(function () {
        $('#padre_ac_usr').toggle();
    });
});
