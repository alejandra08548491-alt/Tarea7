
let lat = null;
let lon = null;
let apiKey = "99aaa1bc27fe87812b109c08ec8e66ef";

$(document).ready(function () {

    // Obtener geolocalización al iniciar
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            // Cargar clima automático al iniciar
            cargarClima();
        });
    } else {
        alert("La geolocalización no está soportada.");
    }

    // Recargar datos al hacer clic sobre la tabla
    $("#tblw").click(function () {
        cargarClima();
    });

});


// ------------------------------
// FUNCIÓN QUE CONSUME OPENWEATHER
// ------------------------------
function cargarClima() {

    if (lat == null || lon == null) {
        console.log("Coordenadas no disponibles todavía...");
        return;
    }

    let urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; //Aca se aplica el open weather map

    $.getJSON(urlClima, function (data) {

        // Asignar datos
        $("#lug").text(data.name);
        $("#tem").text(data.main.temp + " °C");
        $("#hum").text(data.main.humidity + " %");
        $("#vie").text(data.wind.speed + " km/h");

        // Icono del clima
        let icono = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${icono}@2x.png`; //Aca se aplica el open weather map tambien
        $("#tiempoIcon").attr("src", iconUrl);

    }).fail(function () {
        alert("Error al conectar con OpenWeather.");
    });

}
