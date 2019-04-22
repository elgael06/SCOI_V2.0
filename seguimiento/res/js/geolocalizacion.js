
datoss = { lat: 24.32353, lng: -107.3635414 };


function geolocalizacion() {
   navigator.geolocation.getCurrentPosition(mostrar,error)
   return datoss;
}
function mostrar(posicion) {
    //alert("lat:" + posicion.coords.latitude + "\nlon:" + posicion.coords.longitude)
    datoss= { lat: posicion.coords.latitude, lng: posicion.coords.longitude };
}
function error(posicion) {  alert("error...")}
//funcion dormir
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            return false;
            break;
        }
        else return true;
    }
}

function initMap() {
    var posicion = geolocalizacion();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: posicion
    });
    var marker = new google.maps.Marker({
        position: posicion,
        map: map
    });
}
//initMap()

