// ==========================================
// LÓGICA PARA LOS DROPDOWNS PERSONALIZADOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los links dentro de nuestros dropdowns personalizados
    const dropdownOptions = document.querySelectorAll('.custom-dropdown .dropdown-item');

    dropdownOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault(); // Evitamos que la página salte hacia arriba
            
            // 1. Buscamos el menú padre de esta opción
            const parentDropdown = this.closest('.custom-dropdown');
            
            // 2. Buscamos el texto visible del botón (donde mostraremos lo elegido)
            const selectedTextElement = parentDropdown.querySelector('.selected-text');
            
            // 3. Reemplazamos el texto del botón por el texto de la opción que clicamos
            selectedTextElement.textContent = this.textContent;
            
            // (Opcional) Si necesitas guardar el valor seleccionado para tu backend o lógica futura:
            // const selectedValue = this.getAttribute('data-value');
        });
    });
});