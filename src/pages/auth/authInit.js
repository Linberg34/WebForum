import { authServices } from "../../storage/api/services/authServices.js";
import { navigate, onNavigate } from "../../app/router/router.js";

export async function initAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const data = await authServices.login(email, password);

            sessionStorage.setItem("authToken", data.token);
            navigate('/profile');
        } catch (error) {
            alert(error.message);
        }
    });

    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.pushState(null, '', '/registration');
        onNavigate();
    });
}
