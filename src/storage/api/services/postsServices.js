import { httpClient } from "./httpsClient";

export const postsServices = {
    async getPosts(params) {
        const queryParams = new URLSearchParams(params).toString();
        return httpClient(`/post?${queryParams}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
        });
    },

    async createPost(postData) {
        return httpClient("/posts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(postData),
        });
    },

    async getPostById(postId) {
        return httpClient(`/posts/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
        });
    },

    async likePost(postId) {
        return httpClient(`/posts/${postId}/like`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
        });
    },

    async removeLike(postId) {
        return httpClient(`/posts/${postId}/like`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
        });
    },
};
