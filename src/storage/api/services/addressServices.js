import { httpClient } from "./httpsClient";

export const addressServices = {
    async searchAddresses(parentObjectId = null, query = "") {
        const queryParams = new URLSearchParams();
        if (parentObjectId) queryParams.append("parentObjectId", parentObjectId);
        if (query) queryParams.append("query", query);

        return httpClient(`/address/search?${queryParams.toString()}`, {
            method: "GET"
        });
    },

    async getAddressChain(objectGuid) {
        if (!objectGuid) throw new Error("objectGuid обязателен для запроса цепочки адресов.");

        return httpClient(`/address/chain?objectGuid=${objectGuid}`, {
            method: "GET"
        });
    }
};
