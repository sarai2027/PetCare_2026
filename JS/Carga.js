document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar si es la primera vez que entra al sitio
    const yaVisito = localStorage.getItem('petcare_visited');

    if (!yaVisito) {
        // Abrir el modal de Bootstrap automáticamente
        const modalElement = document.getElementById('accessibilityWelcomeModal');
        if (modalElement && typeof bootstrap !== 'undefined') {
            const welcomeModal = new bootstrap.Modal(modalElement);
            welcomeModal.show();
        }

        // Marcar que ya visitó para que no vuelva a joder en futuras entradas
        localStorage.setItem('petcare_visited', 'true');
    }

    // 2. Conectar los switches del Modal con el localStorage
    const modalSwitchReader = document.getElementById('modal-switch-reader');
    const modalSwitchVoice = document.getElementById('modal-switch-voice');
    const btnSaveModal = document.getElementById('btn-save-modal');

    if (modalSwitchReader) {
        modalSwitchReader.addEventListener('change', (e) => {
            localStorage.setItem('petcare_screen_reader', e.target.checked);
        });
    }

    if (modalSwitchVoice) {
        modalSwitchVoice.addEventListener('change', (e) => {
            localStorage.setItem('petcare_voice_control', e.target.checked);
            if (typeof window.gestionarComandosVoz === 'function') {
                window.gestionarComandosVoz(e.target.checked);
            }
        });
    }

    if (btnSaveModal) {
        btnSaveModal.addEventListener('click', () => {
            if (typeof hablarTexto === 'function') {
                hablarTexto("Preferencias guardadas. ¡Bienvenido a PetCare!");
            }
        });
    }
});

window.addEventListener('load', () => {
    const loader = document.getElementById('petcare-loader');

    // 1. Esperar 2 segundos para completar la animación del loader
    setTimeout(() => {
        if (loader) {
            // Animación de salida (fade out)
            loader.classList.add('fade-out');
        }

        // 2. Transcurridos 500ms tras ocultar el loader, abrir el Modal si no ha visitado
        setTimeout(() => {
            const yaVisito = localStorage.getItem('petcare_visited');

            if (!yaVisito) {
                const modalEl = document.getElementById('accessibilityWelcomeModal');
                if (modalEl && typeof bootstrap !== 'undefined') {
                    const welcomeModal = new bootstrap.Modal(modalEl);
                    welcomeModal.show();
                }
            }
        }, 500);

    }, 2000); // Duración de la pantalla de carga (2000ms = 2 seg)
});