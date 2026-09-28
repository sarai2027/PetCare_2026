document.addEventListener('DOMContentLoaded', () => {

    /*Modo Oscuero*/
    const darkToggle = document.getElementById('darkModeToggle');
    const themeIcon = document.querySelector('#theme-toggle-btn i');
    

    const applyDarkMode = (on) => {
        document.body.classList.toggle('dark-mode', on);
        if (themeIcon) {
            themeIcon.classList.toggle('fa-moon', !on);
            themeIcon.classList.toggle('fa-sun', on);
        }
    };

    if (darkToggle) {
        darkToggle.addEventListener('change', () => {
            applyDarkMode(darkToggle.checked);
            showToast(darkToggle.checked ? 'Modo oscuro activado' : 'Modo claro activado', 'fa-solid fa-circle-check');
        });
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (!darkToggle) return;
            darkToggle.checked = !darkToggle.checked;
            applyDarkMode(darkToggle.checked);
        });
    }
    

    /*Traduccion  */
    const translations = {
        es: {
            nav_home: 'Inicio',
            nav_products: 'Productos',
            nav_contact: 'Contacto',
            aboutus: 'Quienes Somos',
            nav_settings: 'Configuración',
            nav_language: 'Idioma',
            nav_accessibility: 'Accesibilidad',
            hero_title: 'QUIENES SOMOS',
            hero_desc: 'En Pet Care nos dedicamos a brindar una experiencia innovadora y accesible para el cuidado de las mascotas, fortaleciendo la relación entre humanos y animales por medio de la tecnología. Nuestro objetivo es ofrecer soluciones modernas, seguras y confiables que ayuden al bienestar y felicidad de cada mascota.',
            historia_title: 'Nuestra Historia',
            historia_desc: 'PetCare nace de la convicción de que las mascotas y sus dueños merecen disfrutar de condiciones de vida dignas e igualitarias. A partir de esta visión, nos dedicamos a brindar soluciones innovadoras que integran accesibilidad, tecnología y recursos, contribuyendo al bienestar y cuidado de cada mascota.',
            mision_title: 'Misión',
            mision_desc: 'Brindar una solución integral y universalmente accesible para el cuidado de las mascotas ofreciendo servicios especializados y productos de alta calidad para todo tipo de usuarios. Nos enfocamos al bienestar de sus animales con autonomía, seguridad y empatía.',
            vision_title: 'Visión',
            vision_desc: 'Ser la aplicación líder y más exclusiva del mercado global, reconocida por transformar la relación entre humanos y mascotas por medio de la tecnología, brindando accesibilidad y apoyo en el cuidado de las mascotas.',
            valores_title: 'Valores',
            valor1_desc: '<b>Amor y Empatía</b><br>Creemos que las mascotas son parte de la familia, por eso ofrecemos productos seleccionados con cariño, pensando siempre en su bienestar, comodidad y felicidad.',
            valor2_desc: '<b>Calidad y Excelencia</b><br>Nos comprometemos a brindar productos seguros, duraderos y de alta calidad, junto con un servicio que supere las expectativas de nuestros clientes.',
           valor3_desc: '<b>Confianza y Seguridad</b><br>Trabajamos solo con productos verificados y servicios respaldados por profesionales, para que cada compra sea sencilla, transparente y, sobre todo, segura para tu mascota.',
            valor4_desc: '<b>Innovación y Accesibilidad</b><br>Usamos la tecnología para acercar el cuidado de mascotas a cualquier persona, en cualquier lugar, haciendo el proceso simple, rápido y accesible para todos.',
            lang_modal_title: 'Seleccionar Idioma',
            footer_contact: 'Cóntactanos',
            footer_callcenter: 'Call Center: 0000-0000',
            footer_brand_desc: '"petcare.com" es una marca de ventas registrado.<br>Dirección: Prolongación 59 AV Sur y calle El Progreso 2934.<br>Correo: servicioalcliente@petcare.com.sv<br>NIT: 0614-110169-001-1',
            footer_rights: 'Derechos Reservados 2026 Petcare S.A de C.V.',
            footer_legal: 'Legal',
            footer_legal_1: 'Uso y condiciones',
            footer_legal_2: 'Política de privacidad',
            footer_legal_3: 'Derechos y obligaciones de los clientes',
            footer_legal_4: 'Garantía de los productos',
            footer_info: 'Información',
            footer_info_1: 'Nosotros',
            footer_info_2: 'Cómo comprar',
            footer_info_3: 'FAQ',
            footer_info_4: 'Contáctenos',
            footer_info_5: 'Sucursales',
            footer_social: 'Nuestras redes sociales'
        },
        en: {
            nav_home: 'Home',
            nav_products: 'Products',
            nav_contact: 'Contact',
            aboutus: 'About Us',
            nav_settings: 'Settings',
            nav_language: 'Language',
            nav_accessibility: 'Accessibility',
            hero_title: 'ABOUT US',
            hero_desc: 'At Pet Care we are dedicated to providing an innovative and accessible experience for pet care, strengthening the bond between humans and animals through technology. Our goal is to offer modern, safe, and reliable solutions that promote the wellbeing and happiness of every pet.',
            historia_title: 'Our Story',
            historia_desc: 'PetCare was born from the belief that pets and their owners deserve to enjoy dignified and equal living conditions. Guided by this vision, we are committed to providing innovative solutions that integrate accessibility, technology, and resources, contributing to the well-being and care of every pet,',
            mision_title: 'Mission',
            mision_desc: 'To provide a comprehensive and universally accessible solution for pet care by offering specialized services and high-quality products for all types of users. We focus on the wellbeing of your animals with autonomy, safety, and empathy.',
            vision_title: 'Vision',
            vision_desc: 'To be the leading and most exclusive application in the global market, recognized for transforming the relationship between humans and pets through technology, providing accessibility and support in pet care.',
            valores_title: 'Values',
            valor1_desc: '<b>Love and Empathy</b><br>We believe pets are part of the family, which is why we offer products selected with care, always thinking about their wellbeing, comfort, and happiness.',
            valor2_desc: '<b>Quality and Excellence</b><br>We are committed to providing safe, durable, high-quality products, together with service that exceeds our customers\' expectations.',
            valor3_desc: '<b>Trust and Safety</b><br>We only work with verified products and services backed by professionals, so every purchase is simple, transparent, and above all, safe for your pet.',
            valor4_desc: '<b>Innovation and Accessibility</b><br>We use technology to bring pet care closer to everyone, everywhere, making the process simple, fast, and accessible for all.',
            lang_modal_title: 'Select Language',
            footer_contact: 'Contact Us',
            footer_callcenter: 'Call Center: 0000-0000',
            footer_brand_desc: '"petcare.com" is a registered trademark.<br>Address: Prolongación 59 AV Sur y calle El Progreso 2934.<br>Email: servicioalcliente@petcare.com.sv<br>Tax ID: 0614-110169-001-1',
            footer_rights: 'All Rights Reserved 2026 Petcare S.A de C.V.',
            footer_legal: 'Legal',
            footer_legal_1: 'Terms and conditions',
            footer_legal_2: 'Privacy policy',
            footer_legal_3: 'Customer rights and obligations',
            footer_legal_4: 'Product warranty',
            footer_info: 'Information',
            footer_info_1: 'About',
            footer_info_2: 'How to buy',
            footer_info_3: 'FAQ',
            footer_info_4: 'Contact us',
            footer_info_5: 'Branches',
            footer_social: 'Our social media'
        }
    };

    let currentLang = 'es';

    const htmlKeys = new Set(['footer_brand_desc', 'valor1_desc', 'valor2_desc', 'valor3_desc', 'valor4_desc']);

    function applyLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = translations[lang][key];
            if (text === undefined) return;
            if (htmlKeys.has(key)) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        });
        document.documentElement.setAttribute('lang', lang);
    }

    /* MODAL DE IDIOMA */
    const openLangBtn = document.getElementById('openLanguageModal');
    const langModal = document.getElementById('languageModal');
    const closeLangBtn = document.getElementById('closeLanguageModal');
    const currentFlag = document.getElementById('current-flag');
    const langOptions = document.querySelectorAll('.lang-option');
    

    if (openLangBtn) {
        openLangBtn.addEventListener('click', (e) => {
            e.preventDefault();
            langModal.style.display = 'flex';
        });
    }
    if (closeLangBtn) {
        closeLangBtn.addEventListener('click', () => {
            langModal.style.display = 'none';
        });
    }
    if (langModal) {
        langModal.addEventListener('click', (e) => {
            if (e.target === langModal) langModal.style.display = 'none';
        });
    }

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            langOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            const flagUrl = opt.getAttribute('data-flag');
            if (currentFlag && flagUrl) {
                currentFlag.innerHTML = `<img src="${flagUrl}" alt="flag" class="nav-flag-img">`;
            }

            const lang = opt.getAttribute('data-lang');
            applyLanguage(lang);

            langModal.style.display = 'none';
            showToast(
                lang === 'en' ? 'Language updated' : 'Idioma actualizado',
                'fa-solid fa-language'
            );
        });
    });

    /*  TOASTS */
    function showToast(message, icon = 'fa-solid fa-circle-check') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    applyLanguage(currentLang);

});