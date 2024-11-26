import { initDropDown } from './dropDown.js';
import { insertData } from './insertData.js';

export async function initProfilePage() {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
        alert('Вы не авторизованы. Переход на страницу входа.');
        window.location.href = '/login';
        return;
    }

    initDropDown();
    await insertData();

    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedProfile = {
            email: document.getElementById('email').value.trim(),
            fullName: document.getElementById('fullName').value.trim(),
            phoneNumber: document.getElementById('phone').value.trim(),
            gender: document.getElementById('gender').value,
            birthDate: document.getElementById('birthDate').value,
        };

        try {
            await authService.updateProfile(updatedProfile);
            alert('Профиль успешно обновлен.');
        } catch (error) {
            console.error('Ошибка обновления профиля:', error);
            alert('Не удалось обновить данные профиля.');
        }
    });
}
