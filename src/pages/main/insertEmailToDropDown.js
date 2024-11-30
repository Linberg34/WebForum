import { userServices} from "../../storage/api/services/userServices.js";
export async function insertEmailToDropDown() {

    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
        console.error('Токен авторизации отсутствует');
        userButton.textContent = "Войдите в систему ▼";
        return;
    }
    

    const userProfile = await userServices.getProfile();
    if (userProfile && userProfile.email) {
        userButton.textContent = `${userProfile.email} ▼`;
    } else {
        userButton.textContent = "Неизвестный пользователь ▼";
    }

}
