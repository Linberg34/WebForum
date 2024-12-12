import { commentServices } from "../../storage/api/services/commentServices.js";
import { createCommentElement } from "./createCommentElement.js";
import { commentsById, indexComments } from "./commentsStore.js";

export async function toggleReplies(commentId, repliesContainer, toggleButton, postId) {
    if (repliesContainer.childElementCount === 0) {
        const comment = commentsById.get(commentId);

        if (!comment) {
            console.error("Комментарий не найден в локальном хранилище!");
            return;
        }

        let replies;
        if (isRootComment(comment) && !comment.repliesLoaded) {
            try {
                replies = await commentServices.getCommentTree(commentId);
                comment.replies = replies;
                comment.repliesLoaded = true;
                replies.forEach(child => indexComments(child));
            } catch (error) {
                console.error(`Ошибка загрузки дерева для корневого коммента ${commentId}:`, error);
                return;
            }
        } else {
            replies = comment.replies;
        }

        if (replies && replies.length > 0) {
            replies.forEach((reply) => {
                const replyElement = createCommentElement(reply, postId, () => {});
                repliesContainer.appendChild(replyElement);
            });

            repliesContainer.style.display = "block";
            toggleButton.textContent = "Скрыть ответы";
        } else {
            repliesContainer.innerHTML = "<p>Ответов пока нет.</p>";
            repliesContainer.style.display = "block";
            toggleButton.textContent = "Скрыть ответы";
        }
    } else {
        if (repliesContainer.style.display === "none") {
            repliesContainer.style.display = "block";
            toggleButton.textContent = "Скрыть ответы";
        } else {
            repliesContainer.style.display = "none";
            toggleButton.textContent = "Развернуть ответы";
        }
    }
}

function isRootComment(comment) {
    return comment.isRoot === true;
}
