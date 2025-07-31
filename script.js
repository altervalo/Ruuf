document.addEventListener('DOMContentLoaded', () => {
    // --- Efecto Parallax ---
    // Selecciona todos los elementos con la clase 'parallax-element' y 'parallax-bg'
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const parallaxBg = document.querySelector('.parallax-bg');

    // Función para aplicar el efecto parallax
    function applyParallax() {
        const scrollY = window.scrollY;

        // Parallax para el fondo de la sección hero
        if (parallaxBg) {
            // Ajusta la posición del fondo para crear el efecto
            // Cuanto menor sea el multiplicador, más lento se moverá el fondo
            parallaxBg.style.backgroundPositionY = `${-scrollY * 0.3}px`;
        }

        // Parallax para los elementos individuales (tarjetas de beneficios)
        parallaxElements.forEach(element => {
            // Obtiene la velocidad de parallax definida en el atributo data-parallax-speed
            const speed = parseFloat(element.dataset.parallaxSpeed);
            // Calcula el desplazamiento basado en la posición del scroll y la velocidad
            // Se resta element.offsetTop para que el efecto empiece cuando el elemento entra en la vista
            const offset = (scrollY - element.offsetTop + window.innerHeight / 2) * speed;

            // Aplica el desplazamiento usando la variable CSS --parallax-offset
            // Esto permite que CSS maneje la transición y la optimización del navegador
            element.style.setProperty('--parallax-offset', `${offset}px`);
        });
    }

    // Escucha el evento de scroll para actualizar el parallax
    window.addEventListener('scroll', applyParallax);

    // Llama a la función una vez al cargar la página para establecer la posición inicial
    applyParallax();

    // --- Smooth Scrolling para enlaces de navegación ---
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento de anclaje por defecto

            const targetId = this.getAttribute('href'); // Obtiene el ID del destino
            const targetElement = document.querySelector(targetId); // Selecciona el elemento destino

            if (targetElement) {
                // Calcula la posición a la que hacer scroll
                // Se resta la altura del header para que el contenido no quede oculto bajo él
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                // Realiza el scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
