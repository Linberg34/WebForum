import { applyPhoneMask } from '../../shared/validations/applyPhoneMask.js';
import { userServices } from '../../storage/api/services/userServices.js';

export async function insertData() {
    const emailField = document.getElementById('email');
    const fullNameField = document.getElementById('fullName');
    const phoneField = document.getElementById('phone');
    const genderField = document.getElementById('gender');
    const birthDateField = document.getElementById('birthDate');
    const userButton = document.getElementById('userButton'); 

    try {
        const userProfile = await userServices.getProfile();

        const email = userProfile.email || "Неизвестный пользователь";
        userButton.textContent = `${email} ▼`;

        emailField.value = userProfile.email || '';
        fullNameField.value = userProfile.fullName || '';
        phoneField.value = userProfile.phoneNumber || '';
        birthDateField.value = userProfile.birthDate 
            ? userProfile.birthDate.split('T')[0] 
            : '';

        const genderMap = {
            Male: 'male',
            Female: 'female'
        };
        genderField.value = genderMap[userProfile.gender] || 'male';

        applyPhoneMask(phoneField);
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        userButton.textContent = "Ошибка загрузки ▼";
    }
}
