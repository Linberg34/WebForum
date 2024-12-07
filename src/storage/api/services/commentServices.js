import { httpClient } from "./httpsClient";

export const commentServices = {
    async getCommentTree(commentId) {
        return httpClient(`/comment/${commentId}/tree`, {
            method: "GET"
        });
    },

    async addCommentToPost(postId, content, parentId = null) {
        return httpClient(`/post/${postId}/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
            body: {
                content,
                parentId,
            },
        });
    },

    async editComment(commentId, content) {
        return httpClient(`/comment/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
            body: { content },
        });
    },

    async deleteComment(commentId) {
        return httpClient(`/comment/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, 
            },
        });
    },
};
