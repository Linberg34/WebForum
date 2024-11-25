import { checkData } from "./checkData";
import { sendAuthRequest } from "./sendAuthRequest";

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errors = checkData(email, password);

    if (errors.length > 0) {
        document.getElementById('errors').textContent = errors.join(', ');
    } else {
        sendAuthRequest(email, password);
    }
}); 