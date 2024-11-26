export function initDropDown() {
    const userButton = document.getElementById('userButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutButton');
    const email = userButton.textContent.split(' ')[0]; 



    
    userButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    profileButton.addEventListener('click', () => {
        window.location.href = '/profile';
    });

    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('authToken');
        window.location.href = '/login'; 
    });
}
