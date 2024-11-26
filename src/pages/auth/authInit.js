import { checkData } from "./checkData";
import { authService } from "../../storage/api/services/authService.js";
import { onNavigate } from "../../app/router/router.js";

export async function initAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');
    const errorsContainer = document.getElementById('errors');

    if (!loginForm) {
        console.error("Ошибка: Форма авторизации (#loginForm) не найдена.");
        return;
    }

    if (!registerButton) {
        console.error("Ошибка: Кнопка регистрации (#registerButton) не найдена.");
        return;
    }

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
            const data = await authService.login({ email, password });

            sessionStorage.setItem("authToken", data.token);
            alert("Вы успешно авторизовались!");
            onNavigate('/profile'); 
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
