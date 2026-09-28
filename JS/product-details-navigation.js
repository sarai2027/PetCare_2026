/* PetCare product details navigation.
   Uses the single infoprod.html page for every selected product. */
(function () {
    'use strict';

    const categoryKeys = {
        food: 'filter_food',
        accessories: 'filter_accessories',
        walk: 'filter_walk',
        bed: 'filter_bed',
        toys: 'filter_toys',
        luggage: 'filter_luggage',
        hygiene: 'filter_hygiene'
    };

    /* Correcciones locales de nombres cuya imagen no correspondía con el texto.
       No se modifica el archivo ni la lógica global de traducciones. */
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

    function currentLanguage() {
        return (localStorage.getItem('petcare_language') || localStorage.getItem('petcare_lang') || 'es') === 'en' ? 'en' : 'es';
    }

    function syncCorrectedCatalogNames() {
        const language = currentLanguage();
        Object.entries(correctedNames).forEach(([id, names]) => {
            const title = document.querySelector(`.product-card[data-id="${id}"] .product-title`);
            if (!title) return;
            title.removeAttribute('data-i18n');
            title.textContent = names[language];
        });
    }

    function extractProduct(card) {
        if (!card) return null;

        const image = card.querySelector('img');
        const title = card.querySelector('.product-title, .card-title');
        const priceNode = card.querySelector('.product-price, .price');
        const rawPrice = image?.dataset.price || card.dataset.price || priceNode?.textContent || '0';
        const category = image?.dataset.category || card.dataset.category || 'accessories';
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

    function openProductDetails(trigger) {
        const card = trigger.closest('.product-card');
        const product = extractProduct(card);
        if (!product || !product.id) return;

        try {
            sessionStorage.setItem('petcare_selected_product', JSON.stringify(product));
        } catch (_) {}

        const target = new URL('infoprod.html', window.location.href);
        target.searchParams.set('product', product.id);
        window.location.href = target.href;
    }

    syncCorrectedCatalogNames();
    window.addEventListener('petcare:languagechange', syncCorrectedCatalogNames);

    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-product-details]');
        if (!trigger) return;
        event.preventDefault();
        openProductDetails(trigger);
    });
})();
