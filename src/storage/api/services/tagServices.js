import { httpClient } from "./httpsClient";

export const tagServices = {
    async getTags() {
        return httpClient('/tag', {
            method: "GET"
        });
    },
};