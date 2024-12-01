import { createReplyForm } from "./createReplyForm.js";
import { toggleReplies } from "./toggleReplies.js";

export function createCommentElement(comment) {
    const commentCard = document.createElement("div");
    commentCard.className = "commentCard";

    const author = document.createElement("p");
    author.className = "commentAuthor";
    author.textContent = comment.author || "Неизвестный автор";

    const content = document.createElement("p");
    content.className = "commentContent";
    content.textContent = comment.content || "Комментарий отсутствует";

    const meta = document.createElement("p");
    meta.className = "commentMeta";

    const createTime = new Date(comment.createTime).toLocaleString();
    meta.textContent = `Опубликовано: ${createTime}`;

    if (comment.modifiedDate) {
        const modifiedDate = new Date(comment.modifiedDate).toLocaleString();
        meta.textContent += ` (изменён: ${modifiedDate})`;
    }

    const replyButton = document.createElement("button");
    replyButton.className = "replyButton";
    replyButton.textContent = "Ответить";

    replyButton.addEventListener("click", () => {
        const replyForm = createReplyForm(comment.id);
        commentCard.appendChild(replyForm);
        replyButton.disabled = true;
    });

    commentCard.appendChild(author);
    commentCard.appendChild(content);
    commentCard.appendChild(meta);
    commentCard.appendChild(replyButton);

    if (comment.subComments > 0) {
        const repliesContainer = document.createElement("div");
        repliesContainer.className = "repliesContainer";

        const toggleRepliesButton = document.createElement("button");
        toggleRepliesButton.className = "toggleRepliesButton";
        toggleRepliesButton.textContent = "Показать ответы";

        toggleRepliesButton.addEventListener("click", () => {
            toggleReplies(comment.id, repliesContainer, toggleRepliesButton);
        });

        commentCard.appendChild(toggleRepliesButton);
        commentCard.appendChild(repliesContainer);
    }

    return commentCard;
}
