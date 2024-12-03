import { httpClient } from "./httpsClient";

export const authorServices = {
    async getAuthorsList() {
        return httpClient("/author/list", {
            method: "GET"
        });
    }
};