(function () {
  'use strict';

  const STORAGE = {
    language: 'petcare_language',
    legacyLanguage: 'petcare_lang',
    theme: 'petcare_theme',
    accessibility: 'petcare_accessibility',
    voice: 'petcare_voice_control',
    reader: 'petcare_screen_reader'
  };

  const copy = {
    en: {
      accessibility: 'Accessibility', language: 'Language', theme: 'Theme', light: 'Light', dark: 'Dark',
      textSize: 'Text size', smaller: 'Smaller text', larger: 'Larger text', keyboard: 'Keyboard navigation',
      screenReader: 'Screen reader', voice: 'Voice control', highContrast: 'High contrast', colorLabels: 'Color names on products', close: 'Close accessibility menu',
      english: 'English', spanish: 'Spanish', settings: 'Settings', favorites: 'Favorites',
      filteredDog: 'Showing products suitable for dogs', filteredCat: 'Showing products suitable for cats',
      filteredBird: 'Showing products suitable for birds', filteredHamster: 'Showing products suitable for hamsters', clearFilter: 'Show all products',
      hamster: 'Hamsters', videoUnsupported: 'Your browser does not support video playback.'
    },
    es: {
      accessibility: 'Accesibilidad', language: 'Idioma', theme: 'Tema', light: 'Claro', dark: 'Oscuro',
      textSize: 'Tamaño del texto', smaller: 'Texto más pequeño', larger: 'Texto más grande', keyboard: 'Navegación con teclado',
      screenReader: 'Lector de pantalla', voice: 'Control por voz', highContrast: 'Alto contraste', colorLabels: 'Nombres de color en productos', close: 'Cerrar menú de accesibilidad',
      english: 'Inglés', spanish: 'Español', settings: 'Configuración', favorites: 'Favoritos',
      filteredDog: 'Mostrando productos adecuados para perros', filteredCat: 'Mostrando productos adecuados para gatos',
      filteredBird: 'Mostrando productos adecuados para aves', filteredHamster: 'Mostrando productos adecuados para hámsteres', clearFilter: 'Mostrar todos los productos',
      hamster: 'Hámsteres', videoUnsupported: 'Tu navegador no soporta la reproducción de videos.'
    }
  };

  const exactText = {
    'Correo electrónico': { en: 'Email address', es: 'Correo electrónico' },
    'Contraseña': { en: 'Password', es: 'Contraseña' },
    'Recuérdame': { en: 'Remember me', es: 'Recuérdame' },
    '¿Olvidaste tu contraseña?': { en: 'Forgot your password?', es: '¿Olvidaste tu contraseña?' },
    'Iniciar sesión': { en: 'Sign in', es: 'Iniciar sesión' },
    'O inicia sesión con': { en: 'Or sign in with', es: 'O inicia sesión con' },
    '¿No tienes cuenta?': { en: "Don't have an account?", es: '¿No tienes cuenta?' },
    'Regístrate aquí': { en: 'Sign up here', es: 'Regístrate aquí' },
    'Crear cuenta': { en: 'Create account', es: 'Crear cuenta' },
    'Únete a nuestra comunidad de amantes de mascotas': { en: 'Join our community of pet lovers', es: 'Únete a nuestra comunidad de amantes de mascotas' },
    'Nombre completo': { en: 'Full name', es: 'Nombre completo' },
    '¿Ya tienes cuenta?': { en: 'Already have an account?', es: '¿Ya tienes cuenta?' },
    'Inicia sesión aquí': { en: 'Sign in here', es: 'Inicia sesión aquí' },
    'Información legal': { en: 'Legal information', es: 'Información legal' },
    'Consulta las condiciones, privacidad, derechos de clientes y garantía de nuestros productos.': { en: 'Review our terms, privacy policy, customer rights, and product warranty.', es: 'Consulta las condiciones, privacidad, derechos de clientes y garantía de nuestros productos.' },
    'Política de privacidad': { en: 'Privacy policy', es: 'Política de privacidad' },
    'Garantía de los productos': { en: 'Product warranty', es: 'Garantía de los productos' },
    'Carrito de Compras': { en: 'Shopping Cart', es: 'Carrito de Compras' },
    'Select Language / Idioma': { en: 'Select Language', es: 'Seleccionar idioma' },
    'English (UK)': { en: 'English', es: 'Inglés' },
    'Español (ES)': { en: 'Spanish', es: 'Español' },
    'Tu navegador no soporta la reproducción de videos.': { en: 'Your browser does not support video playback.', es: 'Tu navegador no soporta la reproducción de videos.' }
  };

  Object.assign(exactText, {
    'Bienvenido de nuevo': { en: 'Welcome back', es: 'Bienvenido de nuevo' },
    'Nos alegra verte otra vez': { en: 'We are happy to see you again', es: 'Nos alegra verte otra vez' },
    'Registrarse': { en: 'Sign up', es: 'Registrarse' },
    'Uso y condiciones': { en: 'Terms of use', es: 'Uso y condiciones' },
    'El uso de PetCare implica aceptar las condiciones de navegación, compra y uso responsable de la plataforma.': { en: 'Using PetCare means accepting the browsing, purchasing, and responsible-use terms of the platform.', es: 'El uso de PetCare implica aceptar las condiciones de navegación, compra y uso responsable de la plataforma.' },
    'PetCare utiliza la información proporcionada por el usuario únicamente para gestionar las funciones solicitadas y mejorar la experiencia del sitio.': { en: 'PetCare uses information provided by the user only to manage requested features and improve the website experience.', es: 'PetCare utiliza la información proporcionada por el usuario únicamente para gestionar las funciones solicitadas y mejorar la experiencia del sitio.' },
    'Derechos y obligaciones de los clientes': { en: 'Customer rights and responsibilities', es: 'Derechos y obligaciones de los clientes' },
    'Los clientes tienen derecho a recibir información clara sobre productos y pedidos y deben proporcionar datos correctos cuando sean necesarios para completar una compra.': { en: 'Customers have the right to receive clear information about products and orders and must provide accurate information when required to complete a purchase.', es: 'Los clientes tienen derecho a recibir información clara sobre productos y pedidos y deben proporcionar datos correctos cuando sean necesarios para completar una compra.' },
    'Las condiciones de garantía dependen del producto. Conserva la información de tu compra para cualquier solicitud de soporte.': { en: 'Warranty conditions depend on the product. Keep your purchase information for any support request.', es: 'Las condiciones de garantía dependen del producto. Conserva la información de tu compra para cualquier solicitud de soporte.' },
    'PETCARE SETTINGS': { en: 'PETCARE SETTINGS', es: 'AJUSTES DE PETCARE' },
    'A better experience for everyone.': { en: 'A better experience for everyone.', es: 'Una mejor experiencia para todos.' },
    'MAKE PETCARE MORE COMFORTABLE': { en: 'MAKE PETCARE MORE COMFORTABLE', es: 'HAZ PETCARE MÁS CÓMODO' },
    'TEXT DISPLAY': { en: 'TEXT DISPLAY', es: 'VISUALIZACIÓN DEL TEXTO' },
    'VISIBILITY': { en: 'VISIBILITY', es: 'VISIBILIDAD' },
    'Text color': { en: 'Text color', es: 'Color del texto' },
    'Show the name of each selectable color directly on the color option.': { en: 'Show the name of each selectable color directly on the color option.', es: 'Muestra el nombre de cada color seleccionable directamente en la opción de color.' },
    'Off': { en: 'Off', es: 'Desactivado' },
    'On': { en: 'On', es: 'Activado' },
    'NAVIGATION': { en: 'NAVIGATION', es: 'NAVEGACIÓN' },
    'ASSISTIVE TECHNOLOGY': { en: 'ASSISTIVE TECHNOLOGY', es: 'TECNOLOGÍA DE ASISTENCIA' },
    'HANDS-FREE CONTROL': { en: 'HANDS-FREE CONTROL', es: 'CONTROL MANOS LIBRES' },
    'Accessibility made simple.': { en: 'Accessibility made simple.', es: 'Accesibilidad sencilla.' },
    'Customize your experience.': { en: 'Customize your experience.', es: 'Personaliza tu experiencia.' },
    'PERSONALIZE YOUR EXPERIENCE': { en: 'PERSONALIZE YOUR EXPERIENCE', es: 'PERSONALIZA TU EXPERIENCIA' },
    'Your preferences can be updated at any time.': { en: 'Your preferences can be updated at any time.', es: 'Puedes actualizar tus preferencias en cualquier momento.' },
    'Keep your information up to date.': { en: 'Keep your information up to date.', es: 'Mantén tu información actualizada.' },
    'YOUR PETCARE PROFILE': { en: 'YOUR PETCARE PROFILE', es: 'TU PERFIL DE PETCARE' },
    'PERSONAL PROFILE': { en: 'PERSONAL PROFILE', es: 'PERFIL PERSONAL' },
    'Personal information': { en: 'Personal information', es: 'Información personal' },
    'Keep your contact details current.': { en: 'Keep your contact details current.', es: 'Mantén actualizados tus datos de contacto.' },
    'Account details': { en: 'Account details', es: 'Detalles de la cuenta' },
    'Manage addresses and account security.': { en: 'Manage addresses and account security.', es: 'Administra direcciones y la seguridad de tu cuenta.' },
    'Keep your account secure.': { en: 'Keep your account secure.', es: 'Mantén tu cuenta segura.' },
    'Danger zone': { en: 'Danger zone', es: 'Zona de peligro' },
    'Deleting your account is permanent and cannot be undone.': { en: 'Deleting your account is permanent and cannot be undone.', es: 'Eliminar tu cuenta es permanente y no se puede deshacer.' },
    'Make the experience yours.': { en: 'Make the experience yours.', es: 'Haz tuya la experiencia.' },
    'PERSONALIZE PETCARE': { en: 'PERSONALIZE PETCARE', es: 'PERSONALIZA PETCARE' },
    'VISUAL STYLE': { en: 'VISUAL STYLE', es: 'ESTILO VISUAL' },
    'Choose your preferred look': { en: 'Choose your preferred look', es: 'Elige tu apariencia preferida' },
    'Select the interface style that feels most comfortable for you.': { en: 'Select the interface style that feels most comfortable for you.', es: 'Selecciona el estilo de interfaz que te resulte más cómodo.' },
    'Bright and clean': { en: 'Bright and clean', es: 'Claro y limpio' },
    'Easy on the eyes': { en: 'Easy on the eyes', es: 'Cómodo para la vista' },
    'Follow your device': { en: 'Follow your device', es: 'Seguir tu dispositivo' },
    'Your experience, your way.': { en: 'Your experience, your way.', es: 'Tu experiencia, a tu manera.' },
    'Choose the visual style that makes browsing PetCare feel comfortable and personal.': { en: 'Choose the visual style that makes browsing PetCare feel comfortable and personal.', es: 'Elige el estilo visual que haga que navegar por PetCare sea cómodo y personal.' },
    "Review the products you've selected for your pet before completing your purchase.": { en: "Review the products you've selected for your pet before completing your purchase.", es: 'Revisa los productos que elegiste para tu mascota antes de completar la compra.' },
    'YOUR PRODUCTS': { en: 'YOUR PRODUCTS', es: 'TUS PRODUCTOS' },
    'QUANTITY': { en: 'QUANTITY', es: 'CANTIDAD' },
    'PRICE': { en: 'PRICE', es: 'PRECIO' },
    'Need something else for your pet?': { en: 'Need something else for your pet?', es: '¿Necesitas algo más para tu mascota?' },
    'Explore more products in our PetCare store.': { en: 'Explore more products in our PetCare store.', es: 'Explora más productos en nuestra tienda PetCare.' },
    'Continue Shopping': { en: 'Continue Shopping', es: 'Seguir comprando' },
    'YOUR ORDER': { en: 'YOUR ORDER', es: 'TU PEDIDO' },
    'Check your order details before proceeding to checkout.': { en: 'Check your order details before proceeding to checkout.', es: 'Revisa los detalles de tu pedido antes de continuar al pago.' },
    'Products': { en: 'Products', es: 'Productos' },
    'Your selected items': { en: 'Your selected items', es: 'Tus artículos seleccionados' },
    'Delivery': { en: 'Delivery', es: 'Envío' },
    'FREE': { en: 'FREE', es: 'GRATIS' },
    'Safe & secure purchase': { en: 'Safe & secure purchase', es: 'Compra segura y protegida' },
    "Your order is prepared with your pet's needs in mind.": { en: "Your order is prepared with your pet's needs in mind.", es: 'Tu pedido se prepara pensando en las necesidades de tu mascota.' },
    'Fast delivery': { en: 'Fast delivery', es: 'Entrega rápida' },
    'Quality products': { en: 'Quality products', es: 'Productos de calidad' },
    'Made for pets': { en: 'Made for pets', es: 'Hecho para mascotas' },
    'FOR EVERY KIND OF PET': { en: 'FOR EVERY KIND OF PET', es: 'PARA TODO TIPO DE MASCOTA' },
    'FIND YOUR FAVORITE': { en: 'FIND YOUR FAVORITE', es: 'ENCUENTRA TU FAVORITO' },
    'Narrow down the collection and find exactly what your pet needs.': { en: 'Narrow down the collection and find exactly what your pet needs.', es: 'Filtra la colección y encuentra exactamente lo que necesita tu mascota.' },
    'PETCARE COLLECTION': { en: 'PETCARE COLLECTION', es: 'COLECCIÓN PETCARE' },
    'Made for happier moments.': { en: 'Made for happier moments.', es: 'Hecho para momentos más felices.' },
    'From everyday essentials to little treats, find something your pet will love.': { en: 'From everyday essentials to little treats, find something your pet will love.', es: 'Desde artículos esenciales hasta pequeños premios, encuentra algo que tu mascota amará.' },
    'Pet approved': { en: 'Pet approved', es: 'Aprobado por mascotas' }
  });

  const placeholders = {
    'Correo electrónico': { en: 'Email address', es: 'Correo electrónico' },
    'Contraseña': { en: 'Password', es: 'Contraseña' },
    'Nombre completo': { en: 'Full name', es: 'Nombre completo' }
  };

  function lang() {
    return (localStorage.getItem(STORAGE.language) || localStorage.getItem(STORAGE.legacyLanguage) || 'en') === 'es' ? 'es' : 'en';
  }

  function readAccessibility() {
    const defaults = { textSize: 'medium', textColor: false, keyboardNav: false, screenReader: false, highContrast: false };
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE.accessibility) || '{}') }; }
    catch (_) { return defaults; }
  }

  function saveAccessibility(patch) {
    const next = { ...readAccessibility(), ...patch };
    localStorage.setItem(STORAGE.accessibility, JSON.stringify(next));
    if ('screenReader' in patch) localStorage.setItem(STORAGE.reader, String(!!next.screenReader));
    window.dispatchEvent(new CustomEvent('petcare:accessibilitychange', { detail: next }));
    applyAccessibilityState();
    syncMenu();
  }

  function isDark() {
    const saved = localStorage.getItem(STORAGE.theme) || 'light';
    return saved === 'dark' || (saved === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE.theme, theme === 'dark' ? 'dark' : 'light');
    document.body?.classList.toggle('dark-mode', theme === 'dark');
    window.dispatchEvent(new CustomEvent('petcare:themechange', { detail: { theme } }));
    syncMenu();
  }

  function applyAccessibilityState() {
    const s = readAccessibility();
    if (!document.body) return;
    document.body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
    document.body.classList.add('text-size-' + (['small', 'medium', 'large'].includes(s.textSize) ? s.textSize : 'medium'));
    document.body.classList.toggle('keyboard-navigation-active', !!s.keyboardNav);
    document.body.classList.toggle('pc-high-contrast', !!s.highContrast);
    document.body.classList.toggle('high-contrast', !!s.highContrast);
    document.body.classList.toggle('text-color-enabled', !!s.textColor);
    document.body.classList.toggle('screen-reader-active', !!s.screenReader);
  }

  function translateLooseText() {
    const l = lang();
    document.documentElement.lang = l;
    const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName) || parent.closest('.pc-accessibility-panel')) return;
      const trimmed = node.nodeValue.replace(/\s+/g, ' ').trim();
      const original = node.__pcOriginalText || trimmed;
      const tr = exactText[original];
      if (!tr) return;
      node.__pcOriginalText = original;
      const leading = node.nodeValue.match(/^\s*/)?.[0] || '';
      const trailing = node.nodeValue.match(/\s*$/)?.[0] || '';
      node.nodeValue = leading + tr[l] + trailing;
    });
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      const key = Object.keys(placeholders).find(k => el.getAttribute('placeholder') === k || el.dataset.pcOriginalPlaceholder === k);
      if (!key) return;
      el.dataset.pcOriginalPlaceholder = key;
      el.setAttribute('placeholder', placeholders[key][l]);
    });
    const titleMap = {
      'Pet Care - Inicio': { en: 'PetCare - Home', es: 'PetCare - Inicio' },
      'Ajustes | Petcare': { en: 'Settings | PetCare', es: 'Ajustes | PetCare' },
      'Cuenta | PetCare': { en: 'Account | PetCare', es: 'Cuenta | PetCare' },
      'Quiénes Somos - PetCare': { en: 'About Us - PetCare', es: 'Quiénes Somos - PetCare' },
      'Información legal | PetCare': { en: 'Legal Information | PetCare', es: 'Información legal | PetCare' }
    };
    const currentKey = Object.keys(titleMap).find(k => document.title === k || document.documentElement.dataset.pcTitleKey === k);
    if (currentKey) {
      document.documentElement.dataset.pcTitleKey = currentKey;
      document.title = titleMap[currentKey][l];
    }
  }

  function menuMarkup() {
    const t = copy[lang()];
    const s = readAccessibility();
    const voice = localStorage.getItem(STORAGE.voice) === 'true';
    return `
      <button class="pc-a11y-trigger" type="button" aria-expanded="false" aria-controls="pc-accessibility-panel" title="${t.accessibility}">
        <i class="fa-solid fa-universal-access" aria-hidden="true"></i><span>${t.accessibility}</span>
      </button>
      <section class="pc-accessibility-panel" id="pc-accessibility-panel" hidden aria-label="${t.accessibility}">
        <div class="pc-a11y-head"><strong>${t.accessibility}</strong><button type="button" data-pc-a11y-close aria-label="${t.close}">×</button></div>
        <div class="pc-a11y-row"><span><i class="fa-solid fa-language"></i>${t.language}</span><div class="pc-segmented"><button type="button" data-pc-lang="en" class="${lang()==='en'?'active':''}">EN</button><button type="button" data-pc-lang="es" class="${lang()==='es'?'active':''}">ES</button></div></div>
        <div class="pc-a11y-row"><span><i class="fa-solid fa-circle-half-stroke"></i>${t.theme}</span><div class="pc-segmented"><button type="button" data-pc-theme="light" class="${!isDark()?'active':''}">${t.light}</button><button type="button" data-pc-theme="dark" class="${isDark()?'active':''}">${t.dark}</button></div></div>
        <div class="pc-a11y-row"><span><i class="fa-solid fa-text-height"></i>${t.textSize}</span><div class="pc-segmented"><button type="button" data-pc-text="small" aria-label="${t.smaller}" class="${s.textSize==='small'?'active':''}">A−</button><button type="button" data-pc-text="medium" class="${s.textSize==='medium'?'active':''}">A</button><button type="button" data-pc-text="large" aria-label="${t.larger}" class="${s.textSize==='large'?'active':''}">A+</button></div></div>
        <label class="pc-a11y-switch"><span><i class="fa-solid fa-keyboard"></i>${t.keyboard}</span><input type="checkbox" data-pc-setting="keyboardNav" ${s.keyboardNav?'checked':''}><i></i></label>
        <label class="pc-a11y-switch"><span><i class="fa-solid fa-volume-high"></i>${t.screenReader}</span><input type="checkbox" data-pc-setting="screenReader" ${s.screenReader?'checked':''}><i></i></label>
        <label class="pc-a11y-switch"><span><i class="fa-solid fa-microphone"></i>${t.voice}</span><input type="checkbox" data-pc-setting="voice" ${voice?'checked':''}><i></i></label>
        <label class="pc-a11y-switch"><span><i class="fa-solid fa-eye"></i>${t.highContrast}</span><input type="checkbox" data-pc-setting="highContrast" ${s.highContrast?'checked':''}><i></i></label>
        <label class="pc-a11y-switch"><span><i class="fa-solid fa-palette"></i>${t.colorLabels}</span><input type="checkbox" data-pc-setting="textColor" ${s.textColor?'checked':''}><i></i></label>
      </section>`;
  }

  function ensureAccessibilityMenu() {
    let root = document.getElementById('pc-floating-accessibility');
    if (root && root.tagName === 'A') root.remove();
    root = document.getElementById('pc-accessibility-menu-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'pc-accessibility-menu-root';
      root.className = 'pc-accessibility-menu-root';
      document.body.appendChild(root);
    }
    root.innerHTML = menuMarkup();
  }

  function syncMenu() {
    const root = document.getElementById('pc-accessibility-menu-root');
    if (!root) return;
    const wasOpen = !root.querySelector('.pc-accessibility-panel')?.hidden;
    root.innerHTML = menuMarkup();
    if (wasOpen) {
      const panel = root.querySelector('.pc-accessibility-panel');
      const trigger = root.querySelector('.pc-a11y-trigger');
      panel.hidden = false; trigger.setAttribute('aria-expanded', 'true'); root.classList.add('is-open');
    }
  }

  function simplifySettingsDropdown() {
    document.querySelectorAll('.settings-menu-wrapper .dropdown-menu-custom').forEach(menu => {
      menu.querySelectorAll('.dropdown-item-custom, .toggle-container').forEach(item => {
        const route = item.getAttribute('data-pc-route');
        if (route !== 'settings' && route !== 'favorites') item.remove();
      });
    });
  }

  const speciesMap = {
    dog: ['product-1','product-2','product-3','product-4','product-5','product-6','product-7','product-8','product-10','product-12','product-13','product-19','product-20','product-21','product-22','product-23','product-24','product-25','product-26','product-28','product-31','product-33','product-34','product-35','product-36','product-37','product-38','product-39','product-40','product-41','product-42','product-43','product-44'],
    cat: ['product-2','product-3','product-4','product-5','product-6','product-9','product-10','product-11','product-12','product-13','product-14','product-15','product-16','product-17','product-18','product-20','product-21','product-23','product-24','product-27','product-29','product-30','product-32','product-33','product-34','product-35','product-36','product-37','product-38','product-39'],
    bird: ['product-3','product-5','product-20','product-23','product-34','product-36','product-37'],
    hamster: ['product-2','product-3','product-5','product-10','product-12','product-13','product-20','product-23','product-34','product-35','product-36','product-38']
  };

  function wireHomeCategories() {
    const items = document.querySelectorAll('.categories-section .category-item');
    const pets = ['dog','cat','bird','hamster'];
    items.forEach((item, i) => {
      const pet = item.dataset.pet || pets[i];
      if (!pet) return;
      item.dataset.pet = pet;
      item.setAttribute('role', 'link'); item.setAttribute('tabindex', '0');
      const navigate = () => { location.href = 'productos.html?pet=' + pet; };
      item.onclick = navigate;
      item.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(); } };
    });
  }

  function applyPetFilter() {
    if (!/productos\.html$/i.test(location.pathname.split('/').pop() || '')) return;
    const pet = new URLSearchParams(location.search).get('pet');
    document.querySelectorAll('.product-card').forEach(card => {
      const id = card.dataset.id;
      card.classList.toggle('pc-pet-hidden', !!pet && !!speciesMap[pet] && !speciesMap[pet].includes(id));
      if (id) card.dataset.petSuitable = Object.keys(speciesMap).filter(p => speciesMap[p].includes(id)).join(' ');
    });
    let banner = document.getElementById('pc-pet-filter-banner');
    if (!pet || !speciesMap[pet]) { banner?.remove(); return; }
    if (!banner) {
      banner = document.createElement('div'); banner.id = 'pc-pet-filter-banner'; banner.className = 'pc-pet-filter-banner';
      const target = document.querySelector('.products-container, .products-section, main') || document.body;
      target.insertBefore(banner, target.firstChild);
    }
    const key = { dog:'filteredDog', cat:'filteredCat', bird:'filteredBird', hamster:'filteredHamster' }[pet];
    banner.innerHTML = `<span><i class="fa-solid fa-paw"></i>${copy[lang()][key]}</span><a href="productos.html">${copy[lang()].clearFilter}</a>`;
  }

  function onClick(e) {
    const trigger = e.target.closest('.pc-a11y-trigger');
    if (trigger) {
      const root = trigger.closest('.pc-accessibility-menu-root'); const panel = root.querySelector('.pc-accessibility-panel');
      const open = panel.hidden; panel.hidden = !open; trigger.setAttribute('aria-expanded', String(open)); root.classList.toggle('is-open', open); return;
    }
    if (e.target.closest('[data-pc-a11y-close]')) {
      const root = e.target.closest('.pc-accessibility-menu-root'); root.querySelector('.pc-accessibility-panel').hidden = true; root.querySelector('.pc-a11y-trigger').setAttribute('aria-expanded','false'); root.classList.remove('is-open'); return;
    }
    const lb = e.target.closest('[data-pc-lang]');
    if (lb) { window.setLanguage?.(lb.dataset.pcLang); translateLooseText(); syncMenu(); applyPetFilter(); return; }
    const tb = e.target.closest('[data-pc-theme]'); if (tb) { setTheme(tb.dataset.pcTheme); return; }
    const size = e.target.closest('[data-pc-text]'); if (size) { saveAccessibility({ textSize: size.dataset.pcText }); return; }
    if (!e.target.closest('.pc-accessibility-menu-root')) {
      const root = document.querySelector('.pc-accessibility-menu-root.is-open');
      if (root) { root.querySelector('.pc-accessibility-panel').hidden = true; root.querySelector('.pc-a11y-trigger').setAttribute('aria-expanded','false'); root.classList.remove('is-open'); }
    }
  }

  function onChange(e) {
    const c = e.target.closest('[data-pc-setting]'); if (!c) return;
    const name = c.dataset.pcSetting;
    if (name === 'voice') { window.gestionarComandosVoz?.(c.checked); localStorage.setItem(STORAGE.voice, String(c.checked)); }
    else if (name === 'screenReader') saveAccessibility({ screenReader: c.checked });
    else if (name === 'keyboardNav') saveAccessibility({ keyboardNav: c.checked });
    else if (name === 'highContrast') saveAccessibility({ highContrast: c.checked });
    else if (name === 'textColor') saveAccessibility({ textColor: c.checked });
  }

  function init() {
    if (!localStorage.getItem(STORAGE.language) && !localStorage.getItem(STORAGE.legacyLanguage)) {
      localStorage.setItem(STORAGE.language, 'en'); localStorage.setItem(STORAGE.legacyLanguage, 'en');
    }
    if (!localStorage.getItem(STORAGE.theme)) localStorage.setItem(STORAGE.theme, 'light');
    ensureAccessibilityMenu(); applyAccessibilityState(); simplifySettingsDropdown(); translateLooseText(); wireHomeCategories(); applyPetFilter();

    const observer = new MutationObserver(() => { simplifySettingsDropdown(); translateLooseText(); wireHomeCategories(); });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('click', onClick);
  document.addEventListener('change', onChange);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelector('[data-pc-a11y-close]')?.click(); });
  window.addEventListener('petcare:languagechange', () => { translateLooseText(); syncMenu(); applyPetFilter(); if (localStorage.getItem(STORAGE.voice) === 'true' && window.gestionarComandosVoz) { window.gestionarComandosVoz(false); setTimeout(() => window.gestionarComandosVoz(true), 80); } });
  window.addEventListener('storage', e => { if ([STORAGE.language, STORAGE.legacyLanguage, STORAGE.theme, STORAGE.accessibility, STORAGE.voice].includes(e.key)) { applyAccessibilityState(); syncMenu(); translateLooseText(); applyPetFilter(); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
