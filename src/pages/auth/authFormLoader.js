export function loadAuthForm() {
    const containerId = 'authFormContainer';
    const formPath = './src/components/forms/authForm/index.html';

    console.log(containerId, formPath);

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Контейнер с ID "${containerId}" не найден.`);
        return;
    }

    fetch(formPath)
        .then(response => {
            if (!response.ok) throw new Error(`Ошибка загрузки: ${formPath}`);
            return response.text();
        })
        .then(data => {
            container.innerHTML = data;
        })
        .catch(error => console.error(`Ошибка при загрузке формы:`, error));
}
