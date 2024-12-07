import { postsServices } from "../../storage/api/services/postsServices.js";
import { createCommentElement } from "./createCommentElement.js";
import { commentsById, indexComments } from "./commentsStore.js";

export async function renderComments(postId) {
    const commentsContainer = document.querySelector(".existingCommentsContainer");
    commentsContainer.innerHTML = "";

    try {
        const postDetails = await postsServices.getPostById(postId);
        const allComments = postDetails.comments;

        commentsById.clear(); 
        if (!allComments || allComments.length === 0) {
            commentsContainer.innerHTML = "<p>Комментариев пока нет. Оставьте первый!</p>";
            return;
        }

        allComments.forEach(comment => indexComments(comment, true)); 

        allComments.forEach((comment) => {
            const commentElement = createCommentElement(comment, postId, () => {
                renderComments(postId);
            });
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error("Ошибка загрузки комментариев:", error);
        commentsContainer.innerHTML = "<p>Ошибка загрузки комментариев. Попробуйте позже.</p>";
    }
}
