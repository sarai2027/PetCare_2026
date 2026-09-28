document.addEventListener('DOMContentLoaded', () => {
  const defaults = { textSize: 'medium', textColor: false, keyboardNav: false, screenReader: false, highContrast: false };
  let settings = { ...defaults };

  try {
    settings = { ...defaults, ...JSON.parse(localStorage.getItem('petcare_accessibility') || '{}') };
  } catch (_) {}

  settings.textSize = String(settings.textSize || 'medium').toLowerCase();
  if (!['small', 'medium', 'large'].includes(settings.textSize)) settings.textSize = 'medium';
  settings.textColor = !!settings.textColor;


  function currentLanguage() {
    return (localStorage.getItem('petcare_language') || localStorage.getItem('petcare_lang') || 'es') === 'en' ? 'en' : 'es';
  }

  function syncNewLabels() {
    const isEnglish = currentLanguage() === 'en';
    const title = document.getElementById('text-color-title');
    const description = document.getElementById('text-color-description');
    const status = document.getElementById('text-color-status');
    const toggle = document.getElementById('text-color-toggle');

    if (title) title.textContent = isEnglish ? 'Text color' : 'Color del texto';
    if (description) {
      description.textContent = isEnglish
        ? 'Show the name of each selectable color directly on the color option.'
        : 'Muestra el nombre de cada color seleccionable directamente sobre la opción de color.';
    }
    if (status) status.textContent = settings.textColor ? (isEnglish ? 'On' : 'Activado') : (isEnglish ? 'Off' : 'Desactivado');
    if (toggle) {
      const label = settings.textColor
        ? (isEnglish ? 'Disable Text color' : 'Desactivar Color del texto')
        : (isEnglish ? 'Enable Text color' : 'Activar Color del texto');
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    }
  }

  function save(notifyTextColor = false) {
    localStorage.setItem('petcare_accessibility', JSON.stringify(settings));
    apply();
    if (notifyTextColor) {
      window.dispatchEvent(new CustomEvent('petcare:accessibilitychange', { detail: { ...settings } }));
    }
  }

  function apply() {
    document.body.classList.remove(
      'text-size-small',
      'text-size-medium',
      'text-size-large',
      'high-contrast',
      'pc-high-contrast',
      'keyboard-navigation-active',
      'text-color-enabled'
    );
    document.body.classList.add('text-size-' + settings.textSize);
    if (settings.textColor) document.body.classList.add('text-color-enabled');
    if (settings.highContrast) document.body.classList.add('high-contrast', 'pc-high-contrast');
    if (settings.keyboardNav) document.body.classList.add('keyboard-navigation-active');

    document.documentElement.style.setProperty(
      '--pc-text-scale',
      settings.textSize === 'small' ? '0.9' : settings.textSize === 'large' ? '1.15' : '1'
    );

    const display = document.getElementById('text-size-display');
    if (display) {
      const isEnglish = currentLanguage() === 'en';
      display.textContent = isEnglish
        ? ({ small: 'Small', medium: 'Medium', large: 'Large' }[settings.textSize])
        : ({ small: 'Pequeño', medium: 'Mediano', large: 'Grande' }[settings.textSize]);
    }

    const textColorToggle = document.getElementById('text-color-toggle');
    if (textColorToggle) {
      textColorToggle.classList.toggle('active', settings.textColor);
      textColorToggle.setAttribute('aria-pressed', String(settings.textColor));
    }
    syncNewLabels();
  }

  function sync() {
    const keyboard = document.getElementById('switch-keyboard');
    const reader = document.getElementById('switch-screen-reader');
    const highContrast = document.getElementById('switch-high-contrast');
    if (keyboard) keyboard.checked = !!settings.keyboardNav;
    if (reader) reader.checked = !!settings.screenReader;
    if (highContrast) highContrast.checked = !!settings.highContrast;
    apply();
  }

  document.getElementById('btn-text-decrease')?.addEventListener('click', (event) => {
    event.preventDefault();
    settings.textSize = settings.textSize === 'large' ? 'medium' : settings.textSize === 'medium' ? 'small' : 'small';
    save();
  });

  document.getElementById('btn-text-increase')?.addEventListener('click', (event) => {
    event.preventDefault();
    settings.textSize = settings.textSize === 'small' ? 'medium' : settings.textSize === 'medium' ? 'large' : 'large';
    save();
  });

  document.getElementById('text-color-toggle')?.addEventListener('click', (event) => {
    event.preventDefault();
    settings.textColor = !settings.textColor;
    save(true);
  });

  document.getElementById('switch-keyboard')?.addEventListener('change', (event) => {
    settings.keyboardNav = event.target.checked;
    save();
  });

  document.getElementById('switch-high-contrast')?.addEventListener('change', (event) => {
    settings.highContrast = event.target.checked;
    save(true);
  });

  // Screen reader behavior is intentionally preserved; this only keeps its existing setting in sync.
  document.getElementById('switch-screen-reader')?.addEventListener('change', (event) => {
    settings.screenReader = event.target.checked;
    localStorage.setItem('petcare_screen_reader', String(event.target.checked));
    save();
  });

  window.addEventListener('petcare:languagechange', () => {
    apply();
  });

  sync();
});
