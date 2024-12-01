import { httpClient } from "./httpsClient";

export const communityServices = {
    async getCommunityList() {
        return httpClient('/community', {
            method: "GET"
        });
    },
    async subscribeToCommunity(communityId) {
        return httpClient(`/community/${communityId}/subscribe`, {
            method: "POST"
        });
    },
    async unsubscribeFromCommunity(communityId) {
        return httpClient(`/community/${communityId}/unsubscribe`, {
            method: "DELETE"
        });
    },
    async getUsersCommunities() {
        return httpClient(`/community/my`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
                "Content-Type": "application/json", 
            }
        });
    }
};