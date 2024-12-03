import { postsServices } from "../../storage/api/services/postsServices.js";``
export function formPostData() {

    document.getElementById("createPostContainer").addEventListener("submit", async (e) => {
        e.preventDefault(); 
    
        const postData = {
            title: document.getElementById("title").value.trim(),
            readingTime: document.getElementById("readingTime").value.trim() || null,
            group: document.getElementById("group").value,
            tags: Array.from(document.getElementById("tags").selectedOptions).map(
                (option) => option.value
            ), 
            image: document.getElementById("image").value.trim(),
            text: document.getElementById("text").value.trim(),
            region: document.getElementById("region").value,
        };
    
        if (!postData.title || !postData.text) {
            alert("Название и текст обязательны для заполнения.");
            return;
        }
    
        try {
            const response = await postsServices.createPost(postData);
    
            if (response.ok) {
                alert("Пост успешно создан!");
                window.location.href = "/"; 
            } else {
                const error = await response.json();
                alert(`Ошибка создания поста: ${error.message || "Неизвестная ошибка"}`);
            }
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
            alert("Не удалось создать пост. Попробуйте позже.");
        }
    });

}
