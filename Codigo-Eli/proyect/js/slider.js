

// Variable para definir la diapositiva(.slide) inicial
let diapositivaActual = 1;
// Total de diapositivas(.slider-container)
const totalDiapositivas = 3;
//Función para ejecutar código JS con intervalo definido
setInterval(() => {
    // Suma de contador para pasar al siguiente diapositiva(.slide)
    diapositivaActual++;

    // Validador de slide, si llega al ultimo slide, asigna a al variable el 1
    if (diapositivaActual > totalDiapositivas) {
        diapositivaActual = 1;
    }

    // Cambiar estado del input, según el slide que esta cargando. Por defecto esta cargado el input 1
    document.getElementById(`slide${diapositivaActual}`).checked = true;

}, 7000); // Tiempo en segundos =  segundos
