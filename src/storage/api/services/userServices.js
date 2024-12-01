import { httpClient } from "./httpsClient";

export const userServices = {
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
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
            body: editProfileData,
        });
    },
};
