document.addEventListener('DOMContentLoaded', () => {
  // Preguntas Frecuentes

  
    // Inicializa la animación WOW.js (librería para animaciones al hacer scroll)
    new WOW().init();

    // Selecciona todos los elementos del documento con la clase 'pregunta'
    const preguntas = document.querySelectorAll('.pregunta');
    
    // actúa sobre cada elemento con la clase 'pregunta'
    preguntas.forEach(pregunta => {

        // Agrega un evento para escuchar el 'click' a cada pregunta
        pregunta.addEventListener('click', () => {

            // Selecciona el siguiente elemento con la clase 'respuesta'
            const respuesta = pregunta.nextElementSibling;

            // Obtiene el valor actual del atributo 'aria-expanded' y lo convierte a booleano
            const expanded = pregunta.getAttribute('aria-expanded') === 'true';

            // Cambia el valor del atributo 'aria-expanded' al opuesto (para accesibilidad)
            pregunta.setAttribute('aria-expanded', !expanded);
            // Muestra u oculta la respuesta dependiendo del estado actual
            respuesta.style.display = expanded ? 'none' : 'block';
        });
    });
    
});