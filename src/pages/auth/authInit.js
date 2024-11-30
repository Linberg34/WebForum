import { checkData } from "./checkData";
import { authServices } from "../../storage/api/services/authServices.js";
import { navigate, onNavigate } from "../../app/router/router.js";

export async function initAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');
    const errorsContainer = document.getElementById('errors');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errors = checkData(email, password);

        if (errors.length > 0) {
            errorsContainer.textContent = errors.join(', ');
            return;
        }

        try {
            const data = await authServices.login(email, password );
            

            sessionStorage.setItem("authToken", data.token);
            
            navigate('/profile'); 
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            errorsContainer.textContent = "Неверные учетные данные. Проверьте email и пароль.";
        }
    });

    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.pushState(null, '', '/registration');
        onNavigate();
    });
}
