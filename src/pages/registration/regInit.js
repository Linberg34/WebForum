import { applyPhoneMask } from '../../shared/validations/applyPhoneMask.js';
import { validateRegistration } from './validateRegistration.js';
import { authServices } from '../../storage/api/services/authServices.js';
import { navigate, onNavigate } from '../../app/router/router.js';
import { showServerErrorAlert } from './showServerAlert.js';

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

        formData.birthDate = formData.birthDate || null; 
        formData.phoneNumber = formData.phoneNumber.trim() === "+7 (___) ___-__-__" ? null : formData.phoneNumber || null;

        const errors = validateRegistration(
            formData.fullName,
            formData.password, 
            formData.email,
            formData.birthDate,
            formData.phoneNumber
        );

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        try {
            const data = await authServices.register(formData);

            sessionStorage.setItem("authToken", data.token);

            navigate('/profile');
        } catch (error) {
            console.error('Ошибка:', error);

            if (error.response) {
                try {
                    const errorBody = await error.response.json();
                    showServerErrorAlert(errorBody);
                } catch (parseError) {
                    alert('Неизвестная ошибка сервера.');
                }
            } else {
                alert('Ошибка сети или неизвестная ошибка.');
            }
        }
    });
}

