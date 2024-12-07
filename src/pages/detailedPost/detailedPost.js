import { initDropDown } from "../profile/dropDown.js";
import { renderPost } from "./renderPost.js";
import { renderComments } from "./renderComments.js";
import { commentServices } from "../../storage/api/services/commentServices.js";

export async function initDetailedPost(container, postId) {
    initDropDown();
    await renderPost(postId);
    await renderComments(postId);

    const createCommentContainer = document.getElementById("createCommentContainer");
    
    if (createCommentContainer) {
        const textArea = createCommentContainer.querySelector(".replyTextArea");
        const submitButton = createCommentContainer.querySelector(".replySubmitButton");
        submitButton.addEventListener("click", async () => {
                const content = textArea.value.trim();
                if (!content) {
                    alert("Комментарий не может быть пустым.");
                    return;
                }

                try {
                    await commentServices.addCommentToPost(postId, content);
                    alert("Комментарий успешно добавлен.");
                    textArea.value = "";
                    await renderComments(postId); 
                } catch (error) {
                    console.error("Ошибка отправки комментария:", error);
                    alert("Не удалось отправить комментарий. Попробуйте позже.");
                }
            });
        } 
}
