document.addEventListener('DOMContentLoaded', function () {

    // Inicio Código Mapa
    function inicializarMapa(idMapa, coordenadas, zoom, textoPopup = 'Ubicación') {
        const elementoMapa = document.getElementById(idMapa);
        if (elementoMapa && typeof L !== 'undefined') {
            try {
                // Verificar si el mapa ya está inicializado
                if (elementoMapa._leaflet_id) {
                    // Si ya está inicializado, no hacer nada o remover y recrear
                    // console.log(`Mapa ${idMapa} ya inicializado.`);
                    return elementoMapa._leaflet_map; // Retornar la instancia existente
                }
                const mapa = L.map(idMapa).setView(coordenadas, zoom);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mapa);
                L.marker(coordenadas).addTo(mapa)
                    .bindPopup(textoPopup).openPopup();
                elementoMapa._leaflet_map = mapa; // Guardar la instancia para futuras referencias
                return mapa;
            } catch (e) {
                console.error(`Error al inicializar el mapa ${idMapa}:`, e);
                return null;
            }
        } else if (elementoMapa) {
            console.warn(`Leaflet no cargado o el elemento del mapa ${idMapa} no encontrado.`);
        }
        return null;
    }

    // Inicializar mapa de contacto en contacto.html
    if (document.getElementById('mapa-contacto')) {
        inicializarMapa('mapa-contacto', [6.2081, -75.5701], 13, 'EcoVolt - Oficina Principal en el poblado, Medellin');
    }

    // Inicializar mapa solar en energia-solar.html
    const mapaSolarElement = document.getElementById('mapa-solar');
    if (mapaSolarElement) {
        const coordenadasColombia = [6.2081, -75.5701];
        const mapaSolar = inicializarMapa('mapa-solar', coordenadasColombia, 5, 'Potencial Solar en Colombia');

        if (mapaSolar) {
            const zonasPotencialSolar = [
                { coords: [11.5, -72.5], name: "La Guajira", potential: 'Muy Alto', color: 'red' },
                { coords: [10.0, -75.0], name: "Costa Caribe (Atlántico, Magdalena)", potential: 'Alto', color: 'orange' },
                { coords: [4.0, -73.0], name: "Llanos Orientales (Meta, Casanare)", potential: 'Alto', color: 'orange' },
                { coords: [6.2, -75.6], name: "Región Andina (Antioquia, Valle)", potential: 'Medio', color: 'yellow' },
                { coords: [1.0, -72.0], name: "Amazonía", potential: 'Medio-Bajo', color: 'lightgreen' },
                { coords: [2.5, -77.0], name: "Costa Pacífica", potential: 'Bajo (alta nubosidad)', color: 'lightblue' }
            ];

            zonasPotencialSolar.forEach(zona => {
                L.circleMarker(zona.coords, {
                    radius: 8,
                    fillColor: zona.color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.7
                }).addTo(mapaSolar).bindPopup(`<strong>${zona.name}</strong><br>Potencial Solar Estimado: ${zona.potential}`);
            });

            const leyenda = L.control({ position: 'bottomright' });
            leyenda.onAdd = function (map) {
                const div = L.DomUtil.create('div', 'info leyenda-mapa');
                
                const niveles = [
                    { color: 'red', label: 'Muy Alto' },
                    { color: 'orange', label: 'Alto' },
                    { color: 'yellow', label: 'Medio' },
                    { color: 'lightgreen', label: 'Medio-Bajo' },
                    { color: 'lightblue', label: 'Bajo' }
                ];
                div.innerHTML = '<h4>Potencial Solar Estimado</h4>';
                for (let i = 0; i < niveles.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + niveles[i].color + '"></i> ' + niveles[i].label + '<br>';
                }
                return div;
            };
            leyenda.addTo(mapaSolar);
        }
    }

    // Dentro de tu if (mapaSolar) { ... }
    if (mapaSolar) {
        // 1. Desactivar el zoom con scroll POR DEFECTO
        mapaSolar.scrollWheelZoom.disable(); // <- Esto es clave

        // 2. Activar zoom SOLO con Ctrl presionado
        mapaSolar.getContainer().addEventListener('wheel', function(e) {
            if (e.ctrlKey) {
                // Permite zoom solo si Ctrl está presionado
                mapaSolar.scrollWheelZoom.enable();
            } else {
                // Bloquea el zoom y el scroll normal en el mapa
                e.preventDefault();
                mapaSolar.scrollWheelZoom.disable();
            }
        });

        // 3. Opcional: Resetear al soltar Ctrl (para mayor seguridad)
        document.addEventListener('keyup', function(e) {
            if (e.key === 'Control') {
                mapaSolar.scrollWheelZoom.disable();
            }
        });
    }

        // Fin Código Mapa

        if (window.location.hash === '#seccion-calculadora') {
        const seccionCalculadora = document.getElementById('seccion-calculadora');
        if (seccionCalculadora) {
            setTimeout(() => {
                seccionCalculadora.scrollIntoView({ behavior: 'smooth' });
            }, 50); // tiempo ajustado por carga de animaciones
        }
    }




});
