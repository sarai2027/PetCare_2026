/* Product details modal requested for PetCare product cards.
   This file intentionally does not alter voice commands, screen reader logic, or the global translator. */
(function () {
  'use strict';

  const CART_KEY = 'petcare_cart';
  const FAVORITES_KEY = 'petcareFavorites';

  const categoryCopy = {
    es: {
      food: 'Alimento seleccionado para apoyar la nutrición y el bienestar diario de tu mascota.',
      toys: 'Juguete pensado para mantener a tu mascota entretenida, activa y estimulada.',
      bed: 'Producto de descanso diseñado para brindar comodidad y un espacio agradable a tu mascota.',
      accessories: 'Accesorio práctico para hacer más cómodo y sencillo el cuidado diario de tu mascota.',
      luggage: 'Solución de transporte pensada para mover a tu mascota de forma cómoda y segura.',
      hygiene: 'Producto de higiene y cuidado para mantener a tu mascota limpia y bien atendida.',
      walk: 'Accesorio de paseo diseñado para acompañar a tu mascota con comodidad y control.',
      default: 'Producto PetCare seleccionado para el cuidado, comodidad y bienestar de tu mascota.'
    },
    en: {
      food: 'Selected food product to support your pet’s daily nutrition and well-being.',
      toys: 'Toy designed to keep your pet entertained, active, and stimulated.',
      bed: 'Rest product designed to give your pet a comfortable and pleasant space.',
      accessories: 'Practical accessory that makes everyday pet care easier and more comfortable.',
      luggage: 'Pet transport solution designed for comfortable and safer travel.',
      hygiene: 'Hygiene and grooming product to help keep your pet clean and cared for.',
      walk: 'Walking accessory designed to give your pet comfort and control on outings.',
      default: 'PetCare product selected for your pet’s care, comfort, and well-being.'
    }
  };

  const labels = {
    es: {
      details: 'Detalles del producto', category: 'Categoría', quantity: 'Cantidad', add: 'Agregar al carrito',
      favorite: 'Agregar a favoritos', unfavorite: 'Quitar de favoritos', close: 'Cerrar', added: 'Producto agregado al carrito',
      categories: { food: 'Comida', toys: 'Juguetes', bed: 'Camas', accessories: 'Accesorios', luggage: 'Equipaje', hygiene: 'Higiene', walk: 'Paseo', default: 'Productos' }
    },
    en: {
      details: 'Product details', category: 'Category', quantity: 'Quantity', add: 'Add to cart',
      favorite: 'Add to favorites', unfavorite: 'Remove from favorites', close: 'Close', added: 'Product added to cart',
      categories: { food: 'Food', toys: 'Toys', bed: 'Beds', accessories: 'Accessories', luggage: 'Carriers', hygiene: 'Hygiene', walk: 'Walking', default: 'Products' }
    }
  };

  function language() {
    return (localStorage.getItem('petcare_language') || localStorage.getItem('petcare_lang') || document.documentElement.lang || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  }

  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) { return []; }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function normalizeId(value) {
    return 'product-' + String(value || 'item').toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function extractProduct(card) {
    const image = card.querySelector('img.product-img, img.card-img-top, img.deal-img, img');
    const title = card.querySelector('.product-title, .card-title, .deal-title, h3, h4')?.textContent.trim() || 'Producto';
    const priceEl = card.querySelector('.product-price, .price, .new-price');
    const rawPrice = priceEl?.textContent || card.dataset.price || image?.dataset.price || '0';
    const price = parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0;
    const category = image?.dataset.category || card.dataset.category || 'default';
    const id = card.dataset.id || normalizeId(title);
    const stars = card.querySelectorAll('.fa-star.fa-solid, .fa-solid.fa-star').length || 5;
    return {
      id,
      title,
      price,
      img: image?.getAttribute('src') || '',
      category,
      rating: Math.min(5, Math.max(0, stars)),
      quantity: 1
    };
  }

  function createModal() {
    if (document.getElementById('pc-product-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'pc-product-modal';
    modal.className = 'pc-product-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="pc-product-modal__backdrop" data-pc-modal-close></div>
      <section class="pc-product-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="pc-product-modal-title">
        <button type="button" class="pc-product-modal__close" data-pc-modal-close aria-label="Cerrar"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        <div class="pc-product-modal__media"><img id="pc-product-modal-image" alt=""></div>
        <div class="pc-product-modal__content">
          <span class="pc-product-modal__eyebrow" id="pc-product-modal-heading"></span>
          <h2 id="pc-product-modal-title"></h2>
          <div class="pc-product-modal__rating" id="pc-product-modal-rating" aria-label="5 estrellas"></div>
          <div class="pc-product-modal__price" id="pc-product-modal-price"></div>
          <p class="pc-product-modal__description" id="pc-product-modal-description"></p>
          <p class="pc-product-modal__category"><strong id="pc-product-modal-category-label"></strong> <span id="pc-product-modal-category"></span></p>
          <div class="pc-product-modal__actions-row">
            <div class="pc-product-modal__qty" aria-label="Cantidad">
              <button type="button" data-pc-qty-minus aria-label="Reducir cantidad">−</button>
              <input id="pc-product-modal-qty" type="number" min="1" max="99" value="1" inputmode="numeric">
              <button type="button" data-pc-qty-plus aria-label="Aumentar cantidad">+</button>
            </div>
            <button type="button" class="pc-product-modal__favorite" id="pc-product-modal-favorite"></button>
          </div>
          <button type="button" class="pc-product-modal__cart" id="pc-product-modal-add"></button>
          <div class="pc-product-modal__message" id="pc-product-modal-message" role="status" aria-live="polite"></div>
        </div>
      </section>`;
    document.body.appendChild(modal);
  }

  let currentProduct = null;
  let previousFocus = null;

  function favoriteExists(id) {
    return readJson(FAVORITES_KEY).some(item => item.id === id);
  }

  function syncFavoriteButton() {
    if (!currentProduct) return;
    const lang = language();
    const button = document.getElementById('pc-product-modal-favorite');
    const active = favoriteExists(currentProduct.id);
    button.classList.toggle('active', active);
    button.innerHTML = `<i class="${active ? 'fa-solid' : 'fa-regular'} fa-heart" aria-hidden="true"></i><span>${active ? labels[lang].unfavorite : labels[lang].favorite}</span>`;
  }

  function openModal(product, trigger) {
    createModal();
    currentProduct = product;
    previousFocus = trigger || document.activeElement;
    const lang = language();
    const t = labels[lang];
    const modal = document.getElementById('pc-product-modal');

    document.getElementById('pc-product-modal-heading').textContent = t.details;
    document.getElementById('pc-product-modal-title').textContent = product.title;
    document.getElementById('pc-product-modal-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('pc-product-modal-description').textContent = (categoryCopy[lang][product.category] || categoryCopy[lang].default);
    document.getElementById('pc-product-modal-category-label').textContent = `${t.category}:`;
    document.getElementById('pc-product-modal-category').textContent = t.categories[product.category] || t.categories.default;
    document.getElementById('pc-product-modal-add').innerHTML = `<i class="fa-solid fa-cart-shopping" aria-hidden="true"></i><span>${t.add}</span>`;
    document.getElementById('pc-product-modal-qty').value = '1';
    document.getElementById('pc-product-modal-message').textContent = '';

    const image = document.getElementById('pc-product-modal-image');
    image.src = product.img;
    image.alt = product.title;

    const rating = document.getElementById('pc-product-modal-rating');
    rating.innerHTML = Array.from({ length: 5 }, (_, i) => `<i class="fa-${i < product.rating ? 'solid' : 'regular'} fa-star" aria-hidden="true"></i>`).join('');
    rating.setAttribute('aria-label', `${product.rating} / 5`);

    modal.querySelector('[data-pc-modal-close]').setAttribute('aria-label', t.close);
    syncFavoriteButton();
    modal.hidden = false;
    document.body.classList.add('pc-modal-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    modal.querySelector('.pc-product-modal__close').focus();
  }

  function closeModal() {
    const modal = document.getElementById('pc-product-modal');
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('pc-modal-open');
    setTimeout(() => { modal.hidden = true; }, 160);
    previousFocus?.focus?.();
  }

  function addToCart() {
    if (!currentProduct) return;
    const quantityInput = document.getElementById('pc-product-modal-qty');
    const quantity = Math.min(99, Math.max(1, parseInt(quantityInput.value, 10) || 1));
    quantityInput.value = String(quantity);
    const cart = readJson(CART_KEY);
    const existing = cart.find(item => item.id === currentProduct.id);
    if (existing) existing.quantity = (parseInt(existing.quantity, 10) || 0) + quantity;
    else cart.push({ id: currentProduct.id, title: currentProduct.title, price: currentProduct.price, img: currentProduct.img, quantity });
    writeJson(CART_KEY, cart);

    const total = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 0), 0);
    document.querySelectorAll('.cart-bubble, .mobile-cart-badge').forEach(el => { el.textContent = total; });
    document.getElementById('pc-product-modal-message').textContent = labels[language()].added;
  }

  function toggleFavorite() {
    if (!currentProduct) return;
    const favorites = readJson(FAVORITES_KEY);
    const index = favorites.findIndex(item => item.id === currentProduct.id);
    if (index >= 0) favorites.splice(index, 1);
    else favorites.push({
      id: currentProduct.id,
      name: currentProduct.title,
      title: currentProduct.title,
      category: currentProduct.category,
      description: categoryCopy[language()][currentProduct.category] || categoryCopy[language()].default,
      price: currentProduct.price,
      image: currentProduct.img,
      img: currentProduct.img,
      rating: currentProduct.rating,
      reviews: 0
    });
    writeJson(FAVORITES_KEY, favorites);
    syncFavoriteButton();
    const active = favoriteExists(currentProduct.id);
    document.querySelectorAll('[data-favorite-toggle]').forEach(button => {
      if (button.dataset.favoriteId === currentProduct.id) {
        button.classList.toggle('active', active);
        button.innerHTML = active
          ? '<i class="fa-solid fa-heart" aria-hidden="true"></i>'
          : '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
      }
    });
  }

  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('[data-product-details], .products-grid .btn-view');
    if (trigger) {
      const card = trigger.closest('.product-card, .product-box, .deal-card');
      if (!card) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openModal(extractProduct(card), trigger);
      return;
    }

    if (event.target.closest('[data-pc-modal-close]')) {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.target.closest('[data-pc-qty-minus]')) {
      const input = document.getElementById('pc-product-modal-qty');
      input.value = String(Math.max(1, (parseInt(input.value, 10) || 1) - 1));
      return;
    }
    if (event.target.closest('[data-pc-qty-plus]')) {
      const input = document.getElementById('pc-product-modal-qty');
      input.value = String(Math.min(99, (parseInt(input.value, 10) || 1) + 1));
      return;
    }
    if (event.target.closest('#pc-product-modal-add')) { addToCart(); return; }
    if (event.target.closest('#pc-product-modal-favorite')) { toggleFavorite(); }
  }, true);

  document.addEventListener('keydown', function (event) {
    const modal = document.getElementById('pc-product-modal');
    if (!modal || modal.hidden) return;
    if (event.key === 'Escape') closeModal();
  });
})();
