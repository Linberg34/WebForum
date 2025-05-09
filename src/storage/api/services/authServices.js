import { httpClient } from "./httpsClient";
export const authServices = {
    async login(email, password) {
        return  httpClient("/account/login", { 
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
            }
        });
    }
};