import { setupRouting } from './app/router/router.js';
import { initRegistration} from './pages/registration/regInit.js';
import {initAuth} from './pages/auth/authInit.js';



document.addEventListener('DOMContentLoaded', () => {

    setupRouting(document.getElementById('app')); 
    
});
