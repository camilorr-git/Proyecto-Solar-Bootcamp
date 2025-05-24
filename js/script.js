document.addEventListener('DOMContentLoaded', function () {

    // Inicializar el mapa sin zoom con scroll
    const mapa = L.map('mapaColombia', {
        scrollWheelZoom: false // Desactivar zoom con scroll por defecto
    }).setView([3.7944, -72.7172], 5);

    // Activar capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(mapa);

    // Marcadores
    L.marker([4.7110, -74.0721]).addTo(mapa)
        .bindPopup('Bogotá: Potencial solar medio')
        .openPopup();

    L.marker([6.2442, -75.5812]).addTo(mapa)
        .bindPopup('Medellín: Alto potencial solar');

    L.marker([3.4372, -76.5226]).addTo(mapa)
        .bindPopup('Cali: Potencial solar medio');

    // Detectar si se presiona Ctrl y permitir zoom con scroll
    mapa.getContainer().addEventListener('wheel', function (e) {
        if (e.ctrlKey) {
            mapa.scrollWheelZoom.enable();  // Activar si Ctrl está presionado
        } else {
            mapa.scrollWheelZoom.disable(); // Desactivar en otros casos
        }
    });
});
