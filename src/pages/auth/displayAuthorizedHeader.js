
export function initializeHeader(userEmail= null){
    document.addEventListener('DOMContentLoaded', () => {
        const loginButton = document.getElementById('loginButton');
        const userMenu = document.getElementById('userMenu');
        const userButton = document.getElementById('userButton');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const profileButton = document.getElementById('profileButton');
        const logoutButton = document.getElementById('logoutButton');

        const userEmail = 'Nexp1e@kreosoft.ru';

        function showUserMenu() {
            loginButton.classList.add('hidden'); 
            userButton.textContent = `${userEmail} ▼`;
            userMenu.classList.remove('hidden'); 
        }

        function handleLogout() {
            userMenu.classList.add('hidden'); 
            loginButton.classList.remove('hidden'); 
            dropdownMenu.classList.add('hidden'); 
            alert('Вы успешно вышли из системы.');
        }

        userButton.addEventListener('click', () => {
            dropdownMenu.classList.toggle('hidden');
        });

        profileButton.addEventListener('click', () => {
            alert('Переход в профиль...');
        });

        logoutButton.addEventListener('click', handleLogout);

        loginButton.addEventListener('click', () => {
            alert('Вы успешно авторизовались!');
            showUserMenu();
        });
    });
}
