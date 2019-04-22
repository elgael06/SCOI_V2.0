$(document).ready(function () {
    darEventos();//damos eventos a los spinners
});

function darEventos() {
    $("#spinner").on("change", function () { modificarSpinner(); }); //evento de change ( si cambia el spinner o el spinBox) llamaran a la funcion
    $("#spinBox").on("change", function () { modificarSpinBox(); });;
}

function modificarSpinner() {    
    $("#spinBox").val($("#spinner").val());//le agregamos al valor del spinBox el valor del spinner
}

function modificarSpinBox() {    
    if ($("#spinBox").val() > 50) { $("#spinBox").val("50");  } //si el spinBox le agrega el usuario un numero mayor que 50(el valor maximo) se vuelve 50 muestras
    $("#spinner").val($("#spinBox").val());//le agregamos al spinner el valor del spinBox
}