$(document).ready(function () {
    //alert("s")
    $(".modal").hide();
    $(".drop >svg").on('click', function () {
        $("#columna_menu").toggle("linear");
        $("#area_contenido").toggleClass("todo_el_margen")
       // alert("s")
    });

});