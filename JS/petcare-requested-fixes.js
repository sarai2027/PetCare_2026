/* Small isolated UI fixes requested by the project owner.
   No voice-command, screen-reader, or translation behavior is modified here. */
(function () {
  'use strict';

  function syncCartBadge() {
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('petcare_cart') || '[]'); } catch (_) {}
    const total = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    document.querySelectorAll('#cartCount, .cart-bubble, .mobile-cart-badge').forEach((badge) => {
      badge.textContent = total;
    });
  }

  function watchForCartBadge() {
    if (document.querySelector('#cartCount, .cart-bubble, .mobile-cart-badge')) {
      syncCartBadge();
      return;
    }
    if (!document.body || !('MutationObserver' in window)) return;
    const observer = new MutationObserver((mutations) => {
      const found = mutations.some((mutation) => Array.from(mutation.addedNodes).some((node) => {
        if (!(node instanceof Element)) return false;
        return node.matches?.('#cartCount, .cart-bubble, .mobile-cart-badge') ||
          !!node.querySelector?.('#cartCount, .cart-bubble, .mobile-cart-badge');
      }));
      if (found) {
        observer.disconnect();
        syncCartBadge();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.petcareSyncCartBadge = syncCartBadge;
  window.addEventListener('storage', (event) => {
    if (event.key === 'petcare_cart') syncCartBadge();
    if (event.key === 'petcare_accessibility') applyGlobalTextColor();
  });

  function addAccessibilityButton() {
    if (document.getElementById('pc-floating-accessibility')) return;
    const button = document.createElement('a');
    button.id = 'pc-floating-accessibility';
    button.className = 'pc-floating-accessibility';
    button.href = 'accessibility.html';
    button.setAttribute('aria-label', 'Accessibility');
    button.setAttribute('data-i18n-aria-label', 'accessibility_title');
    button.setAttribute('title', 'Accessibility');
    button.setAttribute('data-i18n-title', 'accessibility_title');
    button.innerHTML = '<i class="fa-solid fa-universal-access" aria-hidden="true"></i><span class="pc-floating-accessibility__label" data-i18n="accessibility_title">Accessibility</span>';
    document.body.appendChild(button);

    const loader = document.getElementById('petcare-loader');
    const syncLoader = () => {
      const hiddenByLoader = loader && !loader.classList.contains('fade-out');
      button.classList.toggle('is-hidden-for-loader', !!hiddenByLoader);
    };
    syncLoader();
    if (loader) new MutationObserver(syncLoader).observe(loader, { attributes: true, attributeFilter: ['class', 'style'] });
  }



  function currentLanguage() {
    return (localStorage.getItem('petcare_language') || localStorage.getItem('petcare_lang') || 'es') === 'en' ? 'en' : 'es';
  }

  function syncSelectableColorLabels() {
    const isEnglish = currentLanguage() === 'en';
    const labels = {
      red: isEnglish ? 'Red' : 'Rojo',
      blue: isEnglish ? 'Blue' : 'Azul',
      green: isEnglish ? 'Green' : 'Verde',
      gray: isEnglish ? 'Gray' : 'Gris'
    };

    document.querySelectorAll('.color-circle').forEach((button) => {
      const key = Object.keys(labels).find((name) => button.classList.contains(name));
      if (!key) return;
      button.setAttribute('aria-label', labels[key]);
      button.setAttribute('data-color-label', labels[key]);
      button.setAttribute('title', labels[key]);
    });
  }

  function applyGlobalTextColor() {
    let settings = {};
    try { settings = JSON.parse(localStorage.getItem('petcare_accessibility') || '{}'); } catch (_) {}
    document.body?.classList.toggle('high-contrast', !!settings.highContrast);
    document.body?.classList.toggle('pc-high-contrast', !!settings.highContrast);
    document.body?.classList.toggle('text-color-enabled', !!settings.textColor);
    syncSelectableColorLabels();
  }

  function isResponsiveHeader() {
    return window.matchMedia('(max-width: 1050px)').matches;
  }

  function closeResponsiveHeader() {
    const menu = document.getElementById('pc-mobile-menu');
    const toggle = document.querySelector('.pc-menu-toggle');
    menu?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.querySelector('.settings-menu-wrapper.pc-settings-open')?.classList.remove('pc-settings-open');
  }

  function setupResponsiveHeaderEvents() {
    document.addEventListener('click', (event) => {
      const toggle = event.target.closest('.pc-menu-toggle');
      if (toggle) {
        event.preventDefault();
        const menu = document.getElementById(toggle.getAttribute('aria-controls'));
        if (!menu) return;
        const willOpen = !menu.classList.contains('is-open');
        closeResponsiveHeader();
        menu.classList.toggle('is-open', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
        return;
      }

      if (!isResponsiveHeader()) return;

      const settingsIcon = event.target.closest('.settings-icon');
      if (settingsIcon && settingsIcon.closest('#pc-mobile-menu')) {
        event.preventDefault();
        event.stopPropagation();
        const wrapper = settingsIcon.closest('.settings-menu-wrapper');
        wrapper?.classList.toggle('pc-settings-open');
        return;
      }

      if (event.target.closest('#pc-mobile-menu [data-pc-route]')) {
        closeResponsiveHeader();
        return;
      }

      if (!event.target.closest('.navbar')) closeResponsiveHeader();
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeResponsiveHeader();
    });

    window.addEventListener('resize', () => {
      if (!isResponsiveHeader()) closeResponsiveHeader();
    });
  }

  window.addEventListener('petcare:accessibilitychange', applyGlobalTextColor);
  window.addEventListener('petcare:languagechange', syncSelectableColorLabels);

  function initRequestedFixes() {
    addAccessibilityButton();
    syncCartBadge();
    watchForCartBadge();
    applyGlobalTextColor();
    setupResponsiveHeaderEvents();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRequestedFixes, { once: true });
  else initRequestedFixes();
})();
