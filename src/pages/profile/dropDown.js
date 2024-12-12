import { userServices } from '../../storage/api/services/userServices.js'; 
export async function initDropDown() {
    const userButton = document.getElementById('userButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

    const authToken = sessionStorage.getItem('authToken');

    dropdownMenu.innerHTML = '';

    if (authToken) {
        try {
            const userProfile = await userServices.getProfile();

            if (userProfile && userProfile.email) {
                userButton.textContent = `${userProfile.email} ▼`; 
            } else {
                userButton.textContent = "Неизвестный пользователь ▼";
            }

            const profileItem = document.createElement('li');
            const profileButton = document.createElement('button');
            profileButton.textContent = "Профиль";
            profileButton.addEventListener('click', () => {
                window.location.href = '/profile';
            });
            profileItem.appendChild(profileButton);

            const logoutItem = document.createElement('li');
            const logoutButton = document.createElement('button');
            logoutButton.textContent = "Выйти";
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('authToken');
                window.location.href = '/login';
            });
            logoutItem.appendChild(logoutButton);

            dropdownMenu.appendChild(profileItem);
            dropdownMenu.appendChild(logoutItem);
        } catch (error) {
            console.error('Ошибка загрузки профиля:', error);
            userButton.textContent = "Ошибка загрузки ▼";
            userButton.addEventListener('click', () => {
                window.location.href = '/login';
            });
        }
    } else {
        userButton.textContent = "Войдите в систему ▼";

        const loginItem = document.createElement('li');
        const loginButton = document.createElement('button');
        loginButton.textContent = "Войти";
        loginButton.addEventListener('click', () => {
            window.location.href = '/login';
        });
        loginItem.appendChild(loginButton);

        dropdownMenu.appendChild(loginItem);
    }

    userButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });
}
