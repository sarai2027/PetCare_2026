// ============================================================
// DARKMODE.JS - CONTROL GLOBAL DEL TEMA
// ============================================================

(function () {
    "use strict";

    // --------------------------------------------------------
    // OBTENER TEMA ACTUAL
    // --------------------------------------------------------

    function getSavedTheme() {
        return localStorage.getItem("petcare_theme") || "light";
    }

    // --------------------------------------------------------
    // APLICAR TEMA
    // --------------------------------------------------------

    function applyTheme() {
        const body = document.body;

        if (!body) return;

        const savedTheme = getSavedTheme();

        // "system" utiliza la preferencia del sistema operativo
        let isDark = false;

        if (savedTheme === "dark") {
            isDark = true;
        } else if (savedTheme === "system") {
            isDark = window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
        }

        // Aplicar/quitar clase de modo oscuro
        body.classList.toggle("dark-mode", isDark);

        // ----------------------------------------------------
        // SINCRONIZAR SWITCHES DE MODO OSCURO
        // ----------------------------------------------------

        const toggles = document.querySelectorAll(
            "#darkModeToggle, .dark-mode-switch"
        );

        toggles.forEach(toggle => {
            toggle.checked = isDark;
        });

        // ----------------------------------------------------
        // SINCRONIZAR ICONO DEL BOTÓN DEL HEADER
        // ----------------------------------------------------

        const themeIcons = document.querySelectorAll(
            "#theme-toggle-btn i"
        );

        themeIcons.forEach(icon => {
            icon.classList.toggle("fa-sun", isDark);
            icon.classList.toggle("fa-moon", !isDark);
        });

        // ----------------------------------------------------
        // SINCRONIZAR BOTONES DE GENERAL SETTINGS
        // ----------------------------------------------------

        const themeButtons = document.querySelectorAll(".theme-btn");

        themeButtons.forEach((button, index) => {

            let buttonTheme = null;

            // Los botones actuales de General Settings están
            // ordenados: Light, Dark, System.
            if (button.dataset.theme) {
                buttonTheme = button.dataset.theme;
            } else if (index === 0) {
                buttonTheme = "light";
            } else if (index === 1) {
                buttonTheme = "dark";
            } else if (index === 2) {
                buttonTheme = "system";
            }

            button.classList.toggle(
                "active",
                buttonTheme === savedTheme
            );
        });
    }

    // --------------------------------------------------------
    // CAMBIAR ENTRE LIGHT Y DARK
    // --------------------------------------------------------

    function toggleTheme() {
        const currentTheme = getSavedTheme();

        // Si está en system, el botón del header pasa a dark.
        // Si está en dark, pasa a light.
        // Si está en light, pasa a dark.
        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        localStorage.setItem("petcare_theme", newTheme);

        applyTheme();

        // Avisar al resto del proyecto
        window.dispatchEvent(
            new CustomEvent("petcare:themechange", {
                detail: {
                    theme: newTheme
                }
            })
        );
    }

    // --------------------------------------------------------
    // SELECCIONAR TEMA DESDE GENERAL SETTINGS
    // --------------------------------------------------------

    function selectTheme(theme) {

        if (!["light", "dark", "system"].includes(theme)) {
            return;
        }

        localStorage.setItem("petcare_theme", theme);

        applyTheme();

        // Avisar al resto del proyecto
        window.dispatchEvent(
            new CustomEvent("petcare:themechange", {
                detail: {
                    theme: theme
                }
            })
        );
    }

    // --------------------------------------------------------
    // INICIALIZACIÓN
    // --------------------------------------------------------

    function initDarkMode() {

        // Aplicar tema guardado
        applyTheme();

        // ----------------------------------------------------
        // SWITCHES
        // ----------------------------------------------------

        document.addEventListener("change", function (e) {

            const target = e.target;

            if (!target) return;

            if (
                target.id === "darkModeToggle" ||
                target.classList.contains("dark-mode-switch")
            ) {

                const theme = target.checked ? "dark" : "light";

                selectTheme(theme);
            }
        });

        // ----------------------------------------------------
        // BOTONES DE GENERAL SETTINGS
        // ----------------------------------------------------

        document.addEventListener("click", function (e) {

            const themeButton = e.target.closest(".theme-btn");

            if (!themeButton) return;

            e.preventDefault();

            let theme = themeButton.dataset.theme;

            // Si no existe data-theme, usamos la posición
            // actual de los botones:
            // 0 = Light
            // 1 = Dark
            // 2 = System

            if (!theme) {

                const buttons = Array.from(
                    document.querySelectorAll(".theme-btn")
                );

                const index = buttons.indexOf(themeButton);

                if (index === 0) {
                    theme = "light";
                } else if (index === 1) {
                    theme = "dark";
                } else if (index === 2) {
                    theme = "system";
                }
            }

            selectTheme(theme);
        });

        // ----------------------------------------------------
        // SINCRONIZAR CON CAMBIOS DEL SISTEMA
        // ----------------------------------------------------

        if (window.matchMedia) {

            const mediaQuery = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );

            const handleSystemThemeChange = function () {

                if (getSavedTheme() === "system") {
                    applyTheme();
                }
            };

            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener(
                    "change",
                    handleSystemThemeChange
                );
            } else if (mediaQuery.addListener) {
                mediaQuery.addListener(
                    handleSystemThemeChange
                );
            }
        }
    }

    // --------------------------------------------------------
    // EXPORTAR FUNCIONES
    // --------------------------------------------------------

    window.applyTheme = applyTheme;
    window.toggleTheme = toggleTheme;
    window.selectTheme = selectTheme;

    // --------------------------------------------------------
    // ARRANQUE
    // --------------------------------------------------------

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initDarkMode,
            { once: true }
        );
    } else {
        initDarkMode();
    }

})();