document.addEventListener("DOMContentLoaded", () => {
    // Configuración del observador
    const observerOptions = {
        root: null, // Usa el viewport del navegador
        rootMargin: "0px",
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que activa la animación CSS
                entry.target.classList.add("active");
                
                // Si solo quieres que se anime una vez, dejas de observarlo:
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Selecciona todos los elementos con la clase .reveal
    const elementosAnimados = document.querySelectorAll(".reveal");
    elementosAnimados.forEach(elemento => observer.observe(elemento));
});