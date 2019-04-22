var valorData;// tomara el tamaño(cantidad de elementos) de la data de el JSON 
var datos;//tomara todos los datos de la data del JSON

$.ajax({//con JQuery ajax llamamos al JSON
    url: 'ServicoEtapas.asmx/getEtapas',//agregamos la url del servicio web para crear la coneccion con ajax--"servicoEtapa.asmx" es una clase creada en el proyeto(this)
    method: 'post',
    dataType: 'json',//tipo de dato a recibir
    success: function (data) {//success cuando se crea la coneccion sin problemas
        console.log(data);
        console.log(data.length);
        valorData = data.length;//agregamos el tamaño de la data
        datos = data;//agreagamos la data

        var tbody = document.getElementsByTagName('tbody')[0];//referenciamos la variable tbody con el tag html 'tbody'---nos devuelve la refencia del primer tbody que encuentre

        for (var i = 0; i < data.length; i++) {//ciclo para crear las filas y columnas dentro del tbody

            var tr = document.createElement("tr");//crea un tag tr
            var td1 = document.createElement("td");//crea un tag td
            var td2 = document.createElement("td");//crea un tag td
            var td3 = document.createElement("td");//crea un tag td
            var td4 = document.createElement("td");//crea un tag td

            //agregamos al td un TextNode el cual trae  la data del JSON en este caso 
            //data[i----"es la fila"--].folio y .folio es la columna con los campos 
            //correspondientes a la fila que sea i
            td1.appendChild(document.createTextNode(data[i].folio));
            tr.appendChild(td1);

            td2.appendChild(document.createTextNode(data[i].nombre));
            tr.appendChild(td2);

            td3.appendChild(document.createTextNode(data[i].abreviatura));
            tr.appendChild(td3);

            td4.appendChild(document.createTextNode(data[i].estatus));
            tr.appendChild(td4);

            //al final agregamos la fila en i(0,1,2,3.etc) al tbody
            tbody.appendChild(tr);
        }
    },
    complete: function () {//esta funcion solo es llamada cuando ajax cargo todos los componenentes

        //tomamos todos los tags tr que seran nuestras filas para darle funcionalidad
        //en este caso toma el nombre elemento...aunque no regresa un arreglo de elementos ya que 
        //traera a todos los tr que esten en el documento o pagina html
        var elemento = document.getElementsByTagName("tr");
        var botonEditar = document.getElementById('<%=btEditar.ClientID%>');
        //botonEditar.disabled = true;
        //console.log(botonEditar);

        var ultimoIndex;//variable tomara el valor de la ultima fila seleccionada
        var index;//valor de la fila actualmente seleccionada

        for (var j = 1; j <= valorData; j++) {//ciclo para crearle los eventos a cada fila o tag 'tr'

            //agregamos eventos a cada uno de los tr que se encuentran en le arreglo elemento
            //como se comento var elemento = document.getElementsByTagName("tr"); nos regresa todos lo tr en la pagina
            //los eventos son de tipo "click" y ponemos a la escucha a los tr
            elemento[j].addEventListener("click", function (e) {

                if (e == null) {//decimos que si e o evento es == a nulo entoces..

                    index = e.target.parentNode.rowIndex;//a index le agregamos el numero de fila que genere eventos el tr
                    elemento[index].style.background = "#D8D8D8";//cambiamos el color para indicar que esa fila esta seleccionada


                    if (ultimoIndex != index && ultimoIndex != undefined) {//esta condicion nos dirá cual fue la ultima fila
                        //para deseleccionarla o volverla blanca
                        elemento[ultimoIndex].style.background = "#FAFAFA";//la vuelve blanca
                    }
                    botonEditar.disabled = false;
                    ultimoIndex = index;
                    agregarDatos();
                } else {
                    botonEditar.disabled = false;
                    index = e.target.parentNode.rowIndex;
                    elemento[index].style.background = "#D8D8D8";
                    //alert('entre a segundo');
                    //alert(ultimoIndex != index);

                    if (ultimoIndex != index && ultimoIndex != undefined) {//cambia a blanco la ultima fila seleccionada 
                        // alert('entre pero no hago nada');
                        elemento[ultimoIndex].style.background = "#FAFAFA";
                    }
                    //alert('llegue aqui al else');
                    //botonEditar.disabled = false;
                    console.log(botonEditar);
                    ultimoIndex = index;
                    agregarDatos();
                }

            }, true);
        }
        function agregarDatos() {
            //var inputs = document.getElementsByTagName('input');
            var txBoxFolio = document.getElementById('<%=txFolio.ClientID%>');
            // console.log(inputs);
            var txBoxEtapa = document.getElementById('<%=txEtapa.ClientID%>');
            var txBoxAbrevitura = document.getElementById('<%=txAbreviatura.ClientID%>');
            var comboBxEstatus = document.getElementById("ContentPlaceHolder1_cbEstatus_cbEstatus_TextBox");
            //alert(comboBxEstatus);

            txBoxFolio.value = datos[index - 1].folio;
            //txBoxFolio.disabled=true;
            txBoxEtapa.value = datos[index - 1].nombre;
            txBoxAbrevitura.value = datos[index - 1].abreviatura;
            //alert(datos[index - 1].estatus);
            if (datos[index - 1].estatus == "cancelado") {
                //alert('entro aqui');
                comboBxEstatus.value = "cancelado";
            } else {
                comboBxEstatus.value = "vigente";;
            }

        }
        //console.log(elemento[1]);
    }
});

(function (document) {
    'use strict';

    var LightTableFilter = (function (Arr) {

        var _input;

        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function (table) {
                Arr.forEach.call(table.tBodies, function (tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }

        function _filter(row) {
            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }

        return {
            init: function () {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function (input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            LightTableFilter.init();
        }
    });

})(document);   