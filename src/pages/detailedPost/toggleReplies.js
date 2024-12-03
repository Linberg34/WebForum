import { commentServices } from "../../storage/api/services/commentServices.js";
import { createCommentElement } from "./createCommentElement.js";

export async function toggleReplies(commentId, repliesContainer, toggleButton) {
    if (repliesContainer.childElementCount === 0) {
        try {
            const replies = await commentServices.getCommentTree(commentId);

            if (replies && replies.length > 0) {
                replies.forEach((reply) => {
                    const replyElement = createCommentElement(reply);
                    repliesContainer.appendChild(replyElement);
                });
                toggleButton.textContent = "Скрыть ответы";
            } else {
                repliesContainer.innerHTML = "<p>Ответов пока нет.</p>";
            }
        } catch (error) {
            console.error("Ошибка загрузки ответов:", error);
            repliesContainer.innerHTML = "<p>Ошибка загрузки ответов. Попробуйте позже.</p>";
        }
    } else {
        repliesContainer.innerHTML = "";
        toggleButton.textContent = "Показать ответы";
    }
}
