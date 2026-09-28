document.addEventListener("DOMContentLoaded", () => {
    const productsGrid = document.querySelector(".products-grid") || document.querySelector(".cards");
    
    if (!productsGrid) return;

    // Guardamos las tarjetas en un array y preservamos su orden original de HTML
    const productCards = Array.from(productsGrid.querySelectorAll(".product-card"));
    const originalOrder = [...productCards]; // Copia de respaldo para el precio "Default"
    const noResultsMsg = document.getElementById("no-results-msg");

    // Estados de filtros activos
    let currentCategory = "all";
    let currentAvailability = "all";
    let currentPriceOrder = "default";
    const normalizeSearch = (value) => String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    const currentSearch = normalizeSearch(new URLSearchParams(window.location.search).get("q"));

    // 1. Mover datos data-* desde la <img> hacia el contenedor .product-card
    productCards.forEach((card) => {
        const img = card.querySelector("img.product-img");
        if (img) {
            card.dataset.category = (img.dataset.category || "all").toLowerCase().trim();
            card.dataset.availability = (img.dataset.availability || "all").toLowerCase().trim();
            card.dataset.price = parseFloat(img.dataset.price) || 0;
        }
    });

    // 2. Función principal de Filtrado y Ordenamiento
    function updateProducts() {
        let visibleCards = [];

        // --- A. FILTRAR POR CATEGORÍA Y DISPONIBILIDAD ---
        productCards.forEach((card) => {
            const cat = card.dataset.category;
            const avail = card.dataset.availability;

            const matchesCat = (currentCategory === "all" || cat === currentCategory);
            const matchesAvail = (currentAvailability === "all" || avail === currentAvailability);

            const title = card.querySelector(".product-title");
            const image = card.querySelector("img.product-img");
            const key = title?.dataset.i18n || "";
            const dictionaries = window.PetCareI18n || {};
            const searchableText = normalizeSearch([
                title?.textContent,
                image?.alt,
                image?.dataset.category,
                key && dictionaries.es?.[key],
                key && dictionaries.en?.[key]
            ].filter(Boolean).join(" "));
            const matchesSearch = !currentSearch || searchableText.includes(currentSearch);

            if (matchesCat && matchesAvail && matchesSearch) {
                card.style.setProperty("display", "flex", "important");
                visibleCards.push(card);
            } else {
                card.style.setProperty("display", "none", "important");
            }
        });

        // --- B. ORDENAR POR PRECIO ---
        if (currentPriceOrder === "low-to-high") {
            // De menor a mayor
            visibleCards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        } else if (currentPriceOrder === "high-to-low") {
            // De mayor a menor
            visibleCards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        } else if (currentPriceOrder === "default") {
            // Respetar el orden original del HTML
            visibleCards.sort((a, b) => originalOrder.indexOf(a) - originalOrder.indexOf(b));
        }

        // --- C. REORGANIZAR EN EL DOM Y MOSTRAR ESTADO ---
        visibleCards.forEach((card) => productsGrid.appendChild(card));

        if (noResultsMsg) {
            noResultsMsg.style.display = visibleCards.length === 0 ? "block" : "none";
        }
    }

    // Aplicar también la búsqueda enviada desde el header (?q=...).
    updateProducts();

    // 3. Listener único para TODOS los filtros (Categoría, Disponibilidad y Precio)
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const type = btn.dataset.type; // "category", "availability" o "price"
            const value = (btn.dataset.value || "all").toLowerCase().trim();

            if (type === "category") currentCategory = value;
            if (type === "availability") currentAvailability = value;
            if (type === "price") currentPriceOrder = value;

            updateProducts();
        });
    });
});