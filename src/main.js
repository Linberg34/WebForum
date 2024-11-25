import { initRouter } from './app/router/router.js';
import { initRegistration} from './pages/registration/regInit.js';
import {initAuth} from './pages/auth/authInit.js';


document.addEventListener('DOMContentLoaded', () => {

    initRouter(document.getElementById('app')); 

    const currentPath = window.location.pathname;

    if (currentPath === '/registration') {
        
        initRegistration();
    } else if (currentPath === '/login') {
        initAuth(); 
    }
});
