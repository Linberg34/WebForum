import { httpClient } from "./httpsClient";

export const postsServices = {
    async getPosts(params) {
        const queryParams = new URLSearchParams();
    
        for (const key in params) {
            const value = params[key];
            if (Array.isArray(value)) {
                value.forEach(v => queryParams.append(key, v));
            } else if (typeof value === 'boolean') {
                queryParams.append(key, value.toString());
            } else if (value !== undefined && value !== null) {
                queryParams.append(key, value);
            }
        }
    
        return httpClient(`/post?${queryParams.toString()}`, {
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

    async toggleLike(postId, hasLike) {
        const method = hasLike ? "DELETE" : "POST";
        return httpClient(`/post/${postId}/like`, {
            method,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
        });
    }
    
};
