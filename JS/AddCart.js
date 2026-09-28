document.addEventListener("DOMContentLoaded", () => {
    // 1. Escuchar clics en los botones "Add"
    document.addEventListener("click", (e) => {
        // Verificar si se hizo clic en un botón .btn-product o .btn de Add
        if (e.target && !e.target.closest("[data-pc-route]") &&
            (e.target.matches(".btn-product") || e.target.matches(".btn-cart") || e.target.textContent.trim().toLowerCase() === "add")) {
            e.preventDefault();

            // Encontrar la tarjeta padre
            const card = e.target.closest(".product-card, .product-box");
            if (!card) return;

            // Extraer información del producto
            const titleEl = card.querySelector(".product-title, h1");
            const priceEl = card.querySelector(".product-price, .price");
            const imgEl = card.querySelector("img.product-img");

            const product = {
                id: card.dataset.id || titleEl?.textContent.trim() || Date.now().toString(),
                title: titleEl ? titleEl.textContent.trim() : "Producto",
                price: priceEl ? parseFloat(priceEl.textContent.replace("$", "")) : parseFloat(card.dataset.price) || 0,
                img: imgEl ? imgEl.getAttribute("src") : "",
                quantity: Math.max(1, parseInt(card.querySelector(".quantity input")?.value || "1", 10))
            };

            // Guardar en localStorage
            addToCart(product);

            // Mostrar notificación Toast
            showToast(`¡${product.title} was Add!`);
        }
    });

    // Función para agregar al localStorage
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("petcare_cart")) || [];

        // Verificar si el producto ya existe para aumentar la cantidad
        const existingIndex = cart.findIndex(item => item.id === product.id || item.title === product.title);

        if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("petcare_cart", JSON.stringify(cart));
        updateCartBadge();
    }

    // Actualizar la burbuja del carrito en el Navbar
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem("petcare_cart")) || [];
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        document.querySelectorAll(".cart-bubble, .mobile-cart-badge").forEach(badge => {
            badge.textContent = totalItems;
        });
    }

    // Función para mostrar el mensaje flotante (Toast)
    function showToast(message) {
        let toastContainer = document.getElementById("toast-container");

        // Si no existe el contenedor de toasts, se crea dinámicamente
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.id = "toast-container";
            toastContainer.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999;";
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement("div");
        toast.className = "custom-toast";
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

        toastContainer.appendChild(toast);

        // Ocultar y remover después de 3 segundos
        setTimeout(() => {
            toast.classList.add("fade-out");
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Inicializar el badge al cargar la página
    updateCartBadge();
});