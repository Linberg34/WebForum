import { createCommentElement } from "./createCommentElement.js";
import { postsServices } from '../../storage/api/services/postsServices.js';

export async function renderComments(postId) {
    const commentsContainer = document.querySelector(".existingCommentsContainer");
    commentsContainer.innerHTML = "";

    try {
        const postDetails = await postsServices.getPostById(postId);
        const comments = postDetails.comments;

        if (!comments || comments.length === 0) {
            commentsContainer.innerHTML = "<p>Комментариев пока нет. Оставьте первый!</p>";
            return;
        }

        comments.forEach((comment) => {
            const commentCard = createCommentElement(comment);
            commentsContainer.appendChild(commentCard);
        });
    } catch (error) {
        console.error("Ошибка загрузки комментариев:", error);
        commentsContainer.innerHTML = "<p>Ошибка загрузки комментариев. Попробуйте позже.</p>";
    }
}
