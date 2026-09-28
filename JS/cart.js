document.addEventListener("DOMContentLoaded", () => {
    // 1. Elementos del DOM (Ajustados exactamente a tu HTML)
    const cartContainer = document.getElementById("cart-items-container");
    const totalAmountEl = document.getElementById("cart-total-price");

    // 2. Función Principal para Renderizar el Carrito
    function renderCart() {
        if (!cartContainer) return;

        const cart = JSON.parse(localStorage.getItem("petcare_cart")) || [];

        // Limpiar contenedor antes de rellenar
        cartContainer.innerHTML = "";

        // Si está vacío
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666; background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; margin-top: 15px;">
                    <h3>Your cart is empty. 🐾</h3>
                    <p>See our products again and add some of them</p>
                </div>
            `;
            updateTotal(0);
            return;
        }

        let totalGeneral = 0;

        // Recorrer los productos y generar las tarjetas exactas del diseño
        cart.forEach((item, index) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 1;
            totalGeneral += price * quantity;

            const cardHTML = `
                <div class="cart-card-item" style="
                    display: flex; 
                    align-items: center; 
                    background: #ffffff; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 30px; 
                    padding: 15px 25px; 
                    margin-bottom: 20px; 
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                    gap: 20px;
                ">
                    <div style="width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="${item.img}" alt="${item.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                    </div>

                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 5px 0; font-size: 1.15rem; font-weight: 700; color: #111827;">${item.title}</h3>
                        <div style="font-size: 1.25rem; font-weight: 800; color: #111827;">$${price.toFixed(2)}</div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="
                            background-color: #242038; 
                            color: #ffffff; 
                            padding: 8px 18px; 
                            border-radius: 20px; 
                            font-size: 0.95rem; 
                            font-weight: 600;
                        ">Cantidad</span>

                        <button class="btn-qty" data-index="${index}" data-action="decrease" style="
                            background: none; border: none; font-size: 1.4rem; font-weight: bold; cursor: pointer; color: #111827; padding: 0 5px;
                        ">-</button>

                        <div style="
                            border: 1px solid #d1d5db; 
                            border-radius: 20px; 
                            padding: 6px 18px; 
                            font-size: 1rem; 
                            font-weight: 700; 
                            min-width: 20px; 
                            text-align: center;
                        ">${quantity}</div>

                        <button class="btn-qty" data-index="${index}" data-action="increase" style="
                            background: none; border: none; font-size: 1.2rem; font-weight: bold; cursor: pointer; color: #111827; padding: 0 5px;
                        ">+</button>
                    </div>

                    <button class="btn-delete" data-index="${index}" style="
                        background: none; border: none; color: #ef4444; font-size: 1.1rem; cursor: pointer; margin-left: 10px;
                    " title="Eliminar producto">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;

            cartContainer.insertAdjacentHTML("beforeend", cardHTML);
        });

        updateTotal(totalGeneral);
    }

    // 3. Actualizar el Total en pantalla
    function updateTotal(total) {
        if (totalAmountEl) {
            totalAmountEl.textContent = `$${total.toFixed(2)}`;
        }
    }

    // 4. Escuchar los Clics de Restar (-), Sumar (+) y Eliminar
    if (cartContainer) {
        cartContainer.addEventListener("click", (e) => {
            let cart = JSON.parse(localStorage.getItem("petcare_cart")) || [];
            
            const qtyBtn = e.target.closest(".btn-qty");
            const deleteBtn = e.target.closest(".btn-delete");

            if (qtyBtn) {
                const index = parseInt(qtyBtn.dataset.index);
                const action = qtyBtn.dataset.action;

                if (action === "increase") {
                    cart[index].quantity += 1;
                } else if (action === "decrease") {
                    cart[index].quantity -= 1;
                    if (cart[index].quantity <= 0) {
                        cart.splice(index, 1);
                    }
                }

                localStorage.setItem("petcare_cart", JSON.stringify(cart));
                renderCart();
                if (typeof window.petcareSyncCartBadge === "function") window.petcareSyncCartBadge();
            }

            if (deleteBtn) {
                const index = parseInt(deleteBtn.dataset.index);
                cart.splice(index, 1);
                localStorage.setItem("petcare_cart", JSON.stringify(cart));
                renderCart();
                if (typeof window.petcareSyncCartBadge === "function") window.petcareSyncCartBadge();
            }
        });
    }

    // Ejecutar al cargar la página
    renderCart();
});