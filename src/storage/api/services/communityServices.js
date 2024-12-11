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
    },

    async getCommunityById(communityId) {
        return httpClient(`/community/${communityId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    },

    async getCommunityPosts(communityId, params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        return httpClient(`/community/${communityId}/post?${queryParams}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    },

    async createCommunityPost(communityId, postData) {
        return httpClient(`/community/${communityId}/post`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(postData)
        });
    },
};
