document.addEventListener("DOMContentLoaded", function(){

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


  // Cambiar fondo del navbar al hacer scroll
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('mainNavbar');
        if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        } else {
        navbar.classList.remove('navbar-scrolled');
        }
    });


    // 1. Funcionalidad del carrusel (específico para inicio.html)
    const carruselHero = document.querySelector('.carrusel-hero');
    if (carruselHero) {
        let indiceDiapositiva = 1;
        const diapositivas = document.getElementsByClassName("diapositiva");
        const puntos = document.getElementsByClassName("punto");

        function mostrarDiapositivas(n) {
            if (diapositivas.length === 0) return;

            if (n > diapositivas.length) { indiceDiapositiva = 1; }
            if (n < 1) { indiceDiapositiva = diapositivas.length; }

            for (let i = 0; i < diapositivas.length; i++) {
                diapositivas[i].style.opacity = "0";
                diapositivas[i].style.zIndex = "0";
                if (diapositivas[i].querySelector('h1')) diapositivas[i].querySelector('h1').classList.remove('animate__fadeInUp');
                if (diapositivas[i].querySelector('p')) diapositivas[i].querySelector('p').classList.remove('animate__fadeInUp');
                if (diapositivas[i].querySelector('.boton')) diapositivas[i].querySelector('.boton').classList.remove('animate__fadeInUp');

            }

            for (let i = 0; i < puntos.length; i++) {
                puntos[i].className = puntos[i].className.replace(" activo", "");
            }

            diapositivas[indiceDiapositiva - 1].style.opacity = "1";
            diapositivas[indiceDiapositiva - 1].style.zIndex = "1";
             // Re-activar animación para la diapositiva actual
            if (diapositivas[indiceDiapositiva - 1].querySelector('h1')) diapositivas[indiceDiapositiva - 1].querySelector('h1').classList.add('animate__fadeInUp');
            if (diapositivas[indiceDiapositiva - 1].querySelector('p')) diapositivas[indiceDiapositiva - 1].querySelector('p').classList.add('animate__fadeInUp');
            if (diapositivas[indiceDiapositiva - 1].querySelector('.boton')) diapositivas[indiceDiapositiva - 1].querySelector('.boton').classList.add('animate__fadeInUp');


            puntos[indiceDiapositiva - 1].className += " activo";
        }

        window.diapositivaSiguiente = function(n) {
            mostrarDiapositivas(indiceDiapositiva += n);
        };
        window.diapositivaActual = function(n) {
            mostrarDiapositivas(indiceDiapositiva = n);
        };

        mostrarDiapositivas(indiceDiapositiva);
        setInterval(() => {
            window.diapositivaSiguiente(1);
        }, 7000); // Aumentado el intervalo para dar tiempo a leer
    }


});