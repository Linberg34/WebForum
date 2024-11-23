import { getRouteConfig } from './routes.js';

function updateHeader(navItems) {
    const navList = document.getElementById('nav-list');
    if (navList) {
        navList.innerHTML = '';

        navItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = item.text;
            a.href = item.href;
            li.appendChild(a);
            navList.appendChild(li);
        });
    } else {
        console.error('Элемент с ID "nav-list" не найден.');
    }
}

function loadPage(containerId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Ошибка загрузки: ${filePath}`);
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

        if (routeConfig.navItems) {
            updateHeader(routeConfig.navItems);
        }

        loadPage('app', routeConfig.page)
            .catch(error => console.error('Ошибка загрузки страницы:', error));
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