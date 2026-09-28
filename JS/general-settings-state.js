/* Persist only the General Settings controls already present on this page. */
document.addEventListener('DOMContentLoaded', () => {
    const timezone = document.querySelector('[data-setting="timezone"]');
    const currency = document.querySelector('[data-setting="currency"]');
    const saveButton = document.querySelector('.save-settings-btn');
    if (!timezone || !currency || !saveButton) return;

    const selectedText = timezone.querySelector('.selected-text');
    const timezoneOptions = Array.from(timezone.querySelectorAll('.dropdown-item[data-value]'));
    const currencySelect = currency.matches('select') ? currency : currency.querySelector('select');
    let state = { timezone: 'est', currency: 'usd' };

    try {
        state = { ...state, ...JSON.parse(localStorage.getItem('petcare_general_settings') || '{}') };
    } catch (_) {}

    function labelForTimezone(value) {
        const option = timezoneOptions.find(item => item.dataset.value === value) || timezoneOptions[0];
        return option?.textContent.trim() || '';
    }

    function applyState() {
        if (selectedText) {
            selectedText.removeAttribute('data-i18n');
            selectedText.textContent = labelForTimezone(state.timezone);
        }
        if (currencySelect) currencySelect.value = state.currency;
    }

    timezoneOptions.forEach((option) => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            state.timezone = option.dataset.value || 'est';
            applyState();
        });
    });

    currencySelect?.addEventListener('change', () => {
        state.currency = currencySelect.value;
    });

    saveButton.addEventListener('click', () => {
        state.currency = currencySelect?.value || state.currency;
        localStorage.setItem('petcare_general_settings', JSON.stringify(state));
        saveButton.dataset.saved = 'true';
        setTimeout(() => delete saveButton.dataset.saved, 600);
    });

    window.addEventListener('petcare:languagechange', applyState);
    applyState();
});
