/* Local profile-photo upload for the Account settings page. */
document.addEventListener('DOMContentLoaded', () => {
  const image = document.querySelector('.profile-img');
  const button = document.querySelector('.btn-change-photo');
  if (!image || !button) return;

  button.type = 'button';
  const saved = localStorage.getItem('petcare_profile_image');
  if (saved) image.src = saved;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png,image/jpeg,image/webp,image/gif';
  input.hidden = true;
  input.setAttribute('aria-label', button.textContent.trim() || 'Profile image');
  document.body.appendChild(input);

  button.addEventListener('click', () => input.click());
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) return;
    const lang = (localStorage.getItem('petcare_language') || 'es') === 'en' ? 'en' : 'es';
    if (!file.type.startsWith('image/')) {
      alert(lang === 'en' ? 'Please choose an image file.' : 'Selecciona un archivo de imagen.');
      input.value = '';
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert(lang === 'en' ? 'The image must be 3 MB or smaller.' : 'La imagen debe pesar 3 MB o menos.');
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || '');
      image.src = value;
      localStorage.setItem('petcare_profile_image', value);
    };
    reader.readAsDataURL(file);
  });
});


/* Front-end persistence for the account controls already shown in account.html. */
document.addEventListener('DOMContentLoaded', () => {
  const fields = Array.from(document.querySelectorAll('[data-account-field]'));
  const shippingRow = document.querySelector('[data-account-action="shipping"]');
  const billingRow = document.querySelector('[data-account-action="billing"]');
  const passwordRow = document.querySelector('[data-account-action="password"]');
  const deleteButton = document.querySelector('.btn-delete-account');

  let profile = { fullName: '', email: '', phone: '', shipping: '', billing: '' };
  try { profile = { ...profile, ...JSON.parse(localStorage.getItem('petcare_account_profile') || '{}') }; } catch (_) {}

  const lang = () => (localStorage.getItem('petcare_language') || localStorage.getItem('petcare_lang') || 'es') === 'en' ? 'en' : 'es';
  const save = () => localStorage.setItem('petcare_account_profile', JSON.stringify(profile));

  fields.forEach((field) => {
    const key = field.dataset.accountField;
    if (profile[key]) field.value = profile[key];
    field.addEventListener('change', () => {
      profile[key] = field.value.trim();
      save();
    });
  });

  const shippingValue = shippingRow?.querySelector('.row-value');
  const billingValue = billingRow?.querySelector('.row-value');
  if (profile.shipping && shippingValue) shippingValue.textContent = profile.shipping;
  if (profile.billing && billingValue) {
    billingValue.removeAttribute('data-i18n');
    billingValue.textContent = profile.billing;
  }

  shippingRow?.addEventListener('click', () => {
    const value = prompt(lang() === 'en' ? 'Enter your shipping address:' : 'Ingresa tu dirección de envío:', profile.shipping || shippingValue?.textContent.trim() || '');
    if (value === null) return;
    profile.shipping = value.trim();
    if (shippingValue) shippingValue.textContent = profile.shipping;
    save();
  });

  billingRow?.addEventListener('click', () => {
    const value = prompt(lang() === 'en' ? 'Enter your billing address:' : 'Ingresa tu dirección de facturación:', profile.billing || '');
    if (value === null) return;
    profile.billing = value.trim();
    if (billingValue) {
      billingValue.removeAttribute('data-i18n');
      billingValue.textContent = profile.billing || (lang() === 'en' ? 'Same as shipping address' : 'Igual que la dirección de envío');
    }
    save();
  });

  passwordRow?.addEventListener('click', () => {
    const value = prompt(lang() === 'en' ? 'Enter a new demo password:' : 'Ingresa una nueva contraseña de demostración:');
    if (!value) return;
    localStorage.setItem('petcare_account_password', value);
    alert(lang() === 'en' ? 'Password saved for this front-end demo.' : 'Contraseña guardada para esta demostración frontend.');
  });

  deleteButton?.addEventListener('click', () => {
    const confirmed = confirm(lang() === 'en' ? 'Delete the locally saved account information?' : '¿Eliminar la información de cuenta guardada localmente?');
    if (!confirmed) return;
    ['petcare_account_profile', 'petcare_account_password', 'petcare_profile_image'].forEach(key => localStorage.removeItem(key));
    profile = { fullName: '', email: '', phone: '', shipping: '', billing: '' };
    fields.forEach(field => field.value = '');
    const image = document.querySelector('.profile-img');
    if (image) image.src = 'https://via.placeholder.com/100';
    if (shippingValue) shippingValue.textContent = '123 Pet Lovers Lane, Miami, FL 33101, USA';
    if (billingValue) billingValue.textContent = lang() === 'en' ? 'Same as shipping address' : 'Igual que la dirección de envío';
  });
});
