// Inicio Código Calculadora

document.addEventListener('DOMContentLoaded', () => {
    const botonCalcular = document.getElementById('botonCalcular');
    const tipoEnergiaActualSelect = document.getElementById('tipoEnergiaActual');
    const consumoMensualInput = document.getElementById('consumoMensual');
    const zonaGeograficaSelect = document.getElementById('zonaGeografica');
    const tipoEnergiaRenovableSelect = document.getElementById('tipoEnergiaRenovable');
    const resultadoCalculadora = document.getElementById('resultadoCalculadora');
    const consumoMensualLabel = document.querySelector('label[for="consumoMensual"]');
    const consumoHelpText = document.getElementById('consumo-help');

    // Tasa de cambio USD a COP. **Es fundamental actualizarla regularmente.**
    const TASA_USD_A_COP = 4050; 

    // Conversión de Gas Natural (m³) a kWh térmicos.
    const KWH_POR_M3_GAS = 10;

    // Costos promedio de la energía en COP/kWh o COP/m³.
    const COSTO_PROMEDIO_KWH_ELECTRICIDAD_COP = 950;
    const COSTO_PROMEDIO_M3_GAS_COP = 1800;

    // Constantes para Energía Solar
    const POTENCIA_PANEL_WATTS = 550;

    const COSTO_POR_WP_SOLAR_USD = 1.1; // USD/Wp

    // Constantes para Energía Eólica (uso residencial pequeño)
    const POTENCIA_GENERADOR_EOLICO_WATTS_RESIDENCIAL = 5000;
    const FACTOR_CAPACIDAD_EOLICA = 0.28;
    
    const COSTO_POR_KW_EOLICO_USD = 5000; // Costo estimado del sistema eólico por kW en USD.

    // Horas Pico Solar (HPS) promedio por zona en Colombia (anual)
    const HORAS_PICO_SOL_POR_ZONA = {
        'andina': 4.5,
        'caribe': 5.5,
        'pacifica': 3.8,
        'orinoquia': 5.0,
        'amazonia': 4.0
    };

    // Actualiza la etiqueta y el placeholder del consumo mensual según el tipo de energía
    tipoEnergiaActualSelect.addEventListener('change', () => {
        const selectedType = tipoEnergiaActualSelect.value;
        if (selectedType === 'electricidad') {
            consumoMensualLabel.textContent = 'Consumo energético mensual actual (kWh):';
            consumoMensualInput.placeholder = 'Ej: 200';
            consumoHelpText.textContent = 'Introduce tu consumo aproximado mensual en kilovatios-hora.';
        } else if (selectedType === 'gas') {
            consumoMensualLabel.textContent = 'Consumo energético mensual actual (m³):';
            consumoMensualInput.placeholder = 'Ej: 50';
            consumoHelpText.textContent = 'Introduce tu consumo aproximado mensual en metros cúbicos de gas natural.';
        } else {
            // Si no se selecciona nada o se vuelve a la opción predeterminada
            consumoMensualLabel.textContent = 'Consumo energético mensual actual (kWh o m³):';
            consumoMensualInput.placeholder = 'Ej: 200 kWh';
            consumoHelpText.textContent = 'Introduce tu consumo aproximado mensual en tu energía actual.';
        }
    });

    if (botonCalcular) {
        botonCalcular.addEventListener('click', () => {
            const tipoConsumoActual = tipoEnergiaActualSelect.value;
            const consumoMensual = parseFloat(consumoMensualInput.value);
            const zona = zonaGeograficaSelect.value;
            const energiaRenovableSeleccionada = tipoEnergiaRenovableSelect.value;

            // Limpiar resultados anteriores y clases de estilo
            resultadoCalculadora.innerHTML = '<h2>Resultados de la Estimación:</h2><p>Ingresa tus datos para calcular tu ahorro potencial.</p>';
            resultadoCalculadora.classList.remove('alerta-error', 'alerta-exito', 'resultado-listo');

            // --- Validación de Entradas Mejorada ---
            if (!tipoConsumoActual) {
                displayError('Por favor, selecciona tu "Tipo de energía actual".');
                tipoEnergiaActualSelect.focus();
                return;
            }
            if (isNaN(consumoMensual) || consumoMensual <= 0) {
                displayError('Por favor, ingresa un "Consumo mensual válido" (un número mayor a cero).');
                consumoMensualInput.focus();
                return;
            }
            if (!zona) {
                displayError('Por favor, selecciona tu "Zona geográfica" para una estimación más precisa.');
                zonaGeograficaSelect.focus();
                return;
            }
            if (!energiaRenovableSeleccionada) {
                displayError('Por favor, selecciona el "Tipo de energía renovable" con el que quieres comparar.');
                tipoEnergiaRenovableSelect.focus();
                return;
            }

            // --- Cálculos de Consumo y Costo Actual ---
            let consumoAnualKWH = 0;
            let costoAnualActualCOP = 0;
            let advertenciaInicial = '';

            if (tipoConsumoActual === 'electricidad') {
                consumoAnualKWH = consumoMensual * 12; // Consumo total en kWh al año
                costoAnualActualCOP = consumoAnualKWH * COSTO_PROMEDIO_KWH_ELECTRICIDAD_COP;
            } else if (tipoConsumoActual === 'gas') {
                //Energía equivalente en kWh para comparación y se calcula el costo en COP.
                consumoAnualKWH = consumoMensual * 12 * KWH_POR_M3_GAS; // Consumo anual en kWh equivalente
                costoAnualActualCOP = consumoMensual * 12 * COSTO_PROMEDIO_M3_GAS_COP;
                advertenciaInicial = `<p class="texto-pequeno texto-advertencia">La estimación para Gas Natural es aproximada (1 m³ ≈ ${KWH_POR_M3_GAS} kWh térmicos). Los costos se basan en el consumo de m³.</p>`;
            }

            let htmlResultados = `<h3>Resultados de la Estimación:</h3>${advertenciaInicial}`;
            let advertenciaAdicional = '';

            // El ahorro anual potencial es lo que gastarías actualmente si no cambiara a renovables.
            const ahorroAnualEstimadoCOP = costoAnualActualCOP;

            // --- Lógica para cada tipo de Energía Renovable ---
            switch (energiaRenovableSeleccionada) {
                case 'solar':
                    const horasPicoSol = HORAS_PICO_SOL_POR_ZONA[zona] || HORAS_PICO_SOL_POR_ZONA['andina']; // Valor por defecto si la zona no es reconocida
                    const energiaNecesariaWhSolarDiaria = (consumoAnualKWH * 1000) / 365; // Wh diarios
                    const energiaPorPanelPorDiaWh = POTENCIA_PANEL_WATTS * horasPicoSol;
                    const numeroPaneles = Math.ceil(energiaNecesariaWhSolarDiaria / energiaPorPanelPorDiaWh);
                    const potenciaTotalSistemaSolarWatts = numeroPaneles * POTENCIA_PANEL_WATTS;
                    const costoEstimadoSolarUSD = (potenciaTotalSistemaSolarWatts / 1000) * COSTO_POR_WP_SOLAR_USD * 1000; // kWp * costo USD/Wp
                    const costoEstimadoSolarCOP = costoEstimadoSolarUSD * TASA_USD_A_COP;

                    htmlResultados += `
                        <h3>Energía Solar:</h3>
                        <p>Paneles solares recomendados: <strong>${numeroPaneles} paneles</strong> (de ${POTENCIA_PANEL_WATTS}Wp c/u)</p>
                        <p>Potencia total estimada del sistema: <strong>${(potenciaTotalSistemaSolarWatts / 1000).toFixed(2)} kWp</strong></p>
                        <p>Costo estimado del sistema: <strong>$${costoEstimadoSolarUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</strong> (aprox. <strong>${costoEstimadoSolarCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>)</p>
                        <p>Ahorro anual estimado: <strong>${ahorroAnualEstimadoCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></p>
                    `;
                    advertenciaAdicional = `<p class="texto-pequeno">Esta es una estimación general. Los costos y ahorros reales pueden variar significativamente según la ubicación exacta, la instalación, la calidad de los equipos y los incentivos fiscales locales. Recomendamos una asesoría personalizada.</p>`;
                    break;

                case 'eolica':
                    const energiaAnualGeneradorWh = POTENCIA_GENERADOR_EOLICO_WATTS_RESIDENCIAL * 8760 * FACTOR_CAPACIDAD_EOLICA;
                    const numeroGeneradoresEolicos = Math.ceil((consumoAnualKWH * 1000) / energiaAnualGeneradorWh);
                    const costoEstimadoEolicoUSD = (numeroGeneradoresEolicos * POTENCIA_GENERADOR_EOLICO_WATTS_RESIDENCIAL / 1000) * COSTO_POR_KW_EOLICO_USD;
                    const costoEstimadoEolicoCOP = costoEstimadoEolicoUSD * TASA_USD_A_COP;

                    htmlResultados += `
                        <h3>Energía Eólica:</h3>
                        <p>Aerogeneradores recomendados: <strong>${numeroGeneradoresEolicos}</strong> (de ${POTENCIA_GENERADOR_EOLICO_WATTS_RESIDENCIAL/1000} kW c/u)</p>
                        <p>Costo estimado del sistema: <strong>$${costoEstimadoEolicoUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</strong> (aprox. <strong>${costoEstimadoEolicoCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>)</p>
                        <p>Ahorro anual estimado: <strong>${ahorroAnualEstimadoCOP.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></p>
                    `;
                    advertenciaAdicional = `<p class="texto-pequeno">La viabilidad de la energía eólica depende críticamente de la velocidad y consistencia del viento en su ubicación. Se requiere un estudio de sitio detallado para determinar la factibilidad y la cantidad de aerogeneradores. Esta opción no es común para el hogar promedio.</p>`;
                    break;

                case 'hidrogeno-verde':
                    htmlResultados += `
                        <h3>Hidrógeno Verde:</h3>
                        <p>Los sistemas de hidrógeno verde para uso residencial son aún **experimentales, complejos y de alto costo**. Actualmente, no ofrecemos una estimación simplificada para esta tecnología a nivel doméstico.</p>
                    `;
                    advertenciaAdicional = `<p class="texto-pequeno">El hidrógeno verde tiene un gran potencial futuro para aplicaciones industriales, transporte pesado y almacenamiento de energía a gran escala, pero no es práctico para la mayoría de los hogares hoy en día.</p>`;
                    break;

                default:
                    displayError('Tipo de energía renovable no reconocido. Por favor, selecciona una opción válida.');
                    return;
            }

            resultadoCalculadora.innerHTML = htmlResultados + advertenciaAdicional;
            resultadoCalculadora.classList.add('alerta-exito'); // Estilo para resultados exitosos
            resultadoCalculadora.focus(); // Enfocar para accesibilidad
        });
    }

    // Función para mostrar mensajes de error
    function displayError(message) {
        resultadoCalculadora.innerHTML = `
            <p class="alerta-error" role="alert">
                ${message}
            </p>`;
        resultadoCalculadora.classList.add('alerta-error'); // Aplica estilo de error
        resultadoCalculadora.focus(); // Enfocar para accesibilidad
    }


});

// Fin Código Calculadora