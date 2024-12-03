export function handleAuthorClick(authorName) {
    // Формируем URL с параметром автора
    const baseURL = "/";
    const queryParams = new URLSearchParams({
        author: authorName,
    });

    // Перенаправляем на главную страницу с параметром
    window.location.href = `${baseURL}?${queryParams.toString()}`;
}
