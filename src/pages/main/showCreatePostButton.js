
export function showCreatePostButton() {
    const createPostButton = document.querySelector('.createPostButton');
    const userToken = sessionStorage.getItem("authToken");

    if (!createPostButton) {
        console.error('Кнопка "Написать пост" не найдена.');
        return;
    }

    if (userToken) {
        createPostButton.classList.remove('hidden'); 
    } else {
        createPostButton.classList.add('hidden'); 
    }
}
