import { getRouteConfig } from './routes.js';
import {parcerRoot} from './routes.js';



export function onNavigate(container) {
    const path = window.location.pathname;
    const config = getRouteConfig(path);
    

    if (!config) {
        console.log(`Маршрут для пути "${path}" не найден.`);
        return;
    }

    fetch(`${parcerRoot}${config.sourcePath}`)
        .then(r => r.text())
        .then(page => {
            (container || document.getElementById('app')).innerHTML = page;
        })
        .then(() => {
            if (config.params) {
                config.fn(container || document.getElementById('app'), config.params);
            } else {
                config.fn(container || document.getElementById('app'));
            }
        });
}


export function navigate(path) {    
    window.history.pushState(null, '', path);
    onNavigate();
}

export function setupRouting(root) {
    window.addEventListener('popstate', () => onNavigate(root));
    document.addEventListener('click', event => {
        const target = event.target.closest('a');
        if (target && target.href.startsWith(window.location.origin)) {
            event.preventDefault();
            navigate(target.pathname);
        }
    });
    onNavigate(root);
}

