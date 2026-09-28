/* =====================================================
   PETCARE - INFORMACIÓN DE PRODUCTO
   Una sola página (infoprod.html) para todos los productos.
   ===================================================== */

(function () {
    'use strict';

    let selectedProduct = null;

    const categoryKeys = {
        food: 'filter_food',
        accessories: 'filter_accessories',
        walk: 'filter_walk',
        bed: 'filter_bed',
        toys: 'filter_toys',
        luggage: 'filter_luggage',
        hygiene: 'filter_hygiene'
    };

    const correctedNames = {
        'product-16': {
            es: 'Rueda rascadora interactiva de madera para gato',
            en: 'Interactive Wooden Cat Scratching Wheel'
        },
        'product-32': {
            es: 'Premios para gato de pollo, hígado y cerdo',
            en: 'Chicken, Liver & Pork Cat Treats'
        }
    };

    const categoryLabels = {
        es: {
            food: 'Comida', accessories: 'Accesorios', walk: 'Paseo', bed: 'Camas',
            toys: 'Juguetes', luggage: 'Equipaje', hygiene: 'Higiene'
        },
        en: {
            food: 'Food', accessories: 'Accessories', walk: 'Walk', bed: 'Beds',
            toys: 'Toys', luggage: 'Luggage', hygiene: 'Hygiene'
        }
    };

    const detailCopy = {
        es: {
            description: {
                food: 'Producto de alimentación seleccionado para complementar el cuidado diario de tu mascota.',
                accessories: 'Accesorio práctico seleccionado para hacer más cómodo el cuidado diario de tu mascota.',
                walk: 'Producto pensado para acompañar los paseos de tu mascota con comodidad y seguridad.',
                bed: 'Producto diseñado para ofrecer a tu mascota un espacio cómodo para descansar.',
                toys: 'Producto pensado para aportar entretenimiento y estimulación a tu mascota.',
                luggage: 'Producto diseñado para facilitar el transporte de tu mascota de forma cómoda y segura.',
                hygiene: 'Producto seleccionado para apoyar la higiene y el cuidado cotidiano de tu mascota.'
            },
            details: 'Este producto forma parte de la selección PetCare y corresponde exactamente al artículo que elegiste en nuestro catálogo.',
            feature1Title: 'Calidad seleccionada',
            feature1Text: 'Elegido para el cuidado diario',
            feature2Title: 'Para mascotas',
            feature2Text: 'Pensado para su bienestar y comodidad',
            detailItems: ['Producto para mascotas', 'Selección PetCare', 'Diseño funcional', 'Disponible para compra']
        },
        en: {
            description: {
                food: 'A food product selected to complement your pet’s daily care.',
                accessories: 'A practical accessory selected to make your pet’s daily care more convenient.',
                walk: 'A product designed to make your pet’s walks more comfortable and secure.',
                bed: 'A product designed to give your pet a comfortable place to rest.',
                toys: 'A product designed to provide entertainment and stimulation for your pet.',
                luggage: 'A product designed to make transporting your pet comfortable and secure.',
                hygiene: 'A product selected to support your pet’s everyday hygiene and care.'
            },
            details: 'This product is part of the PetCare selection and matches the exact item you chose from our catalog.',
            feature1Title: 'Selected quality',
            feature1Text: 'Chosen for everyday pet care',
            feature2Title: 'For pets',
            feature2Text: 'Designed for their wellbeing and comfort',
            detailItems: ['Pet product', 'PetCare selection', 'Functional design', 'Available for purchase']
        }
    };

    function currentLanguage() {
        return (localStorage.getItem('petcare_language') || localStorage.getItem('petcare_lang') || 'es') === 'en' ? 'en' : 'es';
    }

    function extractProduct(card) {
        if (!card) return null;

        const image = card.querySelector('.product-img, img');
        const title = card.querySelector('.product-title, .card-title');
        const priceNode = card.querySelector('.product-price, .price');
        const category = image?.dataset.category || card.dataset.category || 'accessories';
        const rawPrice = image?.dataset.price || card.dataset.price || priceNode?.textContent || '0';

        const id = card.dataset.id || '';
        const localNames = correctedNames[id] || null;

        return {
            id,
            name: localNames ? localNames[currentLanguage()] : (title?.textContent.trim() || 'Producto PetCare'),
            nameKey: localNames ? '' : (title?.dataset.i18n || ''),
            names: localNames,
            image: image?.getAttribute('src') || '',
            price: parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0,
            category,
            categoryKey: categoryKeys[category] || 'filter_accessories'
        };
    }

    async function resolveSelectedProduct() {
        const requestedId = new URLSearchParams(window.location.search).get('product');
        if (!requestedId) return null;

        try {
            const saved = JSON.parse(sessionStorage.getItem('petcare_selected_product') || 'null');
            if (saved && saved.id === requestedId) return saved;
        } catch (_) {}

        /* Fallback: read the catalog itself so there is still only one detail page
           and no duplicated HTML page per product. */
        try {
            const response = await fetch('productos.html', { cache: 'no-store' });
            if (!response.ok) return null;
            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const card = doc.querySelector(`.product-card[data-id="${requestedId}"]`);
            const product = extractProduct(card);
            if (product) {
                sessionStorage.setItem('petcare_selected_product', JSON.stringify(product));
                return product;
            }
        } catch (_) {}

        return null;
    }

    function setDynamicText(element, value) {
        if (!element) return;
        element.removeAttribute('data-i18n');
        element.textContent = value;
    }

    function applySelectedProduct(product) {
        selectedProduct = product;
        if (!product) return;

        document.body.dataset.productId = product.id;

        const mainImage = document.querySelector('.product-image-container .product-img');
        const title = document.querySelector('.product-info h1');
        const price = document.querySelector('.product-info .price');
        const category = document.querySelector('.product-info .category');
        const breadcrumbCategory = document.querySelector('.breadcrumb-petcare span');

        if (mainImage) {
            mainImage.src = product.image;
            mainImage.alt = product.name;
            mainImage.removeAttribute('data-i18n');
        }

        if (title) {
            title.textContent = product.names ? product.names[currentLanguage()] : product.name;
            if (product.nameKey) title.dataset.i18n = product.nameKey;
            else title.removeAttribute('data-i18n');
        }

        if (price) price.textContent = `$${Number(product.price).toFixed(2)}`;

        const categoryKey = product.categoryKey || categoryKeys[product.category] || 'filter_accessories';
        const fallbackCategory = categoryLabels[currentLanguage()][product.category] || categoryLabels[currentLanguage()].accessories;

        [category, breadcrumbCategory].forEach((element) => {
            if (!element) return;
            element.dataset.i18n = categoryKey;
            element.textContent = fallbackCategory;
        });

        document.querySelectorAll('#productCarousel .carousel-item img').forEach((image) => {
            image.src = product.image;
            image.alt = product.name;
            image.removeAttribute('data-i18n');
        });

        updateDynamicCopy();
        updateFavoriteButton();
        document.title = `${product.name} | PetCare`;
    }

    function updateDynamicCopy() {
        if (!selectedProduct) return;

        const language = currentLanguage();
        const copy = detailCopy[language];
        const category = selectedProduct.category in copy.description ? selectedProduct.category : 'accessories';

        setDynamicText(document.querySelector('.product-description'), copy.description[category]);
        setDynamicText(document.querySelector('.details-card > p'), copy.details);

        const features = document.querySelectorAll('.features .feature');
        if (features[0]) {
            setDynamicText(features[0].querySelector('strong'), copy.feature1Title);
            setDynamicText(features[0].querySelector('span'), copy.feature1Text);
        }
        if (features[1]) {
            setDynamicText(features[1].querySelector('strong'), copy.feature2Title);
            setDynamicText(features[1].querySelector('span'), copy.feature2Text);
        }

        document.querySelectorAll('.details-card .detail-grid strong').forEach((element, index) => {
            if (copy.detailItems[index]) setDynamicText(element, copy.detailItems[index]);
        });

        const title = document.querySelector('.product-info h1');
        if (title && selectedProduct.names) {
            title.removeAttribute('data-i18n');
            title.textContent = selectedProduct.names[language];
        }
        if (title?.textContent.trim()) document.title = `${title.textContent.trim()} | PetCare`;
    }

    function updateCartBubble() {
        let cart = [];
        try { cart = JSON.parse(localStorage.getItem('petcare_cart') || '[]'); } catch (_) {}
        const total = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
        document.querySelectorAll('#cartCount, .cart-bubble').forEach((element) => {
            element.textContent = total;
        });
    }

    function addSelectedProductToCart() {
        if (!selectedProduct) return;

        const quantityInput = document.querySelector('.quantity input');
        const quantity = Math.max(1, parseInt(quantityInput?.value, 10) || 1);
        const visibleName = document.querySelector('.product-info h1')?.textContent.trim() || selectedProduct.name;

        let cart = [];
        try { cart = JSON.parse(localStorage.getItem('petcare_cart') || '[]'); } catch (_) {}

        const existing = cart.find((item) => item.id === selectedProduct.id);
        if (existing) {
            existing.quantity = (Number(existing.quantity) || 0) + quantity;
            existing.title = visibleName;
            existing.price = selectedProduct.price;
            existing.img = selectedProduct.image;
        } else {
            cart.push({
                id: selectedProduct.id,
                title: visibleName,
                price: selectedProduct.price,
                img: selectedProduct.image,
                quantity
            });
        }

        localStorage.setItem('petcare_cart', JSON.stringify(cart));
        updateCartBubble();
    }

    function updateFavoriteButton() {
        const button = document.querySelector('.btn-favorite');
        if (!button || !selectedProduct) return;

        let favorites = [];
        try { favorites = JSON.parse(localStorage.getItem('petcareFavorites') || '[]'); } catch (_) {}
        const active = favorites.some((item) => item.id === selectedProduct.id);
        button.classList.toggle('active', active);

        const icon = button.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-solid', active);
            icon.classList.toggle('fa-regular', !active);
        }
    }

    function toggleSelectedFavorite() {
        if (!selectedProduct) return;

        let favorites = [];
        try { favorites = JSON.parse(localStorage.getItem('petcareFavorites') || '[]'); } catch (_) {}

        const index = favorites.findIndex((item) => item.id === selectedProduct.id);
        if (index >= 0) {
            favorites.splice(index, 1);
        } else {
            const language = currentLanguage();
            const visibleName = document.querySelector('.product-info h1')?.textContent.trim() || selectedProduct.name;
            const category = categoryLabels[language][selectedProduct.category] || categoryLabels[language].accessories;
            favorites.push({
                id: selectedProduct.id,
                name: visibleName,
                category,
                description: detailCopy[language].description[selectedProduct.category] || detailCopy[language].description.accessories,
                price: selectedProduct.price,
                image: selectedProduct.image,
                img: selectedProduct.image,
                title: visibleName,
                rating: 5,
                reviews: 0
            });
        }

        localStorage.setItem('petcareFavorites', JSON.stringify(favorites));
        updateFavoriteButton();
    }

    function initAnimations() {
        const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
        if (!('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('show'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        elements.forEach((element) => observer.observe(element));
    }

    function initQuantity() {
        const quantity = document.querySelector('.quantity');
        if (!quantity) return;
        const input = quantity.querySelector('input');
        const buttons = quantity.querySelectorAll('button');
        if (!input || buttons.length < 2) return;

        buttons[0].addEventListener('click', () => {
            const value = parseInt(input.value, 10) || 1;
            if (value > 1) input.value = value - 1;
        });

        buttons[1].addEventListener('click', () => {
            const value = parseInt(input.value, 10) || 1;
            input.value = value + 1;
        });
    }


    function initColorOptions() {
        const buttons = Array.from(document.querySelectorAll('.color-circle'));
        if (!buttons.length) return;

        buttons.forEach((button, index) => {
            button.type = 'button';
            button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
            if (index === 0) button.style.boxShadow = '0 0 0 3px rgba(36, 32, 56, 0.35)';

            button.addEventListener('click', () => {
                buttons.forEach((item) => {
                    item.setAttribute('aria-pressed', 'false');
                    item.style.boxShadow = '';
                });
                button.setAttribute('aria-pressed', 'true');
                button.style.boxShadow = '0 0 0 3px rgba(36, 32, 56, 0.35)';
            });
        });
    }

    function initRelatedProducts() {
        document.querySelectorAll('[data-related-product]').forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.dataset.relatedProduct;
                if (!id) return;
                const target = new URL('infoprod.html', window.location.href);
                target.searchParams.set('product', id);
                window.location.href = target.href;
            });
        });
    }

    document.addEventListener('DOMContentLoaded', async () => {
        initAnimations();
        initQuantity();
        initColorOptions();
        initRelatedProducts();

        const product = await resolveSelectedProduct();
        if (product) {
            applySelectedProduct(product);
            if (typeof window.setLanguage === 'function') {
                window.setLanguage(currentLanguage());
            }
        }

        document.querySelector('.btn-cart')?.addEventListener('click', addSelectedProductToCart);
        document.querySelector('.btn-favorite')?.addEventListener('click', toggleSelectedFavorite);
        updateCartBubble();
    });

    window.addEventListener('petcare:languagechange', () => {
        updateDynamicCopy();
        updateFavoriteButton();
    });
})();
