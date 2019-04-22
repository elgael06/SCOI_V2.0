
console.log("inicio......");
var usrOp1 = new Array(false,false,false);
var usrOp2 = new Array(false,false,false);
var usrOp3 = new Array(false,false,false);


function guardar_datos(){
	//alert("Datos Guardado...");
	//datos opcion 1
	var opcion1d1 = usrOp1[0];
	var opcion1d2 = usrOp1[1];
	var opcion1d3 = usrOp1[2];
	//datos opcion 2
	var opcion2d1 = usrOp2[0];
	var opcion2d2 = usrOp2[1];
	var opcion2d3 = usrOp2[2];
	//datos opcion 1
	var opcion3d1 = usrOp3[0];
	var opcion3d2 = usrOp3[1];
	var opcion3d3 = usrOp3[2];
/**MENU UNO**/
	if(opcion1d1){ $(document.getElementById('a')).show();
			}
	else {$(document.getElementById('a')).hide();
				console.log("false");}
	if(opcion1d2){ $(document.getElementById('b')).show();
				console.log("true");}
	else {$(document.getElementById('b')).hide();
				console.log("false");}
	if(opcion1d3){ $(document.getElementById('c')).show();
				console.log("true");}
	else {$(document.getElementById('c')).hide();
				console.log("false");}
	/**MENU DOS**/
	if(opcion2d1){ $(document.getElementById('d')).show();
		}
	else {$(document.getElementById('d')).hide();
								console.log("false");}
	if(opcion2d2){ $(document.getElementById('e')).show();
								console.log("true");}
	else {$(document.getElementById('e')).hide();
								console.log("false");}
	if(opcion2d3){ $(document.getElementById('f')).show();
								console.log("true");}
	else {$(document.getElementById('f')).hide();
								console.log("false");}
	/**MENU TRES**/
	if(opcion3d1){ $(document.getElementById('g')).show();
			}
	else {$(document.getElementById('g')).hide();
								console.log("false");}
	if(opcion3d2){ $(document.getElementById('h')).show();
								console.log("true");}
	else {$(document.getElementById('h')).hide();
								console.log("false");}
	if(opcion3d3){ $(document.getElementById('i')).show();
								console.log("true");}
	else {$(document.getElementById('i')).hide();
	console.log("false");}

}
/**evento para chekbox 1*******************************************************/
function click1(){
	var ck1=document.getElementById('1').checked;
  if(ck1)   {console.log("avilitado "+" "+ck1);
	//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			for (var i = 0; i < usrOp1.length; i++) {
				usrOp1[i]=true;}
	}
	else    {console.log("apagado "+" "+ck1);
					document.getElementById('1').checked=false;
					for (var i = 0; i < usrOp1.length; i++) {
						usrOp1[i]=false;}
					}
//asigna valores a sub-chekbox
	document.getElementById('1-1').checked = ck1;
	document.getElementById('1-2').checked = ck1;
	document.getElementById('1-3').checked = ck1;

	console.log(usrOp1);

  return ck1;
}
/**evento para chekbox 1-1**/
function click1_1(){
	var i= document.getElementById('1-1').checked;

	if(i)  {console.log("avilitado"+" "+i);
				//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
				usrOp1[0]=i;
				if( usrOp1[0]===true && usrOp1[1]===true && usrOp1[2]===true )
						document.getElementById('1').checked=true;
			}
	else   {console.log("apagado"+" "+i);
        document.getElementById('1').checked=false;
				document.getElementById('1-1').checked=false;
			usrOp1[0]=i;
		}
		console.log(usrOp1);
  return i;
}
/**evento para chekbox 1-2**/
function click1_2(){
  var i= document.getElementById('1-2').checked;

	if (i) {console.log("avilitado"+" "+i);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			document.getElementById('1-2').checked=true;
			usrOp1[1]=i;
			if( usrOp1[0]===true && usrOp1[1]===true && usrOp1[2]===true )
					document.getElementById('1').checked=true;
			}
	else {console.log("apagado"+" "+i);
       document.getElementById('1').checked=false;
			 document.getElementById('1-2').checked=false;
			 usrOp1[1]=i;
			}
	console.log(usrOp1);
  return i;
}
/**evento checkbox 1-3**/
function click1_3(){
  var i= document.getElementById('1-3').checked;

	if (i) {console.log("avilitado"+" "+i);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			document.getElementById('1-3').checked=true;
			usrOp1[2]=i;
			if( usrOp1[0]===true && usrOp1[1]===true && usrOp1[2]===true )
					document.getElementById('1').checked=true;
			}
	else {console.log("apagado"+" "+i);
       document.getElementById('1').checked=false;
			 document.getElementById('1-3').checked=false;
			 usrOp1[2]=i;
			}
	console.log(usrOp1);
  return i;
}
/**evento checkbox 2***********************************************************/
function click2(){
	var j=document.getElementById('2').checked;
  if(j)   {console.log("avilitado 2 "+" "+j);
		//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
		document.getElementById('2').checked=true;
		for (var i = 0; i < usrOp2.length; i++) {
			usrOp2[i]=true;}
		}
		else  {  console.log("apagado  2 "+" "+j);
						document.getElementById('2').checked=false;
						for (var i = 0; i < usrOp2.length; i++) {
							usrOp2[i]=false;}
				}
//asigna valores a sub-chekbox
	document.getElementById('2-1').checked= j;
	document.getElementById('2-2').checked= j;
	document.getElementById('2-3').checked= j;

	console.log(usrOp2);
  return j;
}
/**evento para chekbox 2-1**/
function click2_1(){
	var j = document.getElementById('2-1').checked;

	if(j)  {console.log("avilitado 2-1 "+" "+j);
		//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
		document.getElementById('2-1').checked=true;
		usrOp2[0]=j;
		if( usrOp2[0]===true && usrOp2[1]===true && usrOp2[2]===true )
				document.getElementById('2').checked=true;
		}
	else   {console.log("apagado 2-1 "+" "+j);
        document.getElementById('2').checked=false;
				document.getElementById('2-1').checked=false;
				usrOp2[0]=j;
				}
	console.log(usrOp2);
  return j;
}
/**evento para chekbox 2-2**/
function click2_2(){
  var j=document.getElementById('2-2').checked;

	if (j) {console.log("avilitado 2-2 "+" "+j);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			document.getElementById('2-2').checked=true;
			usrOp2[1]=j;
			if( usrOp2[0]===true && usrOp2[1]===true && usrOp2[2]===true )
					document.getElementById('2').checked=true;
				}
	else {console.log("apagado 2-2 "+" "+j);
       document.getElementById('2').checked=false;
			 document.getElementById('2-2').checked=false;
			 usrOp2[1]=j;
				}
	console.log(usrOp2);
  return j;
}
/**evento checkbox 2-3**/
function click2_3(){
  var j= document.getElementById('2-3').checked;

	if (j) {console.log("avilitado 2-3 "+" "+j);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			usrOp2[2]=j;
			if( usrOp2[0]===true && usrOp2[1]===true && usrOp2[2]===true )
					document.getElementById('2').checked=true;
				}
	else {console.log("apagado 2-3"+" "+j);
       document.getElementById('2').checked=false;
			 document.getElementById('2-3').checked=false;
			 usrOp2[2]=j;
				}
	console.log(usrOp2);
  return j;
}
/**evento checkbox 3**/
function click3(){
	var j=document.getElementById('3').checked;

  if(j)   {console.log("avilitado 3 "+" "+j);
			document.getElementById('3').checked= true;
			for (var i = 0; i < usrOp3.length; i++) {
				usrOp3[i]=true;}
	}
	else    {console.log("apagado  3 "+" "+j);
					for (var i = 0; i < usrOp3.length; i++) {
						usrOp3[i]=false;}
					}
	//asigna valores a sub-chekbox
	document.getElementById('3-1').checked= j;
	document.getElementById('3-2').checked= j;
	document.getElementById('3-3').checked= j;

  console.log(usrOp3);
  return j;
}
/**evento para chekbox 3-1**/
function click3_1(){
	var j = document.getElementById('3-1').checked;

	if(j)  {console.log("avilitado 3-1 "+" "+j);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			usrOp3[0]=true;
			if( usrOp3[0]===true && usrOp3[1]===true && usrOp3[2]===true )
					document.getElementById('3').checked=true;
			}
	else   {console.log("apagado 3-1 "+" "+j);
        document.getElementById('3').checked=false;
				usrOp3[0]=false;
				}
  console.log(usrOp3);
  return j;
}
/**evento para chekbox 3-2**/
function click3_2(){
  var j=document.getElementById('3-2').checked;

	if (j) {console.log("avilitado 3-2 "+" "+j);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			usrOp3[1]=true;
			if( usrOp3[0]===true && usrOp3[1]===true && usrOp3[2]===true )
					document.getElementById('3').checked=true;
			}
	else {console.log("apagado 3-2 "+" "+j);
       document.getElementById('3').checked=false;
			 usrOp3[1]=false;
		 	}
	console.log(usrOp3);
  return j;
}
/**evento checkbox 3-3**/
function click3_3(){
  var j= document.getElementById('3-3').checked;

	if (j) {console.log("avilitado 3-3 "+" "+j);
			//AQUIE SE LE ASIGNARA LOS PERMISOS AL USUSARIO
			usrOp3[2]=true;
			if( usrOp3[0]===true && usrOp3[1]===true && usrOp3[2]===true )
					document.getElementById('3').checked=true;
			}
	else {console.log("apagado 3-3"+" "+j);
       document.getElementById('3').checked=false;
			 	usrOp3[2]=false;
			}
	console.log(usrOp3);
  return j;
}
