import { httpClient } from "./httpsClient";

import { httpClient } from "./httpsClient";

export const userService = {
    async getProfile() {
        return httpClient("/account/profile", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
        });
    },

    async editProfile(editProfileData) {
        return httpClient("/account/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
            body: JSON.stringify(editProfileData),
        });
    },
};
