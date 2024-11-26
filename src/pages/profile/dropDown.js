export function displayDropDown(){
    document.addEventListener('DOMContentLoaded', () => {
        const userButton = document.getElementById('userButton');
        const dropdownMenu = document.getElementById('dropdownMenu');
    
        userButton.addEventListener('click', () => {
            dropdownMenu.classList.toggle('hidden');
            dropdownMenu.classList.toggle('show');
        });
    
        document.addEventListener('click', (event) => {
            if (!dropdownMenu.contains(event.target) && event.target !== userButton) {
                dropdownMenu.classList.add('hidden');
                dropdownMenu.classList.remove('show');
            }
        });
    });
    
}