import { postsServices } from "../../storage/api/services/postsServices.js";``
export function formPostData() {
    document.getElementById("createPostContainer").addEventListener("submit", async (e) => {
        e.preventDefault(); 
    
        const postData = {
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("text").value.trim(), 
            readingTime: parseInt(document.getElementById("readingTime").value.trim()) || 0, 
            image: document.getElementById("image").value.trim() || null, 
            addressId: document.getElementById("region").value || null, 
            tags: Array.from(document.getElementById("tags").selectedOptions).map(
                (option) => option.value
            ), 
        };
    
        if (!postData.title || !postData.description) {
            alert("Название и текст обязательны для заполнения.");
            return;
        }
        
        console.log("Сформированные данные:", postData);

        try {
            const response = await postsServices.createPost(postData);
    
            if (response.ok) {
                alert("Пост успешно создан!");
                window.location.href = "/"; 
            } else {
                const error = await response.json();
                alert(`Ошибка создания поста: ${error.title || "Неизвестная ошибка"}`);
                console.error("Ошибки валидации:", error.errors);
            }
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
            alert("Не удалось создать пост. Попробуйте позже.");
        }
    });
}
