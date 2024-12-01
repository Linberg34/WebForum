import { commentServices } from "../../storage/api/services/commentServices.js";
import { createCommentElement } from "./createCommentElement.js";

export async function toggleReplies(commentId, container, button) {
    if (container.childElementCount === 0) {
        try {
            const replies = await commentServices.getCommentTree(commentId);

            replies.forEach((reply) => {
                const replyElement = createCommentElement(reply);
                container.appendChild(replyElement);
            });

            button.textContent = "Скрыть ответы";
        } catch (error) {
            console.error("Ошибка загрузки ответов:", error);
            container.innerHTML = "<p>Ошибка загрузки ответов. Попробуйте позже.</p>";
        }
    } else {
        container.innerHTML = "";
        button.textContent = "Показать ответы";
    }
}
