import { initDropDown } from "../profile/dropDown.js";
import { renderPost } from "./renderPost.js";
import { renderComments } from "./renderComments.js";

export async function initDetailedPost(container, postId) {

    try {
        
        initDropDown();
        const postContainer = document.getElementById("detailedPostContainer");
        const commentsContainer = document.querySelector(".existingCommentsContainer");

        await renderPost(postId);
        await renderComments(postId);
    } catch (error) {
        console.error("Ошибка инициализации детального поста:", error);
        container.innerHTML = "<p>Ошибка загрузки страницы. Попробуйте позже.</p>";
    }
}
