import { userService } from '../../storage/api/services/userService.js';

export async function insertData() {
    const emailField = document.getElementById('email');
    const fullNameField = document.getElementById('fullName');
    const phoneField = document.getElementById('phone');
    const genderField = document.getElementById('gender');
    const birthDateField = document.getElementById('birthDate');

    try {
        const userProfile = await userService.getProfile();

        emailField.value = userProfile.email || '';
        fullNameField.value = userProfile.fullName || '';
        phoneField.value = userProfile.phoneNumber || '';
        genderField.value = userProfile.gender || 'male';
        birthDateField.value = userProfile.birthDate || '';
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        alert('Не удалось загрузить данные профиля. Попробуйте позже.');
    }
}
