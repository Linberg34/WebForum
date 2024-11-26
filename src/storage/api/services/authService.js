import { httpClient } from "./httpsClient";
export const authService = {
    async login(email, password) {
        return await httpClient("/account/login", { 
            method: "POST", 
            body: { email, password } 
        });
    },
    async register(userData){
        return httpClient("/account/register", { 
            method: "POST",
            body: userData 
        });
    },

    async logout() {
        return httpClient("/account/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
        });
    }
};