import { applyPhoneMask } from '../../shared/validations/applyPhoneMask.js';
import { validateRegistration } from './validateRegistration.js';
import { sendRegistrationRequest } from './sendRegRequest.js';

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

        const errors = validateRegistration(formData);
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        try {
            const data = await sendRegistrationRequest(formData);
            alert(`Регистрация успешна! Ваш TOKEN: ${data.token}`);
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error.message);
        }
    });
}
