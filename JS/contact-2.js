/*PETCARE CONTACT PAGE*/

document.addEventListener("DOMContentLoaded", () => {

    /*CONTACT FORM*/

    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitin");

    if (form && submitButton) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = document.getElementById("namein").value.trim();
            const email = document.getElementById("emailin").value.trim();
            const subject = document.getElementById("subjectin").value.trim();
            const message = document.getElementById("messagein").value.trim();

            /* Basic validation */

            if (!name || !email || !subject || !message) {
                showToast(
                    "Please complete all the fields.",
                    "fa-solid fa-circle-exclamation"
                );

                return;
            }

            if (name.length < 2) {
                showToast(
                    "Please enter a valid name.",
                    "fa-solid fa-circle-exclamation"
                );

                return;
            }

            if (message.length < 10) {
                showToast(
                    "Your message is too short.",
                    "fa-solid fa-circle-exclamation"
                );

                return;
            }


            /* Change button while processing */

            submitButton.disabled = true;

            submitButton.innerHTML = `
                <span>Sending...</span>
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;


            /* Simulate sending */

            setTimeout(() => {

                submitButton.innerHTML = `
                    <span>Message Sent!</span>
                    <i class="fa-solid fa-check"></i>
                `;

                showToast(
                    `Thank you, ${name}! Your message has been received.`,
                    "fa-solid fa-circle-check"
                );


                /* Reset form */

                form.reset();


                /* Return button to normal */

                setTimeout(() => {

                    submitButton.disabled = false;

                    submitButton.innerHTML = `
                        <span>Send Message</span>
                        <i class="fa-solid fa-paper-plane"></i>
                    `;

                }, 2500);

            }, 1000);

        });

    }


    /*DARK MODE*/

    const darkToggle = document.getElementById("darkModeToggle");
    const themeButton = document.getElementById("theme-toggle-btn");
    const themeIcon = themeButton
        ? themeButton.querySelector("i")
        : null;


    function applyDarkMode(isDark) {

        document.body.classList.toggle("dark-mode", isDark);

        if (darkToggle) {
            darkToggle.checked = isDark;
        }

        if (themeIcon) {

            themeIcon.classList.toggle(
                "fa-moon",
                !isDark
            );

            themeIcon.classList.toggle(
                "fa-sun",
                isDark
            );

        }

        /* Save preference */

        localStorage.setItem(
            "petcare-dark-mode",
            isDark ? "enabled" : "disabled"
        );
    }


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("petcare-dark-mode");

    if (savedTheme === "enabled") {
        applyDarkMode(true);
    } else {
        applyDarkMode(false);
    }


    /* Toggle switch */

    if (darkToggle) {

        darkToggle.addEventListener("change", () => {

            applyDarkMode(darkToggle.checked);

            showToast(
                darkToggle.checked
                    ? "Dark mode activated"
                    : "Light mode activated",
                darkToggle.checked
                    ? "fa-solid fa-moon"
                    : "fa-solid fa-sun"
            );

        });

    }


    /* Moon / sun button */

    if (themeButton) {

        themeButton.addEventListener("click", (event) => {

            event.preventDefault();

            const isDark =
                !document.body.classList.contains("dark-mode");

            applyDarkMode(isDark);

            showToast(
                isDark
                    ? "Dark mode activated"
                    : "Light mode activated",
                isDark
                    ? "fa-solid fa-moon"
                    : "fa-solid fa-sun"
            );

        });

    }


    /*TOAST NOTIFICATIONS*/

    function showToast(message, icon = "fa-solid fa-circle-check") {

        /* Remove old toast */

        const oldToast =
            document.querySelector(".custom-toast");

        if (oldToast) {
            oldToast.remove();
        }


        /* Create toast */

        const toast =
            document.createElement("div");

        toast.className = "custom-toast";

        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;


        document.body.appendChild(toast);


        /* Remove after a few seconds */

        setTimeout(() => {

            toast.classList.add("fade-out");

            setTimeout(() => {

                if (toast.parentElement) {
                    toast.remove();
                }

            }, 300);

        }, 3000);

    }


    /*SMOOTH SCROLL*/

    const contactButtons =
        document.querySelectorAll(
            'a[href="#contact-section"]'
        );


    contactButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            const target =
                document.getElementById("contact-section");

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /*INPUT ANIMATION*/

    const inputs =
        document.querySelectorAll(
            "#contactForm input, #contactForm textarea"
        );


    inputs.forEach(input => {

        input.addEventListener("focus", () => {

            const wrapper =
                input.closest(
                    ".input-wrapper, .textarea-wrapper"
                );

            if (wrapper) {
                wrapper.classList.add("input-focused");
            }

        });


        input.addEventListener("blur", () => {

            const wrapper =
                input.closest(
                    ".input-wrapper, .textarea-wrapper"
                );

            if (wrapper) {
                wrapper.classList.remove("input-focused");
            }

        });

    });


    /*CHARACTER FEEDBACK FOR MESSAGE*/

    const messageInput =
        document.getElementById("messagein");

    if (messageInput) {

        messageInput.addEventListener("input", () => {

            if (messageInput.value.length >= 10) {

                messageInput.style.borderColor =
                    "#8B6BFF";

            } else {

                messageInput.style.borderColor = "";

            }

        });

    }

});