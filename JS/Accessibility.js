function applyGlobalAccessibility() {
  let settings = { textSize: 'medium', textColor: false, keyboardNav: false, highContrast: false };
  try {
    settings = { ...settings, ...JSON.parse(localStorage.getItem('petcare_accessibility') || '{}') };
  } catch (_) {}

  const size = ['small', 'medium', 'large'].includes(String(settings.textSize).toLowerCase())
    ? String(settings.textSize).toLowerCase()
    : 'medium';

  document.body.classList.remove(
    'text-size-small',
    'text-size-medium',
    'text-size-large',
    'high-contrast',
    'pc-high-contrast',
    'keyboard-navigation-active',
    'text-color-enabled'
  );
  document.body.classList.add('text-size-' + size);
  if (settings.textColor) document.body.classList.add('text-color-enabled');
  if (settings.highContrast) document.body.classList.add('high-contrast', 'pc-high-contrast');
  if (settings.keyboardNav) document.body.classList.add('keyboard-navigation-active');
}

document.addEventListener('DOMContentLoaded', applyGlobalAccessibility);
window.addEventListener('storage', (event) => {
  if (event.key === 'petcare_accessibility') applyGlobalAccessibility();
});
window.addEventListener('petcare:accessibilitychange', applyGlobalAccessibility);
