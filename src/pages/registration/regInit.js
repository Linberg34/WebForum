import { applyPhoneMask } from '../../shared/validations/applyPhoneMask.js';
import { validateRegistration } from './validateRegistration.js';
import { authService } from '../../storage/api/services/authService.js';
import { onNavigate } from '../../app/router/router.js';

export function initRegistration() {
    const phoneInput = document.getElementById('phone');
    applyPhoneMask(phoneInput);

    document.getElementById('regForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            password: document.getElementById('password').value.trim(),
            email: document.getElementById('email').value.trim(),
            birthDate: document.getElementById('birthDate').value.trim(),
            gender: document.getElementById('gender').value,
            phoneNumber: document.getElementById('phone').value.trim()
        };

        const errors = validateRegistration(
            formData.fullName,
            formData.password, 
            formData.email,
            formData.birthDate,
            formData.phoneNumber
        );

        try {
            const data = await authService.register(formData);

            sessionStorage.setItem("authToken", data.token);

            alert(`Регистрация успешна!`);
            onNavigate('/profile');
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error.message);
        }
    });
}
