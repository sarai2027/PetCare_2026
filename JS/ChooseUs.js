document.addEventListener("DOMContentLoaded", () => {
    const whyCards = document.querySelectorAll(".why-card");

    whyCards.forEach(card => {
        const iconBox = card.querySelector(".why-icon-box");
        const contentBox = card.querySelector(".why-content");

        card.addEventListener("mouseenter", () => {
            // El ícono crece de tamaño y se invierten los colores de forma fluida
            iconBox.style.transform = "scale(1.15)";
            iconBox.style.backgroundColor = "#7351e3";
            iconBox.style.color = "#ffffff";

            // El bloque de texto crece un 3% y se mueve sutilmente a la derecha
            contentBox.style.transform = "scale(1.03) translateX(5px)";
        });

        card.addEventListener("mouseleave", () => {
            // Todo vuelve a su estado natural
            iconBox.style.transform = "scale(1)";
            iconBox.style.backgroundColor = "#ede4fa";
            iconBox.style.color = "#7351e3";

            contentBox.style.transform = "scale(1) translateX(0px)";
        });
    });
});