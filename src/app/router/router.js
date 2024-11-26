import { getRouteConfig } from './routes.js';
import {parcerRoot} from './routes.js';


export function onNavigate(container) {
    const path = window.location.pathname;
    const config =getRouteConfig(path);
    if(!config) console.log(`Маршрут для пути "${path}" не найден.`);
    else fetch(`${parcerRoot}${config.sourcePath}`)
        .then(r => r.text()).then(page => {
            container ? container.innerHTML = page : document.getElementById('app').innerHTML = page;
        }).then(config.fn);
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
            window.history.pushState(null, '', target.pathname);
            onNavigate(root);
        }
    });


    onNavigate(root);
}