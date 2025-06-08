document.addEventListener('DOMContentLoaded', function () {
    
    
    // // Inicio Código Calculadora
    
    // const botonCalcular = document.getElementById('botonCalcular');
    
    // if (botonCalcular) {
        
    //     botonCalcular.addEventListener('click', function() {

    //         const tipoEnergiaActual = document.getElementById('tipoEnergiaActual');
    //         const consumoMensualInput = document.getElementById('consumoMensual');
    //         const zonaGeografica = document.getElementById('zonaGeografica');
    //         const tipoEnergiaRenovable = document.getElementById('tipoEnergiaRenovable');
    //         const resultadoCalculadora = document.getElementById('resultadoCalculadora');

    //         if (!tipoEnergiaActual || !consumoMensualInput || !zonaGeografica || !tipoEnergiaRenovable || !resultadoCalculadora) {
    //             console.error("Uno o más elementos de la calculadora no encontrados.");
    //             if(resultadoCalculadora) resultadoCalculadora.innerHTML = '<p class="error">Error interno de la calculadora. Intente más tarde.</p>';
    //             return;
    //         }

    //         const tipoConsumoActual = tipoEnergiaActual.value;
    //         const consumoMensual = parseFloat(consumoMensualInput.value);
    //         const zona = zonaGeografica.value;
    //         const energiaRenovableSeleccionada = tipoEnergiaRenovable.value;
            



    //         if (isNaN(consumoMensual) || consumoMensual <= 0) {
    //             resultadoCalculadora.innerHTML = '<p  class="alerta-error" role="alert">Por favor, ingrese un consumo mensual válido y mayor a cero.</p>';
    //             consumoMensualInput.focus();
    //             return;
    //         }
    //         if (
    //             !tipoConsumoActual ||
    //             !zona ||
    //             !energiaRenovableSeleccionada
    //         ) {
    //             resultadoCalculadora.innerHTML = `
    //                 <p class="alerta-error" role="alert">
    //                     Por favor, complete todos los campos antes de calcular.
    //                 </p>`;
    //             return;
    //         }

    //         let consumoAnualKWH = 0;
    //         let advertenciaInicial = '';
    //         if (tipoConsumoActual === 'electricidad') {
    //             consumoAnualKWH = consumoMensual * 12;
    //         } else if (tipoConsumoActual === 'gas') {
    //             consumoAnualKWH = consumoMensual * 12 * 10; // Estimación: 1 m³ gas ~ 10 kWh
    //             advertenciaInicial = `<p class="texto-pequeno texto-advertencia">La estimación para Gas Natural es aproximada (1 m³ ≈ 10 kWh térmicos).</p>`;
    //         }

    //         let htmlResultados = '<h3>Resultados de la Estimación:</h3>' + advertenciaInicial;
    //         let advertenciaAdicional = '';
    //         let tasaUSDACOP = 4050; // Ejemplo, actualizar según sea necesario
            

    //         switch (energiaRenovableSeleccionada) {
    //             case 'solar':
    //                 const potenciaPanelWatts = 450;
    //                 let horasPicoSol = 4.5; // Promedio Colombia
    //                 if (zona === 'caribe') horasPicoSol = 5.5;
    //                 else if (zona === 'pacifica') horasPicoSol = 3.8;
    //                 else if (zona === 'orinoquia') horasPicoSol = 5.0;
    //                 else if (zona === 'amazonia') horasPicoSol = 4.0;

    //                 const energiaNecesariaWhSolarDiaria = (consumoAnualKWH * 1000) / 365;
    //                 const energiaPorPanelPorDiaWh = potenciaPanelWatts * horasPicoSol;
    //                 const numeroPaneles = Math.ceil(energiaNecesariaWhSolarDiaria / energiaPorPanelPorDiaWh);
    //                 const potenciaTotalSistemaSolarWatts = numeroPaneles * potenciaPanelWatts;
    //                 const costoPorWattSolarUSD = 1.0; // Estimado
    //                 const costoEstimadoSolarUSD = potenciaTotalSistemaSolarWatts * costoPorWattSolarUSD;
    //                 const costoEstimadoSolarCOP = costoEstimadoSolarUSD * tasaUSDACOP;
    //                 const ahorroAnualPorKWHSolarUSD = 0.18; // Estimado
    //                 const ahorroAnualEstimadoSolarUSD = consumoAnualKWH * ahorroAnualPorKWHSolarUSD;
    //                 const ahorroAnualEstimadoSolarCOP = ahorroAnualEstimadoSolarUSD * tasaUSDACOP;

    //                 htmlResultados += `
    //                     <h3>Energía Solar:</h3>
    //                     <p>Paneles solares recomendados: <strong>${numeroPaneles} paneles</strong> (de ${potenciaPanelWatts}W c/u)</p>
    //                     <p>Potencia total estimada del sistema: <strong>${(potenciaTotalSistemaSolarWatts / 1000).toFixed(2)} kWp</strong></p>
    //                     <p>Costo estimado del sistema: <strong>$${costoEstimadoSolarUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</strong> (aprox. <strong>${costoEstimadoSolarCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>)</p>
    //                     <p>Ahorro anual estimado: <strong>$${ahorroAnualEstimadoSolarUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</strong> (aprox. <strong>${ahorroAnualEstimadoSolarCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>)</p>
    //                 `;
    //                 advertenciaAdicional = `<p class="texto-pequeno">Esta es una estimación general. Los costos y ahorros reales pueden variar. Recomendamos una asesoría personalizada.</p>`;
    //                 break;

    //             case 'eolica':
    //                  // Cálculos simplificados para eólica
    //                 const potenciaGeneradorEolicoWatts = 3000; // Ejemplo: 3 kW para residencial
    //                 const factorCapacidadEolica = 0.25; // 25% (muy dependiente del sitio)
    //                 const energiaAnualGeneradorWh = potenciaGeneradorEolicoWatts * 8760 * factorCapacidadEolica;
    //                 const numeroGeneradoresEolicos = Math.ceil((consumoAnualKWH * 1000) / energiaAnualGeneradorWh);
    //                 const costoPorKWEolicoUSD = 4500; // Estimado
    //                 const costoEstimadoEolicoUSD = (numeroGeneradoresEolicos * potenciaGeneradorEolicoWatts / 1000) * costoPorKWEolicoUSD;
    //                 const costoEstimadoEolicoCOP = costoEstimadoEolicoUSD * tasaUSDACOP;
    //                 const ahorroAnualPorKWHEolicoUSD = 0.18;
    //                 const ahorroAnualEstimadoEolicoUSD = consumoAnualKWH * ahorroAnualPorKWHEolicoUSD;
    //                 const ahorroAnualEstimadoEolicoCOP = ahorroAnualEstimadoEolicoUSD * tasaUSDACOP;

    //                 htmlResultados += `
    //                     <h3>Energía Eólica:</h3>
    //                     <p>Aerogeneradores recomendados: <strong>${numeroGeneradoresEolicos}</strong> (de ${potenciaGeneradorEolicoWatts/1000} kW c/u)</p>
    //                     <p>Costo estimado del sistema: <strong>$${costoEstimadoEolicoUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</strong> (aprox. <strong>${costoEstimadoEolicoCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>)</p>
    //                     <p>Ahorro anual estimado: <strong>$${ahorroAnualEstimadoEolicoUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</strong> (aprox. <strong>${ahorroAnualEstimadoEolicoCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>)</p>
    //                 `;
    //                 advertenciaAdicional = `<p class="texto-pequeno">La viabilidad eólica depende críticamente del viento en su ubicación. Se requiere un estudio de sitio detallado.</p>`;
    //                 break;

    //             case 'hidrogeno-verde':
    //                 htmlResultados += `
    //                     <h3>Hidrógeno Verde:</h3>
    //                     <p>Los sistemas de hidrógeno verde para uso residencial son aún experimentales y de alto costo. Actualmente, no ofrecemos una estimación simplificada para esta tecnología a nivel doméstico.</p>
    //                 `;
    //                 advertenciaAdicional = `<p class="texto-pequeno">El hidrógeno verde tiene un gran potencial futuro, especialmente para industria y almacenamiento a gran escala.</p>`;
    //                 break;

    //             default:
    //                 htmlResultados += '<p class="error" role="alert">Tipo de energía renovable no reconocido.</p>';
    //                 break;
    //         }
    //         resultadoCalculadora.innerHTML = htmlResultados + advertenciaAdicional;
    //         resultadoCalculadora.classList.remove('error', 'resultado-listo');
    //         resultadoCalculadora.classList.add('resultado-listo');


    //     });
    // }

    // // Fin Código Calculadora


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


    // Boton Flotante
    if (window.location.pathname.includes('index.html') && window.location.hash === '#seccion-calculadora') {
        setTimeout(() => {
            const seccionCalculadora = document.getElementById('seccion-calculadora');
            if (seccionCalculadora) {
                seccionCalculadora.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }

    // Fin Código Mapa




});
