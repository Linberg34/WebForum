import { getRouteConfig } from './routes.js';

function loadComponent(containerId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Ошибка загрузки компонента: ${filePath}`);
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
            } else {
                console.error(`Контейнер с ID "${containerId}" не найден.`);
            }
        })
        .catch(error => console.error(`Ошибка при загрузке ${filePath}:`, error));
}

export function initRouter() {
    function navigate() {
        const path = window.location.pathname; 
        const routeConfig = getRouteConfig(path);

        loadComponent('header', routeConfig.header)
            .catch(error => console.error('Ошибка загрузки header:', error));

        loadComponent('app', routeConfig.page)
            .catch(error => console.error('Ошибка загрузки страницы:', error));

        loadComponent('footer', '../components/common/footer/index.html')
            .catch(error => console.error('Ошибка загрузки footer:', error));
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
