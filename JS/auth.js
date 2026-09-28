document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    const isSignup = /registro/i.test(document.title);
    const homeUrl = "home.html";

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            // This project uses a front-end demo authentication flow.
            // Successful login/registration takes the user to the application.
            window.location.href = homeUrl;
        });
    }

    document.querySelectorAll(".guest-access").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            localStorage.setItem("petcare_guest", "true");
            window.location.href = homeUrl;
        });
    });

    const forgot = document.querySelector(".forgot");
    if (forgot) {
        forgot.addEventListener("click", (event) => {
            event.preventDefault();
            alert("Si la cuenta existe, revisa las instrucciones de recuperación en tu correo.");
        });
    }
});
