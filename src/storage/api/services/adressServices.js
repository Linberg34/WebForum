import { httpClient } from "./httpsClient";

export const adressServices  = {
    async getAuthorsList() {
        return httpClient("/adress/search", {
            method: "GET"
        });
    }
};