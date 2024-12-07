import { commentServices } from "../../storage/api/services/commentServices.js";
export function createReplyForm(postId, parentCommentId, onSuccess) {
    const replyForm = document.createElement("div");
    replyForm.className = "replyForm";

    const textArea = document.createElement("textarea");
    textArea.className = "replyTextArea";
    textArea.placeholder = "Напишите ваш ответ";

    const submitButton = document.createElement("button");
    submitButton.className = "replySubmitButton";
    submitButton.textContent = "Отправить";

    submitButton.addEventListener("click", async () => {
        const content = textArea.value.trim();

        if (!content) {
            alert("Комментарий не может быть пустым.");
            return;
        }

        try {
            const newComment = await commentServices.addCommentToPost(postId, content, parentCommentId);
            alert("Ответ успешно добавлен.");
            replyForm.remove();
            onSuccess(newComment);
        } catch (error) {
            console.error("Ошибка отправки ответа:", error);
            alert("Не удалось отправить ответ. Попробуйте позже.");
        }
    });

    replyForm.appendChild(textArea);
    replyForm.appendChild(submitButton);

    return replyForm;
}
