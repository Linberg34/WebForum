import { toggleReplies } from "./toggleReplies.js";
import { createReplyForm } from "./createReplyForm.js";

export function createCommentElement(comment, postId, onReplySuccess) {
    const commentCard = document.createElement("div");
    commentCard.className = "commentCard";

    const author = document.createElement("p");
    author.className = "commentAuthor";
    author.textContent = comment.author || "";

    const content = document.createElement("p");
    content.className = "commentContent";
    content.textContent = comment.content || "";

    const meta = document.createElement("p");
    meta.className = "commentMeta";
    const createTime = new Date(comment.createTime).toLocaleString();
    meta.textContent = `Опубликовано: ${createTime}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "commentButtons";

    const replyButton = document.createElement("button");
    replyButton.className = "replyButton";
    replyButton.textContent = "Ответить";

    replyButton.addEventListener("click", () => {
        if (!commentCard.querySelector(".replyForm")) {
            const replyForm = createReplyForm(postId, comment.id, onReplySuccess);
            commentCard.appendChild(replyForm);
            replyButton.disabled = true;
        }
    });

    buttonsContainer.appendChild(replyButton);

    const repliesContainer = document.createElement("div");
    repliesContainer.className = "repliesContainer";
    repliesContainer.style.display = "none";

    if (comment.isRoot === true && comment.subComments > 0) {
        const toggleRepliesButton = document.createElement("button");
        toggleRepliesButton.className = "toggleRepliesButton";
        toggleRepliesButton.textContent = "Развернуть ответы";

        toggleRepliesButton.addEventListener("click", () => {
            toggleReplies(comment.id, repliesContainer, toggleRepliesButton, postId);
        });

        buttonsContainer.appendChild(toggleRepliesButton);
    }

    commentCard.appendChild(author);
    commentCard.appendChild(content);
    commentCard.appendChild(meta);
    commentCard.appendChild(buttonsContainer);
    commentCard.appendChild(repliesContainer);

    return commentCard;
}
