document.addEventListener('DOMContentLoaded', function() {
    // ===== Mapa de Colombia =====
    const mapa = L.map('mapaColombia').setView([3.7944, -72.7172], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(mapa);

    // Añadir marcadores (ejemplo)
    L.marker([4.7110, -74.0721]).addTo(mapa)
        .bindPopup('Bogotá: Potencial solar medio')
        .openPopup();

    L.marker([6.2442, -75.5812]).addTo(mapa)
        .bindPopup('Medellín: Alto potencial solar');

    L.marker([3.4372, -76.5226]).addTo(mapa)
        .bindPopup('Cali: Potencial solar medio');
});