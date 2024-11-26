import { httpClient } from "./httpsClient";

export const userService = {
    async getProfile(){
        return httpClient("/account/profile",{
            method:"GET"
        });
    },

    async editProfile(editProfileData){
        return httpClient("/account/profile",{
            method:"PUT",
            body:editProfileData
        });
    }
};