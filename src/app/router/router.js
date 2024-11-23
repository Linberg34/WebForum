import { getRouteConfig } from './routes.js';

async function loadPage(container, filePath, scriptPath) {
    fetch(scriptPath);
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Ошибка загрузки: ${filePath}`);
            return response.text();
        })
        .then(data => {
            if (container) {
                container.innerHTML = data;
            } else {
                console.error(`Контейнер с ID "${container}" не найден.`);
            }
        })
        .catch(error => console.error(`Ошибка при загрузке страницы ${filePath}:`, error));
}

export function initRouter(root) {
    function navigate() {
        const path = window.location.pathname;
        const routeConfig = getRouteConfig(path);

        if (routeConfig) {
            loadPage(root, routeConfig.page, routeConfig.root)
                .catch(error => console.error('Ошибка загрузки страницы:', error));
        } else {
            console.error(`Маршрут для пути "${path}" не найден.`);
        }
    }

    window.addEventListener('popstate', navigate);

    document.addEventListener('click', event => {
        const target = event.target.closest('a');
        if (target && target.href.startsWith(window.location.origin)) {
            event.preventDefault();
            window.history.pushState(null, '', target.pathname);
            navigate();
        }
    });


    navigate();
}

export function insertPageIntoContainer(container, filePath){


}