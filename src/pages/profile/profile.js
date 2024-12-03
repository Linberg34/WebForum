import { initDropDown } from './dropDown.js';
import { insertData } from './insertData.js';
import { userServices } from '../../storage/api/services/userServices.js';

export async function initProfilePage() {
    const token = sessionStorage.getItem('authToken');
    const createPostButton = document.querySelector('.createPostButton');
    

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
            birthDate: document.getElementById('birthDate').value || null,
            gender: document.getElementById('gender').value,
            phoneNumber: document.getElementById('phone').value.trim() || null
        };

        try {
            await userServices.editProfile(updatedProfile);
            alert('Профиль успешно обновлен.');
        } catch (error) {
            console.error('Ошибка обновления профиля:', error);
            alert('Не удалось обновить данные профиля.');
        }
    });
}
