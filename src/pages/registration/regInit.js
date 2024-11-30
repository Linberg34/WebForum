import { applyPhoneMask } from '../../shared/validations/applyPhoneMask.js';
import { validateRegistration } from './validateRegistration.js';
import { authServices } from '../../storage/api/services/authServices.js';
import { navigate, onNavigate } from '../../app/router/router.js';

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

        try {
            console.log(formData);
            const data = await authServices.register(formData);

            sessionStorage.setItem("authToken", data.token);

            console.log("perehod na profile");
            navigate('/profile');
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error.message);
        }
    });
}
