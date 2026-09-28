/* PetCare Home: animations and cart helpers. Global theme/navigation live in shared.js. */
document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("active"));
    }

    // Keep home-page cart additions compatible with the global cart storage.
    document.querySelectorAll(".add-to-cart-btn, .btn-add-cart").forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".product-card, .deal-card");
            if (!card) return;
            const title = card.querySelector(".card-title, .deal-title")?.textContent.trim() || "Producto";
            const priceText = card.querySelector(".price, .new-price")?.textContent || "0";
            const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;
            const img = card.querySelector("img")?.getAttribute("src") || "";
            const id = card.dataset.id || ("home-" + title.toLowerCase().normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
            const cart = JSON.parse(localStorage.getItem("petcare_cart")) || [];
            const existing = cart.find(item => item.id === id || item.title === title);
            if (existing) existing.quantity = (existing.quantity || 1) + 1;
            else cart.push({ id, title, price, img, quantity: 1 });
            localStorage.setItem("petcare_cart", JSON.stringify(cart));
            const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            document.querySelectorAll(".cart-bubble").forEach(el => el.textContent = total);
            btn.classList.add("added");
            setTimeout(() => btn.classList.remove("added"), 350);
        });
    });

    const newsletterForm = document.querySelector('.news-form-pill');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!newsletterForm.checkValidity()) {
                newsletterForm.reportValidity();
                return;
            }
            const input = newsletterForm.querySelector('input[type="email"]');
            const email = input?.value.trim() || '';
            if (!email) return;
            localStorage.setItem('petcare_newsletter_email', email);
            const lang = (localStorage.getItem('petcare_language') || localStorage.getItem('petcare_lang') || 'es') === 'en' ? 'en' : 'es';
            alert(lang === 'en' ? 'Subscription saved successfully.' : 'Suscripción guardada correctamente.');
            newsletterForm.reset();
        });
    }
});
